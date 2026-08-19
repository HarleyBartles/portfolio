# Portfolio Premium Foundations - Roadmap

Live work log for the foundation epic. Each item is a plan. Plans move from `pending` to `writing`, `ready`, `executing`, `done`, or `blocked`.

## 1.1 - Skills - umbrella

- **Status:** done
- **Plan file:** [2026-08-12-phase-1-1-designing-premium-sites.md](../completed/2026-08-12-phase-1-1-designing-premium-sites.md)
- **Commit:** `2ffd822`
- **PR:** #7
- **Rating:** 9/10
- **Notes:** Merged. Delivered the `designing-premium-sites` umbrella skill with authority sources and synthesized references.

## 1.2 - Skills - pattern skills

- **Status:** done
- **Plan file:** [2026-08-13-phase-1-2-pattern-skills.md](../completed/2026-08-13-phase-1-2-pattern-skills.md)
- **Commit:** `800e685`
- **PR:** #9
- **Rating:** 9/10
- **Notes:** Merged into main at `800e685`. All six pattern skills and the refreshed `marketplace-source` `be69c861` mesh landed; canonical CI passes.

## 2 - Subagent profiles

- **Status:** done
- **Plan file:** [2026-08-19-phase-2-subagent-profiles.md](../completed/2026-08-19-phase-2-subagent-profiles.md)
- **Commit:** `a8d863c`
- **PR:** #10
- **Rating:** 9/10
- **Notes:** Merged. Added `.agents/agents/` profiles `design-researcher`, `taste-reviewer`, `design-token-auditor`, and `motion-reviewer`; canonical CI passes.

## 3 - Runbooks

- **Status:** done
- **Plan file:** [2026-08-19-phase-3-runbooks.md](../completed/2026-08-19-phase-3-runbooks.md)
- **Commit:** `6db0be7`
- **PR:** #11
- **Rating:** 9/10
- **Notes:** Merged. Added `.agents/runbooks/asset.md` and routed it through `.agents/runbooks/AGENTS.md` and `.agents/doctrine/repo-runbook-policy.md`; canonical CI passes.

## 4 - Tools, libraries, and MCP servers

- **Status:** blocked
- **Notes:** Premature. The site spec and visual direction must come before any tool decisions. The candidate list (Tailwind v4, shadcn/ui, `motion`, `lenis`, `lucide`, font/image optimizers, `openai-image` MCP) is on hold until the design brief exists.

## 5 - Preflight and taste gates

- **Status:** blocked
- **Notes:** Cannot define taste gates without a site spec to validate against.

## Handoff Notes

- Created from `2026-08-12-portfolio-premium-epic-spec.md`.
- Phase 1 was split into 1.1 (umbrella skill) and 1.2 (pattern skills) so each plan has a single, reviewable deliverable.
