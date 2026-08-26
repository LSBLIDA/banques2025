#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Vérification automatisée complète de tous les livrables ABIX 2026
"""

import os
import glob
import re
import fitz

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

errors = []
successes = []

def check(condition, message):
    if condition:
        successes.append(message)
    else:
        errors.append(message)

print("=== 1. VÉRIFICATION DES 3 PDF COMMERCIAUX ===")

expected_pdfs = [
    {
        'filename': 'offre-abix-pack-essentiel-2026.pdf',
        'name': 'Pack Essentiel',
        'promo_price': '75 600 DA HT',
        'total_ttc': '89 964 DA TTC'
    },
    {
        'filename': 'offre-abix-pack-pro-2026.pdf',
        'name': 'Pack Pro',
        'promo_price': '108 000 DA HT',
        'total_ttc': '128 520 DA TTC'
    },
    {
        'filename': 'offre-abix-pack-corporate-executive-2026.pdf',
        'name': 'Pack Corporate Executive',
        'promo_price': '162 000 DA HT',
        'total_ttc': '192 780 DA TTC'
    }
]

for p in expected_pdfs:
    pdf_path = os.path.join(BASE_DIR, "public", "documents", "offres", p['filename'])
    check(os.path.exists(pdf_path), f"Fichier PDF présent : {p['filename']}")
    if os.path.exists(pdf_path):
        size = os.path.getsize(pdf_path)
        check(size > 5000, f"Taille valide ({size} octets) pour {p['filename']}")
        
        doc = fitz.open(pdf_path)
        check(len(doc) == 2, f"Exactement 2 pages (obtenu: {len(doc)}) pour {p['filename']}")
        
        full_text = ""
        for i, page in enumerate(doc):
            full_text += page.get_text() + "\n"
            
        check(p['name'] in full_text, f"Nom '{p['name']}' présent dans le texte du PDF")
        check(p['promo_price'].replace(' ', '') in full_text.replace(' ', ''), f"Prix promo '{p['promo_price']}' présent dans le PDF")
        check(p['total_ttc'].replace(' ', '') in full_text.replace(' ', ''), f"Prix TTC '{p['total_ttc']}' présent dans le PDF")
        
        # Vérification absence de données privées / factures proforma
        check("M. Rachid Sekak" not in full_text, f"Pas de mention 'M. Rachid Sekak' dans {p['filename']}")
        check("Nom du prospect" not in full_text, f"Pas de champ prospect personnalisé dans {p['filename']}")

print("\n=== 2. VÉRIFICATION DES PAGES DE CONFIRMATION ===")

expected_html_pages = [
    "fr/souscription/confirmation/essentiel/index.html",
    "fr/souscription/confirmation/pro/index.html",
    "fr/souscription/confirmation/corporate/index.html",
    "en/subscription/confirmation/essential/index.html",
    "en/subscription/confirmation/pro/index.html",
    "en/subscription/confirmation/corporate/index.html",
    "ar/souscription/confirmation/essentiel/index.html",
    "ar/souscription/confirmation/pro/index.html",
    "ar/souscription/confirmation/corporate/index.html",
]

for rel_path in expected_html_pages:
    full_path = os.path.join(BASE_DIR, rel_path)
    check(os.path.exists(full_path), f"Page HTML présente : {rel_path}")
    if os.path.exists(full_path):
        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Vérifier qu'aucune balise {{...}} n'est restée non résolue
        unresolved = re.findall(r'\{\{[^}]+\}\}', content)
        check(len(unresolved) == 0, f"Aucun tag non résolu dans {rel_path} (trouvés: {unresolved})")
        
        # Vérifier présence boutons download et send email
        check("download=" in content, f"Attribut download présent dans {rel_path}")
        check("send-offer-email-form" in content, f"Formulaire d'envoi email présent dans {rel_path}")
        check("noindex" in content, f"Protection meta noindex présente dans {rel_path}")

print("\n=== 3. VÉRIFICATION DE LA CONFIGURATION COMMERCIALE ===")
config_php = os.path.join(BASE_DIR, "api", "config", "offers-config.php")
check(os.path.exists(config_php), "offers-config.php présent")

print(f"\n==========================================")
print(f"RÉSULTATS : {len(successes)} SUCCÈS, {len(errors)} ERREURS")
print(f"==========================================")

for s in successes:
    print(f" [PASS] {s}")

if errors:
    print("\nERREURS:")
    for e in errors:
        print(f" [FAIL] {e}")
    sys.exit(1)
else:
    print("\nTous les tests de validation ont réussi avec succès !")
