# Portfolio £10k Phase 4: Wild Bunch Architectural Proof Design

**Status:** Approved

**Approved design dialogue:** 21 August 2026

**Approved written specification:** 21 August 2026

**Spec-readiness:** 9/10

**Roadmap:** [Portfolio £10k Quality](../plans/portfolio-10k/roadmap.md)

**Portfolio design baseline:** `bd07d8a09581bdde40cddff4e880db426a50cd82`

**Wild Bunch evidence baseline:**
`2a9814d094148bb789766a27d316095fecce5a60`

## Goal

Turn Wild Bunch from a short pre-alpha project note and reserved image frame
into a visually tangible, senior-level architecture case study.

The page must demonstrate a discriminating engineering judgement:

> Every complexity pays rent.

Wild Bunch deliberately uses domain-driven design, CQRS, event sourcing,
controlled determinism, projections, and layered boundaries. The case study
must show what each major choice buys in this game-shaped product. It must not
present advanced patterns as badges, universal preferences, or evidence that a
small application should be built the same way.

## Outcome

Phase 4 will deliver:

- a specialist Wild Bunch case study at the existing `/projects/wild-bunch`
  route;
- an honest account of Harley's re-creation of a childhood game as a modern,
  hosted, testable product;
- an explicit explanation of controlled determinism and its testing value;
- an event-history trace that connects commands, typed events, persistence,
  projections, reconstruction, and exact replay;
- project-native gameplay captures that make the current product tangible;
- a compact product-evidence gallery covering investigation and engineering
  surfaces without overwhelming the main argument;
- exact, revision-pinned links to representative source and tests;
- a dated evidence snapshot separating implemented, transitional, and planned
  capabilities;
- an explicit but restrained account of AI-authored code under engineer-owned
  architecture, validation, and delivery;
- an aligned Wild Bunch preview for the homepage and project index;
- responsive, accessibility, performance, evidence, and visual tests; and
- asset-custody and design-decision records for the captures and distinct case-
  study art direction.

## Non-goals

Phase 4 will not:

- finish, stabilise, balance, or publicly host the Wild Bunch game;
- modify the Wild Bunch repository merely to make the case study tidier;
- describe the game as shipped, production-ready, complete, or broadly usable;
- imply that Harley architected the original 1984 game;
- imply that Harley hand-wrote the current project's code;
- claim that every planned entropy policy or developer control is complete;
- hide current bugs, rough graphics, or incomplete integration surfaces;
- turn DDD, CQRS, or event sourcing into Harley's entire engineering identity;
- teach every pattern used by the repository;
- reproduce the entire domain model or source tree on the page;
- embed a playable game, replay viewer, event explorer, source-code browser, or
  live repository request;
- add a backend, database, analytics event, new route, autoplay, or carousel;
- use generated Western artwork as a substitute for the real product;
- require final screenshot assets before the written design can be approved;
  or
- pre-empt Phase 11's value gate for an interactive proof artefact.

## Binding execution model

This binding, prospective execution model governs implementation,
continuation, or rework begun after 23 August 2026. It does not claim who
planned, implemented, reviewed, or accepted earlier work.

GPT-5.6 Sol is the sole main phase orchestrator. Sol reads the roadmap, this
approved phase specification, current repository truth, the portfolio design
policy, design-decision ledger, and relevant runbooks; writes the JIT
implementation plan; selects `/subagent-driven-development`; and maintains the
whole-plan view, task sequencing, integration, evidence, handoff readiness,
and completion drive.

Every subagent must use GPT-5.6 Terra. This includes implementation,
research, repair, task-review, re-review, and final-review subagents. Only the
main GPT-5.6 Sol orchestrator may create subagents: Terra workers cannot
delegate or create children. A Terra worker may propose decomposition or a
fresh-context review to Sol; Sol alone decides dispatch, role and reasoning
effort, sequencing, budget, concurrency, and reconciliation, and records that
decision in the plan or ledger. Keep the topology shallow: Sol -> Terra only;
Terra -> Terra descendants are prohibited. Generic escalation must not create a
Sol child: the Sol main agent narrows or replans the work and redispatches
Terra.

Before Terra begins material creative work, Sol records a phase-specific
creative-review brief in the JIT plan. Sol derives it from the approved phase
outcome, non-goals, protected defaults, design policy, decision ledger, and
current repository truth. The brief names the audience, intended response,
constraints and protected defaults, factual and privacy boundaries,
distinctive design intent, failure modes, observable acceptance signals, and
evidence surface.

The JIT plan records Sol's selected review lenses. Sol must use
`/writing-with-clarity` and the matching `/unslop-profiles` profile for
material prose, creative writing, documentation, plans, and handoffs, plus
the relevant artifact-specific skills and doctrine lenses. Model reputation or
an unsupported claim that Sol has better taste is never acceptance evidence.

