# Phase 8 homepage — local wireframe roadmap and implementation brief

**Status:** Authorized next work on 1 September 2026 after the first-pass Cloud/Harley editorial review closed.

**Owner of this pass:** local Sol.

**Branch / PR:** stay on `codex/phase-8-homepage-editorial-room` in draft PR #48. Do not create another branch or PR.

**Goal:** update the disposable integrated homepage wireframe so that it expresses the complete accepted first-pass homepage contract at the review widths. Stand it up locally, inspect it, and hand the baton back for Cloud/Harley review.

**Stop condition:** this pass ends when the updated wireframe is live and ready to inspect. Do **not** continue into production `HomePage` implementation, production routing, canonical edition machinery or publish work.

---

## 1. Read order — do this before editing

Read these files in order. Later focused locks supersede earlier exploratory wording where they conflict.

1. [`phase-8-homepage-first-pass-closeout.md`](./phase-8-homepage-first-pass-closeout.md) — page-level closeout and current baton.
2. [`phase-8p-visual-language-contract.md`](./phase-8p-visual-language-contract.md) — site-wide visual vocabulary the homepage inherits.
3. [`phase-8p-typography-contract.md`](./phase-8p-typography-contract.md) — Source-family typography authority.
4. [`phase-8-homepage-first-fold-lock.md`](./phase-8-homepage-first-fold-lock.md) — Fold 1 authority.
5. [`phase-8-homepage-fold-2-marketplace-visual-direction.md`](./phase-8-homepage-fold-2-marketplace-visual-direction.md) — Fold 2 final direction and rejected routes.
6. [`phase-8-homepage-fold-2-shape-language-moodboard.webp`](./phase-8-homepage-fold-2-shape-language-moodboard.webp) — accepted Fold 2 exploration reference, not a production asset to trace literally.
7. [`phase-8-homepage-fold-3-wild-bunch-lock.md`](./phase-8-homepage-fold-3-wild-bunch-lock.md) — Fold 3 authority.
8. [`phase-8-homepage-fold-4-writing-lock.md`](./phase-8-homepage-fold-4-writing-lock.md) — Fold 4 authority.
9. [`phase-8-the-usual-specialists-homepage-proof-note.md`](./phase-8-the-usual-specialists-homepage-proof-note.md) — Patch movement authority.
10. [`phase-8-lawful-heist-homepage-proof.html`](./phase-8-lawful-heist-homepage-proof.html) — isolated accepted Patch composition, despite the legacy filename.
11. [`phase-8-homepage-wireframe.html`](./phase-8-homepage-wireframe.html) — current integrated scaffold to change.
12. [`phase-8-homepage-wireframe-assets/asset-custody.md`](./phase-8-homepage-wireframe-assets/asset-custody.md) and [`phase-8-homepage-wireframe-assets/INDEX.md`](./phase-8-homepage-wireframe-assets/INDEX.md) — current first-pass asset trail.
13. [`phase-8-homepage-wireframe-handoff.md`](./phase-8-homepage-wireframe-handoff.md) — historical handoff for the current scaffold. Use it for provenance, not as current design authority.

If any current HTML contradicts a focused lock above, the lock wins. Do not preserve stale markup merely because it already renders.

---

## 2. Governing reader-time contract

Judge the integrated proof by reader time, not by whether every section independently looks impressive.

### Fold 1

**5 seconds to earn attention.**

The reader should understand: established full-stack software engineer, unusually broad engineering responsibility, concrete commercial consequence, work immediately below.

### Fold 2

**The next 10 seconds to convert attention into interest.**

The reader should first feel `this is premium / interesting`, then discover a coherent modular rule, then understand that Superpowers+ is a first-party addition around a strong base system and that the boundary matters.

### Fold 3 onward

Each later movement gets roughly **15 seconds to earn a five-minute interior commitment**.

A reader may skip one subject and be won by the next. Do not make Fold 4 depend on understanding Fold 3. Do not make Patch depend on reading Writing.

