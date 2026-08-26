
  # ═══════════════════════════════════════════════════════════════════════════
  # 7. CONCENTRATION & CONCURRENCE
  # ═══════════════════════════════════════════════════════════════════════════
  {
    'id': 'indice-hhi',
    'slug': 'indice-hhi',
    'term': {'fr': 'Indice de Herfindahl-Hirschman (HHI)', 'en': 'Herfindahl-Hirschman Index (HHI)', 'ar': 'مؤشر هيرفيندال-هيرشمان للتركيز (HHI)'},
    'acronym': 'HHI',
    'aliases': {
      'fr': ['Indice HHI', 'Mesure de concentration industrielle', 'Indice de Hirschman'],
      'en': ['Herfindahl Index', 'HHI', 'Market Concentration Index'],
      'ar': ['مؤشر HHI', 'مقياس التركيز السوقي']
    },
    'category': 'concentration_market',
    'short_definition': {
      'fr': 'Somme des carrés des parts de marché de tous les établissements, mesurant l\'intensité de la concentration du secteur bancaire sur une échelle de 0 à 10 000 points.',
      'en': 'Sum of squared market shares of all operating banks, measuring sector concentration on a 0 to 10,000 scale.',
      'ar': 'مجموع مربعات الحصص السوقية لكافة البنوك، ويقيس شدة التركيز في القطاع المصرفي على مقياس من 0 إلى 10,000 نقطة.'
    },
    'detailed_definition': {
      'fr': 'L\'indice HHI accorde un poids proportionnellement plus lourd aux banques détenant les plus fortes parts de marché. Grille de lecture concurrentielle de référence (repères indicatifs du Département de la Justice DOJ / FTC) : 1) HHI < 1 000 : Marché non ou faiblement concentré (diversifié) ; 2) 1 000 ≤ HHI ≤ 1 800 : Concentration modérée ; 3) HHI > 1 800 : Marché fortement concentré. Note méthodologique obligatoire ABIX : Ces seuils constituent une grille d\'analyse concurrentielle standardisée. Ils ne constituent pas une qualification juridique automatique du marché bancaire algérien.',
      'en': 'HHI squares market shares, placing greater weight on top banks. Standard competitive reading grid (indicative DOJ/FTC benchmarks): 1) HHI < 1,000: Unconcentrated market; 2) 1,000 <= HHI <= 1,800: Moderately concentrated; 3) HHI > 1,800: Highly concentrated. Mandatory ABIX note: These thresholds constitute a standardized competitive analytical grid and do not represent an automatic legal qualification of the Algerian banking market.',
      'ar': 'يقيس HHI تركيز السوق بتربيع الحصص السوقية. شبكة القراءة التنافسية المعيارية: 1) أقل من 1,000: سوق غير مركز أو ضعيف التركيز؛ 2) من 1,000 إلى 1,800: تركيز معتدل؛ 3) أكثر من 1,800: تركيز مرتفع. ملاحظة ABIX الإلزامية: تمثل هذه العتبات شبكة قراءة اقتصادية استرشادية ولا تشكل توصيفاً قانونياً تلقائياً للسوق المصرفية الجزائرية.'
    },
    'formula': 'HHI = Σ (Part de Marché_i)² (pour i = 1 à N banques, parts exprimées en %)',
    'formula_latex': '\\text{HHI} = \\sum_{i=1}^N (s_i)^2 \\quad \\text{avec } s_i \\text{ en \\%}',
    'interpretation': {
      'fr': 'Un HHI élevé (> 1 800) traduit une structure oligopolistique où un petit nombre d\'acteurs domine la collecte des dépôts et la distribution des crédits.',
      'en': 'A high HHI (> 1,800) characterizes an oligopolistic structure where a small group of banks commands the majority of deposits and lending.',
      'ar': 'يدل مؤشر HHI المرتفع (> 1,800) على بنية سوقية احتكارية تسيطر فيها قلة من البنوك على معظم الودائع والقروض.'
    },
    'example': {
      'fr': 'Données 2024, Édition ABIX 2025, Total Bilan (20 banques) : L\'indice HHI du total bilan s\'établit à environ 1 920 points, caractérisant un marché fortement concentré selon les repères internationaux.',
      'en': '2024 data, ABIX 2025 edition, Total Assets (20 banks): Sector HHI stands at approx. 1,920 points, characterizing a highly concentrated market by international standards.',
      'ar': 'بيانات 2024، إصدار ABIX 2025، إجمالي الميزانية (20 بنكاً): يبلغ مؤشر HHI حوالي 1,920 نقطة، مما يعكس تركيزاً مرتفعاً للسوق.'
    },
    'unit': 'points (0 à 10 000)',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'MARKET_REFERENCE',
    'regulatory_threshold': None,
    'abix_benchmark': 'HHI < 1000: Peu concentré | 1000-1800: Modéré | > 1800: Fortement concentré (Grille concurrentielle indicative)',
    'example_vintage': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques',
    'modules': ['Concentration & Concurrence', 'Vue Secteur', 'Parts de Marché'],
    'related_terms': ['ratios-cr3-cr5', 'nombre-effectif-banques', 'part-de-marche'],
    'display_order': 47
  },
  {
    'id': 'ratios-cr3-cr5',
    'slug': 'ratios-cr3-cr5',
    'term': {'fr': 'Ratios de Concentration (CR3 & CR5)', 'en': 'Concentration Ratios (CR3 & CR5)', 'ar': 'نسب التركيز المصرفي (CR3 و CR5)'},
    'acronym': 'CR3_CR5',
    'aliases': {
      'fr': ['Ratio de concentration des 3 premières banques', 'Ratio CR5', 'Part cumulée du Top 3 / Top 5', 'Concentration Ratio'],
      'en': ['Concentration Ratio 3', 'CR3', 'CR5', 'Top 3 / Top 5 Share'],
      'ar': ['نسبة تركيز أكبر 3 بنوك', 'نسبة تركيز أكبر 5 بنوك', 'حصة الخمسة الكبار']
    },
    'category': 'concentration_market',
    'short_definition': {
      'fr': 'Part de marché cumulée détenue par les 3 (CR3) ou 5 (CR5) plus grands établissements bancaires sur un agrégat financier.',
      'en': 'Cumulative market share command held by the top 3 (CR3) or top 5 (CR5) leading banks on a financial metric.',
      'ar': 'الحصة السوقية التراكمية التي تستحوذ عليها أكبر 3 بنوك (CR3) أو أكبر 5 بنوك (CR5) من مؤشر مالي معين.'
    },
    'detailed_definition': {
      'fr': 'Les ratios de concentration CRk mesurent l\'emprise conjointe des plus grands acteurs sur le marché. Formule générale : CR3 = somme des parts de marché des 3 premières banques du classement pour l\'agrégat et l\'année considérés ; CR5 = somme des parts de marché des 5 premières banques. Note méthodologique ABIX : Le classement des banques est dynamique et recalculé pour chaque exercice et pour chaque agrégat (Total Bilan, Dépôts, Crédits, PNB, etc.). Les noms d\'établissements n\'apparaissent que dans le cadre d\'exemples datés.',
      'en': 'Concentration ratios measure top-tier market command. General definition: CR3 = sum of market shares of the top 3 ranked banks; CR5 = sum of market shares of the top 5 banks for the selected metric and year. ABIX note: Bank rankings are dynamic and computed per year and indicator. Specific bank names appear exclusively in dated historical examples.',
      'ar': 'تقيس نسب التركيز CRk الهيمنة المجمعة للبنوك الكبرى. التعريف العام: CR3 = مجموع حصص أكبر 3 بنوك في الترتيب؛ CR5 = مجموع حصص أكبر 5 بنوك للمؤشر والسنة المحددة. ملاحظة ABIX: الترتيب ديناميكي ويُعاد حسابه لكل دورة ومؤشر.'
    },
    'formula': 'CR3 = Part_1 + Part_2 + Part_3 | CR5 = Part_1 + Part_2 + Part_3 + Part_4 + Part_5 (parts triées par ordre décroissant)',
    'formula_latex': '\\text{CR}_k = \\sum_{i=1}^k \\text{Part}_{(i)} \\quad (k = 3, 5)',
    'interpretation': {
      'fr': 'Un CR3 > 50 % ou un CR5 > 70 % caractérise un marché bancaire fortement dominé par un groupe restreint de banques leaders.',
      'en': 'CR3 > 50% or CR5 > 70% characterizes a market heavily dominated by a tight leadership cohort.',
      'ar': 'تجاوز CR3 لـ 50% أو CR5 لـ 70% يعكس هيمنة قوية لكبار الفاعلين على السوق.'
    },
    'example': {
      'fr': 'Exemple daté — Total Bilan 2024, Édition ABIX 2025 (20 banques) : Les 3 premières banques (BEA, BNA, CPA) totalisent un CR3 de 52,4 %, et les 5 premières (avec BADR et BDL) un CR5 de 74,8 %.',
      'en': 'Dated example — Total Assets 2024, ABIX 2025 edition (20 banks): Top 3 banks (BEA, BNA, CPA) aggregate a CR3 of 52.4%, and top 5 (with BADR and BDL) reach a CR5 of 74.8%.',
      'ar': 'مثال مؤرخ — إجمالي الميزانية 2024، إصدار ABIX 2025 (20 بنكاً): حققت أكبر 3 بنوك (BEA، BNA، CPA) نسبة CR3 قدرها 52.4%، وأكبر 5 بنوك CR5 قدرها 74.8%.'
    },
    'unit': '%',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'MARKET_REFERENCE',
    'regulatory_threshold': None,
    'abix_benchmark': 'CR3 > 50 %: Forte emprise oligopolistique | CR5 > 70 %: Marché très concentré',
    'example_vintage': 'Exemple daté — Données 2024, Édition ABIX 2025, Total Bilan (20 banques)',
    'modules': ['Concentration & Concurrence', 'Parts de Marché', 'Vue Secteur'],
    'related_terms': ['indice-hhi', 'nombre-effectif-banques', 'part-de-marche'],
    'display_order': 48
  },
  {
    'id': 'nombre-effectif-banques',
    'slug': 'nombre-effectif-banques',
    'term': {'fr': 'Nombre Effectif de Banques (10 000 / HHI)', 'en': 'Effective Number of Banks (Equivalent Competitors)', 'ar': 'العدد الفعلي للبنوك (المنافسون المكافئون)'},
    'acronym': 'NEFF',
    'aliases': {
      'fr': ['Nombre de banques équivalentes', 'Indice d\'équivalence concurrentielle', 'Inverse normalisé du HHI'],
      'en': ['Effective Number of Banks', 'Equivalent Competitors', 'HHI Inverted Number'],
      'ar': ['العدد المكافئ للبنوك', 'المنافسون الفعليون في السوق']
    },
    'category': 'concentration_market',
    'short_definition': {
      'fr': 'Nombre théorique de banques de tailles strictement égales qui généreraient le même niveau de concentration HHI que celui observé sur le marché.',
      'en': 'Theoretical number of equal-sized banks that would generate the same HHI concentration level observed in the market.',
      'ar': 'العدد النظري للبنوك المتساوية الحجم تماماً والتي تولد نفس مستوى التركيز HHI المرصود في السوق.'
    },
    'detailed_definition': {
      'fr': 'Le nombre effectif de banques est calculé en divisant 10 000 par l\'indice HHI. Il traduit la concentration sous une forme intuitive : sur une place comptant 20 banques réelles, si le HHI vaut 2 000, le marché fonctionne en réalité avec l\'équivalent concurrentiel de seulement 5 banques de tailles identiques.',
      'en': 'Calculated as 10,000 / HHI. It translates concentration into intuitive terms: in a market with 20 nominal banks, an HHI of 2,000 implies the competitive equivalent of only 5 equal-sized competitors.',
      'ar': 'يُحسب بقسمة 10,000 على مؤشر HHI. يقدم قراءة بديهية للتركيز: في سوق يضم 20 بنكاً، إذا كان HHI يساوي 2,000، فإن السوق يعمل كأنه يضم 5 بنوك متساوية الحجم فقط.'
    },
    'formula': 'Nombre Effectif de Banques = 10 000 ÷ HHI',
    'formula_latex': 'N_{\\text{eff}} = \\frac{10\\,000}{\\text{HHI}}',
    'interpretation': {
      'fr': 'Plus le nombre effectif est éloigné du nombre réel de banques, plus l\'asymétrie concurrentielle et la domination par les grands acteurs sont prononcées.',
      'en': 'The wider the gap between nominal and effective bank counts, the more pronounced the market asymmetry and top-bank dominance.',
      'ar': 'كلما اتسعت الفجوة بين العدد الفعلي والعدد الحقيقي للبنوك، دل ذلك على تباين تنافسي وهيمنة للبنوك الكبرى.'
    },
    'example': {
      'fr': 'Données 2024, Édition ABIX 2025, Total Bilan (20 banques réelles) : Avec un HHI de 1 920 points, le nombre effectif de banques est de 5,2 banques équivalentes.',
      'en': '2024 data, ABIX 2025 edition, Total Assets (20 nominal banks): With an HHI of 1,920, the effective competitor count is 5.2 equivalent banks.',
      'ar': 'بيانات 2024، إصدار ABIX 2025 (20 بنكاً): مع مؤشر HHI قدره 1,920 نقطة، يبلغ العدد الفعلي 5.2 بنكاً مكافئاً.'
    },
    'unit': 'banques équivalentes',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'NONE',
    'regulatory_threshold': None,
    'abix_benchmark': None,
    'example_vintage': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques',
    'modules': ['Concentration & Concurrence', 'Vue Secteur'],
    'related_terms': ['indice-hhi', 'ratios-cr3-cr5'],
    'display_order': 49
  }