Terra may draft creative work, but Sol personally reviews every material
creative output: public copy, creative writing, visual style, art direction,
hierarchy, imagery and capture framing, and interaction tone. Sol assesses
taste, humanness, restraint, specificity, and AI-slop risk against the £10k
portfolio bar.

Sol inspects the actual rendered or readable artifact, not Terra's
self-description, and records `pass` or `veto`, the artifact and evidence
reviewed, every criterion result, limitations, and unresolved human gates. A
veto becomes a bounded Terra revision brief naming the failed criterion or
emergent defect, observed evidence, intended effect, preserved constraints,
and re-review evidence. It constrains badness and preserves intent without
prescribing the creative answer or collapsing the result into formula.

The rubric is a floor and diagnostic aid, never an exhaustive formula or taste
scorecard; satisfying its listed criteria does not force a pass. Sol may veto
technically compliant work that is lifeless, generic, overwritten, derivative,
predictable, or off-tone, but must identify the artifact evidence, observed
defect, and intended effect. Unarticulated dislike is insufficient.

This process supports consistent, inspectable review and evidence-backed
decisions. It does not mechanically prove taste, humanness, originality, or
£10k quality. CI, profile conformance, or model identity cannot substitute for
Sol's review or a named Harley gate.

This creative gate precedes and does not replace any named Harley approval or
factual, privacy, custody, accessibility, deployed-proof, or protected-default
gate. Iteration stops only on a recorded pass or a genuine Harley-owned
decision.


## Approved narrative

### The origin

Wild Bunch is Harley's re-creation, in his own direction, of Firebird
Software's 1984 Western adventure game. Harley played the later Amstrad CPC
version on a CPC 464 as a child.

The personal connection is relevant because Locomotive BASIC on that machine
was Harley's first programming language. The anecdote should be brief and
lightly handled: he did not stumble into software engineering in his thirties;
he has been tinkering with computers throughout his life.

The public copy must distinguish:

- the original Firebird game;
- Harley's childhood experience of it; and
- this new project, which retains the premise while adding Harley's own design,
  architecture, and modern quality-of-life affordances.

Do not imply source-code lineage, a literal port, or endorsement by Firebird.
Link the historical reference to a durable public game archive. The personal
memory is user-supplied and should be presented as such.

### Why not write the trivial version?

The original ran on constrained 1980s hardware. Harley could reproduce its
basic loop with procedural code. That would prove little and would not be the
project he wants to design.

This version explores a different product problem: a game intended eventually
to support hosted player sessions, reproducible bug reports, deterministic
testing, persistent worlds, inspectable state, and replay. The architecture is
part of the chosen design challenge, but every pattern still has to earn its
cost through a concrete product or engineering capability.

### Controlled determinism

The central technical story is controlled determinism.

A world-seed UUID identifies the starting world. Difficulty and entropy policy
control how much subsequent variation is introduced. Named salts give random-
looking decisions stable inputs. Under the `Boring` entropy policy, the same
seed and the same player actions in the same order should produce the same
playthrough.

That design buys:

- reproducible test scenarios;
- replayable bug reports;
- deterministic world graphs and route distances;
- stable town layouts within a world and session;
- controlled variation between different towns;
- inspectable sources of apparent randomness; and
- a future path for power-user seed sharing without making that a current
  product claim.

The excitement is generated by combinations of deterministic components, not
by untraceable randomness.

### Event history and replay

Event sourcing is the largest deliberate complexity. It pays rent through
replayability, reconstruction, auditability, and diagnosable hosted sessions.

The public explanation follows one vertical flow:

1. a player action becomes a command;
2. an application handler coordinates the use case;
3. the `GameSession` aggregate enforces domain rules and produces typed events;
4. events append to a versioned stream with optimistic concurrency;
5. projections derive the journal, audit, case, and other read surfaces;
6. snapshots and replay reconstruct current state; and
7. upcasters and projection rebuilds address persisted-schema evolution.

The page must connect that flow to visible product evidence. `Session audit`
is not decorative developer chrome: it makes the event history inspectable.
The case file and wanted poster are not mere UI cards: they demonstrate
player-safe projections over richer domain truth.

### Domain boundaries and hidden truth

DDD and CQRS pay rent where the game contains rules and perspectives rather
than simple CRUD:

- `GameSession` composes player, world, clock, pursuit, case, bounty, journey,
  investigation, store, and action-context behaviour;
- commands and queries have different responsibilities;
- query handlers must not mutate state;
- the server remains authoritative;
- hidden culprit and world truth stay separate from player-known projections;
  and
- public case, warrant, clue, and suspect surfaces disclose only earned facts.

This is the clearest security-adjacent architecture point on the page: a UI is
not a secrecy boundary. The public DTO and projection must be safe even when a
visitor inspects network traffic.

### Agentic engineering, not accidental architecture

