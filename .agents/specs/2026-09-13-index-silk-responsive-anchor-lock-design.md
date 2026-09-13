# Index-to-Silk responsive anchor-lock design

**Status:** Approved.

**Planning handoff readiness:** 9/10. Harley approved this written responsive direction on 2026-09-13; the responsive ownership model, route-state rules, physical invariants, accepted wide reference treatment, and test strategy are explicit.

## Goal

Extend the accepted Index-to-Silk rope/anchor/knot treatment through the full supported responsive estate without turning the currently proven `1400..1599` prototype band into a special island.

The accepted wide proof establishes the physical language:

- thin paracord-scale route material;
- Index rope feeding into a compact foreground knot;
- knot wrapping an authored steel anchor set into the mineral page;
- a deterministic foreground ring occluder restoring the correct front/back relationship;
- Silk rope emerging from behind the lower ring edge;
- no faux CSS rope patches inside the lock composition.

The responsive expansion must preserve that physical read wherever the route appears.

## Superseded Index-to-Silk seam rule

The earlier Silk design treated Index-to-Silk as one shared crossing coordinate: outgoing Index rope, incoming Silk rope and anchor centre all met at the same point.

That rule is superseded for **Index-to-Silk only**.

The accepted anchor proof demonstrated a stronger physical model:

1. the outgoing Index rope connects to the **top exit of the authored knot treatment**;
2. the incoming Silk rope connects to the **bottom exit of the authored knot treatment**;
3. those two endpoints are allowed to have different x coordinates because the lock itself is now part of the rope path;
4. the anchor is not allowed to hide a disconnected rope seam, but it is allowed to physically redirect the route through its knot and ring geometry.

Opening-to-Index remains governed by its existing shared crossing-port contract unless separately redesigned later.

## Core responsive law

The anchor lockup does **not** own an independent responsive breakpoint taxonomy.

The governing rule is:

> **Where the rope route changes at an authored break, the anchor lockup changes with it. Where the rope route does not change, the anchor lockup does not gain a separate state.**

Therefore the page's general responsive vocabulary remains available, but a page breakpoint such as `1600` or `1920` does not automatically create a new rope/lock treatment.

The route currently needs these responsive route states:

| Route state | Widths | Intent |
| --- | --- | --- |
| narrow | `320..390` | narrow authored rope route + matching lock geometry |
| compact landscape | `391..720` | compact authored rope route + matching lock geometry |
| mid | `721..900` | mid authored rope route + matching lock geometry |
| default | `901..1399` | ordinary desktop/tablet route + matching lock geometry |
| wide | `1400..2560` | accepted wide route language, continuing through expanded/ultrawide unless later visual evidence proves the route itself must move |
| ceiling freeze | `2561+` | freeze the complete 2560 rope/lock geometry rather than introducing a new composition |

`1600` and `1920` remain meaningful page-layout boundaries elsewhere, but they do not create Index-to-Silk rope/lock states by themselves.

If later browser inspection proves that the route genuinely must move at one of those widths, add an authored route state there **for both rope and lock together**. Do not add an anchor-only correction.

## Accepted wide reference treatment

The current accepted `1400..1599` proof is the visual reference for the wide state and should be extended upward rather than discarded at `1600`.

The accepted geometry at the reference width includes:

- lock centre x: `329px`;
- lock root transform: `translate(-50%, -50%) rotate(2.5deg) scale(.9)`;
- Silk rope wide handoff x: approximately `329.2px`;
- existing Index rope path retained;
- no faux background/contact rope elements inside `IndexSilkCrossingLock`;
- paint order: anchor < foreground knot < foreground ring occluder;
- the real route rope remains outside the lock component and connects into the knot at its authored endpoints.

Those numbers are an accepted implementation of the wide state, not a universal formula for smaller states.

## Paracord material law

The half-thickness rope treatment proven in the wide state becomes route-wide.

The rope is paracord-like material, not a heavy climbing cable. Its visual joke and physical character depend on that modest scale: the reader should be able to think, "that little line holds Silk's whole weight."

