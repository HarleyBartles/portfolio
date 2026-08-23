# Portfolio £10k Phase 4: Wild Bunch Architectural Proof Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/subagent-driven-development` for every task. Steps use checkbox (`- [ ]`) syntax for execution tracking.

**Goal:** Replace the brief Wild Bunch pre-alpha note with a source-backed, visually tangible architecture case study that proves how controlled determinism, event history, and domain boundaries pay for their complexity.

**Architecture:** Reuse the Phase 3 `ContentPage` presentation seam and shared case-study primitives. Add one narrow Wild Bunch presentation, a committed revision-pinned evidence snapshot, a specialist text-first composition, and optimized screenshots of the actual development build. The route remains a static GitHub Pages artifact and performs no Wild Bunch runtime request.

**Tech Stack:** React 19, TypeScript, React Router, TanStack Query, Sass, Vite, Vitest, Playwright, Python `unittest`, and a dev-only pinned `sharp` dependency for reproducible image derivatives/metadata checks.

**Execution Strategy:** `/subagent-driven-development`. GPT-5.6 Sol remains the sole phase orchestrator and personally owns the JIT plan, creative review, integration, final verification, and draft-PR handoff. Every implementation, repair, research, task-review, re-review, and final-review subagent uses GPT-5.6 Terra. Only Sol creates subagents; Terra workers do not delegate. Run one implementation task at a time, then a fresh Terra spec/quality review. A finding returns to the original implementer for a bounded fix before fresh re-review.

## Global Constraints

- Keep `/projects/wild-bunch`, the `Wild Bunch` title, and `pre-alpha` status. Use the exact thesis: “Every complexity pays rent.”
- Treat `2a9814d094148bb789766a27d316095fecce5a60` and `2026-08-21` as the public evidence coordinate. Public source URLs pin that full revision; CI does not clone or test Wild Bunch.
- Distinguish the 1984 Firebird Software game, Harley's childhood Amstrad CPC 464 experience, and Harley's new re-creation. Do not imply a port, source lineage, endorsement, or authorship of the original architecture.
- State plainly that AI agents produced the current code while Harley owned system design, direction, review, validation, and acceptance. Do not claim handwritten authorship.
- Write the main architecture story as connected first-person reasoning, not a bullet-point pattern catalogue: what Harley wanted, what that ruled in or out, how a decision evolved, what it bought, what it cost, and what he learned. Preserve the natural exploratory cadence of a stream of thought while editing it enough to remain readable and evidence-led.
- The captured game UI is a development-only working skeleton that makes the game playable. No capture represents a final game design, approved art direction, finished visual polish, or public-demo readiness.
- Do not finish or modify Wild Bunch, embed a playable build, add runtime fetching, add a backend, publish a session ID, hidden truth, localhost chrome, local paths, database details, or disconnected developer controls.
- Use the screened capture recipe: `Ranger Vale`; all-zero UUID; `Standard`; explicitly selected `Boring`; player-chosen starting town `Dustwell`. `Boring` is bounded same-input/same-actions evidence, not a claim that every entropy mode or surface is deterministic.
- Use at most five substantial captures: Dustwell town hero, generated trail map, Session Audit, wanted notice, and case file. Do not deploy the Session Dev capture.
- Keep exact screenshot text secondary to selectable HTML. Captions explain what each development surface proves; alt text stays concise and does not transcribe dense UI.
- Reuse `CaseStudyBody`, `CaseStudySection`, `CaseStudyEvidence`, and `CaseStudyDecision`. Add no MDX, diagram library, carousel, generic block renderer, context provider, global state, runtime repository client, or image-management framework.
- Preserve static semantic source order, keyboard access, visible focus, reduced-motion parity, 320px and 200% zoom usability, bundle budgets, route-error behaviour, and ordinary Markdown projects.
- Reuse existing design tokens and colocate specialist Sass under `features/case-study/wild-bunch/`. Add a token only when it is a reusable semantic contract; do not invent a Wild West theme system.
- Preserve Windows-authored visual baselines and existing screenshot tolerances. Update the Marketplace baselines only to reflect the reviewed three-consumer Phase 3 correction.
- Treat canonical generator output as source-controlled. Run `py -3 tools/run.py mesh --apply` after tree changes and commit any resulting governed indexes. The setup helper's transient six-file index diff was proven noncanonical because a fresh whole-mesh apply produced no diff.
- The Phase 3 Marketplace correction is part of this branch and PR: public evidence/presentation excludes Rooms Mostly because it is editorially irrelevant, while internal historical references may remain.
- Do not flip the pull request out of draft. Stop only at a fully self-reviewed draft PR whose local evidence is complete and whose remote head is verified.