Harley built Wild Bunch with AI agents and did not hand-write its code. That is
part of the case study, not a disclaimer hidden from it.

The senior claim is not that an agent can emit C# or React. It is that Harley
can define a coherent architecture, choose and reject patterns, establish
falsifiable constraints, decompose work, direct implementation, review the
result, require tests, and correct drift. The repository's typed event model,
ADRs, replay policies, architecture guardrails, deterministic fixtures, and
layered tests are evidence of that direction.

The page should make this point once, in measured language. It must not sneer
at vibe coding, claim that agents have no design agency, or turn authorship into
a debate about keystrokes. A suitable public formulation is:

> I did not hand-write Wild Bunch's code. I engineered the system: setting its
> constraints, directing agents through the work, reviewing the result, and
> requiring the evidence that makes the architecture trustworthy.

Link this beat to `Agentic engineering and the kindness of vibe coding` for a
reader who wants the broader argument. Wild Bunch itself remains the concrete
proof.

### Honest present state

The case study must retain this description in substance:

> A scrappy, buggy pre-alpha with a lot of heart and exactly the architecture
> it deserves.

At the evidence baseline the application is sufficiently live to create a
seeded session, render generated towns and trails, travel between towns, expose
the case file and wanted notices, and inspect typed session events. It is not a
finished game.

Rough visual tiling, incomplete gameplay, absent public user/session hosting,
unfinished controls, and environment-sensitive integration tests belong in
the present-state account. They must not be presented as charming proof that
quality does not matter; they are bounded unfinished work inside a pre-alpha.

## Public copy contract

Retain the title `Wild Bunch` and the `pre-alpha` project status.

Use this exact public thesis:

> Every complexity pays rent.

Replace the current manifest summary with:

> A modern re-creation of a childhood Western game, built around controlled
> determinism, exact replay, and architecture that earns its keep.

The prose may be edited for rhythm during implementation, but it must preserve
these facts and qualifications:

- this is Harley's re-creation and extension, not the original game or a
  shipped port;
- the original title was published by Firebird Software in 1984;
- Harley played it on an Amstrad CPC 464;
- Locomotive BASIC on that machine was his first programming language;
- a procedural remake would be possible but would not address the chosen
  hosted, replayable product problem;
- the world seed, difficulty, entropy policy, and salts control repeatability;
- `Boring` is the most deterministic policy at the approved evidence revision;
- event sourcing pays for replay, reconstruction, and diagnosis;
- DDD and CQRS protect behaviour and knowledge boundaries;
- the application is playable pre-alpha evidence, not a shipped product; and
- Harley owns the current project's design and implementation decisions but
  does not claim authorship of the original game's architecture.
- the code was produced through AI-agent implementation rather than handwritten
  by Harley, while system design, direction, review, and acceptance remained
  engineering responsibilities.

Avoid “enterprise-grade,” “production-ready,” “perfect replay,” “AI game,”
“over-engineered on purpose,” and “built to scale.” They either overstate the
evidence or make earned complexity sound indiscriminate.

## Scannable technical snapshot

Provide one compact, text-first system dossier for a hiring manager who wants
to know what Harley can work with immediately:

- **Backend:** C#, .NET 10, ASP.NET Core Minimal APIs, Entity Framework Core,
  Npgsql, and PostgreSQL;
- **Architecture:** DDD, Onion dependency direction, custom CQRS-style
  handlers, aggregate-scoped repositories, Unit of Work, event sourcing,
  projections, snapshots, optimistic concurrency, and event upcasting;
- **Web:** TypeScript, React 18, Vite, TanStack Query and Router,
  styled-components, and Phaser 3 as a bounded rendering/input adapter; and
- **Evidence:** xUnit, ASP.NET integration tests, Vitest, Testing Library,
  replay-equality tests, architecture guardrails, and manual browser proof.

This is a scannable orientation aid, not a logo cloud or a claim of identical
depth in every dependency. It should sit near the first architectural section
and link concepts to the later proof rather than interrupt the hero.

## Evidence and source-of-truth boundary

### Repository snapshot

Phase 4 targets the public Wild Bunch revision
`2a9814d094148bb789766a27d316095fecce5a60`, observed on 21 August 2026.

Add `src/client/src/data/case-studies/wild-bunch-evidence.json` as an authored,
dated evidence snapshot containing:

- `observedAt` as `2026-08-21`;
- the exact 40-character source revision;
- the public repository URL;
- the historical reference URL;
- the public project status;
- named implemented, transitional, and planned capabilities;
- representative source and test paths for each public architecture claim;
  and
- the deterministic capture recipe.

Public source links must use the exact revision, not `main`, so the page and
its evidence cannot silently diverge. Do not store local drive paths, local
URLs, connection strings, test credentials, branch names, worktree names, or
private environment details in the snapshot.

The portfolio quality gate validates the snapshot's structure, source paths,
public URL form, revision length, status vocabulary, and capture fields. It
does not clone or fetch Wild Bunch during CI. A later evidence refresh is an
explicit content change.

