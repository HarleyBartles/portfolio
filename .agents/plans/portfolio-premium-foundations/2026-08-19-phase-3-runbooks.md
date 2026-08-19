# Phase 3 - Runbooks

## Goal

Deliver the five portfolio foundation runbooks: `design.md`, `implementing.md`, `code-style.md`, `testing.md`, and `asset.md`.

## Deliverables

- `.agents/runbooks/design.md` - already present
- `.agents/runbooks/implementing.md` - already present
- `.agents/runbooks/code-style.md` - already present
- `.agents/runbooks/testing.md` - already present
- `.agents/runbooks/asset.md` - new
- `.agents/runbooks/AGENTS.md` updated to route to `asset.md`
- `.agents/doctrine/repo-runbook-policy.md` updated to list `asset.md`
- Updated `roadmap.md` reflecting execution.
- Regenerated index mesh and passing `ci --check`.

## Execution

1. Verify the four existing runbooks are present and current.
2. Write `.agents/runbooks/asset.md` using the `asset-custody` skill references.
3. Update `.agents/runbooks/AGENTS.md` and `.agents/doctrine/repo-runbook-policy.md`.
4. Run `py -3 tools/run.py ci --apply` to regenerate mesh surfaces.
5. Verify with `py -3 tools/run.py ci --check`.
6. Commit, open a PR, and merge.