## Current-truth drift record

| Spec assumption | Current evidence | Classification | Planning response |
| --- | --- | --- | --- |
| Phase 3 must provide a specialist presentation seam first. | Merged `main` contains `ContentPage`, `ProjectPresentation`, `projectPresentations`, and shared case-study primitives. | still true; dependency satisfied | Extend the narrow union and registry; do not create a second routing mechanism. |
| Specialist figure/gallery CSS would live in `global.scss`. | Marketplace now colocates specialist Sass with its specialist component. | implementation seam moved | Create `WildBunchCaseStudy.scss`; touch global styles only if a genuinely shared primitive needs it. |
| Browser work belongs in `src/client/e2e/portfolio.spec.ts`. | The current route contract lives in `project-story.spec.ts`. | implementation seam moved | Extend `project-story.spec.ts` and `visual-regression.spec.ts`. |
| Final captures were unavailable. | The live build on ports 5173/5275 produced five screened 1440×1100 captures from the exact recipe and Dustwell choice. | dependency resolved | Process the named scratch captures; do not recapture unless a source image is corrupt or framing fails the brief. |
| A Session Dev panel could prove seed and salt state. | Its screenshot includes a session ID and its Lock/Clear RNG endpoints are disconnected at the pinned revision. | factual contradiction | Exclude it. Put seed/difficulty/entropy/salts in semantic HTML and link pinned source instead. |
| The captures could carry product polish. | Harley explicitly classifies every current visual as a dev-playable working skeleton, not final design. | user-supplied factual refinement | Caption them as current development-build evidence; portfolio art direction supplies hierarchy without pretending the game visuals are finished. |
| Generated indexes from setup might need committing. | Setup created a six-file transient diff; canonical whole-mesh apply generated 41 governed indexes and no diff. | setup residue proven | Do not restore the transient diff; commit any later whole-mesh output caused by real tree changes. |
| Phase 3 publicly showed five Marketplace consumers. | The branch correction removes the editorially irrelevant Rooms Mostly row and uses a three-column map. | required same-PR correction | Keep the correction commits, strengthen its negative DOM test, and refresh only affected baselines during final visual work. |

## Creative-review brief

**Audience and intended response:** A hiring manager should recognise a real, playable game before encountering architecture, then be able to explain what controlled determinism and event history buy. A senior engineer should find pinned source, explicit costs, bounded claims, and at least one refusal of unnecessary machinery. An agentic-workflow reader should understand that AI authorship did not remove engineering accountability.

**Narrative voice and reasoning spine:** The main body is a first-person design journey, not documentation prose disguised as a case study. Each architectural thread moves naturally from “I wanted…” through the constraint or alternative, into “I decided…”, then the observed payoff, cost, and “I learned…”. Avoid repetitive formula headings or turning every paragraph into the same template. The seed thread begins with Harley wanting a deterministic game that already has replay variation between UUID-shaped worlds, then layers excitement through salted state changes. At the pinned revision the codec directly packs 33 of 128 UUID bits and leaves 95 reserved; town names come from a deterministic shuffle of a 40-name pool rather than consuming one encoded value per town. Difficulty, entropy, and the player's starting-town choice remain deliberately downstream. Same seed, difficulty, `Boring` policy, and player actions are the bounded repeatability claim; a neighbouring/randomized seed creates a different but still repeatable base world. This supports manual/automated testing, debugging, replay, and a first-class Randomize seed option before runtime entropy is considered. Dig beyond the codec: explain how the map generator guarantees connected but varied topology, how palettes/slot derivation/multiplicative combinations buy map range from a small bit budget, and how a generated town layout becomes durable session state that survives leaving and revisiting. Follow event sourcing all the way to its operational payoff: exact reconstruction/replay, developer-only queries and commands separated from player equivalents, and the prep → inject → act seam that can make the next salted decision reproducible. Explain conditionally what that would let the team do for a hard-to-reproduce player session when the game becomes publicly playable with many users, without implying that hosting exists today. Use source and git history to identify the strongest evolutions and non-obvious learnings, then build similarly evidenced threads for projections/hidden truth, optimistic concurrency, the server/Phaser boundary, persistence evolution, and restraint. Never invent Harley's feelings or chronology where the repository only proves the resulting design.

