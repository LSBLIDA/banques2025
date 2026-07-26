const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  if (content.includes('Algerian Banking Index')) {
    content = content.replace(/Algerian Banking Index/g, 'Algeria Banking Index');
    updated = true;
  }

  if (filePath.endsWith('.html') && !content.includes('indice-abix') && content.includes('/methodologie/')) {
    content = content.replace(
      '<a href="{{__basePath}}/{{__lang}}/methodologie/" class="nav-link">{{nav.methodology}}</a>',
      '<a href="{{__basePath}}/{{__lang}}/methodologie/" class="nav-link">{{nav.methodology}}</a>\n      <a href="{{__basePath}}/{{__lang}}/indice-abix/" class="nav-link">{{nav.abixIndex}}</a>'
    );
    content = content.replace(
      '<a href="{{__basePath}}/{{__lang}}/methodologie/" class="mobile-nav-link">{{nav.methodology}}</a>',
      '<a href="{{__basePath}}/{{__lang}}/methodologie/" class="mobile-nav-link">{{nav.methodology}}</a>\n    <a href="{{__basePath}}/{{__lang}}/indice-abix/" class="mobile-nav-link">{{nav.abixIndex}}</a>'
    );
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', path.relative(rootDir, filePath));
  }
}

function walkDir(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html') || file.endsWith('.json') || file.endsWith('.js')) {
      processFile(filePath);
    }
  });
}

walkDir(path.join(rootDir, 'templates'));
walkDir(path.join(rootDir, 'locales'));
walkDir(path.join(rootDir, 'js'));
