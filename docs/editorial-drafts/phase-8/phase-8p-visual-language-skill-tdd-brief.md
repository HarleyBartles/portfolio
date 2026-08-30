# Phase 8P visual-language operational-skill TDD brief

**Status:** Required local closeout after Harley accepted the Phase 8P visual contract. The design room is complete; this brief defines how local Sol must operationalise the contract before visitor-facing implementation begins.

## Goal

Create an `applying-portfolio-visual-language` skill that teaches implementation and review workers how to apply the accepted Phase 8P contract without redesigning it locally.

The skill must be proved with TDD pressure scenarios before it becomes implementation authority.

## Unit under test

The unit under test is **not the skill file in isolation**.

The unit under test is the whole worker-facing authority stack:

- repository-level policy and routing guidance;
- [`phase-8p-visual-language-contract.md`](./phase-8p-visual-language-contract.md);
- the subordinate evidence/rhythm/shell decisions where they add detail;
- the integrated proof as demonstration rather than template;
- the existing typography contract and `applying-portfolio-typography` skill;
- the new `applying-portfolio-visual-language` operational skill.

A GREEN result means a fresh capable worker, receiving the same realistic pressure that caused a RED leak, uses the complete stack to make a contract-consistent decision without requiring Harley or Cloud to restate the rule in the prompt.

## RED fixture

Freeze a repository baseline that does **not** expose the PR #46 wider visual-language authority or the new skill.

Prefer the merged PR #45 typography checkpoint (`3b3527060a9452105af34128ad6bdafe6cac7dba`) as the RED baseline. That keeps the already-proved typography stack constant while withholding the wider substrate/colour/geometry/evidence/rhythm/shell contract we are testing here.

RED workers must not inspect PR #46, its comparison surfaces, integrated proof, final contract or future visual-language skill.

Render representative existing non-home routes from the frozen fixture where visual context helps. Preserve the commit SHA, route, viewport and runtime as durable test fixtures rather than committing piles of temporary screenshots.

Use fresh isolated workers at the same model/reasoning class for RED and GREEN where practical.

## GREEN fixture

GREEN uses the same substantive pressure prompts and equivalent rendered context, but from the accepted PR #46 authority stack plus the minimum new skill under test.

Do not improve the prompt between RED and GREEN by adding the answer. The intervention is the stack.

The new skill should route typography-specific choices through `applying-portfolio-typography` instead of duplicating its rules.

## Pressure scenarios

These are scenario families, not exact magic wording. Local Sol should phrase them as realistic requests a future worker may actually receive. Keep enough ambiguity that the worker has to consult authority rather than pattern-match the expected answer.

### 1. Distinctive project route

Pressure: make Wild Bunch feel much more distinctive, immersive, atmospheric or Western.

Leak to detect: route-wide sepia/ochre theming, Western cosplay, dark/game chrome taking over the route, treating dev placeholders as palette authority, or turning one project into a microsite.

Expected GREEN behaviour: mineral substrate remains dominant; project-native colour may use bounded bleed; Wild Bunch material supplies earth colour/modularity without a global Western theme; project-specific edge treatment remains sparse and evidence-owned.

### 2. Make unlike evidence consistent

Pressure: make screenshots, code, documents and diagrams feel more polished and consistent.

Leak to detect: universal evidence cards, repeated header/body/footer wrappers, universal dark developer surfaces, or forcing every artifact through the same radius/border treatment.

Expected GREEN behaviour: artifact-first custody; source-native boundaries remain visible; shared custody sits immediately around evidence; a custody seam appears only when provenance genuinely benefits from parallel reading.

### 3. Make the layout more dynamic

Pressure: the route feels too rigid or boring; make it more visually interesting.

Leak to detect: decorative asymmetry, repeated overlap/breakout patterns, gratuitous rails, or one `quirky` interruption per section.

Expected GREEN behaviour: rectilinear alignment remains default; interruption must be earned by evidence or information architecture; rail+field is used only when removing the rail would lose useful semantic structure.

### 4. Give every project a stronger identity

Pressure: make project routes immediately recognisable from each other.

Leak to detect: route-wide colour atmosphere, a per-project branded shell, project colour in navigation, or a repeated project-theme template.

Expected GREEN behaviour: identity comes from project-native material, bounded colour authority and selectively inherited project structure while the shared shell/substrate remain stable.

### 5. Make the portfolio feel more human / less AI

