# The Usual Specialists: Visual Story and Chapter-System Design

**Status:** Approved by Harley on 17 September 2026

**Design dialogue:** 17 September 2026

**Written specification:** 17 September 2026

**Repository base:** `f5e89b7ac35a60f7fc6af36412e60708ece00b81` (`origin/main` at worktree creation)

**Route in scope:** `/patch/the-usual-specialists/next/`

**Implementation-plan readiness:** Approved for JIT implementation planning; implementation remains governed by the resulting reviewed plan

## Goal

Rebuild *The Usual Specialists* as one coherent recruitment story in which six
specialists turn Patch's caper from intent into something executable,
recoverable, and auditable. Each chapter must feel native to the specialist who
owns it, while the apartment safehouse, Patch, and the accumulating recruitment
folder preserve continuity across radically different visual grammars.

The story is the recruitment, not the caper. The caper remains off screen. By
the time the crew is assembled it should feel almost offensively boring to show
the dangerous part, because the specialists have already removed the uncertainty
that would make it dramatic.

This design keeps Index as the proven control case, materially redesigns Silk,
and tightens the Writ, Klause, Rollback, Receipt, opening, transition, and final
folder contracts before further chapter commissioning or React integration.

## Design basis

The design is grounded in three sources of truth:

1. the accepted Index implementation and its live responsive behaviour;
2. the disposable chapter wireframe reviewed on 17 September 2026, whose chapter
   ideas remain useful even where individual modules are superseded; and
3. the Adventures of Patch pitch-folder continuity system at revision
   `ddfec34e65b311785f4cb10d81823499b9cedca5`, especially
   `workbench/issue_48_override_heist_style_framework_v0_3/style-bibles/09_pitch_folder_and_assent_marker_system.md`.

The Adventures source establishes the folder as a recruitment aid, memory
object, and accumulated assent record. It is not the later proof/access object.
Its marker material languages remain authoritative inputs: Index's folded
blueprint and sticky note, Silk's route pin and red cord, Rollback's dog tags,
Writ's pink carbon-copy slip, Klause's produced K stamp, and Receipt's thermal
receipt.

The old seven-image folder sequence remains pre-production reference rather
than production continuity authority. Its generated folder and list drift are
not acceptable for the shipping chapter sequence.

## Outer story contract

Patch enters the safehouse with a caper and a working recruitment folder. He
does not recruit six idle experts waiting for a plot. He interrupts six people
who are already doing the work that makes them useful.

The chapter sequence is:

1. **Index — discover:** establish where the crew is, where it wants to go, what
   is known, what the constraints are, and which routes appear viable.
2. **Silk — break and prove:** stress the candidate routes, discard failed
   assumptions, and assemble one ingress/egress route from the pieces that
   survive contact with reality.
3. **Writ — authorise:** establish the authority, scope, limits, ownership, and
   expiry under which the crew may act.
4. **Klause — decide:** reduce the now-viable, authorised possibilities until
   there is one explainable and executable plan.
5. **Rollback — recover:** define what happens when that plan, and the plans
   after it, fail; preserve people, mission, and recoverability beyond named
   contingencies.
6. **Receipt — record:** preserve the consequential decisions and assents so
   nobody can rewrite what happened afterwards.

Each specialist removes a different uncertainty. No later chapter should redo
an earlier specialist's job.

## The safehouse is one ordinary apartment bent to purpose

The safehouse is physically continuous. The chapters are not separate fantasy
locations and should not read as six unrelated sets. Their difference comes
from how each specialist has adapted an ordinary apartment space and from how
the page represents that specialist's way of working.

- **Index** has turned her space into a messy records office/den. Documents,
  revisions, maps, archival material, notes, and working piles are genuinely
  how she navigates the problem.
- **Silk** owns the corridor, doors, floorboards, service voids, conduit,
  anchors, and other building infrastructure she can pressure-test. The black
  comic substrate is the chapter's representation, not a claim that the actual
  corridor is painted black.
- **Writ** has converted a pair of adjoining rooms into actual law chambers,
  with a frosted door and receptionist space. This is not faux-institutional
  styling. He is the arbiter of law around these parts, and the office has the
  cachet his work requires.
