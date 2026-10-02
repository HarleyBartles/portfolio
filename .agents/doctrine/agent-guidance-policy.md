# Agent Guidance Policy

Status: active policy
Owner: Portfolio repository
Scope: authored agent routers, scoped rule triggers, runbooks, and playbooks
Routed from: `AGENTS.md` and `.devin/rules/agents-doctrine.md`

Use this policy when adding, moving, or revising repository guidance.

## Surface ownership

- Root `AGENTS.md` is the concise repository router and source-of-truth summary.
- `.devin/rules/*.md` are conditional scope triggers. They point to the doctrine and runbooks for a task without duplicating their rules.
- `.agents/doctrine/` owns durable repository policies, contracts, and invariants.
- `.agents/docs/` owns non-binding repository references.
- `.agents/runbooks/` composes lifecycle stages. `.agents/playbooks/` composes topical workflows.
- `README.md` files are human-facing; they are not agent-routing surfaces.
- `.agents/skills/` contains Portfolio-authored skills. Repository plugin dependencies are declared through native harness configuration; ambient plugin availability does not create a repository dependency.

## Authored routing

- Keep routing pointers short, explicit, and relative to the file that owns them.
- When guidance moves or a new policy is added, update `AGENTS.md` or the relevant `.devin/rules/` trigger in the same change.
- A router points to the canonical policy or workflow. It does not duplicate that content.
- Keep runbook-to-playbook routes valid and reciprocal when the playbook declares a runbook route.
- Preserve direct discovery through `AGENTS.md`, local `AGENTS.md` routers, `.devin/rules/`, and authored README links.
- Keep the root `AGENTS.md` within 80 lines and scoped `AGENTS.md` files within 32 lines. The margins preserve space for genuine routing changes; a budget pass does not establish semantic usefulness.

## Validation

- `tools/check_agent_guidance.py` checks the line budgets and local links in `AGENTS.md` routers; reviewers assess whether the guidance routes safely and remains useful.
- Runbook and playbook authors maintain their lifecycle and concern categories, inbound routes, and references under their respective v2 subscriptions.
- Portfolio repository validation checks authored Markdown in its public content surface.
- There is no generated repository navigation index. Update authored routers directly when the file structure or routing changes.
- The root `AGENTS.md` is the primary repository-wide router. Do not create a replacement generated index or an unowned navigation catalogue.
