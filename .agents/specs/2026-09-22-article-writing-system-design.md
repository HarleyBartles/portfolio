# Article Writing System Design

Status: approved design
Owner: Portfolio repository
Scope: public editorial writing and the repository workflow used to produce it
Authority: this specification governs implementation; after implementation, the resulting doctrine is the binding editorial authority
Nearest router: `/AGENTS.md`
Design dialogue: 22 September 2026

## Purpose

The Portfolio needs an article-writing system that produces recognisably authored work, not merely clean sentences. It must help a writer find the article's centre, choose an appropriate form, build a deliberate structure, make and qualify claims honestly, sustain a human voice, and publish work that belongs in the existing site without mechanically imitating its habits.

The system must also protect the whole public site's intended 12A character. Swearing is part of the author's vocabulary and may be editorially right. It is not decoration, manufactured edge or permission for the site to become vulgar.

The approved system has three layers:

1. A doctrine defining the durable editorial contract.
2. A playbook defining the repository workflow from commission to publication.
3. A repo-owned skill carrying the detailed editorial method, references, observational tooling and pressure tests.

The published corpus is evidence about the author's habits. It is neither a golden set nor an authority that can overrule editorial judgement.

## Desired outcome

An agent or human using the system can:

- state what an article is really about before polishing it;
- choose a form deliberately rather than defaulting every piece to the same template;
- distinguish fact, memory, inference and opinion;
- edit at article, section, paragraph, sentence and word level in the right order;
- preserve useful variation in syntax, rhythm, shape and point of view;
- detect recurrent corpus habits without treating recurrence as proof of failure;
- make every paragraph and sentence earn its boundary;
- use short sentences, fragments and conjunctions according to editorial effect rather than a mechanical rule;
- assess scanning, accessibility, metadata, links and publication evidence;
- keep all public site content plausibly within the Portfolio's 12A house standard.

## Authority and source-of-truth boundaries

The completed writing system must preserve these surface roles.

- `.agents/doctrine/writing-policy.md` is the binding source for editorial values, invariants and language policy.
- `.agents/playbooks/article-writing.md` is the topical repository workflow.
- `.agents/skills/writing-portfolio-articles/` will become the triggerable implementation of the editorial method when the companion skill plan is implemented.
- `.agents/specs/2026-09-22-article-writing-system-design.md` records the approved design until its normal planning-artifact retirement.
- The superseded article-writing proposal was removed after its durable decisions and research references were promoted into this specification, avoiding a competing near-authority.
- Published articles and other public copy are editorial evidence and audit inputs, not policy.
- Deterministic repository code remains under `tools/`; the skill may own a narrowly editorial inspection script when that script is useful only to the skill and is not imported by production code.

The detailed editorial material currently in `.agents/doctrine/portfolio-design-policy.md` should move to the writing doctrine. The design policy should retain only the cross-cutting visual/editorial invariant and a link to the canonical writing policy.

Editorial decisions must respect this order:

1. Truth, safety, privacy, accessibility and legal boundaries.
2. Explicit human intent.
3. Accurate claims and honest provenance.
4. The article's reader promise and central meaning.
5. Clarity and coherence.
6. Authorised voice.
7. Editorial finish.
8. Fatigue heuristics.

No style repair may strengthen a claim, erase uncertainty, invent a memory or override a deliberate authorial choice without demonstrating a concrete reader cost.

## Scope

In scope:

- long-form articles and case-study prose;
- public summaries, standfirsts, titles, headings and article metadata;
- the editorial effect of public navigation and route copy when assessing the whole-site language standard;
- drafting and revision guidance;
- corpus-level observation;
- evidence and claim handling;
- web-reading and accessibility considerations;
- publication checks relevant to written content;
- local skill behaviour and its maintainer tests.

Out of scope:

- a universal template for every article;
- automatic rewriting or autonomous publication;
- an AI-authorship detector;
- a numerical prose-quality score;
- a persistent imitation profile, embeddings store, phrase bank or sentence bank derived from the author's work;
- runtime tracking of reader sessions or journeys;
- claiming or seeking formal BBFC classification;
- policing private repository text, commit messages or internal engineering documents as though they were public site content;
- replacing factual, legal, accessibility or design review with a writing pass.

