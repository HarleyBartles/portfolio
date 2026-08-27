# Cloud first draft — Tests are different kinds of evidence

**Status:** Checkpoint-2 manuscript from Cloud editorial discovery. Not publication-ready, not admitted, and deliberately incomplete. Frontend testing, the agentic worked example and the required curveball reframe remain under discovery.

**Current working argument:** Tests earn their place from both the evidence they provide and the cost of obtaining that evidence. Good engineering matches test scope to the behaviour under question, then keeps that evidence at a cadence the delivery loop can afford.

## Manuscript

# Tests are different kinds of evidence

A unit test and an integration test can both be green while proving completely different things. That sounds obvious when stated baldly. In practice, testing strategy gets weaker whenever the green result is allowed to stand in for the question nobody wrote down.

My starting point is simple: use the smallest scope of test that can genuinely prove the behaviour you care about, and run that evidence as often as its cost allows. Scope determines what you can know. Cost determines where the test belongs in the delivery loop.

For backend work, that gives me three useful layers: unit tests, application tests and integration tests. They are not three sizes of the same thing. They test different compositions of the same components.

## Unit tests buy cheap, local confidence

I like unit tests in abundance. A mature application should be covered in small unit-shaped slices of proven behaviour. They catch regression quickly, run often and provide the main lever for TDD: write a small RED test, make the smallest responsible change to turn it GREEN, then iterate.

The word *fast* needs a qualification. An individual unit test can be cheap while the suite containing it becomes expensive. I have worked with suites of roughly 3,000 unit tests that take more than ten minutes in series. Split across five shards, the same body of evidence can come back in roughly two minutes.

When engineers are iterating quickly, ten minutes in CI is a drag. Two minutes is a different feedback loop.

The lesson is not to build five shards on day one. That would be paying for scale before the problem exists. The lesson is to organise the suite so that, when feedback time eventually becomes painful, making it snappy again is boring and mechanical.

If 3,000 tests live in one `tests.py`, the runner has exposed an organisational problem. Even one giant `api_tests.py` leaves more work than a suite already divided around meaningful areas of behaviour. Good test architecture preserves the option to partition. Test infrastructure spends the concurrency complexity only when the economics justify it.

I want YAGNI without arranging a future migration that requires surgery.

## Application tests buy composition evidence

Passing unit tests do not add up automatically to a passing application.

I do not need to watch that fail in production before believing it. Safety testing can prove that every individual part of a car is mechanically fit for purpose. If nobody has road-tested the assembled car, I am not putting my granny in it and assuming all the component certificates compose into a safe journey.

Application tests answer that composition question inside a controlled boundary.

The shape I normally want is one meaningful input from outside the application, often an API call, followed through the real application behaviour as far as the application's own boundary. I assert the persisted state changes and other internal consequences caused by that input. Dependencies beyond the application boundary are mocked or otherwise controlled.

The API is incidental. The important part is the observation boundary: one outside stimulus enters, the application's real internal composition runs, and the test observes whether the system changed as expected without turning external dependencies into part of the proof.

That buys something a unit suite cannot. The units may each behave correctly in isolation while their composition still produces the wrong application behaviour. Application evidence asks whether the parts work together as the application says they should.

## The same rule can deserve several proofs

Consider input validation on an API. A local validator can be unit-tested to prove that one invalid model is rejected for the right reason. That is useful, but it is only one claim.

An application-level test can send the bad request through the real application pipeline and prove that rejection happens at the correct point, that bad input does not leak beyond the validator, and that the expected class of rejection message is produced. Now I know not just that the rule exists, but that the application actually composes around it correctly.

An integration test can then approach the running API from outside. A valid request gets through. Invalid requests reject with the public message I expect.

That is not necessarily redundant coverage. The same behavioural contract is being observed at three different failure surfaces: the rule itself, its placement and composition inside the application, and the externally visible API boundary.

