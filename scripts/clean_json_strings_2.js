const fs = require('fs');

const updates = [
    {
        file: 'locales/fr.json',
        replacements: [
            ["Souscriptions anticipées ouvertes — Tarif préférentiel jusqu’au 31 août 2026", "Souscriptions ouvertes — Édition 2026"],
            ["Offre de souscription anticipée — Jusqu'au 31 août 2026", "Souscription — Édition 2026"],
            ["Bénéficiez d’une remise de 10 % pour toute souscription enregistrée avant le 31 août 2026. L’étude est actuellement en cours de finalisation et sera remise aux souscripteurs dès sa publication.", "L’étude est actuellement en cours de finalisation et sera remise aux souscripteurs dès sa publication."],
            ["Tarif préférentiel réservé aux souscriptions anticipées avant le 31 août 2026", "Souscription pour l'édition 2026"],
            ["Offre réservée aux souscriptions anticipées enregistrées avant le 31 août 2026.", ""],
            ["Valable jusqu'au 31 août 2026 à 23h59", ""],
            ["Souscrivez avant le 31 août 2026 et bénéficiez d’une remise de 10 % sur le tarif public de l’édition 2026. L’étude sera livrée dès sa publication.", "L’étude sera livrée dès sa publication."],
            ["-10 % jusqu’au 31 août", ""],
            ["Tarif de souscription anticipée valable jusqu’au 31 août 2026", ""],
            ["Bénéficiez d’une remise de 10 % pour toute souscription enregistrée avant le 31 août 2026 à 23 h 59.", "Souscrivez à l'édition 2026."],
            ["Oui. Toute souscription enregistrée au plus tard le 31 août 2026 à 23 h 59, heure d’Algérie, bénéficie du tarif de souscription anticipée.\\n\\nCe tarif reste garanti jusqu’à la livraison de l’étude.", "Oui. La souscription reste garantie jusqu’à la livraison de l’étude."],
            ["Les souscripteurs seront informés de toute évolution du calendrier de publication.\\n\\nLa souscription restera valide et le tarif préférentiel obtenu avant le 31 août 2026 demeurera garanti.", "Les souscripteurs seront informés de toute évolution du calendrier de publication.\\n\\nLa souscription restera valide."],
            ["L’édition 2026 est ouverte à la souscription anticipée avec un tarif préférentiel valable jusqu’au 31 août 2026.", "L’édition 2026 est ouverte à la souscription."],
            ["Offre promotionnelle Early Bird valable jusqu’au 31 août 2026.", ""]
        ]
    }
];

updates.forEach(u => {
    if (fs.existsSync(u.file)) {
        let content = fs.readFileSync(u.file, 'utf8');
        u.replacements.forEach(([oldStr, newStr]) => {
            content = content.split(oldStr).join(newStr);
        });
        fs.writeFileSync(u.file, content, 'utf8');
        console.log(`Updated ${u.file}`);
    }
});
