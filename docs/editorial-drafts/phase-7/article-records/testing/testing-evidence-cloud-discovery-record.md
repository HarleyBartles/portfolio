# Cloud discovery record — Tests are different kinds of evidence

**Status:** Live Cloud editorial-room record. Reconciled through checkpoint 3 on 27 August 2026. This is discovery custody, not publication copy or an admission decision.

**PR / branch:** `#36` / `codex/phase-7-testing-evidence-editorial-room`

## Time-box custody

The room opened with a three-hour working target and five-hour hard ceiling. Harley later paused for approximately one hour and explicitly asked for that hour to be added back to the time box. Treat the pause as stopped editorial time: preserve the original three-hour active-working target and five-hour active-working ceiling, with one additional hour of wall-clock allowance.

## Governing direction

Harley has clarified that this is primarily a software-engineering article about hard-won judgement over what different testing strategies buy. Agentic engineering is a worked application of those first principles to a newer, non-deterministic substrate. It is not the primary subject.

The original premise, **Tests are different kinds of evidence**, survives provisionally. The stronger spine emerging from discovery is that test scope and test economics belong to the same engineering decision: choose a scope that can genuinely prove the behaviour under question, then collect that evidence at a cadence its cost can support.

A second idea has become equally important: the same behavioural claim can deserve evidence at several scopes without those tests being redundant, because each scope observes a different failure surface.

The required deliberate curveball reframe has not yet happened. Do not settle the governing argument until the agentic worked example has been discovered far enough to test a materially different framing.

## Evidence classes and boundaries

| Material | Evidence class | Boundary |
| --- | --- | --- |
| Harley's testing philosophy, definitions, cadence and scaling experience | Harley first-party engineering account | Authoritative for Harley's practice. Do not inflate it into a universal testing standard. |
| Roughly 3,000 unit tests taking 10+ minutes serially and roughly 2 minutes over five shards | Harley first-party engineering account | Approximate lived scale example, not a benchmark. |
| Car component-safety versus road-safety analogy | Harley explanatory analogy | Clarifies composition evidence; not a formal equivalence. |
| Professional API validation examples | Harley first-party engineering account | Keep employer/project identity private unless Harley later chooses otherwise. The illustrative temporal integration test is an example Harley considers valid for that boundary, not a claim that the exact test exists today. |
| Portfolio visual-regression, accessibility and validation surfaces | Public repository evidence on the current PR branch | May verify the portfolio's implementation and testing policy; do not generalise those repository choices into universal practice. |
| QA ownership of professional Playwright automation | Harley first-party account | Preserve the ownership distinction; do not imply Harley personally authors all browser automation. |
| RED/GREEN pressure-testing lineage | Existing pinned `obra/superpowers` source from Phase 7 authority material | Inherited practice. Preserve attribution. |
| Portable pressure scenario plus run-bound result | Existing Phase 7 design and Marketplace evidence | Harley-specific composition under the existing originality boundary; currently expected to be an agentic application of the engineering argument rather than the article's governing destination. |

No customer identity, employer identity, private repository, confidential metric or production data has entered the record.

## Backend model: the core set is unit → application → integration

Harley confirmed that, by and large, unit, application and integration are the backend test scopes he actually uses. Do not pad the article with extra categories for taxonomy completeness.

### Unit tests: abundant, local, frequent

Harley's unit-test posture is abundant coverage through small unit-shaped slices of proven functionality. They run often, catch regression and provide the main TDD lever: write a small RED test, make the smallest responsible change to turn it GREEN, then iterate.

An individual unit test can be cheap while the whole suite becomes operationally expensive. Harley's lived scale example is roughly 3,000 unit tests: more than ten minutes serially, roughly two minutes when split over five shards. Ten minutes in CI is a drag when engineers are iterating quickly.

#### Correction: the lesson is not `shard from the start`

Harley explicitly rejected premature sharding as the lesson. The suite should instead be organised so that adding parallel execution later is boring and mechanical once runtime becomes painful.

Test structure should reflect meaningful behavioural areas. If thousands of tests eventually live in one `tests.py`, scaling the runner exposes an organisational debt that already existed. Even one giant `api_tests.py` makes later partitioning harder than a suite that was already decomposed coherently.

Editorial formulation under consideration:

> Do not pay for scale before you need it. Do not structure the suite so scale requires surgery when you do.

This distinction is useful: test architecture should preserve the option to parallelise; test infrastructure should spend the concurrency complexity only when the economics justify it.

### Application / acceptance tests: composition evidence inside the controlled application

Harley does not need a production failure story to justify application-level evidence. The epistemic gap exists before somebody gets hurt by it.

His analogy is a car: proving every component mechanically fit for purpose does not prove the assembled car is safe to put your granny in. Unit and application tests examine different compositions of the same components.

The application-test shape Harley normally wants is one meaningful input from outside the application, often an API call, followed through the application's real internal behaviour as far as its own boundary. The test asserts persisted state mutations and internal consequences while dependencies beyond the application boundary remain mocked or otherwise controlled.

