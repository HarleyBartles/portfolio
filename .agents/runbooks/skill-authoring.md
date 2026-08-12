# Skill authoring runbook

Use this runbook when authoring a Portfolio-owned skill under `port-*/`.

## Before you begin

- Read `.agents/doctrine/marketplace-custody-policy.md` and `.agents/doctrine/surface-classification-policy.md` for skill custody and surface rules.
- Invoke `/using-superpowers-plus` to route to the right skill.

## Authoring a skill

- Create the skill under `.agents/skills/port-<name>/` with `SKILL.md` frontmatter.
- Declare the skill in `.agents/plugins/marketplace.json` under `repo.local_skills`.
- Run `py -3 tools/run.py ci --apply` to regenerate the mesh and provenance.
- Do not let marketplace refresh tooling overwrite `port-*` skills.

## See also

- `.agents/doctrine/repo-runbook-policy.md` for this repo's runbook mappings.
