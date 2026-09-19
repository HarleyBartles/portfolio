# Planning Runbook

Use this runbook to turn an approved Portfolio design or bounded goal into an executable implementation plan.

## When

- Writing a single implementation plan from an approved design or sufficiently specified task.
- Writing a roadmap when the goal requires several consecutive implementation plans.

## Required skills

- `using-superpowers-plus` for routing.
- `repo-worker-base` for fresh-base and isolated-worktree hygiene.
- `completing-planning-artifacts` for successor-slice retirement of completion-marked artifacts.
- `writing-plans` for a single executable plan.
- `writing-roadmaps` for an epic-sized sequence of plans.
- `handoff-gates` before planning-to-execution handoff.

## Composition

1. After refreshing `main` and creating the slice branch/worktree, run the `completing-planning-artifacts` successor-slice ingress lane before substantive edits.
2. Read the approved design/specification and current repository doctrine that constrains the work.
3. Break the work into narrow ordered tasks with exact file targets and proof commands.
4. Preserve explicit non-goals and dependencies from the design.
5. Commit the new in-flight plan and pass it through the handoff gate before implementation.

## Doctrine and contracts

- [`../doctrine/artifact-policy.md`](../doctrine/artifact-policy.md) for plan custody.
- [`../doctrine/mesh-policy.md`](../doctrine/mesh-policy.md) for repository navigation surfaces.
- [`../doctrine/validation-policy.md`](../doctrine/validation-policy.md) for expected proof.
- [`../doctrine/coding-discipline.md`](../doctrine/coding-discipline.md) when the plan touches code architecture.

## Local commands and paths

- In-flight planning artifacts live in `.agents/plans/`, `.agents/specs/`, and `.agents/roadmaps/`, including appropriate epic subfolders.
- Completed planning artifacts follow `.agents/doctrine/completed-artifacts.md`.
- Regenerate planning navigation with `py -3 tools/run.py mesh --apply`; verify it with `py -3 tools/run.py mesh --check`.
- Plans name focused validation commands and generated-surface apply/check commands explicitly where needed.

## Evidence contract

- Each task names exact file targets, execution order, and proof.
- Eligible predecessor completion-marked artifacts are retired in the first commit of the eventual substantive PR before the new slice's substantive edits.
- The implementer does not need to invent missing commands, architecture, custody, or artifact locations.
- Deferred work and non-goals remain explicit.

## Prohibited combinations

- Do not add unrelated refactors or new product scope during planning.
- Do not plan around a design/specification that is below its handoff gate.
- Do not use a plan to override current doctrine.
- Do not create a cleanup-only PR merely to retire completed planning artifacts.

## Playbook routing

None.
