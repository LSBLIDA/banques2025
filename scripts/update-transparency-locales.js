const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCALES_DIR = path.join(ROOT, 'locales');

const frData = {
  transparency2025: 'Disponibilité de l’information financière 2025'
};

const enData = {
  transparency2025: 'Financial Information Availability 2025'
};

const arData = {
  transparency2025: 'توفر المعلومات المالية 2025'
};

const transFr = {
  meta: {
    title: "Disponibilité de l'information financière des banques algériennes 2025 | ABIX",
    description: "État des lieux ABIX de la disponibilité et de l'actualité des états financiers et rapports d'activité publiés sur les sites officiels des banques algériennes."
  },
  hero: {
    badge: "Édition 2025 · Insight ABIX",
    brandMention: "Une analyse ABIX – Algeria Banking Index",
    title: "Disponibilité de l’information financière des banques algériennes",
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
    paragraph1: "La disponibilité de l’information financière constitue une dimension importante de l'observation d’un établissement bancaire.",
    paragraph2: "Au-delà de l’analyse des performances financières, ABIX s’intéresse également à la manière dont les établissements mettent à disposition du public leurs comptes et leurs rapports d’activité.",
    paragraph3: "Cette analyse dresse un état des lieux de leur disponibilité et de leur niveau d’actualité sur les sites officiels des banques étudiées.",
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
    disclaimerTitle: "Comment lire ces résultats ?",
    disclaimerText: "Cette analyse porte exclusivement sur les informations identifiées sur les sites officiels des établissements dans le cadre de la revue menée par ABIX. L’absence d’un document identifié sur le site ne signifie pas nécessairement que celui-ci n’a pas été produit, transmis aux autorités compétentes ou diffusé par un autre canal. Le score mesure la disponibilité et l’actualité de l’information accessible en ligne. Il ne constitue ni une appréciation de la qualité intrinsèque des comptes, ni une évaluation de la conformité réglementaire, de la gouvernance ou de la solidité financière de l’établissement.",
    stateAtDateTitle: "État des lieux au moment de l'analyse",
    stateAtDateText: "Les résultats constituent un état des lieux des informations identifiées sur les sites officiels des établissements au moment de l’analyse. Les sites bancaires étant susceptibles d’évoluer, les résultats peuvent être actualisés lorsqu’un établissement met à disposition de nouveaux documents ou nous signale une information qui n’aurait pas été identifiée lors de la revue.",
    observationPeriod: "État des lieux — édition 2025"
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
    zeroScoreExplanation: "Pour ces 9 établissements, aucun document correspondant aux deux dimensions étudiées n’a été identifié sur le site officiel dans le cadre de l’analyse."
  },
  ranking: {
    title: "Résultats 2025",
    subtitle: "Niveau de disponibilité observé pour les établissements scorés selon leur indice global de disponibilité digitale.",
    equalScoreNote: "Les établissements ayant obtenu un score identique présentent le même niveau de disponibilité observé et sont affichés à égalité sans hiérarchisation qualitative.",
    outOfSix: "/ 6",
    notScoredSectionTitle: "Établissement non scoré",
    notScoredBankName: "Ziraat Bankası Algeria",
    notScoredBadge: "Non scorée",
    notScoredNote: "Pas significatif dans le périmètre de l’analyse source."
  },
  distribution: {
    title: "Distribution des scores",
    subtitle: "Répartition des 20 établissements scorés selon le niveau de score obtenu sur 6 points.",
    scoreLabel: "Score obtenu",
    banksLabel: "Nombre d'établissements",
    item0: "9 banques (Score 0 / 6)",
    item2: "1 banque (Score 2 / 6)",
    item4: "1 banque (Score 4 / 6)",
    item5: "6 banques (Score 5 / 6)",
    item6: "3 banques (Score 6 / 6)"
  },
  table: {
    title: "Résultats par établissement",
    subtitle: "Détail des scores par dimension et observations relevées pour l'ensemble des 21 établissements analysés.",
    searchPlaceholder: "Rechercher une banque...",
    filterAll: "Toutes les banques (21)",
    filterScored: "Banques scorées (20)",
    filterMax: "Score maximal 6/6 (3)",
    colBank: "Établissement",
    colStatements: "Comptes sur site",
    colActivityReport: "Rapport d’activité",
    colGlobalScore: "Score global",
    colObservation: "Observation",
    outOfThree: "/ 3",
    outOfSix: "/ 6",
    notScored: "Non scorée",
    noObservation: "—"
  },
  updateReport: {
    title: "Une information à compléter ou à actualiser ?",
    text: "ABIX souhaite maintenir cet état des lieux aussi précis et actualisé que possible. Les établissements concernés peuvent nous signaler toute publication, mise à jour ou information qui n’aurait pas été identifiée lors de notre analyse.",
    cta: "Signaler une mise à jour",
    emailSubject: "Mise à jour — Disponibilité de l’information financière ABIX 2025"
  },
  insights: {
    title: "Ce que montrent les résultats",
    paragraph1: "Les résultats font apparaître des pratiques hétérogènes en matière de mise à disposition de l’information financière sur les sites des établissements bancaires.",
    paragraph2: "Plusieurs banques proposent des états financiers et rapports d’activité récents facilement accessibles, tandis que pour d’autres établissements, l’information identifiée est plus ancienne, partielle ou n’a pas été retrouvée dans le cadre de la revue.",
    paragraph3: "Cet état des lieux illustre l’intérêt d’intégrer la disponibilité de l’information publiée parmi les nouvelles dimensions d’observation du secteur bancaire algérien."
  },
  future: {
    title: "ABIX élargit son champ d’analyse",
    paragraph1: "ABIX – Algeria Banking Index ne se limite plus à l’analyse des performances financières des établissements.",
    paragraph2: "L’écosystème évolue vers une lecture plus large du secteur bancaire algérien, intégrant progressivement de nouvelles dimensions d’analyse, notamment la disponibilité de l’information publiée et l’expérience des utilisateurs des services bancaires.",
    paragraph3: "Ce nouvel état des lieux constitue l’une des dimensions qui viendront enrichir l’édition 2026."
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
    title: "Financial Information Availability of Algerian Banks 2025 | ABIX",
    description: "ABIX assessment of the availability and timeliness of financial statements and annual activity reports published on official websites of Algerian banks."
  },
  hero: {
    badge: "2025 Edition · ABIX Insight",
    brandMention: "An ABIX Analysis – Algeria Banking Index",
    title: "Financial Information Availability of Algerian Banks",
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
    paragraph1: "The availability of financial information represents an important dimension in observing a banking institution.",
    paragraph2: "Beyond analyzing financial performance, ABIX also examines how institutions make their financial statements and activity reports accessible to the general public.",
    paragraph3: "This analysis provides an overview of their availability and level of timeliness on the official websites of the surveyed banks.",
    collaboration: "Analysis carried out within the framework of ABIX – Algeria Banking Index, with the contribution of Mr. Sekak Rachid."
  },
  methodology: {
    title: "Methodology",
    subtitle: "A standardized assessment measuring the public accessibility of two benchmark documents on official websites.",
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
    disclaimerTitle: "How to interpret these results?",
    disclaimerText: "This analysis focuses exclusively on information identified on the official websites of the institutions during the review conducted by ABIX. The absence of an identified document on a website does not necessarily mean that it has not been produced, submitted to competent authorities, or distributed through other channels. The score measures the online availability and timeliness of accessible information. It constitutes neither an assessment of the intrinsic quality of accounts, nor an evaluation of regulatory compliance, governance, or financial strength.",
    stateAtDateTitle: "State of play at the time of analysis",
    stateAtDateText: "The results reflect the information identified on the official websites of the institutions at the time of analysis. As banking websites are subject to evolution, results may be updated when an institution provides new documents or brings to our attention information that was not identified during the review.",
    observationPeriod: "Overview — 2025 Edition"
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
    zeroScoreExplanation: "For these 9 institutions, no document corresponding to the two surveyed dimensions was identified on the official website as part of the analysis."
  },
  ranking: {
    title: "2025 Results",
    subtitle: "Observed level of availability for scored institutions according to their overall digital availability score.",
    equalScoreNote: "Institutions with identical scores reflect the same observed level of availability and are presented equally without artificial qualitative ranking.",
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
    title: "Results by Institution",
    subtitle: "Breakdown of scores by dimension and recorded observations for all 21 analyzed institutions.",
    searchPlaceholder: "Search for a bank...",
    filterAll: "All banks (21)",
    filterScored: "Scored banks (20)",
    filterMax: "Max score 6/6 (3)",
    colBank: "Institution",
    colStatements: "Statements on site",
    colActivityReport: "Activity Report",
    colGlobalScore: "Overall Score",
    colObservation: "Observation",
    outOfThree: "/ 3",
    outOfSix: "/ 6",
    notScored: "Not Scored",
    noObservation: "—"
  },
  updateReport: {
    title: "Information to complete or update?",
    text: "ABIX aims to keep this overview as accurate and up to date as possible. Concerned institutions may notify us of any publication, update, or information that was not identified during our review.",
    cta: "Submit an update",
    emailSubject: "Update — Financial Information Availability ABIX 2025"
  },
  insights: {
    title: "What the results show",
    paragraph1: "The results reveal heterogeneous practices regarding the availability of financial information on banking websites.",
    paragraph2: "Several banks offer recent, easily accessible financial statements and activity reports, whereas for other institutions, the identified information is older, partial, or was not found during the review.",
    paragraph3: "This overview highlights the value of integrating published information availability into the new observation dimensions of the Algerian banking sector."
  },
  future: {
    title: "ABIX expands its scope of analysis",
    paragraph1: "ABIX – Algeria Banking Index is no longer limited solely to the analysis of financial performance.",
    paragraph2: "The ecosystem is evolving towards a broader perspective on the Algerian banking sector, progressively integrating new dimensions of analysis, notably the availability of published information and customer experience.",
    paragraph3: "This new overview constitutes one of the dimensions that will enrich the 2026 edition."
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
    title: "توفر المعلومات المالية للبنوك الجزائرية 2025 | ABIX",
    description: "تشخيص ABIX لمدى توفر وحداثة القوائم المالية وتقارير النشاط المنشورة على المواقع الرسمية للبنوك الجزائرية."
  },
  hero: {
    badge: "إصدار 2025 · رؤية ABIX",
    brandMention: "تحليل من إعداد ABIX – Algeria Banking Index",
    title: "توفر المعلومات المالية للبنوك الجزائرية",
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
    paragraph1: "يمثل توفر المعلومات المالية بعداً مهماً من أبعاد متابعة المؤسسة المصرفية.",
    paragraph2: "إلى جانب تحليل الأداء المالي، تهتم ABIX أيضاً بكيفية إتاحة المؤسسات لقوائمها المالية وتقارير نشاطها للجمهور.",
    paragraph3: "يقدم هذا التحليل تشخيصاً لمدى توفرها ومستوى حداثتها على المواقع الرسمية للبنوك المشمولة بالدراسة.",
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
    disclaimerTitle: "كيف تقرأ هذه النتائج؟",
    disclaimerText: "يركز هذا التحليل حصرياً على المعلومات المحددة على المواقع الرسمية للمؤسسات في إطار المراجعة التي أجرتها ABIX. إن غياب وثيقة محددة عن الموقع لا يعني بالضرورة عدم إعدادها أو عدم تقديمها للسلطات المختصة أو نشرها عبر قناة أخرى. تقيس النتيجة مدى توفر وحداثة المعلومات المتاحة عبر الإنترنت، ولا تمثل تقييماً للجودة الذاتية للحسابات، ولا تقييماً للامتثال التنظيمي أو الحوكمة أو المتانة المالية للمؤسسة.",
    stateAtDateTitle: "تشخيص في تاريخ التحليل",
    stateAtDateText: "تشكل النتائج تشخيصاً للمعلومات المحددة على المواقع الرسمية للمؤسسات وقت إجراء التحليل. نظراً لأن المواقع المصرفية قابلة للتطور، يمكن تحديث النتائج عندما تتيح أي مؤسسة وثائق جديدة أو تبلغنا بمعلومات لم يتم تحديدها أثناء المراجعة.",
    observationPeriod: "تشخيص الوضع — إصدار 2025"
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
    zeroScoreExplanation: "بالنسبة لهذه المؤسسات التسع، لم يتم العثور على أي وثيقة مطابقة للبعدين المدروسين على الموقع الرسمي في إطار التحليل."
  },
  ranking: {
    title: "نتائج 2025",
    subtitle: "مستوى التوفر الملاحظ للمؤسسات المنقطة حسب النتيجة الإجمالية للتوفر الرقمي.",
    equalScoreNote: "المؤسسات الحاصلة على نفس النتيجة تمثل نفس مستوى التوفر الملاحظ وتُعرض على قدم المساواة دون أي ترتيب نوعي مصطنع.",
    outOfSix: "/ 6",
    notScoredSectionTitle: "مؤسسة غير منقطة",
    notScoredBankName: "بنك زراعات الجزائر (Ziraat Bankası)",
    notScoredBadge: "غير منقط",
    notScoredNote: "غير دال إحصائياً ضمن نطاق التحليل المصدري."
  },
  distribution: {
    title: "توزيع النتائج",
    subtitle: "توزيع المؤسسات العشرين المنقطة وفقاً لمستوى النتيجة المحصلة من أصل 6 نقاط.",
    scoreLabel: "النتيجة المحصلة",
    banksLabel: "عدد المؤسسات",
    item0: "9 بنوك (النتيجة 0 / 6)",
    item2: "بنك واحد (النتيجة 2 / 6)",
    item4: "بنك واحد (النتيجة 4 / 6)",
    item5: "6 بنوك (النتيجة 5 / 6)",
    item6: "3 بنوك (النتيجة 6 / 6)"
  },
  table: {
    title: "النتائج حسب المؤسسة",
    subtitle: "تفاصيل النتائج حسب كل بعد والملاحظات المسجلة لكافة المؤسسات الـ 21 التي تم تحليلها.",
    searchPlaceholder: "البحث عن بنك...",
    filterAll: "جميع البنوك (21)",
    filterScored: "البنوك المنقطة (20)",
    filterMax: "النتيجة القصوى 6/6 (3)",
    colBank: "المؤسسة",
    colStatements: "القوائم المالية بالموقع",
    colActivityReport: "تقرير النشاط",
    colGlobalScore: "النتيجة الإجمالية",
    colObservation: "الملاحظات",
    outOfThree: "/ 3",
    outOfSix: "/ 6",
    notScored: "غير منقط",
    noObservation: "—"
  },
  updateReport: {
    title: "معلومات تود استكمالها أو تحديثها؟",
    text: "تحرص ABIX على إبقاء هذا التشخيص دقيقاً ومحدثاً قدر الإمكان. يمكن للمؤسسات المعنية إبلاغنا بأي منشور أو تحديث أو معلومات لم يتم تحديدها أثناء تحليلنا.",
    cta: "إبلاغ عن تحديث",
    emailSubject: "تحديث — توفر المعلومات المالية ABIX 2025"
  },
  insights: {
    title: "ما تظهره النتائج",
    paragraph1: "تُظهر النتائج تبايناً في ممارسات إتاحة المعلومات المالية عبر المواقع الإلكترونية للمؤسسات المصرفية.",
    paragraph2: "توفر عدة بنوك قوائم مالية وتقارير نشاط حديثة وسهلة الوصول، في حين تقتصر المعلومات المحددة لدى مؤسسات أخرى على وثائق أقدم، جزئية، أو لم يتم العثور عليها خلال المراجعة.",
    paragraph3: "يوضح هذا التشخيص أهمية إدراج مدى توفر المعلومات المنشورة ضمن الأبعاد الجديدة لمتابعة القطاع المصرفي الجزائري."
  },
  future: {
    title: "ABIX توسع نطاق تحليلاتها",
    paragraph1: "لم يعد مؤشر ABIX – Algeria Banking Index يقتصر فقط على تحليل الأداء المالي للمؤسسات.",
    paragraph2: "يتطور النظام التحليلي نحو قراءة أوسع للقطاع المصرفي الجزائري، تشمل تدريجياً أبعاداً تحليلية جديدة، لاسيما توفر المعلومات المنشورة وتجربة مستخدمي الخدمات المصرفية.",
    paragraph3: "يمثل هذا التشخيص الجديد أحد الأبعاد التي ستُسهم في إثراء إصدار 2026."
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