### Representative code evidence

The initial evidence set should cover these source families without turning
the page into a file catalogue:

| Claim | Representative evidence |
| --- | --- |
| Aggregate and typed-event behaviour | `src/WildBunch.Domain/Game/GameSession.cs`, `src/WildBunch.Domain/Game/GameSessionEventReplay.cs`, and typed-domain-event tests |
| Generated world and stable graph | `src/WildBunch.Domain/World/WorldSnapshot.cs`, game-content seed factories, and trail-graph generator tests |
| Deterministic entropy and salts | domain salt sources, clue/wanted resolvers, dev-entropy tests, and boring-scenario fixtures |
| Append, replay, and evolution | persistence repository/event-store tests, full replay equality, payload upcasters, and projection-version handling |
| Player-safe investigation views | case-board mappers, hidden-truth tests, `CaseFileSnapshot`, and wanted-poster acceptance tests |
| Inspectable developer tooling | `src/WildBunch.Web/src/dev/DevOverlay.tsx` and the Session, Audit, and Town Layout panels |

The implementation plan must resolve the exact files at the evidence revision
and remove a link rather than guessing if a path has moved.

### Discovered pattern-and-payoff inventory

The source audit found additional senior-level evidence beyond Harley's initial
examples. These are candidates, not a mandate to put every pattern on the page:

| Pattern or decision | How it pays rent | Recommended page weight |
| --- | --- | --- |
| Onion dependency direction, aggregate-scoped repositories, and a first-class Unit of Work | Keeps the domain independent of EF and HTTP while letting archive-old/create-new preserve the one-active-playthrough invariant in one transaction. | Supporting decision. |
| Optimistic concurrency with the command retry boundary | Makes hosted-session commands safe to retry against a changed event stream instead of silently overwriting another action. | Supporting detail inside event history. |
| Snapshots as disposable shortcut caches | Keeps the event stream conceptually authoritative; a stale or missing snapshot can fall back to full replay. | Primary deep proof. |
| Fail-closed event upcasters and one persisted-payload load funnel | Lets immutable history evolve without bypassing version checks or silently accepting a future or malformed shape. | Primary deep proof or source-linked evidence note. |
| Rebuildable, independently versioned projections | Avoids a second source of truth and lets stale read models rebuild from events, then converge on a later save without a global migration sweep. | Primary deep proof beside replay. |
| Session-owned child components with narrow context records | Prevents `GameSession` becoming an unbounded god object while preserving one command and persistence boundary. | Supporting decision. |
| React shell with Phaser as a renderer/input adapter | Buys spatial game feel and pointer handling without moving eligibility, distances, or mutation authority into the browser; a DOM fallback preserves keyboard and screen-reader access. | Supporting full-stack proof. |
| Dev-enabled prep → inject → act flow | Makes deterministic overrides and failure reproduction possible without polluting the ordinary player API with debug parameters. | Supporting proof beside the dev overlay. |
| Manual typed API client until generation is justified | Centralises transport and types without paying an unnecessary code-generation/tooling tax at the present API size. | Restraint note. |
| Code-backed deterministic content now, DB-backed authoring later | Keeps current setup inspectable and testable while retaining a clean future seam rather than prematurely building a content platform. | Restraint note. |
| Layered unit, acceptance, integration, and manual-browser lanes | Proves rules at the smallest useful boundary and adds wider evidence only when behaviour crosses API, persistence, or visible UI boundaries. | Agentic-engineering proof. |
| ADRs, policies, source guardrails, and replay-equality tests | Turns architectural intent into durable instructions and falsifiable checks that constrain later human or agent changes. | Agentic-engineering proof. |

The finished page should promote no more than three of these beyond the central
determinism, event-history, and hidden-truth story. Remaining items belong in a
compact source-linked ledger or remain out of the public composition. Pattern
names never appear without their payoff.

### Capability-state contract

The page includes a restrained `Built / In motion / Beyond pre-alpha` ledger.
At the approved snapshot:

**Built and demonstrable** includes seeded session setup, the generated town
graph, route distances, town rendering, persistent per-session town placement,
travel, case-file generation, wanted notices, typed event history, projections,
PostgreSQL-backed persistence, replay, and the developer audit surface.

**In motion** includes visual polish, town tiling, broader gameplay, entropy
behaviour beyond the deterministic path, layout-inspection reliability, and
some developer-control integrations.

**Beyond pre-alpha** includes public accounts/sessions, production hosting,
player-facing seed sharing, game balance, and a supportable public demo.

Do not convert the final category into a promised delivery roadmap. Do not
claim the full integration suite is green at this snapshot: environment-backed
tests require the configured PostgreSQL connection used by the repository's
validation lane.

## Case-study reading order

### 1. Hero — `Every complexity pays rent`

