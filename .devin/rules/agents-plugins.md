---
description: "Working in .agents/plugins/ — load plugin marketplace guidance"
trigger: glob
globs:
  - ".agents/plugins/**"
  - "!.agents/plugins/marketplace-source/**"
---
## Scope

`.agents/plugins/**` excluding the `marketplace-source` submodule.

When working in this scope:

- MUST READ `.agents/plugins/marketplace.json`
- MUST READ `.agents/doctrine/workflow-policy.md`
- MUST READ `.agents/doctrine/marketplace-custody-policy.md`
- MUST READ `.agents/playbooks/marketplace-generation.md`
- MUST FOLLOW `.agents/playbooks/marketplace-generation.md` for subscription and refresh changes

This file is a conditional rule trigger. It does not contain the doctrine; it only tells the runtime when to load the doctrine and runbook.
