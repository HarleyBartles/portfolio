# Phase 8 Lawful Heist homepage proof v2 review

**Status:** Focused revision requested after Cloud/Harley browser review. The responsive art direction is accepted. One structural K-overprint correction remains before the proof is ready to close, and title typography now gets its own inspection surface.

## Accepted from proof v2

Keep the current three-state responsive model:

1. **Wide desktop:** simultaneous irregular spread/collage.
2. **Intermediate:** Silk eye strip first, then folder-led composition with live title/proposition/link carried in the folder negative space, then Rollback and Receipt.
3. **Narrow mobile:** separate live title block, Silk eye strip, completed folder, Rollback, Receipt.

The current breakpoint locations and breakpoint-specific composition decisions are accepted. The current mobile sequence is also accepted as a deliberate authored stack rather than a failed version of the intermediate composition.

Keep the complete irregular off-white carrier on all four sides of supporting inset images. Uneven carrier thickness, slight rotation and misregistration remain desirable.

Keep the existing mobile and intermediate art-direction freedom: responsive source assets may change crop/composition at breakpoints where that improves the authored result.

## Required structural correction: K is an overprint, never layout

The current K treatment is still reserving vertical layout space at responsive widths. This creates an artificial pale gap between the folder and Rollback beat.

That is rejected.

**Settled rule:** Klause's K impression is an overprint and must never participate in document flow or reserve layout height at any breakpoint.

Implementation intent:

- the semantic/story DOM should flow as if the K did not exist geometrically;
- the responsive sequence remains folder -> intentional normal gap -> Rollback -> intentional normal gap -> Receipt;
- place the K on an independent compositional plane, normally absolute-positioned relative to the relevant Heist composition wrapper;
- allow it to cross underlying element boundaries without pushing those elements apart;
- at the intermediate state, use it to bind the folder and following Rollback beat by physically crossing that seam;
- at narrow mobile, position it independently where it gives the strongest punctuation while still reserving zero DOM space;
- preserve sensible clipping/overflow behaviour and keep it away from materially important folder content;
- the K remains decorative/earned visual punctuation, not required semantic content.

Do not solve this by adding negative margins to compensate for a flow-space K. Remove the layout participation itself.

## Lower responsive sequence review

Once the K's phantom layout space is mentally removed, the lower sequence is accepted:

- Rollback earns its own beat;
- Receipt earns its own beat;
- both have enough scale to remain legible and consequential at narrow widths;
- their paper carriers now separate them cleanly from the shared ground.

No additional compositional rewrite is requested for the lower sequence.

## Next proof pass

Revise the isolated proof only:

1. remove all K contribution to document flow;
2. reposition the K as a true overprint at intermediate and mobile widths;
3. preserve the accepted desktop composition and current responsive state model;
4. re-run the responsive/reflow checks that could be affected by the positioning change;
5. keep production homepage integration out of scope.

In parallel, create the separate Lawful Heist title-font inspection surface described in `phase-8-lawful-heist-title-font-proof-brief.md`.