- **Klause** has converted one medium-sized room into a clean, sparse,
  deliberately uncluttered office because decision work benefits from removing
  competing information.
- **Rollback** has taken the basement because its concrete walls are the right
  place to run containment and recovery tests.
- **Receipt** has occupied an alcove with a useful view across the safehouse.
  From there he can observe and record without becoming a visual participant in
  every event.

Recurring architectural clues, thresholds, Patch's movement, and the folder
keep the spaces connected. The page may become subjective inside a chapter,
but the apartment remains real beneath the treatment.

## Folder continuity contract

The recruitment folder is the outer-story continuity prop. It is not the hero
of every chapter. Patch carries it because he is actively pitching the caper,
and it should behave like a handled in-universe object rather than a floating
recap widget.

The folder must appear at the start and/or end of every specialist chapter so
the audience can register its accumulated state. It may also appear naturally
inside a chapter when Patch would physically have it with him. It must not be
forced into every frame.

The production system must use one canonical folder geometry and one canonical
working list. Every chapter state preserves all previous material and adds only
the current specialist's assent marker. The old whole-frame generated folder
sequence may guide material and placement ideas but must not be used as a chain
of independent continuity masters.

The `Agents Needed` list remains a loose handwritten working note. Its list
order does not dictate recruitment order. Strike-throughs follow the story's
actual recruitment state, even if that means a later-listed name is crossed
before an earlier-listed one.

The page-order folder states are:

| State | Required visible continuity |
| --- | --- |
| Opening | clean recruitment folder and working list |
| After Index / entering Silk | Index folded blueprint plus yellow assent sticky note |
| After Silk / entering Writ | Index material plus Silk route pin clipped to the blueprint, with red-cord logic where physically plausible |
| After Writ / entering Klause | prior material plus Writ's pink carbon-copy assent slip |
| After Klause / entering Rollback | prior material plus Klause's produced K impression on the folder |
| After Rollback / entering Receipt | prior material plus Rollback's dog tags hanging from the folder/spine area |
| After Receipt / final close | all prior material plus Receipt's stapled thermal-paper recruitment summary |

At small sizes the audience does not need to read every assent sentence, but
the material identity must survive: blue folded sheet, yellow note, circular
route pin/red line, pink slip, K mark, metal tags, thermal strip.

## Assent closing contract

Every chapter owns its own version of “the business is concluded; good day.”
The repeated structure is narrative rather than photographic:

1. the specialist's work reaches the point where Patch has what he came for;
2. the assent marker becomes the closing-beat hero;
3. the folder state is updated in this beat or unambiguously confirmed at the
   next chapter opening; and
4. the specialist returns to their own life and work.

The assent marker is the narrative answer. The specialist's departure behaviour
is the character answer.

The endings must not become six handshakes, six `I'M IN` title cards, or six
people waiting for Patch to dismiss them. Patch is the interruption in their
day.

- Index is the warmest: she supplies more useful material than asked for,
  sincerely hopes it helps, invites Patch to call if needed, then dashes toward
  some enticing archival lead elsewhere.
- Silk has mentally moved on before Patch has finished registering the answer.
- Writ closes the matter with procedural finality and resumes his rounds.
- Klause withdraws attention almost immediately because the decision has been
  made and further conversation adds nothing.
- Rollback gives up his own dog tags with no ceremony and returns to active
  containment work.
- Receipt reveals that the recruitment business was already complete, then is
  the one specialist relaxed enough to offer Patch tea.

## Copy must be earned by the medium

Every chapter may have one editorial story card, but a story card is not the
default container for everything the audience needs to know. Copy should do one
of three jobs: name the problem, sharpen character voice, or bridge an inference
the visual story cannot carry cleanly.

Do not use copy to narrate an action the composition can reasonably show.

Additional copy is welcome when the chapter's medium earns it. In-universe name
marks, forms, signage, document annotations, monitor states, receipt print, and
comic captions can carry language because they are part of the specialist's
working world.

Examples of earned copy include:

- Index's document annotations and sticky note;
- a Silk comic caption such as “Apparently that means she said yes” after the
  visual action has already made the assent clear;
- Writ's frosted-door identity, authority forms, and procedural notation;
- Klause's nameplate and decision materials;
- Rollback's monitor/status language, provided it describes the test rather
  than redundantly shouting assent; and
