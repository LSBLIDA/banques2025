<?php
$formUrl = 'https://fenekio.com/tandp/ps/forms/wtl/5ba23a9399dbe1484beb72b52e95593f';
$cookieFile = __DIR__ . '/fenekio-cookie.txt';

// Étape 1 : Récupérer la page pour extraire le token CSRF et le cookie de session
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $formUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookieFile);
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookieFile);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$html = curl_exec($ch);
curl_close($ch);

$csrfToken = '';
if (preg_match('/name="csrf_token_name"\s+value="([^"]+)"/i', $html, $m)) {
    $csrfToken = $m[1];
}

echo "CSRF Token extrait : " . $csrfToken . "\n";

// Étape 2 : Envoyer le POST de test
$postData = [
    'csrf_token_name' => $csrfToken,
    'key' => '5ba23a9399dbe1484beb72b52e95593f',
    'company' => 'Test Company ABIX AutoTest',
    'name' => 'Test Agent ABIX',
    'email' => 'test-preorder@tadjeddine-partners.com',
    'phonenumber' => '0560403405',
    'accept_terms_and_conditions' => 'on'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $formUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookieFile);
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookieFile);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'X-Requested-With: XMLHttpRequest'
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: " . $httpCode . "\n";
echo "Response: " . $response . "\n";
