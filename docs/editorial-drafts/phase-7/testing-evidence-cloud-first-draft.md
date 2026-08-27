# Cloud first draft — Tests are different kinds of evidence

**Status:** Checkpoint-3 manuscript from Cloud editorial discovery. Not publication-ready, not admitted, and deliberately incomplete. The conventional backend/frontend engineering half is now coherent; the agentic worked example and required curveball reframe remain under discovery.

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

## Integration tests prove a running build

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

## Frontend is the same logic in a smaller organism

React is my bread and butter, but I am not going to pretend to be a frontend-testing guru. Jest and Vitest cover what I usually need.

Conceptually, frontend testing feels like a smaller model organism of the backend strategy. Components get direct tests. API clients get tests at their boundary. Routing gets tests because navigation and composition can fail independently. TypeScript and some discipline carry part of the contract statically rather than making every guarantee wait for a runtime test.

The philosophy does not change. I still want to know what claim I am making and which observation can honestly falsify it.

Some frontend claims need a very different kind of evidence, though.

## Visual regression is supposed to be nosy

This portfolio is a good example because the frontend is part of the product, not decoration around it. I visually regression-test selected authored compositions.

That comes with overhead. Change the title of one article and a related article that links to it can become taller on mobile because the longer title wraps onto another line. A screenshot test can go red somewhere I did not think I was changing.

I consider that worth paying for.

The red result does not automatically mean I broke the page. It means my change had a visible consequence that crossed the boundary I had in my head. I look at it, decide whether the new result is legitimate and, if it is, deliberately update the baseline and make the test green again.

That is an important distinction. A visual baseline is not a sacred picture of the old product. It is a reviewed expectation. Sometimes the test is telling me I caused accidental drift. Sometimes it is forcing me to acknowledge a valid change I would otherwise have missed.

The portfolio's own testing policy makes that explicit. It protects selected signature compositions, stabilises randomness, motion, fonts and viewports, and expects baseline changes to be reviewed rather than sprayed across the suite until CI shuts up.

There is a cost to having a test this sensitive. The cost buys awareness of spatial coupling elsewhere in the product.

## Accessibility is a contract

I do not think of accessibility as another test scope. Accessibility is a product contract, and contracts should be tested.

A site that claims to be accessible can lose that claim through one poor judgement call. Tests help keep that claim honest, but I am not an accessibility specialist and I do not invent the rules myself. I hold the product to published accessibility standards.

That still takes some baseline understanding from the engineer. I have had product ask for red text on a green background to indicate a row state. Hard decline. I already know enough to see the problem for colour-blind users; I do not need to wait for a scanner to grant me permission to object.

The standards are the authority. Automation can enforce a useful part of them. Human judgement still has to recognise when a design choice is plainly working against the contract.

That is another reason I do not like pretending one green suite can certify the whole product. A scanner can prove what it actually checks. It cannot turn off the engineer's responsibility to think.

## Some evidence has a different owner

Professionally, I do not usually write the automated browser-journey tests. QA own the Playwright suites.

That does not make the journey somebody else's concern. If I care that a journey is coherent, I run it as a user would use it. Dogfooding my own work is as good a proof of usability as I can personally give.

Component tests can prove component behaviour. Client tests can prove client behaviour. Routing tests can prove routing. None of them can tell me whether the assembled experience actually feels coherent when I use it from the outside.

Test strategy therefore includes ownership as well as scope. I do not need to personally author every automated proof. I do need to understand which claim needs evidence, what kind of evidence can answer it and who owns keeping that evidence alive.

## Green belongs to a question

Across backend and frontend, the pattern is the same.

A unit test can prove a small rule. An application test can prove that those rules compose correctly inside a controlled application. An integration test can prove the externally visible behaviour of a specific running build with real persistence and safe integrations. A visual regression can prove that a reviewed composition did not drift unnoticed. An accessibility suite can enforce objective parts of a product contract. Dogfooding can answer a usability question that no isolated component test can.

None of those green results inherits the others' jurisdiction.

That is the testing habit I care about more than any framework: before celebrating green, know which behaviour the test observed, which composition it exercised, what build and environment produced the result, what the evidence cost to obtain, and what remains outside the boundary.

The same reasoning becomes more interesting once the system under test is no longer deterministic application code. In agentic engineering, some of the code under test is prose intended to shape behaviour. A scenario may be reusable while the observation is tied to a particular model, harness, toolset, repository state and run.

That is the next question for this article: if the engineering principles are real rather than merely familiar, what happens when I apply them to a system where identical inputs do not guarantee identical behaviour?

## Still under discovery

The conventional engineering half is now coherent enough to hand off and recover. The next editorial phase needs to discover Harley's evidence model for agentic behaviour, preserve the Superpowers lineage boundary, test the portable-scenario/run-bound-result custody rule against the engineering principles above, and then perform the required materially different curveball reframe.

No admission or publication decision has been made.
