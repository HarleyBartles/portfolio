# Marketplace generation runbook

Use this runbook when working with the repo-local plugin marketplace or refreshing derived skills.

## Before you begin

- Read `.agents/plugins/marketplace.json`.
- Read `.agents/doctrine/workflow-policy.md` for publication rules.
- Ensure the marketplace-source submodule is initialized:
  `git submodule update --init --checkout -- .agents/plugins/marketplace-source`.

## Refreshing skills

- Run `py -3 tools/run.py refresh-skills --apply` to refresh derived skills from the marketplace source.
- Inspect the regenerated skills and run the focused `refresh-skills --check` and `mesh --check` targets while iterating. When the intended tree is staged, commit normally and let the tracked hook run the complete gate once.
- Do not hand-edit marketplace-derived skills in `.agents/skills/`.

## Marketplace changes

- Edit `.agents/plugins/marketplace.json` to select or deselect plugins.
- Run `py -3 tools/run.py refresh-skills --apply`, then `py -3 tools/run.py mesh --apply` when the refreshed skills change the mesh.
- Inspect and stage the intended output, then commit normally; do not add a manual complete check immediately before the hook.
- Commit the manifest, submodule gitlink, derived skills, and mesh in the same change.
