# Cloud discovery record — Tests are different kinds of evidence

**Status:** Live Cloud editorial-room record. Checkpoint 1, 27 August 2026. This is durable discovery custody, not publication copy or an admission decision.

**PR / branch:** `#36` / `codex/phase-7-testing-evidence-editorial-room`

## Current governing direction

Harley has clarified that this is primarily an engineering article, not primarily an agents article. Its source is hard-won software-engineering judgement about what different testing strategies actually buy. Agentic engineering should appear as a worked application of those first principles to a newer and less deterministic substrate.

The original premise, **Tests are different kinds of evidence**, survives provisionally. The stronger spine now emerging is that test scope and test economics belong to the same decision: choose the scope that can genuinely prove the behaviour under question, then run that evidence at a cadence its cost can support.

This is not yet the deliberate curveball reframe required by the Cloud brief. Do not settle the title or governing argument until the backend, frontend and agentic evidence has been discovered far enough to compare materially different framings.

## Evidence classes and custody

| Material | Evidence class | Current boundary |
| --- | --- | --- |
| Harley's testing philosophy, definitions, execution cadence and scaling experience | Harley first-party engineering account | Authoritative for Harley's practice and judgement. Do not inflate it into a universal standard. |
| Roughly 3,000 unit tests taking 10+ minutes serially and roughly 2 minutes over five shards | Harley first-party engineering account | Use as an approximate lived scale example, not a benchmark or universal performance ratio. |
| Car component-safety versus road-safety analogy | Harley explanatory analogy | Useful only if it clarifies composition evidence without being mistaken for formal equivalence. |
| Portfolio testing surfaces named in the Terra draft | Public repository evidence | May verify implementation facts if those claims survive discovery; no fresh verification was required for this first checkpoint. |
| RED/GREEN pressure-testing lineage | Existing pinned `obra/superpowers` source from the Phase 7 brief and plan | Inherited practice. Preserve attribution. |
| Scenario/result evidence-custody composition | Existing Phase 7 design and Marketplace evidence | Harley-specific composition under the existing originality boundary; currently a worked agentic application, not the article's destination. |

No employer-private system, customer, internal metric or confidential implementation detail has entered the discovery room so far.

## Material answer log

### Engineering before agents

Harley's intended article is about engineering judgement first. The agentic material earns its place by showing the same first principles applied when the code under test becomes prose intended to shape behaviour in a non-deterministic system.

Editorial consequence: do not let the pressure-testing or evidence-custody material consume the article. It should demonstrate transfer of established engineering reasoning into agentic work.

### Scope boundary: the discussion so far is backend testing

Harley corrected an early editorial simplification: frontend testing is its own substantial category with its own meaningful test scopes. The unit/application/integration model discovered so far describes backend testing principles.

Do not collapse frontend into a single `browser tests` rung. Discover it separately before writing that part of the article.

### Unit tests: abundant, small and cheap enough to live in the fast loop

Harley's normal unit-test posture is abundant coverage through small unit-shaped slices of proven functionality. They run often, catch regressions quickly and provide the main TDD lever: write a small RED test, make the smallest responsible change to turn it GREEN, then iterate.

The useful property is not merely that an individual unit test is fast. The suite has to preserve fast feedback as it grows.

Harley's scale example is roughly 3,000 unit tests. Run in series, that suite can take more than ten minutes. Split across five parallel shards, the same suite can return in roughly two minutes. A ten-minute CI wait becomes drag when engineers are iterating quickly.

#### Correction: the lesson is not `shard from the start`

Harley explicitly rejected that interpretation as premature engineering. The lesson is to have a test organisation that makes sharding boring and mechanical when feedback time eventually becomes a problem.

Test structure should reflect the area of behaviour under test. If 3,000 tests eventually live in one `tests.py`, scaling the runner exposes an organisational problem. Even one broad `api_tests.py` file makes later partitioning harder than a suite that was already organised around meaningful areas.

Current editorial formulation, not yet author-approved as final copy:

> Do not pay for scale before you need it. Do not structure the suite so that scale requires surgery when you do.

A related distinction worth retaining is **test architecture versus test infrastructure**: organise the suite so safe concurrency and partitioning are possible; spend the infrastructure complexity only when the economics justify it.

### Acceptance/application tests: prove the controlled application composes

