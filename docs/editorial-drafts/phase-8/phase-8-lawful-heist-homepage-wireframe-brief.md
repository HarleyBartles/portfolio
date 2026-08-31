# Phase 8 side quest — Lawful Heist homepage wireframe proof

**Status:** Ready for local Sol discovery and proof work  
**Branch:** `codex/phase-8-homepage-editorial-room`  
**PR:** #48, `docs: reopen Phase 8 homepage editorial room`  
**Scope:** one bespoke homepage treatment for the currently homepage-eligible Lawful Heist Patch adventure. This is a design-proof side quest, not full homepage implementation.

## Why this side quest exists

Phase 8 now has a settled Patch rule: there is no generic `Patch homepage layout` beyond a shared accessible web shell. Every homepage-eligible Patch adventure earns its own authored homepage composition. The adventure supplies the visual language; the website supplies semantic structure, responsive behaviour, accessibility and custody.

Lawful Heist therefore needs its own homepage proof before the Patch movement can be considered settled enough to enter the full homepage wireframe.

The treatment may be cover-adjacent or double-spread-adjacent, but those are compositional references rather than templates. The proof should answer one question:

> If Lawful Heist is the Patch selection in the current homepage edition, what uniquely Heist homepage movement deserves to appear there?

Do not generalise the answer into a reusable Patch component language. Future eligible adventures such as Tournament must receive their own authored treatments.

## Read this first

Before generating anything, inspect the actual deployed adventure at desktop width:

- live route: <https://harleybartles.com/patch/lawful-heist>

The live route is the most useful first visual source because it shows what the portfolio currently considers public Heist truth: crew ordering, accepted crops, assent markers, folder material, colour, current typography, spacing and the existing web translation of the source art.

Then inspect the portfolio implementation and custody sources:

- `src/client/src/features/patch-showcase/LawfulHeistPage.tsx`
- `src/client/src/features/patch-showcase/LawfulHeistPage.scss`
- `src/client/assets/patch/lawful-heist/generation-receipt.json`
- `src/client/public/media/patch/patch-derivatives.json`
- `docs/asset-custody.md`
- `.agents/specs/2026-08-24-portfolio-10k-05-lawful-heist-crew-design.md`
- `.agents/plans/completed/2026-08-24-portfolio-10k-phase-5-lawful-heist-crew.md`

The deployed route currently makes the important story order explicit: provenance, pressure, authority, decision, recovery and audit. It also exposes the existing accepted folder/marker imagery and the current K assent marker. Use this as evidence, not as a layout to shrink into a homepage card.

## Source repo: Adventures of Patch

The upstream visual source repository is:

- <https://github.com/HarleyBartles/adventures-of-patch>

The Heist visual framework is under:

- `workbench/issue_48_override_heist_style_framework_v0_3/`

Start with the framework index:

- `workbench/issue_48_override_heist_style_framework_v0_3/00_framework_index.md`

That index explains which bible layers own world, frame, character, prop and planning decisions. Treat the packet as visual-generation doctrine and QA evidence. Do not paste the entire packet into every image prompt; compose only the constraint blocks relevant to the asset being generated.

### Required Heist bibles for this proof

Read these before driving image generation:

1. `style-bibles/01_override_heist_world.md`
   - Global Heist world.
   - Warm safehouse/action-heist staging, clean editorial-vector finish, readable silhouettes and lawful-override semantics.
   - Important negatives: no gritty noir, gun-first heist glamour, generic hacker imagery, photorealism, glossy 3D or unreadable comic chaos.

2. `style-bibles/02_patch_comic_adaptation.md`
   - Canonical Patch identity when Patch appears in Heist mode.
   - The comic treatment may increase staging energy but must not redesign Patch into a superhero or a different character.

3. `style-bibles/04_composable_panel_framing.md`
   - Global panel/frame/gutter/superframe grammar.
   - Core rule worth carrying into the homepage proof: panel style expresses reasoning; it is not decoration.
   - Use framing, crop, scale, negative space, route continuity, overlap and geometry to direct the eye. Avoid meaningless arrows or busy comic-page imitation.

4. `style-bibles/09_pitch_folder_and_assent_marker_system.md`
   - Accepted continuity for the pitch folder and six assent markers.
   - **Especially important for this proof:** Klause's marker is a produced K stamp on the folder, not a stamp tool, hand, ink pad, generic `APPROVED` gag or wax seal.
   - This bible explicitly grants `HarleyBartles/portfolio` narrow permission to create and publish derivative assent-marker images for the documented designs. Stay within that permission.

If the chosen composition foregrounds a particular recruit or recruit-specific frame grammar, follow the framework index into the matching `frame-bibles/` and promoted character continuity under:

- `build/characters/heist-crew/manifests/`
- `build/characters/heist-crew/reference_sheets/`

Do not improvise character appearance from memory when a promoted character reference exists.

### Existing source visual references

The accepted/in-flight pitch-folder progression is indexed here:

- `workbench/issue_48_override_heist_style_framework_v0_3/style-sheets/heist_pitch_folder/INDEX.md`

It contains the clean folder and each successive joined state through Receipt. Inspect both the images and their sidecars before regenerating or deriving folder/marker material.

Useful style-sheet root:

- `workbench/issue_48_override_heist_style_framework_v0_3/style-sheets/INDEX.md`

The framework index also names accepted/promoted crew references and tells you when to compose world + character + frame constraints rather than using one giant prompt.

## Settled homepage art direction for Patch

These are not open questions for this side quest.

### Patch is a visual movement, not a feature card

Do not produce:

- thumbnail + paragraph + CTA;
- generic card grid;
- a miniature copy of the full adventure route;
- a prose explanation of the lesson beside an illustration;
- a generic reusable Patch template.

The homepage movement should feel like an authored colour comic spread or cover translated into modern web layout language.

That does **not** mean comic-book cosplay. Borrow composition grammar, not surface clichés.

### No speech bubbles

No speech bubbles, character dialogue balloons or fake comic dialogue UI.

Patch adventures do not depend on character dialogue to carry the story. The visual does the talking. Explanation belongs to authorial copy, monologue/presenter-note equivalents, or the destination route.

The homepage proof should therefore succeed with image composition, title, framing and minimal authorial intervention.

### Minimal homepage-original copy

Prefer:

- the adventure title;
- possibly one quiet context/kicker if it genuinely helps;
- one obvious onward route.

Do not explain the six-role lesson on the homepage. The full route already does that work.

### The title is part of the composition

`Lawful Heist` should behave more like a publication title inside an authored spread than a normal web-section heading parked above a rectangle.

Keep the heading semantically real in the DOM. Do not make rasterised image text the only accessible title.

### K stamp: native Heist overprint device

The Klause assent marker is the strongest currently settled Heist-specific overprint device.

Use the **produced K stamp impression** as a compositional layer if the proof earns it. It may cross an image edge, title boundary, band, panel or other structural seam in the way a strong publication overprint can bind two visual planes together.

The point is not `stamps are cool`. The point is that Heist already owns a meaningful K assent mark, so a boundary-crossing stamp can be both visually assertive and source-truthful.

Respect the marker bible:

- produced impression only;
- no rubber-stamp tool;
- no hand applying it;
- no ink pad;
- no generic approval wording;
- no wax-seal fantasy.

The stamp is a Heist device, not a generic Patch or homepage motif. Do not create a universal `homepage stamp` component from it.

## Comic-layout lessons to translate, not imitate

The design-room reference conversation identified several useful comic-layout principles. Translate them into web layout while preserving modern accessibility and responsive design:

- a panel does not have to be a padded card;
- crop can establish a content boundary;
- radical scale shifts can establish hierarchy;
- negative space is active composition, not unused area;
- one image fragment may escape its nominal frame when that escape has a job;
- typography can behave as a compositional mass while remaining semantic text;
- different degrees of enclosure can coexist;
- overlap can bind planes together;
- a strong reading route can survive an irregular grid;
- one dominant hero image can carry cover energy while smaller material supports it;
- a stable composition must still work with motion disabled.

The website remains a website. Keep normal reading, focus, resizing and navigation trustworthy. Do not borrow print/comic behaviour that breaks web semantics or forces a desktop poster to be squeezed onto mobile.

## What the Heist treatment should feel like

Heist is not violent/criminal spectacle. Its source world is a playful action-heist metaphor for lawful override design. The strongest homepage treatment should preserve that tension:

- visually confident and cinematic;
- warm, operational and deliberate rather than gritty;
- clearly Heist;
- clearly still `harleybartles.com`;
- visually capable of carrying itself without explanatory prose;
- interested in the route, folder, crew logic, assent/custody and boring successful execution rather than generic robbery imagery.

A cover-adjacent composition is a credible starting hypothesis because Heist has a strong native overprint device and existing hero/folder material, but **do not treat `cover mode` as a requirement**. If a spread-adjacent arrangement proves stronger, use it. The adventure gets the composition it earns.

## Asset-generation authority for local Sol

For this proof, local Sol is explicitly authorised to drive image generation as an iterative art-direction loop.

For **each distinct generated asset**:

1. Generate an initial candidate from the relevant source bibles and references.
2. Inspect the actual output visually.
3. Accept or reject it against the source truth and the job it must perform in the wireframe.
4. If rejected, identify the concrete failure before regenerating.
5. Regenerate/revise as needed.
6. Stop after **five total generation attempts maximum for that asset**.

