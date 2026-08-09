const fs = require('fs');
const path = require('path');

// 1. Modify scripts/compile.js
const compilePath = path.join(__dirname, '../scripts/compile.js');
let compileCode = fs.readFileSync(compilePath, 'utf8');

// Remove PAGES entries
compileCode = compileCode.replace(
  '  { template: "classements.html", output: "classements/index.html", titleKey: "rankings" },\n',
  ''
);
compileCode = compileCode.replace(
  '  { template: "banques.html", output: "banques/index.html", titleKey: "banks" },\n',
  ''
);

// Remove dropdown links from desktop nav
const desktopLinksToReplace = `            <div class="border-t border-gray-100 my-1"></div>
            <a href="\${BASE_PATH}/\${lang}/classements/" class="dropdown-item\${pageKey === 'rankings' ? ' nav-link--active' : ''}">
              \${tNav.rankings || "Classements"}
            </a>
            <a href="\${BASE_PATH}/\${lang}/banques/" class="dropdown-item\${pageKey === 'banks' ? ' nav-link--active' : ''}">
              \${tNav.banks || "Banques"}
            </a>`;

compileCode = compileCode.replace(desktopLinksToReplace, '');

// Remove mobile links
const mobileLinksToReplace = `          <a href="\${BASE_PATH}/\${lang}/classements/" class="mobile-nav-link\${pageKey === 'rankings' ? ' mobile-nav-link--active' : ''}">\${tNav.rankings || "Classements"}</a>
          <a href="\${BASE_PATH}/\${lang}/banques/" class="mobile-nav-link\${pageKey === 'banks' ? ' mobile-nav-link--active' : ''}">\${tNav.banks || "Banques"}</a>`;

compileCode = compileCode.replace(mobileLinksToReplace, '');

fs.writeFileSync(compilePath, compileCode, 'utf8');

// 2. Remove footer links from templates/homepage.html
const hpPath = path.join(__dirname, '../templates/homepage.html');
let hpCode = fs.readFileSync(hpPath, 'utf8');
hpCode = hpCode.replace(/<li><a href="\{\{__basePath\}\}\/\{\{__lang\}\}\/classements\/".*?<\/li>/g, '');
hpCode = hpCode.replace(/<li><a href="\{\{__basePath\}\}\/\{\{__lang\}\}\/banques\/".*?<\/li>/g, '');
fs.writeFileSync(hpPath, hpCode, 'utf8');

// 3. Remove footer links from templates/edition-2026.html
const ed2026Path = path.join(__dirname, '../templates/edition-2026.html');
let ed2026Code = fs.readFileSync(ed2026Path, 'utf8');
ed2026Code = ed2026Code.replace(/<li><a href="\{\{__basePath\}\}\/\{\{__lang\}\}\/classements\/".*?<\/li>/g, '');
ed2026Code = ed2026Code.replace(/<li><a href="\{\{__basePath\}\}\/\{\{__lang\}\}\/banques\/".*?<\/li>/g, '');
fs.writeFileSync(ed2026Path, ed2026Code, 'utf8');

console.log("Successfully removed classements and banques from compile.js and template footers!");
