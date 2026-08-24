# Portfolio £10k Phase 5: The Lawful Heist Crew Design

**Status:** Approved by Harley Bartles on 24 August 2026

**Roadmap item:** Phase 5, Adventures of Patch showcase and pipeline story

**Public route:** `/patch/lawful-heist/`

**Public title:** The Lawful Heist Crew

## Goal

Publish a substantial Adventures of Patch story built around the six specialists Patch recruits for a lawful vault override. The page should make the crew memorable as characters, show why each discipline belongs in the plan, and let the recruitment folder carry a beginning, progression and ending without pretending that an upstream deck or finished heist sequence exists.

The page is a portfolio-native finished artefact assembled from accepted Adventures of Patch character work and six purpose-built assent-marker derivatives. The upstream adventure remains in development.

## Audience and outcome

The primary reader is a hiring manager, interviewer or senior engineer who may know nothing about the Patch universe. After reading, they should understand:

- Patch has designed a vault that correctly refuses to open and needs a lawful, controlled route back in;
- the eventual override depends on provenance, pressure testing, authority, decision, recovery and audit;
- each crew member embodies one of those responsibilities with a distinct personality;
- thorough preparation makes the heist itself almost offensively boring;
- the character system and production record are deliberate work, even though no upstream adventure deck has been published.

The page should also work as a character introduction. A reader should be able to remember at least two crew members without first learning the production pipeline.

## Approved framing

The public story keeps the Lawful Heist premise and changes the camera angle. Patch is the organiser, equivalent to Ocean assembling the crew, but does not need a forced visual appearance. The recruitment journey is the story.

The opening standfirst is the working copy contract:

> Patch needs into a vault he designed never to open. He writes six names on a sheet of paper. The crew they belong to will make the eventual heist almost offensively boring.

`Override Heist` may remain the source packet's working title. The public portfolio title is **The Lawful Heist Crew**.

## Narrative architecture

The page has three movements.

### 1. The clean folder

Open with the vault problem, the clean recruitment folder and Patch's six names. The folder is the adventure's continuity object. It should feel like the beginning of a plan rather than a decorative hero image.

Do not begin with a status table, technical explanation, cast grid or defensive note about the unfinished upstream deck. State the current development status once, quietly and honestly, after the hook has earned attention.

### 2. Six recruitments

Present the specialists in functional order:

1. Index finds candidate routes and establishes provenance.
2. Silk pressure-tests those routes until the false ones fail.
3. Writ establishes lawful authority and scope.
4. Klause reduces the surviving options to a decision.
5. Rollback adds recovery and contingency.
6. Receipt records what happened and preserves the audit trail.

Each profile contains:

- the character's name and responsibility;
- one canonical approved portrait;
- a compact description grounded in personality rather than role-definition jargon;
- one strong spoken line;
- an individual assent marker that records their version of joining the crew;
- enough connective copy to show how their contribution changes the folder passed to the next recruit.

The sections must read as a sequence, not six interchangeable biography cards. Composition may alternate or change emphasis, but a repeated visual trick must not compete with the accumulating folder story.

### 3. The completed folder

Close with the completed recruitment folder and Receipt's record. The conclusion should cash the opening promise: the preparation has removed the drama from the actual override. Do not invent vault-opening art, action scenes or an elaborate heist report to make the ending feel larger.

Link once to the Adventures of Patch engineering case study for readers interested in the production system behind the story.

## Crew contract

### Index, provenance before choice

Index is bookish and thorough. Index begins with the vault's history, changes and records, then identifies candidate routes without pretending to choose or authorise one.

Working line:

> The route exists. Now Silk needs to prove it isn't a loophole.

The assent marker is the folded blueprint and handwritten note established by the folder continuity assets.

### Silk, pressure before confidence

Silk is tenacious, dogged and cool. She will find the legitimate route even if she has to blow the false ones apart to prove it. The humour comes from the severity of the test, not from presenting her as careless.

Working line:

> Give me the route. I'll show you where it breaks.

The assent marker is the steel ring and red tension cord established by the folder continuity assets.

### Writ, authority before action

Writ is fusty, institutional and more concerned with authority than ingenious loopholes. His objection is procedural because procedure is the thing that makes the override lawful.

Working lines:

> Absolutely not. On whose authority?

> An override without authority is merely trespass with better stationery.

His assent is formal, triplicate and properly filed. His joining line may use the established variant, `You sly old bombardier. I'm in.`

### Klause, decision before activity

Klause is serious, disciplined and impatient with excess options. He sits at an immaculate desk and can reject a plan without manufacturing motion around it.

Working lines:

> Bring me ten plans and I'm not interested. Bring me five plans, I'm listening. Bring me three plans, we'll talk.

> You do not have a plan. You have a meeting.

The second line is his durable character by-line. It must not be narrowed to this heist. His assent marker is the decisive stamped mark established by the folder continuity assets.

### Rollback, recovery without drama

Rollback is calm, blunt and veteran-coded. He never raises an eyebrow. Plans A through P can fail and the filing cabinet can burn down; he already has the next safe move.