### Professional close

The close is not another fifteen-second proof. It is the quiet reciprocal invitation after enough proof has been offered.

---

## 3. Global implementation constraints

### Keep the wireframe disposable

The target remains the ordinary static proof in `phase-8-homepage-wireframe.html` plus local editorial assets. Do not extract production React components or redesign production architecture in this pass.

### Homepage exception = orchestration, not vocabulary

Retain the Phase 8P shared system:

- Source Sans 3 shared site voice;
- Source Serif 4 only for genuine authored-reading material;
- Source Code Pro only where material is genuinely technical;
- cool mineral site ground;
- rectilinear grammar;
- project-native colour used locally rather than as another global palette;
- artifact-first evidence;
- relationship-led spacing;
- quiet shell/navigation.

Homepage distinctiveness may come from scale, sequence, layering, interruption, time and authored breakpoint composition. Do not invent a second component language.

### Stable states first

No movement may require animation to make sense or look resolved. Motion is optional polish for later. For this wireframe, static stable composition is enough.

### Preserve the evidence trail

Do not overwrite rejected first-pass visual assets if avoidable. Keep them as history and create clearly named next-pass assets such as:

- `marketplace-superpowers-plus-wireframe.svg` or `marketplace-superpowers-plus-second-pass.svg`;
- `wild-bunch-replay-wireframe.svg` or `wild-bunch-replay-second-pass.svg`.

Update asset custody/index notes accordingly. The old first-pass assets should remain inspectable as rejected history unless there is a concrete repository reason they cannot.

### Do not reopen settled side quests

- No first-fold copy workshop.
- No Writing typography workshop.
- No Patch wordmark/artwork workshop.
- No production edition-selection implementation.
- No attempt to finish the deluxe Fold 2 vocabulary before the next integrated proof.

---

# 4. Execution roadmap

The order below is deliberate. Fold 2 is the only material release risk, so prove the small edition early rather than polishing low-risk sections first.

## Stage 0 — verify working state and baseline

1. Confirm the branch is `codex/phase-8-homepage-editorial-room` and PR #48 remains draft.
2. Stand up the current wireframe using the repository's existing local method.
3. Inspect the current integrated page at the same four widths used for the Cloud review. Reuse the existing proof/browser setup rather than inventing a new breakpoint scheme.
4. Note the current failures you are intentionally replacing:
   - Fold 1 still contains stale first-pass content if not already updated locally;
   - Fold 2 uses the rejected lineage/graph scaffold and stale `derivative` wording;
   - Fold 3 uses a too-small first-pass diagram and compensating narrow explanation rows;
   - Fold 4 already passes;
   - Patch already passes;
   - the professional close has the old deferential copy.
5. Do not spend time making a polished baseline gallery unless it has real recovery value. Git history already preserves the old proof.

Commit only when a coherent stage has recovery value; do not generate noise commits merely because this roadmap has numbered stages.

---

## Stage 1 — Fold 2 risk spike: build a **small Fold 2, not a cheap Fold 2**

This is the gating experiment for the next wireframe.

### Editorial truth

Superpowers+ is a **plugin in Harley's Agent Asset Marketplace repository** used around the way Harley works with the respected external `obra/superpowers` system.

There is no Git fork/branch/ancestry relationship. Do not use `derivative` in a way that implies one.

Handoff Gates remains the clearest worked addition: a producer declaring something complete is not enough; the next worker must genuinely be able to continue without improvising.

### Keep current heading territory

The current heading remains viable for the proof:

`A strong system, changed by using it.`

Use concise supporting copy in this factual territory:

`I use obra/superpowers as a strong base system. Superpowers+ is my plugin around the way I actually work; Handoff Gates makes one boundary explicit: work does not move on because its producer says it is done. The next worker has to be able to continue without improvising.`

