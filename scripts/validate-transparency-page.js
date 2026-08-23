/**
 * ABIX — Script de validation et de test automatisé pour la page Disponibilité 2025
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let failures = 0;
let passes = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passes++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failures++;
  }
}

console.log("=================================================================");
console.log("ABIX — Validation éditoriale & technique : Disponibilité 2025");
console.log("=================================================================\n");

// ── 1. TEST DU FICHIER SOURCE DATA ─────────────────────────────────────────────
console.log("1. Validation du jeu de données source (data/transparency/2025.json)...");
const dataPath = path.join(ROOT, 'data', 'transparency', '2025.json');
assert(fs.existsSync(dataPath), "Le fichier data/transparency/2025.json existe.");

const rawJson = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const dataset = rawJson.dataset;
assert(dataset && Array.isArray(dataset.banks), "La structure dataset.banks est un tableau.");
assert(dataset.banks.length === 21, `Nombre total de banques analysées = 21 (actuel: ${dataset.banks.length}).`);

const scoredBanks = dataset.banks.filter(b => !b.not_scored && b.global_score !== null);
const notScoredBanks = dataset.banks.filter(b => b.not_scored || b.global_score === null);
assert(scoredBanks.length === 20, `Nombre de banques scorées = 20 (actuel: ${scoredBanks.length}).`);
assert(notScoredBanks.length === 1, `Nombre de banques non scorées = 1 (actuel: ${notScoredBanks.length}).`);
assert(notScoredBanks[0].id === 'ziraat', `La banque non scorée est bien Ziraat (actuel: ${notScoredBanks[0].id}).`);
assert(notScoredBanks[0].not_scored === true, "Ziraat a bien not_scored: true.");
assert(notScoredBanks[0].global_score === null, "Ziraat a bien global_score === null (jamais 0).");

// Validation des bornes des scores
scoredBanks.forEach(b => {
  assert(b.financial_statements_score >= 0 && b.financial_statements_score <= 3, `Score comptes de ${b.name} (${b.financial_statements_score}) dans [0, 3].`);
  assert(b.activity_report_score >= 0 && b.activity_report_score <= 3, `Score rapport de ${b.name} (${b.activity_report_score}) dans [0, 3].`);
  assert(b.global_score >= 0 && b.global_score <= 6, `Score global de ${b.name} (${b.global_score}) dans [0, 6].`);
  assert(b.financial_statements_score + b.activity_report_score === b.global_score, `Cohérence somme des scores pour ${b.name}.`);
});

// Vérification des statistiques de synthèse
assert(dataset.summary.banks_analyzed === 21, "summary.banks_analyzed === 21");
assert(dataset.summary.banks_scored === 20, "summary.banks_scored === 20");
assert(dataset.summary.banks_not_scored === 1, "summary.banks_not_scored === 1");
assert(dataset.summary.banks_with_6_of_6 === 3, "summary.banks_with_6_of_6 === 3");
assert(dataset.summary.banks_with_at_least_5_of_6 === 9, "summary.banks_with_at_least_5_of_6 === 9");
assert(dataset.summary.banks_with_0_of_6 === 9, "summary.banks_with_0_of_6 === 9");
assert(dataset.summary.average_global_score_scored_banks === 2.7, "summary.average_global_score_scored_banks === 2.7");
assert(dataset.summary.median_global_score_scored_banks === 3.0, "summary.median_global_score_scored_banks === 3.0");

// ── 2. TEST DES FICHIERS I18N ──────────────────────────────────────────────────
console.log("\n2. Validation des dictionnaires i18n (FR, EN, AR)...");
const locales = ['fr', 'en', 'ar'];
locales.forEach(lang => {
  const locPath = path.join(ROOT, 'locales', `${lang}.json`);
  assert(fs.existsSync(locPath), `Fichier locales/${lang}.json existe.`);
  const loc = JSON.parse(fs.readFileSync(locPath, 'utf8'));
  assert(loc.nav && loc.nav.transparency2025, `Clé nav.transparency2025 présente en ${lang}.`);
  assert(loc.transparency2025, `Section transparency2025 présente en ${lang}.`);
  const t = loc.transparency2025;
  assert(t.meta && t.meta.title && t.meta.description, `transparency2025.meta complet en ${lang}.`);
  assert(t.hero && t.hero.title && t.hero.subtitle && t.hero.kpiDistinction, `transparency2025.hero complet en ${lang}.`);
  assert(t.why && t.why.title && t.why.collaboration, `transparency2025.why complet en ${lang}.`);
  assert(t.methodology && t.methodology.title && t.methodology.disclaimerText && t.methodology.stateAtDateText, `transparency2025.methodology complet en ${lang}.`);
  assert(t.stats && t.stats.avgScoreLabel && t.stats.zeroScoreExplanation, `transparency2025.stats complet en ${lang}.`);
  assert(t.ranking && t.ranking.title && t.ranking.notScoredBadge, `transparency2025.ranking complet en ${lang}.`);
  assert(t.table && t.table.title && t.table.colBank, `transparency2025.table complet en ${lang}.`);
  assert(t.updateReport && t.updateReport.title && t.updateReport.cta, `transparency2025.updateReport complet en ${lang}.`);
  assert(t.insights && t.insights.title && t.insights.paragraph1, `transparency2025.insights complet en ${lang}.`);
  assert(t.future && t.future.title && t.future.paragraph1, `transparency2025.future complet en ${lang}.`);
  assert(t.cta && t.cta.title && t.cta.ctaExplorer, `transparency2025.cta complet en ${lang}.`);
});

// ── 3. TEST DE GÉNÉRATION DES PAGES COMPILÉES ──────────────────────────────────
console.log("\n3. Validation des pages HTML compilées...");
const compiledTargets = [
  { lang: 'fr', relPath: 'fr/insights/transparence-information-financiere-2025/index.html' },
  { lang: 'en', relPath: 'en/insights/transparence-information-financiere-2025/index.html' },
  { lang: 'ar', relPath: 'ar/insights/transparence-information-financiere-2025/index.html' }
];

compiledTargets.forEach(({ lang, relPath }) => {
  const fullPath = path.join(ROOT, relPath);
  assert(fs.existsSync(fullPath), `Page compilée générée: ${relPath}`);
  if (!fs.existsSync(fullPath)) return;

  const html = fs.readFileSync(fullPath, 'utf8');

  // Pas de balises templates non résolues
  const unrendered = html.match(/\{\{[^}]+\}\}/g);
  assert(!unrendered, `Zéro balise {{...}} non résolue dans ${relPath} (trouvé: ${unrendered ? unrendered.join(', ') : '0'}).`);

  // Pas de "null", "undefined", "NaN"
  assert(!html.includes('undefined'), `Pas de "undefined" visible dans ${relPath}.`);
  assert(!html.includes('NaN'), `Pas de "NaN" dans ${relPath}.`);
  assert(!html.includes('>null<') && !html.includes('> null <'), `Pas de ">null<" dans ${relPath}.`);

  // Vérification de Ziraat
  assert(html.includes('Ziraat'), `Présence de Ziraat dans ${relPath}.`);
  assert(!html.includes('Ziraat</span>\n          </div>\n        </div>\n        <div class="flex items-center gap-2">\n          <span class="text-2xl font-extrabold font-playfair text-gray-400">0</span>'), `Ziraat n'a pas 0/6 dans ${relPath}.`);

  // Vérifications éditoriales strictes (termes prohibés)
  assert(!html.includes('Sekak Conseils'), `Absence de "Sekak Conseils" dans ${relPath}.`);
  assert(!html.includes('SEKAK CONSEILS'), `Absence de "SEKAK CONSEILS" dans ${relPath}.`);
  assert(!html.includes('banque opaque') && !html.includes('banques opaques'), `Absence de "banque opaque" dans ${relPath}.`);
  assert(!html.includes('non transparente') && !html.includes('manque de transparence'), `Absence de "non transparente/manque de transparence" dans ${relPath}.`);
  assert(!html.includes('non conforme'), `Absence de "non conforme" dans ${relPath}.`);
  assert(!html.includes('meilleure banque') && !html.includes('meilleures banques'), `Absence de "meilleure banque" dans ${relPath}.`);
  assert(!html.includes('pire banque') && !html.includes('pires banques'), `Absence de "pire banque" dans ${relPath}.`);
  assert(!html.includes('qualité des comptes') && !html.includes('qualité de l’information'), `Absence de "qualité des comptes" dans ${relPath}.`);
  assert(!html.includes('mauvaise gouvernance'), `Absence de "mauvaise gouvernance" dans ${relPath}.`);
  assert(!html.includes('mauvaise transparence'), `Absence de "mauvaise transparence" dans ${relPath}.`);
  assert(!html.includes('classement des banques'), `Absence de "classement des banques" dans ${relPath}.`);
  assert(!html.includes('FinancialReport'), `Absence de "FinancialReport" dans ${relPath} (Article et Dataset privilégiés).`);

  // Termes et composants obligatoires
  assert(html.includes('Sekak Rachid') || html.includes('سكاك رشيد'), `Attribution de la collaboration à M. Sekak Rachid dans ${relPath}.`);
  assert(html.includes('20') && html.includes('1'), `Distinction 20 scorés / 1 non scoré présente dans ${relPath}.`);
  assert(html.includes('mailto:info@tadjeddine-partners.com'), `Bloc de mise à jour / rectification présent dans ${relPath}.`);
});

console.log("\n=================================================================");
console.log(`RÉSULTAT DE LA VALIDATION : ${passes} tests réussis, ${failures} échecs.`);
console.log("=================================================================\n");

if (failures > 0) {
  process.exit(1);
}
