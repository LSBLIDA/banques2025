const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCALES_DIR = path.join(ROOT, 'locales');

const frData = {
  transparency2025: 'Transparence financière 2025'
};

const enData = {
  transparency2025: 'Financial Transparency 2025'
};

const arData = {
  transparency2025: 'الشفافية المالية 2025'
};

const transFr = {
  meta: {
    title: "Transparence de l'information financière des banques algériennes 2025 | ABIX",
    description: "Analyse ABIX de la disponibilité et de l'actualité des états financiers et rapports d’activité publiés par les banques algériennes sur leurs sites officiels."
  },
  hero: {
    badge: "Édition 2025 · Insight ABIX",
    brandMention: "Une analyse ABIX – Algeria Banking Index",
    title: "Transparence de l’information financière des banques algériennes",
    subtitle: "Disponibilité et actualité des états financiers et rapports d’activité publiés sur les sites officiels des établissements bancaires.",
    kpiAnalyzed: "21",
    kpiAnalyzedLabel: "Banques analysées",
    kpiDimensions: "2",
    kpiDimensionsLabel: "Dimensions observées",
    kpiMaxScore: "6 points",
    kpiMaxScoreLabel: "Score maximal",
    kpiDistinction: "20 établissements scorés • 1 établissement non scoré",
    ctaDiscover: "Consulter les résultats",
    ctaMethodology: "Méthodologie"
  },
  why: {
    title: "Pourquoi cette analyse ?",
    paragraph1: "La disponibilité de l’information financière constitue une dimension importante de la transparence d’un établissement bancaire.",
    paragraph2: "Au-delà de l’analyse des performances financières, ABIX s’intéresse également à la manière dont les établissements mettent à disposition du public leurs comptes et leurs rapports d’activité.",
    paragraph3: "Cette analyse examine leur disponibilité et leur niveau d’actualité sur les sites officiels des banques étudiées.",
    collaboration: "Analyse réalisée dans le cadre d’ABIX – Algeria Banking Index, avec la contribution de M. Sekak Rachid."
  },
  methodology: {
    title: "Méthodologie",
    subtitle: "Une grille standardisée mesurant l'accessibilité publique de deux documents de référence sur les sites internet officiels.",
    dim1Num: "01",
    dim1Title: "Publication des comptes sur le site",
    dim1Max: "Score maximal : 3 points",
    dim1Body: "Évaluation de la disponibilité et de l’actualité des comptes publiés sur le site officiel de l’établissement.",
    dim2Num: "02",
    dim2Title: "Publication du rapport d’activité sur le site",
    dim2Max: "Score maximal : 3 points",
    dim2Body: "Évaluation de la disponibilité et de l’actualité du rapport d’activité accessible sur le site officiel de l’établissement.",
    globalScoreTitle: "Score global",
    globalScoreFormula: "Comptes + Rapport d’activité = score sur 6",
    globalScoreNote: "Le score vise à mesurer la disponibilité digitale de l’information observée, et non la qualité intrinsèque du contenu publié.",
    disclaimerTitle: "À propos de l’interprétation des résultats",
    disclaimerText: "Cette analyse porte exclusivement sur les informations identifiées sur les sites officiels des établissements lors de la période d’observation. L’absence d’un document sur le site internet ne signifie pas nécessairement qu’il n’a pas été produit, transmis aux autorités compétentes ou publié par un autre canal. Le score mesure donc la disponibilité et l’accessibilité digitale de l’information, et non la qualité intrinsèque des comptes ou la conformité réglementaire de l’établissement.",
    observationPeriod: "Périmètre d’analyse : édition 2025"
  },
  stats: {
    title: "Statistiques de synthèse",
    subtitle: "Principaux indicateurs tirés de l’observation des 20 établissements bancaires scorés.",
    avgScore: "2,7 / 6",
    avgScoreLabel: "Score moyen des établissements scorés",
    medianScore: "3,0 / 6",
    medianScoreLabel: "Médiane des établissements scorés",
    maxScoreCount: "3",
    maxScoreLabel: "Établissements au score maximal (6/6)",
    highScoreCount: "9",
    highScoreLabel: "Établissements avec au moins 5 / 6",
    zeroScoreCount: "9",
    zeroScoreLabel: "Établissements sans document identifié dans les deux dimensions (0/6)",
    zeroScoreExplanation: "Pour ces 9 établissements, aucun document correspondant aux dimensions étudiées n'a été identifié sur leur site officiel dans le cadre de l'analyse."
  },
  ranking: {
    title: "Résultats 2025",
    subtitle: "Classement graphique des établissements scorés selon leur indice global de disponibilité digitale.",
    equalScoreNote: "Les établissements ayant obtenu un score identique sont présentés à égalité sans hiérarchisation qualitative.",
    outOfSix: "/ 6",
    notScoredSectionTitle: "Établissement non scoré",
    notScoredBankName: "Ziraat Bankası Algeria",
    notScoredBadge: "Non scorée",
    notScoredNote: "Pas significatif dans le périmètre de l’analyse source."
  },
  distribution: {
    title: "Distribution des scores",
    subtitle: "Répartition des 20 établissements scorés selon le score global obtenu sur 6 points.",
    scoreLabel: "Score obtenu",
    banksLabel: "Nombre d'établissements",
    item0: "9 banques (Score 0 / 6)",
    item2: "1 banque (Score 2 / 6)",
    item4: "1 banque (Score 4 / 6)",
    item5: "6 banques (Score 5 / 6)",
    item6: "3 banques (Score 6 / 6)"
  },
  table: {
    title: "Tableau détaillé des résultats",
    subtitle: "Détail des scores par dimension et observations relevées pour l'ensemble des 21 établissements analysés.",
    searchPlaceholder: "Rechercher une banque...",
    filterAll: "Toutes les banques (21)",
    filterScored: "Banques scorées (20)",
    filterMax: "Score maximal 6/6 (3)",
    colBank: "Banque",
    colStatements: "Comptes sur site",
    colActivityReport: "Rapport d’activité",
    colGlobalScore: "Score global",
    colObservation: "Observation",
    outOfThree: "/ 3",
    outOfSix: "/ 6",
    notScored: "Non scorée",
    noObservation: "—"
  },
  insights: {
    title: "Ce que révèlent les résultats",
    paragraph1: "Les résultats montrent une forte hétérogénéité dans la disponibilité de l’information financière en ligne.",
    paragraph2: "Plusieurs établissements mettent à disposition des documents récents et relativement accessibles, tandis que d’autres présentent une information plus limitée ou plus ancienne sur leur site officiel.",
    paragraph3: "L’analyse fait également apparaître un groupe d’établissements pour lesquels aucun document correspondant aux deux dimensions étudiées n’a été identifié sur leur site dans le cadre de la revue."
  },
  future: {
    title: "ABIX élargit son champ d’analyse",
    paragraph1: "ABIX – Algeria Banking Index ne se limite plus à l’analyse des performances financières des établissements.",
    paragraph2: "L’écosystème évolue progressivement vers une lecture plus large du secteur bancaire algérien, intégrant également des dimensions liées à l’information publiée et à l’expérience des utilisateurs des services bancaires.",
    paragraph3: "Cette analyse de la disponibilité de l’information financière constitue l’une de ces nouvelles dimensions.",
    teaser2026: "Ces nouveaux travaux viendront enrichir l’édition 2026 de l’étude sectorielle ABIX."
  },
  cta: {
    title: "Poursuivre l’exploration avec ABIX",
    subtitle: "Découvrez notre plateforme interactive de données bancaires et nos études sectorielles de référence.",
    ctaExplorer: "Découvrir ABIX Data Explorer",
    ctaStudy: "Découvrir l’étude sectorielle ABIX",
    ctaNotify: "Être informé de la publication 2026"
  },
  observations: {
    retard: "Retard",
    retard1year: "Retard supérieur à 1 année",
    slightDelay: "Léger retard",
    downloadPossible: "Téléchargement possible",
    lastReport2021: "Dernier rapport identifié : 2021",
    notSignificant: "Pas significatif dans le périmètre de l’analyse source."
  }
};

