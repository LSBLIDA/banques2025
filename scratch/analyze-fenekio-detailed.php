<?php
$urls = [
    'essential' => 'https://fenekio.com/tandp/ps/forms/wtl/5ba23a9399dbe1484beb72b52e95593f?styled=1',
    'pro' => 'https://fenekio.com/tandp/ps/forms/wtl/9c18a26196a5b5630df381113da3d4b2?styled=1',
    'corporate' => 'https://fenekio.com/tandp/ps/forms/wtl/79e33d8596a4c5f745648a74fe76c5c5?styled=1'
];

function fetchUrl($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return [$code, $res];
}

foreach ($urls as $k => $u) {
    echo "\n==============================\n";
    echo "PACK: $k\n";
    echo "URL: $u\n";
    echo "==============================\n";
    list($code, $html) = fetchUrl($u);
    echo "HTTP Status: $code, Length: " . strlen($html) . "\n";
    if ($code !== 200 || !$html) {
        continue;
    }
    
    if (preg_match('/<form[^>]*action="([^"]*)"[^>]*>/i', $html, $m)) {
        echo "Form Action: " . $m[1] . "\n";
    }
    if (preg_match('/<title[^>]*>(.*?)<\/title>/is', $html, $m)) {
        echo "Page Title: " . trim($m[1]) . "\n";
    }
    
    echo "--- All Form Elements ---\n";
    preg_match_all('/<(input|select|textarea|button)[^>]*>/i', $html, $inputs);
    foreach ($inputs[0] as $inp) {
        echo "  " . $inp . "\n";
    }
    
    echo "--- Scripts ---\n";
    preg_match_all('/<script\b[^>]*>(.*?)<\/script>/is', $html, $scripts);
    foreach ($scripts[1] as $idx => $s) {
        if (trim($s)) {
            echo "Script #$idx:\n" . trim($s) . "\n\n";
        }
    }
}
