# Phase 8 homepage — The Usual Specialists torn-substrate creative brief

**Status:** Final focused wireframe pass for the currently selected Patch homepage feature after Cloud/Harley review on 2 September 2026.

**Branch / PR:** stay on `codex/phase-8-homepage-editorial-room`, draft PR #48. Do not create another branch or PR.

**Scope:** The Usual Specialists movement only, inside the disposable integrated homepage wireframe. Do not reopen the accepted wordmarks, story assets, copy, routes, Klause overprint behaviour, or the wider Patch edition contract. Do not continue into production React implementation from this pass.

Read alongside:

- [`phase-8-the-usual-specialists-homepage-proof-note.md`](./phase-8-the-usual-specialists-homepage-proof-note.md)
- [`phase-8-homepage-wireframe-handoff.md`](./phase-8-homepage-wireframe-handoff.md)

This is a **creative brief, not a drawing specification**. The direction is clear; the exact composition is yours. Use your own taste and judgement. If a stronger implementation of the idea presents itself while preserving the intent below, use it.

---

## 1. Why this pass exists

The Specialists movement already has the right content, assets, choreography and responsive decomposition. The remaining problem is the substrate around that composition.

At intermediate and narrow widths especially, mineral page background showing through the spaces between story panels makes the section feel more like a responsive image gallery than a full-width authored Patch takeover.

The homepage rhythm wants something stronger here:

**Writing returns us to austere editorial calm → Patch takes over the whole page → the professional close quietly returns us to the ordinary site.**

The Specialists feature should make that middle rupture unmistakable without needing extra copy or ornamental explanation.

---

## 2. The direction

Give The Usual Specialists a **full-bleed black substrate** through the complete feature movement.

That black field should not end on neat rectangular page edges. Its left and right boundaries should feel like **torn comic-book / printed-page edges**, with the existing cool mineral homepage ground visible beyond and through the torn side.

Harley will provide the full-resolution transparent torn-edge PNG assets directly to you with the execution baton. They are intentionally **not** being sent through the GitHub connector because connector image handling damages the source quality.

Use the supplied full-resolution files from the local handoff. If they become part of the accepted wireframe, add/custody them through the local repo workflow rather than asking Cloud to relay compressed copies.

The important relationship is:

- opaque black paper side = belongs to the Specialists field;
- transparent torn-away side = reveals the real mineral page ground beneath;
- plain black fills the territory between the two authored torn boundaries.

The tear should therefore be a true edge/reveal device, not an image of mineral-coloured paper pasted over the page.

---

## 3. What the substrate should achieve

The treatment should make the whole Specialists movement read as one continuous authored field even when its individual images are deliberately separated, cropped, overlapped or biased to opposite sides.

The black ground should:

- carry the eye strip, folder, Rollback, Receipt, title field and K as parts of one caper composition;
- preserve the full-width glory of the accepted wide treatment;
- stop positive gutters between panels from falling back to ordinary mineral-page neutrality;
- give deliberate negative gutters / overlaps more visual authority where they improve the sequence;
- make the eventual return to the quiet mineral close feel like an intentional release back into the website.

The torn boundaries should:

- reveal mineral rather than introducing another decorative colour;
- feel irregular enough to read as a ripped printed/comic page;
- remain controlled enough to feel commissioned rather than scrapbooky;
- run convincingly through the full feature height at every relevant breakpoint;
- avoid obvious repeat seams or a wallpaper-tile rhythm if the source edge needs repetition, stretching, cropping, mirroring, alternating or another treatment to stay natural.

How you technically achieve that continuity is yours.

---

## 4. Feature-specific, not Patch-generic

Do **not** accidentally turn this treatment into the generic Patch slot.

The durable homepage contract is that the selected Patch adventure gets **full-width expressive licence**.

Black substrate, ripped comic-book edges, caper panel pressure and the particular overlap language belong to **The Usual Specialists**.

A later homepage selection such as Tournament of Reasonable Defaults may use the same Patch slot while bringing an entirely different full-width visual world.

So keep this implementation locally owned by the Specialists feature/proof rather than encoding `Patch = black torn paper` as a permanent site rule.

---

## 5. Responsive art direction

Do not force every breakpoint to show the torn edge in exactly the same crop or at the same apparent scale.

### Wide