## Architecture

### Corpus baseline

The published corpus provides a starting observation set for implementation and future review. Its strongest recurring qualities are:

- specific engineering incidents rather than generic advice;
- willingness to implicate the author in the mistake;
- concrete technical mechanisms, constraints and consequences;
- honest distinctions between memory, inference and demonstrated fact;
- dry humour that usually emerges from the material;
- strong conceptual titles;
- endings that often close the opening argument;
- links that let a sceptical reader inspect the work;
- technical confidence without pretending every uncertainty is resolved.

Its current watch classes are:

- repeated antithetical constructions such as `not X, but Y` and `X isn't Y; it's Z`;
- repeated vocabulary around earning or paying rent, boundaries, machinery, shape, trust, evidence, the next engineer and “the work”;
- aphoristic block quotes with similar frequency and function;
- recurring claim, anecdote, maxim and qualification section sequences;
- memorable headings that sometimes underserve a scanning reader;
- endings that echo the title or opening often enough for the device to become visible;
- reuse of the LENS and ADR, SQL performance, tap-versus-mop incident response, test-boundary and agent-workflow stories;
- explanations of lessons already demonstrated by the story;
- pressure for every section to contain a quotable line;
- concentrations of short fragments and question sequences that work locally but need whole-piece rhythm review.

These are not defects to purge. Their editorial cost changes with frequency. A repeated story remains useful when a new article reveals a genuinely different facet; otherwise it cannibalises the corpus.

### 1. Writing doctrine

Create `.agents/doctrine/writing-policy.md` with the classification metadata required by the surface-classification policy:

- `Status: active policy`
- `Owner: Portfolio repository`
- `Scope: public editorial writing`
- an explicit authority statement;
- the nearest router.

The doctrine must define the following contracts.

#### Reader contract

Every article should reward the time it asks for. It should establish a clear relationship with the reader, make a promise it can keep, respect the reader's ability to follow complexity, and avoid wasting attention on throat-clearing or repeated conclusions.

Clarity does not require flattening personality. Accessibility does not require generic prose.

#### Centre of gravity

Before drafting or structural revision, the writer should be able to state a private theme sentence: what the piece is really about and what changes for the reader by the end.

That sentence is an editorial tool, not required published copy. Material that does not serve, complicate or deliberately counterpoint that centre needs a reason to remain.

#### Form before template

The form must follow the material. The system should recognise at least:

- argument;
- technical case study;
- reflective narrative;
- reported feature;
- field note;
- tutorial or explanatory article;
- design or making-of story;
- comparative or evaluative piece;
- interview or Q&A;
- list with a cumulative argument.

These are working forms, not mandatory page templates. Hybrid forms are permitted when their transitions and reader expectations are controlled deliberately.

#### Evidence and epistemic honesty

Public claims must preserve the distinction between:

- demonstrated fact;
- sourced fact;
- recollection;
- inference;
- interpretation;
- opinion.

Technical specificity is valuable only when accurate. Uncertainty should be stated at the smallest useful scope, without either bluffing or smothering the prose in disclaimers. Links should support the claim they sit beside and should not be used as ornamental authority.

#### Authored voice

Voice comes primarily from perspective, selection, specificity, judgement and rhythm. Slang, swearing, fragments and jokes can contribute, but none is a substitute for having something particular to say.

The writing may be candid, funny, technical, self-implicating and opinionated. It must not manufacture intimacy, certainty, rebellion or cleverness. It should sound like a person making decisions in prose, not a system averaging familiar editorial gestures.

The currently authorised voice includes contractions, directness, technical specificity, honest rough edges and dry humour. Public prose does not use em dashes. These explicit preferences belong in doctrine; they must not be reverse-engineered into a larger imitation profile.

#### Openings

An opening establishes focus, authority, direction, voice and the writer-reader relationship. It should make a promise that the article keeps.