**Distinctive intent:** Keep the portfolio's warm editorial engineering field journal, but let dark product captures sit as evidence inside it. Copper and faded-gold accents may echo trail and ledger marks. Fraunces carries the thesis and section turns, Source Serif 4 carries explanation, and Fira Code carries seeds, events, revisions, and evidence labels. Diagrams should feel like an annotated field record rather than a cloud-architecture slide or game-themed microsite.

**Protected defaults and constraints:** One town hero; trail map paired with determinism; semantic event trace paired with audit; compact wanted/case evidence; no carousel, autoplay, hidden-content hover, cowboy display font, faux parchment, bullet holes, sepia, terminal imitation, or tumbleweed. Relationships survive without CSS, colour, connectors, or image detail.

**Factual, privacy, and custody boundaries:** The route says re-creation, pre-alpha, development build, and AI-authored code. It never calls the captures final game design. It links only the public repository, the World of Spectrum historical archive, and revision-pinned source. No session ID, hidden culprit, local coordinate, broken RNG-control claim, third-party sprite licensing claim, or public-hosting promise appears. Custody records identify Harley-owned product screenshots without independently redistributing source sprites.

**Selected supporting patterns:** Promote only (1) disposable snapshots/rebuildable projections as event-history support, (2) React with Phaser bounded to rendering/input while server rules remain authoritative, and (3) the manual typed API client as a deliberate restraint until generation earns its cost. Leave the remaining inventory to source links or out of the composition.

**Architecture explanation boundary:** Event sourcing receives the deepest treatment because it is the most expensive choice. DDD, CQRS, and Onion architecture are also deliberate primary choices and must be explained in plain language where they solve a need: DDD concentrates game behaviour and invariants inside aggregates/owned domain components; CQRS separates state-changing commands from player-, projection-, audit-, and developer-shaped reads; Onion dependency direction keeps those rules independent of HTTP, EF/PostgreSQL, and Phaser. Show how aggregate-scoped repositories, Unit of Work, optimistic concurrency/retry, snapshot caches, rebuildable projections, and fail-closed upcasting make that core operable and evolvable. These supporting mechanics may be woven into the primary reasoning threads without each becoming a promoted standalone section. Pattern names never appear without the decision, payoff, accepted cost, and simpler alternative they displace.

**Failure modes:** A themed saloon; architecture badge collection; a dense file catalogue; generic AI copy; polished-but-impersonal third-person exposition; bullet points standing in for the reasoning journey; a repetitive “I wanted / I decided / I learned” writing template; apologising for rough visuals; presenting rough visuals as intentional final art; overstating replay or determinism; making the origin anecdote the main story; equating seniority with maximum abstraction; hiding exact evidence in bitmaps; or making every project appear to need this architecture.

**Observable acceptance signals:** The hero caption says current development build/working skeleton. One scan connects seed/difficulty/entropy/salts to reproducible outcomes. The event list distinguishes command, event, stream, projection, and reconstruction. Each named pattern carries a payoff and a cost. The safe-knowledge section explains player-known projections without revealing hidden truth. Source order remains coherent at 1440, 768, 390, 320, keyboard-only, reduced motion, and 200% zoom.

**Closing argument:** End near: yes, this could have been built much more simply, but the simpler version would trade away reproducible worlds and next actions, exact replay/reconstruction of player sessions, durable audit/projection seams, conflict-aware hosted-session writes, and safe developer diagnosis that does not leak privileged controls into the player surface. Phrase this as Harley's considered trade rather than a universal defence of complexity. Name the costs actually accepted: more concepts, storage/evolution machinery, invariant tests, operational discipline, and a larger debugging surface. The conclusion must demonstrate “every complexity pays rent” while leaving room to remove a pattern that stops doing so.

**Sol review lenses:** `/designing-premium-sites`, `/frontend-ux`, `/web-layout`, `/web-styling`, `/design-tokens`, `/asset-custody`, `/wcag`, `/react`, `/writing-with-clarity`, and `/unslop-profiles` using technical-writing, frontend-react, frontend-ui, and testing profiles. Sol records pass/veto against the actual rendered/readable artifact after each material creative task; a veto names the observed defect, intended effect, preserved constraints, and required re-review evidence.