The existing route header keeps:

- the project eyebrow;
- `Wild Bunch` as the `h1`;
- the approved summary;
- the `pre-alpha` status;
- a visible repository link; and
- a real generated-town capture as the dominant visual.

The hero caption identifies the image as the current pre-alpha build. It does
not apologise for the rough tiles or imply that a public demo is available.

### 2. Origin — `The first language`

Use one short editorial beat linking the original game, the CPC 464, and
Locomotive BASIC. This provides personality and continuity; it must not become
a retro-computing history lesson.

### 3. Design premise — `Why the trivial version was not the point`

Contrast the possible procedural remake with the chosen hosted, replayable,
testable product problem. Introduce the thesis and the rule that patterns need
observable payback.

### 4. Controlled determinism — `Random-looking, reproducible`

Pair the generated trail map with a semantic figure:

`seed UUID + difficulty + entropy policy + named salts → world, layouts,
routes, and outcomes`

Explain the `Boring` same-input/same-action contract and connect it to tests,
bug reports, and session reconstruction.

### 5. Replayable architecture — `The event stream is the receipt`

Use a vertical semantic trace from command to reconstruction. Pair it with the
expanded session-audit capture. Explain event sourcing as the largest cost and
exact replay as its principal payoff.

### 6. Safe knowledge — `The player sees what the player has earned`

Use the wanted poster and case file as product evidence. Explain the boundary
between hidden domain truth and player-known projections without revealing
the current session's hidden answer.

### 7. Engineering the system — `The implementation medium`

State plainly that the code is AI-authored and the engineering is not
accidental. Use the approved measured formulation, then show three forms of
control: a recorded decision, a guardrail or test that could fail, and a place
where the architecture deliberately refuses unnecessary machinery.

This section is short. It links to the related article rather than restating a
general AI-development philosophy.

### 8. Supporting patterns — `Architecture includes restraint`

Select at most three items from the discovered pattern-and-payoff inventory.
At least one must demonstrate restraint or a deliberately bounded tool, so the
page does not equate seniority with maximum abstraction.

### 9. Decisions and trade-offs

Use the shared decision primitive for at least:

- deterministic seeds over opaque randomness;
- event history over state-only persistence;
- a server-authoritative domain over client-owned rules;
- compositional domain loops over one unbounded session class; and
- developer inspection surfaces over invisible magic.

Each decision records the capability gained and the cost accepted. Do not add
a generic technology-logo strip.

### 10. Present state — `Built, in motion, beyond pre-alpha`

Close with the capability-state ledger, the dated repository evidence, source
links, current pre-alpha language, and the public repository link. The ending
should invite inspection of the work rather than ask the reader to excuse it.

## Visual and interaction contract

### Hierarchy

The approved visual hierarchy is:

1. one clean generated-town hero;
2. the trail map paired with the controlled-determinism figure;
3. the event flow paired with an expanded event-audit capture; and
4. a compact product-evidence gallery containing the strongest investigation
   surfaces.

Do not use a slideshow or carousel. Product captures appear at the point where
they prove the prose. The gallery is supporting evidence, not a detached image
dump.

### Art direction

Retain the editorial engineering field-journal baseline while giving Wild
Bunch its own register:

- dark product captures sit inside warm-paper editorial space;
- copper and faded-gold accents may echo the game without turning the page
  into a themed saloon;
- Fraunces carries the thesis and section turns;
- Source Serif 4 carries explanation;
- Fira Code carries seeds, event names, revisions, and evidence labels; and
- diagrams use restrained paper, ink, trail, and ledger cues rather than a
  generic cloud-architecture aesthetic.

No cowboy display font, faux parchment texture, bullet-hole decoration,
sepia filter, terminal imitation, or animated tumbleweed.

Version one is static. Hover or focus may strengthen a source link or figure
label but must not reveal required content. Reduced motion changes no meaning.

### Controlled-determinism figure

`WildBunchDeterminismFigure` is a labelled `figure` whose source order remains
meaningful without CSS:

1. inputs — seed UUID, difficulty, entropy policy, salts;
2. deterministic decisions — world graph, route distances, town identity and
   layout, encounter selection;
3. observable outputs — repeatable play, tests, replay, and diagnosis.

On wide screens it may use a three-stage horizontal composition. At narrow
widths it becomes the same ordered vertical sequence. Connectors are
decorative; labels and relationships remain text. The canonical UUID may be
visually truncated, but its full value must remain available to assistive
technology and copyable evidence text.

### Event-history figure

`WildBunchEventFlow` uses a semantic ordered list:

`action → command/handler → aggregate → typed event → append-only stream →
projection → reconstruction`

It must distinguish a command from an event and a projection from the source
stream. Do not draw a detailed infrastructure topology or imply an external
message broker. The expanded audit screenshot sits alongside or immediately
after the figure as product proof.

## Capture inventory and asset contract

