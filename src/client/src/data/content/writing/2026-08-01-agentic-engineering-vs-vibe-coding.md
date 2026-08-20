---
title: Agentic engineering and the kindness of vibe coding
date: 2026-08-01
summary: Why vibe coding isn't the enemy of craft, what it makes possible, and why the frontier still needs an engineer in the room.
---

# Agentic engineering and the kindness of vibe coding

The term "vibe coding" makes me wince slightly, the way any coined phrase does when it names something people were already doing. Some people treat it as the end of craft. Others treat it as a punchline. I think it's a useful label for a generous thing that's also being oversold.

Vibe coding is describing what you want, taking what the model gives you, and moving on. The name is deliberately light, and the lightness is the point. It lets people who aren't engineers make something they can click. That's a door that's been mostly closed until now. The problem isn't the practice. The problem is the assumption that a working demo is a finished product.

## Why the bad rap makes sense

Vibe coding gets a bad rap because the artefacts it produces are fragile. A prototype built by prompting can look finished. The first run works. The colours are in the right place. The form saves. It's easy to confuse that for a product, and the people building these tools aren't always careful to correct the confusion.

A working demo isn't a durable system. Durability is what happens in the hours nobody is watching: the edge cases, the state, the error paths, the migrations, the observability, the security, the access control. The vibe doesn't cover those, and was never supposed to. The backlash comes from the gap between appearance and reality. The problem isn't that people are vibe coding. The problem is the expectation that a vibe is enough.

There's also a real loss of dignity in this for engineers. We've spent a long time convincing the world that building software is hard and requires years of training. Vibe coding makes a lot of that look optional. A lot of what I did in my first few years can now be done by someone who's never read a runtime manual. If that feels threatening, it's because some of it is. But I don't think that's an insult. It opens a door.

## What it makes possible

For most people outside of engineering, software isn't a craft. It's a wall. They've got ideas they can't build, workflows they can't automate, businesses they can't start because the tooling is out of reach. Vibe coding is the first thing in a long time to put a ladder against that wall.

A product manager can turn a hunch into something clickable. A founder can find out if anyone wants the thing before hiring an engineering team. A domain expert can build a tool that fits their problem, even if the code is embarrassing by engineering standards. Embarrassing code that solves a problem is better than perfect code that never gets written.

A fast proof of concept also changes how product and engineering talk. It turns an argument about requirements into a conversation about something concrete. The product person can show the shape instead of describing it. The engineer can respond to the thing instead of imagining the intent. The prototype becomes a cheap contract that both sides can read.

## The long road after the vibe

But a bridge isn't a destination. Once the prototype exists, the long road starts. The fast proof of concept has bought you the right to think about the real version, which is where craft still matters.

The thing I keep coming back to is this: vibe coding isn't the end of software engineering. It's the beginning of the conversation about what comes after. The model gets you to the first draft. The engineer gets you from the first draft to the hundredth release.

That's where agentic engineering lives. It's not about replacing the engineer. It's about giving the engineer better tools to do the work that used to take most of the time: scaffolding, migration scripts, tests, documentation, review, refactor, deployment, rollback. The agentic layer accelerates the boring, risky parts so the human can keep the design honest. The frontier isn't "no engineers." The frontier is "engineers with better leverage."

## Why the craft still wins

I'm not a vibe coder. I'm a software engineer, and I work at [Access](https://www.theaccessgroup.com/en-gb/), which is now an AI-first engineering business. That context is why I feel calm about this rather than threatened. I've spent enough time inside real systems to know what they look like after the demo is over. I've shipped code that had to run for a decade, code that had to satisfy auditors, code that had to keep working while the team around it changed. That work isn't glamorous, but it's the thing that separates a working prototype from a business that can sleep at night. The agentic tools we're building now will make that work faster, but they won't remove the need for someone who knows what to look for.

The advantage of an engineering background in this new world isn't that I can write more code. It's that I know where the code can lie. I know how a clean state hides a race, how a helpful abstraction leaks across a boundary, how a simple feature becomes a support burden. I know the cheapest code to fix is the code you didn't write. These aren't insights a model can prompt into existence. They come from being bitten repeatedly by the same kinds of bugs.

## The other side of the coin

I want to be fair to the people who are worried about all of this, because I'm one of them sometimes. If getting an AI to do the work becomes the default path, what incentive is there for the next generation to learn the hard, slow, concrete parts of the craft? Are we setting ourselves up for a market where the engineers who can genuinely check the machine become scarce, expensive, and overstretched? It's hard to convince someone to study distributed systems, security, or performance when a prompt can produce something that looks good enough in half an afternoon.

And if fewer people learn those depths, who keeps the checks when the AI hands us something that's wrong in a way only a human can spot? The review becomes a formality. The human in the loop becomes a bottleneck they'd rather automate away. I'm not sure that's a future I want to inherit.

Then there's the deeper question. If the acceleration keeps going, is there a future where we can completely trust the AI to do the work unsupervised? Maybe. I don't know. I'm not convinced we're there yet, and I'm not sure I want to bet our infrastructure on the hope that we will be. Vibe coding might be the final form of software engineering for some problems. For the ones that matter, I think the final form still includes a human who knows what to distrust.

## The generous thing to do

I think the right response to vibe coding is generosity. Let it be how people get started, how product and engineering stop talking past each other, and how a founder finds out whether the thing is worth building. Then, when the thing matters, bring in the people who can make it last.

The engineers I admire aren't the ones who mock the vibe. They're the ones who understand what it's for and then quietly do the work that turns a good feeling into a good system. That's the craft, and that's the long road I'm still walking.

---

*I wrote the first draft of this piece, then shaped it for clarity with the help of the [writing-with-clarity](https://github.com/HarleyBartles/agent-asset-marketplace/blob/main/codex-marketplace/plugins/repo-worker-pack/skills/writing-with-clarity/SKILL.md) skill and the [unslop writing profile](https://github.com/HarleyBartles/agent-asset-marketplace/blob/main/codex-marketplace/plugins/repo-worker-pack/skills/unslop-profiles/profiles/writing.md).*

