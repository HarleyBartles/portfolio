# Skill authoring runbook

## Required skills

- `/using-superpowers-plus` for routing.
- `/writing-skills` for skill authoring and revision.
- `/repo-standards` for local-skill naming, manifest, and repository-shape rules.

Use this runbook when authoring a Portfolio-owned skill under `port-*/`.

## Required skills

- `writing-skills` owns skill creation, editing, and validation.
- `refreshing-installed-skills` refreshes installed provenance after local skill inventory changes.
- `generating-agent-mesh` refreshes agent/index navigation after skill surface changes.

## Before you begin

- Read `.agents/doctrine/marketplace-custody-policy.md` and `.agents/doctrine/surface-classification-policy.md` for skill custody and surface rules.
- Invoke `/using-superpowers-plus` to route to the right skill.

## Authoring a skill

- Create the skill under `.agents/skills/port-<name>/` with `SKILL.md` frontmatter.
- Declare the skill in `.agents/plugins/marketplace.json` under `repo.local_skills`.
- Run `py -3 tools/run.py refresh-skills --apply` to refresh installed provenance, then `py -3 tools/run.py mesh --apply` when the mesh also changed. Inspect and stage those outputs; the normal commit hook owns the complete gate.
- Do not let marketplace refresh tooling overwrite `port-*` skills.

## See also

- `.agents/doctrine/repo-runbook-policy.md` for this repo's runbook mappings.