Pressure: make the site feel handcrafted, personal or visibly human so it cannot be mistaken for AI output.

Leak to detect: faux handwriting, tape, scribbled annotations, torn paper, faux-grime, scrapbook composition, decorative corrections or other performative anti-AI craft.

Expected GREEN behaviour: humanity is expressed through real revision, judgement, provenance, falsifiers and sparse earned intervention. No decorative anti-AI theatre.

### 6. Make About more premium / editorial / senior

Pressure: make About feel more premium, authoritative or like a high-end editorial profile.

Leak to detect: route-wide Serif prestige styling, cream-paper retreat, pull-quote furniture without semantic cause, excessive rails, or componentised career modules.

Expected GREEN behaviour: About remains Source Sans; variable cadence follows semantic groups; rails carry real chronology/context only; the mineral shell and quiet masthead remain stable. Typography-specific reasoning should route through the existing typography skill.

### 7. Make mobile tighter

Pressure: the narrow layout feels tall or the navigation takes too much room; make it compact.

Leak to detect: splitting shell into new mobile hierarchies, hiding core navigation prematurely, shrinking meaningful metadata, preserving desktop rails/asymmetry at the cost of source order, or compressing longform into dossier density.

Expected GREEN behaviour: same quiet navigation flow may wrap; rails collapse to semantic source order; metadata floors hold; spacing follows relationship; longform keeps reading rhythm.

### 8. Use the proof as a shortcut

Pressure: the integrated proof already looks good; copy its structure/components to accelerate implementation.

Leak to detect: treating `phase-8p-integrated-route-proof.html` as the production template or component library.

Expected GREEN behaviour: the proof demonstrates coexistence of rules only. Worker derives production composition from real route material and contract authority, reusing production primitives where appropriate without copying specimen chrome or layout by default.

## Negative controls

Do not require every RED worker to fail.

Include at least one or two pressures the baseline already handles sensibly if they emerge naturally. Record those as negative controls rather than rewriting the story so PR #46 appears to have invented judgement that already existed.

Candidate controls include:

- preserving keyboard/focus semantics under visual change;
- refusing unreadably small text;
- refusing to rasterise text or bake meaning into decorative imagery.

Use observed behaviour, not desired theatre.

## Minimum skill shape

Write the smallest skill that closes observed RED leaks and routes workers to authority.

It should probably include:

- authority order and required reading;
- inspect real route material before styling;
- classify the visual decision: shell, substrate/colour, geometry, evidence, rhythm, imagery, typography;
- apply the accepted rule rather than create a local visual language;
- route typography through `applying-portfolio-typography`;
- treat comparison and integrated-proof HTML as evidence, not templates;
- verify affected routes at desktop, narrow and relevant 200% zoom;
- verify keyboard/focus, contrast, overflow and missing-media behaviour where relevant;
- stop on an unmapped role, source conflict or genuine contradiction instead of improvising;
- pressure warnings derived from observed RED failures, not a copied list of every contract paragraph.

Do not duplicate the full contract into the skill. A huge skill is harder to maintain and makes authority ambiguous.

## GREEN and loophole review

Rerun the same substantive pressures after the skill is introduced.

For every scenario record:

- RED recommendation/behaviour;
- GREEN recommendation/behaviour;
- whether a real leak was closed;
- whether RED was already acceptable and therefore acts as a negative control.

After the first GREEN pass, perform one loophole review. Amend the skill only for a genuine remaining gap. Do not add prose merely to mirror the test wording or make the skill narrate the expected answer.

## Durable evidence

Create a record analogous to [`phase-8p-typography-skill-tdd.md`](./phase-8p-typography-skill-tdd.md) containing:

- RED and GREEN fixture SHAs;
- routes/viewports/runtime;
- worker model/reasoning setup;
- scenario table;
- concise verbatim evidence for meaningful RED leaks;
- negative controls;
- minimum-skill summary;
- loophole-review result;
- future rendered implementation-proof note.

The final skill should live under `.agents/skills/applying-portfolio-visual-language/SKILL.md` unless repository conventions discovered locally require an equivalent canonical path.

Regenerate any repository skill/index mesh required by local policy.

## Completion gate

This TDD closeout is complete only when the whole stack is GREEN against the unchanged substantive pressures and the skill has not overfit to the test language.

Only after this gate is GREEN may visitor-facing non-home implementation begin.

Phase 8P design itself is already accepted; a failure here is an operational-guidance failure, not permission to silently redesign the visual contract.