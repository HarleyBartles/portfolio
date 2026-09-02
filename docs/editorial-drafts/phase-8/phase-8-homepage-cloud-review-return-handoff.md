# Phase 8 homepage — Cloud/Harley wireframe review return handoff

**Status:** Second integrated wireframe review complete on 2 September 2026. Local Sol is authorised to make one bounded revision pass on the disposable homepage wireframe, then hand the rendered proof back for Cloud/Harley inspection.

**Branch / PR:** remain on `codex/phase-8-homepage-editorial-room` / draft PR #48. Do not create another branch or PR.

**Scope boundary:** change the editorial wireframe and its local proof assets only. Do not implement production `HomePage` components, production routing, canonical edition machinery, publishing, or unrelated Phase 8 work.

This is a forward continuation record. The existing [`phase-8-homepage-wireframe-handoff.md`](./phase-8-homepage-wireframe-handoff.md) remains the record of the first local implementation pass. This document records what Cloud and Harley accepted, challenged and returned after inspecting that pass at four widths.

## Read order

Before editing, read:

1. this return handoff;
2. [`phase-8-homepage-fold-3-wild-bunch-visual-implementation-brief.md`](./phase-8-homepage-fold-3-wild-bunch-visual-implementation-brief.md);
3. [`phase-8-homepage-fold-2-marketplace-visual-direction.md`](./phase-8-homepage-fold-2-marketplace-visual-direction.md) and [`phase-8-homepage-fold-2-shape-language-moodboard.webp`](./phase-8-homepage-fold-2-shape-language-moodboard.webp);
4. [`phase-8-homepage-fold-4-writing-lock.md`](./phase-8-homepage-fold-4-writing-lock.md);
5. [`phase-8-the-usual-specialists-homepage-proof-note.md`](./phase-8-the-usual-specialists-homepage-proof-note.md);
6. the current [`phase-8-homepage-wireframe.html`](./phase-8-homepage-wireframe.html) and its local assets.

Focused lock files remain authority unless this review return explicitly records a later integration decision.

---

# 1. Settled page-flow / link grammar

This review settled a directional interaction language for the homepage.

## Normal scrolling remains normal

Do not add scroll-jacking, snap-to-section behaviour, wheel capture or forced one-section-per-viewport mechanics. A reader who scrolls should get an ordinary continuous authored page.

## Directional CTA language

Contextual homepage links use direction semantically:

- `→` means **go inward into the site** — the roughly five-minute commitment: case study, article, Patch route, CV, contact, About, or another interior route;
- `↓` means **continue down this homepage** — move to the next authored movement/plate;
- `↑` may be used for a restrained `Back to top` / equivalent return control if it earns its place without adding clutter.

The arrow is not decorative. It should let the reader predict what the link will do before activating it.

The permanent masthead remains quiet primary navigation; do not turn it into another decorated CTA system merely to display arrows everywhere.

## Two exits from evidence movements

Where appropriate, each evidence movement should expose two distinct choices:

1. an inward `→` route for the reader who is convinced and wants the five-minute interior;
2. a quieter `↓` route selling the **different reason the next movement may be worth attention**.

The down-link copy must not apologise for the current movement or read like `if you did not like this, try the next thing`. It should confidently advertise the next proposition in its own right.

Examples discussed in review included territory such as:

- Marketplace → Wild Bunch: `I tried to break my own event-sourcing claim ↓`;
- Wild Bunch → Writing: a line about the process itself becoming the problem;
- Writing → Patch: a line that invites the reader to meet `The Usual Specialists`;
- Patch → professional close: a quiet transition from spectacle into the reciprocal work invitation.

Those examples are directional copy territory, not frozen wording. Author the final wireframe labels for rhythm and clarity while preserving the grammar.

Fold 1's `See the work ↓` already has the correct page-down meaning.

## Jump targets are authored viewpoints, not necessarily section starts

Do not assume `id` on the first DOM node of a section is automatically the correct clicker landing position.

The continuous scroller's section boundary and the clicker's clean-plate target have different jobs. They may coincide, but they do not have to.

Use `scroll-margin`, a dedicated in-flow/visually-hidden anchor sentinel, or an equivalent native-anchor technique so the URL fragment still represents a real accessible page location without JavaScript scroll theatre.

### Wide / tablet contract

A deliberate jump should land on the strongest self-contained viewport composition available for that movement. `Clean plate` means no neighbouring proposition is competing for attention. It does **not** mean every movement must display both horizontal boundary rules.

For Marketplace, the clean desktop plate naturally includes both top and bottom rules. The current `#marketplace` landing cuts off the top rule; move the jump target so the plate begins with its authored upper boundary/breathing space.

