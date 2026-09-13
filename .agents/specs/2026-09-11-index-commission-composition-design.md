# Index commission composition design

**Status:** Approved for implementation.

**Planning handoff readiness:** 9/10. The ownership boundary, responsive topology, visual invariants, test ownership, and scope are explicit; no implementation decision is left for the planner to invent.

## Goal

Make the Index commission evidence read and behave as one authored collage instead of three viewport-positioned siblings.

The new composition owns Commission 03, Commission 04, and the sticky assent note as one vertical slice. `IndexChapter` places that slice as a whole. The existing Patch and Index pair remain inside Commission 03 exactly as they are today, so they move with Commission 03 automatically and are never independently positioned by the new parent.

## Ownership decision

Add `IndexCommissionComposition` as the compositional owner of:

- `IndexObservation` (Commission 03);
- `IndexMacguffin` (Commission 04);
- `IndexAssentNote` (the sticky note bridging the two cells).

Keep those three existing components as opaque child slices. `IndexCommissionComposition` owns only their relative placement, overlap, responsive choreography, and stacking. It does not reach into their DOM or move the traversal figures out of `IndexObservation`.

`IndexChapter` must stop owning separate Observation, Macguffin, and Assent Note placements. It owns one parent wrapper around `IndexCommissionComposition` and may control only whole-composition position, size, scale, rotation, and z-order.

No caller-facing `className`, coordinate props, hidden CSS-variable control channel, or `styled(ChildComponent)` seam is introduced. A standard root-only `style?: React.CSSProperties` override remains acceptable for the new vertical slice.

## Responsive composition

For widths through 1920 CSS px, preserve the accepted visual relationships already present in the branch. The new component may own different internal offsets at existing responsive bands, but those offsets are internal implementation details.

At 1921 CSS px the page changes topology. The commission composition switches to the approved ultrawide arrangement as one unit. From 1921 upward:

- Commission 03, Commission 04, and the sticky note keep a fixed internal relationship;
- the relationship is based on the accepted tight-end ultrawide arrangement rather than three independent viewport trajectories;
- the whole commission composition may translate across the expanding right-hand field as viewport width increases;
- Patch and Index remain locked to Commission 03 because they remain owned and positioned by `IndexObservation`;
- the blue INDEX sheet and graph-paper composition remain outside this new component and continue to follow their separately approved ultrawide relationship.

The purpose of this change is to remove the current tendency for the three commission elements to stretch apart or require independent correction as the viewport grows.

## Visual invariants

The composed component must preserve all approved ultrawide invariants:

1. Commission 03 and Commission 04 visibly overlap by a modest amount at every supported width from 1921 through 2560.
2. Commission 04 may occlude no more than 50% of Patch's protected visible region in Commission 03.
3. Index's protected face region in Commission 03 is not occluded by Commission 04 or the sticky note.
4. The sticky note bridges the Commission 03/04 seam: its centre stays inside their horizontal overlap band and the note physically overlaps both art cells.
5. The separate traversal invariant remains unchanged: at 1920 the lower Patch is to the left of the upper Patch with the accepted minimum visible separation; at 1921+ the lower Patch is to the right with that minimum separation preserved. The figures never interpolate through one another.

These are visual outcomes, not caller APIs. Browser geometry tests may use conservative protected regions derived from the known authored artwork, but production components must not expose descendant coordinates to make the tests possible.

## Component and test shape

Add a colocated `IndexCommissionComposition.test.tsx` proving the new component contract: it owns the three child slices, forwards only a root `style` override, and does not expose a `className` seam.

Keep the existing `IndexObservation`, `IndexMacguffin`, and `IndexAssentNote` tests responsible for their own media, semantics, and internal traversal ownership. In particular, `IndexObservation.test.tsx` continues to prove that `patch-peer` and `index-inspect` belong to Commission 03.

Keep responsive geometry in Playwright. Update the existing Specialists ultrawide geometry coverage so it targets the same approved outcomes after the ownership refactor rather than depending on the old parent-level placement implementation.

No visual snapshot is updated merely to make the refactor pass. Any visual-regression change must be inspected as design evidence.

## Scope boundary

This work changes ownership and keeps the current approved Index visual direction. It does not add later Specialist chapters, redesign Commission 03/04 artwork, change the traversal assets, alter the 1920-and-below composition intentionally, or introduce a new state/store abstraction.
