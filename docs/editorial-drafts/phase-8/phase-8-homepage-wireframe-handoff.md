# Phase 8 homepage wireframe handoff

**Status:** Ready for Cloud/Harley integrated-wireframe review. The approved `PATCH / The Usual Specialists` movement now occupies its intended place in the complete homepage sequence. This remains a discovery artifact inside the active homepage design room, not a production implementation plan, and does not authorize edits to the production `HomePage`, shared production styles, routing, tests or edition mechanics.

The static composition proof is [`phase-8-homepage-wireframe.html`](./phase-8-homepage-wireframe.html).

## What this pass is for

The wireframe exists to find where the decisions made in conversation are wrong once they become a page.

Do not polish it into a finished homepage. Get it far enough that Cloud and Harley can judge the actual sequence, relative weight, density and visual transitions.

The questions are:

- Does the quiet opening establish enough professional authority before the first project movement?
- Does Marketplace create a strong agentic-engineering reveal without swallowing the portfolio identity?
- Does Wild Bunch immediately break the `another AI portfolio` hypothesis with recognisably conventional engineering evidence?
- Are Marketplace and Wild Bunch too dense when they sit next to each other in one scroll?
- Does the Writing movement genuinely strip the page back, or merely look unfinished?
- Can the long `I made agentic engineering harder than it needed to be` title carry the page as typography rather than becoming a large blog card?
- Does Patch feel like an earned return to spectacle after Writing?
- Does the professional invitation feel like an ending rather than another section?
- Which movements naturally earn most of a viewport, and which become worse if stretched to fill one?

If the page answers any of those questions badly, that is useful wireframe evidence. Do not hide it with extra decoration.

## Completed integration boundary

The first-pass commissions and the separate Patch side quest are complete. This iteration was deliberately limited to integrating the accepted movement into the full wireframe.

1. Preserve the existing professional opening, Marketplace, Wild Bunch and Writing movements.
2. Replace only the obsolete Patch block with the accepted isolated movement.
3. Tune page-level space around that movement rather than reinterpret its internal typography, artwork, copy or breakpoint choreography.
4. Review the complete sequence at wide, intermediate and narrow widths, including media-failure and semantic-text states.
5. Stop before production component extraction, animation, homepage routing work or edition-selection code.

The HTML is intentionally ordinary static HTML/CSS. Keeping it disposable is a feature.

## Working wireframe copy

All copy below is **first-pass composition copy**. It is truthful enough to wireframe against but remains editable after rendered review.

### Opening

Eyebrow / identity:

`Harley Bartles · Full-stack software engineer`

Working display line in the current HTML:

`Engineering the whole problem, not just the code.`

This line is deliberately provisional. If it reads like marketing copy once rendered, simplify it rather than decorating it.

Professional provenance:

`5 years at The Access Group`

Consequence-bearing proof:

`I'm responsible for Access Checks engineering end to end. I recently designed and delivered a service that enabled two additional paid screening checks, with one hard production rule: no source evidence, no successful result.`

The wording must preserve the engineering/product ownership boundary. Do not rewrite this as `I own Access Checks end to end`.

### Marketplace

Label:

`Agent Asset Marketplace · Superpowers+`

Working heading:

`A strong system, changed by using it.`

Working body:

`I maintain Superpowers+ as a derivative of obra/superpowers for the way I actually work. The clearest modification is Handoff Gates: a spec, plan or completed change does not move on because its producer says it is done. The next worker has to be able to continue without improvising.`

The homepage must preserve upstream attribution and must not imply Harley originated Superpowers.

### Wild Bunch

Label:

`Wild Bunch · C# / .NET / PostgreSQL`

Heading:

`I only get to call the replay exact because it's falsifiable.`

Working body:

`I said events were the source of truth, then audited the implementation to see whether that was actually true. It wasn't. I fixed the replay gaps until a stale or missing snapshot could be discarded and the same session reconstructed from the event stream.`

### Writing

Representative article:

`I made agentic engineering harder than it needed to be`

Commissioned homepage précis for the wireframe:

`I once wrapped a novel in an agent organisation, roughly 300 agent-facing documents and enough governance to make returning to the work feel like accepting a cleanup project. The lesson wasn't “less process”. It was that every piece of machinery has to pay rent.`

This is intentionally not the article manifest summary. The title is the dominant visual object; the précis belongs on a separate editorial plane; the route action stays quiet Sans interface copy.

### Patch

Stable protagonist marque:

`PATCH`

Episode title:

`THE USUAL SPECIALISTS`

Invitation:

`One question. Are you in?`

Action:

`Meet the crew →`

The accepted artwork carries the movement. Do not reintroduce `Adventures of Patch` as the serial marque, expand the invitation into explanatory copy, or reconstruct either outlined wordmark from live type.

### Professional close

Working heading:

`Think I could be useful on your team?`

Working body:

`My CV has the formal version. If you'd rather talk, get in touch.`

Actions:

- `Read my CV`
- `Get in touch`
- quieter `About me`

This is an invitation after the proof, not a freelance sales funnel and not a summary of the page.

---

# First-pass commissioned visual briefs

These are **wireframe commissions**, not final artwork. One coherent attempt is enough. They exist to reveal composition facts.

## 1. Marketplace — Superpowers+ / Handoff Gates

**Editorial job:** prove adaptation under serious use. The image should make the relationship `strong upstream system → maintained derivative → explicit readiness boundary` legible before a visitor reads every word.

**Suggested canvas:** landscape around `1600 × 1000` or equivalent 8:5 / 16:10 field. It needs enough horizontal room for lineage and enough vertical room for Handoff Gates to dominate.

**Source truth to preserve:**

- upstream is `obra/superpowers`, MIT licensed; Harley did not originate it;
- Superpowers+ is Harley's maintained derivative inside `HarleyBartles/agent-asset-marketplace`;
- Handoff Gates is a first-party addition;
- current Handoff Gates source says: `Never hand off below 8/10. Target 9/10+.`;
- the three readiness lanes are spec-readiness, plan-readiness and completion-readiness;
- broader Superpowers+ changes such as first-turn routing, roadmap/plan lifecycle and execution strategy may appear as subordinate lineage evidence.

**Useful repo sources:**

- `HarleyBartles/agent-asset-marketplace/.agents/skills/handoff-gates/SKILL.md`
- `HarleyBartles/agent-asset-marketplace/.agents/skills/using-superpowers-plus/`
- `HarleyBartles/agent-asset-marketplace/codex-marketplace/plugins/superpowers-plus/references/bundle-manifest.json`

**Composition direction:**

- let an upstream document/source fragment read as the inherited base;
- visibly branch or extend into Superpowers+ rather than presenting two unrelated products;
- make Handoff Gates the dominant worked modification, not one equal card among many;
- one or two small real source fragments are preferable to invented UI;
- preserve provenance in the image itself at a quiet but readable level;
- the stable state should work without animation.

**Do not:**

- make a generic glowing agent/network diagram;
- turn this into a plugin inventory wall;
- fake a SaaS dashboard;
- use a literal red/green Git diff as the whole concept;
- imply that upstream had no review or handoff discipline and Superpowers+ invented the concept from nothing;
- use mono merely to make ordinary labels look technical.

**First-pass success:** somebody can glance at the asset and understand `upstream → used seriously → modified → Handoff Gates became an explicit boundary`.

## 2. Wild Bunch — replay falsifiability

**Editorial job:** show a claim being challenged, found false in concrete places, corrected and then proved. The homepage story is not `this game uses event sourcing`.

**Suggested canvas:** landscape around `1600 × 1000`, with an ordered session-audit/event-history spine carrying most of the visual weight.

**Source truth to preserve:**

- events are intended to be the source of truth;
- the replay audit found concrete state that was not reconstructable, including the TravelDiaryDays gap and a separate UnrelatedCriminalLedger concern;
- later work corrected the replay path;
- snapshots are shortcut caches, not required truth;
- current full-replay equality tests reconstruct from the ordered event stream and compare the resulting session state;
- the public case study already says: `I only get to call that exact replay because it's falsifiable.`

**Useful repo sources:**