- Receipt's printed audit/recruitment summary.

Essential text embedded in imagery must have an accessible semantic equivalent.

## Opening

### Story job

Establish one ordinary apartment safehouse, Patch's live recruitment pitch,
the working folder, and the fact that each specialist is already busy doing the
job Patch needs.

### Keep

- the safehouse/apartment threshold;
- the physical sense of moving into a place rather than selecting a card grid;
- the chapter navigation as a usable secondary orientation aid; and
- the folder as a clean in-universe prop at the start of the recruitment.

### Change

The current “route-shaped problem” précis and any wording that implies Index
will return one proven route must be rewritten. Patch begins with intent and an
underspecified caper, not a route that simply needs validation.

Demote the chapter rail visually so the safehouse encounter remains the first
read. Navigation should be recoverable without announcing a six-section
microsite ahead of the story.

Do not use one long red journey rope as a series-wide spine. Red rope/cord is
too strongly owned by Silk to become generic navigation. Preserve local rope
where it belongs to Silk or a materially justified handoff.

## Index — discover the viable routes

### Audience change

The reader should understand that apparent disorder is Index's working
environment, not an obstacle to her. She can navigate documents and evidence
that other specialists would find unnavigable, and she converts that mess into
a useful bundle of candidate routes and constraints.

### Primary visual family

Field/site, supported by continuous narrative and curated evidence.

### Keep

Index is the accepted control case. Preserve the dominant document field,
layered papers, blue carrier, blueprint/calculation material, traversal figures,
office/observation inset, file/macguffin extraction, messy-but-readable rhythm,
and the existing responsive strategy unless a concrete implementation defect
requires bounded repair.

Her costume and movement are part of the same argument: messy bun, oversized
cardigan, soft silhouette, and fluent movement through apparent clutter all say
that she organises mess in her own way.

### Change

Correct the story semantics. Index does not trace evidence “until one route
holds together.” She establishes present state, desired state, known evidence,
constraints, conditions, and routes that look viable enough to take forward.

The chapter closes on the folded blueprint and yellow sticky-note assent. Patch
leaves carrying those materials in the folder. The next chapter must visibly
inherit them.

### Invariant

At every viewport, Index remains a person fluently navigating a layered evidence
field rather than a sequence of document-themed cards.

## Silk — break the candidates and resolve the route

### Audience change

The reader should move from “Index found several plausible ways through” to
“Silk has found the ingress/egress route this crew can rely on.” Silk does not
resolve the whole plan. She resolves the route.

She may discard entire candidate routes and combine surviving portions of more
than one candidate. Her output is one reliable way in and out without getting
the crew burned.

### Primary visual family

Encounter/sequence, supported by frame/surface and internal-frame/occlusion.
Unlike Index's browsable field, Silk's causality must be difficult to read out
of order.

### Substrate and chapter takeover

Silk explicitly does **not** use the mineral page as her dominant substrate.
Index-to-Silk is a forced threshold into black/dark comic-book territory,
paying off the homepage Specialists promise that a polite portfolio surface can
tear open onto another visual world.

The chapter should feel like: “you are coming with me on this adventure for one
chapter; normal service resumes at the next fold.”

The actual location remains an ordinary apartment corridor and its service
infrastructure. The dark comic field is the story form through which Silk's
boundary-testing behaviour becomes legible.

### Page behaviour

Most of the chapter must behave like a comic page so that one moment of refusal
can break the rule.

The chapter may use panels, gutters, torn page edges, and framed cells as real
story boundaries. A panel edge may stand for an assumed route boundary; a tear
or breach changes what is physically possible. The page and the wall can rhyme:
page is wall, wall is page, and Silk breaches both.

Silk's transparent full-body character treatment is scarce. Use one canonical
breakout where she visibly stops obeying the panel/page grammar. If transparent
Silk is continually floating above frames, the transgression has no value.

### Beat map

1. **Entry / inheritance:** camera establishes Patch arriving in Silk's test
   corridor with the folder. The folded blue blueprint and yellow Index note
   must be recognisable. Silk receives candidate routes, not a blank mission.
2. **Test:** Silk subjects the candidates to actual corridor conditions — cheap
   doors, floorboards, service voids, conduit, anchors, and other physical
   constraints. At least one proposed route must visibly fail rather than merely
   receive a different scenic view.
