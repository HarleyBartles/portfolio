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

## 2026-08-22 — Composable case studies, not a project-page template

**Context:** Marketplace needs a specialist, evidence-led body while later flagship projects need different material and art direction.

**Decision:** Keep the route shell and Markdown fallback in `ContentPage`; dispatch the small, explicit project-presentation registry to a specialist body.

**Consequence:** Later case studies can vary their reading order and visual language without duplicating route infrastructure or forcing every project into one template.

**Reconsider when:** Multiple specialist bodies demonstrate a stable shared primitive that materially reduces duplication without flattening their distinct narratives.

## 2026-08-23 — Wild Bunch evidence leads its architecture

**Context:** Wild Bunch is a pre-alpha re-creation with a playable development build and source-backed architectural claims, but its current visuals are a working skeleton rather than finished game art.

**Decision:** Use the custody-recorded Dustwell development-build capture as the route and project-preview evidence, then frame the specialist body as a warm editorial field record with dark evidence panels and restrained copper/faded-gold detail. Keep determinism and event history readable in semantic source order instead of substituting generic or generated architecture decoration.

**Consequence:** The page recognises as real game evidence before it explains the system, without turning into a themed saloon interface or implying a finished art direction. Captions and alt text retain the development-skeleton boundary.

**Reconsider when:** Wild Bunch has an actual, reviewed visual-design direction mature enough to replace these development-build captures while preserving their evidence and accessibility value.

## 2026-08-23 — Wild Bunch is an authored field note

**Context:** The revised Wild Bunch story had a clear five-movement argument, but the wide route still rendered as a long narrow CMS column beside unused canvas.

**Decision:** Make human reasoning the case-study spine and establish status once. Use the wide canvas only where deterministic, event, and player-safe product evidence pays off beside its argument or as a full proof moment; keep the technical dossier compact and close with one quiet source note.

**Consequence:** Architecture inventories, duplicated proof-card walls, and capability ledgers are rejected. The semantic source order remains readable at narrow widths while the desktop composition gives evidence a deliberate relationship to the claim it supports.

**Reconsider when:** Review shows a proof relationship obscures reading momentum, captions, focus order, or the comfortable prose measure at supported viewport and zoom contracts.

## 2026-08-23 — Preserve Harley's spoken cadence in first-person copy

**Context:** The Wild Bunch case study became clearer through editorial revision but still sounded processed whenever natural contractions became formal expansions: `I'm` became `I am`, `wouldn't` became `would not`, and `my memory's incomplete` became the longer `my memory of it is incomplete`.

**Decision:** Treat natural contractions and economical phrasing as the default for first-person case-study and reflective copy. Reject common AI tells: em dashes, decorative emoji, stock reversal formulas, repeated model-favourite phrases, padded qualifications, and overly symmetrical sentence scaffolds. Read continuous prose aloud during editorial review and preserve Harley's spoken cadence unless emphasis, contrast, or clarity justifies the expanded form.

**Consequence:** Copy review must catch shifts into formal essay or documentation voice even when the sentences are grammatically correct. This is an authorship judgement, not a mechanical contraction lint rule.

**Reconsider when:** Harley deliberately establishes a different voice for a named surface or an expanded form demonstrably reads more naturally in context.

## 2026-08-24 — Patch imagery follows the production record

**Context:** Adventures of Patch has enough first-party imagery to support an image-rich case study, but volume alone can turn a portfolio route into a Patch microsite or bury the engineering argument beneath decorative character art.

**Decision:** Give each image one evidential job and arrange the case study from the database incident through the first deck, the current production system, published work and active worlds. Keep the public repository as inspectable proof while describing private planning only at the level needed to explain the workflow.

**Consequence:** Patch can recur throughout the page without becoming decoration. The images advance the origin-to-production story, the public links resolve to pinned evidence, and workshop details that don't strengthen the public engineering case stay private.

**Reconsider when:** Images obscure the adjacent engineering evidence, repeat a job already done, or make the wider portfolio feel like a supporting site for Adventures of Patch.

## 2026-08-24 — Patch stories and the engineering case study have separate jobs

**Context:** The Patch case study accumulated published fairytales, adventure worlds, future plans and production evidence. Stronger adventure material made the page longer while giving each story less room to explain its lesson.

**Decision:** Make `/patch` the public home for one-page fairytales and larger adventures. Give substantial adventures their own authored pages, including stories assembled directly for this portfolio when their evidence is ready. Keep `/projects/adventures-of-patch` focused on the database incident, editorial judgement, production controls, source custody and acceptance authority.

**Consequence:** A portfolio-native story can be the public artefact even when no upstream deck exists. Development states remain visible in the showcase, and the engineering case study can make one coherent argument without repeating the catalogue.

**Reconsider when:** The showcase no longer has enough distinct stories to justify primary navigation, or separating a story from its production evidence makes either page harder to understand.

## 2026-08-24 — Tournament progresses from ambiguity to agreement

**Context:** The Tournament source contains strong environment, character and stakeholder scenes, but no finished deck and no accepted celebration scene that proves the medal outcome.

**Decision:** Build the portfolio story as four distinct editorial reveals. Each event states the task in HTML, lets the accepted image expose its ambiguity, records Bit and Bot's plausible failures, then shows how Patch moves from refusal to decision-ready work and finally agreed execution. Keep medal outcomes in HTML and exclude generic awards art that cannot identify the recipient.

**Consequence:** The page uses the strongest available evidence without inventing a missing scene. Its composition escalates with the argument instead of repeating a card or three-column character template four times.

**Reconsider when:** Accepted source art changes an event's canon, or a later celebration scene proves the bronze, gold and homemade-medal close clearly enough to strengthen the final movement.