The wide composition is already strong. The new substrate should support it rather than reorganising it unnecessarily.

Let the black field feel expansive and continuous behind the simultaneous collage. The torn edges should make the entire feature feel like a page/material layer laid over the mineral site rather than a centred rectangular hero.

### Intermediate

This is where the treatment should earn a lot of its value.

The accepted left/right movement and decomposition can remain, but black should carry the gaps so separate panels still belong to one energetic spread. Preserve the deliberately authored edge pressure rather than pulling everything back into a safe centred container.

### Narrow

The narrow feature should remain a deliberately decomposed vertical sequence, not an attempted desktop collage.

The black substrate should continue behind that sequence so the story pieces remain inside one Patch world as they ping-pong down the page. Let the torn edges provide the page boundary while individual panels are still free to hit, crop against, overlap or pull away from the viewport edges according to their own content.

The current principle still stands: when cropping a Specialists carrier, sacrifice negative space before sacrificing narrative detail.

---

## 6. Material restraint

The tear itself can be tactile. The section does not need additional fake paper furniture to explain it.

Avoid:

- another enclosing border around the section;
- generic grunge overlays across everything;
- heavy paper texture competing with the actual story imagery;
- fake tape, staples, drop shadows or scrapbook props introduced merely because the edge is torn;
- forcing every story carrier to share the same margin, width or rotation;
- making the torn edge so large or decorative that it becomes the subject.

The strongest version is likely simple in principle:

**real mineral ground → torn edge → deep black Specialists field → story composition → torn edge → real mineral ground.**

The story imagery remains the star.

---

## 7. Accessibility and failure behaviour

The substrate is decorative and must never own semantic meaning.

Preserve the existing real semantic PATCH/title/copy/links and the existing media-off/fallback behaviour.

If the torn-edge PNGs fail to load, the section should still degrade coherently to a plain black full-width Specialists field rather than losing content, contrast or navigation.

Do not let edge overlays intercept pointer/focus interaction or introduce horizontal page overflow.

The transparent reveal must expose the actual site ground underneath; avoid accidental opaque mattes/halos around fibres where practical.

---

## 8. Creative licence

You explicitly have licence to:

- decide how the supplied left/right edge assets are cropped, repeated, mirrored, alternated or otherwise composed;
- decide whether both supplied assets are useful or whether one can be transformed cleanly for the opposite side;
- adjust local Specialists spacing, overlap and panel pressure where the new substrate exposes a better composition;
- use negative gutters deliberately where they make the caper sequence stronger;
- tune the black field and edge treatment so it feels premium rather than mechanically tiled;
- make different edge/crop decisions at wide, intermediate and narrow breakpoints;
- reject any implementation suggestion above if you find a stronger solution that preserves the governing intent.

Do not treat this as `add background:black and two PNGs, done` if the rendered result still feels like ordinary web furniture.

Likewise, do not expand this into a new Patch redesign. This is a bounded final wireframe treatment.

---

## 9. Self-review

Inspect the Specialists movement in context between Writing and the professional close, not only in isolation.

Ask:

- Does entering Patch now feel like the page has genuinely changed register?
- Does the feature own the full width without simply becoming a big black rectangle?
- Do the torn boundaries reveal the mineral shell cleanly and convincingly?
- Do intermediate/narrow gaps now feel like deliberate black editorial substrate rather than empty webpage gutter?
- Are overlaps, edge crops and panel biases still controlled and readable?
- Does the quiet mineral close feel satisfyingly like returning to the website after the caper?
- If the torn assets are disabled, is the fallback still coherent and accessible?
- Is there any obvious repeating seam, stretched fibre artefact, halo or accidental horizontal overflow that cheapens the effect?

Use the established responsive preview widths and meaningful breakpoint boundaries. Iterate until you would sign the treatment off yourself.

---

## 10. Stop condition

This is the last known wireframe treatment before the homepage can be called wireframe-complete.

When the Specialists substrate is creatively resolved:

- update `phase-8-homepage-wireframe-handoff.md` with what actually stands;
- record the supplied torn-edge assets and their fallback/custody behaviour if they are accepted into the repo;
- do not continue into React production implementation yet.

Then stop and return:

**Ready for Cloud/Harley final wireframe inspection**

Briefly call out any creative decisions you made beyond the obvious black-field/torn-edge treatment because you judged them necessary to make the composition work.
