# Marketplace and Skill Custody Policy

Status: active policy
Owner: Portfolio repository
Scope: plugin marketplace, derived skills, and local skill custody
Routed from: `/.devin/rules/agents-doctrine.md`
Generic baseline: installed `repo-worker-base` and its references

Use this policy when working with the repo-local plugin marketplace, the pinned marketplace source, or the derived skill tree.

## Source and generated custody

- `.agents/plugins/marketplace.json` declares the selected plugin set.
- `.agents/plugins/marketplace-source` is a pinned gitlink and a mesh boundary.
- Marketplace-derived skills are copied from that source by the installer and recorded in `.agents/skills/.provenance.json`.
- Do not hand-edit marketplace-derived skills.
- `port-*` skills, when introduced, are tracked local source and are excluded from marketplace provenance. Refresh tooling must preserve them and must not overwrite or prune them.
- Portfolio code and tests must not import executable implementation from `.agents/skills/` or a user-level skill cache.
- The marketplace refresh is a local agent check. It is not a GitHub Actions dependency, but it is a completion gate for marketplace-backed changes.
