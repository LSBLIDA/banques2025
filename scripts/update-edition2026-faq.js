const fs = require('fs');
const path = require('path');

const ed2026Path = path.join(__dirname, '../templates/edition-2026.html');
let html = fs.readFileSync(ed2026Path, 'utf8');

// Replace Q1 to Q14 text with placeholders
const replacements = [
  {
    q: "Quand l’étude sera-t-elle publiée ?",
    a: "<p>La publication de l’édition 2026 est prévue en septembre 2026, après finalisation des derniers travaux d’analyse et validation éditoriale. Les souscripteurs seront informés dès sa mise à disposition et recevront les livrables correspondant à l’offre souscrite.</p>",
    idx: 0
  },
  {
    q: "Quel sera le périmètre de l’édition 2026 ?",
    a: "<p>L’édition 2026 couvrira 21 banques opérant en Algérie. Elle portera principalement sur la comparaison des performances 2024–2025, complétée par une analyse des tendances observées sur la période 2023–2025.</p>",
    idx: 1
  },
  {
    q: "Que garantit la souscription anticipée ?",
    idx: 3
  },
  {
    q: "Le tarif préférentiel est-il garanti ?",
    idx: 4
  },
  {
    q: "Quels sont les différents niveaux d’offre ?",
    idx: 5
  },
  {
    q: "Puis-je recevoir une facture pro forma ?",
    a: "<p>Oui. Sur demande, Tadjeddine & Partners peut établir une facture pro forma correspondant au pack sélectionné afin de faciliter la procédure interne de commande de l’organisation.</p>",
    idx: 6
  },
  {
    q: "Puis-je souscrire pour plusieurs utilisateurs ?",
    idx: 7
  },
  {
    q: "Les données 2024 sont-elles les mêmes que dans l’édition précédente ?",
    idx: 8
  },
  {
    q: "Le Baromètre des services bancaires influencera-t-il les résultats financiers ou les classements des banques ?",
    idx: 9
  },
  {
    q: "L’étude donnera-t-elle la parole aux banques et à des experts ?",
    idx: 10
  },
  {
    q: "L’édition 2025 est-elle incluse dans la souscription 2026 ?",
    idx: 11
  },
  {
    q: "Que se passe-t-il si la date de publication évolue ?",
    idx: 12
  },
  {
    q: "Puis-je demander une présentation ou un benchmark personnalisé ?",
    idx: 13
  }
];

replacements.forEach(r => {
  if (r.q) {
    html = html.replace(r.q, `{{edition2026.faq.items.${r.idx}.q}}`);
  }
  if (r.a) {
    html = html.replace(r.a, `{{edition2026.faq.items.${r.idx}.a}}`);
  }
});

// For Q6, Q8, Q9, Q10, Q11, Q12, Q13, Q14 contents, replace whole content div body with {{edition2026.faq.items.X.a}}
html = html.replace(
  /<div id="pfaq6-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3 space-y-4">[\s\S]*?<\/div>\s*<\/div>/,
  '<div id="pfaq6-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">\n          {{edition2026.faq.items.5.a}}\n        </div>\n      </div>'
);

html = html.replace(
  /<div id="pfaq8-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3 space-y-3">[\s\S]*?<\/div>\s*<\/div>/,
  '<div id="pfaq8-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">\n          {{edition2026.faq.items.7.a}}\n        </div>\n      </div>'
);

html = html.replace(
  /<div id="pfaq9-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3 space-y-3">[\s\S]*?<\/div>\s*<\/div>/,
  '<div id="pfaq9-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">\n          {{edition2026.faq.items.8.a}}\n        </div>\n      </div>'
);

html = html.replace(
  /<div id="pfaq10-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3 space-y-3">[\s\S]*?<\/div>\s*<\/div>/,
  '<div id="pfaq10-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">\n          {{edition2026.faq.items.9.a}}\n        </div>\n      </div>'
);

html = html.replace(
  /<div id="pfaq11-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3 space-y-3">[\s\S]*?<\/div>\s*<\/div>/,
  '<div id="pfaq11-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">\n          {{edition2026.faq.items.10.a}}\n        </div>\n      </div>'
);

html = html.replace(
  /<div id="pfaq12-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3 space-y-3">[\s\S]*?<\/div>\s*<\/div>/,
  '<div id="pfaq12-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">\n          {{edition2026.faq.items.11.a}}\n        </div>\n      </div>'
);

html = html.replace(
  /<div id="pfaq13-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3 space-y-3">[\s\S]*?<\/div>\s*<\/div>/,
  '<div id="pfaq13-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">\n          {{edition2026.faq.items.12.a}}\n        </div>\n      </div>'
);

html = html.replace(
  /<div id="pfaq14-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3 space-y-3">[\s\S]*?<\/div>\s*<\/div>/,
  '<div id="pfaq14-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">\n          {{edition2026.faq.items.13.a}}\n        </div>\n      </div>'
);

fs.writeFileSync(ed2026Path, html, 'utf8');
console.log("Successfully updated templates/edition-2026.html FAQ items!");
