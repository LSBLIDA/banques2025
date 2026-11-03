<?php
/**
 * ABIX — Endpoint Backend Autonome d'Envoi des Offres Commerciales
 * Envoi sécurisé du PDF officiel par email, indépendant du CRM Fenekio.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

function parseDotEnvFile(string $path): array
{
    if ($path === '' || !is_file($path)) {
        return [];
    }

    $values = [];
    $lines = file($path, FILE_IGNORE_NEW_LINES);
    if ($lines === false) {
        return [];
    }

    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || substr($line, 0, 1) === '#') {
            continue;
        }
        if (substr($line, 0, 7) === 'export ') {
            $line = trim(substr($line, 7));
        }

        $separator = strpos($line, '=');
        if ($separator === false) {
            continue;
        }

        $key = trim(substr($line, 0, $separator));
        $value = trim(substr($line, $separator + 1));
        if (!preg_match('/^[A-Z_][A-Z0-9_]*$/i', $key)) {
            continue;
        }

        $length = strlen($value);
        if ($length >= 2 && (($value[0] === '"' && $value[$length - 1] === '"') || ($value[0] === "'" && $value[$length - 1] === "'"))) {
            $quote = $value[0];
            $value = substr($value, 1, -1);
            if ($quote === '"') {
                $value = strtr($value, ['\\n' => "\n", '\\r' => "\r", '\\t' => "\t", '\\"' => '"', '\\\\' => '\\']);
            }
        } else {
            $value = preg_replace('/\s+#.*$/', '', $value) ?? $value;
        }

        $values[$key] = $value;
    }

    return $values;
}

function getConfiguredValue(string $key, array $fileValues, string $default = ''): string
{
    $runtimeValue = getenv($key);
    if ($runtimeValue !== false && trim((string)$runtimeValue) !== '') {
        return trim((string)$runtimeValue);
    }
    return array_key_exists($key, $fileValues) ? trim((string)$fileValues[$key]) : $default;
}

function configuredBoolean(string $value): bool
{
    return in_array(strtolower(trim($value)), ['1', 'true', 'yes', 'on'], true);
}

/**
 * Charge en priorité le .env propre au site public. L'ancien chemin vers Data
 * Explorer reste un repli de compatibilité, notamment pour le développement.
 */
function loadSmtpConfiguration(): ?array
{
    static $loaded = false;
    static $configuration = null;
    if ($loaded) {
        return $configuration;
    }
    $loaded = true;

    $configuredPath = trim((string)(getenv('ABIX_OFFER_ENV_FILE') ?: getenv('ABIX_DATA_EXPLORER_ENV_FILE') ?: ''));
    $candidates = array_values(array_filter([
        $configuredPath,
        dirname(__DIR__, 2) . '/.env',
        '/www/wwwroot/abix-data-explorer/ABIX_back/.env',
    ]));

    $fileValues = [];
    foreach ($candidates as $candidate) {
        $fileValues = parseDotEnvFile($candidate);
        if ($fileValues !== []) {
            break;
        }
    }

    $host = getConfiguredValue('EMAIL_HOST', $fileValues);
    $port = (int)getConfiguredValue('EMAIL_PORT', $fileValues, '587');
    if ($host === '' || $port < 1 || $port > 65535) {
        return null;
    }

    $configuration = [
        'host' => $host,
        'port' => $port,
        'username' => getConfiguredValue('EMAIL_HOST_USER', $fileValues),
        'password' => getConfiguredValue('EMAIL_HOST_PASSWORD', $fileValues),
        'use_tls' => configuredBoolean(getConfiguredValue('EMAIL_USE_TLS', $fileValues, 'true')),
        'use_ssl' => configuredBoolean(getConfiguredValue('EMAIL_USE_SSL', $fileValues, 'false')),
        'timeout' => max(3, min(30, (int)getConfiguredValue('EMAIL_TIMEOUT', $fileValues, '15'))),
        'from_email' => getConfiguredValue('ABIX_OFFER_FROM_EMAIL', $fileValues, 'abix@tadjeddine-partners.com'),
        'reply_to' => getConfiguredValue('ABIX_OFFER_REPLY_TO', $fileValues, 'abix@tadjeddine-partners.com'),
    ];
    return $configuration;
}

