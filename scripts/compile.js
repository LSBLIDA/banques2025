#!/usr/bin/env node
/**
 * ABIX — Générateur de site statique
 *
 * Ce script lit les templates HTML depuis /templates/, les configurations depuis
 * /js/site-config.js et les dictionnaires de /locales/, puis génère les fichiers
 * statiques finaux dans les répertoires /{lang}/.
 *
 * Usage :
 *   node scripts/compile.js              → Génère toutes les langues actives
 *   node scripts/compile.js --lang fr    → Génère uniquement la langue fr
 *   node scripts/compile.js --watch      → Mode surveillance (rebuild auto)
 */

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const langArg = args.includes("--lang") ? args[args.indexOf("--lang") + 1] : null;
const watchMode = args.includes("--watch");

// --basePath : chemin de base pour les assets (CSS, JS, images).
// Par défaut pour Laragon : /banques2025 (ou vide en production si --basePath "" est spécifié).
const hasBasePath = args.includes("--basePath");
const basePathArg = hasBasePath ? args[args.indexOf("--basePath") + 1] : "/banques2025";
const BASE_PATH = (basePathArg || "").replace(/\/$/, ""); // Supprime le slash final si présent

const SITE_CONFIG = require("../js/site-config.js");


// ── Chemins de base ────────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, "..");
const TEMPLATES_DIR = path.join(ROOT, "templates");
const LOCALES_DIR = path.join(ROOT, "locales");
const OUTPUT_ROOT = ROOT; // La racine du projet EST la racine du site

// ── Pages à générer (template → chemin de sortie) ─────────────────────────────
const PAGES = [
  { template: "homepage.html",      output: "index.html",                   titleKey: "home" },
  { template: "edition-2026.html",  output: "editions/2026/index.html",     titleKey: "edition2026" },
  { template: "edition-2025.html",  output: "editions/2025/index.html",     titleKey: "edition2025" },
  { template: "methodologie.html",  output: "methodologie/index.html",      titleKey: "methodology" },
  { template: "indice-abix.html",   output: "indice-abix/index.html",       titleKey: "abixIndex" },
  { template: "services.html",      output: "services/index.html",          titleKey: "services" },
  { template: "a-propos.html",      output: "a-propos/index.html",          titleKey: "about" },
  { template: "contact.html",       output: "contact/index.html",           titleKey: "contact" },
  { template: "classements.html",   output: "classements/index.html",       titleKey: "rankings" },
  { template: "banques.html",       output: "banques/index.html",           titleKey: "banks" },
  { template: "mentions-legales.html", output: "mentions-legales/index.html", titleKey: "legal" },
  { template: "politique-confidentialite.html", output: "politique-confidentialite/index.html", titleKey: "privacy" },
];

// ── Fonctions utilitaires ──────────────────────────────────────────────────────

/**
 * Lit le fichier locale JSON pour une langue donnée.
 */
