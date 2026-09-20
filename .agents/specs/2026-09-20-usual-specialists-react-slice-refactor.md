# The Usual Specialists React Slice Refactor

**Status:** `completed-awaiting-retirement` — implemented in the Index closeout
slice. Durable page-slice/source-layout rules are promoted to
`.agents/doctrine/coding-discipline.md`.

## Goal

Refactor The Usual Specialists into a durable vertical page slice. The source
tree should describe product meaning and composition ownership instead of
technical implementation categories or historical routing accidents.

This refactor must preserve the accepted rendered page and Index responsive
contracts. It changes source ownership, file boundaries, names and imports; it
does not redesign the page.

## Research basis

The structure is based on current React and feature-oriented architecture
guidance rather than the repository's existing accidental layout.

- React recommends decomposing UI into a component hierarchy by responsibility
  and splitting components when they grow beyond one concern:
  <https://react.dev/learn/thinking-in-react>
- Redux recommends feature/domain folders over Rails-style folders grouped by
  technical type:
  <https://redux.js.org/style-guide/>
- Feature-Sliced Design defines page slices as full router-ready screens and
  explicitly permits substantial page-private UI when it is not reused. It also
  warns that names such as `components`, `hooks` and `types` are poor segment
  names when they only describe technical essence:
  <https://feature-sliced.design/docs/reference/layers>
  <https://feature-sliced.design/docs/reference/slices-segments>
- Bulletproof React independently recommends feature-oriented colocation,
  one-way architectural dependencies and avoiding cross-feature coupling:
  <https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md>

## Architectural taxonomy

Use four practical layers for this application:

1. `app/` — application bootstrap, providers and routing.
2. `pages/` — router-ready vertical slices that own page-private composition.
3. `features/` — reusable user-facing capabilities shared by multiple pages.
4. `shared/` — genuinely cross-page infrastructure and reusable UI/library code.

Dependencies flow toward lower-responsibility layers:

`shared -> features -> pages -> app`

Do not create extra layers merely to mirror a published architecture pattern.
`entities`, `widgets` and similar layers should appear only if this application
develops a concrete need for them.

Route URL hierarchy is not source hierarchy. The public route
`/patch/the-usual-specialists/next/` does not justify
`features/patch-showcase/usual-specialists/`.

## The Usual Specialists ownership

The Usual Specialists is a page slice, not a reusable feature. Its composition
is the content of one route and its internal chapters are not independently
reused elsewhere.

Move the complete route-owned slice under:

```text
src/client/src/pages/usual-specialists/
```

The intended structure is:

```text
usual-specialists/
├── UsualSpecialistsPage.tsx
├── UsualSpecialistsPage.test.tsx
├── assets.ts
├── opening/
│   ├── UsualSpecialistsOpening.tsx
│   └── UsualSpecialistsOpening.test.tsx
├── navigation/
│   ├── SpecialistsChapterNav.tsx
│   └── SpecialistsChapterNav.test.tsx
├── index/
│   ├── IndexChapter.tsx
│   ├── IndexChapter.test.tsx
│   ├── responsive.ts
│   ├── evidence/
│   │   ├── IndexEvidenceField.tsx
│   │   ├── IndexDeskDocument.tsx
│   │   ├── IndexBlueCarrier.tsx
│   │   ├── IndexStoryCard.tsx
│   │   └── colocated tests
│   └── closing/
│       ├── IndexClosingSequence.tsx
│       ├── IndexResearchLockup.tsx
│       ├── IndexRecognitionBridge.tsx
│       ├── IndexSourceRetrieval.tsx
│       ├── IndexOutcomePanel.tsx
│       └── colocated tests
└── silk/
    ├── SilkNameLockup.tsx
    └── SilkNameLockup.test.tsx
```

Do not create empty taxonomy. A subdirectory exists only where the current
composition already has a meaningful conceptual subdivision.

## React and styled-components rule

`*.styles.ts` is prohibited inside this slice.

Styled-components are React components. Private styled primitives belong in the
`.tsx` module that owns the composition. If a React object becomes substantial
enough to deserve its own module, extract it to a meaningfully named `.tsx`
component. Do not hide React components in `styles.ts`, `components.tsx`, or
another type-based dumping ground.

Non-React modules should be named for their responsibility, for example
`responsive.ts`, `assets.ts`, `geometry.ts` or `tokens.ts`. Avoid generic
`utils.ts`, `helpers.ts`, `common.ts` and `types.ts` buckets unless that exact
name describes one coherent responsibility.

## Public boundary

The router imports `UsualSpecialistsPage` from the page slice. Page-private
children remain internal to that slice.

Do not add barrel files merely to make imports shorter. Direct imports are
preferred until a real public API boundary requires an index module.

## Scope

This change includes:

- moving the current Usual Specialists page and all route-private Specialists
  modules into the vertical page slice;
- splitting current flat Index modules into the approved semantic groups;
- removing every Usual Specialists `*.styles.ts` module by colocating or
  extracting the React components it contains;
- renaming `usualSpecialistsAssets.ts` to `assets.ts` and `indexResponsive.ts`
  to `responsive.ts` within their semantic owners;
- updating router, tests, generated navigation/mesh and any repository-owned
  references affected by the move;
- adding structural protection that prevents the old `patch-showcase` and
  `*.styles.ts` conventions from returning to this page slice.

This change does not include a wholesale migration of unrelated client areas.
The taxonomy becomes the direction for code touched from this point onward;
other slices migrate when substantively worked on.

## Preservation contracts

The refactor must preserve:

- the public preview URL;
- opening -> chapter navigation -> Index source order;
- all Index responsive breakpoints and accepted geometry invariants;
- the 320px support floor and 2560px authored composition ceiling;
- the rule that the story card never covers character models or the Index mark;
- the currently mounted opening and Index only, with later specialists still
  unmounted;
- existing asset URLs and media/provenance custody;
- the existing root-only `style` escape hatch and no caller-facing `className`.

## Validation

While refactoring, use focused component and architecture tests to prove moved
boundaries and imports. Existing browser geometry and visual-regression tests
remain the authority for responsive behaviour and appearance.

Before publication, the normal tracked commit hook remains the complete local
gate. The refactor is complete only when there are no Usual Specialists
`*.styles.ts` files, no live imports from the old
`features/patch-showcase/usual-specialists` tree, and the accepted page contracts
remain green.
