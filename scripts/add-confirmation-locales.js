const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'locales');

const confirmationLocales = {
  fr: {
    confirmation: {
      meta: {
        title: "Confirmation de souscription — ABIX 2026",
        description: "Votre demande de souscription pour l’édition ABIX 2026 a bien été enregistrée. Téléchargez et consultez votre offre commerciale officielle."
      },
      badge: "Souscription enregistrée",
      title: "Votre demande de souscription a bien été enregistrée",
      subtitle: "Nous vous remercions de votre intérêt pour Algeria Banking Index 2026. Votre offre commerciale standardisée est immédiatement accessible ci-dessous.",
      commercialContact: "Notre équipe commerciale vous contactera prochainement pour finaliser votre souscription.",
      btnDownload: "Télécharger mon offre PDF",
      btnView: "Consulter l’offre",
      btnDataExplorer: "Accéder à ABIX Data Explorer",
      btnHome: "Retour à l’accueil",
      btnPricing: "Voir tous les packs",
      emailSectionTitle: "Recevoir une copie par email",
      emailSectionDesc: "Renseignez votre adresse email professionnelle pour recevoir immédiatement une copie de cette offre officielle en pièce jointe.",
      emailPlaceholder: "Votre adresse email professionnelle",
      namePlaceholder: "Votre prénom et nom (facultatif)",
      btnSendEmail: "M’envoyer l’offre par email",
      emailSending: "Envoi en cours…",
      emailSuccess: "L’offre commerciale a été transmise avec succès à votre adresse email.",
      emailError: "Une erreur est survenue lors de l’envoi de l’email. Vous pouvez télécharger directement votre offre ci-dessus.",
      detailsTitle: "Récapitulatif financier du pack choisi",
      labelPlan: "Pack sélectionné",
      labelPositioning: "Positionnement",
      labelPriceHt: "Prix promotionnel HT",
      labelPriceNormal: "Prix catalogue HT",
      labelDiscount: "Remise appliquée (10 %)",
      labelSaving: "Économie réalisée",
      labelVat: "TVA 19 %",
      labelTotalTtc: "Total TTC",
      labelUsers: "Utilisateurs inclus",
      labelPeriod: "Période ABIX Data Explorer",
      labelDuration: "Durée d'accès",
      valueDuration: "12 mois complets",
      summaryTitle: "Contenu inclus dans votre pack",
      validityNotice: "Offre promotionnelle Early Bird valable jusqu’au 31 août 2026.",
      plans: {
        essentiel: {
          name: "Pack Essentiel",
          positioning: "Comprendre le marché",
          summary: "Étude complète de l’édition 2026 au format PDF sécurisé, analyse consolidée du secteur bancaire, comparaison banques publiques / privées, fiches individuelles des 21 banques, classements et benchmarks par indicateur, licence ABIX Data Explorer pendant 12 mois pour 1 utilisateur (données 2025)."
        },
        pro: {
          name: "Pack Pro",
          positioning: "Exploiter les données",
          summary: "Tout le Pack Essentiel + fichier Excel structuré contenant les données, licence ABIX Data Explorer (données 2024 et 2025) jusqu’à 3 utilisateurs d’une même entité, analyse des évolutions entre exercices et visualisations interactives."
        },
        corporate: {
          name: "Pack Corporate Executive",
          positioning: "Analyser, comparer et partager",
          summary: "Tout le Pack Pro + licence ABIX Data Explorer Executive jusqu’à 20 utilisateurs, données historiques 2022, 2023, 2024 et 2025, analyse multidimensionnelle, profils bancaires 360°, Executive Dashboard & Key Insights, groupes de pairs et benchmarks avancés, rapports Executive PDF et exports Excel."
        }
      }
    }
  },
  en: {
    confirmation: {
      meta: {
        title: "Subscription Confirmation — ABIX 2026",
        description: "Your subscription request for the ABIX 2026 edition has been recorded. Download and view your official commercial proposal."
      },
      badge: "Subscription Recorded",
      title: "Your subscription request has been successfully registered",
      subtitle: "Thank you for your interest in the Algeria Banking Index 2026. Your standard commercial offer is immediately accessible below.",
      commercialContact: "Our sales team will contact you shortly to finalize your subscription.",
      btnDownload: "Download my PDF offer",
      btnView: "View offer",
      btnDataExplorer: "Access ABIX Data Explorer",
      btnHome: "Back to Home",
      btnPricing: "View All Packs",
      emailSectionTitle: "Receive a copy by email",
      emailSectionDesc: "Enter your corporate email address to immediately receive a copy of this official offer as an attachment.",
      emailPlaceholder: "Your corporate email address",
      namePlaceholder: "Your full name (optional)",
      btnSendEmail: "Send offer to my email",
      emailSending: "Sending…",
      emailSuccess: "The commercial offer has been successfully sent to your email address.",
      emailError: "An error occurred while sending the email. You can download your PDF offer directly above.",
      detailsTitle: "Financial Summary of Selected Pack",
      labelPlan: "Selected Pack",
      labelPositioning: "Positioning",
      labelPriceHt: "Promotional Price (excl. tax)",
      labelPriceNormal: "Regular Price (excl. tax)",
      labelDiscount: "Applied Discount (10%)",
      labelSaving: "Total Savings",
      labelVat: "19% VAT",
      labelTotalTtc: "Total (incl. tax)",
      labelUsers: "Included Users",
      labelPeriod: "ABIX Data Explorer Period",
      labelDuration: "Access Duration",
      valueDuration: "12 full months",
      summaryTitle: "Included Features in Your Pack",
      validityNotice: "Early Bird promotional offer valid until August 31, 2026.",
      plans: {
        essentiel: {
          name: "Essential Pack",
          positioning: "Understand the Market",
          summary: "Full 2026 study in secure PDF format, consolidated banking sector analysis, public vs. private bank comparisons, individual profiles for 21 banks, benchmarks by indicator, 12-month ABIX Data Explorer license for 1 user (2025 data)."
        },
        pro: {
          name: "Pro Pack",
          positioning: "Leverage Data",
          summary: "All Essential Pack features + structured Excel dataset, 12-month ABIX Data Explorer license (2024 and 2025 data) for up to 3 users from the same entity, multi-year trend analysis, and interactive data visualisations."
        },
        corporate: {
          name: "Corporate Executive Pack",
          positioning: "Analyze, Compare & Share",
          summary: "All Pro Pack features + ABIX Data Explorer Executive license for up to 20 users, complete 2022–2025 historical data, 360° bank profiles, Executive Dashboard & Key Insights, peer groups & advanced benchmarks, executive PDF reports & Excel exports."
        }
      }
    }
  },
  ar: {
    confirmation: {
      meta: {
        title: "تأكيد الاشتراك — مؤشر ABIX 2026",
        description: "تم تسجيل طلب اشتراككم في إصدار مؤشر البنوك الجزائرية ABIX 2026 بنجاح. يمكنكم تحميل واستعراض العرض التجاري الرسمي."
      },
      badge: "تم تسجيل الاشتراك",
      title: "تم تسجيل طلب اشتراككم بنجاح",
      subtitle: "شكرًا لاهتمامكم بمؤشر البنوك الجزائرية ABIX 2026. عرضكم التجاري الموحد متاح مباشرة أدناه.",
      commercialContact: "سيتصل بكم فريقنا التجاري قريبًا لاستكمال اشتراككم.",
      btnDownload: "تحميل عرض PDF",
      btnView: "استعراض العرض",
      btnDataExplorer: "الدخول إلى ABIX Data Explorer",
      btnHome: "العودة إلى الرئيسية",
      btnPricing: "عرض جميع الباقات",
      emailSectionTitle: "استلام نسخة عبر البريد الإلكتروني",
      emailSectionDesc: "أدخل بريدك الإلكتروني المهني لاستلام نسخة من هذا العرض التجاري الرسمي في صندوق بريدك فورًا.",
      emailPlaceholder: "بريدك الإلكتروني المهني",
      namePlaceholder: "الاسم الكامل (اختياري)",
      btnSendEmail: "إرسال العرض إلى بريدي",
      emailSending: "جارٍ الإرسال…",
      emailSuccess: "تم إرسال العرض التجاري بنجاح إلى بريدك الإلكتروني.",
      emailError: "حدث خطأ أثناء إرسال البريد الإلكتروني. يمكنك تحميل ملف PDF مباشرة من الرابط أعلاه.",
      detailsTitle: "الملخص المالي للباقة المختارة",
      labelPlan: "الباقة المختارة",
      labelPositioning: "الموقع الاستراتيجي",
      labelPriceHt: "السعر الترويجي قبل الضريبة",
      labelPriceNormal: "السعر الأصلي قبل الضريبة",
      labelDiscount: "الخصم المطبق (10%)",
      labelSaving: "قيمة التوفير",
      labelVat: "ضريبة القيمة المضافة 19%",
      labelTotalTtc: "المجموع شامل الضريبة",
      labelUsers: "المستخدمون المشمولون",
      labelPeriod: "فترة بيانات ABIX Data Explorer",
      labelDuration: "مدة الاشتراك",
      valueDuration: "12 شهرًا كاملة",
      summaryTitle: "المحتويات والمزايا المشمولة في باقتكم",
      validityNotice: "عرض الاشتراك المبكر سارٍ حتى 31 أوت / أغسطس 2026.",
      plans: {
        essentiel: {
          name: "الباقة الأساسية",
          positioning: "فهم السوق",
          summary: "الدراسة الشاملة لإصدار 2026 بصيغة PDF الآمنة، التحليل المالي المجمع للقطاع البنكي، المقارنة بين البنوك العمومية والخاصة، بطاقات فردية لـ 21 بنكًا، الترتيب والمقارنة المرجعية، رخصة ABIX Data Explorer لمدة 12 شهرًا لمستخدم واحد (بيانات 2025)."
        },
        pro: {
          name: "الباقة الاحترافية",
          positioning: "استثمار واستغلال البيانات",
          summary: "جميع مزايا الباقة الأساسية + ملف Excel مهيكل للبيانات، رخصة ABIX Data Explorer (بيانات 2024 و2025) لغاية 3 مستخدمين من نفس المؤسسة، تحليل التطورات بين السنوات ورسوم بيانية تفاعلية."
        },
        corporate: {
          name: "الباقة التنفيذية المؤسسية",
          positioning: "التحليل والمقارنة والمشاركة",
          summary: "جميع مزايا الباقة الاحترافية + رخصة ABIX Data Explorer التنفيذية لغاية 20 مستخدمًا، بيانات تاريخية كاملة 2022–2025، بروفايلات بنكية 360°، لوحة القيادة التنفيذية ورؤى مفتاحية، مجموعات النظراء، تقارير PDF تنفيذية وتصدير Excel غير محدود."
        }
      }
    }
  }
};

for (const lang of ['fr', 'en', 'ar']) {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.confirmation = confirmationLocales[lang].confirmation;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`[i18n] ✓ confirmation keys added to ${lang}.json`);
}