function smtpReadResponse($stream): array
{
    $lines = [];
    $code = 0;
    while (!feof($stream)) {
        $line = fgets($stream, 2048);
        if ($line === false) {
            break;
        }
        $lines[] = rtrim($line, "\r\n");
        if (preg_match('/^(\d{3})([ -])/', $line, $matches)) {
            $code = (int)$matches[1];
            if ($matches[2] === ' ') {
                break;
            }
        }
        if (count($lines) >= 100) {
            break;
        }
    }
    return ['code' => $code, 'message' => implode(' | ', $lines)];
}

function smtpCommand($stream, string $command, array $expectedCodes): array
{
    if (fwrite($stream, $command . "\r\n") === false) {
        return ['success' => false, 'error' => 'Impossible d’écrire vers le serveur SMTP.'];
    }
    $response = smtpReadResponse($stream);
    if (!in_array($response['code'], $expectedCodes, true)) {
        return ['success' => false, 'error' => $response['message'] ?: 'Réponse SMTP absente.'];
    }
    return ['success' => true, 'error' => ''];
}

function sendViaSmtp(array $config, string $recipient, string $envelopeSender, string $encodedSubject, string $message, string $headers): array
{
    $scheme = $config['use_ssl'] ? 'ssl' : 'tcp';
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
            'peer_name' => $config['host'],
            'SNI_enabled' => true,
        ],
    ]);
    $errorNumber = 0;
    $errorMessage = '';
    $stream = @stream_socket_client(
        "{$scheme}://{$config['host']}:{$config['port']}",
        $errorNumber,
        $errorMessage,
        $config['timeout'],
        STREAM_CLIENT_CONNECT,
        $context
    );
    if (!is_resource($stream)) {
        return ['success' => false, 'error' => "Connexion SMTP impossible ({$errorNumber}) : {$errorMessage}", 'transport' => 'smtp'];
    }

    stream_set_timeout($stream, $config['timeout']);
    $greeting = smtpReadResponse($stream);
    if ($greeting['code'] !== 220) {
        fclose($stream);
        return ['success' => false, 'error' => $greeting['message'] ?: 'Accueil SMTP invalide.', 'transport' => 'smtp'];
    }

    $serverName = preg_replace('/[^a-z0-9.-]/i', '', (string)($_SERVER['SERVER_NAME'] ?? 'algeriabankingindex.com')) ?: 'algeriabankingindex.com';
    $result = smtpCommand($stream, 'EHLO ' . $serverName, [250]);
    if (!$result['success']) {
        fclose($stream);
        return $result + ['transport' => 'smtp'];
    }

    if ($config['use_tls'] && !$config['use_ssl']) {
        $result = smtpCommand($stream, 'STARTTLS', [220]);
        if (!$result['success']) {
            fclose($stream);
            return $result + ['transport' => 'smtp'];
        }
        if (@stream_socket_enable_crypto($stream, true, STREAM_CRYPTO_METHOD_TLS_CLIENT) !== true) {
            fclose($stream);
            return ['success' => false, 'error' => 'La négociation TLS avec le serveur SMTP a échoué.', 'transport' => 'smtp'];
        }
        $result = smtpCommand($stream, 'EHLO ' . $serverName, [250]);
        if (!$result['success']) {
            fclose($stream);
            return $result + ['transport' => 'smtp'];
        }
    }

    if ($config['username'] !== '') {
        if ($config['password'] === '') {
            fclose($stream);
            return ['success' => false, 'error' => 'Le mot de passe SMTP est absent.', 'transport' => 'smtp'];
        }
        foreach ([
            ['AUTH LOGIN', [334]],
            [base64_encode($config['username']), [334]],
            [base64_encode($config['password']), [235]],
        ] as [$command, $codes]) {
            $result = smtpCommand($stream, $command, $codes);
            if (!$result['success']) {
                fclose($stream);
                return $result + ['transport' => 'smtp'];
            }
        }
    }

    foreach ([
        ['MAIL FROM:<' . $envelopeSender . '>', [250]],
        ['RCPT TO:<' . $recipient . '>', [250, 251]],
        ['DATA', [354]],
    ] as [$command, $codes]) {
        $result = smtpCommand($stream, $command, $codes);
        if (!$result['success']) {
            fclose($stream);
            return $result + ['transport' => 'smtp'];
        }
    }

    $messageIdDomain = substr(strrchr($envelopeSender, '@') ?: '@algeriabankingindex.com', 1);
    $rawMessage = 'Date: ' . date(DATE_RFC2822) . "\r\n"
        . 'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . $messageIdDomain . ">\r\n"
        . "To: {$recipient}\r\n"
        . "Subject: {$encodedSubject}\r\n"
        . $headers . "\r\n"
        . $message . "\r\n";
    $rawMessage = preg_replace("/\r\n|\r|\n/", "\r\n", $rawMessage) ?? $rawMessage;
    $rawMessage = preg_replace('/(?m)^\./', '..', $rawMessage) ?? $rawMessage;
    if (fwrite($stream, $rawMessage . ".\r\n") === false) {
        fclose($stream);
        return ['success' => false, 'error' => 'Le contenu du message n’a pas pu être transmis au serveur SMTP.', 'transport' => 'smtp'];
    }
    $delivery = smtpReadResponse($stream);
    @smtpCommand($stream, 'QUIT', [221]);
    fclose($stream);

    return [
        'success' => $delivery['code'] === 250,
        'error' => $delivery['code'] === 250 ? '' : ($delivery['message'] ?: 'Le serveur SMTP a refusé le message.'),
        'transport' => 'smtp',
    ];
}

