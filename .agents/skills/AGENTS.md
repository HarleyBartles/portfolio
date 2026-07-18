# Derived Skills Routing

Use this routing file before inspecting or refreshing the skill tree. This
directory contains two explicit custody lanes.

## Use When

- Use after running the marketplace installer if you need to inspect the derived surface.
- Use before validating `.agents/skills/.provenance.json`.
- Use before checking the generated `.agents/skills/INDEX.md`.
- Use when deciding whether the derived skills need a refresh from `.agents/plugins/marketplace-source`.
- Use before adding or changing a Portfolio-owned skill under `port-*/`.

## What Lives Here

- Marketplace-derived skill directories copied from the pinned marketplace source.
- Tracked Portfolio-owned skills use the reserved `port-*/` prefix and are not marketplace provenance.
- `.provenance.json` records only the marketplace source revision and plugin selection used for the last refresh.
- `INDEX.md` is generated navigation for this tree.

## Working Rules

- Treat this tree as generated output, not the source of truth.
- Do not hand-edit marketplace-derived skills; change the marketplace source and refresh this tree from the manifest instead.
- Do not let marketplace refresh tooling overwrite or prune tracked `port-*` skills.
- Refresh through `scripts/install_agent_skills.py` and regenerate the mesh after any marketplace change.
