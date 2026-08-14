<?php
/**
 * ABIX — Enregistrement des réponses au Baromètre e-Banking 2026 dans un fichier Excel (CSV)
 * 
 * Les réponses sont directement sauvegardées dans le fichier :
 * c:\laragon\www\banques2025\data\reponses-barometre-2026.csv
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Méthode non autorisée. Seul POST est accepté.']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!isset($data['responses']) || !is_array($data['responses']) || count($data['responses']) === 0) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Aucune évaluation valide reçue.']);
    exit;
}

// Dossier de sauvegarde des données
$dataDir = __DIR__ . '/../data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

// Vérification Anti-doublon par adresse IP
$ipFile = $dataDir . '/submitted-ips.json';
$submittedIps = file_exists($ipFile) ? json_decode(file_get_contents($ipFile), true) : [];
if (!is_array($submittedIps)) {
    $submittedIps = [];
}

$clientIp = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$ipHash = md5($clientIp . '_abix_2026');

// Permettre la réinitialisation si paramètre test activé (ex: local dev)
$forceAllow = isset($_GET['bypass_ip_check']) && $_GET['bypass_ip_check'] === '1';

if (in_array($ipHash, $submittedIps) && !$forceAllow) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'alreadySubmitted' => true,
        'error' => 'Une évaluation a déjà été enregistrée depuis votre connexion internet ou appareil.'
    ]);
    exit;
}

// Fichier CSV compatible Excel
$csvFile = $dataDir . '/reponses-barometre-2026.csv';

$file = fopen($csvFile, 'a');
if (!$file) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Impossible d\'écrire dans le fichier de données.']);
    exit;
}

$savedCount = 0;
$responseId = bin2hex(random_bytes(8));

// Acquisition d'un verrou exclusif pour empêcher les écritures concurrentes de se chevaucher ou corrompre le fichier
if (flock($file, LOCK_EX)) {
    // fstat contourne le cache PHP et nous indique si le fichier est réellement vide après obtention du verrou
    $fileStats = fstat($file);
    if (isset($fileStats['size']) && $fileStats['size'] === 0) {
        fwrite($file, "\xEF\xBB\BF"); // BOM UTF-8
        fputcsv($file, ['Horodatage', 'Identifiant Reponse', 'Banque', 'Service Utilise', 'Satisfaction'], ';');
    }

    $now = date('Y-m-d H:i:s');

    foreach ($data['responses'] as $item) {
        $bank = isset($item['bank']) ? trim((string)$item['bank']) : '';
        $service = isset($item['service']) ? trim((string)$item['service']) : '';
        $satisfaction = isset($item['satisfaction']) ? trim((string)$item['satisfaction']) : '';

        if (!empty($bank) && !empty($service) && !empty($satisfaction)) {
            fputcsv($file, [$now, $responseId, $bank, $service, $satisfaction], ';');
            $savedCount++;
        }
    }

    // Libération du verrou
    flock($file, LOCK_UN);
} else {
    fclose($file);
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Impossible d\'obtenir le verrou d\'écriture sur le fichier.']);
    exit;
}

fclose($file);

if ($savedCount > 0 && !$forceAllow) {
    $submittedIps[] = $ipHash;
    file_put_contents($ipFile, json_encode(array_values(array_unique($submittedIps)), JSON_PRETTY_PRINT));
}

echo json_encode([
    'ok' => true,
    'responseId' => $responseId,
    'savedCount' => $savedCount,
    'file' => 'data/reponses-barometre-2026.csv'
]);
