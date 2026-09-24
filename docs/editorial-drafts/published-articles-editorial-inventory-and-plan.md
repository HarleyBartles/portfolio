# Published articles: editorial inventory and plan

Status: active. Baseline: `origin/main` at `f645806` on 23 September 2026. This document inventories the writing routes and records progress on the article-by-article review.

## Commission and boundary

Assess every published article in the writing collection, improve each where the reading and evidence justify a change, and consider the collection as a whole. Use `writing-portfolio-articles`, the article-writing playbook and writing policy for editorial judgment. Aim for an article-specific, 100-reader simulated panel through `running-reader-panels` for each article to locate passages for human review; admit fewer readers when the taint audit requires it. Keep the original meaning, provenance and deliberate voice choices unless a concrete editorial benefit warrants change. Harley owns consequential voice, factual and taste decisions.

The live content manifest has ten `kind: writing`, `status: published` entries, each with a corresponding Markdown source and `/writing/<slug>` route. Published Patch fairytales and case-study routes are separate collections and are outside this article inventory. The older admission document's seven-article count predates the three September additions; the live manifest determines this inventory.

## Inventory

| Date | Published article and route slug | Source | Reading time | Editorial question to investigate |
| --- | --- | --- | ---: | --- |
| 1 Aug | Agentic engineering and the kindness of vibe coding (`agentic-engineering-vs-vibe-coding`) | `2026-08-01-agentic-engineering-vs-vibe-coding.md` | 4 min | Revised after editorial review and a frozen reader-panel comparison; ready for Harley's PR review. |
| 7 Aug | I made agentic engineering harder than it needed to be (`i-made-agentic-engineering-harder-than-it-needed-to-be`) | `2026-08-07-i-made-agentic-engineering-harder-than-it-needed-to-be.md` | 8 min | Does the private case remain intelligible and credible with its evidence boundary? |
| 12 Aug | Provisioning is not accumulation (`provisioning-is-not-accumulation`) | `2026-08-12-provisioning-is-not-accumulation.md` | 7 min | Can a reader distinguish the practical provisioning decision from the metaphor? |
| 15 Aug | If you write a loop, don't be surprised when your agent starts looping (`graph-iterative-review`) | `2026-08-15-graph-iterative-review.md` | 8 min | Does the review graph explain its failure mode before asking for the general lesson? |
| 22 Aug | Why ADRs? (`why-adrs`) | `2026-08-22-why-adrs.md` | 8 min | Is the inherited-system story connected clearly to the decision-record practice? |
| 25 Aug | The right test isn't your favourite test (`the-right-test-isnt-your-favourite-test`) | `2026-08-25-the-right-test-isnt-your-favourite-test.md` | 8 min | Do the examples substantiate the falsification rule without repeating it? |
| 28 Aug | “I just write the code” is not a full sentence (`i-just-write-the-code-is-not-a-full-sentence`) | `2026-08-28-i-just-write-the-code-is-not-a-full-sentence.md` | 7 min | Are expanded responsibility and its limits equally concrete? |
| 3 Sep | How The Invisibles’ logo designer influenced The Usual Specialists (`how-the-invisibles-logo-designer-influenced-the-usual-specialists`) | `2026-09-03-how-the-invisibles-logo-designer-influenced-the-usual-specialists.md` | 4 min | Does the cultural reference change the design story for an unfamiliar reader? |
| 5 Sep | Use Superpowers (`use-superpowers`) | `2026-09-05-use-superpowers.md` | 5 min | Does a reader unfamiliar with the tools understand the recommendation and its limits? |
| 22 Sep | Pop quiz, hotshot (`pop-quiz-hotshot`) | `2026-09-22-pop-quiz-hotshot.md` | 12 min | Does the interview frame sustain attention and deliver its promised engineering judgment? |

The remaining questions are starting hypotheses, not findings. Read each complete source and rendered route before accepting or changing them.

## Execution plan

1. **Establish the baseline.** Verify the manifest, routes, source text, dates, links and any relevant presentation or design contracts. Run the article corpus audit for observations. Read all ten articles to identify shared incidents, repeated claims and possible corpus fatigue. Record each article's reader, private theme sentence, promise, form, evidence boundary, movement and existing strengths before proposing revisions.
2. **Design ten separate panel experiments.** For each article, write a neutral charter and article-specific cohort in canonical off-repo scratch. Select credible core, adjacent and challenging motives from the archetype pool. Aim for 100 distinct readers with at most ten per archetype. Audit the cohort for article-specific payoffs, make at most one bounded repair pass, then remove readers who remain tainted. Run a smaller fair cohort when necessary rather than pad it or keep tainted readers. Freeze each charter and JSON before seeing results.
3. **Dry-run and execute each panel.** Use `reader_panel.py --check` to inspect passage boundaries, exact reader count, estimated calls and cost. Confirm the OpenRouter key and a deliberate `--max-calls` and `--max-usd` ceiling before `--apply`. Preserve article hash, cohort fingerprint, report and actual cost in off-repo scratch. Test a deliberately weakened passage with the same frozen cohort as a sensitivity control. Treat every result as correlated simulation, not human readership, retention or an automated quality verdict.
4. **Diagnose before revising.** Read flagged passages in context and inspect per-archetype and individual trajectories, including readers who stop satisfied. Perform the playbook's proposition, promise, form, movement, evidence, counterpressure, repetition and ending passes. Record preserve, candidate, repair and abstain decisions with reasons. Prioritise a small number of consequential changes for each article; return factual, voice and taste uncertainty to Harley.
5. **Revise in article-sized slices.** Resolve structure before sentences. Check headings, paragraph boundaries, cadence, claims, link support, quotation, accessibility and route metadata. Compare each full revision with its baseline and revert changes that weaken specificity or voice. Reuse the frozen cohort for a paired original/revision run only when a bounded question warrants the additional cost.
6. **Review the collection and publish with evidence.** Check repeated incidents, arguments, stock scaffolds, language and the whole-site 12A-inspired standard across public copy. Read the rendered pages at relevant viewport sizes. Run focused checks and regenerate only affected projections. Commit through the tracked hook, inspect the diff, push, obtain fresh review and use hosted checks as confirmation. Keep substantive editorial revisions in reviewable slices.

## Decision record

- The vibe-coding article's original 100-reader cohort was too tied to details of the original. A replacement cohort admitted 89 readers after a bounded taint review and was frozen for comparison of the original and revised drafts. Panel results informed editorial review; they were not treated as a publication vote.
- Harley approved the revised vibe-coding article for publication on the existing route and date. The other articles remain pending review.
- Accepted-article retrospective: the existing method called for a lived incident, and the hackathon/QA account gave the substantial rewrite its centre. That part worked as designed and needs no workflow change. Recovering the original opening restored a distinctive point of view; making both sides of the title visible gave readers a clearer reason to continue. The frozen panel helped locate that loss, while editorial review identified its cause. This exposed a missing opening-beat check, now added to the workflow. The old header artwork was removed after rendered review because it repeated the previous article's argument.
- Publication review correction: copy changes in the unchanged article shell do not require the full visual checklist. The design policy and article playbook now reserve that checklist for presentation changes; removing this article's redundant visual required only a focused check that the text-led header had no empty slot.
- The panel's expense and correlated-model limits require an explicit charter and dry run for each article.
- The ten editorial questions above guide investigation; they do not pre-authorize edits.
- Editorial outcome may be to preserve an article unchanged when its choices survive review.
