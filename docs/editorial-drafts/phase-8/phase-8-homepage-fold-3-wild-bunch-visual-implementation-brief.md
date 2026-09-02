# Phase 8 homepage — Fold 3 Wild Bunch proof visual implementation brief

**Status:** Accepted implementation direction after Cloud/Harley review on 2 September 2026. This is a focused continuation of [`phase-8-homepage-fold-3-wild-bunch-lock.md`](./phase-8-homepage-fold-3-wild-bunch-lock.md). It supersedes the current wireframe proof graphic where that scaffold differs from the topology or art direction below. It does not reopen the Fold 3 editorial proposition, copy or route.

## Purpose

The Wild Bunch homepage movement is a technical receipt, not a generic architecture diagram.

The visual must make one claim inspectable quickly:

> the ordered event stream is immutable canonical history; current state can be obtained through the ordinary cache path or through a full replay of that history; both mechanisms converge on the same derived state.

The current wireframe SVG is structurally useful but visually too diagrammatic and too small. The next pass should rebuild the proof as an authored technical artifact with exact topology and restrained Wild Bunch material character.

## Inspiration-board boundary

Cloud and Harley reviewed a generative inspiration board for this direction. Harley will provide that board to local Sol alongside this brief.

The board is **visual inspiration only**. It is not a source asset and its arrows are not technically authoritative. In particular:

- its left replay-rail arrowheads point the wrong way;
- its cache fan-in is visually ambiguous;
- generated labels/text are inadmissible;
- its topology must not be copied blindly.

Useful ideas to take from the board are:

- substantial three-column massing;
- lightly textured/material containers rather than flat SaaS boxes;
- a strong full-height State plane;
- a controlled right-edge information breakdown that dissolves toward the clean copy field;
- technical precision with enough material warmth to recall Wild Bunch without turning the section into Western theatre.

Local Sol may use deterministic tools, generative tools, or a hybrid approach to achieve the final rendered proof. Structural truth belongs to the implementation, not to generated imagery.

## Exact topology — immutable event history only emits

No arrow may terminate at an event record.

The event stream is immutable history. It is appended to and read from; this proof must not imply that Cache, Replay, another event, or any derived state writes backwards into it.

### Column 1 — ordered event stream

Use a vertical stack of warm brown event records. Real production labels should be real page/SVG text and may take the form:

- `Event 1 — timestamp`
- `Event 2 — timestamp`
- `Event 3 — timestamp`
- …
- `Event n — timestamp`

The exact number of visible records is a composition choice, but the stack must read immediately as ordered canonical history.

Each event emits two reads:

#### Left side — full replay read spine

Each event emits a short **leftward** connector into one shared vertical replay spine beside the stack.

The spine runs down the full height of the event history. It should communicate `walk the complete ordered record`, not `Event 1 changes Event 2`.

At the bottom, the replay spine bends beneath the event stack and travels **rightward into the lower middle mechanism: Replay**.

Directionality must be unambiguous:

`EVENT -> replay spine -> Replay`

There must be no arrowhead pointing from the spine into an event.

#### Right side — cache fan-in

Every event also emits a **rightward** flow toward the upper middle mechanism: Cache.

Those flows converge clearly into Cache. Use visible arrowheads / receiving direction so the viewer cannot read the relationship backwards.

Directionality:

`EVENT -> Cache`

This route should feel comparatively direct and operationally convenient, in contrast to the long full-history replay spine.

### Column 2 — derivation mechanisms

Two vertically stacked boxes of equal visual weight, with a deliberate gutter:

- upper: `Cache`
- lower: `Replay`

Together they should occupy approximately the same vertical territory as the event-history stack.

Cache receives the right-side fan-in from the events.

Replay receives the long read spine that travels down and beneath the event history.

Both mechanism boxes emit one clear **rightward** flow into State.

### Column 3 — derived State

One full-height State object receives:

- `Cache -> State`
- `Replay -> State`

Both paths must visibly terminate in the **same State**. That equality is the central receipt.

State is derived and perishable; event history is not.

## Material direction

The final object should not look like exported documentation.

### Containers

Subtle material texture is encouraged. The reviewed inspiration board demonstrated that lightly textured boxes can make the proof feel premium and project-native without becoming literal props.

The target is:

- tactile rather than flat;
- restrained rather than distressed;
- warm rather than globally sepia;
- technically exact rather than decorative.

Do **not** announce a material metaphor. No `this is paper`, parchment framing, notebook props, Western poster furniture or distressed-document cosplay.

A viewer should register richer surface quality before they consciously register a named material.

### State information fade

The right side of State progressively loses information quality as it approaches the copy field.

This treatment should recall the fading / chemically incomplete tintype language already established by Wild Bunch, but only where that language carries meaning.

The fade means:

**derived present under entropy**

It does not mean old data, broken canonical history, random dirt or generic grunge.

Prefer the character of image-information failure:

- uneven density loss;
- partial image disappearance;
- ghosted or chemically incomplete regions;
- controlled emulsion-like breakup;
- thinning information toward the clean page ground.

Avoid making the State object look like paper crumbling into dust.

The canonical event history remains crisp. Cache and Replay remain legible. State alone owns the information-decay treatment.

The desired seam is:

**warm/material technical proof -> fading derived information -> clean contemporary homepage copy field**

## Text and accessibility authority

**No text baked into a generated image is admissible.**

All meaningful labels, event records, timestamps, mechanism names and State text must be authored as real HTML/SVG text in the deterministic web implementation so they can be typeset correctly, remain crisp, and participate in the accessibility model.

Generative output may suggest surface treatment and composition. It may not own meaning.

## Scale and responsive composition

The proof should carry slightly more expressive weight than the copy on wide layouts, consistent with the Fold 3 lock's approximately 55–60% proof / 40–45% copy starting point.

Do not leave a small diagram floating in a large proof lane. The visual should be inspectable without leaning toward the screen.

On wide/tablet layouts the horizontal three-column relationship may remain.

On narrow portrait layouts, preserve the semantics rather than the desktop geometry. A vertical re-authoring is legitimate, for example:

`event history -> Cache / Replay -> State`

provided that:

- the replay read spine remains visibly distinct from the direct cache fan-in;
- no arrow terminates at an event;
- Cache and Replay both converge on the same State;
- State retains the right-edge information-fade idea where composition permits it.

Portrait mobile does not need to fit the entire cognitive fold into one viewport. Scrolling is expected.

## Tool licence

Local Sol has licence to use:

- deterministic SVG/HTML/CSS;
- generated visual exploration;
- generated texture references;
- layered raster/vector treatments;
- or a hybrid of these.

The production-quality wireframe proof must nevertheless be exact in topology, readable at the reviewed widths and free of generated textual meaning.

If generative exploration is used, iterate toward the stated topology and material brief rather than accepting an attractive but technically false output.

## Acceptance test

The visual passes when a technically curious reader can infer, before relying on the supporting paragraph:

> There is one immutable ordered history. It can be read through a direct cache path or walked in full through replay. Both paths produce the same current state. The state is derived and perishable; the history remains canonical.

And the visual should feel like a commissioned Wild Bunch technical receipt rather than a flowchart with a themed skin.
