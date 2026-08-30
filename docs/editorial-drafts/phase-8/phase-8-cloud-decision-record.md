# Phase 8 Cloud editorial-room decision record

**Status:** Cloud editorial discovery active. Current rendered homepage inspected on 30 August 2026.

This is the durable answer log and final handoff surface for Phase 8 homepage evidence choreography. It records coherent decisions and rejected alternatives as the room progresses. It is not an implementation plan.

## Current rendered evidence

The room inspected the deployed `/` route after hydration rather than treating the 22 August specification snapshot as rendered truth.

The current page still contains the old hero, shuffled mixed feature deck, separate three-project case-study grid, working-principles cards, recent-writing feed and self-conscious portfolio close. The stronger Phase 7 and 7A content now makes those older homepage decisions look materially weaker than the routes they point to.

Observed defects and pressure points from Harley's rendered-page review:

- `I build reliable agentic systems.` is too bold, too narrow and reads like an AI-written positioning claim.
- The hero's `silly comics` reference currently writes a cheque the page does not cash. If that phrase survives, `silly comics` itself should link to `/patch`.
- `SELECTED / SHUFFLED ON ARRIVAL` and `The order changes. Every project is still here to inspect.` expose implementation/editorial scaffolding as reader copy.
- The shuffled feature surface no longer has an automatic claim to homepage space. Its original job was to push `the best stuff` first; after the later portfolio phases, all admitted homepage material should already clear that bar.
- `Systems with edges`, `How I keep the work honest`, the principle-card language and `building in public` read as AI-shaped connective or virtue copy rather than useful evidence.
- The rendered Agentic Learning Lab entry in the fixed project grid is visibly misformatted.
- `Yes, this is also a portfolio.` and its supporting close are rejected as self-conscious portfolio scaffolding rather than useful professional navigation.
- SPA route navigation currently appears to retain the prior page's vertical scroll position on a new route, so a link followed halfway down one page can land the reader halfway down the next page. That is a direct finish defect.

The route code supports Harley's observation as a structural gap rather than a visual fluke: the app uses a `createBrowserRouter` data router and the route shell is currently only an `Outlet`; there is no explicit route scroll-restoration/reset or route-focus layer in those seams.

## Adversarial opening assessment

### Plausible £ value

**Current homepage: about £6k of a £10k target.** The typography, palette, owned project evidence and surrounding site depth are materially better than that number, but the homepage discounts them through generic connective prose, repeated evidence, exposed scaffolding, conventional portfolio architecture and unfinished navigation behaviour.

A genuine recomposition rather than a polish pass can plausibly reach the **£9k-£10k** range if the finished surface feels like one authored publication object, preserves the strength of the destination routes and removes cheap SPA/navigation tells.

### Weary hiring manager

The current first ten seconds identify `FULL-STACK SOFTWARE ENGINEER / AGENTIC SYSTEMS`, then immediately narrow the proposition to `I build reliable agentic systems.` That asks the reader to accept a large claim before seeing consequence. The shuffled surface, repeated project grid and declarative principles then make the reader do too much assembly before the professional case becomes safe to forward.

### Cynical principal architect

The current page says too much about desirable engineering qualities instead of exposing the decisions that prove them. Marketplace, Wild Bunch, Learning Lab, Patch, the essays and the Phase 7A outcome account contain stronger receipts than the homepage gives them credit for.

## Settled hierarchy and evidence decisions

