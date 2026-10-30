<?php
/**
 * Adaptateur PHP vers la source unique des tarifs de l'édition 2026.
 */

$source = __DIR__ . '/../../data/offers-2026.json';
if (!is_file($source)) {
    throw new RuntimeException('Configuration commerciale 2026 introuvable.');
}

$contents = file_get_contents($source);
if ($contents === false) {
    throw new RuntimeException('Configuration commerciale 2026 illisible.');
}

return json_decode($contents, true, 512, JSON_THROW_ON_ERROR);