An opening need not begin with background. It may begin with action, a question, an image, a claim or a contradiction, provided the reader is oriented before confusion becomes work.

Useful opening pressures include a question, contradiction, scene, surprising claim, problem, decision, concrete image or compact statement of stakes. An opening must not manufacture urgency the article cannot repay.

#### Structure and movement

Sections must change the reader's understanding, not merely divide word count. Each section should have a job in the article's movement. Sequence may be chronological, causal, argumentative, thematic or deliberately braided, but the governing logic should be legible.

Scene, evidence, explanation and abstraction should be balanced according to the form. The ending should answer, transform or productively reopen the question established by the beginning; it should not merely stop after the last example.

Section functions may include establishing context, advancing the argument, providing evidence, complicating the claim, testing an objection, changing scale, moving through time, turning toward a consequence, or preparing and delivering the ending. Headings should survive a headings-only read. Transitions may be carried by chronology, consequence, a repeated image, an unresolved question or a change in scale rather than explicit connective phrases.

#### Paragraphs

A paragraph is a unit of thought, movement or dramatic emphasis. During revision, ask of every paragraph why it is not part of the one before or after it.

One-sentence paragraphs are suspicious, not forbidden. They must earn isolation through emphasis, change of pace, transition, revelation or another specific editorial effect. Repeated short paragraphs can become mannerism just as readily as dense blocks can become obstruction.

Paragraph openings should orient a scanning reader without making continuous reading feel schematic.

Useful reasons for a paragraph boundary include a change of subject, time, scene, speaker, claim, evidence, scale, rhetorical function or pace.

#### Sentences and rhythm

During revision, ask of every full stop why the material is not better joined by a comma, semicolon, colon, conjunction or another adjunctive construction. The question is diagnostic, not a command to join.

A sentence boundary earns its place through meaning, pace, emphasis, clarity or voice. Short sentences and fragments may provide impact, relief, wit or finality. Long and compound sentences may carry relationship, qualification and accumulating thought. Variation should be purposeful.

The system must explicitly reject both extremes:

- reflexively splitting related thought into choppy declarations;
- joining sentences until grammatical connection erases natural editorial cadence.

#### Endings

An ending should feel caused by the article. It may resolve, return, widen, sharpen or leave a deliberate afterimage. It should avoid generic uplift, recap-by-default and conclusions that simply restate the standfirst.

It may answer the opening question, return to an opening image with changed meaning, deliver a consequence, leave a bounded unresolved question, offer a decision or next move, or stop on the strongest remaining concrete detail. As a diagnostic, cover the final paragraph and ask whether the article has already ended; if it has, remove the surplus ending.

#### Corpus distinctiveness

The existing corpus is a watch set for habits including repeated openings, section rhythms, syntactic shapes, transitions, jokes, metaphors and conclusions.

Recurrence is a prompt for judgement, not automatic evidence of weak prose. A genuine voice contains recurring preferences; the editorial task is to distinguish an owned preference from an unexamined default.

#### AI-fatigue policy

AI fatigue is a constant watch class. The review should look beyond banned-word lists for broader symptoms:

- homogenised sentence length and cadence;
- repeated rhetorical scaffolds;
- symmetrical lists used without thought;
- abstract claims where a concrete mechanism belongs;
- generic scene-setting and generic uplift;
- excessive signposting;
- unearned certainty;
- false intimacy;
- conspicuous polish without individual judgement;
- imitation of surface quirks from the author's previous work.

Also watch for synthetic profundity, empty antithesis, generic emotional emphasis, repeated rhetorical triplets, uniform section architecture, explanatory tails after the point has landed, conclusions inflated beyond the evidence, and random variation introduced merely to “sound human.”

The remedy is renewed authorship: recover the proposition, evidence, decisions and consequences. It is not thesaurus substitution or arbitrary roughening.

#### Anti-overcorrection

No local rule is an invitation to perform it everywhere. Sentence conjunction, fragments, one-sentence paragraphs, profanity, anecdotes, headings and rhetorical questions remain subordinate to the article's needs.

