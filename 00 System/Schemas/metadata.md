# Metadata schema

Metadata field names are stable interfaces for templates, QuickAdd scripts, Dataview, Canvas generation, and external ingestion.

## Common

```yaml
type: project | concept | decision | meeting | research | system | procedure | ink | diagram | source
status: active | planned | blocked | complete | archived
created: YYYY-MM-DD
updated: YYYY-MM-DD
project: "[[Project Name]]"
area: "[[Area Name]]"
systems: []
people: []
tags: []
```

## Project

```yaml
type: project
status: active
created:
updated:
area:
systems: []
canvas:
diagram:
tags: [project]
```

## Ink

```yaml
type: ink
source_app: orion | samsung-notes | xodo | other
source_asset:
source_hash:
processed: false
processed_hash:
project:
created:
updated:
tags: [ink]
```

`source_app` records provenance/editor, not semantic ownership. For Orion and Samsung Notes the durable artifact is normally an exported PDF. For Xodo the PDF may already be vault-owned and edited in place.

## Diagram

```yaml
type: diagram
diagram_type: architecture | concept-map | flow | sketch | annotation
project:
systems: []
created:
updated:
tags: [diagram]
```

## Decision

```yaml
type: decision
status: proposed | accepted | rejected | superseded
project:
decision_date:
supersedes:
created:
updated:
tags: [decision]
```

## Conventions

- Use wikilinks for entities and relationships, e.g. `project: "[[Ceph Migration]]"`.
- Use tags for broad classification, not entity identity.
- Do not introduce aliases for existing property names without a schema migration.
- Machine-generated metadata must not silently change human-authored semantic relationships.
- Capture/editor applications are replaceable. Durable ink knowledge converges on a vault-owned PDF plus Markdown sidecar.