Wild Bunch currently has a tablet-risk geometry: around the reviewed tablet dimensions there is no scroll position where the whole movement reads as a clean plate without either the previous movement or `Writing` peeking in. Give the Wild Bunch tablet stage enough vertical territory / authored offset that a clean clicker composition exists. Do not solve this with scroll-jacking.

Writing is the inverse case: it is intentionally taller than a viewport because negative space is part of its composition. Its wide/tablet jump should land **inside the section** at the strongest viewport composition, as demonstrated during review, rather than trying to expose both section rules at once.

### Narrow / mobile contract

Do not force mobile movements into one viewport. Portrait devices are inherently scroll-led.

A mobile jump needs a clean **start**, not a complete clean screen. Let the cognitive section continue naturally below the viewport.

---

# 2. Fold-by-fold review result

## Fold 1 — professional opening

**Pass. No editorial or composition changes requested.**

The locked identity, large proposition, proof rail and `See the work ↓` continue to work at all four widths. Do not shrink the headline or compress the proof merely to make the complete cognitive fold fit one mobile screen.

Apply only the global anchor/link grammar where relevant.

## Fold 2 — Marketplace / Superpowers+

**Visual language passes. Composition needs one more assertive pass.**

The deliberately small deterministic tile vocabulary is enough. Do **not** reopen the full Fold 2 side quest or build the deluxe final vocabulary now.

The problem is not the assets; it is that the current composition still reads too much like `headline + explanatory prose + small supporting diagram`.

### Make the existing language own the plate

Use scale as the cheapest lever. The modular system should carry materially more expressive weight on wide and intermediate views.

Explore an **off-axis cropped composition** using the same tiles:

- a shallow tilt rather than the initially imagined 30–40 degree drama;
- useful first experiments are approximately 6–10 degrees and 12–16 degrees rather than treating those values as hard constants;
- keep perspective falloff subtle, if used at all;
- compare a shallow/medium tilt with almost no perspective against a version where crop and scale do nearly all of the expressive work;
- place the tile field inside a hard rectilinear composition window / frame;
- make the field intentionally larger than the frame so some tiles are cut by the crop at angles;
- allow the viewer to infer a larger system continuing beyond what is shown;
- keep the coloured Superpowers+ intervention close to the visual centre of interest and preserve readable route continuity.

The goal is an authored object, not a game board disappearing into theatrical 3D space. Stop before perspective becomes the subject.

### Narrow order

On narrow portrait layouts, prefer the interesting object before the full explanation. A good direction remains:

`label / proposition → visual system → concise explanation → inward CTA → next-plate ↓`

The section may be taller than the viewport. Do not shrink the visual merely to fit one screen.

### Remove review furniture from the judged page

The visible `Reduced deterministic wireframe treatment...` caption is useful provenance for us but weakens the public composition. Keep provenance in repository notes/asset custody; do not make the homepage visitor read wireframe-process copy.

### Generative latitude

The existing checked-in moodboard may be enough. If new generative exploration materially helps with crop / tilt / spatial composition, local Sol retains the prior licence for up to **five genuine creative iterations** of the desired exploration image before selecting useful reference or escalating. Generated material remains inspiration; final structural/vector authority stays deterministic.

## Fold 3 — Wild Bunch replay falsifiability

**Editorial story passes. Current proof graphic is superseded.**

Implement [`phase-8-homepage-fold-3-wild-bunch-visual-implementation-brief.md`](./phase-8-homepage-fold-3-wild-bunch-visual-implementation-brief.md).

Harley will provide the reviewed generative inspiration board separately. It is an inspiration board only: its left replay arrows are backwards, its cache fan-in is ambiguous, and none of its baked text is admissible.

The implementation brief owns the exact topology:

- event history is immutable and **only emits**;
- leftward reads feed a shared replay spine that runs down the history and under it into `Replay`;
- rightward reads fan clearly into `Cache`;
- `Cache → State` and `Replay → State` both terminate at the same State;
- no arrowhead may terminate on an event record;
- all labels/text must be real web/SVG text, not generated pixels.

### Art direction

Use the inspiration board's useful material ideas without copying its errors:

- subtle textured containers rather than flat SaaS rectangles;
- warm Wild Bunch character confined to the proof object rather than a globally sepia page;
- full-height State plane;
- State-only right-edge information breakdown / tintype-like chemical loss dissolving toward the clean copy field;
- no parchment theatre, cowboy props, poster styling or generalized grunge.

This should feel like Wild Bunch **without dragging Wild Bunch scenery onto the homepage**.

