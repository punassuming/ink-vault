const { sanitizeFileName, ensureFolder, writeJson } = require("../lib/vault");
const { emptyCanvas, addFileNode } = require("../lib/canvas");

module.exports = async ({ app, quickAddApi }) => {
  const rawName = await quickAddApi.inputPrompt("Project name");
  if (!rawName) return;

  const name = sanitizeFileName(rawName);
  const projectDir = `20 Projects/${name}`;
  await ensureFolder(app, projectDir);

  const projectPath = `${projectDir}/${name}.md`;
  if (app.vault.getAbstractFileByPath(projectPath)) {
    throw new Error(`Project already exists: ${projectPath}`);
  }

  const today = window.moment().format("YYYY-MM-DD");
  const canvasName = `${name}.canvas`;
  const diagramName = `${name} Architecture.excalidraw.md`;
  const project = `---\ntype: project\nstatus: active\ncreated: ${today}\nupdated: ${today}\narea:\nsystems: []\ncanvas: "[[${canvasName}]]"\ndiagram: "[[${diagramName}]]"\ntags:\n  - project\n---\n\n# ${name}\n\n## Objective\n\n\n## Current state\n\n\n## Decisions\n\n\`\`\`dataview\nTABLE status, decision_date\nFROM [[${name}]]\nWHERE type = "decision"\nSORT decision_date DESC\n\`\`\`\n\n## Related artifacts\n\n\`\`\`dataview\nTABLE type, file.mtime AS Updated\nFROM [[${name}]]\nWHERE type != "decision"\nSORT file.mtime DESC\n\`\`\`\n\n## Tasks\n\n- [ ] \n`;

  await app.vault.create(projectPath, project);

  const canvas = emptyCanvas();
  addFileNode(canvas, projectPath, { id: "project-home", x: 0, y: 0, width: 520, height: 620 });
  await writeJson(app, `${projectDir}/${canvasName}`, canvas);

  const file = app.vault.getAbstractFileByPath(projectPath);
  await app.workspace.getLeaf(false).openFile(file);
};
