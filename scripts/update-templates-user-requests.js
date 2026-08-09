const fs = require('fs');
const path = require('path');

// 1. Update templates/edition-2025.html
const ed2025Path = path.join(__dirname, '../templates/edition-2025.html');
let ed2025Html = fs.readFileSync(ed2025Path, 'utf8');

// Replace pricing titles, prices & features
ed2025Html = ed2025Html.replace(
  '<h3 class="text-xl font-bold text-gray-900 mb-2">Pack Essentiel</h3>\n          <div class="text-3xl font-bold text-primary">84 000 DA HT</div>',
  '<h3 class="text-xl font-bold text-gray-900 mb-2">{{edition2025.pricing.packs.essential.title}}</h3>\n          <div class="text-3xl font-bold text-primary">{{edition2025.pricing.packs.essential.price}}</div>'
);
ed2025Html = ed2025Html.replace(
  'Étude complète (104 pages, PDF via accès sécurisé)',
  '{{edition2025.pricing.packs.essential.features.0}}'
);
ed2025Html = ed2025Html.replace(
  'Comparatif public/privé + 20 banques',
  '{{edition2025.pricing.packs.essential.features.1}}'
);
ed2025Html = ed2025Html.replace(
  'Usage individuel (1 utilisateur)',
  '{{edition2025.pricing.packs.essential.features.2}}'
);
ed2025Html = ed2025Html.replace(
  "Mises à jour d'errata mineures",
  '{{edition2025.pricing.packs.essential.features.3}}'
);

ed2025Html = ed2025Html.replace(
  '<h3 class="text-xl font-bold text-gray-900 mb-2">Pack Pro</h3>\n          <div class="text-3xl font-bold text-primary">120 000 DA HT</div>',
  '<h3 class="text-xl font-bold text-gray-900 mb-2">{{edition2025.pricing.packs.pro.title}}</h3>\n          <div class="text-3xl font-bold text-primary">{{edition2025.pricing.packs.pro.price}}</div>'
);
ed2025Html = ed2025Html.replace(
  'Tout du Pack Essentiel',
  '{{edition2025.pricing.packs.pro.features.0}}'
);
ed2025Html = ed2025Html.replace(
  'Fichier Excel interactif',
  '{{edition2025.pricing.packs.pro.features.1}}'
);
ed2025Html = ed2025Html.replace(
  'Support email 7 jours',
  '{{edition2025.pricing.packs.pro.features.2}}'
);
ed2025Html = ed2025Html.replace(
  'Accès aux mises à jour majeures',
  '{{edition2025.pricing.packs.pro.features.3}}'
);
ed2025Html = ed2025Html.replace(
  "Jusqu'à 3 utilisateurs (même entité)",
  '{{edition2025.pricing.packs.pro.features.4}}'
);

ed2025Html = ed2025Html.replace(
  '<h3 class="text-xl font-bold text-gray-900 mb-2">Pack Corporate Executive</h3>\n          <div class="text-3xl font-bold text-primary">180 000 DA HT</div>',
  '<h3 class="text-xl font-bold text-gray-900 mb-2">{{edition2025.pricing.packs.corporate.title}}</h3>\n          <div class="text-3xl font-bold text-primary">{{edition2025.pricing.packs.corporate.price}}</div>'
);
ed2025Html = ed2025Html.replace(
  'Tout du Pack Pro',
  '{{edition2025.pricing.packs.corporate.features.0}}'
);
ed2025Html = ed2025Html.replace(
  'Livrable PowerPoint exécutif',
  '{{edition2025.pricing.packs.corporate.features.1}}'
);
ed2025Html = ed2025Html.replace(
  'Webinar exclusif : Décryptage par M. Rachid Sekak',
  '{{edition2025.pricing.packs.corporate.features.2}}'
);
ed2025Html = ed2025Html.replace(
  "Jusqu'à 20 utilisateurs (même entité)",
  '{{edition2025.pricing.packs.corporate.features.3}}'
);

