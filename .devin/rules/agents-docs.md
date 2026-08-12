---
description: "Working in .agents/docs/ — load docs and reference guidance"
trigger: glob
globs:
  - ".agents/docs/**"
---
## Scope

`.agents/docs/**`

When working in this scope:

- MUST READ `.agents/doctrine/mesh-policy.md`
- MUST READ `.agents/doctrine/artifact-policy.md`
- MUST READ `.agents/doctrine/workflow-policy.md`
- MUST READ `.agents/doctrine/coding-discipline.md`

This file is a conditional rule trigger. It does not contain the doctrine; it only tells the runtime when to load the relevant doctrine.
