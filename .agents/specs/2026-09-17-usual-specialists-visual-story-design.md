# The Usual Specialists V2: Page-System Design

**Status:** Approved refactored page-system authority; specialist chapter designs continue to mature independently

**Design dialogue:** 17 September 2026

**Refactor authorised by Harley:** 17 September 2026

**Repository base at design-worktree creation:** `f5e89b7ac35a60f7fc6af36412e60708ece00b81`

**Route in scope:** `/patch/the-usual-specialists/next/`

## Purpose of this specification

This specification owns the page-level story system for The Usual Specialists V2.
It deliberately does **not** own the detailed composition of each specialist
chapter. Those designs live in chapter specifications so that each chapter can be
designed, reviewed, planned and implemented as a real piece of work rather than as
one task inside a page-sized implementation plan.

The previous 869-line specification combined page system, six chapter designs,
asset direction and implementation handoff material in one document. Harley
approved its decisions, then explicitly asked for the authority to be split into a
page specification plus one specification per chapter. This file is the page half
of that refactor. The split changes artifact boundaries, not the approved story.

## Authority hierarchy

For this epic, use these sources in order:

1. Harley's current instruction for the task at hand.
2. This page-system specification for cross-chapter story, continuity, route,
   responsive and final-close contracts.
3. The active specialist chapter specification for that chapter's local visual
   story, composition and assent staging.
4. `.agents/plans/usual-specialists-v2/roadmap.md` for sequencing and current
   milestone state.
5. The active milestone's JIT implementation plan for React, styled-components,
   tests, custody and verification mechanics.
6. Current repository source and active portfolio doctrine for implementation
   truth that does not change the approved design.

The roadmap and JIT plans may refine implementation seams from current source.
They may not silently redesign the page or fill missing chapter design decisions.

## Chapter specifications

The page delegates local chapter design to:

- `2026-09-17-usual-specialists-index-chapter-design.md`
- `2026-09-17-usual-specialists-writ-chapter-design.md`
- `2026-09-17-usual-specialists-klause-chapter-design.md`
- `2026-09-17-usual-specialists-rollback-chapter-design.md`
- `2026-09-17-usual-specialists-receipt-chapter-design.md`

Index, Writ, Klause, Rollback and Receipt have settled local designs. Silk remains
second in the six-specialist story and still owns `prove the route`, but its previous
chapter design and implementation were explicitly retired so the next Silk pass can
start from a clean foundation. Its traced name mark plus `PRESSURE | PROVE THE ROUTE`
lockup are retained as reusable identity work. JIT implementation plans remain sequential and
must still consume the actual accepted predecessor milestone output.

## Page story

The story is recruitment, not the caper.

Patch enters one ordinary apartment safehouse with intent, a working recruitment
folder and a caper that is not yet responsible to execute. He interrupts six
people who are already doing the work that makes them useful. Each specialist
removes a different kind of uncertainty until the caper has become so properly
staffed that showing the dangerous bit would be the less interesting story.

The actual caper stays off screen.

The directed sequence is:

1. **Index — discover:** what looks possible?
2. **Silk — prove the route:** what survives contact with reality?
3. **Writ — authorise:** under what authority and scope may the crew act?
4. **Klause — decide:** what exactly are we going to do?
5. **Rollback — recover:** what do we preserve when that decision fails?
6. **Receipt — record:** what consequential history must not be rewritten later?

The transformation is:

**intent → world knowledge → reliable route → authority → executable decision →
recoverability → durable record**.

No later chapter repeats an earlier specialist's job. In particular:

- Index does not prove one route.
- Silk does not resolve the operational plan.
- Writ does not choose the plan.
- Klause does not grant authority.
- Rollback does not merely enumerate alphabetical backups.
- Receipt does not appear only at the end of the story; his final chapter reveals
  that he has been maintaining the consequential record all along.

## Field form and viewing contract