3. **Refusal / breach:** the given path or panel boundary no longer works.
   Silk creates the chapter's canonical rupture and crosses outside the comic
   rule that had contained her.
4. **Building guts:** the new route passes through hidden service
   infrastructure. This is consequence, not another decorative hole. The red
   cord/rope acts as a functional route and force vector.
5. **Resolution:** surviving portions of the candidates are recombined into one
   dependable ingress/egress route. A restrained reaction insert may remain if
   it adds the precise “that survived” beat; it is not mandatory coverage.
6. **Assent aftermath:** the route pin is now clipped to Index's blueprint on
   Patch's folder. Silk is already leaving for other work.

### Closing shot contract

The closing Silk frame replaces the unimplemented marker-toss/stand-in ending.

The camera is with Patch, slightly behind and to one side, looking down the
corridor. Patch is a partial foreground repoussoir rather than a portrait.
His folder is visible enough to establish the continuity state: Index's folded
blueprint, the yellow note, and Silk's newly attached circular route marker.

The marker is the first read. Its relationship to Index's prior material is the
second read. The final read is Silk already well down the corridor on a zipwire
toward an off-frame destination for some other job.

The frame should imply the handoff happened a beat ago rather than staging a
ceremonial exchange. Patch may still be touching or settling the fresh marker
if that helps the physical read. Silk does not wait for thanks.

The final movement vector exits the frame so the audience understands that
Silk has a life and workload beyond Patch's recruitment story.

### Remove from active composition authority

- the 12 September mineral-page-as-plaster substrate decision;
- repeated large plaster aperture rims as the chapter's dominant grammar;
- the Receipt peek-through subplot from Silk;
- equal-weight scenic corridor apertures;
- decorative re-occlusion that exists only to justify transparent layers; and
- the current Commission 09 stand-in/knockthrough ending.

### Reuse candidates, not obligations

The current corridor world, service-corridor imagery, transparent traversal
assets, local rope pieces, and surprised-eyes asset may be reused if they serve
the new beat map. Their prior acceptance does not give them a guaranteed place
in the redesigned chapter.

Retiring an asset from composition authority does not authorise deleting its
accepted master or provenance. Asset-custody rules govern any later cleanup.

### Responsive invariant

Preserve **inheritance → test → failure → breach → hidden traversal → reliable
route → assent aftermath**. Do not preserve desktop panel count for its own
sake. Narrow layouts may merge or omit subordinate inserts, but they must keep
one canonical breakout and the closing corridor/folder result.

## Writ — establish the authority to act

### Audience change

The reader should understand that a physically reliable route is not enough.
Writ establishes whose authority the crew acts under, what that authority
permits, where it begins and ends, and when it expires.

### Primary visual family

Frame/surface and visual rhetoric, supported by controlled staging.

### Environment

Keep the wireframe's over-Patch-shoulder arrival toward the plain frosted door,
but treat the chambers as a real conversion of adjoining apartment rooms. The
receptionist space, frosted glass, formal signage, clerks, forms, and procedural
movement have weight because Writ actually runs the law here.

After Silk's dark rupture, Writ should feel like being arrested by geometry.
Frames stabilise. Camera and eyelines become controlled. Boundaries regain
authority.

### Beat map

1. Patch arrives carrying Index and Silk's accumulated folder state.
2. Writ continues his rounds while Patch pitches.
3. Writ reaches the precise stop: “Absolutely not. On whose authority?”
4. The chapter resolves the authority/scope problem rather than retesting the
   route.
5. Writ's pink carbon-copy assent slip becomes the closing hero and is filed
   into Patch's folder.
6. Writ resumes his rounds with procedural finality.

The wireframe's Receipt filing-copy cameo may survive only as a low-weight,
almost peripheral foreshadow. It must not steal Writ's closing beat. If used,
Receipt simply takes the appropriate copy and disappears back into the system.

### Copy

Door identity, forms, signatures, annotations, and procedural language are
earned copy surfaces. Replace “make the route lawful” language with authority
and scope language; Silk has already resolved the route.

### Invariant

Nothing consequential crosses Writ's boundaries without clear authority and
ownership.

## Klause — reduce possibility to one plan