An editorial pass should leave the writing more intentional, not more visibly processed.

Every editing pass must include a recovery check: what improved, what meaning or cadence was damaged, whether a supplied formulation was stronger, whether the result became more generic, and whether a local improvement harmed the whole. Revert a change that has no defensible editorial benefit.

#### Language and 12A house standard

The Portfolio adopts a 12A-inspired editorial house standard. It uses the current British Board of Film Classification 12A guidance as an external calibration point while making no claim that the site has been submitted to, reviewed by or certified by the BBFC.

The whole public site is treated as one work. The assessment therefore covers all public routes and copy, not one article in isolation.

The local language policy is deliberately more concrete than the BBFC's contextual guidance:

- at most one use of `fuck` across the entire public site;
- uses of `shit` and `piss` require editorial judgement and must remain infrequent enough that the whole work plausibly holds a 12A character;
- `cunt`, `twat` and `cock` are not permitted;
- no swear is included merely for heat, filler, hostility or manufactured edge;
- every swear must earn its place in meaning, character, humour, quotation or emphasis;
- the surrounding context, tone, repetition and cumulative effect matter more than a word count alone.

The review must consider the complete 12A character rather than language in isolation, including dangerous behaviour, discrimination, drugs, nudity, sex, sexual violence or threat, suicide or self-harm, threat or horror, and violence when those categories are relevant to public content.

This classification changes only through Harley's explicit editorial decision. Content volume, estimated reading time and hypothetical reader journeys do not change it automatically. The system does not need user-session tracking to enforce the house standard.

### 2. Article-writing playbook

Create `.agents/playbooks/article-writing.md`. It should route the work through distinct passes so local polish does not conceal structural weakness.

#### Phase A: commission and material

- Retrieve the full issue and linked documents when the article is Linear-backed.
- Establish whether the material is an idea, notes, a draft, approved copy or a publication edit.
- Identify the intended reader, occasion and desired change.
- Gather incidents, evidence, sources, constraints and unresolved questions.
- Separate known facts from memory and inference.
- Record the central question and explicit non-scope.
- Build a lightweight claim-and-evidence ledger for externally checkable claims.
- Inventory existing articles that use the same stories or arguments.
- Decide whether there is enough material for the promised reading time and form.

#### Phase B: editorial design

- Write the private theme sentence.
- Choose the form and describe the reader's expected journey.
- Define the opening's promise and the ending's intended relationship to it.
- Assign every prospective section a distinct job.
- Map changes of scale between story, technical detail, argument and reflection.
- Identify the evidence on which the article turns.
- Check that the structure can carry the promised reading time without padding.

#### Phase C: drafting

- Draft for thought and movement before line-level polish.
- Prefer specific incidents, mechanisms, decisions and consequences.
- Preserve uncertainty accurately.
- Mark missing evidence rather than writing smoothly around it.

#### Phase D: macro edit

- Test proposition, form, order, pacing, omissions and ending.
- Run distinct proposition, promise, structure, evidence, counterpressure, relevance, repetition and ending passes.
- Remove sections that repeat rather than advance.
- Check the article's promise against what it actually delivers.
- Confirm that the title and standfirst describe the article now on the page.

#### Phase E: meso and micro edit

- Justify every section boundary.
- Perform a headings-only read and a transition pass.
- Justify every paragraph boundary against its neighbours.
- Challenge every full stop without assuming conjunction is preferable.
- Read aloud for cadence, breath, ambiguity and accidental drumbeat.
- Inspect word order and emphasis, specific nouns and strong verbs, pronoun and referent clarity, terminology, acronyms, modifiers, abstractions and unnecessary qualification.
- Apply the language and whole-site 12A pass.
- Finish with the anti-overcorrection recovery check.

#### Phase F: voice and fatigue

