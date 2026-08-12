---
description: "Working in .agents/doctrine/ — load durable doctrine guidance"
trigger: glob
globs:
  - ".agents/doctrine/**"
---
## Scope

`.agents/doctrine/**`

When working in this scope:

- MUST READ `.agents/doctrine/workflow-policy.md`
- MUST READ `.agents/doctrine/artifact-policy.md`
- MUST READ `.agents/doctrine/validation-policy.md`
- MUST READ `.agents/doctrine/coding-discipline.md`
- MUST READ `.agents/doctrine/script-contract-policy.md`
- MUST READ `.agents/doctrine/mesh-policy.md`
- MUST READ `.agents/doctrine/repository-hygiene-layout-policy.md`
- MUST INVOKE `/base-doctrine`

This file is a conditional rule trigger. It does not contain the doctrine; it only tells the runtime when to load the doctrine and skill.
