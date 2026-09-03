# React data-flow and composition addendum

**Status:** Normative extension of `2026-09-03-react-composition-grammar-design.md`.

## Why this addendum exists

The composition-grammar programme is not a CSS migration with React component names around it.

`styled-components` solves one part of the current debt: a component can own the styling contract that belongs to it. That does not, by itself, make the site good React. The wider target is a composable React application whose component boundaries, data flow and state ownership earn the choice of React.

The current homepage is a useful example. `HomePage` composes one large component per movement, which is a good route-level boundary, but several movement components are internally large stretches of class-bound semantic HTML. `WildBunchFeature`, for example, accepts the next Writing feature as a prop and maps event data, but most of the movement's internal grammar is still encoded as one large JSX tree plus external stylesheet knowledge. The migration should preserve the accepted movement while opening meaningful child seams inside it.

Do not respond by manufacturing hooks, contexts or memoization where the UI is static. React pays rent through clear component ownership, explicit data flow, local behaviour, reusable composition and selective performance work where measurement justifies it.

## React ownership model

### 1. Compose meaningful primitives

A route, page or large feature component should primarily compose smaller components that own real jobs.

A child component earns extraction when it owns one or more of:

- a reusable semantic/visual contract;
- a distinct behaviour or state boundary;
- a typed data contract;
- a repeated composition;
- a complex conditional branch;
- an independently testable evidence or interaction unit;
- enough internal structure that naming the unit makes the parent easier to understand.

Do not extract wrappers whose only value is replacing `<div>` with a capital letter.

The useful question during migration is: **can a reader understand the parent by reading the component names and props without also knowing the child's DOM and stylesheet?**

### 2. Props are the default data flow

Pass data and behaviour down through typed props.

A component should receive the content, configuration and callbacks it needs from the owner of that information rather than reaching sideways into unrelated modules or relying on class/DOM conventions.

Use props to make real variation explicit. Do not design speculative prop APIs for variation the site does not have.

Callbacks travel down the same way as data. The component that owns a state transition may pass the relevant action to the child that triggers it.

Repository/server state remains in its existing React Query ownership. Do not copy query data into local state or Context merely to make it feel more React-like.

### 3. State lives as close as possible to where it is consumed and changed

Default to local `useState` in the component that owns the behaviour.

If one component reads and updates the state, keep it there.

If several siblings need the same state, lift it only to their nearest common ancestor and pass values and callbacks down through props.

Do not hoist state to a page, route or application provider because it might be useful later. State ownership should follow actual consumption.

Existing local-state patterns such as share feedback, contact submission state and media-failure handling are the shape to preserve: the behaviour stays close to the UI that owns it.

### 4. Prop drilling is the trigger for narrow Context

Passing props through a couple of meaningful component boundaries is normal React and should remain explicit.

When a value or behaviour is being threaded repeatedly through components that do not use it merely so a deeper subtree can reach it, treat that as prop drilling. At that point, consider a Context around the smallest useful area.

Context must be:

- scoped to the subtree that actually shares the concern;
- named for that concern rather than becoming a generic application bag;
- close to its consumers;
- used because the alternative is genuine pass-through plumbing, not because Context feels architecturally sophisticated.

Do not introduce a site-wide UI Context, generic store or provider stack as part of this migration unless an observed use case requires it.

### 5. Reducers are an escalation, not a destination

Use ordinary local state until state transitions become genuinely coupled or difficult to reason about as independent updates.

A reducer becomes justified only when a component or bounded feature has several related state values and named transitions whose correctness benefits from being modelled together.

There is no known reducer-shaped problem in the current portfolio. The expected outcome of this programme is probably **no reducer at all**. Do not introduce one to demonstrate React technique.

### 6. Derived values are not state

If a value can be calculated from current props, query data or local state during render, calculate it during render.

Do not create synchronized duplicate state and an effect to keep it aligned.

Use effects to synchronize with external systems such as browser APIs, subscriptions, timers, storage or imperative libraries. Do not use `useEffect` as a general sequencing mechanism for ordinary component logic.

### 7. Custom hooks follow reusable stateful logic

