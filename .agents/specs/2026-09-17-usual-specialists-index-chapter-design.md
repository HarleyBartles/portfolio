# The Usual Specialists V2: Index Chapter Design

**Status:** Settled design, revised 18 September 2026 with Harley-approved editorial changes to the closing research sequence; Index is the next JIT planning target before Silk

**Parent page spec:** `2026-09-17-usual-specialists-visual-story-design.md`

**Chapter question:** What looks possible?

## Story job

Index takes Patch's underspecified intent and establishes the current evidence
landscape: where they are, what they have, where they need to get, what constraints
exist, what conditions may matter and which routes look viable enough to take
forward.

She does **not** prove one route and does not hand Silk a solved route.

Her output is a useful bundle of possibilities and constraints: maps, blueprints,
old design material, annotations, records and a yellow assent note. Silk inherits
that bundle and asks which pieces survive contact with reality.

## Audience change

The reader should move from "this is a chaotic archive" to "Index sees a working
system in this mess and can extract several plausible ways through it." Apparent
disorder is her operating system, not an obstacle she has to tidy first.

## Primary visual family and viewing contract

**Primary family:** field/site.

**Supporting families:** curation/juxtaposition and continuous narrative.

**Viewing contract:** guided-exploratory. The reader can browse the evidence field,
but repeated Index/Patch figures, document relationships and scale changes recover
the throughline.

Index is the control case for the wider page because her chapter already proves a
specialist can own a dense local grammar while preserving semantic source order and
responsive legibility.

## Safehouse territory

Index has appropriated one apartment room as a records/document den. The documents
are not decorative paper texture. Their overlaps imply source relationships,
revision, provenance, age and active investigation.

The ordinary apartment remains physically real beneath the treatment, but the
chapter can be dominated by the document field. Index understands the room through
its evidence, so the page lets the evidence become terrain.

## Composition authority

Preserve the accepted Index document-world composition as the control case, but do
not freeze the current closing research cluster. Harley approved a focused editorial
recomposition on 18 September 2026 because the existing observation/file/sticky-note/
story-card arrangement is visually strong but under-tells its causal story.

Keep:

- the dominant document field and blue carrier;
- layered papers, maps, blueprint/calculation material and marginalia;
- repeated traversal figures that make the papers feel navigable;
- office/observation and file-extraction changes of scale;
- the messy-but-readable responsive strategy;
- Index's messy bun, oversized cardigan and soft, unhurried silhouette; and
- the sense that Index moves fluently through material that would overwhelm Writ
  or Klause.

Do not turn Index into the template for the other chapters. "Specialist traverses
themed substrate" is an Index-specific success, not the series grammar.

## Closing research sequence: approved editorial recomposition

The closing cluster should read as a causal mini-sequence rather than four adjacent
pieces of good-looking material.

The intended reading order is:

1. **Deep research / observation.** Index is still immersed in the evidence field,
   checking sources and constraints rather than posing for a conclusion.
2. **Recognition bridge.** A small rectangular text panel bridges the overlap from
   research into the filing-cabinet retrieval beat. It contains the quoted spoken
   line `“Ah. This one.”`. The rectangle should read as part of the composition,
   while the quotation marks make clear that this is Index speaking aloud offscreen,
   not narrator copy and not a thought bubble.
3. **Found source.** The filing-cabinet hands image now reads as a specific
   recognition/retrieval beat: Index has found the source she was looking for, not
   merely performed a generic research action.
4. **Assent consequence.** A new third image panel closes the sequence by showing
   the changed carried state in Patch's hands: the folder is tightly cropped, the
   folded blue blueprint/map material is visibly tucked into it, and Index's yellow
   assent note sits on the front.

The two existing image panels may continue to overlap. The quoted `“Ah. This one.”`
panel should become the semantic bridge across that overlap rather than merely being
placed as a caption inside the filing image.

At the widest layouts, move the editorial story card earlier/upward into the open
upper-right area so it frames the sequence before its final beats. The card should no
longer occupy the lower-right space that the recognition bridge/retrieval sequence
needs, and it should not be the last major item encountered in a conventional
left-to-right, top-to-bottom reading path. Responsive translations may recompose the
geometry, but should preserve the same causal order.

The current free-floating yellow sticky-note treatment is superseded as active
composition authority. Preserve its accepted source/provenance in custody, but do not
keep it in the render merely because it was previously the transient join between
the two image panels.

### Third-panel hierarchy

The third panel is **not** permission to turn the folder into Index's hero object.
Its job is to show the consequence of Index's work and make the changed carried state
legible without staging a separate filing ceremony or explicit handoff action.

Compose it as a tight crop of Patch's hands carrying the folder:

- the yellow assent note is the dominant read and occupies most of the useful frame;
- only enough manila folder is visible to establish what the note is attached to;
- one side of the folded blue blueprint/map material is visible spilling/tucking out
  from the folder;
