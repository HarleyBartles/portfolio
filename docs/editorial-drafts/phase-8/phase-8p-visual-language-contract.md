# Phase 8P visual-language contract

**Status:** Accepted by Harley on 30 August 2026. Phase 8P design discovery and operational-skill TDD are complete. The non-home implementation plan is ready; homepage Phase 8 remains blocked.

This is the normative synthesis of the accepted Phase 8P visual language. The earlier checkpoint and stage decisions remain useful evidence and rationale; this file is the concise implementation authority for the whole non-home system.

## Governing direction

The visual territory is **Working Engineering Record**: serious engineering, visibly handled by a human.

Authorship comes from judgement, revision, evidence, provenance and custody. It does not come from decorative signs of hand-making. The site must avoid both recognisable generative-editorial defaults and performative anti-AI craft theatre.

Every conspicuous house choice should be explainable from Harley's actual material, project structure, evidence or editorial job.

## Authority order

For non-home implementation and review:

1. this visual-language contract is normative for the wider visual system;
2. the [typography contract](./phase-8p-typography-contract.md) is normative for type roles and tokens;
3. the stage decisions remain normative where they add detail: [evidence custody](./phase-8p-evidence-custody-decision.md), [rhythm and density](./phase-8p-rhythm-density-decision.md), and [shell/navigation](./phase-8p-shell-navigation-decision.md);
4. the [integrated route proof](./phase-8p-integrated-route-proof.html) demonstrates how the accepted rules can coexist, but it is not a production template or component library;
5. the future `applying-portfolio-visual-language` skill must operationalise this authority without duplicating or weakening it;
6. `applying-portfolio-typography` remains the operational authority for typography and should be reused rather than reimplemented inside the wider visual skill.

If these sources appear to disagree, stop and raise the mismatch rather than inventing a component-local answer.

## Typography

Typography remains exactly as settled in the dedicated contract.

- Source Sans 3 is the shared site voice: site display, projects, case studies, About, navigation, metadata, captions and ordinary non-article prose.
- Source Serif 4 is the authored-longform article register only.
- Source Code Pro is genuine technical material only.
- Serif is not a prestige accent. Mono is not engineering decoration.
- Meaningful metadata normally stays at the accepted 14px floor.

## Shared substrate

The default site is light.

**Shared substrate: cool mineral `#E6EAEB`.**

It is neutral ground, not brand colour. It should remain visibly dominant across non-home routes. Default-dark remains rejected as an unearned cyber/dev-tool shorthand; a future optional user preference may be considered only if it preserves this contract.

## Project colour

Project identity comes from project-native colour, not a universal house accent.

**Default authority: bounded bleed.** Project-owned colour may leave an artifact and influence a finite, meaningful area of the composition. The field must visibly terminate and return to the mineral substrate.

`Bounded` describes authority, not shape. Do not turn this into a repeated tinted-rectangle component.

Do not default to either extreme:

- project colour trapped entirely inside artifacts, making work look inserted into a neutral host;
- route-wide atmosphere or theming, making each project a separate microsite.

Patch contributes controlled teal, calm competence, bounded workflow, readable hierarchy and deliberate consistency. It does not contribute mascot geometry, cartoon shading, rounded-card language, teal title bars or invented Patch-like imagery.

Wild Bunch contributes earth colour, spatial modularity and constructed-world structure. It does not make the portfolio Western-themed. Development placeholders such as the current yellow marker and olive trail-head blocks are not palette authority.

## Spatial grammar

**The rectilinear grid is the grammar. Alignment is the default.**

Evidence or project-owned material may break or reorganise one local grid relationship when its content genuinely earns the interruption. Breaks must remain bounded, legible and rare. There is no quota for asymmetry and no decorative `interesting layout` slot.

### Rail + field

Rail + field is a sanctioned special case, not a route skeleton.

Use a rail only when a narrow, semantically distinct information stream genuinely benefits from staying beside broader material: chronology, state, classification, constraints, custody or comparable context.

