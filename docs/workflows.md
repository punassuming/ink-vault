# Workflows

## Capture handwritten material

1. Write or annotate in Orion.
2. Export a native/searchable PDF.
3. Store the PDF under `70 Attachments/Orion/`.
4. Run the QuickAdd `Process Orion Note` user script to create the Markdown sidecar.
5. Set `source_asset` to the PDF wikilink.
6. Link the sidecar to a project, area, systems, or concepts as appropriate.
7. Optionally add the sidecar/PDF to a project Canvas.

Future automation may receive the Android share intent and perform steps 3-5 automatically. The interchange contract remains PDF + Markdown sidecar.

## Create a project

Run `create-project.js` as a QuickAdd user script. It creates:

```text
20 Projects/<Project>/
  <Project>.md
  <Project>.canvas
```

The Canvas starts with the project home note as its first file node. It is intentionally minimal; spatial organization remains human-managed.

An Excalidraw architecture file is referenced in project metadata but is not created automatically yet. This avoids coupling the initial workflow to undocumented/internal Excalidraw file structures. ExcalidrawAutomate integration belongs in the next implementation stage.

## Add an artifact to a project Canvas

Open the artifact and run `add-to-project-canvas.js` through QuickAdd. Select the target project. The script appends a file node unless that file is already present.

The script does not rearrange existing nodes. This is intentional: machine-managed synchronization of a human-managed spatial layout is destructive.

## Promote ink

Promotion means adding semantic structure, not converting away from handwriting:

```text
Orion PDF
   +
Ink sidecar
   |
   +--> project relationship
   +--> extracted concepts
   +--> decisions/tasks
   +--> optional Excalidraw reconstruction
   +--> optional Canvas placement
```

The original PDF remains intact.

## Visual artifact rule

Use:

- Orion when the primary interaction is handwriting or PDF annotation.
- Excalidraw when constructing a durable diagram or visual model.
- Canvas when arranging existing artifacts into a working spatial context.
- Markdown whenever information must participate in semantic links, properties, queries, or long-term retrieval.

## Dataview

Dataview should query stable properties and links. Do not make DataviewJS responsible for persistent workflow state or mutate files as a normal design pattern.

## Generated sections

External OCR/AI processing may update only the bounded generated region in an ink sidecar:

```text
<!-- GENERATED:START -->
...
<!-- GENERATED:END -->
```

Store SHA-256 hashes in `source_hash` and `processed_hash`. Reprocess only when they differ.
