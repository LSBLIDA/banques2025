
  # ═══════════════════════════════════════════════════════════════════════════
  # 6. ANALYSE SECTORIELLE & MARCHÉ
  # ═══════════════════════════════════════════════════════════════════════════
  {
    'id': 'part-de-marche',
    'slug': 'part-de-marche',
    'term': {'fr': 'Part de Marché', 'en': 'Market Share', 'ar': 'الحصة السوقية'},
    'acronym': 'PDM',
    'aliases': {
      'fr': ['Poids de marché', 'Pénétration sectorielle', 'Part relative'],
      'en': ['Market Share', 'Market Weight', 'Volume Share'],
      'ar': ['الوزن السوقي', 'نسبة الاستحواذ على السوق']
    },
    'category': 'sector_analysis',
    'short_definition': {
      'fr': 'Pourcentage détenu par une banque sur un agrégat financier rapporté au total consolidé de la place bancaire.',
      'en': 'Percentage held by a single bank across an aggregate relative to total consolidated sector volume.',
      'ar': 'النسبة المئوية التي يستحوذ عليها البنك من مؤشر مالي مقارنة بإجمالي القطاع المصرفي المجمع.'
    },
    'detailed_definition': {
      'fr': 'La part de marché mesure le poids concurrentiel et la présence commerciale d\'un établissement sur un compartiment donné (Total Bilan, Dépôts, Crédits, PNB, etc.). Note méthodologique ABIX : La part de marché est un indicateur de taille relative et de poids sectoriel, et non une mesure intrinsèque de performance, d\'efficience ou de rentabilité (sens de lecture contextuel ◆).',
      'en': 'Measures commercial footprint and competitive positioning across financial aggregates (Assets, Deposits, Loans, NBI). ABIX note: Market share is an indicator of relative scale, not an intrinsic measure of profitability or efficiency (contextual reading direction ◆).',
      'ar': 'تقيس الوزن التنافسي والحضور التجاري للبنك (الميزانية، الودائع، القروض، الناتج البنكي). ملاحظة ABIX: الحصة السوقية تعبر عن الحجم النسبي ولا تمثل مقياساً لجودة الأداء أو الربحية (اتجاه قراءة سياقي ◆).'
    },
    'formula': 'Part de Marché = (Valeur de la Banque ÷ Total Consolidé du Secteur) × 100',
    'formula_latex': '\\text{Part de Marché}_i = \\frac{V_i}{\\sum_{k=1}^N V_k} \\times 100',
    'interpretation': {
      'fr': 'Une part de marché élevée confère des économies d\'échelle et un pouvoir de négociation, mais n\'implique pas automatiquement une rentabilité unitaire supérieure.',
      'en': 'High market share provides economies of scale, but does not inherently guarantee superior unit profitability.',
      'ar': 'تمنح الحصة السوقية المرتفعة وفورات حجم وقوة تفاوضية، لكنها لا تضمن تلقائياً مردودية ربحية أعلى.'
    },
    'example': {
      'fr': 'Données 2024, Édition ABIX 2025, Total Bilan (20 banques) : La première banque de la place détient environ 24,5 % de part de marché, et les 6 banques publiques cumulent près de 87 % du secteur.',
      'en': '2024 data, ABIX 2025 edition, Total Assets (20 banks): Market leader holds approx. 24.5% market share, with public banks aggregating ~87%.',
      'ar': 'بيانات 2024، إصدار ABIX 2025، إجمالي الميزانية (20 بنكاً): يستحوذ البنك الأول على حوالي 24.5%، والبنوك العمومية الستة على نحو 87%.'
    },
    'unit': '%',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'NONE',
    'regulatory_threshold': None,
    'abix_benchmark': None,
    'example_vintage': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques',
    'modules': ['Parts de Marché', 'Vue Secteur', 'Classements', 'Profil Banque', 'Concentration'],
    'related_terms': ['gain-perte-part-marche', 'indice-hhi', 'ratios-cr3-cr5', 'total-bilan'],
    'display_order': 43
  },
  {
    'id': 'gain-perte-part-marche',
    'slug': 'gain-perte-part-marche',
    'term': {'fr': 'Variation de Part de Marché (Gain / Perte)', 'en': 'Market Share Delta (Gain / Loss)', 'ar': 'تغير الحصة السوقية (ربح / خسارة الحصة)'},
    'acronym': 'DELTA_PDM',
    'aliases': {
      'fr': ['Delta de part de marché', 'Gain/perte de part', 'Évolution concurrentielle'],
      'en': ['Market Share Change', 'Market Share Delta', 'Share Shift'],
      'ar': ['تغير الحصة في السوق', 'كسب أو فقدان الحصة']
    },
    'category': 'sector_analysis',
    'short_definition': {
      'fr': 'Différence absolue en points de pourcentage entre la part de marché de l\'exercice t et celle de l\'exercice précédent t-1.',
      'en': 'Absolute difference in percentage points between market share at period t and period t-1.',
      'ar': 'الفارق المطلق بالنقاط المئوية بين الحصة السوقية في الدورة t والدورة السابقة t-1.'
    },
    'detailed_definition': {
      'fr': 'Mesure la dynamique concurrentielle nette et les transferts de parts de marché entre établissements. Un gain de part de marché signifie que la banque a crû plus rapidement que l\'ensemble du secteur sur l\'agrégat considéré (surperformance relative de croissance).',
      'en': 'Measures net competitive momentum and market share shifts among banks. A market share gain indicates the bank outgrew the overall sector on that metric.',
      'ar': 'يقيس الحركية التنافسية الصافية وتحولات الحصص السوقية. كسب حصة يعني نمو البنك بوتيرة أسرع من متوسط القطاع.'
    },
    'formula': 'Δ Part de Marché = Part de Marché_t − Part de Marché_t-1 (en points de pourcentage)',
    'formula_latex': '\\Delta \\text{Part de Marché} = \\text{Part}_t - \\text{Part}_{t-1} \\quad \\text{(pts)}',
    'interpretation': {
      'fr': 'Un gain de part régulier atteste d\'une conquête commerciale active. Une perte de part signale un essoufflement ou un repositionnement stratégique volontaire.',
      'en': 'Sustained share gains reflect aggressive commercial conquest. Share loss indicates commercial slowdown or deliberate de-risking.',
      'ar': 'كسب الحصة يعكس نمواً تجارياً نشطاً، بينما فقدانها يشير إلى تباطؤ أو إعادة تموضع استراتيجي.'
    },
    'example': {
      'fr': 'Données 2024 vs 2023, Édition ABIX 2025 : Une banque privée dont la part sur les crédits passe de 3,20 % à 3,55 % enregistre un gain net de +0,35 pt.',
      'en': '2024 vs 2023 data, ABIX 2025 edition: A bank expanding loan market share from 3.20% to 3.55% records a net gain of +0.35 pts.',
      'ar': 'بيانات 2024 مقارنة بـ 2023: بنك خاص ارتفعت حصته في القروض من 3.20% إلى 3.55% يسجل كسباً بـ +0.35 نقطة.'
    },
    'unit': 'pts de %',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'NONE',
    'regulatory_threshold': None,
    'abix_benchmark': None,
    'example_vintage': 'Données 2024 vs 2023, Édition ABIX 2025',
    'modules': ['Parts de Marché', 'Historique', 'Profil Banque', 'Vue Secteur'],
    'related_terms': ['part-de-marche', 'variation-annuelle-yoy'],
    'display_order': 44
  },
  {
    'id': 'secteur-public-prive',
    'slug': 'secteur-public-prive',
    'term': {'fr': 'Segmentation Public vs Privé', 'en': 'Public vs Private Sector Segmentation', 'ar': 'التقسيم بين القطاعين العام والخاص'},
    'acronym': 'PUB_PRIV',
    'aliases': {
      'fr': ['Banques publiques vs Banques privées', 'Répartition par statut', 'Structure actionnariale'],
      'en': ['Public vs Private Banks', 'Ownership Split', 'State vs Private Banking'],
      'ar': ['البنوك العمومية والخاصة', 'التقسيم حسب الملكية']
    },
    'category': 'sector_analysis',
    'short_definition': {
      'fr': 'Classification institutionnelle des banques selon la nature de leur actionnariat (banques à capitaux publics d\'État vs banques privées).',
      'en': 'Institutional classification of banks according to ownership structure (State-owned vs Private lenders).',
      'ar': 'التصنيف المؤسسي للبنوك حسب طبيعة المساهمين (بنوك عمومية مملوكة للدولة مقابل بنوك خاصة).'
    },
    'detailed_definition': {
      'fr': 'Distingue les 6 grandes banques commerciales publiques d\'État (plus la CNEP-Banque) des 14 banques privées (filiales de groupes internationaux, banques régionales et banques islamiques). Cette segmentation est centrale dans ABIX pour analyser les disparités de taille, de modèles de collecte et d\'orientation du crédit.',
      'en': 'Distinguishes the 6 major state-owned commercial banks (plus CNEP-Banque) from the 14 private lenders (international subsidiaries, regional and Islamic banks). Central to ABIX for analyzing structural divergences.',
      'ar': 'يميز بين البنوك التجارية العمومية للدولة (مع كناب-بنك) والبنوك الخاصة (فروع المجموعات الدولية والبنوك الإسلامية).'
    },
    'formula': 'Agrégat Public = Σ Banques Publiques | Agrégat Privé = Σ Banques Privées',
    'formula_latex': '\\text{Total} = \\sum \\text{Banques Publiques} + \\sum \\text{Banques Privées}',
    'interpretation': {
      'fr': 'Permet d\'isoler le poids prépondérant des banques publiques dans les volumes bilanciels (~87 %) et la dynamique de rentabilité relative des banques privées.',
      'en': 'Isolates the massive public bank balance sheet dominance (~87%) alongside private banks\' relative profitability dynamism.',
      'ar': 'يتيح عزل الوزن المهيمن للبنوك العمومية في الميزانية (~87%) ومقارنة ديناميكية ربحية البنوك الخاصة.'
    },
    'example': {
      'fr': 'Données 2024, Édition ABIX 2025 (20 banques) : Le secteur public détient 86,8 % des actifs et 88,4 % des dépôts, tandis que le secteur privé génère plus de 28 % du résultat net global.',
      'en': '2024 data, ABIX 2025 edition (20 banks): Public sector holds 86.8% of assets and 88.4% of deposits, while private banks generate over 28% of total net income.',
      'ar': 'بيانات 2024، إصدار ABIX 2025: يستحوذ القطاع العام على 86.8% من الأصول و88.4% من الودائع، بينما يحقق القطاع الخاص أكثر من 28% من صافي الأرباح.'
    },
    'unit': '% / Mds DZD',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'NONE',
    'regulatory_threshold': None,
    'abix_benchmark': None,
    'example_vintage': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques',
    'modules': ['Public vs Privé', 'Vue Secteur', 'Comparateur', 'Parts de Marché'],
    'related_terms': ['total-bilan', 'part-de-marche', 'perimetre-constant'],
    'display_order': 45
  },
  {
    'id': 'perimetre-constant',
    'slug': 'perimetre-constant',
    'term': {'fr': 'Périmètre Constant vs Périmètre Observé', 'en': 'Constant Scope vs Observed Scope', 'ar': 'النطاق الثابت مقابل النطاق المرصود'},
    'acronym': 'SCOPE',
    'aliases': {
      'fr': ['Périmètre d\'analyse', 'Échantillon constant', 'Base homogène pluriannuelle'],
      'en': ['Constant Scope', 'Like-for-like scope', 'Observed Sample'],
      'ar': ['نطاق العينة الثابتة', 'العينة المرصودة']
    },
    'category': 'sector_analysis',
    'short_definition': {
      'fr': 'Méthode de filtrage garantissant que seules les banques ayant publié des comptes ininterrompus sur toute la période sont retenues pour les calculs pluriannuels.',
      'en': 'Filtering method ensuring only banks with uninterrupted financial reporting across the full timeline are included in multi-year aggregates.',
      'ar': 'منهجية تصفية تضمن احتساب البنوك التي نشرت بيانات متواصلة دون انقطاع عبر كامل الفترة الزمنية للتحليل.'
    },
    'detailed_definition': {
      'fr': 'Dans ABIX Data Explorer, deux modes de périmètre sont disponibles : 1) Périmètre Observé (scope_mode = observed) : inclut toutes les banques ayant des données disponibles pour l\'exercice sélectionné (ex: 20 banques en 2025, 21 banques en 2026) ; 2) Périmètre Constant (scope_mode = constant) : retient exclusivement les banques présentes sans interruption du début à la fin de la fenêtre d\'analyse, éliminant les biais d\'entrée/sortie d\'établissements dans les calculs de CAGR et de Base 100.',
      'en': 'ABIX offers two scope modes: 1) Observed Scope (all reporting banks for a given year); 2) Constant Scope (strictly banks with complete data from start to end year), eliminating distortion in CAGR and Base 100 metrics.',
      'ar': 'يوفر ABIX نمطين للنطاق: 1) النطاق المرصود (كافة البنوك المتوفرة في سنة معينة)؛ 2) النطاق الثابت (البنوك المتواجدة باستمرار طوال فترة التحليل)، مما يحيد أثر دخول أو خروج البنوك في حساب CAGR ومؤشر الأساس 100.'
    },
    'formula': 'Périmètre Constant = { Banques présentes sur chaque année de [Année_début ; Année_fin] }',
    'formula_latex': '\\text{Périmètre Constant} = \\{ i \\in \\text{Banques} \\mid \\forall t \\in [t_0, t_n], V_{i,t} \\neq \\emptyset \\}',
    'interpretation': {
      'fr': 'Indispensable pour l\'exactitude des séries temporelles, des taux de croissance composés et des comparaisons pluriannuelles rigoureuses.',
      'en': 'Essential for mathematical integrity in multi-year trend analysis, CAGR, and indexed trajectories.',
      'ar': 'ضروري لضمان دقة السلاسل الزمنية ومعدلات النمو المركبة والمقارنات متعددة السنوات.'
    },
    'example': {
      'fr': 'Données 2020-2024, Édition ABIX 2025 : L\'analyse à périmètre constant sur 5 ans retient les 19 banques actives sans interruption sur la période, garantissant un CAGR sectoriel 100 % cohérent.',
      'en': '2020-2024 data, ABIX 2025 edition: 5-year constant scope retains the 19 continuously active banks, ensuring 100% consistent sector CAGR.',
      'ar': 'بيانات 2020-2024: يعتمد النطاق الثابت على 19 بنكاً متواجداً باستمرار طوال السنوات الخمس لضمان دقة معدل النمو المركب.'
    },
    'unit': 'banques (effectif)',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'NONE',
    'regulatory_threshold': None,
    'abix_benchmark': None,
    'example_vintage': 'Données 2020-2024, Édition ABIX 2025',
    'modules': ['Historique', 'Séries Temporelles', 'Scores ABIX (Dynamique)', 'Vue Secteur'],
    'related_terms': ['taux-croissance-annuel-compose', 'base-100', 'part-de-marche'],
    'display_order': 46
  }
