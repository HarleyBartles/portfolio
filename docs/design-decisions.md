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

## 2026-08-24: Lawful Heist is a recruitment dossier

**Context:** The Lawful Heist source has a strong six-character crew, a folder that records their recruitment and only sparse location art for the eventual vault work. A uniform profile grid would reduce the crew to cards, while inventing a complete heist would make the portfolio promise scenes the evidence cannot support.

**Decision:** Tell the recruitment journey in the order the plan needs the crew: provenance, pressure, authority, decision, recovery and audit. Let portraits with real environments establish each character's visual field, then overlap restrained copy panels and assent markers where the scene has room. Keep Receipt contained and quiet. Give Rollback the only full action breakout and enough space to sit at the upper edge of plausible agent scale.

**Consequence:** The page has comic-book energy without literal speech bubbles, a repeated panel template or a fabricated vault sequence. The completed folder closes the recruitment argument, while the engineering case study remains a separate account of how the work is produced.

**Reconsider when:** Accepted vault or pitch scenes tell a stronger complete adventure, a character panel obscures rather than clarifies its evidence, or responsive overlap compromises reading order, contrast or character scale.

## 2026-08-24 - Learning Lab is an annotated engineering field manual

**Context:** The Learning Lab case study needs to prove experienced engineering judgment made teachable. A venue-plan prop from one connector exercise couldn't carry that argument, while a wall of generated diagrams would replace exact curriculum evidence with decoration.

**Decision:** Keep the curriculum atlas, learning loop, lab promotion path and experiment mechanics as semantic HTML. Use three restrained editorial scenes to lend physical weight to inspection, safe breakage and the transfer of domain authority. The static learning loop overlays a working inspection bench, course folios remain unequal because Course 1 is mature, and no venue-plan showcase remains.

**Consequence:** Exact meaning survives narrow layouts, zoom, missing images and assistive technology. Generated imagery has a stated evidential job, complete custody and no claim to document a delivered session.

**Reconsider when:** An image becomes decorative, the atlas overwhelms the engineering-judgment story, current delivery creates stronger authentic evidence, or the semantic structures stop surviving narrow and zoomed use.

## 2026-08-26 - Pull quotes may enter the editorial margin

**Context:** Why ADRs? established a three-part pull-quote rhythm inside a 70-character reading column. On wide screens, keeping every quote inside that same measure left the surrounding canvas visually unused and made the quotes feel like decorated paragraphs rather than changes in editorial pace.

**Decision:** Keep prose inside the shared reading measure. On authored articles that earn the treatment, allow pull quotes to extend rightward into the editorial margin at wide viewports, then return them to the prose width before that breakout risks crowding or overflow. Treat Why ADRs? as the first design seed, not an automatic rule for every article.

**Consequence:** Pull quotes can make asymmetrical whitespace active without widening body copy or introducing a permanent sidebar. A later site-wide polish pass can propagate, consolidate or revise the grammar after comparing it across the publication.

**Reconsider when:** The breakout weakens section hierarchy, creates an awkward line length, competes with nearby evidence, overflows at supported widths, or repeated use makes distinct articles feel templated.

## 2026-08-29 — One build-time public identity, with a named fallback

**Decision:** The portfolio owns its public origin and base path in one tracked
site profile. The custom domain is the active canonical identity;
`github.io/portfolio` remains an explicit rebuild profile for rollback. The
browser hostname never chooses metadata, routes, or copied links.

**Why:** A canonical is a public claim, not a runtime guess. One profile lets
Vite, client metadata, static route documents, sitemap, robots and deployment
checks make the same claim, while keeping a blocked custom-domain activation
recoverable without a cross-language search-and-replace.

**Consequences:** GitHub Pages settings, DNS, TLS and social-preview caches
remain separate proof surfaces after deployment. `www` redirects to the apex;
the fallback profile is not a second indexed identity.

**Reconsider when:** The hosting architecture changes materially. Do not add
runtime host branching merely to support another preview environment.

## 2026-08-29 — Shared editorial grammar is component-owned

**Context:** The portfolio's authored visual language relies on recurring
editorial treatments, but a global selector retained assumptions from an older
About-page DOM shape. It produced an overlapping conversion label and a second
unrelated story rule, while an earlier implementation also referenced spacing
tokens that did not exist.

**Decision:** Keep CSS custom properties as the single token-value source.
Use a typed styled-components mirror for new shared editorial primitives and
the Phase 7A professional-surface layouts being actively changed. The first
primitive is the canonical pull quote. Existing Sass remains until a surface
has a concrete change reason; this is not a wholesale migration.

**Consequence:** Canonical treatments travel with named components, and a
different treatment becomes a visible local decision. Typed theme access and
the repository-wide token-reference test make invented token names easier to
catch. Browser layout checks remain necessary because declared styles cannot
prove text wrapping or geometry.

