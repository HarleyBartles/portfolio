# Phase 8 homepage — Fold 3 Wild Bunch lock

**Status:** Accepted design-room direction on 1 September 2026. This is the current Fold 3 authority for the Wild Bunch / replay-falsifiability movement. Fold 3 is settled far enough to leave for later implementation. Do not reopen it merely to polish the current wireframe scaffold.

## Timing contract

The homepage uses a cumulative trust model.

- Fold 1 gets approximately **5 seconds** to earn attention.
- Fold 2 gets the next **10 seconds** to turn attention into interest.
- Fold 3 gets the next **15 seconds** to prove that a roughly five-minute interior read will repay the reader's time.

From Fold 3 onward, each movement is an independent 15-second bid for a five-minute commitment. A reader may bounce off one subject and still be won back by the next movement. Later folds may accumulate trust, but must not require careful reading of the previous fold in order to work.

Fold 3 therefore does not need to teach event sourcing. Its job is to make one technical receipt inspectable quickly enough that the reader trusts the deeper Wild Bunch route will contain substance rather than architecture-name-dropping.

## Fifteen-second pitch

The compact story is:

1. Harley made the strong claim that events were the source of truth and that replay was exact.
2. He audited that claim rather than taking the architecture vocabulary on faith.
3. The claim failed in concrete places.
4. He corrected the replay gaps.
5. The resulting system can discard derived state and reconstruct the same session from the ordered event history.

The section's five-minute promise is therefore:

> I do not want credit merely for saying `event sourcing`. I tried to break the claim that events were the source of truth, found where it was false, fixed it, and can show the test that lets replay earn the word `exact`.

The governing question is not `does this look like a sophisticated architecture?` It is `can a technically curious reader understand in fifteen seconds that there is a real falsification story behind this link?`

## Copy and invitation

The accepted headline remains:

`I only get to call the replay exact because it's falsifiable.`

Supporting copy should stay short and sequential. The current direction is equivalent in substance to:

`I said events were the source of truth. Then I audited the replay and found they weren't. I fixed the gaps until I could throw the snapshot away and reconstruct the same session from the event stream.`

Do not expand the homepage fold into the full case study. The interior route owns the detailed failure modes, fixes, tests and architecture discussion.

The accepted CTA is:

`Follow the trail →`

This is deliberately collaborative rather than confrontational. It borrows Wild Bunch language without cowboy cosplay and invites the reader to walk through the receipt rather than watch a victory lap.

## Page-level composition

Fold 3 is calmer again after Fold 2, but not flatter. Wild Bunch may contribute warmth and character through its own material language without turning the movement into `the cowboy section`.

The movement should be **proof-balanced and slightly visual-led**.

On wide layouts, start around:

- **55–60% visual proof**;
- **40–45% copy**.

A 7/12 visual + 5/12 copy split is a good first construction target. The proof should be large enough to inspect without leaning in; the headline should no longer dwarf an apologetically small diagram.

Preferred wide ordering remains **proof on the left, copy on the right**. The visual and copy should feel like one authored receipt, not a paragraph beside a supporting illustration.

Typography stays contemporary, precise and relatively restrained. The headline is strong but below first-fold hero scale. Supporting copy is short. Diagram labels may carry real hierarchy because they are part of the receipt. The CTA remains a quiet but unmistakable text route rather than oversized button chrome.

## Proof graphic: three-column system

The current first-pass Wild Bunch asset is only a scaffold. The later proof should return to the settled three-column / two-flow composition.

### Column 1 — canonical event history

- ordered event stream / event history;
- vertically dominant and immediately legible as the source of truth;
- crisp and stable;
- narrower than the active mechanism space, but visually authoritative.

### Column 2 — derivation mechanisms

This is the widest active logic space. It owns the distinction between the two ways of obtaining current state.

**Shortcut / cache path:**

