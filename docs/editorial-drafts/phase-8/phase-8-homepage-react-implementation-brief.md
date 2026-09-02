# Phase 8 homepage — React implementation brief

**Status:** Wireframe accepted. Production homepage implementation is now authorized.

**Branch / PR:** stay on `codex/phase-8-homepage-editorial-room`, draft PR #48. Do not create another branch or PR. Do not mark the PR ready for review until Harley/Cloud have inspected the built homepage.

This brief **supersedes the earlier Phase 8 hard stops that prohibited homepage implementation and local JIT planning**. The editorial/art-direction room is complete enough to move into production React. The approved wireframe is now the visual/editorial authority; the job is to stand it up as a real interactive homepage without turning the disposable proof into production architecture.

This is an implementation brief, not a request to mechanically copy one HTML file.

Local Sol owns the implementation architecture, decomposition, sequencing, tests and production-quality translation. Preserve the accepted outcome; improve the engineering where the wireframe used disposable shortcuts.

---

## 1. Start here

Read in this order before changing production code:

1. repository `AGENTS.md` and the relevant local runbooks / project instructions;
2. this brief;
3. [`phase-8-homepage-wireframe-handoff.md`](./phase-8-homepage-wireframe-handoff.md);
4. [`phase-8-homepage-wireframe.html`](./phase-8-homepage-wireframe.html) and its accepted assets as the rendered composition authority;
5. the focused Phase 8 authorities linked from the handoff, especially the Fold 3 DOM/material work and The Usual Specialists substrate/wordmark notes;
6. current production `src/client/src/pages/HomePage.tsx`, `src/client/src/features/home/*`, routing/content code and homepage tests;
7. the current design-decision ledger where implementation introduces or intentionally retires a durable homepage behaviour.

Inspect the current repository before writing the implementation plan. The production homepage is still the deferred pre-Phase-8 surface; do not preserve its structure merely because it exists.

Write a just-in-time implementation plan from current repository truth and then execute it. The plan should be small enough to remain useful while retaining the whole-page/module view.

---

## 2. Mission

Replace the current homepage with the accepted Phase 8 editorial sequence as a real React page:

1. **quiet professional opening**;
2. **Agent Asset Marketplace / Superpowers+**;
3. **Wild Bunch falsifiability receipt**;
4. **selected Writing feature**;
5. **selected Patch feature**;
6. **quiet professional close**.

The built page should feel like the wireframe we accepted, not like the old homepage with new content inserted into its existing hero/deck/cards.

The current production `FeatureDeck`, mount-time shuffle controls, duplicate case-study grid, working-principle cards, recent-writing feed and self-conscious portfolio close are **not protected behaviours**. Remove, replace or retire them when they no longer serve the accepted homepage. Search for other consumers before deleting shared code.

The implementation target is the real homepage route at `/`, inside the existing site shell and static GitHub Pages delivery model.

---

## 3. Wireframe authority vs production architecture

Treat the wireframe as authority for:

- copy and hierarchy;
- movement order;
- visual rhythm;
- breakouts and authored responsive behaviour;
- project-native evidence;
- accepted image/texture treatments;
- jump-link semantics and landing intent;
- accessibility/fallback intent;
- the final Specialists torn-paper takeover.

Do **not** treat the wireframe as authority for:

- file/component boundaries;
- CSS organisation;
- duplicated markup used only for proofing;
- hard-coded pixel measurements that have a better responsive expression in production;
- wireframe-only helpers or review annotations;
- asset locations under `docs/editorial-drafts`.

Production should be maintainable React, not a JSX transcription of the proof HTML.

---

## 4. Modular homepage contract

The homepage shell should compose independently authored sections rather than one monolithic `HomePage` with cross-section knowledge everywhere.

Use whatever component/type names fit the existing codebase, but preserve these ownership boundaries:

### A section / selected feature owns

- its own rendered composition;
- its canonical anchor / landing identity;
- its inward `→` CTA label and destination;
- the **incoming `↓` teaser copy that advertises this section to the previous section**;
- its responsive layout;
- its project/article-specific media and fallbacks;
- any local visual vocabulary that is not generic site chrome.

### The homepage shell owns

- the stable section sequence;
- edition selection for the variable Writing and Patch slots;
- connecting one section to the next;
- rendering the next section's incoming teaser at the end of the current section;
- global page metadata and any small homepage-wide orchestration concerns.

The source section must not hard-code editorial teaser copy for whatever happens to come next.

For example, Writing should not permanently know that `The Usual Specialists` follows it. The selected Patch feature supplies the incoming teaser that Writing renders. When a future Tournament of Reasonable Defaults edition is selected, the previous section should automatically advertise Tournament with Tournament-owned copy.

Avoid circular component knowledge. A small descriptor/configuration layer is preferable to sections importing each other.

---

## 5. Edition mechanics

Writing and Patch are variable homepage slots. Build that seam now rather than baking today's selections directly into neighbouring components.

For the first production edition, the accepted rendered features are:

- Writing: **`I made agentic engineering harder than it needed to be`**;
- Patch: **`The Usual Specialists`**.

The Patch slot must be capable of taking another authored adventure later, especially **Tournament of Reasonable Defaults**, without forcing the homepage shell or preceding Writing section to adopt Specialists-specific layout/copy.

The durable Patch contract is **full-width expressive licence**. The black torn substrate, comic/caper placement and Specialists-specific assets belong to The Usual Specialists implementation, not to the generic Patch slot.

The edition layer should be deterministic and testable. Do not reintroduce mount-time random shuffle behaviour. If the exact future rotation policy is not already specified strongly enough in current repository authority, keep the first edition pinned/configurable and expose a clean selection seam rather than inventing a product policy. A later daily/date-based selector should be able to choose a Writing/Patch feature without changing section internals.

Do not add a CMS, backend, cookies, identity, analytics or remote recommendation service for this.

---

## 6. Link and jump contract

Preserve the settled directional grammar:

- `→` = go inward into a case study, article, Patch adventure, CV, About or contact route;
- `↓` = continue to the next authored homepage movement;
- `↑` = return upward only where a quiet, genuinely useful control earns its place.

Arrows are semantic, not decoration.

Normal scrolling remains completely free:

- no scrolljacking;
- no snap scrolling;
- no intercepted wheel/touch behaviour;
- no autoplay/timed section movement.

A jump target does **not** have to equal the section's DOM start. The clicked landing should present the strongest authored composition at that breakpoint. Use clean anchor/sentinel/`scroll-margin` architecture as appropriate.

On wide/tablet compositions, a jump should land on a self-contained authored plate where practical. On portrait, the jump only needs to establish a clean authored start; the reader is expected to scroll through the section naturally.

Permanent masthead navigation remains part of the shell. Preserve the dedicated CV route and the accepted project/writing/Patch/About navigation behaviour.

---

## 7. Section-specific implementation notes

### Fold 1 — professional opening

Implement the accepted wireframe copy and composition. Do not revert to the current production `Harley Bartles / I build reliable agentic systems` hero.

The accepted opening establishes professional identity and consequence before project evidence. It is deliberately restrained. Do not add another feature index or marketing-card treatment.

Portrait does **not** need to fit the entire fold into one physical screen.

### Fold 2 — Agent Asset Marketplace / Superpowers+

Implement the accepted v1 wireframe treatment.

This is intentionally **good enough for the first built version**. Do not reopen the Fold 2 art-direction side quest during implementation unless translation into React exposes a real functional/accessibility defect.

Preserve the right-edge breakout, the shared editorial field, the modular route language and the copy/CTA hierarchy. The proof should not become a bordered illustration card again.

### Fold 3 — Wild Bunch

Port the accepted **semantic DOM/CSS proof**, not the retired breakpoint SVGs.

Hard topology:

- normal path: `events → Cache → State`;
- rebuild path: `complete ordered event history → Replay → Cache → State`;
- Replay never feeds State directly;
- Cache is the sole source of State;
- history only emits / is read.

Preserve the accepted visual distinction between direct live event refresh and the heavy complete-history sweep.

Preserve the material progression:

**ordinary site-native history → restrained Replay/Cache mechanisms → expressive State**.

Generated Replay/Cache/State textures are decorative progressive enhancement. Base colours, borders, live DOM labels and topology must still work if the images fail.

Do not bake meaningful text into generated assets. Keep all labels semantic/selectable.

Preserve the responsive re-authoring rather than scaling one desktop diagram down.

### Writing

Keep the accepted austere typography-led treatment. The lack of decorative media is the point.

The selected Writing feature should be a replaceable authored module with its own title, précis, route and incoming teaser metadata.

Do not turn it into a generic article card.

### Patch / The Usual Specialists

Port the accepted Specialists movement and its final torn black substrate.

Preserve:

- the accepted PATCH and episode-title outline assets;
- real semantic text alongside presentation outlines;
- the wide collage and authored intermediate/narrow decomposition;
- full-width black Specialists substrate;
- transparent torn edges revealing the **real mineral site ground**;
- Silk/folder/Rollback/Receipt edge pressure and irregular placement;
- Klause's K as a true zero-flow overprint;
- coherent fallback if decorative edge/media assets fail.

The torn substrate is Specialists-specific. Do not encode it as generic Patch styling.

### Professional close

Implement the accepted quiet reciprocal close and routes. It should feel like the site returning to mineral calm after Patch, not another proof section or sales banner.

---

## 8. Production assets and custody

Do not make production components fetch assets from `docs/editorial-drafts/phase-8/...`.

Promote/copy accepted production assets into the appropriate client/public asset surface with sensible names and provenance/custody records where the repository's current policy requires them.

Use the full-resolution accepted assets already present on the branch. Do not regenerate or downsample merely to move them into production.

Keep generated textures decorative. Provide base-colour fallbacks.

Do not commit or redistribute font binaries. Reuse the existing accepted font loading/licence boundary and path-outline assets.

