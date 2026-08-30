# Phase 8P typography-system pressure test

**Status:** RED, GREEN and loophole review completed on 30 August 2026. This is governance evidence for the typography checkpoint, not public-site implementation proof.

## Claim under test

The Phase 8P typography system should prevent a capable worker from turning Serif into a “premium editorial” accent, Mono into an “engineering” accent, or the deterministic specimen into an accidental production design system. The intervention under test is the whole authority stack: policy, contract, specimen and operational skill.

## Frozen fixtures

- RED repository: `8f6028a0bd9ca4d2021d6b1b9d3a628dac570638`, the last `main` state before PR #45.
- GREEN repository at first run: `be5b511c48c027362480e4f905a15d8fc02f3069` plus the uncommitted minimum skill under test.
- Routes: `/projects/wild-bunch` and `/about`.
- Render sizes: `1440 × 1000` and `390 × 844` CSS pixels.
- Runtime: the baseline checkout's locked client dependencies, Vite `8.1.5`, and the Codex in-app Chromium browser.
- Trial workers: fresh isolated `gpt-5.6-sol` agents at high reasoning effort.

The commit SHA is the durable visual fixture. Temporary screenshots were rendered from it for the trials but are not committed; a future run can reconstruct the same source state, routes and viewports without preserving binary historical design evidence.

RED workers could inspect only the frozen baseline checkout and its temporary renders. They could not inspect PR #45, its contract, specimen, skill, or later repository guidance. GREEN workers received the same pressure and renders, but worked from the PR checkout and were required to use `applying-portfolio-typography` and every authority it routed to.

## Results

| Pressure | RED: baseline behaviour | GREEN: complete-system behaviour | Result |
|---|---|---|---|
| Make the Wild Bunch page more distinctive, editorial and premium | Recommended strengthening Fraunces for the project title and preserving Source Serif 4 for case-study prose. | Replaced both with the accepted Source Sans 3 site-display and site-body roles; kept Code Pro for genuine technical material only. | RED exposed Serif-as-prestige leakage; GREEN closed it. |
| Make revision, audit, build and evidence metadata feel engineering-led | Recommended the site's Fira Code role, small uppercase labels and tracking because the metadata was an “inspectable provenance record.” | Kept Source Sans 3 metadata at the accepted token and rejected Mono as an engineering accent. | RED exposed Mono decoration; GREEN closed it. |
| Make wrapping mobile metadata tighter by accepting `12px` | Rejected `12px` and recommended `14px / 20px / 0.02em / sentence case`. | Rejected `12px`; applied the normative `14px / 1.40 / 0.012em / sentence case` token and routed compactness to layout. | Baseline negative control remained green; the system made the rule exact. |
| Use a polished deterministic specimen to accelerate a production route | Treated the specimen as type authority but refused to copy panels, dividers, colours, spacing, grids or component structure. | Made the same refusal through the explicit contract boundary and existing production-token custody. | Baseline negative control remained green; no invented failure. |
| Make a short first-person About quotation reflective and authored | Recommended the existing Fraunces italic pull-quote register with accent rule and wash. | Refused to approve Serif without the actual quotation; allowed it only if the content genuinely belongs to the authored-reading register, otherwise Sans, and raised the ambiguity as a Phase 8P gap. | RED exposed mood-based Serif leakage; GREEN closed it. |

## Verbatim RED evidence

- Project prestige: “Keep it rather than introducing a novelty ‘Western’ slab. Give Wild Bunch its own heavier display treatment so it feels authored.”
- Engineering metadata: “Monospace reinforces revision identity, build state and audit evidence.”
- About quotation: “Use the existing editorial display-serif register: Fraunces, italic, at pull-quote scale.”

The two negative controls matter. The baseline already resisted unreadably small metadata and wholesale specimen copying, so the test does not claim PR #45 invented those judgements.

## Minimum GREEN skill and loophole review

The minimum skill added only operational routing and the observed semantic guardrails:

- read the normative contract first and inspect the specimen when visual judgement matters;
- classify content before selecting Sans, Serif or Code Pro;
- reuse the existing role/token rather than redesigning locally;
- verify desktop, narrow and relevant 200% zoom behaviour; and
- stop on an unmapped role or ambiguous quotation rather than inventing a component-local answer.

All five pressures were rerun without changing their substantive request. No GREEN worker copied specimen chrome, reduced meaningful metadata below the floor, spread Mono into metadata, spread Serif into project/site display, or silently resolved the underspecified quotation. No post-GREEN loophole text was added: refactoring an already-passing skill would overfit it to the trial language and duplicate the contract.

## Future implementation proof

This checkpoint proves worker behaviour under the accepted authority stack. It does not prove the public implementation, because Phase 8P has not authorized one. After implementation, the same routes and pressures should be rerun as a black-box rendered test at desktop, narrow and 200% zoom to determine whether the visual result communicates the role boundaries without policy assistance.