This copy is a wireframe working version, not a new permanent manifesto. Preserve upstream attribution and do not over-explain the whole Marketplace.

The current route action may remain for this proof unless integration exposes a concrete problem. Do not open a CTA naming side quest before the visual clears its ten-second job.

### The small visual edition

Build a deterministic SVG vocabulary and composition that is intentionally smaller than the final art-direction ceiling.

A useful target is **3–5 reusable tile primitives** composed into roughly **6–10 visible modules** per wide composition, with fewer/re-authored modules at narrower widths. These counts are guides, not quotas.

Every visible tile must obey the core grammar:

- outer silhouette is a perfect square;
- no protruding jigsaw tabs;
- at least **two distinct edge openings total**;
- every edge opening connects through a continuous internal negative-space route to at least one other opening;
- 3- or 4-exit pieces are allowed;
- internal geometry uses intersecting circular/annular chambers, arcs and curves **plus judicious straight corridors**;
- do not reduce the language to `circles always forever`;
- avoid decorative sealed rings and one-ended cavities as the main structure;
- preserve deliberate flat material on each edge rather than letting every edge dissolve into openings.

### Authorship / colour

- `obra/superpowers` base tiles: one calm cool low-saturation pastel/mineral family.
- Superpowers+ additions: a compact stronger related colour family from the same broad world, not a crude opposite palette.
- Shape communicates compatibility.
- Colour communicates authorship.

For the small edition, do not spend hours building a complete `hand-cast production batch` simulation. One or two readable close-tolerance joins are enough if they come cheaply and remain functional.

### Composition

- Do not fill the fold as wallpaper.
- Compose a restrained route/path across mineral ground with visible breathing channels.
- Make the base family establish a coherent route.
- Concentrate the stronger Superpowers+ pieces at one meaningful boundary/transition.
- At least one stronger piece should make continuation visibly possible.
- No arrows as the main explanation.
- No labels inside the art unless rendered evidence proves they are necessary.
- No cards, dashboard rows, screenshots, software-flowchart boxes or fake UI.

### Authored breakpoints

Do not scale one desktop SVG down mechanically.

- **Wide:** broad restrained route, enough modules to discover the rule, generous mineral ground.
- **Intermediate:** fewer modules, stronger emphasis on the critical boundary.
- **Narrow:** genuinely reauthored compact/vertical story; no microscopic tiled field.

The same tile assets may be recomposed, rotated and selectively omitted. The page owns composition; the assets do not own layout.

### Fold 2 acceptance gate before moving on

At the integrated review widths, the small edition must plausibly deliver:

1. first ~2 seconds: `this looks authored/premium`;
2. next few seconds: `wait — these pieces obey a route/fitting rule`;
3. by roughly 10 seconds: `the stronger first-party additions visibly intervene at a consequential boundary`.

It does **not** need the deluxe final vocabulary to pass.

If the only way to make it respectable is to undertake the entire final Fold 2 side quest, stop and record:

`Blocked — Fold 2 stand-in does not clear the ten-second bar.`

Do not fall back to the rejected graph asset.

---

# 5. Generative-model protocol for visual exploration

The generative model is an exploration instrument, not layout authority.

## What deserves generative exploration in this pass

Only **Fold 2 shape-language exploration** plausibly benefits from a new generative pass. Folds 1, 3, 4, Patch and the professional close do not require new generated imagery.

The accepted repository moodboard may already be enough. If it is enough, skip generation and build the SVGs directly.

If a new exploration pass would materially help the reduced tile vocabulary, the desired generative artifact is **one Fold 2 modular-channel exploration sheet**.

## Iteration licence

You have license for **up to five iterations of each desired generated image/artifact**, not merely five model calls.

An iteration means a complete creative loop:

1. generate a candidate artifact;
2. inspect it against the brief;
3. identify concrete failures/successes;
4. materially adjust references/prompt/direction;
5. generate the next candidate.

If one model invocation returns several candidates, that is still one iteration of the desired artifact, not several iterations.