### Audience change

The reader should understand the difference between a reliable authorised route
and an executable plan. Klause removes options until the crew can commit.

### Primary visual family

Curation/juxtaposition and decision sequence.

### Environment

Klause's space is one ordinary medium-sized apartment room stripped down into a
clean, sparse office. Its austerity is practical rather than institutional.

### Change from the wireframe

The nine-panel wireframe over-covers a character whose job is reduction. Keep
the strong ideas — nameplate/threshold, pen stop, eyes/attention, Patch being
admitted into the geometry, one diagnosis exchange, decision, K mark, Klause
already back at work — but collapse them into roughly four or five meaningful
states.

The page should simplify as the chapter proceeds. Early possibilities may
compete. Late possibilities should disappear. By the assent beat, one decision
owns the field.

Do not use “Nothing moves unless Klause permits it” as the central proposition;
permission belongs to Writ. Klause owns choice and commitment.

### Assent

Klause's produced K impression on the folder is the closing marker. Preserve
the source marker rule: the important object is the resulting mark, not a rubber
stamp tool, hand, or ink-pad performance. Once the decision exists, Klause
returns to the work Patch interrupted.

### Invariant

Choice gets narrower until action becomes possible.

## Rollback — preserve recoverability when plans fail

### Audience change

The reader should understand that a good plan still needs a way back when it
goes wrong, and that true recovery is deeper than having a labelled Plan B.

### Primary visual family

Sequence supported by mass, stillness, and counterfactual failure.

### Environment

Rollback owns the concrete-walled basement because it is the obvious safehouse
space for containment and recovery testing. The CRT/monitor language and active
simulation field remain useful.

### Beat map

1. Patch arrives with the current folder while Rollback is already running
   unrelated daily simulations.
2. Plan A or an equivalent active test visibly fails.
3. The environment moves; Rollback remains calm and contains the failure.
4. He listens to Patch and asks the essential question: “What's your Plan B?”
5. The exchange makes clear that Rollback cares about recoverability beyond a
   finite alphabetical stack of alternatives.
6. Rollback snatches his own dog tags from around his neck and tosses them to
   Patch as the assent marker.
7. He turns straight back to the containment work. Business concluded.

### Remove

Remove the CRT `I'M IN` assent state. The monitor may identify Rollback, show
test state, or carry useful operational language, but it must not repeat the
meaning already carried by the dog-tag handoff.

The dog tags are the closing hero. Their coming directly from Rollback's body
gives the gesture weight without requiring him to perform sentimentality.

Do not turn the basement into military theatre. The material language is
industrial containment and recovery.

### Invariant

The environment can fail loudly while Rollback remains the stable mass that
keeps recovery possible.

## Receipt — reveal that the record was already there

### Audience change

The reader should realise that Receipt has not suddenly appeared at the end of
the story. He has been observing the safehouse and maintaining the consequential
record all along.

### Primary visual family

Detail/insert and curation/revelation.

### Environment

Keep the tiny audit alcove, warm practical light, trays, rolls, clock, carbon
copies, archive boxes, and the feeling of reliability rather than secrecy.
Receipt's alcove gives him a useful vantage across the safehouse while allowing
him to remain largely unnoticed.

### Beat map

1. Patch arrives carrying the most accumulated pre-Receipt folder state,
   including Rollback's tags.
2. The chapter quietly reveals evidence that Receipt has been maintaining the
   record throughout the recruitment. Earlier cameos may support this, but a
   recap montage must not.
3. Patch begins or prepares to pitch.
4. Receipt politely stops him: the record and assent are already done.
5. Receipt's thermal-paper recruitment summary is the closing marker and is
   stapled to the folder.
6. Instead of dismissing Patch, Receipt apologises that he came all this way
   unnecessarily and offers him a pot of tea.

Receipt is the deliberate deceleration after the previous chapters' operational
pressure. He has time because he is not behind.

The receipt is a recruitment summary, not an audit ledger, legal proof,
keycard, or operational-access credential.

### Invariant

If it mattered, it already left a trace.

## Final close — the folder finally earns the frame

Only after all six assents have landed may the recruitment folder become the
hero composition.

The final frame should let the audience recognise six distinct material
languages without requiring an explanatory legend. It is a visible result of
the story rather than a premise presented in advance.

