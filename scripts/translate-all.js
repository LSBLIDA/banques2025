const fs = require('fs');
const path = require('path');

const frPath = path.join(__dirname, '../locales/fr.json');
const enPath = path.join(__dirname, '../locales/en.json');
const arPath = path.join(__dirname, '../locales/ar.json');

const fr = JSON.parse(fs.readFileSync(frPath, 'utf8'));

const enData = {
  "_meta": {
    "lang": "en",
    "status": "published",
    "note": "English translation for Algeria Banking Index"
  },
  "site": {
    "name": "ABIX",
    "fullName": "Algeria Banking Index",
    "publisher": "Tadjeddine & Partners",
    "tagline": "Studies, benchmarks and strategic analyses of the Algerian banking sector",
    "copyright": "© 2025 Tadjeddine & Partners. All rights reserved."
  },
  "nav": {
    "home": "Home",
    "editions": "Editions",
    "edition2026": "2026 Edition",
    "edition2025": "2025 Edition",
    "study": "The Study",
    "barometer2026": "2026 Banking Services Barometer",
    "methodology": "Methodology",
    "abixIndex": "ABIX Project",
    "dataExplorer": "ABIX Data Explorer",
    "services": "Services",
    "rankings": "Rankings",
    "banks": "Banks",
    "about": "About",
    "contact": "Contact",
    "questionnaire": "2026 Barometer",
    "ctaStudy": "Get the Report",
    "ctaNotify": "Be notified of 2026 release",
    "langSelectLabel": "Language"
  },
  "home": {
    "meta": {
      "title": "Algeria Banking Index | Studies of the Algerian Banking Sector",
      "description": "Algeria Banking Index publishes studies, benchmarks and strategic analyses dedicated to banks operating in Algeria. Discover and pre-order the 2026 edition."
    },
    "hero": {
      "pretitle": "Studies and strategic analyses of the banking sector",
      "title": "Algeria Banking Index",
      "signature": "Studies, benchmarks and strategic analyses of the Algerian banking sector",
      "badge": "Early Subscriptions Open — Preferential rate until August 31, 2026",
      "subtitle": "Algeria Banking Index is the editorial brand created by Tadjeddine & Partners to publish independent studies, benchmarks and strategic analyses dedicated to the Algerian banking sector.",
      "subtitleParagraph2": "The 2026 edition analyses the 2024–2025 performance of 21 banks operating in Algeria, with a perspective on 2023–2025 trends. It combines financial data, operational indicators, benchmarks, competitive dynamics and new insights on banking usage.",
      "ctaPreorder": "Subscribe to 2026 Edition",
      "ctaPrimary": "Subscribe to 2026 Edition",
      "ctaNotify": "Receive 2026 Edition Updates",
      "ctaSynthesis": "Receive Executive Summary",
      "ctaPresentation": "Request a Presentation",
      "ctaBenchmark": "Get a Custom Benchmark",
      "ctaDiscover2025": "Discover 2025 Edition",
      "badgeBanks": "21 banks analysed",
      "badgeComparative": "2024–2025 Comparative",
      "badgeTrends": "2023–2025 Trends",
      "badgeIndicators": "New operational indicators",
      "publisherMention": "A publication by Tadjeddine & Partners"
    },
    "covers": {
      "badge2026": "New Edition",
      "badge2025": "Previous Edition",
      "cover2026Title": "2026 Edition",
      "cover2026Subtitle": "Comparative Analysis 2024–2025",
      "cover2026Trends": "With 2023–2025 Trend Analysis",
      "cover2026Status": "Forthcoming Release",
      "cover2025Title": "2025 Edition",
      "cover2025Subtitle": "Financial Data 2023–2024",
      "cover2025Status": "Previous Edition Available"
    },
    "earlyBird": {
      "badge": "Early Subscription Offer — Until August 31, 2026",
      "title": "Subscribe to the 2026 Edition at a Preferential Rate",
      "subtitle": "Benefit from a 10% discount for any subscription registered before August 31, 2026. The study is currently being finalized and will be delivered to subscribers upon publication.",
      "reassurance": [
        "Preferential rate reserved for early subscriptions before August 31, 2026",
        "Full study delivered upon publication",
        "Access to deliverables corresponding to the subscribed package"
      ],
      "ctaPrimary": "Subscribe to 2026 Edition",
      "ctaSecondary": "View Expected 2026 Content",
      "disclaimer": "Offer reserved for early subscriptions registered before August 31, 2026.",
      "priceDefaultLabel": "Early Subscription Rate",
      "specialOffer": "Special Early Subscription Offer",
      "validityText": "Valid until August 31, 2026 at 23:59",
      "countdownText": "Preferential rate ends in",
      "days": "Days",
      "hours": "Hours",
      "minutes": "Min",
      "seconds": "Sec",
      "viewDetails": "View details of the 3 offers (Essential, Pro, Corporate)",
      "syntheticViewTitle": "2026 Pricing & Plans — Overview",
      "viewFullComparison": "View detailed content comparison of 2026 offers"
    },
    "stats": {
      "label2025": "2025 Edition Available",
      "labelPeriod": "Analysed Data",
      "labelBanks": "Covered Banks (2025)",
      "labelPages": "Analysis Pages (2025)",
      "value2025": "Available",
      "valuePeriod": "2023–2024",
      "valueBanks": "20",
      "valuePages": "104"
    },
    "edition2026Teaser": {
      "title": "2026 Edition — Comparative Analysis 2024–2025",
      "status": "Publication planned for September 2026 — analyses and editorial enrichments in progress.",
      "description": "The next edition will cover 21 banks operating in Algeria with performance analysis for 2024–2025 and trends for 2023–2025.",
      "ctaNotify": "Be notified of release",
      "disclaimer": "Subscribers will be informed as soon as the study is published."
    },
    "advisory": {
      "title": "Go Beyond the Study",
      "body": "Need a specific analysis for your institution? The experts at Tadjeddine & Partners can turn ABIX data into diagnostic reports, recommendations, and strategic roadmaps.",
      "cta": "Request a Personalised Diagnostic"
    },
    "edition2025Preview": {
      "title": "2025 Edition Available",
      "subtitle": "Financial Data 2023–2024 · 104 pages · 20 banks",
      "body": "The 2025 edition of ABIX is available for order. It covers published financial data for 20 banks operating in Algeria for fiscal years 2023 and 2024.",
      "cta": "Discover 2025 Edition"
    },
    "methodology": {
      "title": "A Rigorous and Transparent Methodology",
      "body": "Algeria Banking Index relies on analysis based on financial and operational data from institutions. Historical data may integrate subsequent reclassifications and restatements published by institutions to ensure consistency of comparisons.",
      "cta": "Learn More About Methodology"
    }
  },
  "edition2026": {
    "meta": {
      "title": "2026 Edition — Algeria Banking Index",
      "description": "Comparative study 2024–2025 with 2023–2025 trend analysis of the Algerian banking sector. 21 banks analysed. Early subscription."
    },
    "hero": {
      "badge": "Early Subscriptions Open — Preferential rate until August 31, 2026",
      "title": "Study of the Algerian Banking Sector — 2026 Edition",
      "subtitle": "Comparative study 2024–2025 with 2023–2025 trend analysis",
      "status": "Publication planned for September 2026 — analyses and editorial enrichments in progress.",
      "description": "The 2026 edition will offer an in-depth reading of transformations in the Algerian banking sector through the analysis of 21 institutions. It will combine financial performance 2024–2025, trends 2023–2025, public/private comparisons, market shares, benchmarks, individual analyses, data on off-balance sheet items, workforce and network, as well as a new section dedicated to banking user experience — mobile app, web e-banking and branch services.\n\nPerspectives from banking executives and expert contributions will also enrich the analysis, subject to editorial confirmation.",
      "disclaimerNoBanks": "21 banks covered in the Algerian banking market.",
      "disclaimerNoDate": "Reference financial data is consolidated. Current work focuses on comparative analyses, operational data, Banking Services Barometer, and editorial contributions.",
      "ctaPreorder": "Subscribe to 2026 Edition",
      "ctaNotify": "Be notified of release"
    },
    "forecast": {
      "title": "Expected Content for the 2026 Edition",
      "subtitle": "An exhaustive analysis of the 2023–2025 triennial period",
      "items": [
        {
          "title": "Triennial Evolution 2023–2025",
          "body": "Global review of credit dynamics, deposit collection, and liquidity ratios across 3 fiscal years."
        },
        {
          "title": "Bank-by-Bank Individual Diagnostics",
          "body": "Detailed analytical sheets covering all public and private institutions within the selected scope."
        },
        {
          "title": "Sectoral Benchmarks & Comparisons",
          "body": "Relative positioning of institutions on profitability indicators (RoE, RoA, NBI, Gross Operating Profit)."
        },
        {
          "title": "Forward-Looking & Regulatory Analyses",
          "body": "Insights into prudential and strategic evolutions within the Algerian banking market."
        }
      ]
    },
    "pricing": {
      "sectionTitle": "Early Subscription Offer — 2026 Edition",
      "sectionSubtitle": "Subscribe before August 31, 2026 and enjoy a 10% discount on the public price for the 2026 edition. Delivered upon publication.",
      "earlyBirdBadge": "-10% until Aug 31",
      "validityMention": "Early subscription rate valid until August 31, 2026",
      "popularBadge": "Most Popular",
      "regularPriceStruckLabel": "Public price",
      "earlyBirdPriceLabel": "Early subscription rate",
      "savingLabel": "Save",
      "ctaBeforeDeadline": "Subscribe",
      "ctaAfterAvailable": "Order",
      "ctaAfterPreorder": "Request Reservation",
      "webinarNotice": "2026 Edition Presentation Webinar — Open upon registration",
      "essential": {
        "title": "Essential Pack",
        "tagline": "Understand the market",
        "userLicensesText": "1 user · Secured PDF",
        "regularPrice": "84,000 DA HT",
        "earlyBirdPrice": "75,600 DA HT",
        "saving": "Save 8,400 DA HT",
        "cta": "Subscribe to Essential Pack",
        "ctaAfterAvailable": "Order Essential Pack",
        "ctaAfterPreorder": "Request Reservation",
        "f1": "Complete study of 2026 edition in secured PDF format",
        "f2": "Consolidated banking sector analysis",
        "f3": "Public vs private banks comparison",
        "f4": "Individual analysis of covered banks",
        "f5": "Rankings and benchmarks by indicator",
        "f6": "Individual license for 1 user",
        "features": [
          "Complete study of 2026 edition in secured PDF format",
          "Consolidated banking sector analysis",
          "Public vs private banks comparison",
          "Individual analysis of covered banks",
          "Rankings and benchmarks by indicator",
          "Individual license for 1 user"
        ]
      },
      "pro": {
        "title": "Pro Pack",
        "tagline": "Leverage data",
        "badge": "Most Popular",
        "userLicensesText": "Up to 3 users · Excel dataset included",
        "regularPrice": "120,000 DA HT",
        "earlyBirdPrice": "108,000 DA HT",
        "saving": "Save 12,000 DA HT",
        "cta": "Subscribe to Pro Pack",
        "ctaAfterAvailable": "Order Pro Pack",
        "ctaAfterPreorder": "Request Reservation",
        "f1": "All Essential Pack features",
        "f2": "Structured Excel database with study data",
        "f3": "Detailed comparative tables",
        "f4": "Historical data 2023–2025",
        "f5": "Ratios and market shares",
        "f6": "Up to 3 users within the same organization",
        "features": [
          "All Essential Pack features",
          "Structured Excel database with study data",
          "Detailed comparative tables",
          "Historical data 2023–2025",
          "Ratios and market shares",
          "Up to 3 users within the same organization"
        ]
      },
      "corporate": {
        "title": "Corporate Executive Pack",
        "tagline": "Explore and share data",
        "userLicensesText": "Up to 20 users · Executive PPT presentation included",
        "regularPrice": "180,000 DA HT",
        "earlyBirdPrice": "162,000 DA HT",
        "saving": "Save 18,000 DA HT",
        "cta": "Subscribe to Corporate Executive Pack",
        "ctaAfterAvailable": "Order Corporate Executive Pack",
        "ctaAfterPreorder": "Request Reservation",
        "f1": "All Pro Pack features",
        "f2": "Executive presentation of the study",
        "f3": "Briefing session with experts",
        "f4": "Custom benchmark",
        "f5": "Up to 20 users within the same organization",
        "features": [
          "All Pro Pack features",
          "Executive presentation of the study",
          "Briefing session with experts",
          "Custom benchmark",
          "Up to 20 users within the same organization"
        ]
      }
    },
    "preorderForm": {
      "title": "Early Subscription Form",
      "subtitle": "Enjoy a 10% discount on all subscriptions registered before August 31, 2026.",
      "labelCompany": "Company / Organization",
      "labelFullName": "Full Name",
      "labelFirstName": "First Name",
      "labelLastName": "Last Name",
      "labelTitle": "Position",
      "labelOrg": "Bank or Organization",
      "labelEmail": "Email Address",
      "labelEmailHint": "Professional email recommended",
      "labelPhone": "Phone Number",
      "labelCountry": "Country",
      "labelPack": "Selected Offer",
      "packOptions": {
        "essential": "Essential Pack (75,600 DA HT early / 84,000 DA HT)",
        "pro": "Pro Pack (108,000 DA HT early / 120,000 DA HT)",
        "corporate": "Corporate Executive Pack (162,000 DA HT early / 180,000 DA HT)"
      },
      "labelUserCount": "Number of users",
      "labelProforma": "Pro forma invoice",
      "proformaOption": "Request a pro forma invoice",
      "labelAddons": "Interest in custom advisory services",
      "addonOptions": {
        "presentation": "Executive presentation to the Board",
        "benchmark": "Custom institutional benchmark"
      },
      "labelTermsConsent": "I acknowledge that the 2026 edition is currently being finalized and will be delivered upon publication.",
      "labelTermsAccept": "I accept Terms & Conditions",
      "labelPrivacyConsent": "I have read the privacy policy and consent to data processing under these terms.",
      "privacyModalTitle": "Privacy Policy — Tadjeddine & Partners",
      "privacyNotice": "Your personal data is processed by Tadjeddine & Partners in accordance with our privacy policy.",
      "submit": "Subscribe to 2026 Edition",
      "submitReservation": "Subscribe at Preferential Rate",
      "submitting": "Submitting…",
      "successTitle": "Subscription successfully registered",
      "successMessage": "Thank you. Your subscription for the 2026 edition has been recorded.",
      "errorMessage": "An error occurred while recording your subscription. Please try again.",
      "successBody": "Your early subscription reservation has been registered. An advisor from Tadjeddine & Partners will contact you within 48 business hours.",
      "fallbackNote": "Direct processing within 48 business hours."
    },
    "notify": {
      "title": "Be notified without subscribing immediately",
      "body": "If you prefer not to subscribe now, register your address to receive a simple alert upon release.",
      "labelFirstName": "First Name",
      "labelLastName": "Last Name",
      "labelTitle": "Position",
      "labelOrg": "Bank or Organization",
      "labelEmail": "Email Address",
      "labelEmailHint": "Professional email recommended",
      "labelPhone": "Phone (optional)",
      "labelCountry": "Country",
      "labelInterest": "Nature of interest",
      "interestOptions": {
        "banking_executive": "Banking Executive",
        "investor": "Investor",
        "analyst": "Financial Analyst",
        "researcher": "Student / Researcher",
        "press": "Press and Media",
        "other": "Other"
      },
      "submit": "Register for Updates",
      "successTitle": "Registration Confirmed",
      "successBody": "You will be notified when the 2026 edition is published.",
      "fallbackNote": "Your request will be processed within 48 working hours."
    },
    "advisory": {
      "title": "Go Beyond the Study",
      "body": "Need a specific analysis for your institution? The experts at Tadjeddine & Partners can turn ABIX data into diagnostic reports, recommendations, and strategic roadmaps.",
      "cta": "Request a Personalised Diagnostic"
    },
    "faq": {
      "title": "Frequently Asked Questions",
      "subtitle": "Everything you need to know about the 2026 edition.",
      "items": [
        {
          "q": "When will the 2026 edition be published?",
          "a": "The 2026 edition of Algeria Banking Index is expected to be published in September 2026.\n\nSubscribers will be notified as soon as the study is available."
        },
        {
          "q": "What will be the scope of the 2026 edition?",
          "a": "The 2026 edition will cover 21 banks operating in Algeria. It will focus primarily on comparing 2024–2025 performance, complemented by an analysis of trends observed over the 2023–2025 period."
        },
        {
          "q": "What will the 2026 study contain?",
          "a": "The study will offer a consolidated analysis of the Algerian banking sector, comparisons between public and private banks, individual analyses of 21 institutions, as well as rankings and benchmarks by indicator.\n\nThis edition will also be enriched with new insights on off-balance sheet items, workforce, banking network, and operational performance.\n\nIt will also include a section dedicated to banking user experience — mobile app, web e-banking, and branch services — through the ABIX 2026 Barometer."
        },
        {
          "q": "What does the early subscription guarantee?",
          "a": "Early subscription allows you to reserve the 2026 edition before its publication and benefit from a 10% preferential rate.\n\nUpon publication, deliverables corresponding to the subscribed pack will be made available to the subscriber."
        },
        {
          "q": "Is the preferential rate guaranteed?",
          "a": "Yes. Any subscription registered by August 31, 2026 at 23:59 (Algerian time) benefits from the early subscription rate.\n\nThis rate remains guaranteed until the study is delivered."
        },
        {
          "q": "What are the different offer levels?",
          "a": "Three offers are available:\n\nEssential Pack:\n- Complete study in PDF format;\n- Sector analyses;\n- Individual bank analyses;\n- Benchmarks and rankings;\n- License for 1 user.\n\nPro Pack:\n- All Essential Pack features;\n- Excel dataset;\n- Detailed comparative tables;\n- 2023–2025 historical data;\n- Ratios and market shares;\n- Up to 3 users from the same organization.\n\nCorporate Executive Pack:\n- All Pro Pack features;\n- Executive presentation;\n- Briefing session with experts;\n- Custom benchmark;\n- Up to 20 users from the same organization."
        },
        {
          "q": "Can I receive a pro forma invoice?",
          "a": "Yes. Upon request, Tadjeddine & Partners can issue a pro forma invoice for the selected pack to facilitate your organization's internal procurement procedure."
        },
        {
          "q": "Can I subscribe for multiple users?",
          "a": "Yes.\n\nThe Pro Pack allows access for up to 3 users from the same organization.\n\nThe Corporate Executive Pack allows access for up to 20 users from the same organization."
        },
        {
          "q": "Are the 2024 data identical to those in the previous edition?",
          "a": "Not necessarily.\n\nSome banks have performed reclassifications or restatements of certain financial line items in subsequent publications.\n\nTo ensure maximum consistency with 2025 data, the 2026 edition uses the most recent revised 2024 data available.\n\nThese numbers replace those used in the previous edition where necessary."
        },
        {
          "q": "Will the Banking Services Barometer influence financial results or bank rankings?",
          "a": "No.\n\nThe Banking Services Barometer is a distinct section dedicated to user experience and satisfaction regarding banking services — mobile app, web e-banking, and branch services.\n\nIts results do not alter the financial data of institutions.\n\nThey will be presented separately, along with a description of the methodology used and representativeness information."
        },
        {
          "q": "Will the study feature perspectives from bank executives and experts?",
          "a": "The 2026 edition also plans to host signed contributions from bank executives and experts, subject to editorial confirmation.\n\nThese contributions will be clearly distinguished from Algeria Banking Index's independent analysis.\n\nThey will not enter into indicator calculations, rankings, or independent conclusions."
        },
        {
          "q": "Is the 2025 edition included in the 2026 subscription?",
          "a": "No.\n\nThe 2025 edition remains an independent publication and can be acquired separately.\n\nFor organizations wishing to obtain both 2025 and 2026 editions, a bundled proposal can be arranged upon request."
        },
        {
          "q": "What happens if the publication date changes?",
          "a": "Subscribers will be notified of any changes to the publication timeline.\n\nThe subscription will remain valid and the preferential rate secured before August 31, 2026 will remain guaranteed."
        },
        {
          "q": "Can I request a presentation or a custom benchmark?",
          "a": "Yes.\n\nThe Corporate Executive Pack includes a briefing session and a custom benchmark.\n\nAdditional advisory services, such as a presentation to a board of directors or an in-depth analysis, can also be offered separately."
        }
      ]
    }
  },
  "edition2025": {
    "meta": {
      "title": "2025 Edition — Algeria Banking Index",
      "description": "The 2025 edition of ABIX analyses financial performance for 20 Algerian banks for fiscal years 2023 and 2024. Available in 3 packs."
    },
    "alert2026": "The 2026 edition is in preparation.",
    "alert2026Cta": "Discover 2026 Edition",
    "hero": {
      "badge": "Available",
      "title": "2025 Edition",
      "subtitle": "Financial Data 2023–2024 · 104 pages · 20 banks",
      "body": "The 2025 edition of ABIX covers published financial data for 20 banks operating in Algeria for fiscal years 2023 and 2024.",
      "ctaPrimary": "Get 2025 Edition",
      "ctaPreview": "View Free Preview"
    },
    "pricing": {
      "title": "Choose Your Pack",
      "subtitle": "Options tailored to your analysis, intelligence, and strategic decision-making needs.",
      "popular": "Most Popular",
      "ctaOrder": "Order",
      "paymentNote": "Secure payment · EUR & DZD accepted · Access provided after order processing"
    },
    "methodology": {
      "tabs": {
        "methodology": "Study Methodology",
        "content": "Content",
        "sample": "Sample"
      },
      "body": "Discover the approach for collecting, consolidating, and analysing Algeria Banking Index studies.",
      "cta": "Learn More About Methodology"
    },
    "challenges": {
      "title": "Challenges Facing Banking Leaders",
      "subtitle": "Without reliable data and comparative analyses, strategic decisions remain fragile.",
      "items": [
        {
          "title": "Lack of Local Data",
          "body": "International reports do not reflect the specificities of the Algerian banking market.",
          "stat": "70%",
          "statLabel": "of strategic decisions are taken without reliable local comparative data."
        },
        {
          "title": "Decision Delays",
          "body": "The absence of comparative sector analyses delays strategic choices.",
          "stat": "3 to 6 months",
          "statLabel": "average delay observed in adapting to new banking dynamics."
        },
        {
          "title": "Competitive Disadvantage",
          "body": "Without sector intelligence, anticipating competition and regulatory changes becomes difficult.",
          "stat": "−3.1 pts",
          "statLabel": "drop in loans/deposits ratio in 2024, illustrating a decline in economic financing."
        }
      ]
    },
    "benefits": {
      "title": "Why This Study Is Essential",
      "subtitle": "Exclusive analyses shedding light on the real dynamics of the Algerian banking sector.",
      "items": [
        {
          "title": "Consolidated Financial Data 2023/2024",
          "body": "A unique database built from published financial balance sheets of 20 banks representing nearly the entire market.",
          "points": [
            "Key ratios: loan-to-deposit, liquidity, profitability",
            "Comparative analysis of public vs. private institutions",
            "Deposit and credit growth trends"
          ]
        },
        {
          "title": "In-Depth Competitive Analysis",
          "body": "An unprecedented sector benchmark to understand every actor's strengths and weaknesses.",
          "points": [
            "Market shares and evolution 2023 → 2024",
            "Individual analysis of all 20 banks (61 pages)",
            "Comparative performance benchmarks"
          ]
        },
        {
          "title": "Insights & Future Strategies",
          "body": "Projections grounded in recent performance trends and validated by regulatory data.",
          "points": [
            "Projections for total assets, deposits, and credits",
            "Expected profitability and RoE dynamics",
            "Strategic differentiation axes"
          ]
        }
      ]
    },
    "faq": {
      "title": "Frequently Asked Questions",
      "subtitle": "Everything you need to know about the 2025 edition.",
      "items": [
        {
          "q": "What methodology is used for this study?",
          "a": "The study is based on an in-depth analysis of bank balance sheets and official data published by institutions and regulatory authorities. It includes public/private comparisons as well as forward-looking analyses."
        },
        {
          "q": "Which banks are covered in the analysis?",
          "a": "The study covers 20 banks operating in Algeria, including public banks (BEA, BNA, CPA, BADR, BDL), major private banks (ABC Bank, Trust Bank Algeria, Bank Al Baraka, Gulf Bank Algeria…), and international group subsidiaries (BNP Paribas El Djazaïr, Société Générale Algérie, Natixis Algérie, AGB, HSBC Algeria, Calyon Algérie)."
        },
        {
          "q": "Can I use this study for internal work?",
          "a": "Yes. The Essential Pack is intended for individual use. The Pro Pack extends usage to up to 3 users within the same organization. The Corporate Executive Pack allows up to 20 users and includes an executive PowerPoint deliverable."
        },
        {
          "q": "How often is the study updated?",
          "a": "The 2025 edition incorporates published financial data for fiscal years 2023 and 2024. A new edition is published every year."
        },
        {
          "q": "What is your file access policy?",
          "a": "Given the digital nature of deliverables, access is granted after order validation and payment processing."
        }
      ]
    },
    "advisory": {
      "title": "Go Beyond the Study",
      "body": "Need a specific analysis for your institution? The experts at Tadjeddine & Partners can turn ABIX data into diagnostic reports, recommendations, and strategic roadmaps.",
      "cta": "Request a Personalised Diagnostic"
    }
  },
  "methodology": {
    "meta": {
      "title": "Study Methodology — Algeria Banking Index",
      "description": "Discover the approach for collecting, consolidating, comparing, and interpreting financial, operational, and public data relating to the Algerian banking sector."
    },
    "hero": {
      "title": "Study Methodology",
      "subtitle": "A structured approach to collect, consolidate, compare, and interpret financial, operational, and public data relating to the Algerian banking sector.",
      "introText": "Algeria Banking Index studies rely on the methodical use of publicly available information, its harmonisation, and comparative analysis. The objective is to provide a consistent reading of performance, trends, and positioning across covered institutions."
    },
    "disclaimerBox": {
      "title": "What the methodology does NOT constitute",
      "p1": "The published analyses do not constitute a credit rating, a prudential rating, a solvency certification, a financial audit, or an investment recommendation.",
      "p2": "They rely on publicly available information and a comparative methodology proprietary to Algeria Banking Index studies."
    },
    "approach": {
      "title": "Our 6-Step Analytical Approach",
      "description": "Algeria Banking Index studies rest on structured collection of publicly available information, followed by consolidation, consistency verification, comparison, and interpretation."
    },
    "revisions": {
      "title": "Historical Data and Revisions",
      "p1": "Historical data may evolve over time.",
      "p2": "Some banks may perform reclassifications or restatements for previous financial years in subsequent publications.",
      "p3": "When a revised figure is published by an institution, Algeria Banking Index may substitute this figure for the one used in an earlier edition to maintain consistent comparative series.",
      "p4": "Numbers in a new edition may therefore occasionally differ from those in a previous edition without implying an error."
    },
    "ebanking": {
      "title": "Specific Methodology for the Banking Services Barometer",
      "p1": "The Banking Services Barometer constitutes a complementary and independent pillar alongside financial analysis.",
      "p2": "It is based on a survey of banking service users to measure satisfaction levels and perceptions of offered services.",
      "p3": "Barometer results are presented separately from financial indicators. They do not enter into financial ratio calculations or accounting-based rankings.",
      "p4": "Published results specify respondent sample size, data collection period, response distribution, and representativeness parameters."
    },
    "contributions": {
      "title": "Editorial Contributions",
      "p1": "Certain editions may feature signed contributions from bank executives or industry experts.",
      "p2": "These contributions are clearly identified and separate from analysis produced by Algeria Banking Index.",
      "p3": "They reflect the authors' opinions and do not enter into calculations, comparisons, or independent study conclusions."
    },
    "sources": {
      "title": "Sources and Limitations",
      "p1": "Analyses are prepared from public information available at the closing date of each edition.",
      "p2": "Data availability, detail level, and presentation format may vary across institutions.",
      "p3": "When data is unavailable or cannot be homogenously compared, it may be excluded from specific indicators or flagged explicitly."
    }
  },
  "services": {
    "meta": {
      "title": "Advisory Services — Tadjeddine & Partners",
      "description": "Transform ABIX data into tailored analyses for your institution. Benchmark, performance diagnostic, strategic advisory."
    },
    "hero": {
      "title": "Advisory Services",
      "subtitle": "Experts at Tadjeddine & Partners support banking and financial institutions in their strategic decision-making.",
      "badge": "Tadjeddine & Partners"
    },
    "advisory": {
      "title": "Go Beyond the Study",
      "body": "Need a specific analysis for your institution? The experts at Tadjeddine & Partners can turn ABIX data into diagnostic reports, recommendations, and strategic roadmaps.",
      "cta": "Request a Personalised Diagnostic"
    },
    "offerings": [
      {
        "id": "benchmark",
        "title": "Custom Benchmark",
        "body": "Positioning your institution against peers across key indicators: profitability, liquidity, operational efficiency, market shares.",
        "cta": "Request a Benchmark"
      },
      {
        "id": "diagnostic",
        "title": "Performance Diagnostic",
        "body": "In-depth analysis of your institution's financial performance, identifying strengths, weaknesses, and growth levers.",
        "cta": "Request a Diagnostic"
      },
      {
        "id": "comparative",
        "title": "Comparative Peer Analysis",
        "body": "Structured comparison against a selected panel of peer banks, tailored to your institution's profile.",
        "cta": "Learn More"
      },
      {
        "id": "presentation",
        "title": "Board Presentation",
        "body": "Executive summary and presentation of results to your Board of Directors, tailored to your strategic priorities.",
        "cta": "Request a Presentation"
      },
      {
        "id": "strategy",
        "title": "Strategic Advisory & Support",
        "body": "Formulating strategic recommendations and assisting in defining your institution's roadmap.",
        "cta": "Request Support"
      }
    ],
    "cta": {
      "title": "Contact Our Experts",
      "body": "Every advisory engagement is custom-designed to match your institution's specific goals.",
      "primary": "Request a Quote",
      "secondary": "Learn More About Tadjeddine & Partners"
    }
  },
  "abixIndex": {
    "meta": {
      "title": "ABIX Index Project | Algeria Banking Index",
      "description": "Discover the ABIX project, a forthcoming multidimensional comparative banking index for Algeria currently under design and validation."
    },
    "hero": {
      "badge": "Project Under Design & Validation",
      "title": "ABIX — A Banking Index Under Development",
      "subtitle": "A multidimensional comparative index project for banking performance in Algeria",
      "intro": "Tadjeddine & Partners is developing ABIX, a future comparative index designed to synthesize multiple performance dimensions of banks operating in Algeria.",
      "introParagraph2": "This project is separate from sector studies currently published under the Algeria Banking Index brand."
    },
    "objectivesTitle": "Envisioned Objectives for the Index",
    "objectives": [
      "Provide a multidimensional reading of banking performance",
      "Facilitate synthetic peer comparisons across institutions",
      "Track performance evolution over time",
      "Complement detailed annual study reports",
      "Offer a synthetic sector benchmarking framework"
    ],
    "dimensionsTitle": "The 5 Dimensions Currently Under Study",
    "dimensions": [
      { "title": "Financial Performance", "body": "Return on Equity (ROE), Return on Assets (ROA), Net Banking Income, and Gross Operating Profit." },
      { "title": "Operational Efficiency", "body": "Cost-to-Income Ratio, branch network productivity, and general expense management." },
      { "title": "Commercial Growth", "body": "Lending dynamics, deposit collection, and market share evolution." },
      { "title": "Financial Soundness", "body": "Equity levels, risk coverage, and liquidity ratio structures." },
      { "title": "Asset Structure", "body": "Balance sheet composition, loan portfolio distribution, and asset quality." }
    ],
    "warningTitle": "Important — Project in Development",
    "warning": "Methodology, indicators, weightings, and calculation formulas are currently undergoing testing and validation. No final ABIX scores or rankings are published at this stage.",
    "cta": "Be Notified of ABIX Index Launch"
  },
  "about": {
    "meta": {
      "title": "About — ABIX | Algeria Banking Index",
      "description": "Discover ABIX, the Algeria Banking Index, and Tadjeddine & Partners, the firm behind this benchmark initiative."
    },
    "hero": {
      "title": "About ABIX",
      "subtitle": "Algeria Banking Index is an initiative by Tadjeddine & Partners to provide Algerian decision-makers with an independent analytical reference for the banking sector."
    },
    "abix": {
      "title": "What is ABIX?",
      "body": "ABIX — Algeria Banking Index — is an index and annual comparative study of banks operating in Algeria. It analyses the financial performance of institutions based on published data to provide executives, analysts, and investors with an objective reference.\n\nABIX does not constitute a regulatory or prudential rating. It is a decision-support tool built on transparency and methodological rigor."
    },
    "publisher": {
      "title": "Tadjeddine & Partners",
      "body": "A management consulting firm specializing in Algerian banking and financial institutions, Tadjeddine & Partners brings expertise in strategy, financial performance, regulatory compliance, and institutional development.",
      "cta": "Discover Our Services"
    },
    "author": {
      "name": "Mr. Rachid Sekak",
      "role": "Banking Expert",
      "bio": "A leading expert on the Algerian banking sector, Mr. Rachid Sekak contributes his deep market knowledge to the annual ABIX edition based on published financial records and extensive field experience."
    }
  },
  "contact": {
    "meta": {
      "title": "Contact — ABIX | Algeria Banking Index",
      "description": "Contact the ABIX team and Tadjeddine & Partners for study orders, advisory quotes, benchmarks, partnerships, or press inquiries."
    },
    "hero": {
      "title": "Contact Us",
      "subtitle": "Select the topic of your request to be connected with the right team."
    },
    "forms": {
      "order": { "label": "Order 2025 Study", "description": "Access order forms for Essential, Pro, and Corporate Executive packs." },
      "quote": { "label": "Advisory Quote Request", "description": "Obtain a proposal for benchmark, diagnostic, or strategic consulting." },
      "benchmark": { "label": "Custom Benchmark", "description": "Request a custom benchmark of your institution against peers." },
      "partnership": { "label": "Partnership or Sponsorship", "description": "Explore collaboration opportunities with ABIX or Tadjeddine & Partners." },
      "press": { "label": "Press & Institutional Inquiries", "description": "Information requests for journalists, researchers, or institutions." }
    },
    "info": {
      "address": "Cité Naimi Rue G N°1, Blida, Algeria",
      "email": "info@tadjeddine-partners.com",
      "phone": "+213 (0) 560 403 405 / 0560 349 059"
    }
  },
  "rankings": {
    "meta": {
      "title": "Banking Rankings — ABIX | Algeria Banking Index",
      "description": "Discover ABIX banking sector rankings for Algeria. Complete rankings are available in the full report."
    },
    "hero": {
      "title": "ABIX Rankings",
      "subtitle": "An overview of comparative performance in the Algerian banking sector."
    },
    "status2026": "2026 rankings in preparation — data consolidation and validation ongoing.",
    "teaser": {
      "title": "2025 Rankings — Public Preview",
      "note": "Full rankings covering all institutions and indicators are available in the 2025 ABIX edition.",
      "lockMessage": "Complete ranking available in the full study",
      "ctaStudy": "Get the Full Report"
    }
  },
  "banks": {
    "meta": {
      "title": "Covered Banks — ABIX | Algeria Banking Index",
      "description": "Discover banks covered by ABIX studies. Performance analysis of the Algerian banking sector."
    },
    "hero": {
      "title": "Banks Covered by the Study",
      "subtitle": "The ABIX study analyses banks operating in Algeria based on published financial statements."
    },
    "scopeNote": "The 2026 edition covers 21 commercial banks operating in Algeria, including new entrant Ziraat Bankası Algeria.",
    "scope2025": "The 2025 edition covers 20 banks operating in Algeria.",
    "lockMessage": "Detailed analysis available in the full study",
    "ctaStudy": "Get the Full Report",
    "banks": [
      { "id": "bea", "name": "BEA", "fullName": "Banque Extérieure d'Algérie", "type": "public" },
      { "id": "bna", "name": "BNA", "fullName": "Banque Nationale d'Algérie", "type": "public" },
      { "id": "cpa", "name": "CPA", "fullName": "Crédit Populaire d'Algérie", "type": "public" },
      { "id": "badr", "name": "BADR", "fullName": "Banque de l'Agriculture et du Développement Rural", "type": "public" },
      { "id": "bdl", "name": "BDL", "fullName": "Banque de Développement Local", "type": "public" },
      { "id": "cnep", "name": "CNEP-Banque", "fullName": "Caisse Nationale d'Épargne et de Prévoyance", "type": "public" },
      { "id": "al_baraka", "name": "Al Baraka Bank", "fullName": "Banque Al Baraka d'Algérie", "type": "private" },
      { "id": "bnpp", "name": "BNP Paribas El Djazaïr", "fullName": "BNP Paribas El Djazaïr", "type": "private" },
      { "id": "abc", "name": "ABC Bank Algeria", "fullName": "Arab Banking Corporation Algeria", "type": "private" },
      { "id": "sgalger", "name": "SGA", "fullName": "Société Générale Algérie", "type": "private" },
      { "id": "citibank", "name": "Citibank Algeria", "fullName": "Citibank Algeria", "type": "private" },
      { "id": "natixis", "name": "Natixis Algérie", "fullName": "Natixis Algérie", "type": "private" },
      { "id": "agb", "name": "AGB", "fullName": "Algeria Gulf Bank", "type": "private" },
      { "id": "hsbc", "name": "HSBC Algeria", "fullName": "HSBC Algeria", "type": "private" },
      { "id": "calyon", "name": "Calyon Algérie", "fullName": "Crédit Agricole Corporate and Investment Bank Algérie", "type": "private" },
      { "id": "trust", "name": "Trust Bank Algeria", "fullName": "Trust Bank Algeria", "type": "private" },
      { "id": "gulf_bank", "name": "Gulf Bank Algeria", "fullName": "Gulf Bank Algeria", "type": "private" },
      { "id": "fransabank", "name": "Fransabank El Djazaïr", "fullName": "Fransabank El Djazaïr", "type": "private" },
      { "id": "societe_gen_consociation", "name": "El Djazaïr Dawli", "fullName": "El Djazaïr Dawli (ex-Housing Bank)", "type": "private" },
      { "id": "arab_bank", "name": "Arab Bank PLC Algeria", "fullName": "Arab Bank PLC Algeria", "type": "private" }
    ]
  },
  "footer": {
    "slogan": "Turning ideas into concrete results through multidisciplinary expertise.",
    "servicesLinks": {
      "title": "Services",
      "items": [
        { "label": "Sector Studies", "url": "https://tadjeddine-partners.com/services/" },
        { "label": "Strategic Advisory", "url": "https://tadjeddine-partners.com/services/" },
        { "label": "Law 18-07 Compliance", "url": "https://tadjeddine-partners.com/services/" },
        { "label": "Training", "url": "https://tadjeddine-partners.com/services/" }
      ]
    },
    "supportLinks": {
      "title": "Support",
      "items": [
        { "label": "Contact", "url": "https://tadjeddine-partners.com/contact/" },
        { "label": "Legal Notices", "url": "https://tadjeddine-partners.com/mentions-legales/" },
        { "label": "Privacy Policy", "url": "https://tadjeddine-partners.com/politique-confidentialite/" }
      ]
    },
    "contact": {
      "title": "Contact",
      "address": "Cité Naimi Rue G N°1, Blida, Algeria",
      "email": "info@tadjeddine-partners.com",
      "phone": "+213 (0) 560 403 405 / 0560 349 059"
    }
  },
  "modal": {
    "closeLabel": "Close",
    "orderTitle": "Order the Study",
    "previewTitle": "2025 Edition Preview",
    "previewContent": {
      "items": [
        "Full table of contents",
        "Sample analyses",
        "Sample charts and data",
        "General methodology"
      ],
      "ctaDownload": "Download Free Preview",
      "ctaOrder": "Get Full Study"
    }
  },
  "legal": {
    "meta": {
      "title": "Legal Notices — ABIX | Algeria Banking Index",
      "description": "Legal notices, publisher information, hosting, intellectual property, and terms of use for ABIX — Tadjeddine & Partners."
    },
    "hero": {
      "title": "Legal Notices",
      "subtitle": "Legal and regulatory information for the ABIX platform and EURL Tadjeddine & Partners."
    },
    "publisher": {
      "title": "Site Publisher",
      "name": "EURL Tadjeddine & Partners (capital of 20,000,000 DA)",
      "labelAddress": "Address",
      "address": "Rue G N° 1, Cité Naimi Centre Zabana, Blida – Algeria",
      "labelLegalReg": "Trade Register & Tax Numbers",
      "legalReg": "RC: 10B0981001 — NIF: 001016098100195 — AI: 09010399908",
      "labelEmail": "Email",
      "email": "info@tadjeddine-partners.com",
      "labelPhone": "Phone",
      "phone": "+213 (0) 560 403 405 / +213 (0) 560 349 059",
      "labelManager": "Managing Director",
      "manager": "TADJEDDINE BACHIR"
    },
    "hosting": {
      "title": "Hosting Provider",
      "name": "Djezzy Cloud",
      "address": "Route de wilaya, Lot n°37/4, Dar El Beida, Algiers, Algeria",
      "labelEmail": "Email",
      "email": "contact@djezzy.dz"
    },
    "ip": {
      "title": "Intellectual Property",
      "body": "All content on this website (text, images, video, logos, layout) is the exclusive property of EURL Tadjeddine & Partners unless specified otherwise. Any reproduction or distribution without prior written permission is strictly prohibited."
    },
    "privacy": {
      "title": "Personal Data Protection",
      "body": "For details regarding data collection and processing, please refer to our Privacy Policy."
    },
    "cgu": {
      "title": "Terms of Use",
      "body": "Using this website implies full acceptance of our Terms of Use. The publisher reserves the right to modify these conditions at any time."
    },
    "links": {
      "title": "Hyperlinks",
      "body": "Links to external websites may be provided. Tadjeddine & Partners assumes no responsibility for external content."
    },
    "law": {
      "title": "Applicable Law",
      "body": "These legal notices are governed by Algerian law. In case of dispute, the courts of Blida have sole jurisdiction."
    },
    "contact": {
      "title": "Contact"
    }
  },
  "privacy": {
    "meta": {
      "title": "Privacy Policy — ABIX | Algeria Banking Index",
      "description": "Privacy policy and personal data protection under Law No. 18-07 — EURL Tadjeddine & Partners."
    },
    "hero": {
      "badge": "Law No. 18-07 of June 10, 2018",
      "title": "Privacy Policy",
      "subtitle": "Personal data protection and confidentiality commitments of EURL Tadjeddine & Partners."
    },
    "sec1": {
      "title": "1. Data Controller Identity",
      "p1": "In accordance with Law No. 18-07 of June 10, 2018 on personal data protection, the data controller is TADJEDDINE AND PARTNERS, RC 10B0981001, Cité Naimi, Rue G N° 1, Zabana, Blida, represented by Managing Director Mr. Tadjeddine BACHIR.",
      "p2": "As data controller, TADJEDDINE AND PARTNERS complies with all applicable personal data protection laws."
    },
    "sec2": {
      "title": "2. Collected Data",
      "intro": "TADJEDDINE AND PARTNERS collects and processes the following user data:",
      "item1": "First and last name",
      "item2": "Professional email address",
      "item3": "Phone number",
      "item4": "Organization / bank / company name",
      "item5": "Job title / Position",
      "item6": "Website and stated requirements"
    },
    "sec3": {
      "title": "3. Purposes of Processing",
      "intro": "Collected data is processed exclusively to:",
      "item1": "Respond to user inquiries, order requests, and information demands",
      "item2": "Send commercial proposals tailored to stated needs (ABIX study, advisory, benchmarks)",
      "item3": "Manage pre-contractual and contractual relationships",
      "item4": "Perform internal business statistics and analyses"
    },
    "sec4": {
      "title": "4. Data Recipients",
      "p1": "Personal data is processed exclusively by authorized staff of TADJEDDINE AND PARTNERS and is never sold or rented to third parties.",
      "p2": "Any technical sub-processor engagements (e.g. hosting, email dispatch) are governed by strict confidentiality agreements conforming to Law No. 18-07."
    },
    "sec5": {
      "title": "5. Data Retention Period",
      "body": "Personal data is retained for up to three (3) years following the last interaction, unless consent is withdrawn or erased per legal rights."
    },
    "sec6": {
      "title": "6. Security Measures",
      "body": "TADJEDDINE AND PARTNERS implements appropriate technical and organizational safeguards to ensure confidentiality, integrity, and availability of processed personal data."
    },
    "sec7": {
      "title": "7. Rights of Data Subjects",
      "intro": "Under Articles 7 and 34–36 of Law No. 18-07, individuals have the following rights:",
      "right1": "Right of access to personal data",
      "right2": "Right to rectify inaccurate or incomplete data",
      "right3": "Right to object on legitimate grounds",
      "right4": "Right to withdraw consent at any time",
      "exerciseTitle": "To exercise these rights, contact us at:"
    },
    "sec8": {
      "title": "8. International Data Transfers",
      "body": "No personal data is transferred abroad without prior authorization under Law No. 18-07."
    },
    "sec9": {
      "title": "9. Policy Updates",
      "body": "TADJEDDINE AND PARTNERS reserves the right to update this policy to maintain regulatory compliance."
    }
  },
  "questionnaire": {
    "meta": {
      "title": "2026 Banking Services Barometer | ABIX Survey",
      "description": "Share your opinion on mobile app, web, and branch services of banks in Algeria. Participate in the independent ABIX 2026 study."
    },
    "hero": {
      "brand": "ABIX — 2026 Banking Services Barometer",
      "title": "Your Feedback on Banking Services in Algeria",
      "subtitle": "Rate the mobile app, web platform, and branch services of banks you use. Your responses will feed into the independent ABIX 2026 study."
    },
    "step1": {
      "title": "Step 1: Select Your Banks",
      "hint": "Select at least one bank whose services you use."
    },
    "step2": {
      "title": "Step 2: Rate Services",
      "hint": "Select your satisfaction level for each service used."
    },
    "services": {
      "mobile": "Mobile App",
      "web": "Web e-Banking",
      "branch": "Branch Services"
    },
    "ratings": {
      "veryUnsatisfied": "Very Unsatisfied",
      "unsatisfied": "Unsatisfied",
      "average": "Neutral / Average",
      "satisfied": "Satisfied",
      "verySatisfied": "Very Satisfied",
      "notUsed": "I do not use this service"
    },
    "actions": {
      "submit": "Submit Evaluation",
      "submitting": "Submitting…",
      "selectBankFirst": "Please select at least one bank above to display rating options."
    },
    "messages": {
      "success": "Thank you! Your evaluation has been successfully recorded.",
      "selectAtLeastOneBank": "Please select at least one bank.",
      "evaluateAtLeastOneService": "Please rate at least one service.",
      "error": "An error occurred while submitting your evaluation.",
      "alreadyCompletedTitle": "Thank you for your participation!",
      "alreadyCompletedText": "You have already completed the 2026 Banking Services Barometer. Your responses are recorded.",
      "alreadySubmittedIP": "An evaluation has already been submitted from your device/network."
    },
    "notice": {
      "title": "Information & Confidentiality",
      "text": "This survey is conducted by Tadjeddine & Partners for the independent ABIX 2026 study. Responses are strictly confidential and processed anonymously in aggregate form."
    },
    "cta": {
      "bannerTitle": "Participate in the 2026 Banking Services Barometer",
      "bannerText": "Share your opinion on your bank's mobile app, web service, and branch services in under 2 minutes.",
      "button": "Answer Survey"
    }
  },
  "dataExplorer": {
    "meta": {
      "title": "ABIX Data Explorer | Algerian Banks Analysis",
      "description": "Explore, compare and analyse the financial performance of Algerian banks with ABIX Data Explorer: KPIs, market shares, benchmarks, history and advanced analyses."
    },
    "hero": {
      "eyebrow": "ABIX Data Explorer",
      "title": "Turn Algerian banks' financial data into comparative analyses and decisions.",
      "subtitle": "Analyse a bank. Compare it to peers. Track its trajectory. Understand its market position.",
      "description": "ABIX Data Explorer transforms banking financial data into a structured reading of the market: activity, deposits, credit, profitability, efficiency, growth, equity capitalization, balance sheet structure and competitive position.",
      "ctaDiscover": "Discover Features",
      "ctaOffers": "View Offers"
    },
    "keyStats": {
      "banksCount": "21 banks",
      "banksLabel": "Current covered banking catalogue",
      "history": "Multi-year data",
      "historyLabel": "History available depending on edition and license",
      "kpis": "Dozens of KPIs",
      "kpisLabel": "Source data, ratios and derived indicators",
      "dimensions": "4 financial dimensions",
      "dimensionsLabel": "Profitability · Growth · Efficiency · Capitalization"
    },
    "singleInterface": {
      "title": "The entire banking sector in a single interface",
      "text": "Switch from a sector view to a single bank analysis in seconds. Explore data, trends, rankings and comparisons without handling multiple Excel files or reports.",
      "items": [
        {
          "title": "Sector view",
          "body": "Financial aggregates, annual evolution, market composition and main players."
        },
        {
          "title": "Rankings",
          "body": "Banks' position by indicator and by year."
        },
        {
          "title": "History",
          "body": "Values, annual variations, Base 100 and CAGR."
        },
        {
          "title": "Comparison",
          "body": "Simultaneous analysis of multiple banks, indicators or dimensions."
        }
      ]
    },
    "profile360": {
      "title": "One bank. One view. All essential indicators.",
      "subtitle": "360° Banking Profile",
      "text": "ABIX Data Explorer gathers in a single profile a bank's financial trajectory, competitive positioning, benchmarks and main attention signals.",
      "domains": [
        "Activity",
        "Profitability",
        "Efficiency",
        "Intermediation",
        "Equity Capitalization",
        "Provisioning",
        "Asset Structure",
        "Market Position",
        "Growth"
      ],
      "associationText": "The profile associates depending on available data: current value, annual evolution, history, CAGR, benchmark, mean and median, percentile, quartile, rank and market share."
    },
    "compare": {
      "title": "Compare a bank to its true environment",
      "text": "A relevant comparison is not just about comparing all banks together. ABIX Data Explorer allows contextualizing results and building more relevant peer groups.",
      "axes": [
        { "title": "Market", "body": "Overall positioning against the entire Algerian banking sector." },
        { "title": "Status / Category", "body": "Homogeneous comparison between public and private banks." },
        { "title": "Size", "body": "Grouping by asset volume to compare comparable players." },
        { "title": "Asset Profile", "body": "Contextualization by balance sheet structure and orientation." },
        { "title": "Peer Group", "body": "Custom group building when data allows." }
      ],
      "strongMessage": "Performance only makes sense when placed in context.",
      "disclaimer": "Benchmarks and comparative analyses in ABIX Data Explorer are provided as financial analysis tools. They do not constitute regulatory ratings or credit ratings."
    },
    "marketShares": {
      "title": "Who is really gaining ground?",
      "text": "A bank can show positive growth while losing market share. ABIX distinguishes absolute growth, relative position and contribution to sector dynamics.",
      "strongMessage": "Growing doesn't necessarily mean gaining ground.",
      "kpis": [
        { "title": "Market share", "desc": "Calculated on main aggregates" },
        { "title": "Gain or loss", "desc": "Share evolution in percentage points" },
        { "title": "Contribution", "desc": "Bank's share in sector growth" },
        { "title": "Growth gap", "desc": "Relative performance vs market average" }
      ],
      "bullets": [
        "Market share",
        "Rank",
        "Gap to leader",
        "Market share gain/loss",
        "Relative share evolution",
        "Contribution to sector growth",
        "Growth gap with market",
        "Rank evolution"
      ]
    },
    "concentration": {
      "title": "Measure banking market concentration",
      "text": "Track the evolution of leaders' weight and the transformation of the market's competitive structure.",
      "kpis": [
        { "title": "CR1, CR3, CR5, CR10", "desc": "Cumulative weight of the largest sector players." },
        { "title": "HHI (Herfindahl-Hirschman)", "desc": "Internationally referenced concentration index." },
        { "title": "Effective number of banks", "desc": "Indicator of true market player diversity." },
        { "title": "Cumulative key players", "desc": "Number of banks needed to reach 50%, 75% or 90% of the market." }
      ]
    },
    "advancedAnalyses": {
      "title": "Go beyond tables and rankings",
      "items": [
        {
          "title": "Heatmaps",
          "body": "Quickly identify performance, growth and structure gaps."
        },
        {
          "title": "Strategic matrices",
          "body": "Cross key dimensions: Size × Profitability, Growth × Profitability, Intermediation × Profitability, Credit × Treasury, Provisioning × Profitability, NBI Growth × Efficiency."
        },
        {
          "title": "Momentum",
          "body": "Identify accelerations, decelerations and trajectory shifts."
        },
        {
          "title": "Rank history",
          "body": "Observe progressions, declines and stability of a bank's positioning."
        },
        {
          "title": "Outliers",
          "body": "Detect observations requiring further investigation."
        }
      ]
    },
    "fourDimensions": {
      "title": "Four dimensions to understand a bank's profile",
      "strongMessage": "ABIX Data Explorer does not produce an official overall score. Dimensions are kept separate to preserve financial information and avoid a single average masking very different profiles.",
      "disclaimer": "These dimensions and analyses are provided for comparative and methodological purposes. They should never be interpreted as a credit rating, regulatory rating, official solvency measure, or probability of default.",
      "items": [
        {
          "title": "Profitability",
          "body": "The bank's ability to turn its activity and resources into profit."
        },
        {
          "title": "Growth",
          "body": "Development dynamics over several fiscal years."
        },
        {
          "title": "Efficiency",
          "body": "Operational mastery and operating income conversion capacity."
        },
        {
          "title": "Equity Capitalization",
          "body": "Relative position of equity in the balance sheet and credit structure."
        }
      ]
    },
    "executiveDashboard": {
      "title": "From data to executive message",
      "text": "ABIX Data Explorer automatically highlights evolutions deserving decision-maker attention.",
      "alerts": [
        "Net income decline",
        "Significant increase in provisioning",
        "Divergence between deposit and credit growth",
        "NBI up but net income down",
        "Assets up but RoE down",
        "Significant cost-to-income ratio shift",
        "Position or quartile changes"
      ],
      "traceabilityTitle": "Explainable and traceable findings",
      "traceabilityText": "Findings rely on deterministic, versioned analytical rules. Each message can be traced back to the data and analysis that triggered it."
    },
    "personas": {
      "title": "Designed for those who must understand the banking market",
      "items": [
        {
          "title": "General Management",
          "body": "Quickly identify important evolutions and the bank's positioning."
        },
        {
          "title": "Finance Department",
          "body": "Analyse profitability, efficiency, growth, balance sheet structure and capitalization."
        },
        {
          "title": "Strategy Department",
          "body": "Track market shares, competitors, trajectories and position changes."
        },
        {
          "title": "Financial Analysts",
          "body": "Explore data, ratios, histories and comparisons."
        },
        {
          "title": "Credit & Counterparty",
          "body": "Prepare the financial context of a bank before a fuller prudential and qualitative analysis."
        },
        {
          "title": "Consulting & Research",
          "body": "Quickly produce structured comparative analyses of the Algerian banking market."
        }
      ]
    },
    "methodology": {
      "title": "Analyses designed to be verifiable",
      "cta": "Discover the methodology",
      "items": [
        {
          "title": "Versioned data",
          "body": "Organized by bank, indicator, year and edition."
        },
        {
          "title": "Rigorous missing data handling",
          "body": "Absent data remains N/A and is never automatically treated as zero."
        },
        {
          "title": "Centralized calculations",
          "body": "Ratios, CAGRs, market shares, percentiles and benchmarks rely on homogeneous rules."
        },
        {
          "title": "Traceability",
          "body": "Results can be linked to their analytical source and parameters."
        }
      ]
    },
    "limitations": {
      "title": "A comparative analysis tool, not a prudential rating",
      "text": "ABIX Data Explorer provides comparative financial analysis based on available data. It does not replace a full credit analysis, regulatory prudential ratios, or information on asset quality and regulatory liquidity when not publicly available. This reinforces the product's methodological credibility."
    },
    "pricing": {
      "title": "Choose the access suited to your needs",
      "cta": "Choose this offer"
    },
    "finalCta": {
      "title": "Banking data shouldn't just be viewed. It should be explored.",
      "text": "With ABIX Data Explorer, move from raw numbers to comparison, from ranking to trajectory, and from data to market understanding.",
      "ctaOffers": "View Offers",
      "ctaApp": "Access ABIX Data Explorer"
    },
    "promoHome": {
      "title": "Discover ABIX Data Explorer",
      "text": "The study brings you the analysis. Data Explorer lets you explore the data yourself.",
      "cta": "Discover ABIX Data Explorer",
      "bullets": [
        "Analyse banks",
        "Compare performances",
        "Track market shares"
      ]
    }
  }
};

