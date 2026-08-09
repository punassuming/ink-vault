# Ink Vault

An Obsidian starter vault for coordinated handwritten capture, semantic knowledge, visual modeling, and project workspaces.

## Architecture

- **Orion Notes** — pen-first capture, handwriting, PDF annotation
- **Markdown** — canonical semantic knowledge layer
- **Excalidraw** — diagrams, visual reasoning, navigable visual models
- **Canvas** — spatial project/research workspace
- **Dataview** — query/read-model layer
- **Templater** — deterministic note/artifact construction
- **QuickAdd** — workflow orchestration and user-facing commands

Durable knowledge lives in Markdown metadata and links. Orion, Excalidraw, Canvas, PDFs, and generated summaries are supporting representations.

## Vault layout

```text
00 System/
  Templates/
  Scripts/{quickadd,excalidraw,lib}/
  Schemas/
10 Inbox/{Notes,Ink}/
20 Projects/
30 Areas/
40 Knowledge/{Concepts,Systems,Procedures}/
50 Sources/
60 Visuals/{Excalidraw,Canvas}/
70 Attachments/{Orion,PDFs,Images}/
90 Archive/
```

## Core flow

```text
Orion -> PDF/ink -> Markdown sidecar -> project/topic links
                              |
                              +-> Dataview queries
                              +-> Excalidraw models
                              +-> Canvas composition

QuickAdd -> Templater / scripts -> files + metadata
```

## Design constraints

1. Markdown is the semantic source of truth.
2. Canvas should mostly contain file nodes, not irreplaceable text-only cards.
3. Excalidraw is for authored visual models, not primary knowledge storage.
4. Dataview reads metadata; it does not own workflow state.
5. QuickAdd orchestrates workflows; Templater constructs files.
6. Orion integration uses exported PDF plus Markdown sidecar rather than proprietary notebook data.
7. Generated content must not overwrite human-authored sections.
8. Metadata field names are treated like an API and kept stable.

See `docs/architecture.md` for the detailed integration pattern.
