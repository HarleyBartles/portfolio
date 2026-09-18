# Marketplace Generation Playbook

Use this playbook when changing Portfolio's marketplace subscriptions, marketplace source pin, or derived skill projection.

## When

- Adding, removing, or changing installed plugins.
- Advancing `.agents/plugins/marketplace-source`.
- Refreshing marketplace-derived skills or their provenance.

## Required skills

- `repo-agent-assets` for plugin subscriptions, local-skill declarations, projections, and provenance.
- `refreshing-installed-skills` for installation/refresh mechanics.
- `repo-worker-base` for source, worktree, and validation boundaries.
- `generating-agent-mesh` when the installed skill inventory changes navigation.

## Composition

1. Confirm the canonical marketplace source and target commit/plugin subscription.
2. Update `.agents/plugins/marketplace.json` and the marketplace-source gitlink deliberately.
3. Refresh derived skills through the repository command; never edit projections directly.
4. Regenerate the mesh when the installed skill surface changes.
5. Check manifest, gitlink, projections, provenance, and mesh together before commit.

## Doctrine and contracts

- [`../doctrine/marketplace-custody-policy.md`](../doctrine/marketplace-custody-policy.md) for source/projection custody.
- [`../doctrine/workflow-policy.md`](../doctrine/workflow-policy.md) for publication and refresh requirements.
- [`../doctrine/surface-classification-policy.md`](../doctrine/surface-classification-policy.md) for generated versus authored surfaces.

## Local commands and paths

- Plugin manifest: `.agents/plugins/marketplace.json`.
- Marketplace source: `.agents/plugins/marketplace-source`.
- Initialize source if needed: `git submodule update --init --checkout -- .agents/plugins/marketplace-source`.
- Refresh projection: `py -3 tools/run.py refresh-skills --apply`.
- Focused checks: `py -3 tools/run.py refresh-skills --check` and `py -3 tools/run.py mesh --check`.

## Evidence contract

- Manifest, pinned marketplace commit, derived skills, `.agents/skills/.provenance.json`, and mesh agree.
- No marketplace-derived skill was manually authored in Portfolio.
- Refresh/check modes are churn-free before closeout.

## Prohibited combinations

- Do not edit `.agents/skills/<marketplace-owned>/` directly.
- Do not update the manifest without refreshing projections and provenance.
- Do not claim a marketplace update from an uncommitted or unverified submodule checkout.

## Runbook routing

None.
