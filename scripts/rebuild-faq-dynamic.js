const fs = require('fs');
const path = require('path');

const ed2026Path = path.join(__dirname, '../templates/edition-2026.html');
let html = fs.readFileSync(ed2026Path, 'utf8');

let faqHtmlItems = '';
for (let i = 0; i < 12; i++) {
    faqHtmlItems += `
      <!-- Q${i+1} -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button onclick="toggleFAQ('pfaq${i+1}')" class="w-full text-start p-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors">
          <span class="font-semibold text-gray-900 text-sm sm:text-base pe-4">{{edition2026.faq.items.${i}.q}}</span>
          <svg id="pfaq${i+1}-icon" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="pfaq${i+1}-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
          {{edition2026.faq.items.${i}.a}}
        </div>
      </div>
`;
}

const faqSectionHtml = `
<!-- ════════════════════════════════════════════════ FAQ PRÉCOMMANDE -->
<section id="faq-precommande" class="py-20 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-3">{{edition2026.faq.title}}</h2>
      <p class="text-gray-600 text-sm sm:text-base">{{edition2026.faq.subtitle}}</p>
    </div>
    <div class="space-y-3">
${faqHtmlItems}
    </div>
  </div>
</section>
`;

// Replace from section id="faq-precommande" up to </section>
const faqRegex = /<!-- ════════════════════════════════════════════════ FAQ PRÉCOMMANDE -->[\s\S]*?<\/section>/;
html = html.replace(faqRegex, faqSectionHtml.trim());

// We also need to strip out the JSON-LD objects for the two early bird questions!
html = html.replace(/\{\s*"@type":\s*"Question",\s*"name":\s*"Que garantit la souscription anticipée \?",\s*"acceptedAnswer":\s*\{\s*"@type":\s*"Answer",\s*"text":[^}]+\}\s*\},/g, '');
html = html.replace(/\{\s*"@type":\s*"Question",\s*"name":\s*"Le tarif préférentiel est-il garanti \?",\s*"acceptedAnswer":\s*\{\s*"@type":\s*"Answer",\s*"text":[^}]+\}\s*\},/g, '');


fs.writeFileSync(ed2026Path, html, 'utf8');
console.log("FAQ rebuilt correctly.");
