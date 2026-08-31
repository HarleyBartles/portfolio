# Portfolio £10k Phase 3: Marketplace Flagship and Case-Study System Design

**Status:** Approved

**Approved design dialogue:** 21 August 2026
**Approved written specification:** 21 August 2026

**Spec-readiness:** 9/10

**Roadmap:** [Portfolio £10k Quality](../plans/portfolio-10k/roadmap.md)

**Design baseline:** `c2569b019248a9a82345fcdb70e313d9656b5dee`

**Marketplace evidence baseline:**
`52866dfb13b257c8d7d98fbb6155f96a7a8ca07e`

## Goal

Turn Agent Asset Marketplace from a short inventory page into the portfolio's
first senior-level project case study. The page must explain the problem,
Harley's decisions, the operating model, the evidence, the trade-offs, and the
project's honest present state.

Phase 3 must also establish a small composable case-study presentation system
that Phases 4–6 can reuse without forcing Wild Bunch, Adventures of Patch, and
Agentic Learning Lab into one visual template.

The public argument is:

> Shared where reuse earns it. Local where context matters.

## Outcome

Phase 3 will deliver:

- a specialist Marketplace case study at the existing
  `/projects/codex-marketplace` route;
- an authored narrative about repeated instruction, selective distribution,
  first-party ownership, provenance, and continuing iteration;
- a responsive, semantic distribution map built from real project evidence;
- one detailed `repo-standards` journey from recurring problem to verified
  use in consumer repositories;
- a dated cross-repository evidence snapshot with exact public revisions;
- mechanically checked Marketplace inventory facts;
- a small set of reusable case-study presentation primitives;
- project-native Marketplace assets under portfolio custody;
- route, component, accessibility, responsive, visual, and evidence tests; and
- a design-decision ledger entry that protects composable case studies without
  creating a uniform project-page template.

## Non-goals

Phase 3 will not:

- build an interactive plugin or skill explorer;
- fetch GitHub, repository, commit, or Marketplace data at runtime;
- add a backend, database, search index, analytics event, or new route;
- tell the Marketplace repository's full development history;
- present the original third-party collection as a failure or criticise its
  authors;
- claim that every Harley-owned repository currently participates;
- claim that participating repositories are perfectly synchronised;
- claim that every current asset was authored without third-party lineage;
- update consumer repositories merely to make the diagram tidier;
- centralise repository-specific skills;
- import all Marketplace icons or display all 17 plugins in the main diagram;
- create Wild Bunch, Patch, or Learning Lab case-study content;
- replace ordinary Markdown project pages with code-backed presentations; or
- choose the portfolio's later interactive proof artefact.

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

### The recurring problem

Skills consolidate workflows. Instructions that Harley keeps giving an agent
should stop being repeated conversational instructions and become durable,
reviewable assets.

Two naive solutions create different problems:

1. copying the same skill into several repositories creates duplicate
   maintenance and silent drift; and
2. installing every skill everywhere pollutes the agent's available context
   with capabilities irrelevant to the repository.

The case study must frame this as an engineering boundary problem, not a desire
to collect prompts.

### The first model and the pivot

The Marketplace began as Harley's personal place to aggregate good third-party
skills and plugins. The history is longer than this page needs to tell. The
relevant lesson is concise:

- the repository retained assets Harley was not actually using;
- useful third-party skills increasingly needed to be twisted around Harley's
  operating model; and
- accumulation stopped being evidence of value.

Harley made a decisive move towards first-party assets and explicitly
maintained derivatives. That move worked and remains the current direction.
The page must present this as a considered correction: YAGNI applied to an
internal platform.

`superpowers-plus` must be described precisely as Harley's re-derivation of the
third-party Superpowers project, with additions, extensions, and refactors. Do
not imply that its lineage disappeared merely because Harley now owns the
direction and maintenance of the derivative.

### The operating model

Harley's current standard baseline for an agent-enabled repository has three
plugins:

| Plugin | Public meaning |
| --- | --- |
| `repo-worker-pack` | Baseline capabilities that a worker in Harley's repositories should have available. |
| `superpowers-plus` | Harley's re-derived design-to-delivery workflow system. |
| `mcp-usage-pack` | Practical “how to use” guidance for the MCP surfaces Harley actually uses. |

