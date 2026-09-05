# Portfolio Design Policy

Use this policy for any change that can alter how the portfolio presents Harley, his work, or his judgement. It is the active portfolio-wide policy for purpose, invariants, route composition and quality gates. Completed specs explain how the current implementation arrived here, but they are not the worker entry point and they do not freeze the site.

## Current visual contract

Across the site, use a cool-mineral substrate as shared ground. Source Sans 3 carries the site voice, Source Serif 4 is reserved for authored reading, and Source Code Pro carries technical material and compact utility text. Project-native colour and art direction may leave an artefact only when the surrounding evidence earns them, and their authority stays bounded to that relationship.

The shared composition grammar favours a disciplined rectilinear grid, artifact-first evidence, relationship-led cadence and a quiet reading flow. Individual routes may own different arrangements when their content earns them; interruptions such as rails, fields and asymmetry are evidence-led decisions, not route quotas or a boundary between separate visual systems.

Within that same site-wide system, the homepage owns a deterministic six-movement editorial composition with no autoplay. Its asymmetry follows real editorial relationships rather than acting as a house treatment. Warm paper, copper punctuation and the earlier shuffled feature deck are historical inputs, not protected defaults and not a fallback visual language.

## Purpose and audience

The portfolio should make a hiring manager, interviewer, or senior engineer want to inspect the work. It presents Harley as a senior software engineer building reliable agentic systems through projects, technical writing, teaching material, and memorable visual explanation.

The site should feel like an authored editorial engineering field journal, not a product landing-page template. Most pages exist to make an idea or piece of work intrinsically useful. About is the deliberate professional assessment surface: assess Harley for work and understand how he operates. Contact is a distinct privacy-preserving conversion route reached from About, the CV and intentional homepage close links.

Audience priority is:

1. hiring managers and interviewers;
2. senior engineers and technical peers;
3. agentic-workflow practitioners and learners.

## Portfolio-wide editorial decision lenses

Every material editorial choice across the portfolio is judged through three lenses. These are decision tools, not three separate sections or audiences to pander to in the public copy. A choice is not finished merely because it satisfies one lens.

### £10k agency lens

`Is it £10k?` is shorthand for: would we be comfortable paying £10,000 for this site if a respectable agency delivered it?

This is a finish and copy-quality test, not a literal valuation of an individual article or engineering idea. The work should feel properly edited, structured, restrained, specific, coherent and presentation-ready. Strong technical material still fails this lens when the copy feels amateur, rambling, repetitive, generic, obviously AI-shaped or unfinished.

A culturally documented resemblance to a common AI-generated visual aesthetic is an automatic 50% valuation penalty: an otherwise £10k site is £5k. This is not a ban on individual colours, type categories or component shapes. It is a delivery gate against a recognisable default cluster that makes human art direction and custody implausible. Correct the system before delivery rather than averaging the failure away against strong engineering or accessibility.

### Weary sceptical hiring manager

Assume the hiring manager has already looked at ten portfolios today from people claiming to be a `senior software engineer working at the frontier of agentic engineering`. None has yet proved to be a good engineer. Three looked promising enough to forward to the architect and were quickly laughed off.

The hiring manager is now protecting their own judgement. They will not forward another candidate unless the evidence is legible and credible enough that sending the URL feels safe. Editorial choices should shorten the path from claim to inspectable proof and remove reasons for a cautious reader to dismiss the work before that proof lands.

### Jaded cynical architect

Assume the architect has seen every variation of a developer recognising an advanced pattern by name without understanding it deeply. They are good at stripping presentation away until only the engineer's actual knowledge remains. They have already had three weak candidates forwarded today and expect the next one to be the same.

The work must survive hostile technical scrutiny: why this design, what failed, what was rejected, which trade-offs were made, what the evidence proves, where the claim stops, what remains unresolved, and whether the author can distinguish implementation reality from aspiration. Pattern vocabulary is not evidence.

The target reactions are simple: the hiring manager should think `I am not going to look stupid forwarding this one`; the architect should think `annoyingly, this person actually does understand what they're talking about`.

Truth, evidence, privacy and Harley's author judgement still outrank all three lenses. The lenses shape how established truth is selected, ordered and presented; they do not license stronger claims.

## Design invariants

