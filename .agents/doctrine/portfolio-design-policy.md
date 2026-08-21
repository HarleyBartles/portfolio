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
- **Authored hierarchy.** Composition, typography, imagery, and whitespace create a deliberate reading order. Repeated interchangeable cards do not.
- **Editorial restraint.** Motion explains a hierarchy or state change. It does not autoplay, decorate idle time, scroll-jack, or compete with reading.
- **Specific imagery.** Prefer owned project artefacts, diagrams, and honest capture briefs. Do not use generic stock imagery, invented screenshots, or illegible full-page thumbnails.
- **Honest state.** Maturity, availability, contact delivery, metrics, and experience claims say only what repository or user-provided evidence supports.
- **Accessible by construction.** Important content works without animation, keyboard focus is visible, source order is meaningful, reduced motion is respected, and layouts remain usable at 320 CSS pixels and 200% zoom.
- **Privacy by design.** Do not publish plaintext personal email addresses or phone numbers. Contact uses an HTTPS form endpoint when configured and an honest non-email fallback when it is not.
- **Performance is part of finish.** Avoid layout shift, eager content payloads, oversized media, and unowned third-party runtime dependencies.
- **Patch is a signature, not the whole identity.** Patch may provide one distinctive visual or story opportunity in a mixed feature surface; the wider portfolio must still read as engineering, writing, and professional practice.

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
