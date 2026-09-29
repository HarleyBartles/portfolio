# Skill Authoring Playbook

Use this playbook when creating or changing a Portfolio-owned skill or its local registration.

## When

- Authoring, revising, renaming, or retiring a repo-owned skill.
- Changing the `repo.local_skills` declaration or the local skill projection boundary.

## Required capabilities

- Design, write, and validate a reusable skill with clear triggers, boundaries, and executable behavior.
- Maintain repository-owned skill declarations and provenance when skill custody changes.

## Optional capabilities

None.

## Required repository-owned skills

None.

## Optional repository-owned skills

None.

## Composition

1. Confirm canonical custody and naming from repository doctrine.
2. Author the skill in its repo-owned source directory through `writing-skills`.
3. Register the exact local skill name in `.agents/plugins/marketplace.json`.
4. Refresh the declared skill projection and provenance, then validate authored routing if skill guidance moved.

## Compose the skill body as a router

Treat `SKILL.md` as the entry point that helps an agent choose and follow the relevant path, not as a dump of every procedure, exception and reference fact the skill owns. The body should answer: when does this skill apply, what should the agent do first, which path fits this task, and what should it load next?

- Keep always-needed scope, principles, sequencing, safety gates and interpretation rules in `SKILL.md`.
- Give each substantial task path a clear trigger and a short direction. Use language such as “When a study compares optional reads, load `references/<optional-read-guide>.md` before writing the manifest.”
- Move detailed procedures, schemas, option inventories, large examples and conditional workflows into task-named files under `references/`. Link directly from `SKILL.md` to the relevant reference and say when to load it; do not require agents to read every reference for every task.
- Keep reference links one level deep where possible. Do not build a chain of references that forces agents to discover the next step by reading unrelated material.
- Use a short routing table when several paths or modes are easy to confuse. Otherwise, direct headings and conditional instructions are clearer than a flowchart.
- Keep a skill self-contained when its guidance is short and applies on every invocation. Split content to reduce irrelevant loading and improve navigation, not just to meet a line-count target.

Before calling the body finished, test navigation with representative tasks: can an agent identify the applicable path from the body, load only the needed reference, and continue without guessing? Also check that each reference's title and opening say what task it covers and when to use it. The [progressive disclosure guidance in `writing-skills`](../skills/writing-skills/anthropic-best-practices.md) gives the broader rationale and patterns.

## Doctrine and contracts

- [`../doctrine/marketplace-custody-policy.md`](../doctrine/marketplace-custody-policy.md) for marketplace/local custody.
- [`../doctrine/surface-classification-policy.md`](../doctrine/surface-classification-policy.md) for authored surface roles.
- [`../contracts/skill-frontmatter.md`](../contracts/skill-frontmatter.md) for skill discovery, provenance and relationship metadata.
- [`../contracts/openai-agent-yaml.md`](../contracts/openai-agent-yaml.md) for Codex wrapper metadata and prompt language.

## Local commands and paths

- Repo-owned skills live under `.agents/skills/<declared-local-name>/` according to current custody policy.
- Local skill inventory: `.agents/plugins/marketplace.json` under `repo.local_skills`.
- Refresh projection/provenance: `py -3 tools/run.py refresh-skills --apply`.
- Validate adopted repository standards and authored links after skill changes.

## Evidence contract

- Skill source, manifest declaration, installed provenance, and authored links agree.
- Marketplace refresh does not overwrite repo-owned skill custody.
- The authored skill passes the validation required by `writing-skills` and repository checks.

## Prohibited combinations

- Do not hand-edit marketplace-derived skills as though they were local source.
- Do not create an undeclared local skill directory.
- Do not use installed projection state as canonical source truth.

## Runbook routing

None.
