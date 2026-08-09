# Handwriting and PDF app evaluation

This document evaluates Orion Notes, Samsung Notes, and Xodo as capture/editing front ends for Ink Vault. The architectural objective is not to select a single application for every ink task. It is to keep durable artifacts in open, vault-addressable formats and allow the best editor for each job.

## Conclusion

**Xodo should take precedence for PDF-native work inside the Obsidian workflow. Orion Notes should remain the preferred notebook/blank-page handwriting application. Samsung Notes should be supported as an excellent Galaxy-native capture alternative, but not used as the canonical store.**

The important distinction is artifact ownership:

- If the artifact already is, or should permanently be, a PDF in the vault, edit that PDF with Xodo.
- If the activity is freeform handwritten notebook creation, use Orion Notes or Samsung Notes and export a durable PDF into the vault.
- Once imported, Markdown sidecars own semantic metadata and relationships regardless of which ink application produced the PDF.

This removes an unnecessary architectural dependency on Orion.

## Evidence summary

### Xodo

Xodo is unusually well aligned with a local-first Obsidian architecture because it edits the PDF itself rather than requiring a proprietary notebook to remain authoritative.

Xodo supports direct PDF annotation and saving, and its Android workflow can open documents from Google Drive, Dropbox, or OneDrive and write modifications back. Its documentation also distinguishes normal editable PDF annotations from deliberately flattened copies.

More importantly, Obsidian's **Handwritten Notes** plugin explicitly uses a file-over-app design: create a PDF in the vault, launch a compatible external editor, and continue referencing/embeddding that same PDF from Markdown. Xodo is the preferred Android external editor in the plugin documentation/community guidance.

Consequences:

- no export/import cycle for each editing session;
- the vault can own the canonical PDF;
- annotations remain standard PDF annotations unless deliberately flattened;
- the same file can participate in Obsidian embeds, PDF linking, sync, backup, OCR, hashing, and sidecar processing;
- replacing Xodo later does not require migrating the knowledge model.

This makes Xodo the strongest integration layer for PDF annotation.

### Samsung Notes

Samsung Notes has the strongest platform integration on a Galaxy tablet. It supports S Pen handwriting, handwriting-to-text/cleanup features, PDF import and annotation, and export to PDF, Word, PowerPoint, image, text, and Samsung's own note format.

It also supports syncing selected folders to Microsoft's OneNote feed. That sync is useful for viewing notes elsewhere, but it is not a canonical-data integration: Microsoft documents that Samsung notes shown through the feed cannot be created, edited, or deleted there. Therefore OneNote sync does not solve the Obsidian integration problem.

For Ink Vault, Samsung Notes has a more important limitation: its normal workflow imports a PDF into Samsung Notes and later exports/saves a PDF. It does not provide the same clean file-over-app relationship as Xodo. Community reports around Obsidian specifically describe Samsung Notes as creating/exporting copies where Xodo can edit the vault PDF in place. There are also recurring community reports of lower-quality/rasterized PDF export; treat those reports as implementation risk rather than a guaranteed current behavior.

Consequences:

- excellent low-friction capture on Samsung hardware;
- good candidate for meetings, scratch notes, handwriting recognition, and S Pen-first work;
- weaker canonical-file semantics;
- requires an explicit export/ingestion step before the note becomes a durable vault artifact;
- Samsung/OneNote sync should be treated as convenience sync, not as the ingestion architecture.

### Orion Notes / Notein

Orion Notes is the U.S. successor/rebrand path for Notein from Orion Studio. The vendor currently tells U.S. Notein users to move to Orion Notes and export/import their existing notes. Notein/Orion is designed specifically around Android stylus handwriting and PDF-oriented note taking, with paper and large/freeform canvases, links, layers, and rich pen tooling.

This makes Orion a stronger notebook application than Xodo. It is appropriate when the user wants to create handwritten pages rather than annotate an existing PDF.

Its weakness is the same architectural issue as Samsung Notes: its rich notebook representation lives in the application. A durable Obsidian workflow therefore still needs an export boundary. Community reports specifically contrast this with Xodo: Orion/Notein offers better notebook features, but using it with an Obsidian-owned PDF generally introduces import/export friction.

Consequences:

- strong blank-page handwriting/notebook UX;
- richer note-oriented features than a PDF editor;
- appropriate primary capture application if its pen/tooling is preferred;
- should not own the only durable copy of knowledge intended for the vault.

## Recommended responsibility matrix

| Task | Preferred | Alternative | Reason |
|---|---|---|---|
| Annotate a PDF already in the vault | **Xodo** | Samsung Notes | Xodo can preserve the PDF as the canonical artifact and fits Handwritten Notes' file-over-app model. |
| Create a handwritten notebook/page | **Orion Notes** | Samsung Notes | Purpose-built notebook features; export completed/durable artifacts to PDF. |
| Fast Galaxy/S Pen scratch capture | **Samsung Notes** | Orion Notes | Lowest platform friction and strong S Pen integration. |
| Handwriting recognition/cleanup during capture | **Samsung Notes / Orion** | downstream OCR | Use editor features when convenient; never make recognized text the only copy of the ink. |
| Long-term archival artifact | **PDF in vault** | — | Application-neutral, addressable, hashable, embeddable, and processable. |
| Semantic knowledge | **Markdown sidecar** | — | Owns metadata, links, tasks, decisions, OCR, provenance, and generated summaries. |
| Spatial visual model | **Excalidraw** | Canvas | Different responsibility from handwritten source capture. |
| Project/research composition | **Canvas** | — | Arranges canonical notes and artifacts rather than replacing them. |

