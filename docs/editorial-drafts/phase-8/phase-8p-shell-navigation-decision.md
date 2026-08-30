# Phase 8P stage 3 — shared shell and navigation

**Status:** Settled in PR #46. Stage 3 is closed unless integrated proof exposes a concrete contradiction.

This decision is subordinate to the wider Phase 8P visual-language checkpoint, typography contract, stage-1 evidence-custody decision and stage-2 rhythm/density decision. It closes shell/navigation discovery without authorizing implementation.

## Selected default: quiet line

**The shared masthead owns site identity and primary navigation only. Current-route context belongs to the page.**

The shell should establish that the visitor is inside Harley Bartles's portfolio and keep the ordinary primary routes visibly available: Projects, Writing, Patch, About and CV, with the HB mark linking home.

The current route should not receive a second persistent shell row, folio strip or dedicated route column when the page title, route context and active navigation state already provide sufficient orientation.

The primary navigation remains one row/flow. Do not split it into separate navigation/context bands merely to make the shell feel more publication-like. That adds furniture without adding useful information.

At narrow widths the navigation may wrap naturally inside the same masthead flow. Do not invent an additional responsive shell hierarchy unless integrated proof demonstrates a real comprehension or accessibility problem.

## Active state and page context

The active primary route may be visibly reinforced in ordinary navigation. Deep-route context such as `Projects / Wild Bunch` belongs to the page content rather than being duplicated into persistent shell furniture.

This keeps the shell stable across project, article and professional routes while allowing each page to own its own hierarchy and project-native material.

## Rejected defaults

### Folio line

A restrained second masthead line carrying current-route context is rejected as the default. It is legible, but it solves an orientation problem already handled by page context and active navigation, while making the publication metaphor visible as interface furniture.

The comparison bundled a visible `Harley Bartles` name with this treatment. That identity cue is not sufficient reason to adopt the extra folio row.

### Split index

A persistent current-route shell slot/column is rejected. It pushes the shell toward documentation/product chrome and becomes a whole extra shell row at narrow widths.

## Small identity question deferred to integrated proof

Whether the quiet masthead should show the visible text `Harley Bartles` beside the HB mark remains a minor integrated-proof check, not an open shell-system decision.

It may be retained if first-time visitor orientation materially improves without crowding the single navigation flow. It must not trigger a second row, folio, breadcrumb strip or route-context slot.

If the HB mark plus page context already gives adequate identity in the integrated routes, the visible name is unnecessary.

## Behavioural navigation contract remains fixed

This visual decision does not change the existing SPA/navigation contract:

- interior-to-interior navigation remains ordinary and trustworthy;
- browser history and deep links remain authoritative;
- new non-fragment routes arrive at the destination beginning rather than leaking the previous route's scroll offset;
- deliberate fragment routes land on their target;
- Back/Forward may restore prior history-entry scroll where expected;
- route transitions must finish in the correct scroll, focus, history and accessibility state;
- direct deep links do not manufacture a homepage-opening transition the visitor never experienced.

## Evidence used for the decision

The deterministic comparison surface `phase-8p-shell-navigation-comparison.html` held typography, cool-mineral substrate, bounded project-colour authority, variable cadence and the primary route set fixed while testing:

- a quiet single-line shell;
- a two-line folio shell;
- a split navigation/current-route shell.

Each treatment included desktop and narrow-width pressure. Harley additionally viewed the full comparison at 75% browser zoom so the narrow specimen and desktop specimen could be judged together.

## Deliberate challenge

The selected quiet-line direction was challenged on the risk that the shell could become too anonymous. The useful difference in the folio treatment was a visible `Harley Bartles` identity cue, not the extra route-context row itself.

The direction survives by separating those concerns: the shell model remains one identity/navigation flow, while the presence of a visible name may be checked during integrated proof without reopening folio or split-index structures.

Harley explicitly rejected splitting the navigation row because it wins no useful information or orientation.

## Stage-3 stop decision

The shared-shell/navigation question has crossed the Phase 8P stop rule:

- three materially different shell-authority treatments were rendered;
- desktop and narrow behaviour were pressure-tested together;
- Harley accepted the quiet-line baseline;
- the selected direction survived a deliberate challenge around visible identity;
- folio and split-index structures add shell furniture without sufficient information gain;
- remaining questions are integrated-proof refinement rather than unresolved shell art direction.

Stage 3 is therefore closed. Remaining Phase 8P discovery consists only of integrated route proof.