The API is incidental. The evidence boundary is the important part: one outside stimulus enters, the real internal composition runs, and the application is observed without making external systems part of the proof.

`Acceptance` is the project-local name used for this class of tests in one professional system. Conceptually Harley classifies them as application tests.

### Contract/schema rules can deserve proof at several scopes

Harley does not naturally treat contract tests as a mandatory fourth rung. In one professional API project, input-contract rules are tested at several existing scopes.

The API has serializer/schema rules that refuse input type coercion and validators on input models in the MediatR pipeline that reject invalid requests before the handler runs.

For the same invalid-input rule:

- **Unit:** this validator rejects this invalid model for the right reason.
- **Application / acceptance:** a request with this bad shape is rejected cleanly at the correct point, does not leak beyond the validator, and produces the expected rejection message for that class of failure.
- **Integration:** from outside the running API, valid requests get through and invalid requests reject with the expected public rejection message.

These are not automatically duplicate tests. They prove different parts of the enforcement chain: local rule, application wiring/composition and public behaviour.

Editorial consequence: a contract can be the claim under test while several scopes provide different evidence about whether it is implemented, composed and exposed correctly.

### Integration tests: black-box proof of a running build

Harley's integration boundary moves the observation point outside the application. The test drives a running instance as an external consumer would. External dependencies are not mocked, but they are safe sandbox/non-live dependencies. The application's internals are not the direct subject; needing to stop on an internal breakpoint would cut against the intended boundary.

The database is real rather than an in-memory substitute because some behaviours only become meaningful across time and across multiple external interactions. Locally that may be the development database. In delivery it may be the database behind a staging slot.

Integration tests can therefore prove consumer-visible sequences that lower scopes cannot. Harley supplied this illustrative test shape, explicitly as a valid example rather than a claim about an exact current test:

1. Send a create request whose schema is valid but whose values trigger a subtle edge validation case; receive an ID.
2. Poll that ID until a result appears.
3. Observe that the result reports validation failure.
4. Correct the input deliberately, submit again under a new ID and observe that the new request is not rejected for that validation case.

That sequence spans time, correlation, persistence and several external interactions. Unit tests can prove the underlying rule. Application tests can prove where it is enforced. Integration scope can prove the whole consumer-visible protocol as the running system exposes it.

Integration evidence is expensive because the instance, database, dependencies and environment are real enough to make that behaviour meaningful. Harley therefore runs it in CD rather than churning it in the tight CI loop. It must pass before deployment.

#### Key correction: integration tests prove a build

The strongest formulation discovered so far is Harley's own: **integration tests prove a build**.

The staging slot is where the evidence may be obtained; the tested build is what the result belongs to. If that exact build is promoted unchanged to production, the integration result does not become false merely because the build moved environments.

This is why Harley generally sees no reason to rerun the same integration suite against the production instance. Tenant isolation could make synthetic production data containable by placing test artefacts in a dedicated tenant for later sweep cleanup, so production execution is not technically impossible. It simply creates lifecycle work and live-state contamination without obvious additional evidence when the build has not changed.

Do not turn that into a universal ban. The first-principles rule is that production execution needs a claim that production itself is necessary to observe. Otherwise production-representative execution against the deployable build is sufficient and safer.

## Frontend model: the same evidence logic in a smaller organism

Harley describes React as his bread and butter, but does not claim frontend-specialist or frontend-testing-specialist authority. Jest and Vitest cover the level he normally needs.

Conceptually, he sees frontend testing as a smaller model organism of the backend logic rather than a separate philosophy:

- components get direct behavioural tests;
- API clients get tests at their boundary;
- routing gets tests as navigation/composition behaviour;
- some type-adherence claims are enforced by TypeScript and disciplined use of the type system instead of only by runtime tests.

Editorial consequence: do not turn the frontend section into a framework catalogue. The reusable question is still what claim is being made and which boundary can falsify it. Some guarantees are more honestly carried statically than by another executable test.

### Visual regression: useful because it is deliberately nosy

The portfolio is the lived public example. Its frontend matters enough that selected authored compositions are protected by Playwright visual-regression baselines.

Harley described the cost directly: change one article title and a related article that renders that title can become taller on mobile because the longer title wraps differently. A test can go red somewhere other than the surface the engineer thought they changed.

Harley considers that overhead worth paying. The red result does not automatically mean the product is wrong, and the baseline is not an immutable golden image. The useful workflow is:

1. observe the unexpected visual consequence;
2. decide whether the consequence is legitimate;
3. if it is legitimate, deliberately update the expected baseline and make the test green again.

The portfolio repo verifies the surrounding policy on the current PR branch:

- `.agents/runbooks/testing.md` says visual regression protects only signature compositions, stabilises randomness/motion/fonts/viewports and requires baselines to be authored and reviewed;
- `.agents/doctrine/validation-policy.md` says approved baselines protect stable representative surfaces from accidental drift and may move when a PR explains and reviews the new design;
- `src/client/e2e/visual-regression.spec.ts` uses fixed desktop/mobile screenshot contracts, with narrow signature regions in some cases and whole authored mobile compositions where vertical composition is itself part of the product;
- `ContentPage.tsx` composes navigation/related content from shared summaries, so a title change can legitimately propagate into another rendered surface.

