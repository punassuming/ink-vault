# Excalidraw automation

This directory is reserved for ExcalidrawAutomate scripts.

## Intended workflows

- Create Architecture Diagram
- Create Concept Map
- Link selected text/elements to canonical Markdown entities
- Create a diagram associated with a project and add it to the project Canvas

## Boundary

Do not manipulate Excalidraw's serialized file format directly when the plugin's ExcalidrawAutomate API can perform the operation. Canvas JSON is a published interchange format; Excalidraw's internal Obsidian representation should not be treated the same way.

The first repository draft intentionally leaves these as the next implementation stage rather than shipping brittle automation against an assumed plugin API version.