Remove obsolete wireframe-only SVGs/assets from **production references**; the editorial proof files themselves may remain as durable design evidence.

---

## 9. Current production code is a migration source, not authority

At implementation start, the current production homepage still:

- waits on navigation data and shows a whole-page loading state;
- renders the old hero proposition;
- builds a shuffled `FeatureDeck`;
- repeats projects in a case-study grid;
- renders working-principle cards;
- renders a recent-writing feed;
- closes with `Yes, this is also a portfolio.`

That structure predates the accepted Phase 8 room and should not constrain the new page.

Reuse useful repository infrastructure — routing, content manifests, canonical route helpers, metadata, shell, established styles/tokens — without preserving obsolete information architecture.

If all homepage content required for the initial render is already statically bundled, avoid introducing an unnecessary blank/loading flash merely because the old page did so. Make the best decision from current repository truth and test the resulting fallback/error behaviour.

---

## 10. Interaction, accessibility and responsive quality

The built homepage must preserve the wireframe's accessibility intent, not just its appearance.

Required qualities include:

- semantic headings and regions;
- sensible source order;
- keyboard-accessible links/navigation;
- visible focus;
- reduced-motion respect;
- no page-level horizontal overflow;
- readable mobile typography — especially Fold 3 event metadata;
- semantic alternatives for presentation-outline wordmarks;
- decorative textures/tears excluded from interaction and assistive semantics;
- robust image/media failure behaviour;
- adequate text contrast over textured/generated surfaces;
- natural zoom/reflow at 200%;
- no essential content hidden behind JavaScript-only interaction.

The page must remain understandable if project-native decorative media fails. It does not need to remain visually identical.

---

## 11. Testing and validation

The existing `src/client/e2e/homepage.spec.ts` is testing the **old homepage**. Rewrite it deliberately; do not preserve shuffle-button expectations as accidental requirements.

Add the smallest useful set of component/unit tests around new logic, especially edition selection and destination-owned teaser metadata.

Browser/e2e coverage should prove at least:

- the accepted professional opening is present;
- section order and canonical anchors exist;
- all inward routes point to the intended content;
- each `↓` route lands on the intended authored movement;
- the selected Writing/Patch edition is deterministic under test;
- destination-owned teaser copy changes with the selected feature configuration;
- Fold 3 topology remains semantically correct;
- Specialists wordmark semantic text and zero-flow K behaviour survive production translation;
- decorative texture/torn-edge failure does not destroy content or contrast;
- reduced motion and keyboard traversal remain sane;
- there is no horizontal page overflow at the established breakpoint set.

Reinspect the real React page at least at the standing review widths:

- `1440 × 1000`;
- `984 × 912`;
- `768 × 900`;
- `390 × 844`;
- `320 × 844`.

Also inspect the meaningful authored boundaries inherited from the wireframe, especially around:

- `1279/1280`;
- `900/901`;
- `720/721`;
- Specialists `520/521`;
- Specialists `1099/1100`.

Do not accept a green test suite as visual sign-off. Inspect the rendered result yourself.

---

## 12. Implementation style

Preserve the spirit of the creative-room process during implementation:

- constraints and accepted outcomes are hard;
- implementation details are yours;
- simplify when complexity adds no meaning;
- do not invent new design problems to solve;
- do not reopen settled Fold 2 merely because production code offers an opportunity;
- when translation reveals a genuine contradiction, solve it with the smallest authored adjustment and record it.

Use existing codebase patterns where they help. Do not build an abstract homepage framework larger than the problem.

The goal is modularity sufficient for future edition swaps, not a CMS or generic page-builder.

---

## 13. Scope boundaries

This pass may change:

- production `HomePage`;
- supporting `features/home` components/configuration;
- homepage-specific styles;
- production asset placement/custody;
- homepage tests;
- small shared shell/anchor compatibility code where genuinely required;
- design-decision documentation for durable behaviours changed by this implementation.

Do not use this pass to redesign unrelated interior pages, rewrite case studies/articles, build Tournament of Reasonable Defaults, add analytics, add a backend, redesign global navigation wholesale, or start later roadmap phases.

Stay on this branch and draft PR #48.

---

## 14. Handoff / stop condition

The implementation pass is complete when:

- the real `/` route renders the accepted homepage in React;
- the page is modular enough for Writing/Patch edition swaps without neighbour coupling;
- accepted responsive compositions are standing at the review widths;
- navigation/jump semantics work;
- production assets/fallbacks are correctly wired;
- relevant automated tests pass;
- Local Sol has visually inspected the rendered page and resolved obvious translation defects.

Create/update a concise durable implementation handoff under `docs/editorial-drafts/phase-8/` describing:

- production component/config boundaries;
- edition-selection seam;
- promoted assets/fallbacks;
- tests and browser evidence;
- any deliberate deviations from the wireframe and why they were necessary.

Then stop and return exactly:

**Ready for Cloud/Harley React homepage inspection**

Do not mark PR #48 ready, merge it, or continue into another roadmap phase before that inspection.