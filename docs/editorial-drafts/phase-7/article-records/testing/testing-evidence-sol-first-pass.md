# Sol first pass — Tests are different kinds of evidence

**Status:** Editorial-room opening manuscript. This is a bounded revision of the Terra draft, produced without additional story discovery. It is not publication-ready, fact-approved or admitted.

**Working argument:** A green test result is a receipt for one observation, not a certificate for the product. Engineering judgement lies in choosing which failure matters, where it can be observed and which evidence can genuinely answer the claim.

## Manuscript

# Tests are different kinds of evidence

*I trust green builds. I just don't ask them to testify about things they never saw.*

“All tests passed” is a useful sentence with a habit of travelling beyond its jurisdiction. It tells us that a particular set of checks produced the expected result, on one revision, in one environment. Before it becomes confidence, somebody still has to ask what those checks observed.

That question matters whenever product behaviour crosses the tidy boundaries in our codebase. A button can begin in a browser, call an API, change persisted state, trigger another service and eventually appear on a public route. “Frontend” and “backend” help us organise code and teams. The user experiences one journey.

My testing question is therefore less comfortable than “how many tests do we have?” What could be wrong here that would cost us, and where would that failure become observable? The answer determines the evidence worth collecting. It also sets an honest limit on what a passing result can say.

## Give each test a jurisdiction

Deterministic checks earn their keep by being narrow. A manifest can be required to produce every known route. A route checker can reject a missing canonical URL, a non-HTML response or a generic GitHub error document. A component test can show that a state transition preserves an invariant. Given the same input and revision, each check should return the same answer.

The narrowness is a feature. It makes a failure legible and keeps feedback fast. Trouble begins when the result is promoted beyond the boundary it observed. A component test hasn't used the assembled product in a browser. A local route test hasn't shown that the built artifact reached its host. An integration test between an application and its database says nothing about a third party interpreting the resulting data correctly.

Integration evidence belongs where collaboration is the risk: between an API and its consumer, an application and its persistence layer, or a build step and the manifest it consumes. Making every check larger would only trade precise failures for slower, harder-to-read ones. The useful move is to expose the seam that carries the risk and test there.

## A browser sees a different failure

Some claims depend on a real browser. This portfolio's accessibility suite visits representative routes at desktop and mobile sizes, waits for the main content and fonts, then runs automated WCAG A and AA checks against the assembled page. That is meaningful evidence because the browser, layout and routed application are present.

The result still has a boundary. An automated scan doesn't tell me whether the keyboard journey is intelligible, whether focus order makes sense to a person, or whether the page supports its reading task at 200% zoom. Keyboard, focus, zoom and reading-order review answer those questions. The scan and the human review complement one another because they observe different failure modes.

Visual regression has the same shape. The portfolio fixes its random source, motion preference, font readiness, viewport and snapshot renderer so that an unexpected change is worth investigating. Windows is the chosen baseline renderer. Determinism turns a changed screenshot into an actionable signal; a human still has to decide whether the new composition is intentional, legible and worth protecting.

That last judgement matters. A baseline can preserve a bad decision perfectly. Updating the image makes the suite green again, while reviewing the image decides whether green is deserved.

## A useful check has to know how to fail

I want evidence that can demonstrate the failure it claims to prevent. This portfolio's public-route checker looks beyond a 200 response. It rejects generic error pages, checks titles and canonical URLs, and expects the custom 404 on an unknown route. The host answering is only one part of the delivery claim.

The same discipline applies lower down the stack. A test that freezes exact prose, class names or component structure can make refactoring look broken while leaving the product risk untouched. The assertion should meet the claim at the cheapest boundary that can falsify it. Otherwise the suite accumulates green numbers without accumulating much confidence.

## Local, hosted and public are three observations

A local pass describes the checkout and environment in front of me. Hosted CI adds an independent runner around a particular revision. In this repository, the broad quality work runs on Ubuntu while deliberate visual comparison runs on Windows. That split can expose dependencies, platform assumptions and local state that my machine quietly supplied.

Neither runner has proved that a visitor can reach the deployed artifact. That question comes later. After deployment, the portfolio derives its expected routes from the content manifest and checks status, content type, title, canonical URL, generic-error absence and the custom 404 against the published origin.

These aren't three ceremonial repetitions of the same test. They are observations at three different boundaries. A local contract can be correct while the clean runner lacks an undeclared dependency. The hosted artifact can be valid while deployment serves the wrong route. Public-route proof closes that delivery gap and no more.

This is why I find the familiar testing pyramid less useful than a map of claims and observation points. A tiny parser test may be the strongest evidence for an invariant. An integration test may be the only credible check on a consumer contract. A browser journey may be necessary for an interaction. Hosted and deployed checks may both be required before the word “live” is earned.

## The scenario travels. The result stays put

The same principle becomes more obvious when the system under test is an agent.

Superpowers uses RED and GREEN pressure tests to ask whether guidance changes behaviour under a realistic pull towards the wrong action. A pressure scenario isn't a wording inspection. It combines incentives, records how an agent behaves without the skill, then runs the question again with the guidance available. My work derives that method from Superpowers rather than claiming it as an invention.

Agent Asset Marketplace adds an evidence-custody decision. A reusable skill can carry the pressure scenario that expresses its behavioural claim. The observation produced by running that scenario belongs to the model, harness, tools, instructions, repository state and environment that produced it.

> The scenario travels with the skill. The result stays with the run.

That lets another consumer ask the same question without pretending that somebody else's green result transferred with the files. The Marketplace can retain its own RED and GREEN observations; the consumer can execute the portable scenario in its own context. The test is versioned with the claim. The evidence remains attributable to the run.

The ingredients are familiar: versioned tests, environment-bound results and independently executable specifications. My extension is their composition for distributed agent skills. Any later OpenAI or Anthropic evaluation guidance belongs, if used at all, as independent convergence read after the fact, not retroactive inspiration.

## Green begins the explanation

I don't want every change buried under a catalogue of tests. I want a passing result that a reviewer can interrogate quickly: which claim did this examine, which costly failure did it make less likely, what did the runner actually observe, and what remains outside its view?

Those questions can make a smaller suite more persuasive. They stop a component assertion from posing as production proof and a successful deployment from posing as an accessibility review. They also leave room for evidence that won't reduce neatly to a green line: a deliberate human judgement, a candid boundary and another engineer being able to run the same question for themselves.

## Retained factual and editorial boundaries

- Portfolio validation details remain claims about the named checks, not claims of current green status or complete coverage.
- Skill pressure testing is derived from Superpowers. Harley does not claim invention of TDD, pressure testing or evaluation practice.
- Harley's proposed contribution is the scenario/run custody composition: package the portable behavioural question with the skill while binding each result to the run that produced it.
- OpenAI or Anthropic material requires exact source review before inclusion and may only be framed as later convergence.
- No professional or private system is introduced without Harley's explicit approval.

## Questions the editorial room still has to earn

1. Which lived, employer-safe failure gives this argument a human opening rather than a testing tutorial opening?
2. What did Harley believe about testing before that failure, and what changed in his practice afterwards?
3. Is the scenario/run custody decision the article's destination, its governing argument, or material for a separate article?
4. Which public pressure campaign, if any, is strong enough to carry the agentic half of the argument?
5. What should a weary hiring manager understand about Harley's engineering judgement after reading this, and what would a cynical architect still dismiss as obvious?
