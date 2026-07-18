# Design Spec Guide

Use this guide when turning a portfolio-repo idea into a design spec that a planning agent can execute without inventing missing contract details.

## Before You Begin

Read the live repository surfaces before writing the spec:

- `README.md` for the project purpose and roadmap.
- `AGENTS.md` for repository-wide guidance.
- `INDEX.md` for the repository navigation mesh.
- `.agents/INDEX.md` for the hidden agent surfaces.
- `.agents/docs/INDEX.md` for the documentation and guide surface.
- `.agents/guides/INDEX.md` for the guide surface itself.
- `.agents/doctrine/INDEX.md` for the doctrine surface.
- `.agents/superpowers/INDEX.md` for the local Superpowers surfaces.

If the task depends on a reference implementation pattern, inspect the live reference repo and its actual files before writing the design. Do not rely on memory alone for file names, command names, or source/derived boundaries.

## What a Good Design Spec Must Lock Down

The spec must give the planner enough seam detail to plan against without improvising blocker fixes mid-flight.

At minimum, the spec should include:

- the exact goal and scope of the setup slice;
- the exact non-goals;
- the exact files or file families to create or modify;
- the source-of-truth boundary for each surface;
- the exact default values or selections, including counts when relevant;
- the operational contract for scripts or tools, including check mode and success/failure behavior;
- the validation bundle the planner should assume;
- any intentional exclusions or deferred work;
- any repository-specific navigation or artifact rules that affect where files live.

## Portfolio-Specific Learnings From the First Design Spec Task

The first portfolio setup spec showed the following must be explicit if you want a planner to stay out of trouble:

- The repo-local plugin manifest must be described as source, not a loose inventory.
- The marketplace submodule must be named exactly, with its git remote and path anchored explicitly.
- The skill tree must be described as derived output, not hand-authored source.
- The manifest default-install set must be enumerated exactly.
- Wild Bunch-specific plugins do not belong in this repo.
- The installer script contract must state the commands, exit behavior, and collision policy.
- Hidden surface indexes must be called out explicitly when they are required, rather than left as a maybe.
- The validation bundle should be concrete enough that the planner can hand it to an implementer without inventing a local preflight.
- The setup slice should not drift into application scaffolding.
- The spec should name any repo-local artifact rules that matter, including where design specs live versus where plans live.

## Design Discipline

- Keep the spec narrow enough for a single planning pass.
- Prefer exact file names and exact command names over general descriptions.
- Separate source, derived, and navigation surfaces clearly.
- If a future implementer would have to ask, "Where does this file belong?" or "Which command do I run?", the spec is too vague.
- If a detail is cheap to verify from the live repo, verify it now rather than leaving it for the planner.

## Handoff Quality Gate

Before handing the spec to a planning agent, rate the spec honestly.

- Target rating: `9/10`.
- Minimum passing rating: `8/10`.
- Do not report the spec as ready if the rating is below `8/10`.
- Do not report the spec as ready if the rating is below `9/10` and the remaining gap is something you can close easily with verification or a small clarification.
- If the remaining gap is within your power to close, close it before handoff.
- If the remaining gap cannot be closed cleanly without a user decision or a broader scope change, you may hand off at `8/10` or higher, but you must call out the open question explicitly.

The practical rule is simple: if you can easily get the spec from "good enough" to "clean handoff," do that work before you hand it off. Do not pass a knowingly rough spec to planning just to save a few minutes.

## What To Hand Off

When the spec is ready, give the planner:

- the exact file or file-family targets;
- the source/derived boundary for each target;
- the exact command or script contract;
- the exact validation bundle;
- the explicit non-goals;
- any open questions that remain user-owned.

## What This Guide Is Not

- This guide is not an implementation plan.
- This guide is not a substitute for live repo inspection.
- This guide is not permission to broaden scope.
- This guide is not a green-light to hand off a spec below the quality floor.
