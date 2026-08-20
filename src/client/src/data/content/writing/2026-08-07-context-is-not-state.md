---
title: Context is not the same as state
date: 2026-08-07
summary: Files are state. Conversation is context. Agentic systems need both, but durable truth lives in files.
---

# Context is not the same as state

A chat is a useful place to think. You can ask a question, chase an edge case, sketch an interface, and change your mind three times before lunch. For one person reasoning through an ambiguous problem, that fluidity is exactly what you want.

A project is not the same thing. A project needs inspectable, versioned, durable state. It needs a place where the next worker, the next day, can look and know what is currently true without replaying a conversation. The difference is not academic. It is the difference between a useful discussion and a system that keeps its shape after the conversation ends.

## The chat is for thinking, not filing

The agentic learning lab makes this distinction early. "A chat is a useful interface for thinking and asking questions. A project needs durable state that can be inspected, changed, versioned, and revisited independently of one conversation." That sentence separates the medium from the artifact.

A chat is good for reasoning because it is cheap to change. You can propose, retract, and re-propose without writing a changelog. But the same property that makes chat good for thinking makes it bad for record keeping. Once the conversation closes, the reasoning is gone. What is left is whatever landed in the filesystem and whatever the next worker happens to remember.

If the only place a decision exists is inside a chat transcript, the decision is not project state yet. It is a message.

## Memory is context. Files are state.

A useful shorthand from the learning lab is this: "Memory is context. Files are state."

Context is what a worker currently has in its working memory. It might be the conversation so far, retrieved project instructions, the content of a file the agent just read, or a few paragraphs of reference material pulled in before the turn. Context helps continuity. It gives the worker the background it needs for the current turn.

State is the durable record of what the project actually is. State lives in files, commits, tests, schemas, and configuration. It is the kind of thing you can diff, pin, roll back, and review outside of any conversation. A file on disk does not evaporate when the agent disconnects. A test does not become false because the session ended.

Context and state are not interchangeable. Context is temporary, selective, and finite. It carries what the current worker needs for the current turn. State is persistent, authoritative, and inspectable. It carries what the project needs to keep its shape across time and across workers.

## Durable state can sit outside any one worker

A useful refinement of the shorthand is that a file can exist as durable state without any current worker having materialised its contents into working context. That is not a subtle point. It is the whole point.

A build artifact, a test report, a requirements document, or an architecture decision record is real project state. It can be correct or incorrect, up to date or stale. But it does not need to be loaded into the current worker's context in order to exist. It sits in the project. It waits for whatever worker, human or agent, actually needs it.

The learning lab makes this explicit in the thread on context transport and materialisation. "A handoff that passes a durable file/artifact reference lets the recipient decide when and whether to resolve the contents." Passing a reference is different from pasting the contents. The file is state. Whether a particular worker loads it into context is a separate question about that worker's current job.

This also means the overall system can know more than any individual agent currently has in context. An orchestrator may only need a verdict and a pointer. A specialist may need the full report. A reviewer may only need the diff. The source of truth stays in the file. The context is just the working copy.

## The mistake is making the agent carry the source of truth

The practical failure mode is easy to spot once you know what to look for. It looks like an engineer asking the agent to remember something important until the end of the session. It looks like a design decision that was discussed, agreed, and then never written down.

In that pattern, the source of truth has shifted into the agent's context. The agent has become the file system. This is the wrong shape. Agent context is finite and selective. Long sessions may be compacted, summarised, truncated, or otherwise transformed. Compacted context can preserve a conclusion while losing the qualification, provenance, rejected alternatives, or reasoning detail that made it defensible. The learning lab is direct on this: "Context capacity is finite; long sessions may be compacted, summarised, truncated, or otherwise transformed." If the only record of a choice is inside that context, the record is fragile.

The same issue shows up when one agent narrates an artifact to another instead of writing the artifact directly. A large final response pushes the whole report into the orchestrator's context. The next worker then has to carry that bulk in order to act on it. It is far cleaner to write the file and pass a reference. "Do not make an agent narrate an artifact to another agent when it can create the artifact directly." The file is the durable state. The reference is the lightweight context.

The curriculum summarises this with the line: "Context is tears in the rain. Persist what matters before the weather changes." That is a warning about lossy storage.

## Write the decision down before the session ends

The concrete takeaway is small enough to fit on a sticky note. If the decision matters, write it to a file before the conversation ends.

This does not mean every thought needs a markdown file. It means the durable output of a session should be durable. Architecture decisions belong in architecture decision records or in the code that enforces them. Conventions belong in project instructions, style guides, or `AGENTS.md` files. Task-specific decisions that were never intended to survive are allowed to fade. The question is not "did we write everything down?" It is "did we write down the things that are now project truth?"

A good stopping ritual for an agentic session is to ask what has changed in the project and where the record now lives. If the answer is "the agent remembers it," the session is not finished. State belongs in files. Files belong in version control. Memory and conversation are the right tools for thinking, but they are the wrong tools for storing truth.

## Closing

Context and state are both necessary. A worker with no background makes bad decisions. But context is not a substitute for state. It is the working material, not the durable artifact.

The projects that survive keep their truth in places anyone can inspect: files, commits, tests, schemas, and records. Chat is for thinking. Files are for facts. Write the facts down before the weather changes.
