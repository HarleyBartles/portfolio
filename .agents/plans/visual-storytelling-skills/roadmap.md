# Visual Storytelling Skills Roadmap

**Goal:** Establish a portable two-skill system for authored visual storytelling and image generation, prove it in Portfolio, then leave an evidence-backed route to marketplace custody and use by Adventures and Wild Bunch.

**Spec:** `.agents/specs/2026-09-15-directing-visual-stories-design.md`

**Research baseline:** `.agents/specs/2026-09-15-visual-storytelling-web-spike.md`

| # | Title | Status | Plan File | Commit | PR | Rating | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Portable image-generation foundation | ready | `01-generating-images.md` | — | — | — | Repair stale local-skill naming guidance, create the Apache-2.0-compliant portable execution skill, and prove its behavioural boundary. |
| 2 | Creative visual-story direction | pending | JIT | — | — | — | Create `directing-visual-stories`, its routed composition references, canonical index, and frame/page/world output contracts. |
| 3 | Portfolio field incubation | pending | JIT | — | — | — | Use both skills in upcoming Usual Specialists work, record real acceptance and implementation friction, and revise only from field evidence. |
| 4 | Marketplace graduation and consumer rollout | pending | JIT | — | — | — | Separately authorised future move to Agent Asset Marketplace, then consumption by Portfolio, Adventures, and Wild Bunch. No publication is implied by this roadmap. |

## Sequence rationale

Plan 1 establishes the portable executor and exact handoff boundary first. Plan 2
can then target a real downstream contract instead of the bundled Codex skill. Plan
3 incubates the pair in consequential Portfolio work rather than synthetic agent
tests. Plan 4 remains
a custody and distribution change, so it must not be folded into local incubation.

## Handoff notes

- The original single-skill implementation plan was split on 2026-09-15 after the
  user added a repo-owned image-generation skill. The scope now crosses two
  independently reviewable skill boundaries.
- The upstream OpenAI `imagegen` skill is Apache 2.0 licensed. Reuse is permitted
  only with the licence, retained attribution, and prominent modification notices.
- The local derivative is named `generating-images`; it must not shadow or pretend
  to be the installed `imagegen` skill.
- Repo-local skills use arbitrary valid exact names declared under
  `repo.local_skills`; any prefix requirement encountered in this repo is stale and
  must be repaired in Plan 1.
- Write Plans 2–4 just in time, using current commits, field evidence, and repo
  state. Do not pre-author them from assumptions.
- Plan 2 must treat the 2026-09-15 web spike as its scope boundary: route from story
  function to techniques, preserve the object/frame/field/sequence and
  directed/guided/exploratory distinctions, and keep downstream implementation
  mechanics out of the portable creative core.
- Do not introduce synthetic RED/GREEN pressure testing as a proxy for creative
  value. Structural validation remains deterministic; behavioural validation comes
  from the upcoming Usual Specialists work and Harley's real editorial decisions.
