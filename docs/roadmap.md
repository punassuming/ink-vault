# Roadmap

## Phase 1 — vault contract

- [x] Architecture and responsibility boundaries
- [x] Stable metadata schema draft
- [x] Core Templater templates
- [x] JSON Canvas helper
- [x] QuickAdd project creation
- [x] QuickAdd Canvas append workflow
- [x] Orion sidecar intake workflow
- [ ] Validate scripts on Android Obsidian
- [ ] Add sample project and screenshots

## Phase 2 — Orion ingestion

- [ ] Android share/Tasker recipe
- [ ] Automatic PDF naming and placement
- [ ] SHA-256 source hashing
- [ ] Sidecar association with source PDF
- [ ] Project selection during ingestion
- [ ] Optional server-side filesystem watcher

## Phase 3 — extraction

- [ ] OCR adapter interface
- [ ] Generated-section updater
- [ ] Concept/task/decision extraction
- [ ] Provenance links back to PDF/page
- [ ] Idempotent reprocessing using source/processed hashes

## Phase 4 — Excalidraw

- [ ] Pin/test supported Excalidraw plugin version
- [ ] ExcalidrawAutomate project diagram creation
- [ ] Entity-link helper
- [ ] Add generated diagram to project Canvas
- [ ] Ink-to-diagram assisted reconstruction workflow

## Phase 5 — dashboards and quality

- [ ] Dataview project dashboard
- [ ] Inbox/processing dashboard
- [ ] Metadata linting
- [ ] Broken relationship checks
- [ ] Example end-to-end vault
- [ ] Mobile/desktop compatibility matrix

## Explicit non-goals

- Bidirectional synchronization of Orion's proprietary notebook model with Markdown.
- Continuous regeneration of human-arranged Canvas layouts.
- Replacing original handwriting with OCR.
- Treating Dataview as persistent state storage.
- Automatic semantic conversion of every handwritten diagram into Excalidraw.
