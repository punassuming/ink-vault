// Shared vault helpers for QuickAdd scripts.

function sanitizeFileName(value) {
  return value.trim().replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, " ");
}

async function ensureFolder(app, path) {
  const parts = path.split("/").filter(Boolean);
  let current = "";
  for (const part of parts) {
    current = current ? `${current}/${part}` : part;
    if (!app.vault.getAbstractFileByPath(current)) {
      await app.vault.createFolder(current);
    }
  }
}

async function writeJson(app, path, value) {
  const existing = app.vault.getAbstractFileByPath(path);
  const text = JSON.stringify(value, null, 2) + "\n";
  if (existing) await app.vault.modify(existing, text);
  else await app.vault.create(path, text);
}

module.exports = { sanitizeFileName, ensureFolder, writeJson };
