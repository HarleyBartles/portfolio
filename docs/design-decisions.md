# Portfolio Design Decisions

This append-only ledger records why material portfolio design choices exist and when they should be reconsidered. The active contract is `.agents/doctrine/portfolio-design-policy.md`; this file supplies rationale, not an alternative rulebook.

## 2026-08-21 — Editorial engineering field journal

**Context:** The portfolio needed to distinguish Harley's engineering practice without resembling a generic developer template or a sales landing page.

**Decision:** Use a warm, asymmetrical editorial field-journal direction with deliberate display, reading, and utility typography. Let project artefacts and writing carry the professional argument.

**Consequence:** New surfaces need an authored reading order and specific visual treatment; a uniform grid of interchangeable bordered cards is not the default composition.

**Reconsider when:** A different coherent art direction demonstrates a clearer audience journey, stronger accessibility, and equal or better connection to the work.

## 2026-08-21 — About is the hiring boundary

**Context:** Repeating “hire me” across every project and article weakens both the content and the claim.

**Decision:** Keep most pages useful on their own. Make About the explicit professional assessment surface for experience, working style, CV state, availability, and contact.

**Consequence:** Other pages may offer restrained proof or navigation to About, but should not become repeated sales pitches.

**Reconsider when:** User research shows visitors cannot discover the professional proposition or reach About despite clear navigation.

## 2026-08-21 — Manual randomized feature deck

**Context:** Static homepage features made repeated visits feel fixed, while a conventional autoplay carousel would add movement at the cost of control and perceived quality.

**Decision:** Randomize the initial lead on each full load, keep supporting stories visible, and provide labelled Previous, Next, and Shuffle controls. Never autoplay.

**Consequence:** Randomness changes emphasis, not availability. Feature motion communicates the hierarchy swap and becomes immediate for reduced motion.

**Reconsider when:** Analytics or usability testing shows random entry harms comprehension, or a different editorial mechanism offers variety with better control.

## 2026-08-21 — Patch is a supporting signature

**Context:** Adventures of Patch provides memorable owned imagery and shows a sophisticated creative pipeline, but the portfolio represents a broader engineering practice.

**Decision:** Include exactly one Patch candidate in the mixed homepage feature pool and use purpose-built pipeline artwork rather than an unreadable full-page comic thumbnail.

**Consequence:** Patch can add visual distinction without making the homepage appear to be the Patch project site.

**Reconsider when:** The content portfolio changes enough that a different proportion better represents Harley's current work.

## 2026-08-21 — Honest status and source-backed claims

**Context:** A polished portfolio loses trust quickly if maturity labels, metrics, screenshots, CV facts, or contact states imply more than the evidence proves.

**Decision:** Publish only source-backed facts and explicit project statuses. Use capture briefs, incomplete labels, and disconnected states when the real input is unavailable.

**Consequence:** Visual finish may never outrun factual honesty. Unknown facts remain unknown rather than being filled with plausible copy.

**Reconsider when:** New repository evidence or user-supplied facts make a previously unavailable claim demonstrable.

## 2026-08-21 — Privacy-preserving contact seam

**Context:** Public plaintext email addresses and phone numbers are routinely scraped, while a nonfunctional form would be deceptive.

**Decision:** Configure contact delivery only through an environment-provided HTTPS form endpoint. When it is absent, show an honest GitHub fallback and no active submission claim.

**Consequence:** Production source and HTML contain no personal address or phone literal. Enabling delivery requires configuration and verification, not a content edit exposing private data.

**Reconsider when:** A privacy-preserving first-party contact service with equal or stronger abuse controls becomes available.

## 2026-08-21 — Owned asset custody

**Context:** Project-native imagery improves specificity, but copied or oversized assets can create ownership, performance, and future-maintenance uncertainty.

**Decision:** Deploy only optimized owned derivatives and record provenance, transformation, dimensions, byte size, and alt-text intent in `docs/asset-custody.md`.

**Consequence:** New imagery must have an auditable source and a purposeful responsive representation.

**Reconsider when:** The site adopts an equally auditable external asset pipeline with durable licences and equivalent performance controls.
