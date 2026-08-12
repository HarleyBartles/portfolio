---
description: "Working in src/content/ — load portfolio content guidance"
trigger: glob
globs:
  - "src/content/**"
---
## Scope

`src/content/**`

When working in this scope:

- MUST READ `src/content/content-manifest.json`
- MUST READ `.agents/runbooks/implementing.md`
- MUST READ `.agents/doctrine/artifact-policy.md`

This file is a conditional rule trigger. It does not contain the doctrine; it only tells the runtime when to load the relevant surfaces.
