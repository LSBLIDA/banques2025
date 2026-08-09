const fs = require('fs');
const path = require('path');

const frPath = path.join(__dirname, '../locales/fr.json');
const enPath = path.join(__dirname, '../locales/en.json');
const arPath = path.join(__dirname, '../locales/ar.json');

const fr = JSON.parse(fs.readFileSync(frPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));

// Add missing keys to fr, en, ar
const additions = {
  fr: {
    edition2026: {
      forecast: {
        title: "Contenu prévisionnel de l'édition 2026",
        subtitle: "Une lecture multidimensionnelle des performances et transformations du secteur bancaire algérien",
        cards: [
          { title: "Performances du secteur 2024–2025", body: "Évolution du bilan, des dépôts, des crédits, du PNB, de la rentabilité, des provisions et des principaux équilibres financiers du secteur." },
          { title: "Tendances 2023–2025", body: "Mise en perspective sur trois exercices afin d’identifier les tendances structurelles, les accélérations et les changements de trajectoire." },
          { title: "Analyse des 21 banques", body: "Fiches individuelles, évolution des principaux indicateurs, positionnement de chaque établissement et comparaison avec les performances du secteur." },
          { title: "Benchmarks & parts de marché", body: "Comparaison banques publiques / banques privées, classements par indicateur, parts de marché et dynamiques concurrentielles." },
          { title: "Hors-bilan, réseau & performance opérationnelle", body: "Analyse des engagements hors-bilan, des effectifs, du réseau d’agences, de la productivité et de nouveaux indicateurs opérationnels." },
          { title: "Digital & regards sur le secteur", body: "Baromètre des services bancaires : application mobile, e-banking web et services en agence. Sous réserve de confirmation, contributions de dirigeants et d'experts." }
        ]
      },
      enriched: {
        badge: "Évolutions & nouveautés",
        title: "Une édition 2026 enrichie",
        subtitle: "Au-delà de l’actualisation des données financières, l’édition 2026 élargit son champ d’analyse pour offrir une lecture plus complète de la performance, de l’organisation et de la transformation des banques opérant en Algérie.",
        items: [
          { title: "21 banques couvertes", body: "Un périmètre élargi intégrant les établissements opérant sur le marché algérien." },
          { title: "Nouveaux indicateurs opérationnels", body: "Effectifs, réseau, hors-bilan et indicateurs de productivité viennent compléter l’analyse financière." },
          { title: "Expérience bancaire — services digitaux et en agence", body: "Le Baromètre ABIX 2026 mesure la satisfaction des utilisateurs : application mobile, e-banking web et services en agence." },
          { title: "Regards croisés", body: "Des contributions de dirigeants et d’experts pourront compléter les analyses indépendantes de l’étude, sous réserve de confirmation éditoriale." }
        ]
      }
    },
    edition2025: {
      stats: {
        banksAnalysed: "Banques analysées",
        analysisPages: "Pages d'analyse",
        coveredYears: "Exercices couverts"
      },
      methodology: {
        tabMethodology: {
          items: [
            "Analyse quantitative des 20 banques opérant en Algérie",
            "Exploitation des états financiers annuels publiés pour 2023 et 2024",
            "Consolidation et structuration pour comparaison sectorielle",
            "Analyse assistée par des outils de modélisation"
          ]
        },
        tabContent: {
          items: [
            { label: "Évolution globale du secteur bancaire (2023–2024)", pages: "15 pages" },
            { label: "Comparatif banques publiques vs privées", pages: "10 pages" },
            { label: "Analyse individuelle des 20 banques de la place", pages: "61 pages" },
            { label: "Analyse comparative sur plusieurs indices", pages: "17 pages" }
          ]
        },
        tabSample: {
          items: [
            { label: "Bons du Trésor / Total bilan", value: "34,12 %" },
            { label: "PNB — croissance 2024", value: "+17,3 %" }
          ]
        }
      }
    },
    services: {
      sectionTitle: "Nos prestations",
      sectionSubtitle: "Chaque mission est conçue sur mesure selon les besoins et le profil de votre établissement."
    },
    methodology: {
      approach: {
        steps: [
          { title: "Périmètre & collecte des données", body: "Recensement et extraction des informations publiées par les banques et les sources institutionnelles disponibles : états financiers, rapports annuels et autres informations financières ou opérationnelles pertinentes pour l’analyse." },
          { title: "Consolidation, cohérence & retraitements", body: "Contrôle de cohérence des données, rapprochement des agrégats et traitement homogène des informations entre établissements et entre exercices.", note: "Lorsque des banques publient ultérieurement des données historiques retraitées ou reclassées, les études retiennent, lorsque cela est pertinent, les données révisées les plus récentes disponibles afin de préserver la cohérence des comparaisons." },
          { title: "Définition & normalisation des indicateurs", body: "Définition homogène des indicateurs utilisés et distinction entre données de stock, données de flux et ratios.", note: "Les calculs portent notamment sur la croissance, la rentabilité, l’efficience, les parts de marché et différents indicateurs permettant de comparer les trajectoires des établissements." },
          { title: "Comparaisons sectorielles & positionnement", body: "Analyse des agrégats sectoriels, comparaison entre banques publiques et privées, évolution des parts de marché et positionnement relatif des établissements selon les indicateurs étudiés.", badge: "Principe méthodologique : Les comparaisons sont réalisées sur une base méthodologique identique pour l’ensemble des établissements couverts." },
          { title: "Analyses individuelles & dimensions opérationnelles", body: "Chaque établissement fait l’objet d’une lecture individuelle de son évolution, de son positionnement et de ses principaux indicateurs.", note: "Selon la disponibilité et la comparabilité des informations, l’analyse peut également intégrer des données complémentaires telles que le hors-bilan, les effectifs, le réseau bancaire ou des indicateurs de productivité opérationnelle." },
          { title: "Revue, analyse & interprétation", body: "Les données consolidées font l’objet d’une revue analytique et d’une interprétation par M. Rachid Sekak et Tadjeddine & Partners afin d’identifier les évolutions significatives, les tendances du secteur et les éléments susceptibles d’expliquer les trajectoires observées.", note: "Les constats factuels, les calculs et les interprétations sont distingués autant que possible dans la restitution." }
        ]
      }
    },
    abixIndex: {
      objectives: [
        "Proposer une lecture multidimensionnelle de la performance bancaire",
        "Faciliter les comparaisons synthétiques entre établissements",
        "Suivre l'évolution des performances dans le temps",
        "Compléter les analyses détaillées des études annuelles",
        "Fournir un cadre synthétique de benchmark sectoriel pour la place financière"
      ],
      dimensions: [
        { title: "1. Performance financière", body: "Analyse de la rentabilité (RoE, RoA, PNB, RBE) et de la capacité de création de valeur de l'établissement.", status: "En évaluation" },
        { title: "2. Efficience opérationnelle", body: "Évaluation du coefficient d'exploitation, de la maîtrise des charges et de la productivité des réseaux d'agences.", status: "En évaluation" },
        { title: "3. Croissance commerciale", body: "Dynamique de collecte des dépôts, octroi de crédits et évolution des parts de marché relatives.", status: "En évaluation" },
        { title: "4. Solidité financière", body: "Niveau des fonds propres, couverture des risques et structure de liquidité des établissements.", status: "En évaluation" },
        { title: "5. Structure des actifs", body: "Composition du bilan, répartition des créances et qualité du portefeuille d'investissements.", status: "En évaluation" }
      ],
      ctaBody: "Inscrivez-vous pour recevoir les actualités du projet et être notifié lors de la publication officielle de l'indice ABIX."
    },
    about: {
      introP1: "ABIX — Algeria Banking Index — est un indice et une étude comparative annuelle des banques opérant en Algérie. Il analyse les performances financières des établissements sur la base de leurs données publiées, afin de fournir aux dirigeants, analystes et investisseurs une référence objective et structurée.",
      introP2: "ABIX ne constitue pas une notation réglementaire ou prudentielle. C'est un outil d'aide à la décision fondé sur la transparence et la rigueur méthodologique de l'étude et de l'ABIX.",
      tagline: "Analyse annuelle du secteur bancaire algérien",
      publisher: {
        body: "Cabinet de conseil spécialisé dans l'accompagnement des institutions bancaires et financières algériennes, Tadjeddine & Partners apporte son expertise en stratégie, performance financière, conformité réglementaire et développement institutionnel."
      },
      author: {
        body: "Spécialiste du secteur bancaire algérien, M. Rachid Sekak apporte son expertise et sa connaissance du marché à l'édition annuelle de l'ABIX. Son analyse est fondée sur une lecture approfondie des données financières publiées et une connaissance de terrain du secteur."
      }
    },
    contact: {
      successTitle: "Message envoyé",
      successMessage: "Notre équipe vous répondra dans les plus brefs délais.",
      infoTitle: "Coordonnées",
      order2025Title: "Commander l'édition 2025",
      order2025Body: "Accédez directement aux formulaires de commande sécurisés.",
      order2025Cta: "Voir les offres →"
    }
  },
  en: {
    edition2026: {
      forecast: {
        title: "Expected Content of the 2026 Edition",
        subtitle: "A multidimensional overview of performance and transformations in the Algerian banking sector",
        cards: [
          { title: "Sector Performance 2024–2025", body: "Evolution of balance sheet, deposits, loans, NBI, profitability, provisions, and main financial balances of the sector." },
          { title: "2023–2025 Trends", body: "Three-year perspective to identify structural trends, accelerations, and shifts in trajectory." },
          { title: "Analysis of the 21 Banks", body: "Individual profile sheets, evolution of key indicators, positioning of each institution, and sector comparisons." },
          { title: "Benchmarks & Market Shares", body: "Public vs private bank comparison, rankings by indicator, market shares, and competitive dynamics." },
          { title: "Off-Balance Sheet, Network & Operational Performance", body: "Analysis of off-balance sheet commitments, workforce, branch network, productivity, and new operational indicators." },
          { title: "Digital & Sector Insights", body: "Banking Services Barometer: mobile app, web e-banking, and branch services. Subject to confirmation, contributions from executives and experts." }
        ]
      },
      enriched: {
        badge: "Evolutions & New Features",
        title: "An Enriched 2026 Edition",
        subtitle: "Beyond updating financial data, the 2026 edition broadens its scope to provide a more comprehensive view of bank performance, organization, and transformation in Algeria.",
        items: [
          { title: "21 Covered Banks", body: "An expanded perimeter including institutions operating in the Algerian market." },
          { title: "New Operational Indicators", body: "Workforce, branch network, off-balance sheet, and productivity indicators complement the financial analysis." },
          { title: "Banking Experience — Digital & Branch Services", body: "The 2026 ABIX Barometer measures user satisfaction: mobile app, web e-banking, and branch services." },
          { title: "Crossed Perspectives", body: "Contributions from executives and experts may enrich the independent study analysis, subject to editorial confirmation." }
        ]
      }
    },
    edition2025: {
      stats: {
        banksAnalysed: "Banks analysed",
        analysisPages: "Analysis pages",
        coveredYears: "Covered financial years"
      },
      methodology: {
        tabMethodology: {
          items: [
            "Quantitative analysis of 20 banks operating in Algeria",
            "Utilization of published annual financial statements for 2023 and 2024",
            "Consolidation and structuring for sector benchmarking",
            "Analysis assisted by financial modeling tools"
          ]
        },
        tabContent: {
          items: [
            { label: "Global evolution of the banking sector (2023–2024)", pages: "15 pages" },
            { label: "Public vs private banks comparative", pages: "10 pages" },
            { label: "Individual analysis of the 20 local banks", pages: "61 pages" },
            { label: "Comparative analysis across multiple indices", pages: "17 pages" }
          ]
        },
        tabSample: {
          items: [
            { label: "Treasury Bonds / Total Balance Sheet", value: "34.12 %" },
            { label: "NBI — 2024 Growth", value: "+17.3 %" }
          ]
        }
      }
    },
    services: {
      sectionTitle: "Our Offerings",
      sectionSubtitle: "Each mission is tailored according to the needs and profile of your institution."
    },
    methodology: {
      approach: {
        steps: [
          { title: "Perimeter & Data Collection", body: "Identification and extraction of published information from banks and available institutional sources: financial statements, annual reports, and other relevant financial or operational data." },
          { title: "Consolidation, Consistency & Adjustments", body: "Data consistency verification, reconciliation of aggregates, and standardized treatment across institutions and financial years.", note: "When banks subsequently publish restated or reclassified historical data, studies retain the most recent revised data available to preserve comparison consistency." },
          { title: "Indicator Definition & Standardisation", body: "Standardized definition of indicators used and clear distinction between stock data, flow data, and ratios.", note: "Calculations cover growth, profitability, efficiency, market shares, and various indicators for comparing institutional trajectories." },
          { title: "Sector Benchmarks & Positioning", body: "Analysis of sector aggregates, public vs private bank comparisons, market share evolution, and relative positioning by indicator.", badge: "Methodological Principle: Comparisons are performed using an identical methodology for all covered institutions." },
          { title: "Individual Analyses & Operational Dimensions", body: "Each institution undergoes an individual assessment of its evolution, positioning, and key metrics.", note: "Subject to information availability and comparability, analysis may also integrate complementary data such as off-balance sheet, headcount, branch network, or operational productivity." },
          { title: "Review, Analysis & Interpretation", body: "Consolidated data undergoes analytical review and interpretation by Mr. Rachid Sekak and Tadjeddine & Partners to identify significant shifts, sector trends, and underlying drivers.", note: "Factual findings, calculations, and interpretations are kept distinct wherever possible in report restitution." }
        ]
      }
    },
    abixIndex: {
      objectives: [
        "Provide a multidimensional perspective on banking performance",
        "Facilitate synthetic comparisons between institutions",
        "Track performance evolutions over time",
        "Complement detailed analyses from annual studies",
        "Deliver a synthetic sector benchmark framework for the financial center"
      ],
      dimensions: [
        { title: "1. Financial Performance", body: "Analysis of profitability (RoE, RoA, NBI, GOP) and value creation capacity of the institution.", status: "Under Evaluation" },
        { title: "2. Operational Efficiency", body: "Evaluation of cost-to-income ratio, expense control, and branch network productivity.", status: "Under Evaluation" },
        { title: "3. Commercial Growth", body: "Deposit collection dynamics, loan granting, and relative market share evolution.", status: "Under Evaluation" },
        { title: "4. Financial Soundness", body: "Equity capital levels, risk coverage, and liquidity structure of institutions.", status: "Under Evaluation" },
        { title: "5. Asset Structure", body: "Balance sheet composition, breakdown of receivables, and investment portfolio quality.", status: "Under Evaluation" }
      ],
      ctaBody: "Sign up to receive project updates and be notified upon official publication of the ABIX Index."
    },
    about: {
      introP1: "ABIX — Algeria Banking Index — is an index and an annual comparative study of banks operating in Algeria. It analyses the financial performance of institutions based on published data, providing executives, analysts, and investors with an objective, structured reference.",
      introP2: "ABIX does not constitute a regulatory or prudential rating. It is a decision-support tool based on transparency and methodological rigor.",
      tagline: "Annual analysis of the Algerian banking sector",
      publisher: {
        body: "A advisory firm specializing in supporting Algerian banking and financial institutions, Tadjeddine & Partners brings its expertise in strategy, financial performance, regulatory compliance, and institutional development."
      },
      author: {
        body: "A specialist in the Algerian banking sector, Mr. Rachid Sekak brings his expertise and market knowledge to the annual edition of ABIX. His analysis is based on an in-depth reading of published financial data and ground-level industry experience."
      }
    },
    contact: {
      successTitle: "Message Sent",
      successMessage: "Our team will respond to you as soon as possible.",
      infoTitle: "Contact Details",
      order2025Title: "Order the 2025 Edition",
      order2025Body: "Access secure order forms directly.",
      order2025Cta: "View Offers →"
    }
  },
  ar: {
    edition2026: {
      forecast: {
        title: "المحتوى المتوقع لإصدار 2026",
        subtitle: "قراءة متعددة الأبعاد لأداء وتحولات القطاع المصرفي الجزائري",
        cards: [
          { title: "أداء القطاع 2024-2025", body: "تطور الميزانية العمومية والودائع والقروض والناتج البنكي الصافي والربحية والمخصصات والتوازنات المالية الرئيسية للقطاع." },
          { title: "اتجاهات 2023-2025", body: "استعراض على مدى ثلاث سنوات لتحديد الاتجاهات الهيكلية والتسارع وتغير المسارات." },
          { title: "تحليل 21 بنكاً", body: "بطاقات فردية وتطور المؤشرات الرئيسية وتموقع كل مؤسسة ومقارنته بأداء القطاع." },
          { title: "المقارنات المرجعية والحصص السوقية", body: "مقارنة البنوك العمومية والخاصة والتصنيفات حسب المؤشر والحصص السوقية والديناميات التنافسية." },
          { title: "خارج الميزانية والشبه المصرفية والأداء التشغيلي", body: "تحليل الالتزامات خارج الميزانية والموظفين وشبكة الفروع والإنتاجية والمؤشرات التشغيلية الجديدة." },
          { title: "الخدمات الرقمية ورؤى القطاع", body: "مؤشر الخدمات المصرفية: تطبيق الهاتف، الخدمات عبر الويب، والخدمات بالوكالات. وشريطة التأكيد، مساهمات من مسيرين وخبراء." }
        ]
      },
      enriched: {
        badge: "التطورات والمستجدات",
        title: "إصدار 2026 معزز",
        subtitle: "بالإضافة إلى تحديث البيانات المالية، يوسع إصدار 2026 نطاق التحليل لتقديم قراءة أكثر شمولاً لأداء وتنظيم وتحول البنوك العاملة في الجزائر.",
        items: [
          { title: "تغطية 21 بنكاً", body: "نطاق موسع يشمل المؤسسات العاملة في السوق الجزائرية." },
          { title: "مؤشرات تشغيلية جديدة", body: "الموظفون والشبكة وخارج الميزانية ومؤشرات الإنتاجية تكتمل بها التحليلات المالية." },
          { title: "الخبرة المصرفية — خدمات رقمية وفي الوكالات", body: "يقيس مؤشر ABIX 2026 رضا المستخدمين: تطبيق الهاتف، الخدمات عبر الويب، والخدمات بالوكالات." },
          { title: "رؤى متقاطعة", body: "قد تكتمل التحليلات المستقلة للدراسة بمساهمات من مسيرين وخبراء شريطة التأكيد التحريري." }
        ]
      }
    },
    edition2025: {
      stats: {
        banksAnalysed: "بنوك محللة",
        analysisPages: "صفحات تحليل",
        coveredYears: "سنوات محللة"
      },
      methodology: {
        tabMethodology: {
          items: [
            "تحليل كمي لـ 20 بنكاً عاملاً في الجزائر",
            "استغلال القوائم المالية السنوية المنشورة لعامي 2023 و2024",
            "التجميع والهيكلة للمقارنة القطاعية",
            "تحليل مدعوم بأدوات النمذجة المالية"
          ]
        },
        tabContent: {
          items: [
            { label: "التطور العام للقطاع المصرفي (2023-2024)", pages: "15 صفحة" },
            { label: "مقارنة البنوك العمومية مقابل الخاصة", pages: "10 صفحات" },
            { label: "تحليل فردي لـ 20 بنكاً في السوق", pages: "61 صفحة" },
            { label: "تحليل مقارن على عدة مؤشرات", pages: "17 صفحة" }
          ]
        },
        tabSample: {
          items: [
            { label: "سندات الخزينة / إجمالي الميزانية", value: "34,12 %" },
            { label: "الناتج البنكي الصافي — نمو 2024", value: "+17,3 %" }
          ]
        }
      }
    },
    services: {
      sectionTitle: "خدماتنا",
      sectionSubtitle: "تُصمم كل مهمة خصيصاً وفقاً لاحتياجات ومتطلبات مؤسستكم."
    },
    methodology: {
      approach: {
        steps: [
          { title: "النطاق وجمع البيانات", body: "حصر واستخراج المعلومات المنشورة من قبل البنوك والمصادر المؤسسية المتاحة: القوائم المالية، التقارير السنوية والمعلومات التشغيلية والمالية ذات الصلة." },
          { title: "التجميع والاتساق وإعادة التبويب", body: "التحقق من اتساق البيانات ومطابقة المجمعات وتوحيد معالجة المعلومات بين المؤسسات والسنوات المالية.", note: "عندما تنشر البنوك لاحقاً بيانات تاريخية معاد تبويبها، تعتمد الدراسات أحدث البيانات المعدلة المتاحة للحفاظ على اتساق المقارنات." },
          { title: "تحديد المؤشرات وتوحيدها", body: "تحديد موحد للمؤشرات المستخدمة والتمييز بين بيانات الأرصدة والتدفقات والنسب.", note: "تشمل الحسابات بوجه خاص النمو والربحية والكفاءة والحصص السوقية والمؤشرات المختلفة لمقارنة مسارات المؤسسات." },
          { title: "المقارنات القطاعية والوصف المرجعي", body: "تحليل المجمعات القطاعية، المقارنة بين البنوك العمومية والخاصة، تطور الحصص السوقية والتموقع النسبي للمؤسسات.", badge: "مبدأ منهجي: تُجرى المقارنات على أساس منهجي متطابق لجميع المؤسسات المشمولة." },
          { title: "التحليلات الفردية والأبعاد التشغيلية", body: "تخضع كل مؤسسة لقراءة فردية لتطورها وتموقعها ومؤشراتها الرئيسية.", note: "حسب توفر المعلومات وقابليتها للمقارنة، قد يشمل التحليل أيضاً بيانات تكميلية مثل خارج الميزانية والموظفين وشبكة الفروع ومؤشرات الإنتاجية." },
          { title: "المراجعة والتحليل والتفسير", body: "تخضع البيانات المجمعة لمراجعة تحليلية وتفسير من قبل السيد رشيد سكاك وتاجدين وشركاؤه لتحديد التطورات الهامة واكتشاف اتجاهات القطاع.", note: "يتم التمييز قدر الإمكان بين الحقائق والعمليات الحسابية والتفسيرات في التقرير النهائي." }
        ]
      }
    },
    abixIndex: {
      objectives: [
        "تقديم قراءة متعددة الأبعاد للأداء المصرفي",
        "تسهيل المقارنات التركيبية بين المؤسسات",
        "متابعة تطور الأداء عبر الزمن",
        "استكمال التحليلات التفصيلية للدراسات السنوية",
        "توفير إطار مرجعي قطاعي تركيبي للساحة المالية"
      ],
      dimensions: [
        { title: "1. الأداء المالي", body: "تحليل الربحية (RoE، RoA، PNB، RBE) وقدرة المؤسسة على خلق القيمة.", status: "قيد التقييم" },
        { title: "2. الكفاءة التشغيلية", body: "تقييم معامل الاستغلال والتحكم في التكاليف وإنتاجية شبكات الفروع.", status: "قيد التقييم" },
        { title: "3. النمو التجاري", body: "ديناميكية تعبئة الودائع ومنح القروض وتطور الحصص السوقية النسبية.", status: "قيد التقييم" },
        { title: "4. المتانة المالية", body: "مستوى الأموال الخاصة وتغطية المخاطر وهيكل السيولة لدى المؤسسات.", status: "قيد التقييم" },
        { title: "5. هيكل الأصول", body: "تركيب الميزانية وتوزيع المستحقات وجودة محفظة الاستثمارات.", status: "قيد التقييم" }
      ],
      ctaBody: "سجّل لتلقي مستجدات المشروع والإخطار فور النشر الرسمي لمؤشر ABIX."
    },
    about: {
      introP1: "Algeria Banking Index (ABIX) هو مؤشر ودراسة مقارنة سنوية للبنوك العاملة في الجزائر. يحلل الأداء المالي للمؤسسات بناءً على بياناتها المنشورة، لتوفير مرجع موضوعي ومنظم للمسؤولين والمحللين والمستثمرين.",
      introP2: "لا يشكل ABIX تقييماً تنظيمياً أو رقابياً، بل هو أداة للمساعدة في اتخاذ القرار قائمة على الشفافية والصرامة المنهجية للدراسة.",
      tagline: "التحليل السنوي للقطاع المصرفي الجزائري",
      publisher: {
        body: "مكتب استشاري متخصص في مرافقة المؤسسات المصرفية والمالية الجزائرية، يقدم مكتب تاجدين وشركاؤه خبرته في الاستراتيجية والأداء المالي والامتثال التنظيمي والتطوير المؤسسي."
      },
      author: {
        body: "بصفته خبيراً في القطاع المصرفي الجزائري، يقدم السيد رشيد سكاك خبرته ومعرفته بالسوق للإصدار السنوي من ABIX. يستند تحليله إلى قراءة متعمقة للبيانات المالية المنشورة ومعرفة ميدانية بالقطاع."
      }
    },
    contact: {
      successTitle: "تم إرسال الرسالة",
      successMessage: "سيرد فريقنا عليك في أقرب وقت ممكن.",
      infoTitle: "معلومات الاتصال",
      order2025Title: "طلب إصدار 2025",
      order2025Body: "الوصول المباشر إلى استمارات الطلب الآمنة.",
      order2025Cta: "مشاهدة العروض ←"
    }
  }
};

function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

deepMerge(fr, additions.fr);
deepMerge(en, additions.en);
deepMerge(ar, additions.ar);

fs.writeFileSync(frPath, JSON.stringify(fr, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');
fs.writeFileSync(arPath, JSON.stringify(ar, null, 2), 'utf8');

console.log("Successfully added all missing locale keys to fr.json, en.json, ar.json!");
