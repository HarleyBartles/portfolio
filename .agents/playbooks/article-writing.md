# Article-Writing Playbook

Use this playbook to take public editorial work from commission through publication proof without letting local polish conceal structural weakness.

## When

- Drafting, revising, reviewing or publishing a public article or substantial case-study narrative.
- Changing titles, standfirsts, summaries, headings, captions, alt text or route copy as part of an editorial commission.
- Assessing an article against the published corpus or the whole-site 12A-inspired house standard.

## Required skills

- `writing-portfolio-articles` for the detailed editorial method, corpus-fatigue review and final article review.
- `writing` for drafting and editorial revision.
- `writing-style` and `writing-with-clarity` for focused prose review when their concerns apply.
- `linear-issue-shaping` and `using-linear-mcp` when the commission is Linear-backed.
- `verification-before-completion` before publication or readiness claims.
- `running-reader-panels` when simulated reader reactions would help investigate a draft's pacing or compare versions.

## Composition

The [Portfolio writing policy](../doctrine/writing-policy.md) owns durable editorial law. This playbook owns repository workflow, pass ordering and publication mechanics.

Run Phases A through H in order. Keep macro, meso, micro, voice and rendered-web review as distinct passes so a smooth sentence cannot hide a weak proposition or structure. For Linear-backed work, retrieve the full issue and every linked document before editing. During normal publication, the tracked commit hook owns the complete local gate.

### Phase A: Commission and material

- Retrieve the full Linear issue and linked documents when the article is Linear-backed.
- Establish whether the material is an idea, notes, a draft, approved copy or a publication edit.
- Identify the reader, occasion, desired change, central question and explicit non-scope.
- Gather incidents, evidence, sources, constraints and unresolved questions.
- Separate known facts from recollection and inference.
- Build a lightweight claim-and-evidence ledger for externally checkable claims.
- Inventory published articles using the same stories or arguments.
- Decide whether the material can support the promised reading time and form without padding.

### Phase B: Editorial design

- Write the private theme sentence.
- Choose the form and describe the reader's expected journey.
- Define the opening's promise and the ending's intended relationship to it.
- Give every prospective section a distinct job.
- Map changes of scale among story, technical detail, argument and reflection.
- Identify the evidence on which the article turns.
- Confirm that the structure can carry the promised reading time without padding.

### Phase C: Drafting

- Draft for thought and movement before line-level polish.
- Prefer specific incidents, mechanisms, decisions and consequences.
- Preserve uncertainty accurately.
- Mark missing evidence instead of writing smoothly around it.

### Phase D: Macro edit

- Test proposition, form, order, pacing, omissions and ending.
- Run distinct proposition, promise, structure, evidence, counterpressure, relevance, repetition and ending passes.
- Remove sections that repeat rather than advance.
- Check the opening promise against what the article delivers.
- Confirm that the title and standfirst describe the article now on the page.

### Phase E: Meso and micro edit

- Justify every section boundary.
- Perform a headings-only read and a transition pass.
- Justify every paragraph boundary against its neighbours.
- Challenge every full stop without assuming conjunction is preferable.
- Read aloud for cadence, breath, ambiguity and accidental drumbeat.
- Inspect word order and emphasis, nouns and verbs, pronoun references, terminology, acronyms, modifiers, abstractions and unnecessary qualification.
- Apply the language and whole-site 12A pass.
- Finish with the anti-overcorrection recovery check.

### Phase F: Voice and fatigue

- Compare with the corpus for repeated habits and accidental self-imitation.
- Inspect every AI-fatigue watch class in the writing policy.
- Classify findings as preserve, observed, candidate, repair or abstain.
- Restore specific judgement wherever the prose has become generically polished.
- Check jokes, profanity and informality for actual editorial work.
- Keep observations human-reviewable; do not accept an automated quality verdict.

### Phase G: Web article and whole-site review

- Check headings, paragraph openings and links for scanning readers.
- Read the title and summary without the body, then only the headings, then the first sentence of every paragraph.
- Check semantics, accessible link text, metadata, dates, reading time and route presentation.
- Confirm that code, quotations and technical terms render correctly.
- Review the article in context at the relevant viewport sizes.
- Check that pull quotes, figures and asides earn their interruption.
- Inventory language across all public copy and apply the site-wide 12A-inspired house standard.
- Consider every other relevant BBFC 12A category, not language alone.

### Phase H: Publication evidence

- Run focused content and presentation checks while iterating.
- Regenerate only the mechanical surfaces affected by the article or writing-system change.
- Inspect the rendered page and generated diff.
- Stage the intended tree and use the tracked pre-commit hook as the complete local gate.
- Push only the commit already proved locally and use hosted CI as confirmation.
- Report current evidence rather than asserting readiness from memory.

## Doctrine and contracts

- [Portfolio writing policy](../doctrine/writing-policy.md) is the sole detailed editorial authority.
- [Portfolio design policy](../doctrine/portfolio-design-policy.md) governs presentation, hierarchy and cross-cutting design invariants.
- [Workflow policy](../doctrine/workflow-policy.md) governs worktrees, branches, readiness and publication.
- [Validation policy](../doctrine/validation-policy.md) governs focused and complete proof.

## Local commands and paths

- Public article source and route ownership are discovered from the live repository rather than assumed from a generic template.
- Content catalogue: `py -3 tools/run.py content-manifest --apply` then `py -3 tools/run.py content-manifest --check` when article metadata changes.
- Route catalogue: `py -3 tools/run.py route-catalogue --apply` then `py -3 tools/run.py route-catalogue --check` when public routes change.
- Agent/document mesh: `py -3 tools/run.py mesh --apply` then `py -3 tools/run.py mesh --check` when authored routing changes.
- Complete local gate: stage the intended tree and commit normally; do not run `py -3 tools/run.py ci --check` immediately before the commit.

## Evidence contract

- The commission, reader promise, form and non-scope are explicit.
- Checkable claims have nearby support and preserve the distinction among fact, recollection, inference, interpretation and opinion.
- Each distinct editorial pass records findings or leaves inspectable changes.
- Corpus comparison remains observational and cannot become an imitation profile or automated verdict.
- Rendered review covers scanning, semantics, accessibility, responsive presentation and the whole-site 12A-inspired standard.
- Publication proof identifies the exact committed state, focused evidence, tracked-hook result and remote confirmation.

## Prohibited combinations

- Do not line-edit before resolving a broken proposition, promise or structure.
- Do not turn the playbook into a universal article template.
- Do not duplicate detailed doctrine or long-form editorial reference material here.
- Do not treat published articles as golden examples or use them to build an imitation profile.
- Do not let an automated audit rewrite prose, decide quality or silently accept its own findings.
- Do not review profanity article-by-article when the policy classifies the whole public site as one work.
- Do not publish automatically or bypass the tracked commit hook.

## Runbook routing

- [Design](../runbooks/design.md) - when the commission or editorial form remains unsettled.
- [Implementation](../runbooks/implementing.md) - when executing an approved article or writing-system plan.
- [Code review](../runbooks/code-review.md) - when reviewing public prose, its presentation or its evidence.
- [Pull request](../runbooks/pr.md) - when publishing the proved branch and verifying GitHub state.
