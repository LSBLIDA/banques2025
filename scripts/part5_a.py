
  # ═══════════════════════════════════════════════════════════════════════════
  # 5. STATISTIQUES & MÉTHODES QUANTITATIVES
  # ═══════════════════════════════════════════════════════════════════════════
  {
    'id': 'moyenne-arithmetique',
    'slug': 'moyenne-arithmetique',
    'term': {'fr': 'Moyenne Arithmétique', 'en': 'Arithmetic Mean (Average)', 'ar': 'المتوسط الحسابي'},
    'acronym': 'MOY',
    'aliases': {
      'fr': ['Moyenne simple', 'Moyenne sectorielle', 'Moyenne non pondérée'],
      'en': ['Arithmetic Mean', 'Average', 'Sample Mean'],
      'ar': ['المتوسط البسيط', 'معدل العينة']
    },
    'category': 'statistics_methods',
    'short_definition': {
      'fr': 'Somme de toutes les valeurs observées divisée par le nombre total de banques de l\'échantillon.',
      'en': 'Sum of all observed values divided by the total number of banks in the sample.',
      'ar': 'مجموع كافة القيم المرصودة مقسوماً على عدد البنوك في العينة.'
    },
    'detailed_definition': {
      'fr': 'La moyenne arithmétique mesure la tendance centrale d\'un agrégat ou ratio sectoriel. Dans ABIX Data Explorer, la moyenne est calculée exclusivement sur les observations numériques disponibles (ignorant les valeurs nulles). Elle peut être sensible aux valeurs extrêmes (outliers) sur des échantillons bancaires concentrés.',
      'en': 'The arithmetic mean measures central tendency. In ABIX Data Explorer, it is computed strictly on available numeric observations (excluding nulls). It can be sensitive to extreme outliers in highly concentrated banking systems.',
      'ar': 'يقيس المتوسط الحسابي النزعة المركزية للمؤشرات القطاعية. في ABIX، يُحتسب على البيانات المتوفرة فقط، وقد يتأثر بالقيم الشاذة في الأسواق عالية التركيز.'
    },
    'formula': 'Moyenne = (Σ Xi) ÷ N (pour i = 1 à N)',
    'formula_latex': '\\bar{X} = \\frac{1}{N}\\sum_{i=1}^N X_i',
    'interpretation': {
      'fr': 'Donne le niveau moyen de la place, mais doit être confrontée à la médiane pour apprécier l\'asymétrie de la distribution sectorielle.',
      'en': 'Provides the overall market level, but should be compared with the median to assess distributional skewness.',
      'ar': 'يعطي المستوى العام للسوق، ويجب مقارنته بالوسيط لتقييم مدى عدم تماثل التوزيع.'
    },
    'example': {
      'fr': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques : Le ROE moyen sectoriel est de 11,4 % alors que le ROE médian est de 9,8 % (asymétrie positive tirée par les banques de tête).',
      'en': '2024 data, ABIX 2025 edition, 20-bank scope: Sector mean ROE is 11.4% vs median of 9.8% (positive skew driven by top performers).',
      'ar': 'بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: متوسط ROE هو 11.4% مقارنة بوسيط 9.8% (انحراف إيجابي مدفوع بالبنوك الرائدة).'
    },
    'unit': 'selon indicateur',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'NONE',
    'regulatory_threshold': None,
    'abix_benchmark': None,
    'example_vintage': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques',
    'modules': ['Vue Secteur', 'Classements', 'Profil Banque', 'Distribution Sectorielle'],
    'related_terms': ['mediane', 'quartiles', 'ecart-type'],
    'display_order': 32
  },
  {
    'id': 'mediane',
    'slug': 'mediane',
    'term': {'fr': 'Médiane (Q2 / 50e percentile)', 'en': 'Median (50th Percentile / Q2)', 'ar': 'الوسيط الإحصائي (المئين 50)'},
    'acronym': 'MED',
    'aliases': {
      'fr': ['Valeur centrale', '50e percentile', 'Seuil médian', 'Q2'],
      'en': ['Median', '50th Percentile', 'Midpoint', 'Q2'],
      'ar': ['الوسيط', 'القيمة المركزية', 'المئين 50']
    },
    'category': 'statistics_methods',
    'short_definition': {
      'fr': 'Valeur qui sépare l\'échantillon des banques triées en deux groupes d\'effectifs strictement égaux (50 % au-dessus, 50 % en-dessous).',
      'en': 'Value separating the ordered sample of banks into two equal halves (50% above, 50% below).',
      'ar': 'القيمة التي تقسم عينة البنوك المرتبة إلى نصفين متساويين تماماً (50% أعلى و50% أدنى).'
    },
    'detailed_definition': {
      'fr': 'La médiane est l\'indicateur robuste de référence privilégié par ABIX pour mesurer le point central du marché bancaire algérien, car elle est totalement insensible aux valeurs extrêmes (outliers) et aux effets de taille des géants publics. Formule exacte : 1) Pour un nombre impair N de banques (ex: 21 banques en 2026) : Médiane = valeur centrale au rang (N+1)/2 ; 2) Pour un nombre pair N de banques (ex: 20 banques en 2025) : Médiane = moyenne arithmétique des deux valeurs centrales aux rangs N/2 et (N/2)+1.',
      'en': 'The median is ABIX\'s primary robust central tendency metric because it is fully resistant to extreme outliers and public bank scale distortions. Exact formulation: 1) For an odd number N of banks (e.g. 21 banks in 2026): Median = central value at rank (N+1)/2; 2) For an even number N of banks (e.g. 20 banks in 2025): Median = arithmetic average of the two central values at ranks N/2 and (N/2)+1.',
      'ar': 'الوسيط هو المقياس الإحصائي المركزي المفضل في ABIX لكونه مقاوماً تماماً للقيم الشاذة وهيمنة البنوك الكبرى. الصيغة الرياضية: 1) لعدد فردي N (مثل 21 بنكاً في 2026): القيمة المركزية في الرتبة (N+1)/2؛ 2) لعدد زوجي N (مثل 20 بنكاً في 2025): متوسط القيمتين المركزيتين في الرتبتين N/2 و (N/2)+1.'
    },
    'formula': 'Si N impair : Médiane = X_((N+1)/2) | Si N pair : Médiane = (X_(N/2) + X_(N/2 + 1)) ÷ 2',
    'formula_latex': '\\text{Médiane} = \\begin{cases} X_{\\frac{N+1}{2}} & \\text{si } N \\text{ impair} \\\\ \\frac{X_{\\frac{N}{2}} + X_{\\frac{N}{2}+1}}{2} & \\text{si } N \\text{ pair} \\end{cases}',
    'interpretation': {
      'fr': 'Représente la performance d\'une « banque type » médiane sur la place bancaire algérienne, sans biais de surreprésentation des grandes banques publiques.',
      'en': 'Represents the performance of a typical median bank in Algeria without weighting bias towards giant public banks.',
      'ar': 'يمثل أداء «البنك النموذجي» في الساحة المصرفية دون تحيز للأحجام الكبيرة للبنوك العمومية.'
    },
    'example': {
      'fr': 'Données 2024, Édition ABIX 2025 (périmètre de 20 banques, N pair) : Le coefficient d\'exploitation médian est calculé comme la moyenne de la 10e banque (43,2 %) et de la 11e banque (43,8 %), soit exactement 43,5 %.',
      'en': '2024 data, ABIX 2025 edition (20 banks, even N): Median CIR is the average of the 10th bank (43.2%) and 11th bank (43.8%), exactly 43.5%.',
      'ar': 'بيانات 2024، إصدار ABIX 2025 (20 بنكاً، N زوجي): وسيط معامل الاستغلال هو متوسط البنك العاشر (43.2%) والحادي عشر (43.8%)، أي 43.5%.'
    },
    'unit': 'selon indicateur',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'NONE',
    'regulatory_threshold': None,
    'abix_benchmark': None,
    'example_vintage': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques',
    'modules': ['Vue Secteur', 'Classements', 'Profil Banque', 'Benchmarks & Quartiles', 'Executive Summary'],
    'related_terms': ['moyenne-arithmetique', 'quartiles', 'ecart-type'],
    'display_order': 33
  },
  {
    'id': 'quartiles',
    'slug': 'quartiles',
    'term': {'fr': 'Quartiles & Percentiles (Q1, Q2, Q3)', 'en': 'Quartiles & Percentiles (Q1, Q2, Q3)', 'ar': 'الربيعيات والمئينات الإحصائية (Q1, Q2, Q3)'},
    'acronym': 'QUART',
    'aliases': {
      'fr': ['Seuils de quartile', 'Q1 / Q2 / Q3', 'Distribution en 4 groupes', 'Tranches de distribution'],
      'en': ['Quartiles', 'Q1, Q2, Q3', 'Four-tier distribution', 'Percentile Thresholds'],
      'ar': ['الربيعيات', 'الربيع الأدنى والأعلى', 'المئينات 25 و 50 و 75']
    },
    'category': 'statistics_methods',
    'short_definition': {
      'fr': 'Trois seuils statistiques (Q1=25e, Q2=50e=Médiane, Q3=75e percentile) délimitant quatre tranches d\'effectifs égaux au sein du secteur.',
      'en': 'Three statistical thresholds (Q1=25th, Q2=50th=Median, Q3=75th percentile) dividing the sector into four equal cohorts.',
      'ar': 'ثلاثة حدود إحصائية (Q1=25%, Q2=50%=الوسيط, Q3=75%) تقسم القطاع المصرفي إلى أربع شرائح متساوية العدد.'
    },
    'detailed_definition': {
      'fr': 'En statistique descriptive, les seuils de quartiles sont : 1) Premier quartile Q1 = 25e percentile (25 % des banques sont inférieures à ce seuil) ; 2) Deuxième quartile Q2 = 50e percentile = Médiane ; 3) Troisième quartile Q3 = 75e percentile (75 % des banques sont inférieures à ce seuil). Note méthodologique ABIX : Dans le moteur de calcul ABIX, les percentiles sont interpolés selon la convention (N-1)×p. Note sur les restitutions de performance ABIX : Distinct de la pure distribution statistique, la restitution exécutive de performance ABIX attribue le label « Q1 » au quartile des banques les plus performantes (ex: Top 25 % des ROE les plus élevés ou Top 25 % des Coefficients d\'exploitation les plus bas).',
      'en': 'Descriptive quartile thresholds: 1) Q1 = 25th percentile; 2) Q2 = 50th percentile = Median; 3) Q3 = 75th percentile. ABIX engine computes percentiles using linear interpolation (N-1)*p. ABIX Performance Note: In ABIX executive restitution, the \'Q1\' label is awarded to the top 25% best performers (e.g. highest ROE or lowest Cost-to-Income).',
      'ar': 'الربيعيات الإحصائية: 1) الربيع الأول Q1 = المئين 25؛ 2) الربيع الثاني Q2 = الوسيط (المئين 50)؛ 3) الربيع الثالث Q3 = المئين 75. ملاحظة ABIX: في لوحات الأداء التنفيذي، يُمنح تصنيف Q1 لربع البنوك الأفضل أداءً (أعلى عائد أو أقل تكلفة تشغيلية).'
    },
    'formula': 'Q1 = P25 (interpolation linéaire) | Q2 = Médiane (P50) | Q3 = P75 (interpolation linéaire)',
    'formula_latex': 'Q_1 = P_{25},\\quad Q_2 = P_{50} = \\text{Médiane},\\quad Q_3 = P_{75}',
    'interpretation': {
      'fr': 'Permet de positionner objectivement chaque banque dans sa tranche sectorielle (Tranche 1, Tranche 2, Tranche 3, Tranche 4) sans biais de moyenne.',
      'en': 'Positions each bank objectively within its peer distribution tier without mean-driven distortion.',
      'ar': 'يتيح تحديد التموضع الدقيق لكل بنك ضمن شريحته القطاعية دون تأثر بالمتوسطات.'
    },
    'example': {
      'fr': 'Données 2024, Édition ABIX 2025, ROE sectoriel (20 banques) : Q1 = 6,2 %, Q2 (Médiane) = 9,8 %, Q3 = 14,5 %. Les banques affichant un ROE > 14,5 % se situent dans le quartile de tête Q1 de performance.',
      'en': '2024 data, ABIX 2025 edition, sector ROE (20 banks): Q1 = 6.2%, Q2 = 9.8%, Q3 = 14.5%. Banks with ROE > 14.5% belong to the top performance quartile Q1.',
      'ar': 'بيانات 2024، إصدار ABIX 2025، عائد ROE: الربيع الأول 6.2%، الوسيط 9.8%، الربيع الثالث 14.5%.'
    },
    'unit': 'selon indicateur',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'NONE',
    'regulatory_threshold': None,
    'abix_benchmark': None,
    'example_vintage': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques',
    'modules': ['Vue Secteur', 'Profil Banque', 'Distribution & Boxplots', 'Executive Dashboard', 'Heatmaps'],
    'related_terms': ['mediane', 'moyenne-arithmetique', 'z-score-standardise'],
    'display_order': 34
  },
  {
    'id': 'ecart-type',
    'slug': 'ecart-type',
    'term': {'fr': 'Écart-Type (Dispersion Sectorielle)', 'en': 'Standard Deviation (σ)', 'ar': 'الانحراف المعياري (التشتت القطاعي)'},
    'acronym': 'SIGMA',
    'aliases': {
      'fr': ['Sigma (σ)', 'Dispersion statistique', 'Volatilité sectorielle'],
      'en': ['Standard Deviation', 'Sigma', 'Sample Dispersion'],
      'ar': ['الانحراف المعياري', 'سيغما', 'درجة التشتت']
    },
    'category': 'statistics_methods',
    'short_definition': {
      'fr': 'Mesure statistique de la dispersion des observations d\'un indicateur autour de sa moyenne arithmétique.',
      'en': 'Statistical measurement of data dispersion around the arithmetic mean.',
      'ar': 'مقياس إحصائي لمدى تشتت وتباعد قيم المؤشر حول متوسطه الحسابي.'
    },
    'detailed_definition': {
      'fr': 'L\'écart-type quantifie l\'hétérogénéité ou l\'homogénéité des pratiques et performances entre les banques de la place. Un écart-type faible indique que les banques sont regroupées autour de la moyenne ; un écart-type élevé signale une forte segmentation ou des écarts stratégiques prononcés. Note statistique : Dans une distribution approximativement normale, ~68 % des observations se situent à ±1σ et ~95 % à ±2σ de la moyenne.',
      'en': 'Quantifies the homogeneity or dispersion of banking metrics across institutions. Statistical note: In an approximately normal distribution, ~68% of observations fall within ±1σ and ~95% within ±2σ of the mean.',
      'ar': 'يقيس درجة التجانس أو التباين بين أداء البنوك. ملاحظة إحصائية: في التوزيع المعتدل تقريباً، يقع نحو 68% من القيم ضمن ±1 انحراف معياري و95% ضمن ±2 انحراف معياري.'
    },
    'formula': 'Écart-type (σ) = √ [ (1 ÷ N) × Σ (Xi − X̄)² ]',
    'formula_latex': '\\sigma = \\sqrt{\\frac{1}{N}\\sum_{i=1}^N (X_i - \\bar{X})^2}',
    'interpretation': {
      'fr': 'Permet d\'évaluer la représentativité de la moyenne et d\'identifier les banques atypiques (outliers) situées à plus de 2 écarts-types.',
      'en': 'Evaluates mean representativeness and identifies outlier banks lying beyond 2 standard deviations.',
      'ar': 'يساعد على تقييم مدى تمثيلية المتوسط وتحديد البنوك الشاذة إحصائياً التي تبعد بأكثر من انحرافين معياريين.'
    },
    'example': {
      'fr': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques : Pour un ROE moyen de 11,4 % avec un écart-type sectoriel de σ = 5,2 %, la plage [6,2 % - 16,6 %] regroupe la majorité des banques sous hypothèse de quasi-normalité.',
      'en': '2024 data, ABIX 2025 edition, 20-bank scope: For a mean ROE of 11.4% with sector σ = 5.2%, the range [6.2% - 16.6%] encompasses the core bank cohort.',
      'ar': 'بيانات 2024، إصدار ABIX 2025: لمتوسط عائد 11.4% وانحراف معياري 5.2%، يشمل النطاق [6.2% - 16.6%] غالبية البنوك.'
    },
    'unit': 'selon indicateur',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'NONE',
    'regulatory_threshold': None,
    'abix_benchmark': None,
    'example_vintage': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques',
    'modules': ['Vue Secteur', 'Distribution Sectorielle', 'Outliers & Détection d\'Anomalies'],
    'related_terms': ['moyenne-arithmetique', 'coefficient-variation', 'z-score-standardise'],
    'display_order': 35
  },
  {
    'id': 'coefficient-variation',
    'slug': 'coefficient-variation',
    'term': {'fr': 'Coefficient de Variation (CV)', 'en': 'Coefficient of Variation (CV)', 'ar': 'معامل الاختلاف الإحصائي'},
    'acronym': 'CV',
    'aliases': {
      'fr': ['CV', 'Dispersion relative', 'Écart-type relatif'],
      'en': ['Coefficient of Variation', 'CV', 'Relative Standard Deviation'],
      'ar': ['معامل الاختلاف', 'التشتت النسبي']
    },
    'category': 'statistics_methods',
    'short_definition': {
      'fr': 'Rapport entre l\'écart-type et la moyenne arithmétique, mesurant la dispersion relative d\'un indicateur sous forme de pourcentage.',
      'en': 'Ratio of standard deviation to arithmetic mean, expressing relative dispersion as a normalized percentage.',
      'ar': 'النسبة بين الانحراف المعياري والمتوسط الحسابي، وتقيس التشتت النسبي للمؤشر في شكل نسبة مئوية.'
    },
    'detailed_definition': {
      'fr': 'Le coefficient de variation est une mesure adimensionnelle permettant de comparer directement le degré de dispersion et d\'hétérogénéité entre des indicateurs financiers exprimés dans des unités ou des échelles différentes (ex: comparer la dispersion des dépôts en Mds DZD et celle du ROE en %).',
      'en': 'The CV is a dimensionless metric enabling direct dispersion comparison across financial indicators with different units or scales (e.g. comparing deposits dispersion in billion DZD with ROE dispersion in %).',
      'ar': 'معامل الاختلاف هو مقياس نسبي يتيح المقارنة المباشرة لدرجة التباين بين مؤشرات مالية مختلفة الوحدات والمقاييس.'
    },
    'formula': 'Coefficient de Variation (CV) = (Écart-type σ ÷ Moyenne arithmétique X̄) × 100',
    'formula_latex': '\\text{CV} = \\frac{\\sigma}{\\bar{X}} \\times 100',
    'interpretation': {
      'fr': 'Un CV < 15 % traduit une forte homogénéité sectorielle. Un CV > 30-50 % indique une forte dispersion ou une polarisation marquée entre établissements.',
      'en': 'CV < 15% indicates strong sector homogeneity. CV > 30-50% indicates high dispersion and structural polarization.',
      'ar': 'يدل CV الأقل من 15% على تجانس كبير، بينما يدل تجاوزه 30-50% على تباين حاد أو استقطاب في السوق.'
    },
    'example': {
      'fr': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques : Le CV du coefficient d\'exploitation est de 24 % (modéré), tandis que celui de la taille de bilan atteint 145 % (très forte asymétrie de taille).',
      'en': '2024 data, ABIX 2025 edition: Cost-to-Income CV is 24% (moderate), whereas Total Assets CV reaches 145% (extreme scale skewness).',
      'ar': 'بيانات 2024، إصدار ABIX 2025: يبلغ معامل الاختلاف لمعامل الاستغلال 24% بينما يصل لحجم الميزانية إلى 145%.'
    },
    'unit': '%',
    'performance_direction': 'neutral',
    'higher_is_better': None,
    'threshold_type': 'NONE',
    'regulatory_threshold': None,
    'abix_benchmark': None,
    'example_vintage': 'Données 2024, Édition ABIX 2025, périmètre de 20 banques',
    'modules': ['Vue Secteur', 'Distribution Sectorielle', 'Comparateur'],
    'related_terms': ['ecart-type', 'moyenne-arithmetique'],
    'display_order': 36
  }
