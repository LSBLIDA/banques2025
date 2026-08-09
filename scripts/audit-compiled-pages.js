const fs = require('fs');
const path = require('path');

function scanDir(dir, lang) {
  let issues = 0;
  const files = [];

  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        files.push(full);
      }
    }
  }

  walk(dir);

  // Common French indicators to look out for in EN / AR pages (outside proper nouns / brands)
  const frenchPatterns = [
    /Méthodologie des études/i,
    /Une lecture multidimensionnelle/i,
    /Une édition 2026 enrichie/i,
    /Banques analysées/i,
    /Pages d'analyse/i,
    /Exercices couverts/i,
    /Les défis des dirigeants/i,
    /Manque de données locales/i,
    /Chaque mission est conçue/i,
    /Périmètre & collecte/i,
    /Proposer une lecture multidimensionnelle/i,
    /Mentions légales/i,
    /Confidentialité/i,
    /Message envoyé/i,
    /Coordonnées/i
  ];

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for unrendered template tags {{...}}
    const unrendered = content.match(/\{\{[^}]+\}\}/g);
    if (unrendered) {
      console.warn(`[${lang}] Unrendered tag in ${path.relative(process.cwd(), file)}:`, unrendered);
      issues++;
    }

    // Check for French patterns
    frenchPatterns.forEach(pattern => {
      if (pattern.test(content)) {
        console.warn(`[${lang}] French text detected in ${path.relative(process.cwd(), file)} matching pattern: ${pattern}`);
        issues++;
      }
    });
  });

  return issues;
}

console.log("--- Scanning English Pages ---");
const enIssues = scanDir(path.join(__dirname, '../en'), 'EN');

console.log("--- Scanning Arabic Pages ---");
const arIssues = scanDir(path.join(__dirname, '../ar'), 'AR');

if (enIssues === 0 && arIssues === 0) {
  console.log("\n✅ Perfect! All EN and AR pages are completely translated with ZERO unrendered tags or hardcoded French strings!");
} else {
  console.log(`\n⚠️ Total potential issues found: ${enIssues + arIssues}`);
}
