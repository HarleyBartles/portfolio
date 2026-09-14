# Silk Layout Pass Design

Status: Approved design, ready for implementation planning after human review of this written spec.

Date: 2026-09-14

Branch context: `codex/port-17-silk-continuation`

## Goal

Re-author the Silk chapter layout so the two major aperture compositions read as one deliberate traversal through a damaged wall rather than two independently placed images. Use the rope and Silk as the continuity spine, use the current placeholder beats as part of the composition, and give narrow mobile an explicitly authored vertical treatment rather than a shrunken desktop layout.

This is a layout pass over the existing Silk chapter and shared aperture compositor. It does not commission or generate new artwork.

## Design authority

The user-approved design for this pass is:

- Aperture 1 and Aperture 2 must never overlap. A visible strip of the mineral page must remain between the bottom of Aperture 1 and the top of Aperture 2 at every authored width.
- Silk must remain attached to the rope. Layout work must not solve composition problems by independently moving Silk away from her rope registration.
- The rope must cross at least one major aperture at every authored width. Crossing both is preferred where the responsive geometry allows it.
- Silk touching both apertures is desirable but is not an invariant. At wide widths, losing the literal entry into Aperture 2 is acceptable if the traversal still reads clearly.
- At wide widths, Aperture 2 moves to the right of Aperture 1 to use the currently dead horizontal field and create a left-to-right zig-zag through the chapter.
- The existing lower placeholder beats, including `ReceiptPeekthrough`, the Commission 08 reaction eyes/slit, and the Commission 09 downstream crack/handoff shell, remain provisional content but become intentional parts of the chapter composition.
- At `390px` and below, the chapter intro card moves above Aperture 1 and overlaps its outer rubble slightly. There must not be a large empty gutter between the intro and the first aperture.
- At `390px` and below, both major aperture frames stack vertically and intentionally overspill the viewport on the left and right.
- At `390px` and below, the current Commission 07 landscape frame is used as a temporary portrait surrogate by rotating the frame treatment 90 degrees. The world behind it remains upright and continues to parallax.
- Image generation is out of scope. The existing candidate frame remains the review asset for this pass.

## Existing ownership model

Keep the current component boundary.

- `SilkChapter` owns page-level placement, responsive choreography, z-order between chapter beats, and the relationship between Aperture 1, Silk/rope, Aperture 2, the story card, and the lower placeholders.
- `SilkTraversalComposition` owns Silk-to-rope registration and the rope material itself.
- `SilkApertureComposition` owns each aperture frame, its world viewport, world layer, and parallax internals.
- The parent may place and size a whole aperture composition. It must not reach into aperture internals through caller classes, hidden CSS variables, or descendant geometry props.

Do not introduce a new generic aperture-stack abstraction for this pass. The chapter-specific responsive choreography belongs in the existing Silk chapter seam.

## Major aperture contract

Commission 05 is Aperture 1. Commission 07 review is Aperture 2.

Their rendered frame bounds must remain vertically disjoint at all authored widths. The invariant is a strictly positive visible mineral-page gutter:

`aperture2.top > aperture1.bottom`

The gutter should read as a strip of intact wall between separate breaches, not as a large blank section. Exact spacing is visual-tuning territory for implementation, but the layout must never collapse to touching or overlapping frames.

The aperture placement should be authored around the existing rope/Silk traversal rather than moving Silk independently. The first implementation lever is aperture placement. Rope-axis movement is secondary and may be used only as a breakpoint-specific composition adjustment if required to satisfy the rope-crossing invariant. Any rope movement must carry Silk with it and must not break the traversal rope port.

Final rope-anchor retuning is deferred to a later pass if the new layout demonstrates that it is worthwhile.

## Responsive choreography

Use the existing Specialists responsive bands as the authored layout bands.

### Wide and ultrawide: `>= 1400px`

Use the horizontal field deliberately.

- Aperture 1 remains broadly left/centre.
- Aperture 2 moves to the right of Aperture 1 rather than sitting below-left.
- Preserve a visible vertical mineral gutter between the two frame bounds.
- Silk stays attached to the rope and continues to descend through the broken-wall field.
- Silk does not need to touch Aperture 2 at these widths.
- The rope must still cross at least one major aperture; crossing both is preferred if it does not weaken the wide composition.
- Use the receipt punch-through, reaction eyes/slit, and downstream crack/handoff placeholder to continue the zig-zag and prevent the lower chapter from collapsing into unused mineral space.
- Do not fill the width uniformly. Large mineral areas are allowed when they reinforce the reading path; the goal is to distribute meaningful beats across the field rather than cluster them on one side.

### Mid/tablet: `721px` to `1399px`

Progressively reduce the lateral separation between the two major apertures as horizontal room disappears.