Local Sol may use deterministic tools, generative tools, or a hybrid. If generative exploration is used, up to **five genuine iterations** are authorised for this desired proof treatment; topology and real text must still be corrected/rebuilt deterministically before acceptance.

### Scale and responsive composition

The proof should be substantial enough to inspect at wide/intermediate widths; do not leave a tiny technical exhibit floating inside a large proof lane.

Narrow must be genuinely re-authored, not a thumbnail of the desktop graphic. The same semantics may become vertical: ordered history → mechanisms → State. Preserve the distinct replay-spine and cache-fan-in grammars.

At the reviewed tablet risk point, also solve the clean-plate geometry described in the global jump-target section.

Remove the visible `Deterministic wireframe treatment...` process caption from the judged public composition; keep the provenance in repository evidence instead.

## Fold 4 — Writing

**Pass. Leave the design alone.**

Writing is strong because it refuses to decorate writing. The words are the visual.

Preserve:

- Source Serif authored-reading register;
- title as the dominant visual object;
- précis as a separate editorial plane;
- large negative space;
- the awkward long-title specimen;
- restrained inward article route.

Do not add thumbnails, cards, metadata furniture or illustration.

The only requested work here is the authored clicker landing position and the global link grammar. At wide/tablet, target the strong viewport composition rather than the top boundary rule. On mobile, land at the clean start and allow normal portrait scrolling.

## Fold 5 — PATCH / The Usual Specialists

**Wide remains accepted. Intermediate and narrow deserve one bounded placement pass.**

Do not redesign Patch, regenerate its artwork, change the frozen wordmarks, or alter the accepted semantic/story order.

The concern is narrower: when the artwork decomposes at tablet/mobile widths, the pieces have become slightly too obedient to conventional web gutters. The current sequence is good, but the placement grammar starts to read like a centred responsive image gallery.

Challenge that politeness while preserving the same assets.

### Desired intermediate/narrow behaviour

Experiment with:

- unequal lateral positions rather than one shared gutter;
- alternating left/right bias rather than a centred stack;
- unequal carrier widths;
- selected panels running deliberately to or visually beyond one edge;
- controlled viewport crop / visual bleed where useful;
- tighter or mildly overlapping vertical relationships in selected places;
- preservation of the carriers' slight rotations and physical irregularity;
- continued Klause zero-flow overprint and boundary-breaking behaviour.

The sequence may remain title field → Silk → folder → Rollback → Receipt on narrow. The improvement is that **the artwork appears to decide how much space it needs**, rather than every `<figure>` accepting the same responsive slot.

This is visual bleed, not broken layout. Maintain zero page-level horizontal overflow and no sideways scrolling.

The narrow title field is already strong; do not disturb it merely to create more rebellion below.

Aim for roughly the final 10–15% of authored/punky refusal to conform, not a fresh Patch side quest.

## Professional close

**Pass. No copy or composition changes requested.**

Keep:

`I've shown you how I work.`

`If that looks like the kind of engineering you want on your team, I'd like to hear what you're building.`

Preserve the large decompression interval after Patch.

Apply the settled inward-arrow grammar to the contextual routes:

- `Tell me about it →`
- `Read my CV →`
- `About me →`

They may retain different visual emphasis; they simply share the same inward direction semantics.

---

# 3. Review / acceptance pass

After the changes above:

1. stand the wireframe locally using the existing proof method;
2. inspect the same four established proof widths rather than inventing a new responsive system;
3. pay particular attention to the tablet transition/risk width as well as the two narrow portrait views;
4. exercise each homepage down-arrow jump and verify that it lands on the intended authored plate/start;
5. verify inward `→` routes remain visually/semantically distinct from page-down `↓` routes;
6. verify no scroll-jacking, snap behaviour or JS-only navigation was introduced;
7. verify no page-level horizontal overflow, including the deliberately unruly Patch placements;
8. verify reduced-motion and media-off fallbacks still degrade coherently where the existing wireframe supports them;
9. verify generated text has not entered Fold 3 or any other public proof asset;
10. update [`phase-8-homepage-wireframe-handoff.md`](./phase-8-homepage-wireframe-handoff.md) with the second-pass rendered evidence and any remaining concrete blocker.

## Hard stop / return baton

Stop when the revised wireframe is live and ready for Cloud/Harley inspection.

Return:

**Ready for Cloud/Harley wireframe re-inspection**

If a requested treatment cannot be made to work honestly within the bounded wireframe pass, stop with the concrete blocker rather than opening an unbounded design side quest.

Do not proceed into production homepage implementation or publication from this baton.