- Compare with the corpus for repeated habits and accidental self-imitation.
- Inspect the AI-fatigue watch classes.
- Classify findings as `preserve`, `observed`, `candidate`, `repair` or `abstain`.
- Restore specific judgement wherever the prose has become generically polished.
- Check jokes, profanity and informality for actual editorial work.
- Keep observations human-reviewable; do not accept an automated quality verdict.

#### Phase G: web article and whole-site review

- Check headings, paragraph openings and links for scanning readers.
- Read the title and summary without the body, then only the headings, then the first sentence of every paragraph.
- Check semantics, accessible link text, metadata, dates, reading time and route presentation.
- Confirm code, quotations and technical terms render correctly.
- Review the article in its rendered context at relevant viewport sizes.
- Check that pull quotes, figures and asides earn their interruption.
- Inventory language across all public copy and apply the site-wide 12A house standard.
- Consider all other relevant BBFC 12A categories, not language alone.

#### Phase H: publication evidence

- Run the focused content and presentation checks while iterating.
- Regenerate only the mechanical surfaces affected by the article or writing-system change.
- Inspect the rendered page and generated diff.
- Use the tracked pre-commit hook as the complete local gate during normal publication.
- Push only the commit already proved locally and use hosted CI as confirmation.
- Report evidence rather than asserting readiness from memory.

The playbook must link to the doctrine and invoke `/writing-portfolio-articles` for detailed editorial work. It must not duplicate the skill's long-form reference material.

### 3. Repo-owned skill

Create `.agents/skills/writing-portfolio-articles/` and register its exact name as local custody in `.agents/plugins/marketplace.json`. A naming prefix is not required for repository-local skill custody.

The skill should contain:

```text
.agents/skills/writing-portfolio-articles/
  SKILL.md
  references/
    article-forms.md
    editorial-brief.md
    developmental-edit.md
    evidence-and-claims.md
    structure-and-movement.md
    openings-and-endings.md
    paragraphs-sentences-and-rhythm.md
    authored-voice.md
    corpus-fatigue.md
    final-review.md
  scripts/
    audit_article_corpus.py
  tests/
    pressure/
```

`SKILL.md` must be a compact router rather than a duplicate textbook. It should:

- trigger for drafting, revising or reviewing Portfolio editorial articles;
- read the doctrine before making editorial decisions;
- select only the references needed for the current stage;
- establish form and centre before line editing;
- keep corpus observations advisory;
- require a rendered review before publication claims;
- distinguish editing from publication authority;
- route repository commands to the playbook rather than embedding volatile command detail.

#### Reference responsibilities

- `article-forms.md`: reader contracts, affordances and failure modes of the supported forms.
- `editorial-brief.md`: proposition, reader, change, material, promise and ending intent.
- `developmental-edit.md`: whole-article diagnosis and order of revision.
- `evidence-and-claims.md`: sourcing, attribution, uncertainty and technical claim discipline.
- `structure-and-movement.md`: sequence, sections, pacing, scene and abstraction.
- `openings-and-endings.md`: promises, orientation, correspondence and earned closure.
- `paragraphs-sentences-and-rhythm.md`: boundary justification, syntax, fragments, punctuation and cadence.
- `authored-voice.md`: perspective, specificity, humour, register and anti-performance guidance.
- `corpus-fatigue.md`: comparison protocol, AI-fatigue watch classes and safeguards against self-imitation.
- `final-review.md`: scanning, accessibility, whole-site 12A judgement, rendered checks and handoff evidence.

#### Observational audit script

`scripts/audit_article_corpus.py` should produce inspectable facts, not a quality score. It should support two explicit concerns:

1. Article-corpus observations, including article and section lengths, paragraph and sentence-length distributions, one-sentence paragraphs, repeated openings or closings, recurring transition phrases, heading patterns and exact repeated phrases above a conservative threshold.
2. Public-site language inventory, including occurrences and source locations of the locally budgeted or prohibited terms across public content sources.

The script must:

- use deterministic parsing and stable output ordering;
- show source locations and enough local context for human judgement;
- distinguish exact counts from heuristics;
- report repeated phrase families and metaphors, reused internal or external stories, pull-quote density, internal-link coverage and article word count against declared reading time where those observations can be made deterministically or are clearly labelled heuristic;
- make configurable thresholds visible;
- avoid labelling text as AI-written;
- avoid automatic rewrites;
- avoid a composite quality, voice or 12A score;
- avoid converting statistical outliers into editorial failures;
- exclude fixtures, dependencies, generated output and private agent documentation from the public-site language inventory;
- fail only for objective contract breaches explicitly defined by doctrine, such as prohibited public terms or more than one site-wide `fuck`; contextual uses of milder language remain review findings.

The public-copy source set must be explicit and tested. If routing or content custody changes, the source-set test should fail rather than silently omitting new public surfaces.

#### Voice custody

The skill must not build or retain a synthetic model of the author's voice. It may inspect the live corpus during a task and report observable recurrence. Those observations expire with the task and do not become a reusable phrase library.

The system protects authorship by returning decisions to the writer: what is being claimed, why this detail, why this order, why this rhythm, why this ending.

## Skill test design

The skill is code and must ship maintainer tests. Before implementation changes, define and run a clean RED case showing the missing or incorrect behaviour. Then implement the smallest coherent change that makes it GREEN.

Pressure tests must cover at least:

1. A polished but centreless draft is sent back to proposition and form before sentence edits.
2. A technical article distinguishes demonstrated fact, recollection and inference.
3. A list article retains cumulative movement rather than becoming twelve interchangeable answers.
4. A one-sentence paragraph is challenged but retained when it earns emphasis.
5. Adjacent related sentences are joined when the full stop falsely separates one thought.
6. Short sentences and a fragment survive when they create natural cadence and meaning.
7. A long sentence is divided when conjunction obscures the thought.
8. A familiar corpus phrase is reported as a possible habit, not automatically banned.
9. Generic AI-fatigue language triggers a return to evidence and judgement rather than synonym replacement.
10. A request to imitate the corpus mechanically is refused in favour of current-task authorship.
11. A swear is retained when it earns its place and the whole-site work remains plausibly 12A.
12. A second site-wide `fuck` is identified as an objective house-policy breach even when each article appears acceptable alone.
13. Prohibited language in non-article public copy is detected.
14. Contextual `shit` or `piss` usage is surfaced for editorial judgement rather than rejected by a fabricated numeric rule.
15. Potentially relevant non-language 12A content is brought into the review.
16. The audit refuses to produce an AI probability or prose-quality score.
17. A new public content source omitted from the language inventory is caught by the source-set contract.
18. The system does not infer a new classification unit from content volume, reading time or hypothetical journeys without Harley's explicit decision.

Tests should live under the skill's `tests/` directory and remain outside ordinary behavioural invocation.

## Repository integration

Implementation must update the smallest authoritative routing surfaces needed for discovery:

- `.agents/doctrine/INDEX.md` through the mesh generator;
- `.agents/playbooks/INDEX.md` through the mesh generator;
- `.agents/skills/INDEX.md` or the repository's generated skill index through the mesh generator;
- `.agents/plugins/marketplace.json` for the local skill declaration;
- `AGENTS.md` routing pointers for the writing doctrine and article playbook;
- `.agents/doctrine/portfolio-design-policy.md` to remove duplicated detailed writing policy and point to the new authority;
- any applicable `.devin/rules/` router if the live mesh requires one.

Generated indexes and projections must not be hand-edited.

## Validation and evidence

Implementation is complete only when current evidence shows:

- pressure tests demonstrated the intended RED before implementation and GREEN afterwards;
- audit-script unit tests cover parsing, exclusions, stable ordering, source-set completeness and objective language-policy failures;
- the corpus audit runs successfully against the live corpus and its output has been reviewed as observations;
- the whole-site language inventory runs successfully against the explicit public source set;
- `py -3 tools/run.py refresh-skills --apply` has refreshed marketplace-derived projections without overwriting the local skill;
- `py -3 tools/run.py mesh --apply` has regenerated and validated the agent mesh;
- corresponding check modes are churn-free after apply;
- relevant content tests and the site build pass if integration changes touch application-facing custody;
- the normal hooked commit supplies the complete local gate;
- hosted CI confirms the pushed commit.

