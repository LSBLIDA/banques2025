
  {
    'id': 'taux-croissance-annuel-compose',
    'slug': 'taux-croissance-annuel-compose',
    'term': {'fr': 'Taux de Croissance Annuel Composé (CAGR / TCAC)', 'en': 'Compound Annual Growth Rate (CAGR)', 'ar': 'معدل النمو السنوي المركب (CAGR)'},
    'acronym': 'CAGR',
    'aliases': {
      'fr': ['TCAC', 'Croissance moyenne géométrique', 'Taux composé pluriannuel'],
      'en': ['CAGR', 'Compound Annual Growth Rate', 'Geometric Annual Growth'],
      'ar': ['معدل النمو المركب', 'النمو السنوي الهندسي']
    },
    'category': 'statistics_methods',
    'short_definition': {
      'fr': 'Taux annuel constant auquel un agrégat financier aurait progressé pour passer de sa valeur initiale à sa valeur finale sur n années.',
      'en': 'Constant annual rate at which a metric would have grown from its base year to final year over n periods.',
      'ar': 'المعدل السنوي الثابت الذي ينمو به المؤشر المالي لينتقل من قيمته الأولية إلى النهائية عبر عدة سنوات.'
    },
    'detailed_definition': {
      'fr': 'Le CAGR neutralise la volatilité et les à-coups des variations annuelles intermédiaires en calculant la moyenne géométrique de la trajectoire pluriannuelle. Dans ABIX Data Explorer, le CAGR est utilisé dans le pilier Croissance (poids 25 % chacun sur Bilan, Crédits, PNB et Résultat Net) pour évaluer la dynamique sur la période d\'analyse sélectionnée.',
      'en': 'CAGR smooths out year-to-year volatility through geometric progression. In ABIX Data Explorer, CAGR is used in the Growth scoring pillar (25% weight each on Assets, Loans, NBI, and Net Profit).',
      'ar': 'يحيّد CAGR التذبذبات السنوية بحساب المتوسط الهندسي للمسار. في ABIX، يُستخدم في تقييم ركيزة النمو (بوزن 25% لكل من الميزانية، القروض، الناتج البنكي والربح الصافي).'
    },
    'formula': 'CAGR = [ (Valeur Finale ÷ Valeur Initiale)^(1 ÷ n) − 1 ] × 100',
    'formula_latex': '\\text{CAGR} = \\left[ \\left(\\frac{V_{\\text{final}}}{V_{\\text{initial}}}\\right)^{\\frac{1}{n}} - 1 \\right] \\times 100',
    'interpretation': {
      'fr': 'Permet de comparer équitablement la dynamique commerciale et financière pluriannuelle entre banques de tailles différentes.',
      'en': 'Provides a standardized, fair multi-year growth comparison across institutions of varying scale.',
      'ar': 'يتيح مقارنة عادلة للحركية التمويلية والتجارية عبر السنوات بين بنوك متفاوتة الحجم.'
    },
    'example': {
      'fr': 'Données 2021-2024, Édition ABIX 2025 (périmètre constant) : Les crédits du secteur sont passés de 8 500 à 11 100 Mds DZD sur 3 ans, soit un CAGR de +9,3 % par an.',
      'en': '2021-2024 data, ABIX 2025 edition (constant scope): Sector loans expanded from 8,500B to 11,100B DZD over 3 years, representing a CAGR of +9.3% per annum.',
      'ar': 'بيانات 2021-2024، إصدار ABIX 2025: ارتفعت القروض من 8,500 إلى 11,100 مليار دج خلال 3 سنوات، بمعدل CAGR قدره +9.3% سنوياً.'
    },
    'unit': '%',
    'performance_direction': 'higher_is_better',
    'higher_is_better': True,
    'threshold_type': 'NONE',
    'regulatory_threshold': None,
    'abix_benchmark': None,
    'example_vintage': 'Données 2021-2024, Édition ABIX 2025, périmètre constant',
    'modules': ['Scores ABIX (Dynamique & Croissance)', 'Historique Pluriannuel', 'Profil Banque'],
    'related_terms': ['variation-annuelle-yoy', 'base-100'],
    'display_order': 37
  },
  {
    'id': 'variation-annuelle-yoy',
    'slug': 'variation-annuelle-yoy',
    'term': {'fr': 'Variation Annuelle Glissante (YoY / Δ)', 'en': 'Year-over-Year Growth (YoY / Δ)', 'ar': 'التغير السنوي المقارن (على أساس سنوي / YoY)'},
    'acronym': 'YoY',
    'aliases': {
      'fr': ['Croissance annuelle', 'Évolution N / N-1', 'Variation glissante', 'Delta annuel'],
      'en': ['Year-over-Year', 'YoY Growth', 'Annual Change', 'Delta YoY'],
      'ar': ['النمو السنوي', 'التغير من سنة لأخرى', 'الفارق السنوي']
    },
    'category': 'statistics_methods',
    'short_definition': {
      'fr': 'Évolution en pourcentage d\'une variable financière entre l\'exercice t et l\'exercice précédent t-1.',
      'en': 'Percentage change of a financial metric between period t and the preceding period t-1.',
      'ar': 'نسبة التغير المئوية للمؤشر المالي بين الدورة t والدورة السابقة t-1.'
    },
    'detailed_definition': {
      'fr': 'Mesure le rythme d\'expansion ou de contraction annuelle d\'un agrégat. Dans ABIX Data Explorer, pour les ratios déjà exprimés en pourcentage (ex: ROE, CIR), la variation est calculée sous forme de variation absolue en points de pourcentage (point_change), évitant toute confusion de calcul.',
      'en': 'Measures annual metric expansion or contraction. In ABIX Data Explorer, for indicators already expressed as percentages (e.g. ROE, CIR), the variation is strictly tracked in percentage points (point_change).',
      'ar': 'يقيس وتيرة التوسع أو الانكماش السنوي. في ABIX، بالنسبة للنسب المئوية (مثل ROE)، يُحتسب التغير بنقاط مئوية مطلقة منعاً للخلط.'
    },
    'formula': 'Pour agrégats (Mds DZD) : YoY = [(Vt − Vt-1) ÷ Vt-1] × 100 | Pour ratios (%) : Δ = Vt − Vt-1 (en points)',
    'formula_latex': '\\text{YoY} = \\frac{V_t - V_{t-1}}{V_{t-1}} \\times 100 \\quad | \\quad \\Delta = V_t - V_{t-1} \\text{ (pts)}',
    'interpretation': {
      'fr': 'Permet d\'identifier les ruptures de tendance, accélérations commerciales ou décélérations brutales d\'une année sur l\'autre.',
      'en': 'Identifies trend shifts, commercial accelerations, or abrupt year-over-year decelerations.',
      'ar': 'يتيح رصد التحولات الهيكلية، والتسارع التجاري أو التباطؤ المفاجئ من سنة إلى أخرى.'
    },
    'example': {
      'fr': 'Données 2024 vs 2023, Édition ABIX 2025 : Progression du PNB sectoriel de +8,2 % YoY, tandis que le ROE moyen a gagné +0,6 point de pourcentage.',
      'en': '2024 vs 2023 data, ABIX 2025 edition: Sector NBI grew by +8.2% YoY, while average ROE gained +0.6 percentage points.',
      'ar': 'بيانات 2024 مقارنة بـ 2023: نمو الناتج البنكي الصافي القطاعي بـ +8.2%، مع ارتفاع وسيط ROE بـ +0.6 نقطة مئوية.'
    },
    'unit': '% / pts',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'NONE',
    'regulatory_threshold': None,
    'abix_benchmark': None,
    'example_vintage': 'Données 2024 vs 2023, Édition ABIX 2025',
    'modules': ['Historique', 'Profil Banque', 'Vue Secteur', 'Scanning Déterministe'],
    'related_terms': ['taux-croissance-annuel-compose', 'base-100'],
    'display_order': 38
  },
  {
    'id': 'base-100',
    'slug': 'base-100',
    'term': {'fr': 'Évolution en Base 100 (Indice Rebasé)', 'en': 'Rebased Index (Base 100)', 'ar': 'التطور المنسوب إلى الأساس 100'},
    'acronym': 'B100',
    'aliases': {
      'fr': ['Indice base 100', 'Trajectoire rebasée', 'Normalisation indiciaire'],
      'en': ['Base 100 Index', 'Rebased Growth', 'Indexed Trajectory'],
      'ar': ['مؤشر الأساس 100', 'المسار القياسي المنسوب']
    },
    'category': 'statistics_methods',
    'short_definition': {
      'fr': 'Indice ramenant la valeur de départ d\'une variable à 100 pour comparer visuellement les trajectoires de croissance de banques de tailles différentes.',
      'en': 'Index normalizing base year metric to 100 to visually compare growth trajectories across banks of differing sizes.',
      'ar': 'مؤشر ينسب القيمة الأولية إلى 100 للمقارنة البصرية المباشرة لمسارات النمو بين بنوك متباينة الحجم.'
    },
    'detailed_definition': {
      'fr': 'L\'analyse en Base 100 fixe arbitrairement l\'année de départ choisie à 100. Les valeurs des années suivantes sont calculées proportionnellement : (Valeur de l\'année ÷ Valeur de base) × 100. Cela permet de comparer sur un même graphique la dynamique d\'une grande banque publique (ex: 4 000 Mds DZD) et d\'une petite banque privée (ex: 80 Mds DZD).',
      'en': 'Base 100 fixes the initial selected year at 100. Subsequent years are computed as (Year Value / Base Value) * 100. This enables direct graphical trajectory comparison between large public and smaller private lenders.',
      'ar': 'يثبت تحليل الأساس 100 سنة البداية عند 100، وتُحسب السنوات اللاحقة تناسبياً، مما يسمح بمقارنة مسارات بنوك كبيرة وصغيرة على نفس الرسم البياني.'
    },
    'formula': 'Indice Base 100 (t) = (Valeur_t ÷ Valeur_base) × 100',
    'formula_latex': '\\text{Indice}_t = \\frac{V_t}{V_{\\text{base}}} \\times 100',
    'interpretation': {
      'fr': 'Un indice à 135 signifie une progression cumulée de +35 % depuis l\'année de référence, indépendamment de la taille initiale de l\'établissement.',
      'en': 'An index of 135 indicates cumulative growth of +35% since the base year, regardless of initial bank size.',
      'ar': 'قراءة المؤشر عند 135 تعني نمواً تراكمياً بنسبة +35% منذ سنة الأساس.'
    },
    'example': {
      'fr': 'Données 2021-2024, Édition ABIX 2025 (base 2021 = 100) : En 2024, les dépôts du secteur se situent à l\'indice 128,4 (croissance cumulée de +28,4 % en 3 ans).',
      'en': '2021-2024 data, ABIX 2025 edition (2021 base = 100): In 2024, sector deposits stand at 128.4 (+28.4% cumulative growth).',
      'ar': 'بيانات 2021-2024 (الأساس 2021 = 100): في 2024، بلغت ودائع القطاع المؤشر 128.4 (+28.4% نمو تراكمي).'
    },
    'unit': 'indice (base 100)',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'NONE',
    'regulatory_threshold': None,
    'abix_benchmark': None,
    'example_vintage': 'Données 2021-2024, Édition ABIX 2025',
    'modules': ['Historique', 'Comparateur', 'Profil Banque'],
    'related_terms': ['taux-croissance-annuel-compose', 'variation-annuelle-yoy'],
    'display_order': 39
  },
  {
    'id': 'correlation-pearson',
    'slug': 'correlation-pearson',
    'term': {'fr': 'Corrélation Linéaire de Pearson (r)', 'en': 'Pearson Linear Correlation (r)', 'ar': 'معامل الارتباط الخطي لبيرسون (r)'},
    'acronym': 'PEARSON',
    'aliases': {
      'fr': ['Coefficient de corrélation', 'Corrélation de Pearson', 'r de Pearson'],
      'en': ['Pearson Correlation Coefficient', 'Linear Correlation', 'Pearson r'],
      'ar': ['معامل الارتباط لبيرسون', 'الارتباط الخطي']
    },
    'category': 'statistics_methods',
    'short_definition': {
      'fr': 'Mesure statistique de la force et de la direction de la relation linéaire entre deux variables financières (entre -1 et +1).',
      'en': 'Statistical measurement of the strength and direction of linear association between two financial metrics (-1 to +1).',
      'ar': 'مقياس إحصائي لقوة واتجاه العلاقة الخطية بين متغيرين ماليين (يتراوح بين -1 و +1).'
    },
    'detailed_definition': {
      'fr': 'Le coefficient de Pearson r varie entre -1 (corrélation linéaire négative parfaite) et +1 (corrélation linéaire positive parfaite), une valeur nulle indiquant l\'absence de liaison linéaire. Règle méthodologique fondamentale ABIX : Corrélation ≠ Causalité. De plus, le coefficient r mesure exclusivement une relation de nature linéaire et peut être fortement sensible aux valeurs atypiques (outliers).',
      'en': 'The Pearson coefficient r ranges from -1 (perfect inverse linear relation) to +1 (perfect positive linear relation), with 0 indicating no linear association. Fundamental ABIX rule: Correlation ≠ Causation. Furthermore, r measures strictly linear relationships and can be sensitive to extreme outliers.',
      'ar': 'يتراوح معامل بيرسون r بين -1 و +1. قاعدة ABIX المنهجية الجوهرية: الارتباط لا يعني السببية إطلاقاً. كما يقيس المعامل العلاقات الخطية حصراً ويتأثر بالقيم الشاذة.'
    },
    'formula': 'r = Σ [ (Xi − X̄)(Yi − Ȳ) ] ÷ [ √Σ(Xi − X̄)² × √Σ(Yi − Ȳ)² ]',
    'formula_latex': 'r = \\frac{\\sum_{i=1}^N (X_i - \\bar{X})(Y_i - \\bar{Y})}{\\sqrt{\\sum_{i=1}^N (X_i - \\bar{X})^2 \\sum_{i=1}^N (Y_i - \\bar{Y})^2}}',
    'interpretation': {
      'fr': '|r| > 0,70 signale une forte corrélation linéaire ; 0,40 < |r| < 0,70 une corrélation modérée ; |r| < 0,40 une relation faible ou non linéaire.',
      'en': '|r| > 0.70 indicates strong linear correlation; 0.40 < |r| < 0.70 moderate; |r| < 0.40 weak or non-linear association.',
      'ar': '|r| > 0.70 يدل على ارتباط خطي قوي؛ بين 0.40 و 0.70 ارتباط متوسط؛ وأقل من 0.40 ارتباط ضعيف أو غير خطي.'
    },
    'example': {
      'fr': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques : Corrélation observée positive et robuste de r = +0,88 entre les Dépôts clientèle et le Total Bilan sur le marché algérien.',
      'en': '2024 data, ABIX 2025 edition, 20-bank scope: Strong positive linear correlation of r = +0.88 observed between Customer Deposits and Total Assets.',
      'ar': 'بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: ارتباط خطي إيجابي وقوي r = +0.88 بين ودائع العملاء وإجمالي الميزانية.'
    },
    'unit': 'coefficient (-1 à +1)',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'ACADEMIC_REFERENCE',
    'regulatory_threshold': None,
    'abix_benchmark': 'Forte correlation si |r| >= 0,70 (Seuil d\'exclusion multicolinearite ABIX: |r| >= 0,85)',
    'example_vintage': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques',
    'modules': ['Matrice de Corrélation', 'Nuage de Points (Scatter Plots)', 'Lab Méthodologique'],
    'related_terms': ['z-score-standardise', 'ecart-type'],
    'display_order': 40
  },
  {
    'id': 'z-score-standardise',
    'slug': 'z-score-standardise',
    'term': {'fr': 'Z-Score Standardisé (Positionnement Relatif)', 'en': 'Standardized Z-Score (Relative Positioning)', 'ar': 'الدرجة المعيارية (Z-Score)'},
    'acronym': 'Z-SCORE',
    'aliases': {
      'fr': ['Score centré-réduit', 'Z-Score classique', 'Écart à la moyenne en sigmas', 'Z-Score robuste'],
      'en': ['Standardized Score', 'Z-Score', 'Standard Normal Deviate', 'Robust Z-Score'],
      'ar': ['الدرجة المعيارية', 'الانحراف المعياري عن المتوسط']
    },
    'category': 'statistics_methods',
    'short_definition': {
      'fr': 'Nombre d\'écarts-types séparant la valeur d\'une banque de la moyenne arithmétique (ou médiane) sectorielle.',
      'en': 'Number of standard deviations separating a bank\'s metric from the sector mean (or median).',
      'ar': 'عدد الانحرافات المعيارية التي تفصل قيمة البنك عن المتوسط (أو الوسيط) القطاعي.'
    },
    'detailed_definition': {
      'fr': 'Le Z-score standardisé permet de comparer des grandeurs hétérogènes en les ramenant à une échelle sans unité centrée sur zéro. Dans le moteur ABIX, deux variantes sont implémentées : 1) Z-Score classique : Z = (X − Moyenne) ÷ σ ; 2) Z-Score robuste (résistant aux outliers) : Z_robuste = 0,6745 × (X − Médiane) ÷ MAD (où MAD est la déviation médiane absolue). Règle statistique : La correspondance Z = +2 avec le Top 2,5 % n\'est rigoureusement exacte que sous l\'hypothèse d\'une distribution normale.',
      'en': 'Standardizes metrics to a unitless scale centered at zero. ABIX implements two variants: 1) Classic Z = (X - Mean) / σ; 2) Robust Z = 0.6745 * (X - Median) / MAD. Statistical note: The equivalence of Z = +2 with the top 2.5% holds strictly only under the assumption of a normal distribution.',
      'ar': 'يقيس المسافة الإحصائية عن مركز التوزيع. تعتمد ABIX صيغتين: 1) القياسية: Z = (القيمة - المتوسط) / الانحراف المعياري؛ 2) القوية المقاومة للشواذ: Z = 0.6745 × (القيمة - الوسيط) / MAD. ملاحظة: تطابق Z = +2 مع أعلى 2.5% مشروط باعتدال التوزيع.'
    },
    'formula': 'Z classique = (X − X̄) ÷ σ | Z robuste = 0,6745 × (X − Médiane) ÷ MAD',
    'formula_latex': 'Z = \\frac{X - \\bar{X}}{\\sigma} \\quad | \\quad Z_{\\text{robuste}} = 0{,}6745 \\times \\frac{X - \\text{Médiane}}{\\text{MAD}}',
    'interpretation': {
      'fr': 'Z = 0 situe la banque exactement au centre. Z > +2 ou Z < -2 signale un profil atypique (outlier statistique) se démarquant nettement du secteur.',
      'en': 'Z = 0 places the bank at market center. Z > +2 or Z < -2 flags an outlier significantly diverging from sector norms.',
      'ar': 'Z = 0 يعني التواجد تماماً في المركز. وتجاوز +2 أو -2 يشير إلى وضعية استثنائية (قيمة شاذة إحصائياً).'
    },
    'example': {
      'fr': 'Données 2024, Édition ABIX 2025, ROE : Pour une banque affichant un ROE de 21,8 % face à une moyenne de 11,4 % (σ = 5,2 %), son Z-score s\'établit à Z = +2,00 (positionnement supérieur d\'élite sous hypothèse normale).',
      'en': '2024 data, ABIX 2025 edition: A bank with 21.8% ROE against a sector mean of 11.4% (σ = 5.2%) achieves Z = +2.00.',
      'ar': 'بيانات 2024، إصدار ABIX 2025: بنك بعائد 21.8% مقابل متوسط 11.4% (انحراف 5.2%)، تكون درجته المعيارية Z = +2.00.'
    },
    'unit': 'score (sans unité)',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'ACADEMIC_REFERENCE',
    'regulatory_threshold': None,
    'abix_benchmark': 'Zone standard [-2 ; +2], Profil atypique si |Z| > 2',
    'example_vintage': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques',
    'modules': ['Outliers & Détection d\'Anomalies', 'Lab Méthodologique', 'Profil Banque'],
    'related_terms': ['ecart-type', 'mediane', 'moyenne-arithmetique'],
    'display_order': 41
  },
  {
    'id': 'normalisation-min-max',
    'slug': 'normalisation-min-max',
    'term': {'fr': 'Normalisation Min-Max (Échelle 0-100)', 'en': 'Min-Max Normalization (0-100 Scale)', 'ar': 'التطبيع الإحصائي الأدنى-الأعلى (مقياس 0-100)'},
    'acronym': 'MINMAX',
    'aliases': {
      'fr': ['Rescaling Min-Max', 'Mise à l\'échelle 0-100', 'Score normalisé linéaire'],
      'en': ['Min-Max Scaling', 'Feature Rescaling', 'Normalized Score 0-100'],
      'ar': ['التحجيم الخطي الأدنى-الأعلى', 'التطبيع المعياري 0-100']
    },
    'category': 'statistics_methods',
    'short_definition': {
      'fr': 'Transformation linéaire d\'un indicateur financier sur une échelle standardisée de 0 à 100 points.',
      'en': 'Linear transformation of a financial metric onto a standardized scale from 0 to 100 points.',
      'ar': 'تحويل خطي للمؤشر المالي إلى مقياس معياري موحد يتراوح بين 0 و 100 نقطة.'
    },
    'detailed_definition': {
      'fr': 'La normalisation Min-Max projette les valeurs observées sur une échelle commune bornée entre 0 (pire valeur) et 100 (meilleure valeur). Règles de transformation ABIX selon le sens de performance : 1) Sens positif (plus élevé = plus favorable, ex: ROE, ROA, Solvabilité, Couverture) : Score = [(X − Min) ÷ (Max − Min)] × 100 ; 2) Sens inverse (plus faible = plus favorable, ex: Coefficient d\'exploitation, Taux de NPL, Coût du risque) : Score = [(Max − X) ÷ (Max − Min)] × 100. Cas limite : Si Max = Min sur l\'échantillon, le score est fixé par convention à 50.',
      'en': 'Projects metrics onto a common 0-100 scale where 100 represents top performance. ABIX scoring rules: 1) Positive direction (higher is better, e.g. ROE, Solvency): Score = [(X - Min)/(Max - Min)] * 100; 2) Inverted direction (lower is better, e.g. CIR, NPL ratio): Score = [(Max - X)/(Max - Min)] * 100. Edge case: If Max equals Min, score defaults to 50.',
      'ar': 'إسقاط المؤشرات على مقياس موحد من 0 إلى 100. قواعد ABIX: 1) الاتجاه المباشر (الأعلى = أفضل): النتيجة = [(القيمة - الأدنى) / (الأعلى - الأدنى)] × 100؛ 2) الاتجاه العكسي (الأقل = أفضل، مثل التكاليف والتعثر): النتيجة = [(الأعلى - القيمة) / (الأعلى - الأدنى)] × 100.'
    },
    'formula': 'Sens direct : Score = [(X − Min) ÷ (Max − Min)] × 100 | Sens inverse : Score = [(Max − X) ÷ (Max − Min)] × 100',
    'formula_latex': '\\text{Score} = \\begin{cases} \\frac{X - \\text{Min}}{\\text{Max} - \\text{Min}} \\times 100 & \\text{si élevé favorable} \\\\ \\frac{\\text{Max} - X}{\\text{Max} - \\text{Min}} \\times 100 & \\text{si faible favorable} \\end{cases}',
    'interpretation': {
      'fr': 'Permet d\'agréger et de comparer des indicateurs hétérogènes au sein des scores dimensionnels ABIX (Rentabilité, Dynamique, Efficience, Capitalisation).',
      'en': 'Enables aggregation and direct comparison of disparate indicators across ABIX dimensional score pillars.',
      'ar': 'يتيح دمج ومقارنة مؤشرات متباينة ضمن ركائز تقييم مؤشر ABIX.'
    },
    'example': {
      'fr': 'Données 2024, Édition ABIX 2025, Coefficient d\'exploitation (sens inverse) : Min = 28,0 %, Max = 78,0 %. Une banque affichant un CIR de 38,0 % obtient un score normalisé de : [(78,0 − 38,0) ÷ (78,0 − 28,0)] × 100 = 80,0 / 100.',
      'en': '2024 data, ABIX 2025 edition, Cost-to-Income (inverted direction): Min = 28.0%, Max = 78.0%. A bank with 38.0% CIR receives a normalized score of [(78.0 - 38.0)/(78.0 - 28.0)] * 100 = 80.0 / 100.',
      'ar': 'بيانات 2024، إصدار ABIX 2025، معامل الاستغلال (عكسي): الأدنى 28.0% والأعلى 78.0%. بنك بنسبة 38.0% يحصل على درجة: [(78.0 - 38.0) / (78.0 - 28.0)] × 100 = 80.0 من 100.'
    },
    'unit': 'score (0 à 100)',
    'performance_direction': 'higher_is_better',
    'higher_is_better': True,
    'threshold_type': 'ABIX_BENCHMARK',
    'regulatory_threshold': None,
    'abix_benchmark': 'Score 0 (Pire de la place) à 100 (Leader de la place)',
    'example_vintage': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques',
    'modules': ['Scores ABIX (4 Dimensions)', 'Matrice 4 Quadrants', 'Profil Banque'],
    'related_terms': ['z-score-standardise', 'cadre-4d-abix'],
    'display_order': 42
  }
