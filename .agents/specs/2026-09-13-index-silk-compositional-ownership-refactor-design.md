# Index-to-Silk compositional ownership refactor design

**Status:** Approved.

**Planning handoff readiness:** 9/10. The ownership model, responsive visual contract, refactor boundary and validation strategy are explicit and Harley approved the written spec on 2026-09-13.

**Scope:** Refactor the already-approved Index-to-Silk anchor and Silk rope handoff so component ownership matches the portfolio React/styled-components doctrine without changing the accepted visual result.

## Goal

Lock in the responsive Index-to-Silk treatment as a clean compositional React implementation.

The visual work is complete. The refactor must preserve it exactly while improving ownership:

- styled-components own each component's local CSS contract;
- compositional parents own the position, size, scale, rotation and z-order of whole child components;
- children own their internal visual contract and internal registration geometry;
- precise parent-owned placement is expressed through typed transient props or typed local placement contracts, not `className`, descendant selectors, cross-boundary CSS variables, global styles or `styled(ChildComponent)`;
- responsive cross-component relationships are proven in Playwright rather than by exposing child internals as public styling APIs.

This design refines the ownership section of `2026-09-13-index-silk-responsive-anchor-lock-design.md`. That earlier spec remains authoritative for the physical rope/lock language and responsive visual intent.

## Fixed visual contract

The responsive anchor treatment has been visually accepted at every supported width. The refactor must not retune these values unless implementation evidence proves the current rendered contract cannot be preserved.

| Route state | Widths | Lock x | Lock y offset | Lock rotation | Lock scale | Silk rope entry x |
| --- | --- | --- | ---: | ---: | ---: | --- |
| narrow | `<=390` | `calc(4.516% + 11.65px)` | `2.44px` | `3deg` | `0.7` | `calc(4.516% + 12.57px)` |
| compact landscape | `391..720` | `calc(4.7144% + 9px)` | `2.43px` | `6deg` | `0.7` | `calc(4.7144% + 7.65px)` |
| mid | `721..900` | `calc(20.9075% + 11.72px)` | `2.38px` | `1deg` | `0.85` | `calc(20.9075% + 12.8px)` |
| default | `901..1399` | `calc(22.1358% + 11.77px)` | `2.35px` | `-1deg` | `0.85` | `calc(22.1358% + 13px)` |
| wide | `1400..2560` | `329px` | `0px` | `2.5deg` | `0.9` | `329.2px` |
| ceiling freeze | `2561+` | freeze `2560` geometry relative to capped canvas | freeze | freeze | freeze | freeze |

The exact rendered relationship is more important than preserving the current implementation representation of those values.

## Audit findings

### What is already good

`IndexSilkCrossingLock` already behaves like an opaque vertical slice:

- it owns the anchor, knot and foreground ring occluder;
- it owns the internal top and bottom knot registration ports;
- it does not own page-level absolute positioning;
- it does not expose `className`;
- its parent does not style its descendants.

`RopePiece` is also treated as an opaque reusable child. Existing rope parents no longer reach into its images with descendant selectors.

The current page-level CSS custom properties are ambient palette/layout tokens rather than hidden rope geometry APIs.

### What is less than ideal

1. `ChapterCrossing.styles.ts` contains Index-to-Silk-specific placement logic even though `ChapterCrossing` is otherwise a generic crossing component.
2. `ChapterCrossing.styles.ts` and `SilkTraversalComposition.tsx` both import `INDEX_SILK_ROUTE_GEOMETRY`. The visual relationship is therefore coordinated through an ambient shared geometry module rather than explicit component ownership.
3. `SilkTraversalComposition` repeats the responsive Silk entry x across upper rope placement, lower rope placement and the join port. Those values are currently kept equal by convention.
4. `indexSilkRouteGeometry.ts` represents coordinates as `number | string`, so the type system cannot distinguish an absolute pixel position from a percentage-plus-pixel authored offset.
5. `chapterCrossingGeometry.ts` mixes neutral geometry data with styled-components CSS generation.
6. The old Playwright test asserting that the Silk rope crosses the SILK wordmark fails on the currently accepted visual baseline at ultrawide widths. It is stale evidence and must not drive this refactor.
7. The exact approved responsive lock transforms are not yet asserted at both sides of every authored media boundary.

## Ownership model

### Parent-owned layout

A compositional parent may control only the whole child object:

- position;
- size allocated by the parent;
- uniform scale;
- rotation;
- z-order.

Those values are implemented by the parent's own styled placement wrapper.

When precise values need to enter a styled placement wrapper, use typed transient props or a typed local placement object. Do not pass raw placement props into the opaque child merely so the parent can style the child's root.

### Child-owned internal visual contract

A child owns everything inside its boundary.