So I am wary of treating `contract tests` as an obligatory fourth rung. Sometimes the contract is the claim under test, while unit, application and integration scopes provide different evidence that the contract is implemented, composed and exposed correctly.

## Integration tests buy external behaviour across a real build

For integration evidence, I move the observation point outside the application.

The test drives a running instance from the outside. External dependencies are not mocked, but they are not live production systems either; they are safe sandbox dependencies. A test might execute a sequence of API calls representing one consumer behaviour and observe the externally visible result of the whole interaction.

That distinction is deliberate. I should not need a breakpoint inside the code under test to understand whether the integration test passed. The internals are not the direct subject. The running application's behaviour is.

The database is real too. An in-memory substitute cannot prove behaviour that depends on persisted state across time. Locally that may mean a development database. In delivery it may mean the database behind a staging slot. The point is not that staging has magical evidential value. The point is that the build under test is running against the real class of persistence and safe external dependencies needed for the claim.

That lets an integration test prove behaviours that lower scopes cannot. Imagine a create request with a schema-valid but subtly invalid value. The API accepts the request and returns an ID. The consumer polls that ID until a result appears and sees that validation ultimately failed. The input is corrected deliberately, submitted again under a new ID, and this time the same validation rejection does not occur.

That sequence spans time, correlation, persisted state and several externally visible interactions. Unit tests can prove the underlying rule. Application tests can prove where the rule is enforced. Only the integration boundary can prove the whole consumer-visible protocol as the running system exposes it.

That evidence is expensive because the instance, database and dependencies are real enough to make the behaviour meaningful. I therefore run integration tests in CD rather than churning them in the tight CI loop. They need to pass before I am willing to deploy.

More precisely, **integration tests prove a build**. If the tested build does not change, its integration result does not become false merely because the build moved from a staging slot to production. The staging environment is where I obtained the evidence; the build identity is what the evidence belongs to.

That also explains why I generally would not run the same integration suite against the production instance. Tenant isolation could contain synthetic test artefacts in a dedicated tenant and sweep them later, so production execution is not technically impossible. I just cannot see the point unless production itself contains some behaviour that the test specifically needs to observe. Otherwise I have created cleanup work and polluted live state without proving anything new about an unchanged build.

The useful distinction is production-representative execution versus execution in production. Test the build in an environment realistic enough for the claim. Do not make the environment more dangerous merely to make it feel more real.

## Green belongs to a question

These scopes can all examine the same broad feature and still answer materially different questions.

A unit test can prove a small rule. An application test can prove that those rules compose correctly inside the controlled application. An integration test can prove the externally visible behaviour of a specific running build with real persistence and safe integrations.

None of those green results inherits the others' jurisdiction.

That is the testing habit I care about more than any framework: before celebrating green, know which behaviour the test observed, which composition it exercised, what build and environment produced the result, and what remains outside the boundary.

The same reasoning becomes more interesting once the system under test is no longer deterministic application code. In agentic engineering, some of the code under test is prose intended to shape behaviour. A scenario may be reusable while the observation is tied to a particular model, harness, toolset, repository state and run. I use the same engineering questions there too: what behaviour am I trying to prove, what is the cheapest credible observation, and which parts of the environment are actually inside the evidence boundary?

That is where the agentic worked example will enter this article. It should demonstrate the transfer of ordinary engineering judgement into a strange substrate, not turn the piece into an agents article with a testing preface.

## Still under discovery

This backend model is not a complete theory of testing. Frontend testing is its own substantial family with meaningful scopes that have not yet been discovered for this draft. Other backend evidence classes should only be added where Harley's actual practice gives them distinct value.

The agentic example also needs its own evidence map before the manuscript can settle. The existing Superpowers-derived RED/GREEN pressure-testing lineage and Harley's portable-scenario/run-bound-result custody rule remain available, but their final weight should follow the engineering argument rather than dictate it.

No admission or publication decision has been made.