Implementation requirements:

- apply the thin-material treatment to Opening, Index and Silk route rope across all responsive states;
- keep the apparent rope diameter visually consistent across adjacent rope pieces within a state;
- preserve variant-specific compensation where source artwork has different intrinsic widths, as already proven for straight, bow and terminal variants;
- preserve the authored centreline and route endpoints when thinning the raster rope material;
- do not make smaller breakpoints revert to the old thick-cable look;
- do not increase rope thickness merely because the lock becomes smaller.

The current wide proof's approximately half-width material treatment is the starting point. Responsive authoring may make small variant-specific corrections only when needed to preserve the same perceived paracord diameter.

## Lock asset stack

The responsive pass reuses the same accepted/evaluated physical stack unless human review demonstrates that a specific responsive state cannot be made convincing with it:

1. accepted anchor / mineral-page wound;
2. generated foreground knot rope candidate;
3. deterministic foreground ring occluder derived from the exact accepted anchor canvas.

The ring occluder remains registered to the anchor because both derive from the same source geometry. They must scale, rotate and translate as one lockup.

This pass does not commission alternate responsive anchor artwork by default. New assets are a reconsideration path, not the initial implementation strategy.

## Ownership and geometry

`IndexSilkCrossingLock` remains the vertical slice that owns the internal relationship of:

- anchor image;
- foreground knot image;
- foreground ring occluder;
- internal top and bottom knot registration ports used for browser geometry verification.

The lock owns its internal layer relationship. It must not own either chapter's long route rope.

`ChapterCrossing` owns a dedicated placement wrapper around `IndexSilkCrossingLock`. That parent-owned wrapper controls the whole lock's position, uniform scale, rotation and z-order for the active route state. The proof implementation currently lets the lock root position itself; the responsive pass should remove that transitional seam rather than copy it into additional bands.

`IndexSilkCrossingLock` therefore renders as an opaque internally registered object at the parent boundary. It does not accept raw geometry props, caller `className` or descendant-control variables merely so the parent can place it.

Index owns its outgoing rope geometry. Silk owns its incoming rope geometry. Their authored endpoints target the lock's top and bottom knot endpoints respectively.

Do not reintroduce:

- a shared hidden CSS geometry-variable API across component boundaries;
- selector reach-through into `RopePiece` or lock descendants;
- caller `className` styling seams;
- `styled(ChildComponent)` placement seams;
- faux CSS rope wedges/strands inside the lock to hide bad chapter geometry;
- one universal Index-to-Silk x coordinate when the physical lock redirects the route.

Responsive values should live in one explicit, typed route/lock geometry authority rather than being duplicated as unrelated magic numbers across `IndexChapter`, `SilkTraversalComposition` and `IndexSilkCrossingLock`.

That geometry authority may contain values such as:

- lock x / y adjustment;
- lock uniform scale;
- lock rotation;
- Index rope endpoint/placement adjustments required by that route state;
- Silk rope endpoint/placement adjustments required by that route state.

It must not become a generic site-wide layout system. It is local to the Specialists Index-to-Silk physical route.

## Visual invariants at every responsive route state

Every authored state must satisfy all of these outcomes:

1. **Index connection:** the outgoing Index rope visually meets the knot's upper exit with no mineral-page gap and no obviously doubled rope edge.
2. **Top occlusion:** the rope appears to disappear naturally behind the damaged mineral page / anchor assembly before becoming the foreground knot.
3. **Knot readability:** the compact knot remains legible as slender paracord wrapping substantial metal hardware; it must not become a large decorative rope mass.
4. **Anchor readability:** steel ring, mineral destruction and red rope remain visually separable at actual rendered size.
5. **Ring occlusion:** the deterministic foreground ring piece paints over the knot at the natural lower/front arc so the rope genuinely appears to pass through and behind the ring.
6. **Silk connection:** the Silk-owned rope emerges from behind the lower ring at the knot's authored bottom exit without a visible lateral jump.
7. **Uniform asset transforms:** anchor, knot and ring occluder use uniform scaling; no skewing or independent anisotropic distortion.
8. **Paracord scale:** long route material remains thin and subordinate to the anchor hardware at every state.
9. **No anchor-only breakpoint:** if the rope route does not move, neither does the lock.
10. **No page overflow:** the authored lock and rope treatment must not introduce horizontal document overflow.
11. **Ceiling freeze:** geometry at `2561+` matches the authored `2560` state relative to the capped Specialists canvas.

