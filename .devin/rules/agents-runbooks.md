---
description: "Working in .agents/runbooks/ — load runbook guidance"
trigger: glob
globs:
  - ".agents/runbooks/**"
---
## Scope

`.agents/runbooks/**`

When working in this scope:

- MUST READ `.agents/runbooks/design.md` for design
- MUST READ `.agents/runbooks/planning.md` for planning
- MUST READ `.agents/runbooks/implementing.md` for implementation
- MUST READ `.agents/runbooks/code-review.md` for review
- MUST READ `.agents/runbooks/pr.md` for PR workflow
- MUST INVOKE `/repo-standards` for repo-shape and runbook routing

This file is a conditional rule trigger. It does not contain the doctrine; it only tells the runtime when to load the runbooks and skills.
