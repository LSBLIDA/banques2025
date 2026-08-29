#!/usr/bin/env node
/**
 * ABIX — Script de génération et de seed du Glossaire
 *
 * Ce script génère de façon idempotente la base de données `data/glossary.json`
 * et met à jour les fichiers de locales `locales/fr.json`, `locales/en.json`, `locales/ar.json`.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const LOCALES_DIR = path.join(ROOT, "locales");
const GLOSSARY_FILE = path.join(DATA_DIR, "glossary.json");

// ── Définition des 8 Catégories ─────────────────────────────────────────────
const CATEGORIES = {
  financial_indicators: {
    id: "financial_indicators",
    name: {
      fr: "Indicateurs financiers & Bilan",
      en: "Financial & Balance Sheet Indicators",
      ar: "المؤشرات المالية والميزانية"
    },
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  },
  ratios_profitability: {
    id: "ratios_profitability",
    name: {
      fr: "Ratios & Rentabilité",
      en: "Ratios & Profitability",
      ar: "النسب المالية والمردودية"
    },
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
  },
  risk_solvency: {
    id: "risk_solvency",
    name: {
      fr: "Risque, Solvabilité & Prudence",
      en: "Risk, Solvency & Prudential",
      ar: "المخاطر، الملاءة المالية والحذر"
    },
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  },
  liquidity_intermediation: {
    id: "liquidity_intermediation",
    name: {
      fr: "Liquidité & Intermédiation",
      en: "Liquidity & Intermediation",
      ar: "السيولة والوساطة المصرفية"
    },
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
  },
  statistics_methods: {
    id: "statistics_methods",
    name: {
      fr: "Statistiques & Méthodes quantitatives",
      en: "Statistics & Quantitative Methods",
      ar: "الإحصاء والأساليب الكمية"
    },
    icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
  },
  sector_analysis: {
    id: "sector_analysis",
    name: {
      fr: "Analyse sectorielle & Marché",
      en: "Sector & Market Analysis",
      ar: "التحليل القطاعي وديناميكية السوق"
    },
    icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
  },
  concentration_market: {
    id: "concentration_market",
    name: {
      fr: "Concentration & Concurrence",
      en: "Concentration & Competition",
      ar: "التركيز والمنافسة"
    },
    icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
  },
  abix_framework: {
    id: "abix_framework",
    name: {
      fr: "Méthodologie & Cadre ABIX",
      en: "ABIX Methodology & Framework",
      ar: "منهجية وإطار مؤشر ABIX"
    },
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
  }
};

// ── Liste Exhaustive des Notions ABIX (70+ entrées dédupliquées) ──────────────
const RAW_ENTRIES = [
  {
    "id": "total-bilan",
    "slug": "total-bilan",
    "term": {
      "fr": "Total Bilan (Actifs Totaux)",
      "en": "Total Assets (Balance Sheet Total)",
      "ar": "إجمالي الميزانية (إجمالي الأصول)"
    },
    "acronym": "TB",
    "aliases": {
      "fr": [
        "Actifs totaux",
        "Taille du bilan",
        "Agrégat bilanciel"
      ],
      "en": [
        "Total Assets",
        "Balance Sheet Size"
      ],
      "ar": [
        "إجمالي الأصول",
        "حجم الميزانية"
      ]
    },
    "category": "financial_indicators",
    "short_definition": {
      "fr": "Mesure la dimension bilancielle globale d'une banque en totalisant l'ensemble de ses actifs au 31 décembre.",
      "en": "Measures the overall balance sheet scale of a bank by summing all its assets as of December 31.",
      "ar": "يقيس الحجم المالي الإجمالي للبنك من خلال جمع كافة أصوله وموجوداته في 31 ديسمبر."
    },
    "detailed_definition": {
      "fr": "Le Total Bilan correspond au total de l'actif comptable inscrit au bilan de clôture de l'exercice. Dans ABIX Data Explorer, il constitue la grandeur de référence pour le calcul des parts de marché sectorielles, la segmentation par taille d'établissement et la pondération des agrégats sectoriels.",
      "en": "Total Assets represents total closing accounting assets. In ABIX Data Explorer, it serves as the benchmark aggregate for market share calculations, bank size grouping, and sector weighting.",
      "ar": "يمثل إجمالي الميزانية مجموع الأصول المسجلة في ختام السنة المالية. في ABIX Data Explorer، يمثل المؤشر الأساسي لاحتساب الحصص السوقية وتصنيف البنوك حسب الحجم."
    },
    "formula": "Total Bilan = Caisse & Banques centrales + Titres & Bons du Trésor + Crédits clientèle + Autres actifs",
    "formula_latex": "\\\\text{Total Bilan} = \\\\sum \\\\text{Actifs Bilanciels}",
    "interpretation": {
      "fr": "Un indicateur de taille relative et de présence institutionnelle. Il ne préjuge pas à lui seul de la rentabilité ou de la solvabilité de la banque.",
      "en": "An indicator of relative size and institutional presence. It does not by itself measure profitability or solvency.",
      "ar": "مؤشر للحجم النسبي والوزن السوقي، ولا يعبر بمفرده عن مستوى المردودية أو الملاءة."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Total bilan sectoriel consolidé d'environ 18 500 Mds DZD, dominé à près de 87 % par le secteur public.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Consolidated sector total assets of approx. 18,500 billion DZD, ~87% held by public banks.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: إجمالي الميزانية المجمع حوالي 18,500 مليار دج، تمثل البنوك العمومية نحو 87% منه."
    },
    "unit": "Mds DZD",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Classements",
      "Profil Banque",
      "Historique",
      "Parts de marché",
      "Executive Dashboard"
    ],
    "related_terms": [
      "depots-clientele",
      "credits-clientele",
      "fonds-propres",
      "part-de-marche"
    ],
    "display_order": 1
  },
  {
    "id": "depots-clientele",
    "slug": "depots-clientele",
    "term": {
      "fr": "Dépôts de la clientèle",
      "en": "Customer Deposits",
      "ar": "ودائع العملاء"
    },
    "acronym": "DEP",
    "aliases": {
      "fr": [
        "Dépôts collectés",
        "Ressources clientèle",
        "Épargne collectée"
      ],
      "en": [
        "Deposits collected",
        "Customer resources"
      ],
      "ar": [
        "الودائع المجمعة",
        "موارد العملاء"
      ]
    },
    "category": "financial_indicators",
    "short_definition": {
      "fr": "Volume total des ressources financières confiées à la banque par la clientèle sous forme de comptes à vue, à terme ou livrets.",
      "en": "Total financial resources entrusted to the bank by customers in checking, term, or savings accounts.",
      "ar": "إجمالي الموارد المالية المودعة لدى البنك من طرف العملاء كحسابات جارية أو لأجل أو دفاتر ادخار."
    },
    "detailed_definition": {
      "fr": "Les dépôts de la clientèle regroupent les dépôts à vue, dépôts à terme, comptes d'épargne et dépôts de garantie des ménages, entreprises et institutions. Ils constituent la ressource primaire d'intermédiation et le socle de liquidité de l'établissement bancaire.",
      "en": "Customer deposits aggregate demand, term, savings, and collateral deposits from households, corporates, and institutions. They represent the primary funding base for intermediation.",
      "ar": "تجمع ودائع العملاء الحسابات الجارية ولأجل وحسابات الادخار للمؤسسات والأفراد، وتشكل المصدر التمويلي الرئيسي للنشاط المصرفي."
    },
    "formula": "Dépôts = Dépôts à vue + Dépôts à terme + Livrets d'épargne + Autres dépôts clientèle",
    "formula_latex": "\\\\text{Dépôts} = \\\\sum \\\\text{Ressources Clientèle}",
    "interpretation": {
      "fr": "Mesure la capacité d'attraction de ressources et la fidélité de la base clientèle. Une part élevée de dépôts à vue réduit le coût des ressources.",
      "en": "Measures funding capture and customer loyalty. A high share of demand deposits lowers overall cost of funding.",
      "ar": "يقيس القدرة على استقطاب الموارد واستقرار قاعدة المودعين. ارتفاع حصة الودائع تحت الطلب يخفض تكلفة الموارد."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Encours total des dépôts de 14 200 Mds DZD, finançant l'essentiel du bilan bancaire.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Total deposit volume of 14,200 billion DZD.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: إجمالي الودائع 14,200 مليار دج."
    },
    "unit": "Mds DZD",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Classements",
      "Profil Banque",
      "Historique",
      "Parts de marché",
      "Comparateur"
    ],
    "related_terms": [
      "total-bilan",
      "credits-clientele",
      "ratio-prets-depots",
      "depots-total-passif"
    ],
    "display_order": 2
  },
  {
    "id": "credits-clientele",
    "slug": "credits-clientele",
    "term": {
      "fr": "Crédits à la clientèle",
      "en": "Customer Loans",
      "ar": "القروض الممنوحة للعملاء"
    },
    "acronym": "CRE",
    "aliases": {
      "fr": [
        "Prêts à la clientèle",
        "Encours de crédits",
        "Financements accordés"
      ],
      "en": [
        "Customer loans",
        "Gross loans",
        "Credit portfolio"
      ],
      "ar": [
        "التمويلات الممنوحة",
        "حجم القروض",
        "محفظة الائتمان"
      ]
    },
    "category": "financial_indicators",
    "short_definition": {
      "fr": "Encours total des financements et facilités de crédit accordés à l'économie (entreprises, professionnels, particuliers).",
      "en": "Total outstanding financings and credit facilities granted to the economy (enterprises, professionals, retail).",
      "ar": "إجمالي التمويلات والتسهيلات الائتمانية الممنوحة للاقتصاد (المؤسسات، المهنيين والأفراد)."
    },
    "detailed_definition": {
      "fr": "Représente le montant brut des concours bancaires consentis par l'établissement sous forme de découverts, crédits de trésorerie, crédits d'équipement, crédits immobiliers et crédits à la consommation. Dans ABIX, il s'agit du principal emploi bilanciel.",
      "en": "Represents total gross lending facilities extended by the bank across overdrafts, corporate working capital, equipment loans, mortgages, and consumer credit.",
      "ar": "يمثل إجمالي التمويلات المباشرة التي يقدمها البنك في شكل قروض استغلال، تجهيز، عقار وقروض استهلاكية."
    },
    "formula": "Crédits = Crédits d'exploitation + Crédits d'investissement + Crédits immobiliers + Crédits aux particuliers",
    "formula_latex": "\\\\text{Crédits} = \\\\sum \\\\text{Engagements Clientèle}",
    "interpretation": {
      "fr": "Reflète la contribution active de la banque au financement de l'économie et son niveau d'exposition aux risques de contrepartie.",
      "en": "Reflects the bank's active contribution to economic financing and counterparty risk exposure.",
      "ar": "يعكس مدى مساهمة البنك في تمويل الاقتصاد الوطني ومستوى تعرضه لمخاطر الائتمان."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Encours brut des crédits à la clientèle de 11 100 Mds DZD.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Gross customer loans of 11,100 billion DZD.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: إجمالي القروض الممنوحة 11,100 مليار دج."
    },
    "unit": "Mds DZD",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Classements",
      "Profil Banque",
      "Historique",
      "Parts de marché",
      "Comparateur"
    ],
    "related_terms": [
      "total-bilan",
      "depots-clientele",
      "ratio-prets-depots",
      "prets-total-actif",
      "taux-npl"
    ],
    "display_order": 3
  },
  {
    "id": "fonds-propres",
    "slug": "fonds-propres",
    "term": {
      "fr": "Fonds Propres Comptables",
      "en": "Accounting Equity",
      "ar": "حقوق الملكية (الأموال الخاصة)"
    },
    "acronym": "FP",
    "aliases": {
      "fr": [
        "Capitaux propres",
        "Fonds propres bilanciels",
        "Net comptable"
      ],
      "en": [
        "Total Equity",
        "Book Value",
        "Shareholders Equity"
      ],
      "ar": [
        "الأموال الذاتية",
        "صافي الأصول المحاسبية"
      ]
    },
    "category": "financial_indicators",
    "short_definition": {
      "fr": "Ressources stables appartenant aux actionnaires, constituées du capital, des réserves et du résultat net non distribué.",
      "en": "Stable resources belonging to shareholders, comprising share capital, reserves, and retained earnings.",
      "ar": "الموارد المستقرة العائدة للمساهمين، وتتكون من رأس المال، الاحتياطيات والنتائج غير الموزعة."
    },
    "detailed_definition": {
      "fr": "Les Fonds Propres comptables représentent la valeur nette de l'établissement au bilan. Ils constituent le coussin de sécurité financière absorbant les pertes potentielles. Note méthodologique ABIX : les fonds propres comptables sont distincts des fonds propres réglementaires prudentiels (Tier 1 et Tier 2) calculés selon le règlement Banque d'Algérie n°2014-01.",
      "en": "Accounting Equity represents the net book value on the balance sheet. It acts as the financial cushion against unexpected losses. ABIX note: book equity is distinct from regulatory capital (Tier 1/Tier 2) under Bank of Algeria Regulation 2014-01.",
      "ar": "تمثل حقوق الملكية الصافية للبنك والدرع المالي لامتصاص الخسائر. ملاحظة ABIX: تختلف الأموال الخاصة المحاسبية عن الأموال الخاصة التنظيمية (Tier 1/Tier 2)."
    },
    "formula": "Fonds Propres = Capital social + Primes d'émission + Réserves + Report à nouveau + Résultat net",
    "formula_latex": "\\\\text{Fonds Propres} = \\\\text{Capital} + \\\\text{Réserves} + \\\\text{Report} + \\\\text{Résultat Net}",
    "interpretation": {
      "fr": "Un niveau élevé renforce l'autonomie financière et la capacité de résistance aux chocs macroéconomiques.",
      "en": "A high equity buffer enhances financial autonomy and shock absorption capacity.",
      "ar": "مستوى الأموال الخاصة المرتفع يعزز الاستقلالية المالية والقدرة على الصمود في وجه الصدمات."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Fonds propres consolidés du secteur bancaire de 2 450 Mds DZD.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector accounting equity of 2,450 billion DZD.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: إجمالي حقوق الملكية المجمعة 2,450 مليار دج."
    },
    "unit": "Mds DZD",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Classements",
      "Scores ABIX (Solidité financière)"
    ],
    "related_terms": [
      "total-bilan",
      "return-on-equity",
      "fonds-propres-total-bilan",
      "ratio-solvabilite"
    ],
    "display_order": 4
  },
  {
    "id": "produit-net-bancaire",
    "slug": "produit-net-bancaire",
    "term": {
      "fr": "Produit Net Bancaire",
      "en": "Net Banking Income",
      "ar": "الناتج البنكي الصافي"
    },
    "acronym": "PNB",
    "aliases": {
      "fr": [
        "Revenu bancaire net",
        "Chiffre d'affaires bancaire",
        "NBI"
      ],
      "en": [
        "Net Banking Income",
        "NBI",
        "Banking Operating Revenue"
      ],
      "ar": [
        "الدخل المصرفي الصافي",
        "إيرادات النشاط المصرفي"
      ]
    },
    "category": "financial_indicators",
    "short_definition": {
      "fr": "Marge brute d'activité bancaire mesurant la création de valeur commerciale avant déduction des charges d'exploitation.",
      "en": "Gross banking operational margin measuring revenue creation before operating expenses.",
      "ar": "الهامش الإجمالي للنشاط المصرفي الذي يقيس خلق القيمة قبل خصم الأعباء التشغيلية."
    },
    "detailed_definition": {
      "fr": "Le PNB est l'équivalent bancaire de la marge brute ou du chiffre d'affaires. Il est constitué de la marge nette d'intérêt (intérêts perçus moins intérêts versés), des commissions nettes perçues et des gains nets sur instruments financiers et opérations de change.",
      "en": "NBI is the banking equivalent of gross revenue. It consists of net interest income, net fee and commission income, and net trading and FX gains.",
      "ar": "الناتج البنكي الصافي يمثل إجمالي الإيرادات المصرفية المكون من هامش الفائدة الصافي والعمولات الصافية وأرباح الصرف والأدوات المالية."
    },
    "formula": "PNB = (Intérêts reçus − Intérêts versés) + (Commissions reçues − Commissions payées) + Gains de change & titres",
    "formula_latex": "\\\\text{PNB} = \\\\text{Marge d\\'intérêt} + \\\\text{Commissions nettes} + \\\\text{Résultat financier & change}",
    "interpretation": {
      "fr": "Reflète la dynamique commerciale globale et la capacité de la banque à monétiser son intermédiation et ses services.",
      "en": "Reflects commercial dynamism and the bank's capacity to monetize intermediation and payment services.",
      "ar": "يعكس الحركية التجارية وقدرة البنك على توليد مداخيل من الوساطة والخدمات المصرفية."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : PNB sectoriel de 430 Mds DZD, composé majoritairement de la marge d'intermédiation.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector Net Banking Income of 430 billion DZD.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: الناتج البنكي الصافي المجمع 430 مليار دج."
    },
    "unit": "Mds DZD",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Classements",
      "Scores ABIX (Dynamique)",
      "Historique"
    ],
    "related_terms": [
      "resultat-brut-exploitation",
      "resultat-net",
      "coefficient-exploitation",
      "marge-interet-nette"
    ],
    "display_order": 5
  },
  {
    "id": "resultat-brut-exploitation",
    "slug": "resultat-brut-exploitation",
    "term": {
      "fr": "Résultat Brut d'Exploitation",
      "en": "Gross Operating Income",
      "ar": "النتيجة الإجمالية للاستغلال"
    },
    "acronym": "RBE",
    "aliases": {
      "fr": [
        "Marge opérationnelle brute",
        "GOI"
      ],
      "en": [
        "Gross Operating Profit",
        "GOI",
        "Operating Profit before provisions"
      ],
      "ar": [
        "الربح التشغيلي الإجمالي",
        "فائض الاستغلال"
      ]
    },
    "category": "financial_indicators",
    "short_definition": {
      "fr": "Excédent généré par l'activité courante après déduction des frais généraux et des dotations aux amortissements.",
      "en": "Surplus generated by core operations after deducting general operating expenses and depreciation.",
      "ar": "الفائض المحقق من النشاط التشغيلي بعد خصم المصاريف العامة ومخصصات الاهتلاك."
    },
    "detailed_definition": {
      "fr": "Le RBE mesure la performance opérationnelle intrinsèque de la banque, indépendamment de sa politique de provisionnement du risque de crédit et des éléments exceptionnels. C'est le PNB diminué des charges de personnel, des autres charges générales et des amortissements.",
      "en": "GOI measures the pure operational profitability before credit risk provisions and non-recurring items. It equals NBI minus operating costs and depreciation.",
      "ar": "تقيس النتيجة الإجمالية للاستغلال الربحية التشغيلية قبل احتساب مخصصات مخاطر الائتمان والأعباء الاستثنائية."
    },
    "formula": "RBE = Produit Net Bancaire − Frais généraux d'exploitation − Dotations aux amortissements",
    "formula_latex": "\\\\text{RBE} = \\\\text{PNB} - \\\\text{Frais généraux} - \\\\text{Amortissements}",
    "interpretation": {
      "fr": "Un RBE positif et en croissance démontre la maîtrise des charges d'exploitation face aux revenus générés.",
      "en": "A solid and growing GOI demonstrates disciplined cost management relative to commercial revenue.",
      "ar": "تدل النتيجة التشغيلية الإيجابية والمتنامية على التحكم الجيد في النفقات التشغيلية مقارنة بالإيرادات."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : RBE sectoriel de 245 Mds DZD.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector Gross Operating Income of 245 billion DZD.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: النتيجة الإجمالية للاستغلال المجمعة 245 مليار دج."
    },
    "unit": "Mds DZD",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Classements",
      "Scores ABIX (Efficience)"
    ],
    "related_terms": [
      "produit-net-bancaire",
      "resultat-net",
      "coefficient-exploitation",
      "conversion-rbe-rn"
    ],
    "display_order": 6
  },
  {
    "id": "resultat-net",
    "slug": "resultat-net",
    "term": {
      "fr": "Résultat Net de l'exercice",
      "en": "Net Profit (Net Income)",
      "ar": "النتيجة الصافية للسنة المالية"
    },
    "acronym": "RN",
    "aliases": {
      "fr": [
        "Bénéfice net",
        "Résultat net comptable",
        "Net Income"
      ],
      "en": [
        "Net Income",
        "Net Profit",
        "Bottom Line"
      ],
      "ar": [
        "صافي الأرباح",
        "النتيجة الصافية"
      ]
    },
    "category": "financial_indicators",
    "short_definition": {
      "fr": "Bénéfice ou perte finale revenant à l'établissement après déduction du coût du risque et des impôts.",
      "en": "Bottom-line profit or loss attributable to the bank after credit risk provisions and corporate taxes.",
      "ar": "الربح أو الخسارة النهائية المحققة بعد خصم مخصصات المخاطر والضرائب على الأرباح."
    },
    "detailed_definition": {
      "fr": "Le Résultat Net mesure l'enrichissement comptable net généré sur l'exercice. Il s'obtient en déduisant du RBE le coût net du risque (dotations nettes aux provisions pour créances douteuses) et l'impôt sur les bénéfices des sociétés (IBS), puis en intégrant le résultat exceptionnel.",
      "en": "Net Income represents final net earnings after cost of risk (loan provisions), corporate income tax (IBS), and non-operating gains/losses.",
      "ar": "يمثل صافي الربح المحاسبي المحقق خلال السنة المالية بعد خصم تكلفة المخاطر والضرائب على أرباح الشركات."
    },
    "formula": "Résultat Net = RBE − Coût net du risque (Provisions nettes) + Résultat exceptionnel − Impôts (IBS)",
    "formula_latex": "\\\\text{RN} = \\\\text{RBE} - \\\\text{Coût du risque} \\\\pm \\\\text{Exceptionnel} - \\\\text{Impôts}",
    "interpretation": {
      "fr": "Indicateur ultime de rentabilité financière. Il alimente directement les fonds propres (mise en réserve) ou la distribution de dividendes.",
      "en": "Ultimate measure of financial return. It directly builds equity through retained earnings or funds dividend distribution.",
      "ar": "المقياس النهائي للمردودية المالية، ويغذي مباشرة الأموال الخاصة لتعزيز الملاءة أو توزيع الأرباح."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Résultat net sectoriel consolidé de 185 Mds DZD.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Consolidated sector net profit of 185 billion DZD.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: النتيجة الصافية المجمعة 185 مليار دج."
    },
    "unit": "Mds DZD",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Classements",
      "Scores ABIX (Rentabilité)",
      "Historique"
    ],
    "related_terms": [
      "produit-net-bancaire",
      "resultat-brut-exploitation",
      "return-on-equity",
      "return-on-assets"
    ],
    "display_order": 7
  },
  {
    "id": "bons-du-tresor",
    "slug": "bons-du-tresor",
    "term": {
      "fr": "Bons du Trésor & Titres d'État",
      "en": "Treasury Securities & Sovereign Bonds",
      "ar": "سندات الخزينة والأوراق السيادية"
    },
    "acronym": "BT",
    "aliases": {
      "fr": [
        "BDT",
        "Titres souverains",
        "Placements en Bons du Trésor",
        "Obligations du Trésor"
      ],
      "en": [
        "Treasury Bonds",
        "Sovereign Debt",
        "Government Securities"
      ],
      "ar": [
        "السندات السيادية",
        "سندات الخزينة العمومية"
      ]
    },
    "category": "financial_indicators",
    "short_definition": {
      "fr": "Stock de titres de créance souverains émis par le Trésor public algérien détenus par la banque à l'actif.",
      "en": "Outstanding stock of sovereign debt securities issued by the Algerian Treasury held by the bank.",
      "ar": "رصيد السندات والأوراق المالية الصادرة عن الخزينة العمومية الجزائرية والمحتفظ بها في أصول البنك."
    },
    "detailed_definition": {
      "fr": "Comprend les Bons du Trésor à court terme (BTCT) et les Bons du Trésor à Moyen et Long Terme (BMTN/OAT). Dans le secteur bancaire algérien, les BDT constituent une composante majeure d'allocation d'actifs et de gestion de trésorerie. Note réglementaire : Les titres souverains peuvent bénéficier d'un traitement prudentiel favorable selon le cadre réglementaire applicable, la nature de l'exposition et les conditions prévues par la réglementation.",
      "en": "Includes short-term and medium/long-term sovereign paper issued by the State Treasury. In Algeria, Treasury paper represents a core asset allocation pillar. Prudential note: Sovereign exposures may benefit from preferential prudential treatment in accordance with applicable regulatory frameworks and qualifying criteria.",
      "ar": "تشمل سندات الخزينة قصيرة ومتوسطة وطويلة الأجل، وتعتبر عنصراً أساسياً في توظيف السيولة الفائضة وإدارة الأصول. ملاحظة تنظيمية: قد تستفيد السندات السيادية من معاملة حيطية تفضيلية وفقاً للضوابط المعمول بها وطبيعة الالتزام."
    },
    "formula": "Bons du Trésor = Bons du Trésor à Court Terme + Bons du Trésor à Moyen et Long Terme + Titres assimilés",
    "formula_latex": "\\\\text{BDT} = \\\\sum \\\\text{Titres d\\'État}",
    "interpretation": {
      "fr": "Une part élevée traduit une stratégie d'allocation prudente ou un excédent structurel de liquidité réinvesti en actifs souverains sans risque de contrepartie privée.",
      "en": "A high share reflects a conservative asset allocation strategy or surplus liquidity invested in sovereign debt.",
      "ar": "ارتفاع حصة السندات يعكس توجهاً استثمارياً محافظاً أو إعادة توظيف لفائض السيولة في أصول سيادية."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Portefeuille sectoriel de Bons du Trésor de 3 800 Mds DZD.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector Treasury securities portfolio of 3,800 billion DZD.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: إجمالي محفظة سندات الخزينة 3,800 مليار دج."
    },
    "unit": "Mds DZD",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Classements",
      "Historique",
      "Allocation d'actifs"
    ],
    "related_terms": [
      "total-bilan",
      "credits-clientele",
      "bdt-total-actif"
    ],
    "display_order": 8
  },
  {
    "id": "return-on-equity",
    "slug": "return-on-equity",
    "term": {
      "fr": "Return on Equity (Rentabilité des Fonds Propres)",
      "en": "Return on Equity (ROE)",
      "ar": "العائد على حقوق الملكية"
    },
    "acronym": "ROE",
    "aliases": {
      "fr": [
        "Rentabilité financière",
        "Rendement des capitaux propres",
        "ROE publié"
      ],
      "en": [
        "ROE",
        "Return on Equity",
        "Shareholders Return"
      ],
      "ar": [
        "مردودية الأموال الخاصة",
        "العائد المالي للمساهمين"
      ]
    },
    "category": "ratios_profitability",
    "calculation_status": "IMPORTED_DATA",
    "short_definition": {
      "fr": "Indicateur de rentabilité des fonds propres publié par la source financière puis importé dans ABIX.",
      "en": "Return-on-equity indicator published by the financial source and then imported into ABIX.",
      "ar": "مؤشر العائد على حقوق الملكية كما تنشره الجهة المالية ثم يُستورد إلى ABIX."
    },
    "detailed_definition": {
      "fr": "ABIX Data Explorer ne recalcule pas le ROE : il conserve la valeur publiée ou importée depuis la source annuelle. Le dénominateur exact peut donc suivre la convention de la source (fonds propres moyens, de clôture ou ajustés). Cette définition doit être vérifiée dans le document source ; le ROAE reste un concept pédagogique distinct.",
      "en": "ABIX Data Explorer does not recalculate ROE: it preserves the value published or imported from the annual source. The exact denominator may therefore follow the source convention (average, closing, or adjusted equity). Verify that definition in the source document; ROAE remains a separate educational concept.",
      "ar": "لا يعيد ABIX Data Explorer احتساب ROE، بل يحافظ على القيمة المنشورة أو المستوردة من المصدر السنوي. وقد يتبع المقام اتفاقية المصدر، سواء حقوق الملكية المتوسطة أو الختامية أو المعدلة. يجب التحقق من التعريف في وثيقة المصدر، بينما يبقى ROAE مفهوماً تعليمياً منفصلاً."
    },
    "formula": "ROE = valeur publiée/importée (convention du document source)",
    "formula_latex": "\\\\text{ROE}_{ABIX} = \\\\text{valeur publiée ou importée}",
    "interpretation": {
      "fr": "Un ROE élevé témoigne d'une rentabilité financière robuste, mais doit être analysé conjointement avec le levier financier et le profil de risque.",
      "en": "A higher ROE reflects strong financial profitability, but must be evaluated alongside leverage and underlying risk profile.",
      "ar": "يشير العائد المرتفع إلى ربحية مالية قوية، ويجب تحليله بالاقتران مع مستوى الرافعة المالية والمخاطر."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : ROE médian sectoriel de 9,8 %, avec des écarts allant de 3,5 % à plus de 22 % selon les modèles d'affaires.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector median ROE of 9.8%, ranging from 3.5% to over 22%.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: وسيط العائد على حقوق الملكية 9.8%، مع تفاوتات بين 3.5% وأكثر من 22%."
    },
    "unit": "%",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "ABIX_BENCHMARK",
    "regulatory_threshold": null,
    "abix_benchmark": "Modéré < 8 %, Standard sectoriel 8-15 %, Élevé > 15 %",
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Classements",
      "Profil Banque",
      "Scores ABIX (Rentabilité)",
      "Matrice Rentabilité vs Risque"
    ],
    "related_terms": [
      "return-on-average-equity",
      "return-on-assets",
      "fonds-propres",
      "resultat-net"
    ],
    "display_order": 9
  },
  {
    "id": "return-on-average-equity",
    "slug": "return-on-average-equity",
    "term": {
      "fr": "Return on Average Equity (ROAE)",
      "en": "Return on Average Equity (ROAE)",
      "ar": "العائد على متوسط حقوق الملكية"
    },
    "acronym": "ROAE",
    "aliases": {
      "fr": [
        "ROAE",
        "Rentabilité des fonds propres moyens"
      ],
      "en": [
        "ROAE",
        "Return on Average Equity"
      ],
      "ar": [
        "العائد على متوسط الأموال الخاصة"
      ]
    },
    "category": "ratios_profitability",
    "calculation_status": "NOT_CURRENTLY_AVAILABLE",
    "short_definition": {
      "fr": "Rapport entre le résultat net et la moyenne des fonds propres entre le début et la fin de l'exercice.",
      "en": "Ratio of net income to average equity between the beginning and end of the fiscal year.",
      "ar": "النسبة بين النتيجة الصافية ومتوسط حقوق الملكية بين بداية ونهاية السنة المالية."
    },
    "detailed_definition": {
      "fr": "Concept pédagogique : le ROAE utiliserait la moyenne des fonds propres d'ouverture et de clôture. ABIX ne le calcule pas actuellement et n'affiche aucune valeur ROAE dans les profils.",
      "en": "Educational concept: ROAE would use average opening and closing equity. ABIX does not currently calculate it or display ROAE values in bank profiles.",
      "ar": "مفهوم تعليمي: يستخدم ROAE متوسط حقوق الملكية الافتتاحية والختامية. لا يحسبه ABIX حالياً ولا يعرض له قيماً في ملفات البنوك."
    },
    "formula": "ROAE = [Résultat Net ÷ ((Fonds Propres t + Fonds Propres t-1) ÷ 2)] × 100",
    "formula_latex": "\\\\text{ROAE} = \\\\frac{\\\\text{Résultat Net}}{\\\\frac{\\\\text{Fonds Propres}_t + \\\\text{Fonds Propres}_{t-1}}{2}} \\\\times 100",
    "interpretation": {
      "fr": "Privilégié pour les analyses pluriannuelles fines en présence de fortes variations de fonds propres en cours d'exercice.",
      "en": "Preferred for rigorous multi-year analysis when material intra-year equity changes occur.",
      "ar": "يُفضل للتحليلات متعددة السنوات عند حدوث تغيرات هامة في رأس المال خلال الدورة."
    },
    "example": {
      "fr": "Exemple pédagogique uniquement : un calcul sur fonds propres moyens ne constitue pas une valeur ABIX publiée.",
      "en": "Educational example only: a calculation using average equity is not a published ABIX value.",
      "ar": "مثال تعليمي فقط: لا يمثل الحساب على متوسط حقوق الملكية قيمة منشورة من ABIX."
    },
    "unit": "%",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Exemple pédagogique — non calculé par ABIX",
    "modules": [
      "Glossaire pédagogique"
    ],
    "related_terms": [
      "return-on-equity",
      "return-on-assets",
      "fonds-propres"
    ],
    "display_order": 10
  },
  {
    "id": "return-on-assets",
    "slug": "return-on-assets",
    "term": {
      "fr": "Return on Assets (Rentabilité des Actifs)",
      "en": "Return on Assets (ROA)",
      "ar": "العائد على الأصول"
    },
    "acronym": "ROA",
    "aliases": {
      "fr": [
        "Rentabilité économique",
        "Rendement des actifs",
        "ROA de clôture",
        "Proxy RoA"
      ],
      "en": [
        "ROA",
        "Return on Total Assets"
      ],
      "ar": [
        "مردودية الأصول",
        "العائد على الموجودات"
      ]
    },
    "category": "ratios_profitability",
    "calculation_status": "CALCULATED_BY_ABIX",
    "short_definition": {
      "fr": "Rapport entre le résultat net et le total bilan de clôture, mesurant l'efficacité productive globale des actifs.",
      "en": "Ratio of net income to closing total assets, measuring overall asset productivity.",
      "ar": "النسبة بين النتيجة الصافية وإجمالي الميزانية في ختام الدورة، وتقيس الكفاءة الإنتاجية الإجمالية للأصول."
    },
    "detailed_definition": {
      "fr": "Dans ABIX Data Explorer, le ROA est calculé sur le bilan de clôture au 31 décembre. Il mesure la capacité d'un établissement à rentabiliser chaque dinar d'actif géré, indépendamment de sa structure de financement par dette ou fonds propres.",
      "en": "In ABIX Data Explorer, ROA is computed on closing balance sheet assets as of December 31. It measures the bank's ability to generate earnings per unit of asset managed.",
      "ar": "في ABIX Data Explorer، يُحتسب ROA على ميزانية الختام في 31 ديسمبر. يقيس قدرة البنك على توليد أرباح صافية من كل دينار من الأصول المدارة."
    },
    "formula": "ROA = (Résultat Net ÷ Total Bilan de clôture) × 100",
    "formula_latex": "\\\\text{ROA} = \\\\frac{\\\\text{Résultat Net}}{\\\\text{Total Bilan}_{\\\\text{clôture}}} \\\\times 100",
    "interpretation": {
      "fr": "Un indicateur clé de rentabilité industrielle. Dans le secteur bancaire, un ROA supérieur à 1,5 % témoigne d'une rentabilité opérationnelle robuste.",
      "en": "A key indicator of operational profitability. In banking, a ROA above 1.5% reflects strong underlying earning power.",
      "ar": "مؤشر رئيسي للمردودية الاقتصادية. في القطاع المصرفي، يشير ROA الأعلى من 1.5% إلى أداء تشغيلي قوي."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : ROA moyen sectoriel de 1,12 %, avec des pointes supérieures à 2,5 % pour certaines banques privées spécialisées.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector average ROA of 1.12%, with peaks above 2.5% among private specialized institutions.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: متوسط ROA القطاعي 1.12%، ويتجاوز 2.5% لدى بعض البنوك الخاصة المتخصصة."
    },
    "unit": "%",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "ABIX_BENCHMARK",
    "regulatory_threshold": null,
    "abix_benchmark": "Modéré < 0,8 %, Moyen 0,8-1,5 %, Élevé > 1,5 %",
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Classements",
      "Profil Banque",
      "Scores ABIX (Rentabilité)",
      "Matrice 4 Quadrants"
    ],
    "related_terms": [
      "return-on-average-assets",
      "return-on-equity",
      "total-bilan",
      "resultat-net"
    ],
    "display_order": 11
  },
  {
    "id": "return-on-average-assets",
    "slug": "return-on-average-assets",
    "term": {
      "fr": "Return on Average Assets (ROAA)",
      "en": "Return on Average Assets (ROAA)",
      "ar": "العائد على متوسط الأصول"
    },
    "acronym": "ROAA",
    "aliases": {
      "fr": [
        "ROAA",
        "Rentabilité des actifs moyens"
      ],
      "en": [
        "ROAA",
        "Return on Average Assets"
      ],
      "ar": [
        "العائد على متوسط الموجودات"
      ]
    },
    "category": "ratios_profitability",
    "calculation_status": "NOT_CURRENTLY_AVAILABLE",
    "short_definition": {
      "fr": "Rapport entre le résultat net et la moyenne des actifs totaux entre l'ouverture et la clôture de l'exercice.",
      "en": "Ratio of net income to average total assets across the fiscal year.",
      "ar": "النسبة بين النتيجة الصافية ومتوسط إجمالي الأصول بين بداية ونهاية السنة المالية."
    },
    "detailed_definition": {
      "fr": "Concept pédagogique : le ROAA utiliserait la moyenne des actifs d'ouverture et de clôture. ABIX ne le calcule pas actuellement et n'affiche aucune valeur ROAA dans les profils.",
      "en": "Educational concept: ROAA would use average opening and closing assets. ABIX does not currently calculate it or display ROAA values in bank profiles.",
      "ar": "مفهوم تعليمي: يستخدم ROAA متوسط الأصول الافتتاحية والختامية. لا يحسبه ABIX حالياً ولا يعرض له قيماً في ملفات البنوك."
    },
    "formula": "ROAA = [Résultat Net ÷ ((Total Bilan t + Total Bilan t-1) ÷ 2)] × 100",
    "formula_latex": "\\\\text{ROAA} = \\\\frac{\\\\text{Résultat Net}}{\\\\frac{\\\\text{Total Bilan}_t + \\\\text{Total Bilan}_{t-1}}{2}} \\\\times 100",
    "interpretation": {
      "fr": "Standard international recommandé pour neutraliser les effets de saisonnalité ou d'expansion brutale de fin d'exercice.",
      "en": "International benchmark standard to neutralize year-end balance sheet seasonality.",
      "ar": "المعيار المالي الموصى به لتحييد التأثيرات الموسمية أو التوسع المفاجئ في الميزانية في نهاية السنة."
    },
    "example": {
      "fr": "Exemple pédagogique uniquement : un calcul sur actifs moyens ne constitue pas une valeur ABIX publiée.",
      "en": "Educational example only: a calculation using average assets is not a published ABIX value.",
      "ar": "مثال تعليمي فقط: لا يمثل الحساب على متوسط الأصول قيمة منشورة من ABIX."
    },
    "unit": "%",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Exemple pédagogique — non calculé par ABIX",
    "modules": [
      "Glossaire pédagogique"
    ],
    "related_terms": [
      "return-on-assets",
      "return-on-equity",
      "total-bilan"
    ],
    "display_order": 12
  },
  {
    "id": "coefficient-exploitation",
    "slug": "coefficient-exploitation",
    "term": {
      "fr": "Coefficient d'Exploitation",
      "en": "Cost-to-Income Ratio (CIR)",
      "ar": "نسبة التكلفة إلى الدخل (معامل الاستغلال)"
    },
    "acronym": "CIR",
    "aliases": {
      "fr": [
        "Cost-to-Income",
        "Ratio d'efficience",
        "Charges / PNB"
      ],
      "en": [
        "Cost-to-Income Ratio",
        "CIR",
        "Efficiency Ratio",
        "Operating Expense Ratio"
      ],
      "ar": [
        "معامل الاستغلال",
        "نسبة الكفاءة التشغيلية",
        "المصاريف إلى الدخل"
      ]
    },
    "category": "ratios_profitability",
    "short_definition": {
      "fr": "Part du Produit Net Bancaire absorbée par les frais généraux et les amortissements.",
      "en": "Share of Net Banking Income consumed by operating overhead and depreciation.",
      "ar": "نسبة الناتج البنكي الصافي التي تستهلكها المصاريف العامة ومخصصات الاهتلاك."
    },
    "detailed_definition": {
      "fr": "Le coefficient d'exploitation mesure l'efficience productive et la productivité des charges de fonctionnement de la banque. Plus le ratio est bas, plus la banque est efficace pour transformer son chiffre d'affaires en résultat opérationnel. Dans le modèle de scoring ABIX, cet indicateur est à sens inversé (plus faible = plus favorable).",
      "en": "The CIR measures operational efficiency. A lower ratio indicates higher operational productivity in converting revenues to gross profit. In ABIX scoring models, it operates as an inverted metric (lower is better).",
      "ar": "يقيس الكفاءة التشغيلية والإنتاجية. كلما انخفض المعامل، زادت كفاءة البنك في تحويل إيراداته إلى أرباح تشغيلية. في تصنيف ABIX، يعد هذا المؤشر ذا اتجاه عكسي (الأقل = أفضل)."
    },
    "formula": "Coefficient d'Exploitation = [(Frais généraux + Amortissements) ÷ Produit Net Bancaire] × 100",
    "formula_latex": "\\\\text{CIR} = \\\\frac{\\\\text{Frais généraux} + \\\\text{Amortissements}}{\\\\text{PNB}} \\\\times 100",
    "interpretation": {
      "fr": "Un ratio bas traduit une haute productivité opérationnelle. Un ratio supérieur à 60-65 % signale une structure de coûts lourde absorbant une fraction excessive du PNB.",
      "en": "A lower ratio reflects lean operations. A ratio above 60-65% indicates elevated structural overhead.",
      "ar": "يدل المعامل المنخفض على كفاءة تشغيلية ممتازة، بينما يشير تجاوزه لـ 60-65% إلى ثقل المصاريف العامة."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Coefficient d'exploitation médian sectoriel de 43,5 %, les banques les plus efficientes se situant sous les 35 %.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector median CIR of 43.5%, top-tier efficient banks standing below 35%.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: وسيط معامل الاستغلال القطاعي 43.5%، مع نزول البنوك الأكثر كفاءة دون 35%."
    },
    "unit": "%",
    "performance_direction": "lower_is_better",
    "higher_is_better": false,
    "threshold_type": "ABIX_BENCHMARK",
    "regulatory_threshold": null,
    "abix_benchmark": "Excellente efficience < 40 %, Moyen 40-55 %, Faible efficience > 60 %",
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Classements",
      "Profil Banque",
      "Scores ABIX (Efficience)",
      "Historique"
    ],
    "related_terms": [
      "produit-net-bancaire",
      "resultat-brut-exploitation",
      "conversion-rbe-rn"
    ],
    "display_order": 13
  },
  {
    "id": "marge-interet-nette",
    "slug": "marge-interet-nette",
    "term": {
      "fr": "Marge d'Intérêt Nette (NIM)",
      "en": "Net Interest Margin (NIM)",
      "ar": "هامش الفائدة الصافي"
    },
    "acronym": "NIM",
    "aliases": {
      "fr": [
        "NIM",
        "Marge nette d'intermédiation",
        "Productivité du bilan"
      ],
      "en": [
        "Net Interest Margin",
        "NIM",
        "Interest Spread Margin"
      ],
      "ar": [
        "هامش الفائدة الصافي",
        "هامش الوساطة المصرفية"
      ]
    },
    "category": "ratios_profitability",
    "short_definition": {
      "fr": "Rapport entre la marge d'intérêt nette perçue et le volume des actifs productifs d'intérêts.",
      "en": "Ratio of net interest income earned to interest-earning assets.",
      "ar": "النسبة بين دخل الفائدة الصافي وإجمالي الأصول المنتجة للفوائد."
    },
    "detailed_definition": {
      "fr": "La Marge d'Intérêt Nette mesure la rentabilité brute de l'activité d'intermédiation financière (prêts, titres obligataires, dépôts rémunérés). Note méthodologique ABIX : Dans les restitutions sectorielles où le détail fin des actifs productifs moyens n'est pas disponible de façon homogène, ABIX utilise le ratio proxy PNB / Total Bilan (Productivité globale du bilan).",
      "en": "NIM measures the core spread profitability of financial intermediation. ABIX methodology note: Where detailed average earning assets are not homogeneously reported across all banks, ABIX applies the NBI / Total Assets proxy ratio.",
      "ar": "يقيس الهامش الصافي لنشاط الوساطة المصرفية. ملاحظة ABIX: في غياب تفصيل متجانس للأصول المنتجة، تعتمد المنصة نسبة PNB / إجمالي الميزانية كمؤشر بديل للإنتاجية."
    },
    "formula": "NIM théorique = (Marge d'intérêt nette ÷ Actifs productifs moyens) × 100 | Proxy ABIX = (PNB ÷ Total Bilan) × 100",
    "formula_latex": "\\\\text{NIM} = \\\\frac{\\\\text{Marge d\\'intérêt}}{\\\\text{Actifs productifs}} \\\\times 100",
    "interpretation": {
      "fr": "Une marge confortable reflète un bon pouvoir de tarification sur les crédits et une ressource clientèle bon marché.",
      "en": "A healthy margin reflects loan pricing discipline combined with low-cost customer funding.",
      "ar": "يعكس الهامش الجيد تسعيراً فعالاً للقروض مع كلفة منخفضة لودائع العملاء."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Ratio proxy PNB / Total bilan sectoriel moyen de 2,35 %.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector average NBI / Total Assets proxy of 2.35%.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: متوسط نسبة PNB / الميزانية القطاعي 2.35%."
    },
    "unit": "%",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "ABIX_BENCHMARK",
    "regulatory_threshold": null,
    "abix_benchmark": "Standard sectoriel 2,0-3,5 %",
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Historique"
    ],
    "related_terms": [
      "produit-net-bancaire",
      "total-bilan",
      "ratio-prets-depots"
    ],
    "display_order": 14
  },
  {
    "id": "marge-nette-pnb",
    "slug": "marge-nette-pnb",
    "term": {
      "fr": "Marge Nette sur PNB",
      "en": "Net Profit Margin on NBI",
      "ar": "هامش الربح الصافي على الناتج البنكي"
    },
    "acronym": "NPM",
    "aliases": {
      "fr": [
        "Taux de marge nette",
        "Résultat Net / PNB",
        "Taux de transformation PNB"
      ],
      "en": [
        "Net Margin",
        "Net Profit Margin",
        "Net Income to NBI"
      ],
      "ar": [
        "هامش الربحية الصافية",
        "معدل تحويل الدخل إلى صافي ربح"
      ]
    },
    "category": "ratios_profitability",
    "short_definition": {
      "fr": "Pourcentage du Produit Net Bancaire effectivement converti en résultat net final.",
      "en": "Percentage of Net Banking Income successfully converted into final net profit.",
      "ar": "النسبة المئوية من الناتج البنكي الصافي التي تتحول إلى صافي ربح نهائي."
    },
    "detailed_definition": {
      "fr": "La Marge Nette sur PNB évalue la capacité globale de la banque à conserver ses revenus après avoir couvert ses frais généraux, amortissements, provisions pour risques et charges fiscales.",
      "en": "Net Profit Margin assesses the overall capacity of the bank to retain revenues after operating costs, loan impairment provisions, and corporate taxes.",
      "ar": "يقيس قدرة البنك على الاحتفاظ بإيراداته بعد تغطية المصاريف العامة ومخصصات المخاطر والضرائب."
    },
    "formula": "Marge Nette sur PNB = (Résultat Net ÷ Produit Net Bancaire) × 100",
    "formula_latex": "\\\\text{Marge Nette} = \\\\frac{\\\\text{Résultat Net}}{\\\\text{PNB}} \\\\times 100",
    "interpretation": {
      "fr": "Plus le ratio est élevé, plus le modèle opérationnel de la banque est rentable et résilient aux chocs de coûts.",
      "en": "A higher margin indicates a highly profitable and resilient operating model.",
      "ar": "كلما ارتفعت النسبة، دل ذلك على نموذج تشغيلي مربح وقادر على استيعاب ارتفاع التكاليف."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Taux de marge nette médian de 42,8 % sur la place algérienne.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector median net profit margin of 42.8%.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: وسيط هامش الربح الصافي القطاعي 42.8%."
    },
    "unit": "%",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "ABIX_BENCHMARK",
    "regulatory_threshold": null,
    "abix_benchmark": "Standard sectoriel 35-50 %",
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Scores ABIX (Rentabilité)"
    ],
    "related_terms": [
      "produit-net-bancaire",
      "resultat-net",
      "conversion-rbe-rn"
    ],
    "display_order": 15
  },
  {
    "id": "conversion-rbe-rn",
    "slug": "conversion-rbe-rn",
    "term": {
      "fr": "Taux de Conversion RBE en Résultat Net",
      "en": "GOI to Net Profit Conversion Rate",
      "ar": "معدل تحويل النتيجة التشغيلية إلى نتيجة صافية"
    },
    "acronym": "RBE_RN",
    "aliases": {
      "fr": [
        "Taux de transformation RBE",
        "Résultat Net / RBE",
        "Efficience de conversion"
      ],
      "en": [
        "GOI Conversion Rate",
        "Operating Profit Retention"
      ],
      "ar": [
        "معدل الاحتفاظ بالربح التشغيلي",
        "كفاءة التحويل الصافي"
      ]
    },
    "category": "ratios_profitability",
    "calculation_status": "CALCULATED_BY_ABIX",
    "short_definition": {
      "fr": "Rapport entre le résultat net et le résultat brut d'exploitation (RBE).",
      "en": "Ratio of net profit to Gross Operating Income (GOI).",
      "ar": "نسبة النتيجة الصافية إلى النتيجة الإجمالية للاستغلال."
    },
    "detailed_definition": {
      "fr": "Cet indicateur rapproche deux agrégats comptables publiés. L'écart entre le RBE et le résultat net peut provenir notamment du coût du risque, de la fiscalité et d'éléments hors exploitation ; le ratio ne permet pas, à lui seul, d'attribuer une cause.",
      "en": "This indicator compares two reported accounting aggregates. The gap between GOI and net profit may reflect cost of risk, taxation and non-operating items; the ratio alone does not establish causality.",
      "ar": "يقارن هذا المؤشر بين مجموعين محاسبيين منشورين. وقد ينتج الفارق بين النتيجة التشغيلية والنتيجة الصافية عن تكلفة المخاطر والضرائب وعناصر أخرى؛ ولا تثبت النسبة وحدها علاقة سببية."
    },
    "formula": "Taux de Conversion RBE → RN = (Résultat Net ÷ RBE) × 100",
    "formula_latex": "\\\\text{Taux de Conversion} = \\\\frac{\\\\text{Résultat Net}}{\\\\text{RBE}} \\\\times 100",
    "interpretation": {
      "fr": "À lire dans le temps et avec les composantes disponibles. Une variation décrit une conversion comptable différente, sans diagnostic causal automatique.",
      "en": "Read over time and with available components. A change describes a different accounting conversion, without an automatic causal diagnosis.",
      "ar": "تُقرأ النسبة عبر الزمن ومع المكونات المتاحة. ويصف التغير تحويلاً محاسبياً مختلفاً من دون تشخيص سببي تلقائي."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Taux de conversion médian de 75,5 %.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector median conversion rate of 75.5%.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: وسيط معدل التحويل القطاعي 75.5%."
    },
    "unit": "%",
    "performance_direction": "contextual",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Scores ABIX (Efficience)"
    ],
    "related_terms": [
      "resultat-brut-exploitation",
      "resultat-net",
      "pression-provision-rbe"
    ],
    "display_order": 16
  },
  {
    "id": "ratio-solvabilite",
    "slug": "ratio-solvabilite",
    "term": {
      "fr": "Ratio de Solvabilité Réglementaire (CAR)",
      "en": "Capital Adequacy Ratio (CAR)",
      "ar": "معدل الملاءة المالية التنظيمية"
    },
    "acronym": "CAR",
    "aliases": {
      "fr": [
        "Ratio Cooke/McDonough",
        "Ratio de solvabilité global",
        "Fonds propres / Risques pondérés"
      ],
      "en": [
        "Capital Adequacy Ratio",
        "CAR",
        "Solvency Ratio",
        "Regulatory Capital to RWA"
      ],
      "ar": [
        "نسبة كفاية رأس المال",
        "معدل الملاءة الإجمالي"
      ]
    },
    "category": "risk_solvency",
    "short_definition": {
      "fr": "Rapport entre les fonds propres réglementaires et les actifs pondérés par les risques (crédit, marché, opérationnel).",
      "en": "Ratio of regulatory capital to risk-weighted assets (credit, market, operational risks).",
      "ar": "النسبة بين الأموال الخاصة التنظيمية والأصول المرجحة بالمخاطر (الائتمان، السوق، والتشغيل)."
    },
    "detailed_definition": {
      "fr": "Le ratio de solvabilité réglementaire mesure la solidité prudentielle de la banque face à ses risques pondérés. Cadre réglementaire algérien : Selon le Règlement de la Banque d'Algérie n° 2014-01 du 16 février 2014 portant coefficients de solvabilité applicables aux banques et établissements financiers, les normes obligatoires sont : 1) Coefficient minimum de solvabilité global : au moins 9,5 % des risques pondérés ; 2) Fonds propres de base (Tier 1) : au moins 7,0 % des risques pondérés. Benchmark de confort ABIX : Pour absorber les chocs de cycle sur le marché algérien, un repère de confort indicatif se situe généralement entre 14 % et 18 %.",
      "en": "Measures the prudential capital cushion against risk-weighted assets. Algerian regulatory framework: Pursuant to Bank of Algeria Regulation No. 2014-01 of February 16, 2014, mandatory requirements are: 1) Minimum global capital adequacy ratio: at least 9.5% of risk-weighted assets; 2) Tier 1 capital: at least 7.0% of risk-weighted assets. ABIX comfort benchmark: An indicative comfort range in the local market is generally situated between 14% and 18%.",
      "ar": "يقيس الملاءة الحيطية للبنك أمام الأصول المرجحة بالمخاطر. الإطار التنظيمي الجزائري: وفقاً لنظام بنك الجزائر رقم 2014-01، فإن الحدود الإلزامية هي: 1) معدل الملاءة الإجمالي الأدنى: 9.5% على الأقل من المخاطر المرجحة؛ 2) الأموال الخاصة الأساسية (Tier 1): 7.0% على الأقل. معيار الراحة الموصى به لدى ABIX: يقع عادة بين 14% و18%."
    },
    "formula": "Ratio de Solvabilité = (Fonds Propres Réglementaires Globaux ÷ Actifs Pondérés par les Risques) × 100",
    "formula_latex": "\\\\text{CAR} = \\\\frac{\\\\text{Fonds Propres Réglementaires}}{\\\\text{RWA}} \\\\times 100",
    "interpretation": {
      "fr": "Un ratio supérieur à l'exigence légale de 9,5 % atteste de la conformité réglementaire. Un niveau très élevé (> 20 %) assure une sécurité maximale mais peut refléter une sous-utilisation des capacités de crédit.",
      "en": "A ratio exceeding the 9.5% legal minimum confirms regulatory compliance. A very high ratio (> 20%) ensures maximum safety but may signal under-deployed credit capacity.",
      "ar": "تجاوز الحد الأدنى القانوني 9.5% يؤكد الامتثال التنظيمي. وتجاوز 20% يمنح أماناً عالياً مع احتمال وجود تحفظ في منح القروض."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre bancaire algérien : Ratio moyen sectoriel estimé à ~16,2 %, largement au-dessus du plancher réglementaire de 9,5 %.",
      "en": "2024 data, ABIX 2025 edition: Sector average CAR estimated at ~16.2%, well above the 9.5% regulatory floor.",
      "ar": "بيانات 2024، إصدار ABIX 2025: متوسط معدل الملاءة القطاعي يقارب 16.2%، وهو أعلى بكثير من الحد الأدنى التنظيمي 9.5%."
    },
    "unit": "%",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "REGULATORY",
    "regulatory_threshold": "Solvabilité globale >= 9,5 % | Tier 1 >= 7,0 % (Règlement BA n° 2014-01)",
    "abix_benchmark": "Repère de confort ABIX >= 14-18 %",
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre bancaire algérien",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Scores ABIX (Solvabilité)",
      "Fiche Prudentielle"
    ],
    "related_terms": [
      "tier-1-ratio",
      "fonds-propres",
      "fonds-propres-total-bilan",
      "taux-npl"
    ],
    "display_order": 17
  },
  {
    "id": "tier-1-ratio",
    "slug": "tier-1-ratio",
    "term": {
      "fr": "Ratio de Fonds Propres de Base (Tier 1)",
      "en": "Tier 1 Capital Ratio",
      "ar": "معدل الأموال الخاصة الأساسية (Tier 1)"
    },
    "acronym": "Tier1",
    "aliases": {
      "fr": [
        "Ratio Tier 1",
        "Fonds propres durs / RWA",
        "Core Tier 1"
      ],
      "en": [
        "Tier 1 Ratio",
        "Core Capital Ratio",
        "Going-Concern Capital"
      ],
      "ar": [
        "نسبة الأموال الخاصة الأساسية",
        "معدل الشريحة الأولى"
      ]
    },
    "category": "risk_solvency",
    "short_definition": {
      "fr": "Rapport entre les fonds propres de la plus haute qualité (capital libéré et réserves pérennes) et les risques pondérés.",
      "en": "Ratio of highest quality core capital (paid-up capital and retained earnings) to risk-weighted assets.",
      "ar": "النسبة بين الأموال الخاصة عالية الجودة (رأس المال المدفوع والاحتياطيات) والمخاطر المرجحة."
    },
    "detailed_definition": {
      "fr": "Le ratio Tier 1 évalue la capacité de la banque à absorber les pertes immédiates en continuité d'exploitation (going-concern). Cadre réglementaire algérien : Le Règlement BA n° 2014-01 fixe le seuil minimal obligatoire des fonds propres de base à 7,0 % des actifs pondérés par les risques.",
      "en": "Tier 1 ratio evaluates the bank's capacity to absorb immediate losses on a going-concern basis. Algerian regulation: BA Regulation No. 2014-01 mandates a minimum Tier 1 capital ratio of 7.0% of risk-weighted assets.",
      "ar": "يقيم قدرة البنك على امتصاص الخسائر الفورية مع استمرار النشاط. الإطار التنظيمي الجزائري: يحدد نظام بنك الجزائر 2014-01 الحد الأدنى الإلزامي بـ 7.0% من الأصول المرجحة."
    },
    "formula": "Ratio Tier 1 = (Fonds Propres de Base Tier 1 ÷ Actifs Pondérés par les Risques) × 100",
    "formula_latex": "\\\\text{Ratio Tier 1} = \\\\frac{\\\\text{Tier 1 Capital}}{\\\\text{RWA}} \\\\times 100",
    "interpretation": {
      "fr": "Un ratio Tier 1 robuste garantit la pérennité financière de la banque sans nécessiter de recapitalisation d'urgence en cas de dégradation économique.",
      "en": "A strong Tier 1 ratio ensures long-term viability without requiring emergency capital injections in stress scenarios.",
      "ar": "يضمن معدل Tier 1 القوي استدامة البنك مالياً دون الحاجة إلى ضخ رأسمال استعجالي في فترات الأزمات."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025 : Ratio Tier 1 moyen des grandes banques algériennes estimé à plus de 13,5 %, conforme aux exigences prudentielles.",
      "en": "2024 data, ABIX 2025 edition: Average Tier 1 ratio of major Algerian banks estimated above 13.5%, compliant with regulations.",
      "ar": "بيانات 2024، إصدار ABIX 2025: يقدر متوسط معدل Tier 1 للبنوك الجزائرية بأكثر من 13.5%."
    },
    "unit": "%",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "REGULATORY",
    "regulatory_threshold": ">= 7,0 % (Règlement Banque d'Algérie n° 2014-01)",
    "abix_benchmark": "Repère de confort ABIX >= 11-14 %",
    "example_vintage": "Données 2024, Édition ABIX 2025, banques algériennes",
    "modules": [
      "Profil Banque",
      "Fiche Prudentielle"
    ],
    "related_terms": [
      "ratio-solvabilite",
      "fonds-propres",
      "fonds-propres-total-bilan"
    ],
    "display_order": 18
  },
  {
    "id": "taux-npl",
    "slug": "taux-npl",
    "term": {
      "fr": "Taux de Créances Non Performantes (NPL Ratio)",
      "en": "Non-Performing Loans Ratio (NPL Ratio)",
      "ar": "نسبة القروض المتعثرة (الديون غير المنتجة)"
    },
    "acronym": "NPL",
    "aliases": {
      "fr": [
        "Ratio NPL",
        "Taux de créances douteuses",
        "Créances compromises / Crédits"
      ],
      "en": [
        "NPL Ratio",
        "Bad Loan Ratio",
        "Impaired Loans Ratio",
        "Non-Performing Assets"
      ],
      "ar": [
        "نسبة الديون المتعثرة",
        "القروض المشكوك في تحصيلها"
      ]
    },
    "category": "risk_solvency",
    "calculation_status": "NOT_CURRENTLY_AVAILABLE",
    "short_definition": {
      "fr": "Proportion des crédits dont le remboursement présente un retard significatif (généralement > 90 jours) ou un risque de défaut avéré.",
      "en": "Proportion of loans with payments past due (typically > 90 days) or presenting recognized default risk.",
      "ar": "نسبة القروض التي تشهد تأخراً ملحوظاً في السداد (عادة أكثر من 90 يوماً) أو خطراً مؤكداً للتعثر."
    },
    "detailed_definition": {
      "fr": "Concept pédagogique de qualité des actifs. ABIX ne calcule ni n'affiche ce ratio actuellement, faute d'encours NPL bruts homogènes pour toutes les banques.",
      "en": "Educational asset-quality concept. ABIX does not currently calculate or display this ratio because homogeneous gross NPL balances are unavailable for all banks.",
      "ar": "مفهوم تعليمي لجودة الأصول. لا يحسب ABIX هذه النسبة ولا يعرضها حالياً لعدم توفر أرصدة NPL إجمالية ومتجانسة لكل البنوك."
    },
    "formula": "Taux NPL = (Créances Non Performantes brutes ÷ Encours Total des Crédits bruts) × 100",
    "formula_latex": "\\\\text{Taux NPL} = \\\\frac{\\\\text{Créances Douteuses}}{\\\\text{Total Crédits Bruts}} \\\\times 100",
    "interpretation": {
      "fr": "La formule est fournie à titre pédagogique uniquement ; aucune valeur, direction de performance ou alerte NPL n'est produite par ABIX.",
      "en": "The formula is educational only; ABIX produces no NPL value, performance direction or NPL alert.",
      "ar": "تُعرض الصيغة للتعليم فقط؛ ولا ينتج ABIX قيمة أو اتجاه أداء أو تنبيهاً خاصاً بـ NPL."
    },
    "example": {
      "fr": "Aucun exemple chiffré ABIX : les données nécessaires ne sont pas disponibles de façon homogène.",
      "en": "No ABIX numerical example: the required data are not homogeneously available.",
      "ar": "لا يوجد مثال رقمي من ABIX لأن البيانات اللازمة غير متاحة بشكل متجانس."
    },
    "unit": "%",
    "performance_direction": "contextual",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Concept pédagogique — non disponible actuellement",
    "modules": [
      "Glossaire pédagogique"
    ],
    "related_terms": [
      "taux-couverture-npl",
      "effort-provisionnement",
      "credits-clientele"
    ],
    "display_order": 19
  },
  {
    "id": "taux-couverture-npl",
    "slug": "taux-couverture-npl",
    "term": {
      "fr": "Taux de Couverture des NPL",
      "en": "NPL Coverage Ratio",
      "ar": "نسبة تغطية القروض المتعثرة بالمخصصات"
    },
    "acronym": "COV",
    "aliases": {
      "fr": [
        "Coverage Ratio",
        "Couverture des créances douteuses",
        "Provisions / NPL"
      ],
      "en": [
        "NPL Coverage Ratio",
        "Provisioning Coverage",
        "Impairment Coverage"
      ],
      "ar": [
        "نسبة تغطية الديون المتعثرة",
        "معدل التغطية بالمخصصات"
      ]
    },
    "category": "risk_solvency",
    "calculation_status": "NOT_CURRENTLY_AVAILABLE",
    "short_definition": {
      "fr": "Rapport entre les provisions cumulées pour dépréciation et le montant total des créances non performantes.",
      "en": "Ratio of accumulated loan loss provisions to total non-performing loans.",
      "ar": "النسبة بين المخصصات المتراكمة لتدني القروض وإجمالي الديون المتعثرة."
    },
    "detailed_definition": {
      "fr": "Concept pédagogique. ABIX ne calcule ni n'affiche ce ratio actuellement, faute de stock de provisions pour dépréciation et d'encours NPL homogènes pour toutes les banques.",
      "en": "Educational concept. ABIX does not currently calculate or display this ratio because homogeneous impairment-provision stocks and NPL balances are unavailable for all banks.",
      "ar": "مفهوم تعليمي. لا يحسب ABIX هذه النسبة ولا يعرضها حالياً لعدم توفر مخزون مخصصات وأرصدة NPL متجانسة لكل البنوك."
    },
    "formula": "Taux de Couverture = (Stock de Provisions pour Dépréciation ÷ Encours Brut des NPL) × 100",
    "formula_latex": "\\\\text{Taux de Couverture} = \\\\frac{\\\\text{Stock de Provisions}}{\\\\text{Créances NPL}} \\\\times 100",
    "interpretation": {
      "fr": "La formule est fournie à titre pédagogique uniquement ; aucun benchmark ni jugement de couverture n'est produit par ABIX.",
      "en": "The formula is educational only; ABIX produces no coverage benchmark or coverage assessment.",
      "ar": "تُعرض الصيغة للتعليم فقط؛ ولا ينتج ABIX معياراً أو تقييماً للتغطية."
    },
    "example": {
      "fr": "Exemple méthodologique : Pour 50 Mds DZD de créances classées douteuses provisionnées à hauteur de 40 Mds DZD, le taux de couverture s'établit à 80,0 %.",
      "en": "Methodological example: For 50B DZD in impaired loans with 40B DZD in cumulative provisions, the coverage ratio stands at 80.0%.",
      "ar": "مثال منهجي: مقابل 50 مليار دج من الديون المتعثرة المغطاة بـ 40 مليار دج من المخصصات، تبلغ نسبة التغطية 80.0%."
    },
    "unit": "%",
    "performance_direction": "contextual",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Exemple pédagogique — non disponible actuellement",
    "modules": [
      "Glossaire pédagogique"
    ],
    "related_terms": [
      "taux-npl",
      "effort-provisionnement",
      "credits-clientele"
    ],
    "display_order": 20
  },
  {
    "id": "effort-provisionnement",
    "slug": "effort-provisionnement",
    "term": {
      "fr": "Effort de Provisionnement / Prêts (Coût du Risque Proxy)",
      "en": "Provisioning Effort to Loans (Cost of Risk Proxy)",
      "ar": "جهد المخصصات إلى القروض (بديل تكلفة المخاطر)"
    },
    "acronym": "PROV_CRE",
    "aliases": {
      "fr": [
        "Provisions nettes / Crédits",
        "Coût du risque relatif",
        "Effort de couverture annuel"
      ],
      "en": [
        "Net Provisions to Loans",
        "Cost of Risk to Lending",
        "Provisioning Rate"
      ],
      "ar": [
        "المخصصات الصافية إلى القروض",
        "معدل تجنيب المخصصات"
      ]
    },
    "category": "risk_solvency",
    "calculation_status": "CALCULATED_BY_ABIX",
    "short_definition": {
      "fr": "Montant des dotations nettes aux provisions pour créances de l'exercice rapporté à l'encours global des crédits.",
      "en": "Annual net loan loss provisioning charges divided by total loan portfolio.",
      "ar": "مخصصات تدني القروض الصافية للدورة منسوبة إلى إجمالي محفظة القروض."
    },
    "detailed_definition": {
      "fr": "ABIX rapporte le flux annuel de dotations nettes disponible dans les états publiés à l'encours de prêts. Cette mesure de contexte ne constitue ni un taux NPL, ni un taux de couverture, ni une preuve directe de dégradation du portefeuille.",
      "en": "ABIX divides the available annual net-provision flow by outstanding loans. This contextual measure is neither an NPL ratio nor a coverage ratio and does not by itself prove portfolio deterioration.",
      "ar": "يقسم ABIX التدفق السنوي المتاح للمخصصات الصافية على رصيد القروض. وهو مقياس سياقي لا يمثل نسبة NPL أو نسبة تغطية ولا يثبت وحده تدهور المحفظة."
    },
    "formula": "Effort de Provisionnement = (Dotations Nettes aux Provisions ÷ Encours des Prêts) × 100",
    "formula_latex": "\\\\text{Effort Provisions} = \\\\frac{\\\\text{Dotations Nettes aux Provisions}}{\\\\text{Crédits Clientèle}} \\\\times 100",
    "interpretation": {
      "fr": "À lire conjointement avec son montant, son évolution et les autres agrégats disponibles. Un niveau élevé ou faible n'est pas automatiquement favorable ou défavorable.",
      "en": "Read together with the amount, its trend and other available aggregates. A high or low level is not automatically favorable or unfavorable.",
      "ar": "يُقرأ مع المبلغ وتطوره وبقية المجاميع المتاحة. ولا يُعد المستوى المرتفع أو المنخفض إيجابياً أو سلبياً تلقائياً."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Effort de provisionnement médian de 0,55 % des encours de crédit.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector median provisioning effort of 0.55% of total loans.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: وسيط جهد المخصصات 0.55% من إجمالي القروض."
    },
    "unit": "%",
    "performance_direction": "contextual",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Scores ABIX (Risque)",
      "Historique"
    ],
    "related_terms": [
      "taux-npl",
      "pression-provision-rbe",
      "credits-clientele"
    ],
    "display_order": 21
  },
  {
    "id": "cout-risque-pnb",
    "slug": "cout-risque-pnb",
    "term": {
      "fr": "Poids du Coût du Risque dans le PNB",
      "en": "Cost-of-Risk Weight in NBI",
      "ar": "وزن تكلفة المخاطر في الناتج البنكي الصافي"
    },
    "acronym": "CDR_PNB",
    "aliases": {
      "fr": [
        "Coût du risque / PNB",
        "Dotations nettes / PNB"
      ],
      "en": [
        "Cost of Risk to NBI",
        "Net Provisions to NBI"
      ],
      "ar": [
        "تكلفة المخاطر إلى الناتج البنكي الصافي",
        "المخصصات الصافية إلى الناتج البنكي الصافي"
      ]
    },
    "category": "risk_solvency",
    "calculation_status": "CALCULATED_BY_ABIX",
    "short_definition": {
      "fr": "Rapport entre les dotations nettes aux provisions de l'exercice et le Produit Net Bancaire.",
      "en": "Ratio of annual net provision charges to Net Banking Income.",
      "ar": "نسبة صافي مخصصات السنة إلى الناتج البنكي الصافي."
    },
    "detailed_definition": {
      "fr": "Indicateur officiel ABIX de matérialité du coût du risque : il conserve ensemble le montant des dotations, leur variation annuelle et leur poids dans le PNB. Il ne remplace ni le taux NPL ni le taux de couverture et ne permet pas, seul, d'établir la cause d'une variation.",
      "en": "ABIX's official cost-of-risk materiality indicator: it retains the provision amount, its annual change and its weight in NBI. It replaces neither the NPL ratio nor the coverage ratio and cannot establish causality on its own.",
      "ar": "مؤشر ABIX الرسمي لمادية تكلفة المخاطر: يحتفظ بمبلغ المخصصات وتغيره السنوي ووزنه في الناتج البنكي الصافي. ولا يعوض نسبة NPL أو التغطية ولا يثبت سبب التغير بمفرده."
    },
    "formula": "Poids du Coût du Risque = (Dotations Nettes aux Provisions ÷ PNB) × 100",
    "formula_latex": "\\\\text{Poids du coût du risque} = \\\\frac{\\\\text{Dotations nettes}}{\\\\text{PNB}} \\\\times 100",
    "interpretation": {
      "fr": "Lecture contextuelle par montant, évolution et écart à une référence disponible. Une hausse brute des dotations ne déclenche pas, à elle seule, une alerte ABIX.",
      "en": "Contextual reading by amount, trend and gap to an available reference. A raw increase in provisions does not trigger an ABIX alert by itself.",
      "ar": "قراءة سياقية حسب المبلغ والتطور والفارق عن مرجع متاح. ولا يؤدي الارتفاع الخام للمخصصات وحده إلى تنبيه ABIX."
    },
    "example": {
      "fr": "Exemple méthodologique : 5 Mds DZD de dotations nettes pour 50 Mds DZD de PNB correspondent à un poids de 10,0 %. L'interprétation conserve aussi le montant et le benchmark.",
      "en": "Methodological example: DZD 5bn of net provisions over DZD 50bn of NBI gives a 10.0% weight. Interpretation also retains the amount and benchmark.",
      "ar": "مثال منهجي: 5 مليارات دج من المخصصات الصافية مقابل 50 مليار دج من الناتج البنكي تعطي وزناً قدره 10.0٪، مع الاحتفاظ أيضاً بالمبلغ والمرجع."
    },
    "unit": "%",
    "performance_direction": "contextual",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Exemple méthodologique",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Executive Dashboard",
      "Historique"
    ],
    "related_terms": [
      "effort-provisionnement",
      "pression-provision-rbe",
      "produit-net-bancaire"
    ],
    "display_order": 21.5
  },
  {
    "id": "pression-provision-rbe",
    "slug": "pression-provision-rbe",
    "term": {
      "fr": "Pression du Provisionnement sur le RBE",
      "en": "Provision Burden on Gross Operating Income",
      "ar": "ضغط المخصصات على الناتج التشغيلي"
    },
    "acronym": "PROV_RBE",
    "aliases": {
      "fr": [
        "Provisions / RBE",
        "Pression du risque d'exploitation"
      ],
      "en": [
        "Provisions to GOI",
        "Operating Profit Absorption by Risk"
      ],
      "ar": [
        "المخصصات إلى الربح التشغيلي"
      ]
    },
    "category": "risk_solvency",
    "calculation_status": "CALCULATED_BY_ABIX",
    "short_definition": {
      "fr": "Fraction du Résultat Brut d'Exploitation absorbée par les dotations nettes aux provisions pour risques.",
      "en": "Percentage of Gross Operating Income consumed by net credit loss provisioning charges.",
      "ar": "النسبة المئوية من النتيجة الإجمالية للاستغلال التي تلتهمها مخصصات المخاطر الصافية."
    },
    "detailed_definition": {
      "fr": "Rapporte le flux annuel de dotations nettes au RBE disponible. Une variation peut résulter de plusieurs facteurs comptables ou économiques ; ABIX n'en déduit pas automatiquement une dégradation du risque client.",
      "en": "Divides the available annual net-provision flow by GOI. A change may reflect several accounting or economic factors; ABIX does not automatically infer borrower-risk deterioration.",
      "ar": "يقسم التدفق السنوي للمخصصات الصافية على النتيجة الإجمالية للاستغلال. وقد ينتج التغير عن عوامل محاسبية أو اقتصادية متعددة، ولا يستنتج ABIX تلقائياً تدهور مخاطر العملاء."
    },
    "formula": "Pression Provisions / RBE = (Dotations Nettes aux Provisions ÷ RBE) × 100",
    "formula_latex": "\\\\text{Pression Provisions} = \\\\frac{\\\\text{Dotations Nettes}}{\\\\text{RBE}} \\\\times 100",
    "interpretation": {
      "fr": "Lecture contextuelle : comparer le ratio dans le temps et à un groupe suffisamment large, en conservant le montant des dotations et le niveau du RBE.",
      "en": "Contextual reading: compare the ratio over time and with a sufficiently large group, while retaining the provision amount and GOI level.",
      "ar": "قراءة سياقية: تُقارن النسبة عبر الزمن ومع مجموعة كبيرة بما يكفي، مع الاحتفاظ بمبلغ المخصصات ومستوى النتيجة التشغيلية."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Pression médiane des provisions sur le RBE de 18,4 %.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector median provision burden on GOI of 18.4%.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: وسيط ضغط المخصصات على الناتج التشغيلي 18.4%."
    },
    "unit": "%",
    "performance_direction": "contextual",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Scores ABIX (Efficience & Risque)"
    ],
    "related_terms": [
      "resultat-brut-exploitation",
      "conversion-rbe-rn",
      "effort-provisionnement"
    ],
    "display_order": 22
  },
  {
    "id": "fonds-propres-total-bilan",
    "slug": "fonds-propres-total-bilan",
    "term": {
      "fr": "Fonds Propres / Total Bilan (Solidité Financière)",
      "en": "Equity to Total Assets (Financial Strength)",
      "ar": "حقوق الملكية إلى إجمالي الميزانية (المتانة المالية)"
    },
    "acronym": "FP_TB",
    "aliases": {
      "fr": [
        "Ratio de solidité financière bilancielle",
        "Capitaux propres / Bilan",
        "Autonomie financière"
      ],
      "en": [
        "Equity-to-Assets Ratio",
        "Capitalization Ratio",
        "Equity Cushion"
      ],
      "ar": [
        "نسبة الرسملة المحاسبية",
        "الأموال الخاصة إلى الميزانية"
      ]
    },
    "category": "risk_solvency",
    "calculation_status": "CALCULATED_BY_ABIX",
    "short_definition": {
      "fr": "Part du bilan couverte par les capitaux propres comptables de la banque.",
      "en": "Share of the balance sheet financed by book equity.",
      "ar": "نسبة الميزانية المغطاة بحقوق الملكية المحاسبية للبنك."
    },
    "detailed_definition": {
      "fr": "Indicateur comptable d'assise financière rapportant les fonds propres publiés au total du bilan. Il ne remplace pas un ratio réglementaire de solvabilité fondé sur les actifs pondérés par les risques (RWA).",
      "en": "Accounting measure of financial backing, dividing reported equity by total assets. It does not replace a regulatory solvency ratio based on risk-weighted assets (RWA).",
      "ar": "مؤشر محاسبي للمتانة المالية يقسم حقوق الملكية المنشورة على إجمالي الأصول. ولا يعوض نسبة الملاءة التنظيمية القائمة على الأصول المرجحة بالمخاطر."
    },
    "formula": "Fonds Propres / Total Bilan = (Fonds Propres Comptables ÷ Total Bilan) × 100",
    "formula_latex": "\\\\text{FP / Bilan} = \\\\frac{\\\\text{Fonds Propres}}{\\\\text{Total Bilan}} \\\\times 100",
    "interpretation": {
      "fr": "Dans la dimension ABIX de solidité financière, un ratio plus élevé traduit une couverture comptable relative plus importante ; l'interprétation reste distincte de la conformité prudentielle.",
      "en": "Within the ABIX Financial Strength dimension, a higher ratio means greater relative accounting backing; this remains distinct from prudential compliance.",
      "ar": "ضمن بُعد المتانة المالية في ABIX، تعني النسبة الأعلى تغطية محاسبية نسبية أكبر، مع بقائها مختلفة عن الامتثال الاحترازي."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : ratio sectoriel moyen de 13,2 %, à lire comme une mesure comptable et non comme une solvabilité réglementaire.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector average ratio of 13.2%, reflecting strong equity backing.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: متوسط النسبة القطاعية 13.2%."
    },
    "unit": "%",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "ABIX_BENCHMARK",
    "regulatory_threshold": null,
    "abix_benchmark": "Standard sectoriel 10-16 %",
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Scores ABIX (Solidité financière)",
      "Classements"
    ],
    "related_terms": [
      "fonds-propres",
      "total-bilan",
      "levier-financier",
      "ratio-solvabilite"
    ],
    "display_order": 23
  },
  {
    "id": "levier-financier",
    "slug": "levier-financier",
    "term": {
      "fr": "Levier Comptable (Total Bilan / Fonds Propres)",
      "en": "Accounting Leverage (Assets / Equity)",
      "ar": "الرافعة المالية المحاسبية (الميزانية / الأموال الخاصة)"
    },
    "acronym": "LEV",
    "aliases": {
      "fr": [
        "Levier bilanciel",
        "Multiple de fonds propres",
        "Actifs / Capitaux propres"
      ],
      "en": [
        "Accounting Leverage",
        "Equity Multiplier",
        "Assets to Equity"
      ],
      "ar": [
        "مضاعف حقوق الملكية",
        "الرافعة المحاسبية"
      ]
    },
    "category": "risk_solvency",
    "short_definition": {
      "fr": "Nombre de fois que les actifs totaux représentent les fonds propres de la banque.",
      "en": "Number of times total assets exceed the bank's book equity.",
      "ar": "عدد المرات التي تتجاوز فيها الأصول الإجمالية حقوق الملكية للبنك."
    },
    "detailed_definition": {
      "fr": "Le levier comptable mesure l'effet de démultiplication des fonds propres sur la taille du bilan. C'est l'inverse direct du ratio Fonds Propres / Bilan. Note méthodologique ABIX : Cet indicateur est un levier comptable simplifié bilanciel. Il ne correspond pas au ratio de levier réglementaire de Bâle III (qui intègre les éléments de hors-bilan et les déductions prudentielles de capital).",
      "en": "Measures balance sheet asset scale relative to equity backing. ABIX note: This is a simplified accounting leverage multiple and does not constitute the Basel III regulatory leverage ratio (which includes off-balance sheet items and prudential deductions).",
      "ar": "يقيس مضاعف الأصول مقارنة بحقوق الملكية. ملاحظة ABIX: هذا المؤشر رافعة محاسبية مبسطة ولا يمثل نسبة الرافعة التنظيمية لبازل 3 (التي تشمل الالتزامات خارج الميزانية)."
    },
    "formula": "Levier Comptable = Total Bilan ÷ Fonds Propres Comptables",
    "formula_latex": "\\\\text{Levier} = \\\\frac{\\\\text{Total Bilan}}{\\\\text{Fonds Propres}}",
    "interpretation": {
      "fr": "Un levier modéré (6x à 9x) offre une sécurité financière élevée. Un levier très élevé (> 15x) accroît la sensibilité aux chocs de solvabilité.",
      "en": "A moderate leverage (6x to 9x) ensures strong safety. Elevated leverage (> 15x) heightens solvency vulnerability.",
      "ar": "الرافعة المعتدلة (6 إلى 9 مرات) توفر أماناً مالياً مرتفعاً، بينما الرافعة المرتفعة جداً تزيد من الحساسية للصدمات."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Levier comptable médian sectoriel de 7,6x (pour 100 DZD de bilan, la banque dispose de ~13,2 DZD de fonds propres).",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector median accounting leverage of 7.6x.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: وسيط الرافعة المحاسبية القطاعية 7.6 أضعاف."
    },
    "unit": "x",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "ABIX_BENCHMARK",
    "regulatory_threshold": null,
    "abix_benchmark": "Repère prudentiel indicatif 6x à 10x",
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Comparateur"
    ],
    "related_terms": [
      "fonds-propres-total-bilan",
      "fonds-propres",
      "total-bilan"
    ],
    "display_order": 24
  },
  {
    "id": "ratio-prets-depots",
    "slug": "ratio-prets-depots",
    "term": {
      "fr": "Ratio Prêts / Dépôts (LDR)",
      "en": "Loan-to-Deposit Ratio (LDR)",
      "ar": "نسبة القروض إلى الودائع (معدل التحويل)"
    },
    "acronym": "LDR",
    "aliases": {
      "fr": [
        "LDR",
        "Taux de transformation des dépôts",
        "Crédits / Dépôts"
      ],
      "en": [
        "Loan-to-Deposit Ratio",
        "LDR",
        "Transformation Ratio",
        "LTD Ratio"
      ],
      "ar": [
        "نسبة القروض إلى الودائع",
        "معدل التحويل المصرفي"
      ]
    },
    "category": "liquidity_intermediation",
    "short_definition": {
      "fr": "Proportion des dépôts collectés auprès de la clientèle qui est effectivement réinvestie sous forme de crédits.",
      "en": "Proportion of customer deposits that is actively transformed and lent out as customer loans.",
      "ar": "نسبة ودائع العملاء التي يتم تحويلها وإعادة استثمارها فعلياً في شكل قروض."
    },
    "detailed_definition": {
      "fr": "Le ratio LDR (Loan-to-Deposit Ratio) mesure le degré d'intermédiation financière de la banque. Il compare les crédits nets accordés à la clientèle aux dépôts collectés. Un ratio équilibré garantit que l'octroi de crédit est intégralement adossé à des ressources stables sans dépendance excessive aux financements de marché.",
      "en": "The LDR measures the bank's financial intermediation depth. It compares net loans to customer deposits. A balanced ratio ensures that lending is funded by stable customer deposits without excessive reliance on wholesale funding.",
      "ar": "يقيس عمق الوساطة المصرفية ومستوى تحويل الودائع إلى قروض. وتضمن النسبة المتوازنة تمويل القروض من الودائع المستقرة."
    },
    "formula": "Ratio Prêts / Dépôts = (Crédits Nets à la Clientèle ÷ Dépôts de la Clientèle) × 100",
    "formula_latex": "\\\\text{LDR} = \\\\frac{\\\\text{Crédits Clientèle}}{\\\\text{Dépôts Clientèle}} \\\\times 100",
    "interpretation": {
      "fr": "Un ratio entre 70 % et 90 % traduit une intermédiation dynamique et équilibrée. En dessous de 60 %, la banque sous-emploie ses ressources ; au-delà de 100 %, elle dépend de refinancements extérieurs.",
      "en": "An LDR between 70% and 90% indicates balanced intermediation. Below 60%, resources are under-deployed; above 100%, the bank relies on external funding.",
      "ar": "تعتبر النسبة بين 70% و90% متوازنة ونشطة. أقل من 60% يدل على نقص توظيف الموارد، وأكثر من 100% يشير إلى الاعتماد على تمويلات خارجية."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : LDR moyen sectoriel de 78,2 %, témoignant d'une capacité d'adossement robuste des crédits sur les dépôts.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector average LDR of 78.2%, reflecting solid deposit backing.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: متوسط LDR القطاعي 78.2%."
    },
    "unit": "%",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "MARKET_REFERENCE",
    "regulatory_threshold": null,
    "abix_benchmark": "Sous-intermédiation < 60 %, Équilibré 70-90 %, Tension liquidité > 100 %",
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Comparateur",
      "Historique"
    ],
    "related_terms": [
      "depots-clientele",
      "credits-clientele",
      "ratio-lcr"
    ],
    "display_order": 25
  },
  {
    "id": "prets-total-actif",
    "slug": "prets-total-actif",
    "term": {
      "fr": "Part des Prêts dans l'Actif (Crédits / Bilan)",
      "en": "Loans to Total Assets",
      "ar": "حصة القروض في الأصول (القروض / الميزانية)"
    },
    "acronym": "CRE_TB",
    "aliases": {
      "fr": [
        "Crédits / Bilan",
        "Orientation crédit du bilan",
        "Taux d'emploi en crédits"
      ],
      "en": [
        "Loans to Assets",
        "Loan Asset Share",
        "Credit Intensity"
      ],
      "ar": [
        "نسبة القروض إلى الأصول",
        "كثافة الائتمان في الميزانية"
      ]
    },
    "category": "liquidity_intermediation",
    "short_definition": {
      "fr": "Pourcentage de l'actif total de la banque alloué aux crédits accordés à la clientèle.",
      "en": "Percentage of total bank assets allocated to customer loans.",
      "ar": "النسبة المئوية من إجمالي أصول البنك الموجهة لتمويل قروض العملاء."
    },
    "detailed_definition": {
      "fr": "Indique le profil d'allocation bilancielle de l'établissement. Une part de prêts élevée caractérise une banque commerciale axée sur le financement de l'économie réelle, tandis qu'une part faible indique une orientation marquée vers les titres publics et la trésorerie.",
      "en": "Reflects the bank's asset allocation profile. A high loan share characterizes a commercial lending bank, whereas a lower share indicates a sovereign paper or cash management focus.",
      "ar": "يعكس النمط الاستثماري لأصول البنك. ارتفاع حصة القروض يميز البنوك التجارية الموجهة لتمويل الاقتصاد، بينما انخفاضها يشير للتركيز على السندات والسيولة."
    },
    "formula": "Prêts / Total Bilan = (Encours des Crédits Clientèle ÷ Total Bilan) × 100",
    "formula_latex": "\\\\text{Prêts / Bilan} = \\\\frac{\\\\text{Crédits Clientèle}}{\\\\text{Total Bilan}} \\\\times 100",
    "interpretation": {
      "fr": "Mesure l'intensité d'intermédiation directe de la banque. Plus le ratio est élevé, plus les revenus dépendent du risque de crédit privé.",
      "en": "Measures core lending intensity. A higher ratio correlates with greater revenue sensitivity to private credit risk.",
      "ar": "يقيس كثافة الإقراض المباشر، وكلما ارتفعت النسبة ارتبطت إيرادات البنك أكثر بمخاطر الائتمان."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Part moyenne des prêts dans l'actif de 60,0 % sur le secteur bancaire algérien.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector average loan share of total assets of 60.0%.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: متوسط حصة القروض في الأصول 60.0%."
    },
    "unit": "%",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Allocation d'actifs",
      "Comparateur"
    ],
    "related_terms": [
      "credits-clientele",
      "total-bilan",
      "bdt-total-actif",
      "ratio-prets-depots"
    ],
    "display_order": 26
  },
  {
    "id": "bdt-total-actif",
    "slug": "bdt-total-actif",
    "term": {
      "fr": "Part des Bons du Trésor dans l'Actif (BDT / Bilan)",
      "en": "Treasury Securities to Total Assets",
      "ar": "حصة سندات الخزينة في الأصول (السندات / الميزانية)"
    },
    "acronym": "BT / bilan",
    "aliases": {
      "fr": [
        "BDT / Total actif",
        "BDT / Bilan",
        "Exposition souveraine bilancielle",
        "Titres d'État / Actif"
      ],
      "en": [
        "Treasury to Assets",
        "Sovereign Debt Exposure",
        "Government Securities Share"
      ],
      "ar": [
        "نسبة السندات إلى الأصول",
        "التعرض للسندات السيادية"
      ]
    },
    "category": "liquidity_intermediation",
    "short_definition": {
      "fr": "Pourcentage de l'actif total investi en titres souverains émis par le Trésor public algérien.",
      "en": "Percentage of total assets invested in sovereign debt securities issued by the Algerian State Treasury.",
      "ar": "النسبة المئوية من إجمالي الأصول المستثمرة في سندات الخزينة العمومية الجزائرية."
    },
    "detailed_definition": {
      "fr": "Mesure le poids des placements souverains dans la structure de l'actif. En Algérie, les banques publiques détiennent historiquement une fraction importante de BDT en contrepartie d'opérations d'assainissement financier ou de gestion de liquidité.",
      "en": "Measures the sovereign allocation weight within the asset base. Historically in Algeria, public banks hold material Treasury securities volumes from balance sheet restructuring and liquidity placements.",
      "ar": "يقيس وزن التوظيفات السيادية في هيكل الأصول. تاريخياً، تحتفظ البنوك العمومية بحصة هامة من سندات الخزينة لتوظيف السيولة."
    },
    "formula": "BDT / Total Bilan = (Encours des Bons du Trésor ÷ Total Bilan) × 100",
    "formula_latex": "\\\\text{BDT / Bilan} = \\\\frac{\\\\text{Bons du Trésor}}{\\\\text{Total Bilan}} \\\\times 100",
    "interpretation": {
      "fr": "Un ratio élevé sécurise la liquidité et dégage des revenus d'intérêts garantis par l'État, mais traduit une éviction relative du crédit à l'économie.",
      "en": "A high ratio secures liquidity and sovereign coupon income, but may reflect relative crowding-out of private sector credit.",
      "ar": "توفر النسبة المرتفعة أماناً ومداخيل مضمونة، لكنها قد تعكس توجيهاً أقل للموارد نحو تمويل الاقتصاد الخاص."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Part moyenne des BDT de 20,5 % du total bilan sectoriel.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Average Treasury securities share of 20.5% of sector total assets.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: متوسط حصة سندات الخزينة 20.5% من إجمالي الميزانية."
    },
    "unit": "%",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Allocation d'actifs"
    ],
    "related_terms": [
      "bons-du-tresor",
      "total-bilan",
      "prets-total-actif"
    ],
    "display_order": 27
  },
  {
    "id": "depots-total-passif",
    "slug": "depots-total-passif",
    "term": {
      "fr": "Part des Dépôts dans le Passif (Dépôts / Bilan)",
      "en": "Deposits to Total Assets (Liabilities)",
      "ar": "حصة الودائع في الخصوم (الودائع / الميزانية)"
    },
    "acronym": "DEP_TB",
    "aliases": {
      "fr": [
        "Dépôts / Bilan",
        "Taux d'adossement dépôts",
        "Ressources clientèle / Passif"
      ],
      "en": [
        "Deposits to Assets",
        "Customer Funding Ratio",
        "Deposit Funding Share"
      ],
      "ar": [
        "نسبة الودائع إلى الخصوم",
        "هيكل التمويل بالودائع"
      ]
    },
    "category": "liquidity_intermediation",
    "short_definition": {
      "fr": "Pourcentage du bilan financé par les dépôts collectés auprès de la clientèle.",
      "en": "Percentage of total balance sheet funded by customer deposits.",
      "ar": "النسبة المئوية من الميزانية الممولة عن طريق ودائع العملاء."
    },
    "detailed_definition": {
      "fr": "Mesure la dépendance de la structure financière de la banque vis-à-vis de sa collecte de dépôts clientèle par rapport aux autres sources de financement (fonds propres, dettes interbancaires, obligations).",
      "en": "Measures the bank's structural reliance on customer deposits compared to other funding sources (equity, interbank borrowing, bond issues).",
      "ar": "يقيس اعتماد الهيكل المالي للبنك على ودائع العملاء مقارنة بالمصادر الأخرى (الأموال الخاصة، الاقتراض بين البنوك)."
    },
    "formula": "Dépôts / Total Bilan = (Dépôts de la Clientèle ÷ Total Bilan) × 100",
    "formula_latex": "\\\\text{Dépôts / Bilan} = \\\\frac{\\\\text{Dépôts Clientèle}}{\\\\text{Total Bilan}} \\\\times 100",
    "interpretation": {
      "fr": "Une part supérieure à 75-80 % caractérise un modèle de banque de détail traditionnel bénéficiant d'une base de financement granulaire et stable.",
      "en": "A share above 75-80% characterizes a traditional commercial retail banking model with a granular, stable funding base.",
      "ar": "النسبة التي تتجاوز 75-80% تميز البنوك التجارية التقليدية التي تستفيد من قاعدة تمويلية عريضة ومستقرة."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Part moyenne des dépôts dans le passif de 76,8 %.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector average deposit share of 76.8% of total liabilities.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: متوسط حصة الودائع في الخصوم 76.8%."
    },
    "unit": "%",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Historique"
    ],
    "related_terms": [
      "depots-clientele",
      "total-bilan",
      "ratio-prets-depots"
    ],
    "display_order": 28
  },
  {
    "id": "autres-actifs",
    "slug": "autres-actifs",
    "term": {
      "fr": "Autres Actifs (Solde Résiduel de l'Actif)",
      "en": "Other Assets (Residual Balance)",
      "ar": "الأصول الأخرى (الرصيد المتبقي للأصول)"
    },
    "acronym": "AA",
    "aliases": {
      "fr": [
        "Solde résiduel de l'actif",
        "Autres emplois bilanciels"
      ],
      "en": [
        "Other Assets",
        "Residual Assets"
      ],
      "ar": [
        "الموجودات الأخرى",
        "الأصول المتبقية"
      ]
    },
    "category": "liquidity_intermediation",
    "short_definition": {
      "fr": "Part de l'actif total non représentée par les crédits à la clientèle et les Bons du Trésor.",
      "en": "Portion of total assets not accounted for by customer loans and Treasury securities.",
      "ar": "الجزء من إجمالي الأصول غير الممثل في القروض الممنوحة وسندات الخزينة."
    },
    "detailed_definition": {
      "fr": "Dans le modèle de décomposition bilancielle ABIX, les Autres Actifs correspondent au solde résiduel : Total Bilan moins les Prêts clientèle et moins les Bons du Trésor. Ce poste intègre la caisse, les avoirs auprès de la Banque d'Algérie et des correspondants, les immobilisations et les comptes de régularisation.",
      "en": "In ABIX balance sheet allocation models, Other Assets is the residual balance (Total Assets minus Loans minus Treasury Securities), encompassing cash, central bank reserves, interbank placements, fixed assets, and sundry accounts.",
      "ar": "في نموذج ABIX لتفكيك الأصول، تمثل الأصول الأخرى الفارق المتبقي (إجمالي الميزانية مطروحاً منه القروض وسندات الخزينة)، وتشمل السيولة النقدية، الاحتياطيات لدى بنك الجزائر والأصول الثابتة."
    },
    "formula": "Autres Actifs = Total Bilan − Prêts clientèle − Bons du Trésor",
    "formula_latex": "\\\\text{Autres Actifs} = \\\\text{Total Bilan} - \\\\text{Prêts} - \\\\text{BDT}",
    "interpretation": {
      "fr": "Permet de visualiser l'allocation bilancielle totale à 100 % (Prêts + BDT + Autres actifs = 100 %). Une valeur négative signale une anomalie de données.",
      "en": "Enables full 100% balance sheet decomposition (Loans + Treasury + Other = 100%). A negative value flags potential data inconsistency.",
      "ar": "يتيح العرض المتكامل لهيكل الأصول بنسبة 100%. القيمة السالبة تشير إلى خلل محتمل في البيانات."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Volume sectoriel des autres actifs d'environ 3 600 Mds DZD (soit ~19,5 % du total bilan).",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector other assets volume of ~3,600 billion DZD (~19.5% of total assets).",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: حجم الأصول الأخرى حوالي 3,600 مليار دج (~19.5% من إجمالي الميزانية)."
    },
    "unit": "Mds DZD",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Allocation d'actifs"
    ],
    "related_terms": [
      "total-bilan",
      "credits-clientele",
      "bons-du-tresor"
    ],
    "display_order": 29
  },
  {
    "id": "ratio-lcr",
    "slug": "ratio-lcr",
    "term": {
      "fr": "Ratio de Liquidité Court Terme (LCR)",
      "en": "Liquidity Coverage Ratio (LCR)",
      "ar": "نسبة تغطية السيولة قصيرة الأجل (LCR)"
    },
    "acronym": "LCR",
    "aliases": {
      "fr": [
        "LCR",
        "Ratio de liquidité à 30 jours",
        "Liquidité Bâle III"
      ],
      "en": [
        "Liquidity Coverage Ratio",
        "LCR",
        "Short-Term Liquidity Ratio"
      ],
      "ar": [
        "نسبة تغطية السيولة",
        "معيار السيولة لـ 30 يوماً"
      ]
    },
    "category": "liquidity_intermediation",
    "short_definition": {
      "fr": "Capacité de la banque à résister à un scénario de crise de liquidité aiguë sur un horizon de 30 jours calendaires.",
      "en": "Bank capacity to withstand severe 30-day acute liquidity stress.",
      "ar": "قدرة البنك على مواجهة سيناريو ضغط سيولة حاد على مدى 30 يوماً."
    },
    "detailed_definition": {
      "fr": "Le LCR compare le stock d'actifs liquides de haute qualité (HQLA), facilement et immédiatement convertibles en monnaie centrale sans décote majeure, au total des sorties nettes de trésorerie estimées sur 30 jours en période de crise. Cadre prudentiel : Standard international Bâle III fixé à un minimum obligatoire de 100 %.",
      "en": "Compares high-quality liquid assets (HQLA) readily convertible to central bank cash against estimated 30-day net cash outflows under severe stress. Standard requirement: Minimum 100%.",
      "ar": "يقارن الأصول السائلة عالية الجودة (HQLA) بصافي التدفقات النقدية الخارجة المتوقعة خلال 30 يوماً في حالة أزمة. المعيار التنظيمي: 100% كحد أدنى."
    },
    "formula": "LCR = (Stock d'Actifs Liquides de Haute Qualité HQLA ÷ Sorties Nettes de Trésorerie à 30j) × 100",
    "formula_latex": "\\\\text{LCR} = \\\\frac{\\\\text{HQLA}}{\\\\text{Sorties Nettes 30j}} \\\\times 100",
    "interpretation": {
      "fr": "Un ratio supérieur à 100 % garantit que la banque détient suffisamment de liquidités immédiatement mobilisables pour faire face à des retraits massifs sans soutien d'urgence.",
      "en": "An LCR above 100% ensures the bank holds sufficient liquid buffers to withstand deposit run-offs without emergency aid.",
      "ar": "تجاوز نسبة 100% يضمن امتلاك البنك لسيولة كافية لمواجهة سحوبات غير متوقعة دون الحاجة لدعم استعجالي."
    },
    "example": {
      "fr": "Exemple normatif : Pour un stock HQLA de 120 Mds DZD et des sorties nettes à 30 jours modélisées à 80 Mds DZD, le LCR est de 150 % (supérieur au plancher de 100 %).",
      "en": "Normative example: For 120B DZD in HQLA and 80B DZD in 30-day modeled net outflows, LCR is 150% (exceeding 100% minimum).",
      "ar": "مثال معياري: مقابل 120 مليار دج من الأصول السائلة وتدفقات خارجة بقيمة 80 مليار دج، تكون نسبة LCR مساوية لـ 150%."
    },
    "unit": "%",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "REGULATORY",
    "regulatory_threshold": ">= 100 % (Standard prudentiel de liquidité Bâle III)",
    "abix_benchmark": "Repère de confort >= 120 %",
    "example_vintage": "Exemple méthodologique normatif Bâle III",
    "modules": [
      "Fiche Prudentielle",
      "Comparateur"
    ],
    "related_terms": [
      "ratio-nsfr",
      "ratio-prets-depots",
      "depots-clientele"
    ],
    "display_order": 30
  },
  {
    "id": "ratio-nsfr",
    "slug": "ratio-nsfr",
    "term": {
      "fr": "Ratio de Financement Stable Net (NSFR)",
      "en": "Net Stable Funding Ratio (NSFR)",
      "ar": "نسبة التمويل المستقر الصافي (NSFR)"
    },
    "acronym": "NSFR",
    "aliases": {
      "fr": [
        "NSFR",
        "Ratio de liquidité structurelle",
        "Financement stable à 1 an"
      ],
      "en": [
        "Net Stable Funding Ratio",
        "NSFR",
        "Structural Liquidity Ratio"
      ],
      "ar": [
        "نسبة التمويل المستقر",
        "معيار السيولة الهيكلية"
      ]
    },
    "category": "liquidity_intermediation",
    "short_definition": {
      "fr": "Mesure l'adéquation structurelle entre les ressources stables de la banque et ses emplois illiquides sur un horizon d'un an.",
      "en": "Measures structural alignment between stable available funding and required illiquid assets over a 1-year horizon.",
      "ar": "يقيس التوافق الهيكلي بين التمويل المستقر المتاح والأصول غير السائلة على مدى سنة واحدة."
    },
    "detailed_definition": {
      "fr": "Le NSFR vise à limiter la dépendance excessive aux financements de court terme pour financer des actifs à long terme (transformation excessive). Il rapporte le montant de financement stable disponible (ASF) au montant de financement stable exigé (RSF). Cadre prudentiel : Standard Bâle III fixé à un seuil minimal de 100 %.",
      "en": "NSFR limits excessive reliance on short-term wholesale funding to finance long-term assets. It divides available stable funding (ASF) by required stable funding (RSF). Prudential standard: Minimum 100%.",
      "ar": "يهدف NSFR للحد من الاعتماد المفرط على التمويل قصير الأجل لتمويل أصول طويلة الأجل. النسبة الإلزامية: 100% كحد أدنى."
    },
    "formula": "NSFR = (Montant de Financement Stable Disponible ASF ÷ Financement Stable Exigé RSF) × 100",
    "formula_latex": "\\\\text{NSFR} = \\\\frac{\\\\text{ASF}}{\\\\text{RSF}} \\\\times 100",
    "interpretation": {
      "fr": "Un NSFR supérieur à 100 % atteste que la banque finance ses actifs longs et illiquides par des capitaux et dépôts pérennes.",
      "en": "An NSFR above 100% confirms that long-term illiquid assets are funded by durable, sticky equity and deposits.",
      "ar": "يدل NSFR الأعلى من 100% على أن الأصول طويلة الأجل ممولة بموارد ذات استقرار عالٍ."
    },
    "example": {
      "fr": "Exemple méthodologique : 200 Mds DZD de financement stable disponible (ASF) pour 160 Mds DZD de financement stable exigé (RSF) confèrent un NSFR robuste de 125 %.",
      "en": "Methodological example: 200B DZD ASF covering 160B DZD RSF yields a solid 125% NSFR.",
      "ar": "مثال منهجي: 200 مليار دج تمويل مستقر متاح مقابل 160 مليار دج تمويل مطلوب يعطي نسبة 125%."
    },
    "unit": "%",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "REGULATORY",
    "regulatory_threshold": ">= 100 % (Standard prudentiel de financement stable Bâle III)",
    "abix_benchmark": "Repère de confort >= 110 %",
    "example_vintage": "Exemple méthodologique normatif Bâle III",
    "modules": [
      "Fiche Prudentielle",
      "Comparateur"
    ],
    "related_terms": [
      "ratio-lcr",
      "ratio-prets-depots",
      "fonds-propres"
    ],
    "display_order": 31
  },
  {
    "id": "moyenne-arithmetique",
    "slug": "moyenne-arithmetique",
    "term": {
      "fr": "Moyenne Arithmétique",
      "en": "Arithmetic Mean (Average)",
      "ar": "المتوسط الحسابي"
    },
    "acronym": "MOY",
    "aliases": {
      "fr": [
        "Moyenne simple",
        "Moyenne sectorielle",
        "Moyenne non pondérée"
      ],
      "en": [
        "Arithmetic Mean",
        "Average",
        "Sample Mean"
      ],
      "ar": [
        "المتوسط البسيط",
        "معدل العينة"
      ]
    },
    "category": "statistics_methods",
    "short_definition": {
      "fr": "Somme de toutes les valeurs observées divisée par le nombre total de banques de l'échantillon.",
      "en": "Sum of all observed values divided by the total number of banks in the sample.",
      "ar": "مجموع كافة القيم المرصودة مقسوماً على عدد البنوك في العينة."
    },
    "detailed_definition": {
      "fr": "La moyenne arithmétique mesure la tendance centrale d'un agrégat ou ratio sectoriel. Dans ABIX Data Explorer, la moyenne est calculée exclusivement sur les observations numériques disponibles (ignorant les valeurs nulles). Elle peut être sensible aux valeurs extrêmes (outliers) sur des échantillons bancaires concentrés.",
      "en": "The arithmetic mean measures central tendency. In ABIX Data Explorer, it is computed strictly on available numeric observations (excluding nulls). It can be sensitive to extreme outliers in highly concentrated banking systems.",
      "ar": "يقيس المتوسط الحسابي النزعة المركزية للمؤشرات القطاعية. في ABIX، يُحتسب على البيانات المتوفرة فقط، وقد يتأثر بالقيم الشاذة في الأسواق عالية التركيز."
    },
    "formula": "Moyenne = (Σ Xi) ÷ N (pour i = 1 à N)",
    "formula_latex": "\\\\bar{X} = \\\\frac{1}{N}\\\\sum_{i=1}^N X_i",
    "interpretation": {
      "fr": "Donne le niveau moyen de la place, mais doit être confrontée à la médiane pour apprécier l'asymétrie de la distribution sectorielle.",
      "en": "Provides the overall market level, but should be compared with the median to assess distributional skewness.",
      "ar": "يعطي المستوى العام للسوق، ويجب مقارنته بالوسيط لتقييم مدى عدم تماثل التوزيع."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Le ROE moyen sectoriel est de 11,4 % alors que le ROE médian est de 9,8 % (asymétrie positive tirée par les banques de tête).",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Sector mean ROE is 11.4% vs median of 9.8% (positive skew driven by top performers).",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: متوسط ROE هو 11.4% مقارنة بوسيط 9.8% (انحراف إيجابي مدفوع بالبنوك الرائدة)."
    },
    "unit": "selon indicateur",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Classements",
      "Profil Banque",
      "Distribution Sectorielle"
    ],
    "related_terms": [
      "mediane",
      "quartiles",
      "ecart-type"
    ],
    "display_order": 32
  },
  {
    "id": "mediane",
    "slug": "mediane",
    "term": {
      "fr": "Médiane (Q2 / 50e percentile)",
      "en": "Median (50th Percentile / Q2)",
      "ar": "الوسيط الإحصائي (المئين 50)"
    },
    "acronym": "MED",
    "aliases": {
      "fr": [
        "Valeur centrale",
        "50e percentile",
        "Seuil médian",
        "Q2"
      ],
      "en": [
        "Median",
        "50th Percentile",
        "Midpoint",
        "Q2"
      ],
      "ar": [
        "الوسيط",
        "القيمة المركزية",
        "المئين 50"
      ]
    },
    "category": "statistics_methods",
    "short_definition": {
      "fr": "Valeur qui sépare l'échantillon des banques triées en deux groupes d'effectifs strictement égaux (50 % au-dessus, 50 % en-dessous).",
      "en": "Value separating the ordered sample of banks into two equal halves (50% above, 50% below).",
      "ar": "القيمة التي تقسم عينة البنوك المرتبة إلى نصفين متساويين تماماً (50% أعلى و50% أدنى)."
    },
    "detailed_definition": {
      "fr": "La médiane est l'indicateur robuste de référence privilégié par ABIX pour mesurer le point central du marché bancaire algérien, car elle est totalement insensible aux valeurs extrêmes (outliers) et aux effets de taille des géants publics. Formule exacte : 1) Pour un nombre impair N de banques (ex: 21 banques en 2026) : Médiane = valeur centrale au rang (N+1)/2 ; 2) Pour un nombre pair N de banques (ex: 20 banques en 2025) : Médiane = moyenne arithmétique des deux valeurs centrales aux rangs N/2 et (N/2)+1.",
      "en": "The median is ABIX's primary robust central tendency metric because it is fully resistant to extreme outliers and public bank scale distortions. Exact formulation: 1) For an odd number N of banks (e.g. 21 banks in 2026): Median = central value at rank (N+1)/2; 2) For an even number N of banks (e.g. 20 banks in 2025): Median = arithmetic average of the two central values at ranks N/2 and (N/2)+1.",
      "ar": "الوسيط هو المقياس الإحصائي المركزي المفضل في ABIX لكونه مقاوماً تماماً للقيم الشاذة وهيمنة البنوك الكبرى. الصيغة الرياضية: 1) لعدد فردي N (مثل 21 بنكاً في 2026): القيمة المركزية في الرتبة (N+1)/2؛ 2) لعدد زوجي N (مثل 20 بنكاً في 2025): متوسط القيمتين المركزيتين في الرتبتين N/2 و (N/2)+1."
    },
    "formula": "Si N impair : Médiane = X_((N+1)/2) | Si N pair : Médiane = (X_(N/2) + X_(N/2 + 1)) ÷ 2",
    "formula_latex": "\\\\text{Médiane} = \\\\begin{cases} X_{\\\\frac{N+1}{2}} & \\\\text{si } N \\\\text{ impair} \\\\\\\\ \\\\frac{X_{\\\\frac{N}{2}} + X_{\\\\frac{N}{2}+1}}{2} & \\\\text{si } N \\\\text{ pair} \\\\end{cases}",
    "interpretation": {
      "fr": "Représente la performance d'une « banque type » médiane sur la place bancaire algérienne, sans biais de surreprésentation des grandes banques publiques.",
      "en": "Represents the performance of a typical median bank in Algeria without weighting bias towards giant public banks.",
      "ar": "يمثل أداء «البنك النموذجي» في الساحة المصرفية دون تحيز للأحجام الكبيرة للبنوك العمومية."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025 (périmètre de 20 banques, N pair) : Le coefficient d'exploitation médian est calculé comme la moyenne de la 10e banque (43,2 %) et de la 11e banque (43,8 %), soit exactement 43,5 %.",
      "en": "2024 data, ABIX 2025 edition (20 banks, even N): Median CIR is the average of the 10th bank (43.2%) and 11th bank (43.8%), exactly 43.5%.",
      "ar": "بيانات 2024، إصدار ABIX 2025 (20 بنكاً، N زوجي): وسيط معامل الاستغلال هو متوسط البنك العاشر (43.2%) والحادي عشر (43.8%)، أي 43.5%."
    },
    "unit": "selon indicateur",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Classements",
      "Profil Banque",
      "Benchmarks & Quartiles",
      "Executive Summary"
    ],
    "related_terms": [
      "moyenne-arithmetique",
      "quartiles",
      "ecart-type"
    ],
    "display_order": 33
  },
  {
    "id": "quartiles",
    "slug": "quartiles",
    "term": {
      "fr": "Quartiles & Percentiles (Q1, Q2, Q3)",
      "en": "Quartiles & Percentiles (Q1, Q2, Q3)",
      "ar": "الربيعيات والمئينات الإحصائية (Q1, Q2, Q3)"
    },
    "acronym": "QUART",
    "aliases": {
      "fr": [
        "Seuils de quartile",
        "Q1 / Q2 / Q3",
        "Distribution en 4 groupes",
        "Tranches de distribution"
      ],
      "en": [
        "Quartiles",
        "Q1, Q2, Q3",
        "Four-tier distribution",
        "Percentile Thresholds"
      ],
      "ar": [
        "الربيعيات",
        "الربيع الأدنى والأعلى",
        "المئينات 25 و 50 و 75"
      ]
    },
    "category": "statistics_methods",
    "short_definition": {
      "fr": "Trois seuils statistiques (Q1=25e, Q2=50e=Médiane, Q3=75e percentile) délimitant quatre tranches d'effectifs égaux au sein du secteur.",
      "en": "Three statistical thresholds (Q1=25th, Q2=50th=Median, Q3=75th percentile) dividing the sector into four equal cohorts.",
      "ar": "ثلاثة حدود إحصائية (Q1=25%, Q2=50%=الوسيط, Q3=75%) تقسم القطاع المصرفي إلى أربع شرائح متساوية العدد."
    },
    "detailed_definition": {
      "fr": "En statistique descriptive, les seuils de quartiles sont Q1=P25, Q2=P50 (médiane) et Q3=P75, calculés par interpolation (N-1)×p. Les bandes de performance ABIX sont une restitution différente, orientée par le sens métier : la bande ABIX Q1 désigne les 25 % les plus favorables et la bande Q4 les 25 % les moins favorables. Pour la dynamique de croissance, les mêmes bornes sont explicitement appelées bandes de dynamique relative, sans jugement de performance générale.",
      "en": "In descriptive statistics, quartile thresholds are Q1=P25, Q2=P50 (median), and Q3=P75, using (N-1)*p interpolation. ABIX performance bands are a separate, business-direction-aware presentation: ABIX band Q1 identifies the most favorable 25%, while Q4 identifies the least favorable 25%. For Growth Momentum, the same cut-offs are explicitly labelled relative momentum bands and do not imply general performance.",
      "ar": "في الإحصاء الوصفي تكون حدود الأرباع Q1=P25 وQ2=P50 (الوسيط) وQ3=P75 وفق استيفاء (N-1)×p. أما نطاقات أداء ABIX فهي عرض منفصل يراعي اتجاه المؤشر: نطاق Q1 يضم 25% الأكثر ملاءمة وQ4 الأقل ملاءمة. وفي ديناميكية النمو تسمى الحدود نطاقات الديناميكية النسبية ولا تعني حكماً على الأداء العام."
    },
    "formula": "Q1 = P25 (interpolation linéaire) | Q2 = Médiane (P50) | Q3 = P75 (interpolation linéaire)",
    "formula_latex": "Q_1 = P_{25},\\\\quad Q_2 = P_{50} = \\\\text{Médiane},\\\\quad Q_3 = P_{75}",
    "interpretation": {
      "fr": "Permet de positionner objectivement chaque banque dans sa tranche sectorielle (Tranche 1, Tranche 2, Tranche 3, Tranche 4) sans biais de moyenne.",
      "en": "Positions each bank objectively within its peer distribution tier without mean-driven distortion.",
      "ar": "يتيح تحديد التموضع الدقيق لكل بنك ضمن شريحته القطاعية دون تأثر بالمتوسطات."
    },
    "example": {
      "fr": "Exemple descriptif : Q1=P25, Q2=P50 et Q3=P75. Dans une restitution orientée du ROE, les valeurs au-dessus de P75 portent séparément le libellé « bande de performance ABIX Q1 ».",
      "en": "Descriptive example: Q1=P25, Q2=P50, and Q3=P75. In a direction-aware ROE view, values above P75 separately carry the label 'ABIX performance band Q1'.",
      "ar": "بيانات 2024، إصدار ABIX 2025، عائد ROE: الربيع الأول 6.2%، الوسيط 9.8%، الربيع الثالث 14.5%."
    },
    "unit": "selon indicateur",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Profil Banque",
      "Distribution & Boxplots",
      "Executive Dashboard",
      "Heatmaps"
    ],
    "related_terms": [
      "mediane",
      "moyenne-arithmetique",
      "z-score-standardise"
    ],
    "display_order": 34
  },
  {
    "id": "ecart-type",
    "slug": "ecart-type",
    "term": {
      "fr": "Écart-Type (Dispersion Sectorielle)",
      "en": "Standard Deviation (σ)",
      "ar": "الانحراف المعياري (التشتت القطاعي)"
    },
    "acronym": "SIGMA",
    "aliases": {
      "fr": [
        "Sigma (σ)",
        "Dispersion statistique",
        "Volatilité sectorielle"
      ],
      "en": [
        "Standard Deviation",
        "Sigma",
        "Sample Dispersion"
      ],
      "ar": [
        "الانحراف المعياري",
        "سيغما",
        "درجة التشتت"
      ]
    },
    "category": "statistics_methods",
    "short_definition": {
      "fr": "Mesure statistique de la dispersion des observations d'un indicateur autour de sa moyenne arithmétique.",
      "en": "Statistical measurement of data dispersion around the arithmetic mean.",
      "ar": "مقياس إحصائي لمدى تشتت وتباعد قيم المؤشر حول متوسطه الحسابي."
    },
    "detailed_definition": {
      "fr": "L'écart-type quantifie l'hétérogénéité ou l'homogénéité des pratiques et performances entre les banques de la place. Un écart-type faible indique que les banques sont regroupées autour de la moyenne ; un écart-type élevé signale une forte segmentation ou des écarts stratégiques prononcés. Note statistique : Dans une distribution approximativement normale, ~68 % des observations se situent à ±1σ et ~95 % à ±2σ de la moyenne.",
      "en": "Quantifies the homogeneity or dispersion of banking metrics across institutions. Statistical note: In an approximately normal distribution, ~68% of observations fall within ±1σ and ~95% within ±2σ of the mean.",
      "ar": "يقيس درجة التجانس أو التباين بين أداء البنوك. ملاحظة إحصائية: في التوزيع المعتدل تقريباً، يقع نحو 68% من القيم ضمن ±1 انحراف معياري و95% ضمن ±2 انحراف معياري."
    },
    "formula": "Écart-type (σ) = √ [ (1 ÷ N) × Σ (Xi − X̄)² ]",
    "formula_latex": "\\\\sigma = \\\\sqrt{\\\\frac{1}{N}\\\\sum_{i=1}^N (X_i - \\\\bar{X})^2}",
    "interpretation": {
      "fr": "Permet d'évaluer la représentativité de la moyenne et d'identifier les banques atypiques (outliers) situées à plus de 2 écarts-types.",
      "en": "Evaluates mean representativeness and identifies outlier banks lying beyond 2 standard deviations.",
      "ar": "يساعد على تقييم مدى تمثيلية المتوسط وتحديد البنوك الشاذة إحصائياً التي تبعد بأكثر من انحرافين معياريين."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Pour un ROE moyen de 11,4 % avec un écart-type sectoriel de σ = 5,2 %, la plage [6,2 % - 16,6 %] regroupe la majorité des banques sous hypothèse de quasi-normalité.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: For a mean ROE of 11.4% with sector σ = 5.2%, the range [6.2% - 16.6%] encompasses the core bank cohort.",
      "ar": "بيانات 2024، إصدار ABIX 2025: لمتوسط عائد 11.4% وانحراف معياري 5.2%، يشمل النطاق [6.2% - 16.6%] غالبية البنوك."
    },
    "unit": "selon indicateur",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Distribution Sectorielle",
      "Outliers & Détection d'Anomalies"
    ],
    "related_terms": [
      "moyenne-arithmetique",
      "coefficient-variation",
      "z-score-standardise"
    ],
    "display_order": 35
  },
  {
    "id": "coefficient-variation",
    "slug": "coefficient-variation",
    "term": {
      "fr": "Coefficient de Variation (CV)",
      "en": "Coefficient of Variation (CV)",
      "ar": "معامل الاختلاف الإحصائي"
    },
    "acronym": "CV",
    "aliases": {
      "fr": [
        "CV",
        "Dispersion relative",
        "Écart-type relatif"
      ],
      "en": [
        "Coefficient of Variation",
        "CV",
        "Relative Standard Deviation"
      ],
      "ar": [
        "معامل الاختلاف",
        "التشتت النسبي"
      ]
    },
    "category": "statistics_methods",
    "short_definition": {
      "fr": "Rapport entre l'écart-type et la moyenne arithmétique, mesurant la dispersion relative d'un indicateur sous forme de pourcentage.",
      "en": "Ratio of standard deviation to arithmetic mean, expressing relative dispersion as a normalized percentage.",
      "ar": "النسبة بين الانحراف المعياري والمتوسط الحسابي، وتقيس التشتت النسبي للمؤشر في شكل نسبة مئوية."
    },
    "detailed_definition": {
      "fr": "Le coefficient de variation est une mesure adimensionnelle permettant de comparer directement le degré de dispersion et d'hétérogénéité entre des indicateurs financiers exprimés dans des unités ou des échelles différentes (ex: comparer la dispersion des dépôts en Mds DZD et celle du ROE en %).",
      "en": "The CV is a dimensionless metric enabling direct dispersion comparison across financial indicators with different units or scales (e.g. comparing deposits dispersion in billion DZD with ROE dispersion in %).",
      "ar": "معامل الاختلاف هو مقياس نسبي يتيح المقارنة المباشرة لدرجة التباين بين مؤشرات مالية مختلفة الوحدات والمقاييس."
    },
    "formula": "Coefficient de Variation (CV) = (Écart-type σ ÷ Moyenne arithmétique X̄) × 100",
    "formula_latex": "\\\\text{CV} = \\\\frac{\\\\sigma}{\\\\bar{X}} \\\\times 100",
    "interpretation": {
      "fr": "Un CV < 15 % traduit une forte homogénéité sectorielle. Un CV > 30-50 % indique une forte dispersion ou une polarisation marquée entre établissements.",
      "en": "CV < 15% indicates strong sector homogeneity. CV > 30-50% indicates high dispersion and structural polarization.",
      "ar": "يدل CV الأقل من 15% على تجانس كبير، بينما يدل تجاوزه 30-50% على تباين حاد أو استقطاب في السوق."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Le CV du coefficient d'exploitation est de 24 % (modéré), tandis que celui de la taille de bilan atteint 145 % (très forte asymétrie de taille).",
      "en": "2024 data, ABIX 2025 edition: Cost-to-Income CV is 24% (moderate), whereas Total Assets CV reaches 145% (extreme scale skewness).",
      "ar": "بيانات 2024، إصدار ABIX 2025: يبلغ معامل الاختلاف لمعامل الاستغلال 24% بينما يصل لحجم الميزانية إلى 145%."
    },
    "unit": "%",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Vue Secteur",
      "Distribution Sectorielle",
      "Comparateur"
    ],
    "related_terms": [
      "ecart-type",
      "moyenne-arithmetique"
    ],
    "display_order": 36
  },
  {
    "id": "taux-croissance-annuel-compose",
    "slug": "taux-croissance-annuel-compose",
    "term": {
      "fr": "Taux de Croissance Annuel Composé (CAGR / TCAC)",
      "en": "Compound Annual Growth Rate (CAGR)",
      "ar": "معدل النمو السنوي المركب (CAGR)"
    },
    "acronym": "CAGR",
    "aliases": {
      "fr": [
        "TCAC",
        "Croissance moyenne géométrique",
        "Taux composé pluriannuel"
      ],
      "en": [
        "CAGR",
        "Compound Annual Growth Rate",
        "Geometric Annual Growth"
      ],
      "ar": [
        "معدل النمو المركب",
        "النمو السنوي الهندسي"
      ]
    },
    "category": "statistics_methods",
    "short_definition": {
      "fr": "Taux annuel constant auquel un agrégat financier aurait progressé pour passer de sa valeur initiale à sa valeur finale sur n années.",
      "en": "Constant annual rate at which a metric would have grown from its base year to final year over n periods.",
      "ar": "المعدل السنوي الثابت الذي ينمو به المؤشر المالي لينتقل من قيمته الأولية إلى النهائية عبر عدة سنوات."
    },
    "detailed_definition": {
      "fr": "Le CAGR neutralise la volatilité et les à-coups des variations annuelles intermédiaires en calculant la moyenne géométrique de la trajectoire pluriannuelle. Dans ABIX Data Explorer, le CAGR est utilisé dans le pilier Croissance (poids 25 % chacun sur Bilan, Crédits, PNB et Résultat Net) pour évaluer la dynamique sur la période d'analyse sélectionnée.",
      "en": "CAGR smooths out year-to-year volatility through geometric progression. In ABIX Data Explorer, CAGR is used in the Growth scoring pillar (25% weight each on Assets, Loans, NBI, and Net Profit).",
      "ar": "يحيّد CAGR التذبذبات السنوية بحساب المتوسط الهندسي للمسار. في ABIX، يُستخدم في تقييم ركيزة النمو (بوزن 25% لكل من الميزانية، القروض، الناتج البنكي والربح الصافي)."
    },
    "formula": "CAGR = [ (Valeur Finale ÷ Valeur Initiale)^(1 ÷ n) − 1 ] × 100",
    "formula_latex": "\\\\text{CAGR} = \\\\left[ \\\\left(\\\\frac{V_{\\\\text{final}}}{V_{\\\\text{initial}}}\\\\right)^{\\\\frac{1}{n}} - 1 \\\\right] \\\\times 100",
    "interpretation": {
      "fr": "Permet de comparer équitablement la dynamique commerciale et financière pluriannuelle entre banques de tailles différentes.",
      "en": "Provides a standardized, fair multi-year growth comparison across institutions of varying scale.",
      "ar": "يتيح مقارنة عادلة للحركية التمويلية والتجارية عبر السنوات بين بنوك متفاوتة الحجم."
    },
    "example": {
      "fr": "Données 2021-2024, Édition ABIX 2025 (périmètre constant) : Les crédits du secteur sont passés de 8 500 à 11 100 Mds DZD sur 3 ans, soit un CAGR de +9,3 % par an.",
      "en": "2021-2024 data, ABIX 2025 edition (constant scope): Sector loans expanded from 8,500B to 11,100B DZD over 3 years, representing a CAGR of +9.3% per annum.",
      "ar": "بيانات 2021-2024، إصدار ABIX 2025: ارتفعت القروض من 8,500 إلى 11,100 مليار دج خلال 3 سنوات، بمعدل CAGR قدره +9.3% سنوياً."
    },
    "unit": "%",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2021-2024, Édition ABIX 2025, périmètre constant",
    "modules": [
      "Scores ABIX (Dynamique & Croissance)",
      "Historique Pluriannuel",
      "Profil Banque"
    ],
    "related_terms": [
      "variation-annuelle-yoy",
      "base-100"
    ],
    "display_order": 37
  },
  {
    "id": "variation-annuelle-yoy",
    "slug": "variation-annuelle-yoy",
    "term": {
      "fr": "Variation Annuelle Glissante (YoY / Δ)",
      "en": "Year-over-Year Growth (YoY / Δ)",
      "ar": "التغير السنوي المقارن (على أساس سنوي / YoY)"
    },
    "acronym": "YoY",
    "aliases": {
      "fr": [
        "Croissance annuelle",
        "Évolution N / N-1",
        "Variation glissante",
        "Delta annuel"
      ],
      "en": [
        "Year-over-Year",
        "YoY Growth",
        "Annual Change",
        "Delta YoY"
      ],
      "ar": [
        "النمو السنوي",
        "التغير من سنة لأخرى",
        "الفارق السنوي"
      ]
    },
    "category": "statistics_methods",
    "short_definition": {
      "fr": "Évolution en pourcentage d'une variable financière entre l'exercice t et l'exercice précédent t-1.",
      "en": "Percentage change of a financial metric between period t and the preceding period t-1.",
      "ar": "نسبة التغير المئوية للمؤشر المالي بين الدورة t والدورة السابقة t-1."
    },
    "detailed_definition": {
      "fr": "Mesure le rythme d'expansion ou de contraction annuelle d'un agrégat. Dans ABIX Data Explorer, pour les ratios déjà exprimés en pourcentage (ex: ROE, CIR), la variation est calculée sous forme de variation absolue en points de pourcentage (point_change), évitant toute confusion de calcul.",
      "en": "Measures annual metric expansion or contraction. In ABIX Data Explorer, for indicators already expressed as percentages (e.g. ROE, CIR), the variation is strictly tracked in percentage points (point_change).",
      "ar": "يقيس وتيرة التوسع أو الانكماش السنوي. في ABIX، بالنسبة للنسب المئوية (مثل ROE)، يُحتسب التغير بنقاط مئوية مطلقة منعاً للخلط."
    },
    "formula": "Pour agrégats (Mds DZD) : YoY = [(Vt − Vt-1) ÷ Vt-1] × 100 | Pour ratios (%) : Δ = Vt − Vt-1 (en points)",
    "formula_latex": "\\\\text{YoY} = \\\\frac{V_t - V_{t-1}}{V_{t-1}} \\\\times 100 \\\\quad | \\\\quad \\\\Delta = V_t - V_{t-1} \\\\text{ (pts)}",
    "interpretation": {
      "fr": "Permet d'identifier les ruptures de tendance, accélérations commerciales ou décélérations brutales d'une année sur l'autre.",
      "en": "Identifies trend shifts, commercial accelerations, or abrupt year-over-year decelerations.",
      "ar": "يتيح رصد التحولات الهيكلية، والتسارع التجاري أو التباطؤ المفاجئ من سنة إلى أخرى."
    },
    "example": {
      "fr": "Données 2024 vs 2023, Édition ABIX 2025 : Progression du PNB sectoriel de +8,2 % YoY, tandis que le ROE moyen a gagné +0,6 point de pourcentage.",
      "en": "2024 vs 2023 data, ABIX 2025 edition: Sector NBI grew by +8.2% YoY, while average ROE gained +0.6 percentage points.",
      "ar": "بيانات 2024 مقارنة بـ 2023: نمو الناتج البنكي الصافي القطاعي بـ +8.2%، مع ارتفاع وسيط ROE بـ +0.6 نقطة مئوية."
    },
    "unit": "% / pts",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024 vs 2023, Édition ABIX 2025",
    "modules": [
      "Historique",
      "Profil Banque",
      "Vue Secteur",
      "Scanning Déterministe"
    ],
    "related_terms": [
      "taux-croissance-annuel-compose",
      "base-100"
    ],
    "display_order": 38
  },
  {
    "id": "base-100",
    "slug": "base-100",
    "term": {
      "fr": "Évolution en Base 100 (Indice Rebasé)",
      "en": "Rebased Index (Base 100)",
      "ar": "التطور المنسوب إلى الأساس 100"
    },
    "acronym": "B100",
    "aliases": {
      "fr": [
        "Indice base 100",
        "Trajectoire rebasée",
        "Normalisation indiciaire"
      ],
      "en": [
        "Base 100 Index",
        "Rebased Growth",
        "Indexed Trajectory"
      ],
      "ar": [
        "مؤشر الأساس 100",
        "المسار القياسي المنسوب"
      ]
    },
    "category": "statistics_methods",
    "short_definition": {
      "fr": "Indice ramenant la valeur de départ d'une variable à 100 pour comparer visuellement les trajectoires de croissance de banques de tailles différentes.",
      "en": "Index normalizing base year metric to 100 to visually compare growth trajectories across banks of differing sizes.",
      "ar": "مؤشر ينسب القيمة الأولية إلى 100 للمقارنة البصرية المباشرة لمسارات النمو بين بنوك متباينة الحجم."
    },
    "detailed_definition": {
      "fr": "L'analyse en Base 100 fixe arbitrairement l'année de départ choisie à 100. Les valeurs des années suivantes sont calculées proportionnellement : (Valeur de l'année ÷ Valeur de base) × 100. Cela permet de comparer sur un même graphique la dynamique d'une grande banque publique (ex: 4 000 Mds DZD) et d'une petite banque privée (ex: 80 Mds DZD).",
      "en": "Base 100 fixes the initial selected year at 100. Subsequent years are computed as (Year Value / Base Value) * 100. This enables direct graphical trajectory comparison between large public and smaller private lenders.",
      "ar": "يثبت تحليل الأساس 100 سنة البداية عند 100، وتُحسب السنوات اللاحقة تناسبياً، مما يسمح بمقارنة مسارات بنوك كبيرة وصغيرة على نفس الرسم البياني."
    },
    "formula": "Indice Base 100 (t) = (Valeur_t ÷ Valeur_base) × 100",
    "formula_latex": "\\\\text{Indice}_t = \\\\frac{V_t}{V_{\\\\text{base}}} \\\\times 100",
    "interpretation": {
      "fr": "Un indice à 135 signifie une progression cumulée de +35 % depuis l'année de référence, indépendamment de la taille initiale de l'établissement.",
      "en": "An index of 135 indicates cumulative growth of +35% since the base year, regardless of initial bank size.",
      "ar": "قراءة المؤشر عند 135 تعني نمواً تراكمياً بنسبة +35% منذ سنة الأساس."
    },
    "example": {
      "fr": "Données 2021-2024, Édition ABIX 2025 (base 2021 = 100) : En 2024, les dépôts du secteur se situent à l'indice 128,4 (croissance cumulée de +28,4 % en 3 ans).",
      "en": "2021-2024 data, ABIX 2025 edition (2021 base = 100): In 2024, sector deposits stand at 128.4 (+28.4% cumulative growth).",
      "ar": "بيانات 2021-2024 (الأساس 2021 = 100): في 2024، بلغت ودائع القطاع المؤشر 128.4 (+28.4% نمو تراكمي)."
    },
    "unit": "indice (base 100)",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2021-2024, Édition ABIX 2025",
    "modules": [
      "Historique",
      "Comparateur",
      "Profil Banque"
    ],
    "related_terms": [
      "taux-croissance-annuel-compose",
      "variation-annuelle-yoy"
    ],
    "display_order": 39
  },
  {
    "id": "correlation-pearson",
    "slug": "correlation-pearson",
    "term": {
      "fr": "Corrélation Linéaire de Pearson (r)",
      "en": "Pearson Linear Correlation (r)",
      "ar": "معامل الارتباط الخطي لبيرسون (r)"
    },
    "acronym": "PEARSON",
    "aliases": {
      "fr": [
        "Coefficient de corrélation",
        "Corrélation de Pearson",
        "r de Pearson"
      ],
      "en": [
        "Pearson Correlation Coefficient",
        "Linear Correlation",
        "Pearson r"
      ],
      "ar": [
        "معامل الارتباط لبيرسون",
        "الارتباط الخطي"
      ]
    },
    "category": "statistics_methods",
    "short_definition": {
      "fr": "Mesure statistique de la force et de la direction de la relation linéaire entre deux variables financières (entre -1 et +1).",
      "en": "Statistical measurement of the strength and direction of linear association between two financial metrics (-1 to +1).",
      "ar": "مقياس إحصائي لقوة واتجاه العلاقة الخطية بين متغيرين ماليين (يتراوح بين -1 و +1)."
    },
    "detailed_definition": {
      "fr": "Le coefficient de Pearson r varie entre -1 (corrélation linéaire négative parfaite) et +1 (corrélation linéaire positive parfaite), une valeur nulle indiquant l'absence de liaison linéaire. Règle méthodologique fondamentale ABIX : Corrélation ≠ Causalité. De plus, le coefficient r mesure exclusivement une relation de nature linéaire et peut être fortement sensible aux valeurs atypiques (outliers).",
      "en": "The Pearson coefficient r ranges from -1 (perfect inverse linear relation) to +1 (perfect positive linear relation), with 0 indicating no linear association. Fundamental ABIX rule: Correlation ≠ Causation. Furthermore, r measures strictly linear relationships and can be sensitive to extreme outliers.",
      "ar": "يتراوح معامل بيرسون r بين -1 و +1. قاعدة ABIX المنهجية الجوهرية: الارتباط لا يعني السببية إطلاقاً. كما يقيس المعامل العلاقات الخطية حصراً ويتأثر بالقيم الشاذة."
    },
    "formula": "r = Σ [ (Xi − X̄)(Yi − Ȳ) ] ÷ [ √Σ(Xi − X̄)² × √Σ(Yi − Ȳ)² ]",
    "formula_latex": "r = \\\\frac{\\\\sum_{i=1}^N (X_i - \\\\bar{X})(Y_i - \\\\bar{Y})}{\\\\sqrt{\\\\sum_{i=1}^N (X_i - \\\\bar{X})^2 \\\\sum_{i=1}^N (Y_i - \\\\bar{Y})^2}}",
    "interpretation": {
      "fr": "|r| > 0,70 signale une forte corrélation linéaire ; 0,40 < |r| < 0,70 une corrélation modérée ; |r| < 0,40 une relation faible ou non linéaire.",
      "en": "|r| > 0.70 indicates strong linear correlation; 0.40 < |r| < 0.70 moderate; |r| < 0.40 weak or non-linear association.",
      "ar": "|r| > 0.70 يدل على ارتباط خطي قوي؛ بين 0.40 و 0.70 ارتباط متوسط؛ وأقل من 0.40 ارتباط ضعيف أو غير خطي."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, périmètre de 20 banques : Corrélation observée positive et robuste de r = +0,88 entre les Dépôts clientèle et le Total Bilan sur le marché algérien.",
      "en": "2024 data, ABIX 2025 edition, 20-bank scope: Strong positive linear correlation of r = +0.88 observed between Customer Deposits and Total Assets.",
      "ar": "بيانات 2024، إصدار ABIX 2025، نطاق 20 بنكاً: ارتباط خطي إيجابي وقوي r = +0.88 بين ودائع العملاء وإجمالي الميزانية."
    },
    "unit": "coefficient (-1 à +1)",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "ACADEMIC_REFERENCE",
    "regulatory_threshold": null,
    "abix_benchmark": "Forte correlation si |r| >= 0,70 (Seuil d'exclusion multicolinearite ABIX: |r| >= 0,85)",
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Matrice de Corrélation",
      "Nuage de Points (Scatter Plots)",
      "Lab Méthodologique"
    ],
    "related_terms": [
      "z-score-standardise",
      "ecart-type"
    ],
    "display_order": 40
  },
  {
    "id": "z-score-standardise",
    "slug": "z-score-standardise",
    "term": {
      "fr": "Z-Score Standardisé (Positionnement Relatif)",
      "en": "Standardized Z-Score (Relative Positioning)",
      "ar": "الدرجة المعيارية (Z-Score)"
    },
    "acronym": "Z-SCORE",
    "aliases": {
      "fr": [
        "Score centré-réduit",
        "Z-Score classique",
        "Écart à la moyenne en sigmas",
        "Z-Score robuste"
      ],
      "en": [
        "Standardized Score",
        "Z-Score",
        "Standard Normal Deviate",
        "Robust Z-Score"
      ],
      "ar": [
        "الدرجة المعيارية",
        "الانحراف المعياري عن المتوسط"
      ]
    },
    "category": "statistics_methods",
    "short_definition": {
      "fr": "Nombre d'écarts-types séparant la valeur d'une banque de la moyenne arithmétique (ou médiane) sectorielle.",
      "en": "Number of standard deviations separating a bank's metric from the sector mean (or median).",
      "ar": "عدد الانحرافات المعيارية التي تفصل قيمة البنك عن المتوسط (أو الوسيط) القطاعي."
    },
    "detailed_definition": {
      "fr": "Le Z-score standardisé permet de comparer des grandeurs hétérogènes en les ramenant à une échelle sans unité centrée sur zéro. Dans le moteur ABIX, deux variantes sont implémentées : 1) Z-Score classique : Z = (X − Moyenne) ÷ σ ; 2) Z-Score robuste (résistant aux outliers) : Z_robuste = 0,6745 × (X − Médiane) ÷ MAD (où MAD est la déviation médiane absolue). Règle statistique : La correspondance Z = +2 avec le Top 2,5 % n'est rigoureusement exacte que sous l'hypothèse d'une distribution normale.",
      "en": "Standardizes metrics to a unitless scale centered at zero. ABIX implements two variants: 1) Classic Z = (X - Mean) / σ; 2) Robust Z = 0.6745 * (X - Median) / MAD. Statistical note: The equivalence of Z = +2 with the top 2.5% holds strictly only under the assumption of a normal distribution.",
      "ar": "يقيس المسافة الإحصائية عن مركز التوزيع. تعتمد ABIX صيغتين: 1) القياسية: Z = (القيمة - المتوسط) / الانحراف المعياري؛ 2) القوية المقاومة للشواذ: Z = 0.6745 × (القيمة - الوسيط) / MAD. ملاحظة: تطابق Z = +2 مع أعلى 2.5% مشروط باعتدال التوزيع."
    },
    "formula": "Z classique = (X − X̄) ÷ σ | Z robuste = 0,6745 × (X − Médiane) ÷ MAD",
    "formula_latex": "Z = \\\\frac{X - \\\\bar{X}}{\\\\sigma} \\\\quad | \\\\quad Z_{\\\\text{robuste}} = 0{,}6745 \\\\times \\\\frac{X - \\\\text{Médiane}}{\\\\text{MAD}}",
    "interpretation": {
      "fr": "Z = 0 situe la banque exactement au centre. Z > +2 ou Z < -2 signale un profil atypique (outlier statistique) se démarquant nettement du secteur.",
      "en": "Z = 0 places the bank at market center. Z > +2 or Z < -2 flags an outlier significantly diverging from sector norms.",
      "ar": "Z = 0 يعني التواجد تماماً في المركز. وتجاوز +2 أو -2 يشير إلى وضعية استثنائية (قيمة شاذة إحصائياً)."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, ROE : Pour une banque affichant un ROE de 21,8 % face à une moyenne de 11,4 % (σ = 5,2 %), son Z-score s'établit à Z = +2,00 (positionnement supérieur d'élite sous hypothèse normale).",
      "en": "2024 data, ABIX 2025 edition: A bank with 21.8% ROE against a sector mean of 11.4% (σ = 5.2%) achieves Z = +2.00.",
      "ar": "بيانات 2024، إصدار ABIX 2025: بنك بعائد 21.8% مقابل متوسط 11.4% (انحراف 5.2%)، تكون درجته المعيارية Z = +2.00."
    },
    "unit": "score (sans unité)",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "ACADEMIC_REFERENCE",
    "regulatory_threshold": null,
    "abix_benchmark": "Zone standard [-2 ; +2], Profil atypique si |Z| > 2",
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Outliers & Détection d'Anomalies",
      "Lab Méthodologique",
      "Profil Banque"
    ],
    "related_terms": [
      "ecart-type",
      "mediane",
      "moyenne-arithmetique"
    ],
    "display_order": 41
  },
  {
    "id": "normalisation-min-max",
    "slug": "normalisation-min-max",
    "term": {
      "fr": "Normalisation Min-Max (Échelle 0-100)",
      "en": "Min-Max Normalization (0-100 Scale)",
      "ar": "التطبيع الإحصائي الأدنى-الأعلى (مقياس 0-100)"
    },
    "acronym": "MINMAX",
    "aliases": {
      "fr": [
        "Rescaling Min-Max",
        "Mise à l'échelle 0-100",
        "Score normalisé linéaire"
      ],
      "en": [
        "Min-Max Scaling",
        "Feature Rescaling",
        "Normalized Score 0-100"
      ],
      "ar": [
        "التحجيم الخطي الأدنى-الأعلى",
        "التطبيع المعياري 0-100"
      ]
    },
    "category": "statistics_methods",
    "calculation_status": "EDUCATIONAL_CONCEPT",
    "short_definition": {
      "fr": "Transformation linéaire d'un indicateur financier sur une échelle standardisée de 0 à 100 points.",
      "en": "Linear transformation of a financial metric onto a standardized scale from 0 to 100 points.",
      "ar": "تحويل خطي للمؤشر المالي إلى مقياس معياري موحد يتراوح بين 0 و 100 نقطة."
    },
    "detailed_definition": {
      "fr": "Concept statistique présenté à titre pédagogique et utilisable comme diagnostic secondaire dans le laboratoire. Les quatre scores dimensionnels officiels ABIX reposent sur des rangs percentiles empiriques dans le groupe de comparaison sélectionné, pas sur une normalisation Min-Max.",
      "en": "Statistical concept shown for education and usable as a secondary diagnostic in the laboratory. The four official ABIX dimension scores use empirical percentile ranks within the selected comparison group, not Min-Max normalization.",
      "ar": "مفهوم إحصائي معروض للتعليم ويمكن استعماله كتشخيص ثانوي في المختبر. تعتمد الدرجات الرسمية للأبعاد الأربعة في ABIX على الرتب المئينية التجريبية داخل مجموعة المقارنة المختارة، وليس على تطبيع Min-Max."
    },
    "formula": "Sens direct : Score = [(X − Min) ÷ (Max − Min)] × 100 | Sens inverse : Score = [(Max − X) ÷ (Max − Min)] × 100",
    "formula_latex": "\\\\text{Score} = \\\\begin{cases} \\\\frac{X - \\\\text{Min}}{\\\\text{Max} - \\\\text{Min}} \\\\times 100 & \\\\text{si élevé favorable} \\\\\\\\ \\\\frac{\\\\text{Max} - X}{\\\\text{Max} - \\\\text{Min}} \\\\times 100 & \\\\text{si faible favorable} \\\\end{cases}",
    "interpretation": {
      "fr": "Utile pour comprendre une mise à l'échelle linéaire, mais sans statut de score officiel ABIX.",
      "en": "Useful for understanding linear rescaling, but it is not an official ABIX score.",
      "ar": "مفيد لفهم التحجيم الخطي، لكنه لا يمثل درجة رسمية في ABIX."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, Coefficient d'exploitation (sens inverse) : Min = 28,0 %, Max = 78,0 %. Une banque affichant un CIR de 38,0 % obtient un score normalisé de : [(78,0 − 38,0) ÷ (78,0 − 28,0)] × 100 = 80,0 / 100.",
      "en": "2024 data, ABIX 2025 edition, Cost-to-Income (inverted direction): Min = 28.0%, Max = 78.0%. A bank with 38.0% CIR receives a normalized score of [(78.0 - 38.0)/(78.0 - 28.0)] * 100 = 80.0 / 100.",
      "ar": "بيانات 2024، إصدار ABIX 2025، معامل الاستغلال (عكسي): الأدنى 28.0% والأعلى 78.0%. بنك بنسبة 38.0% يحصل على درجة: [(78.0 - 38.0) / (78.0 - 28.0)] × 100 = 80.0 من 100."
    },
    "unit": "score (0 à 100)",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Laboratoire méthodologique",
      "Glossaire pédagogique"
    ],
    "related_terms": [
      "z-score-standardise",
      "cadre-4d-abix"
    ],
    "display_order": 42
  },
  {
    "id": "part-de-marche",
    "slug": "part-de-marche",
    "term": {
      "fr": "Part de Marché",
      "en": "Market Share",
      "ar": "الحصة السوقية"
    },
    "acronym": "PDM",
    "aliases": {
      "fr": [
        "Poids de marché",
        "Pénétration sectorielle",
        "Part relative"
      ],
      "en": [
        "Market Share",
        "Market Weight",
        "Volume Share"
      ],
      "ar": [
        "الوزن السوقي",
        "نسبة الاستحواذ على السوق"
      ]
    },
    "category": "sector_analysis",
    "short_definition": {
      "fr": "Pourcentage détenu par une banque sur un agrégat financier rapporté au total consolidé de la place bancaire.",
      "en": "Percentage held by a single bank across an aggregate relative to total consolidated sector volume.",
      "ar": "النسبة المئوية التي يستحوذ عليها البنك من مؤشر مالي مقارنة بإجمالي القطاع المصرفي المجمع."
    },
    "detailed_definition": {
      "fr": "La part de marché mesure le poids concurrentiel et la présence commerciale d'un établissement sur un compartiment donné (Total Bilan, Dépôts, Crédits, PNB, etc.). Note méthodologique ABIX : La part de marché est un indicateur de taille relative et de poids sectoriel, et non une mesure intrinsèque de performance, d'efficience ou de rentabilité (sens de lecture contextuel ◆).",
      "en": "Measures commercial footprint and competitive positioning across financial aggregates (Assets, Deposits, Loans, NBI). ABIX note: Market share is an indicator of relative scale, not an intrinsic measure of profitability or efficiency (contextual reading direction ◆).",
      "ar": "تقيس الوزن التنافسي والحضور التجاري للبنك (الميزانية، الودائع، القروض، الناتج البنكي). ملاحظة ABIX: الحصة السوقية تعبر عن الحجم النسبي ولا تمثل مقياساً لجودة الأداء أو الربحية (اتجاه قراءة سياقي ◆)."
    },
    "formula": "Part de Marché = (Valeur de la Banque ÷ Total Consolidé du Secteur) × 100",
    "formula_latex": "\\\\text{Part de Marché}_i = \\\\frac{V_i}{\\\\sum_{k=1}^N V_k} \\\\times 100",
    "interpretation": {
      "fr": "Une part de marché élevée confère des économies d'échelle et un pouvoir de négociation, mais n'implique pas automatiquement une rentabilité unitaire supérieure.",
      "en": "High market share provides economies of scale, but does not inherently guarantee superior unit profitability.",
      "ar": "تمنح الحصة السوقية المرتفعة وفورات حجم وقوة تفاوضية، لكنها لا تضمن تلقائياً مردودية ربحية أعلى."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, Total Bilan (20 banques) : La première banque de la place détient environ 24,5 % de part de marché, et les 6 banques publiques cumulent près de 87 % du secteur.",
      "en": "2024 data, ABIX 2025 edition, Total Assets (20 banks): Market leader holds approx. 24.5% market share, with public banks aggregating ~87%.",
      "ar": "بيانات 2024، إصدار ABIX 2025، إجمالي الميزانية (20 بنكاً): يستحوذ البنك الأول على حوالي 24.5%، والبنوك العمومية الستة على نحو 87%."
    },
    "unit": "%",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Parts de Marché",
      "Vue Secteur",
      "Classements",
      "Profil Banque",
      "Concentration"
    ],
    "related_terms": [
      "gain-perte-part-marche",
      "indice-hhi",
      "ratios-cr3-cr5",
      "total-bilan"
    ],
    "display_order": 43
  },
  {
    "id": "gain-perte-part-marche",
    "slug": "gain-perte-part-marche",
    "term": {
      "fr": "Variation de Part de Marché (Gain / Perte)",
      "en": "Market Share Delta (Gain / Loss)",
      "ar": "تغير الحصة السوقية (ربح / خسارة الحصة)"
    },
    "acronym": "DELTA_PDM",
    "aliases": {
      "fr": [
        "Delta de part de marché",
        "Gain/perte de part",
        "Évolution concurrentielle"
      ],
      "en": [
        "Market Share Change",
        "Market Share Delta",
        "Share Shift"
      ],
      "ar": [
        "تغير الحصة في السوق",
        "كسب أو فقدان الحصة"
      ]
    },
    "category": "sector_analysis",
    "short_definition": {
      "fr": "Différence absolue en points de pourcentage entre la part de marché de l'exercice t et celle de l'exercice précédent t-1.",
      "en": "Absolute difference in percentage points between market share at period t and period t-1.",
      "ar": "الفارق المطلق بالنقاط المئوية بين الحصة السوقية في الدورة t والدورة السابقة t-1."
    },
    "detailed_definition": {
      "fr": "Mesure la dynamique concurrentielle nette et les transferts de parts de marché entre établissements. Un gain de part de marché signifie que la banque a crû plus rapidement que l'ensemble du secteur sur l'agrégat considéré (surperformance relative de croissance).",
      "en": "Measures net competitive momentum and market share shifts among banks. A market share gain indicates the bank outgrew the overall sector on that metric.",
      "ar": "يقيس الحركية التنافسية الصافية وتحولات الحصص السوقية. كسب حصة يعني نمو البنك بوتيرة أسرع من متوسط القطاع."
    },
    "formula": "Δ Part de Marché = Part de Marché_t − Part de Marché_t-1 (en points de pourcentage)",
    "formula_latex": "\\\\Delta \\\\text{Part de Marché} = \\\\text{Part}_t - \\\\text{Part}_{t-1} \\\\quad \\\\text{(pts)}",
    "interpretation": {
      "fr": "Un gain de part régulier atteste d'une conquête commerciale active. Une perte de part signale un essoufflement ou un repositionnement stratégique volontaire.",
      "en": "Sustained share gains reflect aggressive commercial conquest. Share loss indicates commercial slowdown or deliberate de-risking.",
      "ar": "كسب الحصة يعكس نمواً تجارياً نشطاً، بينما فقدانها يشير إلى تباطؤ أو إعادة تموضع استراتيجي."
    },
    "example": {
      "fr": "Données 2024 vs 2023, Édition ABIX 2025 : Une banque privée dont la part sur les crédits passe de 3,20 % à 3,55 % enregistre un gain net de +0,35 pt.",
      "en": "2024 vs 2023 data, ABIX 2025 edition: A bank expanding loan market share from 3.20% to 3.55% records a net gain of +0.35 pts.",
      "ar": "بيانات 2024 مقارنة بـ 2023: بنك خاص ارتفعت حصته في القروض من 3.20% إلى 3.55% يسجل كسباً بـ +0.35 نقطة."
    },
    "unit": "pts de %",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024 vs 2023, Édition ABIX 2025",
    "modules": [
      "Parts de Marché",
      "Historique",
      "Profil Banque",
      "Vue Secteur"
    ],
    "related_terms": [
      "part-de-marche",
      "variation-annuelle-yoy"
    ],
    "display_order": 44
  },
  {
    "id": "secteur-public-prive",
    "slug": "secteur-public-prive",
    "term": {
      "fr": "Segmentation Public vs Privé",
      "en": "Public vs Private Sector Segmentation",
      "ar": "التقسيم بين القطاعين العام والخاص"
    },
    "acronym": "PUB_PRIV",
    "aliases": {
      "fr": [
        "Banques publiques vs Banques privées",
        "Répartition par statut",
        "Structure actionnariale"
      ],
      "en": [
        "Public vs Private Banks",
        "Ownership Split",
        "State vs Private Banking"
      ],
      "ar": [
        "البنوك العمومية والخاصة",
        "التقسيم حسب الملكية"
      ]
    },
    "category": "sector_analysis",
    "short_definition": {
      "fr": "Classification institutionnelle des banques selon la nature de leur actionnariat (banques à capitaux publics d'État vs banques privées).",
      "en": "Institutional classification of banks according to ownership structure (State-owned vs Private lenders).",
      "ar": "التصنيف المؤسسي للبنوك حسب طبيعة المساهمين (بنوك عمومية مملوكة للدولة مقابل بنوك خاصة)."
    },
    "detailed_definition": {
      "fr": "Distingue les 6 grandes banques commerciales publiques d'État (plus la CNEP-Banque) des 14 banques privées (filiales de groupes internationaux, banques régionales et banques islamiques). Cette segmentation est centrale dans ABIX pour analyser les disparités de taille, de modèles de collecte et d'orientation du crédit.",
      "en": "Distinguishes the 6 major state-owned commercial banks (plus CNEP-Banque) from the 14 private lenders (international subsidiaries, regional and Islamic banks). Central to ABIX for analyzing structural divergences.",
      "ar": "يميز بين البنوك التجارية العمومية للدولة (مع كناب-بنك) والبنوك الخاصة (فروع المجموعات الدولية والبنوك الإسلامية)."
    },
    "formula": "Agrégat Public = Σ Banques Publiques | Agrégat Privé = Σ Banques Privées",
    "formula_latex": "\\\\text{Total} = \\\\sum \\\\text{Banques Publiques} + \\\\sum \\\\text{Banques Privées}",
    "interpretation": {
      "fr": "Permet d'isoler le poids prépondérant des banques publiques dans les volumes bilanciels (~87 %) et la dynamique de rentabilité relative des banques privées.",
      "en": "Isolates the massive public bank balance sheet dominance (~87%) alongside private banks' relative profitability dynamism.",
      "ar": "يتيح عزل الوزن المهيمن للبنوك العمومية في الميزانية (~87%) ومقارنة ديناميكية ربحية البنوك الخاصة."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025 (20 banques) : Le secteur public détient 86,8 % des actifs et 88,4 % des dépôts, tandis que le secteur privé génère plus de 28 % du résultat net global.",
      "en": "2024 data, ABIX 2025 edition (20 banks): Public sector holds 86.8% of assets and 88.4% of deposits, while private banks generate over 28% of total net income.",
      "ar": "بيانات 2024، إصدار ABIX 2025: يستحوذ القطاع العام على 86.8% من الأصول و88.4% من الودائع، بينما يحقق القطاع الخاص أكثر من 28% من صافي الأرباح."
    },
    "unit": "% / Mds DZD",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Public vs Privé",
      "Vue Secteur",
      "Comparateur",
      "Parts de Marché"
    ],
    "related_terms": [
      "total-bilan",
      "part-de-marche",
      "perimetre-constant"
    ],
    "display_order": 45
  },
  {
    "id": "perimetre-constant",
    "slug": "perimetre-constant",
    "term": {
      "fr": "Périmètre Constant vs Périmètre Observé",
      "en": "Constant Scope vs Observed Scope",
      "ar": "النطاق الثابت مقابل النطاق المرصود"
    },
    "acronym": "SCOPE",
    "aliases": {
      "fr": [
        "Périmètre d'analyse",
        "Échantillon constant",
        "Base homogène pluriannuelle"
      ],
      "en": [
        "Constant Scope",
        "Like-for-like scope",
        "Observed Sample"
      ],
      "ar": [
        "نطاق العينة الثابتة",
        "العينة المرصودة"
      ]
    },
    "category": "sector_analysis",
    "short_definition": {
      "fr": "Méthode de filtrage garantissant que seules les banques ayant publié des comptes ininterrompus sur toute la période sont retenues pour les calculs pluriannuels.",
      "en": "Filtering method ensuring only banks with uninterrupted financial reporting across the full timeline are included in multi-year aggregates.",
      "ar": "منهجية تصفية تضمن احتساب البنوك التي نشرت بيانات متواصلة دون انقطاع عبر كامل الفترة الزمنية للتحليل."
    },
    "detailed_definition": {
      "fr": "Dans ABIX Data Explorer, deux modes de périmètre sont disponibles : 1) Périmètre Observé (scope_mode = observed) : inclut toutes les banques ayant des données disponibles pour l'exercice sélectionné (ex: 20 banques en 2025, 21 banques en 2026) ; 2) Périmètre Constant (scope_mode = constant) : retient exclusivement les banques présentes sans interruption du début à la fin de la fenêtre d'analyse, éliminant les biais d'entrée/sortie d'établissements dans les calculs de CAGR et de Base 100.",
      "en": "ABIX offers two scope modes: 1) Observed Scope (all reporting banks for a given year); 2) Constant Scope (strictly banks with complete data from start to end year), eliminating distortion in CAGR and Base 100 metrics.",
      "ar": "يوفر ABIX نمطين للنطاق: 1) النطاق المرصود (كافة البنوك المتوفرة في سنة معينة)؛ 2) النطاق الثابت (البنوك المتواجدة باستمرار طوال فترة التحليل)، مما يحيد أثر دخول أو خروج البنوك في حساب CAGR ومؤشر الأساس 100."
    },
    "formula": "Périmètre Constant = { Banques présentes sur chaque année de [Année_début ; Année_fin] }",
    "formula_latex": "\\\\text{Périmètre Constant} = \\\\{ i \\\\in \\\\text{Banques} \\\\mid \\\\forall t \\\\in [t_0, t_n], V_{i,t} \\\\neq \\\\emptyset \\\\}",
    "interpretation": {
      "fr": "Indispensable pour l'exactitude des séries temporelles, des taux de croissance composés et des comparaisons pluriannuelles rigoureuses.",
      "en": "Essential for mathematical integrity in multi-year trend analysis, CAGR, and indexed trajectories.",
      "ar": "ضروري لضمان دقة السلاسل الزمنية ومعدلات النمو المركبة والمقارنات متعددة السنوات."
    },
    "example": {
      "fr": "Données 2020-2024, Édition ABIX 2025 : L'analyse à périmètre constant sur 5 ans retient les 19 banques actives sans interruption sur la période, garantissant un CAGR sectoriel 100 % cohérent.",
      "en": "2020-2024 data, ABIX 2025 edition: 5-year constant scope retains the 19 continuously active banks, ensuring 100% consistent sector CAGR.",
      "ar": "بيانات 2020-2024: يعتمد النطاق الثابت على 19 بنكاً متواجداً باستمرار طوال السنوات الخمس لضمان دقة معدل النمو المركب."
    },
    "unit": "banques (effectif)",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2020-2024, Édition ABIX 2025",
    "modules": [
      "Historique",
      "Séries Temporelles",
      "Scores ABIX (Dynamique)",
      "Vue Secteur"
    ],
    "related_terms": [
      "taux-croissance-annuel-compose",
      "base-100",
      "part-de-marche"
    ],
    "display_order": 46
  },
  {
    "id": "indice-hhi",
    "slug": "indice-hhi",
    "term": {
      "fr": "Indice de Herfindahl-Hirschman (HHI)",
      "en": "Herfindahl-Hirschman Index (HHI)",
      "ar": "مؤشر هيرفيندال-هيرشمان للتركيز (HHI)"
    },
    "acronym": "HHI",
    "aliases": {
      "fr": [
        "Indice HHI",
        "Mesure de concentration industrielle",
        "Indice de Hirschman"
      ],
      "en": [
        "Herfindahl Index",
        "HHI",
        "Market Concentration Index"
      ],
      "ar": [
        "مؤشر HHI",
        "مقياس التركيز السوقي"
      ]
    },
    "category": "concentration_market",
    "short_definition": {
      "fr": "Somme des carrés des parts de marché de tous les établissements, mesurant l'intensité de la concentration du secteur bancaire sur une échelle de 0 à 10 000 points.",
      "en": "Sum of squared market shares of all operating banks, measuring sector concentration on a 0 to 10,000 scale.",
      "ar": "مجموع مربعات الحصص السوقية لكافة البنوك، ويقيس شدة التركيز في القطاع المصرفي على مقياس من 0 إلى 10,000 نقطة."
    },
    "detailed_definition": {
      "fr": "L'indice HHI accorde un poids proportionnellement plus lourd aux banques détenant les plus fortes parts de marché. Grille de lecture concurrentielle de référence (repères indicatifs du Département de la Justice DOJ / FTC) : 1) HHI < 1 000 : Marché non ou faiblement concentré (diversifié) ; 2) 1 000 ≤ HHI ≤ 1 800 : Concentration modérée ; 3) HHI > 1 800 : Marché fortement concentré. Note méthodologique obligatoire ABIX : Ces seuils constituent une grille d'analyse concurrentielle standardisée. Ils ne constituent pas une qualification juridique automatique du marché bancaire algérien.",
      "en": "HHI squares market shares, placing greater weight on top banks. Standard competitive reading grid (indicative DOJ/FTC benchmarks): 1) HHI < 1,000: Unconcentrated market; 2) 1,000 <= HHI <= 1,800: Moderately concentrated; 3) HHI > 1,800: Highly concentrated. Mandatory ABIX note: These thresholds constitute a standardized competitive analytical grid and do not represent an automatic legal qualification of the Algerian banking market.",
      "ar": "يقيس HHI تركيز السوق بتربيع الحصص السوقية. شبكة القراءة التنافسية المعيارية: 1) أقل من 1,000: سوق غير مركز أو ضعيف التركيز؛ 2) من 1,000 إلى 1,800: تركيز معتدل؛ 3) أكثر من 1,800: تركيز مرتفع. ملاحظة ABIX الإلزامية: تمثل هذه العتبات شبكة قراءة اقتصادية استرشادية ولا تشكل توصيفاً قانونياً تلقائياً للسوق المصرفية الجزائرية."
    },
    "formula": "HHI = Σ (Part de Marché_i)² (pour i = 1 à N banques, parts exprimées en %)",
    "formula_latex": "\\\\text{HHI} = \\\\sum_{i=1}^N (s_i)^2 \\\\quad \\\\text{avec } s_i \\\\text{ en \\\\%}",
    "interpretation": {
      "fr": "Un HHI élevé (> 1 800) traduit une structure oligopolistique où un petit nombre d'acteurs domine la collecte des dépôts et la distribution des crédits.",
      "en": "A high HHI (> 1,800) characterizes an oligopolistic structure where a small group of banks commands the majority of deposits and lending.",
      "ar": "يدل مؤشر HHI المرتفع (> 1,800) على بنية سوقية احتكارية تسيطر فيها قلة من البنوك على معظم الودائع والقروض."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, Total Bilan (20 banques) : L'indice HHI du total bilan s'établit à environ 1 920 points, caractérisant un marché fortement concentré selon les repères internationaux.",
      "en": "2024 data, ABIX 2025 edition, Total Assets (20 banks): Sector HHI stands at approx. 1,920 points, characterizing a highly concentrated market by international standards.",
      "ar": "بيانات 2024، إصدار ABIX 2025، إجمالي الميزانية (20 بنكاً): يبلغ مؤشر HHI حوالي 1,920 نقطة، مما يعكس تركيزاً مرتفعاً للسوق."
    },
    "unit": "points (0 à 10 000)",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "MARKET_REFERENCE",
    "regulatory_threshold": null,
    "abix_benchmark": "HHI < 1000: Peu concentré | 1000-1800: Modéré | > 1800: Fortement concentré (Grille concurrentielle indicative)",
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Concentration & Concurrence",
      "Vue Secteur",
      "Parts de Marché"
    ],
    "related_terms": [
      "ratios-cr3-cr5",
      "nombre-effectif-banques",
      "part-de-marche"
    ],
    "display_order": 47
  },
  {
    "id": "ratios-cr3-cr5",
    "slug": "ratios-cr3-cr5",
    "term": {
      "fr": "Ratios de Concentration (CR3 & CR5)",
      "en": "Concentration Ratios (CR3 & CR5)",
      "ar": "نسب التركيز المصرفي (CR3 و CR5)"
    },
    "acronym": "CR3_CR5",
    "aliases": {
      "fr": [
        "Ratio de concentration des 3 premières banques",
        "Ratio CR5",
        "Part cumulée du Top 3 / Top 5",
        "Concentration Ratio"
      ],
      "en": [
        "Concentration Ratio 3",
        "CR3",
        "CR5",
        "Top 3 / Top 5 Share"
      ],
      "ar": [
        "نسبة تركيز أكبر 3 بنوك",
        "نسبة تركيز أكبر 5 بنوك",
        "حصة الخمسة الكبار"
      ]
    },
    "category": "concentration_market",
    "short_definition": {
      "fr": "Part de marché cumulée détenue par les 3 (CR3) ou 5 (CR5) plus grands établissements bancaires sur un agrégat financier.",
      "en": "Cumulative market share command held by the top 3 (CR3) or top 5 (CR5) leading banks on a financial metric.",
      "ar": "الحصة السوقية التراكمية التي تستحوذ عليها أكبر 3 بنوك (CR3) أو أكبر 5 بنوك (CR5) من مؤشر مالي معين."
    },
    "detailed_definition": {
      "fr": "Les ratios de concentration CRk mesurent l'emprise conjointe des plus grands acteurs sur le marché. Formule générale : CR3 = somme des parts de marché des 3 premières banques du classement pour l'agrégat et l'année considérés ; CR5 = somme des parts de marché des 5 premières banques. Note méthodologique ABIX : Le classement des banques est dynamique et recalculé pour chaque exercice et pour chaque agrégat (Total Bilan, Dépôts, Crédits, PNB, etc.). Les noms d'établissements n'apparaissent que dans le cadre d'exemples datés.",
      "en": "Concentration ratios measure top-tier market command. General definition: CR3 = sum of market shares of the top 3 ranked banks; CR5 = sum of market shares of the top 5 banks for the selected metric and year. ABIX note: Bank rankings are dynamic and computed per year and indicator. Specific bank names appear exclusively in dated historical examples.",
      "ar": "تقيس نسب التركيز CRk الهيمنة المجمعة للبنوك الكبرى. التعريف العام: CR3 = مجموع حصص أكبر 3 بنوك في الترتيب؛ CR5 = مجموع حصص أكبر 5 بنوك للمؤشر والسنة المحددة. ملاحظة ABIX: الترتيب ديناميكي ويُعاد حسابه لكل دورة ومؤشر."
    },
    "formula": "CR3 = Part_1 + Part_2 + Part_3 | CR5 = Part_1 + Part_2 + Part_3 + Part_4 + Part_5 (parts triées par ordre décroissant)",
    "formula_latex": "\\\\text{CR}_k = \\\\sum_{i=1}^k \\\\text{Part}_{(i)} \\\\quad (k = 3, 5)",
    "interpretation": {
      "fr": "Un CR3 > 50 % ou un CR5 > 70 % caractérise un marché bancaire fortement dominé par un groupe restreint de banques leaders.",
      "en": "CR3 > 50% or CR5 > 70% characterizes a market heavily dominated by a tight leadership cohort.",
      "ar": "تجاوز CR3 لـ 50% أو CR5 لـ 70% يعكس هيمنة قوية لكبار الفاعلين على السوق."
    },
    "example": {
      "fr": "Exemple daté — Total Bilan 2024, Édition ABIX 2025 (20 banques) : Les 3 premières banques (BEA, BNA, CPA) totalisent un CR3 de 52,4 %, et les 5 premières (avec BADR et BDL) un CR5 de 74,8 %.",
      "en": "Dated example — Total Assets 2024, ABIX 2025 edition (20 banks): Top 3 banks (BEA, BNA, CPA) aggregate a CR3 of 52.4%, and top 5 (with BADR and BDL) reach a CR5 of 74.8%.",
      "ar": "مثال مؤرخ — إجمالي الميزانية 2024، إصدار ABIX 2025 (20 بنكاً): حققت أكبر 3 بنوك (BEA، BNA، CPA) نسبة CR3 قدرها 52.4%، وأكبر 5 بنوك CR5 قدرها 74.8%."
    },
    "unit": "%",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "MARKET_REFERENCE",
    "regulatory_threshold": null,
    "abix_benchmark": "CR3 > 50 %: Forte emprise oligopolistique | CR5 > 70 %: Marché très concentré",
    "example_vintage": "Exemple daté — Données 2024, Édition ABIX 2025, Total Bilan (20 banques)",
    "modules": [
      "Concentration & Concurrence",
      "Parts de Marché",
      "Vue Secteur"
    ],
    "related_terms": [
      "indice-hhi",
      "nombre-effectif-banques",
      "part-de-marche"
    ],
    "display_order": 48
  },
  {
    "id": "nombre-effectif-banques",
    "slug": "nombre-effectif-banques",
    "term": {
      "fr": "Nombre Effectif de Banques (10 000 / HHI)",
      "en": "Effective Number of Banks (Equivalent Competitors)",
      "ar": "العدد الفعلي للبنوك (المنافسون المكافئون)"
    },
    "acronym": "NEFF",
    "aliases": {
      "fr": [
        "Nombre de banques équivalentes",
        "Indice d'équivalence concurrentielle",
        "Inverse normalisé du HHI"
      ],
      "en": [
        "Effective Number of Banks",
        "Equivalent Competitors",
        "HHI Inverted Number"
      ],
      "ar": [
        "العدد المكافئ للبنوك",
        "المنافسون الفعليون في السوق"
      ]
    },
    "category": "concentration_market",
    "short_definition": {
      "fr": "Nombre théorique de banques de tailles strictement égales qui généreraient le même niveau de concentration HHI que celui observé sur le marché.",
      "en": "Theoretical number of equal-sized banks that would generate the same HHI concentration level observed in the market.",
      "ar": "العدد النظري للبنوك المتساوية الحجم تماماً والتي تولد نفس مستوى التركيز HHI المرصود في السوق."
    },
    "detailed_definition": {
      "fr": "Le nombre effectif de banques est calculé en divisant 10 000 par l'indice HHI. Il traduit la concentration sous une forme intuitive : sur une place comptant 20 banques réelles, si le HHI vaut 2 000, le marché fonctionne en réalité avec l'équivalent concurrentiel de seulement 5 banques de tailles identiques.",
      "en": "Calculated as 10,000 / HHI. It translates concentration into intuitive terms: in a market with 20 nominal banks, an HHI of 2,000 implies the competitive equivalent of only 5 equal-sized competitors.",
      "ar": "يُحسب بقسمة 10,000 على مؤشر HHI. يقدم قراءة بديهية للتركيز: في سوق يضم 20 بنكاً، إذا كان HHI يساوي 2,000، فإن السوق يعمل كأنه يضم 5 بنوك متساوية الحجم فقط."
    },
    "formula": "Nombre Effectif de Banques = 10 000 ÷ HHI",
    "formula_latex": "N_{\\\\text{eff}} = \\\\frac{10\\\\,000}{\\\\text{HHI}}",
    "interpretation": {
      "fr": "Plus le nombre effectif est éloigné du nombre réel de banques, plus l'asymétrie concurrentielle et la domination par les grands acteurs sont prononcées.",
      "en": "The wider the gap between nominal and effective bank counts, the more pronounced the market asymmetry and top-bank dominance.",
      "ar": "كلما اتسعت الفجوة بين العدد الفعلي والعدد الحقيقي للبنوك، دل ذلك على تباين تنافسي وهيمنة للبنوك الكبرى."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025, Total Bilan (20 banques réelles) : Avec un HHI de 1 920 points, le nombre effectif de banques est de 5,2 banques équivalentes.",
      "en": "2024 data, ABIX 2025 edition, Total Assets (20 nominal banks): With an HHI of 1,920, the effective competitor count is 5.2 equivalent banks.",
      "ar": "بيانات 2024، إصدار ABIX 2025 (20 بنكاً): مع مؤشر HHI قدره 1,920 نقطة، يبلغ العدد الفعلي 5.2 بنكاً مكافئاً."
    },
    "unit": "banques équivalentes",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025, périmètre de 20 banques",
    "modules": [
      "Concentration & Concurrence",
      "Vue Secteur"
    ],
    "related_terms": [
      "indice-hhi",
      "ratios-cr3-cr5"
    ],
    "display_order": 49
  },
  {
    "id": "cadre-4d-abix",
    "slug": "cadre-4d-abix",
    "term": {
      "fr": "Cadre d'Évaluation 4D ABIX",
      "en": "ABIX 4D Assessment Framework",
      "ar": "إطار التقييم رباعي الأبعاد ABIX 4D"
    },
    "acronym": "4D_ABIX",
    "aliases": {
      "fr": [
        "Modèle 4D",
        "Scores dimensionnels ABIX",
        "Matrice d'évaluation 4D",
        "Architecture multidimensionnelle"
      ],
      "en": [
        "4D Framework",
        "ABIX 4D Scores",
        "Multidimensional Evaluation Model"
      ],
      "ar": [
        "نموذج 4D",
        "المحاور الأربعة لـ ABIX",
        "التقييم متعدد الأبعاد"
      ]
    },
    "category": "abix_framework",
    "calculation_status": "ABIX_METHODOLOGY",
    "short_definition": {
      "fr": "Architecture méthodologique d'ABIX structurée autour de quatre dimensions indépendantes : Rentabilité, Growth Momentum, Efficience et Solidité financière.",
      "en": "ABIX methodology structured around four independent dimensions: Profitability, Growth Momentum, Efficiency and Financial Strength.",
      "ar": "منهجية ABIX مبنية على أربعة أبعاد مستقلة: المردودية، زخم النمو، الكفاءة، والمتانة المالية."
    },
    "detailed_definition": {
      "fr": "Les scores reposent sur des rangs percentiles empiriques, calculés dans le groupe de comparaison sélectionné lorsque N ≥ 5, puis pondérés par dimension : Rentabilité (ROE importé, ROA calculé, marge nette ; 33,3 % chacun), Growth Momentum (CAGR du bilan, crédits, PNB et résultat net ; 25 % chacun), Efficience (coefficient d'exploitation et taux de conversion RBE/RN ; 50 % chacun) et Solidité financière (fonds propres/bilan et fonds propres/crédits ; 50 % chacun). Une couverture d'au moins 67 % des composantes est requise. Les dimensions restent séparées : aucun score global ABIX n'est calculé.",
      "en": "Scores use empirical percentile ranks within the selected comparison group when N >= 5, then dimension weights: Profitability (imported ROE, calculated ROA, net margin; 33.3% each), Growth Momentum (CAGR of assets, loans, NBI and net profit; 25% each), Efficiency (CIR and GOI/net-profit conversion; 50% each), and Financial Strength (equity/assets and equity/loans; 50% each). At least 67% component coverage is required. Dimensions remain separate: ABIX calculates no global score.",
      "ar": "تعتمد الدرجات على الرتب المئينية التجريبية داخل مجموعة المقارنة المختارة عندما يكون N أكبر من أو يساوي 5، ثم أوزان كل بُعد: المردودية، زخم النمو، الكفاءة، والمتانة المالية. يلزم توفر 67٪ على الأقل من المكونات. تبقى الأبعاد منفصلة ولا يحسب ABIX درجة إجمالية."
    },
    "formula": "Profil 4D = {Score_Rentabilité, Score_Growth_Momentum, Score_Efficience, Score_Solidité_Financière} — sans addition globale",
    "formula_latex": "\\\\text{Profil 4D} = \\\\{ \\\\text{Score}_{\\\\text{Rentabilité}}, \\\\text{Score}_{\\\\text{Growth Momentum}}, \\\\text{Score}_{\\\\text{Efficience}}, \\\\text{Score}_{\\\\text{Solidité financière}} \\\\}",
    "interpretation": {
      "fr": "Les quartiles de Growth Momentum décrivent une dynamique relative (supérieure, intermédiaire-haute, intermédiaire-basse ou inférieure) et ne sont pas qualifiés automatiquement de force ou faiblesse.",
      "en": "Growth Momentum quartiles describe relative momentum (upper, upper-middle, lower-middle or lower) and are not automatically labeled as strengths or weaknesses.",
      "ar": "تصف أرباع زخم النمو ديناميكية نسبية ولا تُصنف تلقائياً كنقطة قوة أو ضعف."
    },
    "example": {
      "fr": "Exemple méthodologique : quatre scores sont restitués séparément avec leur groupe, leur taille d'échantillon, leur rang de compétition et leur quartile.",
      "en": "Methodological example: four scores are reported separately with their group, sample size, competition rank and quartile.",
      "ar": "مثال منهجي: تُعرض أربع درجات منفصلة مع المجموعة وحجم العينة ورتبة المنافسة والربع."
    },
    "unit": "scores dimensionnels (0-100)",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "regulatory_threshold": null,
    "abix_benchmark": null,
    "example_vintage": "Données 2024, Édition ABIX 2025",
    "modules": [
      "Scores ABIX (4D)",
      "Profils Multidimensionnels",
      "Matrice 4 Quadrants",
      "Executive Dashboard"
    ],
    "related_terms": [
      "normalisation-min-max",
      "scanning-deterministe"
    ],
    "display_order": 50
  },
  {
    "id": "scanning-deterministe",
    "slug": "scanning-deterministe",
    "term": {
      "fr": "Scanning Déterministe & Système d'Alertes",
      "en": "Deterministic Rule-Based Scanning",
      "ar": "المسح الحتمي ونظام التنبيهات المنهجي"
    },
    "acronym": "SCAN",
    "aliases": {
      "fr": [
        "Moteur d'alertes déterministe",
        "Scanning financier auditable",
        "Règles de détection d'anomalies"
      ],
      "en": [
        "Rule-Based Scanning",
        "Deterministic Alerts",
        "Financial Outlier Scanning"
      ],
      "ar": [
        "المسح المالي الحتمي",
        "نظام التنبيهات المؤتمت"
      ]
    },
    "category": "abix_framework",
    "calculation_status": "ABIX_METHODOLOGY",
    "short_definition": {
      "fr": "Moteur d'audit automatisé et 100 % traçable identifiant les ruptures de tendance, les divergences bilantielles et les écarts significatifs aux benchmarks.",
      "en": "Automated, 100% traceable audit engine identifying trend breaks, balance sheet divergences, and material benchmark gaps.",
      "ar": "محرك تدقيق مؤتمت وقابل للتتبع بالكامل يرصد الانقطاعات في المسار والفجوات مقارنة بالمعايير المرجعية."
    },
    "detailed_definition": {
      "fr": "Le scanning déterministe applique des règles arithmétiques explicites aux données disponibles : écarts de benchmark, variations, changements dimensionnels et divergences d'activité. Pour le coût du risque, une hausse brute des dotations — même très forte — ne suffit pas : l'observation exige un poids dotations/PNB matériel (valeur absolue ≥ 10 %) ou un écart absolu à un benchmark disponible ≥ 5 points, tout en restituant montant, variation et ratio. Aucun modèle génératif libre n'intervient.",
      "en": "Deterministic scanning applies explicit arithmetic rules to available data: benchmark gaps, changes, dimension shifts and activity divergences. For cost of risk, a raw provision increase—even a very large one—is insufficient: the observation requires a material provisions/NBI weight (absolute value >= 10%) or an absolute gap to an available benchmark >= 5 points, while reporting amount, change and ratio. No free-form generative model is involved.",
      "ar": "يطبق المسح الحتمي قواعد حسابية صريحة على البيانات المتاحة. وبالنسبة لتكلفة المخاطر، لا يكفي ارتفاع المخصصات الخام مهما كان كبيراً؛ بل يلزم وزن مادي للمخصصات في الناتج البنكي (قيمة مطلقة 10٪ فأكثر) أو فارق مطلق عن مرجع متاح يبلغ 5 نقاط فأكثر، مع عرض المبلغ والتغير والنسبة."
    },
    "formula": "Règles déterministes versionnées ; coût du risque : |Dotations nettes / PNB| ≥ 10 % ou |écart benchmark| ≥ 5 pts",
    "formula_latex": "\\\\text{Alertes} = \\\\{ f(X_t, X_{t-1}, \\\\text{Benchmark}) \\\\mid \\\\text{Conditions Arithmétiques Déterministes v1.0} \\\\}",
    "interpretation": {
      "fr": "Garantit une auditabilité intégrale des constats de gestion restitués dans les dashboards exécutifs et les fiches de synthèse.",
      "en": "Guarantees complete mathematical auditability of analytical insights displayed in executive dashboards and bank profiles.",
      "ar": "يضمن الشفافية والتدقيق الرياضي الكامل لكافة الملاحظات التحليلية في لوحات القيادة التنفيذية."
    },
    "example": {
      "fr": "Données 2024, Édition ABIX 2025 : Génération automatique d'une alerte de divergence pour une banque dont les dépôts ont progressé de +18,5 % tandis que les crédits n'ont cru que de +4,2 % (écart de divergence = 14,3 pts ≥ seuil de 10 pts).",
      "en": "2024 data, ABIX 2025 edition: Automatic divergence alert triggered for a bank whose deposits grew +18.5% while loans only expanded +4.2% (gap = 14.3 pts >= 10 pts threshold).",
      "ar": "بيانات 2024، إصدار ABIX 2025: إطلاق تنبيه تلقائي لبنك نمت ودائعه بـ +18.5% بينما نمت قروضه بـ +4.2% فقط (فارق 14.3 نقطة >= عتبة 10 نقاط)."
    },
    "unit": "règles & alertes",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "ABIX_BENCHMARK",
    "regulatory_threshold": null,
    "abix_benchmark": "Règles arithmétiques de détection versionnées v1.0 (100 % traçable)",
    "example_vintage": "Données 2024, Édition ABIX 2025",
    "modules": [
      "Executive Dashboard",
      "Insights & Alertes",
      "Profil Banque (Synthèse)"
    ],
    "related_terms": [
      "cadre-4d-abix",
      "variation-annuelle-yoy"
    ],
    "display_order": 51
  },
  {
    "id": "barometre-ebanking",
    "slug": "barometre-ebanking",
    "term": {
      "fr": "Baromètre E-Banking & Digitalisation",
      "en": "E-Banking & Digital Transformation Barometer",
      "ar": "مؤشر الخدمات المصرفية الرقمية (E-Banking)"
    },
    "acronym": "EBANK",
    "aliases": {
      "fr": [
        "Baromètre digital",
        "Maturité digitale bancaire",
        "Score E-Banking ABIX"
      ],
      "en": [
        "E-Banking Barometer",
        "Digital Banking Index",
        "Online Banking Score"
      ],
      "ar": [
        "مقياس الرقمنة المصرفية",
        "مؤشر الخدمات البنكية الإلكترونية"
      ]
    },
    "category": "abix_framework",
    "short_definition": {
      "fr": "Référentiel d'évaluation de la maturité digitale des banques basé sur l'audit des applications mobiles, plateformes web et services de paiement électronique.",
      "en": "Benchmarking framework evaluating bank digital maturity through auditing mobile apps, web platforms, and e-payment services.",
      "ar": "مرجع لتقييم النضج الرقمي للبنوك من خلال تدقيق تطبيقات الهاتف، المنصات الإلكترونية وخدمات الدفع الإلكتروني."
    },
    "detailed_definition": {
      "fr": "Le Baromètre E-Banking ABIX est un instrument d'évaluation indépendant mesurant l'offre de services digitaux des banques de la place algérienne. Il analyse plus de 40 critères regroupés en dimensions clés : 1) Ergonomie et fonctionnalités de l'application mobile (authentification biométrique, virements instantanés, gestion de cartes) ; 2) Banque en ligne et portail web ; 3) Moyens de paiement électronique (CIB, Edahabia, paiement sans contact, e-commerce) ; 4) Services innovants et conformité réglementaire.",
      "en": "The ABIX E-Banking Barometer is an independent benchmarking tool evaluating digital banking across Algeria. It audits over 40 criteria spanning mobile app functionality, online banking, e-payment capabilities, and UX design.",
      "ar": "يقيم بارومتر الخدمات المصرفية الإلكترونية عروض الرقمنة في الساحة المصرفية عبر أكثر من 40 معياراً تشمل تطبيقات الهاتف، بوابات الإنترنت ووسائل الدفع الإلكتروني."
    },
    "formula": "Score E-Banking = Σ (Pondération_dimension × Score_dimension) (sur une échelle normalisée de 0 à 100)",
    "formula_latex": "\\\\text{Score E-Banking} = \\\\sum_{k=1}^m w_k \\\\times S_k \\\\quad \\\\text{avec } \\\\sum w_k = 1",
    "interpretation": {
      "fr": "Un score élevé reflète une offre digitale mature, fluide et sécurisée répondant aux attentes des usagers particuliers et entreprises.",
      "en": "A top score reflects a mature, seamless, and secure digital banking offering for retail and corporate clients.",
      "ar": "تدل النتيجة المرتفعة على عرض رقمي متقدم وسلس وآمن يلبي تطلعات الأفراد والمؤسسات."
    },
    "example": {
      "fr": "Édition Baromètre ABIX 2025 : Scores sectoriels variant de 32/100 (offre basique) à plus de 86/100 pour les banques leaders de la digitalisation en Algérie.",
      "en": "ABIX Barometer 2025 edition: Bank scores ranging from 32/100 (basic features) to over 86/100 for leading digital pioneers.",
      "ar": "إصدار بارومتر ABIX 2025: تتراوح النتائج من 32/100 (خدمات أساسية) إلى أكثر من 86/100 للبنوك الرائدة في التحول الرقمي."
    },
    "unit": "score (0 à 100)",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "ABIX_BENCHMARK",
    "regulatory_threshold": null,
    "abix_benchmark": "Score 0-100 normalisé sur grille multicritère auditée",
    "example_vintage": "Édition Baromètre ABIX 2025",
    "modules": [
      "Baromètre E-Banking",
      "Profil Banque (Volet Digital)",
      "Classements Digitaux"
    ],
    "related_terms": [
      "cadre-4d-abix"
    ],
    "display_order": 52
  },
  {
    "id": "poids-cout-risque-pnb",
    "slug": "poids-cout-risque-pnb",
    "term": {
      "fr": "Poids du coût du risque dans le PNB",
      "en": "Cost of Risk to NBI Ratio",
      "ar": "نسبة تكلفة المخاطر إلى الناتج البنكي الصافي"
    },
    "acronym": "CdR / PNB",
    "aliases": {
      "fr": [
        "Dotations nettes / PNB",
        "Absorption du PNB par le risque"
      ],
      "en": [
        "Net provisions to NBI",
        "Risk cost weight"
      ],
      "ar": [
        "المخصصات الصافية / الناتج البنكي الصافي"
      ]
    },
    "category": "risk_solvency",
    "short_definition": {
      "fr": "Provisions nettes / PNB. Indicateur contextuel ABIX, distinct d'un ratio réglementaire calculé sur les encours.",
      "en": "Net provisions / NBI. Contextual ABIX indicator, distinct from a regulatory exposure-based ratio.",
      "ar": "المؤونات الصافية / الناتج البنكي الصافي. مؤشر ABIX سياقي مختلف عن النسبة الرقابية المحسوبة على القروض."
    },
    "detailed_definition": {
      "fr": "Le ratio mesure la part du Produit Net Bancaire absorbée par les dotations nettes aux provisions. Il complète la lecture du montant et de son évolution sans remplacer le taux NPL, le taux de couverture ni un coût du risque prudentiel rapporté aux encours.",
      "en": "The ratio measures the share of Net Banking Income absorbed by net provision charges. It complements the amount and trend analysis without replacing the NPL ratio, coverage ratio, or a prudential exposure-based risk-cost measure.",
      "ar": "تقيس النسبة حصة الناتج البنكي الصافي التي تمتصها المؤونات الصافية. وهي تكمل قراءة المبلغ وتطوره دون أن تعوض نسبة القروض غير العاملة أو نسبة التغطية أو تكلفة المخاطر الاحترازية المحسوبة على القروض."
    },
    "formula": "(Dotations nettes aux provisions / Produit Net Bancaire) × 100",
    "interpretation": {
      "fr": "Lecture contextuelle par montant, évolution et écart à la référence consolidée publique ou privée disponible. Une hausse brute des dotations ne constitue pas, à elle seule, un jugement de performance.",
      "en": "Contextual reading by amount, trend, and gap to the available consolidated public or private reference. A raw increase in provisions does not, by itself, constitute a performance judgement.",
      "ar": "قراءة سياقية حسب المبلغ والتطور والفارق عن المرجع المجمع العمومي أو الخاص المتاح. ولا يشكل الارتفاع الخام للمؤونات وحده حكماً على الأداء."
    },
    "example": {
      "fr": "N/D",
      "en": "N/A",
      "ar": "غ/م"
    },
    "unit": "%",
    "performance_direction": "contextual",
    "higher_is_better": null,
    "threshold_type": "ABIX_BENCHMARK",
    "abix_benchmark": "L'appréciation est contextuelle au regard du PNB et du modèle d'activité. (Règle V2)",
    "modules": [
      "Executive V2"
    ],
    "related_terms": [
      "dotations-nettes-provisions",
      "produit-net-bancaire"
    ],
    "display_order": 53
  },
  {
    "id": "pnb-par-collaborateur",
    "slug": "pnb-par-collaborateur",
    "term": {
      "fr": "PNB par collaborateur (Productivité)",
      "en": "NBI per Employee (Productivity)",
      "ar": "الناتج البنكي الصافي لكل موظف (الإنتاجية)"
    },
    "acronym": "PNB/Effectif",
    "aliases": {
      "fr": [
        "Productivité par tête",
        "Revenu par employé"
      ],
      "en": [
        "Productivity per headcount",
        "Revenue per employee"
      ],
      "ar": [
        "الإنتاجية لكل فرد",
        "الإيرادات لكل موظف"
      ]
    },
    "category": "ratios_profitability",
    "short_definition": {
      "fr": "Indicateur d'efficience opérationnelle mesurant le revenu moyen généré par chaque collaborateur de la banque. Étant donné l'absence de convention standardisée de comptage des effectifs, son interprétation nécessite de la prudence.",
      "en": "An operational efficiency indicator measuring the average revenue generated by each bank employee. Given the lack of a standardized headcount convention, its interpretation requires caution.",
      "ar": "مؤشر الكفاءة التشغيلية الذي يقيس متوسط الإيرادات التي يولدها كل موظف في البنك. نظرًا لعدم وجود اتفاقية موحدة لحساب عدد الموظفين، فإن تفسيرها يتطلب الحذر."
    },
    "detailed_definition": {
      "fr": "Voir définition courte.",
      "en": "See short definition.",
      "ar": "انظر التعريف المختصر."
    },
    "formula": "Produit Net Bancaire / Effectif Total Annoncé",
    "interpretation": {
      "fr": "Permet de comparer l'efficience de la force de travail entre banques de modèles similaires (retail vs corporate).",
      "en": "Allows for comparison of workforce efficiency between banks with similar models (retail vs corporate).",
      "ar": "يسمح بمقارنة كفاءة القوى العاملة بين البنوك ذات النماذج المماثلة (التجزئة مقابل الشركات)."
    },
    "example": {
      "fr": "N/D",
      "en": "N/A",
      "ar": "غ/م"
    },
    "unit": "M DZD",
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "ABIX_BENCHMARK",
    "abix_benchmark": "Benchmarking comparatif via l'outil Executive V2.",
    "modules": [
      "Executive V2"
    ],
    "related_terms": [
      "produit-net-bancaire",
      "coefficient-exploitation"
    ],
    "display_order": 54
  },
  {
    "id": "effectifs-bancaires",
    "slug": "effectifs-bancaires",
    "term": {
      "fr": "Effectifs (Nombre de collaborateurs)",
      "en": "Headcount (Number of Employees)",
      "ar": "عدد الموظفين"
    },
    "acronym": "Effectifs",
    "aliases": {
      "fr": [
        "Collaborateurs",
        "Salariés"
      ],
      "en": [
        "Employees",
        "Staff"
      ],
      "ar": [
        "العاملين",
        "المستخدمين"
      ]
    },
    "category": "financial_indicators",
    "short_definition": {
      "fr": "Nombre total de collaborateurs employés par la banque. Champ enrichi (non activé par défaut dans les scores) utilisé pour les analyses de productivité.",
      "en": "Total number of employees in the bank. Enriched field (not activated by default in scores) used for productivity analysis.",
      "ar": "إجمالي عدد الموظفين في البنك. حقل مثرى (غير مفعل افتراضيًا في الدرجات) يُستخدم لتحليل الإنتاجية."
    },
    "detailed_definition": {
      "fr": "L'effectif bancaire total renseigné par la banque.",
      "en": "The total bank headcount reported by the bank.",
      "ar": "إجمالي عدد الموظفين المصرح به من قبل البنك."
    },
    "interpretation": {
      "fr": "Indicateur de taille utilisé principalement au dénominateur pour les ratios de productivité.",
      "en": "Size indicator used primarily as a denominator for productivity ratios.",
      "ar": "مؤشر حجم يُستخدم أساسًا كمقام لنسب الإنتاجية."
    },
    "example": {
      "fr": "N/D",
      "en": "N/A",
      "ar": "غ/م"
    },
    "unit": "collaborateurs",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "modules": [
      "Executive V2"
    ],
    "related_terms": [],
    "display_order": 55
  },
  {
    "id": "nombre-agences",
    "slug": "nombre-agences",
    "term": {
      "fr": "Nombre d'agences",
      "en": "Number of Branches",
      "ar": "عدد الفروع"
    },
    "acronym": "Agences",
    "aliases": {
      "fr": [
        "Réseau d'agences",
        "Points de vente"
      ],
      "en": [
        "Branch network",
        "Points of sale"
      ],
      "ar": [
        "شبكة الفروع",
        "نقاط البيع"
      ]
    },
    "category": "financial_indicators",
    "short_definition": {
      "fr": "Nombre de succursales et agences physiques constituant le réseau de la banque.",
      "en": "Number of physical branches and agencies constituting the bank's network.",
      "ar": "عدد الفروع والوكالات الفعلية التي تشكل شبكة البنك."
    },
    "detailed_definition": {
      "fr": "L'ensemble du réseau physique d'agences bancaires.",
      "en": "The entire physical network of bank branches.",
      "ar": "الشبكة الفعلية بأكملها لفروع البنك."
    },
    "interpretation": {
      "fr": "Indicateur d'empreinte physique et de maillage territorial.",
      "en": "Physical footprint and territorial coverage indicator.",
      "ar": "مؤشر البصمة المادية والتغطية الإقليمية."
    },
    "example": {
      "fr": "N/D",
      "en": "N/A",
      "ar": "غ/م"
    },
    "unit": "agences",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "modules": [
      "Executive V2"
    ],
    "related_terms": [],
    "display_order": 56
  },
  {
    "id": "engagements-hors-bilan-donnes",
    "slug": "engagements-hors-bilan-donnes",
    "term": {
      "fr": "Engagements hors bilan donnés",
      "en": "Off-balance sheet commitments given",
      "ar": "الالتزامات خارج الميزانية المعطاة"
    },
    "acronym": "EHB Donnés",
    "aliases": {
      "fr": [
        "Garanties données"
      ],
      "en": [
        "Guarantees given"
      ],
      "ar": [
        "الضمانات الممنوحة"
      ]
    },
    "category": "financial_indicators",
    "short_definition": {
      "fr": "Garanties, avals et cautions accordés par la banque n'apparaissant pas au bilan.",
      "en": "Guarantees, endorsements and sureties granted by the bank not appearing on the balance sheet.",
      "ar": "الضمانات والكفالات الممنوحة من قبل البنك والتي لا تظهر في الميزانية العمومية."
    },
    "detailed_definition": {
      "fr": "Montant total des engagements pris par la banque sous forme de signatures.",
      "en": "Total amount of commitments taken by the bank in the form of signatures.",
      "ar": "المبلغ الإجمالي للالتزامات التي تعهد بها البنك على شكل توقيعات."
    },
    "interpretation": {
      "fr": "Mesure l'activité de crédit par signature.",
      "en": "Measures signature credit activity.",
      "ar": "يقيس نشاط ائتمان التوقيع."
    },
    "example": {
      "fr": "N/D",
      "en": "N/A",
      "ar": "غ/م"
    },
    "unit": "M DZD",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "modules": [
      "Executive V2"
    ],
    "related_terms": [],
    "display_order": 57
  },
  {
    "id": "engagements-hors-bilan-recus",
    "slug": "engagements-hors-bilan-recus",
    "term": {
      "fr": "Engagements hors bilan reçus",
      "en": "Off-balance sheet commitments received",
      "ar": "الالتزامات خارج الميزانية المتلقاة"
    },
    "acronym": "EHB Reçus",
    "aliases": {
      "fr": [
        "Garanties reçues"
      ],
      "en": [
        "Guarantees received"
      ],
      "ar": [
        "الضمانات المتلقاة"
      ]
    },
    "category": "financial_indicators",
    "short_definition": {
      "fr": "Garanties et sûretés reçues par la banque de la part de tiers.",
      "en": "Guarantees and collateral received by the bank from third parties.",
      "ar": "الضمانات والكفالات التي يتلقاها البنك من أطراف ثالثة."
    },
    "detailed_definition": {
      "fr": "Montant total des engagements de garantie reçus par la banque.",
      "en": "Total amount of guarantee commitments received by the bank.",
      "ar": "المبلغ الإجمالي لالتزامات الضمان التي يتلقاها البنك."
    },
    "interpretation": {
      "fr": "Indicateur de sécurisation du portefeuille.",
      "en": "Portfolio security indicator.",
      "ar": "مؤشر أمان المحفظة."
    },
    "example": {
      "fr": "N/D",
      "en": "N/A",
      "ar": "غ/م"
    },
    "unit": "M DZD",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "modules": [
      "Executive V2"
    ],
    "related_terms": [],
    "display_order": 58
  },
  {
    "id": "part-marge-interet",
    "slug": "part-marge-interet",
    "term": {
      "fr": "Part de la Marge d'Intérêt (MNI) dans le PNB",
      "en": "Net Interest Margin share in NBI",
      "ar": "حصة هامش الفائدة في الناتج البنكي الصافي"
    },
    "acronym": "MNI / PNB",
    "aliases": {
      "fr": [
        "Part marge d'intérêt"
      ],
      "en": [
        "NIM share"
      ],
      "ar": [
        "حصة هامش الفائدة"
      ]
    },
    "category": "financial_indicators",
    "short_definition": {
      "fr": "Part des revenus d'intermédiation classique dans le produit net bancaire.",
      "en": "Share of traditional intermediation revenues in the net banking income.",
      "ar": "حصة إيرادات الوساطة التقليدية في الناتج البنكي الصافي."
    },
    "detailed_definition": {
      "fr": "Ratio de la marge nette d'intérêts sur le Produit Net Bancaire global.",
      "en": "Ratio of net interest margin to global Net Banking Income.",
      "ar": "نسبة صافي هامش الفائدة إلى إجمالي الناتج البنكي الصافي."
    },
    "interpretation": {
      "fr": "Permet de visualiser le poids de l'activité d'intermédiation.",
      "en": "Visualizes the weight of traditional intermediation activity.",
      "ar": "يسمح بتصور وزن نشاط الوساطة التقليدي."
    },
    "example": {
      "fr": "N/D",
      "en": "N/A",
      "ar": "غ/م"
    },
    "unit": "%",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "modules": [
      "Executive V2"
    ],
    "related_terms": [],
    "display_order": 59
  },
  {
    "id": "part-commissions",
    "slug": "part-commissions",
    "term": {
      "fr": "Part des Commissions dans le PNB",
      "en": "Commissions share in NBI",
      "ar": "حصة العمولات في الناتج البنكي الصافي"
    },
    "acronym": "Commissions / PNB",
    "aliases": {
      "fr": [
        "Part commissions"
      ],
      "en": [
        "Commissions share"
      ],
      "ar": [
        "حصة العمولات"
      ]
    },
    "category": "financial_indicators",
    "short_definition": {
      "fr": "Poids des revenus de tarification et de services dans le PNB global.",
      "en": "Weight of fee and service revenues in the global NBI.",
      "ar": "وزن إيرادات الرسوم والخدمات في إجمالي الناتج البنكي الصافي."
    },
    "detailed_definition": {
      "fr": "Ratio des commissions nettes perçues sur le PNB global.",
      "en": "Ratio of net commissions received to global Net Banking Income.",
      "ar": "نسبة العمولات الصافية المستلمة إلى إجمالي الناتج البنكي الصافي."
    },
    "interpretation": {
      "fr": "Permet d'estimer la diversification des revenus vers les services.",
      "en": "Estimates revenue diversification towards fee-based services.",
      "ar": "يقدر تنويع الإيرادات نحو الخدمات القائمة على الرسوم."
    },
    "example": {
      "fr": "N/D",
      "en": "N/A",
      "ar": "غ/م"
    },
    "unit": "%",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "modules": [
      "Executive V2"
    ],
    "related_terms": [],
    "display_order": 60
  },
  {
    "id": "part-autres-revenus",
    "slug": "part-autres-revenus",
    "term": {
      "fr": "Part des Autres Revenus dans le PNB",
      "en": "Other Income share in NBI",
      "ar": "حصة الإيرادات الأخرى في الناتج البنكي الصافي"
    },
    "acronym": "Autres / PNB",
    "aliases": {
      "fr": [
        "Part autres revenus"
      ],
      "en": [
        "Other income share"
      ],
      "ar": [
        "حصة الإيرادات الأخرى"
      ]
    },
    "category": "financial_indicators",
    "short_definition": {
      "fr": "Poids des opérations de marché, de change et revenus divers dans le PNB.",
      "en": "Weight of market operations, FX and various incomes in the NBI.",
      "ar": "وزن عمليات السوق والصرف الأجنبي والإيرادات المختلفة في الناتج البنكي الصافي."
    },
    "detailed_definition": {
      "fr": "Ratio des autres revenus (opérations financières, divers) sur le PNB.",
      "en": "Ratio of other incomes (financial operations, miscellaneous) to global NBI.",
      "ar": "نسبة الإيرادات الأخرى إلى إجمالي الناتج البنكي الصافي."
    },
    "interpretation": {
      "fr": "Indique la volatilité potentielle et les revenus exceptionnels.",
      "en": "Indicates potential volatility and exceptional incomes.",
      "ar": "يشير إلى التقلبات المحتملة والإيرادات الاستثنائية."
    },
    "example": {
      "fr": "N/D",
      "en": "N/A",
      "ar": "غ/م"
    },
    "unit": "%",
    "performance_direction": "neutral",
    "higher_is_better": null,
    "modules": [
      "Executive V2"
    ],
    "related_terms": [],
    "display_order": 61
  },
  {
    "id": "reference-consolidee-statut",
    "slug": "reference-consolidee-statut",
    "term": {
      "fr": "Référence consolidée de statut",
      "en": "Consolidated Ownership Reference",
      "ar": "المرجع المجمع حسب الملكية"
    },
    "acronym": "Réf. statut",
    "aliases": {
      "fr": [
        "Ratio agrégé public ou privé",
        "Benchmark public / privé"
      ],
      "en": [
        "Aggregated public or private ratio",
        "Public / private benchmark"
      ],
      "ar": [
        "النسبة المجمعة للبنوك العمومية أو الخاصة"
      ]
    },
    "category": "statistics_methods",
    "calculation_status": "ABIX_METHODOLOGY",
    "short_definition": {
      "fr": "Ratio agrégé calculé séparément pour le groupe des banques publiques ou privées.",
      "en": "Aggregate ratio calculated separately for the public-bank or private-bank group.",
      "ar": "نسبة مجمعة تحسب بشكل منفصل لمجموعة البنوك العمومية أو الخاصة."
    },
    "detailed_definition": {
      "fr": "Pour le coût du risque, la référence est égale à la somme des provisions nettes divisée par la somme des PNB du groupe. Elle est donc pondérée par le PNB et ne constitue pas une médiane.",
      "en": "For risk cost, the reference equals group net provisions divided by group NBI. It is therefore NBI-weighted and is not a median.",
      "ar": "بالنسبة لتكلفة المخاطر يساوي المرجع مجموع المؤونات الصافية مقسوماً على مجموع الناتج البنكي للمجموعة، ولذلك فهو مرجح بالناتج وليس وسيطاً."
    },
    "formula": "Référence CdR du statut = Σ provisions nettes du groupe / Σ PNB du groupe × 100",
    "interpretation": {
      "fr": "Permet une comparaison contextuelle avec les banques de même statut de propriété, sans notation réglementaire ni benchmark par modèle économique.",
      "en": "Provides a contextual comparison with banks of the same ownership status, without a regulatory rating or business-model benchmark.",
      "ar": "يتيح مقارنة سياقية مع البنوك ذات نمط الملكية نفسه دون تصنيف رقابي أو مرجع حسب نموذج الأعمال."
    },
    "example": {
      "fr": "N/D",
      "en": "N/A",
      "ar": "غ/م"
    },
    "unit": "%",
    "performance_direction": "contextual",
    "higher_is_better": null,
    "threshold_type": "ABIX_BENCHMARK",
    "modules": [
      "Executive V2"
    ],
    "related_terms": [
      "poids-cout-risque-pnb",
      "secteur-public-prive",
      "mediane"
    ],
    "display_order": 62
  },
  {
    "id": "dynamique-croissance",
    "slug": "dynamique-croissance",
    "term": {
      "fr": "Dynamique de croissance",
      "en": "Growth Momentum",
      "ar": "ديناميكية النمو"
    },
    "acronym": "Growth Momentum",
    "aliases": {
      "fr": [
        "Intensité de croissance",
        "Dynamique relative"
      ],
      "en": [
        "Growth intensity",
        "Relative momentum"
      ],
      "ar": [
        "شدة النمو",
        "الديناميكية النسبية"
      ]
    },
    "category": "abix_framework",
    "calculation_status": "ABIX_METHODOLOGY",
    "short_definition": {
      "fr": "Intensité de croissance des principaux agrégats bancaires.",
      "en": "Growth intensity of key banking aggregates.",
      "ar": "شدة نمو المجاميع المصرفية الرئيسية."
    },
    "detailed_definition": {
      "fr": "Dimension ABIX qui restitue l'évolution relative des principaux agrégats. Une dynamique élevée n'implique pas automatiquement une meilleure qualité bancaire ou une meilleure performance générale.",
      "en": "ABIX dimension presenting relative changes in key aggregates. High momentum does not automatically imply better banking quality or overall performance.",
      "ar": "بعد في ABIX يعرض التطور النسبي للمجاميع الرئيسية، ولا تعني الديناميكية المرتفعة تلقائياً جودة مصرفية أو أداءً عاماً أفضل."
    },
    "interpretation": {
      "fr": "Les quartiles décrivent ici l'intensité relative de croissance, sans jugement normatif.",
      "en": "Quartiles describe relative growth intensity here, without normative judgement.",
      "ar": "تصف الرباعيات هنا شدة النمو النسبية دون حكم معياري."
    },
    "example": {
      "fr": "N/D",
      "en": "N/A",
      "ar": "غ/م"
    },
    "performance_direction": "contextual",
    "higher_is_better": null,
    "threshold_type": "ABIX_BENCHMARK",
    "modules": [
      "Executive V2",
      "Scores ABIX"
    ],
    "related_terms": [
      "croissance-yoy",
      "cagr",
      "quartiles",
      "cadre-4d-abix"
    ],
    "display_order": 63
  },
  {
    "id": "solidite-financiere",
    "slug": "solidite-financiere",
    "term": {
      "fr": "Solidité financière",
      "en": "Financial Strength",
      "ar": "المتانة المالية"
    },
    "acronym": "Financial Strength",
    "aliases": {
      "fr": [
        "Structure financière",
        "Capitalisation relative"
      ],
      "en": [
        "Financial structure",
        "Relative capitalisation"
      ],
      "ar": [
        "الهيكل المالي",
        "الرسملة النسبية"
      ]
    },
    "category": "abix_framework",
    "calculation_status": "ABIX_METHODOLOGY",
    "short_definition": {
      "fr": "Dimension ABIX de lecture relative de la capitalisation et de la structure du bilan.",
      "en": "ABIX dimension providing a relative view of capitalisation and balance-sheet structure.",
      "ar": "بعد في ABIX يقدم قراءة نسبية للرسملة وهيكل الميزانية."
    },
    "detailed_definition": {
      "fr": "Cette dimension positionne la banque sur des indicateurs de structure financière disponibles. Elle ne constitue ni un ratio réglementaire de solvabilité ni une évaluation prudentielle.",
      "en": "This dimension positions the bank using available financial-structure indicators. It is neither a regulatory solvency ratio nor a prudential assessment.",
      "ar": "يحدد هذا البعد موقع البنك باستخدام مؤشرات الهيكل المالي المتاحة، ولا يمثل نسبة رقابية للملاءة ولا تقييماً احترازياً."
    },
    "interpretation": {
      "fr": "Positionnement relatif parmi les établissements disponibles, sans score global ABIX.",
      "en": "Relative positioning among available institutions, without an overall ABIX score.",
      "ar": "تموضع نسبي بين المؤسسات المتاحة دون درجة إجمالية لـ ABIX."
    },
    "example": {
      "fr": "N/D",
      "en": "N/A",
      "ar": "غ/م"
    },
    "performance_direction": "higher_is_better",
    "higher_is_better": true,
    "threshold_type": "ABIX_BENCHMARK",
    "modules": [
      "Executive V2",
      "Scores ABIX"
    ],
    "related_terms": [
      "fonds-propres",
      "ratio-fonds-propres-actifs",
      "cadre-4d-abix"
    ],
    "display_order": 64
  },
  {
    "id": "non-disponible",
    "slug": "non-disponible",
    "term": {
      "fr": "Non disponible",
      "en": "Not available",
      "ar": "غير متاح"
    },
    "acronym": "N/D",
    "aliases": {
      "fr": [
        "Donnée non disponible",
        "Valeur absente"
      ],
      "en": [
        "N/A",
        "Unavailable data",
        "Missing value"
      ],
      "ar": [
        "بيانات غير متاحة",
        "قيمة مفقودة"
      ]
    },
    "category": "statistics_methods",
    "calculation_status": "ABIX_METHODOLOGY",
    "short_definition": {
      "fr": "Donnée absente ou insuffisante pour une restitution ou un calcul fiable.",
      "en": "Data missing or insufficient for reliable display or calculation.",
      "ar": "بيانات مفقودة أو غير كافية للعرض أو الحساب الموثوق."
    },
    "detailed_definition": {
      "fr": "ABIX conserve explicitement cet état et ne remplace jamais artificiellement une valeur non disponible par zéro.",
      "en": "ABIX explicitly preserves this state and never artificially replaces an unavailable value with zero.",
      "ar": "يحافظ ABIX صراحة على هذه الحالة ولا يستبدل القيمة غير المتاحة بالصفر أبداً."
    },
    "interpretation": {
      "fr": "L'absence de valeur ne doit être interprétée ni comme zéro ni comme une contre-performance.",
      "en": "A missing value must be interpreted neither as zero nor as underperformance.",
      "ar": "لا تفسر القيمة المفقودة على أنها صفر أو ضعف في الأداء."
    },
    "example": {
      "fr": "N/D",
      "en": "N/A",
      "ar": "غ/م"
    },
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "modules": [
      "Executive V2",
      "Tous modules"
    ],
    "related_terms": [
      "non-significatif"
    ],
    "display_order": 65
  },
  {
    "id": "non-significatif",
    "slug": "non-significatif",
    "term": {
      "fr": "Non significatif",
      "en": "Not significant",
      "ar": "غير جوهري"
    },
    "acronym": "NS",
    "aliases": {
      "fr": [
        "Valeur non exploitable",
        "Valeur non significative"
      ],
      "en": [
        "Non-meaningful value",
        "Not meaningful"
      ],
      "ar": [
        "قيمة غير قابلة للاستخدام",
        "قيمة غير جوهرية"
      ]
    },
    "category": "statistics_methods",
    "calculation_status": "ABIX_METHODOLOGY",
    "short_definition": {
      "fr": "Valeur non exploitable comme donnée numérique fiable.",
      "en": "Value not usable as reliable numeric data.",
      "ar": "قيمة غير قابلة للاستخدام كبيان رقمي موثوق."
    },
    "detailed_definition": {
      "fr": "ABIX conserve explicitement la mention NS ; elle n'est jamais transformée automatiquement en zéro ni intégrée comme une observation numérique.",
      "en": "ABIX explicitly preserves the NS marker; it is never automatically converted to zero or included as a numeric observation.",
      "ar": "يحافظ ABIX صراحة على علامة غير جوهري، ولا تحول تلقائياً إلى صفر ولا تدمج كمشاهدة رقمية."
    },
    "interpretation": {
      "fr": "La valeur est exclue des calculs qui exigent une observation numérique valide.",
      "en": "The value is excluded from calculations requiring a valid numeric observation.",
      "ar": "تستبعد القيمة من الحسابات التي تتطلب مشاهدة رقمية صالحة."
    },
    "example": {
      "fr": "NS",
      "en": "NS",
      "ar": "غير جوهري"
    },
    "performance_direction": "neutral",
    "higher_is_better": null,
    "threshold_type": "NONE",
    "modules": [
      "Executive V2",
      "Tous modules"
    ],
    "related_terms": [
      "non-disponible"
    ],
    "display_order": 66
  }
];

// ── Fonction de génération du fichier data/glossary.json ──────────────────────
function generateGlossaryJson() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const now = new Date().toISOString();
  const glossaryData = {
    metadata: {
      version: "3.0.0",
      status: "OFFICIAL_AUDITED_METHODOLOGY",
      total_terms: RAW_ENTRIES.length,
      categories_count: Object.keys(CATEGORIES).length,
      languages_supported: ["fr", "en", "ar"],
      updated_at: now
    },
    categories: CATEGORIES,
    terms: RAW_ENTRIES.map(e => ({
      ...e,
      is_active: true,
      created_at: e.created_at || now,
      updated_at: now
    }))
  };

  fs.writeFileSync(GLOSSARY_FILE, JSON.stringify(glossaryData, null, 2), "utf8");
  console.log(`[seed-glossary] ✓ ${RAW_ENTRIES.length} entrées enregistrées dans ${GLOSSARY_FILE}`);
}

// ── Mise à jour des dictionnaires i18n locales/*.json ─────────────────────────
function updateLocales() {
  const languages = ["fr", "en", "ar"];

  // Dictionnaire des textes de l'UI du Glossaire
  const GLOSSARY_UI = {
    fr: {
      meta: {
        title: "Glossaire financier et bancaire | ABIX Data Explorer",
        description: "Retrouvez les définitions, formules et explications de tous les indicateurs, ratios et concepts financiers utilisés dans ABIX Data Explorer."
      },
      hero: {
        badge: "Référentiel Méthodologique ABIX",
        title: "Glossaire ABIX",
        subtitle: "Retrouvez les définitions des principaux indicateurs, ratios, méthodes statistiques et concepts métiers utilisés dans ABIX Data Explorer.",
        searchPlaceholder: "Rechercher un terme, un acronyme ou une notion (ex: CAGR, ROE, HHI, Quantile, LDR)...",
        searchAriaLabel: "Champ de recherche dans le glossaire",
        statsLabel: "notions répertoriées",
        categoriesLabel: "catégories analytiques",
        quickTip: "Astuce : appuyez sur la touche « / » pour chercher instantanément.",
        downloadPdf: "Télécharger le Livret PDF",
        downloadPdfFilename: "glossaire-abix-banques-algerie-fr.pdf"
      },
      filters: {
        all: "Tous",
        allCountLabel: "toutes les notions",
        filterByCategory: "Filtrer par catégorie",
        alphabetLabel: "Navigation alphabétique",
        clearSearch: "Effacer la recherche",
        noResultsTitle: "Aucune notion trouvée",
        noResultsDesc: "Aucun résultat ne correspond à votre recherche « {query} ». Essayez avec un acronyme, un synonyme ou un autre mot-clé.",
        resetFilters: "Réinitialiser les filtres",
        showingCount: "Affichage de {count} sur {total} notions"
      },
      card: {
        viewDefinition: "Voir la fiche complète",
        formulaBadge: "Formule",
        higherBetterTrue: "Élevé = Favorable",
        higherBetterFalse: "Faible = Favorable",
        usedInModules: "Utilisé dans ABIX :"
      },
      drawer: {
        shortDefTitle: "Définition courte",
        detailedDefTitle: "Explication détaillée",
        formulaTitle: "Formule de calcul ABIX",
        interpretationTitle: "Comment interpréter ce résultat ?",
        exampleTitle: "Exemple chiffré",
        unitTitle: "Unité de mesure",
        directionTitle: "Sens de lecture",
        modulesTitle: "Utilisé dans les modules ABIX",
        relatedTitle: "Notions connexes",
        closeBtn: "Fermer la fiche",
        copyLink: "Copier le lien direct",
        copiedToast: "Lien copié dans le presse-papier !",
        exportPdf: "Imprimer / Exporter en PDF"
      },
      contextualHelp: {
        tooltipSeeMore: "Voir la définition dans le glossaire →",
        badgeHelp: "Aide contextuelle"
      }
    },
    en: {
      meta: {
        title: "Banking & Financial Glossary | ABIX Data Explorer",
        description: "Explore definitions, formulas, and interpretations of all banking indicators, ratios, and statistical methods used in ABIX Data Explorer."
      },
      hero: {
        badge: "ABIX Methodological Repository",
        title: "ABIX Glossary",
        subtitle: "Explore definitions of core financial indicators, ratios, statistical methods, and industry concepts used in ABIX Data Explorer.",
        searchPlaceholder: "Search a term, acronym, or concept (e.g. CAGR, ROE, HHI, Quantile, LDR)...",
        searchAriaLabel: "Search glossary input",
        statsLabel: "indexed concepts",
        categoriesLabel: "analytical categories",
        quickTip: "Tip: press the '/' key to start searching instantly.",
        downloadPdf: "Download PDF Booklet",
        downloadPdfFilename: "glossary-abix-algerian-banking-en.pdf"
      },
      filters: {
        all: "All",
        allCountLabel: "all concepts",
        filterByCategory: "Filter by category",
        alphabetLabel: "Alphabetical navigation",
        clearSearch: "Clear search",
        noResultsTitle: "No concept found",
        noResultsDesc: "No match for your search query \"{query}\". Try an acronym, alias, or different keyword.",
        resetFilters: "Reset filters",
        showingCount: "Showing {count} of {total} concepts"
      },
      card: {
        viewDefinition: "View detailed sheet",
        formulaBadge: "Formula",
        higherBetterTrue: "Higher = Better",
        higherBetterFalse: "Lower = Better",
        usedInModules: "Used in ABIX:"
      },
      drawer: {
        shortDefTitle: "Short Definition",
        detailedDefTitle: "Detailed Explanation",
        formulaTitle: "ABIX Calculation Formula",
        interpretationTitle: "How to interpret the result?",
        exampleTitle: "Numerical Example",
        unitTitle: "Unit of Measurement",
        directionTitle: "Directional Reading",
        modulesTitle: "Used in ABIX Modules",
        relatedTitle: "Related Terms",
        closeBtn: "Close sheet",
        copyLink: "Copy direct link",
        copiedToast: "Direct link copied to clipboard!",
        exportPdf: "Print / Export as PDF"
      },
      contextualHelp: {
        tooltipSeeMore: "View definition in glossary →",
        badgeHelp: "Contextual Help"
      }
    },
    ar: {
      meta: {
        title: "معجم المصطلحات المصرفية والمالية | ABIX Data Explorer",
        description: "تعرف على تعريفات وصيغ وتفسيرات كافة المؤشرات والنسب والمفاهيم الإحصائية والمصرفية المعتمدة في منصة ABIX Data Explorer."
      },
      hero: {
        badge: "المرجع المنهجي لمؤشر ABIX",
        title: "معجم ABIX",
        subtitle: "تعرف على تعريفات وصيغ المؤشرات والنسب والأساليب الإحصائية والمفاهيم المصرفية المعتمدة في منصة ABIX Data Explorer.",
        searchPlaceholder: "ابحث عن مصطلح، اختصار أو مفهوم (مثل: CAGR, ROE, HHI, Quantile, LDR)...",
        searchAriaLabel: "حقل البحث في المعجم",
        statsLabel: "مفهوماً مفهرساً",
        categoriesLabel: "تصنيفات تحليلية",
        quickTip: "تلميح: اضغط على المفتاح « / » للبحث الفوري.",
        downloadPdf: "تحميل دليل المعجم (PDF)",
        downloadPdfFilename: "glossaire-abix-banques-algerie-fr.pdf"
      },
      filters: {
        all: "الكل",
        allCountLabel: "كافة المفاهيم",
        filterByCategory: "تصفية حسب التصنيف",
        alphabetLabel: "التصفح الأبجدي",
        clearSearch: "مسح البحث",
        noResultsTitle: "لم يتم العثور على نتائج",
        noResultsDesc: "لا توجد نتائج تطابق بحثك « {query} ». جرب استخدام اختصار أو مرادف أو كلمة مفتاحية أخرى.",
        resetFilters: "إعادة ضبط الفلاتر",
        showingCount: "عرض {count} من أصل {total} مفهوماً"
      },
      card: {
        viewDefinition: "عرض البطاقة المفصلة",
        formulaBadge: "الصيغة",
        higherBetterTrue: "الأعلى = أفضل",
        higherBetterFalse: "الأقل = أفضل",
        usedInModules: "مستخدم في منصة ABIX:"
      },
      drawer: {
        shortDefTitle: "تعريف مختصر",
        detailedDefTitle: "شرح تفصيلي",
        formulaTitle: "صيغة الحساب في ABIX",
        interpretationTitle: "كيفية قراءة وتفسير النتيجة؟",
        exampleTitle: "مثال رقمي",
        unitTitle: "وحدة القياس",
        directionTitle: "اتجاه القراءة",
        modulesTitle: "مستخدم في وحدات ABIX",
        relatedTitle: "المفاهيم ذات الصلة",
        closeBtn: "إغلاق البطاقة",
        copyLink: "نسخ الرابط المباشر",
        copiedToast: "تم نسخ الرابط المباشر إلى الحافظة!",
        exportPdf: "طباعة / تصدير كـ PDF"
      },
      contextualHelp: {
        tooltipSeeMore: "عرض التعريف في المعجم ←",
        badgeHelp: "مساعدة سياقية"
      }
    }
  };

  for (const lang of languages) {
    const filePath = path.join(LOCALES_DIR, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Injection de nav.glossary si absent
    if (!data.nav) data.nav = {};
    data.nav.glossary = lang === "en" ? "Glossary" : lang === "ar" ? "المعجم" : "Glossaire";

    // Injection de la section glossary
    data.glossary = GLOSSARY_UI[lang];

    // Injection des catégories
    data.glossary.categories = {};
    for (const [catKey, catVal] of Object.entries(CATEGORIES)) {
      data.glossary.categories[catKey] = {
        id: catKey,
        name: catVal.name[lang] || catVal.name.fr,
        icon: catVal.icon
      };
    }

    // Injection de la liste des termes traduits
    data.glossary.items = RAW_ENTRIES.map(e => ({
      id: e.id,
      slug: e.slug,
      term: e.term[lang] || e.term.fr,
      acronym: e.acronym || "",
      aliases: (e.aliases && (e.aliases[lang] || e.aliases.fr)) || [],
      category: e.category,
      short_definition: (e.short_definition && (e.short_definition[lang] || e.short_definition.fr)) || "",
      detailed_definition: (e.detailed_definition && (e.detailed_definition[lang] || e.detailed_definition.fr)) || "",
      formula: e.formula || "",
      formula_latex: e.formula_latex || "",
      interpretation: (e.interpretation && (e.interpretation[lang] || e.interpretation.fr)) || "",
      example: (e.example && (e.example[lang] || e.example.fr)) || "",
      unit: e.unit || "",
      higher_is_better: e.higher_is_better,
      modules: e.modules || [],
      related_terms: e.related_terms || []
    }));

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log(`[seed-glossary] ✓ Dictionnaire locales/${lang}.json mis à jour avec le glossaire.`);
  }
}

// ── Exécution ─────────────────────────────────────────────────────────────────
generateGlossaryJson();
updateLocales();
console.log("\n[seed-glossary] Ensemencement terminé avec succès !");
