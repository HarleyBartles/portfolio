---
name: simulated-reader-polling
description: Use when an article needs a structured poll of simulated readers to investigate attention, reader motives, optional content or controlled draft comparisons.
metadata:
  source-id: simulated-reader-polling
  source-path: .agents/skills/simulated-reader-polling/SKILL.md
  provenance-name: Simulated Reader Polling first-party skill
  source-category: first_party
  status: active
  owner: Harley Bartles
  scope: Structured polling experiments with simulated readers for Portfolio article drafts.
  use_when:
    - a draft has an uncertain attention or comprehension passage.
    - two versions need a bounded reader-intent comparison.
    - distinct reader reactions may inform a developmental edit.
  do_not_use_when:
    - human readership or retention measurement is required.
    - a quality score or automated publication decision is requested.
  related_skills:
    - writing-portfolio-articles
license: MIT
---

Use structured polls to investigate editorial questions and identify passages worth reading again with editorial judgment.

## Route the work

Start with the article's editorial review. Then follow only the references needed for the study task:

| If you need to… | Load… |
| --- | --- |
| Frame the research question, hypothesis, comparison or response choices | [Designing poll studies](references/designing-poll-studies.md) |
| Choose reader motives, cohort size, or audit profiles for draft-specific taint | [The archetype catalogue](references/reader-archetype-catalogue.md) and [assembling a cohort](references/assembling-a-cohort.md) |
| Define beats, optional reads, scan entries or study conditions | [Authoring the experiment manifest](references/experiment-manifest.md) |
| Inspect prompts, validate or trace a route, run or resume the harness | [Operating the harness](references/operating-the-harness.md) |
| Explain completed results or decide whether another poll is warranted | [Interpreting poll results](references/interpreting-poll-results.md) |

Keep the editorial question and any hypothesis in the study charter, not in reader-facing prompts. Freeze the cohort and conditions before viewing outcomes. Do not choose a round cohort size by convention: justify it from the distinctions the study needs to examine. The harness checks structure and execution limits; it cannot judge whether a question is neutral, a cohort is fair, or a manifest is faithful to the article.

## Common mistakes

- Treating any poll outcome as a quality score or publication decision.
- Sending the study hypothesis to Jev or asking its typed-decision API for open-ended interview responses.
- Keeping draft-dependent profiles or padding a cohort to reach a round number.
- Treating a dry-run estimate as the billed cost or a self-selected choice as a causal effect.
- Changing prompt history, route, audience or stimulus between conditions while attributing the difference to one variable.
