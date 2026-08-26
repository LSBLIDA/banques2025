<?php
/**
 * ABIX — Endpoint Backend Autonome d'Envoi des Offres Commerciales
 * Envoi sécurisé du PDF officiel par email, indépendant du CRM Fenekio.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// Seule la méthode POST est autorisée
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'error' => 'Méthode non autorisée. Seul POST est accepté.'
    ]);
    exit;
}

// Chargement de la configuration des offres
$offersConfigFile = __DIR__ . '/../config/offers-config.php';
if (!file_exists($offersConfigFile)) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Configuration des offres indisponible.'
    ]);
    exit;
}
$offersConfig = require $offersConfigFile;
$authorizedPlans = $offersConfig['plans'] ?? [];

// Récupération des données JSON ou POST
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);
if (!is_array($input)) {
    $input = $_POST;
}

$email = isset($input['email']) ? trim((string)$input['email']) : '';
$name = isset($input['name']) ? trim((string)$input['name']) : '';
$planKey = isset($input['plan']) ? strtolower(trim((string)$input['plan'])) : '';
$requestId = isset($input['request_id']) ? trim((string)$input['request_id']) : '';

// 1. Validation de l'adresse email
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'error' => 'Veuillez renseigner une adresse email valide.'
    ]);
    exit;
}

// Normalisation du plan ('essential' -> 'essentiel')
if ($planKey === 'essential') {
    $planKey = 'essentiel';
}

// 2. Validation stricte du plan à partir de la liste autorisée
if (empty($planKey) || !isset($authorizedPlans[$planKey])) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'error' => 'Plan sélectionné invalide.'
    ]);
    exit;
}

$selectedPlan = $authorizedPlans[$planKey];
if (empty($selectedPlan['active'])) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'error' => 'Ce pack n’est plus disponible.'
    ]);
    exit;
}

// 3. Sélection sécurisée du PDF côté serveur (aucun chemin fourni par le client)
$pdfFileName = $selectedPlan['pdf_filename'];
$pdfFullPath = realpath(__DIR__ . '/../../public/documents/offres/' . $pdfFileName);

if (!$pdfFullPath || !file_exists($pdfFullPath) || !is_readable($pdfFullPath)) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Le document de l’offre est momentanément indisponible.'
    ]);
    exit;
}

// 4. Rate Limiting & Protection Anti-Abus (par IP et par email)
$dataDir = __DIR__ . '/../../data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

$clientIp = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$now = time();

// Fichier de verrouillage d'idempotence et de rate limiting
$rateLimitFile = $dataDir . '/offer-rate-limits.json';
$rateData = file_exists($rateLimitFile) ? json_decode(file_get_contents($rateLimitFile), true) : [];
if (!is_array($rateData)) {
    $rateData = ['ips' => [], 'emails' => [], 'sent_hashes' => []];
}

// Nettoyage des données de plus de 24h
$cutoff = $now - 86400;
foreach (['ips', 'emails', 'sent_hashes'] as $k) {
    if (isset($rateData[$k]) && is_array($rateData[$k])) {
        foreach ($rateData[$k] as $key => $timestamp) {
            if ($timestamp < $cutoff) {
                unset($rateData[$k][$key]);
            }
        }
    }
}

// A. Idempotence : Si la même soumission (email + plan) a déjà eu lieu dans les 5 minutes
$emailPlanHash = md5(strtolower($email) . '|' . $planKey . ($requestId ? '|' . $requestId : ''));
if (isset($rateData['sent_hashes'][$emailPlanHash]) && ($now - $rateData['sent_hashes'][$emailPlanHash]) < 300) {
    // Réponse de succès sans renvoyer un second email inutile
    echo json_encode([
        'ok' => true,
        'idempotent' => true,
        'message' => 'L’offre commerciale vous a déjà été transmise par email.',
        'plan' => $selectedPlan['name'],
        'download_url' => $selectedPlan['pdf_path']
    ]);
    exit;
}

// B. Limite par IP : max 10 envois par 10 minutes
$ipCount = 0;
if (isset($rateData['ips'][$clientIp])) {
    $ipHistory = is_array($rateData['ips'][$clientIp]) ? $rateData['ips'][$clientIp] : [$rateData['ips'][$clientIp]];
    $recentIpHistory = array_filter($ipHistory, fn($t) => ($now - $t) < 600);
    if (count($recentIpHistory) >= 10) {
        http_response_code(429);
        echo json_encode([
            'ok' => false,
            'error' => 'Trop de requêtes effectuées depuis votre adresse IP. Veuillez patienter.'
        ]);
        exit;
    }
    $recentIpHistory[] = $now;
    $rateData['ips'][$clientIp] = array_values($recentIpHistory);
} else {
    $rateData['ips'][$clientIp] = [$now];
}

// C. Limite par Email : max 5 envois par heure
$emailKey = md5(strtolower($email));
if (isset($rateData['emails'][$emailKey])) {
    $emailHistory = is_array($rateData['emails'][$emailKey]) ? $rateData['emails'][$emailKey] : [$rateData['emails'][$emailKey]];
    $recentEmailHistory = array_filter($emailHistory, fn($t) => ($now - $t) < 3600);
    if (count($recentEmailHistory) >= 5) {
        http_response_code(429);
        echo json_encode([
            'ok' => false,
            'error' => 'Trop de demandes envoyées à cette adresse email. Veuillez vérifier vos messages ou vos courriers indésirables.'
        ]);
        exit;
    }
    $recentEmailHistory[] = $now;
    $rateData['emails'][$emailKey] = array_values($recentEmailHistory);
} else {
    $rateData['emails'][$emailKey] = [$now];
}

$rateData['sent_hashes'][$emailPlanHash] = $now;
@file_put_contents($rateLimitFile, json_encode($rateData, JSON_PRETTY_PRINT));

// 5. Préparation du courriel
$planName = $selectedPlan['name'];
$subject = "Votre offre ABIX 2026 – " . $planName;

$greeting = !empty($name) ? "Bonjour " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "," : "Bonjour,";
$bodyText = "{$greeting}\n\n"
    . "Nous vous remercions pour votre intérêt pour Algeria Banking Index.\n\n"
    . "Vous trouverez ci-joint l’offre commerciale correspondant au {$planName}.\n\n"
    . "Notre équipe vous contactera prochainement afin de répondre à vos questions et de finaliser votre souscription.\n\n"
    . "Cordialement,\n"
    . "L’équipe Algeria Banking Index\n"
    . "Tadjeddine & Partners\n"
    . "https://algeriabankingindex.com\n";

// 6. Envoi de l'email avec pièce jointe PDF MIME
$fromEmail = 'info@tadjeddine-partners.com';
$fromName = 'Algeria Banking Index';
$replyTo = 'info@tadjeddine-partners.com';

$fileContent = file_get_contents($pdfFullPath);
$fileBase64 = chunk_split(base64_encode($fileContent));
$boundary = "==Multipart_Boundary_x" . md5((string)time()) . "x";

$headers = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$fromEmail}>\r\n";
$headers .= "Reply-To: {$replyTo}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";
$headers .= "X-Mailer: ABIX-Mailer/1.0\r\n";

$encodedSubject = "=?UTF-8?B?" . base64_encode($subject) . "?=";

$message = "--{$boundary}\r\n";
$message .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
$message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$message .= $bodyText . "\r\n\r\n";

$message .= "--{$boundary}\r\n";
$message .= "Content-Type: application/pdf; name=\"{$pdfFileName}\"\r\n";
$message .= "Content-Disposition: attachment; filename=\"{$pdfFileName}\"\r\n";
$message .= "Content-Transfer-Encoding: base64\r\n\r\n";
$message .= $fileBase64 . "\r\n\r\n";
$message .= "--{$boundary}--";

// Exécution de l'envoi via mail() standard
$mailSuccess = @mail($email, $encodedSubject, $message, $headers);

// 7. Journalisation technique (sans stocker de données personnelles excessives)
$logFile = $dataDir . '/email-offer-logs.json';
$logs = file_exists($logFile) ? json_decode(file_get_contents($logFile), true) : [];
if (!is_array($logs)) { $logs = []; }

$logs[] = [
    'timestamp' => date('c'),
    'plan' => $planKey,
    'email_domain' => substr(strrchr($email, "@"), 1),
    'ip_hash' => hash('sha256', $clientIp),
    'success' => $mailSuccess,
    'pdf' => $pdfFileName
];

// Ne conserver que les 500 derniers logs
if (count($logs) > 500) {
    $logs = array_slice($logs, -500);
}
@file_put_contents($logFile, json_encode($logs, JSON_PRETTY_PRINT));

// 8. Réponse JSON
echo json_encode([
    'ok' => true,
    'mail_sent' => $mailSuccess,
    'message' => 'L’offre commerciale a été transmise avec succès à votre adresse email.',
    'plan' => $selectedPlan['name'],
    'download_url' => $selectedPlan['pdf_path']
]);