For `IndexSilkCrossingLock`, that includes:

- fixed internal canvas size;
- anchor registration;
- knot registration;
- ring occluder registration;
- internal layer order;
- top and bottom knot measurement ports.

For `RopePiece`, that includes its raster/SVG asset contract and variant-specific internal rendering.

For `SilkTraversalComposition`, that includes the physical relationship between its Silk-owned upper rope, lower rope, local join port and Commission 06 traversal once the composition has been positioned by `SilkChapter`.

## Proposed component structure

### 1. Separate the authored Index-to-Silk crossing from the generic crossing

Introduce a focused `IndexSilkCrossing` compositor.

Its responsibilities are:

- render the crossing surface/rule using the same neutral crossing primitives as the generic crossing;
- omit the generic fallback anchor by choosing a semantic crossing-surface variant rather than rendering it and hiding it with CSS;
- own a styled placement wrapper around `IndexSilkCrossingLock`;
- apply the approved responsive lock x/y/rotation/scale contract to that wrapper;
- expose no descendant styling seam into `IndexSilkCrossingLock`.

`ChapterCrossing` remains responsible for ordinary crossing treatment such as Opening-to-Index. It should not import Index-to-Silk-specific geometry after this refactor.

The shared crossing surface/rule may be implemented as neutral styled primitives or a small semantic prop on the crossing surface. Do not create a generic slot/DSL merely to support two current crossings.

### 2. Keep lock geometry local to the lock's compositional parent

The approved lock placements should live next to `IndexSilkCrossing`, not in a route-wide global geometry authority.

Use an explicit local type, for example conceptually:

```ts
type AuthoredX =
  | { kind: 'absolute-px'; value: number }
  | { kind: 'percent-plus-px'; percent: number; offsetPx: number }

type LockPlacement = {
  x: AuthoredX
  yOffsetPx: number
  rotationDeg: number
  scale: number
}
```

The exact names may follow nearby code conventions, but the important constraint is that authored geometry is typed rather than stored as arbitrary CSS strings.

The placement data is fed only to parent-owned styled wrappers via transient props. `IndexSilkCrossingLock` receives no raw x/y/rotation/scale API.

### 3. Give Silk one responsive rope axis instead of three repeated x declarations

Refactor `SilkTraversalComposition` so its upper rope, lower rope and join port share one local rope-axis parent.

The rope-axis parent owns the responsive Silk entry x once. The upper and lower rope segments and join port are positioned relative to that local axis.

This keeps the internal Silk handoff relationship impossible to drift accidentally while preserving `SilkTraversalComposition` as the owner of its internals.

The approved Silk entry values live with `SilkTraversalComposition` as its own local visual contract. They are not imported from the crossing compositor.

The cross-component physical relationship between the crossing lock's bottom knot port and Silk's upper rope entry is therefore an integration contract proved in the browser, not a shared styling API.

### 4. Keep Index rope ownership unchanged

`IndexChapter` continues to own its outgoing rope. It does not receive lock geometry and does not style the lock.

Its rendered endpoint must continue to meet the lock's top registration port within the existing browser tolerance.

No new Index-to-Silk global geometry map is introduced to couple Index, crossing and Silk.

## Styled-components rules for this slice

The refactor must follow these rules:

- no global CSS or page-global geometry declarations for the anchor/rope seam;
- no `className` API on vertical-slice components;
- no `styled(IndexSilkCrossingLock)`, `styled(RopePiece)` or other cross-boundary child styling;
- no parent selector that targets a child descendant to set layout;
- no cross-boundary CSS custom properties carrying x/y/scale/rotation;
- parent-owned styled wrappers may use typed transient props such as `$x`, `$yOffsetPx`, `$rotationDeg`, `$scale`;
- child styled-components may use their own private transient props for their own internals;
- semantic props are preferred when selecting a real supported variant;
- do not expose a generic `style` bag as the normal placement API. Existing root-only `style?: CSSProperties` remains an exceptional escape hatch where already established by repo convention.

## Responsive media ownership

The Specialists responsive vocabulary remains shared through `specialistsResponsive.ts` because breakpoint names are neutral page vocabulary, not component geometry.

Physical geometry is local:

- `IndexSilkCrossing` owns lock placement values;
- `SilkTraversalComposition` owns Silk rope-axis values;
- `IndexChapter` owns Index rope values.

The components intentionally do not import each other's physical placement data.

This duplication is deliberate where each component owns a different side of a physical seam. The browser test is the authority that those independently owned contracts still meet.

## Testing contract

### Component tests

`IndexSilkCrossingLock.test.tsx` continues to prove only lock internals:

- layer order;
- expected assets;
- registration ports exist;
- no caller `className` seam;
- root does not own page-level placement.

