const fs = require('fs');
const path = require('path');

// 1. Remove "Économisez..." in templates/edition-2026.html
let ed2026Path = 'templates/edition-2026.html';
let ed2026 = fs.readFileSync(ed2026Path, 'utf8');

ed2026 = ed2026.replace(/<p class="text-xs text-emerald-400 font-semibold">{{edition2026\.pricing\.essential\.saving}}<\/p>\s*/g, '');
ed2026 = ed2026.replace(/<p class="text-xs text-emerald-400 font-semibold">{{edition2026\.pricing\.pro\.saving}}<\/p>\s*/g, '');
ed2026 = ed2026.replace(/<p class="text-xs text-emerald-400 font-semibold">{{edition2026\.pricing\.corporate\.saving}}<\/p>\s*/g, '');

// Also change the ctaNotify link to use javascript:openVideoModal()
ed2026 = ed2026.replace(/<a href="#notification" class="btn-secondary-hero">/g, '<button onclick="openVideoModal()" class="btn-secondary-hero">');
ed2026 = ed2026.replace(/<\/a>\s*<\/div>\s*<!-- Couverture/g, '</button>\n        </div>\n      </div>\n\n      <!-- Couverture');

fs.writeFileSync(ed2026Path, ed2026, 'utf8');


// 2. Change ctaNotify link in templates/homepage.html
let homePath = 'templates/homepage.html';
let home = fs.readFileSync(homePath, 'utf8');
home = home.replace(/<a href="{{__basePath}}\/{{__lang}}\/editions\/2026\/#inscription" class="btn-ghost-hero">{{home\.hero\.ctaNotify}}<\/a>/g, '<button onclick="openVideoModal()" class="btn-ghost-hero">{{home.hero.ctaNotify}}</button>');
fs.writeFileSync(homePath, home, 'utf8');


// 3. Update locales: remove FAQ items 0 and 1, and change ctaNotify texts
['locales/fr.json', 'locales/en.json', 'locales/ar.json'].forEach(loc => {
    let raw = fs.readFileSync(loc, 'utf8');
    let data = JSON.parse(raw);

    // Update ctaNotify
    if (loc.includes('fr')) {
        data.edition2026.hero.ctaNotify = "Découvrir ABIX Data Explorer";
        data.home.hero.ctaNotify = "Découvrir ABIX Data Explorer";
    } else if (loc.includes('en')) {
        data.edition2026.hero.ctaNotify = "Discover ABIX Data Explorer";
        data.home.hero.ctaNotify = "Discover ABIX Data Explorer";
    } else if (loc.includes('ar')) {
        data.edition2026.hero.ctaNotify = "اكتشف ABIX Data Explorer";
        data.home.hero.ctaNotify = "اكتشف ABIX Data Explorer";
    }

    // Remove first two FAQ items from edition2026
    if (data.edition2026 && data.edition2026.faq && data.edition2026.faq.items) {
        // Only if it's 14 items (meaning we haven't removed them yet)
        if (data.edition2026.faq.items.length === 14) {
            data.edition2026.faq.items.splice(0, 2);
        }
    }

    fs.writeFileSync(loc, JSON.stringify(data, null, 2), 'utf8');
});

// 4. Inject openVideoModal into js/main.js
let mainJsPath = 'js/main.js';
let mainJs = fs.readFileSync(mainJsPath, 'utf8');
if (!mainJs.includes('openVideoModal')) {
    const modalScript = `
window.openVideoModal = function() {
    let modal = document.getElementById('dexVideoModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'dexVideoModal';
        modal.className = 'fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-2 sm:p-4';
        modal.innerHTML = \`
            <div class="bg-slate-900 rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col border border-gray-800 shadow-2xl relative overflow-hidden">
                <div class="p-3 border-b border-gray-800 flex justify-end">
                    <button onclick="closeVideoModal()" class="text-gray-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-slate-800">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
                <div class="relative w-full bg-black" style="padding-top: 56.25%;">
                    <iframe id="dexVideoIframe" src="https://www.youtube-nocookie.com/embed/6xiW8lhvE5A?autoplay=1&rel=0&modestbranding=1" class="absolute inset-0 w-full h-full border-0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>
                </div>
            </div>
        \`;
        document.body.appendChild(modal);
    } else {
        modal.classList.remove('hidden');
        document.getElementById('dexVideoIframe').src = "https://www.youtube-nocookie.com/embed/6xiW8lhvE5A?autoplay=1&rel=0&modestbranding=1";
    }
};
window.closeVideoModal = function() {
    const modal = document.getElementById('dexVideoModal');
    if (modal) {
        modal.classList.add('hidden');
        document.getElementById('dexVideoIframe').src = "";
    }
};
`;
    mainJs += modalScript;
    fs.writeFileSync(mainJsPath, mainJs, 'utf8');
}

console.log('All modifications complete.');
