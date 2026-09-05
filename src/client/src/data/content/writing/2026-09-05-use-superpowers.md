---
title: Use Superpowers
date: 2026-09-05
summary: I use obra/superpowers as a strong base system. superpowers-plus is my plugin around the way I actually work.
---

Seriously, use [Superpowers](https://github.com/obra/superpowers). I like Superpowers. I [use the hell out of it](https://github.com/HarleyBartles/portfolio/tree/main/.agents/plans/completed). It helped me build pretty much everything you see here.

It’s so good I changed it.

My setup bounces between Codex and Devin, across repos and worktrees, with agents getting different tools depending on where they’re running. A few failures repeated often enough to become rules.

## Know where you are before you assume anything

Agents kept getting their bearings wrong. Wrong checkout: “Oops, I did that in the shared checkout on main, but I was working in a worktree.” Wrong root: “I’m in the wrong folder, so that command didn’t land where I thought it did.” Wrong shell: “Oh yeah, the PowerShell here doesn’t do heredocs or `&&`.”

I wanted the agent to know where it was before assuming anything, so I wrote `inspecting-the-environment`. It checks the facts that could change the next step: working directory, shell, repo and worktree state, available tooling. The decision stays with the agent; the skill makes it look before it moves.

I liked the idea enough to [raise it upstream](https://github.com/obra/superpowers/issues/1836), while being explicit that my rough skill hadn’t been tested to Superpowers’ standard. The [contributor guide](https://github.com/obra/superpowers/blob/main/CLAUDE.md) advertises a 94% PR rejection rate. I had Codex, Devin, a repeated annoyance and a skill that fixed it for me. That was enough for my repos; Superpowers reasonably asks for evidence across the people and harnesses it supports.

The issue was eventually closed. The maintainer agreed there was a genuine gap, but preferred narrow, skill-local checks over a general orientation skill without RED/GREEN evals. They were right not to take it. I was right to keep it.

I still wanted a clean line between upstream and my changes, so I kept an immutable Superpowers snapshot and applied mine through [adaptation overlays](https://github.com/HarleyBartles/agent-asset-marketplace/blob/main/.agents/plans/completed/2026-07-26-update-superpowers-plus-to-v6-2-0.md). As those changes accumulated, preserving that line needed projection tooling, provenance records, drift handling and, eventually, a tool to heal the overlays when upstream moved underneath them.

By then, my clean line between upstream and my changes had acquired enough machinery to become clownshoes.\*

\**clownshoes, n.: the state of getting in your own way by solving problems that exist only because you put them there.*

## Can the next agent move?

I’d got into the habit of asking agents to rate plans, specs, PRs, anything about to become somebody else’s input. The answers were regularly five or six out of ten. I got the most useful criticism by asking: **How confident are you that the next agent can act on this without needing to improvise?**

That became Handoff Gates. The target is 9/10. Miss it and the agent gets one bounded improvement pass; after that, 8/10 is the handoff floor. Below the floor, we stop and change the proposition or find another route.

10/10 would be dishonest certainty here. I’ve seen agents call something 9.2 or 9.3, but an agent reporting 10/10 confidence in a handoff is claiming certainty I don’t believe it has. I have no use for a lying agent.

The floor keeps me honest too. If I give an agent a proposition with no useful points of reference and say, “just sketch a quick outline, don’t worry about how it gets done”, I want it to be allowed to answer: “I can do that, but the next agent will have to invent half of it. Six out of ten.” The human doesn’t get a special exemption from the handoff rule.

Handoff Gates now sits across brainstorming, planning, execution and review. Given the timing, it was probably what finally made the overlay arrangement too cumbersome. By the end of July, [my own design record](https://github.com/HarleyBartles/agent-asset-marketplace/blob/main/.agents/specs/completed/2026-07-31-superpowers-plus-first-party-design.md) described the adapted skills as “effectively first-party authorship with extra indirection.”

I froze those outputs as first-party derived skills, kept the upstream snapshot as provenance and retired the overlays. Some skills are basically unchanged; some have been hacked up. It isn’t perfect, probably never will be. It works.

## The rest of superpowers-plus

Superpowers already asked clarifying questions during brainstorming. I hoisted that behaviour into `asking-clarifying-questions`, where any agent could reach it. A planning agent, an executing agent, a code review agent should all be able to ask me the question that makes their next move more confidently safe. The behaviour was already there; I changed where it lived.

`writing-roadmaps` handles goals too large to pretend they are one executable plan. `subagent-workspace` gives temporary worker files somewhere deliberate to live. `using-superpowers-plus` owns the first turn because I only want one thing deciding which workflow starts.

`iterative-review` decomposes demanding review for weaker models into bounded, fresh-context passes so the frontier reviewer can remain an independent final audit rather than doing most of the discovery work. It’s still a work in progress; [If you write a loop, don’t be surprised when your agent starts looping](/writing/graph-iterative-review) tells that story properly.

They sit alongside the familiar Superpowers workflow in a [bundle of 22 skills](https://github.com/HarleyBartles/agent-asset-marketplace/blob/main/codex-marketplace/plugins/superpowers-plus/references/bundle-manifest.json). Brainstorming, planning, execution, TDD, debugging, worktrees, review and verification are still there. The decisions I kept making around them no longer need to be rediscovered every session.

> **When “most capable” changes overnight**
>
> A model release can change what a relative instruction means without anyone editing the instruction. My model-selection rule made that visible to me this morning.
>
> When I started `selecting-a-subagent`, Superpowers already understood fresh implementers, separate reviewers and different levels of model capability for different jobs. My harnesses exposed more controls than the guidance then knew how to use, so I added explicit model, reasoning and context choices.
>
> As upstream improved, I started wondering how much of that guidance I could retire.
>
> On the morning of 5 September 2026, I woke up to Astra in my model picker. It hadn’t been there when I went to bed. Shortly afterwards I opened X, and one of the first things I found was [Eric Provencher’s article about auditing skills for Astra](https://x.com/pvncher/status/2095991462416490862). He works on Codex at OpenAI.
>
> I hadn’t yet got as far as asking what Astra meant for my own workflow. His article put that question in front of me.
>
> Superpowers’ subagent-driven workflow says to [dispatch the final whole-branch review on the most capable available model](https://github.com/obra/superpowers/blob/main/skills/subagent-driven-development/SKILL.md#model-selection). If “most capable available” now resolves to Astra in your harness, the same instruction can select a different reviewer without you changing a word.
>
> Maybe that’s exactly what you want. Maybe you already override it in `AGENTS.md`. Maybe you’ve never looked at which model gets selected because it hasn’t given you a reason to care.
>
> I care. My [Codex review mapping names Sol](https://github.com/HarleyBartles/agent-asset-marketplace/blob/main/codex-marketplace/plugins/superpowers-plus/skills/selecting-a-subagent/references/codex-multi-agent-v2-profile.md) for `reviewer-strong`, with explicit reasoning levels. Astra appearing in the picker doesn’t rewrite that choice. I’ll decide where Astra belongs.
>
> You don’t need my plugin to make that decision. One local instruction may be enough.

The Astra question is only one part of a wider audit: what should change when the frontier moves, and what should stay stable for the models already doing the work.

## Almost not for anyone

I don’t recommend superpowers-plus to anyone who isn’t named Harley Bartles, with apologies to my unfortunate few namesakes. Installing it means inheriting decisions I made for myself.

You might be happy with Superpowers’ defaults. You might want to change one or two. I care about enough little things like this that I’ve ended up with a fairly particular workflow, and I use it across six repositories. The marketplace itself is one of them, consuming its own vendored copy of superpowers-plus.

A few lines in one `AGENTS.md` would be straightforward. Copying the same overrides across six repositories gives me six places to keep in step. So I put the shared choices in a plugin: one source to maintain, with repository-specific instructions left in each repository.

I don’t think of this as a competing fork. I’m not building a separate Superpowers product or collecting changes for an eventual upstream submission. When upstream makes one of my additions redundant, I can retire it.

How I distribute those shared assets, preserve their provenance and keep repository-specific context where it belongs is the wider [Agent Asset Marketplace](/projects/codex-marketplace) story. Shared where reuse earns it. Local where context matters.

With one repository, a few local instructions might do everything you need. You probably don’t need a plugin. You almost certainly don’t need mine.

Use Superpowers. Make the choices that suit your work. superpowers-plus isn’t for everyone. It’s almost not for anyone. It’s for me.
