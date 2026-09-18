# Skill Authoring Playbook

Use this playbook when creating or changing a Portfolio-owned skill or its local registration.

## When

- Authoring, revising, renaming, or retiring a repo-owned skill.
- Changing the `repo.local_skills` declaration or the local skill projection boundary.

## Required skills

- `writing-skills` for skill creation, editing, and validation.
- `repo-agent-assets` for local-skill declarations and installed-skill projection rules.
- `refreshing-installed-skills` for generated projection/provenance refresh.
- `generating-agent-mesh` after skill-surface changes.

## Composition

1. Confirm canonical custody and naming from repository doctrine.
2. Author the skill in its repo-owned source directory through `writing-skills`.
3. Register the exact local skill name in `.agents/plugins/marketplace.json`.
4. Refresh installed-skill provenance and regenerate the mesh.

## Doctrine and contracts

- [`../doctrine/marketplace-custody-policy.md`](../doctrine/marketplace-custody-policy.md) for marketplace/local custody.
- [`../doctrine/surface-classification-policy.md`](../doctrine/surface-classification-policy.md) for authored surface roles.

## Local commands and paths

- Repo-owned skills live under `.agents/skills/<declared-local-name>/` according to current custody policy.
- Local skill inventory: `.agents/plugins/marketplace.json` under `repo.local_skills`.
- Refresh projection/provenance: `py -3 tools/run.py refresh-skills --apply`.
- Refresh navigation after skill changes: `py -3 tools/run.py mesh --apply`.

## Evidence contract

- Skill source, manifest declaration, installed provenance, and mesh agree.
- Marketplace refresh does not overwrite repo-owned skill custody.
- The authored skill passes the validation required by `writing-skills` and repository checks.

## Prohibited combinations

- Do not hand-edit marketplace-derived skills as though they were local source.
- Do not create an undeclared local skill directory.
- Do not use installed projection state as canonical source truth.

## Runbook routing

None.