const transEn = {
  meta: {
    title: "Financial Information Transparency of Algerian Banks 2025 | ABIX",
    description: "ABIX analysis of the availability and timeliness of financial statements and annual activity reports published by Algerian banks on their official websites."
  },
  hero: {
    badge: "2025 Edition · ABIX Insight",
    brandMention: "An ABIX Analysis – Algeria Banking Index",
    title: "Financial Information Transparency of Algerian Banks",
    subtitle: "Availability and timeliness of financial statements and annual activity reports published on official banking websites.",
    kpiAnalyzed: "21",
    kpiAnalyzedLabel: "Banks Analyzed",
    kpiDimensions: "2",
    kpiDimensionsLabel: "Observed Dimensions",
    kpiMaxScore: "6 points",
    kpiMaxScoreLabel: "Maximum Score",
    kpiDistinction: "20 scored institutions • 1 not scored institution",
    ctaDiscover: "View Results",
    ctaMethodology: "Methodology"
  },
  why: {
    title: "Why this analysis?",
    paragraph1: "The availability of financial information represents a significant dimension of a banking institution's transparency.",
    paragraph2: "Beyond the analysis of financial performance, ABIX also examines how institutions make their financial statements and activity reports accessible to the general public.",
    paragraph3: "This analysis reviews their availability and level of timeliness on the official websites of the surveyed banks.",
    collaboration: "Analysis carried out within the framework of ABIX – Algeria Banking Index, with the contribution of Mr. Sekak Rachid."
  },
  methodology: {
    title: "Methodology",
    subtitle: "A standardized assessment measuring the public accessibility of two core benchmark documents on official websites.",
    dim1Num: "01",
    dim1Title: "Publication of financial statements on website",
    dim1Max: "Maximum score: 3 points",
    dim1Body: "Evaluation of the availability and timeliness of financial statements published on the institution's official website.",
    dim2Num: "02",
    dim2Title: "Publication of activity report on website",
    dim2Max: "Maximum score: 3 points",
    dim2Body: "Evaluation of the availability and timeliness of the annual activity report accessible on the institution's official website.",
    globalScoreTitle: "Overall score",
    globalScoreFormula: "Financial Statements + Activity Report = score out of 6",
    globalScoreNote: "The score aims to measure the digital availability of the observed information, and not the intrinsic quality of the published content.",
    disclaimerTitle: "Regarding the interpretation of results",
    disclaimerText: "This analysis focuses exclusively on information identified on the official websites of the institutions during the observation period. The absence of a document on a website does not necessarily mean that it has not been produced, submitted to competent authorities, or published through other channels. The score thus measures digital availability and accessibility, and not the intrinsic quality of accounts or regulatory compliance.",
    observationPeriod: "Scope of analysis: 2025 Edition"
  },
  stats: {
    title: "Summary Statistics",
    subtitle: "Key indicators derived from the observation of the 20 scored banking institutions.",
    avgScore: "2.7 / 6",
    avgScoreLabel: "Average score of scored institutions",
    medianScore: "3.0 / 6",
    medianScoreLabel: "Median of scored institutions",
    maxScoreCount: "3",
    maxScoreLabel: "Institutions with maximum score (6/6)",
    highScoreCount: "9",
    highScoreLabel: "Institutions with at least 5 / 6",
    zeroScoreCount: "9",
    zeroScoreLabel: "Institutions with no document identified in both dimensions (0/6)",
    zeroScoreExplanation: "For these 9 institutions, no document corresponding to the surveyed dimensions was identified on their official website as part of the review."
  },
  ranking: {
    title: "2025 Results",
    subtitle: "Visual ranking of scored banking institutions sorted by descending overall digital availability score.",
    equalScoreNote: "Institutions with identical scores are presented equally without artificial qualitative ranking.",
    outOfSix: "/ 6",
    notScoredSectionTitle: "Not Scored Institution",
    notScoredBankName: "Ziraat Bankası Algeria",
    notScoredBadge: "Not Scored",
    notScoredNote: "Not significant within the scope of the source analysis."
  },
  distribution: {
    title: "Score Distribution",
    subtitle: "Breakdown of the 20 scored institutions across the 6-point overall scoring scale.",
    scoreLabel: "Obtained Score",
    banksLabel: "Number of Institutions",
    item0: "9 banks (Score 0 / 6)",
    item2: "1 bank (Score 2 / 6)",
    item4: "1 bank (Score 4 / 6)",
    item5: "6 banks (Score 5 / 6)",
    item6: "3 banks (Score 6 / 6)"
  },
  table: {
    title: "Detailed Results Table",
    subtitle: "Breakdown of scores by dimension and recorded observations for all 21 analyzed institutions.",
    searchPlaceholder: "Search for a bank...",
    filterAll: "All banks (21)",
    filterScored: "Scored banks (20)",
    filterMax: "Max score 6/6 (3)",
    colBank: "Bank",
    colStatements: "Statements on site",
    colActivityReport: "Activity Report",
    colGlobalScore: "Overall Score",
    colObservation: "Observation",
    outOfThree: "/ 3",
    outOfSix: "/ 6",
    notScored: "Not Scored",
    noObservation: "—"
  },
  insights: {
    title: "What the results reveal",
    paragraph1: "The results demonstrate substantial heterogeneity in the online availability of financial information.",
    paragraph2: "Several institutions provide recent and relatively accessible documents, while others present more limited or older information on their official website.",
    paragraph3: "The analysis also highlights a group of institutions for which no document corresponding to the two studied dimensions was identified on their website during the review."
  },
  future: {
    title: "ABIX expands its scope of analysis",
    paragraph1: "ABIX – Algeria Banking Index is no longer limited solely to the analysis of financial performance.",
    paragraph2: "The ecosystem is progressively evolving towards a broader perspective on the Algerian banking sector, integrating dimensions related to published information and customer experience.",
    paragraph3: "This analysis of financial information availability constitutes one of these new dimensions.",
    teaser2026: "These new research dimensions will enrich the 2026 edition of the ABIX sector study."
  },
  cta: {
    title: "Continue exploring with ABIX",
    subtitle: "Discover our interactive banking data platform and flagship sector research studies.",
    ctaExplorer: "Discover ABIX Data Explorer",
    ctaStudy: "Discover ABIX Sector Study",
    ctaNotify: "Be notified of 2026 release"
  },
  observations: {
    retard: "Delay",
    retard1year: "Delay over 1 year",
    slightDelay: "Slight delay",
    downloadPossible: "Download available",
    lastReport2021: "Latest identified report: 2021",
    notSignificant: "Not significant within the scope of the source analysis."
  }
};