// Replace payment notes
ed2025Html = ed2025Html.replace(
  'Paiement sécurisé</span>',
  '{{edition2025.pricing.securePayment}}</span>'
);
ed2025Html = ed2025Html.replace(
  'EUR & DZD acceptés</span>',
  '{{edition2025.pricing.acceptedCurrencies}}</span>'
);
ed2025Html = ed2025Html.replace(
  'Accès après traitement</span>',
  '{{edition2025.pricing.accessNote}}</span>'
);

// Replace FAQ items in edition-2025.html
ed2025Html = ed2025Html.replace(
  'Quelle est la méthodologie utilisée pour cette étude ?',
  '{{edition2025.faq.items.0.q}}'
);
ed2025Html = ed2025Html.replace(
  "L'étude repose sur une analyse approfondie des bilans bancaires et des données officielles publiées par la Banque d'Algérie. Elle intègre des comparatifs public/privé et des analyses prospectives. Les données ont été structurées pour fournir une vision claire et exploitable par les décideurs.",
  '{{edition2025.faq.items.0.a}}'
);

ed2025Html = ed2025Html.replace(
  "Quelles banques sont couvertes dans l'analyse ?",
  '{{edition2025.faq.items.1.q}}'
);
ed2025Html = ed2025Html.replace(
  "L'étude couvre <strong>20 banques opérant en Algérie</strong>, incluant les banques publiques (BEA, BNA, CPA, BADR, BDL), les principales banques privées, ainsi que les filiales de groupes internationaux.",
  '{{edition2025.faq.items.1.a}}'
);

ed2025Html = ed2025Html.replace(
  'Puis-je utiliser cette étude pour mes travaux internes ?',
  '{{edition2025.faq.items.2.q}}'
);
ed2025Html = ed2025Html.replace(
  "Oui. Le Pack Essentiel est destiné à un usage individuel. Le Pack Pro élargit l'utilisation jusqu'à 3 utilisateurs au sein de la même organisation. Le Pack Corporate Executive autorise jusqu'à 20 utilisateurs. La redistribution ou la revente externe n'est pas autorisée sans licence spécifique.",
  '{{edition2025.faq.items.2.a}}'
);

ed2025Html = ed2025Html.replace(
  "À quelle fréquence l'étude est-elle mise à jour ?",
  '{{edition2025.faq.items.3.q}}'
);
ed2025Html = ed2025Html.replace(
  "L'édition 2025 intègre les données financières des exercices 2023 et 2024. Une nouvelle édition est publiée chaque année. Les mises à jour mineures d'errata sont fournies selon le package choisi.",
  '{{edition2025.faq.items.3.a}}'
);

ed2025Html = ed2025Html.replace(
  "Quelle est votre politique concernant l'accès aux fichiers ?",
  '{{edition2025.faq.items.4.q}}'
);
ed2025Html = ed2025Html.replace(
  "Étant donné la nature numérique du livrable, l'accès est fourni après traitement de la commande et règlement. Si vous rencontrez un problème d'accès, notre équipe s'engage à le résoudre rapidement.",
  '{{edition2025.faq.items.4.a}}'
);

fs.writeFileSync(ed2025Path, ed2025Html, 'utf8');

// 2. Update templates/methodologie.html
const methodoPath = path.join(__dirname, '../templates/methodologie.html');
let methodoHtml = fs.readFileSync(methodoPath, 'utf8');

methodoHtml = methodoHtml.replace(
  '<h3 class="text-xl font-bold text-gray-900">Découvrir les résultats et analyses des études</h3>',
  '<h3 class="text-xl font-bold text-gray-900">{{methodology.ctaTitle}}</h3>'
);
methodoHtml = methodoHtml.replace(
  '<p class="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">L’édition 2026 est ouverte à la souscription anticipée avec un tarif préférentiel valable jusqu’au 31 août 2026.</p>',
  '<p class="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">{{methodology.ctaSubtitle}}</p>'
);

fs.writeFileSync(methodoPath, methodoHtml, 'utf8');

console.log("Successfully updated templates/edition-2025.html and templates/methodologie.html!");
