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
- MUST READ `.agents/doctrine/mesh-policy.md`
- MUST READ `.agents/runbooks/marketplace-generation.md`
- MUST INVOKE `/using-superpowers-plus` to route to the correct skill

This file is a conditional rule trigger. It does not contain the doctrine; it only tells the runtime when to load the doctrine and runbook.
