---
description: "Working in tools/ — load tooling doctrine and the implementation runbook"
trigger: glob
globs:
  - "tools/**"
---
## Scope

`tools/**`

When working in this scope:

- MUST READ `.agents/doctrine/script-contract-policy.md`
- MUST READ `.agents/runbooks/implementing.md`
- MUST FOLLOW `.agents/doctrine/script-contract-policy.md` and `.agents/runbooks/implementing.md`

This file is a conditional rule trigger. It does not contain the doctrine; it only tells the runtime when to load the doctrine and runbook.