Repositories opt into additional Marketplace plugins when the domain warrants
them. They declare repository-local skills or plugins for knowledge that does
not belong in the shared Marketplace.

The page must use “many repositories” or “agent-enabled repositories.” It must
not say “every repository.” The 21 August evidence audit found no Marketplace
integration in Agentic Learning Lab and found Wild Bunch on an older selection
without `mcp-usage-pack`. Those are honest present-state facts, not defects to
hide or out-of-scope repositories to modify.

### The present state

The Marketplace is live and used. It is not finished or perfect. It is a
continuing internal-platform project whose packages, boundaries, verification,
and discovery will improve over time.

Different consumer repositories may deliberately pin different Marketplace
revisions. Provenance turns that difference into inspectable state instead of
silent folder drift. Do not convert this claim into “automatic consistency” or
“always current.”

## Public copy contract

Retain the title `Agent Asset Marketplace` and the `live` project status.

Use this exact public thesis:

> Shared where reuse earns it. Local where context matters.

Replace the current manifest summary with:

> A living system for distributing durable agent workflows: shared where
> reuse earns it, local where context matters.

The narrative may be edited for rhythm during implementation, but it must keep
these facts and qualifications:

- repeated instruction becomes durable workflow;
- copying creates maintenance and drift risk;
- installing indiscriminately creates irrelevant context;
- the original collection model accumulated unused assets;
- the decisive shift was towards first-party assets and maintained
  derivatives;
- the current standard baseline has three named plugins;
- specialist and repo-local knowledge remain selective;
- provenance exposes source and version differences;
- the system is live, used, imperfect, and continuously evolving; and
- inventory figures support the argument rather than replacing it.

Avoid the phrases “AI operating system,” “platform at scale,” “enterprise
marketplace,” “all my repositories,” “fully automated,” and “single source of
truth everywhere.” They overstate the evidence or obscure the actual design.

## Evidence and source-of-truth boundary

### Marketplace inventory

Phase 3 targets the published Marketplace `main` revision
`52866dfb13b257c8d7d98fbb6155f96a7a8ca07e`. At that revision the verifiable
inventory is:

- 17 plugin bundles;
- 74 bundled skill entries; and
- 70 unique skill names.

The implementation must update the portfolio's
`.agents/plugins/marketplace-source` gitlink from
`be69c861acc608c0aaff5817d0f39f585f6bbd5c` to the target revision before
copying assets or generating evidence. If a later published Marketplace
revision is intentionally selected instead, the implementation must re-audit
the inventory and asset paths, update the evidence snapshot, and record the
new exact revision in the plan and custody record. “Latest” is not an accepted
source coordinate.

The aggregate manifest, plugin-root inventory, and each plugin's
`references/bundle-manifest.json` are the source for central inventory facts.
The portfolio's current prose and previously generated counts are not an
independent source.

### Consumer evidence snapshot

Add
`src/client/src/data/case-studies/marketplace-evidence.json` as the authored,
dated snapshot used by the case study. It must contain:

- `observedAt` as `2026-08-21`;
- the exact Marketplace evidence revision;
- central plugin, entry, and unique-name counts;
- central plugin names;
- selected consumer repository names and public URLs;
- the exact public commit inspected for each consumer;
- each consumer's pinned Marketplace revision when present;
- selected Marketplace plugin names;
- local plugin names;
- local skill names or an exact local-skill count; and
- a short evidence note when the repository is an intentional or historical
  exception.

The initial selected consumer snapshot is:

| Repository | Public revision | Marketplace selection | Local boundary |
| --- | --- | --- | --- |
| Agent Asset Marketplace | `52866dfb13b257c8d7d98fbb6155f96a7a8ca07e` | `repo-worker-pack`, `superpowers-plus`, `mcp-usage-pack` installed for its own operation | No repo-local skills. |
| Adventures of Patch | `01c2f4656afb76b3c7ac7559a6841bc201f0fd7a` | Core three; 39 installed Marketplace skills at Marketplace revision `52866dfb13b257c8d7d98fbb6155f96a7a8ca07e` | Four declared Adventures skills. |
| Portfolio | `bd07d8a09581bdde40cddff4e880db426a50cd82` | Core three plus `frontend-pack`; 45 installed Marketplace skills at Marketplace revision `be69c861acc608c0aaff5817d0f39f585f6bbd5c` | Seven declared portfolio-design skills. |
| Rooms Mostly | `164c49123bbb938583583c8b41f100761fbd3fc7` | Core three; 39 installed Marketplace skills at Marketplace revision `48073e0c876934c1eb77b8db9bd1e9a1b625b5bf` | Five declared Rooms skills. |
| Wild Bunch | `2a9814d094148bb789766a27d316095fecce5a60` | `repo-worker-pack`, `superpowers-plus`, `dotnet-pack`, `architecture-pack`, and `frontend-pack`; local `game-studio`; 56 installed plugin skills at Marketplace revision `d4b1711cae8f9dc6be5ff9f39525f703f4eae355` | Four `wild-bunch-*` skills. Its audited selection predates the current three-plugin baseline and must not be drawn with a false MCP edge. |

