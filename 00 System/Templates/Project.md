---
type: project
status: active
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
area:
systems: []
canvas: "[[<% tp.file.title %>.canvas]]"
diagram: "[[<% tp.file.title %> Architecture.excalidraw]]"
tags:
  - project
---

# <% tp.file.title %>

## Objective


## Current state


## Decisions

```dataview
TABLE status, decision_date
FROM [[<% tp.file.title %>]]
WHERE type = "decision"
SORT decision_date DESC
```

## Related artifacts

```dataview
TABLE type, file.mtime AS Updated
FROM [[<% tp.file.title %>]]
WHERE type != "decision"
SORT file.mtime DESC
```

## Tasks

- [ ] 
