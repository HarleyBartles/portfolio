# Plugin Marketplace Routing

Use this routing file before any work that touches the repo-local plugin marketplace or the pinned source tree.

## Use When

- Use before editing `.agents/plugins/marketplace.json`.
- Use before changing `.agents/plugins/marketplace-source`.
- Use before refreshing the derived skills in `.agents/skills/`.
- Use before editing `scripts/install_agent_skills.py`, `scripts/install_agent_skills.ps1`, or `scripts/install_agent_skills.sh`.
- Use before checking the derived skills surface with [`.agents/skills/AGENTS.md`](../skills/AGENTS.md).
- Use before validating the agents mesh or doctrine reachability when marketplace surfaces change.
- Use when the pinned marketplace source is missing or uninitialized in a fresh worktree: run `git submodule update --init --checkout -- .agents/plugins/marketplace-source` before refreshing derived skills.

## What Lives Here

- `marketplace.json` is the source manifest for repo-local plugin selection.
- `marketplace-source/` is the pinned submodule that holds the marketplace source tree.
- `INDEX.md` is generated navigation for this directory.

## Working Rules

- Keep the manifest and the derived skills in sync.
- Do not hand-edit derived skill copies in `.agents/skills/` as source of truth.
- If the marketplace source changes, refresh the derived skills and regenerate the mesh in the same change.
