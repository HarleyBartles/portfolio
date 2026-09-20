# The Usual Specialists V2: Index Chapter Design

**Status:** Settled and implemented Index design; responsive composition locked
before the fresh Silk chapter design/spec pass

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

- the yellow assent note is the dominant first read while retaining ordinary
  sticky-note scale, roughly 20–30% of the full frame width;
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

Index uses the locked mobile-first composition vocabulary implemented in
`indexResponsive.ts`: default narrow below `600px`, compact at `600px`, walking
traversal readiness at `700px`, medium at `960px`, arrival crossing at `1200px`,
upper-wide at `1300px`, wide at `1400px`, return-pair availability at `1600px`, and
ultrawide at `1920px`. These are authored story/layout transitions rather than device
labels. Geometry freezes at the authored `2560px` composition above that width.

The supported floor is `320px`; no layout invariant is promised below it. Preserve
the accepted `600–959px` behaviour, the proportional `959→960` handoff, vertical
continuity across `1399→1400`, and the walking-lane ownership when the return pair
appears at `1600px`. Local fluid or bounded in-band adjustments may refine placement,
but must not create a new chapter-level composition mode or break those named
ownership boundaries.

Index is the first chapter to establish the page-level wide-screen cadence. At
`1920` CSS pixels and above, the complete Index chapter box, including its own top
and bottom padding, must fit within `1080` CSS pixels of vertical space. Achieve that
by using the available width to make the document field and closing sequence more
lateral, not by forcing a fixed 1080px height, shrinking readable copy or clipping
the evidence field. Any future Silk chapter or transition is outside this height
envelope. There is no `1080px` chapter-height contract below `1920px`. Widths above
2560 freeze the 2560 composition and retain the same ceiling.

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

## Approved composition invariants

- The document world is the dominant field. Main route material, blue carrier, graph
  paper, marginalia, traversals and interpretive copy must continue to read as one
  navigable evidence environment rather than a collection of unrelated cards.
- Index remains fluent inside that field. Character appearances are landmarks through
  the evidence, not decorative cutouts, and must stay registered to the substrate or
  action they inhabit when the field recomposes.
- Repetition of the same character carries time. Two visible Patch appearances or two
  visible Index appearances must remain legible as distinct successive moments rather
  than collapsing into one local read that looks like duplicate bodies. This constraint
  does not separate different characters: Patch and Index may share, overlap or inhabit
  the same beat whenever their relationship is the action.
- The kneeling Patch + Index inspection beat is one paired composition. Their internal
  relationship may scale or move as a unit for responsive layout, but the two figures
  do not drift apart and are not independently nudged to solve unrelated collisions.
- That kneeling pair belongs to the observation/office panel. It must remain visually
  registered to that panel at every width; Index is intentionally partially occluded
  by the panel/foreground edge, and that occlusion is part of the authored read rather
  than a defect to reveal away.
- Character traversal figures remain attached to the substrate/beat they belong to.
  Responsive translation may move the owning composition, but must not let a figure
  appear to float between unrelated panels or cross into a neighbouring beat merely
  to recover space.
- The story card is an interpretive voice inside the evidence field, not a page-level
  hero. It must frame the close early enough to orient the reader without displacing
  the document world as the chapter's first-order visual proposition.
- The story card owns no right to float over protected content. It must not cover the
  Index name mark, outgoing Index, Patch's active movement beat, or another character
  appearance that carries sequence/time. If a surface cannot provide safe lateral
  negative space, the card receives its own authored vertical slot instead.
- The closing sequence remains a visibly connected causal chain: research -> quoted
  recognition -> source retrieval -> assent outcome. Panel overlap may imply continuity,
  but may not obscure the source-retrieval action enough to damage its read.
- The quoted `“Ah. This one.”` bridge is the recognition pivot between research and
  retrieval. It may reflow with the sequence but must not detach into arbitrary spare
  whitespace or become narrator copy.
- The assent outcome is the closing punctuation/hero of the sequence. At compact and
  narrow widths it must not become materially smaller or weaker than the preceding
  image frames while still being asked to carry the terminal beat. This hierarchy
  applies across the responsive estate, not only on small screens.
- Within that outcome, the yellow assent state is dominant, the changed carried material
  is legible, and the folder remains subordinate rather than becoming the prize itself.
- The observation/office panel protects its human action: Index's face remains readable
  and responsive overlap may not cover more than half of Patch's visible body.
- The source-retrieval panel protects the filing hand/action. The assent outcome may join
  the retrieval frame through controlled overlap, but it must not cover the filing hand
  or read as an unrelated manila panel intruding on top of retrieval.
- Returning Patch and returning Index are a paired temporal beat and therefore share
  visibility state. They are either both rendered in the composition or neither is.
- The Patch + Index inspection pair remains present together at every supported width;
  compactness alone is not a story reason to remove the beat.
- Below 390px, the image frames must still form an intentional spatial relation --
  stacked, alternating or diagonal as the composition requires -- rather than reading
  as unrelated rectangles differentiated only by scale.
- Responsive repair happens at the level of these relationships first. Do not solve a
  collision by independently nudging one character or one panel if that breaks a paired
  beat, substrate attachment, causal sequence or hierarchy. Responsive translation owns
  story roles and relationships, not literal desktop coordinates.
- Below `1920px` there is no chapter-height ceiling. Spend vertical space when that is
  required to preserve the story. At `1920px` and above, the complete Index chapter
  including local padding must fit within `1080px` height.
- Chapter-bottom breathing room is authored punctuation after the assent outcome. It
  must not be the accidental remainder of a fixed stage/min-height reservation.

## Non-goals

- Do not visually rebuild the accepted Index field.
- Do not make Index a route validator.
- Do not make Index's mess bureaucratic, noir/detective or magical-library
  dressing.
- Do not promote the folder to the chapter hero.
- Do not retrofit a standalone Index folder component into the accepted Patch
  traversal art. The approved third outcome panel is an authored carried-state image,
  not a new folder abstraction or handoff ceremony.
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
- [ ] Index visibly returns to her own research life after Patch has what he came
      for.
- [ ] Index's realisation reads as excited discovery/validation rather than a
      generic recruitment yes.
- [ ] Responsive translation preserves fluent navigation through evidence rather
      than desktop coordinates.
- [ ] The story card clears all protected identity/character regions throughout each
      responsive family, including immediately on both sides of every authored boundary.
- [ ] The Patch + Index inspection pair remains present together at all widths, and the
      return pair shares one visibility state.
- [ ] The outcome panel has terminal visual weight comparable to or greater than the
      office/retrieval image beats and does not cover the protected filing hand.
- [ ] The chapter ends with deliberate breathing room rather than leftover fixed-stage
      depth.
- [ ] At `1920×1080` and `2560×1080`, the complete Index chapter fits within the
      1080px viewport-height contract while preserving readable type, the full causal
      close and the document-world hierarchy.

## Locked implementation handoff

Index is implemented and its responsive composition is locked. The previous
Silk/rope/crossing implementation has been removed from the live tree; a future
Silk chapter must start from the accepted Index boundary rather than inherit
that retired architecture. The reusable Silk name lockup is the sole retained
implementation piece. Preserve Index's document-world control case, its
substrate-owned character beats, the directed closing-sequence relationships,
and the `1920+` / 1080px chapter-height ceiling as the next chapter is designed.
