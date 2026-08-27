# Cloud discovery record — Tests are different kinds of evidence

Status: live Cloud editorial-room answer log; reconciled for GitHub checkpoint 2 on 27 August 2026.

## Session direction

- Harley clarified that this is primarily a software-engineering article about hard-won testing judgement. Agentic engineering is a worked application of engineering first principles, not the governing subject.
- Current exploration is backend testing only. Frontend is a separate testing family with its own meaningful scopes and should not be collapsed into “browser tests”.

## Emerging backend evidence strategy

### Unit tests

- Abundant, small, fast slices of proven functionality.
- Run frequently for regression and as the RED/GREEN TDD lever.
- Around 3,000 unit tests can exceed 10 minutes when run serially; five-way parallel sharding can reduce the same run to roughly 2 minutes.
- The lesson is not “shard from the start”. The suite should be organised so that, when runtime becomes a drag, restoring fast feedback through sharding is boring and mechanical rather than a rewrite.
- Test organisation should reflect the area under test. A monolithic `tests.py` with thousands of tests, or even one giant `api_tests.py`, makes later sharding harder than a properly decomposed suite.

### Acceptance/application tests

- Exercise a single externally meaningful journey through the controlled application boundary.
- Often begin with one API call, follow resultant state mutations and side effects, assert persisted state, and mock dependencies at the application boundary.
- Need not begin with an API call; the essential shape is one input from outside, no uncontrolled outputs to dependencies, and observation of the application's resulting state.
- Unit proof does not compose automatically into application proof. Harley's analogy: every component of a car can be mechanically fit for purpose without proving that the assembled car is road-safe. Unit and acceptance tests test different compositions of the same components.
- This is a first-principles judgement, not a lesson that required waiting for a production failure.

### Integration tests

- Black-box external behaviour tests against a running instance of the application.
- Follow real dependency interactions outward to sandbox/non-live dependencies; external dependencies are not mocked, but they are not production either.
- Often model a consumer behaviour through a sequence of API calls.
- The internals of the application are not directly under test; inability to stop on an internal breakpoint is a useful expression of the boundary.
- Expensive by design. Run in CD rather than the fast CI loop; must pass before deployment but should not be churned on every development iteration.

## Emerging argument candidates

- A test earns its place from both the evidence it provides and the cost of obtaining that evidence.
- Use the cheapest test scope that can genuinely prove the behaviour at issue, then run that evidence at the cadence its cost permits.
- Testing strategy includes execution strategy, but YAGNI still applies: preserve future mechanical parallelism without paying sharding complexity before it is needed.
- Different scopes are not larger/smaller versions of the same proof; they observe different compositions and therefore support different claims.

## Editorial cautions

- Do not make “shard from the start” the lesson; Harley explicitly rejected that as bullshit.
- Do not imply acceptance tests exist only because unit tests have failed in production; the need follows from composition reasoning.
- Do not generalise the current backend model to frontend testing.

### Contract/schema validation as a claim across scopes

- Harley does not naturally treat contract tests as a separate rung. In one professional API project, contract-like input validation is exercised across the existing unit, application/acceptance and integration scopes.
- The API has serializer/schema rules that refuse input type coercion, plus validators on input models in the MediatR pipeline that reject invalid requests before the handler runs.
- Unit evidence: the validator rejects the invalid model for the right reason.
- Application/acceptance evidence: a request with the bad shape is rejected cleanly at the correct point, does not leak past the validator into later application behaviour, and produces the expected rejection messages for that class of failure.
- Integration evidence: valid requests get through; invalid requests are rejected from outside the running API with the expected rejection message.
- Editorial consequence: the same behavioural contract can legitimately have tests at several scopes without those tests being redundant. Each scope proves a different part of the enforcement chain: local rule, application composition/wiring and externally observed boundary behaviour.
- `Acceptance` is the project-local name for what Harley conceptually classifies as application tests. Preserve that distinction if the project is ever named publicly.

### Integration environment: real persistence, safe environment

Harley added an important reason integration tests are expensive: they run against a real application instance backed by a real database. The database is not an in-memory substitute, because some behaviour only becomes meaningful across time and across multiple external interactions.

In Harley's practice, the backing database is environment-specific:

- locally, the development database;
- in the delivery pipeline, a staging-slot database associated with the build under test;
- ordinarily not the production database.

The key judgement is that integration tests should have run against the same build that will be deployed to production, in an environment realistic enough to preserve the behaviours being observed.

Harley explicitly softened this from an absolute prohibition on production execution. Tenant isolation can mitigate the main risk by placing synthetic integration-test artefacts into a dedicated tenant for later sweep cleanup. That makes production execution technically containable, but it also creates cleanup and lifecycle work.

His practical position is: why create that work unless production itself is necessary to answer some specific claim? He cannot currently think of a reason his integration tests would need to run against the production instance. Safe pre-production execution already proves the build against real persistence and real dependency behaviour without contaminating live data.

Editorial consequence: distinguish **production-representative execution** from **execution in production**. Do not write this as a universal ban. The stronger first-principles rule is that the environment should be no more production-like than the claim requires, and synthetic production state needs an explicit reason to exist.

This also strengthens the reason integration belongs in CD rather than the tight CI loop: standing up or targeting a running instance plus a real database and sandbox dependencies buys broader behavioural evidence at a materially higher execution cost.

### Integration tests can prove temporal consumer behaviour

Harley supplied an illustrative integration-test shape to show what the external boundary can buy. It is not a claim that this exact test currently exists in the professional project; it is an off-the-cuff example that would be straightforward to write and, in Harley's judgement, is a good use of the integration boundary.

Example sequence:

1. Send a create request whose schema is valid but whose values trigger a subtle edge validation case; receive an ID.
2. Poll for the result associated with that ID until a result is available.
3. Observe that the result reports validation failure.
4. Deliberately correct the input, submit again, receive a new ID and observe that the new request is not rejected for that validation case.

Editorial consequence: integration scope can prove more than endpoint acceptance/rejection. It can prove a consumer-visible sequence across time, correlation IDs, persisted state and multiple interactions with a real running system. Lower scopes can test the constituent rules and composition, but they cannot by themselves prove that whole external protocol behaves correctly over time.

## Open discovery

- Discover Harley's frontend testing model as its own family rather than treating browser tests as the whole frontend story.
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
- Production-representative evidence without unnecessarily using production state.

No new material from this batch belongs in `cross-article-thread-ledger.md` yet.
