# 🚀 Guide de Démarrage et d'Exécution — ABIX (banques2025)

Ce document récapitule les étapes pas à pas pour installer, compiler, lancer et développer sur le projet **ABIX (Algeria Banking Index)** dans votre environnement local **Laragon**.

---

## 📌 Vue d'ensemble de l'architecture

Le projet fonctionne avec un **générateur de site statique sur-mesure (Node.js)** :
- **Templates** : situés dans [`templates/`](file:///c:/laragon/www/banques2025/templates/)
- **Traductions (i18n)** : gérées dans [`locales/fr.json`](file:///c:/laragon/www/banques2025/locales/fr.json), [`locales/en.json`](file:///c:/laragon/www/banques2025/locales/en.json), [`locales/ar.json`](file:///c:/laragon/www/banques2025/locales/ar.json)
- **Configuration & Navigation** : définies dans [`js/site-config.js`](file:///c:/laragon/www/banques2025/js/site-config.js)
- **Styles** : gérés par **Tailwind CSS** ([`css/tailwind.css`](file:///c:/laragon/www/banques2025/css/tailwind.css) vers [`css/main.css`](file:///c:/laragon/www/banques2025/css/main.css))
- **Sortie générée** : les dossiers [`fr/`](file:///c:/laragon/www/banques2025/fr/), [`en/`](file:///c:/laragon/www/banques2025/en/), [`ar/`](file:///c:/laragon/www/banques2025/ar/) et [`index.html`](file:///c:/laragon/www/banques2025/index.html) sont automatiquement générés.

> ⚠️ **IMPORTANT :** Ne modifiez jamais directement les fichiers HTML dans `fr/`, `en/` ou `ar/` car ils seront écrasés à chaque compilation. Modifiez toujours les fichiers sources dans `templates/` et `locales/`.

---

## 📋 1. Prérequis

1. **Laragon** installé et démarré (serveur Apache ou Nginx actif).
2. **Node.js** (v16 ou supérieur) et **npm** installés.

---

## 🛠️ 2. Installation initiale

Ouvrez un terminal à la racine du projet (`c:\laragon\www\banques2025`) et installez les dépendances npm :

```bash
npm install
```

---

## 💻 3. Lancement en Développement (Environnement Laragon)

Sous Laragon, le projet est généralement accessible via le chemin `/banques2025`.

### 🔄 Option A : Mode surveillance en direct (Recommandé pour coder)

Ouvrez **deux terminaux** à la racine du projet :

#### Terminal 1 — Surveillance et compilation des templates & traductions :
```bash
npm run compile:watch:dev
```
*Ce script écoute les modifications dans `templates/` et `locales/` et régénère les pages avec le préfixe `/banques2025`.*

#### Terminal 2 — Surveillance et compilation du CSS Tailwind :
```bash
npm run watch:css
```
*Ce script écoute vos classes CSS et met à jour `css/main.css` en continu.*

---

### ⚡ Option B : Compilation ponctuelle rapide (Build One-Shot)

Si vous souhaitez simplement compiler l'ensemble du projet sans laisser de terminal ouvert :

```bash
npm run build:dev
```
*(Exécute `compile:dev` puis `build:css` minifié).*

---

## 🌐 4. Accéder au site dans le navigateur

1. Assurez-vous que Laragon est démarré (**"Start All"** dans l'interface Laragon).
2. Ouvrez votre navigateur sur l'une des URLs suivantes :

- **Accès classique Laragon :**
  - Accueil (redirection auto) : [http://localhost/banques2025/](http://localhost/banques2025/)
  - Français : [http://localhost/banques2025/fr/](http://localhost/banques2025/fr/)
  - Anglais : [http://localhost/banques2025/en/](http://localhost/banques2025/en/)
  - Arabe : [http://localhost/banques2025/ar/](http://localhost/banques2025/ar/)

- **Si vous utilisez le VirtualHost automatique Laragon (`banques2025.test`) :**
  - Si le VirtualHost pointe directement à la racine :
    - Compilez sans préfixe avec `npm run compile:watch` et `npm run watch:css`
    - Accédez à [http://banques2025.test/fr/](http://banques2025.test/fr/)

- **Sans Laragon (Serveur local autonome Node.js) :**
  - Compilez avec `npm run build`
  - Lancez `npm run serve`
  - Accédez à [http://localhost:3000/fr/](http://localhost:3000/fr/) ou [http://localhost:3000/en/](http://localhost:3000/en/)

---

## 🚢 5. Build pour la Production (Déploiement racine)

Pour déployer le site sur un serveur de production ou un hébergement où le site est à la racine du domaine (ex: `https://algeriabankingindex.com/`) :

```bash
npm run build
```

Ce script génère :
1. Les fichiers HTML sans le sous-dossier `/banques2025` (`scripts/compile.js`).
2. La feuille de style finale minifiée (`css/main.css`).

---

## 📖 6. Tableau récapitulatif des commandes

| Commande | Rôle | Quand l'utiliser ? |
| :--- | :--- | :--- |
| `npm run serve` | Démarre un serveur HTTP local (Node.js) | Tester le site sans Laragon (`localhost:3000`) |
| `npm run build:dev` | Compile le HTML avec `/banques2025` + CSS minifié | Avant de tester sur `localhost/banques2025` |
| `npm run compile:watch:dev` | Recompile le HTML à chaque modif (avec basePath) | Pendant le développement sous Laragon |
| `npm run watch:css` | Recompile le CSS Tailwind en direct | Pendant le développement |
| `npm run build` | Compile HTML racine + CSS minifié | Test local racine ou déploiement production |
| `npm run compile` | Compile uniquement le HTML (sans basePath) | Test racine ou prod |
| `npm run compile:dev` | Compile uniquement le HTML (avec `/banques2025`) | Mise à jour rapide HTML Laragon |
| `npm run build:css` | Compile uniquement le CSS minifié | Build CSS isolé |

---

## 💡 7. Règles et bonnes pratiques de développement

1. **Traductions i18n obligatoires** :
   - Ne mettez jamais de texte visible en dur dans les templates.
   - Utilisez les balises i18n du compilateur (ex: `{{t "votre_cle"}}` ou les helpers configurés).
   - Renseignez systématiquement la clé dans les 3 fichiers de langue :
     - [`locales/fr.json`](file:///c:/laragon/www/banques2025/locales/fr.json) (Français)
     - [`locales/en.json`](file:///c:/laragon/www/banques2025/locales/en.json) (Anglais)
     - [`locales/ar.json`](file:///c:/laragon/www/banques2025/locales/ar.json) (Arabe)
2. **Nouvelle page** :
   - Ajoutez le fichier HTML dans [`templates/`](file:///c:/laragon/www/banques2025/templates/).
   - Déclarez la page dans la liste `PAGES` du script [`scripts/compile.js`](file:///c:/laragon/www/banques2025/scripts/compile.js).
