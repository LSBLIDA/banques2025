const fs = require('fs');
const path = require('path');

const frPath = path.join(__dirname, '../locales/fr.json');
const enPath = path.join(__dirname, '../locales/en.json');
const arPath = path.join(__dirname, '../locales/ar.json');
const contactTemplatePath = path.join(__dirname, '../templates/contact.html');

const fr = JSON.parse(fs.readFileSync(frPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));

fr.contact.formTitle = "Envoyez-nous votre demande";
en.contact.formTitle = "Send Us Your Request";
ar.contact.formTitle = "أرسل لنا طلبك";

fs.writeFileSync(frPath, JSON.stringify(fr, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');
fs.writeFileSync(arPath, JSON.stringify(ar, null, 2), 'utf8');

let contactHtml = fs.readFileSync(contactTemplatePath, 'utf8');
contactHtml = contactHtml.replace(
  '<h2 class="text-2xl font-bold text-gray-900">Envoyez-nous votre demande</h2>',
  '<h2 class="text-2xl font-bold text-gray-900">{{contact.formTitle}}</h2>'
);

fs.writeFileSync(contactTemplatePath, contactHtml, 'utf8');

console.log("Successfully updated contact.formTitle in locales and templates/contact.html!");
