---
description: "Working in .agents/plugins/ — load plugin subscription guidance"
trigger: glob
globs:
  - ".agents/plugins/**"
---
## Scope

`.agents/plugins/**` contains the repository plugin catalog. Native Codex and Devin bindings live in `.codex/config.toml` and `.devin/config.json`.

When working in this scope:

- MUST READ `.agents/plugins/marketplace.json`
- MUST READ `.agents/doctrine/workflow-policy.md`
- MUST READ `.agents/doctrine/marketplace-custody-policy.md`
- MUST FOLLOW `.agents/doctrine/marketplace-custody-policy.md` for subscription changes

This file is a conditional rule trigger. It does not contain the doctrine; it only tells the runtime when to load the doctrine and runbook.
