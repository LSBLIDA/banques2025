const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const offers = require('../data/offers-2026.json');

assert.equal(offers.plans.essentiel.regular_price_ht, 84000, 'Essentiel 2026 doit rester à 84 000 DA HT');
assert.equal(offers.plans.pro.regular_price_ht, 120000, 'Pro 2026 doit rester à 120 000 DA HT');
assert.equal(offers.plans.corporate.regular_price_ht, 280000, 'Corporate 2026 doit être à 280 000 DA HT');
assert.equal(offers.plans.corporate.total_ttc, 333200, 'Le TTC Corporate doit être recalculé à 19 %');

const cases = [
  { lang: 'fr', planning: 'planification-strategique', price: '280 000 DA HT', title: 'Votre plan stratégique bancaire' },
  { lang: 'en', planning: 'strategic-planning', price: '280,000 DA excl. tax', title: 'Your banking strategic plan' },
  { lang: 'ar', planning: 'planification-strategique', price: '280,000 دج بدون ضريبة', title: 'خطتكم الاستراتيجية المصرفية' }
];

for (const item of cases) {
  const editionPath = path.join(root, item.lang, 'editions', '2026', 'index.html');
  const planningPath = path.join(root, item.lang, item.planning, 'index.html');
  const homePath = path.join(root, item.lang, 'index.html');
  const explorerPath = path.join(root, item.lang, 'data-explorer', 'index.html');
  const confirmationRoot = item.lang === 'en' ? ['subscription', 'confirmation', 'corporate'] : ['souscription', 'confirmation', 'corporate'];
  const confirmationPath = path.join(root, item.lang, ...confirmationRoot, 'index.html');

  for (const file of [editionPath, planningPath, homePath, explorerPath, confirmationPath]) {
    assert.ok(fs.existsSync(file), `Page générée absente: ${file}`);
    const html = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(html, /\{\{[^}]+\}\}/, `Variable non résolue dans ${file}`);
  }

  const edition = fs.readFileSync(editionPath, 'utf8');
  const planning = fs.readFileSync(planningPath, 'utf8');
  const home = fs.readFileSync(homePath, 'utf8');
  const explorer = fs.readFileSync(explorerPath, 'utf8');
  const confirmation = fs.readFileSync(confirmationPath, 'utf8');

  assert.ok(edition.includes(item.price), `Prix Corporate localisé absent pour ${item.lang}`);
  assert.ok(planning.includes(item.title), `Titre de la page stratégique absent pour ${item.lang}`);
  assert.ok(home.includes(`/${item.lang}/${item.planning}/`), `CTA accueil incorrect pour ${item.lang}`);
  assert.ok(explorer.includes(`/${item.lang}/${item.planning}/`), `CTA Data Explorer incorrect pour ${item.lang}`);
  assert.ok(fs.existsSync(path.join(root, item.lang, item.planning, 'index.html')), `Route CTA inexistante pour ${item.lang}`);
  assert.ok(confirmation.includes(item.price), `Récapitulatif Corporate incohérent pour ${item.lang}`);
  assert.doesNotMatch(confirmation, /line-through|162[ ,.\u202f]000/, `Ancienne promotion encore visible pour ${item.lang}`);
  assert.ok(edition.includes('data-pack="corporate"'), `Souscription Corporate absente pour ${item.lang}`);
  if (item.lang === 'ar') assert.ok(planning.includes('dir="rtl"'), 'La page arabe doit être RTL');
}

for (const lang of ['fr', 'en', 'ar']) {
  const historical = fs.readFileSync(path.join(root, lang, 'editions', '2025', 'index.html'), 'utf8');
  assert.match(historical, /180[ ,\u202f]000/, `Le tarif historique Corporate 2025 ne doit pas être modifié pour ${lang}`);
}

const frEdition = fs.readFileSync(path.join(root, 'fr', 'editions', '2026', 'index.html'), 'utf8');
const essentialBlock = frEdition.slice(frEdition.indexOf('PACK ESSENTIEL'), frEdition.indexOf('PACK PRO'));
const proBlock = frEdition.slice(frEdition.indexOf('PACK PRO'), frEdition.indexOf('PACK CORPORATE EXECUTIVE'));
const corporateBlock = frEdition.slice(frEdition.indexOf('PACK CORPORATE EXECUTIVE'));
assert.doesNotMatch(essentialBlock, /PLANIFICATION STRATÉGIQUE TRIENNALE/);
assert.doesNotMatch(proBlock, /PLANIFICATION STRATÉGIQUE TRIENNALE/);
assert.match(corporateBlock, /PLANIFICATION STRATÉGIQUE TRIENNALE/);
assert.doesNotMatch(essentialBlock, /Nouveau module|Assistance IA incluse/);
assert.doesNotMatch(proBlock, /Nouveau module|Assistance IA incluse/);
assert.match(corporateBlock, /Nouveau module/);
assert.match(corporateBlock, /Assistance IA incluse/);

console.log('Strategic positioning checks passed for FR, EN and AR.');
