# Cloud first draft — Tests are different kinds of evidence

**Status:** Checkpoint-1 manuscript from Cloud editorial discovery. Not publication-ready, not admitted, and deliberately incomplete. Frontend testing and the agentic worked example remain under discovery.

**Current working argument:** Tests earn their place from both the evidence they provide and the cost of obtaining that evidence. Good engineering matches test scope to the behaviour under question, then keeps that evidence at a cadence the delivery loop can afford.

## Manuscript

# Tests are different kinds of evidence

A unit test and an integration test can both be green while proving completely different things. That sounds obvious when stated baldly. In practice, whole testing strategies get weaker when the green result is allowed to stand in for the question nobody wrote down.

My starting point is simple: use the smallest scope of test that can genuinely prove the behaviour you care about, and run that evidence as often as its cost allows. The scope determines what you can know. The cost determines where the test belongs in the delivery loop.

So far, that gives me three useful backend layers: unit tests, application tests and integration tests. They are not three sizes of the same thing. They test different compositions of the same components.

## Unit tests buy cheap, local confidence

I like unit tests in abundance. A mature application should be covered in small unit-shaped slices of proven behaviour. They catch regression quickly, they run often, and they are the main lever for TDD: write a small RED test, make the smallest responsible change to turn it GREEN, then iterate.

The word *fast* needs a qualification, though. An individual unit test can be cheap while the suite that contains it becomes expensive. I have worked with suites of roughly 3,000 unit tests that take more than ten minutes when run in series. Split across five shards, the same body of evidence can come back in roughly two minutes.

When engineers are iterating quickly, ten minutes in CI is a drag. Two minutes is a very different feedback loop.

The lesson is not to build five shards on day one. That would be paying for scale before the problem exists. The lesson is to organise the suite so that, when feedback time finally becomes painful, making it snappy again is boring and mechanical.

If 3,000 tests live in one `tests.py`, the runner has discovered an organisational problem for you. A broad `api_tests.py` file is better, but still leaves more work than a suite already divided around meaningful areas of behaviour. Good test architecture keeps future partitioning possible. Test infrastructure spends the concurrency complexity only when the economics justify it.

I want YAGNI without arranging a future migration that requires surgery.

## Application tests buy composition evidence

Passing unit tests do not add up automatically to a passing application.

I do not need to watch that fail in production before believing it. Safety testing can prove that every individual part of a car is mechanically fit for purpose. If nobody has road-tested the assembled car, I am not putting my granny in it and assuming that all the component certificates compose into a safe journey.

Application tests answer that composition question inside a controlled boundary.

The shape I normally want is one meaningful input from outside the application, often an API call, followed through the real application behaviour as far as the application's own boundary. I assert the persisted state changes and other internal consequences caused by that input. Dependencies beyond the application boundary are mocked or otherwise controlled.

The API is incidental. The important part is the observation boundary: one outside stimulus enters, the application's real internal composition runs, and the test observes whether the system changed as expected without turning external dependencies into part of the proof.

That buys something a unit suite cannot. The units may each behave correctly in isolation while their composition still produces the wrong application behaviour. Application evidence asks whether the parts work together as the application says they should.

Because that environment is still controlled, these tests can run regularly. They are broader than unit tests without paying the full operational cost of exercising a running system and its external collaborations.

## Integration tests buy external behaviour

For integration evidence, I move the observation point outside the application.

The test drives a running instance from the outside. External dependencies are not mocked, but they are not live production systems either; they are safe sandbox dependencies. A test might execute a sequence of API calls representing one consumer behaviour and observe the externally visible result of the whole interaction.

That distinction is deliberate. I should not be relying on a breakpoint inside the code under test to understand whether the integration test passed. The internals are not the direct subject. The running application's behaviour is.

That evidence costs more. The application has to be running, dependencies have to exist, environments need managing and the test usually travels through far more machinery than a unit or application test.

So I do not churn those tests in CI merely because integration evidence is valuable. I run them in CD. They need to pass before I am willing to deploy, but their cost makes them a poor fit for the tight development loop.

This is where test strategy becomes resource allocation. The most expensive test is not automatically the strongest test, and the cheapest test is not automatically sufficient. A test belongs where its evidence is useful enough to justify what it costs the feedback loop.

## Green belongs to a question

These three scopes can all examine the same broad feature and still answer materially different questions.

A unit test can prove a small rule. An application test can prove that those rules compose correctly inside the controlled application. An integration test can prove that the running application behaves correctly from the outside when its real collaborations are exercised against safe environments.

None of those green results inherits the others' jurisdiction.

That is the testing habit I care about more than any particular framework: before celebrating green, know which behaviour the test observed, which composition it exercised and what remains outside the boundary.

The same reasoning becomes more interesting once the system under test is no longer deterministic application code. In agentic engineering, some of the code under test is prose intended to shape behaviour. A scenario may be reusable while the observation is tied to a particular model, harness, toolset, repository state and run. I use the same engineering questions there too: what behaviour am I trying to prove, what is the cheapest credible observation, and which parts of the environment are actually inside the evidence boundary?

That is where the agentic worked example will enter this article. It should demonstrate the transfer of ordinary engineering judgement into a strange substrate, not turn the piece into an agents article with a testing preface.

## Still under discovery

The backend model above is not a complete theory of testing. Frontend testing is its own substantial family with meaningful scopes that have not yet been discovered for this draft. Contract tests and other backend evidence classes still need to be placed according to Harley's actual practice rather than added for taxonomy completeness.

The agentic example also needs its own evidence map before the manuscript can settle. The existing Superpowers-derived RED/GREEN pressure-testing lineage and Harley's portable-scenario/run-bound-result custody rule remain available, but their final weight should follow the engineering argument rather than dictate it.

No admission or publication decision has been made.
