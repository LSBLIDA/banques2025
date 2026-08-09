const fs = require('fs');
const path = require('path');

const ed2026Path = path.join(__dirname, '../templates/edition-2026.html');
let html = fs.readFileSync(ed2026Path, 'utf8');

// Build clean FAQ section HTML
const faqSectionHtml = `
<!-- ════════════════════════════════════════════════ FAQ PRÉCOMMANDE -->
<section id="faq-precommande" class="py-20 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-3">{{edition2026.faq.title}}</h2>
      <p class="text-gray-600 text-sm sm:text-base">{{edition2026.faq.subtitle}}</p>
    </div>
    <div class="space-y-3">

      <!-- Q1 -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button onclick="toggleFAQ('pfaq1')" class="w-full text-start p-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors">
          <span class="font-semibold text-gray-900 text-sm sm:text-base pe-4">{{edition2026.faq.items.0.q}}</span>
          <svg id="pfaq1-icon" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="pfaq1-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
          {{edition2026.faq.items.0.a}}
        </div>
      </div>

      <!-- Q2 -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button onclick="toggleFAQ('pfaq2')" class="w-full text-start p-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors">
          <span class="font-semibold text-gray-900 text-sm sm:text-base pe-4">{{edition2026.faq.items.1.q}}</span>
          <svg id="pfaq2-icon" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="pfaq2-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
          {{edition2026.faq.items.1.a}}
        </div>
      </div>

      <!-- Q3 -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button onclick="toggleFAQ('pfaq3')" class="w-full text-start p-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors">
          <span class="font-semibold text-gray-900 text-sm sm:text-base pe-4">{{edition2026.faq.items.2.q}}</span>
          <svg id="pfaq3-icon" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="pfaq3-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
          {{edition2026.faq.items.2.a}}
        </div>
      </div>

      <!-- Q4 -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button onclick="toggleFAQ('pfaq4')" class="w-full text-start p-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors">
          <span class="font-semibold text-gray-900 text-sm sm:text-base pe-4">{{edition2026.faq.items.3.q}}</span>
          <svg id="pfaq4-icon" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="pfaq4-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
          {{edition2026.faq.items.3.a}}
        </div>
      </div>

      <!-- Q5 -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button onclick="toggleFAQ('pfaq5')" class="w-full text-start p-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors">
          <span class="font-semibold text-gray-900 text-sm sm:text-base pe-4">{{edition2026.faq.items.4.q}}</span>
          <svg id="pfaq5-icon" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="pfaq5-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
          {{edition2026.faq.items.4.a}}
        </div>
      </div>

      <!-- Q6 -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button onclick="toggleFAQ('pfaq6')" class="w-full text-start p-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors">
          <span class="font-semibold text-gray-900 text-sm sm:text-base pe-4">{{edition2026.faq.items.5.q}}</span>
          <svg id="pfaq6-icon" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="pfaq6-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
          {{edition2026.faq.items.5.a}}
        </div>
      </div>

      <!-- Q7 -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button onclick="toggleFAQ('pfaq7')" class="w-full text-start p-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors">
          <span class="font-semibold text-gray-900 text-sm sm:text-base pe-4">{{edition2026.faq.items.6.q}}</span>
          <svg id="pfaq7-icon" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="pfaq7-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
          {{edition2026.faq.items.6.a}}
        </div>
      </div>

      <!-- Q8 -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button onclick="toggleFAQ('pfaq8')" class="w-full text-start p-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors">
          <span class="font-semibold text-gray-900 text-sm sm:text-base pe-4">{{edition2026.faq.items.7.q}}</span>
          <svg id="pfaq8-icon" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="pfaq8-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
          {{edition2026.faq.items.7.a}}
        </div>
      </div>

      <!-- Q9 -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button onclick="toggleFAQ('pfaq9')" class="w-full text-start p-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors">
          <span class="font-semibold text-gray-900 text-sm sm:text-base pe-4">{{edition2026.faq.items.8.q}}</span>
          <svg id="pfaq9-icon" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="pfaq9-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
          {{edition2026.faq.items.8.a}}
        </div>
      </div>

      <!-- Q10 -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button onclick="toggleFAQ('pfaq10')" class="w-full text-start p-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors">
          <span class="font-semibold text-gray-900 text-sm sm:text-base pe-4">{{edition2026.faq.items.9.q}}</span>
          <svg id="pfaq10-icon" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="pfaq10-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
          {{edition2026.faq.items.9.a}}
        </div>
      </div>

      <!-- Q11 -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button onclick="toggleFAQ('pfaq11')" class="w-full text-start p-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors">
          <span class="font-semibold text-gray-900 text-sm sm:text-base pe-4">{{edition2026.faq.items.10.q}}</span>
          <svg id="pfaq11-icon" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="pfaq11-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
          {{edition2026.faq.items.10.a}}
        </div>
      </div>

      <!-- Q12 -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button onclick="toggleFAQ('pfaq12')" class="w-full text-start p-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors">
          <span class="font-semibold text-gray-900 text-sm sm:text-base pe-4">{{edition2026.faq.items.11.q}}</span>
          <svg id="pfaq12-icon" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="pfaq12-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
          {{edition2026.faq.items.11.a}}
        </div>
      </div>

      <!-- Q13 -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button onclick="toggleFAQ('pfaq13')" class="w-full text-start p-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors">
          <span class="font-semibold text-gray-900 text-sm sm:text-base pe-4">{{edition2026.faq.items.12.q}}</span>
          <svg id="pfaq13-icon" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="pfaq13-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
          {{edition2026.faq.items.12.a}}
        </div>
      </div>

      <!-- Q14 -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button onclick="toggleFAQ('pfaq14')" class="w-full text-start p-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors">
          <span class="font-semibold text-gray-900 text-sm sm:text-base pe-4">{{edition2026.faq.items.13.q}}</span>
          <svg id="pfaq14-icon" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="pfaq14-content" class="hidden px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
          {{edition2026.faq.items.13.a}}
        </div>
      </div>

    </div>
  </div>
</section>
`;

// Replace from section id="faq-precommande" up to </section>
const faqRegex = /<!-- ════════════════════════════════════════════════ FAQ PRÉCOMMANDE -->[\s\S]*?<\/section>/;

if (faqRegex.test(html)) {
  html = html.replace(faqRegex, faqSectionHtml.trim());
  fs.writeFileSync(ed2026Path, html, 'utf8');
  console.log("Rebuilt templates/edition-2026.html FAQ section cleanly!");
} else {
  console.error("Could not match FAQ section in templates/edition-2026.html!");
}