The page is a directed scroll passage made from six locally authored chapter
fields inside one physically continuous safehouse. The page-level composition
guides the reader from room to room; each chapter may temporarily use a different
visual grammar to express how that specialist thinks.

The containing page must do two things at once:

- preserve orientation and physical continuity strongly enough that the reader
  knows these are rooms and working territories inside one safehouse; and
- get out of the way strongly enough that each specialist can own a genuinely
  different chapter form.

The page must not collapse those forms into a generic specialist template.

## One ordinary apartment bent to purpose

The safehouse is literal physical continuity, not a metaphor for six unrelated
sets.

- Index has a messy records/document den.
- Silk's physical territory will be re-authored during the fresh Silk design pass;
  only her route-pressure role and place in the safehouse sequence are fixed here.
- Writ has converted a pair of adjoining rooms into genuine law chambers, with a
  frosted door and receptionist space because his authority warrants the cachet.
- Klause has converted one medium-sized room into a clean, sparse office, but his
  chapter deliberately reduces the room toward an IKEA-white working field so the
  room never becomes the subject.
- Rollback has taken the concrete-walled basement for containment and recovery
  tests.
- Receipt has occupied an alcove with a view across the safehouse so he can
  observe and record while remaining largely peripheral.

Recurring apartment architecture, thresholds, corridor relationships, Patch's
physical movement and the folder provide continuity. Subjective chapter treatment
must not imply that the characters have teleported to unrelated locations.

## Opening contract

The opening establishes the safehouse threshold, Patch's live recruitment pitch,
the clean working folder and the fact that every specialist is already busy doing
the job Patch needs.

Keep the sense of physically entering one ordinary apartment rather than choosing
from a six-section card catalogue. The chapter navigation remains useful as a
secondary orientation aid, but it should be visually subordinate to the encounter.
Do not make the rail the first read or invent a second heavy mobile navigation
system.

The current `route-shaped problem` premise is obsolete. Patch begins with intent
and missing operational certainty, not a route that Index merely needs to validate.

The folder, architecture, thresholds and Patch's movement carry cross-page
continuity. The retired Silk/rope/crossing implementation has been removed from the
live tree. Future Silk work must establish its own chapter material and seam
contracts from the accepted Index boundary rather than revive the deleted system by
default.

## Folder continuity authority and pre-vis reference

The recruitment folder is Patch's live pitch object. It is carried, handled,
consulted and changed in-universe. It is not a floating progress widget and it is
not a repeated hero composition.

The strongest existing pre-vis reference is in the Adventures of Patch repository
at verified source revision `13bf77adc63cf5c8f49363cedd5dd392822b8375`:

`workbench/issue_48_override_heist_style_framework_v0_3/style-sheets/heist_pitch_folder/`

The accompanying textual system description is:

`workbench/issue_48_override_heist_style_framework_v0_3/style-bibles/09_pitch_folder_and_assent_marker_system.md`

That directory contains the stage-level continuity plates:

- `01_clean_folder_and_recruitment_list.png`
- `02_index_joined.png`
- `03_silk_joined.png`
- `04_rollback_joined.png`
- `05_writ_joined.png`
- `06_klause_joined.png`
- `07_receipt_joined.png`

These images are **reference evidence**, not production continuity masters. They
prove the intended material accumulation and are good enough to inspect while each
new state is built, but they contain two known limitations that must not become
shipping authority:

1. the generated folder/list geometry drifts between some stages; and
2. their historical sequence places Rollback before Writ, while the approved V2
   story order is Index → Silk → Writ → Klause → Rollback → Receipt.

Each chapter specification names its relevant pre-vis stage directly. Workers
should look back at that plate for material relationship and accumulation cues,
then implement the approved V2 story order and deterministic continuity contract.

The production folder contract is:

- one canonical folder geometry;
- one canonical handwritten working list;
- prior assent material always remains in place;
- exactly one specialist's material language is added at that specialist's
  completion;
- no independently regenerated whole-folder sequence may introduce drift.

