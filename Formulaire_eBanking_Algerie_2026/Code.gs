
const SHEET_NAME = 'Réponses';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Baromètre e-banking Algérie 2026')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function setupSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Horodatage',
      'Identifiant réponse',
      'Banque',
      'Service utilisé',
      'Satisfaction'
    ]);
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function submitResponse(payload) {
  if (!payload || !Array.isArray(payload.responses) || payload.responses.length === 0) {
    throw new Error('Aucune évaluation reçue.');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = setupSheet_();
    const responseId = Utilities.getUuid();
    const now = new Date();

    const validServices = ['Application mobile', 'E-banking web'];
    const validSatisfaction = [
      'Très insatisfait',
      'Insatisfait',
      'Moyen',
      'Satisfait',
      'Très satisfait'
    ];

    const rows = payload.responses.map(item => {
      const bank = String(item.bank || '').trim();
      const service = String(item.service || '').trim();
      const satisfaction = String(item.satisfaction || '').trim();

      if (!bank || !validServices.includes(service) || !validSatisfaction.includes(satisfaction)) {
        throw new Error('Une réponse est incomplète ou invalide.');
      }

      return [now, responseId, bank, service, satisfaction];
    });

    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, 5).setValues(rows);
    return { ok: true, responseId: responseId };
  } finally {
    lock.releaseLock();
  }
}