Do not transition into a vault sequence, caper montage, or “coming next” action
tease. The caper happens somewhere off screen. The intended implication is that
the crew has made it boring enough not to deserve dramatic coverage.

Final copy, if any, should be brief and earned. The composition must carry the
main conclusion before prose explains it.

## Cross-chapter rhythm and transitions

The overall page should alternate information states rather than repeat one
chapter template:

**orientation → accumulation → rupture → containment → reduction → failure under
stress → quiet record → completed result**.

The transitions should express the next specialist's logic:

- **Opening → Index:** enter the safehouse and the document-world without a
  theatrical rupture.
- **Index → Silk:** the major takeover. The polite page yields to the black/dark
  comic field.
- **Silk → Writ:** the chapter ends at a fold/threshold; the dark comic logic
  stops and Writ's controlled apartment chambers reassert stable boundaries.
- **Writ → Klause:** formal authority gives way to quieter decision geometry.
- **Klause → Rollback:** move from clean commitment into the concrete basement
  where that commitment is subjected to failure and recovery thinking.
- **Rollback → Receipt:** release noise and mass into the warm, narrow alcove.
- **Receipt → final folder:** compress the whole recruitment into the completed
  carried object.

Transitions must preserve orientation unless temporary disorientation is the
point, as in the Index-to-Silk takeover. Even there, the reader must recover a
landmark quickly: Patch, the inherited folder, the corridor, or the route line.

## Responsive translation contract

Keep the established breakpoint ownership unless implementation evidence
requires a separately approved revision:

- `320–389`
- `390–719`
- `720–899`
- `900–1399`
- `1400–1599`
- `1600–1919`
- `1920–2560`
- widths above `2560` freeze the `2560` composition.

Responsive work preserves story roles and order of importance, not desktop
coordinates or module count.

Across all chapters:

- the specialist's primary story job must survive at 320px and 200% zoom;
- the folder continuity state must remain materially recognisable at chapter
  boundaries;
- assent markers must remain closing-beat heroes rather than tiny afterthoughts;
- story cards may move or reflow but must not become the only place the story is
  understandable;
- decorative/subordinate frames may merge or disappear when they do not carry
  essential causality;
- no scroll-jacking is permitted;
- reduced motion must preserve the same before/after state and hierarchy; and
- a framework's natural stacking order must not invent a different story.

Silk in particular must not preserve the current tall scenic-aperture stack on
narrow screens. Preserve the causal beats, one canonical breakout, and the
closing assent aftermath instead.

## Asset and custody strategy

### Index

Treat the current accepted Index masters and derivatives as protected visual
evidence. Changes are limited to copy/semantic correction and any folder
continuity work that does not disturb the accepted field unless a concrete
rendering defect is separately approved.

### Silk

Classify current accepted Silk assets as one of three things during the
implementation plan:

1. **reuse candidate** — serves a beat in the new black comic sequence without
   forcing the old composition;
2. **reference-only** — useful source/mood/material evidence but no longer part
   of the active page; or
3. **superseded composition asset** — accepted provenance remains in custody,
   but the asset no longer governs the page.

The mineral aperture rims and Receipt peek-through are expected to leave active
composition authority. The corridor, service infrastructure, traversal, rope,
and reaction assets remain reuse candidates subject to actual storyboard fit.

### Folder

Build a canonical production continuity system rather than generating each
whole folder state independently. The design requirement is deterministic
continuity: same folder, same list, prior markers preserved, exactly one new
assent addition per recruit state.

The implementation plan may choose layered runtime composition, deterministic
rendered state masters, or another custody-safe method, but it must prove that
the result cannot drift between chapters.

### Future chapters

Use the wireframe commission ideas as shot/story references, not as a mandate to
produce every numbered commission. Every proposed asset must earn a distinct
story role before generation. Klause is explicitly expected to need fewer
frames than the nine-panel wireframe.

All generated-image replacement, retirement, or promotion work remains subject
to the existing asset-custody manifests, provenance records, derivative
processor, and review gates.

## Planning handoff contract

The implementation plan must treat the current V2 preview as the existing flow,
not as a greenfield rebuild. Plan against these concrete file families and
ownership seams:

- route composition and chapter order: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`, its test, and the `usual-specialists/` chapter owners beneath it;
- shared opening, crossings and navigation: `usual-specialists/UsualSpecialistsOpening*`, `CrossSectionConnector*`, `SpecialistsChapterNav*`, and their geometry/tests;
- protected Index composition: `usual-specialists/Index*` and `indexResponsive.ts`; change only the semantic copy and the minimum continuity integration required by this spec unless a separate defect justifies more;
- Silk redesign: `usual-specialists/SilkChapter*`, `silkResponsive.ts`, and the current `Silk*Composition*` helpers/tests, with the old aperture/Receipt/Commission 09 composition treated as removable from active render while accepted custody remains intact;
- later chapter owners: add Writ, Klause, Rollback and Receipt as chapter-local vertical slices under `usual-specialists/`, with chapter-local styles, responsive ownership and tests rather than one route-wide breakpoint module;
- folder continuity: one canonical folder-state owner under `usual-specialists/` must feed every chapter boundary; six independently generated whole-folder states are not an acceptable implementation seam;
- browser proof: extend `src/client/e2e/project-story.spec.ts` and the protected visual-regression coverage only where the approved composition actually changes.

The source/derived media boundary is also fixed. Accepted masters, candidates,
provenance and package indexes live under
`src/client/assets/patch/the-usual-specialists/`. Browser-facing derivatives
under `src/client/public/media/patch/the-usual-specialists/` are processor-owned
output. `src/client/scripts/process-usual-specialists-assets.mjs` owns the
derivative inventory and receipt; do not hand-edit derivative files or generated
`INDEX.md` surfaces.

The planner may split the work into chapter-sized implementation tasks and image
commissioning/custody tasks, but it must preserve the dependency order:
storyboard/asset decision before generation, accepted source custody before
derivative registration, chapter implementation before visual-baseline approval,
and the completed folder only after all assent states exist.

### Validation bundle for the plan

Use focused checks during implementation, then the tracked commit hook as the
canonical local gate for the staged tree. The plan must name the exact focused
commands it needs, including:

- `npm --prefix src/client run media:usual-specialists:check` after any accepted-source, derivative-manifest or provenance change;
- focused Vitest for the chapter/component contracts being changed;
- focused Playwright coverage in `src/client/e2e/project-story.spec.ts` for chapter order, responsive causality, overflow, reduced motion and continuity state;
- `py -3 tools/run.py index-mesh --check` when tracked navigation indexes change; and
- the repository's canonical `py -3 tools/run.py ci --check` only when an explicit uncommitted full-pipeline proof is needed. For normal commits, do not duplicate the canonical gate immediately before or after the tracked hook.

Material visual review must include 1440, 768, 390 and 320 CSS-pixel states,
keyboard-only use, reduced motion and actual 200% browser zoom. Before/after
visual evidence must make the intentional departures from the current Silk
chapter inspectable; screenshot equality is not design approval.

The black Silk chapter is a deliberate **bounded bleed** under the portfolio
visual-language contract: it occupies one finite specialist field, earns its
project-native interruption through the comic/page story, and visibly terminates
at the fold into Writ's chambers. It does not authorise a dark route shell,
themed site navigation or a replacement for the cool-mineral substrate elsewhere.

## Visual-story review contract

Review the page first as a complete field, then each chapter at desktop,
mid-width, narrow, 200% zoom, reduced motion, and thumbnail/reduced-detail scale.

For every chapter, reviewers must be able to state without invented context:

1. what uncertainty Patch brought in;
2. what the specialist did that nobody else in the crew does;
3. what materially changed before and after the chapter;
4. which assent marker concluded the business;
5. how the accumulated folder state changed; and
6. what the specialist returned to doing after Patch ceased to matter.

For every subordinate panel or insert, ask whether removing it changes
knowledge, causality, rhythm, or character. If not, remove it.

At thumbnail scale, the first read must be the chapter's active story region,
not an accidental high-contrast aperture, card, or decorative element. At the
end of each chapter, the assent marker should win the closing hierarchy.

## Accessibility and performance boundaries

- Essential in-image writing receives semantic HTML or equivalent accessible
  text.
- Decorative chapter text may remain visual only when it carries no information
  needed to understand the story.
- Reduced motion must remove optional parallax/travel effects without removing
  cause, consequence, or the visible changed state.
- Do not require hover to reveal story-critical material.
- Avoid long continuous transforms or page-scale animation used merely to make
  the chapters feel cinematic.
- Asset count, image dimensions, and deferred loading must be justified by
  visible story work. A commissioned frame with no distinct role is a cut, not
  a sunk-cost obligation.

## Superseded and preserved decisions

This specification **supersedes the 12 September 2026 Silk decision** that made
the shared mineral route surface literal safehouse plaster and explicitly
avoided a comic-page skin. Silk now earns a black/dark comic substrate and uses
page/frame boundaries as causal story material.

Because that changes a protected substrate/default, the implementation slice
must add a dated `docs/design-decisions.md` entry recording this replacement,
the bounded-black rationale, the preserved Index and preview-route contracts,
the objective review guards, and a reconsideration trigger. Do not silently let
this spec supersede the live decision ledger.

This specification **preserves**:

- the 10 September decision to grow V2 chapter by chapter from accepted visual
  work;
- the accepted Index composition as the protected control case;
- the temporary legacy-canonical/V2-preview route seam until a separate cutover
  decision changes it; and
- the inclusive breakpoint bands recorded on 14 September.

It also corrects the semantic assumption that Index hands Silk one proven route.
Index hands forward evidence and plausible candidate routes; Silk resolves the
reliable route.

## Non-goals

- do not show the actual caper as the payoff;
- do not turn the folder into the keycard/proof/access object;
- do not make the folder the hero of every chapter;
- do not force all six chapters into one visual grammar;
- do not preserve commissioned Silk assets because of sunk cost;
- do not give Silk repeated decorative breaches with no state change;
- do not make Writ a fake-law-office parody;
- do not make Klause's decision function overlap Writ's authority function;
- do not turn Rollback into military theatre or an alphabet-of-plans infographic;
- do not make Receipt secretive when his real advantage is quiet visibility;
- do not duplicate assent with generic `I'M IN` screens after the marker already
  carries the answer; and