The `Agents Needed` list is a loose working note, not the story-order authority.
Its existing name order does not dictate recruitment order. Strike-through state
follows the actual V2 sequence even when that means a later-listed name is crossed
before an earlier-listed one.

The page-order material states are:

| State | Required accumulated material |
| --- | --- |
| Opening | clean recruitment folder and working list |
| Index | folded blue blueprint/map sheet + yellow sticky assent note |
| Silk | prior Index material + a newly designed Silk assent state; exact material is intentionally open until the fresh Silk design pass |
| Writ | prior material + Writ's white original from the completed triplicate assent; yellow remains with Writ and pink goes to Receipt/file |
| Klause | prior material + produced red `K` impression on the folder |
| Rollback | prior material + Rollback's dog tags at the folder/spine |
| Receipt | prior material + stapled thermal recruitment summary |

The folder system is cumulative in design and incremental in implementation. This
page specification defines the complete state model now; the roadmap does **not**
require the first implementation milestone to manufacture every future marker.
Each chapter owns production and custody of its marker when that chapter becomes
active. This keeps future chapter imagery tied to approved local design instead of
commissioning it by anticipation.

The folder is a recruitment aid, memory object and accumulated assent record. It
is not a keycard, legal proof token or later operational-access object.

## Assent is the recurring story grammar

Every specialist closes their obligation to Patch in the same narrative shape,
without sharing one camera template:

1. the specialist's domain work reaches the point where Patch has what he needs;
2. the specialist has a character-specific **realisation beat** in which their own
   work reveals why Patch came to them in particular;
3. a material assent marker carries the recurring wording `you son of a gun. I'm
   in` in that specialist's own material language;
4. the accumulated folder state changes or is immediately confirmed in the next
   chapter; and
5. the specialist resumes their own work and life.

The repeated wording belongs to the markers, not to mandatory spoken dialogue. No
specialist needs to say the phrase aloud for the page to say it six times. The
realisation beat is the emotional answer; the marker is the durable narrative
answer; behaviour after the handoff is the character's return-to-life answer.

The six realisation temperatures are deliberately different:

- **Index — delighted validation.** She has run off through the evidence and
  returns excited that Patch was right: there really are the makings of a caper
  here, and the papers are genuinely thrilling if somebody will only read them
  properly.
- **Silk — impressed surprise.** She has tried hard to break the route and reaches
  the precise instant where she realises it held through everything she threw at
  it.
- **Writ — dry self-recognition.** `On whose authority?` exposes the missing
  layer; a wry smile, cocked head or equivalent small beat carries the recognition
  that the answer is Writ himself.
- **Klause — intellectual concession.** He has been mentally rejecting Patch's
  wild ideas as unviable, misguided or plain unhinged while Patch talks, then
  catches himself at the point where the scraps resolve into the makings of one
  good plan: exactly the reason Patch came to him.
- **Rollback — veteran recognition.** Patch admits there is no Plan B; Rollback
  diagnoses that as no plan at all, then Patch's wry response makes him realise
  the missing recovery layer is precisely why Patch is standing in his basement.
- **Receipt — gentlemanly sign-off.** Receipt already knows the recruitment record
  is complete. His beat is warm congratulation: Patch has actually assembled the
  people the caper needs. Well done, old bean.

The page must not turn this into six handshakes, six recruitment poses, six title
cards saying `I'M IN`, or six people waiting for Patch to dismiss them. Patch is
the interruption in their day.

The approved exit temperatures remain:

- Index is friendly and over-helpful, then dashes after another archival lead.
- Silk is already gone on another route test before Patch has finished registering
  the handoff.
- Writ closes the matter procedurally and returns to his rounds.
- Klause withdraws attention because the decision has already been made.
- Rollback gives up his own dog tags with no ceremony and moves on to the next
  containment problem.
- Receipt reveals he was already finished, then offers Patch tea because he is the
  one person who is not behind.

## Copy is earned by the medium

