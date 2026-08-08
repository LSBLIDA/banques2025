<?php
$url = 'https://fenekio.com/tandp/ps/forms/wtl/5ba23a9399dbe1484beb72b52e95593f';
$html = file_get_contents($url);

echo "=== FORM TAG ===\n";
if (preg_match('/<form[^>]*action="([^"]*)"[^>]*>/i', $html, $m)) {
    echo "Action URL: " . $m[1] . "\n";
}
if (preg_match('/<form[^>]*method="([^"]*)"[^>]*>/i', $html, $m)) {
    echo "Method: " . $m[1] . "\n";
}
if (preg_match('/<form[^>]*id="([^"]*)"[^>]*>/i', $html, $m)) {
    echo "Form ID: " . $m[1] . "\n";
}

echo "\n=== ALL INPUTS / SELECTS / TEXTAREAS ===\n";
preg_match_all('/<(input|select|textarea)[^>]*>/i', $html, $matches);
foreach ($matches[0] as $tag) {
    echo $tag . "\n";
}

echo "\n=== CSRF OR HIDDEN INPUTS ===\n";
preg_match_all('/<input[^>]*type="hidden"[^>]*>/i', $html, $hiddens);
foreach ($hiddens[0] as $h) {
    echo $h . "\n";
}
