const { addFileNode } = require("../lib/canvas");
const { writeJson } = require("../lib/vault");

module.exports = async ({ app, quickAddApi }) => {
  const active = app.workspace.getActiveFile();
  if (!active) throw new Error("No active file");

  const projects = app.vault.getMarkdownFiles()
    .filter((file) => file.path.startsWith("20 Projects/"))
    .filter((file) => app.metadataCache.getFileCache(file)?.frontmatter?.type === "project");

  if (!projects.length) throw new Error("No project notes found");

  const names = projects.map((file) => file.basename);
  const selected = await quickAddApi.suggester(names, projects);
  if (!selected) return;

  const dir = selected.parent.path;
  const canvasPath = `${dir}/${selected.basename}.canvas`;
  const canvasFile = app.vault.getAbstractFileByPath(canvasPath);
  let canvas = { nodes: [], edges: [] };

  if (canvasFile) {
    canvas = JSON.parse(await app.vault.read(canvasFile));
  }

  const duplicate = (canvas.nodes ?? []).some((node) => node.type === "file" && node.file === active.path);
  if (duplicate) return;

  const count = (canvas.nodes ?? []).length;
  addFileNode(canvas, active.path, {
    x: 600 + ((count - 1) % 3) * 520,
    y: Math.floor((count - 1) / 3) * 440,
    width: 480,
    height: 380,
  });

  await writeJson(app, canvasPath, canvas);
};