- Preserve the non-overlap gutter invariant.
- Keep Silk attached to the rope.
- Keep the rope crossing at least one major aperture.
- Prefer Silk visually bridging the two apertures where the geometry affords it, but do not force contact at the cost of awkward frame overlap or a broken traversal.
- Let the lower placeholders continue the alternating rhythm rather than reverting to a simple centered vertical list.

### Compact landscape: `391px` to `720px`

Treat this as a transition band, not a scaled desktop composition.

- Maintain a stagger between Aperture 1 and Aperture 2, but reduce lateral ambition enough to keep both breaches legible.
- Preserve a visible mineral gutter between the major frames.
- Keep the rope as the main continuity line.
- Prefer the rope to cross both major apertures in this band if the current traversal axis permits it cleanly.
- Keep the story card associated with the opening rather than allowing it to create a large empty interval before Aperture 2.

### Narrow: `<= 390px`

Use an explicit vertical narrative stack.

The intended order is:

1. chapter name/opening furniture;
2. intro/story card;
3. Aperture 1;
4. Silk and rope descending through the breach sequence;
5. a small visible strip of mineral wall;
6. Aperture 2 using the temporary rotated portrait treatment;
7. receipt punch-through, reaction eyes/slit, and the downstream placeholder beats.

The intro card sits above Aperture 1 and overlaps only the outer plaster/rubble region. The overlap should be modest, approximately `12px` to `24px` during tuning, and must not cover the meaningful world opening. Keep the existing card shadow and reading-column inset so the card still reads as authored page furniture while the aperture rubble extends beyond the viewport.

Both major aperture compositions intentionally overspill the viewport horizontally. Their left and right rubble edges should reach beyond the viewport rather than resolving as neat contained cards.

The rope should read as one continuous vertical traversal through this stack. This is the band where crossing both major apertures is most valuable.

## Commission 07 temporary portrait treatment

At `390px` and below, use the existing `1671 x 941` Commission 07 review frame as a temporary portrait stand-in. Do not create or generate a new asset for this pass.

Rotate only the frame treatment. Do not rotate the mocked world behind it.

The composition container should adopt the rotated portrait aspect ratio:

`941 / 1671`

The world viewport remains an ordinary upright clipping rectangle inside that portrait composition. Its narrow-band geometry must correspond to the rotated aperture opening so the same world layer can continue to parallax vertically.

The current landscape viewport rectangle in source pixels is:

- left: `112`
- right edge: `1522`
- top: `166`
- bottom edge: `812`

For a clockwise 90-degree rotation into a `941 x 1671` portrait coordinate system, the equivalent viewport insets are:

- top: `112px`
- right: `166px`
- bottom: `149px`
- left: `129px`

For an anticlockwise 90-degree rotation, the equivalent insets are:

- top: `149px`
- right: `129px`
- bottom: `112px`
- left: `166px`

Start with the clockwise rotation and its matching viewport mapping. Live browser review may flip to anticlockwise only if the clockwise rubble silhouette creates a clear composition problem with the rope or viewport. Any such flip must use the matching anticlockwise mapping and be locked by geometry tests; it is a tuning correction, not a new layout concept.

The review world may use additional narrow-band overscan or scale if needed to preserve the existing parallax travel without exposing a hard edge. Derive the minimum required overscan from the actual rotated viewport and travel rather than guessing a decorative zoom value.

Reduced motion must continue to disable parallax movement.

## Story card contract

Above `390px`, the story card remains a floating chapter beat and may move to serve the aperture choreography.

At `390px` and below:

- move it before Aperture 1 in the visual composition;
- keep it above the frame in z-order;
- let it overlap only the outer rubble/plaster edge by roughly `12px` to `24px` during visual tuning;
- avoid a large mineral gap between card and aperture;
- keep the meaningful aperture world opening unobscured;
- preserve readable padding and the existing editorial card treatment.

## Placeholder beat contract

Do not remove or redesign the current lower placeholders in this pass.

Use them compositionally:

- `ReceiptPeekthrough` is a compact punctuation beat after the large apertures;
- the Commission 08 `ReactionAperturePlacement` eyes/slit is a long, shallow interruption that changes the vertical rhythm;
- the Commission 09 `HandoffBeat` crack/handoff shell remains provisional but should occupy deliberate page space rather than behave like an ignored TODO block.

Their exact final art and narrative content remain deferred. This pass is allowed to move and scale their current shells so the chapter already has the intended cadence.

## Rope and Silk invariants

The layout must preserve the existing traversal attachment contract:

- Silk's traversal rope port remains registered to the rope join/axis.
- Moving the rope means moving Silk with it as one traversal composition.
- Silk may overlap aperture frames where that makes the traversal legible.
- The rope must geometrically intersect at least one of the two major aperture frame/composition bounds at every authored review width.
- A two-aperture rope crossing is preferred, especially at `<= 720px`, but is not required if it creates a weaker wide composition.

Silk touching both major apertures is a visual-review preference, not an automated invariant. Wide layouts may deliberately sacrifice contact with Aperture 2.

## Files and seams expected to change

Primary implementation surfaces:

- `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.styles.ts`
- `src/client/src/features/patch-showcase/usual-specialists/SilkApertureComposition.styles.ts`
- `src/client/src/features/patch-showcase/usual-specialists/silkCommission07ReviewGeometry.ts`
- `src/client/e2e/project-story.spec.ts`

Possible supporting changes when required by the implementation:

- `SilkApertureComposition.tsx` if the rotated review-frame treatment needs an explicit semantic variant state rather than styling alone;
- `SilkApertureComposition.test.tsx` and `silkCommission07ReviewGeometry.test.ts` for the portrait mapping;
- `SilkChapter.test.tsx` for structural ownership only;
- `SilkTraversalComposition.tsx` only if a breakpoint-specific whole-traversal placement adjustment is necessary. Do not split Silk from the rope.

Do not broaden this pass into a redesign of Index, route structure, the shared page shell, or unrelated Specialists chapters.

## Automated proof

Update the existing Silk Playwright geometry coverage instead of creating a second overlapping suite.

At minimum, exercise the existing authored boundary set around:

- `320`
- `390`
- `391`
- `720`
- `721`
- `900`
- `901`
- `1400`
- `1600`
- `1920`
- `2560`

The browser-level geometry proof should establish:

1. Aperture 1 and Aperture 2 are both visible.
2. `aperture2.top > aperture1.bottom` at every checked width.
3. At `<=390`, both aperture compositions overspill the viewport horizontally, with at least `20px` of frame/composition extent beyond each viewport edge.
4. At `<=390`, Aperture 2 uses the portrait composition ratio and the selected rotated viewport mapping.
5. The story card precedes Aperture 1 vertically at `<=390` and overlaps its outer frame modestly rather than leaving a large gap.
6. Silk remains registered to the rope using the existing traversal/join ports.
7. The rope intersects at least one major aperture at every checked width.
8. The current Commission 07 world still parallax-scrolls without edge exposure and reduced motion still disables movement.
9. No horizontal document overflow is introduced by the deliberate rubble overspill.

Do not turn the preferred "Silk touches both apertures" relationship into a brittle automated invariant. Review that relationship visually by band.

## Visual review

This is a material composition change. Review at least:

- `2560`
- `1920`
- `1600`
- `1440`
- `901`
- `900`
- `768`
- `721`
- `720`
- `391`
- `390`
- `320`

Also perform the repository-required real 200% browser-zoom review and reduced-motion check.

The visual review should answer:

- Does the wide chapter use the horizontal field without becoming uniformly busy?
- Does Aperture 2 on the right create a deliberate traversal rather than a disconnected second picture?
- Does the mineral gutter make the two breaches read as separate holes through one wall?
- Does the rope visibly connect the damaged sections?
- Does Silk still read as attached to and descending on the rope?
- At narrow widths, does the intro card feel deliberately tucked into Aperture 1 rather than separated by a dead gap or pasted over the opening?
- Does the rotated Commission 07 frame read credibly enough as a temporary portrait surrogate until a dedicated portrait asset is commissioned?
- Do the receipt, eyes/slit, and downstream placeholder beats create useful cadence below the major apertures?

## Non-goals

- No image generation.
- No new commissioned artwork.
- No acceptance of the Commission 07 candidate as final production art.
- No change to accepted-image custody or provenance status unless implementation itself changes an asset, which this design does not require.
- No final rope-anchor polish pass.
- No redesign of the Commission 08 eyes/slit, receipt punch-through, or downstream placeholder content.
- No route, metadata, sitemap, or canonical-publication changes.
- No redesign of other Specialists chapters.

## Completion criteria

The layout pass is ready for review when:

- both major apertures remain separated by visible mineral ground at every authored width;
- Silk remains attached to the rope;
- the rope crosses at least one major aperture everywhere and crosses both where the responsive layout affords it cleanly;
- Aperture 2 uses the right-hand wide composition at `>=1400px`;
- the current lower placeholders participate in the chapter rhythm;
- `<=390px` uses the authored intro-card overlap, vertically stacked overspilling apertures, and rotated Commission 07 portrait surrogate with correct upright parallax viewport mapping;
- the relevant focused Vitest and Playwright checks pass;
- the protected visual review widths, reduced motion, and real 200% zoom have been inspected without introducing a regression outside this approved layout change.