- **Proof before pitch.** Projects, articles, and artefacts demonstrate judgement. Repeated claims that Harley is good are not a substitute for inspectable evidence.
- **Human voice, edited rather than neutralised.** First-person case-study and reflective copy should sound like Harley speaking to a technically literate reader. Use natural contractions by default: `I'm`, `didn't`, `wouldn't`, `that's`. Expand them only when emphasis, contrast, or clarity calls for it. Prefer direct phrasing such as `my memory's incomplete` over the more formal `my memory of it is incomplete`; extra words are not extra clarity. Do not use em dashes in Harley-authored public copy. Join an adjunct with commas or use a plain hyphen when a harder break is genuinely useful. Editing may tighten Harley's cadence, but must not turn it into institutional or generic documentation prose.
- **Authored hierarchy.** Composition, typography, imagery, and whitespace create a deliberate reading order. Repeated interchangeable cards do not.
- **Editorial restraint.** Motion explains a hierarchy or state change. It does not autoplay, decorate idle time, scroll-jack, or compete with reading.
- **Specific imagery.** Prefer owned project artefacts, diagrams, and honest capture briefs. Do not use generic stock imagery, invented screenshots, or illegible full-page thumbnails.
- **Honest state.** Maturity, availability, contact delivery, metrics, and experience claims say only what repository or user-provided evidence supports.
- **Accessible by construction.** Important content works without animation, keyboard focus is visible, source order is meaningful, reduced motion is respected, and layouts remain usable at 320 CSS pixels and 200% zoom.
- **Browsing context is explicit.** Internal portfolio links navigate in the current context. External links, including Harley's GitHub profile and repositories, open in a new tab, show the recognised external-link icon, and announce the context change in their accessible name. The decorative icon stays out of the accessibility tree, and new-tab links protect the opener context.
- **Privacy by design.** Do not publish plaintext personal email addresses or phone numbers. Contact uses an HTTPS form endpoint when configured and an honest non-email fallback when it is not.
- **Performance is part of finish.** Avoid layout shift, eager content payloads, oversized media, and unowned third-party runtime dependencies.
- **Patch is a signature, not the whole identity.** Patch may provide one distinctive visual or story opportunity in a mixed feature surface; the wider portfolio must still read as engineering, writing, and professional practice.

## Shared editorial primitives

Article asides are shared editorial grammar. Every article aside must use [`EditorialAside`](../../src/client/src/components/editorial/EditorialAside.tsx), imported through `src/client/src/components/editorial` (for writing bodies, `import { EditorialAside } from '../../components/editorial'`). Article prose obeys the reading measure; editorial asides deliberately break it to the right on wide viewports while retaining the prose column’s left edge. The shared responsive grammar is: wide desktop places title and precis in the left lane with the disclosure/body in the right lane; tablet places title and precis side by side, then puts the disclosure on the next row with opened body in the right lane; mobile returns title, precis and disclosure to one left-aligned column. The primitive owns that geometry along with field and rule treatment, title and precis hierarchy, native disclosure behavior, keyboard semantics and responsive handling.

Article-local aside shells or aside presentation styles are not allowed. A genuinely different aside grammar requires an explicit new design decision and approval before implementation. This is the same conceptual rule already embodied by [`EditorialPullQuote`](../../src/client/src/components/editorial/EditorialPullQuote.tsx): a repeated editorial job belongs to its canonical shared primitive, not a new local treatment.

## Editorial voice and AI-tell policy

This policy applies to public page copy, case studies, articles, CV narrative, captions, alt text, headings, and other prose presented as Harley's writing. The goal is recognisable authorship. A detector score is irrelevant.

### Write towards Harley's voice

- Lead with the actual subject, decision, evidence, or consequence.
- Use the contractions Harley would use when speaking. Prefer the shortest natural version of a thought.
- Preserve directness, dry humour, technical confidence, and the occasional rough edge. Do not polish every sentence into the same literary cadence.
- Mix sentence lengths according to the thought. Let a short sentence end the point when it is done.
- Use specific technical language when it carries meaning. Familiarity does not need to be disguised as tutorial prose.
- Make contrasts concrete: name the viable alternative, the cost, and the reason for the choice.

### Reject common AI tells