Editorial consequence: a visual-regression test earns some of its value by revealing consequences outside the apparent edit boundary. The cost is occasional deliberate baseline maintenance. What that cost buys is a forced review decision between accidental drift and intended change.

### Accessibility: a product contract

Harley classifies accessibility as a contract, not another test scope. A site that claims accessibility can lose the claim through one poor implementation judgement, so tests exist partly to keep the claim honest.

Harley does not claim specialist accessibility expertise. His practical authority is published accessibility standards, plus enough baseline understanding to enforce them rather than treating green automation as permission to stop thinking.

His anecdotal example is a product request for red text on a green background to indicate row state. Harley hard-declined the proposal because it was hostile to colour-blind users. The point is not that personal intuition replaces standards. It is that engineers need enough understanding to recognise a decision that cuts against the contract before automation becomes the only line of defence.

The portfolio runbook already preserves the automation boundary: automated WCAG scans supplement rather than replace keyboard, zoom, focus and reading-order review.

Editorial consequence: accessibility is a claim that can require several kinds of evidence. Standards define the contract; tools enforce objective portions; human judgement still has to notice when product decisions undermine it.

### Browser journeys: evidence can have different owners

Professionally, Harley does not usually author the automated browser-journey suite. QA owns Playwright automation.

That is an ownership boundary, not a dismissal of browser evidence. When Harley cares that a journey is coherent, he runs it as a user would use it.

His formulation: dogfooding his own work is as good a proof of usability as he can personally give.

Component, API-client and routing tests can prove their own contracts. They cannot substitute for actually using the assembled experience and noticing whether it works as an experience.

Editorial consequence: test strategy includes ownership as well as scope. The engineer does not need to author every automation layer personally; the important judgement is that the claim gets an appropriate observation and that somebody owns the durable proof.

## Current article-level conclusions

The backend and frontend discovery now support several portable principles:

1. **Green belongs to a question.** A passing result is only evidence for the behaviour and boundary actually observed.
2. **Composition changes the claim.** Proof of parts does not automatically become proof of the assembled system.
3. **Cost changes cadence, not truth.** Expensive evidence may belong later in delivery without becoming less valuable.
4. **The same contract can deserve several proofs.** Different scopes can observe different points where the same rule can fail.
5. **Test architecture should preserve future operational options.** Avoid premature infrastructure while making later scale mechanical.
6. **Evidence belongs to the thing actually tested.** The strongest discovered example is integration evidence belonging to the build rather than to the staging location.
7. **Some red tests are review prompts, not defect verdicts.** Visual regression can deliberately surface valid collateral changes that still require human acknowledgement.
8. **Not every useful proof is automated.** Static typing, standards-backed judgement and dogfooding can each answer claims that another runtime test would answer poorly or incompletely.

## Corrections to earlier drafts

- Engineering is the centre of gravity; agents are the worked transfer case.
- The backend model is deliberately unit → application → integration rather than an exhaustive taxonomy.
- Frontend is not represented by `browser tests`; it has local/component/client/routing evidence plus broader visual, accessibility and journey claims.
- Do not say `shard from the start`.
- Acceptance/application evidence does not require a prior failure story to be legitimate.
- Contract tests are not automatically a separate rung.
- Integration tests prove a build; staging is an evidence environment, not the identity of the proof.
- Production integration execution is not impossible, merely unjustified without a production-specific claim.
- Do not imply Harley personally owns professional Playwright E2E automation; QA does.
- Do not let `the scenario travels; the result stays with the run` dominate the article before the agentic worked example earns its final weight.

## Open discovery before final manuscript

- Discover Harley's equivalent evidence scopes when the artefact under test is prose intended to shape a non-deterministic agent.
- Establish how RED/GREEN pressure tests map, or fail to map, onto unit/application/integration reasoning.
- Preserve the lineage boundary: Superpowers before Harley's extension.
- Decide how model, harness, tools, instructions and repository state alter what a passing agentic test can honestly prove.
- Test the portable-scenario/run-bound-result custody rule against the engineering principles now established rather than assuming it is the destination.
- Propose the required materially different curveball governing argument once the agentic evidence is coherent enough to support one.
- Run the weary hiring-manager and cynical-architect lenses against the eventual argument.

## Cross-article ledger reconciliation

The existing cross-article ledger was reviewed before this checkpoint. No frontend material from this batch currently earns migration to another article; it all pays the Testing argument directly.

## Checkpoint rationale

This checkpoint is worth interrupting the conversation because it closes the conventional engineering half before the room crosses into agentic testing. A future recovery can now reconstruct Harley's backend and frontend testing judgement without replaying the conversation, and the manuscript has a clean boundary before introducing the non-deterministic worked example.
