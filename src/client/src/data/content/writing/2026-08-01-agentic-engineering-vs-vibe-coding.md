---
title: "Agentic engineering and the kindness of vibe coding"
summary: "Vibe coding can make an idea real enough to try. Agentic engineering helps the same people build it into something others can rely on."
readingMinutes: 4
tags: ["writing","agentic-engineering","vibe-coding"]
relatedSlugs: ["graph-iterative-review","i-made-agentic-engineering-harder-than-it-needed-to-be","provisioning-is-not-accumulation"]
---

# Agentic engineering and the kindness of vibe coding

The term "vibe coding" makes me wince slightly, the way any coined phrase does when it names something people were already doing. Some people treat it as the end of craft. Others treat it as a punchline. I think it's a useful label for a generous thing that's also being oversold.

If software isn't your day job and you've got an idea for an app, I hope you try making it with AI. Give someone something to click. Find out whether it makes sense outside your own head. You don't need an engineer's permission to begin. Sometimes making it real enough to try is the whole point.

I'm a software engineer. Where I work, agentic engineering is part of how we build apps together: engineers direct AI agents through the work, while Product and QA keep shaping and testing the same app. In a two-day hackathon, Product can use Claude to make a fantastic frontend. That first version gives us something real to build on, but it can also make an answer invented for the demo look like one the app actually knows.

## The first version is still in there

Product can export Claude's frontend code for Devin, a coding agent, to build on. An engineer directs the agent's changes and checks the code against what the app needs to do.

The app still takes us around four weeks to build, about what it took before Product could make such a good demo in two days. We move quickly between development and QA as features take shape. The hackathon build gives us a starting point and a shared picture. It hasn't answered every question the app will face.

One of those questions found us while we were testing a feature. QA saw 50 on a screen where the database said 10. We looked into why the feature was showing the wrong number.

The app couldn't reach the data through its API. We hadn't built the failure behaviour for that screen yet, and the 50 left in the hackathon wireframe was still there to appear instead. It was useful when we needed a plausible number for a demo. Now it made an unfinished connection look like a strange result from the feature we were testing.

An engineer was leading the build and QA was checking it as we went. That leftover 50 still sent us after the wrong problem for a while.

## What changes when someone relies on it

A side project may have no Product team, no QA team and no four-week build. Its maker may be using AI for the first working version and for every subsequent change. That's a perfectly good way to find out whether the idea works. The 50 becomes a different matter when someone starts depending on the app to tell them the truth.

Perhaps the code already handles that well. Perhaps it doesn't. A convincing run through the happy path won't tell you much about the paths nobody thought to demonstrate. An engineer can review the code with you, trace where the data comes from, try what happens when it doesn't arrive and ask what else the early version was allowed to assume. You can learn to do that work yourself, too. The way you made the first version doesn't disqualify you from understanding the next one.

So build the app. Keep using AI, and keep shaping what it becomes. Before other people rely on it, bring an engineer into the work to review what the code actually does. Then keep asking those questions as you build and test. That's how we found out why the screen insisted on 50.
