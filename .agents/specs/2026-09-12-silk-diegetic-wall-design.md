# Silk Diegetic Wall Design

Status: Approved direction, 12 September 2026

## Problem

The first Silk React wireframe proved the story beats and responsive choreography, but its rectangular image cells make the chapter feel too polite. Silk's canonical visual idea is more aggressive: she pressure-tests the route by breaking through the safehouse and through the page structure that contains it.

The accepted new direction treats the Portfolio's cool-mineral page surface as literal safehouse plaster. Silk reveals that truth by anchoring into it, cracking it, opening apertures through it and moving between the world behind the wall and the editorial surface in front.

The old Silk disposable-wireframe composition is therefore superseded as a layout authority. It remains historical evidence for story order and discovered beats only.

## Product direction

Silk is the chapter where the web page stops behaving like a set of panels.

The reader should experience this escalation:

1. Index ends on the existing accepted mineral page composition.
2. A physical route anchor bites into that mineral surface and exposes a restrained amount of brick beneath the plaster.
3. A broad irregular aperture opens through the page. Commission 05 is not a panel on top of the page; it is the safehouse corridor visible behind that hole.
4. The clean `SILK` wordmark remains printed on the mineral surface. The red route rope physically crosses its glyph bodies.
5. Commission 06 places Silk across the aperture threshold so part of her reads inside the safehouse depth plane and part of her reads on the page plane.
6. Silk continues down the page on the rope and opens a second structural breach. Commission 07 is another world/depth plate behind that aperture rather than a rectangular panel.
7. Receipt appears through a smaller fused smashed-wall peek-through elsewhere in the same plaster/brick system.
8. The accepted surprised-eyes image becomes a narrow slit through the plaster rather than a framed reaction cell.
9. Commission 09 remains a separate handoff beat, but its final composition is allowed to violate ordinary panel framing and should be designed around the page/world boundary rather than placed as a polite rectangle beneath Commission 08.
10. The Silk rope resolves naturally into its endpoint and loose curl.

The mineral page is therefore diegetic: it is painted/plastered safehouse wall. Broken areas reveal ordinary safehouse brick/lath and interior depth. This rule is specific enough to make Silk's chapter memorable without requiring the rest of the portfolio to become a literal wall texture.

## Preserve from the previous work

The following decisions remain authoritative:

* Opening → Index → Silk source order.
* Index remains visually and geometrically protected. Do not redesign it to match Silk.
* The page-owned responsive vocabulary in `specialistsResponsive.ts` remains authoritative.
* No authored 620px Silk breakpoint.
* 1920px inclusive remains the first ultrawide state.
* Internal authored geometry freezes above the 2560px canvas ceiling.
* The `SILK` mark remains clean Chassis-derived outlined SVG artwork with no distortion or distress.
* A real red rope crosses through the body of the `SILK` mark.
* Commission 06 contains zero rope pixels and must read as physically attached to the independently composed rope.
* Rope implementation is modular: local chapter-owned rope segments joined at deliberate mineral-page anchor events.
* Chapter-to-chapter rope joins are owned by a dedicated `ChapterCrossing` transition primitive rather than either adjacent chapter. The crossing owns the mineral transition surface, horizontal rule, shared rope seam coordinate and future-anchor placeholder.
* The chapter navigation rail sits after the Opening and before the Opening→Index crossing. It owns only navigation presentation, uses the same mineral page surface as the surrounding route rather than a special cream/paper treatment, paints above the rope, and never owns rope or anchor geometry. The Opening→Index anchor therefore lands on mineral page below the nav rather than on the full-colour threshold image.
* Receipt remains one fused transparent Receipt + smashed aperture asset, not independently registered character/aperture layers.
* The accepted `1983 × 793` surprised-eyes image remains reuse-first authority for Commission 08.
* Parents own whole-child geometry; vertical-slice children own internals; no caller `className`, selector reach-through, hidden geometry variables or `styled(ChildComponent)` seam.

## Layer model

Silk's chapter uses five explicit paint strata, from back to front:

1. **Behind-wall world plane** — Commission 05/07 environment plates visible only through authored apertures. This plane may move subtly with scroll.
2. **Mineral page / aperture plane** — the normal route surface, broken plaster/brick rims, clean `SILK` mark, chapter numeral, editorial copy and story card.
3. **Silk rope plane** — the chapter-owned physical red route, painted above every aperture/frame and above the `SILK` wordmark wherever it crosses them.
4. **Silk cutout plane** — Commission 06's transparent traversal asset, painted above the rope and therefore also above the aperture/frame beneath it.
5. **Anchor hardware plane** — physical rope anchors painted above the rope at route handoff/attachment points.

