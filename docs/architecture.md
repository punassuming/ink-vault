# Architecture

## Responsibility boundaries

| Component | Responsibility | Canonical |
|---|---|---|
| Markdown | concepts, projects, decisions, tasks, relationships | Yes |
| Orion | pen-first capture and PDF annotation | No |
| Excalidraw | authored diagrams and visual reasoning | No |
| Canvas | spatial composition of existing artifacts | No |
| Dataview | query/read models over metadata | Derived |
| Templater | deterministic artifact construction | Automation |
| QuickAdd | workflow orchestration | Automation |

## Information maturity

```text
CAPTURE             SEMANTIC             MODEL / COMPOSE

Orion ----PDF----> Markdown -----------> Excalidraw
                       |                     |
Sources -------------> |                     |
                       +----Dataview          +----Canvas
                       |                          ^
QuickAdd -> Templater -+--------------------------+
```

## Orion integration

Orion remains the digital-ink source. Export a native/searchable PDF into `70 Attachments/Orion/`. Each durable Orion artifact receives a Markdown sidecar in `10 Inbox/Ink/` or its owning project.

The sidecar owns semantic metadata, links, OCR-derived text, decisions, tasks, and provenance. The PDF remains the visual source of truth.

Never replace the original ink artifact with OCR output.

## Excalidraw

Use Excalidraw when constructing a visual model: architecture, topology, process flow, concept map, annotated image, or other diagram whose elements should link into the vault.

Use Orion instead when the activity is primarily handwriting or annotating a document.

Permanent Excalidraw objects should link to canonical Markdown entities where practical.

## Canvas

Canvas is a composition/workspace layer. A project Canvas should arrange actual notes, PDFs, Excalidraw drawings, and sources.

Persistent knowledge should not exist only in Canvas text cards. Promote durable text into Markdown and place the resulting file node on Canvas.

Automation may create Canvases and append nodes, but should not continuously regenerate human-managed spatial layouts.

## Metadata and Dataview

Metadata is an API. Field names are defined in `00 System/Schemas/metadata.md` and should not drift between templates.

Dataview is read-only by architectural convention: query, filter, group, sort, and display canonical metadata. Workflow state belongs in Markdown properties, not Dataview code.

## Automation

QuickAdd is the command layer. Templater creates standardized content. Reusable JavaScript belongs in `00 System/Scripts/`, not embedded in large templates.

Initial target workflows:

- New Project
- New Decision
- New Concept
- New Meeting
- Process Orion Note
- New Architecture Diagram
- Add Current Note to Project Canvas
- Promote Ink to Project

## Generated content

Generated/OCR/AI material must be distinguishable from human-authored content. Processors should only replace bounded generated sections or machine state, never overwrite human sections.

Suggested markers:

```text
<!-- GENERATED:START -->
...
<!-- GENERATED:END -->
```

For automated ingestion, maintain a SHA-256 source hash so unchanged PDFs are not repeatedly processed.