Each chapter may own one editorial story card. Additional copy is welcome only
when its physical or representational medium earns it: Index annotations, Silk
comic captions, Writ forms/signage, Klause decision surfaces, Rollback test
monitors, Receipt print.

Copy may name the problem, sharpen character voice or bridge a genuine inference.
It must not narrate an action that the composition can reasonably show.

Essential text embedded in imagery requires an accessible semantic equivalent.

## Cross-chapter rhythm

The super-composition is authored through changing information states rather than
one repeated layout:

**orientation → accumulation → rupture → bounded authority → reduction → failure
under stress → quiet record → completed result**.

The page-level verbs are:

- Index accumulates.
- Silk ruptures.
- Writ bounds.
- Klause reduces.
- Rollback absorbs failure.
- Receipt records.
- The folder accumulates the consequences.

These verbs should describe the visual behaviour of the page, not merely the
story-card prose.

## Transition contract

Transitions are narrative seams, not generic separators. The page owns their
order and their inter-chapter edge treatment; the adjacent chapters continue to
own all internal geometry.

- **Opening → Index:** ordinary entry into the safehouse and evidence field.
- **Index → Silk:** the major takeover. The polite shared surface gives way to a
  bounded black/dark comic field.
- **Silk → Writ:** the black field terminates. Stable boundary and formality
  reassert themselves at Writ's chambers.
- **Writ → Klause:** authority gives way to an IKEA-white decision field with
  almost no bodily movement; Klause's chapter progressively deletes alternatives
  until one decision remains.
- **Klause → Rollback:** the singular manila-folder / red-`K` decision leaves the
  quiet field and enters a constrained rebar-concrete basement built to let things
  fail safely. Rollback's chapter then places the audience inside containment
  before returning them to the recoverable side.
- **Rollback → Receipt:** noise, branching and containment compress into a quiet
  chronological record. Rollback's flashing operational amber gives way to steady
  domestic warmth in Receipt's small alcove.
- **Receipt → final folder:** the transition stays inside one continuous tea scene.
  Patch finally sits, Receipt brews a strong pot, the accumulated folder is placed
  casually on the table and stops moving. Attention then transfers from the relaxed
  people to the still object in the foreground.

Do not create one generic route-wide connector with chapter-specific configuration
just because every seam sits between two sections. The seams have different story
jobs.

## Final close

Only after all six assent markers have landed may the folder become the dominant
composition.

The final hero field is not a detached reveal. It grows directly out of Receipt's
hospitality. After the thermal strip is stapled on, Receipt offers tea. Patch sits
and exhales for the first time in the recruitment sequence. Receipt makes a strong
pot and sets out two well-loved cups and saucers with biscuits. Patch puts the
folder down on the table without presenting it.

The folder has moved throughout the whole page: carried, opened, handed over,
marked, returned and changed. Even Klause's deliberately still chapter moves it
between Patch and Klause. In the final field it becomes important because it stops.

The approved closing depth hierarchy is:

- completed folder in the foreground, sharp and still;
- tea service and table in the middle distance;
- Patch and Receipt relaxed behind it, drinking tea, eating biscuits and talking,
  softly subordinate to the object;
- only enough wider safehouse context to preserve physical continuity.

The reader should recognise the accumulated material languages without a legend.
The folder should remain handled, overstuffed and slightly absurd rather than being
cleaned into pristine product photography. The close concludes recruitment through
the visual inversion `earlier: the folder moves while specialists work; finally:
the specialists relax while the folder rests`.

The final field does not open a vault sequence, teaser montage or caper preview.

At this closeout milestone, the homepage Specialists alt/fallback copy must also be
reconciled with the final semantics. It must not describe Silk as making a route
`lawful` or describe the completed folder as merely one lawful route; route
reliability belongs to Silk, authority belongs to Writ, and the folder records the
whole recruitment.

The intended implication is simple: the hard part worth telling was assembling
the right people. The caper happens off screen and is boring precisely because
the recruitment was executed properly.

## Responsive and accessibility survival contract

