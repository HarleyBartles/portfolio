# Phase 8 Lawful Heist homepage proof note

**Status:** Ready for Cloud/Harley re-review. Proof v2 preserves the accepted desktop composition, adds the settled intermediate and narrow authored states, and remains isolated from production.

## Chosen composition

The proof is an irregular cover/spread composition built around one bespoke overhead completed-folder plate. `Lawful Heist` remains real Source Sans 3 DOM text in the quiet left field. Three unequal peripheral insets supply consequential story beats rather than six equal character portraits:

- Silk's eyes open in restrained surprise when the route survives her test;
- Rollback's gloved hand engages the amber lockdown control;
- Receipt takes the record as it prints.

Klause's produced K impression is a genuine transparent red overprint. The folder stays decisively dominant, the insets add narrative charge second, and the title/link remain ordinary accessible web content.

The composition is specific to Lawful Heist. It is not a reusable Patch component or a miniature of the full route.

## Asset attempts and acceptance

- Completed folder plate: attempt **1/5 accepted**. The 3:2 image gives the folder decisive right-hand dominance, preserves all six material languages, and leaves quiet dark space for live title copy.
- Transparent K overprint: **2/5 generation attempts used**. Attempt 1 preserved the correct impression but baked in a checkerboard. Attempt 2 provided a chroma intermediate. The final asset uses deterministic luminance-to-alpha extraction from the stronger first impression, with fixed Heist-red ink RGB and genuine PNG alpha. It contains no paper carrier, stamp tool, hand, ink pad or wax seal.
- Silk reaction strip: attempt 1 was rejected because narrowed eyes read as scrutiny/annoyance. Attempt **2/5 accepted** after opening and lifting the simple eye shapes enough to register restrained surprise while preserving Silk's approved identity.
- Rollback lockdown inset: attempt **1/5 accepted**. The hand/control cause-and-effect is immediate and calm rather than militarised or spectacular.
- Receipt printing inset: **4/5 generation attempts inspected**. Attempt 1 had the strongest machine/hand composition but showed an arm/hand contradiction in the full frame. Attempts 2 and 4 explored anatomy repairs but weakened the composition; attempt 3 removed the hand and therefore lost the requested action. The proof deliberately returns to attempt 1 and uses a much tighter browser crop around the correct hand, paper and printer mouth so the contradictory forearm is not part of the composed asset.

Full source and derivative custody is recorded in `phase-8-lawful-heist-homepage-proof-assets/asset-custody.md`.

The existing generation ceiling remains in force for the revision: local Sol may assess, reject and regenerate any required asset up to **five total generation attempts per asset**, accepting early when it lands and stopping honestly at the ceiling.

Proof v2 used **zero additional generation attempts**. The accepted bespoke assets retained their intended semantic jobs at all three authored states; layout-specific crops and placement were sufficient, so breakpoint-only raster variants were not warranted.

## Proof v2 implementation

- Wide desktop retains the accepted simultaneous spread: live title in the dark left field, folder dominant, eye strip intruding above the title, two unequal action insets, and K crossing the comic/pale-ground seam.
- Every supporting inset now has its own complete off-white carrier on all four sides. Unequal padding, rotation and polygon edges keep the carriers related without making them mechanically identical.
- Intermediate/tablet is a distinct composition: Silk's eye strip leads; the completed folder carries the live title, proposition and link on a high-opacity Heist-dark field; K is an absolute zero-flow overprint across the folder/Rollback seam; Rollback and Receipt follow as unequal story beats.
- Narrow mobile is separately authored: live title block, Silk eye strip, completed folder, K punctuation, Rollback, then Receipt. It does not inherit the intermediate text-over-folder treatment.
- All title, proposition and link copy remains live DOM text. No production route or shared Patch template was changed.

## Cloud/Harley review outcome

### Desktop / wide state — accepted direction

The desktop proof passes the art-direction gate. Preserve its simultaneous irregular spread/collage model: dominant completed folder, large live title, Silk eye interruption, Rollback action inset, Receipt inset and Klause K overprint occupying one bounded field.

Do not redesign the desktop composition in the revision unless a concrete implementation problem forces it.

One framing polish rule is settled for all desktop supporting insets:

> Every Heist inset must expose an off-white paper/frame carrier on all four sides.

The carrier may be ragged, uneven, fractionally rotated and slightly misregistered relative to the image. Those irregularities are desirable. What is not desirable is losing the carrier entirely on one or more sides so that an inset visually blurs into the underlying hero image. Receipt is the clearest current failure case. The rule is **consistent framing principle, deliberately inconsistent execution**.

### Responsive model — three authored states

The proof now has three intended art-direction states rather than a single desktop-to-stack collapse.

#### 1. Wide desktop: simultaneous composition

Preserve the accepted desktop spread. All principal visual planes may coexist in one field.

#### 2. Intermediate / tablet-ish: compressed authored composition

The current first post-desktop breakpoint is too literal a stack and needs another composition pass.

Use this settled order and relationship:

1. **Silk eye strip first** as the visual hook/interruption.
2. **Completed folder as the main plate**, carrying the live `Adventures of Patch` kicker, `Lawful Heist` title, `The crew is in.` proposition and `Meet the crew` link in the folder image's available negative space.
3. **Rollback action beat**.
4. **Receipt beat**.

