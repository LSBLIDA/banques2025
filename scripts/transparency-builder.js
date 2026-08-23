/**
 * ABIX — Module de rendu pour la page Transparence de l'information financière 2025
 */

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "data", "transparency", "2025.json");

function loadTransparencyData() {
  if (!fs.existsSync(DATA_FILE)) {
    throw new Error(`Fichier de données transparence introuvable: ${DATA_FILE}`);
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8")).dataset;
}

const LOGO_MAP = {
  bea: "bea.png",
  bna: "bna.png",
  cpa: "cpa.png",
  badr: "badr.png",
  bdl: "bdl.jpg",
  cnep: "cnep.png",
  bnh: "bnh.png",
  sga: "sga.png",
  bnp: "bnp.png",
  natixis: "natixis.png",
  agb: "agb.png",
  "arab-bank": "arab-bank.png",
  citibank: "citi.png",
  hsbc: "hsbc.png",
  trust: "trust.png",
  fransabank: "fransabank.png",
  "housing-bank": "housing.png",
  "al-baraka": "albaraka.png",
  "al-salam": "alsalam.png",
  abc: "abc.png",
  ziraat: "ziraat.jpg"
};

function formatNum(val, lang) {
  if (val === null || val === undefined) return "";
  const num = Number(val);
  if (num % 1 === 0) return String(num);
  return lang === "en" ? num.toFixed(1) : num.toFixed(1).replace(".", ",");
}

function translateObservation(comment, additionalNote, lang, translations) {
  const tObs = (translations.transparency2025 && translations.transparency2025.observations) || {};
  const notes = [];

  if (comment) {
    const cLower = comment.toLowerCase().trim();
    if (cLower === "retard") {
      notes.push(tObs.retard || "Retard");
    } else if (cLower === "retard supérieur à 1 année") {
      notes.push(tObs.retard1year || "Retard supérieur à 1 année");
    } else if (cLower === "léger retard") {
      notes.push(tObs.slightDelay || "Léger retard");
    } else if (cLower === "pas significatif") {
      notes.push(tObs.notSignificant || "Pas significatif dans le périmètre de l’analyse source.");
    } else {
      notes.push(comment);
    }
  }

  if (additionalNote) {
    const nLower = additionalNote.toLowerCase().trim();
    if (nLower.includes("téléchargement possible")) {
      notes.push(tObs.downloadPossible || "Téléchargement possible");
    } else if (nLower.includes("dernier rapport identifié")) {
      notes.push(tObs.lastReport2021 || additionalNote);
    } else {
      notes.push(additionalNote);
    }
  }

  return notes;
}

/**
 * Construit le classement graphique horizontal des banques scorées (20 banques).
 */
function buildRankingHtml(lang, translations, basePath) {
  const dataset = loadTransparencyData();
  const scoredBanks = dataset.banks.filter(b => !b.not_scored && b.global_score !== null);
  
  // Tri décroissant avec égalités autorisées
  scoredBanks.sort((a, b) => b.global_score - a.global_score);

  const tRank = (translations.transparency2025 && translations.transparency2025.ranking) || {};

  return scoredBanks.map((bank, index) => {
    const logoFile = LOGO_MAP[bank.id] || `${bank.id}.png`;
    const scoreVal = bank.global_score;
    const scoreFormatted = formatNum(scoreVal, lang);
    const widthPct = Math.round((scoreVal / 6) * 100);
    const obsList = translateObservation(bank.comment, bank.additional_note, lang, translations);
    
    const obsBadges = obsList.map(obs => {
      return `<span class="inline-flex items-center text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">${obs}</span>`;
    }).join(" ");

    const barGradient = scoreVal === 6
      ? "bg-gradient-to-r from-primary to-accent"
      : scoreVal >= 4
      ? "bg-gradient-to-r from-primary-700 to-primary-500"
      : scoreVal > 0
      ? "bg-gradient-to-r from-blue-600 to-blue-400"
      : "bg-slate-200";

    return `
      <div class="p-4 sm:p-5 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div class="flex items-center gap-3.5">
            <div class="w-14 h-10 bg-white border border-gray-100 rounded-lg p-1 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <img src="${basePath}/public/logos/${logoFile}" alt="${bank.name}" class="max-h-8 max-w-full object-contain" loading="lazy" onerror="this.style.display='none';" />
            </div>
            <div>
              <h3 class="font-bold text-gray-900 text-sm sm:text-base leading-snug">${bank.name}</h3>
              ${obsBadges ? `<div class="mt-1 flex flex-wrap gap-1.5">${obsBadges}</div>` : ''}
            </div>
          </div>
          <div class="flex items-center gap-2 self-end sm:self-center">
            <span class="text-xl sm:text-2xl font-extrabold font-playfair ${scoreVal > 0 ? 'text-primary' : 'text-gray-400'}">${scoreFormatted}</span>
            <span class="text-xs font-semibold text-gray-400">${tRank.outOfSix || '/ 6'}</span>
          </div>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div class="${barGradient} h-2.5 rounded-full transition-all duration-500" style="width: ${widthPct}%;" role="progressbar" aria-valuenow="${scoreVal}" aria-valuemin="0" aria-valuemax="6" aria-label="${bank.name} : ${scoreFormatted} / 6"></div>
        </div>
      </div>
    `;
  }).join("\n");
}

/**
 * Construit le bloc de l'établissement non scoré (Ziraat Bankası).
 */
function buildNotScoredHtml(lang, translations, basePath) {
  const dataset = loadTransparencyData();
  const notScoredBank = dataset.banks.find(b => b.not_scored || b.id === "ziraat");
  if (!notScoredBank) return "";

  const tRank = (translations.transparency2025 && translations.transparency2025.ranking) || {};
  const logoFile = LOGO_MAP[notScoredBank.id] || "ziraat.jpg";
  const obsList = translateObservation(notScoredBank.comment, notScoredBank.additional_note, lang, translations);
  const noteText = obsList.length > 0 ? obsList.join(" • ") : (tRank.notScoredNote || "Pas significatif dans le périmètre de l’analyse source.");

  return `
    <div class="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-7">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-16 h-12 bg-white border border-gray-200 rounded-xl p-1.5 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <img src="${basePath}/public/logos/${logoFile}" alt="${notScoredBank.name}" class="max-h-9 max-w-full object-contain" loading="lazy" onerror="this.style.display='none';" />
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="font-bold text-gray-900 text-base sm:text-lg">${notScoredBank.name}</h3>
              <span class="inline-flex items-center text-xs font-semibold text-slate-700 bg-slate-200/80 px-2.5 py-0.5 rounded-full">${tRank.notScoredBadge || 'Non scorée'}</span>
            </div>
            <p class="text-xs sm:text-sm text-gray-500 mt-1">${noteText}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Construit les éléments de la distribution des scores.
 */
function buildDistributionHtml(lang, translations) {
  const dataset = loadTransparencyData();
  const summary = dataset.summary;
  const tDist = (translations.transparency2025 && translations.transparency2025.distribution) || {};

  const distItems = [
    { score: 6, count: summary.banks_with_6_of_6, label: tDist.item6 || "3 banques (Score 6 / 6)", pct: Math.round((summary.banks_with_6_of_6 / 20) * 100) },
    { score: 5, count: 6, label: tDist.item5 || "6 banques (Score 5 / 6)", pct: Math.round((6 / 20) * 100) },
    { score: 4, count: 1, label: tDist.item4 || "1 banque (Score 4 / 6)", pct: Math.round((1 / 20) * 100) },
    { score: 2, count: 1, label: tDist.item2 || "1 banque (Score 2 / 6)", pct: Math.round((1 / 20) * 100) },
    { score: 0, count: summary.banks_with_0_of_6, label: tDist.item0 || "9 banques (Score 0 / 6)", pct: Math.round((summary.banks_with_0_of_6 / 20) * 100) },
  ];

  return distItems.map(item => `
    <div class="space-y-1.5">
      <div class="flex justify-between items-center text-xs sm:text-sm font-medium">
        <span class="text-gray-700">${item.label}</span>
        <span class="font-bold text-gray-900">${item.count} <span class="text-gray-400 font-normal">(${item.pct} %)</span></span>
      </div>
      <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div class="${item.score > 0 ? 'bg-primary' : 'bg-slate-300'} h-2.5 rounded-full" style="width: ${item.pct}%;"></div>
      </div>
    </div>
  `).join("\n");
}

/**
 * Construit le tableau détaillé des 21 établissements.
 */
function buildTableHtml(lang, translations, basePath) {
  const dataset = loadTransparencyData();
  const tTable = (translations.transparency2025 && translations.transparency2025.table) || {};
  
  // Tri pour le tableau : les 20 scorées triées par score décroissant, puis Ziraat à la fin
  const allBanks = [...dataset.banks].sort((a, b) => {
    if (a.not_scored) return 1;
    if (b.not_scored) return -1;
    return b.global_score - a.global_score;
  });

  return allBanks.map((bank, index) => {
    const logoFile = LOGO_MAP[bank.id] || `${bank.id}.png`;
    const isNotScored = bank.not_scored === true || bank.global_score === null;
    
    const statementsVal = isNotScored ? "—" : `${formatNum(bank.financial_statements_score, lang)} <span class="text-xs text-gray-400 font-normal">${tTable.outOfThree || '/ 3'}</span>`;
    const activityVal = isNotScored ? "—" : `${formatNum(bank.activity_report_score, lang)} <span class="text-xs text-gray-400 font-normal">${tTable.outOfThree || '/ 3'}</span>`;
    const globalVal = isNotScored ? `<span class="inline-flex items-center text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">${tTable.notScored || 'Non scorée'}</span>` : `<span class="font-extrabold ${bank.global_score > 0 ? 'text-primary' : 'text-gray-400'}">${formatNum(bank.global_score, lang)}</span> <span class="text-xs text-gray-400 font-normal">${tTable.outOfSix || '/ 6'}</span>`;
    
    const obsList = translateObservation(bank.comment, bank.additional_note, lang, translations);
    const obsHtml = obsList.length > 0
      ? obsList.map(o => `<span class="inline-block text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded">${o}</span>`).join(" ")
      : `<span class="text-gray-300 text-xs">${tTable.noObservation || '—'}</span>`;

    const rowBg = index % 2 === 0 ? "bg-white" : "bg-slate-50/50";

    return `
      <tr class="${rowBg} hover:bg-blue-50/40 transition-colors border-b border-gray-100 bank-table-row" data-name="${bank.name.toLowerCase()}" data-score="${bank.global_score !== null ? bank.global_score : -1}">
        <td class="py-3.5 px-4 sm:px-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-7 bg-white border border-gray-200 rounded p-0.5 flex items-center justify-center flex-shrink-0">
              <img src="${basePath}/public/logos/${logoFile}" alt="${bank.name}" class="max-h-6 max-w-full object-contain" loading="lazy" onerror="this.style.display='none';" />
            </div>
            <span class="font-semibold text-gray-900 text-xs sm:text-sm">${bank.name}</span>
          </div>
        </td>
        <td class="py-3.5 px-4 text-center text-xs sm:text-sm font-semibold text-gray-700">
          ${statementsVal}
        </td>
        <td class="py-3.5 px-4 text-center text-xs sm:text-sm font-semibold text-gray-700">
          ${activityVal}
        </td>
        <td class="py-3.5 px-4 text-center text-xs sm:text-sm">
          ${globalVal}
        </td>
        <td class="py-3.5 px-4 sm:px-6 text-xs text-gray-600">
          ${obsHtml}
        </td>
      </tr>
    `;
  }).join("\n");
}

/**
 * Construit les données structurées Schema.org JSON-LD (Article et Dataset, pas FinancialReport).
 */
function buildStructuredData(lang, translations, canonicalUrl) {
  const t = translations.transparency2025 || {};
  const meta = t.meta || {};
  const hero = t.hero || {};

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://algeriabankingindex.com/#website",
          "name": "ABIX — Algeria Banking Index",
          "url": "https://algeriabankingindex.com"
        },
        "headline": meta.title || "Transparence de l'information financière des banques algériennes 2025",
        "description": meta.description || "",
        "inLanguage": lang,
        "datePublished": "2025-01-01",
        "dateModified": "2026-08-23",
        "publisher": {
          "@type": "Organization",
          "name": "Tadjeddine & Partners",
          "url": "https://tadjeddine-partners.com"
        },
        "author": {
          "@type": "Person",
          "name": "M. Sekak Rachid"
        }
      },
      {
        "@type": "Dataset",
        "@id": `${canonicalUrl}#dataset`,
        "name": meta.title || "Indice ABIX de transparence de l'information financière 2025",
        "description": meta.description || "",
        "inLanguage": lang,
        "license": "https://algeriabankingindex.com/fr/conditions-utilisation/",
        "creator": {
          "@type": "Organization",
          "name": "Tadjeddine & Partners"
        },
        "temporalCoverage": "2025",
        "spatialCoverage": {
          "@type": "Place",
          "name": "Algérie"
        }
      }
    ]
  };

  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

module.exports = {
  loadTransparencyData,
  buildRankingHtml,
  buildNotScoredHtml,
  buildDistributionHtml,
  buildTableHtml,
  buildStructuredData
};