Extract a custom hook when stateful behaviour is genuinely reusable, or when separating the behaviour materially clarifies a component while preserving a coherent ownership boundary.

Do not create `useThing` wrappers for one call site simply to reduce line count. A custom hook should name a real reusable behaviour or integration seam.

### 8. Memoization must pay measurable rent

`React.memo`, `useMemo` and `useCallback` are tools, not maturity markers.

Start with correct state placement and useful component boundaries. Those choices often remove unnecessary rerenders without memoization.

Use memoization when profiling or an obvious expensive computation/render path shows that stable inputs are repeatedly causing meaningful work. Use stable callbacks where they are required to preserve an optimized child boundary.

Do not wrap every primitive in `memo`, memoize cheap string/array work, or add `useCallback` around ordinary handlers by default. The migration should make memoization possible at sensible seams, not manufacture a reason to use it.

## Homepage application

Slice G remains last, but when it opens the task is wider than moving `HomePage.scss` rules into styled-components.

Keep the large route-level movement boundaries where they describe real editorial folds. Inside each movement, inspect for composable seams such as:

- movement framing and anchor ownership;
- heading/context/copy groups;
- route actions and next-movement handoff;
- project-specific proof/evidence units;
- repeated lists or sequences driven by typed data;
- media/fallback units;
- any interaction or local failure state.

Do not force all movements into one generic `Feature` component. Shared primitives should represent genuinely shared grammar; Wild Bunch proof, Marketplace proof, Patch composition and other project-native material keep their own components.

The intended result is that a movement component reads as a composition of named pieces and explicit props, while the project-specific proof can still be as bespoke as the material requires.

For example, this general shape is preferable to one monolithic JSX tree when the underlying contracts exist:

```tsx
<HomeMovement id="wild-bunch">
  <MovementContext>Wild Bunch · C# / .NET / PostgreSQL</MovementContext>
  <MovementStory
    title="I only get to call the replay exact because it's falsifiable."
    actions={<MovementActions primary={...} next={...} />}
  >
    ...copy...
  </MovementStory>
  <WildBunchReplayProof events={events} />
</HomeMovement>
```

The names above are illustrative, not pre-approved APIs. Local Sol should derive the smallest real primitive set from the accepted rendered composition.

## State and composition review for every slice

During planning and review of each migrated surface, answer these questions explicitly:

1. What are the meaningful component boundaries?
2. Which values are static content, props, query/server state, local UI state or derived values?
3. Does each state value live at the nearest component that owns both its use and transitions?
4. Where siblings share state, is it lifted only to the nearest common ancestor?
5. Are props still expressing useful ownership, or has pass-through prop drilling appeared?
6. If Context is proposed, which exact drilling problem does the bounded provider remove?
7. Is any effect computing or synchronizing something that should simply be derived during render?
8. If a custom hook is proposed, what reusable stateful behaviour does it own?
9. If memoization is proposed, what measured or obvious repeated cost does it avoid?
10. Can the parent component be understood from its children and props without reading their DOM or CSS implementation?

These questions are architecture review, not a demand that every migrated component use every React feature.

## Guardrails

- Do not add state to static presentation merely to use hooks.
- Do not use Context as a substitute for ordinary props.
- Do not introduce Redux, Zustand or another global state library for this programme.
- Do not introduce reducers without a reducer-shaped state problem.
- Do not duplicate React Query data into local state or Context.
- Do not memoize by default.
- Do not build generic component soup in pursuit of reuse statistics.
- Do not collapse project-native evidence into generic primitives.
- Do make component APIs expose the real decisions a page author should be allowed to make.

## Authority for local Sol

Read this file immediately after `2026-09-03-react-composition-grammar-design.md` and before writing the JIT plan.

The first plan for Slices A and B should apply these state/data-flow rules even though those slices are expected to be mostly composition and presentation work. It should identify current stateful components encountered in scope and preserve or improve their ownership rather than moving state casually during the styling migration.

Slice G must use this addendum as a primary review lens. Moving homepage CSS without decomposing the large movement internals into meaningful React composition would not complete that slice.