Do not store `Z:` paths, usernames, worktree names, branch names, or private
filesystem evidence in the public snapshot. Public repository URLs and commit
SHAs are sufficient.

The snapshot is committed evidence from a point in time. CI validates its
shape and its central Marketplace facts but does not fetch consumer
repositories. The page must label it `Repository audit · 21 August 2026` and
must not call it live telemetry.

Agentic Learning Lab is excluded from the public selected-consumer map because
the inspected repository has no Marketplace declaration or installed-skill
projection. Do not infer that absence is permanent or deliberate.

## Case-study reading order

### 1. Hero

The existing route header keeps:

- the project eyebrow;
- `Agent Asset Marketplace` as the `h1`;
- the approved summary;
- `live` status; and
- a project-native visual.

The repository link must be visible before the reader reaches the final
evidence section, but it must not compete with the thesis as a primary call to
action.

### 2. Problem and pivot

Open the body with the approved thesis and a constrained prose section titled
`When repeated instruction becomes infrastructure`. Explain the recurring
problem, the two naive failure modes, the original aggregation model, and the
first-party pivot.

This is an editorial account of a decision, not a chronology of repository
milestones.

### 3. Selective distribution map

Follow the problem with the page's principal visual. It must answer:

- what is shared;
- what is selected;
- what remains local;
- where revisions differ; and
- which evidence is a dated snapshot.

### 4. Three-layer operating model

Use three concise sections or columns:

1. `Baseline` — the three core plugins;
2. `Selected` — specialist Marketplace plugins chosen by domain; and
3. `Local` — repository-specific skills and plugins that should not be
   centralised.

The small-screen source order is Baseline, Selected, Local.

### 5. `repo-standards` worked example

Use one vertical trace:

1. repeated repo-shape and runbook instructions;
2. the maintained `repo-standards` skill;
3. distribution through `repo-worker-pack`;
4. an installed copy under a consumer's `.agents/skills/`;
5. repository-local doctrine, runbooks, commands, and exceptions; and
6. deterministic `check`/`apply` validation in repository workflows.

The example demonstrates reuse without implying that every repository has
identical local policy or currently runs the same Marketplace revision.

### 6. Decisions and trade-offs

Present at least these decisions using the shared decision primitive:

- curation over accumulation;
- first-party direction with transparent derivative provenance;
- source plugin assets separated from installed consumer copies;
- explicit pins and provenance instead of pretending at automatic global
  synchronisation; and
- repo-local custody instead of centralising domain knowledge.

Each decision includes a reason and a consequence. Avoid a generic pros-and-
cons grid.

### 7. Evidence and present state

Close with:

- the verified central inventory;
- the dated repository-audit label;
- links to the public Marketplace repository and the `repo-standards` skill;
- a clear statement that the system is active but permanently iterative; and
- related links to `Provisioning is not accumulation`, `Context is not the
  same as state`, and `Pass references, not paragraphs`.

Update the Marketplace manifest item's `relatedSlugs` to those three article
slugs in that order.

## Distribution-map visual contract

### Composition

`MarketplaceDistributionMap` is a full-width figure inside the case-study
body. On wide screens it uses a deliberate two-dimensional grid:

- the Marketplace source occupies the first focal position;
- the three core plugins form the next aligned row;
- specialist plugins sit in a visually subordinate selected lane;
- consumer repositories form the receiving edge; and
- repo-local knowledge is enclosed within each consumer boundary rather than
  connected back to the Marketplace.

The diagram must show these explanatory nodes:

- Marketplace source;
- `repo-worker-pack`;
- `superpowers-plus`;
- `mcp-usage-pack`;
- `frontend-pack`;
- `architecture-pack`;
- `dotnet-pack`;
- Portfolio;
- Adventures of Patch;
- Rooms Mostly;
- Wild Bunch; and
- local-skill or local-plugin labels inside each relevant repository.

Do not add a node for every plugin or every skill. Do not add a false
`mcp-usage-pack` connection to the audited Wild Bunch snapshot.

### Responsive and semantic structure

The semantic structure is a labelled `figure` containing ordered groups and
nested lists. The relationship remains understandable when CSS is disabled.

At narrow widths the diagram becomes an ordered stack in the same source
order. It must not rely on horizontal scrolling, pinch zoom, or a miniature
scaled desktop graphic. Decorative connector lines use pseudo-elements or
`aria-hidden` SVG only.

Plugin and repository names remain text. Icons do not carry meaning by
themselves. Screen-reader text identifies the audit date and explains that
different consumers may pin different revisions.

### Art direction

Keep the portfolio's editorial engineering language:

- deep teal system surface;
- warm paper repository regions;
- restrained copper connection lines;
- Fraunces for the focal statement;
- Source Serif 4 for explanation; and
- Fira Code for plugin names, revisions, and evidence labels.

The map is not a dark SaaS dashboard, terminal imitation, network graph, or
generic “AI” constellation. Whitespace and alignment establish hierarchy
before borders, colour, or decoration.

Version one has no motion. Hover and focus may strengthen the currently read
node without hiding content, but no relationship depends on hover. Phase 11
may later consider an interactive explorer against the roadmap's value gate.

## Asset-custody contract

Copy only the project-native icons needed to explain the selected system from
Marketplace revision `52866dfb13b257c8d7d98fbb6155f96a7a8ca07e`:

- `repo-worker-pack/assets/icon.svg`;
- `superpowers-plus/assets/superpowers-small.svg`;
- `mcp-usage-pack/assets/icon.svg`;
- `frontend-pack/assets/icon.svg`;
- `architecture-pack/assets/icon.svg`; and
- `dotnet-pack/assets/icon.svg`.

Publish the derivatives under
`src/client/public/media/marketplace/` with stable descriptive filenames. Do
not reference the submodule directly from client code.

For every copied asset, append a record to `docs/asset-custody.md` containing:

- the deployed public path;
- the exact Marketplace source path;
- source repository and revision;
- source author or owner and licence basis, preserving upstream provenance for
  `superpowers-plus`;
- transformation, if any;
- dimensions or view box;
- byte size;
- alt-text intent; and
- the date added.

SVGs may be sanitised and optimised, but their semantic visual identity must
not be redrawn into unsupported product branding. The map works with text if
an icon fails to load.

## Case-study presentation architecture

### Principle

Create reusable composition primitives, not a universal project-content
schema. Later flagship projects share reliable structure while retaining
project-specific reading order, media, and art direction.

### Manifest contract

Extend project manifest items with an optional `presentation` discriminator.
The initial allowed value is `marketplace-case-study`.

A content item must have exactly one body source:

- a canonical Markdown `path`; or
- a known code-backed `presentation`.

`presentation` is allowed only when `kind` is `project`. A presentation-backed
project has no Markdown `path`. Delete
`src/client/src/data/content/projects/codex-marketplace.md` when the code-backed
case study becomes the source. The quality gate must reject:

- items with both `path` and `presentation`;
- items with neither;
- unknown presentation identifiers;
- presentations on non-project content; and
- orphaned Markdown left behind after conversion.

Add `presentation` to `ContentSummary` as a narrow optional project-
presentation type. `loadDocument` returns the existing summary with an empty
Markdown body for a known code-backed presentation; ordinary Markdown loading
continues unchanged.

### Component boundaries

Add a focused `src/client/src/features/case-study/` feature with:

- `CaseStudyBody` — owns wide and reading-measure regions inside the existing
  project article;
- `CaseStudySection` — owns semantic heading relationships and prose measure;
- `CaseStudyEvidence` — owns evidence labels, audit dates, external links, and
  status presentation;
- `CaseStudyDecision` — owns decision, reason, and consequence;
- `projectPresentations` — an exhaustive registry from known presentation
  identifier to specialist body component;
- `marketplace/MarketplaceCaseStudy` — owns Marketplace narrative composition;
  and
