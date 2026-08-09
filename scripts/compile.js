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
const basePathArg = hasBasePath ? args[args.indexOf("--basePath") + 1] : "";
const BASE_PATH = (basePathArg || "").replace(/\/$/, ""); // Supprime le slash final si présent

const SITE_CONFIG = require("../js/site-config.js");


// ── Chemins de base ────────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, "..");
const TEMPLATES_DIR = path.join(ROOT, "templates");
const LOCALES_DIR = path.join(ROOT, "locales");
const OUTPUT_ROOT = ROOT; // La racine du projet EST la racine du site

// ── Pages à générer (template → chemin de sortie) ─────────────────────────────
const PAGES = [
  { template: "homepage.html", output: "index.html", titleKey: "home" },
  { template: "edition-2026.html", output: "editions/2026/index.html", titleKey: "edition2026" },
  { template: "edition-2025.html", output: "editions/2025/index.html", titleKey: "edition2025" },
  { template: "rapport-2023.html", output: "editions/rapport-2023/index.html", titleKey: "rapport2023" },
  { template: "methodologie.html", output: "methodologie/index.html", titleKey: "methodology" },
  { template: "indice-abix.html", output: "indice-abix/index.html", titleKey: "abixIndex" },
  { template: "services.html", output: "services/index.html", titleKey: "services" },
  { template: "a-propos.html", output: "a-propos/index.html", titleKey: "about" },
  { template: "contact.html", output: "contact/index.html", titleKey: "contact" },
  { template: "questionnaire.html", output: "questionnaire/index.html", titleKey: "questionnaire" },
  { template: "classements.html", output: "classements/index.html", titleKey: "rankings" },
  { template: "banques.html", output: "banques/index.html", titleKey: "banks" },
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
      let targetOutputPath = outputPath;
      if (outputPath.includes("rapport-2023") || outputPath.includes("report-2023")) {
        targetOutputPath = l === "fr" ? "editions/rapport-2023/index.html" : "editions/report-2023/index.html";
      }
      const url = `${domain}/${l}/${targetOutputPath}`.replace(/\/+/g, "/").replace(":/", "://");
      lines.push(`<link rel="alternate" hreflang="${l}" href="${url}" />`);
    }
  }
  // x-default pointe vers la langue par défaut
  const defaultLang = SITE_CONFIG.defaultLanguage;
  let defaultOutputPath = outputPath;
  if (outputPath.includes("rapport-2023") || outputPath.includes("report-2023")) {
    defaultOutputPath = defaultLang === "fr" ? "editions/rapport-2023/index.html" : "editions/report-2023/index.html";
  }
  const defaultUrl = `${domain}/${defaultLang}/${defaultOutputPath}`.replace(/\/+/g, "/").replace(":/", "://");
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
  const mobileLangSwitcher = buildMobileLangSwitcher(lang, outputPath);
  const mainNavHtml = buildMainNav(lang, pageKey, translations, langSwitcher, mobileLangSwitcher);

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
function buildMainNav(lang, pageKey, translations, langSwitcher, mobileLangSwitcher) {
  const tNav = translations.nav || {};
  const tHome = translations.home || {};
  const tEd2026 = translations.edition2026 || {};
  const tEd2025 = translations.edition2025 || {};

  const isHomeActive = pageKey === "home" ? " nav-link--active" : "";
  const isEditionsActive = (pageKey === "edition2026" || pageKey === "edition2025" || pageKey === "rapport2023" || pageKey === "rankings" || pageKey === "banks") ? " nav-link--active" : "";
  const isStudyActive = (pageKey === "methodology" || pageKey === "questionnaire") ? " nav-link--active" : "";
  const isAbixIndexActive = pageKey === "abixIndex" ? " nav-link--active" : "";
  const isServicesActive = pageKey === "services" ? " nav-link--active" : "";
  const isAboutActive = (pageKey === "about" || pageKey === "contact") ? " nav-link--active" : "";

  const isEd2026Active = pageKey === "edition2026" ? " nav-link--active" : "";
  const isEd2025Active = pageKey === "edition2025" ? " nav-link--active" : "";
  const isReportActive = pageKey === "rapport2023" ? " nav-link--active" : "";
  const isMethodologyActive = pageKey === "methodology" ? " nav-link--active" : "";
  const isQuestionnaireActive = pageKey === "questionnaire" ? " nav-link--active" : "";
  const isAboutPageActive = pageKey === "about" ? " nav-link--active" : "";
  const isContactPageActive = pageKey === "contact" ? " nav-link--active" : "";

  let ctaHtml = '';
  let mobileCtaHtml = '';

  const targetTarifs2026 = `${BASE_PATH}/${lang}/editions/2026/#tarifs`;
  const ctaText = tHome.hero?.ctaPreorder || tEd2026.hero?.ctaPreorder || "Souscrire à l'édition 2026";

  if (pageKey === "edition2026") {
    ctaHtml = `<a href="#tarifs" data-track="click_preorder_2026" class="btn-cta-sm whitespace-nowrap">${ctaText}</a>`;
    mobileCtaHtml = `<a href="#tarifs" data-track="click_preorder_2026" class="btn-cta w-full text-center block">${ctaText}</a>`;
  } else {
    ctaHtml = `<a href="${targetTarifs2026}" data-track="click_preorder_2026" class="btn-cta-sm whitespace-nowrap">${ctaText}</a>`;
    mobileCtaHtml = `<a href="${targetTarifs2026}" data-track="click_preorder_2026" class="btn-cta w-full text-center block">${ctaText}</a>`;
  }

  const prepBadge = lang === 'en' ? 'Early Subscription' : lang === 'ar' ? 'اشتراك مسبق' : 'Souscription';
  const availBadge = lang === 'en' ? 'Available' : lang === 'ar' ? 'متاح' : (tEd2025.hero?.badge || 'Disponible');
  const freeBadge = lang === 'en' ? 'Free' : lang === 'ar' ? 'مجاني' : 'Gratuit';
  const report2023Label = lang === 'en' ? '2023 Report' : lang === 'ar' ? 'تقرير 2023' : 'Rapport 2023';
  const reportPath = lang === 'fr' ? 'editions/rapport-2023/' : 'editions/report-2023/';

  return `<nav id="main-nav" class="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 transition-all duration-300">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <a href="${BASE_PATH}/${lang}/" class="flex items-center py-1 flex-shrink-0" aria-label="${tNav.home || 'Accueil'}">
        <img src="${BASE_PATH}/public/logo.png" alt="ABIX — ${SITE_CONFIG.publisherName}" class="h-10 sm:h-12 w-auto object-contain" />
      </a>
      <div class="hidden md:flex items-center gap-5 lg:gap-6">
        <!-- Menu 0 : Accueil -->
        <a href="${BASE_PATH}/${lang}/" class="nav-link whitespace-nowrap${isHomeActive}">${tNav.home || "Accueil"}</a>

        <!-- Menu 1 : Éditions -->
        <div class="relative group">
          <button class="nav-link flex items-center gap-1 whitespace-nowrap${isEditionsActive}" aria-expanded="false" aria-haspopup="true">
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
            <a href="${BASE_PATH}/${lang}/${reportPath}" class="dropdown-item${isReportActive}">
              <span class="dropdown-badge dropdown-badge--free">${freeBadge}</span>
              ${report2023Label}
            </a>
          </div>
        </div>

        <!-- Menu 2 : L'étude -->
        <div class="relative group">
          <button class="nav-link flex items-center gap-1 whitespace-nowrap${isStudyActive}" aria-expanded="false" aria-haspopup="true">
            ${tNav.study || "L’étude"}
            <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="dropdown-menu">
            <a href="${BASE_PATH}/${lang}/methodologie/" class="dropdown-item${isMethodologyActive}">
              ${tNav.methodology || "Méthodologie"}
            </a>
            <a href="${BASE_PATH}/${lang}/questionnaire/" class="dropdown-item${isQuestionnaireActive}">
              ${tNav.barometer2026 || "Baromètre e-banking 2026"}
            </a>
          </div>
        </div>

        <!-- Menu 4 : Services -->
        <a href="${BASE_PATH}/${lang}/services/" class="nav-link whitespace-nowrap${isServicesActive}">${tNav.services || "Services"}</a>

        <!-- Menu 5 : À propos -->
        <div class="relative group">
          <button class="nav-link flex items-center gap-1 whitespace-nowrap${isAboutActive}" aria-expanded="false" aria-haspopup="true">
            ${tNav.about || "À propos"}
            <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="dropdown-menu">
            <a href="${BASE_PATH}/${lang}/a-propos/" class="dropdown-item${isAboutPageActive}">
              ${tNav.about || "À propos"}
            </a>
            <a href="${BASE_PATH}/${lang}/contact/" class="dropdown-item${isContactPageActive}">
              ${tNav.contact || "Contact"}
            </a>
          </div>
        </div>
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
    <div class="px-4 py-4 space-y-2">
      <!-- Item 0 : Accueil -->
      <a href="${BASE_PATH}/${lang}/" class="mobile-nav-link${pageKey === 'home' ? ' mobile-nav-link--active' : ''}">${tNav.home || "Accueil"}</a>

      <!-- Section 1 : Éditions -->
      <div>
        <span class="block px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-400">${tNav.editions || "Éditions"}</span>
        <div class="ps-3 border-s-2 border-primary/20 space-y-1 my-1">
          <a href="${BASE_PATH}/${lang}/editions/2026/" class="mobile-nav-link flex items-center justify-between${pageKey === 'edition2026' ? ' mobile-nav-link--active' : ''}">
            <span>${tNav.edition2026 || "Édition 2026"}</span>
            <span class="dropdown-badge dropdown-badge--prep">${prepBadge}</span>
          </a>
          <a href="${BASE_PATH}/${lang}/editions/2025/" class="mobile-nav-link flex items-center justify-between${pageKey === 'edition2025' ? ' mobile-nav-link--active' : ''}">
            <span>${tNav.edition2025 || "Édition 2025"}</span>
            <span class="dropdown-badge dropdown-badge--avail">${availBadge}</span>
          </a>
          <a href="${BASE_PATH}/${lang}/${reportPath}" class="mobile-nav-link flex items-center justify-between${pageKey === 'rapport2023' ? ' mobile-nav-link--active' : ''}">
            <span>${report2023Label}</span>
            <span class="dropdown-badge dropdown-badge--free">${freeBadge}</span>
          </a>
        </div>
      </div>

      <!-- Section 2 : L'étude -->
      <div>
        <span class="block px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-400">${tNav.study || "L’étude"}</span>
        <div class="ps-3 border-s-2 border-primary/20 space-y-1 my-1">
          <a href="${BASE_PATH}/${lang}/methodologie/" class="mobile-nav-link${pageKey === 'methodology' ? ' mobile-nav-link--active' : ''}">${tNav.methodology || "Méthodologie"}</a>
          <a href="${BASE_PATH}/${lang}/questionnaire/" class="mobile-nav-link${pageKey === 'questionnaire' ? ' mobile-nav-link--active' : ''}">${tNav.barometer2026 || "Baromètre e-banking 2026"}</a>
        </div>
      </div>

      <!-- Item 4 : Services -->
      <a href="${BASE_PATH}/${lang}/services/" class="mobile-nav-link${pageKey === 'services' ? ' mobile-nav-link--active' : ''}">${tNav.services || "Services"}</a>

      <!-- Section 5 : À propos -->
      <div>
        <span class="block px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-400">${tNav.about || "À propos"}</span>
        <div class="ps-3 border-s-2 border-primary/20 space-y-1 my-1">
          <a href="${BASE_PATH}/${lang}/a-propos/" class="mobile-nav-link${pageKey === 'about' ? ' mobile-nav-link--active' : ''}">${tNav.about || "À propos"}</a>
          <a href="${BASE_PATH}/${lang}/contact/" class="mobile-nav-link${pageKey === 'contact' ? ' mobile-nav-link--active' : ''}">${tNav.contact || "Contact"}</a>
        </div>
      </div>

      <div class="pt-3 border-t border-gray-100">
        <p class="text-xs text-gray-400 mb-2 px-2">${tNav.langSelectLabel || "Langue"}</p>
        <div class="lang-switcher-mobile">${mobileLangSwitcher}</div>
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
      let targetPageSlug = pageSlug;
      if (pageSlug.includes("rapport-2023") || pageSlug.includes("report-2023")) {
        targetPageSlug = l === "fr" ? "editions/rapport-2023/" : "editions/report-2023/";
      }
      const href = `${BASE_PATH}/${l}/${targetPageSlug}`.replace(/\/+/g, "/");
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
    <div class="relative group inline-block text-left lang-switcher-container">
      <button type="button" class="lang-switcher-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 focus:outline-none transition-all shadow-sm" aria-expanded="false" aria-haspopup="true">
        <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
        <span>${currentConf.nativeLabel}</span>
        <svg class="w-3.5 h-3.5 text-gray-400 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
      </button>
      <div class="lang-dropdown-menu dropdown-menu absolute end-0 top-full mt-1 w-44 rounded-xl bg-white shadow-xl ring-1 ring-black/5 p-1.5 hidden group-hover:block [.is-open_&]:block transition-all z-50 before:absolute before:-top-3 before:inset-x-0 before:h-3">
        ${options}
      </div>
    </div>
  `;
}