### Deterministic capture recipe

Final captures are deferred to the implementation phase. The executing agent
must gather them from a working local build using:

- player name: `Ranger Vale`;
- world-seed UUID: `00000000-0000-0000-0000-000000000000`;
- difficulty: `Standard`; and
- entropy: `Boring`.

The recipe is a reproducibility aid, not a public claim that every current
surface is completely deterministic.

### Candidate imagery

The implementation agent may choose the strongest three to five captures from
this inventory:

| Candidate | Purpose | Capture state |
| --- | --- | --- |
| Generated Dustwell town | Primary product hero | Clean town hub after setup; no developer overlay; product status visible where legible. |
| Generated trail map | Controlled-determinism evidence | Full generated town graph with town names and route distances. |
| Session dev panel | Seed-policy evidence | Expanded panel showing the canonical seed, Standard difficulty, Boring entropy, and stable salt information. |
| Session audit | Event-sourcing evidence | Expanded audit after enough actions to show setup, world/case generation, journey, trail, and arrival events. |
| Sheriff Office and wanted notice | Product and safe-projection evidence | Poster read and populated; avoid the empty initial office unless it better supports a before/after treatment. |
| Case file | Investigation read-model evidence | Populated modal after reading a poster, showing overview, culprit trail, identity board, and earned evidence without exposing hidden truth. |
| Travel diary or arrival state | Optional continuity evidence | Use only if it adds a distinct proof not already carried by the event audit. |

The implementation agent owns final framing and may recapture after visual
changes. The current exploratory captures are references, not deployable
assets. Do not publish `Codex Rider`, localhost chrome, private paths,
developer secrets, connection values, or accidental hidden-truth data.

### Selection and processing

- Use a town image as the hero even if another capture looks more technically
  sophisticated; the reader must first recognise a game.
- Give the trail map and audit image enough displayed size to remain legible.
- Put wanted and case-file imagery in the compact evidence gallery rather than
  making either the hero.
- Prefer a crop that retains product context over a decorative crop of isolated
  cards.
- Never redraw a screenshot to make unfinished behaviour appear implemented.
- Preserve honest rough edges when they are visible at a useful scale.
- Do not display more than five substantial captures on the page.

Publish responsive derivatives under `src/client/public/media/wild-bunch/`
with stable descriptive names. Prefer AVIF and WebP with a safe fallback where
the existing image component requires it. Hero imagery loads with the route;
below-fold evidence is lazy-loaded. Use intrinsic dimensions and stable aspect
ratios to prevent layout shift.

Target a hero derivative no larger than roughly 250 KB and supporting
derivatives no larger than roughly 180 KB at their principal display widths,
provided text and game state remain legible. If legibility requires a larger
asset, record the measured exception instead of destroying the evidence with
compression.

Append one custody record per deployed source capture to
`docs/asset-custody.md` containing:

- public derivative paths;
- source repository and exact revision;
- the deterministic capture recipe;
- original capture dimensions and format;
- crop, resize, and encoding transformations;
- final dimensions and byte sizes;
- ownership basis;
- alt-text intent; and
- date added.

### Accessibility for product imagery

Each figure needs a concise alt description and a visible caption that
explains why the image matters. Do not transcribe dense audit or case-file text
into alt text. The surrounding prose and semantic figures carry the technical
argument; the image proves the product surface exists.

If exact text within a screenshot is part of the evidence, repeat the relevant
event name, seed policy, or clue in selectable HTML. Colour, connector lines,
and image detail cannot be the sole carrier of a relationship.

## Case-study presentation architecture

Phase 4 consumes the case-study system designed in Phase 3. It does not replace
that system or wait for a universal project schema.

Add `wild-bunch-case-study` to the narrow project-presentation discriminator
and exhaustive `projectPresentations` registry. Convert the Wild Bunch manifest
item from its Markdown `path` to that presentation only after the Phase 3 seam
exists. Delete `src/client/src/data/content/projects/wild-bunch.md` in the same
implementation change so there remains exactly one canonical body source.

Reuse the shared `CaseStudyBody`, `CaseStudySection`, `CaseStudyEvidence`, and
`CaseStudyDecision` primitives. Add specialist composition under the same
feature, expected to include:

- `wild-bunch/WildBunchCaseStudy` — narrative composition;
- `wild-bunch/WildBunchDeterminismFigure` — controlled-determinism model;
- `wild-bunch/WildBunchEventFlow` — semantic event-history trace; and
- `wild-bunch/WildBunchProductEvidence` — capture selection and captions.

The implementation may consolidate small figure files when clarity improves,
but it must retain the specialist Wild Bunch composition and a single
presentation-selection seam. Do not add MDX, a diagram library, a carousel
dependency, a generic block renderer, global state, context provider, runtime
repository client, or new image-management framework for this phase.

