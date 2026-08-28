# Terra draft — Tests are different kinds of evidence

**Status:** Non-publication-ready working draft. This is an editorial candidate, not a claim that the article has passed Harley's author review, source-link refresh, or publication gates.

**Provisional governing argument:** A green result is useful only when we can say which claim it examined, which risk it addressed, and where it observed the system; confidence comes from a deliberately chosen set of evidence, not from a large total of passing tests.

## Draft prose

# Tests are different kinds of evidence

The most reassuring line in a build log is often the least informative: *all tests passed*. It tells us that a set of programs produced the expected result in one run. It does not tell us whether those programs examined the failure that matters now.

That distinction becomes important as soon as a product crosses boundaries. A button may begin in a browser, invoke an API, change persisted state, trigger an external service, and later appear in a deployed route. Calling part of that path “frontend” and another part “backend” is useful for organising people and code. It is not a useful account of user behaviour. The user experiences one journey, and its risks cross those labels.

So I start with three questions before choosing a test: what are we claiming, what is the costly way it could be wrong, and at what boundary could we observe that failure? The answers select evidence. They also tell us what a green result cannot prove.

## A contract is not a journey

Some claims are narrow enough for deterministic checks. A content manifest can be required to produce known routes. A route checker can reject a missing canonical URL, a non-HTML response, or a generic GitHub error document. A component test can establish that a state transition preserves an important invariant. These are valuable precisely because they are specific and repeatable: given this input and this version of the code, the result should be this output.

But a deterministic contract cannot show that the feature is usable in a real browser, that the built artifact reached the host, or that an adjacent service interprets the data as intended. A local green result is evidence about the contract and the environment in which it ran. It is not a receipt for the whole product.

The same applies to integration tests. They are for claims about collaboration: an application and its persistence layer, an API and its consumer, or a build step and the manifest it reads. Good integration evidence makes the seam visible and catches mismatched assumptions on either side. It still may not include the production credentials, network, browser engine, deployment configuration, or third-party behaviour that changes the outcome for users. The right response is not to make every test an integration test. It is to put integration evidence where collaboration itself is the risk.

## Choose the observation boundary deliberately

Browser tests are useful when the claim depends on the browser being able to render and operate the journey. On this portfolio, the accessibility suite visits representative routes at desktop and mobile sizes, waits for the main content and fonts, and runs automated WCAG A/AA checks. That is stronger evidence than checking that components render in isolation: it observes the assembled page in a browser.

It is still only automated accessibility evidence. It cannot establish that keyboard navigation is intelligible, that zoom behaviour supports the reading task, or that focus order makes sense to a person using the page. Those are different claims, requiring keyboard, zoom, focus, and reading-order review. Treating an automated scan as a complete accessibility verdict would make the green result say more than the test observed.

Visual regression makes a similar trade. It protects selected signature compositions from accidental drift; it is not a general assertion that every pixel on every route is good. The portfolio makes that boundary explicit. Its screenshot run fixes the random source, motion preference, font readiness, viewport, and snapshot location, then compares reviewed baselines on Windows, the chosen baseline renderer. That determinism makes a changed screenshot actionable. It does not make the baseline self-justifying. A newly updated image still needs a human decision that the new composition is intentional, legible, and worth protecting.

Negative controls matter here. A check should be capable of demonstrating the failure it is meant to prevent, not merely producing a comforting green number. A public-route checker that detects a generic error page and expects the custom 404 is more useful than one which asks only whether the host answered. An accessibility suite that includes a deliberately unknown route can exercise the error surface rather than silently assuming it is equivalent to the happy path. In the same spirit, a test should not freeze exact prose, class names, or internal component structure when the real claim is a route, privacy, custody, accessibility, or visual-review outcome. A test that protects the wrong thing turns refactoring into apparent failure and can leave the actual regression unobserved.

## Local proof and public proof are different observations

Hosted checks add an independent observation of a particular revision. They build the checked-out source in a clean runner and, in this repository, run the broad quality work on Ubuntu and the deliberate visual comparison on Windows. That can reveal a dependency, platform, or checkout assumption hidden by a developer's machine. It cannot prove that a deployment completed correctly, because it observes the pre-deploy artifact rather than the public site.

Deployed-route proof answers a later, narrower question: is the host serving the artifact people will reach? The portfolio's post-deploy route check derives expected routes from the manifest and verifies response status, content type, title, canonical URL, generic-error detection, and the custom 404 against the published origin. That is meaningful evidence of delivery. It does not prove that every person can use every journey under every network condition, nor does it prove a property outside the assertions. It closes the gap between a validated artifact and a live route; it does not close every possible gap.

This is why a testing strategy is not a pyramid with more boxes at the bottom. The shape is less useful than the map of claims and observation boundaries. A small, fast deterministic test may be the best evidence for a parser invariant. An integration test may be the only sensible evidence for a consumer contract. A browser test may be necessary for a keyboard-reachable flow. A hosted run and a deployed check may be necessary before saying a public change is actually live. The question is always: which observation could falsify the claim that would cost us if it were false?

## RED and GREEN are questions before they are colours

