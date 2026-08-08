
FORMULAIRE E-BANKING ALGÉRIE 2026
=================================

Ce dossier contient un formulaire Google Apps Script prêt à déployer.
Les réponses sont enregistrées automatiquement dans un Google Sheet.

FICHIERS
--------
- Code.gs : traitement et enregistrement des réponses
- Index.html : formulaire public et responsive

DÉPLOIEMENT
-----------
1. Créez un nouveau Google Sheet.
2. Donnez-lui un nom, par exemple : « Baromètre e-banking 2026 ».
3. Dans le menu du Sheet : Extensions > Apps Script.
4. Remplacez le contenu de Code.gs par le contenu du fichier Code.gs fourni.
5. Dans Apps Script, cliquez sur + puis HTML et créez un fichier nommé « Index ».
6. Collez le contenu de Index.html dans ce fichier.
7. Cliquez sur Déployer > Nouveau déploiement.
8. Type : Application Web.
9. Exécuter en tant que : Moi.
10. Qui a accès : Tout le monde.
11. Cliquez sur Déployer, autorisez l’accès, puis copiez le lien public.

Les réponses apparaîtront automatiquement dans l’onglet « Réponses ».

STRUCTURE DU FORMULAIRE
-----------------------
1. Sélection d’une ou plusieurs banques.
2. Pour chaque banque, les deux services sont affichés automatiquement :
   - Application mobile
   - E-banking web
   L’utilisateur peut choisir « Je n’utilise pas ce service ».
3. Niveau de satisfaction :
   - Très insatisfait
   - Insatisfait
   - Moyen
   - Satisfait
   - Très satisfait

PERSONNALISATION
----------------
La liste des banques se trouve dans Index.html, dans la variable :
const banks = [...]

Vous pouvez modifier :
- le titre ;
- les couleurs ;
- le texte d’introduction ;
- la liste des banques ;
- la mention d’information.