Update the existing Wild Bunch branch in `ProjectVisual` to use the real town
capture or a closely aligned crop. Homepage and project-index previews must no
longer call the image a reserved frame. They may remain simpler than the case-
study hero.

## Evidence validation contract

Extend `tools/portfolio_quality.py` and its existing test module. When the Wild
Bunch presentation exists, validation must:

1. require `wild-bunch-evidence.json`;
2. validate its ISO observation date, HTTPS repository and historical URLs,
   full revision SHA, and `pre-alpha` status;
3. validate the capture recipe's required player, UUID, difficulty, and
   entropy values;
4. require non-empty implemented, transitional, and planned capability lists;
5. reject local paths, localhost URLs, credentials, connection strings, and
   worktree or branch labels;
6. require representative evidence links to use the pinned revision;
7. require every deployed Wild Bunch image to have a custody record and
   intrinsic dimensions; and
8. preserve the Phase 3 manifest `path`/`presentation` exclusive-or contract.

CI does not fetch or test Wild Bunch. The portfolio snapshot proves what was
inspected at a point in time; the public repository links allow a reader to
verify it.

## Error and fallback behaviour

- The route performs no new runtime request.
- GitHub, historical archives, and the local game may all be unavailable
  without removing the case-study narrative.
- A failed capture leaves the figure caption and technical explanation; build
  validation should prevent missing local image paths from publication.
- Diagrams remain understandable as ordered HTML when CSS or decorative SVG
  connectors fail.
- An unknown presentation identifier follows the Phase 3 quality-gate and
  route-error behaviour.
- Ordinary Markdown projects retain their existing path.
- There is no “Play now” control until a supportable public build exists.

## Expected file families

The later implementation plan should expect these changes:

- `src/client/src/data/content/content-manifest.json` — new summary,
  presentation discriminator, and relevant related links;
- delete `src/client/src/data/content/projects/wild-bunch.md` after specialist
  presentation conversion;
- `src/client/src/data/case-studies/wild-bunch-evidence.json` — dated source and
  capture evidence;
- the Phase 3 project-presentation type, registry, and document-loader tests —
  add the Wild Bunch discriminator;
- `src/client/src/features/case-study/wild-bunch/` — specialist narrative,
  figures, media composition, and tests;
- `src/client/src/features/home/ProjectVisual.tsx` and tests — real Wild Bunch
  preview;
- `src/client/src/styles/global.scss` — Wild Bunch figure, gallery, and
  responsive composition using existing tokens;
- `src/client/public/media/wild-bunch/` — selected optimized captures;
- `docs/asset-custody.md` — exact screenshot provenance and transformations;
- `docs/design-decisions.md` — project-specific art direction and real-product
  evidence over generic architecture decoration;
- `tools/portfolio_quality.py` and `tests/test_portfolio_quality.py` — evidence,
  presentation, privacy, image, and custody validation;
- `src/client/e2e/portfolio.spec.ts` — route, semantics, links, and responsive
  behaviour;
- `src/client/e2e/visual-regression.spec.ts` and reviewed snapshots — wide and
  narrow Wild Bunch compositions; and
- generated indexes and route documents affected by the changed tree.

## Automated verification

### Repository and data tests

Add failing-first tests for:

- a missing or malformed Wild Bunch evidence snapshot;
- a non-public repository or historical URL;
- a short or branch-based source revision;
- missing capability-state categories;
- a changed deterministic capture recipe;
- local path, localhost, secret, or connection-string leakage;
- evidence links that do not pin the approved revision;
- missing image dimensions or custody records; and
- the Wild Bunch presentation obeying the exclusive body-source contract.

### Component tests

Verify:

- the exact thesis, pre-alpha status, origin beat, and repository link render;
- the text-first technical snapshot names the verified backend, web, and test
  stack without relying on icons;
- the copy distinguishes the original game from Harley's re-creation;
- controlled determinism names seed, difficulty, entropy, and salts;
- `Boring` is described as a bounded deterministic policy rather than proof
  that all entropy modes are complete;
- the event trace has meaningful ordered semantics;
- event sourcing, DDD, and CQRS each connect to a product capability;
- AI authorship, engineering ownership, and validation responsibility are
  distinguished without denigrating another way of building software;
- the supporting-pattern selection contains at least one restraint decision
  and never exceeds the approved cognitive-load bound;
- hidden truth is not embedded in public fixture copy;
- the capability ledger distinguishes built, in motion, and beyond pre-alpha;
- image captions and adjacent selectable evidence render;
- the Wild Bunch presentation is selected through the shared registry; and
- an ordinary Markdown project and the Marketplace specialist presentation
  retain their respective paths.

### Browser tests

At the existing production preview, verify:

- `/projects/wild-bunch` loads directly and through client navigation;
- the repository and pinned evidence links are keyboard reachable;
- the hero, diagrams, and product gallery preserve a coherent source order;
- no horizontal overflow exists at 390 and 320 CSS pixels;
- dense screenshots can be understood from surrounding text without zooming
  the bitmap;