## Evidence inputs

- Source audit: `Z:\_agent-scratch\portfolio\codex-portfolio-10k-phase-4-wild-bunch\wild-bunch-evidence-audit.md`.
- Portfolio seam audit: `Z:\_agent-scratch\portfolio\codex-portfolio-10k-phase-4-wild-bunch\phase4-portfolio-seams.md`.
- Screened raw captures: `Z:\_agent-scratch\portfolio\codex-portfolio-10k-phase-4-wild-bunch\wild-bunch-captures\wild-bunch-{dustwell-town,trail-map,session-audit,wanted-notice,case-file}-1440.png`.
- Capture run receipt with exact setup, playthrough, file hashes, and publication boundary: `Z:\_agent-scratch\portfolio\codex-portfolio-10k-phase-4-wild-bunch\wild-bunch-capture-receipt.md`.
- Deep architecture/source-history reasoning audit: `Z:\_agent-scratch\portfolio\codex-portfolio-10k-phase-4-wild-bunch\wild-bunch-reasoning-threads.md`.
- Public repository: `https://github.com/HarleyBartles/wild-bunch`.
- Historical reference: `https://worldofspectrum.org/archive/software/games/the-wild-bunch-firebird-software-ltd`.

---

### Task 1: Establish the Wild Bunch evidence and presentation contracts

**Files:**
- Create: `src/client/src/data/case-studies/wild-bunch-evidence.json`
- Modify: `tools/portfolio_quality.py`
- Modify: `tests/test_portfolio_quality.py`
- Modify: `src/client/src/data/content/content-manifest.json`
- Modify: `src/client/src/types/content.ts`
- Modify: `src/client/src/data/documents.test.ts`
- Modify: `src/client/src/api/contentApi.test.ts`
- Modify: `src/client/src/features/case-study/projectPresentations.ts`
- Modify: `src/client/src/features/case-study/projectPresentations.test.tsx`
- Create: `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.tsx` as a temporary semantic placeholder
- Delete: `src/client/src/data/content/projects/wild-bunch.md`

**Produces:** One authored, dated Wild Bunch evidence source and one registry-backed specialist body source while Marketplace and ordinary Markdown routes remain intact.

- [x] **Step 1: Extend the fixture and write failing Python tests.** Cover missing/malformed evidence; invalid ISO date; non-HTTPS repository/history URLs; non-40-character or branch revision; wrong status; changed capture player/UUID/difficulty/entropy/town; empty implemented/transitional/planned categories; local paths, localhost, credentials, connection strings, branch/worktree labels, or session IDs; representative links not pinned to the evidence revision; and missing image dimensions/custody paths. Assert `wild-bunch-case-study` preserves the manifest path/presentation exclusive-or.

  Run: `py -3 -m unittest tests.test_portfolio_quality.PortfolioQualityTests -v`

  Expected: FAIL because the validator knows only Marketplace specialist evidence.

- [x] **Step 2: Add the authored snapshot and minimum validator.** Record `observedAt: "2026-08-21"`, exact revision, public repo/history URLs, `pre-alpha`, the exact capture recipe plus `startingTown: "Dustwell"`, the three capability-state lists, and the audit's revision-pinned source/test evidence. Validate shape and forbidden-coordinate rules without fetching Wild Bunch. The validator must reject malformed image entries when present, but the live snapshot does not name deployable derivatives until Task 2 creates and measures them.

- [x] **Step 3: Write failing TypeScript seam tests.** Assert Wild Bunch can load with `presentation: 'wild-bunch-case-study'` and empty Markdown, Marketplace still resolves, an ordinary Markdown project still loads Markdown, and unknown presentation identifiers fail closed.

  Run: `npm.cmd --prefix src/client test -- src/data/documents.test.ts src/api/contentApi.test.ts src/features/case-study/projectPresentations.test.tsx`

  Expected: FAIL because the union/registry does not include Wild Bunch.