- No em dashes in Harley-authored public copy. Use commas for adjuncts, a full stop for a finished thought, or a plain hyphen for a deliberate hard break.
- No emoji unless the emoji itself is critical to the medium, quoted material, or the meaning being discussed. Never add decorative emoji to headings, status labels, lists, or calls to action.
- Do not rely on stock reversal frames such as `That's not X, it's Y`, `It isn't just X, it's Y`, or repeated `not X, but Y` constructions. State the positive claim directly. Keep a contrast only when both sides carry necessary, specific information.
- Treat model-favourite scaffolding such as `I keep returning to`, `at its core`, `what matters is`, `the real story`, `this is where`, `the bottom line`, and `it is worth noting` as a warning, not a blacklist. Any one of these can be natural in context; the tell is how readily and repeatedly models use the familiar frame to manufacture reflection or emphasis. Check paraphrases and rhetorical function too: changing `the thing I keep returning to` into `the game I wanted to return to` preserves the same familiar posture. Keep the frame only when it sounds specific to Harley and the passage. Otherwise, state the thought directly.
- Apply that frequency judgement across the whole public corpus. One earned use may be natural; one per article establishes a model-shaped house style, and recurrence across unrelated contexts can falsely present the phrase as part of Harley's vocabulary. Search the site, not only the current draft, and include close semantic variants in the editorial review.
- Do not add a qualifying tail after a sentence already says enough. The Dustwell map caption needed `the player chooses a town`; the extra proper noun and explanation made it worse.
- Avoid repeated rhetorical triplets, symmetrical paragraph templates, fake profundity, grand closing summaries, and fragments inserted only to sound emphatic.
- Do not apologise for honest project state or add defensive credibility claims around evidence that already speaks for itself.

### Editorial review

Read continuous prose aloud. Search for banned punctuation, decorative emoji, stock phrases, and repeated sentence skeletons. When a sentence feels polished but impersonal, cut its final qualification first, then replace abstraction with the concrete actor or decision. Compare the result with Harley's supplied language and preserve factual boundaries. If a genuinely load-bearing voice choice remains uncertain, leave it for Harley's review rather than smoothing it into generic prose.

## Protected defaults

These portfolio-wide defaults are intentional, but replaceable through the change protocol below:

- the designed HB SVG mark;
- project-native media and responsive derivatives under repository custody;
- explicit hiring language on About, with contact behaviour owned by the privacy-preserving Contact route;
- public deep routes with route-specific metadata and an honest unknown-route fallback.

Across every route, protect the cool-mineral shared substrate; shared Source family roles; disciplined composition; artifact-first evidence; relationship-led cadence; readable flow; and bounded, evidence-earned use of project-native colour and interruption. A route may carry its own choreography without becoming a separate visual system. The homepage additionally protects its deterministic six-movement edition with no autoplay.

Do not encode these choices as brittle assertions about exact prose, DOM class names, or every colour value. Test the outcomes that make them valuable: accessible controls, route correctness, content integrity, privacy, asset custody, performance budgets, and deliberately chosen visual baselines.

## Quality review

A material visual or editorial change is reviewed at 1440, 768, 390, and 320 CSS pixels, keyboard-only, reduced motion, and actual 200% browser zoom. A narrow viewport may automate reflow pressure, but it does not replace the real browser-zoom review. Review asks:

- Is the reading order obvious without relying on animation?
- Does first-person copy sound natural when read aloud, using the contractions and economical phrasing Harley would use in conversation rather than slipping into formal essay voice?
- Does typography create useful contrast while remaining readable?
- Is every visual specific, legible, and proportionate to the story?
- Does motion communicate state and stop when reduced motion is requested?
- Are claims, statuses, links, and contact behaviour demonstrably honest?
- Do the affected automated accessibility, route, privacy, custody, and budget gates pass?

Screenshots are evidence, not the whole review. A pixel baseline can prevent accidental drift; it cannot decide whether a new direction is better.

## Change protocol

This policy should prevent unintentional regression without blocking a stronger idea. A pull request may change a protected default when it:

1. names the audience or product problem being solved;
2. explains how the new direction better serves the invariants;
3. includes appropriate before/after visual evidence;
4. adds a dated entry to `docs/design-decisions.md` with a reconsideration trigger;
5. updates objective guards when the public contract intentionally changes; and
6. passes the canonical validation and review gates.

If a proposed direction conflicts with an invariant rather than a default, update this policy in the same pull request and make that policy change conspicuous for human review. Silent erosion is a regression; explicit, evidenced evolution is allowed.