1. **The current hero thesis is rejected.** `I build reliable agentic systems.` must not survive as the homepage's governing claim.
2. **Reader-facing copy must not explain the shuffle mechanism.** The current shuffle labels/explanations are removed rather than rewritten into nicer implementation commentary.
3. **If the hero retains `silly comics`, those words link directly to `/patch`.** A Patch reference should cash itself at the point of mention.
4. **The current principles section does not survive.** Its useful ideas belong in inspectable evidence, not cards describing Harley's virtues.
5. **`building in public` is not useful homepage positioning.** Publication is observable; it is not itself evidence of engineering quality.
6. **The self-conscious portfolio close does not survive.** The professional route should simply reach About, CV, availability and contact.
7. **The rendered page is the design evidence for this room.** Post-7A content and current visual/interaction defects may override assumptions that were reasonable in the 22 August snapshot.
8. **The first fold is an evidence-routing contract, not the whole sales argument.** It establishes Harley Bartles as a full-stack software engineer, gives one concrete reason to believe his responsibility extends beyond straightforward implementation, and makes substantive proof easy to enter.
9. **Each human persona gets its first important question answered in the fold, with proof no farther than one deliberate click or one natural scroll.** The hiring manager needs a defensible professional signal; the architect needs an obvious route to inspectable judgement.
10. **The £ lens is a quality gate, not a third public audience.** The page must satisfy both human routes without visibly rendering the rubric.
11. **The stable first-fold claim should lead with professional consequence rather than an isolated architecture claim.** The Phase 7A Access outcome account is the strongest cross-lens source.
12. **About is the canonical proof route for that professional claim but must not be the only onward path.** The homepage must also expose direct technical/editorial evidence without forcing every reader through About.
13. **About is a valid evidence node, not a cul-de-sac.** The rendered route contains Access ownership/outcomes, CV/contact, a route into `Why ADRs?`, the four independent project case studies and the persistent global navigation.
14. **The proof choreography is dual-path.** Hiring-manager curiosity can follow the stable professional claim into About; architect curiosity can enter project/writing evidence directly. Either path can continue into the other evidence family.
15. **Homepage features use earned pull-excerpts, not mini case studies and not empty teasers.** If a project, essay or Patch story receives homepage space, the excerpt carries enough of the thing itself to earn the reader's click: a real question, decision, consequence, tension, artefact, falsifier, line or visual that demonstrates why the destination is worth opening. The excerpt stops before it becomes a compressed duplicate of the full route. `Title + vague proposition + CTA` is below the bar; retelling the whole argument is also below the bar.

### Earned pull-excerpt test

A homepage excerpt survives only when all of these are true:

- it is recognisably sourced from the destination's actual substance rather than newly invented marketing copy;
- it gives the reader a concrete reason to care before asking for the click;
- it carries enough context that the fragment is honest outside the full route;
- it preserves the destination's strongest angle rather than flattening every feature into the same template;
- the full route still has significant explanatory, technical or narrative value left to deliver;
- removing the excerpt would make the click materially less earned, while adding more would start duplicating the story.

The exact excerpt length is therefore story-owned, not component-owned. A code/architecture case may earn its click with a decision plus a falsifier; an essay may need a short argumentative passage; Patch may earn it through a visual beat plus takeaway. Phase 8 should not force equal word counts or identical preview furniture across unlike material.

## First-fold rubric

The first fold must satisfy all of these without exposing the rubric as page copy:

- Harley Bartles is legible as a full-stack software engineer, not an `agentic systems` specialist whose identity stops there.
- One bounded, consequence-bearing signal suggests senior-level ownership or judgement without relying on generic adjectives.
- The hiring manager can reach evidence that makes forwarding Harley defensible within one click or one scroll.
- The architect can reach evidence containing decisions, trade-offs, costs, correction history, falsifiers or other inspectable engineering substance within one click or one scroll.
- Every prominent claim has an obvious place where it can be verified or qualified.
- About is not mandatory transit for the rest of the portfolio.

A useful acceptance test is: after the first fold, neither human persona should wonder `where would I even go to verify that?`.

## Settled art direction

16. **The homepage is the stylistic crescendo of the site.** Interior routes keep the restrained ink-on-paper editorial grammar; `/` is the one place that grammar is allowed to move, fold, layer and reveal itself theatrically.
17. **The homepage amplifies the existing visual language rather than inventing a second brand.** Warm paper, ink, copper punctuation, deliberate dark inserts, Fraunces/Source Serif/Fira Code, asymmetry and project-native media remain the source material.
18. **The leading exploration is a fully literal digital publication.** Phase 8 should push the metaphor past the safe midpoint first, then pull back from observed excess rather than pre-emptively diluting it.
19. **Publication-like motion is in scope when it carries hierarchy.** Page folds, turns, layered sheets, inserts and reveals may carry the reader between publication states. Motion must not become autoplay decoration, scroll-jacking or a prerequisite for comprehension.
20. **The £10k bar rejects conventional portfolio UI as the main evidence surface.** Card grids, tabs, filters, chips and link directories may be usable but still fail the target feel if they read as `some guy's personal website`.
21. **The evidence chooser is an information architecture, not necessarily a visible chooser control.** The composition itself should let readers recognise the kind of proof they care about.
22. **The homepage scroll choreography uses recognisable publication spreads rather than one continuous morphing scroll trick.** Spreads provide clearer editorial pacing and natural places for different kinds of evidence to receive distinct treatment.
23. **The homepage is the publication's front matter.** The metaphor is a design aid, not a literal content checklist: cover, contents, foreword, frontispiece or prologue are useful ways to think about functions that orient the reader before `here is the story`. The homepage's job is to establish identity, stakes, orientation and routes into the work. Earned pull-excerpts may carry real substance, but they exist to make entry into the story worthwhile rather than to retell it.
24. **Do not marry the metaphor.** If a literal book convention hurts hierarchy, comprehension, responsiveness or evidence access, the product need wins. The metaphor supplies coherence, not handcuffs.

