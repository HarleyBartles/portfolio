# Phase 8 homepage — Fold 3 creative refinement brief

**Status:** Creative re-art-direction of the Wild Bunch homepage proof after Cloud/Harley topology review on 2 September 2026.

**Branch / PR:** stay on `codex/phase-8-homepage-editorial-room`, draft PR #48. Do not create another branch or PR.

**Scope:** Fold 3 only, in the disposable integrated homepage wireframe. Do not continue into production React implementation, routing, edition-selection machinery, publication, or final asset commissioning.

This is deliberately a **creative brief, not a drawing specification**.

Cloud/Harley have identified the engineering truth the proof must carry, the failure modes visible in the current rendered treatment, and the bar the result needs to clear. **Local Sol owns the composition.** Do not mechanically reproduce prose geometry because it appears in this brief. Interpret the problem as an art director / senior designer-engineer, make the strongest composition you can, and judge the rendered result yourself before returning it.

If you find a stronger visual solution than anything suggested here, use it.

Where this brief conflicts with the older [`phase-8-homepage-fold-3-wild-bunch-visual-implementation-brief.md`](./phase-8-homepage-fold-3-wild-bunch-visual-implementation-brief.md), this brief is authority for topology and creative approach. The older brief remains useful for material language, deterministic text/accessibility, and the prohibition on technically false/generated meaning.

The current standing wireframe is described in [`phase-8-homepage-wireframe-handoff.md`](./phase-8-homepage-wireframe-handoff.md).

---

## 1. Editorial job

Fold 3 is a technical receipt, not an architecture explainer.

The locked proposition remains:

> **I only get to call the replay exact because it's falsifiable.**

The supporting copy and routes remain locked. Do not rewrite the fold.

The visual should let a technically curious reader understand, before relying on the paragraph, why the word **exact** has been earned.

The proof should feel commissioned, authored and inspectable — not like documentation exported into the homepage.

---

## 2. Architectural truth — hard constraint

The corrected model is:

**normal path:**

`events → Cache → State`

**rebuild path:**

`complete ordered event history → Replay → Cache → State`

The intended principle is:

> There is one canonical immutable history, one replaceable derived Cache, and one current State produced from that Cache. During normal operation events continually refresh the Cache. If the Cache is discarded, Replay walks the complete canonical history and rebuilds that same Cache. State then comes from the rebuilt Cache exactly as it did before.

Hard invariants:

- event records are canonical immutable history;
- events only emit / are read from; no arrow may imply a write back into an event record;
- Replay must visibly mean a deliberate walk over the **complete ordered history**, not another event-by-event consumer that happens to have a different label;
- Replay rebuilds Cache;
- Replay does **not** produce State directly;
- Cache is the sole producer/input of State;
- State is derived/perishable; history is canonical;
- all meaningful text remains deterministic real HTML/SVG text.

Everything else is open to creative interpretation.

---

## 3. Primary failure in the current vertical proof

The current stacked/mobile composition labels its two sides `FULL-HISTORY READ` and `LIVE REFRESH`, but the routes themselves are nearly mirrored side rails.

That loses the point.

If those labels are covered, the viewer should still be able to tell that the two operations are fundamentally different.

The desktop proof currently demonstrates one useful distinction:

- the live-refresh path feels **convergent and flowing** — many event tails resolving toward Cache;
- the complete-history path feels **structural, angular and procedural** — one ordered record being collected/read as a whole before entering Replay.

That desktop geometry is evidence of a successful semantic distinction, **not a template to copy literally**.

The creative problem is:

> **How can the composition make incremental refresh and complete-history replay look like different operations before the labels are read?**

Solve that in the strongest way you can at each breakpoint.

Possible tools include route geometry, convergence, line character, hierarchy, rhythm, position, restrained colour/material distinction, or another visual device you judge stronger. Do not add a legend simply to compensate for weak visual semantics.

### Label-removal test

Before returning the work, temporarily ignore/hide route labels and ask:

- Can I still identify which path is continual incremental refresh?
- Can I still identify which path is a complete-history rebuild?
- Can I see that they converge on one replaceable Cache?

If not, the composition is not done.

---

## 4. Cache is the convergence point

The latest topology correction is good, but the proof can communicate the idea more elegantly than two unrelated-looking interfaces arriving at Cache.

Think of Cache as the conceptual hub:

**one derived cache, populated in two different ways.**

Normal operation populates it incrementally.

Replay repopulates it by walking the complete history.

How you make that convergence visible is a creative decision. You are free to change routing, relative position, approach direction, scale and geometry if doing so makes the idea clearer and more premium.

Do not preserve a complicated route merely because the current proof already has one.

---

## 5. Complexity must pay rent

Audit the proof as a designer, not only as a topology checker.

For every bend, detour, crossing, loop, flourish or extra piece of visual plumbing, ask:

> **What information does this geometry add?**

If the answer is effectively `nothing`, simplify it.

Example observed in the current desktop treatment: the Replay → Cache route leaves Replay, travels outward, turns, travels up and then enters Cache. Unless that detour expresses a real distinction or resolves a compositional problem, a simpler route may communicate the same truth with greater authority.

This is not an instruction to draw a particular straight arrow. It is an instruction to **remove unearned complexity**.

