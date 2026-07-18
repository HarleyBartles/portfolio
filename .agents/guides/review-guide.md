# Review Guide

Use this guide when reviewing a PR, branch, or diff in the portfolio repository.

## Before You Review

Read the relevant routing and policy docs first:

- `AGENTS.md` for the repo-wide routing surface.
- `.agents/docs/AGENTS.md` for docs and policy routing.
- `.agents/doctrine/mesh-policy.md` for README, AGENTS, and INDEX rules.
- `.agents/doctrine/workflow-policy.md` for branch, PR, and ready-state rules.
- `.agents/doctrine/validation-policy.md` for the current validation baseline.
- `.agents/doctrine/coding-discipline.md` when the diff changes scope or structure.
- The approved plan or design spec that the work claims to satisfy.

## Review Focus

A good review answers four questions:

1. Does the diff match the requested scope?
2. Does the diff preserve the repo's guardrails?
3. Is the validation sufficient for the slice that changed?
4. Did the work leave the repository easier for the next agent to understand?

## Review Lenses

Apply the following lenses as needed:

- **Scope Lens** - did the work stay within the requested slice?
- **Hygiene Lens** - are files in the right place, with no stray artifacts or broken routing?
- **Validation Lens** - does the change have the checks it needs, and were they actually run?
- **Documentation Lens** - do AGENTS, README, INDEX, and guide surfaces still point at the right things?
- **Architecture Lens** - if the work adds code later, does it stay within the repository's documented architecture direction?

If the review touches only docs or navigation, keep the architecture lens light and focus on routing, accuracy, and index freshness.

## Review Quality Bar

The review itself should be rigorous enough that the reviewer does not need a second pass to understand the result.

- Target confidence: `9/10`.
- Minimum pass: `8/10`.
- If the score is below `8/10`, keep working.
- If the score is below `9/10` and the gap is easy to close, close it before returning the review.
- The review does not hand off to another stage, but it should still improve the next action by being explicit about findings, missing validation, and any doc or mesh follow-up.

## What To Check

- File placement is correct.
- The routing docs still point at the right follow-up docs.
- Generated `INDEX.md` files were regenerated if the file tree changed.
- The README stays human-facing.
- No temporary or scratch files were committed.
- Validation commands match the change size.
- Any deferred work is explicit and narrow.

## Review Output

When you review, report:

- a short verdict;
- the strongest points of the diff;
- any findings, ordered by importance;
- any missing validation;
- any documentation or mesh follow-up that should happen in the same slice.

If there are findings, be specific about the file and the reason. If there are no findings, say why the diff is acceptable.

## Handoff Rule

Do not mark a review as complete if you can still cheaply verify or fix something that would materially improve the review outcome.

- Target confidence: `9/10`.
- Minimum pass: `8/10`.
- If the score is below `8/10`, keep working.
- If the score is below `9/10` and the gap is easy to close, close it before you hand the review off.
- Only hand off below `9/10` when the remaining gap is clearly user-owned or out of scope.

## What This Guide Is Not

- It is not a merge checklist.
- It is not a substitute for the repository policies.
- It is not permission to broaden the review beyond the diff.