The implementation should make those strata explicit enough to test. Do not fake depth by drawing every layer into one scene image, and do not reintroduce a foreground rim above the Silk rope or cutout merely to simulate threshold depth.

## Aperture architecture

Create a focused Silk aperture primitive owned by the Silk vertical slice. It is not a portfolio-wide generic component.

The primitive owns:

* clipping the world/depth child into an irregular authored hole;
* a stable page-plane aperture boundary;
* a separate wall-rim layer above the world plate but below the chapter-owned Silk rope/cutout stack;
* a bounded transform target for subtle parallax;
* reduced-motion fallback;
* data hooks for browser geometry/motion tests.

The parent Silk composition owns each aperture's placement, size, rotation and chapter-level z-order. The aperture child owns its internal clipping, world/rim relationship and world-plane transform, but its rim must remain below the Silk rope/cutout strata defined above.

Desktop, tablet and compact authored states may use different aperture silhouettes. Do not merely scale one tear if doing so destroys the intended composition.

### Commission 05 locked composition amendment — 13 September 2026

The first commissioned mineral-wall rim proved the page-as-wall direction but also exposed a stricter physical contract. Commission 05 is no longer implemented by stretching the generic aperture primitive to whatever rectangle the page gives it. It is a dedicated composition with an intrinsic design coordinate system derived from the selected `1672 × 941` rim asset.

The parent Silk chapter owns the whole Commission 05 object's page placement, rendered width and ordinary page stacking. `SilkCommission05Composition` owns its intrinsic aspect ratio, internal world viewport, scene overscan, parallax target and broken-wall rim. It does **not** own Silk or the rope. The parent must not set an independent child height, skew the child or reach through to its geometry.

The selected rim is a transparent RGBA asset with transparent page-facing space outside the broken plaster and a transparent aperture through the centre. The world plate therefore cannot simply fill the rim's entire bounding box: doing so allows world pixels to appear through the outer transparency. Instead, Commission 05 owns an invisible rectangular **world viewport** whose complete perimeter sits beneath opaque wall material. The rim sits above that viewport and hides the viewport's rectangular edges while its central transparency reveals the world.

The initially selected regular-treatment frame was tested against this stronger contract and rejected for Commission 05: across the useful aperture width its best top-edge row was only about `96.7%` covered at alpha `>=64`, including a `13px` transparent gap. That is enough to expose a straight scene-plate crop edge and break the wall illusion.

The heavy-treatment `1672 × 941` frame is the active Commission 05 evaluation candidate. The first exact-edge proof (`alpha >=64`, `x=200..1500`, `y=118..797`) still allowed a thin diagnostic strip to show at the bottom because exact mathematical coverage was not enough visual occlusion. The strengthened contract now requires an **8px inward coverage band** on all four sides at `alpha >=250`. The proven viewport is `x=200..1500`, `y=130..820`, approximately `11.96%` left, `10.23%` right, `13.82%` top and `12.75%` bottom. The source-alpha contract tests the complete 8px band so a later asset or CSS edit cannot move a hard crop edge or diagnostic edge into visible transparency unnoticed.

The behind-wall scene is an ordinary rectangular landscape plate, not another irregular mask. For the wireframe proof it is a deliberately plain corridor-coloured diagnostic rectangle with a conspicuous source-perimeter band. That band should never be visible in a correct composition. Later Commission 05 art replaces only this internal scene plate.

The scene plate is rendered larger than the world viewport. `object-fit: cover` semantics own the crop for real imagery; the scene box supplies explicit hidden overscan above and below the viewport so the parallax transform never exposes a source edge. Parallax travel is clamped to the smaller of the authored motion request and the measured rendered bleed after a safety margin. If the available bleed becomes insufficient at a responsive state, motion reduces rather than exposing the scene edge.

The physical invariants are:

* the rim and whole Commission 05 composition always scale uniformly at `1672 / 941`;
* neither React nor CSS may independently stretch width and height or skew the rim;
* the world viewport's rectangular perimeter plus an 8px inward safety band remain under near-opaque frame material (`alpha >=250`), sealing outer transparency away from the scene plate;
* the scene plate covers the viewport plus hidden overscan, and its source perimeter never becomes visible through the central aperture;
* world pixels can never appear through the rim's outer transparency;
* only the scene plate translates for parallax; viewport and rim remain page-locked;
* Commission 05 owns no traversal/crossing child; Silk and the rope are chapter-level physical layers so they can cross multiple page objects without being trapped inside the frame's stacking context;
* reduced motion produces zero relative scene travel;
* responsive page placement uses only the existing Specialists responsive vocabulary, and above 2560 the authored geometry still freezes.