## SPA and navigation contract

25. **Crossing the home/interior boundary is part of the art direction.** Leaving `/` for an interior route should feel like opening the publication; returning to `/` should feel like closing it.
26. **Interior-to-interior navigation remains ordinary and trustworthy.** Projects, Writing, Patch, About, CV and deep routes should use normal navigation semantics; browser history and deep links remain authoritative.
27. **Do not manufacture navigation history.** A direct deep link to an interior page does not perform a fake book opening from a homepage the visitor never saw.
28. **Reduced motion preserves the relationship without requiring the physical effect.** The same destination, source order, focus and proof paths must work when folds/turns are suppressed.
29. **New-route navigation must not strand the reader at the previous route's scroll offset.** A normal push/replace navigation to a new non-fragment route arrives at the destination's beginning. A deliberate fragment route lands on its target. Browser Back/Forward may restore the prior history entry's scroll position where that is the expected browser behaviour.
30. **Route transitions must finish in a correct document state, not merely a pretty visual state.** The opening/closing animation cannot win over destination scroll, focus, history or accessibility semantics. Phase 8 should include the scroll/focus behaviour because it is touching the same route boundary and the current defect visibly loses finish value.

## Public copy and evidence boundaries

No replacement hero copy is approved yet.

The Phase 7A professional outcome account is the bounded source for the first-fold professional signal. Available evidence includes end-to-end Access Checks ownership, the `No source capture, no success.` production invariant, the downstream no-charge consequence and the outcome that the work enabled two additional integrated paid checks. Phase 8 must not invent metrics or expose private topology.

About remains the canonical full professional treatment; the homepage should compress and route, not reproduce it.

Homepage pull-excerpts should preferentially reuse or closely compress already-owned project/article language, evidence and native imagery. New connective copy may orient the reader, but it must not replace a stronger source fragment merely to make every spread sound alike.

## Randomness / feature interaction

The approved specification still assumes session-stable random selection plus manual feature controls. That assumption is now under material challenge.

The matured portfolio no longer has an obvious `best stuff versus the rest` problem, and the emerging evidence-landscape/front-matter model can expose breadth simultaneously. Randomness therefore has to earn a specific reader benefit that authored composition cannot provide. If it cannot, the protected randomized-deck default and related Phase 8 selection contract should be explicitly amended rather than preserved through inertia.

## Rejected alternatives

- Keep the current hero claim because it is concise.
- Keep shuffle-explanation copy so visitors understand the UI.
- Retain the principles section with improved wording.
- Keep `building in public` as a credibility signal.
- Keep the self-conscious portfolio close.
- Fully prove seniority for every audience inside the first fold.
- Render separate hiring-manager and architect messages.
- Make About the single first-fold CTA.
- Avoid About merely because it is a professional page.
- Express the evidence landscape primarily as a conventional card grid, tab set or category filter.
- Keep the homepage as visually static as the interior routes for consistency.
- Pre-emptively tone down the paper metaphor before testing it.
- Animate every SPA route to maintain the book metaphor.
- Fake a book opening on direct deep links.
- Treat the publication metaphor as a requirement to reproduce literal print front-matter conventions whether or not they help the reader.
- Accept cross-route scroll-position leakage as normal SPA behaviour.
- Use empty teaser copy that asks for a click before showing why the destination deserves it.
- Put condensed case studies or essay summaries on the homepage until the destination has little left to add.
- Force unlike projects, essays and Patch material into equal-length preview components for visual consistency.

## Unresolved judgments

Work one consequential decision at a time:

1. settle the exact first-fold professional claim and how much of the Access consequence belongs in the fold versus behind About;
2. settle the individual front-matter spreads and which proof angles must be legible in the first post-cover movement;
3. settle whether randomness/manual feature change still earns any role;
4. settle the final Patch, writing and professional-route choreography;
5. settle exact copy only after hierarchy is stable;
6. reconcile narrow, keyboard, reduced-motion, missing-media, route-focus, route-scroll and transition-failure behaviour at design level;
7. classify material spec drift and required protected-default amendments.

## Baton

**Blocked — Cloud editorial discovery is still active.** Local Sol must not write the JIT implementation plan or implement the homepage until Harley explicitly closes this room and this record is reconciled to a final `Ready for local planning` or `Blocked` handoff.
