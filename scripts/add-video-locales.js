const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'locales');

const videoTranslations = {
  fr: {
    playButton: "Voir la démonstration vidéo",
    playDuration: "2 min",
    caption: "Vidéo de démonstration — Découvrez ABIX Data Explorer en action",
    ariaPlay: "Lancer la vidéo de démonstration d'ABIX Data Explorer"
  },
  en: {
    playButton: "Watch Video Demo",
    playDuration: "2 min",
    caption: "Demo Video — Discover ABIX Data Explorer in action",
    ariaPlay: "Play ABIX Data Explorer demo video"
  },
  ar: {
    playButton: "مشاهدة الفيديو التوضيحي",
    playDuration: "دقيقتان",
    caption: "فيديو تعريفي — اكتشف منصة ABIX Data Explorer عمليًا",
    ariaPlay: "تشغيل الفيديو التوضيحي لمنصة ABIX Data Explorer"
  }
};

for (const lang of ['fr', 'en', 'ar']) {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!data.dataExplorer) {
    data.dataExplorer = {};
  }
  data.dataExplorer.video = videoTranslations[lang];
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`[i18n] ✓ dataExplorer.video added to ${lang}.json`);
}
