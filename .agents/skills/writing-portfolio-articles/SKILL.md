---
name: writing-portfolio-articles
description: Use when drafting, revising, developmentally editing, line editing, reviewing voice or fatigue, or performing final review of Portfolio public articles and substantial case-study prose.
metadata:
  source-id: writing-portfolio-articles
  source-path: .agents/skills/writing-portfolio-articles/SKILL.md
  provenance-name: Portfolio Article Writing first-party skill
  source-category: first_party
  status: active
  owner: Harley Bartles
  scope: Editorial method and observational review for Portfolio public articles and substantial case-study prose.
  use_when:
    - drafting or substantially revising a Portfolio public article or case-study narrative.
    - developmental editing, line editing, or final editorial review is required.
    - authored voice, corpus fatigue, prose rhythm, evidence, or article structure needs judgement.
  do_not_use_when:
    - editing private engineering documentation or repository instructions.
    - publication mechanics are needed without substantive editorial work.
    - an automated prose-quality verdict, authorship inference, or rewrite score is requested.
  related_skills:
    - writing
    - writing-style
    - writing-with-clarity
    - verification-before-completion
  use_before:
    - verification-before-completion
  use_with:
    - writing
license: MIT
---

# Writing Portfolio Articles

Make the article more intentional without making the edit more visible. Start with what the piece means and how it moves; sentence polish cannot rescue a missing centre.

## Authority

Read the [Portfolio writing policy](../../doctrine/writing-policy.md) before making editorial decisions. Use the [article-writing playbook](../../playbooks/article-writing.md) for repository workflow, validation and publication. This skill supplies method, not publication authority.

## Route the work

| Current need | Read |
| --- | --- |
| Choose the article's form | [article forms](references/article-forms.md) |
| Turn material into a commission | [editorial brief](references/editorial-brief.md) |
| Diagnose the whole draft | [developmental edit](references/developmental-edit.md) |
| Verify facts and uncertainty | [evidence and claims](references/evidence-and-claims.md) |
| Repair order, sections or pace | [structure and movement](references/structure-and-movement.md) |
| Open or close the argument | [openings and endings](references/openings-and-endings.md) |
| Edit paragraphs and sentences | [paragraphs, sentences and rhythm](references/paragraphs-sentences-and-rhythm.md) |
| Recover authored voice | [authored voice](references/authored-voice.md) |
| Review recurrence and AI fatigue | [corpus and fatigue](references/corpus-fatigue.md) |
| Check the finished article | [final review](references/final-review.md) |
| Learn from a material outcome | [field learning](references/field-learning.md) |

Load only the references needed for the current stage. If proposition, reader promise, evidence or structure is unsettled, do not begin line editing.

## Working sequence

1. Name the reader, private theme sentence, promise and intended change.
2. Choose a form that fits the material.
3. Diagnose proposition, evidence, movement and ending before local prose.
4. Edit sections, paragraphs, sentences and words in that order.
5. Run voice, fatigue, recovery and rendered-reading passes.
6. Return consequential voice, taste and authority decisions to Harley.

Corpus observations are advisory and expire with the task. Never construct a phrase bank or imitate prior work mechanically.

## Deterministic observations

Run through Python rather than executing the script directly:

```powershell
py -3 .agents/skills/writing-portfolio-articles/scripts/audit_article_corpus.py --articles src/client/src/data/content/writing --format text
py -3 .agents/skills/writing-portfolio-articles/scripts/audit_article_corpus.py --public-language . --check --format text
```

The audit reports facts and labelled heuristics. It does not rewrite prose, decide quality, infer authorship or replace the whole-site 12A judgement.

## Field learning

Consult [article-writing field notes](../../docs/article-writing-field-notes.md) only when a relevant problem recurs. Record material outcomes through the field-learning procedure. The skill may propose a candidate lesson; it cannot revise itself, promote doctrine or silently turn one correction into a rule.

## Common mistakes

- Line-editing a draft whose proposition is still unstable.
- Treating every short sentence, fragment or one-sentence paragraph as a defect.
- Joining grammatically related sentences until natural cadence disappears.
- Replacing model-favourite language with more decorative model-favourite language.
- Accepting an audit finding without reading its context.
- Calling a change better without checking what it damaged.