**Reconsider when:** The lazy styled-components boundary breaches the existing
performance budget, shared primitives become a constraint on a genuinely
distinct case-study art direction, or a future CSS architecture supplies the
same ownership and testability with less runtime cost.

## 2026-08-30 — AI-default visual resemblance halves the premium valuation

**Context:** Current design culture has documented a recognisable AI-generated
website cluster: cream or beige grounds, rusty-orange accents, large serif
display type, highly tracked labels, ticker-like strips and repeated rounded
outlined panels. The portfolio overlaps several of those cues while presenting
AI-assisted work as something governed by human judgement and taste.

**Decision:** Treat a credible cultural reference identifying the delivered
visual language as an AI-design tell as an automatic 50% valuation penalty. An
otherwise £10k site is £5k. Warm paper, copper, large serif type, tracked labels,
ticker strips and rounded-panel furniture are no longer protected defaults.
Audit and redesign the non-home routes first; homepage design and implementation
remain blocked until those routes establish a deliberate composed system that
Harley accepts.

**Consequence:** Strong implementation, accessibility and editorial evidence do
not cancel this credibility failure. The remediation must derive its system from
the portfolio's material and purpose rather than mechanically invert the tell
list. Settled homepage hierarchy and evidence decisions remain deferred input,
not permission to prototype fold one against the questioned grammar. Preserve
the before state, rejected shortcuts, material design decisions, implementation
rounds, rendered proof, validation and Harley's final acceptance as a durable
repository evidence chain. A later article may use that chain to test claims
about one-pattern AI site generation; it must not overstate what the completed
record proves.

**Reconsider when:** The remediated non-home system has rendered evidence across
representative routes, survives the premium and AI-default falsification lenses,
and Harley explicitly accepts it as the visual contract for resumed homepage
work.

## 2026-08-31 — Bounded evidence diagrams may use one quiet secondary token

**Context:** The Wild Bunch UUID allocation needs three logical groups to remain
quickly distinguishable without turning the diagram into project theming. The
green in the current development map is not durable Wild Bunch palette authority,
while a one-off local colour would have no place in the site's style contract.

**Decision:** `evidence-group secondary` (`#B8C2AD`) is a shared semantic token
for one subordinate logical group inside a bounded evidence diagram. It is not a
site accent, status colour, project identity colour or recurring component
treatment. Harley accepted this narrow role after reviewing the rendered UUID
allocation on 31 August 2026.

**Consequence:** Evidence can express a secondary classification without
borrowing temporary project UI colour or inventing an ungoverned local value.
The token must retain sufficient contrast on its evidence surface and must not
spread merely to make unrelated layouts feel coordinated.

**Reconsider when:** A project-owned palette can truthfully carry the distinction,
the grouping remains equally clear without colour, contrast fails, or the token
starts appearing outside bounded evidence relationships.

## 2026-09-02 — Deterministic selected homepage editions

**Context:** The accepted Phase 8 homepage is an authored sequence whose Writing and Patch movements need to change over time without returning to the obsolete shuffled-deck architecture or scattering cross-section copy through the shell.

**Decision:** Render one pinned, deterministic homepage edition made from typed Writing and Patch descriptors. Each destination feature owns its route, inward label, summary or presentation data, and the incoming teaser that the preceding movement displays. `HomePage` selects the edition and connects adjacent descriptors; it does not own feature copy or rotation policy.

**Consequence:** The homepage has a stable editorial reading order and no mount-time randomness. A future edition can replace either feature without rewriting the shell, while tests can prove that destination-owned teaser copy travels with the selected descriptor.

**Reconsider when:** There are enough accepted editions to justify a deliberate, testable rotation policy with equally strong accessibility and editorial continuity. Until then, selection remains pinned.

## 2026-09-03 — The homepage Patch marque uses the cliff-drop series lockup

**Context:** The Specialists movement opened with the standalone PATCH wordmark even though the movement introduces an Adventures of Patch series title. After approving the cliff-drop construction, the solo mark no longer carried either the series relationship or the restrained “falling into another adventure” story.

**Decision:** Replace only the small solo PATCH marque in the homepage Specialists title field with the canonical cliff-drop Adventures of PATCH lockup. Preserve the standalone PATCH asset and the large The Usual Specialists wordmark. Render the cliff lockup from its indivisible public SVG through the base-path-safe brand helper, keep it at or above the established 132 px checked width, and inherit colour from the host composition.

**Consequence:** The movement now introduces the series before the specific adventure, strengthening the hierarchy without changing the scene, copy, destination, or semantic fallback. The before state remains in Git history; focused wide and portrait lockup snapshots are the accepted after-state evidence. Component tests pin the asset route and accessible label.

**Reconsider when:** Another homepage Patch edition is selected, the lockup fails at a supported viewport or zoom level, the series name becomes redundant in context, or the cliff-drop narrative competes with the adventure title.