The more complex portions of the proof should be complex because the engineering meaning requires it:

- the complete-history route may need enough structure to communicate `walk the whole ordered record`;
- the live-refresh route may need enough convergence to communicate `many events continually update one derived thing`.

Replay → Cache itself may need very little theatre.

Premium does not mean ornate. Often the most confident choice is the simplest geometry that carries the full meaning.

---

## 6. Breakpoint art direction

Do not treat responsive design as SVG scaling.

There are three creative regimes.

### Desktop

The current desktop direction is broadly successful:

- proof enters with authority from the left;
- State is substantial;
- State dissolves toward/under the right-side claim;
- evidence and interpretation occupy one shared field rather than two polite columns.

Preserve what is working, but do not be afraid to simplify or improve the internal routing and convergence.

Desktop is not locked pixel-for-pixel.

### Tablet

The current tablet treatment still feels like a smaller desktop proof.

That is not enough.

Tablet must retain **magnitude and authority**, even if the composition has to change materially to do it.

Use the viewport aggressively. Overlap proof and copy where useful. Let State participate in the seam. Remove dead space before reducing meaningful objects. Re-author the plate rather than printing the desktop diagram smaller.

The acceptance question is not `does everything fit?`

It is:

> **Does the proof command the same seriousness at tablet width as it does on desktop?**

### Mobile / portrait

The stacked composition should feel native to portrait reading and may run well beyond one physical viewport. Do not shrink the receipt merely to fit it on one screen.

The State degradation should continue to follow the direction of compositional/data flow: in the stacked regime it should dissolve downward rather than retaining a meaningless right-edge fade.

Most importantly, the vertical composition must preserve the semantic difference between continual refresh and complete-history replay **without relying on mirrored rails plus labels**.

You may substantially recompose the mobile proof if that is what clarity demands.

---

## 7. Material language

Retain the useful Wild Bunch material character from the earlier brief:

- warm event-history surfaces;
- restrained tactile texture;
- darker Replay / operational contrast where useful;
- lighter replaceable Cache where useful;
- State as derived/perishable information that physically loses coherence toward the clean page ground.

Do not turn the movement into Western theatre, parchment, cowboy furniture, generic sepia, distressed-paper cosplay or decorative grunge.

Material should support hierarchy and meaning before it advertises theme.

---

## 8. Creative licence

You explicitly have licence to:

- redraw the proof;
- change connector routing;
- change relative positions and scale;
- change overlap and crop;
- use different authored compositions for desktop, tablet and mobile;
- simplify existing geometry;
- introduce a stronger visual distinction between live refresh and full replay;
- alter local material treatment where it improves hierarchy;
- use deterministic, generative or hybrid exploration for **appearance** where useful;
- reject suggestions in this brief when you have a stronger solution that still obeys the hard architectural/editorial constraints.

You do **not** need to reproduce a picture imagined by Harley and Cloud Sol.

There is no hidden correct drawing.

Your job is to solve the creative problem and present the strongest honest proof.

---

## 9. Self-review before handoff

Do not stop at `the requested edits are implemented`.

Render the work at the established breakpoint tabs and assess it yourself as if reviewing another designer's work.

Use at least these lenses:

### Semantic

- With route labels mentally removed, are live refresh and complete-history Replay visibly different operations?
- Is Cache unmistakably the convergence point?
- Is Cache unmistakably the only producer of State?
- Does Replay clearly operate over the complete history rather than behaving like another parallel event feed?
- Does any arrow/bend accidentally imply a false write or dependency?

### Editorial

- Does the visual earn the falsifiability headline?
- Could a principal engineer understand the receipt in roughly fifteen seconds without first reading the whole paragraph?
- Does the proof feel like evidence rather than explanatory decoration?

### Composition

- Does desktop retain the current authority?
- Does tablet feel authored rather than miniaturised?
- Does portrait feel native rather than rearranged desktop furniture?
- Does State dissolve in the direction that has compositional meaning at that breakpoint?
- Are proof and copy allowed to share territory where that makes the composition stronger?

### Taste

- Which lines/bends/objects are carrying meaning and which are merely busy?
- Is any route taking a scenic path for no reason?
- Is there a simpler, more confident solution available?
- Does anything read as generic SaaS architecture-diagram furniture?
- Would you personally sign off the composition as premium enough for the homepage, rather than merely correct?

If your own answer is `not yet`, iterate before returning it.

---

## 10. Objective constraints

Preserve:

- no page-level horizontal overflow;
- natural scrolling; no scrolljacking/snap interception;
- real selectable/accessibly exposed labels and copy;
- the locked Fold 3 headline, supporting copy and routes;
- the rest of the homepage untouched in this pass;
- the current branch / draft PR.

Do not move into production React implementation.

---

## 11. Return condition

When you believe the Fold 3 proof is both **technically true and creatively resolved**, update `phase-8-homepage-wireframe-handoff.md` with the actual result and the topology that now stands.

Then stop and return:

**Ready for Cloud/Harley Fold 3 creative re-inspection**

The return is a design-review gate, not an implementation-compliance report. Briefly call out any creative decisions you made that deliberately diverge from the current geometry or from suggestions in this brief, and why you believe they improve the proof.