For the current wireframe only, widths `391px` and above keep the landscape `1672 / 941` frame. At the existing narrow boundary (`390px` and below), the same heavy frame is rotated 90 degrees as a temporary portrait proxy, the world viewport coordinates rotate with it, and the scene plate remains upright. Production narrow art will be separately authored in portrait rather than shipping this rotated proxy.

The generic `SilkWallAperture` remains appropriate for the still-provisional Commission 07 breach and Commission 08 slit. Do not force Commission 05 back through that generic API merely to avoid a dedicated vertical slice. If Commission 07 later proves the same fixed-ratio/frame/viewport architecture with real commissioned art, generalise from the two proven cases then.

### Silk chapter rope and foreground-depth amendment — 13 September 2026

The temporary page-spanning `SpecialistsJourneyRope` proved route continuity through Opening and Index but is the wrong ownership model for Silk. One cross-chapter SVG cannot participate correctly in Silk's local physical depth once the rope must sit in front of some chapter objects and behind others. Do not solve that by raising or lowering the global rope's z-index: that risks changing the accepted Index composition and still cannot express Silk's stack cleanly.

Silk therefore owns its own route/traversal composition. Until the commissioned rope kit and Commission 06 cutout exist, `SilkTraversalComposition` owns the simple red SVG route, the Commission 06 placeholder/asset registration and the entry anchor in one coordinate system. It begins at a deliberate visual handoff from the pre-Silk route. `SilkChapter` may position or scale the whole composition only; it must not position the rope and Silk independently. The existing global route terminates before Silk rather than continuing through the chapter.

That handoff is a geometric seam, not a visual approximation. The last visible point of the clipped Opening/Index rope and the first point of the Silk-local rope must meet at the Index/Silk boundary, and the entry anchor must be centred over that same join. Responsive authoring may change the controlling composition internally, but it may not open a visible gap between the two rope segments.

The Silk chapter's physical paint order is, from back to front:

1. behind-wall scenes and mineral page substrate;
2. broken-wall apertures/frames, ordinary chapter content and the `SILK` wordmark;
3. the Silk-owned red rope segment;
4. Silk's Commission 06 cutout/traversal;
5. physical anchor hardware.

The rope must visibly cross **over** the `SILK` wordmark and over every aperture/frame it traverses. The rope sits on top of everything else in the Silk chapter except the Silk cutout and anchor points, which both paint above it. These are physical invariants, not incidental DOM order or equal-z-index tie breaking.

Commission 06 is geometrically attached to that rope, not independently positioned near it. `SilkTraversalComposition` owns both sides of the registration contract: an authored rope attachment coordinate and the Silk cutout's explicit harness/contact port. Those points coincide inside the composition's coordinate system and therefore move/scale atomically at every supported responsive width. `SilkChapter` has no API for separate Commission 06 top/left choreography. Any future commissioned Commission 06 asset must register its harness/contact point to this same internal port.

The commissioned rope split around Commission 06 does not make the character responsible for hiding a bad join. The upper and lower rope pieces must meet correctly at one shared internal rope port before Commission 06 is painted. Their visible centrelines coincide and their apparent thickness remains continuous; Commission 06 may later occlude that already-correct seam for physical plausibility, but its exact pixel placement must remain free to move within the authored traversal composition.

Likewise, a chapter crossing is a physical boundary primitive rather than content owned by either neighboring chapter, and it owns no rope. Across the shared page stacking context the paint relationship is `adjacent chapter surfaces < crossing-owned horizontal rule < neighboring chapter-owned rope endpoints < crossing-owned anchor hardware`. The crossing root must not create an isolated stacking layer that forces its rule and anchor to paint together relative to the rope. Rope and anchor may straddle the horizontal rule, and historical clipping used to terminate the old page-spanning rope must not cut the crossing, anchor, or neighboring rope endpoints in half.

`SilkCommission05Composition` must not accept or render a traversal/crossing child. `SilkTraversalComposition` is its chapter-level sibling, so the entire rope/Silk assembly can sit above Commission 05 while preserving its own internal order of rope < Silk < anchors. Silk's z-order is chapter-local; do not introduce a site-wide CSS-variable control API or shared page-wide z-index vocabulary merely to make the rope work.