Stop early when the artifact has provided enough useful shape ideas. Do not consume all five iterations by default.

After five real iterations, either select the strongest useful reference or stop and escalate with the best candidate(s) plus the unresolved failure. Do not keep prompting indefinitely.

The final Fold 2 wireframe art must still be deterministic SVG geometry authored/redrawn by you. Generated raster/path output is reference material, not production truth.

## Strong generation brief — Fold 2 modular-channel exploration sheet

Use the existing [`phase-8-homepage-fold-2-shape-language-moodboard.webp`](./phase-8-homepage-fold-2-shape-language-moodboard.webp) as visual prior art where the tool supports image references.

Desired artifact:

> Create a single high-quality exploration sheet for a premium editorial website's modular visual system. This is shape-language research, not a final webpage composition. Show approximately 10–12 standalone perfect-square tile studies plus 3–4 small adjacency clusters, arranged cleanly on a neutral cool mineral ground with generous whitespace. No text, labels, numbers, legends or logos.
>
> Every tile must have at least two distinct openings through its outer edges. Every opening must connect continuously through the tile's internal negative-space route to at least one other edge opening: no single-entry dead-end tile. Three- and four-exit tiles are welcome. Build the negative-space routes from intersecting circular and annular chambers, arcs and curved channels, with judicious straight connecting corridors where they improve route clarity. The language is circular/curved but not `circles always forever`.
>
> Keep every outer silhouette a perfect square. No protruding tabs. Leave deliberate solid material on edges between openings. Make the channels feel like true carved/removed space rather than white decorative line art laid on top.
>
> Show two compatible authorship families. The base family is calm, cool and low-saturation — established, coherent, comfortable. The first-party extension family uses stronger but harmonious related colours and the same broad geometry. In a few adjacency clusters, let a stronger-coloured extension tile bridge or continue a route through a consequential seam. Include one or two functional near-fit joins where channel width/registration is fractionally tight or misaligned but the route clearly remains usable. Do not make the extension look broken, ragged or superior; it is field-engineered compatible work around a strong base.
>
> Let some larger chambers/routes emerge only when multiple exact tiles meet. Keep a clear principal route even where the geometry becomes richer.
>
> Aesthetic: crisp flat 2D vector-like forms, premium editorial restraint, strong silhouette, controlled negative space, no texture required.
>
> Avoid: literal Tetris/tetrominoes, Truchet copying, jigsaw tabs, TRON neon, circuitry, maze-game UI, pipes, railway maps, board-game pieces, workshop scenery, concrete/3D/perspective, glow, gradients, shadows, cards, dashboard UI, paper/manual motifs, arrows, decorative sealed rings and random geometry.

Iteration emphasis if multiple passes are needed:

1. **Iteration 1 — breadth:** establish a varied but coherent route vocabulary.
2. **Iteration 2 — route validity:** eliminate sealed/one-ended pieces; make every edge opening functional.
3. **Iteration 3 — authorship:** improve base-vs-Superpowers+ family distinction and functional near-fit joins.
4. **Iteration 4 — adjacency:** improve multi-tile emergent chambers and the `extension enables continuation` story.
5. **Iteration 5 — restraint:** remove excess complexity and retain only shapes worth redrawing as deterministic SVG primitives.

Do not ask the model to design the final Fold 2 responsive layout. That is your job.

---

## Stage 2 — Fold 1: apply the locked five-second opening

Once Fold 2 has a credible small path, update the opening exactly enough to match [`phase-8-homepage-first-fold-lock.md`](./phase-8-homepage-first-fold-lock.md).

### Required hierarchy

1. permanent site masthead/navigation;
2. `Harley Bartles · Full-stack software engineer`;
3. `Engineering the whole problem, not just the code.`;
4. proof rail;
5. `See the work ↓`.

### Proof rail copy

`5 years at The Access Group`

