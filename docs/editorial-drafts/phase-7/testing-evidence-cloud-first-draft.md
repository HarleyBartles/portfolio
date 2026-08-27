# Cloud first draft: The right test isn't your favourite test

**Status:** Reframed Cloud manuscript after Harley-led discovery. Not publication-ready, not admitted, and still subject to author revision. This version adopts the accepted governing argument and keeps agentic testing as a worked transfer of established engineering judgement.

**Governing argument:** The right test is the one that can falsify the next thing you are about to trust. Testing belongs inside iterative development, so its scope should change as the thing being trusted changes.

## Manuscript

# The right test isn't your favourite test

I like unit tests. I write a lot of them.

If the next thing I need to know is whether a validator rejects bad input for the right reason, a unit test is probably exactly what I want. If I am about to trust that the same rule is wired into an application correctly, that unit test has already told me everything it can. Running another hundred unit tests does not make the composition more proven. I need to move the observation point.

The right test isn't your favourite test.

Testing gets weak when the preferred tool starts choosing the question. Unit-test people can reach for another unit test. Integration-heavy teams can make everything expensive in the name of realism. An end-to-end suite can turn into a certificate for things it never actually examined. Coverage can become a number people point at instead of asking what is still capable of failing.

I do not think testing belongs exclusively before implementation or after it. Iterative testing is part of iterative development. The system changes, the risk changes, and the next useful question changes with it. Pick the test that can answer that question.

## Start small while small is enough

Unit tests are my default tool for small, local behaviour. I want them abundant, fast and cheap enough to run constantly. They catch regression and they give me the TDD loop I actually use: write a small RED test, make the smallest responsible change that turns it GREEN, move on.

Cheap is relative once a codebase gets large.

I have worked with a suite of roughly 3,000 unit tests that took more than ten minutes in series. Run over five shards, the same body of tests came back in roughly two minutes. When engineers are iterating quickly, that difference changes the development loop. Ten minutes is long enough to stop watching and start something else. Two minutes is still feedback.

The lesson is not `shard from day one`. That is paying for scale before you have the problem. The lesson is to organise the suite so making it snappy again is boring and mechanical when the problem arrives.

If 3,000 tests eventually live in one `tests.py`, you are going to have a bad time. Even one giant `api_tests.py` leaves more work than a suite already divided around meaningful areas of behaviour. I want the test architecture to preserve the option to partition later. I only want to pay the infrastructure cost when the feedback economics justify it.

That is part of test selection too. Evidence has a runtime cost, and cost affects how often I can afford to ask for it.

## Move the boundary when the question changes

Passing unit tests do not add up automatically to a passing application.

I do not need to watch that fail in production before believing it. Safety testing can prove every component of a car mechanically fit for purpose. If nobody has road-tested the assembled car, I am not putting my granny in it and assuming the component certificates somehow prove the journey.

That is where I move to an application-level test. Give the application one meaningful input from outside, often an API call, let its real internal composition run, then assert on the state changes and consequences inside the application boundary. External dependencies stay controlled.

Now I am testing a different claim. The validator, handler, persistence and internal wiring might each be correct in isolation while their composition is wrong.

The same contract can deserve proof at several scopes for exactly that reason. Take API input validation. I can unit-test that a validator rejects one bad model for the right reason. I can test the application pipeline to prove the bad request is rejected at the right point and does not leak farther into the system. Then I can approach the running API from outside and prove that a consumer gets the public rejection behaviour I promised.

Those tests overlap in subject without duplicating their evidence. One proves the rule. One proves the rule is composed correctly. One proves the running system exposes the contract correctly.

That is why I am not especially interested in arguments about whether `contract test` deserves its own box on a diagram. The useful question is where this contract can fail, and which observation can catch that failure.

## Integration tests prove a build

When I want evidence about the running system as an external consumer sees it, I move the observation point outside the application.

My integration tests run against an instance with a real database and safe external dependencies. I am not interested in reaching through the boundary to poke at internals. If I need a breakpoint inside the application to understand the test, I am probably testing at the wrong level.

A useful integration scenario can span time. Send a validly shaped request with a subtle bad value. Receive an ID. Poll the ID until processing finishes. Observe the public validation failure. Correct the input, submit again under a new ID, and observe that the same rejection does not happen.

That is a consumer behaviour. It crosses several calls, correlation, persistence and time. A unit test can prove the validation rule. An application test can prove where it is enforced. Neither proves that whole external protocol.

