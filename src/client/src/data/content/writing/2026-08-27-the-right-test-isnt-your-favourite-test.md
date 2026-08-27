---
title: The right test isn't your favourite test
date: 2026-08-27
summary: The test worth running is the one that can falsify the next thing you are about to trust.
---

I like unit tests. I write a lot of them.

If I need to know whether a validator rejects bad input for the right reason, a unit test is exactly what I want. Once I'm trusting that the same rule is wired into an application correctly, that test has told me everything it can. Another hundred unit tests won't prove the composition. I need to move the observation point.

Testing gets weak when the preferred tool starts choosing the question. Unit-test people reach for another unit test. Integration-heavy teams make everything expensive in the name of realism. End-to-end suites become certificates for things they never examined. Coverage becomes a number people point at instead of asking what can still fail.

Testing belongs inside the iteration. The system changes, the risk changes, and the next useful question changes with it.

## Start small while small is enough

Unit tests are my default for small, local behaviour. I want them abundant, fast and cheap enough to run constantly. They catch regression and give me the TDD loop I use: write a small RED test, make the smallest responsible change that turns it GREEN, move on.

I've worked with a suite of roughly 3,000 unit tests that took more than ten minutes in series. Across five shards, they came back in roughly two minutes. Ten minutes is long enough to stop watching and start something else. Two minutes is still feedback.

Don't shard from day one. That pays for scale before you have the problem. Organise the suite around meaningful behaviour so making it snappy again is boring and mechanical when the problem arrives. If 3,000 tests eventually live in one `tests.py`, you're going to have a bad time.

Evidence has a runtime cost. That cost affects how often I can afford to ask for it.

## Move the boundary when the question changes

Passing unit tests don't add up to a passing application.

An application-level test gives the application one meaningful input from outside, often an API call, lets its real internal composition run, then asserts on state changes and consequences inside the application boundary. External dependencies stay controlled. The validator, handler and persistence can each be correct in isolation while their composition is wrong.

I don't need to watch that fail in production before believing it. Safety testing can prove every component of a car mechanically fit for purpose. If nobody has road-tested the assembled car, I'm not putting my granny in it and assuming the component certificates prove the journey.

The same validation rule can deserve proof at several scopes. I can unit-test that a validator rejects one bad model for the right reason. I can test the application pipeline to prove the bad request stops at the right point. Then I can approach the running API from outside and prove that a consumer gets the public rejection behaviour I promised.

One rule, three places it can fail. I care more about catching the failure than which box `contract test` gets on a diagram.

## Integration tests prove a build

To see the running system as an external consumer does, I move outside the application. My integration tests run against an instance with a real database and safe external dependencies. If I need a breakpoint inside the application to understand the test, I'm probably testing at the wrong level.

An integration scenario can span time: send a validly shaped request with a subtle bad value, receive an ID, poll until processing finishes, then observe the public validation failure. Correct the input, submit it under a new ID and prove the same rejection doesn't happen. That crosses several calls, correlation, persistence and time. Neither a unit test nor an application test proves that external protocol.

I find integration tests a dog because the instance is running, the database is real, and the dependencies are real enough for the behaviour under test.

> **The work isn't done until it's tested and done.**

This evidence is expensive. I run integration tests in CD rather than churning them through the tight CI loop. They must pass before I deploy. I don't need to pay for them on every small iteration.

Integration tests prove a build. I might gather that evidence in staging, but it belongs to the unchanged build. If that exact build moves into production, its result doesn't evaporate because the hostname changed.

I could isolate a tenant and run synthetic integration traffic in production. I still need a reason. If production contains behaviour I can only observe there, that's a different claim and deserves its own test. Otherwise I've bought cleanup work and live-state risk without learning anything new about the build.

The environment should be realistic enough for the question. Making it more dangerous doesn't make the answer more truthful.

## Some tests earn their keep by being annoying

Frontend work makes the distinction visible. I can test React components, API clients and routing directly. TypeScript carries some guarantees without waiting for runtime. None of those tells me whether a page changed shape somewhere I didn't expect.

This portfolio is visually regression-tested because its frontend is part of the product. The suite is deliberately nosy.

Change one article's title and a related article can become taller on mobile when the new title wraps. A visual test goes RED on a page I didn't think I was changing.

Good. I want to know.

RED isn't automatically a defect verdict. I inspect the changed composition. If the consequence is legitimate, I update the baseline deliberately. If it isn't, I fix the regression. The maintenance cost buys a forced decision about collateral visual change. A quieter test would tell me less.

I treat accessibility as a product contract. I'm not an accessibility specialist, so published standards are the authority. I still need enough understanding to recognise an obviously hostile decision. I've had product ask for red text on a green background to indicate row state. Hard decline. Colour-blind users still have to read the thing.

Automation can enforce objective parts of the contract. It can't outsource judgement.

> **Before you judge the journey, walk it.**
>
> *With apologies to Joe South, via Elvis.*

Professionally, QA own the durable Playwright journey suites. I don't personally automate every layer of proof. When I care whether something I built is coherent, I use it as a user would. I dogfood it.

Dogfooding gives me one user's evidence: mine. It catches the point where green components fail to become a coherent journey. It makes no wider usability claim.

## Prose can still be tested

A skill is prose. I still test what it makes an agent do. The RED/GREEN pressure-testing shape comes from [`obra/superpowers`](https://github.com/obra/superpowers); I'm applying that established TDD idea to the skills I build.

**Observe RED.** I write a scenario that exposes the bad behaviour the skill exists to correct, then run it against an agent without the skill.

**Earn GREEN.** I write or revise the skill and rerun the same scenario. The before-and-after behaviour answers `how do we know this skill does what it claims?` better than persuasive-looking instructions.

**Assume staleness.** GREEN is a bold word, and I mean it. It proves green against the RED I defined and observed. The result is stale as soon as it ran. Change the model, harness, repository or agent configuration and the question needs asking again. That's why the skill ships its pressure scenario rather than its historical result.

When I clone an open-source repository, I expect it to ship its tests. Upstream CI may be green. I still need the test that lets me challenge the claim where I intend to rely on the code. Skills deserve the same deal: ship the verifier and let the environment using the skill produce its own observation.

## Green only earns the confidence it earned

Every GREEN belongs to the question, boundary and run that produced it. Testing stays inside the iteration because the thing I'm trying to trust keeps changing as the system grows.

The right test isn't the one I reach for most often. It's the one most capable of proving me wrong about the next thing I'm about to trust.
