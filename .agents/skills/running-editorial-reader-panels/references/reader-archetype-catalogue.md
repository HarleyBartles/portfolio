# Reader archetype catalogue

The [machine-readable pool](../assets/reader-archetypes.json) contains 34 purpose-based archetypes. Its first ten are identical to the original rich pilot set. These are plausible ways into this portfolio's articles, not claims about site traffic. Choose for an article's promise and subject; an honest lack of fit is useful information.

| Reading route | Archetypes and the question they bring |
| --- | --- |
| Engineering judgment | `engineering-peer` compares decisions; `sceptical-senior` challenges a claim; `counterexample-hunter` tests its boundary; `principal-architect` tests its reach across systems; `technical-lead` weighs delivery and team pressure. |
| Learning a practice | `junior-engineer` looks for the reasoning between observations and action; `midlevel-adopter` wants a viable first move; `subject-newcomer` needs context without condescension; `career-changer` wants to understand the work beyond coding; `engineering-educator` seeks a teachable dilemma. |
| Long-lived software | `maintainer` examines inherited cost; `open-source-maintainer` examines contribution and review load; `systems-integrator` checks boundaries and cutover; `domain-expert` tests whether business rules survived translation into software. |
| Production and assurance | `incident-responder` reconstructs containment and cause; `sre-reliability` asks how the solution behaves after deployment; `test-engineer` looks for a falsifying check; `appsec-reviewer` traces authority and misuse; `ai-evaluator` examines measurement; `privacy-data-steward` traces data movement; `platform-engineer` asks what shared infrastructure the practice needs. |
| Organisational adoption | `engineering-director` weighs team outcomes and adoption burden; `founder-cto` weighs proportion and sequencing for a small team; `product-manager` follows value to users; `ux-researcher` checks observed human behaviour; `finops-practitioner` examines recurring cost; `ai-procurement-reviewer` examines evidence for a buying decision. |
| Professional discovery | `hiring-reader` assesses evidence of ownership; `technical-recruiter` needs a signal they can accurately relay; `future-collaborator` imagines working with the author. |
| Public and creative discovery | `craft-reader` follows the technical story as writing; `developer-advocate` checks whether a lesson travels safely; `design-reader` follows visual judgment and production; `curious-nontechnical` wants an accurate explanation without needing to become an engineer. |

## Select for the article

Write down the article's promised reader and question first. Choose intended readers who should find a payoff, adjacent readers who might plausibly arrive through a link or search, and credible challengers who can expose an unsupported claim. Include one or two readers whose departure would be acceptable. Record the chosen IDs and the reason for each before looking at results; a changed panel can change the apparent verdict.

For example, *Pop quiz, hotshot* might invite `sceptical-senior`, `hiring-reader`, `technical-recruiter`, `future-collaborator`, `junior-engineer`, and `engineering-educator`. *Why ADRs?* might invite `maintainer`, `principal-architect`, `domain-expert`, `junior-engineer`, and `counterexample-hunter`. A design article has a natural route for `design-reader`, `ux-researcher`, `craft-reader`, and `curious-nontechnical`; a FinOps reader need not be made to enjoy it.

The panel accepts selected catalogue entries through `reader_panel.py --profile-file .agents/skills/running-editorial-reader-panels/assets/reader-archetypes.json --profiles <comma-separated-ids>`. The cohort generator accepts ten selected IDs from the same pool through `reader_panel_cohort.py --profile-file .agents/skills/running-editorial-reader-panels/assets/reader-archetypes.json --archetypes <comma-separated-ids>`. These paths are relative to the repository root.

## Research routes and limits

These archetypes are first-party editorial hypotheses informed by the portfolio's actual article subjects and by adjacent professional role maps. The sources support the *plausibility of the work and concerns*, not the composition of this site's readership:

- [Stack Overflow 2025 developer roles and learning](https://survey.stackoverflow.co/2025/developers) and [AI use and concerns](https://survey.stackoverflow.co/2025/ai).
- [CNCF platform builders, enablers, consumers and end users](https://tag-app-delivery.cncf.io/blog/paap-personas/).
- [NIST AI lifecycle actors, evaluation, human factors, domain expertise and procurement](https://airc.nist.gov/airmf-resources/airmf/appendices/app-a-descriptions-of-ai-actor-tasks/).
- [FinOps for AI personas](https://www.finops.org/framework/technology-categories/ai/) across engineering, product, finance, procurement and leadership.
- [DORA's 2025 account of AI and organisational conditions](https://dora.dev/research/2025/dora-report/).
- [NN/g research on design and research work across product teams](https://www.nngroup.com/articles/designers-product-teams/).

The pool is open to revision. Add an archetype when it brings a distinct arrival question or payoff to articles in the corpus; avoid multiplying job titles whose reading behaviour is the same. The current ten-lens generator is a controlled variation mechanism. It does not yet produce ten independently developed readers within an archetype.
