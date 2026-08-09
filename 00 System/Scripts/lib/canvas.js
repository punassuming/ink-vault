// Minimal JSON Canvas helpers for QuickAdd user scripts.
// Deliberately append-oriented: automation must not continuously rewrite
// human-managed spatial layouts.

function emptyCanvas() {
  return { nodes: [], edges: [] };
}

function fileNode(file, options = {}) {
  return {
    id: options.id ?? crypto.randomUUID(),
    type: "file",
    file,
    x: options.x ?? 0,
    y: options.y ?? 0,
    width: options.width ?? 500,
    height: options.height ?? 400,
  };
}

function addFileNode(canvas, file, options = {}) {
  canvas.nodes ??= [];
  const node = fileNode(file, options);
  canvas.nodes.push(node);
  return node;
}

module.exports = { emptyCanvas, fileNode, addFileNode };