/**
 * Remet le message MIME exclusivement au SMTP de Data Explorer.
 */
function sendMimeMessage(string $recipient, string $envelopeSender, string $encodedSubject, string $message, string $headers): array
{
    $smtpConfiguration = loadSmtpConfiguration();
    if ($smtpConfiguration !== null) {
        return sendViaSmtp($smtpConfiguration, $recipient, $envelopeSender, $encodedSubject, $message, $headers);
    }

    return [
        'success' => false,
        'error' => 'La configuration SMTP de Data Explorer est indisponible.',
        'transport' => 'smtp-unconfigured',
    ];
}

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

$pdfSha256 = hash_file('sha256', $pdfFullPath);
if ($pdfSha256 === false) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Le document de l’offre ne peut pas être vérifié.'
    ]);
    exit;
}
$pdfVersion = substr($pdfSha256, 0, 12);
$downloadUrl = $selectedPlan['pdf_path'] . '?v=' . $pdfVersion;

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
        'download_url' => $downloadUrl,
        'pdf_version' => $pdfVersion
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

// Enregistrer les tentatives pour le rate limiting. Le marqueur d'idempotence
// n'est ajouté qu'après confirmation d'un envoi réussi.
@file_put_contents($rateLimitFile, json_encode($rateData, JSON_PRETTY_PRINT), LOCK_EX);

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
$mailConfiguration = loadSmtpConfiguration();
$fromEmail = trim((string)($mailConfiguration['from_email'] ?? 'abix@tadjeddine-partners.com'));
$fromName = 'Algeria Banking Index';
$replyTo = trim((string)($mailConfiguration['reply_to'] ?? $fromEmail));

if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL) || !filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'La configuration de l’expéditeur de l’offre est invalide.'
    ]);
    exit;
}

$fileContent = file_get_contents($pdfFullPath);
if ($fileContent === false) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Le document de l’offre ne peut pas être joint au courriel.'
    ]);
    exit;
}
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

// Exécution de l'envoi avec contrôle du résultat immédiat du transport
$mailResult = sendMimeMessage($email, $fromEmail, $encodedSubject, $message, $headers);
$mailSuccess = $mailResult['success'];

if ($mailSuccess) {
    $rateData['sent_hashes'][$emailPlanHash] = $now;
    @file_put_contents($rateLimitFile, json_encode($rateData, JSON_PRETTY_PRINT), LOCK_EX);
}

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
    'pdf' => $pdfFileName,
    'pdf_version' => $pdfVersion,
    'transport' => $mailResult['transport'],
    'transport_error' => $mailSuccess ? '' : substr((string)$mailResult['error'], 0, 500)
];

// Ne conserver que les 500 derniers logs
if (count($logs) > 500) {
    $logs = array_slice($logs, -500);
}
@file_put_contents($logFile, json_encode($logs, JSON_PRETTY_PRINT), LOCK_EX);

// 8. Réponse JSON
if (!$mailSuccess) {
    http_response_code(502);
    echo json_encode([
        'ok' => false,
        'mail_sent' => false,
        'error' => 'L’envoi du courriel a échoué. Vous pouvez télécharger directement votre offre ou réessayer dans quelques instants.',
        'plan' => $selectedPlan['name'],
        'download_url' => $downloadUrl,
        'pdf_version' => $pdfVersion
    ]);
    exit;
}

echo json_encode([
    'ok' => true,
    'mail_sent' => true,
    'message' => 'L’offre commerciale a été transmise avec succès à votre adresse email.',
    'plan' => $selectedPlan['name'],
    'download_url' => $downloadUrl,
    'pdf_version' => $pdfVersion
]);
