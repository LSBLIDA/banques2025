
  # ═══════════════════════════════════════════════════════════════════════════
  # 8. MÉTHODOLOGIE & CADRE ABIX
  # ═══════════════════════════════════════════════════════════════════════════
  {
    'id': 'cadre-4d-abix',
    'slug': 'cadre-4d-abix',
    'term': {'fr': 'Cadre d\'Évaluation 4D ABIX', 'en': 'ABIX 4D Assessment Framework', 'ar': 'إطار التقييم رباعي الأبعاد ABIX 4D'},
    'acronym': '4D_ABIX',
    'aliases': {
      'fr': ['Modèle 4D', 'Scores dimensionnels ABIX', 'Matrice d\'évaluation 4D', 'Architecture multidimensionnelle'],
      'en': ['4D Framework', 'ABIX 4D Scores', 'Multidimensional Evaluation Model'],
      'ar': ['نموذج 4D', 'المحاور الأربعة لـ ABIX', 'التقييم متعدد الأبعاد']
    },
    'category': 'abix_framework',
    'short_definition': {
      'fr': 'Architecture méthodologique d\'ABIX structurée autour de 4 piliers d\'analyse indépendants : Rentabilité, Dynamique & Croissance, Efficience, et Capitalisation.',
      'en': 'Methodological architecture structured across 4 independent analytical pillars: Profitability, Growth & Momentum, Efficiency, and Capitalization.',
      'ar': 'الهيكل المنهجي المعتمد في ABIX والمبني على 4 ركائز تحليلية مستقلة: المردودية، النمو والحركية، الكفاءة التشغيلية، والرسملة.'
    },
    'detailed_definition': {
      'fr': 'Le cadre 4D ABIX analyse le profil global de chaque banque à travers quatre dimensions équilibrées : 1) Rentabilité (ROE, ROA, Marge nette sur PNB - poids 33,3 % chacun) ; 2) Dynamique & Croissance (CAGR pluriannuel sur Total Bilan, Crédits, PNB et Résultat Net - poids 25 % chacun) ; 3) Efficience Opérationnelle (Coefficient d\'exploitation et Conversion RBE en Résultat Net - poids 50 % chacun) ; 4) Capitalisation Comptable (Fonds Propres / Bilan et Fonds Propres / Prêts - poids 50 % chacun). Règle méthodologique fondamentale ABIX : Le cadre 4D privilégie une lecture multidimensionnelle afin d\'éviter qu\'un score unique composite ne masque les forces et faiblesses spécifiques d\'une banque. ABIX ne génère pas de score unique monolithique artificiel.',
      'en': 'ABIX 4D Framework assesses banks across four pillars: 1) Profitability (ROE, ROA, Net Margin - 33.3% each); 2) Growth & Momentum (multi-year CAGR across Assets, Loans, NBI, Profit - 25% each); 3) Operational Efficiency (Cost-to-Income, GOI Conversion - 50% each); 4) Accounting Capitalization (Equity/Assets, Equity/Loans - 50% each). Fundamental rule: 4D Framework enforces multidimensional profiling to prevent a single composite score from concealing specific bank vulnerabilities. ABIX explicitly avoids monolithic single ratings.',
      'ar': 'يحلل إطار 4D أداء البنك عبر 4 محاور: 1) المردودية (ROE، ROA، هامش الربح الصافي - 33.3% لكل منها)؛ 2) النمو والحركية (معدل CAGR للميزانية، القروض، الناتج البنكي والربح - 25% لكل منها)؛ 3) الكفاءة التشغيلية (معامل الاستغلال ومعدل التحويل - 50% لكل منها)؛ 4) الرسملة المحاسبية (الأموال الخاصة للميزانية وللقروض - 50% لكل منها). قاعدة ABIX المنهجية: يرفض النظام إصدار تنقيط أحادي مركب لتفادي طمس نقاط القوة والضعف الخاصة بكل بنك.'
    },
    'formula': '4 Scores indépendants (0-100) : Score_Rentabilité + Score_Croissance + Score_Efficience + Score_Capitalisation',
    'formula_latex': '\\text{Profil 4D} = \\{ \\text{Score}_{\\text{Rentabilité}}, \\text{Score}_{\\text{Croissance}}, \\text{Score}_{\\text{Efficience}}, \\text{Score}_{\\text{Capitalisation}} \\}',
    'interpretation': {
      'fr': 'Permet une cartographie fine en radar ou en matrice de positionnement pour identifier instantanément les déséquilibres (ex: forte croissance mais faible capitalisation).',
      'en': 'Enables radar mapping and positioning matrices to instantly spot structural imbalances (e.g. rapid growth with lagging capital cushion).',
      'ar': 'يتيح رسم خريطة رادارية لتحديد نقاط التوازن أو الاختلال الهيكلي فوراً (مثل نمو متسارع مع رسملة ضعيفة).'
    },
    'example': {
      'fr': 'Données 2024, Édition ABIX 2025 : Une banque privée de premier plan affichant des scores de Rentabilité (88/100) et d\'Efficience (92/100) très élevés, combinés à un score de Croissance (64/100) plus modéré.',
      'en': '2024 data, ABIX 2025 edition: A leading private lender exhibiting top Profitability (88/100) and Efficiency (92/100) combined with moderate Growth (64/100).',
      'ar': 'بيانات 2024، إصدار ABIX 2025: بنك خاص رائد يحقق نتائج ممتازة في المردودية (88/100) والكفاءة (92/100) مع نمو معتدل (64/100).'
    },
    'unit': 'scores dimensionnels (0-100)',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'ABIX_BENCHMARK',
    'regulatory_threshold': None,
    'abix_benchmark': 'Lecture multidimensionnelle par pilier (sans note composite globale artificielle)',
    'example_vintage': 'Données 2024, Édition ABIX 2025',
    'modules': ['Scores ABIX (4D)', 'Profils Multidimensionnels', 'Matrice 4 Quadrants', 'Executive Dashboard'],
    'related_terms': ['normalisation-min-max', 'scanning-deterministe'],
    'display_order': 50
  },
  {
    'id': 'scanning-deterministe',
    'slug': 'scanning-deterministe',
    'term': {'fr': 'Scanning Déterministe & Système d\'Alertes', 'en': 'Deterministic Rule-Based Scanning', 'ar': 'المسح الحتمي ونظام التنبيهات المنهجي'},
    'acronym': 'SCAN',
    'aliases': {
      'fr': ['Moteur d\'alertes déterministe', 'Scanning financier auditable', 'Règles de détection d\'anomalies'],
      'en': ['Rule-Based Scanning', 'Deterministic Alerts', 'Financial Outlier Scanning'],
      'ar': ['المسح المالي الحتمي', 'نظام التنبيهات المؤتمت']
    },
    'category': 'abix_framework',
    'short_definition': {
      'fr': 'Moteur d\'audit automatisé et 100 % traçable identifiant les ruptures de tendance, les divergences bilantielles et les écarts significatifs aux benchmarks.',
      'en': 'Automated, 100% traceable audit engine identifying trend breaks, balance sheet divergences, and material benchmark gaps.',
      'ar': 'محرك تدقيق مؤتمت وقابل للتتبع بالكامل يرصد الانقطاعات في المسار والفجوات مقارنة بالمعايير المرجعية.'
    },
    'detailed_definition': {
      'fr': 'Le scanning déterministe applique des règles arithmétiques explicites et versionnées (version 1.0) sur les données financières réelles, sans modèle boîte noire. Règles de détection implémentées dans le code ABIX : 1) Écart significatif au benchmark : différence absolue ≥ 5,0 points de pourcentage ; 2) Rupture de variation annuelle : variation YoY ≥ 15 % (ou variation de ratio ≥ 5,0 pts) ; 3) Changement de quartile dimensionnel sur les scores 4D (variation de score ≥ 10 pts) ; 4) Alertes de divergence d\'activité : a) Divergence Dépôts / Crédits (croissance dépôts - croissance crédits ≥ 10 pts) ; b) Divergence PNB / Résultat Net (PNB en hausse ≥ +15 % avec RN en baisse ≤ -10 %) ; c) Croissance d\'activité sans rentabilité (Bilan ≥ +10 % avec ROE en baisse ≤ -2 pts) ; d) Pression des provisions (hausse des dotations ≥ +30 %).',
      'en': 'Deterministic scanning applies transparent, versioned rules (v1.0) directly to financial metrics without black-box modeling. Implemented rules in ABIX: 1) Benchmark gap: absolute gap >= 5.0 pts; 2) Notable annual variation: YoY change >= 15% (or ratio point change >= 5.0 pts); 3) Dimension quartile shift (score change >= 10 pts); 4) Activity divergence alerts: a) Deposits vs Loans growth gap >= 10 pts; b) NBI up >= 15% with Net Profit down <= -10%; c) Assets up >= 10% with ROE down <= -2 pts; d) Net provision surge >= +30%.',
      'ar': 'يطبق المسح الحتمي قواعد حسابية شفافة وموثقة (الإصدار 1.0) دون نماذج غامضة. القواعد المطبقة في ABIX: 1) فجوة المعيار المرجعي: فارق مطلق >= 5.0 نقاط؛ 2) التغير السنوي الملحوظ: تغير سنوي >= 15%؛ 3) تغير الربيع التقييمي (تغير النتيجة >= 10 نقاط)؛ 4) تنبيهات التباعد الهيكلي (الودائع/القروض، الناتج البنكي/الربح الصافي، تضخم المخصصات >= +30%).'
    },
    'formula': 'Règles déterministes d\'alerte : |Δ Ratio| ≥ 5 pts | YoY ≥ 15 % | Δ Dépôts − Δ Crédits ≥ 10 pts | Δ Provisions ≥ 30 %',
    'formula_latex': '\\text{Alertes} = \\{ f(X_t, X_{t-1}, \\text{Benchmark}) \\mid \\text{Conditions Arithmétiques Déterministes v1.0} \\}',
    'interpretation': {
      'fr': 'Garantit une auditabilité intégrale des constats de gestion restitués dans les dashboards exécutifs et les fiches de synthèse.',
      'en': 'Guarantees complete mathematical auditability of analytical insights displayed in executive dashboards and bank profiles.',
      'ar': 'يضمن الشفافية والتدقيق الرياضي الكامل لكافة الملاحظات التحليلية في لوحات القيادة التنفيذية.'
    },
    'example': {
      'fr': 'Données 2024, Édition ABIX 2025 : Génération automatique d\'une alerte de divergence pour une banque dont les dépôts ont progressé de +18,5 % tandis que les crédits n\'ont cru que de +4,2 % (écart de divergence = 14,3 pts ≥ seuil de 10 pts).',
      'en': '2024 data, ABIX 2025 edition: Automatic divergence alert triggered for a bank whose deposits grew +18.5% while loans only expanded +4.2% (gap = 14.3 pts >= 10 pts threshold).',
      'ar': 'بيانات 2024، إصدار ABIX 2025: إطلاق تنبيه تلقائي لبنك نمت ودائعه بـ +18.5% بينما نمت قروضه بـ +4.2% فقط (فارق 14.3 نقطة >= عتبة 10 نقاط).'
    },
    'unit': 'règles & alertes',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'ABIX_BENCHMARK',
    'regulatory_threshold': None,
    'abix_benchmark': 'Règles arithmétiques de détection versionnées v1.0 (100 % traçable)',
    'example_vintage': 'Données 2024, Édition ABIX 2025',
    'modules': ['Executive Dashboard', 'Insights & Alertes', 'Profil Banque (Synthèse)'],
    'related_terms': ['cadre-4d-abix', 'variation-annuelle-yoy'],
    'display_order': 51
  },
  {
    'id': 'barometre-ebanking',
    'slug': 'barometre-ebanking',
    'term': {'fr': 'Baromètre E-Banking & Digitalisation', 'en': 'E-Banking & Digital Transformation Barometer', 'ar': 'مؤشر الخدمات المصرفية الرقمية (E-Banking)'},
    'acronym': 'EBANK',
    'aliases': {
      'fr': ['Baromètre digital', 'Maturité digitale bancaire', 'Score E-Banking ABIX'],
      'en': ['E-Banking Barometer', 'Digital Banking Index', 'Online Banking Score'],
      'ar': ['مقياس الرقمنة المصرفية', 'مؤشر الخدمات البنكية الإلكترونية']
    },
    'category': 'abix_framework',
    'short_definition': {
      'fr': 'Référentiel d\'évaluation de la maturité digitale des banques basé sur l\'audit des applications mobiles, plateformes web et services de paiement électronique.',
      'en': 'Benchmarking framework evaluating bank digital maturity through auditing mobile apps, web platforms, and e-payment services.',
      'ar': 'مرجع لتقييم النضج الرقمي للبنوك من خلال تدقيق تطبيقات الهاتف، المنصات الإلكترونية وخدمات الدفع الإلكتروني.'
    },
    'detailed_definition': {
      'fr': 'Le Baromètre E-Banking ABIX est un instrument d\'évaluation indépendant mesurant l\'offre de services digitaux des banques de la place algérienne. Il analyse plus de 40 critères regroupés en dimensions clés : 1) Ergonomie et fonctionnalités de l\'application mobile (authentification biométrique, virements instantanés, gestion de cartes) ; 2) Banque en ligne et portail web ; 3) Moyens de paiement électronique (CIB, Edahabia, paiement sans contact, e-commerce) ; 4) Services innovants et conformité réglementaire.',
      'en': 'The ABIX E-Banking Barometer is an independent benchmarking tool evaluating digital banking across Algeria. It audits over 40 criteria spanning mobile app functionality, online banking, e-payment capabilities, and UX design.',
      'ar': 'يقيم بارومتر الخدمات المصرفية الإلكترونية عروض الرقمنة في الساحة المصرفية عبر أكثر من 40 معياراً تشمل تطبيقات الهاتف، بوابات الإنترنت ووسائل الدفع الإلكتروني.'
    },
    'formula': 'Score E-Banking = Σ (Pondération_dimension × Score_dimension) (sur une échelle normalisée de 0 à 100)',
    'formula_latex': '\\text{Score E-Banking} = \\sum_{k=1}^m w_k \\times S_k \\quad \\text{avec } \\sum w_k = 1',
    'interpretation': {
      'fr': 'Un score élevé reflète une offre digitale mature, fluide et sécurisée répondant aux attentes des usagers particuliers et entreprises.',
      'en': 'A top score reflects a mature, seamless, and secure digital banking offering for retail and corporate clients.',
      'ar': 'تدل النتيجة المرتفعة على عرض رقمي متقدم وسلس وآمن يلبي تطلعات الأفراد والمؤسسات.'
    },
    'example': {
      'fr': 'Édition Baromètre ABIX 2025 : Scores sectoriels variant de 32/100 (offre basique) à plus de 86/100 pour les banques leaders de la digitalisation en Algérie.',
      'en': 'ABIX Barometer 2025 edition: Bank scores ranging from 32/100 (basic features) to over 86/100 for leading digital pioneers.',
      'ar': 'إصدار بارومتر ABIX 2025: تتراوح النتائج من 32/100 (خدمات أساسية) إلى أكثر من 86/100 للبنوك الرائدة في التحول الرقمي.'
    },
    'unit': 'score (0 à 100)',
    'performance_direction': 'higher_is_better',
    'higher_is_better': True,
    'threshold_type': 'ABIX_BENCHMARK',
    'regulatory_threshold': None,
    'abix_benchmark': 'Score 0-100 normalisé sur grille multicritère auditée',
    'example_vintage': 'Édition Baromètre ABIX 2025',
    'modules': ['Baromètre E-Banking', 'Profil Banque (Volet Digital)', 'Classements Digitaux'],
    'related_terms': ['cadre-4d-abix'],
    'display_order': 52
  }
]