Opening, Index and Silk now use chapter-owned rope pieces, but chapter-to-chapter handoff geometry is not owned by either neighboring chapter. Each chapter boundary is represented by a dedicated `ChapterCrossing` primitive placed between the two chapters in source order. The crossing owns the horizontal rule, the single rope handoff coordinate and a real anchor placeholder element centered on that coordinate. The outgoing chapter and incoming chapter must resolve their rope endpoint geometry against that same crossing contract rather than independently authoring percentages that merely appear to meet.

`ChapterCrossing` is therefore the authority for Opening→Index and Index→Silk seam geometry. The later anchor pack replaces the placeholder treatment inside that primitive; it does not introduce a new positioning authority. Chapter-owned rope pieces may overlap the handoff by enough material for the anchor to occlude raster-edge differences, but the anchor is not allowed to hide a structurally disconnected seam. Responsive authoring may select a different rope piece or crossing coordinate at an existing authored media band, but there is still one shared handoff coordinate per crossing per authored state.

The first page anchor above the Opening image is not a chapter crossing and remains Opening-owned. The Commission 06 harness join is similarly internal to `SilkTraversalComposition`: Silk owns both rope pieces and the harness/cutout occlusion there. Only boundaries between independently owned chapters use `ChapterCrossing`.

## Parallax law

Parallax exists only to sell physical depth behind an aperture.

The governing rule is:

**The mineral wall moves with the document. The world behind it moves a little less. The broken edge never slips.**

Implementation requirements:

* only the behind-wall world layer translates;
* the aperture mask/rim remains fixed to the page plane;
* motion is directly derived from normal document scroll; no scroll-jacking, inertial lag, spring animation or mouse-follow effect;
* total relative travel should remain restrained by default; Commission 05 is explicitly authored at 128 CSS px total (`±64px`) after in-situ review found both 32px and 64px total travel too subtle;
* Commission 05's accepted portrait scene and hidden overscan must retain enough reserve for that full 128 CSS px total travel without exposing a source edge;
* motion is bounded so image bleed never exposes an empty edge;
* off-screen work should be avoided by observing aperture visibility;
* `prefers-reduced-motion: reduce` disables the relative transform entirely;
* the static reduced-motion composition must remain complete and visually intentional;
* mobile may use a lower amplitude or zero amplitude if crop reserve cannot support movement cleanly.

Do not split a single environment plate into many faux-3D layers merely to increase the effect. One moving world plate behind one stable rim is the default.

## Commission implications

### Commission 05

Commission 05 becomes the **world behind the first aperture**, not a framed upper-right chapter panel.

Keep the approved environmental narrative: ordinary shabby safehouse corridor first, methodical pressure-test evidence second, small late-arriving canonical Patch third, no visible Silk. Preserve the researched foreground/midground/background staging and Patch identity contract.

Remove the old requirement for quiet image-space reserved for the `SILK` wordmark or rope. Those elements now live on the mineral page in front of the aperture.

Add generous parallax/crop overscan around all sides. The model must not generate broken page-plaster aperture edges, page anchors, comic borders or the main rope. The React aperture system owns the reveal.

### Commission 06

Commission 06 remains transparent and rope-free, but it is now specifically a **threshold-crossing traversal**. Silk should plausibly bridge the first aperture by overlapping both the revealed world area and the mineral page while the whole cutout remains above the chapter-owned rope and wall rim in the approved paint stack. The final prompt must use an accepted aperture/rope geometry guide rather than a generic panel-overlap guide.

### Commission 07

Commission 07 becomes a second **behind-wall environment/depth plate**. It should show the deeper tested route/service-void world without generating the page aperture rim itself. The React layer owns the hole and re-occlusion. Receipt remains separate.

### Commission 08

Use the accepted reaction image behind a narrow irregular **plaster slit**. The existing close CSS crop is useful. The slit owns the visual framing; the source image is content behind it. Recommission only if the historical baked rope cannot be hidden/subordinated by authored crop.

### Commission 09

Keep the realization and handoff as separate beats, but reopen the handoff composition. It no longer has a locked right-edge-aligned rectangular cell contract. Design the handoff around the page/world relationship after the new aperture/traversal geometry is proven.

### Asset packages