- `marketplace/MarketplaceDistributionMap` — owns the semantic system figure.

`ContentPage` continues to own loading, errors, metadata, the route header,
related content, and content navigation. For a known presentation it renders
the registered specialist body instead of `MarkdownContent`. For every other
document it keeps the current Markdown fallback.

Do not scatter slug comparisons through `ContentPage`, `ProjectPage`, and
visual components. The manifest discriminator and one exhaustive presentation
registry are the selection seam.

The shared primitives accept ordinary React children and small explicit props.
Do not create a generic block renderer, MDX dependency, CMS-style JSON schema,
global state, context provider, or hook merely to support this phase.

### Existing project visual

Update the existing Marketplace branch in `ProjectVisual` so homepage and
project-index previews use the same core-three visual language without
duplicating the full distribution map. The preview may retain the verified
inventory figures but must replace the arbitrary nine abbreviation tiles with
the three core plugin identities and a restrained indication of selected/local
branches.

The full map remains unique to the case-study body.

## Evidence validation contract

Extend `tools/portfolio_quality.py` rather than creating a separate ad hoc
command. Its existing test module remains the unit-test home.

When the Marketplace presentation exists, validation must:

1. require `marketplace-evidence.json`;
2. validate its schema, ISO date, HTTPS repository URLs, full 40-character
   commit SHAs, unique repository names, and unique plugin lists;
3. reject private filesystem paths and branch/worktree labels;
4. require the evidence Marketplace revision to equal the portfolio submodule
   HEAD;
5. read `codex-marketplace/manifest.json` and require its plugin names and
   count to match the evidence;
6. read the 17 active plugin bundle manifests, count all entries, count unique
   canonical names, and require 74 entries and 70 unique names at the approved
   revision;
7. require every selected Marketplace plugin in a consumer snapshot to exist
   in the central inventory;
8. allow explicitly named local plugins and local skills without treating them
   as Marketplace inventory; and
9. validate the manifest `path`/`presentation` exclusive-or contract.

The validator does not fetch consumer repositories. Their commits and plugin
selections are an authored audit snapshot. A later refresh is a deliberate
content update with new evidence, not a hidden CI network dependency.

## Error and fallback behaviour

- The route has no new runtime request beyond the existing local content
  query.
- GitHub or Marketplace availability cannot remove the case-study content.
- External repository links open normally and do not gate rendering.
- Missing icon files leave visible text labels and semantic relationships.
- An unknown presentation identifier fails the repository quality gate. If it
  nevertheless reaches runtime, the route error boundary shows the existing
  honest content-unavailable state rather than a blank body.
- Ordinary Markdown project pages keep their current behaviour.
- No loading skeleton, retry button, or client-side data cache is added for the
  static evidence snapshot.

## Expected file families

The implementation plan should expect these source changes:

- `.agents/plugins/marketplace-source` — exact published evidence and asset
  revision;
- `src/client/src/data/content/content-manifest.json` — summary, related
  content, and presentation discriminator;
- delete `src/client/src/data/content/projects/codex-marketplace.md` — replaced
  by the code-backed specialist presentation;
- `src/client/src/data/case-studies/marketplace-evidence.json` — dated public
  audit snapshot;
- `src/client/src/types/content.ts` and focused tests — presentation type;
- `src/client/src/data/documents.ts` and tests — Markdown/presentation body
  split;
- `src/client/src/pages/ContentPage.tsx` and tests — one presentation-registry
  seam;
- `src/client/src/features/case-study/` — shared primitives, presentation
  registry, Marketplace story, and tests;
- `src/client/src/features/home/ProjectVisual.tsx` and tests — aligned
  Marketplace preview;
- `src/client/src/styles/global.scss` — case-study and responsive system-map
  composition using existing tokens;
- `src/client/public/media/marketplace/` — selected project-native SVGs;
- `docs/asset-custody.md` — exact asset provenance;
- `docs/design-decisions.md` — composable case studies without a uniform
  template;
- `tools/portfolio_quality.py` and `tests/test_portfolio_quality.py` — content,
  evidence, inventory, and presentation validation;
- `src/client/e2e/portfolio.spec.ts` — route and semantic behaviour;
- `src/client/e2e/visual-regression.spec.ts` and reviewed snapshots — wide and
  narrow Marketplace compositions; and