A rail must:

- carry information, not merely make the page more interesting;
- belong only to the span it serves;
- avoid stealing width the primary material needs;
- avoid becoming a branded colour stripe; and
- collapse into ordinary semantic source order at narrow widths.

If removing the rail loses only composition and no information architecture, do not use it.

## Evidence and imagery custody

**Artifact-first is the default.**

Evidence keeps its source-native visual boundary. The portfolio establishes custody immediately around it through adjacency, ordering, captions, provenance, status and qualification rather than laundering unlike receipts into one universal component.

Do not create a shared evidence header/body/footer module simply for consistency. Code, screenshots, diagrams and documents are allowed to remain recognisably different kinds of evidence.

A local custody seam may be used when provenance or qualification is independently important enough to deserve parallel reading and doing so does not damage the evidence.

Purposeful cropping is allowed when surrounding product chrome, empty field or unrelated UI is not part of the evidence. Preserve original source custody and make the crop's editorial purpose clear.

For Wild Bunch, live browser captures may be commissioned from explicit reproducible seed/setup state. Harley drives the game; Cloud or the implementation worker may capture and crop the required evidence. Preserve repo revision, seed/setup state, raw capture and derivative-crop custody when an asset is promoted into the portfolio.

The approved Wild Bunch image-edge primitive is a sparse, irregular tintype/old-photographic-plate density-loss edge. It is project-specific, not a site treatment, and must not become a clean CSS feather, torn paper, burnt map, fake sepia or scrapbook effect.

## Rhythm and density

**Space expresses relationship.**

Material belonging to one claim may form a tighter reading cluster. A real change of argument, subject or story movement earns more separation.

Project/evidence-heavy routes may tighten proof around the claim it qualifies. Authored longform retains a stable reading pulse rather than inheriting project-page compression. Professional/heterogeneous routes vary cadence according to semantic grouping rather than uniform module spacing.

Rules are subordinate to negative space. Use a rule to reinforce a real boundary, not to manufacture hierarchy every time more separation is wanted.

Exact spacing values are implementation/refinement decisions unless they change the perceived character or semantic grouping of the page.

## Shared shell and navigation

**The masthead owns site identity and primary navigation only. Current-route context belongs to the page.**

The shared shell uses one identity/navigation flow. It must not split into folio, breadcrumb, route-context or split-index rows merely to look publication-like.

Primary routes remain Projects, Writing, Patch, About and CV, with the HB mark linking Home. Ordinary active state may reinforce the current route family.

The accepted integrated proof keeps visible `Harley Bartles` beside the HB mark. This identity cue survives desktop, narrow and 200% proof without requiring additional shell furniture and is therefore part of the accepted quiet shell.

At narrow widths the same navigation flow may wrap naturally. Do not invent a second responsive hierarchy unless implementation proof exposes a real comprehension or accessibility problem.

Existing behaviour remains fixed: authoritative deep links/history, correct top or fragment arrival, expected Back/Forward scroll restoration, and correct focus/accessibility state. Direct deep links must not manufacture a homepage transition the visitor never experienced.

## Human intervention boundary

Interior routes do not perform humanity through decorative disorder.

Do not introduce faux handwriting, scribbled margins, tape, scrapbook collage, torn-paper tricks, fake corrections or generic `handmade` texture.

Human interventions should be extremely sparse and evidence-led: likely only a few across the entire non-home site, with most routes containing none. A real correction, diff or plain-language technical annotation may work because the content earns it. If an intervention is predictable as a component slot, it has become a gimmick.

Inside the book, humanity appears as revision and judgement. The later homepage may earn more expressive freedom, but it consumes this interior grammar rather than replacing it.

## Responsive and accessibility contract

The accepted visual language must survive real content at desktop, narrow/mobile and 200% browser zoom.

Implementation must preserve:

- readable hierarchy without clipped or colliding display text;
- ordinary semantic source order when desktop rails/asymmetries collapse;
- no horizontal page-level overflow caused by the visual system;
- evidence that remains readable and appropriately scrollable when its native content genuinely requires it;
- visible keyboard focus and ordinary link semantics;
- accepted metadata floors and type roles;
- contrast sufficient for text, rules, captions, active navigation and project-colour bleed; and
- sensible missing-media behaviour rather than decorative placeholders that become the design.

## AI-convergence / valuation gate

The hard Phase 8 valuation rule remains active: if a credible cultural reference can identify the delivered visual language primarily as a common AI-design aesthetic, perceived value is halved.

The remedy is not mechanical inversion. The accepted system passed the design-room gate because its identity is explained by material custody, semantic typography, project-native colour, disciplined geometry and selective evidence-led interruption rather than by the cream/rust/huge-serif/tracked-label/rounded-component cluster or by an anti-AI collage cliché.

Implementation must preserve that provenance. A technically compliant result may still fail if local composition turns the contract into a recognisable generic template.

## Integrated proof outcome

The accepted system was composed with real material across three materially different route families:

- Wild Bunch as a project/evidence-heavy route;
- `Why ADRs?` as authored longform;
- About as a professional/heterogeneous route with one earned semantic rail.

All three were inspected at desktop and 390px narrow states, then re-inspected at actual 200% browser zoom. No visual-language contradiction, hierarchy collapse, route-wide overflow, shell failure or evidence collision justified the single allowed substantive correction loop.

The visible `Harley Bartles` masthead identity survived the integrated proof and is accepted.

One old Dustwell specimen crop still includes a small amount of surrounding application surface. That is an artifact-preparation defect, not a contract failure. Production Wild Bunch evidence should use a correct town-hub crop or a better reproducible live capture under the custody rule above.

Harley accepted this visual contract after the integrated proof.

## Required operationalisation before visitor-facing implementation

Local Sol must add a repository skill, expected name **`applying-portfolio-visual-language`**, before visitor-facing non-home implementation begins.

The skill is not the unit under test by itself. As with the earlier typography work, the unit under test is the **whole authority stack**: repository policy/guidance + the Phase 8P typography contract/skill + this visual contract + subordinate decisions/proofs + the new operational skill.

Use TDD pressure scenarios:

1. freeze RED at the pre-Phase8P baseline `8f6028a0bd9ca4d2021d6b1b9d3a628dac570638`, deliberately exposing **none** of the Phase 8P typography or wider visual-language guidance/skills;
2. do **not** use PR #45 as RED for this wider test, because PR #45 already contains Phase 8P guidance and would test only the delta rather than the whole stack;
3. give fresh isolated workers realistic art-direction pressures and record what they actually recommend without inventing failures;
4. write the minimum operational skill needed to route workers through the accepted authority and close observed leaks;
5. rerun the same substantive pressures GREEN with the complete current stack available, including the existing typography authority and the new visual-language skill;
6. preserve negative controls where RED already behaved correctly;
7. perform one loophole review and do not overfit the skill to the wording of the scenarios.

The earlier typography TDD remains useful prior evidence, but this wider test deliberately re-runs the complete Phase 8P stack end to end.

The detailed baton for that test is recorded in [`phase-8p-visual-language-skill-tdd-brief.md`](./phase-8p-visual-language-skill-tdd-brief.md).

The completed whole-stack test is recorded in [`phase-8p-visual-language-skill-tdd.md`](./phase-8p-visual-language-skill-tdd.md). It closes the operational guard but does not count as visitor-facing implementation or rendered acceptance.

## Baton

**Ready for local non-home implementation planning.**

Local Sol prepared the JIT plan after the visual-language operational skill and whole-stack RED/GREEN pressure test reached GREEN. Visitor-facing non-home implementation may proceed only through that plan and this accepted contract.

The homepage remains blocked until the non-home remediation is implemented, rendered in a browser, checked against this contract and the valuation gate, and accepted by Harley. Only then does Phase 8 resume on `/`.
