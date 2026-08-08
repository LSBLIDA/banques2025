const fs = require('fs');
const path = require('path');

const logosDir = path.join(__dirname, '..', 'public', 'logos');

const MAPPING = [
  { raw: 'Logo-BEA.png', clean: 'bea.png', id: 'bea', name: 'BEA', fullName: 'Banque Extérieure d\'Algérie' },
  { raw: 'Logo-BNA.png', clean: 'bna.png', id: 'bna', name: 'BNA', fullName: 'Banque Nationale d\'Algérie' },
  { raw: 'Logo-CPA.png', clean: 'cpa.png', id: 'cpa', name: 'CPA', fullName: 'Crédit Populaire d\'Algérie' },
  { raw: 'Logo-BDL.jpg', clean: 'bdl.jpg', id: 'bdl', name: 'BDL', fullName: 'Banque du Développement Local' },
  { raw: 'Logo-BADR.png', clean: 'badr.png', id: 'badr', name: 'BADR', fullName: 'Banque de l\'Agriculture et du Développement Rural' },
  { raw: 'Logo-CNEP.png', clean: 'cnep.png', id: 'cnep', name: 'CNEP-Banque', fullName: 'CNEP-Banque' },
  { raw: 'Logo-AGB.jpg', clean: 'agb.jpg', id: 'agb', name: 'AGB', fullName: 'Gulf Bank Algérie' },
  { raw: 'Logo-Société Générale.jpg', clean: 'sga.jpg', id: 'sga', name: 'Société Générale', fullName: 'Société Générale Algérie' },
  { raw: 'Logo-Natexis.jpg', clean: 'natixis.jpg', id: 'natixis', name: 'Natixis', fullName: 'Natixis Algérie' },
  { raw: 'Logo-BNP Paris bas.jpg', clean: 'bnp.jpg', id: 'bnp', name: 'BNP Paribas', fullName: 'BNP Paribas El Djazaïr' },
  { raw: 'Logo-Al Baraka Bank.png', clean: 'albaraka.png', id: 'albaraka', name: 'Al Baraka Bank', fullName: 'Al Baraka Bank Algeria' },
  { raw: 'Logo-Alsalam Bank.png', clean: 'alsalam.png', id: 'alsalam', name: 'Alsalam Bank', fullName: 'Alsalam Bank Algeria' },
  { raw: 'Logo-Housing Bank.png', clean: 'housing.png', id: 'housing', name: 'Housing Bank', fullName: 'Housing Bank Algeria' },
  { raw: 'Logo-Arab Bank.jpg', clean: 'arab-bank.jpg', id: 'arab-bank', name: 'Arab Bank', fullName: 'Arab Bank Algeria' },
  { raw: 'Logo-ABC Bank.png', clean: 'abc.png', id: 'abc', name: 'Bank ABC', fullName: 'Bank ABC Algérie' },
  { raw: 'Logo-Fransabank.jpg', clean: 'fransabank.jpg', id: 'fransabank', name: 'Fransabank', fullName: 'Fransabank El Djazaïr' },
  { raw: 'Logo-Trust Bank.jpg', clean: 'trust.jpg', id: 'trust', name: 'Trust Bank', fullName: 'Trust Bank Algeria' },
  { raw: 'Logo-BNH.jpg', clean: 'bnh.jpg', id: 'bnh', name: 'BNH', fullName: 'Banque Nationale de l\'Habitat' },
  { raw: 'Logo-Citi-bank.png', clean: 'citi.png', id: 'citi', name: 'Citibank', fullName: 'Citibank N.A. Algeria' },
  { raw: 'Logo-HSBC.png', clean: 'hsbc.png', id: 'hsbc', name: 'HSBC', fullName: 'HSBC Algeria' },
  { raw: 'Logo-Ziraat bank.jpg', clean: 'ziraat.jpg', id: 'ziraat', name: 'Ziraat Bank', fullName: 'Ziraat Bankası Algérie' }
];

console.log("Processing official bank logos from OneDrive...");
MAPPING.forEach(item => {
  const src = path.join(logosDir, item.raw);
  const dest = path.join(logosDir, item.clean);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied ${item.raw} -> ${item.clean}`);
  } else {
    console.warn(`! Missing source file: ${item.raw}`);
  }
});

console.log("Done copying official logos!");
