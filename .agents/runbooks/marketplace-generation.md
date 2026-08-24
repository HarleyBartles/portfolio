# Marketplace generation runbook

Use this runbook when working with the repo-local plugin marketplace or refreshing derived skills.

## Before you begin

- Read `.agents/plugins/marketplace.json`.
- Read `.agents/doctrine/workflow-policy.md` for publication rules.
- Ensure the marketplace-source submodule is initialized:
  `git submodule update --init --checkout -- .agents/plugins/marketplace-source`.

## Refreshing skills

- Run `py -3 tools/run.py refresh-skills --apply` to refresh derived skills from the marketplace source.
- Run `py -3 tools/run.py ci --check` to verify the refreshed mesh.
- Do not hand-edit marketplace-derived skills in `.agents/skills/`.

## Marketplace changes

- Edit `.agents/plugins/marketplace.json` to select or deselect plugins.
- Run `py -3 tools/run.py ci --apply` to refresh derived skills and regenerate the mesh.
- Commit the manifest, submodule gitlink, derived skills, and mesh in the same change.
