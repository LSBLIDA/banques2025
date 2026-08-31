const fs = require('fs');

const htmlFile = 'templates/edition-2026.html';
let html = fs.readFileSync(htmlFile, 'utf8');

// 1. Remove HTML blocks for Q10, Q11, Q12
html = html.replace(/<!-- Q10 -->[\s\S]*?<!-- Q11 -->/g, '<!-- Q11 -->');
html = html.replace(/<!-- Q11 -->[\s\S]*?<!-- Q12 -->/g, '<!-- Q12 -->');
html = html.replace(/<!-- Q12 -->[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/g, '</div>\n  </div>\n</section>');

// 2. Remove the first two questions ("Que garantit..." and "Le tarif...") 
// and the last question ("Puis-je demander...") from JSON-LD schema
const scriptRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
html = html.replace(scriptRegex, (match, jsonStr) => {
  try {
    const schema = JSON.parse(jsonStr);
    
    // Remove "Que garantit..." and "Le tarif..." and "Puis-je demander..."
    schema.mainEntity = schema.mainEntity.filter(item => {
      const q = item.name.trim();
      if (q === "Que garantit la souscription anticipée ?") return false;
      if (q === "Le tarif préférentiel est-il garanti ?") return false;
      if (q === "Puis-je demander une présentation ou un benchmark personnalisé ?") return false;
      return true;
    });

    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  } catch (e) {
    console.error("JSON parse error:", e);
    return match; // return original if error
  }
});

fs.writeFileSync(htmlFile, html);
console.log("FAQ cleanup in edition-2026.html successful.");