The live text over the folder must remain DOM text. It may reduce modestly from desktop scale. Give it a high-opacity Heist-dark backing field so it reads naturally over the existing dark negative space and remains legible if the text block begins to spill onto the folder as the intermediate viewport narrows. Prefer a simple dark alpha field over glass/blur effects.

At this intermediate state, **Klause's K stamp moves off the Receipt ending**. Slam it across the completed-folder composition so it crosses the folder and the following inset/beat. It should behave as a structural overprint that binds stacked elements, not as a footer seal or floating badge. Keep it clear of materially important folder information and subordinate to the folder/title hierarchy.

This state should still feel composed, not like a responsive gallery.

#### 3. Narrow mobile: deliberately linear authored sequence

At normal phone widths, stop trying to preserve the intermediate text-over-folder treatment. Mobile earns its own clear reading sequence:

1. separate live title/text block;
2. Silk eye strip;
3. completed-folder image;
4. Rollback beat;
5. Receipt beat.

The eye strip remains above the folder at mobile width because it restores a deliberate visual story instead of beginning with the explanatory object.

The K may be repositioned for the narrow composition rather than mechanically inheriting either desktop or intermediate coordinates. Preserve its job as an earned Heist-native overprint/punctuation mark; do not force it to remain attached to Receipt.

### Breakpoint-specific art assets are in scope

Responsive art direction is **not** required to reuse exactly the same raster composition at every breakpoint.

Local Sol may commission or derive breakpoint-specific assets where they materially improve the proof: a mobile-authored folder plate, a shallower Silk strip, tighter Rollback or Receipt framing, or another proportionally appropriate derivative.

Use responsive `<picture>` / `source media` art direction when two assets depict the same semantic image with different crop/composition. The portfolio already uses `<picture>` for Patch media format selection; production implementation may extend that pattern for viewport art direction. If the responsive asset changes the actual depicted story beat rather than merely its crop/composition, author it as a distinct semantic figure instead of hiding that change behind one shared `alt` contract.

### Missing-media behaviour — accepted with minor polish

The `?media=off` state passes the resilience gate:

- title and onward route remain usable;
- supporting/decorative visual fragments disappear rather than leaving dead reserved rectangles;
- only the load-bearing completed-folder story receives a plain-language fallback;
- the fallback copy explains the semantic job of the missing image rather than saying generic `image unavailable`.

The fallback surface may be slightly less vertically generous in a production pass, but this is polish rather than a conceptual revision.

### Accessibility and semantic boundary

Preserve real DOM title, proposition and link text. Generated/raster assets should enrich the composition, not carry the only understandable version of the invitation. The no-media state remains the useful test: art should make the section richer, not intelligible for the first time.

No speech bubbles. Do not introduce comic dialogue grammar merely because the composition borrows comic cover/spread syntax.

## Review surface

Open:

`/docs/editorial-drafts/phase-8/phase-8-lawful-heist-homepage-proof.html`

The production homepage, production Lawful Heist route, and all other Patch treatments remain unchanged during this proof iteration.

## Browser QA evidence

The first proof pass established:

- Wide desktop: inspected at 1440 × 1100; all images loaded, console errors 0, horizontal overflow 0.
- Narrow editions: inspected at 768, 390 and 320 CSS pixels; title, folder and supporting beats recompose with horizontal overflow 0.
- Zoom/reflow: inspected at a 720 CSS-pixel viewport with 2× device scale as the 1440-pixel/200% equivalent; horizontal overflow 0.
- Keyboard order: `Skip to proof` → `Open live adventure` → `Meet the crew`.
- Reduced motion: browser context reported `prefers-reduced-motion: reduce`; the proof is static and exposes the same resolved state.
- Missing media: `?media=off` hides the hero, insets and overprint, preserves title/navigation, and exposes one ordered plain-language fallback without a dead media block.

Because the responsive composition contract changed, proof v2 re-ran the relevant viewport, reflow and missing-media checks.

Proof v2 re-ran the evidence pass on 31 August 2026:

- Responsive/reflow: inspected at 320, 390, 520, 521, 768, 1024, 1099, 1100 and 1440 CSS pixels. The narrow/intermediate boundary and intermediate/wide boundary both resolve into their intended authored states, with no horizontal overflow.
- Media integrity: all five proof images completed with non-zero natural dimensions at every inspected width; failed requests, console errors and page errors were all zero.
- Four-side carriers: visually inspected at 320, 390, 768, 1024, 1099, 1100 and 1440 CSS pixels. Silk, Rollback and Receipt retain visible off-white carrier material on every edge.
- Keyboard order: `Skip to proof` → `Open live adventure` → `Meet the crew`.
- Reduced motion and zoom-equivalent reflow: a 720 CSS-pixel viewport at 2× device scale, representing a 1440-pixel viewport at 200%, reported reduced motion active, no animations, no horizontal overflow and all images loaded.
- Missing media: `?media=off` at the intermediate width preserves the live title and onward route, removes the composed media planes, exposes the single completed-folder fallback after the title, and has no horizontal overflow.

## Review handoff

**Ready for Cloud/Harley re-review — Lawful Heist homepage proof v2**

Review the isolated browser proof only. Production homepage integration and any reusable Patch visual system remain out of scope.