`Engineering responsibility for Access Checks, end to end.`  
`Technical design → delivery → release → support → operation.`

`Recently designed and delivered the service behind 2 additional paid screening checks.`

`See the work ↓`

### Remove stale material

- delete the duplicated first-fold homepage mini-index/jump links;
- remove the old paragraph-style Access Checks proof;
- remove `no source evidence, no successful result` from the first fold;
- do not add replacement cards, badges, metrics or technology labels.

### Composition

Keep it quiet/mineral/professional. Optical spacing may tune, but do not make Fold 1 compete with the project movements.

---

## Stage 3 — Fold 3: build the replay receipt

Create a new deterministic Wild Bunch proof asset rather than polishing the rejected tiny first-pass diagram.

### Page-level proportion

Start around **55–60% proof / 40–45% copy** on wide layouts, roughly a 7/12 + 5/12 relationship.

Preferred wide order: proof left, copy right.

The image must be large enough to inspect without leaning in.

### Three-column proof structure

A useful internal starting ratio is approximately:

- Column 1: 25%;
- Column 2: 45%;
- Column 3: 30%.

These are visual targets, not constants.

#### Column 1 — canonical event history

- ordered event stream / event history;
- vertically dominant;
- crisp and stable;
- immediately legible as the canonical record.

Use real event/source names only where readable and useful. Do not invent technical evidence for decorative realism.

#### Column 2 — two derivation mechanisms

**Shortcut/cache route**

- cleaner and more direct;
- convergent arrows leave the right side of the event history and resolve through the snapshot/cache mechanism;
- reads as the ordinary fast route to a usable current view.

**Full replay / robust rebuild route**

- use a clearly different arrow grammar;
- more recursive/curled;
- flow the event history downward toward the bottom, under/around the lower edge of the event-history column, then across into replay/reconstruction;
- make the route visibly longer and structurally distinct, not merely the same arrows reversed.

#### Column 3 — live derived state

Both routes resolve to the **same session/result**. That equality is the receipt.

This is the part that fades.

### Tintype information fade

Borrow the existing Wild Bunch `tintype breakdown into solid colour` material language without turning the section sepia or vintage-themed.

Apply the breakdown specifically to **Column 3, the live derived state**, because:

- it naturally sits near the visual/copy seam;
- it is derived, not canonical;
- the moment it exists, it is already becoming stale;
- it must continually be freshened either by ordinary update/cache work or by robust full replay.

Interpret the effect as **information under entropy**, not `old data is bad` and not western grunge.

Use deterministic SVG/CSS masks, filters, clipped texture or other controlled local technique. The equality/result must remain readable. Do not use generated Western imagery.

### One receipt, not a receipt wall

If the real Wild Bunch source gives you a short replay-equality assertion or equivalent fragment that remains readable at the proof scale, include **one** small verbatim source receipt. Inspect the current source before quoting it. Do not invent code for the visual.

If the real fragment makes the proof too dense, omit it in this wireframe rather than creating a tiny illegible code block.

### Copy

Headline:

`I only get to call the replay exact because it's falsifiable.`

Supporting copy in this direction:

`I said events were the source of truth. Then I audited the replay and found they weren't. I fixed the gaps until I could throw the snapshot away and reconstruct the same session from the event stream.`

CTA:

`Follow the trail →`

### Narrow composition

Reauthor rather than shrink.

A good order is:

1. headline;
2. proof graphic;
3. short supporting copy;
4. `Follow the trail →`.

Remove the three visible compensating explanation rows once the graphic can carry its own story. Provide an accessible semantic equivalent in the DOM rather than relying on those rows as a visual crutch.

---

## Stage 4 — Fold 4: preserve the accepted Writing proof

The current movement already passes.

Do not redesign it merely because nearby folds changed.

Preserve:

- label `Writing`;
- title `I made agentic engineering harder than it needed to be` for this proof specimen;
- title as dominant Source Serif visual object;
- current authored précis;
- offset editorial planes on wider layouts;
- meaningful negative space;
- `Read the article →` as sufficient proof CTA.