Five is a ceiling, not a target. Accept a strong first or second result. Do not burn all five iterations merely because the allowance exists.

If the fifth attempt still does not reach proof quality:

- stop generating that asset;
- record the failure mode;
- use the strongest honest existing source asset/crop if one can do the job; or
- mark that part of the proof blocked rather than laundering a weak image into acceptance.

### Asset acceptance lens

For every generated or derived asset, assess:

- **Source truth:** does it obey the relevant Heist/Patch/character/prop bible?
- **Heist specificity:** would this still make sense if the word `Heist` were removed, or is it generic comic/AI art?
- **Story without dialogue:** does the visual carry a clear beat without speech bubbles or explanatory prose?
- **Composability:** does it leave room for real DOM title/link/layout rather than demanding to be used as a flattened poster?
- **Crop resilience:** can it survive the intended desktop composition and a meaningful responsive crop or alternate arrangement?
- **Premium finish:** does it look authored and specific rather than stock, noisy or AI-generic?
- **Site fit:** can it live inside the accepted Phase 8P visual language without creating a separate microsite?
- **Job:** is the asset doing something specific in the movement, or merely filling space?

Reject outputs that are technically pretty but fail the actual page job.

## Wireframe/proof construction

Build enough browser-rendered proof to judge the section as a web composition. Do not flatten the whole movement into one generated poster.

The proving composition should use real web structure for at least:

- section landmark/semantic grouping;
- adventure title heading;
- onward link into `/patch/lawful-heist`;
- meaningful image alt/fallback treatment;
- focusable navigation;
- responsive behaviour.

Generated/derived images are compositional assets inside that structure.

Do not integrate this into the production homepage yet. Keep the proof isolated/disposable enough that Cloud/Harley can accept, reject or revise it without creating a sunk-cost implementation argument.

Use whichever local proving surface is cheapest and clearest: a dedicated design-proof route, a dev-only proof page, or another browser-renderable sandbox already consistent with repo conventions. The artifact must be reviewable in a browser at desktop and narrow widths.

## Motion posture

Motion is optional for this side quest and should not be used to rescue the static composition.

If a tiny amount of motion materially helps prove a boundary-crossing or reveal idea, it may be prototyped, but:

- no ambient floating;
- no continuous parallax;
- no scroll-jacking;
- no comprehension dependency;
- reduced motion must expose the strong resolved composition immediately.

The design-room rule remains: spectacle happens between strong stable states.

## Responsive/accessibility proof bar

At minimum inspect:

- desktop composition at a normal wide viewport;
- narrow/mobile arrangement;
- keyboard focus/order;
- text zoom/reflow behaviour sufficient to catch obvious poster-layout failure;
- reduced-motion state if motion exists;
- image failure/fallback behaviour if the proof introduces new critical media.

On narrow screens, **recompose rather than squeeze**. It is acceptable for overlap, panel escape or secondary fragments to simplify or disappear when they are not needed for comprehension. Preserve title, visual invitation and onward route.

## Definition of proof-quality success

The side quest succeeds when the browser proof makes the following statements credible without explanatory design-room prose:

1. `This is Lawful Heist`, not generic Patch and not generic comic styling.
2. The movement can be understood as an authored visual invitation with almost no homepage copy.
3. The K assent marker feels native and earned if used as an overprint.
4. The section has cover/spread authority without becoming comic-book cosplay.
5. The section still belongs to the site's accepted visual language.
6. The same underlying web content remains usable and deliberate on a narrow viewport.
7. This treatment could be slotted into the settled homepage sequence as the Patch movement without requiring the rest of the homepage to imitate it.

Do not call the design settled merely because a generated image is attractive. Judge the **composed browser section**.

## Deliverables

Keep this side quest narrow. Hand back:

1. A browser-reviewable Lawful Heist homepage-section proof/wireframe.
2. Any new proof assets required to judge it, with source/derivative custody recorded appropriately.
3. A short proof note recording:
   - chosen composition and why;
   - asset generation attempts/acceptance decisions where generation was needed;
   - responsive simplifications;
   - known weaknesses or unresolved questions;
   - exact route/path Harley/Cloud should open for review.

Do **not**:

- implement the production homepage Patch slot;
- build the edition selector;
- design Tournament or other Patch homepage treatments;
- generalise Heist into a Patch template;
- silently modify the upstream `adventures-of-patch` source repo.

## Baton back

Return one of:

- **Ready for Cloud/Harley review — Lawful Heist homepage proof**
- **Blocked — Lawful Heist homepage proof**, with the concrete visual/technical blocker and the best surviving evidence.
