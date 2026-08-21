---
description: "Working in src/ — load source tree guidance"
trigger: glob
globs:
  - "src/**"
  - "!src/client/**"
---
## Scope

`src/**` excluding the client-specific subtree routed by `src/client/README.md` and the repository runbooks.

When working in this scope:

- MUST READ `src/README.md`
- MUST READ `.agents/runbooks/implementing.md`
- MUST READ `.agents/doctrine/workflow-policy.md`
- MUST READ `.agents/doctrine/coding-discipline.md`

This file is a conditional rule trigger. It does not contain the doctrine; it only tells the runtime when to load the relevant surfaces.
