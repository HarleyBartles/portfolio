# Code Review Runbook

Use this runbook when reviewing a PR, branch, or diff in the Portfolio repository.

## When

- Reviewing implementation before publication or merge.
- Reviewing structural, behavioral, documentation, or visitor-facing changes.

## Required capabilities

- Independently review a change for user-facing behavior, correctness, security, maintainability, and evidence.
- Tie findings to changed behavior and distinguish confirmed defects from uncertainty.

## Optional capabilities

None.

## Required repository-owned skills

None.

## Optional repository-owned skills

- `applying-portfolio-visual-language` when the review changes or judges visitor-facing presentation.
- `writing-portfolio-articles` when reviewing public prose, editorial presentation, or article evidence.

## Composition

1. Read the approved plan or design spec and the doctrine relevant to the diff.
2. Review scope, architecture, behavior, validation, documentation, and publication implications according to the changed surface.
3. Apply the topical playbooks below when their concerns are present.
4. Report concrete findings with file-level evidence and any missing validation.

## Doctrine and contracts

- [`../doctrine/coding-discipline.md`](../doctrine/coding-discipline.md) for scope and architecture invariants when code structure changes.
- [`../doctrine/agent-guidance-policy.md`](../doctrine/agent-guidance-policy.md) for authored routing changes.
- [`../doctrine/workflow-policy.md`](../doctrine/workflow-policy.md) for branch, PR, and ready-state rules.
- [`../doctrine/validation-policy.md`](../doctrine/validation-policy.md) for required proof.
- [`../doctrine/portfolio-design-policy.md`](../doctrine/portfolio-design-policy.md) and `docs/decisions/README.md` for visitor-facing work.

## Local commands and paths

- Root routing: `AGENTS.md`.
- Review entry point: `REVIEW.md`.
- Authored routers must point to live guidance when the file tree or routing changes.
- Visual changes require the viewport, accessibility, reduced-motion, zoom, and regression evidence defined by Portfolio policy and tests.

## Evidence contract

- The review establishes whether the diff matches requested scope and current doctrine.
- Findings identify the affected file/surface and the reason they matter.
- Validation evidence is sufficient for the changed slice, or missing proof is stated explicitly.
- No green or ready claim is made from stale or incomplete evidence.

## Prohibited combinations

- Do not use review as permission to broaden implementation scope.
- Do not substitute screenshot equality for design judgment.
- Do not waive architecture or validation contracts merely because current behavior appears correct.

## Playbook routing

- [Code style](../playbooks/code-style.md) - whenever reviewing code structure, React composition, TypeScript, styling implementation, Python, or technical prose.
- [Testing](../playbooks/testing.md) - whenever reviewing behavior or validation evidence.
- [Article writing](../playbooks/article-writing.md) - when reviewing public prose, editorial presentation or article evidence.
