const fs = require('fs');
const path = require('path');

const frPath = path.join(__dirname, '../locales/fr.json');
const enPath = path.join(__dirname, '../locales/en.json');
const arPath = path.join(__dirname, '../locales/ar.json');

let fr = JSON.parse(fs.readFileSync(frPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
let ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));

// 1. Replace "تاجدين وشركاؤه" and "تاجدين وشركائه" with "Tadjeddine & Partners" in Arabic locales JSON
function replaceArabicBrand(obj) {
  for (let k in obj) {
    if (typeof obj[k] === 'string') {
      obj[k] = obj[k]
        .replace(/EURL تاجدين وشركاؤه/g, 'EURL Tadjeddine & Partners')
        .replace(/تاجدين وشركاؤه/g, 'Tadjeddine & Partners')
        .replace(/تاجدين وشركائه/g, 'Tadjeddine & Partners');
    } else if (typeof obj[k] === 'object' && obj[k] !== null) {
      replaceArabicBrand(obj[k]);
    }
  }
}
replaceArabicBrand(ar);

// 2. Add missing keys for Edition 2025 pricing & payment notes, and Methodology CTA
const extraFr = {
  edition2025: {
    pricing: {
      packs: {
        essential: {
          title: "Pack Essentiel",
          price: "84 000 DA HT",
          features: [
            "Étude complète (104 pages, PDF via accès sécurisé)",
            "Comparatif public/privé + 20 banques",
            "Usage individuel (1 utilisateur)",
            "Mises à jour d'errata mineures"
          ]
        },
        pro: {
          title: "Pack Pro",
          price: "120 000 DA HT",
          features: [
            "Tout du Pack Essentiel",
            "Fichier Excel interactif",
            "Support email 7 jours",
            "Accès aux mises à jour majeures",
            "Jusqu'à 3 utilisateurs (même entité)"
          ]
        },
        corporate: {
          title: "Pack Corporate Executive",
          price: "180 000 DA HT",
          features: [
            "Tout du Pack Pro",
            "Livrable PowerPoint exécutif",
            "Webinar exclusif : Décryptage par M. Rachid Sekak",
            "Jusqu'à 20 utilisateurs (même entité)"
          ]
        }
      },
      securePayment: "Paiement sécurisé",
      acceptedCurrencies: "EUR & DZD acceptés",
      accessNote: "Accès après traitement"
    }
  },
  methodology: {
    ctaTitle: "Découvrir les résultats et analyses des études",
    ctaSubtitle: "L’édition 2026 est ouverte à la souscription anticipée avec un tarif préférentiel valable jusqu’au 31 août 2026."
  }
};

const extraEn = {
  edition2025: {
    pricing: {
      packs: {
        essential: {
          title: "Essential Pack",
          price: "84,000 DZD (excl. VAT)",
          features: [
            "Complete study (104 pages, PDF via secure access)",
            "Public/private comparative + 20 banks",
            "Individual usage (1 user)",
            "Minor errata updates"
          ]
        },
        pro: {
          title: "Pro Pack",
          price: "120,000 DZD (excl. VAT)",
          features: [
            "Everything in Essential Pack",
            "Interactive Excel dataset",
            "7-day email support",
            "Access to major updates",
            "Up to 3 users (same entity)"
          ]
        },
        corporate: {
          title: "Corporate Executive Pack",
          price: "180,000 DZD (excl. VAT)",
          features: [
            "Everything in Pro Pack",
            "Executive PowerPoint deliverable",
            "Exclusive briefing webinar with Mr. Rachid Sekak",
            "Up to 20 users (same entity)"
          ]
        }
      },
      securePayment: "Secure Payment",
      acceptedCurrencies: "EUR & DZD accepted",
      accessNote: "Access upon processing"
    }
  },
  methodology: {
    ctaTitle: "Discover Study Results and Analyses",
    ctaSubtitle: "The 2026 edition is open for early subscription with a preferential rate valid until August 31, 2026."
  }
};

const extraAr = {
  edition2025: {
    pricing: {
      packs: {
        essential: {
          title: "الباقة الأساسية",
          price: "84,000 د.ج (قبل الضريبة)",
          features: [
            "الدراسة الكاملة (104 صفحات، PDF عبر وصول آمن)",
            "مقارنة البنوك العمومية والخاصة + 20 بنكاً",
            "استخدام فردي (مستخدم واحد)",
            "تحديثات طفيفة"
          ]
        },
        pro: {
          title: "الباقة الاحترافية",
          price: "120,000 د.ج (قبل الضريبة)",
          features: [
            "كل ما تضمنته الباقة الأساسية",
            "ملف إكسل تفاعلي",
            "دعم عبر البريد الإلكتروني طوال 7 أيام",
            "الوصول إلى التحديثات الرئيسية",
            "حتى 3 مستخدمين (نفس المؤسسة)"
          ]
        },
        corporate: {
          title: "الباقة التنفيذية",
          price: "180,000 د.ج (قبل الضريبة)",
          features: [
            "كل ما تضمنته الباقة الاحترافية",
            "عرض تقديمي تنفيذيي بصيغة PowerPoint",
            "ندوة افتراضية حصرية للتحليل مع السيد رشيد سكاك",
            "حتى 20 مستخدماً (نفس المؤسسة)"
          ]
        }
      },
      securePayment: "دفع آمن",
      acceptedCurrencies: "قبول اليورو والدينار الجزائري",
      accessNote: "الوصول بعد معالجة الطلب"
    }
  },
  methodology: {
    ctaTitle: "اكتشف نتائج وتحليلات الدراسات",
    ctaSubtitle: "إصدار 2026 مفتوح للاشتراك المسبق بسعر تفضيلي سارٍ حتى 31 أغسطس 2026."
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

deepMerge(fr, extraFr);
deepMerge(en, extraEn);
deepMerge(ar, extraAr);

fs.writeFileSync(frPath, JSON.stringify(fr, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');
fs.writeFileSync(arPath, JSON.stringify(ar, null, 2), 'utf8');

console.log("Successfully updated fr.json, en.json, ar.json with brand replacements and missing keys!");