- `HarleyBartles/portfolio/src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.tsx`
- current `HarleyBartles/wild-bunch` main, especially `tests/WildBunch.Integration.Tests/FullReplayEqualityTests.cs`
- Wild Bunch replay-audit/fix history around PRs #167, #168, #169 and #171

**Composition direction:**

A useful stable-state grammar is:

`ORDERED EVENT HISTORY → snapshot stale / removed → FULL REPLAY → SAME SESSION`

- use the actual ordered-session/audit feel as the visual spine;
- let the snapshot visibly fail or disappear rather than merely putting an X beside an architecture box;
- include a small real replay-equality source/assertion fragment if it remains readable and source-faithful;
- a compact audit note can show `claim failed here → corrected`, but do not turn the whole visual into a bug ticket;
- Wild Bunch earth colour may bleed locally around the evidence and must terminate back into the mineral site substrate.

**Do not:**

- make a generic DDD/CQRS/event-sourcing architecture diagram;
- lead with framework names or pattern badges;
- substitute generated Western concept art for the engineering receipt;
- invent event names or test assertions if real source is available;
- make the snapshot itself look like the source of truth.

**First-pass success:** the image itself makes `claim → falsification → correction → proof` visible, with replay rather than architecture vocabulary carrying the story.

## 3. Patch — Lawful Heist completed-folder plate

**Editorial job:** let Patch break the homepage back into spectacle after the austere Writing movement, while still showing one story object rather than summarising the lesson as a poster.

**Suggested canvas:** wide landscape around `1800 × 1125` or equivalent. The completed folder should own roughly the central 55–65% of the composition. Peripheral insets can break the ordinary rectangular field, but the plate must still resolve cleanly back onto the site grid.

**Primary source asset:**

`src/client/public/media/patch/patch-heist-1200.avif`

The existing route describes this as the completed recruitment folder covered with all six crew members' assent markers. Use it as the hero source if it survives the larger composition. Do not redraw a worse fake folder merely because this is a new homepage asset.

**Other useful current assets:**

- `patch-heist-index-*`
- `patch-heist-silk-*`
- `patch-heist-writ-*`
- `patch-heist-klause-*`
- `patch-heist-rollback-*`
- `patch-heist-receipt-*`
- `patch-heist-rollback-lockdown-1200.avif`
- `patch-heist-receipt-alcove-1200.avif`
- each specialist's existing assent marker

Inspect `src/client/src/features/patch-showcase/LawfulHeistPage.tsx` before making the composite. The six actual responsibilities are provenance, pressure-test, authority, decision, recovery and audit.

**Composition direction:**

- overhead completed heist folder is the dominant hero image;
- three or four stylised comic-book detail insets sit around its periphery;
- insets show consequential details, not additional complete scenes;
- examples: a close crop of an agent's eyes registering an emotion, Rollback's conspicuous absence of emotion, a hand stamping/signing, a hand on the lockdown control, red tension cord being pulled, a record already printing;
- prefer crops/derivatives of existing truthful imagery where they work; generate a new derivative detail only where the existing assets cannot provide the required beat;
- if generated, match the established Lawful Heist world, characters and material culture closely enough that it reads as the same adventure rather than generic comic art.

**Do not:**

- let the insets become equal subjects to the folder;
- make a chaotic corkboard/scrapbook collage;
- add tape, fake handwriting, torn-paper theatre or generic `human-made` grime;
- make a film poster with six headshots;
- label every responsibility and turn the plate into an illustrated checklist;
- flatten all six assent markers into identical badges. Their difference is part of the source story.

**First-pass success:** the folder reads first, the detail insets add narrative charge second, and a visitor wants to enter the story before the page explains the engineering principle.

---

# What stays deliberately unresolved until rendered review

Do **not** treat these as missing requirements for the first wireframe:

- final homepage copy;
- final image commissions;
- exact section heights;
- production breakpoint geometry;
- production motion/choreography;
- home-to-interior transition implementation;
- canonical daily edition mechanics;
- the final Writing/Patch compatibility registry representation;
- production components or styling architecture;
- final respected-agency valuation / AI-convergence gate.

The current page is a hypothesis. Render it, inspect it, then use what looks wrong as the next design evidence.
