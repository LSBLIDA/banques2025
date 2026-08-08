const fs = require('fs');
const path = require('path');

const logosDir = path.join(__dirname, '..', 'public', 'logos');

const SVG_LOGOS = {
  "bna.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <circle cx="35" cy="35" r="32" fill="#007A3D"/>
      <path d="M 23 20 L 47 20 L 47 50 L 23 50 Z" fill="#FFFFFF"/>
      <path d="M 29 26 L 41 26 L 41 44 L 29 44 Z" fill="#007A3D"/>
      <circle cx="35" cy="35" r="5" fill="#D21034"/>
    </g>
    <text x="95" y="46" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="28" fill="#007A3D">BNA</text>
    <text x="95" y="68" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="11" fill="#4B5563">Banque Nationale d'Algérie</text>
  </svg>`,

  "bea.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="5" y="5" width="60" height="60" rx="12" fill="#06366D"/>
      <path d="M 20 20 L 50 20 L 35 50 Z" fill="#24B7D3"/>
      <circle cx="35" cy="27" r="6" fill="#FFFFFF"/>
    </g>
    <text x="95" y="46" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="28" fill="#06366D">BEA</text>
    <text x="95" y="68" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="11" fill="#4B5563">Banque Extérieure d'Algérie</text>
  </svg>`,

  "cpa.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <circle cx="35" cy="35" r="32" fill="#8B0000"/>
      <path d="M 35 12 L 53 47 L 17 47 Z" fill="#D4AF37"/>
      <circle cx="35" cy="32" r="8" fill="#FFFFFF"/>
    </g>
    <text x="95" y="46" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="28" fill="#8B0000">CPA</text>
    <text x="95" y="68" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="11" fill="#4B5563">Crédit Populaire d'Algérie</text>
  </svg>`,

  "bdl.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="5" y="5" width="60" height="60" rx="12" fill="#0A3A60"/>
      <path d="M 20 45 L 35 20 L 50 45 Z" fill="#E67E22"/>
      <rect x="30" y="35" width="10" height="20" fill="#FFFFFF"/>
    </g>
    <text x="95" y="46" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="28" fill="#0A3A60">BDL</text>
    <text x="95" y="68" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="10" fill="#4B5563">Banque du Développement Local</text>
  </svg>`,

  "badr.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <circle cx="35" cy="35" r="32" fill="#1B5E20"/>
      <path d="M 35 15 C 20 30 20 50 35 55 C 50 50 50 30 35 15 Z" fill="#81C784"/>
      <path d="M 35 25 L 35 48" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
    </g>
    <text x="95" y="46" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="28" fill="#1B5E20">BADR</text>
    <text x="95" y="68" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="10" fill="#4B5563">Banque de l'Agriculture et du Dev. Rural</text>
  </svg>`,

  "cnep.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="5" y="5" width="60" height="60" rx="12" fill="#006633"/>
      <path d="M 35 18 L 52 32 L 52 52 L 18 52 L 18 32 Z" fill="#F4C430"/>
      <circle cx="35" cy="38" r="7" fill="#006633"/>
    </g>
    <text x="95" y="46" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="24" fill="#006633">CNEP-Banque</text>
    <text x="95" y="68" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="10" fill="#4B5563">Caisse Nationale d'Épargne et de Prévoyance</text>
  </svg>`,

  "agb.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="5" y="5" width="60" height="60" rx="12" fill="#003366"/>
      <circle cx="35" cy="35" r="20" fill="none" stroke="#D4AF37" stroke-width="4"/>
      <path d="M 25 35 L 45 35 M 35 25 L 35 45" stroke="#D4AF37" stroke-width="4"/>
    </g>
    <text x="95" y="46" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="28" fill="#003366">AGB</text>
    <text x="95" y="68" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="11" fill="#4B5563">Gulf Bank Algérie</text>
  </svg>`,

  "sga.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="10" y="10" width="50" height="25" fill="#E0001A"/>
      <rect x="10" y="35" width="50" height="25" fill="#000000"/>
      <rect x="10" y="33" width="50" height="4" fill="#FFFFFF"/>
    </g>
    <text x="95" y="42" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="18" fill="#000000">SOCIETE GENERALE</text>
    <text x="95" y="62" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="12" fill="#E0001A">Algérie</text>
  </svg>`,

  "natixis.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <circle cx="35" cy="35" r="30" fill="#5B257D"/>
      <path d="M 20 20 L 50 50 M 50 20 L 20 50" stroke="#EA5404" stroke-width="6" stroke-linecap="round"/>
    </g>
    <text x="95" y="46" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="26" fill="#5B257D">NATIXIS</text>
    <text x="95" y="68" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="11" fill="#EA5404">Algérie</text>
  </svg>`,

  "bnp.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="5" y="5" width="60" height="60" rx="10" fill="#00965E"/>
      <path d="M 15 50 Q 35 15 55 25" fill="none" stroke="#FFFFFF" stroke-width="4"/>
      <circle cx="48" cy="22" r="3" fill="#FFFFFF"/>
      <circle cx="38" cy="28" r="3" fill="#FFFFFF"/>
      <circle cx="28" cy="36" r="3" fill="#FFFFFF"/>
    </g>
    <text x="95" y="44" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="22" fill="#00965E">BNP PARIBAS</text>
    <text x="95" y="66" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="11" fill="#4B5563">El Djazaïr</text>
  </svg>`,

  "albaraka.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="5" y="5" width="60" height="60" rx="12" fill="#0A2540"/>
      <path d="M 35 15 L 42 28 L 56 35 L 42 42 L 35 56 L 28 42 L 14 35 L 28 28 Z" fill="#C5A059"/>
    </g>
    <text x="95" y="44" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="22" fill="#0A2540">AL BARAKA</text>
    <text x="95" y="66" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="11" fill="#C5A059">Banque Al Baraka d'Algérie</text>
  </svg>`,

  "alsalam.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="5" y="5" width="60" height="60" rx="12" fill="#005A36"/>
      <circle cx="35" cy="35" r="18" fill="none" stroke="#FFFFFF" stroke-width="4"/>
      <path d="M 35 20 L 35 50 M 20 35 L 50 35" stroke="#FFFFFF" stroke-width="3"/>
    </g>
    <text x="95" y="44" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="22" fill="#005A36">ALSALAM BANK</text>
    <text x="95" y="66" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="11" fill="#4B5563">Alsalam Bank Algeria</text>
  </svg>`,

  "housing.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="5" y="5" width="60" height="60" rx="12" fill="#1C3F94"/>
      <path d="M 35 18 L 52 34 L 46 34 L 46 52 L 24 52 L 24 34 L 18 34 Z" fill="#FFFFFF"/>
    </g>
    <text x="95" y="44" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="20" fill="#1C3F94">HOUSING BANK</text>
    <text x="95" y="66" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="11" fill="#4B5563">Housing Bank Algeria</text>
  </svg>`,

  "arab-bank.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="5" y="5" width="60" height="60" rx="12" fill="#002D62"/>
      <circle cx="35" cy="35" r="20" fill="#D4AF37"/>
      <path d="M 28 35 L 42 35" stroke="#002D62" stroke-width="4"/>
    </g>
    <text x="95" y="44" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="22" fill="#002D62">ARAB BANK</text>
    <text x="95" y="66" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="11" fill="#4B5563">Arab Bank Algeria</text>
  </svg>`,

  "abc.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="5" y="5" width="60" height="60" rx="12" fill="#C8102E"/>
      <text x="35" y="45" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="26" fill="#FFFFFF" text-anchor="middle">ABC</text>
    </g>
    <text x="95" y="44" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="22" fill="#C8102E">BANK ABC</text>
    <text x="95" y="66" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="11" fill="#4B5563">Bank ABC Algérie</text>
  </svg>`,

  "fransabank.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="5" y="5" width="60" height="60" rx="12" fill="#0055A5"/>
      <path d="M 20 20 L 50 20 L 50 32 L 32 32 L 32 40 L 48 40 L 48 52 L 20 52 Z" fill="#FFFFFF"/>
    </g>
    <text x="95" y="44" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="22" fill="#0055A5">FRANSABANK</text>
    <text x="95" y="66" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="11" fill="#4B5563">Fransabank El Djazaïr</text>
  </svg>`,

  "trust.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="5" y="5" width="60" height="60" rx="12" fill="#0B2C5D"/>
      <path d="M 22 25 L 48 25 M 35 25 L 35 55" stroke="#00A8CC" stroke-width="6" stroke-linecap="round"/>
    </g>
    <text x="95" y="44" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="22" fill="#0B2C5D">TRUST BANK</text>
    <text x="95" y="66" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="11" fill="#00A8CC">Trust Bank Algeria</text>
  </svg>`,

  "bnh.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="5" y="5" width="60" height="60" rx="12" fill="#154360"/>
      <path d="M 35 16 L 54 34 L 48 34 L 48 52 L 22 52 L 22 34 L 16 34 Z" fill="#D4AC0D"/>
    </g>
    <text x="95" y="44" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="24" fill="#154360">BNH</text>
    <text x="95" y="66" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="10" fill="#4B5563">Banque Nationale de l'Habitat</text>
  </svg>`,

  "citi.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="5" y="5" width="60" height="60" rx="12" fill="#002D72"/>
      <path d="M 20 22 C 30 15 40 15 50 22" stroke="#ED1C24" stroke-width="4" fill="none"/>
      <text x="35" y="48" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="22" fill="#FFFFFF" text-anchor="middle">citi</text>
    </g>
    <text x="95" y="44" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="24" fill="#002D72">CITIBANK</text>
    <text x="95" y="66" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="11" fill="#ED1C24">Citibank N.A. Algeria</text>
  </svg>`,

  "hsbc.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
    <rect width="300" height="100" fill="transparent"/>
    <g transform="translate(15, 15)">
      <rect x="5" y="5" width="60" height="60" rx="12" fill="#DB0011"/>
      <polygon points="35,15 55,35 35,55 15,35" fill="#FFFFFF"/>
      <polygon points="35,15 35,55 55,35" fill="#DB0011"/>
    </g>
    <text x="95" y="44" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="24" fill="#DB0011">HSBC</text>
    <text x="95" y="66" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="11" fill="#4B5563">HSBC Algeria</text>
  </svg>`
};

for (const [filename, content] of Object.entries(SVG_LOGOS)) {
  const filePath = path.join(logosDir, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Generated ${filename}`);
}
console.log("All 20 SVG bank logos generated cleanly!");
