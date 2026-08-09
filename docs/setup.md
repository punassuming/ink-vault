# Setup

## Required Obsidian community plugins

Install and enable:

- Dataview
- Templater
- QuickAdd
- Excalidraw

Optional later:

- PDF++ for deeper PDF linking/annotation workflows
- Advanced Canvas only if core Canvas proves insufficient

## Configure Templater

Set the template folder to:

`00 System/Templates`

Keep reusable JavaScript outside templates. QuickAdd should own workflow orchestration; Templater should construct standardized note bodies and frontmatter.

## Configure QuickAdd

Create a top-level multi-choice named `PKM` with these initial choices:

- Create Project
- Create Decision
- Create Concept
- Create Meeting
- Process Orion Note
- Add Current Note to Project Canvas

User scripts live under `00 System/Scripts/quickadd/`.

## Configure Excalidraw

Use Excalidraw for durable visual models and diagrams whose elements should link to vault notes. Keep handwritten capture in Orion unless the drawing itself is the primary artifact.

Recommended Excalidraw folder:

`60 Visuals/Excalidraw`

Project-specific diagrams may instead live beside the project note.

## Canvas convention

Canvas is a project/research workspace, not the semantic source of truth. Prefer file nodes referencing Markdown, PDFs, and Excalidraw files. Avoid storing irreplaceable knowledge only in text cards.

Recommended Canvas folder:

`60 Visuals/Canvas`

Project-specific canvases may instead live beside the project note.

## Orion convention

Export Orion notes as PDF into:

`70 Attachments/Orion`

Create a Markdown sidecar from `00 System/Templates/Ink.md`. The PDF remains the visual source of truth; the Markdown sidecar owns semantic metadata, links, OCR text, tasks, and extracted concepts.

## Vault folders

Obsidian ignores empty folders in Git, so create them locally as needed:

- `10 Inbox/Notes`
- `10 Inbox/Ink`
- `20 Projects`
- `30 Areas`
- `40 Knowledge/Concepts`
- `40 Knowledge/Systems`
- `40 Knowledge/Procedures`
- `50 Sources`
- `60 Visuals/Excalidraw`
- `60 Visuals/Canvas`
- `70 Attachments/Orion`
- `70 Attachments/PDFs`
- `70 Attachments/Images`
- `90 Archive`

## Implementation order

1. Install plugins and point Templater at the template folder.
2. Adopt the metadata schema before adding more note types.
3. Configure QuickAdd commands around the scripts in this repository.
4. Validate Orion PDF + sidecar workflow manually.
5. Add Android/Tasker automation only after the file conventions are stable.
6. Add OCR/LLM ingestion only after hashing and generated-section boundaries are implemented.
