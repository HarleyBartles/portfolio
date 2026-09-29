# Implementation Runbook

Use this runbook when executing an approved plan in the Portfolio repository.

## When

- Executing an approved implementation plan.
- Repairing plan drift discovered during implementation without broadening scope.

## Required capabilities

- Execute an approved plan in order with behavior-first implementation and focused verification.
- Manage repository source custody, branch state, validation, and completion evidence.

## Optional capabilities

None.

## Required repository-owned skills

None.

## Optional repository-owned skills

- `applying-portfolio-visual-language` for visitor-facing visual work.
- `asset-custody` when adding, selecting, transforming, or removing owned assets.
- `writing-portfolio-articles` when implementing an approved public article or writing-system change.

## Composition

1. Read the approved implementation plan and the doctrine that constrains its slice.
2. Execute the plan through the selected implementation skill without widening scope.
3. Apply the topical playbooks below whenever their concerns are present; a playbook may also be invoked directly when discovered from the work itself.
4. Run focused proof while iterating, then use the tracked commit hook for the complete repository gate once the intended tree is staged.
5. Before review handoff, verify the implementation still satisfies the approved plan and repository doctrine.

## Doctrine and contracts

- [`../doctrine/coding-discipline.md`](../doctrine/coding-discipline.md) for code scope and architecture invariants.
- [`../doctrine/agent-guidance-policy.md`](../doctrine/agent-guidance-policy.md) for authored routing and guidance changes.
- [`../doctrine/artifact-policy.md`](../doctrine/artifact-policy.md) for artifact placement.
- [`../doctrine/validation-policy.md`](../doctrine/validation-policy.md) for validation expectations.
- [`../doctrine/workflow-policy.md`](../doctrine/workflow-policy.md) for branch, readiness, and publication rules.

## Local commands and paths

- Root routing: `AGENTS.md`.
- In-flight plans: `.agents/plans/`.
- Run the relevant named suite while editing; the normal tracked commit hook composes all named suites against the staged tree.
- Update authored routers and validate their links in the same change when guidance moves.

## Evidence contract

- The implementation matches the approved plan or records a narrow, explicit drift.
- Relevant focused tests pass before closeout.
- Generated surfaces touched by the change are refreshed and check-clean.
- Completion claims are based on current repository evidence, not memory or summaries.
- The work is ready for code review without the reviewer having to invent missing architecture or validation context.

## Prohibited combinations

- Do not combine implementation with unrelated refactors or speculative architecture.
- Do not bypass the tracked commit hook.
- Do not treat a plan as authority to violate current doctrine or explicit human direction.

## Playbook routing

- [Code style](../playbooks/code-style.md) - whenever code, component architecture, styling implementation, Python, TypeScript, or technical prose changes.
- [Testing](../playbooks/testing.md) - whenever behavior changes or validation is required.
- [Article writing](../playbooks/article-writing.md) - when implementing an approved public article or writing-system plan.
