<?php
/**
 * Test Suite pour l'endpoint d'envoi d'offre ABIX 2026
 */

function makePostRequest($url, $data) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return [$code, json_decode($res, true), $res];
}

// URL locale Laragon ou test direct via inclusion
$endpoint = 'http://localhost/banques2025/api/subscriptions/send-plan-offer.php';
// Fallback si serveur web local non démarré sur ce port : simuler via script CLI
echo "=== 1. TEST VIA SCRIPT DIRECT CLI ===\n";

$_SERVER['REQUEST_METHOD'] = 'POST';
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';

// Test 1: Plan invalide
ob_start();
$_POST = [];
$inputJson = json_encode(['email' => 'test@example.com', 'plan' => 'invalid_plan']);
// Simuler flux
$testScript = __DIR__ . '/../api/subscriptions/send-plan-offer.php';

echo "--- Test 1.1 : Plan Invalide Rejeté ---\n";
$output = shell_exec('php -r "$_SERVER[\'REQUEST_METHOD\']=\'POST\'; $_SERVER[\'REMOTE_ADDR\']=\'127.0.0.1\'; $_POST=[\'email\'=>\'test@example.com\', \'plan\'=>\'fake_plan\']; require \'' . addslashes($testScript) . '\';"');
echo "Result: " . $output . "\n";

echo "--- Test 1.2 : Email Invalide Rejeté ---\n";
$output = shell_exec('php -r "$_SERVER[\'REQUEST_METHOD\']=\'POST\'; $_SERVER[\'REMOTE_ADDR\']=\'127.0.0.1\'; $_POST=[\'email\'=>\'invalid-email\', \'plan\'=>\'essentiel\']; require \'' . addslashes($testScript) . '\';"');
echo "Result: " . $output . "\n";

echo "--- Test 1.3 : Envoi valide Pack Essentiel ---\n";
$output = shell_exec('php -r "$_SERVER[\'REQUEST_METHOD\']=\'POST\'; $_SERVER[\'REMOTE_ADDR\']=\'127.0.0.1\'; $_POST=[\'email\'=>\'prospect.test@abix.dz\', \'name\'=>\'Karim Benali\', \'plan\'=>\'essentiel\']; require \'' . addslashes($testScript) . '\';"');
echo "Result: " . $output . "\n";

echo "--- Test 1.4 : Idempotence / Deuxième envoi immédiat ---\n";
$output = shell_exec('php -r "$_SERVER[\'REQUEST_METHOD\']=\'POST\'; $_SERVER[\'REMOTE_ADDR\']=\'127.0.0.1\'; $_POST=[\'email\'=>\'prospect.test@abix.dz\', \'name\'=>\'Karim Benali\', \'plan\'=>\'essentiel\']; require \'' . addslashes($testScript) . '\';"');
echo "Result: " . $output . "\n";

echo "--- Test 1.5 : Envoi valide Pack Pro ---\n";
$output = shell_exec('php -r "$_SERVER[\'REQUEST_METHOD\']=\'POST\'; $_SERVER[\'REMOTE_ADDR\']=\'127.0.0.1\'; $_POST=[\'email\'=>\'prospect.pro@abix.dz\', \'name\'=>\'Directeur Financier\', \'plan\'=>\'pro\']; require \'' . addslashes($testScript) . '\';"');
echo "Result: " . $output . "\n";

echo "--- Test 1.6 : Envoi valide Pack Corporate Executive ---\n";
$output = shell_exec('php -r "$_SERVER[\'REQUEST_METHOD\']=\'POST\'; $_SERVER[\'REMOTE_ADDR\']=\'127.0.0.1\'; $_POST=[\'email\'=>\'prospect.corp@abix.dz\', \'name\'=>\'Membre Directoire\', \'plan\'=>\'corporate\']; require \'' . addslashes($testScript) . '\';"');
echo "Result: " . $output . "\n";

echo "\n=== 2. VÉRIFICATION DU FICHIER DE LOGS ===\n";
$logFile = __DIR__ . '/../data/email-offer-logs.json';
if (file_exists($logFile)) {
    $logs = json_decode(file_get_contents($logFile), true);
    echo "Total logs: " . count($logs) . "\n";
    echo "Dernier log:\n" . json_encode(end($logs), JSON_PRETTY_PRINT) . "\n";
} else {
    echo "Fichier de logs non trouvé.\n";
}
