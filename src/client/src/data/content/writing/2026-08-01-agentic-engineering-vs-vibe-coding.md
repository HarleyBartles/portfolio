---
title: Agentic engineering and the kindness of vibe coding
date: 2026-08-01
summary: Why vibe coding is not the enemy of craft, what it makes possible, and why the frontier still needs an engineer in the room.
---

# Agentic engineering and the kindness of vibe coding

The term "vibe coding" makes me wince slightly, the way any coined phrase does when it names something people were already doing. Some people treat it as the end of craft. Others treat it as a punchline. I think it is a useful label for a generous thing that is also being oversold.

Vibe coding is describing what you want, taking what the model gives you, and moving on. The name is deliberately light, and the lightness is the point. It lets people who are not engineers make something they can click. That is a door that has been mostly closed until now. The problem is not the practice. The problem is the assumption that a working demo is a finished product.

## Why the bad rap makes sense

Vibe coding gets a bad rap because the artefacts it produces are fragile. A prototype built by prompting can look finished. The first run works. The colours are in the right place. The form saves. It is easy to confuse that for a product, and the people building these tools are not always careful to correct the confusion.

A working demo is not a durable system. Durability is what happens in the hours nobody is watching: the edge cases, the state, the error paths, the migrations, the observability, the security, the access control. The vibe does not cover those, and was never supposed to. The backlash comes from the gap between appearance and reality. The problem is not that people are vibe coding. The problem is the expectation that a vibe is enough.

There is also a real loss of dignity in this for engineers. We have spent a long time convincing the world that building software is hard and requires years of training. Vibe coding makes a lot of that look optional. A lot of what I did in my first few years can now be done by someone who has never read a runtime manual. If that feels threatening, it is because some of it is. But I do not think that is an insult. It opens a door.

## What it makes possible

For most people outside of engineering, software is not a craft. It is a wall. They have ideas they cannot build, workflows they cannot automate, businesses they cannot start because the tooling is out of reach. Vibe coding is the first thing in a long time to put a ladder against that wall.

A product manager can turn a hunch into something clickable. A founder can find out if anyone wants the thing before hiring an engineering team. A domain expert can build a tool that fits their problem, even if the code is embarrassing by engineering standards. Embarrassing code that solves a problem is better than perfect code that never gets written.

A fast proof of concept also changes how product and engineering talk. It turns an argument about requirements into a conversation about something concrete. The product person can show the shape instead of describing it. The engineer can respond to the thing instead of imagining the intent. The prototype becomes a cheap contract that both sides can read.

## The long road after the vibe

But a bridge is not a destination. Once the prototype exists, the long road starts. The fast proof of concept has bought you the right to think about the real version, which is where craft still matters.

The thing I keep coming back to is this: vibe coding is not the end of software engineering. It is the beginning of the conversation about what comes after. The model gets you to the first draft. The engineer gets you from the first draft to the hundredth release.

That is where agentic engineering lives. It is not about replacing the engineer. It is about giving the engineer better tools to do the work that used to take most of the time: scaffolding, migration scripts, tests, documentation, review, refactor, deployment, rollback. The agentic layer accelerates the boring, risky parts so the human can keep the design honest. The frontier is not "no engineers." The frontier is "engineers with better leverage."

## Why the craft still wins

I am not a vibe coder. I am a software engineer, and I work at Access, one of the larger enterprise software houses in the UK. It is now an AI-first business. That context is why I feel calm about this rather than threatened.

I have spent enough time inside real systems to know what they look like after the demo is over. I have shipped code that had to run for a decade, code that had to satisfy auditors, code that had to keep working while the team around it changed. That work is not glamorous, but it is the thing that separates a working prototype from a business that can sleep at night. The agentic tools we are building now will make that work faster, but they will not remove the need for someone who knows what to look for.

The advantage of an engineering background in this new world is not that I can write more code. It is that I know where the code can lie. I know how a clean state hides a race, how a helpful abstraction leaks across a boundary, how a simple feature becomes a support burden. I know that the cheapest code to fix is the code you did not write. These are not insights a model can prompt into existence. They come from being bitten repeatedly by the same kinds of bugs.

## The generous thing to do

I think the right response to vibe coding is generosity. Let it be how people get started, how product and engineering stop talking past each other, and how a founder finds out whether the thing is worth building. Then, when the thing matters, bring in the people who can make it last.

The engineers I admire are not the ones who mock the vibe. They are the ones who understand what it is for and then quietly do the work that turns a good feeling into a good system. That is the craft, and that is the long road I am still walking.
