<?php
/**
 * ABIX — API Backend de précommande de l'édition 2026
 * Transmission automatique et sécurisée vers le formulaire Fenekio
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Méthode non autorisée.']);
    exit;
}

// Récupération des données JSON ou POST
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (!is_array($input)) {
    $input = $_POST;
}

$company = isset($input['company']) ? trim((string)$input['company']) : (isset($input['organization']) ? trim((string)$input['organization']) : '');
$name = isset($input['name']) ? trim((string)$input['name']) : '';

// Si le formulaire envoie prénom + nom séparés
if (empty($name)) {
    $firstName = isset($input['first_name']) ? trim((string)$input['first_name']) : '';
    $lastName = isset($input['last_name']) ? trim((string)$input['last_name']) : '';
    $name = trim($firstName . ' ' . $lastName);
}

$email = isset($input['email']) ? trim((string)$input['email']) : '';
$phone = isset($input['phone']) ? trim((string)$input['phone']) : (isset($input['phonenumber']) ? trim((string)$input['phonenumber']) : '');
$terms = isset($input['accept_terms_and_conditions']) ? $input['accept_terms_and_conditions'] : (isset($input['terms_consent']) ? $input['terms_consent'] : false);

// 1. Validation côté serveur
if (empty($company)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Le champ Société est obligatoire.']);
    exit;
}

if (empty($name)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Le champ Nom est obligatoire.']);
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Veuillez saisir une adresse email valide.']);
    exit;
}

if (empty($phone)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Le champ Téléphone est obligatoire.']);
    exit;
}

if (!$terms || $terms === 'false' || $terms === '0') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Vous devez accepter les Termes & Conditions.']);
    exit;
}

$privacy = isset($input['privacy_consent']) ? $input['privacy_consent'] : false;
if (!$privacy || $privacy === 'false' || $privacy === '0') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Veuillez accepter la politique de confidentialité.']);
    exit;
}

// Protection anti-doublon simple (Session / IP rate limiting)
$dataDir = __DIR__ . '/../data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$rateFile = $dataDir . '/preorder-rate.json';
$rates = file_exists($rateFile) ? json_decode(file_get_contents($rateFile), true) : [];
if (!is_array($rates)) { $rates = []; }

$clientIp = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$now = time();
if (isset($rates[$clientIp]) && ($now - $rates[$clientIp]) < 5) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Veuillez patienter quelques secondes avant de réenregistrer.']);
    exit;
}
$rates[$clientIp] = $now;
file_put_contents($rateFile, json_encode($rates));

// 2. Récupération dynamique de la page Fenekio pour le token CSRF et les cookies
$fenekioUrl = 'https://fenekio.com/tandp/ps/forms/wtl/5ba23a9399dbe1484beb72b52e95593f';
$tempCookie = sys_get_temp_dir() . '/fenekio_cookie_' . md5($clientIp) . '.txt';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $fenekioUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_COOKIEJAR, $tempCookie);
curl_setopt($ch, CURLOPT_COOKIEFILE, $tempCookie);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ABIX-Server/1.0');
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$htmlPage = curl_exec($ch);
curl_close($ch);

$csrfToken = '';
if ($htmlPage && preg_match('/name="csrf_token_name"\s+value="([^"]+)"/i', $htmlPage, $m)) {
    $csrfToken = $m[1];
}

if (empty($csrfToken)) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Impossible de contacter le service de réservation Fenekio. Veuillez réessayer.']);
    exit;
}

// 3. Soumission vers Fenekio
$postPayload = [
    'csrf_token_name' => $csrfToken,
    'key' => '5ba23a9399dbe1484beb72b52e95593f',
    'company' => $company,
    'name' => $name,
    'email' => $email,
    'phonenumber' => $phone,
    'accept_terms_and_conditions' => 'on'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $fenekioUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postPayload);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_COOKIEJAR, $tempCookie);
curl_setopt($ch, CURLOPT_COOKIEFILE, $tempCookie);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ABIX-Server/1.0');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'X-Requested-With: XMLHttpRequest'
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);

$resRaw = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

@unlink($tempCookie);

if ($httpCode === 200 && !empty($resRaw)) {
    $resJson = json_decode($resRaw, true);
    if (isset($resJson['success']) && $resJson['success'] === true) {
        echo json_encode([
            'ok' => true,
            'message' => 'Merci. Votre précommande de l’édition 2026 a bien été enregistrée.'
        ]);
        exit;
    }
}

// En cas d'erreur de Fenekio
http_response_code(400);
echo json_encode([
    'ok' => false,
    'error' => 'Une erreur est survenue lors de l’enregistrement de votre précommande. Veuillez réessayer.'
]);