function loadLocale(lang) {
  const filePath = path.join(LOCALES_DIR, `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Fichier locale introuvable : ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

/**
 * Lit un template HTML.
 */
function loadTemplate(templateName) {
  const filePath = path.join(TEMPLATES_DIR, templateName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Template introuvable : ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

/**
 * Accès récursif à une clé pointée ("nav.home") dans un objet.
 * Retourne null si la clé n'existe pas.
 */
function getNestedValue(obj, keyPath) {
  return keyPath.split(".").reduce((acc, key) => {
    if (acc === null || acc === undefined) return null;
    return acc[key] !== undefined ? acc[key] : null;
  }, obj);
}

/**
 * Remplace toutes les variables de la forme {{clé.sous_clé}} dans le template
 * par les valeurs du dictionnaire de traduction.
 *
 * Si une valeur est `null`, la balise {{...}} est supprimée du rendu final
 * pour éviter d'afficher "null" en production.
 */
function resolveTranslations(html, translations) {
  return html.replace(/\{\{([^}]+)\}\}/g, (match, keyPath) => {
    const value = getNestedValue(translations, keyPath.trim());
    if (value === null || value === undefined) return "";
    return String(value);
  });
}

/**
 * Génère les balises hreflang à partir des langues actives.
 */
function buildHreflang(lang, outputPath) {
  const domain = SITE_CONFIG.domain;
  const lines = [];

  for (const [l, conf] of Object.entries(SITE_CONFIG.languages)) {
    if (conf.enabled) {
      const url = `${domain}/${l}/${outputPath}`.replace(/\/+/g, "/").replace(":/", "://");
      lines.push(`<link rel="alternate" hreflang="${l}" href="${url}" />`);
    }
  }
  // x-default pointe vers la langue par défaut
  const defaultLang = SITE_CONFIG.defaultLanguage;
  const defaultUrl = `${domain}/${defaultLang}/${outputPath}`.replace(/\/+/g, "/").replace(":/", "://");
  lines.push(`<link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`);
  return lines.join("\n    ");
}

/**
 * Injecte les variables globales de configuration et le menu principal unifié dans le template.
 */
function injectConfigVars(html, lang, outputPath, pageKey, translations) {
  const langConf = SITE_CONFIG.languages[lang];
  const dir = langConf ? langConf.dir : "ltr";
  const hreflang = buildHreflang(lang, outputPath);
  const langClass = lang === "ar" ? "font-arabic" : "";
  const langSwitcher = buildLangSwitcher(lang, outputPath);
  const mainNavHtml = buildMainNav(lang, pageKey, translations, langSwitcher);

  return html
    .replace(/<nav id="main-nav"[\s\S]*?<\/nav>/gi, mainNavHtml)
    .replace(/\{\{__mainNav\}\}/g, mainNavHtml)
    .replace(/\{\{__lang\}\}/g, lang)
    .replace(/\{\{__dir\}\}/g, dir)
    .replace(/\{\{__langClass\}\}/g, langClass)
    .replace(/\{\{__hreflang\}\}/g, hreflang)
    .replace(/\{\{__canonical\}\}/g, `${SITE_CONFIG.domain}/${lang}/${outputPath}`.replace(/\/+/g, "/").replace(":/", "://"))
    .replace(/\{\{__langSwitcher\}\}/g, langSwitcher)
    .replace(/\{\{__currentEdition\}\}/g, SITE_CONFIG.currentEdition)
    .replace(/\{\{__basePath\}\}/g, BASE_PATH);
}

/**
 * Construit le HTML unifié de la barre de navigation principale (nav id="main-nav").
 */
function buildMainNav(lang, pageKey, translations, langSwitcher) {
  const tNav = translations.nav || {};
  const tHome = translations.home || {};
  const tEd2026 = translations.edition2026 || {};
  const tEd2025 = translations.edition2025 || {};

  const isHomeActive = pageKey === "home" ? " nav-link--active" : "";
  const isEd2026Active = pageKey === "edition2026" ? " nav-link--active" : "";
  const isEd2025Active = pageKey === "edition2025" ? " nav-link--active" : "";
  const isEditionsActive = (pageKey === "edition2026" || pageKey === "edition2025" || pageKey === "rankings" || pageKey === "banks") ? " nav-link--active" : "";
  const isMethodologyActive = pageKey === "methodology" ? " nav-link--active" : "";
  const isAbixIndexActive = pageKey === "abixIndex" ? " nav-link--active" : "";
  const isServicesActive = pageKey === "services" ? " nav-link--active" : "";
  const isAboutActive = pageKey === "about" ? " nav-link--active" : "";
  const isContactActive = pageKey === "contact" ? " nav-link--active" : "";

  const isHomeMobileActive = pageKey === "home" ? " mobile-nav-link--active" : "";
  const isEd2026MobileActive = pageKey === "edition2026" ? " mobile-nav-link--active" : "";
  const isEd2025MobileActive = pageKey === "edition2025" ? " mobile-nav-link--active" : "";
  const isMethodologyMobileActive = pageKey === "methodology" ? " mobile-nav-link--active" : "";
  const isAbixIndexMobileActive = pageKey === "abixIndex" ? " mobile-nav-link--active" : "";
  const isServicesMobileActive = pageKey === "services" ? " mobile-nav-link--active" : "";
  const isAboutMobileActive = pageKey === "about" ? " mobile-nav-link--active" : "";
  const isContactMobileActive = pageKey === "contact" ? " mobile-nav-link--active" : "";

  let ctaHtml = '';
  let mobileCtaHtml = '';

  if (pageKey === "edition2026") {
    const ctaText = tEd2026.hero?.ctaPreorder || tHome.hero?.ctaPreorder || "Précommander l'édition 2026";
    ctaHtml = `<a href="#precommande" data-track="click_preorder_2026" class="btn-cta-sm">${ctaText}</a>`;
    mobileCtaHtml = `<a href="#precommande" data-track="click_preorder_2026" class="btn-cta w-full text-center block">${ctaText}</a>`;
  } else if (pageKey === "edition2025") {
    const ctaText = tEd2025.hero?.ctaPrimary || tNav.ctaStudy || "Obtenir l'étude";
    ctaHtml = `<a href="#tarifs" data-track="click_edition_2025_tarifs" class="btn-cta-sm">${ctaText}</a>`;
    mobileCtaHtml = `<a href="#tarifs" data-track="click_edition_2025_tarifs" class="btn-cta w-full text-center block">${ctaText}</a>`;
  } else {
    const ctaText = tHome.hero?.ctaPreorder || tEd2026.hero?.ctaPreorder || "Précommander l'édition 2026";
    ctaHtml = `<button onclick="openPreorder('2026')" data-track="click_preorder_2026" class="btn-cta-sm">${ctaText}</button>`;
    mobileCtaHtml = `<button onclick="openPreorder('2026')" data-track="click_preorder_2026" class="btn-cta w-full text-center block">${ctaText}</button>`;
  }

  const prepBadge = lang === 'en' ? 'Pre-order' : lang === 'ar' ? 'طلب مسبق' : 'Précommande';
  const availBadge = lang === 'en' ? 'Available' : lang === 'ar' ? 'متاح' : (tEd2025.hero?.badge || 'Disponible');

  return `<nav id="main-nav" class="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 transition-all duration-300">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <a href="${BASE_PATH}/${lang}/" class="flex items-center py-1">
        <img src="${BASE_PATH}/public/logo.png" alt="ABIX — ${SITE_CONFIG.publisherName}" class="h-10 sm:h-12 w-auto object-contain" />
      </a>
      <div class="hidden md:flex items-center gap-6">
        <a href="${BASE_PATH}/${lang}/" class="nav-link${isHomeActive}">${tNav.home || "Accueil"}</a>
        <div class="relative group">
          <button class="nav-link flex items-center gap-1${isEditionsActive}" aria-expanded="false" aria-haspopup="true">
            ${tNav.editions || "Éditions"}
            <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="dropdown-menu">
            <a href="${BASE_PATH}/${lang}/editions/2026/" class="dropdown-item${isEd2026Active}">
              <span class="dropdown-badge dropdown-badge--prep">${prepBadge}</span>
              ${tNav.edition2026 || "Édition 2026"}
            </a>
            <a href="${BASE_PATH}/${lang}/editions/2025/" class="dropdown-item${isEd2025Active}">
              <span class="dropdown-badge dropdown-badge--avail">${availBadge}</span>
              ${tNav.edition2025 || "Édition 2025"}
            </a>
            <div class="border-t border-gray-100 my-1"></div>
            <a href="${BASE_PATH}/${lang}/classements/" class="dropdown-item${pageKey === 'rankings' ? ' nav-link--active' : ''}">
              ${tNav.rankings || "Classements"}
            </a>
            <a href="${BASE_PATH}/${lang}/banques/" class="dropdown-item${pageKey === 'banks' ? ' nav-link--active' : ''}">
              ${tNav.banks || "Banques"}
            </a>
          </div>
        </div>
        <a href="${BASE_PATH}/${lang}/methodologie/" class="nav-link${isMethodologyActive}">${tNav.methodology || "Méthodologie"}</a>
        <a href="${BASE_PATH}/${lang}/indice-abix/" class="nav-link${isAbixIndexActive}">${tNav.abixIndex || "Projet ABIX"}</a>
        <a href="${BASE_PATH}/${lang}/services/" class="nav-link${isServicesActive}">${tNav.services || "Services"}</a>
        <a href="${BASE_PATH}/${lang}/a-propos/" class="nav-link${isAboutActive}">${tNav.about || "À propos"}</a>
        <a href="${BASE_PATH}/${lang}/contact/" class="nav-link${isContactActive}">${tNav.contact || "Contact"}</a>
      </div>
      <div class="hidden md:flex items-center gap-4">
        <div class="lang-switcher" aria-label="${tNav.langSelectLabel || 'Langue'}">
          ${langSwitcher}
        </div>
        ${ctaHtml}
      </div>
      <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-expanded="false" aria-controls="mobile-menu" aria-label="Menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </div>
  <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 shadow-lg">
    <div class="px-4 py-4 space-y-1">
      <a href="${BASE_PATH}/${lang}/" class="mobile-nav-link${isHomeMobileActive}">${tNav.home || "Accueil"}</a>
      <div class="ps-2 border-l-2 border-primary/20 space-y-1 my-1">
        <a href="${BASE_PATH}/${lang}/editions/2026/" class="mobile-nav-link flex items-center justify-between${isEd2026MobileActive}">
          <span>${tNav.edition2026 || "Édition 2026"}</span>
          <span class="dropdown-badge dropdown-badge--prep">${prepBadge}</span>
        </a>
        <a href="${BASE_PATH}/${lang}/editions/2025/" class="mobile-nav-link flex items-center justify-between${isEd2025MobileActive}">
          <span>${tNav.edition2025 || "Édition 2025"}</span>
          <span class="dropdown-badge dropdown-badge--avail">${availBadge}</span>
        </a>
        <a href="${BASE_PATH}/${lang}/classements/" class="mobile-nav-link${pageKey === 'rankings' ? ' mobile-nav-link--active' : ''}">${tNav.rankings || "Classements"}</a>
        <a href="${BASE_PATH}/${lang}/banques/" class="mobile-nav-link${pageKey === 'banks' ? ' mobile-nav-link--active' : ''}">${tNav.banks || "Banques"}</a>
      </div>
      <a href="${BASE_PATH}/${lang}/methodologie/" class="mobile-nav-link${isMethodologyMobileActive}">${tNav.methodology || "Méthodologie"}</a>
      <a href="${BASE_PATH}/${lang}/indice-abix/" class="mobile-nav-link${isAbixIndexMobileActive}">${tNav.abixIndex || "Projet ABIX"}</a>
      <a href="${BASE_PATH}/${lang}/services/" class="mobile-nav-link${isServicesMobileActive}">${tNav.services || "Services"}</a>
      <a href="${BASE_PATH}/${lang}/a-propos/" class="mobile-nav-link${isAboutMobileActive}">${tNav.about || "À propos"}</a>
      <a href="${BASE_PATH}/${lang}/contact/" class="mobile-nav-link${isContactMobileActive}">${tNav.contact || "Contact"}</a>
      <div class="pt-3 border-t border-gray-100">
        <p class="text-xs text-gray-400 mb-2 px-2">${tNav.langSelectLabel || "Langue"}</p>
        <div class="lang-switcher-mobile">${langSwitcher}</div>
      </div>
      <div class="pt-2">
        ${mobileCtaHtml}
      </div>
    </div>
  </div>
</nav>`;
}

/**
 * Construit le HTML du sélecteur de langues (barre navigation sous forme de dropdown).
 */
function buildLangSwitcher(currentLang, currentPath) {
  const allLangs = SITE_CONFIG.languages;
  const currentConf = allLangs[currentLang] || { nativeLabel: "Français", code: "fr" };
  const pageSlug = currentPath.replace("index.html", "");

  const options = Object.entries(allLangs)
    .filter(([, conf]) => conf.enabled || conf.status === "draft")
    .map(([l, conf]) => {
      const href = `${BASE_PATH}/${l}/${pageSlug}`.replace(/\/+/g, "/");
      const isActive = l === currentLang;
      const statusBadge = conf.status === "draft" ? '<span class="ms-auto text-[9px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80">Brouillon</span>' : '';
      return `<a href="${href}" class="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors${isActive ? " bg-primary/5 text-primary font-bold" : ""}" hreflang="${l}" lang="${l}">
        <span class="w-5 text-center font-bold text-[10px] text-gray-400 uppercase">${l}</span>
        <span>${conf.nativeLabel}</span>
        ${statusBadge}
      </a>`;
    })
    .join('');

  return `
    <div class="relative group inline-block text-left">
      <button type="button" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 focus:outline-none transition-all shadow-sm" aria-expanded="false" aria-haspopup="true">
        <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
        <span>${currentConf.nativeLabel}</span>
        <svg class="w-3.5 h-3.5 text-gray-400 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
      </button>
      <div class="dropdown-menu absolute right-0 mt-1 w-44 rounded-xl bg-white shadow-xl ring-1 ring-black/5 p-1.5 hidden group-hover:block transition-all z-50">
        ${options}
      </div>
    </div>
  `;
}

/**
 * Assure la création récursive des répertoires nécessaires.
 */
function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ── Boucle de génération ───────────────────────────────────────────────────────

function buildAll(targetLang = null) {
  const languages = Object.entries(SITE_CONFIG.languages)
    .filter(([lang, conf]) => {
      if (targetLang) return lang === targetLang;
      return conf.enabled; // En production, on ne génère que les langues activées
    });

  if (languages.length === 0) {
    console.warn("[compile] Aucune langue active trouvée dans site-config.js");
    return;
  }

  let generatedCount = 0;
  let errors = [];

  for (const [lang, langConf] of languages) {
    const translations = loadLocale(lang);

    for (const page of PAGES) {
      try {
        const templateHtml = loadTemplate(page.template);

        // Injection des variables de configuration, hreflang et menu principal unifié
        let html = injectConfigVars(templateHtml, lang, page.output, page.titleKey, translations);

        // Résolution des clés de traduction {{key.subkey}}
        html = resolveTranslations(html, translations);

        // Chemin de sortie : /{lang}/{output}
        const outputPath = path.join(OUTPUT_ROOT, lang, page.output);
        ensureDir(outputPath);
        fs.writeFileSync(outputPath, html, "utf8");

        console.log(`[compile] ✓ ${lang}/${page.output}`);
        generatedCount++;
      } catch (err) {
        const errMsg = `[compile] ✗ ${lang}/${page.output} → ${err.message}`;
        console.error(errMsg);
        errors.push(errMsg);
      }
    }
  }

  console.log(`\n[compile] ${generatedCount} fichiers générés.`);
  if (errors.length > 0) {
    console.error(`[compile] ${errors.length} erreur(s) :`);
    errors.forEach(e => console.error("  " + e));
    process.exit(1);
  }
}

buildAll(langArg);

if (watchMode) {
  console.log("[compile] Mode surveillance actif. Appuyez sur Ctrl+C pour arrêter.");
  const dirsToWatch = [TEMPLATES_DIR, LOCALES_DIR];
  dirsToWatch.forEach(dir => {
    fs.watch(dir, { recursive: true }, (event, filename) => {
      console.log(`[compile] Changement détecté : ${filename}. Regénération...`);
      buildAll(langArg);
    });
  });
}