* Keep the 2–3 piece Specialists rope kit; amend it for page/world depth transitions and aperture occlusion.
* Keep and strengthen the mineral-page anchor kit; it now establishes the diegetic plaster/brick truth of the page.
* Replace the old "Silk panel-edge occluders" concept with a **Silk mineral-wall aperture/rim package**. These are page-surface foreground pieces/masks for the main corridor opening, broad breach and narrow eye slit, not rectangular panel lips.
* Keep the fused Receipt smashed-wall peek-through. Align its plaster/brick vocabulary with the aperture package.
* Decide the mineral plaster surface treatment as part of the page implementation. It may be subtle CSS texture or a small owned texture asset; do not introduce a loud repeating wall pattern.

## Responsive composition

The existing responsive vocabulary remains the only authored page vocabulary:

* minimum: 320
* narrow max: 390
* compact max: 720
* mid max: 900
* wide min: 1400
* expanded min: 1600
* ultrawide min: 1920
* ceiling: 2560

The new Silk composition is authored at these states rather than inheriting the disposable wireframe's old rectangles.

At every state:

* the first aperture must read as a hole in the mineral surface, not an image card;
* `SILK` remains on the mineral page and the route rope crosses it;
* Commission 06 must visibly cross an aperture boundary;
* the second breach remains materially distinct from the first but belongs to the same wall;
* the reaction slit remains a distinct short beat;
* semantic source order remains understandable without imagery/motion;
* no horizontal page overflow;
* the 2560 authored geometry freezes above the ceiling.

## Accessibility and motion

The chapter must remain understandable when images fail or animation is disabled.

* Semantic heading/order stays Opening → Index → Silk.
* Narrative copy remains HTML.
* Aperture/rim art is decorative when its meaning is already carried by scene alt/copy.
* Parallax is supplemental and disabled under reduced motion.
* Keyboard and zoom behavior remain governed by the route-wide contracts.
* Actual 200% browser zoom remains a human review gate.

## Test contract

Retire tests that assert the superseded rectangular Silk wireframe relationships.

Replace them with objective physical laws:

* the first and second world plates are clipped by apertures rather than rendered as ordinary bordered figures;
* the aperture rim stays page-locked while the world layer translates under normal scrolling;
* reduced motion produces zero parallax transform;
* Commission 06 crosses the first aperture boundary and paints above both the local rope and the wall rim;
* Commission 06 and the Silk rope are descendants of one controlling traversal composition, with no separate page-owned positioning seam;
* Commission 06's explicit rope-attachment port stays registered to the authored Silk rope within a small browser-layout tolerance at every protected width;
* the clipped Opening/Index rope endpoint, Silk-local rope start and entry-anchor centre form one continuous boundary handoff at every protected width;
* the rope crosses the real `SILK` mark;
* local chapter rope ports remain close enough for commissioned boundary anchors to cover their overlaps;
* Commission 08 still uses the accepted `specialists-silk.webp` source behind the reaction slit;
* no horizontal overflow at protected widths;
* responsive geometry freezes above 2560;
* accepted Index protected visual snapshots remain unchanged.

Do not retain the old "exactly one page-spanning rope SVG" assertion. Test perceived continuity and seam geometry instead of implementation count.

## Asset custody

Do not add the rejected first Commission 05 generation to accepted production custody.

As of 13 September 2026, the final Commission 05 corridor world plate and the heavy Commission 05 mineral-wall frame are accepted production masters. They live in the dedicated Silk source package under its own `accepted-assets.json`; the regular frame remains rejected comparison evidence in candidate custody. The accepted corridor uses 128 CSS px total parallax travel (`±64px`) with enough hidden bleed to retain the 8px safety reserve at both extrema.

Silk accepted masters should live in a dedicated chapter source package rather than being appended blindly to the Index-only accepted-assets manifest. The production processor may be generalized by chapter or gain a sibling Silk processor, but whichever route is chosen must preserve:

* accepted source checksum and dimensions;
* generation/provenance receipt where applicable;
* deterministic AVIF/WebP or alpha-capable derivatives as appropriate;
* no-upscale policy;
* byte budgets;
* enough source overscan for approved parallax travel;
* explicit accepted/rejected status boundaries.

## Reconsideration triggers

Revisit this direction if any of the following become true during the React proof:

* the page-as-wall metaphor cannot remain legible at 320px or 200% zoom;
* parallax requires large image travel, scroll-jacking or continuous main-thread work to read;
* the aperture system forces Index to be redesigned rather than remaining a stable contrast;
* Commission 06 cannot cross the aperture convincingly without brittle per-pixel registration;
* irregular aperture art causes unmanageable bleed or asset-size costs across responsive states.

Those are reasons to simplify the implementation, not to silently fall back to the superseded rectangular Silk wireframe.
