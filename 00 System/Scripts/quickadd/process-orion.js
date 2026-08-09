const { sanitizeFileName, ensureFolder } = require("../lib/vault");

module.exports = async ({ app, quickAddApi }) => {
  const rawTitle = await quickAddApi.inputPrompt("Orion note title");
  if (!rawTitle) return;

  const title = sanitizeFileName(rawTitle);
  const today = window.moment().format("YYYY-MM-DD");
  const base = `${today} ${title}`;
  const inbox = "10 Inbox/Ink";
  await ensureFolder(app, inbox);

  const notePath = `${inbox}/${base}.md`;
  if (app.vault.getAbstractFileByPath(notePath)) {
    throw new Error(`Ink sidecar already exists: ${notePath}`);
  }

  const content = `---\ntype: ink\nsource_app: orion\nsource_asset:\nsource_hash:\nprocessed: false\nprocessed_hash:\nproject:\ncreated: ${today}\nupdated: ${today}\ntags:\n  - ink\n---\n\n# ${base}\n\n## Original\n\n> Link or embed the exported Orion PDF here.\n\n## My notes\n\n\n<!-- GENERATED:START -->\n## OCR\n\n_Not processed._\n\n## Extracted concepts\n\n\n## Extracted tasks\n\n\n## Machine summary\n\n_Not processed._\n<!-- GENERATED:END -->\n`;

  const file = await app.vault.create(notePath, content);
  await app.workspace.getLeaf(false).openFile(file);
};