`IndexSilkCrossing.test.tsx` should prove only compositor ownership:

- it renders the neutral crossing rule;
- it renders the authored lock through a parent-owned placement wrapper;
- it does not render the generic fallback anchor;
- placement is expressed through the compositor's own typed contract;
- it does not inspect or assert lock descendant geometry.

`SilkTraversalComposition.test.tsx` should prove its own internal composition:

- upper/lower rope pieces and local join port are present;
- they share the local rope-axis composition;
- no generic crossing anchor or lock is owned by Silk;
- no caller `className` seam;
- no cross-boundary geometry API.

Architecture tests should continue to reject:

- rope geometry CSS custom properties at page scope;
- selector reach-through into `RopePiece` or `IndexSilkCrossingLock`;
- sibling style-module imports used as hidden geometry APIs.

### Browser contract

Playwright is the authority for rendered cross-component geometry.

At minimum cover:

`320, 390, 391, 720, 721, 900, 901, 1399, 1400, 1599, 1600, 1919, 1920, 2560, 2561`.

For every sample:

- authored Index-to-Silk lock is visible;
- generic fallback Index-to-Silk anchor is absent from the rendered Index-to-Silk compositor;
- Index rope exit meets the lock's top knot port within the existing tolerance;
- Silk upper rope entry meets the lock's bottom knot port within the existing tolerance;
- Silk upper/lower rope join remains internally continuous;
- apparent rope thickness stays within the accepted paracord range;
- no horizontal overflow is introduced.

At the authored responsive boundaries, additionally assert the rendered lock transform and placement contract on both sides:

- `390 / 391`;
- `720 / 721`;
- `900 / 901`;
- `1399 / 1400`;
- `2560 / 2561` ceiling freeze.

The test should prove the rendered result, not merely compare source constants.

### Stale SILK-wordmark test

The existing test named `keeps the physical route crossing the clean SILK mark while rope implementation is modularized` currently fails on the accepted baseline at ultrawide widths because it assumes the rope must pass horizontally through the SILK wordmark.

That test is superseded by the approved physical route contract. During the refactor, either remove it or rewrite it to assert a still-valid user-visible invariant. Do not move the accepted rope route merely to satisfy the stale wordmark assumption.

### Protected visual evidence

The protected Specialists visual-regression snapshot remains authoritative pixel evidence.

The refactor is intended to be visually identical. Any protected snapshot change is a regression until inspected and explicitly accepted.

## Refactor sequence

1. Add browser assertions that capture the current approved responsive lock transform/placement at both sides of every authored boundary.
2. Add the focused `IndexSilkCrossing` compositor contract tests.
3. Extract the specialized Index-to-Silk crossing compositor and move whole-lock placement into its local styled wrapper.
4. Remove Index-to-Silk geometry from generic `ChapterCrossing` styles.
5. Refactor `SilkTraversalComposition` to one local rope axis and remove repeated entry-x declarations.
6. Remove the ambient `indexSilkRouteGeometry` module once no production component needs it.
7. Remove CSS-generation responsibility from `chapterCrossingGeometry.ts` if it is no longer required; keep only genuinely neutral crossing geometry/data.
8. Update the stale SILK-wordmark browser assertion to the current approved route invariant.
9. Run focused component/architecture/browser tests, then protected visual regression.
10. Run the complete canonical gate only when no immediate commit will follow, or let the normal pre-commit hook own the complete gate if commit authority is later granted.

## Non-goals

This refactor does not:

- redesign the anchor, knot, ring or rope;
- change approved breakpoint geometry;
- create new responsive breakpoints;
- generate or replace assets;
- merge Index and Silk into one visual component;
- create a general-purpose layout engine;
- introduce React context for geometry;
- make child internals externally styleable;
- change the Opening-to-Index crossing unless a small neutral primitive extraction is required to share the crossing surface cleanly.

## Success criteria

The refactor is successful when:

1. the rendered Index-to-Silk treatment is visually unchanged at every protected width;
2. the exact approved lock media-break contract is enforced by browser evidence;
3. no component reaches into another component's styled internals;
4. no cross-boundary geometry is transported through global CSS, CSS custom properties, `className`, `styled(ChildComponent)` or an ambient shared geometry module;
5. whole-child placement is owned by compositional parents through their own styled wrappers;
6. leaf components own their internal visual contract;
7. Silk has one internal responsive rope axis rather than three separately authored x positions;
8. component tests respect ownership boundaries and browser tests own rendered relationship assertions;
9. protected visual regression remains unchanged;
10. the complete repo validation is honest about the superseded SILK-wordmark assertion rather than preserving it as false evidence.

## Publication and authority

This spec does not grant commit, push or PR-publication authority. Those actions remain separately gated by explicit user instruction.