- [x] **Step 4: Convert the canonical body source.** Add the Wild Bunch discriminator to the narrow union and lazy registry; update the manifest summary to the approved exact text; replace `path` with `presentation`; retain status/title; add only relevant related links supported by existing content; delete `wild-bunch.md` in the same change. Create a minimal semantic `WildBunchCaseStudy` placeholder so the registry and build stay valid; Task 3 replaces its contents rather than creating a second body.

- [x] **Step 5: Prove the contracts.** Run both focused commands above. Expected: PASS. Run `py -3 tools/run.py mesh --apply` and retain any canonical index changes.

- [x] **Step 6: Commit this task and mark its plan boxes complete.** Use a focused commit; stage only this task plus canonical generated indexes. Do not stage scratch captures or unrelated setup residue.

### Task 2: Process and document honest development-build imagery

**Files:**
- Create: `src/client/public/media/wild-bunch/dustwell-town-{720,1200}.{avif,webp}`
- Create: `src/client/public/media/wild-bunch/trail-map-{720,1200}.{avif,webp}`
- Create: `src/client/public/media/wild-bunch/session-audit-{720,1200}.{avif,webp}`
- Create: `src/client/public/media/wild-bunch/wanted-notice-{640,960}.{avif,webp}`
- Create: `src/client/public/media/wild-bunch/case-file-{640,960}.{avif,webp}`
- Modify: `docs/asset-custody.md`
- Modify: `src/client/src/data/case-studies/wild-bunch-evidence.json`
- Modify: `tests/test_portfolio_quality.py`
- Modify: `src/client/package.json`
- Modify: `src/client/package-lock.json`
- Create: `src/client/scripts/process-wild-bunch-captures.mjs`

**Produces:** Responsive, legible product-screenshot derivatives with exact provenance, dimensions, bytes, and development-skeleton framing.

- [x] **Step 1: Write failing custody/image tests.** Require every evidence image derivative to exist under `public/media/wild-bunch`, have positive intrinsic width/height matching decoded metadata, stay within the repo-wide asset ceiling, and appear as an exact backticked path in custody. Require each capture record to state source revision and the `Ranger Vale`/zero UUID/Standard/Boring/Dustwell recipe. These image-bearing fixtures exercise the contracts that become mandatory when this task adds `images`; Task 1's valid interim snapshot intentionally has no deployed-image entries. Run the focused Python suite and observe failure.

- [x] **Step 2: Verify the capture receipt and screen the five raw captures again.** Match each raw file to the SHA-256 and 1440×1100 metadata in `wild-bunch-capture-receipt.md`; stop or recapture if any hash/state cannot be proved. Reject any session ID, hidden culprit, localhost chrome, local path, credential, or broken-control UI. Confirm each image is the development build, not manufactured or retouched evidence.

- [x] **Step 3: Add a reproducible derivative tool and generate assets.** Add pinned dev dependency `sharp` and `process-wild-bunch-captures.mjs` with `--apply --source-dir <dir>` and `--check` modes. The apply mode owns the fixed source names/hashes, derivative widths/formats/quality, no-upscale rule, metadata stripping, and output paths; check mode decodes committed outputs and compares their dimensions/format/bytes to `wild-bunch-evidence.json` without needing raw scratch inputs. Add `media:wild-bunch:apply` and `media:wild-bunch:check` package scripts and run:

  ```powershell
  npm.cmd --prefix src/client install
  npm.cmd --prefix src/client run media:wild-bunch:apply -- --source-dir "Z:\_agent-scratch\portfolio\codex-portfolio-10k-phase-4-wild-bunch\wild-bunch-captures"
  npm.cmd --prefix src/client run media:wild-bunch:check
  ```

  Preserve meaningful product context and legibility; resize without upscaling; encode AVIF plus WebP fallback; strip metadata. Aim for hero derivatives at or below ~250 KB and support derivatives at or below ~180 KB at principal widths. If legibility requires an exception, record the measured reason; do not destroy evidence to hit a nominal budget.

- [x] **Step 4: Write custody and evidence metadata.** One custody record per source capture may enumerate both format/width derivatives. Ownership basis is Harley's screenshot of his running repository at the pinned revision; make no independent sprite-licensing claim. Alt intent and visible captions must say current development build or working skeleton where relevant.

- [x] **Step 5: Prove and inspect assets.** Run the focused Python suite and `npm.cmd --prefix src/client run media:wild-bunch:check`, then visually inspect representative 1200/960 and 720/640 outputs. Expected: PASS and legible evidence without privacy leakage. Add the media check to the existing client `build` script so canonical CI revalidates committed metadata.

