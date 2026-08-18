const fs = require('fs');
const path = require('path');

const frResults = {
  badge: "Baromètre 2026 en direct",
  title: "Résultats et tendances des votes",
  subtitle: "Voici les premiers enseignements issus des évaluations collectées auprès des usagers des banques en Algérie.",
  statParticipants: "Participants",
  statEvaluations: "Évaluations",
  statSatisfaction: "Satisfaction globale",
  statAvgScore: "Score moyen",
  rankingHeaderTitle: "CLASSEMENT ABIX 2026",
  rankingHeaderSubtitle: "SATISFACTION GLOBALE – TOUS CANAUX CONFONDUS",
  rankingChannelsDetail: "(APPLICATION MOBILE, E-BANKING ET AGENCES)",
  realtimeBadge: "En direct · Résultats en temps réel",
  goalBoxTitle: "évaluations déjà recueillies. Objectif : 5 000.",
  goalBoxText: "Les résultats et le classement sont actualisés en temps réel à chaque nouveau vote enregistré. Plus nous aurons de réponses, plus les résultats seront représentatifs et utiles pour améliorer le quotidien bancaire.",
  infoBannerText: "En 2 minutes, vous pouvez contribuer au Baromètre ABIX 2026 et aider à mieux mesurer la qualité des services bancaires en Algérie. Votre avis permettra aux banques d'identifier les priorités d'amélioration de votre quotidien bancaire.",
  participateHere: "Participez ici :",
  participateUrl: "algeriabankingindex.com/fr/questionnaire/",
  colRank: "RANG",
  colBank: "BANQUE",
  colVoters: "VOTANTS",
  votersPlural: "votants",
  votersSingle: "votant",
  colScore: "SCORE GLOBAL / 5",
  colScoreChannel: "SCORE / 5",
  filterAllChannels: "Tous canaux confondus",
  channelMobile: "Application mobile",
  channelWeb: "E-banking web",
  channelBranch: "Services en agence",
  methodologyTitle: "MÉTHODOLOGIE EN DIRECT",
  methodologyText: "Score et classement calculés et actualisés instantanément en temps réel à chaque vote en ligne. Échelle de satisfaction convertie sur 5 niveaux (de 1 à 5). Seuil d'affichage : 5 évaluations minimum par banque.",
  yourOpinionCounts: "Votre avis compte. Faites-le entendre.",
  tags: "#ABIX2026 #Banques #Algérie #ExpérienceClient",
  refreshBtn: "Actualiser les données",
  noDataTitle: "Aucune évaluation disponible pour le moment",
  noQualifiedBanksTitle: "Aucune banque n'a encore atteint le seuil minimum de 5 évaluations.",
  noQualifiedBanksText: "Dès qu'une banque recueille 5 évaluations ou plus, elle apparaîtra automatiquement dans ce classement.",
  ctaStudy: "Découvrir la méthodologie et l'étude ABIX 2026",
  ctaHome: "Retour à l'accueil"
};

const enResults = {
  badge: "2026 Live Barometer",
  title: "Live Vote Results & Trends",
  subtitle: "Here are the live insights from evaluations submitted by banking users in Algeria.",
  statParticipants: "Participants",
  statEvaluations: "Evaluations",
  statSatisfaction: "Overall Satisfaction",
  statAvgScore: "Average Score",
  rankingHeaderTitle: "ABIX 2026 RANKING",
  rankingHeaderSubtitle: "OVERALL SATISFACTION – ALL CHANNELS COMBINED",
  rankingChannelsDetail: "(MOBILE APP, E-BANKING AND BRANCHES)",
  realtimeBadge: "Live · Real-time Results",
  goalBoxTitle: "evaluations already collected. Goal: 5,000.",
  goalBoxText: "Results and rankings are updated in real time with every new vote recorded. The more responses we collect, the more representative the findings will be.",
  infoBannerText: "In 2 minutes, you can contribute to the ABIX 2026 Barometer and help measure the quality of banking services in Algeria.",
  participateHere: "Participate here:",
  participateUrl: "algeriabankingindex.com/en/questionnaire/",
  colRank: "RANK",
  colBank: "BANK",
  colVoters: "VOTERS",
  votersPlural: "voters",
  votersSingle: "voter",
  colScore: "OVERALL SCORE / 5",
  colScoreChannel: "SCORE / 5",
  filterAllChannels: "All channels combined",
  channelMobile: "Mobile App",
  channelWeb: "Web e-Banking",
  channelBranch: "Branch Services",
  methodologyTitle: "LIVE METHODOLOGY",
  methodologyText: "Scores and rankings calculated and updated instantly in real time upon each online vote. Satisfaction scale converted across 5 levels (from 1 to 5). Display threshold: 5 minimum evaluations per bank.",
  yourOpinionCounts: "Your opinion counts. Make your voice heard.",
  tags: "#ABIX2026 #Banks #Algeria #CustomerExperience",
  refreshBtn: "Refresh data",
  noDataTitle: "No evaluations available at this time",
  noQualifiedBanksTitle: "No bank has reached the minimum threshold of 5 evaluations yet.",
  noQualifiedBanksText: "As soon as a bank gathers 5 evaluations or more, it will automatically appear in this ranking.",
  ctaStudy: "Discover the methodology & ABIX 2026 study",
  ctaHome: "Back to Home"
};

