# Implementation Guide

Use this guide when executing an approved plan in the portfolio repository.

## Read First

- `AGENTS.md` for repo-wide routing.
- `.agents/docs/mesh-policy.md` for documentation and mesh rules.
- `.agents/docs/artifact-policy.md` for artifact placement.
- `.agents/docs/validation-policy.md` for the expected validation baseline.
- The approved implementation plan.

## Execution Rules

- Implement the plan as written.
- Keep changes narrow and track any discovered drift explicitly.
- If a change touches docs or navigation, regenerate the mesh in the same change.
- Do not claim completion until validation has actually run.

## Verification

- Run the exact checks named by the plan.
- Prefer direct proof from the repo and commands over memory or summaries.
- If a script or generator changes repository structure, verify the regenerated mesh before finishing.

## Finish Line

- Leave the tree clean unless the task explicitly preserves a tracked draft.
- Update docs that future agents will rely on when the shape of the repo changes.
