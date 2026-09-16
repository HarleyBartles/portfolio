# The Usual Specialists responsive composition architecture design

**Status:** Approved by Harley on 2026-09-16.

**Spec-readiness handoff gate:** 9/10 on 2026-09-16. A planning agent can expand this spec without inventing page/chapter ownership, responsive authority, migration order, validation responsibility, or visual constraints. No unresolved product decision blocks planning.

**Scope:** Reshape the V2 `The Usual Specialists` page architecture so the page can grow from Index and Silk to the full six-specialist cast without making one chapter's responsive needs into route-wide doctrine. Preserve all accepted visual semantics, geometry, assets, accessibility behavior and responsive invariants while cleaning the React/styled-components ownership model.

## Goal

Make `The Usual Specialists` a thin page chassis that sequences independently authored compositions.

The page should not define a shared set of composition breakpoints merely because Index needed those widths when the first chapter was built. Instead:

- the page owns the canvas, substrate, route-wide ambient tokens, opening/nav/chapter order and chapter seams;
- Index owns Index composition thresholds;
- Silk owns Silk composition thresholds, including the legitimate `1200px` recomposition;
- each future specialist owns the thresholds its own composition actually needs;
- navigation owns navigation responsiveness;
- crossing connectors own crossing responsiveness;
- opaque vertical-slice children own their internal rendering contracts;
- parents own whole-child placement, size, scale, rotation and z-order.

The shared architecture is the ownership mechanism, not a global list of responsive width states.

## Why the current responsive model should change

`specialistsResponsive.ts` currently publishes this route-wide vocabulary:

- `320`
- `390`
- `720`
- `900`
- `1400`
- `1600`
- `1920`
- `2560`

Those numbers entered the page contract while Index was the only chapter. They therefore encode Index's first responsive composition as if it were universal route structure.

Silk demonstrates why that does not scale. Silk legitimately changes composition at `1200px`, and it contains other responsive treatments whose meaning is local to Silk. Future chapters may need fewer thresholds, different thresholds, or mostly fluid layout with almost no discrete recomposition.

Coincident numbers do not create shared ownership. If Index and Silk both change at `720px`, each chapter may declare `720px` in its own local responsive contract. Duplicating that number is preferable to coupling both chapters to a global state whose meaning is different in each composition.

## Research basis

The design follows the responsive-layout principles established during the approved web spike:

- use intrinsic and fluid CSS before adding discrete breakpoints;
- use breakpoints when content actually changes composition rather than to model device classes;
- use Grid where two-dimensional track relationships are structural;
- use Flexbox where the relationship is fundamentally one-dimensional;
- keep absolute positioning where an owned art composition genuinely requires controlled overlap and layering;
- use container queries where a composition should respond to its available container rather than global viewport state;
- keep macro page composition separate from local component composition.

Relevant references include MDN's responsive design, Grid/Flexbox and container-query guidance; web.dev's responsive layout guidance; and layout/design-system examples from Carbon, Atlassian, GOV.UK, Every Layout and CUBE CSS.

This research does not require the route to adopt a universal design-system grid. The accepted page is an editorial collage of independently art-directed chapters, not a dashboard that benefits from forcing every chapter onto the same column system.

## Page-level contract

The page owns very little width-responsive composition.

### Supported field

The durable page constraints are:

- **minimum supported width:** `320px`;
- **authored canvas ceiling:** `2560px`;
- **between those limits:** the page chassis is fluid;
- **beyond `2560px`:** the authored canvas remains `2560px` wide and centers in the viewport.

`320px` is a support/accessibility invariant, not a page layout mode.

`2560px` is a physical authored-canvas constraint. It should primarily be expressed structurally, for example through a capped canvas width, rather than by treating `2560` as one member of a broad shared breakpoint taxonomy.

The page does not need global `compact`, `mid`, `default`, `wide`, `expanded` or `ultrawide` composition states.

### Page responsibilities

`UsualSpecialistsPage` owns:

- the route article and visual contract;
- the mineral substrate and route-wide ambient presentation tokens;
- the centered/capped authored canvas;
- the opening composition;
- the chapter navigation;
- explicit chapter order;
- explicit connector order between chapter surfaces.

The desired composition remains intentionally boring at page level:

```tsx
<UsualSpecialistsOpening />
<SpecialistsChapterNav />
<CrossSectionConnector crossing="opening-index" />
<IndexChapter />
<CrossSectionConnector crossing="index-silk" />
<SilkChapter />
<CrossSectionConnector crossing="silk-writ" />
<WritChapter />
```

Future chapters continue the same explicit sequence. Do not introduce a dynamic chapter registry, route-layout DSL or generic composition engine merely to avoid several explicit JSX lines.