const arData = {
  "_meta": {
    "lang": "ar",
    "status": "published",
    "note": "الترجمة العربية الرسمية لـ Algeria Banking Index"
  },
  "site": {
    "name": "ABIX",
    "fullName": "Algeria Banking Index",
    "publisher": "تاجدين وشركاؤه",
    "tagline": "دراسات ومقارنات مرجعية وتحليلات استراتيجية للقطاع المصرفي الجزائري",
    "copyright": "© 2025 تاجدين وشركاؤه. جميع الحقوق محفوظة."
  },
  "nav": {
    "home": "الرئيسية",
    "editions": "الإصدارات",
    "edition2026": "إصدار 2026",
    "edition2025": "إصدار 2025",
    "study": "الدراسة",
    "barometer2026": "مؤشر الخدمات المصرفية 2026",
    "methodology": "المنهجية",
    "abixIndex": "مشروع ABIX",
    "dataExplorer": "ABIX Data Explorer",
    "services": "الخدمات",
    "rankings": "التصنيفات",
    "banks": "البنوك",
    "about": "من نحن",
    "contact": "اتصل بنا",
    "questionnaire": "مؤشر 2026",
    "ctaStudy": "الحصول على الدراسة",
    "ctaNotify": "الإخطار بصدور إصدار 2026",
    "langSelectLabel": "اللغة"
  },
  "home": {
    "meta": {
      "title": "Algeria Banking Index | دراسات القطاع المصرفي الجزائري",
      "description": "تنشر Algeria Banking Index دراسات ومقارنات مرجعية وتحليلات استراتيجية مخصصة للبنوك العاملة في الجزائر. اكتشف وسجّل اشتراكك المسبق في إصدار 2026."
    },
    "hero": {
      "pretitle": "دراسات وتحليلات استراتيجية للقطاع المصرفي",
      "title": "Algeria Banking Index",
      "signature": "دراسات ومقارنات مرجعية وتحليلات استراتيجية للقطاع المصرفي الجزائري",
      "badge": "الاشتراك المسبق مفتوح — سعر تفضيلي حتى 31 أغسطس 2026",
      "subtitle": "ABIX هي العلامة التحريرية التي أنشأتها تاجدين وشركاؤه لنشر دراسات مستقلة ومقارنات مرجعية وتحليلات استراتيجية مخصصة للقطاع المصرفي الجزائري.",
      "subtitleParagraph2": "يحلل إصدار 2026 أداء 21 بنكاً عاملاً في الجزائر خلال الفترة 2024-2025، مع استعراض اتجاهات 2023-2025. يجمع بين البيانات المالية والمؤشرات التشغيلية والمقارنات المرجعية والديناميات التنافسية وآخر المستجدات في الاستخدام المصرفي.",
      "ctaPreorder": "الاشتراك في إصدار 2026",
      "ctaPrimary": "الاشتراك في إصدار 2026",
      "ctaNotify": "تلقي أخبار إصدار 2026",
      "ctaSynthesis": "استلام الملخص التنفيذي",
      "ctaPresentation": "طلب عرض تقديمي",
      "ctaBenchmark": "الحصول على مقارنة مرجعية مخصصة",
      "ctaDiscover2025": "اكتشف إصدار 2025",
      "badgeBanks": "تحليل 21 بنكاً",
      "badgeComparative": "مقارنة 2024-2025",
      "badgeTrends": "اتجاهات 2023-2025",
      "badgeIndicators": "مؤشرات تشغيلية جديدة",
      "publisherMention": "منشور من تاجدين وشركاؤه"
    },
    "covers": {
      "badge2026": "إصدار جديد",
      "badge2025": "الإصدار السابق",
      "cover2026Title": "إصدار 2026",
      "cover2026Subtitle": "دراسة مقارنة 2024-2025",
      "cover2026Trends": "مع تحليل اتجاهات 2023-2025",
      "cover2026Status": "صدور قريباً",
      "cover2025Title": "إصدار 2025",
      "cover2025Subtitle": "البيانات المالية 2023-2024",
      "cover2025Status": "الإصدار السابق متاح"
    },
    "earlyBird": {
      "badge": "عرض الاشتراك المسبق — حتى 31 أغسطس 2026",
      "title": "اشترك في إصدار 2026 بسعر تفضيلي",
      "subtitle": "استفد من خصم 10% على أي اشتراك مسجّل قبل 31 أغسطس 2026. الدراسة في مرحلة الإنجاز وستُسلَّم للمشتركين فور نشرها.",
      "reassurance": [
        "السعر التفضيلي محفوظ للاشتراكات المسبقة قبل 31 أغسطس 2026",
        "تسليم الدراسة الكاملة فور نشرها",
        "الوصول إلى المستندات المقابلة للعرض المشترَك"
      ],
      "ctaPrimary": "الاشتراك في إصدار 2026",
      "ctaSecondary": "مشاهدة المحتوى المتوقع لإصدار 2026",
      "disclaimer": "العرض مخصص للاشتراكات المسبقة المسجلة قبل 31 أغسطس 2026.",
      "priceDefaultLabel": "سعر الاشتراك المسبق",
      "specialOffer": "عرض خاص للاشتراك المسبق",
      "validityText": "صالح حتى 31 أغسطس 2026 الساعة 23:59",
      "countdownText": "ينتهي السعر التفضيلي خلال",
      "days": "أيام",
      "hours": "ساعات",
      "minutes": "دقائق",
      "seconds": "ثوانٍ",
      "viewDetails": "عرض تفاصيل الباقات الثلاث (الأساسية، الاحترافية، المؤسسية)",
      "syntheticViewTitle": "أسعار وباقات 2026 — ملخص عام",
      "viewFullComparison": "عرض المقارنة التفصيلية لمحتوى باقات 2026"
    },
    "stats": {
      "label2025": "إصدار 2025 متاح",
      "labelPeriod": "البيانات المحللة",
      "labelBanks": "البنوك المغطاة (2025)",
      "labelPages": "صفحات التحليل (2025)",
      "value2025": "متاح",
      "valuePeriod": "2023-2024",
      "valueBanks": "20",
      "valuePages": "104"
    },
    "edition2026Teaser": {
      "title": "إصدار 2026 — دراسة مقارنة 2024-2025",
      "status": "النشر المتوقع في سبتمبر 2026 — التحليلات والإضافات التحريرية قيد الإنجاز.",
      "description": "سيغطي الإصدار القادم 21 بنكاً عاملاً في الجزائر مع تحليل أداء 2024-2025 واتجاهات 2023-2025.",
      "ctaNotify": "الإخطار عند الصدور",
      "disclaimer": "سيتم إخطار المشتركين فور صدور الدراسة."
    },
    "advisory": {
      "title": "تجاوز حدود الدراسة",
      "body": "هل تحتاج إلى تحليل مخصص لمؤسستك؟ يمكن لخبراء تاجدين وشركاؤه تحويل بيانات ABIX إلى تشخيص وتوصيات وخارطة طريق.",
      "cta": "طلب تشخيص مخصص"
    },
    "edition2025Preview": {
      "title": "إصدار 2025 متاح",
      "subtitle": "البيانات المالية 2023-2024 · 104 صفحة · 20 بنكاً",
      "body": "إصدار ABIX 2025 متاح للطلب. يغطي البيانات المالية المنشورة لـ 20 بنكاً عاملاً في الجزائر للسنتين الماليتين 2023 و2024.",
      "cta": "اكتشف إصدار 2025"
    },
    "methodology": {
      "title": "منهجية صارمة وشفافة",
      "body": "تعتمد Algeria Banking Index على تحليل مبني على البيانات المالية والتشغيلية للمؤسسات. قد تتضمن البيانات التاريخية إعادة التصنيف والمعالجات التي تنشرها المؤسسات لاحقاً لضمان اتساق المقارنات.",
      "cta": "معرفة المزيد عن المنهجية"
    }
  },
  "edition2026": {
    "meta": {
      "title": "إصدار 2026 — Algeria Banking Index",
      "description": "دراسة مقارنة 2024-2025 مع تحليل اتجاهات 2023-2025 للقطاع المصرفي الجزائري. 21 بنكاً تحت المجهر. اشتراك مسبق."
    },
    "hero": {
      "badge": "الاشتراك المسبق مفتوح — سعر تفضيلي حتى 31 أغسطس 2026",
      "title": "دراسة القطاع المصرفي الجزائري — إصدار 2026",
      "subtitle": "دراسة مقارنة 2024-2025 مع تحليل اتجاهات 2023-2025",
      "status": "النشر المتوقع في سبتمبر 2026 — التحليلات والإضافات التحريرية قيد الإنجاز.",
      "description": "سيقدم إصدار 2026 قراءة معمّقة لتحولات القطاع المصرفي الجزائري من خلال تحليل 21 مؤسسة. سيجمع بين الأداء المالي 2024-2025 واتجاهات 2023-2025 والمقارنات بين القطاعين العام والخاص وحصص السوق والمقارنات المرجعية والتحليلات الفردية وبيانات البنود خارج الميزانية والعمالة والشبكة المصرفية، فضلاً عن جزء جديد مخصص لتجربة مستخدمي الخدمات المصرفية — التطبيق المحمول والخدمات المصرفية عبر الإنترنت وخدمات الفروع.\n\nستُثري الدراسة أيضاً آراء المسؤولين ومساهمات الخبراء، رهناً بالتأكيد التحريري.",
      "disclaimerNoBanks": "21 بنكاً مغطى في السوق المصرفية الجزائرية.",
      "disclaimerNoDate": "البيانات المالية المرجعية موحّدة. تشمل الأعمال الجارية التحليلات المقارنة والبيانات التشغيلية ومؤشر الخدمات المصرفية والمساهمات التحريرية.",
      "ctaPreorder": "الاشتراك في إصدار 2026",
      "ctaNotify": "الإخطار عند الصدور"
    },
    "forecast": {
      "title": "المحتوى المتوقع لإصدار 2026",
      "subtitle": "تحليل شامل للفترة الثلاثية 2023-2025",
      "items": [
        {
          "title": "التطور الثلاثي 2023-2025",
          "body": "حصيلة شاملة لديناميات منح القروض وجمع الودائع ونسب السيولة عبر 3 سنوات مالية."
        },
        {
          "title": "تشخيص فردي بنكاً ببنك",
          "body": "بطاقات تحليل تفصيلية تغطي كافة المؤسسات العامة والخاصة ضمن النطاق المحدد."
        },
        {
          "title": "مقارنات مرجعية قطاعية",
          "body": "الموقع النسبي للمؤسسات حسب مؤشرات الربحية (RoE، RoA، صافي الدخل المصرفي، نتيجة الاستغلال)."
        },
        {
          "title": "تحليلات استشرافية وتنظيمية",
          "body": "قراءة وقائعية للتطورات الاحترازية والاستراتيجية في السوق المصرفية الجزائرية."
        }
      ]
    },
    "pricing": {
      "sectionTitle": "عرض الاشتراك المسبق — إصدار 2026",
      "sectionSubtitle": "اشترك قبل 31 أغسطس 2026 واستفد من خصم 10% على السعر العام لإصدار 2026. تُسلَّم الدراسة فور نشرها.",
      "earlyBirdBadge": "-10% حتى 31 أغسطس",
      "validityMention": "سعر الاشتراك المسبق ساري حتى 31 أغسطس 2026",
      "popularBadge": "الأكثر شعبية",
      "regularPriceStruckLabel": "السعر العام",
      "earlyBirdPriceLabel": "سعر الاشتراك المسبق",
      "savingLabel": "وفّر",
      "ctaBeforeDeadline": "اشترك",
      "ctaAfterAvailable": "اطلب",
      "ctaAfterPreorder": "طلب حجز",
      "webinarNotice": "ندوة تقديمية لإصدار 2026 — مفتوحة بالتسجيل",
      "essential": {
        "title": "الباقة الأساسية",
        "tagline": "افهم السوق",
        "userLicensesText": "مستخدم واحد · PDF آمن",
        "regularPrice": "84,000 دج بدون ضريبة",
        "earlyBirdPrice": "75,600 دج بدون ضريبة",
        "saving": "وفّر 8,400 دج بدون ضريبة",
        "cta": "الاشتراك في الباقة الأساسية",
        "ctaAfterAvailable": "طلب الباقة الأساسية",
        "ctaAfterPreorder": "طلب حجز",
        "f1": "الدراسة الكاملة لإصدار 2026 بصيغة PDF آمنة",
        "f2": "تحليل موحّد للقطاع المصرفي",
        "f3": "مقارنة بين البنوك العامة والخاصة",
        "f4": "تحليل فردي للبنوك المغطاة",
        "f5": "تصنيفات ومقارنات مرجعية بالمؤشر",
        "f6": "ترخيص فردي لمستخدم واحد",
        "features": [
          "الدراسة الكاملة لإصدار 2026 بصيغة PDF آمنة",
          "تحليل موحّد للقطاع المصرفي",
          "مقارنة بين البنوك العامة والخاصة",
          "تحليل فردي للبنوك المغطاة",
          "تصنيفات ومقارنات مرجعية بالمؤشر",
          "ترخيص فردي لمستخدم واحد"
        ]
      },
      "pro": {
        "title": "الباقة الاحترافية",
        "tagline": "استثمر البيانات",
        "badge": "الأكثر شعبية",
        "userLicensesText": "حتى 3 مستخدمين · بيانات Excel مضمّنة",
        "regularPrice": "120,000 دج بدون ضريبة",
        "earlyBirdPrice": "108,000 دج بدون ضريبة",
        "saving": "وفّر 12,000 دج بدون ضريبة",
        "cta": "الاشتراك في الباقة الاحترافية",
        "ctaAfterAvailable": "طلب الباقة الاحترافية",
        "ctaAfterPreorder": "طلب حجز",
        "f1": "كل مميزات الباقة الأساسية",
        "f2": "ملف Excel منظّم بالبيانات",
        "f3": "جداول مقارنة تفصيلية",
        "f4": "بيانات تاريخية 2023-2025",
        "f5": "نسب وحصص السوق",
        "f6": "حتى 3 مستخدمين من نفس المؤسسة",
        "features": [
          "كل مميزات الباقة الأساسية",
          "ملف Excel منظّم بالبيانات",
          "جداول مقارنة تفصيلية",
          "بيانات تاريخية 2023-2025",
          "نسب وحصص السوق",
          "حتى 3 مستخدمين من نفس المؤسسة"
        ]
      },
      "corporate": {
        "title": "الباقة التنفيذية المؤسسية",
        "tagline": "استكشف البيانات وشاركها",
        "userLicensesText": "حتى 20 مستخدماً · عرض تنفيذي PowerPoint مضمّن",
        "regularPrice": "180,000 دج بدون ضريبة",
        "earlyBirdPrice": "162,000 دج بدون ضريبة",
        "saving": "وفّر 18,000 دج بدون ضريبة",
        "cta": "الاشتراك في الباقة التنفيذية المؤسسية",
        "ctaAfterAvailable": "طلب الباقة التنفيذية المؤسسية",
        "ctaAfterPreorder": "طلب حجز",
        "f1": "كل مميزات الباقة الاحترافية",
        "f2": "عرض تنفيذي للدراسة",
        "f3": "جلسة شرح مع الخبراء",
        "f4": "مقارنة مرجعية مخصصة",
        "f5": "حتى 20 مستخدماً من نفس المؤسسة",
        "features": [
          "كل مميزات الباقة الاحترافية",
          "عرض تنفيذي للدراسة",
          "جلسة شرح مع الخبراء",
          "مقارنة مرجعية مخصصة",
          "حتى 20 مستخدماً من نفس المؤسسة"
        ]
      }
    },
    "preorderForm": {
      "title": "استمارة الاشتراك المسبق",
      "subtitle": "استفد من خصم 10% على جميع الاشتراكات المسجلة قبل 31 أغسطس 2026.",
      "labelCompany": "الشركة / المؤسسة",
      "labelFullName": "الاسم الكامل",
      "labelFirstName": "الاسم",
      "labelLastName": "اللقب",
      "labelTitle": "المنصب",
      "labelOrg": "البنك أو المؤسسة",
      "labelEmail": "البريد الإلكتروني",
      "labelEmailHint": "يُنصح بالبريد المهني",
      "labelPhone": "الهاتف",
      "labelCountry": "الدولة",
      "labelPack": "العرض المختار",
      "packOptions": {
        "essential": "الباقة الأساسية (75,600 دج مسبق / 84,000 دج)",
        "pro": "الباقة الاحترافية (108,000 دج مسبق / 120,000 دج)",
        "corporate": "الباقة التنفيذية المؤسسية (162,000 دج مسبق / 180,000 دج)"
      },
      "labelUserCount": "عدد المستخدمين",
      "labelProforma": "فاتورة مبدئية",
      "proformaOption": "طلب فاتورة مبدئية",
      "labelAddons": "الاهتمام بخدمات مخصصة",
      "addonOptions": {
        "presentation": "عرض تنفيذي أمام مجلس الإدارة",
        "benchmark": "مقارنة مرجعية مؤسسية مخصصة"
      },
      "labelTermsConsent": "أقرّ بأن إصدار 2026 في مرحلة الإنجاز وسيُسلَّم فور نشره.",
      "labelTermsAccept": "أوافق على الشروط والأحكام",
      "labelPrivacyConsent": "اطلعت على سياسة الخصوصية وأوافق على معالجة بياناتي.",
      "privacyModalTitle": "سياسة الخصوصية — تاجدين وشركاؤه",
      "privacyNotice": "تُعالج تاجدين وشركاؤه بياناتك الشخصية وفقاً لسياسة الخصوصية.",
      "submit": "الاشتراك في إصدار 2026",
      "submitReservation": "الاشتراك بالسعر التفضيلي",
      "submitting": "جارٍ الإرسال…",
      "successTitle": "تم تسجيل الاشتراك بنجاح",
      "successMessage": "شكراً لك. تم تسجيل اشتراكك في إصدار 2026.",
      "errorMessage": "حدث خطأ أثناء تسجيل اشتراكك. يرجى المحاولة مجدداً.",
      "successBody": "تم تسجيل اشتراكك المسبق. سيتصل بك مستشار من تاجدين وشركاؤه خلال 48 ساعة عمل.",
      "fallbackNote": "معالجة مباشرة خلال 48 ساعة عمل."
    },
    "notify": {
      "title": "الإخطار دون الاشتراك فوراً",
      "body": "إذا كنت تفضل عدم الاشتراك الآن، سجّل بريدك الإلكتروني لتلقي تنبيه بسيط عند صدور الدراسة.",
      "labelFirstName": "الاسم",
      "labelLastName": "اللقب",
      "labelTitle": "المنصب",
      "labelOrg": "البنك أو المؤسسة",
      "labelEmail": "البريد الإلكتروني",
      "labelEmailHint": "يُنصح بالبريد المهني",
      "labelPhone": "الهاتف (اختياري)",
      "labelCountry": "الدولة",
      "labelInterest": "طبيعة الاهتمام",
      "interestOptions": {
        "banking_executive": "مسؤول مصرفي",
        "investor": "مستثمر",
        "analyst": "محلل مالي",
        "researcher": "طالب / باحث",
        "press": "صحافة وإعلام",
        "other": "أخرى"
      },
      "submit": "التسجيل والإخطار",
      "successTitle": "تم التسجيل بنجاح",
      "successBody": "ستتلقى إشعاراً عند صدور إصدار 2026.",
      "fallbackNote": "ستتم معالجة طلبك خلال 48 ساعة عمل."
    },
    "advisory": {
      "title": "تجاوز حدود الدراسة",
      "body": "هل تحتاج إلى تحليل مخصص لمؤسستك؟ يمكن لخبراء تاجدين وشركاؤه تحويل بيانات ABIX إلى تشخيص وتوصيات وخارطة طريق.",
      "cta": "طلب تشخيص مخصص"
    },
    "faq": {
      "title": "الأسئلة الشائعة",
      "subtitle": "كل ما تحتاج معرفته عن إصدار 2026.",
      "items": [
        {
          "q": "متى سيُنشر إصدار 2026؟",
          "a": "من المتوقع صدور إصدار 2026 من Algeria Banking Index في سبتمبر 2026.\n\nسيتم إخطار المشتركين فور توفر الدراسة."
        },
        {
          "q": "ما نطاق إصدار 2026؟",
          "a": "سيغطي إصدار 2026 نحو 21 بنكاً عاملاً في الجزائر. وسيركز أساساً على مقارنة أداء 2024-2025، مع تحليل للاتجاهات المرصودة خلال الفترة 2023-2025."
        },
        {
          "q": "ما الذي ستتضمنه دراسة 2026؟",
          "a": "ستقدم الدراسة تحليلاً موحّداً للقطاع المصرفي الجزائري، ومقارنات بين البنوك العامة والخاصة، وتحليلات فردية للـ 21 مؤسسة، وتصنيفات ومقارنات مرجعية بالمؤشر.\n\nسيُثرى هذا الإصدار أيضاً بإضاءات جديدة حول البنود خارج الميزانية والعمالة والشبكة المصرفية والأداء التشغيلي.\n\nكما سيتضمن جزءاً مخصصاً لتجربة مستخدمي الخدمات المصرفية — التطبيق المحمول والخدمات عبر الإنترنت وخدمات الفروع — من خلال مؤشر ABIX 2026."
        },
        {
          "q": "ما الضمانات التي يوفرها الاشتراك المسبق؟",
          "a": "يتيح لك الاشتراك المسبق حجز إصدار 2026 قبل نشره والاستفادة من سعر تفضيلي بخصم 10%.\n\nعند النشر، تُوضع المستندات المقابلة للباقة المشترَكة تحت تصرف المشترك."
        },
        {
          "q": "هل السعر التفضيلي مضمون؟",
          "a": "نعم. كل اشتراك مسجَّل في موعد أقصاه 31 أغسطس 2026 الساعة 23:59 بتوقيت الجزائر يستفيد من سعر الاشتراك المسبق.\n\nيظل هذا السعر مضموناً حتى تسليم الدراسة."
        },
        {
          "q": "ما مستويات العروض المتاحة؟",
          "a": "تتوفر ثلاثة عروض:\n\nالباقة الأساسية:\n- الدراسة الكاملة بصيغة PDF;\n- التحليلات القطاعية;\n- التحليلات الفردية للبنوك;\n- التصنيفات والمقارنات المرجعية;\n- ترخيص لمستخدم واحد.\n\nالباقة الاحترافية:\n- كل مميزات الباقة الأساسية;\n- قاعدة بيانات Excel;\n- جداول مقارنة تفصيلية;\n- بيانات تاريخية 2023-2025;\n- نسب وحصص السوق;\n- حتى 3 مستخدمين من نفس المؤسسة.\n\nالباقة التنفيذية المؤسسية:\n- كل مميزات الباقة الاحترافية;\n- عرض تنفيذي;\n- جلسة شرح مع الخبراء;\n- مقارنة مرجعية مخصصة;\n- حتى 20 مستخدماً من نفس المؤسسة."
        },
        {
          "q": "هل يمكنني الحصول على فاتورة مبدئية؟",
          "a": "نعم. بناءً على الطلب، يمكن لتاجدين وشركاؤه إصدار فاتورة مبدئية للباقة المختارة لتسهيل إجراءات الطلب الداخلية للمؤسسة."
        },
        {
          "q": "هل يمكنني الاشتراك لعدة مستخدمين؟",
          "a": "نعم.\n\nتتيح الباقة الاحترافية الوصول لـ 3 مستخدمين من نفس المؤسسة.\n\nتتيح الباقة التنفيذية المؤسسية الوصول لـ 20 مستخدماً من نفس المؤسسة."
        },
        {
          "q": "هل بيانات 2024 مطابقة لتلك الواردة في الإصدار السابق؟",
          "a": "ليس بالضرورة.\n\nأعادت بعض البنوك تصنيف أو إعادة معالجة بعض البنود المالية في منشوراتها اللاحقة.\n\nلضمان أفضل اتساق ممكن مع بيانات 2025، يعتمد إصدار 2026 أحدث بيانات 2024 المعدّلة المتاحة.\n\nلذلك تحل هذه البيانات، عند الاقتضاء، محل تلك المستخدمة في الإصدار السابق."
        },
        {
          "q": "هل سيؤثر مؤشر الخدمات المصرفية على النتائج المالية أو تصنيفات البنوك؟",
          "a": "لا.\n\nيُعدّ مؤشر الخدمات المصرفية جزءاً مستقلاً مخصصاً لتجربة ورضا مستخدمي الخدمات المصرفية — التطبيق المحمول والخدمات عبر الإنترنت وخدمات الفروع.\n\nنتائجه لا تُعدِّل البيانات المالية للمؤسسات.\n\nستُعرض بشكل منفصل مع وصف للمنهجية المستخدمة ومعلومات تتيح تقييم تمثيلية الاستطلاع."
        },
        {
          "q": "هل ستُعطي الدراسة الكلمة للبنوك والخبراء؟",
          "a": "يُخطَّط لإصدار 2026 أيضاً استضافة مساهمات من مسؤولين وخبراء، رهناً بالتأكيد التحريري.\n\nستُميَّز هذه المساهمات بوضوح عن التحليل التحريري لـ Algeria Banking Index.\n\nلن تتدخل في حساب المؤشرات ولا في التصنيفات ولا في الاستنتاجات المستقلة للدراسة."
        },
        {
          "q": "هل يشمل اشتراك 2026 إصدار 2025؟",
          "a": "لا.\n\nيظل إصدار 2025 منشوراً مستقلاً ويمكن اقتناؤه بشكل منفصل.\n\nبالنسبة للمؤسسات التي ترغب في الحصول على إصداري 2025 و2026، يمكن إعداد عرض مشترك عند الطلب."
        },
        {
          "q": "ماذا يحدث إذا تغير تاريخ النشر؟",
          "a": "سيتم إخطار المشتركين بأي تغيير في جدول النشر.\n\nيظل الاشتراك ساري المفعول ويبقى السعر التفضيلي المحصّل قبل 31 أغسطس 2026 مضموناً."
        },
        {
          "q": "هل يمكنني طلب عرض تقديمي أو مقارنة مرجعية مخصصة؟",
          "a": "نعم.\n\nتتضمن الباقة التنفيذية المؤسسية جلسة شرح ومقارنة مرجعية مخصصة.\n\nيمكن أيضاً اقتراح خدمات إضافية، كعرض أمام مجلس الإدارة أو تحليل معمّق، بشكل منفصل وفقاً لاحتياجات المؤسسة."
        }
      ]
    }
  },
  "edition2025": {
    "meta": {
      "title": "إصدار 2025 — Algeria Banking Index",
      "description": "يحلل إصدار ABIX 2025 الأداء المالي لـ 20 بنكاً جزائرياً للسنتين الماليتين 2023 و2024. متاح في 3 باقات."
    },
    "alert2026": "إصدار 2026 قيد الإعداد.",
    "alert2026Cta": "اكتشف إصدار 2026",
    "hero": {
      "badge": "متاح",
      "title": "إصدار 2025",
      "subtitle": "البيانات المالية 2023-2024 · 104 صفحة · 20 بنكاً",
      "body": "يغطي إصدار ABIX 2025 البيانات المالية المنشورة لـ 20 بنكاً عاملاً في الجزائر للسنتين الماليتين 2023 و2024.",
      "ctaPrimary": "الحصول على إصدار 2025",
      "ctaPreview": "مشاهدة العرض المجاني"
    },
    "pricing": {
      "title": "اختر باقتك",
      "subtitle": "خيارات مصممة لتلبية احتياجاتك التحليلية والرقابية والاستراتيجية.",
      "popular": "الأكثر شعبية",
      "ctaOrder": "اطلب",
      "paymentNote": "دفع آمن · EUR و DZD مقبولان · الوصول بعد معالجة الطلب"
    },
    "methodology": {
      "tabs": {
        "methodology": "منهجية الدراسات",
        "content": "المحتوى",
        "sample": "العينة"
      },
      "body": "اكتشف نهج الجمع والتوحيد والتحليل لدراسات Algeria Banking Index.",
      "cta": "معرفة المزيد عن المنهجية"
    },
    "challenges": {
      "title": "تحديات قادة البنوك",
      "subtitle": "بدون بيانات موثوقة ومقارنات مرجعية، تظل القرارات الاستراتيجية هشّة.",
      "items": [
        {
          "title": "نقص البيانات المحلية",
          "body": "التقارير الدولية لا تعكس خصوصيات السوق المصرفية الجزائرية.",
          "stat": "70%",
          "statLabel": "من القرارات الاستراتيجية تُتخذ بدون بيانات مقارنة محلية موثوقة."
        },
        {
          "title": "تأخر اتخاذ القرار",
          "body": "غياب التحليلات القطاعية المقارنة يؤخر الخيارات الاستراتيجية.",
          "stat": "3 إلى 6 أشهر",
          "statLabel": "متوسط التأخر المرصود في التكيف مع الديناميات المصرفية الجديدة."
        },
        {
          "title": "سلبيات تنافسية",
          "body": "بدون رقابة قطاعية، يصعب التنبؤ بالمنافسة والتغييرات التنظيمية.",
          "stat": "−3.1 نقطة",
          "statLabel": "انخفاض نسبة القروض/الودائع في 2024، ما يوضح تراجع تمويل الاقتصاد."
        }
      ]
    },
    "benefits": {
      "title": "لماذا تُعدّ هذه الدراسة أساسية",
      "subtitle": "تحليلات حصرية تسلط الضوء على الديناميكية الحقيقية للقطاع المصرفي الجزائري.",
      "items": [
        {
          "title": "البيانات المالية الموحدة 2023/2024",
          "body": "قاعدة بيانات فريدة مستخرجة من الميزانيات المنشورة لـ 20 بنكاً تمثل السوق بأكمله تقريباً.",
          "points": [
            "النسب الرئيسية: القروض/الودائع، السيولة، الربحية",
            "تحليل مقارن بين القطاعين العام والخاص",
            "اتجاهات الودائع والقروض"
          ]
        },
        {
          "title": "تحليل تنافسي معمق",
          "body": "مقارنة مرجعية قطاعية غير سباقة لفهم نقاط القوة والضعف لكل فاعل.",
          "points": [
            "حصص السوق والتطور 2023 ← 2024",
            "تحليل فردي لـ 20 بنكاً (61 صفحة)",
            "مقارنات الأداء المرجعي"
          ]
        },
        {
          "title": "آفاق واستراتيجيات مستقبليّة",
          "body": "توقعات مبنية على التطورات الأخيرة ومؤكدة بالبيانات التنظيمية.",
          "points": [
            "توقعات إجمالي الميزانية والودائع والقروض",
            "الربحية المتوقعة وديناميكية RoE",
            "محاور التمايز الاستراتيجي"
          ]
        }
      ]
    },
    "faq": {
      "title": "الأسئلة الشائعة",
      "subtitle": "كل ما تحتاج معرفته عن إصدار 2025.",
      "items": [
        {
          "q": "ما المنهجية المستخدمة في هذه الدراسة؟",
          "a": "تستند الدراسة إلى تحليل معمّق لميزانيات البنوك والبيانات الرسمية التي تنشرها المؤسسات والسلطات التنظيمية. وتتضمن مقارنات بين القطاعين العام والخاص وتحليلات استشرافية."
        },
        {
          "q": "ما البنوك المغطاة في التحليل؟",
          "a": "تغطي الدراسة 20 بنكاً عاملاً في الجزائر، منها البنوك العامة (BEA، BNA، CPA، BADR، BDL)، وأبرز البنوك الخاصة (ABC Bank، Trust Bank Algeria، بنك البركة، Gulf Bank Algeria…)، فضلاً عن فروع المجموعات الدولية (BNP Paribas El Djazaïr، Société Générale Algérie، Natixis Algérie، AGB، HSBC Algeria، Calyon Algérie)."
        },
        {
          "q": "هل يمكنني استخدام هذه الدراسة للأعمال الداخلية؟",
          "a": "نعم. الباقة الأساسية مخصصة للاستخدام الفردي. وتمتد الباقة الاحترافية لتشمل حتى 3 مستخدمين من نفس المؤسسة. أما الباقة التنفيذية المؤسسية فتتيح لـ 20 مستخدماً الاستفادة وتشمل ملف PowerPoint تنفيذي."
        },
        {
          "q": "ما وتيرة تحديث الدراسة؟",
          "a": "يتضمن إصدار 2025 البيانات المالية المنشورة للسنتين الماليتين 2023 و2024. يصدر إصدار جديد كل سنة."
        },
        {
          "q": "ما سياستكم بشأن الوصول إلى الملفات؟",
          "a": "نظراً للطبيعة الرقمية للمنتوج، يُتاح الوصول بعد معالجة الطلب والدفع."
        }
      ]
    },
    "advisory": {
      "title": "تجاوز حدود الدراسة",
      "body": "هل تحتاج إلى تحليل مخصص لمؤسستك؟ يمكن لخبراء تاجدين وشركاؤه تحويل بيانات ABIX إلى تشخيص وتوصيات وخارطة طريق.",
      "cta": "طلب تشخيص مخصص"
    }
  },
  "methodology": {
    "meta": {
      "title": "منهجية الدراسات — Algeria Banking Index",
      "description": "اكتشف نهج جمع وتوحيد ومقارنة وتفسير البيانات المالية والتشغيلية والعامة المتعلقة بالقطاع المصرفي الجزائري."
    },
    "hero": {
      "title": "منهجية الدراسات",
      "subtitle": "نهج منظّم لجمع وتوحيد ومقارنة وتفسير البيانات المالية والتشغيلية والعامة المتعلقة بالقطاع المصرفي الجزائري.",
      "introText": "تعتمد دراسات Algeria Banking Index على الاستخدام المنهجي للمعلومات المتاحة للعموم وتوحيدها وتحليلها المقارن. والهدف هو توفير قراءة متسقة للأداء والتطورات والموقع التنافسي للمؤسسات المغطاة."
    },
    "disclaimerBox": {
      "title": "ما لا تُعدّه المنهجية",
      "p1": "لا تُعدّ التحليلات المنشورة تصنيفاً ائتمانياً ولا تصنيفاً احترازياً ولا شهادة ملاءة مالية ولا تدقيقاً للقوائم المالية ولا توصية بالاستثمار.",
      "p2": "تستند إلى المعلومات المتاحة للعموم ومنهجية مقارنة خاصة بدراسات Algeria Banking Index."
    },
    "approach": {
      "title": "نهجنا التحليلي في 6 خطوات",
      "description": "تعتمد دراسات Algeria Banking Index على جمع منظّم للمعلومات المتاحة للعموم، تليه أعمال التوحيد والتحقق من الاتساق والمقارنة والتفسير."
    },
    "revisions": {
      "title": "البيانات التاريخية والمراجعات",
      "p1": "قد تتغير البيانات التاريخية.",
      "p2": "قد تُعيد بعض البنوك تصنيف أو معالجة بعض البنود المتعلقة بالسنوات المالية السابقة في منشوراتها اللاحقة.",
      "p3": "عند نشر بيانات معدَّلة من قِبل المؤسسة، قد تستبدل Algeria Banking Index هذه البيانات بتلك المستخدمة في إصدار سابق لضمان اتساق السلاسل المقارنة.",
      "p4": "لذلك قد تختلف أرقام إصدار جديد أحياناً عن تلك الواردة في إصدار سابق دون أن يُعدّ ذلك بالضرورة خطأً."
    },
    "ebanking": {
      "title": "منهجية خاصة بمؤشر الخدمات المصرفية",
      "p1": "يُعدّ مؤشر الخدمات المصرفية جزءاً تكميلياً ومستقلاً عن التحليل المالي.",
      "p2": "يستند إلى استطلاع لمستخدمي الخدمات المصرفية لقياس مستوى رضاهم وتصورهم للخدمات التي تقدمها المؤسسات.",
      "p3": "تُعرض نتائج المؤشر بشكل منفصل عن المؤشرات المالية. ولا تتدخل في حساب النسب المالية ولا في التصنيفات القائمة على البيانات المحاسبية.",
      "p4": "سيُحدد نشر النتائج عدد المشاركين وفترة الجمع وتوزيع الإجابات والقيود المحتملة على التمثيلية."
    },
    "contributions": {
      "title": "المساهمات التحريرية",
      "p1": "قد تستضيف بعض الإصدارات مساهمات موقَّعة من مسؤولي البنوك أو الخبراء.",
      "p2": "هذه المساهمات مُميَّزة بوضوح ومستقلة عن التحليلات التي تُعدّها Algeria Banking Index.",
      "p3": "تعكس وجهات نظر أصحابها ولن تتدخل في الحسابات ولا في المقارنات ولا في الاستنتاجات المستقلة للدراسة."
    },
    "sources": {
      "title": "المصادر والقيود",
      "p1": "تُعدّ التحليلات استناداً إلى المعلومات المتاحة للعموم في تاريخ إغلاق كل إصدار.",
      "p2": "قد تتفاوت توافر المعلومات ومستوى تفصيلها وطريقة عرضها من مؤسسة إلى أخرى.",
      "p3": "عندما لا تكون بعض البيانات متاحة أو لا يمكن مقارنتها بشكل متجانس بما يكفي، قد تُستثنى من مؤشر معين أو تكون موضوع ملاحظة خاصة."
    }
  },
  "services": {
    "meta": {
      "title": "خدمات الاستشارة — تاجدين وشركاؤه",
      "description": "حوّل بيانات ABIX إلى تحليلات مخصصة لمؤسستك. مقارنة مرجعية وتشخيص أداء واستشارة استراتيجية."
    },
    "hero": {
      "title": "خدمات الاستشارة",
      "subtitle": "يدعم خبراء تاجدين وشركاؤه المؤسسات المصرفية والمالية في قراراتها الاستراتيجية.",
      "badge": "تاجدين وشركاؤه"
    },
    "advisory": {
      "title": "تجاوز حدود الدراسة",
      "body": "هل تحتاج إلى تحليل مخصص لمؤسستك؟ يمكن لخبراء تاجدين وشركاؤه تحويل بيانات ABIX إلى تشخيص وتوصيات وخارطة طريق.",
      "cta": "طلب تشخيص مخصص"
    },
    "offerings": [
      {
        "id": "benchmark",
        "title": "مقارنة مرجعية مخصصة",
        "body": "تحديد موقع مؤسستك بالنسبة لنظيراتها على المؤشرات الرئيسية: الربحية والسيولة والكفاءة التشغيلية وحصص السوق.",
        "cta": "طلب مقارنة مرجعية"
      },
      {
        "id": "diagnostic",
        "title": "تشخيص الأداء",
        "body": "تحليل معمّق للأداء المالي لمؤسستك وتحديد نقاط القوة والضعف وروافع التحسين.",
        "cta": "طلب تشخيص"
      },
      {
        "id": "comparative",
        "title": "تحليل مقارن مع النظيرات",
        "body": "مقارنة منظّمة مع مجموعة من البنوك المماثلة، مصمّمة وفقاً لملف مؤسستك.",
        "cta": "معرفة المزيد"
      },
      {
        "id": "presentation",
        "title": "عرض أمام مجلس الإدارة",
        "body": "ملخص تنفيذي وعرض نتائج أمام مجلس إدارتك، مكيَّف مع أولوياتك الاستراتيجية.",
        "cta": "طلب عرض تقديمي"
      },
      {
        "id": "strategy",
        "title": "الاستشارة الاستراتيجية والمرافقة",
        "body": "إعداد توصيات استراتيجية ومرافقة في تحديد خارطة طريق مؤسستك.",
        "cta": "طلب مرافقة"
      }
    ],
    "cta": {
      "title": "تواصل مع خبرائنا",
      "body": "كل مهمة استشارية مصمَّمة وفقاً لاحتياجات مؤسستك.",
      "primary": "طلب عرض سعر",
      "secondary": "معرفة المزيد عن تاجدين وشركاؤه"
    }
  },
  "abixIndex": {
    "meta": {
      "title": "مشروع مؤشر ABIX | Algeria Banking Index",
      "description": "اكتشف مشروع ABIX، مؤشر مقارن متعدد الأبعاد مستقبلي للبنوك العاملة في الجزائر، قيد التطوير والتحقق حالياً."
    },
    "hero": {
      "badge": "مشروع قيد التطوير والتحقق",
      "title": "ABIX — مؤشر مصرفي قيد التطوير",
      "subtitle": "مشروع مؤشر مقارن متعدد الأبعاد للأداء المصرفي في الجزائر",
      "intro": "تعمل تاجدين وشركاؤه على تطوير ABIX، مؤشر مقارن مستقبلي مصمَّم لتلخيص عدة أبعاد لأداء البنوك العاملة في الجزائر.",
      "introParagraph2": "هذا المشروع مستقل عن الدراسات القطاعية المنشورة حالياً تحت علامة Algeria Banking Index."
    },
    "objectivesTitle": "الأهداف المرتقبة للمؤشر المستقبلي",
    "objectives": [
      "توفير قراءة متعددة الأبعاد للأداء المصرفي",
      "تيسير المقارنات التركيبية بين المؤسسات",
      "تتبع تطورات الأداء عبر الزمن",
      "استكمال التحليلات التفصيلية للدراسات السنوية",
      "توفير إطار مرجعي قطاعي تركيبي"
    ],
    "dimensionsTitle": "الأبعاد الخمسة قيد الدراسة حالياً",
    "dimensions": [
      { "title": "الأداء المالي", "body": "العائد على حقوق الملكية (RoE)، العائد على الأصول (RoA)، صافي الدخل البنكي والنتيجة الإجمالية للاستغلال." },
      { "title": "الكفاءة التشغيلية", "body": "معامل الاستغلال وإنتاجية شبكة الفروع والتحكم في المصاريف العامة." },
      { "title": "النمو التجاري", "body": "ديناميكية منح القروض وجمع الودائع وتطور حصص السوق." },
      { "title": "المتانة المالية", "body": "مستوى حقوق الملكية وتغطية المخاطر وهيكل نسب السيولة." },
      { "title": "هيكل الأصول", "body": "تركيبة الميزانية وتوزيع الديون وجودة محفظة الأصول." }
    ],
    "warningTitle": "هام — مشروع قيد التطوير",
    "warning": "لا تزال المنهجية والمؤشرات والأوزان وطرق الحساب قيد الاختبار والتحقق. لا يُنشر حالياً أي تصنيف أو نقطة ABIX نهائية.",
    "cta": "الإخطار بإطلاق مؤشر ABIX"
  },
  "about": {
    "meta": {
      "title": "من نحن — ABIX | Algeria Banking Index",
      "description": "اكتشف ABIX، مؤشر Algeria Banking Index، وتاجدين وشركاؤه، المكتب الاستشاري وراء هذا المرجع في القطاع المصرفي الجزائري."
    },
    "hero": {
      "title": "نبذة عن ABIX",
      "subtitle": "Algeria Banking Index مبادرة من تاجدين وشركاؤه تهدف إلى تزويد صانعي القرار الجزائريين بمرجع تحليلي مستقل حول القطاع المصرفي."
    },
    "abix": {
      "title": "ما هو ABIX؟",
      "body": "ABIX — Algeria Banking Index — مؤشر ودراسة مقارنة سنوية للبنوك العاملة في الجزائر. يحلل الأداء المالي للمؤسسات استناداً إلى بياناتها المنشورة، بهدف تزويد المسؤولين والمحللين والمستثمرين بمرجع موضوعي ومنظَّم.\n\nلا يُعدّ ABIX تصنيفاً تنظيمياً أو احترازياً. بل هو أداة دعم للقرار مبنية على الشفافية والصرامة المنهجية."
    },
    "publisher": {
      "title": "تاجدين وشركاؤه",
      "body": "مكتب استشاري متخصص في مرافقة المؤسسات المصرفية والمالية الجزائرية، يُقدم تاجدين وشركاؤه خبرته في الاستراتيجية والأداء المالي والامتثال التنظيمي والتنمية المؤسسية.",
      "cta": "اكتشف خدماتنا"
    },
    "author": {
      "name": "السيد رشيد سكاك",
      "role": "خبير مصرفي",
      "bio": "متخصص في القطاع المصرفي الجزائري، يُسهم السيد رشيد سكاك بخبرته ومعرفته بالسوق في الإصدار السنوي لـ ABIX. يستند تحليله إلى قراءة معمّقة للبيانات المالية المنشورة ومعرفة ميدانية بالقطاع."
    }
  },
  "contact": {
    "meta": {
      "title": "اتصل بنا — ABIX | Algeria Banking Index",
      "description": "تواصل مع فريق ABIX وتاجدين وشركاؤه لأي استفسار: طلب الدراسة، عرض سعر الاستشارة، مقارنة مرجعية، شراكة، صحافة."
    },
    "hero": {
      "title": "تواصل معنا",
      "subtitle": "اختر موضوع طلبك للتوجيه إلى الجهة المختصة."
    },
    "forms": {
      "order": { "label": "طلب دراسة 2025", "description": "الوصول إلى استمارات طلب باقات Essentiel وPro وCorporate Executive." },
      "quote": { "label": "طلب عرض سعر استشاري", "description": "الحصول على عرض سعر لمهمة مقارنة مرجعية أو تشخيص أو مرافقة استراتيجية." },
      "benchmark": { "label": "مقارنة مرجعية مخصصة", "description": "طلب مقارنة مرجعية لمؤسستك بالنسبة لنظيراتها." },
      "partnership": { "label": "شراكة أو رعاية", "description": "استكشاف تعاون أو رعاية مع ABIX أو تاجدين وشركاؤه." },
      "press": { "label": "صحافة ومؤسسات", "description": "طلبات معلومات للصحفيين والباحثين والمؤسسات." }
    },
    "info": {
      "address": "حي ناعيمي الشارع ج رقم 1، البليدة، الجزائر",
      "email": "info@tadjeddine-partners.com",
      "phone": "+213 (0) 560 403 405 / 0560 349 059"
    }
  },
  "rankings": {
    "meta": {
      "title": "تصنيفات البنوك — ABIX | Algeria Banking Index",
      "description": "اكتشف تصنيفات ABIX للقطاع المصرفي الجزائري. التصنيفات الكاملة متاحة في التقرير."
    },
    "hero": {
      "title": "تصنيفات ABIX",
      "subtitle": "لمحة عن الأداء المقارن للقطاع المصرفي الجزائري."
    },
    "status2026": "تصنيفات 2026 قيد الإعداد — البيانات قيد التوحيد والتحقق.",
    "teaser": {
      "title": "تصنيفات 2025 — لمحة عامة",
      "note": "التصنيفات الكاملة، بجميع المؤسسات والمؤشرات، متاحة في تقرير ABIX 2025.",
      "lockMessage": "التصنيف الكامل متاح في الدراسة الكاملة",
      "ctaStudy": "الحصول على التقرير الكامل"
    }
  },
  "banks": {
    "meta": {
      "title": "البنوك المغطاة — ABIX | Algeria Banking Index",
      "description": "اكتشف البنوك المغطاة بدراسة ABIX. تحليل أداء القطاع المصرفي الجزائري."
    },
    "hero": {
      "title": "البنوك المغطاة بالدراسة",
      "subtitle": "تحلل دراسة ABIX البنوك العاملة في الجزائر استناداً إلى بياناتها المالية المنشورة."
    },
    "scopeNote": "تغطي نسخة 2026 ما مجموعه 21 بنكاً تجارياً عاملاً في الجزائر، مع إدراج البنك الجديد Ziraat Bankası Algeria.",
    "scope2025": "تغطي نسخة 2025 ما مجموعه 20 بنكاً عاملاً في الجزائر.",
    "lockMessage": "التحليل التفصيلي متاح في الدراسة الكاملة",
    "ctaStudy": "الحصول على التقرير الكامل",
    "banks": [
      { "id": "bea", "name": "BEA", "fullName": "Banque Extérieure d'Algérie", "type": "public" },
      { "id": "bna", "name": "BNA", "fullName": "Banque Nationale d'Algérie", "type": "public" },
      { "id": "cpa", "name": "CPA", "fullName": "Crédit Populaire d'Algérie", "type": "public" },
      { "id": "badr", "name": "BADR", "fullName": "Banque de l'Agriculture et du Développement Rural", "type": "public" },
      { "id": "bdl", "name": "BDL", "fullName": "Banque de Développement Local", "type": "public" },
      { "id": "cnep", "name": "CNEP-Banque", "fullName": "Caisse Nationale d'Épargne et de Prévoyance", "type": "public" },
      { "id": "al_baraka", "name": "Al Baraka Bank", "fullName": "Banque Al Baraka d'Algérie", "type": "private" },
      { "id": "bnpp", "name": "BNP Paribas El Djazaïr", "fullName": "BNP Paribas El Djazaïr", "type": "private" },
      { "id": "abc", "name": "ABC Bank Algeria", "fullName": "Arab Banking Corporation Algeria", "type": "private" },
      { "id": "sgalger", "name": "SGA", "fullName": "Société Générale Algérie", "type": "private" },
      { "id": "citibank", "name": "Citibank Algeria", "fullName": "Citibank Algeria", "type": "private" },
      { "id": "natixis", "name": "Natixis Algérie", "fullName": "Natixis Algérie", "type": "private" },
      { "id": "agb", "name": "AGB", "fullName": "Algeria Gulf Bank", "type": "private" },
      { "id": "hsbc", "name": "HSBC Algeria", "fullName": "HSBC Algeria", "type": "private" },
      { "id": "calyon", "name": "Calyon Algérie", "fullName": "Crédit Agricole Corporate and Investment Bank Algérie", "type": "private" },
      { "id": "trust", "name": "Trust Bank Algeria", "fullName": "Trust Bank Algeria", "type": "private" },
      { "id": "gulf_bank", "name": "Gulf Bank Algeria", "fullName": "Gulf Bank Algeria", "type": "private" },
      { "id": "fransabank", "name": "Fransabank El Djazaïr", "fullName": "Fransabank El Djazaïr", "type": "private" },
      { "id": "societe_gen_consociation", "name": "El Djazaïr Dawli", "fullName": "El Djazaïr Dawli (ex-Housing Bank)", "type": "private" },
      { "id": "arab_bank", "name": "Arab Bank PLC Algeria", "fullName": "Arab Bank PLC Algeria", "type": "private" }
    ]
  },
  "footer": {
    "slogan": "تحويل الأفكار إلى نتائج ملموسة بفضل الخبرة متعددة التخصصات.",
    "servicesLinks": {
      "title": "الخدمات",
      "items": [
        { "label": "الدراسات القطاعية", "url": "https://tadjeddine-partners.com/services/" },
        { "label": "الاستشارة الاستراتيجية", "url": "https://tadjeddine-partners.com/services/" },
        { "label": "الامتثال للقانون 18-07", "url": "https://tadjeddine-partners.com/services/" },
        { "label": "التكوين", "url": "https://tadjeddine-partners.com/services/" }
      ]
    },
    "supportLinks": {
      "title": "الدعم",
      "items": [
        { "label": "اتصل بنا", "url": "https://tadjeddine-partners.com/contact/" },
        { "label": "الإشارات القانونية", "url": "https://tadjeddine-partners.com/mentions-legales/" },
        { "label": "سياسة الخصوصية", "url": "https://tadjeddine-partners.com/politique-confidentialite/" }
      ]
    },
    "contact": {
      "title": "اتصل بنا",
      "address": "حي ناعيمي الشارع ج رقم 1، البليدة، الجزائر",
      "email": "info@tadjeddine-partners.com",
      "phone": "+213 (0) 560 403 405 / 0560 349 059"
    }
  },
  "modal": {
    "closeLabel": "إغلاق",
    "orderTitle": "طلب الدراسة",
    "previewTitle": "عرض إصدار 2025",
    "previewContent": {
      "items": [
        "جدول المحتويات الكامل",
        "نماذج من التحليلات",
        "أمثلة على الرسوم البيانية والبيانات",
        "المنهجية العامة"
      ],
      "ctaDownload": "تنزيل العرض المجاني",
      "ctaOrder": "الحصول على الدراسة الكاملة"
    }
  },
  "legal": {
    "meta": {
      "title": "الإشارات القانونية — ABIX | Algeria Banking Index",
      "description": "الإشارات القانونية، ناشر الموقع، المضيف، الملكية الفكرية وشروط الاستخدام لـ ABIX — تاجدين وشركاؤه."
    },
    "hero": {
      "title": "الإشارات القانونية",
      "subtitle": "المعلومات القانونية والتنظيمية لمنصة ABIX و EURL تاجدين وشركاؤه."
    },
    "publisher": {
      "title": "ناشر الموقع",
      "name": "EURL تاجدين وشركاؤه (برأس مال 20,000,000 دج)",
      "labelAddress": "العنوان",
      "address": "الشارع ج رقم 1، حي ناعيمي مركز زبانة، البليدة — الجزائر",
      "labelLegalReg": "السجلات والأرقام الضريبية",
      "legalReg": "RC: 10B0981001 — NIF: 001016098100195 — AI: 09010399908",
      "labelEmail": "البريد الإلكتروني",
      "email": "info@tadjeddine-partners.com",
      "labelPhone": "الهاتف",
      "phone": "+213 (0) 560 403 405 / +213 (0) 560 349 059",
      "labelManager": "المدير",
      "manager": "TADJEDDINE BACHIR"
    },
    "hosting": {
      "title": "الاستضافة",
      "name": "Djezzy Cloud",
      "address": "طريق الولاية، قطعة رقم 37/4، دار البيضاء، الجزائر العاصمة، الجزائر",
      "labelEmail": "البريد الإلكتروني",
      "email": "contact@djezzy.dz"
    },
    "ip": {
      "title": "الملكية الفكرية",
      "body": "جميع محتويات الموقع (نصوص وصور ومقاطع فيديو وشعارات وهيكل إلخ) هي ملك حصري لـ EURL تاجدين وشركاؤه، ما لم يُذكر خلاف ذلك. يُحظر كل تكاثر أو توزيع أو إعادة استخدام، كلياً أو جزئياً، دون إذن مكتوب مسبق."
    },
    "privacy": {
      "title": "حماية البيانات الشخصية",
      "body": "لمعرفة المزيد عن جمع بياناتك الشخصية واستخدامها ومعالجتها، يُرجى الاطلاع على سياسة الخصوصية."
    },
    "cgu": {
      "title": "شروط الاستخدام",
      "body": "يُعدّ استخدام الموقع موافقةً تامةً وشاملة على الشروط العامة للاستخدام. يحتفظ الناشر بالحق في تعديل هذه الشروط في أي وقت."
    },
    "links": {
      "title": "الروابط التشعبية",
      "body": "قد تُتاح روابط لمواقع إلكترونية أخرى. لا تتحمل تاجدين وشركاؤه أي مسؤولية عن المحتويات الخارجية المتاحة عبر هذه الروابط."
    },
    "law": {
      "title": "القانون الواجب التطبيق",
      "body": "تخضع هذه الإشارات القانونية للقانون الجزائري. في حال النزاع، تنعقد الاختصاص الحصري لمحاكم البليدة."
    },
    "contact": {
      "title": "اتصل بنا"
    }
  },
  "privacy": {
    "meta": {
      "title": "سياسة الخصوصية — ABIX | Algeria Banking Index",
      "description": "سياسة الخصوصية وحماية البيانات الشخصية وفقاً للقانون رقم 18-07 — EURL تاجدين وشركاؤه."
    },
    "hero": {
      "badge": "القانون رقم 18-07 المؤرخ في 10 يونيو 2018",
      "title": "سياسة الخصوصية",
      "subtitle": "حماية البيانات الشخصية والتزامات السرية لـ EURL تاجدين وشركاؤه."
    },
    "sec1": {
      "title": "1. هوية المسؤول عن المعالجة",
      "p1": "وفقاً لأحكام القانون رقم 18-07 المؤرخ في 10 يونيو 2018 المتعلق بحماية البيانات الشخصية، المسؤول عن معالجة البيانات المجمّعة هو TADJEDDINE AND PARTNERS، شركة مسجّلة في السجل التجاري تحت رقم 10B0981001، ومقرها الاجتماعي في حي ناعيمي، الشارع ج رقم 1، زبانة، البليدة، يمثلها المدير القانوني السيد تاجدين بشير.",
      "p2": "بوصفها مسؤولاً عن المعالجة، تلتزم TADJEDDINE AND PARTNERS بالامتثال لجميع الالتزامات القانونية والتنظيمية المعمول بها في مجال حماية البيانات الشخصية."
    },
    "sec2": {
      "title": "2. البيانات المجمّعة",
      "intro": "في إطار أنشطتها التجارية وإدارة بوابة ABIX، تجمع TADJEDDINE AND PARTNERS وتعالج البيانات التالية المتعلقة بمستخدميها والمحتملين:",
      "item1": "الاسم واللقب",
      "item2": "عنوان البريد الإلكتروني المهني",
      "item3": "رقم الهاتف",
      "item4": "اسم المؤسسة / البنك / الشركة",
      "item5": "المنصب / الوظيفة",
      "item6": "الموقع الإلكتروني والاحتياجات المُعبَّر عنها"
    },
    "sec3": {
      "title": "3. أغراض المعالجة",
      "intro": "تُعالَج البيانات المجمّعة حصرياً للأغراض التالية:",
      "item1": "الرد على طلبات التواصل أو الطلب أو المعلومات التي يُبديها المستخدمون",
      "item2": "إرسال عروض تجارية مكيَّفة مع الاحتياجات المُعبَّر عنها (دراسة ABIX، الاستشارات، المقارنات المرجعية)",
      "item3": "إدارة العلاقة التجارية قبل التعاقدية والتعاقدية",
      "item4": "إجراء تحليلات وإحصاءات تجارية داخلية"
    },
    "sec4": {
      "title": "4. مستلمو البيانات",
      "p1": "تُعالَج البيانات الشخصية حصرياً من قِبل موظفي TADJEDDINE AND PARTNERS المعتمدين ولا تخضع لأي تنازل أو بيع لأطراف ثالثة.",
      "p2": "أي إرسال محتمل لمقدمي الخدمات التقنيين (لا سيما مزودي الاستضافة أو إرسال البريد الإلكتروني) مُقيَّد بعقد يتضمن التزامات صارمة بالسرية والامتثال لأحكام القانون رقم 18-07."
    },
    "sec5": {
      "title": "5. مدة الحفظ",
      "body": "تُحفظ البيانات المجمّعة لمدة أقصاها ثلاث (3) سنوات من آخر تواصل أو تفاعل من المحتمل، ما لم يُمارَس الاعتراض أو سحب الموافقة وفقاً للأحكام القانونية."
    },
    "sec6": {
      "title": "6. التدابير الأمنية",
      "body": "تُطبّق TADJEDDINE AND PARTNERS جميع التدابير التقنية والتنظيمية الملائمة لضمان سرية وسلامة وتوافر البيانات الشخصية المعالَجة."
    },
    "sec7": {
      "title": "7. حقوق الأشخاص المعنيين",
      "intro": "وفقاً للمواد 7 و34 إلى 36 من القانون رقم 18-07، يتمتع كل شخص معني بالحقوق التالية:",
      "right1": "حق الوصول إلى بياناته الشخصية",
      "right2": "حق تصحيح البيانات غير الدقيقة أو الناقصة",
      "right3": "حق الاعتراض على المعالجة لأسباب مشروعة",
      "right4": "حق سحب الموافقة في أي وقت",
      "exerciseTitle": "لممارسة هذه الحقوق، يمكن توجيه أي طلب إلى:"
    },
    "sec8": {
      "title": "8. عمليات نقل البيانات الدولية",
      "body": "لا يُجرى أي نقل للبيانات الشخصية إلى الخارج دون الحصول على التراخيص المسبقة المطلوبة بموجب القانون رقم 18-07."
    },
    "sec9": {
      "title": "9. تحديث السياسة",
      "body": "تحتفظ TADJEDDINE AND PARTNERS بالحق في تعديل سياسة الخصوصية هذه في أي وقت، لا سيما لمراعاة أي تطور تشريعي أو تنظيمي."
    }
  },
  "questionnaire": {
    "meta": {
      "title": "مؤشر الخدمات المصرفية في الجزائر 2026 | استبيان ABIX",
      "description": "قيّم تطبيق هاتف بنكك والخدمات عبر الإنترنت وخدمات الفروع في الجزائر. شارك في دراسة ABIX 2026 المستقلة."
    },
    "hero": {
      "brand": "ABIX — مؤشر الخدمات المصرفية 2026",
      "title": "رأيكم حول الخدمات المصرفية في الجزائر",
      "subtitle": "قيّم التطبيق المحمول والخدمات عبر الإنترنت وخدمات الفروع للبنوك التي تستخدمها. ستساهم إجاباتكم في إثراء دراسة ABIX 2026 المستقلة."
    },
    "step1": {
      "title": "الخطوة 1: اختر بنوكك",
      "hint": "حدّد بنكاً واحداً على الأقل تستخدم خدماته."
    },
    "step2": {
      "title": "الخطوة 2: قيّم الخدمات",
      "hint": "اختر مستوى رضاك عن كل خدمة تستخدمها."
    },
    "services": {
      "mobile": "التطبيق المحمول",
      "web": "الخدمات المصرفية عبر الإنترنت",
      "branch": "خدمات الفروع"
    },
    "ratings": {
      "veryUnsatisfied": "غير راضٍ تماماً",
      "unsatisfied": "غير راضٍ",
      "average": "متوسط",
      "satisfied": "راضٍ",
      "verySatisfied": "راضٍ جداً",
      "notUsed": "لا أستخدم هذه الخدمة"
    },
    "actions": {
      "submit": "إرسال تقييمي",
      "submitting": "جارٍ الإرسال…",
      "selectBankFirst": "يرجى تحديد بنك واحد على الأقل أعلاه لعرض خيارات التقييم."
    },
    "messages": {
      "success": "شكراً لك! تم تسجيل تقييمك بنجاح.",
      "selectAtLeastOneBank": "يرجى تحديد بنك واحد على الأقل.",
      "evaluateAtLeastOneService": "يرجى تقييم خدمة واحدة على الأقل.",
      "error": "حدث خطأ أثناء إرسال تقييمك.",
      "alreadyCompletedTitle": "شكراً لمشاركتك!",
      "alreadyCompletedText": "لقد أجبت بالفعل على مؤشر الخدمات المصرفية 2026. تم تسجيل إجاباتك بنجاح.",
      "alreadySubmittedIP": "تم تقديم تقييم بالفعل من اتصال الإنترنت أو الجهاز الخاص بك."
    },
    "notice": {
      "title": "المعلومات والخصوصية",
      "text": "تُنظّم تاجدين وشركاؤه هذا الاستبيان في إطار دراسة ABIX 2026 المستقلة. تظل إجاباتك سرية تماماً وتُعالَج بشكل مجهول وإجمالي."
    },
    "cta": {
      "bannerTitle": "شارك في مؤشر الخدمات المصرفية 2026",
      "bannerText": "قدّم رأيك حول تطبيق الهاتف والخدمات عبر الإنترنت وخدمات الفروع لبنكك في أقل من دقيقتين.",
      "button": "الإجابة على الاستبيان"
    }
  },
  "dataExplorer": {
    "meta": {
      "title": "ABIX Data Explorer | تحليل البنوك الجزائرية",
      "description": "استكشف وقارن وحلل الأداء المالي للبنوك الجزائرية مع ABIX Data Explorer: مؤشرات الأداء، الحصص السوقية، المقارنات المرجعية، البيانات التاريخية والتحليلات المتقدمة."
    },
    "hero": {
      "eyebrow": "ABIX Data Explorer",
      "title": "حوّل البيانات المالية للبنوك الجزائرية إلى تحليلات مقارنة وقرارات.",
      "subtitle": "حلّل بنكاً. قارنه بنظرائه. تتبّع مساره. افهم موقعه في السوق.",
      "description": "يحوّل ABIX Data Explorer البيانات المالية المصرفية إلى قراءة منظّمة للسوق: النشاط، الودائع، الائتمان، الربحية، الكفاءة، النمو، رسملة الأسهم، هيكل الميزانية والموقف التنافسي.",
      "ctaDiscover": "اكتشف الميزات",
      "ctaOffers": "عرض الباقات"
    },
    "keyStats": {
      "banksCount": "21 بنكاً",
      "banksLabel": "كتالوج البنوك المغطاة حالياً",
      "history": "بيانات متعددة السنوات",
      "historyLabel": "يتوفر السجل التاريخي حسب الإصدار والترخيص",
      "kpis": "عشرات المؤشرات",
      "kpisLabel": "بيانات المصدر والنسب والمؤشرات المشتقة",
      "dimensions": "4 أبعاد مالية",
      "dimensionsLabel": "الربحية · النمو · الكفاءة · الرسملة"
    },
    "singleInterface": {
      "title": "القطاع المصرفي بأكمله في واجهة واحدة",
      "text": "انتقل من نظرة القطاع إلى تحليل بنك واحد في ثوانٍ. استكشف البيانات والاتجاهات والتصنيفات والمقارنات دون التعامل مع ملفات Excel أو تقارير متعددة.",
      "items": [
        {
          "title": "رؤية القطاع",
          "body": "المجاميع المالية والتطور السنوي وتكوين السوق واللاعبين الرئيسيين."
        },
        {
          "title": "التصنيفات",
          "body": "موقف البنوك حسب المؤشر وحسب السنة."
        },
        {
          "title": "البيانات التاريخية",
          "body": "القيم والتغيرات السنوية والأساس 100 ومعدل النمو السنوي المركب."
        },
        {
          "title": "المقارنة",
          "body": "تحليل متزامن لبنوك أو مؤشرات أو أبعاد متعددة."
        }
      ]
    },
    "profile360": {
      "title": "بنك واحد. نظرة واحدة. جميع المؤشرات الأساسية.",
      "subtitle": "الملف المصرفي 360 درجة",
      "text": "يجمع ABIX Data Explorer في ملف واحد المسار المالي للبنك والموقف التنافسي والمقارنات المرجعية وإشارات الانتباه الرئيسية.",
      "domains": [
        "النشاط",
        "الربحية",
        "الكفاءة",
        "الوساطة",
        "الرسملة المحاسبية",
        "المخصصات",
        "هيكل الأصول",
        "موقف السوق",
        "النمو"
      ],
      "associationText": "يربط الملف بناءً على البيانات المتاحة: القيمة الحالية والتطور السنوي والتاريخ ومعدل النمو السنوي المركب والمقارنة المرجعية والمتوسط والوسيط والنسبة المئوية والربيعية والتصنيف والحصة السوقية."
    },
    "compare": {
      "title": "قارن البنك ببيئته الحقيقية",
      "text": "لا تقتصر المقارنة ذات الصلة على مقارنة جميع البنوك معاً فحسب. يسمح ABIX Data Explorer بوضع النتائج في سياقها وبناء مجموعات نظراء أكثر ملاءمة.",
      "axes": [
        { "title": "السوق", "body": "التموضع العام مقابل القطاع المصرفي الجزائري بأكمله." },
        { "title": "الوضع / الفئة", "body": "مقارنة متجانسة بين البنوك العامة والخاصة." },
        { "title": "الحجم", "body": "التجميع حسب حجم الأصول لمقارنة اللاعبين المماثلين." },
        { "title": "ملف الأصول", "body": "وضع السياق حسب هيكل وتوجه الميزانية العمومية." },
        { "title": "مجموعة النظراء", "body": "بناء مجموعة مخصصة عندما تسمح البيانات بذلك." }
      ],
      "strongMessage": "الأداء يكون له معنى فقط عند وضعه في سياقه.",
      "disclaimer": "يتم توفير المقارنات المرجعية والتحليلات المقارنة في ABIX Data Explorer كأدوات للتحليل المالي. وهي لا تشكل تصنيفات تنظيمية أو تصنيفات ائتمانية."
    },
    "marketShares": {
      "title": "من يكتسب أرضاً حقاً؟",
      "text": "يمكن أن يُظهر البنك نمواً إيجابياً بينما يفقد حصة في السوق. يميز ABIX بين النمو المطلق والموقف النسبي والمساهمة في ديناميكيات القطاع.",
      "strongMessage": "النمو لا يعني بالضرورة اكتساب الأرض.",
      "kpis": [
        { "title": "حصة السوق", "desc": "محسوبة على المجاميع الرئيسية" },
        { "title": "مكسب أو خسارة", "desc": "تطور الحصة بالنقاط المئوية" },
        { "title": "المساهمة", "desc": "حصة البنك في نمو القطاع" },
        { "title": "فجوة النمو", "desc": "الأداء النسبي مقابل متوسط السوق" }
      ],
      "bullets": [
        "حصة السوق",
        "التصنيف",
        "الفجوة إلى المتصدر",
        "مكسب/خسارة حصة السوق",
        "تطور الحصة النسبي",
        "المساهمة في نمو القطاع",
        "فجوة النمو مع السوق",
        "تطور التصنيف"
      ]
    },
    "concentration": {
      "title": "قياس تركيز السوق المصرفية",
      "text": "تتبع تطور وزن القادة وتحول الهيكل التنافسي للسوق.",
      "kpis": [
        { "title": "CR1, CR3, CR5, CR10", "desc": "الوزن التراكمي لأكبر اللاعبين في القطاع." },
        { "title": "HHI (Herfindahl-Hirschman)", "desc": "مؤشر تركيز معتمد دولياً." },
        { "title": "العدد الفعلي للبنوك", "desc": "مؤشر لتنوع اللاعبين الحقيقيين في السوق." },
        { "title": "اللاعبون الرئيسيون المتراكمون", "desc": "عدد البنوك اللازمة للوصول إلى 50٪ أو 75٪ أو 90٪ من السوق." }
      ]
    },
    "advancedAnalyses": {
      "title": "تجاوز الجداول والتصنيفات",
      "items": [
        {
          "title": "الخرائط الحرارية (Heatmaps)",
          "body": "تحديد فجوات الأداء والنمو والهيكل بسرعة."
        },
        {
          "title": "المصفوفات الاستراتيجية",
          "body": "تقاطع الأبعاد الرئيسية: الحجم × الربحية، النمو × الربحية، الوساطة × الربحية، الائتمان × الخزينة، المخصصات × الربحية، نمو الناتج البنكي الصافي × الكفاءة."
        },
        {
          "title": "الزخم",
          "body": "تحديد التسارع والتباطؤ وتحولات المسار."
        },
        {
          "title": "تاريخ التصنيف",
          "body": "مراقبة التقدم والتراجع واستقرار تموضع البنك."
        },
        {
          "title": "القيم المتطرفة",
          "body": "اكتشاف الملاحظات التي تتطلب مزيداً من التحقيق."
        }
      ]
    },
    "fourDimensions": {
      "title": "أربعة أبعاد لفهم ملف البنك",
      "strongMessage": "لا يصدر ABIX Data Explorer درجة إجمالية رسمية. يتم إبقاء الأبعاد منفصلة للحفاظ على المعلومات المالية وتجنب أن يخفي متوسط واحد ملفات شخصية مختلفة للغاية.",
      "disclaimer": "يتم توفير هذه الأبعاد والتحليلات لأغراض المقارنة والمنهجية. يجب ألا يتم تفسيرها مطلقاً على أنها تصنيف ائتماني أو تصنيف تنظيمي أو مقياس ملاءة رسمي أو احتمالية التخلف عن السداد.",
      "items": [
        {
          "title": "الربحية",
          "body": "قدرة البنك على تحويل نشاطه وموارده إلى أرباح."
        },
        {
          "title": "النمو",
          "body": "ديناميكيات التطور على مدى عدة سنوات مالية."
        },
        {
          "title": "الكفاءة",
          "body": "السيطرة التشغيلية والقدرة على تحويل الدخل التشغيلي."
        },
        {
          "title": "الرسملة المحاسبية",
          "body": "الوضع النسبي لحقوق الملكية في الميزانية العمومية وهيكل الائتمان."
        }
      ]
    },
    "executiveDashboard": {
      "title": "من البيانات إلى الرسالة التنفيذية",
      "text": "يسلط ABIX Data Explorer الضوء تلقائياً على التطورات التي تستحق اهتمام صانع القرار.",
      "alerts": [
        "انخفاض صافي الدخل",
        "زيادة كبيرة في المخصصات",
        "اختلاف بين نمو الودائع والائتمان",
        "ارتفاع الناتج البنكي الصافي ولكن انخفاض صافي الدخل",
        "ارتفاع الأصول ولكن انخفاض العائد على حقوق الملكية",
        "تحول كبير في نسبة التكلفة إلى الدخل",
        "تغييرات في المركز أو الربيعية"
      ],
      "traceabilityTitle": "نتائج قابلة للتفسير والتتبع",
      "traceabilityText": "تعتمد النتائج على قواعد تحليلية محددة ومسجلة. يمكن تتبع كل رسالة إلى البيانات والتحليل الذي أدى إليها."
    },
    "personas": {
      "title": "مصمم لأولئك الذين يجب عليهم فهم السوق المصرفية",
      "items": [
        {
          "title": "الإدارة العامة",
          "body": "التحديد السريع للتطورات الهامة وتموضع البنك."
        },
        {
          "title": "الإدارة المالية",
          "body": "تحليل الربحية والكفاءة والنمو وهيكل الميزانية العمومية والرسملة."
        },
        {
          "title": "إدارة الاستراتيجية",
          "body": "تتبع الحصص السوقية والمنافسين والمسارات وتغييرات المواقف."
        },
        {
          "title": "المحللون الماليون",
          "body": "استكشاف البيانات والنسب والسجلات والمقارنات."
        },
        {
          "title": "الائتمان والطرف المقابل",
          "body": "إعداد السياق المالي للبنك قبل تحليل احترازي ونوعي أكمل."
        },
        {
          "title": "الاستشارات والبحوث",
          "body": "إنتاج تحليلات مقارنة منظمة للسوق المصرفي الجزائري بسرعة."
        }
      ]
    },
    "methodology": {
      "title": "تحليلات مصممة لتكون قابلة للتحقق",
      "cta": "اكتشف المنهجية",
      "items": [
        {
          "title": "بيانات مسجلة الإصدار",
          "body": "منظمة حسب البنك والمؤشر والسنة والإصدار."
        },
        {
          "title": "معالجة صارمة للبيانات المفقودة",
          "body": "تظل البيانات الغائبة غير متوفرة (N/A) ولا يتم التعامل معها مطلقاً على أنها صفر."
        },
        {
          "title": "حسابات مركزية",
          "body": "تعتمد النسب ومعدلات النمو السنوي المركب والحصص السوقية والنسب المئوية والمقارنات المرجعية على قواعد متجانسة."
        },
        {
          "title": "إمكانية التتبع",
          "body": "يمكن ربط النتائج بمصدرها التحليلي ومعلماتها."
        }
      ]
    },
    "limitations": {
      "title": "أداة للتحليل المقارن، وليست تصنيفاً احترازياً",
      "text": "يوفر ABIX Data Explorer تحليلاً مالياً مقارناً بناءً على البيانات المتاحة. وهو لا يحل محل تحليل الائتمان الكامل، أو النسب الاحترازية التنظيمية، أو المعلومات حول جودة الأصول والسيولة التنظيمية عندما لا تكون متاحة للجمهور. وهذا يعزز المصداقية المنهجية للمنتج."
    },
    "pricing": {
      "title": "اختر الوصول المناسب لاحتياجاتك",
      "cta": "اختر هذا العرض"
    },
    "finalCta": {
      "title": "لا ينبغي الاطلاع على البيانات المصرفية فحسب. بل يجب استكشافها.",
      "text": "مع ABIX Data Explorer، انتقل من الأرقام الأولية إلى المقارنة، ومن التصنيف إلى المسار، ومن البيانات إلى فهم السوق.",
      "ctaOffers": "عرض الباقات",
      "ctaApp": "الوصول إلى ABIX Data Explorer"
    },
    "promoHome": {
      "title": "اكتشف ABIX Data Explorer",
      "text": "توفر لك الدراسة التحليل. يتيح لك Data Explorer استكشاف البيانات بنفسك.",
      "cta": "اكتشف ABIX Data Explorer",
      "bullets": [
        "حلل البنوك",
        "قارن الأداء",
        "تتبع الحصص السوقية"
      ]
    }
  }
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(arPath, JSON.stringify(arData, null, 2), 'utf8');

console.log('Successfully wrote complete en.json and ar.json!');
