<?php
/**
 * ABIX — API d'agrégation des statistiques et résultats du Baromètre e-Banking 2026
 * 
 * Lit le fichier data/reponses-barometre-2026.csv et renvoie les agrégats :
 * - Taux de satisfaction global
 * - Nombre de participants et d'évaluations
 * - Répartition globale des avis (Donut chart)
 * - Comparatif des canaux (Application Mobile vs Web vs Agences)
 * - Classement et scores de satisfaction par banque
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-cache, no-store, must-revalidate');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$csvFile = __DIR__ . '/../data/reponses-barometre-2026.csv';

$participants = [];
$evaluations = [];

function normalizeSatisfaction($val) {
    $v = mb_strtolower(trim((string)$val), 'UTF-8');
    // Remove accents and special chars for robust matching
    $clean = preg_replace('/[^a-z0-9\x{0600}-\x{06FF}]/u', '', $v);

    if (strpos($clean, 'tressatisfait') !== false || strpos($clean, 'trssatisfait') !== false || strpos($clean, 'verysatisfied') !== false || strpos($clean, 'راضجد') !== false) {
        return ['score' => 5, 'level' => 'verySatisfied'];
    }
    if (strpos($clean, 'tresinsatisfait') !== false || strpos($clean, 'trsinsatisfait') !== false || strpos($clean, 'veryunsatisfied') !== false || strpos($clean, 'غيرراضتمام') !== false) {
        return ['score' => 1, 'level' => 'veryUnsatisfied'];
    }
    if (strpos($clean, 'insatisfait') !== false || strpos($clean, 'unsatisfied') !== false || strpos($clean, 'غيرراض') !== false) {
        return ['score' => 2, 'level' => 'unsatisfied'];
    }
    if (strpos($clean, 'satisfait') !== false || strpos($clean, 'satisfied') !== false || strpos($clean, 'راض') !== false) {
        return ['score' => 4, 'level' => 'satisfied'];
    }
    if (strpos($clean, 'moyen') !== false || strpos($clean, 'neutral') !== false || strpos($clean, 'average') !== false || strpos($clean, 'متوسط') !== false) {
        return ['score' => 3, 'level' => 'average'];
    }

    return null;
}

function normalizeService($val) {
    $v = mb_strtolower(trim((string)$val), 'UTF-8');
    if (strpos($v, 'mobile') !== false || strpos($v, 'محمول') !== false || strpos($v, 'هاتف') !== false) {
        return 'mobile';
    }
    if (strpos($v, 'web') !== false || strpos($v, 'internet') !== false || strpos($v, 'إنترنت') !== false) {
        return 'web';
    }
    if (strpos($v, 'agence') !== false || strpos($v, 'branch') !== false || strpos($v, 'فروع') !== false) {
        return 'branch';
    }
    return 'other';
}

if (file_exists($csvFile)) {
    $handle = fopen($csvFile, 'r');
    if ($handle !== false) {
        $firstLine = true;
        while (($row = fgetcsv($handle, 1000, ';')) !== false) {
            if ($firstLine) {
                $firstLine = false;
                // Skip header if present
                if (isset($row[0]) && (strpos($row[0], 'Horodatage') !== false || strpos($row[0], 'Identifiant') !== false)) {
                    continue;
                }
            }
            if (count($row) < 5) continue;

            $timestamp = trim($row[0]);
            $responseId = trim($row[1]);
            $bank = trim($row[2]);
            $serviceRaw = trim($row[3]);
            $satisfactionRaw = trim($row[4]);

            $normSat = normalizeSatisfaction($satisfactionRaw);
            if (!$normSat) continue;

            $normSvc = normalizeService($serviceRaw);
            if (!empty($responseId)) {
                $participants[$responseId] = true;
            }

            $evaluations[] = [
                'timestamp' => $timestamp,
                'responseId' => $responseId,
                'bank' => $bank,
                'service' => $normSvc,
                'satisfaction' => $normSat['level'],
                'score' => $normSat['score']
            ];
        }
        fclose($handle);
    }
}

$totalEvaluations = count($evaluations);
$totalParticipants = count($participants);

$distribution = [
    'verySatisfied' => 0,
    'satisfied' => 0,
    'average' => 0,
    'unsatisfied' => 0,
    'veryUnsatisfied' => 0
];

$byService = [
    'mobile' => ['count' => 0, 'sumScore' => 0, 'positive' => 0, 'distribution' => ['verySatisfied' => 0, 'satisfied' => 0, 'average' => 0, 'unsatisfied' => 0, 'veryUnsatisfied' => 0]],
    'web'    => ['count' => 0, 'sumScore' => 0, 'positive' => 0, 'distribution' => ['verySatisfied' => 0, 'satisfied' => 0, 'average' => 0, 'unsatisfied' => 0, 'veryUnsatisfied' => 0]],
    'branch' => ['count' => 0, 'sumScore' => 0, 'positive' => 0, 'distribution' => ['verySatisfied' => 0, 'satisfied' => 0, 'average' => 0, 'unsatisfied' => 0, 'veryUnsatisfied' => 0]]
];

$byBank = [];
$totalScoreSum = 0;
$totalPositive = 0;

foreach ($evaluations as $ev) {
    $level = $ev['satisfaction'];
    $score = $ev['score'];
    $svc = $ev['service'];
    $bank = $ev['bank'];

    $distribution[$level]++;
    $totalScoreSum += $score;
    if ($score >= 4) {
        $totalPositive++;
    }

    if (isset($byService[$svc])) {
        $byService[$svc]['count']++;
        $byService[$svc]['sumScore'] += $score;
        $byService[$svc]['distribution'][$level]++;
        if ($score >= 4) {
            $byService[$svc]['positive']++;
        }
    }

    if (!isset($byBank[$bank])) {
        $byBank[$bank] = [
            'name' => $bank,
            'count' => 0,
            'sumScore' => 0,
            'positive' => 0,
            'services' => [
                'mobile' => ['count' => 0, 'sumScore' => 0],
                'web'    => ['count' => 0, 'sumScore' => 0],
                'branch' => ['count' => 0, 'sumScore' => 0]
            ]
        ];
    }

    $byBank[$bank]['count']++;
    $byBank[$bank]['sumScore'] += $score;
    if ($score >= 4) {
        $byBank[$bank]['positive']++;
    }
    if (isset($byBank[$bank]['services'][$svc])) {
        $byBank[$bank]['services'][$svc]['count']++;
        $byBank[$bank]['services'][$svc]['sumScore'] += $score;
    }
}

// Distribution percentages
$distributionPct = [];
foreach ($distribution as $lvl => $count) {
    $distributionPct[$lvl] = $totalEvaluations > 0 ? round(($count / $totalEvaluations) * 100, 1) : 0;
}

// Services processed
$processedServices = [];
foreach ($byService as $sKey => $sData) {
    $cnt = $sData['count'];
    $avgScore5 = $cnt > 0 ? round($sData['sumScore'] / $cnt, 2) : 0;
    $avgScore100 = $cnt > 0 ? round(($sData['sumScore'] / ($cnt * 5)) * 100, 1) : 0;
    $satRate = $cnt > 0 ? round(($sData['positive'] / $cnt) * 100, 1) : 0;
    $distPct = [];
    foreach ($sData['distribution'] as $lKey => $lCnt) {
        $distPct[$lKey] = $cnt > 0 ? round(($lCnt / $cnt) * 100, 1) : 0;
    }
    $processedServices[$sKey] = [
        'count' => $cnt,
        'averageScore' => $avgScore100,
        'averageScoreOutOf5' => $avgScore5,
        'satisfactionRate' => $satRate,
        'distribution' => $sData['distribution'],
        'distributionPct' => $distPct
    ];
}

$overallAvgScore5 = $totalEvaluations > 0 ? round($totalScoreSum / $totalEvaluations, 2) : 0;
$overallAvgScore = $totalEvaluations > 0 ? round(($totalScoreSum / ($totalEvaluations * 5)) * 100, 1) : 0;
$overallSatisfactionRate = $totalEvaluations > 0 ? round(($totalPositive / $totalEvaluations) * 100, 1) : 0;

// Banks processed and ranked
$bankList = [];
foreach ($byBank as $bName => $bData) {
    $cnt = $bData['count'];
    $avgScore5 = $cnt > 0 ? round($bData['sumScore'] / $cnt, 2) : 0;
    $avgScore100 = $cnt > 0 ? round(($bData['sumScore'] / ($cnt * 5)) * 100, 1) : 0;
    $satRate = $cnt > 0 ? round(($bData['positive'] / $cnt) * 100, 1) : 0;

    // Score ajusté Bayesian shrinkage : (n / (n + 20)) * bank_score + (20 / (n + 20)) * market_avg
    $adjScore5 = ($cnt >= 5 && $overallAvgScore5 > 0)
        ? round((($cnt / ($cnt + 20)) * $avgScore5) + ((20 / ($cnt + 20)) * $overallAvgScore5), 2)
        : $avgScore5;

    $bankServices = [];
    foreach ($bData['services'] as $sKey => $sVal) {
        $sCnt = $sVal['count'];
        $sAvgScore5 = $sCnt > 0 ? round($sVal['sumScore'] / $sCnt, 2) : null;
        $sMarketAvg5 = isset($processedServices[$sKey]) ? $processedServices[$sKey]['averageScoreOutOf5'] : 0;
        $sAdjScore5 = ($sCnt >= 5 && $sAvgScore5 !== null && $sMarketAvg5 > 0)
            ? round((($sCnt / ($sCnt + 20)) * $sAvgScore5) + ((20 / ($sCnt + 20)) * $sMarketAvg5), 2)
            : $sAvgScore5;

        $bankServices[$sKey] = [
            'count' => $sCnt,
            'averageScore' => $sCnt > 0 ? round(($sVal['sumScore'] / ($sCnt * 5)) * 100, 1) : null,
            'averageScoreOutOf5' => $sAvgScore5,
            'adjustedScoreOutOf5' => $sAdjScore5,
            'marketAverageOutOf5' => $sMarketAvg5
        ];
    }

    $bankList[] = [
        'name' => $bName,
        'count' => $cnt,
        'averageScore' => $avgScore100,
        'averageScoreOutOf5' => $avgScore5,
        'adjustedScoreOutOf5' => $adjScore5,
        'marketAverageOutOf5' => $overallAvgScore5,
        'satisfactionRate' => $satRate,
        'services' => $bankServices
    ];
}

usort($bankList, function($a, $b) {
    if ($a['adjustedScoreOutOf5'] === $b['adjustedScoreOutOf5']) {
        if ($a['count'] === $b['count']) {
            return strcmp($a['name'], $b['name']);
        }
        return $b['count'] <=> $a['count'];
    }
    return $b['adjustedScoreOutOf5'] <=> $a['adjustedScoreOutOf5'];
});

echo json_encode([
    'ok' => true,
    'hasData' => $totalEvaluations > 0,
    'summary' => [
        'totalParticipants' => $totalParticipants > 0 ? $totalParticipants : ($totalEvaluations > 0 ? 1 : 0),
        'totalEvaluations' => $totalEvaluations,
        'overallAverageScore' => $overallAvgScore,
        'overallAverageScoreOutOf5' => $overallAvgScore5,
        'overallSatisfactionRate' => $overallSatisfactionRate,
        'targetGoal' => 5000
    ],
    'distribution' => [
        'counts' => $distribution,
        'percentages' => $distributionPct
    ],
    'byService' => $processedServices,
    'byBank' => $bankList
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