Visual continuity matters more than preserving a mathematically identical x position between responsive states.

## Responsive authoring sequence

Implement and review states in this order:

1. **default `901..1399`** — the most important neighbouring regime below the accepted proof and the largest unresolved ordinary range;
2. **extend wide through `1600..2560`** — prove that the accepted wide route remains convincing through expanded and ultrawide page layouts without inventing unnecessary new route states;
3. **mid `721..900`**;
4. **compact landscape `391..720`**;
5. **narrow `320..390`**;
6. **ceiling `2561+`** — verify the frozen 2560 geometry.

At each state, inspect the actual rendered connection before authoring the next one. Do not tune all states blindly from arithmetic alone.

The boundary widths remain important evidence even when they do not create separate route states.

## Browser and visual review contract

Responsive geometry belongs in Playwright because the relevant truth is the rendered physical relationship, not a unit-level CSS string.

Cover at minimum:

`320, 390, 391, 720, 721, 900, 901, 1399, 1400, 1599, 1600, 1919, 1920, 2560, 2561`.

For each active route state, browser tests should verify:

- Index rope endpoint is within a conservative tolerance of the knot's top registration port;
- Silk rope entry is within a conservative tolerance of the knot's bottom registration port;
- rope apparent thickness remains in the paracord range and adjacent segments remain visually consistent;
- lock layer order is anchor < knot < foreground ring;
- fallback generic crossing anchor is absent wherever the authored lock is active;
- no horizontal page overflow;
- `2561` geometry is frozen relative to the capped canvas rather than drifting from `2560`.

Tests should not reintroduce the superseded assertion that Index and Silk must meet the same chapter-crossing coordinate.

Protected visual snapshots remain evidence, not auto-update targets. Any changed protected snapshot must be inspected against the approved responsive treatment before acceptance.

Human visual review remains authoritative for whether the physical illusion actually lands. Actual Chrome 200% zoom remains a final review gate for materially changed responsive states.

## Implementation constraints

- Keep the existing Specialists responsive vocabulary; do not invent arbitrary viewport breakpoints to rescue one screenshot.
- A rope/lock route state may use an existing page breakpoint only when the route actually changes there.
- Prefer one local typed responsive geometry map over duplicated CSS literals.
- Keep `IndexSilkCrossingLock` opaque at its parent boundary.
- Move whole-lock position/scale/rotation/z-order into a `ChapterCrossing`-owned wrapper so the implementation matches the repo vertical-slice ownership rule.
- Keep `RopePiece` dumb and reusable.
- Keep Index and Silk chapter ownership intact; the lock mediates their handoff rather than merging their rope ownership.
- Reuse the current accepted lock assets throughout the first responsive pass.
- Do not generate new images during implementation without fresh explicit authority.
- Do not modify the accepted `1400..1599` appearance except where required to extend the same wide route law upward.
- Do not commit, push or alter PR publication state without explicit authority.

## Reconsideration triggers

Revisit the same-asset responsive strategy only if one of these becomes true during in-browser authoring:

- the accepted anchor/knot stack becomes unreadably small at a supported state even after sensible uniform scaling;
- preserving convincing top and bottom rope connections requires severe overlap with unrelated content;
- an existing authored route genuinely changes at `1600` or `1920`, requiring rope and lock to move together;
- the knot asset's fixed internal geometry cannot connect cleanly at a state without faux rope patches or distortion;
- 200% zoom makes the physical connection fail at a protected viewport.

Those are reasons to author a new route state or consider a responsive-specific commissioned asset. They are not reasons to silently restore the old shared-port anchor model or the old thick rope treatment.
