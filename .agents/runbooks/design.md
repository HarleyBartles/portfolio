# Design Runbook

Use this runbook to turn a Portfolio idea into a design specification that planning can execute without inventing missing contracts.

## When

- Shaping a new visitor-facing or repository-facing design before implementation planning.
- Revising an existing design contract where human taste, hierarchy, interaction, or architecture must be resolved first.

## Required skills

- `using-superpowers-plus` for routing.
- `brainstorming` for the design stage and its baseline.
- `applying-portfolio-visual-language` for visitor-facing presentation.
- `handoff-gates` before design-to-planning handoff.

## Composition

1. Inspect the live repository, relevant design doctrine, and existing decision records.
2. Resolve source-of-truth boundaries, exact defaults, seams, non-goals, and validation expectations in the spec.
3. Keep the spec narrow enough that planning can proceed without inventing missing architecture or product decisions.
4. Pass the design through the handoff gate before planning.

## Doctrine and contracts

- [`../doctrine/portfolio-design-policy.md`](../doctrine/portfolio-design-policy.md) for active visitor-facing design policy.
- [`../doctrine/artifact-policy.md`](../doctrine/artifact-policy.md) for spec custody.
- [`../doctrine/coding-discipline.md`](../doctrine/coding-discipline.md) when the design fixes component or code architecture boundaries.
- `docs/design-decisions.md` for current rationale and reconsideration triggers.

## Local commands and paths

- Specs live under `.agents/specs/` while active.
- Inspect `README.md`, `AGENTS.md`, `.agents/INDEX.md`, and the relevant doctrine/index surfaces when repo structure is part of the design.
- Verify exact file names, commands, source/derived boundaries, and current implementation facts from the live repo rather than memory.

## Evidence contract

- The design states goal, scope, non-goals, file families, source-of-truth boundaries, operational contracts, validation bundle, and deferred work where relevant.
- Protected defaults are either preserved or intentionally changed with rationale recorded through the active design policy.
- The planning agent can proceed without guessing at ownership, seams, or commands.

## Prohibited combinations

- Do not turn the design stage into implementation.
- Do not broaden scope because adjacent architecture could also be improved.
- Do not encode exact prose or transient visual values as tests when the real contract is behavioral, accessible, custodial, or perceptual.

## Playbook routing

None.