Chapter-local responsive ownership is deliberate and remains protected.

The page-level authored responsive boundaries are mobile-first:

- default narrow composition below `390px`;
- `min-width: 390px` — compact composition;
- `min-width: 768px` — medium composition;
- `min-width: 1400px` — wide composition;
- `min-width: 1920px` — ultrawide / one-screen cadence composition; and
- widths above `2560px` freeze the authored `2560px` geometry rather than widening
  indefinitely.

These boundaries are shared editorial anchors, not permission for the page component
to own every chapter's responsive geometry. Each chapter decides how its own story
translates at those anchors. A chapter may add a local adjustment threshold only when
it has an explicit story, hierarchy, legibility or composition-mode reason. Historical
pixel nudges and collision repair are not sufficient reasons to create a new page-level
band.

The `768px` and `1400px` anchors also coincide with mature Bootstrap `md` and `xxl`
breakpoints, but that familiarity is supporting evidence rather than design authority.
The authored content remains the reason the composition changes there.

At `1920` CSS pixels and above, the page additionally adopts a wide-screen cadence
contract: each specialist chapter's complete authored chapter box, including its own
top and bottom padding, should fit within `1080` CSS pixels of vertical space.
Named inter-chapter transition bands sit outside that chapter-height envelope. This
is an outcome constraint, not a `height: 1080px` implementation instruction: wide
chapters should use the available horizontal field to recompose laterally and may be
shorter than 1080px. They must not clip, shrink readable copy below the established
reading standard or create artificial dead space merely to hit an exact height.

The contract applies only while the responsive layout is genuinely in the `1920+`
band. Actual browser zoom changes the CSS viewport and therefore naturally returns
the chapter to the appropriate narrower-band composition; the page must not attempt
to keep a zoomed 1920px physical screen in the wide-screen layout.

Every translation must preserve:

- causal beat order;
- the specialist's distinct role;
- inherited and outgoing folder continuity;
- assent-marker hierarchy;
- meaningful semantic/source order;
- the chapter's key visual invariant;
- comprehension with reduced motion; and
- no horizontal overflow.

It does **not** need to preserve desktop coordinates, desktop panel count or a
single camera arrangement.

Material review includes 1440, 768, 390 and 320 CSS pixels, actual 200% browser
zoom, keyboard-only use, `prefers-reduced-motion: reduce` and thumbnail/reduced-
detail first-read review.

For chapters implementing the `1920+` wide-screen cadence, material review also
includes `1920×1080` and `2560×1080`, with objective proof that the authored chapter
box is no taller than 1080 CSS pixels at both widths. Widths above 2560 continue to
freeze the 2560 composition and therefore inherit the same height ceiling.

No story-critical content may require hover, scroll-jacking or animation.

## React ownership boundary

The design expects implementation to preserve the architecture already emerging
in the preview route:

- `UsualSpecialistsPage.tsx` is a thin explicit composer of opening, navigation,
  named transition seams, chapter sections and final close.
- each specialist chapter is a semantic React section with its own beat order,
  styled-components layout, responsive vocabulary, visual assets and tests;
- route-level styles may own the global canvas ceiling and ordinary document
  flow, not specialist internals;
- transitions may own only the small band/edge between chapters;
- `RecruitmentFolder` is the deliberate shared continuity primitive;
- no universal config-driven `SpecialistChapter` abstraction may erase the
  intentionally different chapter grammars.

These are ownership constraints, not a demand that every chapter have identical
file names or component counts. Local chapter specifications may justify focused
composition children where a visual slot has real internal layering.

## Wireframe-before-generation contract

Generated imagery follows the chapter's actual composition rather than defining
it. For materially new or redesigned chapters:

1. settle the chapter's causal design;
2. build and review the real React/styled-components wireframe in the preview
   route;
3. freeze the media roles and slot geometry that genuinely survive;
4. commission only missing roles into candidate custody;
5. judge candidates in their live composed slots;
6. promote accepted masters and generate derivatives; and
7. keep only the source/provenance still required by active or explicitly retained
   work; Git history is the recovery path for project-owner-authorised retirement.

