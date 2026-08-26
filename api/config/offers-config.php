<?php
/**
 * ABIX — Configuration Commerciale Centralisée des Offres
 * Source unique de vérité pour les offres, tarifs, montants, et fichiers PDF.
 */

return [
    'edition' => '2026',
    'currency' => 'DA',
    'vat_rate' => 0.19, // 19% TVA
    'early_bird' => [
        'enabled' => true,
        'deadline' => '2026-08-31T23:59:59+01:00',
        'discount_percent' => 10,
        'validity_text' => 'Offre de souscription anticipée valable jusqu’au 31 août 2026'
    ],
    'plans' => [
        'essentiel' => [
            'id' => 'essentiel',
            'slug' => 'essentiel',
            'name' => 'Pack Essentiel',
            'positioning' => 'Comprendre le marché',
            'active' => true,
            'regular_price_ht' => 84000,
            'discount_amount' => 8400,
            'promo_price_ht' => 75600,
            'vat_amount' => 14364,
            'total_ttc' => 89964,
            'users' => 1,
            'data_explorer_period' => 'Données 2025',
            'pdf_filename' => 'offre-abix-pack-essentiel-2026.pdf',
            'pdf_path' => '/public/documents/offres/offre-abix-pack-essentiel-2026.pdf',
            'summary' => 'Étude complète 2026 (PDF sécurisé), analyse consolidée et individuelle des 21 banques, classements et benchmarks par indicateur, licence ABIX Data Explorer 12 mois (1 utilisateur, données 2025).'
        ],
        'pro' => [
            'id' => 'pro',
            'slug' => 'pro',
            'name' => 'Pack Pro',
            'positioning' => 'Exploiter les données',
            'active' => true,
            'recommended' => true,
            'regular_price_ht' => 120000,
            'discount_amount' => 12000,
            'promo_price_ht' => 108000,
            'vat_amount' => 20520,
            'total_ttc' => 128520,
            'users' => 3,
            'data_explorer_period' => 'Données 2024 et 2025',
            'pdf_filename' => 'offre-abix-pack-pro-2026.pdf',
            'pdf_path' => '/public/documents/offres/offre-abix-pack-pro-2026.pdf',
            'summary' => 'Tout le Pack Essentiel + fichier Excel structuré contenant les données brutes, licence ABIX Data Explorer (données 2024 et 2025) jusqu’à 3 utilisateurs d’une même entité, analyse des évolutions et visualisations interactives.'
        ],
        'corporate' => [
            'id' => 'corporate',
            'slug' => 'corporate',
            'name' => 'Pack Corporate Executive',
            'positioning' => 'Analyser, comparer et partager',
            'active' => true,
            'regular_price_ht' => 180000,
            'discount_amount' => 18000,
            'promo_price_ht' => 162000,
            'vat_amount' => 30780,
            'total_ttc' => 192780,
            'users' => 20,
            'data_explorer_period' => 'Données historiques 2022, 2023, 2024 et 2025',
            'pdf_filename' => 'offre-abix-pack-corporate-executive-2026.pdf',
            'pdf_path' => '/public/documents/offres/offre-abix-pack-corporate-executive-2026.pdf',
            'summary' => 'Tout le Pack Pro + licence ABIX Data Explorer Executive jusqu’à 20 utilisateurs, historique complet 2022–2025, profils bancaires 360°, Executive Dashboard & Key Insights, groupes de pairs & benchmarks avancés, rapports Executive PDF & exports Excel.'
        ]
    ]
];