/**
 * Construit le HTML du sélecteur de langues pour le menu mobile (pills).
 */
function buildMobileLangSwitcher(currentLang, currentPath) {
  const allLangs = SITE_CONFIG.languages;
  const pageSlug = currentPath.replace("index.html", "");

  const options = Object.entries(allLangs)
    .filter(([, conf]) => conf.enabled || conf.status === "draft")
    .map(([l, conf]) => {
      let targetPageSlug = pageSlug;
      if (pageSlug.includes("rapport-2023") || pageSlug.includes("report-2023")) {
        targetPageSlug = l === "fr" ? "editions/rapport-2023/" : "editions/report-2023/";
      }
      const href = `${BASE_PATH}/${l}/${targetPageSlug}`.replace(/\/+/g, "/");
      const isActive = l === currentLang;
      return `<a href="${href}" class="flex-1 text-center py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
        isActive
          ? "bg-primary text-white border-primary shadow-sm"
          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
      }" hreflang="${l}" lang="${l}">
        ${conf.nativeLabel}
      </a>`;
    })
    .join('');

  return `<div class="flex items-center gap-2 px-1">${options}</div>`;
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

        let pageOutput = page.output;
        if (page.titleKey === "rapport2023") {
          pageOutput = lang === "fr" ? "editions/rapport-2023/index.html" : "editions/report-2023/index.html";
        }

        // Injection des variables de configuration, hreflang et menu principal unifié
        let html = injectConfigVars(templateHtml, lang, pageOutput, page.titleKey, translations);

        // Résolution des clés de traduction {{key.subkey}}
        html = resolveTranslations(html, translations);

        // Chemin de sortie : /{lang}/{output}
        const outputPath = path.join(OUTPUT_ROOT, lang, pageOutput);
        ensureDir(outputPath);
        fs.writeFileSync(outputPath, html, "utf8");

        console.log(`[compile] ✓ ${lang}/${pageOutput}`);
        generatedCount++;
      } catch (err) {
        const pageOutput = page.titleKey === "rapport2023" ? (lang === "fr" ? "editions/rapport-2023/index.html" : "editions/report-2023/index.html") : page.output;
        const errMsg = `[compile] ✗ ${lang}/${pageOutput} → ${err.message}`;
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
