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
- While executing, keep checking whether the output still satisfies the contract for the next stage: passing code review.

## Verification

- Run the exact checks named by the plan.
- Prefer direct proof from the repo and commands over memory or summaries.
- If a script or generator changes repository structure, verify the regenerated mesh before finishing.
- Before handing off to review, rate whether the code is likely to pass review without the reviewer having to invent missing context.
- Target rating: `9/10`.
- Minimum passing rating: `8/10`.
- If the rating is below `8/10`, keep working.
- If the rating is below `9/10` and the gap is cheap to close, close it before you stop.
- If the remaining gap is user-owned or genuinely out of scope, call it out clearly in the handoff notes.

## Finish Line

- Leave the tree clean unless the task explicitly preserves a tracked draft.
- Update docs that future agents will rely on when the shape of the repo changes.
- Leave behind enough validation and context that the reviewer can assess the diff without guessing at intent.