- generated repository indexes and route documents affected by the changed
  source tree.

The implementation may consolidate closely related primitive files when that
improves clarity, but it must preserve the component boundaries and single
presentation registry above.

## Automated verification

### Repository and data tests

Add failing-first tests for:

- Markdown items still requiring a safe canonical path;
- presentation-backed projects forbidding a Markdown path;
- unknown and non-project presentations;
- missing or malformed Marketplace evidence;
- central inventory count, name, and revision drift;
- unknown consumer Marketplace plugins;
- accepted repo-local skills and plugins; and
- private path or non-public source leakage.

### Component tests

Verify:

- the approved thesis, operating-model headings, audit date, live status, and
  repository link render;
- headings form a meaningful hierarchy;
- the map exposes labelled semantic groups in source order;
- the audited Wild Bunch node does not claim `mcp-usage-pack`;
- icons are not the only accessible labels;
- the `repo-standards` trace includes source, bundle, installed copy, local
  overlay, and validation;
- decisions include reason and consequence;
- the Marketplace presentation is selected through the registry; and
- an ordinary Markdown project still renders through `MarkdownContent`.

### Browser tests

At the existing production preview, verify:

- `/projects/codex-marketplace` loads directly and through client navigation;
- the public repository and evidence links are keyboard reachable;
- there is no horizontal overflow at 390 and 320 CSS pixels;
- the map preserves source order at narrow widths;
- reduced motion changes no content or relationship;
- 200% zoom remains usable; and
- unknown routes and other project routes retain their existing behaviour.

Add reviewed visual baselines for:

- the Marketplace case-study hero and system map at 1440 pixels; and
- the stacked map and operating model at 390 pixels.

Do not weaken global screenshot tolerances to accept the new composition.

### Canonical gate

After source and generated surfaces are staged, run:

```powershell
git add --all
git commit
```

The tracked hook runs the complete `ci --check` gate once. Do not pre-run it.

The existing Python, Vitest, TypeScript, Vite build, Playwright, route, link,
privacy, asset-custody, and bundle-budget gates must all pass.

## Manual quality review

Review the finished route at 1440, 768, 390, and 320 CSS pixels, keyboard-only,
with reduced motion, and at 200% zoom.

The review must answer:

- Is the thesis understood before the inventory count?
- Does the diagram explain selective distribution without reading like a
  catalogue?
- Are shared, selected, and local boundaries distinguishable without colour
  alone?
- Is Wild Bunch's older selection represented honestly?
- Does the worked example prove operational use rather than repeat a claim?
- Does the page still feel like an editorial engineering field journal?
- Does it remain credible when external links are unavailable?
- Does the case-study system enable later projects without visually
  homogenising them?

Record before/after screenshots in the PR evidence because this is a material
presentation change.

## Acceptance criteria

Phase 3 is ready for planning when:

- the approved narrative and thesis are explicit;
- the original aggregation model and first-party pivot are described without
  inflated or hostile framing;
- the three core plugins, specialist selection, and local-skill boundary are
  unambiguous;
- central inventory and consumer adoption use separate evidence contracts;
- every public fact has an exact source or is labelled as a dated audit;
- the distribution map has exact nodes, source order, mobile behaviour, and
  accessibility semantics;
- `repo-standards` has an exact worked-example path;
- the presentation discriminator has an exclusive source contract;
- shared components remain composable rather than schema-driven;
- error, fallback, asset, performance, and validation contracts are explicit;
- interactive exploration remains deferred; and
- a planning agent can identify exact source families and tests without
  inventing architecture or claims.

## Approved design dialogue record

Harley approved the design sections on 21 August 2026:

- selective distribution as the recommended case-study direction;
- the corrected history from third-party aggregation through a decisive
  first-party move;
- the core-three, optional-plugin, and repo-local operating model;
- the living, imperfect, permanently iterative present state;
- the authored system-dossier reading order and static distribution map; and
- the composable React architecture, dated evidence snapshot, accessible
  fallback, and verification contract.

## Readiness assessment

**Spec-readiness: 9/10.**

The planning agent has an exact narrative, evidence revision, audited consumer
set, public-claim boundary, page order, visual contract, asset list,
presentation seam, validation behaviour, expected source families, and test
bundle. The remaining implementation judgement is ordinary composition and
copy polish within those approved constraints, not unresolved product or
architecture design.