- [x] **Step 6: Commit this task and mark its plan boxes complete.** Commit the canonical derivatives, evidence metadata, custody record, tests, and any canonical mesh output.

### Task 3: Compose the text-first Wild Bunch architecture case study

**Files:**
- Modify: `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.tsx`
- Create: `src/client/src/features/case-study/wild-bunch/WildBunchDeterminismFigure.tsx`
- Create: `src/client/src/features/case-study/wild-bunch/WildBunchEventFlow.tsx`
- Create: `src/client/src/features/case-study/wild-bunch/WildBunchProductEvidence.tsx`
- Create: focused `*.test.tsx` files beside those components
- Modify: `src/client/src/features/case-study/projectPresentations.test.tsx`

**Produces:** A semantic specialist narrative in the approved ten-part reading order, led by Harley's connected first-person architectural reasoning and using screenshots as evidence rather than decoration.

- [x] **Step 1: Build the source-backed reasoning map, then write failing component tests.** From the pinned source/history report, map each major thread as need/constraint → considered boundary or evolution → decision → implementation evidence → payoff/cost → learning, marking inference separately from Harley-supplied fact. Include deep threads for connected map generation, high variant yield from compact bit fields/palettes/slot derivation, stable town layouts across leave/revisit, exact event replay, dev/player command-query separation, deterministic next-salted-action preparation, concurrency, and future multi-user diagnosis—not only the UUID codec. Map DDD aggregates/invariants, CQRS command/read separation, and Onion dependency direction as primary deliberate choices; connect repositories/UoW, concurrency/retry, snapshot caches, projections, and upcasting to their operational needs. Tests assert the exact thesis, approved summary facts, pre-alpha/development-build framing, origin and authorship boundaries, public repository/history links, text-first stack dossier, bounded `Boring` contract, current 33-of-128-bit direct codec with deterministic town derivation and downstream difficulty/entropy/start choice, meaningful ordered determinism/event semantics, dev-only control boundaries, plain-language DDD/CQRS/Onion/event-sourcing payoffs and costs, AI authorship formulation, at most three selected supporting patterns including typed-client restraint, five decision trade-offs, the explicit simpler-build tradeoff conclusion, three-state capability ledger, safe-knowledge language with no hidden truth, captions/selectable evidence, and registry selection. Test facts and observable semantic relationships, not the exact rhythm of the prose.

  Run: `npm.cmd --prefix src/client test -- src/features/case-study/wild-bunch src/features/case-study/projectPresentations.test.tsx`

  Expected: FAIL because Task 1's placeholder lacks the required reasoning narrative, figures, and product-evidence contracts.

- [x] **Step 2: Implement the narrative in approved order as first-person reasoning.** Compose hero support; `The first language`; `Why the trivial version was not the point`; compact stack dossier; determinism/map/layout persistence; event history plus deterministic developer diagnosis; safe knowledge and dev/player boundaries; AI-agent implementation/engineer-owned control; three supporting patterns; decisions/trade-offs; the simpler-build cost comparison; and `Built / In motion / Beyond pre-alpha`. The central architecture sections are flowing prose in Harley's voice, explaining needs and how they mapped to decisions, including corrections and learning as the design evolved. Do not replace that prose with lists; reserve structured lists for the compact dossier, semantic diagrams, explicit trade-off ledger, and capability-state close. Keep future many-user benefits conditional and keep source links sparse and purposeful rather than reproducing the audit catalogue.

- [x] **Step 3: Implement semantic figures.** `WildBunchDeterminismFigure` uses ordered inputs → deterministic decisions → observable outputs, full copyable UUID, and decorative connectors only. Its seed lane labels 33 directly packed UUID bits, 95 reserved bits, and town names derived through a deterministic shuffle of the 40-name pool. A visibly and semantically separate downstream lane contains difficulty, entropy/salt policy, and player-selected starting town/actions; it must not imply those inputs are encoded by the UUID. `WildBunchEventFlow` uses an ordered list: action → command/handler → aggregate → typed event → append-only stream → projection → reconstruction. Never imply a broker.