Do not redundantly run the complete CI command immediately before or after a successful normal hooked commit. Use focused checks during iteration and the tracked hook for the complete local gate.

## Implementation sequence

1. Establish RED pressure fixtures and audit-script contract tests.
2. Create the writing doctrine and move canonical editorial policy into it.
3. Create the article-writing playbook and repository routing.
4. Implement `/writing-portfolio-articles` and its references.
5. Implement the observational audit and public-source inventory.
6. Make pressure and script tests GREEN.
7. Regenerate skill and mesh projections.
8. Run focused checks, inspect the diff, and commit through the complete hook.
9. Open or update the draft PR with the article and writing-system work, then use hosted CI as confirmation.

The intended editorial sequence is:

```text
truth and material
→ reader promise
→ centre
→ form
→ structure
→ evidence
→ authored draft
→ developmental edit
→ line edit
→ voice and fatigue review
→ corpus comparison
→ rendered reading
→ publication proof
```

## Acceptance criteria

- The repository has one canonical writing doctrine, one article-writing playbook and one repo-owned article-writing skill.
- Their responsibilities are distinct and cross-linked without substantial duplication.
- The doctrine contains the approved paragraph, sentence, voice, anti-fatigue and anti-overcorrection principles.
- The skill's pressure tests prove natural editorial judgement rather than maximum sentence conjunction or minimum paragraph count.
- Corpus comparison is observational and cannot silently become an imitation system or detector.
- The whole public site is assessed as one 12A-inspired work under the explicit local language policy.
- The system considers relevant BBFC categories beyond language and makes no certification claim.
- The whole-site classification changes only through Harley's explicit editorial decision, with no automatic duration, volume or journey trigger.
- Generated repository surfaces are regenerated by their owning tools.
- The resulting change passes focused validation, the tracked commit hook and hosted CI.

## Research basis

The design is informed by, but does not delegate authority to, the following external guidance:

- [BBFC 12A rating guidance](https://www.bbfc.co.uk/rating/12) for contextual, whole-work classification.
- [Purdue OWL revision and paragraph guidance](https://owl.purdue.edu/owl/general_writing/academic_writing/paragraphs_and_paragraphing/index.html) for units of thought and sentence variety.
- [Purdue OWL sentence-structure activity](https://owl.purdue.edu/owl/graduate_writing/introduction_to_writing/documents/revising-and-editing/sentence-structure-activity.pdf) for sentence variety and rhetorical weight.
- [Poynter writing guidance](https://www.poynter.org/archive/2002/thirty-tools-for-writers/) for voice and practical revision.
- [Poynter on leads](https://www.poynter.org/reporting-editing/2019/lead-vs-lede-roy-peter-clark-has-the-definitive-answer-at-last/) for the opening's wider editorial job.
- [Nieman Storyboard on theme and nut grafs](https://niemanstoryboard.org/2021/10/19/nut-grafs-getting-to-the-heart-of-the-story/) for the article's centre.
- [Nieman Storyboard on feature and narrative forms](https://niemanstoryboard.org/2006/01/09/news-feature-v-narrative-whats-the-difference/) for choosing form rather than imposing a template.
- [Nieman Storyboard on structure](https://niemanstoryboard.org/2022/02/02/sticking-a-story-together-and-nailing-the-structure/) for movement and endings.
- [Nielsen Norman Group](https://www.nngroup.com/articles/how-users-read-on-the-web/) for scanning behaviour on the web.
- [Google Technical Writing](https://developers.google.com/tech-writing/two/editing) for staged self-editing.
- [ACL Anthology research on linguistic homogenisation](https://aclanthology.org/2025.emnlp-main.1163/) and [related published research](https://pmc.ncbi.nlm.nih.gov/articles/PMC11874169/) for the corpus-level AI-fatigue risk.

External guidance may evolve. The repository doctrine remains the local authority until deliberately revised.
