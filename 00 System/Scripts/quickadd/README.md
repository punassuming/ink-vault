# QuickAdd scripts

Configure these files as QuickAdd user scripts.

## `create-project.js`

Prompts for a project name, creates a project-local directory, canonical Markdown project note, and JSON Canvas workspace.

## `add-to-project-canvas.js`

Adds the current file to a selected project's Canvas without modifying existing spatial layout.

## `process-orion.js`

Creates a dated Orion Markdown sidecar in `10 Inbox/Ink`. PDF attachment handling remains manual in this draft; Android share-intent automation will be layered on top of the same contract.

## Dependency rule

Shared code belongs in `../lib/`. Keep workflow scripts small and compositional rather than duplicating metadata, filename, Canvas, or vault manipulation logic.
