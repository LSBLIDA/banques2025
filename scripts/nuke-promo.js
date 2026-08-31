const fs = require('fs');

const files = ['templates/edition-2026.html', 'templates/homepage.html'];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Remove ALL saving mentions
  content = content.replace(/<p class="saving-mention[^>]*>.*?<\/p>\s*/gi, '');
  content = content.replace(/<div class="saving-mention[^>]*>.*?<\/div>\s*/gi, '');

  // Remove ALL early bird badges
  content = content.replace(/<div id="pricing-earlybird-badge"[^>]*>[\s\S]*?<\/div>\s*/gi, '');
  content = content.replace(/<span class="badge-discount[^>]*>.*?<\/span>\s*/gi, '');
  content = content.replace(/<span class="inline-block bg-amber-400\/20 text-amber-300 text-\[11px\] font-bold px-3 py-0\.5 rounded-full border border-amber-400\/30 mb-1">.*?<\/span>\s*/gi, '');
  content = content.replace(/<span class="text-\[11px\] font-bold bg-amber-400\/20 text-amber-300 px-2 py-0\.5 rounded border border-amber-400\/30">.*?<\/span>\s*/gi, '');

  // Remove ALL earlybird prices and their containers
  content = content.replace(/<div class="early-bird-price[^>]*>.*?<\/div>\s*/gi, '');
  content = content.replace(/<p class="text-lg font-bold text-amber-300 mt-1">.*?\{\{.*?earlyBirdPrice.*?\}\}.*?<\/p>\s*/gi, '');
  content = content.replace(/\{\{edition2026\.pricing\.(essential|pro|corporate)\.earlyBirdPrice\}\}/gi, '');

  // Fix ALL regular prices (remove line-through and make prominent)
  content = content.replace(/<span class="regular-price-struck[^>]*>(\{\{edition2026\.pricing\.(essential|pro|corporate)\.regularPrice\}\})<\/span>/gi, '<span class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">$1</span>');
  content = content.replace(/<p class="regular-price-struck[^>]*>(\{\{edition2026\.pricing\.(essential|pro|corporate)\.regularPrice\}\})<\/p>/gi, '<p class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">$1</p>');
  content = content.replace(/<span class="line-through text-xs text-gray-500">(\{\{edition2026\.pricing\.(essential|pro|corporate)\.regularPrice\}\})<\/span>/gi, '<span class="text-lg font-bold text-white">$1</span>');

  fs.writeFileSync(file, content, 'utf8');
});