- Patch's hands keep the object handled, in-world and in motion rather than posed as
  product photography; and
- the frame reads as a passing outcome beat, not a folder glamour shot.

Author this panel as a new image asset because the accepted traversal art does not
expose the folder as an independently composable layer. Do not respond by
retrofitting a synthetic React `<RecruitmentFolder state="index" />` into the earlier
Patch traversal figures.

## Silk rope intrusion through Index

The red rope visible through Index is intentional. Do **not** reinterpret it as
Index theming, an accidental legacy artefact or a generic page-wide continuity
spine that should be removed from the chapter.

The rope is Silk-owned narrative material whose spatial reach begins before Silk.
It enters above Index under tension, passes through Index's territory as subordinate
background matter behind the papers, crosses the Index-to-Silk seam, becomes active
and functional in Silk, and terminates inside Silk before Writ.

Narrative ownership does not imply one cross-chapter DOM owner. The current modular
rendering principle is correct and should be preserved:

- Index renders only the passive rope segment that lies inside Index's own box;
- that segment sizes and reflows from Index's own responsive geometry;
- the inter-chapter seam owns only the small connecting segment across its edge;
- Silk renders the active rope inside Silk; and
- no chapter measures a sibling chapter's height or reaches into sibling layout
  geometry to make the rope continuous.

Continuity is therefore a matched-port contract between locally owned segments, not
a single element spanning sibling sections. Change the local port geometry only if
the approved Silk recomposition actually requires it. Do not refactor the rope out
of Index merely because its material language belongs to Silk.

## Semantic correction from the current implementation

The previous story copy that said Index works until "one route holds together" was
wrong and has now been corrected in the active V2 implementation.

The chapter ends with possibility, not route certainty. Its semantic target is:

- present state understood;
- target state understood;
- constraints and conditions surfaced;
- several routes or route fragments look viable;
- enough material exists for Silk to pressure-test them.

The existing `TRACE THE ROUTES` idea is closer to the correct job than singular-
route language.

## Folder continuity and Adventures pre-vis reference

Patch carries the working folder naturally while pitching. It should not become a
folder glamour shot inside Index.

In the current accepted Index implementation, that carried folder is **not** an
independent React object or visual layer. It is baked into the whole-character Patch
traversal assets, including `patch-follow.webp`, `patch-return.webp` and
`patch-leaning.webp`. `IndexTraversal` renders those complete Patch images. The blue
working material and yellow assent note are separate Index elements in the scene;
there is no existing React composition that attaches them to a standalone folder.

That is intentional implementation truth, not a missing abstraction to repair.
Do **not** introduce `<RecruitmentFolder state="index" />` or a newly isolated folder
layer into the earlier traversal figures merely to make the narrative state literal.
Doing so would either duplicate a folder already present in Patch's pixels or force
unnecessary re-authoring of the accepted Patch traversal art.

The outgoing "Index folder state" below is a continuity contract for the story, not
a requirement that Index render a separate stateful folder component. The revised
closing sequence now makes that contract visible through the new tightly cropped
Patch-hands outcome panel. This is an authored image beat, not a standalone folder
primitive and not an explicit handoff ceremony.

Silk must visibly inherit that accumulated material. The shared `RecruitmentFolder`
primitive should still begin only where an independently composable folder is
genuinely useful; it must not be retrofitted into Index's earlier traversal figures
by default.

The relevant Adventures of Patch stage-level continuity pre-vis is:

`workbench/issue_48_override_heist_style_framework_v0_3/style-sheets/heist_pitch_folder/02_index_joined.png`

Use that image as reference for the physical relationship between the folder,
folded blue blueprint/map material and yellow assent note. It is not a production
master: the historical sequence contains folder/list drift and is subordinate to
the parent page spec's deterministic folder contract.

Index's outgoing V2 folder state is:

- canonical folder/list unchanged;
- folded blue blueprint/map sheet added; and
- yellow Index assent note added to that material.

The next chapter must visibly inherit those additions.

## Closing beat

Index is the warmest departure in the crew.

Her realisation beat is delighted validation. She has disappeared into the source
material because Patch's proposition gave her something worth tracing, then
returns with the energy of somebody who has proved the exciting part to herself:
Patch was right, there really are the makings of a caper here, and the documents
are frankly fascinating if somebody will only read them properly.

That is the emotional meaning of `you son of a gun. I'm in`; the phrase itself
lives on her yellow assent note rather than needing to be spoken as catchphrase
dialogue.

Her work resolves into the useful evidence bundle and yellow assent marker. She
gives Patch more than the bare minimum, genuinely hopes it helps and makes it clear
he can come back if needed. Then her attention is already being pulled toward
another promising archival lead somewhere else.

The marker/material is the narrative answer. Her buoyant dash toward the next
document problem is the character answer.

Do not make her wait for a recruitment celebration.

## Copy and in-universe text

Index earns copy through her working medium: document annotations, marginalia,
sticky notes, labels and one editorial story card.