const transAr = {
  meta: {
    title: "شفافية المعلومات المالية للبنوك الجزائرية 2025 | ABIX",
    description: "تحليل ABIX لمدى توفر وحداثة القوائم المالية وتقارير النشاط المنشورة على المواقع الرسمية للبنوك الجزائرية."
  },
  hero: {
    badge: "إصدار 2025 · رؤية ABIX",
    brandMention: "تحليل من إعداد ABIX – Algeria Banking Index",
    title: "شفافية المعلومات المالية للبنوك الجزائرية",
    subtitle: "مدى توفر وحداثة القوائم المالية وتقارير النشاط المنشورة على المواقع الرسمية للمؤسسات المصرفية.",
    kpiAnalyzed: "21",
    kpiAnalyzedLabel: "بنكاً تم تحليلها",
    kpiDimensions: "2",
    kpiDimensionsLabel: "أبعاد تمت ملاحظتها",
    kpiMaxScore: "6 نقاط",
    kpiMaxScoreLabel: "النتيجة القصوى",
    kpiDistinction: "20 مؤسسة تم تنقيطها • مؤسسة واحدة غير منقطة",
    ctaDiscover: "عرض النتائج",
    ctaMethodology: "المنهجية"
  },
  why: {
    title: "لماذا هذا التحليل؟",
    paragraph1: "يمثل توفر المعلومات المالية بعداً مهماً من أبعاد شفافية المؤسسة المصرفية.",
    paragraph2: "إلى جانب تحليل الأداء المالي، تهتم ABIX أيضاً بكيفية إتاحة المؤسسات لقوائمها المالية وتقارير نشاطها للجمهور.",
    paragraph3: "يفحص هذا التحليل مدى توفرها ومستوى حداثتها على المواقع الرسمية للبنوك المشمولة بالدراسة.",
    collaboration: "تم إنجاز هذا التحليل في إطار ABIX – Algeria Banking Index، بمساهمة الأستاذ سكاك رشيد."
  },
  methodology: {
    title: "المنهجية",
    subtitle: "شبكة تقييم معيارية تقيس إمكانية الوصول العام لوثيقتين مرجعيتين على المواقع الرسمية.",
    dim1Num: "01",
    dim1Title: "نشر القوائم المالية على الموقع",
    dim1Max: "النتيجة القصوى: 3 نقاط",
    dim1Body: "تقييم مدى توفر وحداثة القوائم المالية المنشورة على الموقع الرسمي للمؤسسة.",
    dim2Num: "02",
    dim2Title: "نشر تقرير النشاط على الموقع",
    dim2Max: "النتيجة القصوى: 3 نقاط",
    dim2Body: "تقييم مدى توفر وحداثة تقرير النشاط المتاح على الموقع الرسمي للمؤسسة.",
    globalScoreTitle: "النتيجة الإجمالية",
    globalScoreFormula: "القوائم المالية + تقرير النشاط = نتيجة على 6",
    globalScoreNote: "تهدف النتيجة إلى قياس التوفر الرقمي للمعلومات الملاحظة، وليس الجودة الذاتية للمحتوى المنشور.",
    disclaimerTitle: "حول تفسير النتائج",
    disclaimerText: "يركز هذا التحليل حصرياً على المعلومات المحددة على المواقع الرسمية للمؤسسات خلال فترة الملاحظة. إن غياب وثيقة عن الموقع الإلكتروني لا يعني بالضرورة عدم إعدادها أو عدم تقديمها للسلطات المختصة أو نشرها عبر قناة أخرى. بالتالي، تقيس النتيجة التوفر وإمكانية الوصول الرقمي للمعلومات، ولا تمثل تقييماً للجودة الذاتية للحسابات أو الامتثال التنظيمي للمؤسسة.",
    observationPeriod: "نطاق التحليل: إصدار 2025"
  },
  stats: {
    title: "إحصائيات تركيبية",
    subtitle: "أهم المؤشرات المستخلصة من ملاحظة 20 مؤسسة مصرفية تم تنقيطها.",
    avgScore: "2.7 / 6",
    avgScoreLabel: "متوسط نتيجة المؤسسات المنقطة",
    medianScore: "3.0 / 6",
    medianScoreLabel: "الوسيط الحسابي للمؤسسات المنقطة",
    maxScoreCount: "3",
    maxScoreLabel: "مؤسسات حققت النتيجة القصوى (6/6)",
    highScoreCount: "9",
    highScoreLabel: "مؤسسات حصلت على 5 / 6 على الأقل",
    zeroScoreCount: "9",
    zeroScoreLabel: "مؤسسات دون أي وثيقة محددة في البعدين (0/6)",
    zeroScoreExplanation: "بالنسبة لهذه المؤسسات التسع، لم يتم العثور على أي وثيقة مطابقة للأبعاد المدروسة على مواقعها الرسمية أثناء فترة المراجعة."
  },
  ranking: {
    title: "نتائج 2025",
    subtitle: "تصنيف بياني للمؤسسات المنقطة مرتبة تنازلياً حسب النتيجة الإجمالية للتوفر الرقمي.",
    equalScoreNote: "المؤسسات الحاصلة على نتائج متطابقة تُعرض على قدم المساواة دون أي ترتيب نوعي مصطنع.",
    outOfSix: "/ 6",
    notScoredSectionTitle: "مؤسسة غير منقطة",
    notScoredBankName: "بنك زراعات الجزائر (Ziraat Bankası)",
    notScoredBadge: "غير منقط",
    notScoredNote: "غير دال إحصائياً ضمن نطاق التحليل المصدري."
  },
  distribution: {
    title: "توزيع النتائج",
    subtitle: "توزيع المؤسسات العشرين المنقطة وفقاً لمستوى النتيجة الإجمالية المحصلة من أصل 6 نقاط.",
    scoreLabel: "النتيجة المحصلة",
    banksLabel: "عدد المؤسسات",
    item0: "9 بنوك (النتيجة 0 / 6)",
    item2: "بنك واحد (النتيجة 2 / 6)",
    item4: "بنك واحد (النتيجة 4 / 6)",
    item5: "6 بنوك (النتيجة 5 / 6)",
    item6: "3 بنوك (النتيجة 6 / 6)"
  },
  table: {
    title: "جدول تفصيلي للنتائج",
    subtitle: "تفاصيل النتائج حسب كل بعد والملاحظات المسجلة لكافة المؤسسات الـ 21 التي تم تحليلها.",
    searchPlaceholder: "البحث عن بنك...",
    filterAll: "جميع البنوك (21)",
    filterScored: "البنوك المنقطة (20)",
    filterMax: "النتيجة القصوى 6/6 (3)",
    colBank: "البنك",
    colStatements: "القوائم المالية بالموقع",
    colActivityReport: "تقرير النشاط",
    colGlobalScore: "النتيجة الإجمالية",
    colObservation: "الملاحظات",
    outOfThree: "/ 3",
    outOfSix: "/ 6",
    notScored: "غير منقط",
    noObservation: "—"
  },
  insights: {
    title: "ما تكشفه النتائج",
    paragraph1: "تظهر النتائج تفاوتاً كبيراً في مدى إتاحة المعلومات المالية عبر الإنترنت.",
    paragraph2: "توفر عدة مؤسسات وثائق حديثة وسهلة الوصول نسبياً، في حين تعرض مؤسسات أخرى معلومات أكثر محدودية أو أقدم تاريخاً على مواقعها الرسمية.",
    paragraph3: "كما يُبرز التحليل مجموعة من المؤسسات لم يتم العثور على أي وثيقة مطابقة للبعدين المدروسين على مواقعها الرسمية خلال فترة المراجعة."
  },
  future: {
    title: "ABIX توسع نطاق تحليلاتها",
    paragraph1: "لم يعد مؤشر ABIX – Algeria Banking Index يقتصر فقط على تحليل الأداء المالي للمؤسسات.",
    paragraph2: "يتطور النظام التحليلي تدريجياً نحو قراءة أوسع للقطاع المصرفي الجزائري، تشمل أيضاً أبعاداً متعلقة بالمعلومات المنشورة وتجربة مستخدمي الخدمات المصرفية.",
    paragraph3: "يمثل هذا التحليل لمدى توفر المعلومات المالية أحد هذه الأبعاد الجديدة.",
    teaser2026: "ستُسهم هذه الأعمال الجديدة في إثراء إصدار 2026 من دراسة ABIX القطاعية."
  },
  cta: {
    title: "مواصلة الاستكشاف مع ABIX",
    subtitle: "اكتشف منصتنا التفاعلية للبيانات المصرفية ودراساتنا القطاعية المرجعية.",
    ctaExplorer: "استكشاف ABIX Data Explorer",
    ctaStudy: "استكشاف دراسة ABIX القطاعية",
    ctaNotify: "الإخطار بصدور إصدار 2026"
  },
  observations: {
    retard: "تأخر",
    retard1year: "تأخر لأكثر من سنة واحدة",
    slightDelay: "تأخر طفيف",
    downloadPossible: "التحميل متاح",
    lastReport2021: "آخر تقرير محدد: 2021",
    notSignificant: "غير دال إحصائياً ضمن نطاق التحليل المصدري."
  }
};

function updateLocale(file, navKey, transBlock) {
  const fullPath = path.join(LOCALES_DIR, file);
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  data.nav = data.nav || {};
  Object.assign(data.nav, navKey);
  data.transparency2025 = transBlock;
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ Successfully updated ' + file);
}

updateLocale('fr.json', frData, transFr);
updateLocale('en.json', enData, transEn);
updateLocale('ar.json', arData, transAr);
