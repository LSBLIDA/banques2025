<?php
/**
 * ABIX — API Glossaire
 *
 * Endpoint REST pour interroger, filtrer et administrer les notions du Glossaire ABIX.
 *
 * Paramètres GET acceptés :
 * - lang       : Langue ('fr', 'en', 'ar') - Défaut : 'fr'
 * - category   : Clé de catégorie pour filtrer
 * - q          : Terme de recherche (recherche sur terme, acronyme, alias, définitions)
 * - slug       : Récupérer une seule entrée par son slug
 * - module     : Filtrer par module ABIX (ex: 'Vue Secteur', 'Profil Banque')
 * - letter     : Filtrer par première lettre alphabétique
 *
 * Réponse : JSON
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/../data/glossary.json';

if (!file_exists($dataFile)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Glossary database file not found. Please run seed script.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$jsonContent = file_get_contents($dataFile);
$glossaryData = json_decode($jsonContent, true);

if (!$glossaryData || !isset($glossaryData['entries'])) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid glossary data format.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$lang = isset($_GET['lang']) && in_array(strtolower($_GET['lang']), ['fr', 'en', 'ar']) ? strtolower($_GET['lang']) : 'fr';
$category = isset($_GET['category']) ? trim($_GET['category']) : null;
$query = isset($_GET['q']) ? trim($_GET['q']) : null;
$slug = isset($_GET['slug']) ? trim($_GET['slug']) : null;
$module = isset($_GET['module']) ? trim($_GET['module']) : null;
$letter = isset($_GET['letter']) ? mb_strtoupper(trim($_GET['letter']), 'UTF-8') : null;

// Préparation des entrées localisées
$localizedEntries = [];

foreach ($glossaryData['entries'] as $entry) {
    if (isset($entry['is_active']) && !$entry['is_active']) {
        continue;
    }

    $term = is_array($entry['term']) ? ($entry['term'][$lang] ?? $entry['term']['fr'] ?? '') : $entry['term'];
    $shortDef = is_array($entry['short_definition']) ? ($entry['short_definition'][$lang] ?? $entry['short_definition']['fr'] ?? '') : $entry['short_definition'];
    $detailedDef = is_array($entry['detailed_definition']) ? ($entry['detailed_definition'][$lang] ?? $entry['detailed_definition']['fr'] ?? '') : $entry['detailed_definition'];
    $interpretation = is_array($entry['interpretation']) ? ($entry['interpretation'][$lang] ?? $entry['interpretation']['fr'] ?? '') : $entry['interpretation'];
    $example = is_array($entry['example']) ? ($entry['example'][$lang] ?? $entry['example']['fr'] ?? '') : $entry['example'];
    
    $aliases = [];
    if (isset($entry['aliases'])) {
        if (is_array($entry['aliases'])) {
            if (isset($entry['aliases'][$lang])) {
                $aliases = $entry['aliases'][$lang];
            } elseif (isset($entry['aliases']['fr'])) {
                $aliases = $entry['aliases']['fr'];
            } else {
                $aliases = $entry['aliases'];
            }
        }
    }

    $item = [
        'id' => $entry['id'],
        'slug' => $entry['slug'],
        'term' => $term,
        'acronym' => $entry['acronym'] ?? '',
        'aliases' => $aliases,
        'category' => $entry['category'] ?? '',
        'short_definition' => $shortDef,
        'detailed_definition' => $detailedDef,
        'formula' => $entry['formula'] ?? '',
        'formula_latex' => $entry['formula_latex'] ?? '',
        'interpretation' => $interpretation,
        'example' => $example,
        'unit' => $entry['unit'] ?? '',
        'higher_is_better' => $entry['higher_is_better'] ?? null,
        'modules' => $entry['modules'] ?? [],
        'related_terms' => $entry['related_terms'] ?? [],
        'display_order' => $entry['display_order'] ?? 999
    ];

    // Filtrage par slug unique
    if ($slug && $item['slug'] !== $slug && $item['id'] !== $slug) {
        continue;
    }

    // Filtrage par catégorie
    if ($category && $category !== 'all' && $item['category'] !== $category) {
        continue;
    }

    // Filtrage par module ABIX
    if ($module && !in_array($module, $item['modules'])) {
        continue;
    }

    // Filtrage par lettre alphabétique initiale
    if ($letter) {
        $firstChar = mb_strtoupper(mb_substr($item['term'], 0, 1, 'UTF-8'), 'UTF-8');
        if ($firstChar !== $letter) {
            continue;
        }
    }

    // Filtrage par recherche textuelle (insensible à la casse et aux accents si possible)
    if ($query) {
        $qLower = mb_strtolower($query, 'UTF-8');
        $match = false;

        if (mb_stripos($item['term'], $qLower, 0, 'UTF-8') !== false) $match = true;
        if (mb_stripos($item['acronym'], $qLower, 0, 'UTF-8') !== false) $match = true;
        if (mb_stripos($item['short_definition'], $qLower, 0, 'UTF-8') !== false) $match = true;
        if (mb_stripos($item['detailed_definition'], $qLower, 0, 'UTF-8') !== false) $match = true;
        if (mb_stripos($item['formula'], $qLower, 0, 'UTF-8') !== false) $match = true;

        foreach ($item['aliases'] as $alias) {
            if (mb_stripos($alias, $qLower, 0, 'UTF-8') !== false) {
                $match = true;
                break;
            }
        }

        if (!$match) {
            continue;
        }
    }

    $localizedEntries[] = $item;
}

// Tri par display_order puis par ordre alphabétique
usort($localizedEntries, function($a, $b) {
    if ($a['display_order'] === $b['display_order']) {
        return strcmp($a['term'], $b['term']);
    }
    return $a['display_order'] <=> $b['display_order'];
});

// Formatage des catégories localisées
$categoriesOut = [];
if (isset($glossaryData['categories'])) {
    foreach ($glossaryData['categories'] as $catKey => $catData) {
        $catName = is_array($catData['name']) ? ($catData['name'][$lang] ?? $catData['name']['fr'] ?? $catKey) : $catData['name'];
        $categoriesOut[$catKey] = [
            'id' => $catKey,
            'name' => $catName,
            'icon' => $catData['icon'] ?? ''
        ];
    }
}

echo json_encode([
    'success' => true,
    'lang' => $lang,
    'total_count' => count($glossaryData['entries']),
    'filtered_count' => count($localizedEntries),
    'categories' => $categoriesOut,
    'entries' => $localizedEntries
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