Working line:

> What's your Plan B? If you don't have one, you ain't got a plan.

He moves from that challenge to joining without blinking, throws in his dog tags and carries on. The dog tags are his assent marker.

### Receipt, evidence after the room forgets

Receipt is mild, quiet and precise. He has been present throughout, recording and filing an endless stream of receipt paper.

Working lines:

> Nobody notices he's there until someone needs a receipt.

> Before you ask, yes, I heard all of that. It's logged.

Receipt does not need a conventional recruitment exchange. He can reveal that the whole process is already recorded and hand over the completed audit roll. Writ establishes authority before action; Receipt proves what happened afterward.

## Visual system

### Source assets

The original design inspection used Adventures of Patch `0240a8657aae5b580c1a7a0d31e0be7a68b27f4e`. The approved asset-promotion PR then merged to Adventures of Patch `main` as `13bf77adc63cf5c8f49363cedd5dd392822b8375`. At that revision the six approved character portraits live under:

`build/characters/heist-crew/reference_sheets/`

Use `index_hero__v1.png`, `silk_hero__v1.png`, `writ_hero__v1.png`, `klause_hero__v1.png`, `rollback_hero__v1.png` and `receipt_hero__v1.png` from that canonical character home.

The selected opening and closing folder sources are:

- `style-sheets/heist_pitch_folder/01_clean_folder_and_recruitment_list.png`
- `style-sheets/heist_pitch_folder/07_receipt_joined.png`

The pitch-folder images remain adventure-specific continuity sources under `workbench/issue_48_override_heist_style_framework_v0_3/style-sheets/heist_pitch_folder/`. The joined images `02_index_joined.png` through `07_receipt_joined.png` are references for the individual markers. The whole cumulative board should not be repeated after every profile.

Before implementation, verify that Adventures of Patch `main` still contains those exact sources and record the exact consumed revision. A later path move must not change the selected visual identity or silently substitute a different asset.

### Purpose-built assent markers

Create six portfolio-owned derivative images from the on-disk continuity references using the image-generation tool:

- Index: folded blueprint and note;
- Silk: steel ring and red tension cord;
- Writ: triplicate assent form;
- Klause: decision stamp or stamped mark;
- Rollback: dog tags;
- Receipt: printed audit roll.

Each generation call uses the relevant joined folder image as its explicit visual reference. The output should isolate a convincing physical object suitable for an editorial inset while preserving the source object's established material, colour, proportion and identifying details. The family must share coherent lighting, scale and edge treatment without becoming six generic icons.

Exact lettering is an acceptance gate. Mangled, invented or near-correct text does not ship. Visible assent wording also remains HTML, so the image never carries the only accessible statement. If a generated candidate fails identity, lettering or physical credibility, reject it and regenerate from the same approved source. Do not invent a seventh object or replace a character-specific marker with a generic `I'm in` badge.

The original clean and completed folders remain the opening and closing evidence. The new marker images are supporting details, not replacements for the cumulative payoff.

### Editorial composition

Use the existing warm paper, ink, copper and controlled Patch-teal vocabulary. The planned adventure's visual language was effectively a comic book, and this route should retain that energy through composition rather than costume. Use asymmetric panels, decisive colour fields, full-bleed imagery where the source background can carry it, and short white editorial insets placed at the upper edge of imagery. An occasional oval text block may borrow the pressure and placement of speech without a tail or literal speech-bubble treatment. These devices must make a character, handoff or reading beat clearer.

The Heist page may also use restrained dossier cues through ruled lines, clipped paper edges, stamped utility type and physical marker insets. It must remain part of the portfolio's editorial grammar rather than becoming a skeuomorphic detective board, a themed game interface or six interchangeable profile cards.

At wide widths, portrait, prose and marker should form one intentional composition per recruit. Use one underlying page grid and spacing scale, then vary panel spans, image bleed, colour-block geometry and inset placement when the content earns the change. Uniformity is not the goal, but every variation needs a cognitive explanation. Whitespace must explain grouping and emphasis. It must not appear as unused canvas caused by arbitrary max-widths.

Character scale is part of the story. Rollback sits at the extreme upper limit of canonical agent scale. His profile must give the portrait enough width and height to contain him comfortably while letting his mass dominate the composition. Do not create the effect by clipping him or scaling him out of relation to the other portraits. Let his panel concede space, and keep the dog-tag marker subordinate.

At narrow widths, use one semantic reading column: name and role, portrait, prose, spoken line, assent marker, then the handoff to the next recruit. Do not use CSS `order` to repair a desktop-first DOM. No horizontal scroller, carousel, modal gallery or hover-only detail is allowed.

The page is static. Add no decorative animation. Existing global transitions may remain only where they already respect reduced motion.

## Component and data boundaries

The implementation should follow the existing Patch specialist seam:

- register a `patch` content item with presentation `patch-lawful-heist`;
- dispatch that presentation through the existing content presentation registry;
- create a focused `LawfulHeistPage` under `src/client/src/features/patch-showcase/`;
- reuse `PatchShowcasePicture` for responsive AVIF/WebP evidence;
- keep Heist-specific composition in a focused stylesheet or an explicit Heist section of `PatchShowcase.scss`, whichever keeps the existing feature legible;
- update `PatchIndexPage` so the existing Lawful Heist record becomes a real internal link when its manifest item exists;
- keep route metadata, generated static documents and sitemap behaviour manifest-driven.

Do not build a generic character-profile framework merely because this page contains six profiles. Extract a shared primitive only if the live Tournament and Identity surfaces already demonstrate the same stable responsibility.

The asset processor remains the canonical source-to-derivative seam. Extend its declarative asset configuration and tests rather than copying full-size PNG files directly into the public tree.

## Asset custody and permission

The portfolio must record the source revision, exact source paths, source and output checksums, full generation prompts, tool and date, selected or rejected status, visual inspection notes, output dimensions, responsive derivatives and alt-text intent.

The portfolio custody ledger must also record this permission:

> Harley Bartles, copyright holder in the named Adventures of Patch source assets and associated Heist Crew character and world IP, authorises the creation, publication and distribution of the listed derivative images as part of Harley Bartles' portfolio website and its repository build artefacts. This permission is specific to the recorded portfolio derivatives. It doesn't relicense the source assets, characters or world IP, and grants no general right to create or publish further adaptations.

The generated portfolio insets remain copyright Harley Bartles, all rights reserved unless a later explicit licence changes that position. Do not add Adventures of Patch image sidecars to the portfolio repository. The portfolio custody and generation record is the correct local evidence surface.

## Copy and accessibility

Public copy follows the portfolio voice policy: natural contractions, economical clauses, no em dashes, no decorative emoji, no stock reversal frames and no repeated model-favourite reflection scaffolds. Read the whole page as one continuous piece before review. A sentence must earn its place through character, movement, explanation or consequence.

Character names, quotes and assent wording are HTML. Images receive alt text according to their job:

- portraits identify the character and the useful visual distinction without inventorying clothes;
- the opening folder explains that it contains Patch's six-name recruitment list;
- the closing folder explains the accumulated evidence of all six assents;
- a marker uses concise alt text only when it adds information not already adjacent in HTML; otherwise it uses empty alt text.

Use semantic headings in source order. The page must remain understandable without images, without motion and before custom fonts finish loading. Focus remains visible on the index entry and engineering-case-study link. Colour contrast must satisfy WCAG 2.2 A/AA expectations used by the existing axe suite.

## Performance and failure behaviour

Generate AVIF and WebP derivatives sized for their actual placements, prevent upscaling, strip unnecessary metadata, preserve intrinsic dimensions and lazy-load below-fold portraits and markers. The opening folder may load eagerly only if measurement shows it is the route's principal first-paint image. Do not preload the six-person sequence.

The processor must fail with a clear named source path when a required upstream asset is missing. It must not guess a sibling repository, silently use an obsolete workbench path or leave a stale derivative recorded as current. A rejected generated marker remains outside the deployable manifest.

The normal application loading, error and unknown-route surfaces continue to own query and route failures. The feature adds no runtime network dependency.

## Verification contract

The implementation plan must include:

- focused Vitest coverage for the six-person order, responsibility distinctions, opening and completed-folder evidence, development status, index link and engineering-case-study link;
- processor tests covering all selected sources, generated marker inputs, AVIF/WebP outputs, dimensions, no upscaling and stale-path failure;
- route-document and manifest tests proving `/patch/lawful-heist/`, title, canonical URL and sitemap inclusion;
- axe coverage through the existing golden-route suite;
- keyboard, source-order, reduced-motion and 200% zoom review;
- visual review at 1440, 768, 390 and 320 CSS pixels;
- a Windows-authored visual baseline only if the composition qualifies as a signature route under the existing visual policy;
- two unchanged screenshot runs after any approved baseline is written;
- `py -3 tools/run.py ci --apply` after generated source, derivative or mesh changes;
- a clean staged `py -3 tools/run.py ci --check` before the implementation commit and publication handoff;
- a full rendered-page editorial pass by Sol before the PR leaves draft;
- exact-head GitHub checks and post-deploy public-route proof before Phase 5 can be marked done.

## Non-goals

This slice does not:

- move or relicense Adventures of Patch source assets;
- write or publish the complete upstream adventure deck;
- create vault-opening, safehouse, action-heist or celebration scenes;
- force Patch into a visual composite;
- add an interactive dossier, carousel, lightbox, audio, video or animation system;
- build a reusable cast-management subsystem;
- rewrite Tournament, Identity Emporium or the engineering case study;
- advance the roadmap to Phase 6 before the Phase 5 page is reviewed, published and proven.

## Planning handoff

One focused JIT plan can deliver this slice. It should order source re-verification and permission capture before generation, generation acceptance before derivative processing, tests before implementation, and the full editorial and visual review before PR publication.

The only external race is the separate Adventures of Patch asset-promotion task. Its result changes source paths and revision evidence, not the approved public story or visual selections.
