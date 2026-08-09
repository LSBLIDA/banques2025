const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(templatesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    /<a href="\{\{__basePath\}\}\/\{\{__lang\}\}\/mentions-legales\/" class="hover:text-gray-200">Mentions légales<\/a>/g,
    '<a href="{{__basePath}}/{{__lang}}/mentions-legales/" class="hover:text-gray-200">{{legal.hero.title}}</a>'
  );
  content = content.replace(
    /<a href="\{\{__basePath\}\}\/\{\{__lang\}\}\/mentions-legales\/" class="hover:text-gray-300">Mentions légales<\/a>/g,
    '<a href="{{__basePath}}/{{__lang}}/mentions-legales/" class="hover:text-gray-300">{{legal.hero.title}}</a>'
  );
  content = content.replace(
    /<a href="\{\{__basePath\}\}\/\{\{__lang\}\}\/mentions-legales\/" class="hover:text-gray-300 transition-colors">Mentions légales<\/a>/g,
    '<a href="{{__basePath}}/{{__lang}}/mentions-legales/" class="hover:text-gray-300 transition-colors">{{legal.hero.title}}</a>'
  );
  content = content.replace(
    /<a href="\{\{__basePath\}\}\/\{\{__lang\}\}\/politique-confidentialite\/" class="hover:text-gray-200">Confidentialité<\/a>/g,
    '<a href="{{__basePath}}/{{__lang}}/politique-confidentialite/" class="hover:text-gray-200">{{privacy.hero.title}}</a>'
  );
  content = content.replace(
    /<a href="\{\{__basePath\}\}\/\{\{__lang\}\}\/politique-confidentialite\/" class="hover:text-gray-300">Confidentialité<\/a>/g,
    '<a href="{{__basePath}}/{{__lang}}/politique-confidentialite/" class="hover:text-gray-300">{{privacy.hero.title}}</a>'
  );
  content = content.replace(
    /<a href="\{\{__basePath\}\}\/\{\{__lang\}\}\/politique-confidentialite\/" class="hover:text-gray-300 transition-colors">Confidentialité<\/a>/g,
    '<a href="{{__basePath}}/{{__lang}}/politique-confidentialite/" class="hover:text-gray-300 transition-colors">{{privacy.hero.title}}</a>'
  );

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Successfully replaced footer links across all HTML templates!");