Harley does not need a production failure story to justify application-level evidence. The epistemic gap exists regardless of whether somebody has already been hurt by it.

His analogy: safety testing can prove every individual part of a car is mechanically fit for purpose. Without testing the assembled car as a car, those component results are not enough reason to put your granny in it and assume the whole thing is safe.

The backend equivalent is unit versus acceptance/application evidence. They test different compositions of the same components.

Harley's application-test shape is usually one meaningful input from outside the application, often an API call, followed through the controlled application to its own boundary and back. The test observes and asserts the resulting persisted state mutations and internal side effects. Dependencies beyond the application boundary are mocked or otherwise controlled.

The important distinction is not `API` versus `non-API`. It is the evidence boundary: one outside stimulus enters; the application is allowed to compose its real internal behaviour; external dependencies do not become part of the proof.

These tests run regularly because they provide broader composition evidence while remaining inside a controlled application environment.

### Integration tests: prove external behaviour against a running system

Harley's integration-test definition moves the observation point fully outside the application.

The test drives a running instance from the outside and follows real dependency behaviour into safe sandbox dependencies. External dependencies are not mocked, but they are not live production systems either. A test may consist of a sequence of API calls that together fulfil an API-consumer behaviour under test.

The application's internals are deliberately not the direct test surface. Harley's practical rule is that you should not be able to stop on a breakpoint inside the code under test as part of the integration-test design. The observed subject is the externally visible behaviour of the running application and its integrations.

These tests are inherently more expensive. Harley runs them in CD rather than churning them in CI. They are a deployment gate: they need to pass before deployment proceeds, but their cost makes them a poor fit for the tight coding-feedback loop.

### Current backend evidence progression

The discovered distinction is not `small / medium / large` tests for its own sake.

- Unit evidence asks whether a small behaviour works in isolation.
- Acceptance/application evidence asks whether those behaviours compose correctly inside the controlled application.
- Integration evidence asks whether the running application behaves correctly from outside when its real external collaborations are exercised against safe environments.

All three can examine the same broad feature and still answer materially different questions. A green result at one scope does not logically inherit the proof supplied by another scope.

## Corrections to the existing drafts

1. **Engineering is the centre of gravity.** Agentic testing is a worked application, not the governing destination.
2. **The backend model is not a complete testing taxonomy.** Frontend testing remains a separate undiscovered family.
3. **Acceptance evidence does not need a prior production scar to be justified.** Composition itself creates a different claim requiring different evidence.
4. **Do not say `shard from the start`.** Preserve YAGNI while structuring the suite so future sharding is mechanical rather than surgical.
5. **The roughly 3,000-test example is about feedback economics.** Individually cheap tests can become an expensive suite at scale.
6. **Reduce the prominence of `the scenario travels; the result stays with the run`.** Keep the custody rule as an agentic application of the evidence argument unless later discovery proves it deserves more weight.

## Open discovery

- Discover Harley's frontend testing model as its own family rather than treating browser tests as the whole frontend story.
- Decide whether contract tests are a distinct evidence class in Harley's practice or an assertion style that lives within application/integration scopes.
- Discover any other backend scopes that genuinely add engineering judgement rather than completeness for completeness's sake.
- Discover Harley's separate model for classifying tests when the artefact under test is behavioural prose and the system is non-deterministic.
- Map the backend evidence scopes into that agentic worked example without pretending determinism transfers unchanged.
- Test at least one materially different curveball governing argument before settling the article.
- Establish what a cynical architect would dismiss as obvious and which concrete engineering details make the piece more than a testing primer.

## Cutting-room threads retained in this article for now

- Test architecture versus test infrastructure.
- YAGNI without making later scale expensive.
- `Fast` is a property of the feedback loop, not merely of an individual test.
- The car component-safety / road-safety analogy for composition evidence.
- Test organisation by meaningful behavioural area as an enabler of later parallelism.

No new material from this batch belongs in `cross-article-thread-ledger.md` yet.

## Checkpoint decision

This checkpoint is worth a GitHub write because a meaningful batch of discovery changed both the factual scope and the governing direction: engineering-first rather than agent-first, backend rather than universal taxonomy, composition evidence rather than failure-story dependence, and scale-ready organisation rather than premature sharding.

The current manuscript is reconciled in `testing-evidence-cloud-first-draft.md`. The cross-article ledger has been reviewed and requires no addition for this batch.
