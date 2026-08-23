# Portfolio Design Policy

Use this policy for any change that can alter how the portfolio presents Harley, his work, or his judgement. It is the active design contract. Completed specs explain how the current implementation arrived here, but they are not the worker entry point and they do not freeze the site.

## Purpose and audience

The portfolio should make a hiring manager, interviewer, or senior engineer want to inspect the work. It presents Harley as a senior software engineer building reliable agentic systems through projects, technical writing, teaching material, and memorable visual explanation.

The site should feel like an authored editorial engineering field journal, not a product landing-page template. Most pages exist to make an idea or piece of work intrinsically useful. The About page is the deliberate place where the subtext becomes explicit: assess Harley for work, understand how he operates, and make contact safely.

Audience priority is:

1. hiring managers and interviewers;
2. senior engineers and technical peers;
3. agentic-workflow practitioners and learners.

## Design invariants

- **Proof before pitch.** Projects, articles, and artefacts demonstrate judgement. Repeated claims that Harley is good are not a substitute for inspectable evidence.
- **Human voice, edited rather than neutralised.** First-person case-study and reflective copy should sound like Harley speaking to a technically literate reader. Use natural contractions by default: `I'm`, `didn't`, `wouldn't`, `that's`. Expand them only when emphasis, contrast, or clarity calls for it. Prefer direct phrasing such as `my memory's incomplete` over the more formal `my memory of it is incomplete`; extra words are not extra clarity. Do not use em dashes in Harley-authored public copy. Join an adjunct with commas or use a plain hyphen when a harder break is genuinely useful. Editing may tighten Harley's cadence, but must not turn it into institutional or generic documentation prose.
- **Authored hierarchy.** Composition, typography, imagery, and whitespace create a deliberate reading order. Repeated interchangeable cards do not.
- **Editorial restraint.** Motion explains a hierarchy or state change. It does not autoplay, decorate idle time, scroll-jack, or compete with reading.
- **Specific imagery.** Prefer owned project artefacts, diagrams, and honest capture briefs. Do not use generic stock imagery, invented screenshots, or illegible full-page thumbnails.
- **Honest state.** Maturity, availability, contact delivery, metrics, and experience claims say only what repository or user-provided evidence supports.
- **Accessible by construction.** Important content works without animation, keyboard focus is visible, source order is meaningful, reduced motion is respected, and layouts remain usable at 320 CSS pixels and 200% zoom.
- **Privacy by design.** Do not publish plaintext personal email addresses or phone numbers. Contact uses an HTTPS form endpoint when configured and an honest non-email fallback when it is not.
- **Performance is part of finish.** Avoid layout shift, eager content payloads, oversized media, and unowned third-party runtime dependencies.
- **Patch is a signature, not the whole identity.** Patch may provide one distinctive visual or story opportunity in a mixed feature surface; the wider portfolio must still read as engineering, writing, and professional practice.

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
- Avoid model-favourite scaffolding such as `I keep returning to`, `at its core`, `what matters is`, `the real story`, `this is where`, `the bottom line`, and `it is worth noting` unless Harley supplied the phrase for that exact passage.
- Do not add a qualifying tail after a sentence already says enough. The Dustwell map caption needed `the player chooses a town`; the extra proper noun and explanation made it worse.
- Avoid repeated rhetorical triplets, symmetrical paragraph templates, fake profundity, grand closing summaries, and fragments inserted only to sound emphatic.
- Do not apologise for honest project state or add defensive credibility claims around evidence that already speaks for itself.

### Editorial review

Read continuous prose aloud. Search for banned punctuation, decorative emoji, stock phrases, and repeated sentence skeletons. When a sentence feels polished but impersonal, cut its final qualification first, then replace abstraction with the concrete actor or decision. Compare the result with Harley's supplied language and preserve factual boundaries. If a genuinely load-bearing voice choice remains uncertain, leave it for Harley's review rather than smoothing it into generic prose.

## Protected defaults

These defaults are intentional, but replaceable through the change protocol below:

- warm paper, ink, copper, and a controlled Patch-teal accent;
- Fraunces display type, Source Serif 4 reading type, and Fira Code utility type;
- asymmetrical editorial layouts with constrained prose measure;
- the designed HB SVG mark;
- a manually controlled randomized feature deck with no autoplay;
- project-native media and responsive derivatives under repository custody;
- explicit hiring and contact language concentrated on About;
- public deep routes with route-specific metadata and an honest unknown-route fallback.

Do not encode these choices as brittle assertions about exact prose, DOM class names, or every colour value. Test the outcomes that make them valuable: accessible controls, route correctness, content integrity, privacy, asset custody, performance budgets, and deliberately chosen visual baselines.

## Quality review

A material visual or editorial change is reviewed at 1440, 768, 390, and 320 CSS pixels, keyboard-only, reduced motion, and 200% zoom. Review asks:

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
