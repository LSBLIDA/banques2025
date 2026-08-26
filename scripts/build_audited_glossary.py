# -*- coding: utf-8 -*-
import json, os, sys

CATEGORIES = {
    'financial_indicators': {
        'id': 'financial_indicators',
        'name': {'fr': 'Indicateurs financiers & Bilan', 'en': 'Financial & Balance Sheet Indicators', 'ar': 'المؤشرات المالية والميزانية'},
        'icon': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    },
    'ratios_profitability': {
        'id': 'ratios_profitability',
        'name': {'fr': 'Ratios & Rentabilité', 'en': 'Ratios & Profitability', 'ar': 'النسب المالية والمردودية'},
        'icon': 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
    },
    'risk_solvency': {
        'id': 'risk_solvency',
        'name': {'fr': 'Risque, Solvabilité & Prudence', 'en': 'Risk, Solvency & Prudential', 'ar': 'المخاطر، الملاءة المالية والحذر'},
        'icon': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
    },
    'liquidity_intermediation': {
        'id': 'liquidity_intermediation',
        'name': {'fr': 'Liquidité & Intermédiation', 'en': 'Liquidity & Intermediation', 'ar': 'السيولة والوساطة المصرفية'},
        'icon': 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
    },
    'statistics_methods': {
        'id': 'statistics_methods',
        'name': {'fr': 'Statistiques & Méthodes quantitatives', 'en': 'Statistics & Quantitative Methods', 'ar': 'الإحصاء والأساليب الكمية'},
        'icon': 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'
    },
    'sector_analysis': {
        'id': 'sector_analysis',
        'name': {'fr': 'Analyse sectorielle & Marché', 'en': 'Sector & Market Analysis', 'ar': 'التحليل القطاعي وديناميكية السوق'},
        'icon': 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z'
    },
    'concentration_market': {
        'id': 'concentration_market',
        'name': {'fr': 'Concentration & Concurrence', 'en': 'Concentration & Competition', 'ar': 'التركيز والمنافسة'},
        'icon': 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
    },
    'abix_framework': {
        'id': 'abix_framework',
        'name': {'fr': 'Méthodologie & Cadre ABIX', 'en': 'ABIX Methodology & Framework', 'ar': 'منهجية وإطار مؤشر ABIX'},
        'icon': 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    }
}
print('Categories configured')