const arResults = {
  badge: "مؤشر 2026 المباشر",
  title: "نتائج التصويت والاتجاهات المباشرة",
  subtitle: "إليكم أولى النتائج والتقييمات المستخلصة من آراء مستخدمي البنوك في الجزائر.",
  statParticipants: "المشاركون",
  statEvaluations: "التقييمات",
  statSatisfaction: "نسبة الرضا العامة",
  statAvgScore: "متوسط النقاط",
  rankingHeaderTitle: "ترتيب ABIX 2026",
  rankingHeaderSubtitle: "الرضا العام – جميع القنوات مجمعة",
  rankingChannelsDetail: "(تطبيق الهاتف، الخدمات المصرفية عبر الإنترنت والفروع)",
  realtimeBadge: "مباشر · نتائج محدثة في الوقت الفعلي",
  goalBoxTitle: "تقييم تم جمعها بالفعل. الهدف: 5000.",
  goalBoxText: "يتم تحديث النتائج والترتيب في الوقت الفعلي وبشكل فوري مع كل صوت جديد يتم تسجيله. كلما زادت الإجابات، كانت النتائج أكثر دقة وتمثيلاً.",
  infoBannerText: "في دقيقتين، يمكنك المساهمة في مؤشر ABIX 2026 والمساعدة في قياس جودة الخدمات المصرفية في الجزائر.",
  participateHere: "شارك هنا:",
  participateUrl: "algeriabankingindex.com/ar/questionnaire/",
  colRank: "الترتيب",
  colBank: "البنك",
  colVoters: "المصوتون",
  votersPlural: "مصوت",
  votersSingle: "مصوت",
  colScore: "النتيجة العامة / 5",
  colScoreChannel: "النتيجة / 5",
  filterAllChannels: "جميع القنوات مجمعة",
  channelMobile: "التطبيق المحمول",
  channelWeb: "الخدمات المصرفية عبر الإنترنت",
  channelBranch: "خدمات الفروع",
  methodologyTitle: "المنهجية المباشرة",
  methodologyText: "يتم احتساب النتائج والترتيب وتحديثها فورياً في الوقت الفعلي مع كل تصويت عبر الإنترنت. مقياس الرضا محول على 5 مستويات (من 1 إلى 5). الحد الأدنى للعرض: 5 تقييمات لكل بنك.",
  yourOpinionCounts: "رأيك مهم. اجعل صوتك مسموعاً.",
  tags: "#ABIX2026 #بنوك #الجزائر #تجربة_العميل",
  refreshBtn: "تحديث البيانات",
  noDataTitle: "لا توجد تقييمات متاحة حالياً",
  noQualifiedBanksTitle: "لم يصل أي بنك بعد إلى الحد الأدنى البالغ 5 تقييمات.",
  noQualifiedBanksText: "بمجرد أن يجمع أي بنك 5 تقييمات أو أكثر، سيظهر تلقائياً في هذا الترتيب.",
  ctaStudy: "اكتشف المنهجية ودراسة ABIX 2026",
  ctaHome: "العودة إلى الرئيسية"
};

const langs = [
  { code: 'fr', data: frResults },
  { code: 'en', data: enResults },
  { code: 'ar', data: arResults }
];

langs.forEach(item => {
  const filePath = path.join(__dirname, '..', 'locales', `${item.code}.json`);
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!json.questionnaire) json.questionnaire = {};
  json.questionnaire.results = item.data;
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
  console.log(`Updated ${item.code}.json with full infographic keys`);
});