- [x] **Step 4: Implement product evidence.** Use `<picture>` with AVIF/WebP, intrinsic dimensions, eager hero only, lazy below-fold images, concise alt text, and visible captions. Pair map with determinism, audit with event flow, and wanted/case as a compact supporting gallery. Captions explicitly identify current development-build surfaces and their proof value.

- [x] **Step 5: Prove the semantic/public-copy contract.** Run the focused tests. Expected: PASS. Search production source for forbidden session IDs, localhost, local paths, hidden-truth terms, “production-ready”, “final game design”, and the disconnected RNG controls.

- [x] **Step 6: Sol creative review gate.** Sol reads the actual copy and rendered unstyled/source-order artifact, recording pass/veto for specificity, first-person authenticity, natural stream-of-reasoning flow, factual clarity, architecture payoff, visible costs/learnings, origin balance, AI-authorship clarity, and development-skeleton framing. Veto prose that reads like generated architecture documentation, a disguised bullet list, or an unsupported reconstruction of Harley's private thought process. A veto returns a bounded revision to this task's implementer.

- [x] **Step 7: Commit this task and mark its plan boxes complete.**

### Task 4: Give the case study and previews an authored responsive composition

**Files:**
- Create: `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.scss`
- Modify: `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.tsx`
- Modify: `src/client/src/features/home/ProjectVisual.tsx`
- Modify: `src/client/src/features/home/ProjectVisual.test.tsx`
- Modify: `src/client/src/pages/ContentPage.tsx`
- Modify: `src/client/src/styles/global.scss`
- Modify: `docs/design-decisions.md`

**Produces:** A restrained Wild Bunch register inside the portfolio field journal, plus a real development-build preview on the homepage, project index, and route header.

- [ ] **Step 1: Write failing preview/composition tests.** Assert the reserved-frame language is gone; the Wild Bunch preview uses responsive real imagery with accurate dimensions/loading; route header exposes a Wild Bunch visual contract; and no required relationship depends on decorative connectors or hover.

  Run: `npm.cmd --prefix src/client test -- src/features/home/ProjectVisual.test.tsx src/features/case-study/wild-bunch`

  Expected: FAIL because `ProjectVisual` still exposes the reserved frame and the specialist body does not import the new scoped visual treatment.

- [ ] **Step 2: Replace the reserved preview.** Use a close crop/derivative of Dustwell that still reads as a game. The accessible description and caption call it the current development build/working visual skeleton, never a final art direction. Preserve eager loading only where the homepage lead requests it.

- [ ] **Step 3: Style from semantic source order.** Import `WildBunchCaseStudy.scss` from the specialist body. Use warm-paper editorial space, dark captures, restrained copper/faded-gold details, existing typography/tokens, and controlled reading measures. Wide determinism may become three stages; narrow remains the same ordered vertical sequence. Event flow stays legible without miniature desktop scaling. Gallery images keep useful product context. Remove the obsolete fake `.project-visual--wild-bunch` reserved-frame rules from `global.scss`; preserve only genuinely shared project-visual layout there.

- [ ] **Step 4: Record the design decision.** Add a dated ledger entry for real development-build evidence over generic/generated architecture decoration, the distinct-but-related Wild Bunch register, and the trigger to reconsider captures when the game's actual visual design matures.

- [ ] **Step 5: Build and inspect before baselines.** Run `npm.cmd --prefix src/client run build`; inspect the route at 1440, 768, 390, and 320 CSS pixels for hierarchy, legibility, focus, source order, image loading, and overflow. Correct issues before snapshot work.

- [ ] **Step 6: Sol creative review gate.** Sol personally inspects 1440, 768, 390, and 320 renders and records pass/veto for game-first recognition, field-journal continuity, non-thematic restraint, screenshot framing, hierarchy, human tone, and development-skeleton honesty.

- [ ] **Step 7: Commit this task and mark its plan boxes complete.**

### Task 5: Add browser, accessibility, visual, and branch-closeout evidence

**Files:**
- Modify: `src/client/e2e/project-story.spec.ts`
- Modify: `src/client/e2e/accessibility.spec.ts`
- Modify: `src/client/e2e/visual-regression.spec.ts`
- Create/modify: reviewed Windows snapshots under `src/client/e2e/visual-regression.spec.ts-snapshots/`
- Modify: `docs/asset-custody.md` or `docs/design-decisions.md` only for measured corrections
- Modify: generated `INDEX.md` files through the canonical generator