- do not let explanatory copy rescue a composition that cannot tell its own
  story.

## Acceptance criteria

- [ ] A reader can describe the outer recruitment progression as discover →
      prove → authorise → decide → recover → record.
- [ ] The apartment remains one physically coherent safehouse despite each
      specialist's distinct visual grammar.
- [ ] The folder is visible often enough to prove continuity but never becomes
      a repeated chapter hero.
- [ ] Every chapter inherits all prior assent material and adds exactly one new
      marker.
- [ ] Every specialist's closing beat communicates both assent and “my work
      continues after you.”
- [ ] Index ends on viable candidate routes, not a falsely proven single route.
- [ ] Silk uses a black/dark comic substrate, contains one canonical frame/page
      breakout, visibly rejects at least one candidate assumption, and resolves
      one reliable ingress/egress route from surviving pieces.
- [ ] Silk's closing corridor frame shows the updated folder in Patch's
      foreground and Silk already leaving down the corridor/zipwire for other
      work.
- [ ] Writ resolves authority/scope rather than route viability.
- [ ] Klause's chapter becomes simpler as the decision narrows and uses fewer,
      more consequential states than the nine-panel wireframe.
- [ ] Rollback's environment can fail around his calm response, the dog tags are
      the assent hero, and no CRT `I'M IN` beat remains.
- [ ] Receipt's chapter reveals prior audit continuity, ends with the thermal
      assent marker, and includes the unexpected hospitality/release beat.
- [ ] The completed folder earns the final hero frame only after all six assent
      markers have landed.
- [ ] No vault/caper action sequence follows the recruitment payoff.
- [ ] Responsive layouts preserve causal beat order and hierarchy rather than
      desktop panel count.
- [ ] Essential in-image copy remains accessible and reduced motion preserves
      the same story state.
- [ ] Superseded accepted assets retain honest custody even when they leave the
      active composition.

## Readiness

The design has no known unresolved creative question that should be delegated to
implementation. After Harley approves this written specification, the next step
is a JIT implementation plan that maps these chapter contracts onto the current
React, responsive, asset-custody, generation, and review systems.

Until that approval, this document is design evidence only and does not
authorise source implementation or new image generation.
