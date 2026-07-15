# Derived Skills Routing

Use this routing file before inspecting or refreshing the derived skill tree that this repository installs from the marketplace.

## Use When

- Use after running the marketplace installer if you need to inspect the derived surface.
- Use before validating `.agents/skills/.provenance.json`.
- Use before checking the generated `.agents/skills/INDEX.md`.
- Use when deciding whether the derived skills need a refresh from `.agents/plugins/marketplace-source`.

## What Lives Here

- Derived skill directories copied from the pinned marketplace source.
- `.provenance.json` records the source revision and plugin selection used for the last refresh.
- `INDEX.md` is generated navigation for this tree.

## Working Rules

- Treat this tree as generated output, not the source of truth.
- Do not hand-edit copied skills; change the marketplace source and refresh this tree from the manifest instead.
- Refresh through `scripts/install_agent_skills.py` and regenerate the mesh after any marketplace change.