Test-driven development is often abbreviated to a sequence: RED, GREEN, REFACTOR. The useful discipline begins earlier. Before writing a failing test, name the risk, the question, and the observation boundary. Then make the smallest responsible change that turns the relevant failure into a pass. Refactor without losing the question.

That framing travels beyond application code. For agent skills, the inherited RED/GREEN pressure-testing method asks whether guidance changes behaviour under a realistic pull toward the wrong action. The pressure scenario is not just a wording check. It puts an agent under combined incentives, records a baseline without the skill, then compares behaviour with the guidance available. The method used here is deliberately derived from [obra/superpowers](https://github.com/obra/superpowers) and its subagent skill-testing guidance, rather than presented as a new invention.

The Marketplace adds a separate evidence-custody rule. The scenario that expresses a skill's behavioural claim travels with the skill, versioned alongside it. The observation belongs to a particular run: a particular model, harness, tools, instructions, repository state, and environment. The Marketplace can retain its own RED/GREEN observations; a consumer can receive the same question and run it in their own context. In short: **the scenario travels with the skill. The result stays with the run.**

That is Harley's extension: a composition of familiar versioned-test, environment-bound-run, and independently executable-specification practices. It is a claim about this evidence-custody composition, not a claim to have invented pressure testing, RED/GREEN, or evaluation generally. Later OpenAI and Anthropic evaluation guidance may be useful as evidence of independent convergence if included after source review; it should not be represented as the original inspiration.

## Green is the start of an explanation

The point is not to make validation ceremonial or to turn every change into a long test catalogue. It is to make a passing result legible. A reviewer should be able to ask: which claim did this examine; which risk did it make less likely; what did the runner actually observe; and what remains unproven?

Those questions make a smaller suite stronger, not weaker. They stop a component assertion from posing as production proof. They stop a successful deployment from posing as an accessibility review. And they leave room for the evidence that cannot be reduced to a green line: deliberate human review, a clear statement of limits, and another person being able to run the same question for themselves.

## Source and fact custody

| Material or claim | Custody and permitted use | Boundary to retain before publication |
| --- | --- | --- |
| Governing proposition and required article structure | `.agents/specs/2026-08-21-portfolio-10k-07-writing-authority-design.md`, “Tests are different kinds of evidence” | Approved design direction, not proof that a new public article is accepted or complete. |
| Portfolio test, visual, hosted, and public-route descriptions | `.agents/runbooks/testing.md`; `.agents/doctrine/validation-policy.md`; `.github/workflows/ci.yml`; `src/client/e2e/accessibility.spec.ts`; `src/client/e2e/visual-regression.spec.ts`; `tools/check_public_routes.py` | Describe what these checks assert. Do not infer a current passing result, total coverage, accessibility conformance, or hosted/deployment success without the exact observed run. |
| Negative-control framing | `.agents/runbooks/design.md`; `tests/test_public_routes.py`; live accessibility route matrix | Retain only concrete, inspectable examples. Do not claim a formal negative-control campaign for every suite. |
| Skill pressure-testing lineage | `obra/superpowers` revision `b36e0829c6d0140e93cfef2ca599b1b07d4a7797`, especially `skills/writing-skills/testing-skills-with-subagents.md`; Phase 7 plan evidence record | Final article must refresh and pin the exact upstream source it links. This is derivation, not Harley's invention. |
| Marketplace scenarios and retained observations | `.agents/plugins/marketplace-source/tests/pressure/README.md` and the public Marketplace source at its final pinned revision | State only that a scenario can ship with a skill and results are run-bound. Do not imply every Marketplace skill has a completed campaign or that a consumer will reproduce a result. |
| Evidence-custody formulation | Phase 7 approved design, “Traditional engineering composition” and “Harley's extension” | Harley's novel extension is the exact composition; do not claim priority over the individual techniques or later evaluation literature. |
| OpenAI / Anthropic evaluations material | Not yet inspected for this draft | If cited, classify as later independent convergence or supporting evidence, never as original inspiration. |

## Originality boundary

- **Inherited:** RED/GREEN pressure testing for agent skills derives from `obra/superpowers`; standard unit, integration, browser, and deployment verification are established engineering practice.
- **Harley's extension:** package the portable pressure scenario with the skill's behavioural claim, while retaining results as observations bound to their individual runs.
- **Not claimed:** invention of TDD, pressure testing, test pyramids, evaluation practice, version-bound testing, or global priority for the composition.
- **Later convergence:** any OpenAI or Anthropic material is corroborating, later-read guidance only if exact sources are reviewed and pinned.

## Harley questions before a Sol edit or publication decision

1. Which one real, employer-safe example would best open the article: a contract failure caught locally, a hosted-only discrepancy, or a deployment/public-route gap? It must be safe to describe and have a clear before state, exact decision, and observable result.
2. Is “Harley's extension” the public-facing name you want for the scenario/run custody formulation, or should the article describe it without an ownership label and leave the attribution to the source-custody note?
3. Do you want the final article to link to a selected Marketplace pressure campaign as its concrete agent-skill example? If so, which completed campaign and final public revision should be the source of record?
4. Are there any non-public test cases or professional systems that must remain entirely out of the examples, even at a high level?

