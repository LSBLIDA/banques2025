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
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $res = curl_exec($ch);
    curl_close($ch);
    return $res;
}

foreach ($urls as $k => $u) {
    echo "\n=== PACK: $k ===\n";
    $html = fetchUrl($u);
    preg_match_all('/<input[^>]+name="([^"]+)"[^>]*>/i', $html, $matches);
    echo "Inputs: " . implode(', ', array_unique($matches[1])) . "\n";
    preg_match_all('/<input[^>]+type="hidden"[^>]+name="([^"]+)"[^>]+value="([^"]*)"[^>]*>/i', $html, $hiddens, PREG_SET_ORDER);
    foreach ($hiddens as $h) {
        echo "  Hidden: {$h[1]} = {$h[2]}\n";
    }
}