This evidence is expensive. The instance is running, the database is real, and the dependencies are real enough for the behaviour under test. I therefore run integration tests in CD rather than churning them through the tight CI loop. They need to pass before I deploy, but I do not need to pay for them on every small iteration.

More precisely, integration tests prove a build.

Staging is where I might obtain that evidence. The unchanged build is what the result belongs to. If that exact build moves into production, its integration result does not evaporate because the hostname changed.

I could arrange tenant isolation and run synthetic integration traffic in production without poisoning everybody else's data. I still need a reason. If production itself contains a behaviour the test can only observe there, fine, that is a different claim. Otherwise I have bought cleanup work and live-state risk without learning anything new about the unchanged build.

The environment should be realistic enough for the question. Making it more dangerous does not make the answer more truthful.

## Some tests earn their keep by being annoying

Frontend work makes this easier to see because different claims need visibly different evidence.

I can test React components, API clients and routing directly. TypeScript carries some guarantees without waiting for runtime at all. None of those tells me whether a carefully authored page changed shape somewhere I did not expect.

This portfolio is visually regression-tested because its frontend is part of the product. That test suite is deliberately nosy.

Change the title of one article and a related article that links to it can become taller on mobile because the new title wraps onto another line. A visual test goes RED on a page I did not think I was changing.

Good. I want to know.

The RED result is not automatically a defect verdict. I inspect the changed composition. If the consequence is legitimate, I deliberately update the baseline and make the test GREEN again. If it is not legitimate, I fix the regression.

That maintenance cost buys me a forced decision about collateral visual change. A quieter test would be cheaper and would tell me less.

Accessibility is similar in one important respect: the claim dictates the evidence. I treat accessibility as a product contract. A site that claims to be accessible can lose that claim through one poor judgement call, so tests help keep us honest.

I am not an accessibility specialist. I use published standards as the authority and keep enough understanding to recognise when a product decision is obviously cutting against them. I have had product ask for red text on a green background to indicate row state. Hard decline. Colour-blind users still have to read the thing.

Automation can enforce objective parts of the contract. It cannot outsource judgement.

And when the question is simply whether a frontend journey is coherent, I use it as a user would use it. Professionally, QA own the durable Playwright journey suites. I do not need to pretend I personally automate every layer of proof. If I care about the usability of something I built, I dogfood it.

That does not prove every user will find it usable. It does prove I did not stop at green components and declare the assembled journey coherent without actually taking the journey.

## The same engineering habit works on prose

Agentic systems make testing stranger, but I do not think they need a completely new philosophy.

For skills, I use RED/GREEN pressure scenarios. The pressure-testing shape comes from `obra/superpowers`; I am applying that established TDD idea to the skills I build.

First I write a scenario that should expose the bad behaviour the skill exists to correct. I run the scenario against an agent without the skill and observe RED. Then I write or revise the skill and rerun the same scenario until the targeted behaviour goes GREEN.

That gives me a much better answer to `how do we know this skill does what it claims?` than reading the instructions and deciding they look persuasive.

Here is the scenario. Run it without the skill. Run it with the skill. Observe what changes.

The implementation happens to be prose intended to influence a non-deterministic system, so the GREEN needs an honest boundary. A pass in my Marketplace repository, with one model, harness, repository and agent configuration, does not guarantee a pass in yours.

That is why the skill ships its pressure scenario, not its historical result.

If I clone an open-source repository, I expect it to ship its tests. I would not accept `all these tests passed for us, here are the results, you do not need to run them` as a substitute for verification where I intend to rely on the code. I might care that upstream CI was green. I still have the test because the test is what lets the claim be challenged again.

Shipping a skill should be no different. Ship the verifier. Let the environment where the skill is actually used produce its own observation.

## Green only earns the confidence it earned

This is why I resist favourite-test thinking.

I like unit tests, but a unit test cannot certify composition. An application test cannot certify an external protocol it never exercised. An integration result belongs to the build that actually ran. A visual baseline can tell me something moved, then I still have to decide whether the movement is right. An accessibility scan can enforce part of a contract without becoming a substitute for engineering judgement. A skill pressure test can show a behavioural change in one agentic context without becoming a universal guarantee.

Testing is part of the iteration because the thing I am trying to trust keeps changing as the system grows.

The right test is not the one I reach for most often. It is the one most capable of proving me wrong about the next thing I am about to trust.
