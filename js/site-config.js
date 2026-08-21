/**
 * ABIX — Algeria Banking Index
 * Fichier de configuration centralisé du portail.
 *
 * Règle : une valeur `null` ou `false` ne doit jamais être affichée dans le HTML généré.
 * Les templates doivent vérifier l'existence de la valeur avant de l'injecter.
 */

const SITE_CONFIG = {

  // ── Identité du site & Marque ────────────────────────────────────────────────
  siteName: "ABIX",
  siteFullName: "Algeria Banking Index",
  publisherName: "Tadjeddine & Partners",
  domain: "https://algeriabankingindex.com",

  brand: {
    shortName: "ABIX",
    fullName: "Algeria Banking Index",
    publisher: "Tadjeddine & Partners"
  },

  // ── Gestion des langues ─────────────────────────────────────────────────────
  // Préfixe : "fr", "en", "ar". Seul le français est actif pour la Phase 1.
  // Status : "published" = indexable et visible | "draft" = générée mais non indexée.
  defaultLanguage: "fr",
  languages: {
    fr: { enabled: true, status: "published", dir: "ltr", label: "Français", nativeLabel: "Français" },
    en: { enabled: true, status: "published", dir: "ltr", label: "English",  nativeLabel: "English"  },
    ar: { enabled: true, status: "published", dir: "rtl", label: "Arabe",    nativeLabel: "العربية"  }
  },

  // ── Éditions ─────────────────────────────────────────────────────────────────
  // Note : `null` = valeur non encore validée → ne pas afficher.
  // Note : `bankCount` pour 2026 est intentionnellement null jusqu'à validation du périmètre.
  currentEdition: "2026",
  editions: {
    "2025": {
      status: "available",           // "available" | "preparation" | "archived"
      coverUrl: "/public/Couverture.png",
      coverStatus: "official",
      periodAnalyzed: "2023–2024",
      pageCount: 104,
      bankCount: 20,
      previewPdfUrl: "/public/apercu-etude-bancaire-2025.pdf", // Aperçu déjà public (teaser diffusé)
      orderEnabled: true,
      orderForms: {
        essential:  "https://fenekio.com/tandp/ps/forms/wtl/0bccc65018b199f02aaa3c4480417faa?styled=1",
        pro:        "https://fenekio.com/tandp/ps/forms/wtl/2f4348a8582cd25ba9b432a05d0f0fea?styled=1",
        corporate:  "https://fenekio.com/tandp/ps/forms/wtl/4ef2febf12076dca8bd2ff812cf9a824?styled=1"
      },
      pricing: {
        essential:  { label: "Pack Essentiel",          price: "84 000 DA HT",  users: 1  },
        pro:        { label: "Pack Pro",                 price: "120 000 DA HT", users: 3  },
        corporate:  { label: "Pack Corporate Executive", price: "180 000 DA HT", users: 20 }
      }
    },
    "2026": {
      status: "preorder",            // "available" | "preorder" | "preparation" | "archived"
      coverUrl: null,                // null = visuel provisoire généré en CSS/HTML
      coverStatus: "provisional",    // "provisional" | "official"
      periodAnalyzed: "2023–2025",
      pageCount: null,               // Non renseigné → non affiché
      bankCount: 21,                 // 21 banques commerciales couvertes en 2026 (avec Ziraat Bank)
      releaseDate: null,             // Non validée → non affichée
      synthesisAvailable: false,     // Synthèse exécutive non exposée
      leadFormEndpoint: null,        // null = formulaire en mode fallback/réservation
      orderEnabled: false,
      preorderEnabled: true,
      preorderMode: "lead",          // "direct" (paiement direct) | "lead" (réservation commerciale)
      earlyBird: {
        enabled: true,
        deadline: "2026-08-31T23:59:59+01:00"
      },
      offers: {
        essential: {
          enabled: true,
          title: "Pack Essentiel",
          regularPrice: 84000,
          earlyBirdPrice: 75600,
          discountPercentage: 10,
          savingAmount: 8400,
          currency: "DA HT",
          userLicenses: 1,
          orderMode: "lead",
          orderFormUrl: null
        },
        pro: {
          enabled: true,
          title: "Pack Pro",
          regularPrice: 120000,
          earlyBirdPrice: 108000,
          discountPercentage: 10,
          savingAmount: 12000,
          currency: "DA HT",
          userLicenses: 3,
          orderMode: "lead",
          orderFormUrl: null,
          recommended: true
        },
        corporate: {
          enabled: true,
          title: "Pack Corporate Executive",
          regularPrice: 180000,
          earlyBirdPrice: 162000,
          discountPercentage: 10,
          savingAmount: 18000,
          currency: "DA HT",
          userLicenses: 20,
          orderMode: "lead",
          orderFormUrl: null
        }
      }
    }
  },

  // ── Contact & Réseaux sociaux ─────────────────────────────────────────────
  contact: {
    address: "Cité Naii Rue G N°1, Blida, Algérie",
    email: "info@tadjeddine-partners.com",
    phones: ["+213 (0) 560 403 405", "+213 (0) 560 349 059"]
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/tadjeddine-partners"
  },
  externalLinks: {
    publisherWebsite: "https://tadjeddine-partners.com",
    servicesPage:     "https://tadjeddine-partners.com/services/",
    contactPage:      "https://tadjeddine-partners.com/contact/",
    legalPage:        "/banques2025/fr/mentions-legales/",
    termsPage:        "/banques2025/fr/conditions-utilisation/",
    privacyPage:      "/banques2025/fr/politique-confidentialite/"
  },
  questionnaire: {
    enabled: true,
    year: "2026",
    scriptUrl: null
  }
};

// Compatibilité CommonJS (pour scripts/compile.js côté Node)
if (typeof module !== "undefined" && module.exports) {
  module.exports = SITE_CONFIG;
}
