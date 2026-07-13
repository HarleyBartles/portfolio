# Planning Guide

Use this guide when turning an approved design spec into an implementation plan for the portfolio repository.

## Read First

- `AGENTS.md` for the repo-wide routing points.
- `.agents/docs/mesh-policy.md` for how the navigation and guidance surfaces fit together.
- `.agents/docs/artifact-policy.md` for where plans and specs belong.
- `.agents/docs/validation-policy.md` for the validation baseline.
- The approved design spec you are planning from.

## What a Good Plan Must Contain

- The exact file targets for each task.
- A narrow task breakdown that a reviewer can reason about.
- The exact commands or checks that prove each task.
- The order of operations when one task depends on another.
- Any explicit non-goals or deferred work from the design spec.

## Planning Rules

- Keep the plan narrow enough for one implementation pass.
- Do not add unrelated refactors.
- Do not invent new scope because the repo is still small.
- If the spec is below the handoff quality gate, fix the spec before planning.
- If a plan step would force the implementer to guess at a command, file target, or artifact location, tighten it.

## Output Shape

- Plans live in `.agents/superpowers/plans/`.
- Plans should be readable as work instructions, not as a design essay.
- Plans should assume the implementer will verify the live repo before mutating it.
