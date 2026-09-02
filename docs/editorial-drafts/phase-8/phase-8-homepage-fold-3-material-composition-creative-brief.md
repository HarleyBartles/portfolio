# Phase 8 homepage — Fold 3 material/composition creative brief

**Status:** Next creative pass for the Wild Bunch homepage proof after Cloud/Harley rendered review on 2 September 2026.

**Branch / PR:** stay on `codex/phase-8-homepage-editorial-room`, draft PR #48. Do not create another branch or PR.

**Scope:** Fold 3 only, in the disposable integrated homepage wireframe. Do not continue into production React implementation, routing, edition-selection machinery, publication, or final asset commissioning.

This is a **creative brief, not a drawing specification**.

The current DOM/CSS proof has solved the hard topology problem and has a much stronger authored hierarchy than the retired SVG treatments. The next job is not to mechanically preserve its geometry. It is to push the composition, material hierarchy and accessibility until the fold feels resolved at every breakpoint.

**Local Sol owns the solution.** Use your own taste, judgement and generative tools. The observations below describe the direction we need and the problems visible in the current render. They are not instructions to reproduce a hidden picture in Harley and Cloud Sol's heads.

If you find a stronger solution than anything suggested here, use it.

Read alongside:

- [`phase-8-homepage-fold-3-creative-refinement-brief.md`](./phase-8-homepage-fold-3-creative-refinement-brief.md)
- [`phase-8-homepage-wireframe-handoff.md`](./phase-8-homepage-wireframe-handoff.md)

Where this brief differs from earlier Fold 3 art direction, this is the current authority for composition/material/accessibility. The architectural truth remains hard:

`events → Cache → State`

`complete ordered event history → Replay → Cache → State`

Replay never produces State directly; Cache is the sole source of State.

---

## 1. What is now working

Do not throw away the gains of the current DOM proof.

The present composition has finally made the two paths feel like different operations without relying on captions:

- the live path is event-by-event and direct;
- the replay path reads the complete ordered history as a whole;
- Replay rebuilds the same Cache;
- Cache alone feeds State.

The current direct Replay → Cache relationship is also a good example of the design principle already established in review: **complexity must pay rent**. Where a simple route tells the truth cleanly, prefer it over decorative plumbing.

The State treatment has also found a useful Wild Bunch metaphor. Preserve the meaning even if you recompose its exact appearance:

- the generated base image is a **subtle desert / heat-haze field**, not a literal western illustration;
- live DOM dots/fragments represent pieces of current State venturing into an unexplored western frontier;
- the fade reads as the heat-hazed unknown horizon;
- it also carries a freshness gradient: State is vivid and crisp nearest its Cache feed, then loses immediacy as it moves away from the source of freshness;
- the boring correctness of history / replay / cache earns State the right to become expressive for a moment.

That is the strongest project-native idea in the fold. Bring it forward rather than hiding it.

---

## 2. The main composition problem: State is being sacrificed to copy

In the current wide/intermediate render, the fold spends too much of its best visual material making room for prose.

State is now the semantic and visual culmination of the proof. It carries:

- the consequence of the architecture;
- the Wild Bunch flavour;
- the generated desert/heat-haze treatment;
- the state fragments;
- the bridge from engineering evidence into editorial claim.

Yet the current composition begins fading it before the State field has had enough room to establish itself, and the copy area consumes some of the most interesting material.

The direction for the next pass is:

> **Let State arrive before asking it to disappear.**

Find a composition that gives the crisp/fresh portion of State more presence before the fade takes over. There is unused or low-value space elsewhere in the fold; do not cramp the payoff merely to preserve current proportions.

The generated State image already contains a natural composition and fade. Work with that rather than fighting it. Do not crop away the strongest part of the source treatment only to manufacture a text column.

How much room State gets, where the fade begins, how it overlaps the editorial field, and how the breakpoint compositions differ are creative decisions for you.

---

## 3. Headline and précis are competing for the same territory

The current wide/intermediate composition asks the headline and supporting précis to occupy the same narrowing region created by the State fade.

That competition is costing the title breathing room and costing State visual territory.

The title is naturally suited to the fade seam: it is large, sparse and can participate in the transition from vivid State to clean mineral page.

The précis wants something different: stable contrast, comfortable reading measure and ordinary editorial conditions.

Cloud/Harley believe there is likely value in **separating those jobs** — for example, allowing the headline to breathe in/around the State transition while placing the précis beneath the proof on clean ground — but this is not a prescribed layout.

Assess the hierarchy yourself.

The governing question is:

> **Are we making the proof pay for copy that could live somewhere cheaper?**

If yes, recompose it.

The proof is the receipt that earns the claim. It should not read as supplementary material appended after the explanation.

This question is particularly important in portrait layouts, where vertical space is cheap and the current copy-first order may unnecessarily demote the evidence. You have licence to change the visual ordering at breakpoints while preserving sensible semantic/accessibility order.

---

## 4. Accessibility and scale: stop miniaturising the evidence

The current narrow proof still asks too much of small type.

The event history is the clearest failure: its primary event names and especially the quieter ordering metadata are too small to read comfortably, despite unused area inside the event cards.

This is not a request to apply a global font-size bump. It is a request to **let the objects change shape so the typography can be properly set**.

On portrait widths, there is no prize for keeping event records short. Keep the routing space that the independent Cache paths genuinely need, but let cards grow vertically where that gives the type appropriate presence, padding, line-height and gravity.

Likewise, Replay, Cache and State should be allowed to grow if that is what comfortable reading requires.

Mobile height is cheap. Illegibility is expensive.

Accessibility is a hard acceptance condition, not a taste preference:

- primary labels must read comfortably without zooming;
- secondary metadata must remain genuinely readable, not technically present;
- Replay / Cache supporting copy must remain clear;
- State labels/fragments must retain adequate contrast across texture and fade;
- the proof must survive browser zoom without collapsing into microtype or overflow.

Use your judgement about exact dimensions. The outcome matters more than preserving current proportions.

---

## 5. Material hierarchy: interest should increase through the data flow

The current event-history colour is too interesting. Canonical history does not need Wild Bunch theatre.

The desired material progression is:

> **ordinary truth → restrained mechanisms → expressive current State**

### Event history

Event history should feel almost like a regular part of the portfolio site's visual system: calm, dependable, infrastructural, boring in a good way.

It is important because it is canonical truth, not because it looks Western.

Pull Wild Bunch flavour out of the event cards. Choose a quieter, more site-native base treatment that lets their typography and ordered repetition do the work.

### Replay

Replay can carry more material character than history.

The direction discussed in review is a **very subtle dark, freshly-tanned-black-leather character**: soft grain, deep weight, restrained tactility.

Do not interpret that literally. No stitching, tooling, saddle cosplay or prop-making. Use generative tools if they help you discover the right understated surface, then judge whether it actually improves the composition.

### Cache

Cache can also carry restrained material character, but should remain visibly distinct from Replay.

The direction discussed in review is **pale straw / dry woven crosshatch**: a subtle criss-cross hatch in a light straw-like family, not literal straw or hay.

The intended feeling is lighter, provisional, replaceable and continuously refreshed.

Again, this is art direction rather than an exact texture prescription. Generate/explore until you find something that feels premium and semantically useful, or choose a better solution if your eye finds one.

### State

State is the culmination and may remain the most obviously expressive material.

Its desert/frontier treatment has earned that privilege because it is fed by the boring exact machinery before it.

The hierarchy should make State feel like a destination, not merely the fourth themed box.

---

## 6. Generated textures are progressive enhancement

Use generative tools freely for subtle texture exploration where they add value.

But generated imagery must never be the only thing carrying hierarchy, contrast or meaning.

The DOM/base styling underneath every texture should already tell a watered-down version of the same story if images fail to load:

- event history remains quiet and site-native;
- Replay remains darker / weightier;
- Cache remains lighter / more provisional;
- State remains the richest destination and still has a meaningful directional fade or fallback treatment.

Texture is enhancement over that structure.

Review the fold with texture/background images disabled or failed. If the hierarchy collapses, the fallback is not good enough.

All meaningful labels remain real DOM text. Generated assets must not contain authoritative text.

Accessibility still wins over texture. If a beautiful generated surface makes any label harder to read, reduce it, mask it differently, or discard it.

---

## 7. Creative licence

You have explicit licence to:

- recompose Fold 3 at any breakpoint;
- change relative scale, spacing, overlap, crop and flow;
- move the supporting précis if the hierarchy improves;
- change visual ordering in portrait where appropriate;
- let State occupy substantially more territory;
- change exactly where/how State fades;
- choose or generate new Replay / Cache textures;
- change event-history colours/material treatment;
- change local base colours so fallback tells the story;
- let records and process boxes grow vertically for legibility;
- refine typography, padding and internal hierarchy;
- reject any suggested visual detail in this brief if you find a stronger solution that preserves the intent and hard truths.

Do not mechanically implement the prose above.

There is no hidden target screenshot.

Use this brief as the problem space, then solve it as the senior designer-engineer in the room.

---

## 8. Self-review at the five standing breakpoint previews

Before returning, inspect the full fold in the five established Opera preview tabs and around the meaningful breakpoint boundaries.

Judge the result yourself, not merely whether each requested change exists.

### Evidence / hierarchy

- Does State get enough crisp territory before it fades?
- Does the generated frontier metaphor have room to read?
- Is the headline breathing, or still fighting the précis?
- Does the précis live where prose actually wants to live?
- Does the proof feel like the thing that earns the claim rather than an illustration after the claim?

### Material / taste

- Does event history feel deliberately ordinary rather than themed?
- Do Replay and Cache feel richer than history but quieter than State?
- Are their textures subtle enough to notice second?
- Does State still feel like the culmination?
- Is any material effect becoming costume rather than meaning?

### Accessibility

- Can you comfortably read every event name and metadata line at the narrowest width without zoom?
- Are Replay / Cache / State secondary labels equally comfortable?
- Is contrast robust over every textured region and fade?
- Does the proof remain usable at 200% zoom?

### Fallback

- Disable/fail generated/background imagery: does the colour hierarchy still tell the same story in reduced form?
- Is all meaningful text still present and readable?

### Composition

- Does desktop retain authority?
- Does tablet feel authored rather than squeezed?
- Does portrait use vertical space confidently rather than compressing the proof?
- Does anything still exist solely because the previous geometry happened to put it there?

If your own answer is `not yet`, iterate before returning.

---

## 9. Hard constraints and stop condition

Preserve:

- the corrected topology and data-flow truth;
- real semantic/selectable DOM text;
- no page-level horizontal overflow;
- natural scrolling;
- the locked headline, supporting copy wording and route destinations;
- the rest of the homepage untouched in this pass;
- the current branch and draft PR.

Do not continue into production React implementation from this pass.

When you believe the fold is both creatively resolved and accessible, update `phase-8-homepage-wireframe-handoff.md` with what actually stands, including any generated material assets/fallback behaviour and any compositional decisions you deliberately changed.

Then stop and return:

**Ready for Cloud/Harley Fold 3 material/composition re-inspection**

Briefly tell us what you changed because *you* judged it stronger, not merely which brief bullets you implemented.
