---
title: The graph I built to keep a review agent from going in circles
date: 2026-08-05
summary: Why a state graph beat a checklist for agentic review, and the pitfall of the reviewer reviewing itself.
---

# The graph I built to keep a review agent from going in circles

Putting a language model in charge of reviewing a pull request is easy. Keeping it from looping is hard.

At first I wrote the review as a checklist. Check out the branch, run the preflight, dispatch a few lens reviewers, apply the feedback, and flip the PR to ready. On paper it was a straight line. In practice the orchestrator treated the list as a menu. A `reviewer-fast` pre-lens would find something, the orchestrator would fix it, then jump to a deep `lens-dispatch` before the preflight passed again. The deep lens would file a new finding against the fix the orchestrator had just written. The review was no longer reviewing the PR. It was reviewing its own edits.

I rebuilt the control flow as an explicit state graph. The entry node is `setup`. From there the only legal move is `normalize-inputs`, then `preflight`, then `fast-fix` if the deterministic checks are red, or `scope-honesty` if they are green. Only after the diff is compared against the plan, spec, PR body, and linked issues does the graph reach `reviewer-fast`. If `reviewer-fast` is clean, the graph moves to `lens-dispatch`; otherwise it routes through `lens-triage`. Triage sends blocking or important findings into the fix loop, trivial findings to the final pass, and contested or load-bearing findings to `blocked` for human escalation. Fix nodes are followed by `re-preflight` and `reviewer-fixes`. A `regression-scan` covers non-trivial or cross-cutting changes. `resolved-ledger` closes each finding, and `final-strong` gets one whole-branch pass before `closeout` and `ready`.

## The graph is the contract

The Mermaid diagram at the top of `review-state-graph.md` is not documentation. It is the contract. A script called `next_node.py` reads the current state and prints exactly one allowed next node. The orchestrator is not allowed to pick a convenient node. It opens the single `references/node-<node>.md` recipe, follows it, then asks for the next node. The graph has no fixed round list. Rounds are derived from traversals of `lens-dispatch` or `final-strong` that actually produce findings. That distinction matters, because treating a review as `Round 1, Round 2, Round 3` taught the orchestrator to keep inventing rounds. The graph teaches it to stop when the exit condition is met.

This also means the edges are more important than the recipes. Each edge is labeled with a guard: `green`, `red`, `clean`, `findings`, `contested`, `round cap exceeded`. Those guards are the real instructions.

## Scope honesty was harder than the graph

Building the diagram took an afternoon. Keeping the lenses honest about what they were supposed to look at took several failed reviews.

The `scope-honesty` node exists because every lens needs a boundary. It compares the PR diff to the plan, spec, PR body, and linked issues, then records or fixes drift. Without it, a `security` lens opens the whole repository and a `scripts` lens starts refactoring files it never touched. The diff is the scope. The graph enforces that check before any deep reviewer is allowed to run.

`lens-triage` then normalizes every finding against the lens's own checklist and the severity language in its profile. A finding is not a finding until it is classified as `blocking/important`, `trivial/deferred`, or `contested/load-bearing`. The triage step is where the orchestrator decides whether the lens has pointed at something real or has drifted into adjacent territory. If `scope-honesty` is the fence, `lens-triage` is the gate.

The graph reveals a useful metric: `findings_by_node.preflight` should dominate. If most findings show up in `lens-dispatch` instead of preflight, the scope is too loose.

## The reviewer reviewing itself

The most expensive mistake I made was letting a reviewer re-review its own work. The fix loop is straightforward on the diagram: `finding-fix` commits a fix, `re-preflight` reruns deterministic checks, then `reviewer-fixes` applies the originating lens's checklist to the changed files. If `reviewer-fixes` is not tightly scoped, the lens will see its own previous finding, the changed code, and the broader context, and it will file a new finding. The new finding is not a real regression. It is the lens reviewing the ghost of its earlier output.

That loop was costly because each new finding looked legitimate. The orchestrator would dutifully route it to `finding-fix`, which produced another change, which produced another review, which produced another finding. The cycle only stopped when a round cap or human escalation intervened. The fix was not a better prompt. It was a smaller blast radius.

`reviewer-fixes` is now defined as a cheap, lens-aware re-review of the fix's blast radius. It verifies the original finding and applies the originating lens's checklist only to the changed files. If the fix is non-trivial or cross-cutting, the graph sends it to `regression-scan`, where `reviewer-strong` examines the touched area and classifies any confirmed new issue by `regression_class`.

The `resolved-ledger` node is the bookkeeping that closes the loop. It records each resolution into `resolutions.jsonl`, updates `review-metrics.json`, and only lets the graph move to `final-strong` when the queue is empty. Without that ledger, a resolved finding can reappear in a later pass and the cycle starts again.

## Define the exit first

The concrete lesson is to define the exit conditions before you define the review steps. In this graph, `ready` is only reachable from `closeout` after a clean `final-strong`, and `closeout` only after the completed plans and specs are archived. `blocked` is a first-class terminal node, not a failure mode to be avoided. If a finding is contested or load-bearing, the right outcome is to stop and ask a human. If the round cap is exceeded, the right outcome is to stop and escalate. Those exits are modeled as edges with conditions, not as comments in a prompt.

I also learned that every fix needs an exit. `finding-fix` goes to `re-preflight`, not back into the same lens. `reviewer-fixes` either resolves, fails, or escalates to `regression-scan`. There is no edge from `reviewer-fixes` back to `lens-dispatch`. The lens that found the issue does not get to re-examine the whole branch after every edit. That single missing edge is what broke the earlier checklist version.

## What I would do differently next time

I would add the round cap and blast-radius language to the very first draft. They look like safety rails, but they are load-bearing parts of the contract.

The graph is not the product. It is the guardrail that keeps the review product from becoming a conversation with itself. The real wins came from scope boundaries, exit conditions, and a single allowed next step. Get those right and the review can be as aggressive as you want. Get them wrong and the agent will find ways to keep itself busy forever.
