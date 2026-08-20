---
title: Pass references, not paragraphs
date: 2026-08-15
summary: Multi-agent handoffs are a context-materialisation problem. Pass durable references when you can.
---

When one agent hands work to another, the natural first move is to send everything the next worker might need. That feels generous and safe. It is also one of the fastest ways to starve the system of the resource that actually does the work: available context.

Multi-agent handoffs are not primarily a communication problem. They are a context-materialisation problem. Every word that lands in a worker's prompt becomes part of the working context that the model must process, attend to, and consume tokens to reason over. Some of that material has to be there. Most of it does not.

## Large messages cost twice

Large dispatch messages and large final responses immediately occupy context, and they occupy it in two places at once. The orchestrator that sent the brief has already spent its own context shaping that brief. The worker that receives it spends its context parsing the brief before it can begin the actual task. On the return leg, a verbose final report fills the orchestrator's context with detail it may not need.

If the deliverable is a file, a plan, a test suite, or an analysis, then the words that describe it are usually the least efficient way to move it. The artifact itself is durable state. The words are a transient copy. Pasting transient copies into every conversation turns a single source of truth into a caravan of duplicates, each one competing for attention and tokens.

## The system can know more than any one agent

The total knowledge in an agentic system can be much larger than what any individual worker can hold at once. Durable project state, files, reference material, skills, and previously written artifacts can all exist without every agent loading them in the same turn.

That is the central design shift. The orchestrator does not have to become an all-knowing middleman. Its job is to route work, not to narrate the contents of every artifact it coordinates. A short reference, a path, an identifier, a URI, or a pointer to a task artifact can carry enough information for a worker to locate, read, and act on the material at the right time.

The principle is direct: the agentic system can know more than any individual agent currently has in context. Let the system hold the knowledge. Let each worker hold only the slice it needs for the current step.

## Reference, read, write, receipt

The pattern is simple and applies repeatedly:

- The orchestrator passes a short reference to an input artifact.
- The worker reads the artifact when it actually needs the contents.
- The worker writes its result directly to durable state, not back into the conversation.
- The worker returns a short receipt or reference to the new artifact.

This keeps both ends of the handoff small. The orchestrator can route the next step. The worker can spend its context on the problem, not on digesting a pre-loaded dump. The reader later loads the result only if and when the result is relevant.

The same shape appears in ordinary software engineering: indirection, lazy loading, explicit interfaces, and materialisation under the worker's control. The payoff is not that files make context free. The payoff is that the engineer controls where, when, and whether information is materialised.

## The agentic N+1 trap

Lazy loading is not the only risk. There is an N+1 pattern that is easy to miss: every worker rediscovering the same doctrine on its own.

Picture twenty workers, each opening the same project instructions, finding the same skill, following the same architecture reference, and reloading substantially the same context. Every read may be locally sensible. The worker does need that information. But the system pays for the same loads twenty times.

This is the same shape as an N+1 query in a database. The fix is not to stop loading; the fix is to be deliberate about how and when the material is provisioned. Sometimes eager loading is better: bundle a coherent set of references or pre-materialised context for a worker that clearly needs it. Sometimes lazy loading is better: let a worker resolve a reference only when the work requires it. Either can be correct; neither is correct by default.

The warning sign is duplication. When many workers independently load the same doctrine, the system is paying repeatedly for what it could have paid for once, or not at all.

## Do not make an agent narrate an artifact

The concrete takeaway is small but decisive: do not make an agent narrate an artifact to another agent when it can create the artifact directly.

If a worker's real output is a file, a test report, a schema, a rendered image, or a structured result, then it should write that artifact and return a pointer. The next worker can read the artifact if it needs the contents. The orchestrator can track the pointer without carrying the whole object in its head.

A short receipt is not a proof of correctness. Verification still belongs to the worker or stage that can actually inspect the artifact, run the check, or compare it against the contract. Passing references does not remove the need for verification. It removes the assumption that the conversation must be the file system.

## Pass what matters, when it matters

The strongest handoffs are not the most complete. They are the most scoped. Pass references when you can. Pass contents when you must. Let durable state do what it is good at: persist. Let each worker materialise only what it needs to reason about this step. And let the orchestrator route knowledge instead of carrying it.

That is how a multi-agent system keeps more total knowledge than any single agent, without forcing any single agent to drown in it.
