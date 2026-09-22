I recommend a three-layer article-writing system, not merely a longer playbook:

1. A doctrine defining what Portfolio editorial quality means.
2. A playbook governing the repository workflow from proposition to publication.
3. A local article-writing skill carrying the detailed editorial method, corpus comparison and pressure-tested review passes.

That separation keeps durable values out of procedural checklists, keeps repository commands out of portable writing guidance, and gives the actual editorial work enough depth to be reusable.

## What the research changes

The broader research points to several principles that were missing from the first proposal.

An article needs a centre before it needs polished prose. Jack Hart describes the theme statement as the axis that determines structure, inclusion and emphasis. It can remain private and disappear from the published article. [Nieman Storyboard](https://niemanstoryboard.org/2021/10/19/nut-grafs-getting-to-the-heart-of-the-story/)

The opening establishes more than subject matter: it establishes focus, authority, direction, voice and the writer-reader relationship. It should make a promise the article then keeps. [Poynter](https://www.poynter.org/reporting-editing/2019/lead-vs-lede-roy-peter-clark-has-the-definitive-answer-at-last/)

Articles need an intentional shape. Argument, reported feature, technical case study, reflective narrative, field note and Q&A create different reader expectations. Forcing them through one standard template destroys some of their value. [Nieman Storyboard](https://niemanstoryboard.org/2006/01/09/news-feature-v-narrative-whats-the-difference/)

Structure must balance scene, evidence, explanation and abstraction. The beginning and ending should correspond, while sections and paragraph endings should sustain the article’s central question. [Nieman Storyboard](https://niemanstoryboard.org/2022/02/02/sticking-a-story-together-and-nailing-the-structure/)

Sentence construction controls weight and emphasis. A short sentence can land precisely because the surrounding prose is more complex. Too many simple sentences become a drumbeat; too many compound sentences become exhausting. [Purdue Writing Lab](https://owl.purdue.edu/owl/graduate_writing/introduction_to_writing/documents/revising-and-editing/sentence-structure-activity.pdf)

Voice comes from perspective, specificity, selection and rhythm, not merely slang or informality. Poynter’s useful formulation is that voice creates the illusion of the writer speaking to the reader. [Poynter](https://www.poynter.org/archive/2002/thirty-tools-for-writers/)

Web articles must support both committed reading and scanning. Headings, opening words, links and paragraph openings need to remain meaningful outside continuous reading. Clever headings are valuable only when they still orient the reader. [Nielsen Norman Group](https://www.nngroup.com/articles/how-users-read-on-the-web/)

Revision benefits from separate passes, distance, reading aloud, changed context and another reader. Trying to solve structure, facts, voice and punctuation simultaneously encourages local polish over whole-article coherence. [Google Technical Writing](https://developers.google.com/tech-writing/two/editing)

Finally, AI-assisted prose creates a corpus problem, not merely a suspicious-word problem. Recent research finds reduced linguistic variation and recurring grammatical and rhetorical preferences across model-generated or model-modified writing. The appropriate response is not detector chasing; it is protecting genuine variation in structure, diction, evidence, rhythm and point of view across the body of work. [ACL Anthology](https://aclanthology.org/2025.emnlp-main.1163/), [PNAS study](https://pmc.ncbi.nlm.nih.gov/articles/PMC11874169/)

## What the existing corpus tells us

The published corpus should be treated as evidence about habits, not as the house style’s unquestionable source.

Its strongest recurring qualities are:

- Specific engineering incidents rather than generic advice.
- Willingness to implicate the author in the mistake.
- Concrete technical mechanisms, constraints and consequences.
- Honest distinctions between memory, inference and demonstrated fact.
- Dry humour that usually emerges from the material.
- Strong conceptual titles.
- Endings that often close the opening argument.
- Links that let a sceptical reader inspect the work.
- Technical confidence without pretending every uncertainty is resolved.

The corpus also exposes watch classes:

- Repeated antithetical constructions: `not X, but Y`, `X isn’t Y; it’s Z`, and paired oppositions.
- Repeated vocabulary families around things earning or paying rent, boundaries, machinery, shape, trust, evidence, the next engineer and “the work.”
- Aphoristic block quotes appearing with a similar frequency and function across several articles.
- Section sequences that repeatedly alternate claim, anecdote, maxim and qualification.
- Headings that are memorable but sometimes provide less orientation to a scanning reader.
- Endings that echo the title or opening so consistently that the device risks becoming visible.
- Reuse of the same professional episodes across articles: LENS and ADRs, the SQL performance story, tap-versus-mop incident response, test boundaries and agent workflow failures.
- A tendency to explain the lesson after the story has already demonstrated it.
- A tendency for every section to contain a quotable line, whether or not the section needs one.
- In the newest article, a concentration of short fragments and question sequences that work locally but need whole-piece rhythm review.

These are not defects to purge. They are devices whose cost changes with frequency. “Pays rent” may be perfect in one article and tired in the fourth. A repeated story is acceptable when the new article reveals a genuinely different facet; otherwise it cannibalises the corpus.

## 1. The doctrine

I propose `.agents/doctrine/writing-policy.md`.

It should become the authority for all authored public prose. `portfolio-design-policy.md` should retain a concise editorial invariant and link here, rather than maintaining a second copy of the detailed voice and AI-tell rules.

### Authority

The doctrine should establish this order:

1. Truth, safety, privacy, accessibility and legal boundaries.
2. Explicit human intent.
3. Accurate claims and honest provenance.
4. The article’s reader promise and central meaning.
5. Clarity and coherence.
6. Authorised voice.
7. Editorial finish.
8. Fatigue heuristics.

No style repair may strengthen a claim, erase uncertainty, invent a memory, or override a deliberate authorial choice without a concrete reader cost.

### Reader contract

Every article should know:

- Who it is for.
- Why that reader might care.
- What question, tension or promise carries them through it.
- What the reader should understand, feel, question or be able to inspect afterward.
- What the article deliberately does not attempt to cover.

The public text does not need to announce all of this. The writer does.

### Centre of gravity

Every article should have a private one- or two-sentence editorial proposition:

- What is this really about?
- What changes between the beginning and the end?
- What belongs because it advances that movement?
- What attractive material belongs somewhere else?

This is a drafting instrument, not a required standfirst.

### Form before template

The doctrine should recognise several legitimate article shapes:

- Argument or position.
- Technical case study.
- Reflective engineering narrative.
- Design or making-of story.
- Field note or learned observation.
- Tutorial or explanatory article.
- Interview or Q&A.
- Comparative or evaluative piece.

Each needs a beginning, movement and ending, but not the same arrangement. The doctrine should explicitly prohibit turning one successful article structure into a house template.

### Evidence and epistemic honesty

Claims should be classified mentally or in working notes as:

- Directly observed.
- Repository- or source-proven.
- Recollected.
- Inferred.
- Opinion or judgement.
- Intentionally hypothetical.

The prose should make material distinctions visible without drowning the article in disclaimers.

Anecdotes must do more than decorate a thesis. They should provide evidence, complication, stakes, character, sequence or a change in understanding.

External links should support the exact nearby claim. Internal links should extend the reader’s route rather than advertise unrelated inventory.

### Authored voice

Voice should arise from:

- What Harley notices.
- Which technical details he selects.
- What he admits he got wrong.
- Where certainty stops.
- His relationship with the reader.
- His vocabulary and natural contractions.
- His humour, impatience and judgement.
- Sentence rhythm appropriate to the material.

Voice is not a bag of tics. Profanity, fragments, rhetorical questions, metaphors, punchlines and contractions do not create authorship on their own.

Editing should preserve an earned rough edge when smoothing it would remove character or alter the relationship with the reader.

### Language and age rating

The portfolio’s editorial age rating is explicitly **12A**. It is a professionally leaning personal site, not corporate documentation and not Harley’s social media. The prose should neither pretend swearing is absent from Harley’s vocabulary nor use profanity as ambient decoration.

Across a plausible user visit, the available budget is:

- A single use of `fuck`.
- A handful of uses of `shit` or `piss`, including ordinary inflections.
- No uses of `cunt`, `twat` or `cock`.

This is a visit-level editorial budget, not permission to spend the allowance in every article. Review the current page alongside the routes a reader is most likely to follow from it. The site does not need runtime profanity tracking; editorial custody should prevent linked material from accidentally creating a much coarser experience than any one page suggests.

Every swear must earn its place through character, emphasis, humour, quotation or the honest emotional temperature of the material. Remove it when a non-swearing formulation carries the same force. Preserve it when sanitising the sentence would make the voice false, euphemistic or conspicuously polite.

Swearing must never become vulgar, hostile or personally degrading. Do not use it to attack a person or group, manufacture edge, disguise a weak joke, inflate an ordinary claim or make technical confidence look performative.

The right question is not merely whether the word is allowed. Ask what the sentence loses without it, whether that loss matters, and whether this is the best place in the reader’s likely visit to spend the limited emphasis.

### Openings

An opening must establish at least one useful form of pressure:

- A question.
- A contradiction.
- A scene.
- A surprising claim.
- A problem.
- A decision.
- A concrete image.
- A compact statement of stakes.

It should also set the article’s voice and make an honest promise. It must not manufacture urgency the article cannot repay.

### Structure and sections

Every section needs a function in the whole article, such as:

- Establishing context.
- Advancing the argument.
- Providing evidence.
- Complicating the claim.
- Testing an objection.
- Changing scale.
- Moving through time.
- Turning toward the consequence.
- Preparing or delivering the ending.

Headings should survive a headings-only read. They may be witty, but the reader should still understand the route.

Transitions need not announce themselves. A repeated image, consequence, chronology, unresolved question or change in scale can carry the reader more naturally than “however” and “therefore.”

### Paragraphs

Each paragraph should have a coherent editorial job.

For every paragraph boundary, ask what changes:

- Subject.
- Time.
- scene.
- speaker.
- claim.
- evidence.
- scale.
- rhetorical function.
- pace.

A one-sentence paragraph is suspicious, not guilty. It earns isolation through emphasis, transition, contrast, revelation, pause or consequence.

Paragraph openings and endings deserve particular attention because scanning readers may see only those.

### Sentences and rhythm

A full stop is justified when it creates closure, pace, staging, contrast, emphasis or a genuine thought boundary.

Joining is justified when punctuation or syntax makes the relationship between ideas clearer.

A sentence audit asks what the boundary does. It does not ask how many boundaries can be removed.

Fragments are permitted when the surrounding prose supplies their meaning and the fragment earns emphasis. Compound and complex sentences are permitted when continuity matters more than separation.

Review rhythm across the paragraph, section and complete article. Avoid mechanical alternation just as much as mechanical uniformity.

### Endings

An ending should stop where the article’s movement resolves.

It may:

- Answer the opening question.
- Return to an opening image with changed meaning.
- Deliver a consequence.
- Leave a bounded unresolved question.
- Offer a decision or next move.
- End on the strongest remaining concrete detail.

It should not append a grand universal lesson merely because articles are expected to conclude.

The useful test from Poynter is to cover the last paragraph and ask whether the article has already ended. If so, cut the extra ending. [Poynter](https://www.poynter.org/archive/2002/thirty-tools-for-writers/)

### Corpus distinctiveness

Before publication, compare the draft with the public corpus for repeated:

- Story.
- Metaphor.
- Phrase family.
- Argument shape.
- Heading grammar.
- Pull-quote pattern.
- Opening move.
- Closing move.
- Sentence rhythm.
- Moral or lesson.

Recurrence produces a candidate for review, not an automatic rewrite.

The question is whether the repetition creates continuity, develops an existing idea, or merely reaches for a familiar move.

### AI-fatigue policy

AI-fatigue remains a permanent watch class, but it operates on clusters and reader cost.

Watch for:

- Synthetic profundity.
- Empty antithesis.
- Manufactured conversationality.
- Generic emotional emphasis.
- Repeated rhetorical triplets.
- Excessive symmetry.
- Uniform section architecture.
- Polished abstractions without actors or consequences.
- Explanatory tails after the point has landed.
- Conclusions inflated beyond the evidence.
- Voice flattened into competent, agreeable neutrality.
- Variation added randomly to “sound human.”
- Overcorrection driven by a lint rule.

No detector scores. No authorship claims. No token blacklist. No deliberate defects.

### Anti-overcorrection

Every editing pass needs a recovery check:

- What did this pass improve?
- What meaning, cadence, humour, ambiguity or emphasis did it damage?
- Which supplied formulations were stronger than the repair?
- Did the article become more generic while becoming more polished?
- Did a local improvement harm the whole piece?

A change without a defensible editorial benefit should be reverted.

## 2. The playbook

I propose `.agents/playbooks/article-writing.md`.

It should bind the doctrine and writing skills to this repository’s article sources, generated surfaces, preview, review and publication evidence.

### Phase A: commission and material

1. Retrieve the full issue and linked documents when the article is Linear-backed.
2. Establish the article’s status: idea, notes, draft, approved copy or publication edit.
3. Gather source material without turning unverified context into fact.
4. Record the audience, proposition, intended form, central question and non-scope.
5. Build a lightweight claim-and-evidence ledger for externally checkable claims.
6. Inventory existing articles that use the same stories or arguments.

### Phase B: editorial design

1. Write the private theme statement.
2. Choose an article shape.
3. Identify the opening promise.
4. Map the major movements or sections.
5. Decide where the article changes scale between story, technical detail, argument and reflection.
6. Identify the intended ending before polishing the middle.
7. Check that the structure can carry the promised reading time without padding.

### Phase C: drafting

1. Draft through `writing`.
2. Keep evidence and qualifications attached to the claims they govern.
3. Prefer concrete actors, systems, decisions and consequences.
4. Leave placeholders for missing facts rather than smoothing over them.
5. Do not edit every sentence while the structure is still moving.

### Phase D: macro edit

Run these passes separately:

1. Proposition pass: does the article have one discernible centre?
2. Promise pass: does the body deliver what the title, summary and opening promise?
3. Structure pass: does each section advance, complicate or resolve the article?
4. Evidence pass: are claims supported and qualifications honest?
5. Counterpressure pass: has the article engaged the strongest reasonable objection or complication?
6. Relevance pass: what interesting material does not belong?
7. Repetition pass: where does the article explain the same point twice?
8. Ending pass: where does the article naturally stop?

### Phase E: meso and micro edit

1. Heading-only read.
2. Paragraph-purpose and boundary pass.
3. Transition pass.
4. Sentence-boundary and clause-weight pass.
5. Word-order and emphasis pass.
6. Specific noun and strong verb pass.
7. Pronoun and referent clarity pass.
8. Terminology and acronym pass.
9. Rhythm and read-aloud pass.
10. Language and 12A visit-budget pass.
11. Anti-overcorrection pass.

### Phase F: voice and fatigue

1. Apply the current authorised voice guidance.
2. Review the draft against the AI-fatigue profile.
3. Compare the draft with the corpus.
4. Mark findings as:
   - preserve;
   - observed;
   - candidate;
   - repair;
   - abstain.
5. Make the smallest supported repair.
6. Run a final clarity pass.
7. Confirm the repaired draft still sounds authored rather than normalized.

### Phase G: web article review

1. Read the title and summary without the body.
2. Read only the headings.
3. Read the first sentence of every paragraph.
4. Inspect every link in context.
5. Confirm code, quotations and technical terms render correctly.
6. Read the article continuously in the rendered page.
7. Review mobile and desktop reading rhythm.
8. Check that design interruptions, pull quotes and asides earn their place.
9. Confirm the displayed reading time is honest.

### Phase H: publication evidence

1. Regenerate only the relevant mechanical projections.
2. Run content, route, link and focused page tests.
3. Build the production site.
4. Inspect visual changes deliberately.
5. Present the running article for human editorial approval.
6. Publish through the normal draft-PR workflow.

## 3. A new local skill

I recommend a repo-owned skill named `/writing-portfolio-articles`.

The playbook would own repository workflow. The skill would own the editorial method.

### Why a skill is justified

The method now includes enough reusable judgement that embedding it entirely in a playbook would make the playbook enormous and difficult to apply selectively. The same editorial capability should work during:

- Initial drafting.
- Developmental editing.
- Line editing.
- Corpus-fatigue review.
- Final article review.
- Retrospective review of an existing article.

### Proposed structure

```text
.agents/skills/writing-portfolio-articles/
├── SKILL.md
├── references/
│   ├── article-forms.md
│   ├── editorial-brief.md
│   ├── developmental-edit.md
│   ├── evidence-and-claims.md
│   ├── structure-and-movement.md
│   ├── openings-and-endings.md
│   ├── paragraphs-sentences-and-rhythm.md
│   ├── authored-voice.md
│   ├── corpus-fatigue.md
│   └── final-review.md
├── scripts/
│   └── audit_article_corpus.py
└── tests/
    └── pressure/
```

The skill should load references progressively according to the editing problem. It should not force every pass for a small correction.

### Corpus audit script

A read-only script could report inspectable signals across `src/client/src/data/content/writing/`:

- Repeated phrase families.
- Repeated metaphors.
- Reused external and internal stories.
- Heading shapes and repeated openings.
- Pull-quote density.
- Paragraph and sentence-length distributions.
- One-sentence paragraph density.
- Repeated opening and closing constructions.
- Internal-link coverage.
- Article word count against declared reading time.

It must not:

- Score whether prose is “human.”
- Assert authorship.
- Rewrite prose.
- Ban phrases.
- Treat frequency as a defect.
- retain a separate corpus or embeddings.
- Declare a finding without editorial review.

Its output is an evidence pack for the skill, not a gate.

### Voice custody

I would not create a permanent imitation profile from the corpus.

The durable doctrine can record explicit preferences the user has authorised: contractions, directness, no em dashes, technical specificity, honest rough edges, dry humour, and the authority order.

The live corpus can be inspected during each review for recurrence and contrast. It should not be copied into a sentence bank, embedded, or treated as a golden voice dataset.

### Skill tests

Because this is a behavioural skill, it should ship pressure tests.

At minimum:

1. Sentence-joining overcorrection  
   The treatment must preserve the three-beat `shoot the hostage` construction while explaining why each boundary works.

2. One-sentence paragraph  
   The treatment must investigate its function rather than merge it automatically.

3. Individually good, corpus-tired phrase  
   A repeated metaphor should become a candidate finding only after corpus context is supplied.

4. Empty antithesis  
   The treatment should repair a repeated `not X, but Y` construction that creates no new distinction.

5. Earned antithesis  
   The treatment must preserve a contrast carrying a real technical distinction.

6. Voice flattening  
   The treatment must reject a grammatically smoother revision that removes humour, uncertainty or directness.

7. Evidence laundering  
   The treatment must distinguish recollection, inference and sourced fact.

8. Template pressure  
   The treatment must choose a fitting article shape instead of imposing the same six-section structure.

9. Ending inflation  
   The treatment must cut a grand concluding paragraph when the article has already ended.

10. Corpus story reuse  
    The treatment must ask what new dimension the repeated story contributes.

11. Web scanning  
    The treatment must flag witty headings that fail to orient a headings-only reader.

12. Abstention  
    The treatment must leave strong prose unchanged when no material reader cost is demonstrated.

13. Earned profanity  
    The treatment must preserve an allowed swear when it carries material voice, humour or emotional force, and remove one used merely as decoration.

14. Visit-level age rating  
    The treatment must consider the current article together with its likely continuation routes, enforce the single-`fuck` and limited-`shit`/`piss` budget, and reject `cunt`, `twat` and `cock` without turning the rule into runtime visitor tracking.

The RED baseline should be observed before writing the new skill, then the same fixtures should establish GREEN. Maintainer tests belong under the skill’s own `tests/` directory.

## Repository integration

The same PR should update:

- `.agents/doctrine/writing-policy.md`
- `.agents/playbooks/article-writing.md`
- `.agents/skills/writing-portfolio-articles/`
- `.agents/plugins/marketplace.json`
- `.agents/doctrine/AGENTS.md`
- `.agents/playbooks/AGENTS.md`
- `.agents/doctrine/repo-runbook-policy.md`
- Relevant lifecycle runbook routing
- Root `AGENTS.md`
- `CONTRIBUTING.md`
- `portfolio-design-policy.md`, reducing it to the non-duplicated editorial invariant and link
- Generated mesh and installed-skill provenance

## Recommended implementation boundary

I would build the complete doctrine and playbook now, plus the local skill and its pressure fixtures.

I would keep the first corpus script deliberately observational. We have enough evidence to report recurrence and structural signals, but not enough to build a quality score. Human editorial judgement remains the deciding layer.

The resulting system would make article writing a sequence of distinct editorial decisions:

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

That goes materially beyond sentence and paragraph hygiene. It gives the repository a method for producing articles that have something to say, choose a shape suited to saying it, sound like somebody in particular meant every choice, and remain distinct from the rest of the corpus.