- cleaner, straighter, more direct;
- convergent arrows flow from the right side of the event stream into the cache/snapshot mechanism;
- reads as the ordinary fast operational route.

**Full replay / robust rebuild path:**

- a separate arrow grammar;
- more recursive / curling;
- events flow downward, around the lower edge of the event-history column and across into replay/reconstruction;
- visibly longer and structurally distinct from the shortcut path;
- must not read as merely reversing the same arrows.

The difference between these two paths is semantic, not decorative: direct convergence means the convenient current route; the longer recursive route means reconstruction from canonical history.

### Column 3 — live derived state

Column 3 is the current usable/materialized session state reached by either route.

Both mechanisms must visibly converge on the **same session/result**. This equality is the core receipt.

Unlike Column 1, Column 3 is deliberately perishable. As soon as live derived state exists, it is already on the way to becoming stale. It therefore needs continual freshening, whether through the ordinary cache/update path or through a full event rebuild.

That distinction drives the Wild Bunch material treatment below.

A useful internal starting proportion for the proof is approximately:

- Column 1: 25%;
- Column 2: 45%;
- Column 3: 30%.

These are composition targets, not implementation constants.

## Wild Bunch material language: tintype information fade

Borrow the existing Wild Bunch `tintype breakdown into solid colour` language, but do not make the fold sepia and do not apply a generic vintage filter.

The useful idea is **fading information quality**.

The tintype-like chemical breakdown belongs specifically to **Column 3, the live derived state**.

This is correct both structurally and conceptually:

- Column 3 naturally sits at the proof/copy seam where a fade can terminate into the clean page field;
- the event history in Column 1 is canonical and should remain crisp;
- the live result in Column 3 is derived and perishable: the moment it is built, it is becoming stale;
- maintaining current truth requires continually freshening that derived state, either through ongoing cache/update work or through robust full replay.

The fade therefore means `derived present under entropy`, not `old data is unreliable` and not `western texture`.

The treatment should behave like controlled chemical/image information breakdown resolving cleanly into the copy-side ground. Primary proof logic must remain readable. Do not let distress obscure the equality result or turn into random grunge.

The visual contrast should be:

- warm/material Wild Bunch evidence language on the proof side;
- clean contemporary typography on the copy side;
- exact technical reasoning inside a world with character.

## Responsive contract

Do not shrink the desktop proof into a thumbnail.

Wide layouts may use the side-by-side proof/copy relationship. Intermediate layouts may preserve it while giving the proof proportionally more width if needed for legibility. Narrow layouts must be **re-authored** around the same semantics.

A good narrow sequence is:

1. headline;
2. proof graphic;
3. short supporting copy;
4. `Follow the trail →`.

The three explanatory rows currently used beneath the tiny mobile wireframe asset are scaffolding, not authority. Remove them once the proof graphic itself can make the sequence legible.

Across breakpoints, preserve:

- Column 1 as crisp canonical history;
- distinct shortcut and replay flow grammars;
- both routes landing on the same result;
- Column 3 as the fading/perishable derived present;
- the fifteen-second readability contract.

## Anti-directions

Do not turn Fold 3 into:

- a generic DDD/CQRS/event-sourcing architecture diagram;
- framework or pattern badges;
- a list of receipts;
- generated Western concept art;
- sepia/cowboy theming;
- random grunge or paper-prop theatre;
- a technical diagram whose meaning only becomes available after reading explanatory rows underneath it;
- a confrontational `watch me prove the doubters wrong` posture.

## Acceptance test

Fold 3 is successful when a suitable reader can spend roughly fifteen seconds and leave with:

`He made a strong technical claim, challenged his own implementation, found the claim was false, fixed it, and has a concrete replay-equality receipt. Following this link for five minutes is unlikely to waste my time.`

That is enough for this design room now. Detailed SVG geometry, exact arrow shapes, tintype fade implementation, breakpoint composition and source-fragment selection belong to later implementation planning and rendered proof.