- 200% browser zoom remains usable;
- reduced motion changes no content or relationship;
- below-fold captures use lazy loading and all images reserve dimensions; and
- Marketplace, other project routes, and unknown routes retain their existing
  behaviour.

Add reviewed visual baselines for:

- the town hero and controlled-determinism section at 1440 pixels;
- the event-flow and product-evidence composition at 1440 pixels; and
- the stacked narrative, figures, and gallery at 390 pixels.

Do not weaken global screenshot tolerances to accept the new composition.

### Canonical gate

After source and generated surfaces are staged, run:

```powershell
py -3 tools/run.py ci --check
```

The existing Python, Vitest, TypeScript, Vite build, Playwright, route, link,
privacy, asset-custody, and bundle-budget gates must all pass.

## Manual quality review

Review the finished route at 1440, 768, 390, and 320 CSS pixels, keyboard-only,
with reduced motion, and at 200% zoom.

The review must answer:

- Does a visitor recognise a real game before encountering architecture?
- Is “Every complexity pays rent” demonstrated rather than merely asserted?
- Can a hiring manager explain what determinism buys after one scan?
- Does event sourcing connect to replay and diagnosis rather than prestige?
- Are the wanted poster and case file legible as product evidence without
  turning the page into a feature catalogue?
- Does the page remain honest about unfinished controls, visuals, and hosting?
- Does the agentic-engineering beat make authorship clearer while leaving the
  repository—not rhetoric—as the proof?
- Does the page show at least one senior decision to avoid or defer complexity?
- Is the origin anecdote warm and memorable without displacing the current
  engineering story?
- Does the visual treatment remain part of the portfolio field journal while
  feeling specific to Wild Bunch?
- Does it avoid suggesting that all Harley's projects should use this
  architecture?
- Are all public technical claims traceable to the pinned repository revision?

Record the selected raw capture state, processed derivatives, wide and narrow
route screenshots, and source links in the PR evidence.

## Acceptance criteria

Phase 4 is ready for implementation planning when:

- the origin and authorship boundary are explicit;
- the verified technical stack is available in one scannable text-first
  surface;
- the thesis and senior-level architecture argument are approved;
- controlled determinism has exact inputs, outputs, and payoff;
- the event-history trace distinguishes commands, events, streams,
  projections, and reconstruction;
- DDD and CQRS connect to behaviour and knowledge boundaries;
- AI-authored code and engineer-owned system direction are stated explicitly
  and evidenced through decisions, guardrails, and tests;
- discovered patterns are selected by demonstrable payoff, with supporting
  detail bounded against cognitive overload;
- implemented, transitional, and planned states are separated;
- pre-alpha roughness is neither hidden nor romanticised into a quality claim;
- the reading order and visual hierarchy are fixed;
- candidate captures and the deterministic recipe are exact while final asset
  gathering remains deferred;
- the image count, responsive behaviour, alt intent, performance budget, and
  custody requirements are bounded;
- the Phase 3 case-study seam is reused without homogenising the art direction;
- evidence uses a dated, pinned, public snapshot without runtime fetching;
- error, fallback, validation, testing, and manual-review contracts are
  explicit; and
- a planning agent can identify exact source families and tests without
  inventing product scope or claims.

## Approved design dialogue record

Harley approved the Phase 4 direction on 21 August 2026:

- the honest positioning as a scrappy, buggy pre-alpha with a lot of heart and
  architecture proportionate to the intended product;
- “Every complexity pays rent” as the governing thesis;
- the origin in Firebird's Wild Bunch, the CPC 464, Locomotive BASIC, and a
  lifetime of tinkering;
- controlled determinism as the central design story;
- event sourcing as the largest cost with replayability as its largest payoff;
- DDD, CQRS, hidden-truth boundaries, projections, and developer inspection as
  supporting architectural proof;
- the subtle agentic-engineering point: Harley did not hand-write the code, but
  owns the system design, constraints, direction, review, and evidence;
- the reading order from real product through determinism, event history, safe
  knowledge, trade-offs, and present state;
- a town hero, trail figure, event audit, and compact product-evidence gallery;
- Sheriff Office wanted notices and the case file as capture candidates;
- no carousel and no forced final screenshot gathering during design; and
- `Ranger Vale`, the canonical all-zero UUID, Standard difficulty, and Boring
  entropy as the repeatable capture recipe.

## Readiness assessment

**Spec-readiness: 9/10.**

The planning agent has an exact public argument, evidence revision, narrative
order, technical proof chain, capability-state boundary, capture recipe,
candidate inventory, responsive visual contract, presentation seam, asset
custody requirements, validation behaviour, expected source families, and
test bundle. Remaining judgement is normal implementation composition,
copy-editing, and final capture selection within approved constraints.
