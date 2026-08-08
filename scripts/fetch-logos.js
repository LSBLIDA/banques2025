const fs = require('fs');
const path = require('path');
const https = require('https');

const LOGOS = [
  {
    filename: 'bna.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Bna-logo-full.svg'
  },
  {
    filename: 'bea.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Bea_logo.svg'
  },
  {
    filename: 'cpa.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Cr%C3%A9dit_populaire_d%27Alg%C3%A9rie_logo.svg'
  },
  {
    filename: 'badr.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Banque_de_l%27agriculture_et_du_d%C3%A9veloppement_rural.svg'
  },
  {
    filename: 'cnep.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/CNEP-Banque_logo.svg'
  },
  {
    filename: 'sga.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Soci%C3%A9t%C3%A9_G%C3%A9n%C3%A9rale.svg'
  },
  {
    filename: 'bnp.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/BNP_Paribas.svg'
  },
  {
    filename: 'natixis.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Logo_Natixis.svg'
  },
  {
    filename: 'albaraka.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Al_Baraka_Bank_logo.svg'
  },
  {
    filename: 'citi.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Citibank.svg'
  },
  {
    filename: 'hsbc.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg'
  }
];

const destDir = path.join(__dirname, '..', 'public', 'logos');

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log("Fetching high resolution vector logos...");
  for (const item of LOGOS) {
    const destPath = path.join(destDir, item.filename);
    try {
      await download(item.url, destPath);
      console.log(`✓ Downloaded ${item.filename}`);
    } catch (err) {
      console.error(`✗ Error downloading ${item.filename}:`, err.message);
    }
  }
}

main();