The current title is intentionally awkwardly long. Let the composition respond to the specimen; do not normalize it into a card.

Only tune page-level spacing or optical relationships if the new Fold 3 / Patch transitions expose a concrete issue.

---

## Stage 5 — Fold 5: preserve Patch exactly as accepted

Treat the integrated `PATCH / The Usual Specialists` movement as finished design input.

Do **not** regenerate imagery, recompose its internal breakpoint logic, reconstruct the wordmarks from type, alter the K flow behavior, or simplify the narrow story.

Preserve:

- canonical outlined `PATCH` marque;
- canonical outlined `THE USUAL SPECIALISTS` wordmark;
- `One question. Are you in?`;
- `Meet the crew →`;
- Silk crop;
- folder;
- Rollback;
- Receipt;
- Klause's true zero-flow K overprint;
- accepted wide/intermediate/narrow choreography and seam behavior.

The integrated Cloud review found that Patch survives outside its isolated proof and works as the final major visual peak. Do not weaken it to make provisional earlier folds look more equal.

Only tune **page-level** spacing before/after the movement.

No generative image work is authorized or needed for Patch in this pass.

---

## Stage 6 — professional close: rewrite the invitation, not the structure

Keep the current quiet return to the mineral/shared-site register. The structural idea of the existing close passes; the copy changes.

### Accepted close copy

Optional small orientation eyebrow may remain as the current `Work with me` if it still pays rent in the integrated composition. Do not add more orientation copy.

Headline:

`I've shown you how I work.`

Body:

`If that looks like the kind of engineering you want on your team, I'd like to hear what you're building.`

Primary/contact route:

`Tell me about it →`

Secondary routes:

`Read my CV`  
`About me`

The primary route replaces the old generic `Get in touch` wording in this close. Link it to the same truthful contact destination.

### Tone

The feeling is reciprocal and confident:

`I've shown you mine; show me yours. Maybe there is good work we could do together.`

Do not make it hostile, swaggering, needy or sales-led.

### Composition

Keep the large decompression after Patch. On wide layouts, the current two-plane invitation can remain. On narrow layouts, stack deliberately with the rule/spacing hinge as now.

The page has finished proving itself. Do not add another art peak, testimonials, metrics, summary paragraph or final manifesto.

---

## Stage 7 — whole-page composition pass

After every fold has the correct local content, inspect the page as **one authored sequence** rather than tuning each section in isolation.

The intended rhythm is:

1. quiet professional authority;
2. modular visual opening-up;
3. warm/calmer technical proof;
4. austere typography;
5. image-led Patch crest;
6. quiet professional invitation.

### Questions to answer in the browser

- Does Fold 1 earn one more scroll without already spending Fold 2's spectacle?
- Does Fold 2 feel like a real change of gear and clear its ten-second job despite being intentionally smaller than the final art-direction ceiling?
- Does Fold 3 calm the page without becoming a tiny architecture diagram?
- Can the replay receipt be followed in roughly fifteen seconds?
- Does Writing strip the page back rather than look unfinished?
- Does Patch feel earned after Writing rather than randomly imported?
- Does the close feel like the lights coming back up rather than a seventh content section?
- Are there accidental `every section = 100vh slide` rhythms? Viewport ownership is earned, not templated.
- Are project-native colours local and bounded, returning cleanly to the mineral substrate between movements?

Do not fix a whole-page problem by adding decorative filler.

---

## Stage 8 — responsive, semantic and failure-state proof

The wireframe must be inspected at the same four widths used in the current Cloud review. If exact viewport values are available in the existing local setup, reuse them. At minimum, cover a wide desktop, intermediate/tablet-like width, narrow/mobile width and very narrow/mobile width; do not infer production breakpoints from those review widths.

### Objective checks

At every review width:

- zero horizontal page overflow;
- all expected assets load with non-zero dimensions;
- navigation remains usable;
- CTA/link order remains logical;
- heading hierarchy and semantic text remain present even where presentation uses outlined SVG wordmarks;
- Fold 2 routes remain legible rather than collapsing into microscopic ornament;
- Fold 3 flow distinction remains legible;
- Writing remains editorial rather than card-like;
- Patch preserves its accepted zero-flow K behavior and authored reflow;
- close routes remain readable and comfortably tappable.

### Reduced motion

The proof must succeed with reduced motion. If the wireframe contains any transitional motion already, confirm `prefers-reduced-motion` resolves to the same strong stable compositions.

Do not add motion just to satisfy this checklist.

### Media-off / image failure

Preserve the accepted Patch `?media=off` behavior or equivalent existing proof path. Do not regress the semantic title/fallback behavior while touching page-level styles.

For new Fold 2/Fold 3 visuals, ensure the visible meaning has a semantic text equivalent. Do not expose a meaningless filename as alt text and do not depend on an unreadable SVG to carry the only explanation.

### Accessibility pressure

Inspect keyboard focus order and at least one zoom/reflow pressure condition. The static proof does not need to implement the production accessibility architecture, but it must not hide obvious composition failures that the production page would inherit.

---

## Stage 9 — evidence and handback

When the updated integrated wireframe is ready:

1. Update [`phase-8-homepage-wireframe-handoff.md`](./phase-8-homepage-wireframe-handoff.md) so it describes the **new** rendered state, not the pre-review scaffold.
2. Update wireframe asset custody/index records for any new Fold 2 or Fold 3 assets. Preserve rejected first-pass assets as historical evidence where practical.
3. Record:
   - files changed;
   - new assets and their provenance;
   - whether any generative exploration was used and, if so, which iteration supplied reference ideas;
   - what was redrawn deterministically;
   - exact review widths used;
   - objective overflow/media/semantic checks;
   - any deliberate known limitation, especially Fold 2 scope.
4. Stand the wireframe up locally and leave it ready for browser inspection.
5. If practical in the local environment, open the four review widths/tabs for the reviewer rather than merely stating that the HTML exists.

### Final baton — success

End the handoff with exactly this state when the complete integrated wireframe is ready:

**Ready for Cloud/Harley wireframe inspection**

Then stop.

Do not write the production homepage implementation plan in the same continuation. Do not touch production homepage code.

### Final baton — Fold 2 failure

If the intentionally small Fold 2 cannot reach a deliberate, credible ten-second state without expanding into the full visual side quest, end with:

**Blocked — Fold 2 stand-in does not clear the ten-second bar**

Include the best rendered attempt and a short concrete reason it fails. Do not hide the failure with the old lineage diagram.

---

# 10. Definition of done for this pass

This local wireframe pass is done when all of the following are true:

- Fold 1 matches the locked five-second hierarchy and has no duplicate homepage index.
- Fold 2 uses a small deterministic implementation of the accepted modular-channel language and contains no false Git-derivative wording.
- Fold 2 has been judged against its ten-second job in the integrated page.
- Fold 3 uses the three-column/two-flow replay receipt, not the tiny first-pass scaffold.
- Fold 3 fades the live derived state in Column 3, not the canonical event history or the whole section.
- Fold 3 uses `Follow the trail →`.
- Fold 4 remains the accepted typography-first proof without a new side quest.
- Patch remains the accepted The Usual Specialists movement without reinterpretation.
- The close uses `I've shown you how I work.` / `Tell me about it →` and feels reciprocal rather than deferential.
- Whole-page rhythm has been inspected at four review widths.
- Objective overflow, media and semantic checks have been recorded.
- The local wireframe is standing and ready to inspect.
- The handoff ends with either `Ready for Cloud/Harley wireframe inspection` or the explicit Fold 2 blocker.
- Production homepage work has not begun.

That is the complete authorized scope.