Copy may explain what the evidence cannot show cleanly, but should not turn the
chapter into a narrated research report. In particular, prose must not reintroduce
singular-route certainty.

## Responsive survival contract

Preserve the invariant:

**Index can navigate disorder fluently.**

At different widths the evidence may spread sideways, pile vertically or become
more claustrophobic. The exact desktop overlap geometry is not sacred.

Index uses the page's mobile-first authored boundaries as its primary composition
vocabulary: default narrow, then `min-width: 390px`, `min-width: 768px`,
`min-width: 1400px` and `min-width: 1920px`, with geometry frozen above 2560px.
The `768px` transition is the point where the compact/mostly stacked evidence field
earns a genuinely two-dimensional medium composition. The `1400px` transition is the
point where the chapter deliberately spends additional horizontal field to become a
wider, shallower editorial spread. Those are authored changes, not device labels.

Existing `900px` and `1600px` implementation thresholds are not protected design
authority. Either may survive only if live review identifies a specific local
story/hierarchy capability that begins there and cannot be expressed fluidly inside
the surrounding authored band.

Index is the first chapter to establish the page-level wide-screen cadence. At
`1920` CSS pixels and above, the complete Index chapter box, including its own top
and bottom padding, must fit within `1080` CSS pixels of vertical space. Achieve that
by using the available width to make the document field and closing sequence more
lateral, not by forcing a fixed 1080px height, shrinking readable copy or clipping
the evidence field. The Index-to-Silk transition remains outside this height
envelope. Widths above 2560 freeze the 2560 composition and retain the same ceiling.

This wide-screen constraint does not apply when browser zoom reduces the effective
CSS viewport below 1920px. Actual 200% zoom must continue to receive the appropriate
narrower responsive composition.

At every supported state:

- document relationships must still feel cumulative rather than card-like;
- Index's path through the field must remain recoverable;
- the chapter must still end in candidate-route evidence rather than route proof;
- the closing sequence must preserve research → quoted recognition → found source →
  assent consequence even when panel geometry changes;
- Patch's carried folder must remain present through the accepted traversal art;
- the new outcome panel must keep the yellow assent note dominant while making the
  tucked blue material and carried folder relationship materially legible; and
- at 1920px and 2560px widths, the complete chapter box must measure no more than
  1080 CSS pixels tall without clipping or overflow; and
- the story must remain understandable at 320 CSS px, actual 200% zoom and reduced
  motion.

## Non-goals

- Do not visually rebuild the accepted Index field.
- Do not make Index a route validator.
- Do not make Index's mess bureaucratic, noir/detective or magical-library
  dressing.
- Do not promote the folder to the chapter hero.
- Do not retrofit a standalone Index folder component into the accepted Patch
  traversal art. The approved third outcome panel is an authored carried-state image,
  not a new folder abstraction or handoff ceremony.
- Do not remove the passive Silk rope segment from Index on the mistaken assumption
  that Silk-owned material must be spatially contained inside Silk's section.
- Do not preserve exact prose merely because a test currently asserts it.

## Chapter acceptance criteria

- [ ] A reader can state that Index returns viable possibilities and constraints,
      not one proven route.
- [ ] The accepted document-world composition remains recognisably the current
      Index chapter.
- [ ] The story card frames the closing sequence early enough that it does not become
      a late explanatory afterthought in wide-layout reading order.
- [ ] The existing image-panel overlap now has causal meaning through the quoted
      `“Ah. This one.”` recognition bridge.
- [ ] The filing-cabinet image reads as a found-source beat rather than generic hands
      performing research.
- [ ] A third outcome panel shows Patch carrying the changed state: yellow assent
      note dominant, folded blue material visibly tucked into the folder, folder
      itself subordinate.
- [ ] Silk can visibly inherit the Index folder state at its own entry.
- [ ] Index visibly returns to her own research life after Patch has what he came
      for.
- [ ] Index's realisation reads as excited discovery/validation rather than a
      generic recruitment yes.
- [ ] Responsive translation preserves fluent navigation through evidence rather
      than desktop coordinates.
- [ ] At `1920×1080` and `2560×1080`, the complete Index chapter fits within the
      1080px viewport-height contract while preserving readable type, the full causal
      close and the passive Silk rope run.

## Planning readiness

No unresolved local creative question is known. The singular-route copy correction
is already implemented. Index is now the next JIT planning target before Silk. The
plan should preserve the accepted document-world control case and intentional passive
Silk-rope intrusion while implementing the approved closing-cluster editorial
recomposition: earlier story-card placement, quoted recognition bridge, clearer
found-source beat, retirement of the floating sticky-note render, and one new
sticky-note-first carried-folder outcome panel. It must not turn that panel into a
synthetic folder abstraction or a folder hero composition. The JIT plan must also
spell out the intended composition at every established Index responsive band and
prove the new `1920+` / 1080px chapter-height ceiling.
