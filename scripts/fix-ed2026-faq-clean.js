const fs = require('fs');
const path = require('path');

const ed2026Path = path.join(__dirname, '../templates/edition-2026.html');
let html = fs.readFileSync(ed2026Path, 'utf8');

const targetStart = `<button onclick="openSubscriptionPopup('corporate')" data-pack="corporate" data-iframe="https://fenekio.com/tandp/ps/forms/wtl/79e33d8596a4c5f745648a74fe76c5c5" class="cta-pricing-btn btn-outline w-full mt-8 py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white border-white/20 hover:bg-white/10 transition-all">\n          <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>\n          <span class="cta-text">{{edition2026.pricing.corporate.cta}}</span>\n        </button>\n      </div>`;

const targetEnd = `<!-- Données structurées FAQPage (SEO) -->`;

const newMiddle = `

    <!-- Mention Webinar hors packs -->
    <div class="mt-10 text-center">
      <div class="inline-flex items-center gap-2 bg-slate-800/80 px-5 py-2.5 rounded-full border border-gray-700 text-xs sm:text-sm text-gray-300 shadow-sm">
        <svg class="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
        <span>{{edition2026.pricing.webinarNotice}}</span>
      </div>
    </div>
  </div>
</section>

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

const startIdx = html.indexOf(targetStart);
const endIdx = html.indexOf(targetEnd);

if (startIdx !== -1 && endIdx !== -1) {
  const finalHtml = html.substring(0, startIdx + targetStart.length) + newMiddle + html.substring(endIdx);
  fs.writeFileSync(ed2026Path, finalHtml, 'utf8');
  console.log("Successfully replaced templates/edition-2026.html FAQ section!");
} else {
  console.error("Could not find startIdx or endIdx! startIdx:", startIdx, "endIdx:", endIdx);
}
