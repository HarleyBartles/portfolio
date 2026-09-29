# Marketplace and Skill Custody Policy

Status: active policy
Owner: Portfolio repository
Scope: plugin marketplace, derived skills, and local skill custody
Routed from: `/.devin/rules/agents-doctrine.md`
Generic baseline: repository source-custody capabilities available in the current agent runtime

Use this policy when working with the repo-local plugin marketplace, the pinned marketplace source, or the derived skill tree.

## Source and generated custody

- `.agents/plugins/marketplace.json` declares the selected plugin set.
- `.agents/plugins/marketplace-source` is the pinned source for refresh and deployed standards.
- Selected non-ambient plugin skills are projected from that source by the refresh utility and recorded in `.agents/skills/.provenance.json`.
- Do not hand-edit marketplace-derived skills.
- Repo-owned skills are tracked local source when their exact directory/frontmatter name is declared in `repo.local_skills`. A naming prefix is optional and does not establish custody. Refresh tooling must preserve declared local skills and must not overwrite or prune them.
- Portfolio code and tests must not import executable implementation from `.agents/skills/` or a user-level skill cache.
- Ambient plugins are not subscribed to or copied into this repository. Portfolio-owned skills remain under their declared local names.
- The marketplace refresh uses the pinned submodule utility. Hosted validation can execute it without Codex or ambient plugin installation.