**Produces:** Automated and manual proof for the finished Wild Bunch route and corrected Marketplace presentation, followed by a fully reviewed draft PR.

- [ ] **Step 1: Write failing browser and Axe assertions.** Cover direct and client navigation; exact thesis/status; keyboard-reachable repository/history/pinned evidence links; semantic determinism/event source order; development-build captions; 390/320 no-overflow; dense bitmap evidence repeated in selectable HTML; 200%-zoom proxy; reduced-motion parity; intrinsic dimensions; eager hero/lazy below-fold; Marketplace and ordinary project regressions; and unknown routes. Add Wild Bunch to the existing `accessibility.spec.ts` desktop/mobile WCAG 2.2 AA route matrix before implementation is accepted.

  Run: `npm.cmd --prefix src/client run test:e2e -- e2e/project-story.spec.ts e2e/accessibility.spec.ts e2e/visual-regression.spec.ts`

  Expected: FAIL at least on the newly named Wild Bunch visual snapshots because no approved baselines exist yet. If non-visual assertions expose a defect from Tasks 1–4, route the fix back to the owning original implementer rather than weakening the assertion.

- [ ] **Step 2: Add stable visual contracts and reviewed Windows baselines.** Capture Wild Bunch town hero + determinism at 1440, event-flow + product evidence at 1440, and stacked composition at 390. Refresh Marketplace wide/mobile baselines only for the reviewed removal of the fourth consumer. Do not weaken tolerance or replace unrelated baselines.

- [ ] **Step 3: Run focused automated proof.** Run:

  ```powershell
  npm.cmd --prefix src/client test -- src/features/case-study src/features/home/ProjectVisual.test.tsx
  npm.cmd --prefix src/client run test:e2e -- e2e/project-story.spec.ts e2e/accessibility.spec.ts e2e/visual-regression.spec.ts
  py -3 -m unittest tests.test_portfolio_quality.PortfolioQualityTests -v
  ```

  Expected: PASS.

- [ ] **Step 4: Perform Sol's full manual review.** Inspect 1440, 768, 390, and 320; keyboard-only; reduced motion; and native 200% zoom. Confirm a real game precedes architecture, determinism/event sourcing have explicit payoffs and costs, wanted/case evidence stays supporting, no hidden truth/private coordinate appears, unfinished visuals/controls/hosting remain honest, origin is warm but brief, AI authorship is clear, at least one restraint decision is visible, and the page does not universalise this architecture.

- [ ] **Step 5: Run whole-branch review loops.** Dispatch fresh Terra reviewers for requirements/evidence, code/test quality, accessibility/responsive behaviour, and public copy/asset custody. Route every finding to the owning original implementer and obtain fresh re-review. Sol reconciles conflicts and records final pass/veto.

- [ ] **Step 6: Regenerate and run the canonical gate on the staged final tree.** Run:

  ```powershell
  py -3 tools/run.py ci --apply
  git add -A
  py -3 tools/run.py ci --check
  git diff --cached --check
  ```

  Expected: PASS. Inspect every generated delta and commit canonical outputs; do not discard them merely because a generator created them.

- [ ] **Step 7: Commit and publish a draft PR.** Verify a clean worktree, focused history, no accidental scratch files, exact remote head, and draft state. Include Phase 3 correction, capture recipe, source revision, raw/processed evidence, Sol review record, wide/narrow screenshots, validation commands, limitations, and the explicit statement that game visuals are development skeletons rather than final design. Do not mark ready for review.

- [ ] **Step 8: Verify hosted PR facts and stop at the human gate.** Confirm the PR URL, draft flag, remote SHA, and whatever checks actually ran. Do not call draft CI green if policy did not run it. Hand off as “ready for Harley to flip out of draft,” with any hosted checks that require that flip named as pending.

## Plan readiness

**Rating:** 9/10.

The plan binds the approved narrative, live Phase 3 seam, pinned source audit, five screened product captures, exact privacy/custody boundaries, current test homes, explicit TDD commands, creative review gates, and draft-PR stop condition. The remaining uncertainty is ordinary creative iteration: exact crop coordinates, derivative quality settings, and final responsive proportions must be judged against rendered legibility rather than invented before implementation. No unresolved human taste, factual, privacy, or protected-default decision blocks execution.