An attractive image that forces a chapter to abandon its approved story order or
move chapter geometry into the page shell is the wrong asset for the slot.

## Asset and custody contract

Active accepted image masters, candidates, generation receipts and provenance remain
under `src/client/assets/patch/the-usual-specialists/`. Browser-facing derivatives
under `src/client/public/media/patch/the-usual-specialists/` are processor-owned
output and must not be hand-edited.

The retired Silk/rope asset packages and their generated derivatives were explicitly
authorised for deletion once Index was locked. Git history is their recovery path.
The traced `silk-wordmark.svg` is intentionally retained outside that retired media
pipeline as reusable identity artwork.

## Existing route and publication seam

The legacy `/patch/the-usual-specialists/` route remains the frozen indexed
canonical six-specialist presentation until a separate explicit cutover decision.

V2 remains only at unlinked `/patch/the-usual-specialists/next/` during this epic,
with `noindex, nofollow`, no canonical publication identity and no sitemap or
discovery exposure. Completing a roadmap milestone does not grant cutover
authority.

## Superseded and preserved decisions

There is no current Silk composition authority beyond her story role, sequence
position and retained identity lockup. The previous Silk visual design and its media
estate are historical only and must not be treated as a starting template for the
fresh design pass.

The system preserves:

- the accepted Index composition as the visual control case;
- the temporary legacy-canonical/V2-preview route seam;
- the mobile-first, content-authored responsive boundary convention established on
  18 September; and
- the 10 September principle that V2 grows through approved chapter work rather
  than pretending unfinished specialists already exist.

The planning refactor strengthens that last principle: each chapter now has its
own design authority and JIT plan instead of living as one task in a whole-page
plan.

## Non-goals

- Do not show the caper itself.
- Do not make the folder the hero of every chapter.
- Do not turn the folder into an access credential, proof object or later caper
  key.
- Do not flatten the specialists into one shared visual grammar.
- Do not preserve old Silk composition because of sunk cost.
- Do not resurrect the retired Silk/rope/crossing implementation by default; if a
  future design needs similar material, re-derive it from the new chapter design.
- Do not make Writ a parody law office.
- Do not let Writ own Klause's decision function.
- Do not let Klause own Writ's authority function.
- Do not reduce Rollback to an alphabet-of-plans infographic or military theatre.
- Do not restore Rollback's CRT `I'M IN` assent beat.
- Do not make Receipt secretive or hurried.
- Do not let explanatory copy rescue a composition that cannot tell its story.
- Do not use the historical folder pre-vis order as the V2 chapter order.

## Page-system acceptance criteria

- [ ] A reader can describe the recruitment progression as discover → prove →
      authorise → decide → recover → record.
- [ ] The apartment remains one physically coherent safehouse despite distinct
      chapter grammars.
- [ ] The folder is visible often enough to prove continuity but never becomes a
      repeated chapter hero.
- [ ] Every chapter inherits prior assent material and adds exactly one new marker.
- [ ] Every specialist closes with both assent and visible return to their own work.
- [ ] Named inter-chapter seams express the next story state without taking over
      adjacent chapter geometry.
- [ ] Responsive translation preserves causal roles and source order rather than
      desktop coordinates.
- [ ] The completed folder earns the final hero field only after all six assents.
- [ ] No caper action follows the recruitment payoff.
- [ ] The preview route remains unpublished until a separate cutover decision.

## Readiness and next step

This page specification is sufficiently settled to govern the roadmap and every
chapter design. It is not, by itself, an executable implementation specification
for the whole route.

The next planning shape is the epic roadmap at
`.agents/plans/usual-specialists-v2/roadmap.md`. Each chapter milestone reads this
page spec plus its local chapter spec, completes any missing chapter design, passes
spec-readiness, then receives one JIT implementation plan. Future chapter plans are
not written in advance.