The current `IndexMilestoneBoundary` was useful migration scaffolding when Index was the milestone boundary. It should not become permanent page architecture if it has no remaining visual or semantic responsibility. Its removal is allowed only after tests prove that flattening it preserves the accepted result.

## Composition ownership model

The route has several independently responsive composition owners.

### Opening

`UsualSpecialistsOpening` owns its own responsive composition. Opening thresholds do not become page thresholds.

### Chapter navigation

`SpecialistsChapterNav` owns the six-cell navigation treatment and any reflow it needs. A navigation breakpoint is not a page breakpoint.

The known cast is fixed:

- Index
- Silk
- Writ
- Klause
- Rollback
- Receipt

Navigation metadata may be centralized to avoid duplicating names/order/availability, but it must not become a dynamic chapter-rendering registry.

### Crossings

`CrossSectionConnector` owns the responsive treatment of each chapter seam.

A connector may have composition thresholds required to keep rope/lock geometry coherent between its neighboring surfaces. Those thresholds belong to the connector's own contract. They do not become page states and they do not force either chapter to adopt the same local media/query vocabulary.

The seam is the integration boundary. The page only sequences it.

### Chapters

Each chapter is an opaque responsive composition.

- `IndexChapter` owns Index's composition thresholds and its whole internal stage.
- `SilkChapter` owns Silk's composition thresholds and its whole internal stage.
- `WritChapter`, `KlauseChapter`, `RollbackChapter` and `ReceiptChapter` will own their own composition thresholds when built.

A chapter's local responsive vocabulary should use names that describe the composition state rather than device classes where possible.

For example, Silk's `1200px` threshold is meaningful because the composition reconnects/recomposes there. It should be named for that state. The current `SILK_1920_TREATMENT_MEDIA = '(min-width: 1200px)'` is misleading and must be replaced during the cleanup.

A future chapter may independently choose the same numerical threshold. It declares that threshold in its own contract because it owns a different composition decision.

## Container-owned responsiveness

The target architecture uses named inline-size containers for independently authored composition surfaces.

Each chapter should be able to respond to the width actually allocated to that chapter inside the authored canvas rather than depending on route-global viewport state.

Conceptually:

```text
SpecialistsCanvas
  IndexChapter container
    Index composition
  Index-to-Silk connector container
    connector composition
  SilkChapter container
    Silk composition
  Silk-to-Writ connector container
    connector composition
  WritChapter container
    Writ composition
```

Because the chapters currently span the authored canvas, the initial numerical behavior will often match viewport-width behavior. The ownership semantics are nevertheless better, and container-relative units can naturally stop growing when the `2560px` canvas ceiling is reached.

### Migration rule

Do not rewrite every media query to a container query in one mechanical pass.

The migration must preserve accepted rendering first. Move responsiveness owner by owner:

1. establish the owner's named container;
2. reproduce the current accepted treatment at its existing thresholds;
3. verify browser geometry and visual regressions;
4. only then simplify fluid formulas or collapse redundant thresholds where evidence shows they do not represent a real composition change.

Viewport media queries remain correct for viewport/user-environment concerns such as `prefers-reduced-motion`. The goal is not "container queries everywhere"; the goal is that composition width is owned by the composition that responds to it.

## Responsive threshold policy

Every composition owner should ask two questions in order.

### 1. Can the relationship stay fluid?

Prefer intrinsic/fluid CSS when the topology does not change:

- Grid and Flexbox;
- `min()` / `max()` / `clamp()`;
- percentages;
- intrinsic sizing;
- aspect ratio;
- container-relative units where appropriate.

Do not add a named responsive state solely to interpolate a dimension that can vary continuously.

### 2. Does the composition actually change topology?

Add a discrete local threshold when the content relationship genuinely changes, for example:

- stacked becomes side-by-side;
- a document moves to a different compositional lane;
- an aperture mirrors to preserve visual narrative;
- Silk's lower composition reconnects at `1200px`;
- a crossing lock changes its authored registration treatment.

The number is an implementation consequence of that transition. The named composition state is the important contract.

## Index responsive contract

Index keeps the thresholds that Index genuinely requires.

The existing page-wide names such as `compactMin`, `midMin`, `defaultMin`, `wideMin`, `expandedMin` and `ultrawideMin` should not remain page doctrine merely to avoid moving them.

During cleanup:

1. migrate the current Index-dependent thresholds into an Index-owned responsive contract;
2. preserve accepted Index geometry exactly;
3. keep browser evidence at the relevant Index transition boundaries;
4. inspect whether any currently discrete adjustments can become fluid only after the ownership migration is green.

Do not retune Index while moving ownership.

## Silk responsive contract

Silk owns its own responsive composition vocabulary.

The `1200px` recomposition is legitimate and must remain a first-class Silk threshold.

Other current Silk boundaries such as `1500`, `1800` and `1919` must initially be preserved as implementation behavior. After ownership is clean, assess each one individually:

- if it represents a genuine change of composition, give it a meaningful Silk-local state;
- if it only corrects geometry that can become continuous, replace it with a fluid relationship;
- if it exists only because a child and parent currently double-own the same geometry, remove it as that ownership leak is resolved.

No threshold is removed because its number is untidy. The accepted rendered result remains authority until an explicit design change is approved.

## Silk child-boundary cleanup

The largest current Silk problem is not the number of media queries. It is that `SilkChapter` sometimes composes children using knowledge of their internal image/frame geometry.

The cleanup should give each vertical slice a meaningful external box.

### `SilkTraversalComposition`

The parent owns a placement wrapper for the whole traversal composition.

The child owns the upper/lower rope relationship, join and traversal cutout inside its boundary.

Remove the hidden cross-boundary CSS API:

- `--silk-compact-rope-join-top`;
- `--silk-compact-traversal-top`.

Do not replace those variables with raw `ropeJoinTop` or `traversalTop` props. Internal geometry stays internal.

### `SilkApertureComposition`

The parent owns the whole aperture placement and allocated outer box.

The child owns rim, world, overscan, clipping/parallax and internal frame geometry.

The root should not independently reinterpret the parent's box through page-specific width/negative-margin rules unless that bleed is explicitly part of the child's semantic rendering contract.

### `SilkReactionFrameComposition`

Expose an external box whose meaning is useful to the surrounding Silk composition, rather than requiring the parent to derive the position of the eyes from source-frame internals.

Frame bleed and source registration remain child-owned.

### `SilkReceiptPeekthroughComposition`

Expose the complete authored Receipt/Silk lockup footprint as one opaque child.

The frame-to-Silk relationship and hole registration remain internal.

### `SilkCommission09Composition`

The parent owns the allocated whole-composition placement and size.

The child owns landscape/portrait source selection, viewport registration, frame/world relationship and internal bleed semantics.

Preserve the accepted portrait source below `390px` and all accepted Commission 09 custody/provenance invariants.

## Styled-components contract

Use styled-components as an ownership tool, not as a cross-boundary styling mechanism.

Allowed:

- parent-owned styled placement wrappers;
- typed transient props for private parent placement state;
- finite semantic typed props for supported child variants;
- local `css` fragments for named responsive composition states;
- ambient route-wide CSS variables for theme/presentation values;
- root-only `style?: React.CSSProperties` where already established as the exceptional vertical-slice escape hatch.

Not allowed across vertical-slice boundaries:

- `className` styling APIs;
- `styled(ChildComponent)` placement seams;
- descendant selector reachthrough;
- hidden cross-boundary geometry through CSS custom properties;
- raw descendant coordinate/scale props used only so a parent can style child internals;
- React context or a theme provider for geometry;
- a generic "responsive layout engine" that abstracts future chapters before they exist.

Styled-components component selectors are intentionally not used across these boundaries even though the library supports them. Technical capability does not override the repo's ownership model.

## Grid, Flexbox and absolute positioning

No layout technique is globally preferred.

Use the tool that matches the owned relationship:

- **Grid:** two-dimensional track relationships inside a composition;
- **Flexbox:** one-dimensional runs and sequences;
- **normal block flow:** page/chapter vertical sequence and other relationships that need no explicit layout system;
- **absolute positioning:** authored collage/stage relationships where overlap, registration and z-order are part of the visual semantics.

Absolute positioning is not itself architectural debt on this page. It becomes debt when the wrong owner controls it or when one component's internals are positioned from another component.

Do not introduce a universal page column grid unless later chapters demonstrate a genuine repeated key-line relationship that cannot be expressed cleanly by local composition. `subgrid` remains an available future tool, not a present requirement.

## Testing ownership

Tests must follow the same architectural boundaries as production code.

### Page tests

Page-level tests prove only route/chassis responsibilities:

- opening/nav/chapters/connectors render in the intended source order;
- the known/future cast is represented correctly in navigation;
- the authored canvas supports `320px` without horizontal overflow;
- the authored canvas caps at `2560px` and centers beyond that width;
- route-level ambient presentation/accessibility contracts remain intact.

Page tests do not inspect Index or Silk descendant geometry.

### Chapter component tests

Each chapter test proves its own semantic/component contract and root behavior.

`SilkChapter.test.tsx` must stop acting as a catch-all assertion file for child internals as those child contracts move to their colocated tests.

### Child component tests

Each vertical slice proves its own:

- assets/content;
- semantic typed variants;
- internal composition contract where DOM-level proof is appropriate;
- root-only style forwarding where supported;
- absence of caller `className` styling seams.

### Browser geometry tests

Playwright owns relationships that depend on actual rendered geometry.

Responsive browser evidence should be sampled by owner, not through one global page breakpoint matrix.

Examples:

- Index browser tests sample Index's own transition boundaries;
- Silk browser tests sample Silk's own boundaries, including both sides of `1200px`;
- crossing tests sample the thresholds required by the crossing being proved;
- page/browser smoke proves `320px`, `2560px` and beyond-ceiling behavior without needing every chapter breakpoint to become a page case.

The portfolio-wide visual review widths from design policy remain useful review evidence (`1440`, `768`, `390`, `320`) but they are not the responsive architecture contract.

### Protected visual evidence

Existing protected visual regressions remain authoritative for appearance during this refactor.

This architecture cleanup is intended to preserve the accepted design. A visual baseline change is a regression until explicitly inspected and approved.

## Architecture guards

Extend the existing `ropeCompositionArchitecture.test.ts` approach with focused ownership guards where they provide durable value.

The cleanup should leave objective checks that reject:

- page-level chapter geometry variables;
- cross-boundary CSS custom-property geometry APIs;
- `styled(VerticalSliceChild)` seams;
- descendant selector reachthrough into opaque composition children;
- imports of sibling child-internal geometry into a compositional parent;
- a return of Index's breakpoint vocabulary to route-wide page authority.

Do not turn source-text tests into a broad style linter. Guard only the architectural failures that have already occurred and would be easy to reintroduce.

## Migration shape

The implementation should be sliced so accepted rendering stays inspectable throughout.

A safe high-level sequence is:

1. establish the thin page/chassis contract and move route-wide responsive authority out of `specialistsResponsive.ts` without changing pixels;
2. move Index's existing responsive thresholds into Index ownership and prove the accepted Index result;
3. make chapter/crossing containers explicit where container queries will own composition width;
4. refactor Silk traversal boundary and remove its explicit cross-boundary CSS geometry API;
5. refactor the remaining Silk child external-box contracts one slice at a time;
6. move Silk's responsive vocabulary fully local and preserve the `1200px` recomposition explicitly;
7. rebalance component/browser/architecture tests around ownership;
8. only after those migrations are green, examine local threshold simplification and fluidization without changing visual semantics.

This spec does not pre-author the future Writ/Klause/Rollback/Receipt chapter designs. It only guarantees each has a clean, independent composition seam when its design arrives.

## Superseded responsive doctrine

This design supersedes the **Responsive media ownership** section of `.agents/specs/2026-09-13-index-silk-compositional-ownership-refactor-design.md`, which stated that the Specialists breakpoint vocabulary remained shared page vocabulary.

That earlier conclusion was valid when the work focused narrowly on the Index-to-Silk seam. With Silk now substantially authored and six chapters understood as the page destination, route-wide breakpoint ownership is no longer the right abstraction.

The earlier spec remains authoritative for the already-accepted physical Index-to-Silk rope/lock relationship and opaque-child ownership rules except where this design explicitly replaces responsive authority.

Existing visual/layout specs remain historical authority for accepted appearance. This design changes ownership, not the visual result.

## Non-goals

This design does not:

- redesign Index;
- redesign Silk;
- change accepted assets or custody;
- invent Writ/Klause/Rollback/Receipt compositions;
- create a universal page grid;
- create a shared device-breakpoint taxonomy;
- remove Silk's `1200px` composition transition;
- eliminate absolute positioning from authored chapter stages;
- optimize for a minimum number of media/container queries as a goal in itself;
- introduce a generic chapter registry or responsive layout framework;
- change the canonical/publication routing status of the V2 preview.

## Success criteria

The architecture cleanup is successful when:

1. the page chassis owns only route/canvas/sequence responsibilities and no chapter composition taxonomy;
2. `320px` remains the supported minimum and the authored canvas still freezes at `2560px`;
3. Index owns the responsive thresholds Index actually needs;
4. Silk owns the responsive thresholds Silk actually needs, including a clearly named `1200px` recomposition;
5. future chapters can introduce local composition thresholds without changing Index, Silk or a route-wide responsive state model;
6. nav and crossing responsive behavior is owned by nav and crossing components respectively;
7. independently authored surfaces can respond to their allocated inline-size through local container ownership where appropriate;
8. whole-child placement remains parent-owned and child internal geometry remains opaque;
9. Silk no longer transports internal geometry across boundaries through CSS custom properties or imported child internals;
10. tests are divided by ownership: page chassis, chapter/component semantics, browser geometry and protected pixel appearance;
11. accepted Index/Silk visual semantics and responsive invariants remain unchanged throughout the refactor;
12. adding Writ requires a Writ-owned chapter composition, a `silk-writ` seam treatment, nav-state promotion and explicit page mounting, not changes to a global breakpoint architecture.

## Publication and authority

This spec records an approved architecture direction. It does not grant implementation, push, PR or merge authority. Implementation requires a reviewed written spec and a separate implementation plan under the repository workflow.