## Revised architecture

```text
                         CAPTURE / EDIT

       +---------------- Orion Notes ----------------+
       |                                              |
       +-------------- Samsung Notes ----------------+---- export ----+
       |                                                            |
       |                                      +---------------------v--+
       |                                      | durable PDF in vault   |
       |                                      +------------------------+
       |                                                 ^
       |                                                 |
       +-- existing vault PDF --> Xodo ------------------+
                                 edit in place

                                                   |
                                                   v
                                         Markdown sidecar
                                                   |
                              +--------------------+------------------+
                              |                    |                  |
                           Dataview            Excalidraw           Canvas
```

The durable boundary is the PDF, not the capture application.

## Obsidian integration

### Handwritten Notes + Xodo

Add the community plugin **Handwritten Notes** as the preferred PDF handwriting path. Its design is directly compatible with this repository:

1. Create a handwritten PDF from a template inside the vault.
2. Associate or embed it from Markdown.
3. Open it in Xodo on Android.
4. Annotate the actual vault-owned PDF.
5. Return to Obsidian with the same artifact updated.
6. Create/update the semantic sidecar when the artifact becomes durable knowledge.

This is superior to treating Orion as the mandatory front end because it eliminates a conversion boundary for PDF-centric work.

### PDF++

PDF++ remains complementary rather than competitive with Xodo. Xodo supplies pen-first editing; PDF++ can supply Obsidian-side PDF navigation, selection, linking, and citation workflows. Community users report using Xodo annotations and PDF++ against the same PDF successfully.

### OCR / semantic extraction

Do not couple OCR to a particular capture app. Process the durable PDF after ingestion. Candidate Obsidian-side approaches include Handwriting PDF, pdf-to-md, or a custom/local pipeline. This repository should keep its existing generated-section and source-hash conventions so OCR/LLM output is reproducible and cannot overwrite human-authored material.

## Samsung Notes ingestion options

Use one of these in descending order of architectural preference:

1. **Explicit PDF export into the vault inbox.** Simple and robust. A QuickAdd/automation step creates the sidecar and moves the artifact to its final location.
2. **Android share/export automation.** Samsung Notes exports/shares PDF to an Android-accessible staging directory; Tasker or another filesystem automation moves/renames it into the vault and triggers later processing.
3. **OneNote sync only for convenience/viewing.** Do not build the ingestion pipeline around it because the OneNote feed is not an editable representation of Samsung Notes and adds another proprietary service boundary.

Do not attempt to reverse-engineer Samsung's native note database unless a concrete requirement cannot be met through PDF export. That would be high-maintenance over-engineering.

## Orion ingestion options

Use the same ingestion contract as Samsung Notes:

`capture app -> exported PDF -> vault inbox -> hash + sidecar -> semantic processing`

This intentionally makes `source_app` metadata variable rather than hard-coding `orion`.

Recommended values:

```yaml
source_app: orion | samsung-notes | xodo | other
source_asset: "[[path/to/artifact.pdf]]"
source_hash: <sha256>
```

For Xodo-created/edited PDFs, `source_app: xodo` describes the editor/provenance; the PDF itself is already canonical and does not need a second exported copy.

## Decision

Do **not** replace Orion with Samsung Notes globally. That would exchange one proprietary capture application for another without improving the architecture.

Do **change the architecture from Orion-centric to PDF-centric**:

- **Xodo becomes the preferred PDF editor and the highest-priority Obsidian integration.**
- **Orion remains preferred for rich handwritten notebook creation.**
- **Samsung Notes becomes a first-class alternative for Galaxy-native handwriting and quick capture.**
- **All three converge on the same PDF + Markdown-sidecar contract.**

This provides application choice without fragmenting the knowledge model.

## Research references

- Samsung: Import and export PDFs with Samsung Notes — https://www.samsung.com/us/support/answer/ANS10002404/
- Samsung: Sync Samsung Notes with Microsoft OneNote — https://www.samsung.com/us/support/answer/ANS10003444/
- Microsoft: OneNote feed / Samsung Notes behavior — https://support.microsoft.com/en-US/OneNote/use-the-onenote-feed-in-microsoft-onenote
- Notein/Orion Studio — https://www.notein.ai/
- Xodo: Android/Windows sync and supported cloud stores — https://feedback.xodo.com/support/solutions/articles/35000202800-syncing-files-between-android-and-windows
- Xodo: annotation/flattening behavior — https://feedback.xodo.com/support/solutions/articles/35000202830-annotations-made-in-xodo-are-gone-when-pdf-is-opened-in-another-app-flatten-
- Obsidian Handwritten Notes plugin — https://community.obsidian.md/plugins/handwritten-notes
- Obsidian Handwriting PDF plugin — https://community.obsidian.md/plugins/handwriting-pdf
- Obsidian pdf-to-md plugin — https://community.obsidian.md/plugins/pdf-to-md

Research reviewed 2026-08-09.
