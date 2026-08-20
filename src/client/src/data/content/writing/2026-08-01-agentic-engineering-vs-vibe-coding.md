---
title: Agentic engineering and the kindness of vibe coding
date: 2026-08-01
summary: Why vibe coding is not the enemy of craft, what it makes possible for non-coders, and why the frontier still needs an engineer in the room.
---

# Agentic engineering and the kindness of vibe coding

The term "vibe coding" landed like a pebble in a pond. Some people saw it as the end of craft. Others saw it as a joke. I see it as one of the more generous ideas to appear in software in years, and also one of the most easily misunderstood.

Vibe coding is the practice of describing what you want, accepting what the model hands back, and moving on. The name is intentionally light. That lightness is why it works for the people it works for, and also why it makes professional engineers nervous. It feels too easy. It looks like carelessness. In a field where the word "engineering" still carries weight, anything that calls itself a vibe can sound like a dismissal of the whole discipline.

I do not think that is fair.

## Why the bad rap is understandable

Vibe coding gets a bad rap because the artefacts it produces are fragile. A prototype built by prompting can look like finished software. The first run works. The colours are in the right place. The form saves to a spreadsheet. It is easy to confuse that for a product.

The backlash comes from the gap between appearance and reality. A working demo is not a durable system. Durability is what happens in the hours nobody watches: edge cases, state handling, error paths, migrations, observability, security, access control. The vibe does not cover those. It was never supposed to. The problem is not that people are vibe coding. The problem is the expectation that a vibe is enough.

There is also a real loss of dignity here. Software engineering has spent decades convincing the world that building software is hard, that it requires years of training, that the people who do it are special. Vibe coding makes all of that look optional. If that feels threatening, it is because some of it is. A lot of what I did in my first few years can now be done by someone who has never read a runtime manual. That is not an insult. It is a liberation.

## What it makes possible

For most of the people I know outside of engineering, software is not a craft. It is a wall. They have ideas they cannot build, workflows they cannot automate, and businesses they cannot start because the tooling is out of reach. Vibe coding is the first thing in a long time to put a ladder against that wall.

It lets a product manager turn a hunch into something you can click. It lets a founder validate whether anyone wants the thing before they pay for an engineering team. It lets a domain expert build a tool that fits their problem, even if the code is embarrassing by engineering standards. Embarrassing code that solves a problem is better than perfect code that never gets written.

This is where the product and engineering bridge gets real. A fast proof of concept turns an argument about requirements into a conversation about something concrete. The product person no longer has to describe the feature; they can show the shape of it. The engineer no longer has to imagine the intent; they can respond to the thing. Both sides are better off. The prototype becomes a contract, and the contract is much cheaper to write in clicks than in tickets.

## The long road after the vibe

But a bridge is not a destination. Once the prototype exists, the long road starts. The fast proof of concept has now bought you the right to think about the real version. That is the part where craft still matters.

This is the distinction I keep returning to. Vibe coding is not the end of software engineering. It is the beginning of a much larger conversation about what comes after. The model gets you to the first draft. The engineer gets you from the first draft to the hundredth release.

That transition is where agentic engineering lives. It is not about replacing the engineer. It is about giving the engineer a new set of tools to do the work that used to take most of the time: scaffolding, migration scripts, tests, documentation, review, refactor, deployment, rollback. The agentic layer accelerates the boring, risky parts so the human can keep the design honest. The frontier is not "no engineers." The frontier is "engineers with better leverage."

## Why the craft still wins

I am not a vibe coder. I am a software engineer, and I work at Access, one of the largest enterprise software houses in the UK and now an AI-first business. That context is the reason I feel calm about this moment rather than threatened by it.

I have spent enough time inside real systems to know what they look like after the demo is over. I have shipped code that had to run for a decade, code that had to satisfy auditors, code that had to keep working while half of the team changed. That work is not glamorous, but it is the thing that separates a working prototype from a business that can sleep at night. The agentic tools we are building now will make that work faster, but they will not remove the need for someone who knows what to look for.

The advantage of an engineering background in this new world is not that I can write more code. It is that I know where the code can lie. I know how a clean state hides a hidden race, how a helpful abstraction leaks across a boundary, how a simple feature becomes a support burden. I know that the cheapest code to fix is the code you did not write. These are not insights a model can prompt into existence. They come from having been bitten, repeatedly, by the same kinds of bugs.

## The generous thing to do

So I think the right posture toward vibe coding is generosity. Let it be the way people get started. Let it be the way product and engineering stop talking past each other. Let it be the way a founder proves something is worth building. Then, when the thing matters, bring in the people who can make it last.

The engineers I admire are not the ones who mock the vibe. They are the ones who understand what the vibe is for, and then quietly do the work that turns a good feeling into a good system. That is the craft. That is the long road. And that is where agentic engineering is going.
