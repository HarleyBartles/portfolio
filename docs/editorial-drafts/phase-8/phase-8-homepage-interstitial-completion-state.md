# Phase 8 homepage interstitial completion state

**Status:** Settled internal release boundary. This is an implementation/planning constraint for Phase 8, not visitor-facing copy.

## Completion target

Phase 8 does not need to wait until every currently eligible Patch adventure has a bespoke homepage composition.

The first stable homepage may ship as a complete, truthful homepage with **Lawful Heist as the only production homepage-selectable Patch adventure**.

This is not a temporary-looking visitor experience. To a visitor the homepage is simply finished. `Interstitial` describes the internal roadmap state only: the homepage system is complete while the catalogue of bespoke Patch homepage treatments is intentionally extensible.

## Selector behaviour in the first stable release

Build the real Writing/Patch edition-selection architecture now rather than hard-coding a temporary Heist-only homepage branch.

For the first stable release:

- the canonical site-wide edition mechanism is real;
- article-normalised selection is real;
- the approved compatibility registry is real;
- the Patch resolver is real;
- the production Patch treatment registry contains only **Lawful Heist**;
- therefore every valid production homepage edition resolves the Patch movement to Lawful Heist;
- only writing pieces with an approved, non-cannibalising compatibility record with Lawful Heist are homepage-eligible in this release.

Do not infer compatibility at runtime. Do not widen the initial writing pool merely to create variety. The Writing route remains the complete writing collection.

The implementation should still prove multi-Patch behaviour with fixtures/tests so that a one-Patch production registry does not accidentally become a one-Patch architecture.

## Patch homepage eligibility has two gates

A substantial public Patch route is not automatically production-homepage-selectable.

A Patch adventure enters the homepage selector only after clearing both gates:

1. **Editorial eligibility** — the adventure contributes a distinct homepage job and has at least one valid Writing compatibility record without duplicating the opening, Marketplace, Wild Bunch or another fixed homepage movement.
2. **Presentation eligibility** — the adventure has its own authored homepage treatment that has been visually reviewed and accepted across the responsive/accessibility conditions required by the site.

A route may be excellent, complete enough for public viewing and discoverable through `/patch` while still being absent from the homepage selector because its bespoke homepage treatment has not yet been authored and accepted. That is not a quality downgrade of the adventure.

Lawful Heist is the first adventure being brought through the presentation gate.

## Subsequent Patch treatment loop

After the first stable Phase 8 homepage ships, each additional homepage treatment can be developed as a focused side quest:

1. inspect the public adventure and source-owned visual/copy evidence;
2. identify the adventure-specific homepage composition rather than applying a generic Patch template;
3. produce an isolated browser-reviewable proof;
4. review desktop, intermediate, narrow-mobile, reduced-motion/reflow and missing-media behaviour;
5. revise until the treatment clears the homepage quality bar;
6. perform/update Writing compatibility review;
7. activate the adventure in the production homepage treatment registry.

Adding a new adventure should be editorial/data activation plus its bespoke treatment, not a rewrite of the selector.

## Bespoke responsive art direction

There is no generic Patch homepage visual layout beyond the shared accessible web shell.

Each homepage-eligible adventure owns its own authored treatment. That treatment may use different composition logic at wide, intermediate and narrow breakpoints and may use breakpoint-specific image derivatives when art direction benefits from them.

Responsive design is not required to preserve identical raster imagery across breakpoints. Alternate crops/compositions of the same semantic image may be selected with responsive `<picture>` sources. A materially different depicted story beat should remain a distinct semantic figure rather than being hidden behind one shared image contract.

Shared requirements remain semantic structure, accessible navigation, resilient missing-media behaviour, responsive/reflow correctness, site visual custody, and truthful source/asset custody.

## Current consequence

Until another Patch adventure clears both gates, **Lawful Heist is always the Patch feature on the homepage**.

Writing may still rotate through the canonical edition mechanism, but its production eligibility is constrained to the subset that can share an edition with Lawful Heist without editorial cannibalisation.

The existing compatibility matrix must be rewritten under the settled non-cannibalisation semantics before it becomes runtime authority. Do not silently promote old `why they belong together` prose into a visitor-facing pairing concept.
