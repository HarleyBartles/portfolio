---
title: Provisioning is not accumulation
date: 2026-08-12
summary: More instructions do not make a better agent. Give the right knowledge at the right scope at the right time.
---

## The first principle

Early work with agents quickly shows a pattern. You give the same correction twice, then three times. The model forgets a convention, misses a formatting rule, or reintroduces a tool you retired. The natural reaction is to stop typing the same thing and put it somewhere permanent: a project instruction file, a skill, a template. Make the environment remember so the conversation does not have to.

This is a good instinct. Expertise should be provisioned, not repeatedly performed. If a system can carry stable knowledge, let it. The energy freed up is not just typing. It is the cognitive load of keeping every convention in working memory while also doing the actual work. Done well, provisioning is one of the highest-leverage changes in an agentic project.

But the instinct has a seductive twin. Once you see that environment knowledge works, you start moving more and more into it. Every useful clarification becomes a rule. Every repeated nudge becomes a policy. Every edge case becomes a guardrail. Eventually the environment is no longer a clean workspace. It is a landfill of good intentions, each one reasonable in isolation.

## More is not better

Moving every useful rule into the environment can make the agent worse. This is not a problem of willpower or bad models. It is a problem of scope. An agent with too many overlapping instructions does not become more capable. It becomes a mediator between your own accumulated advice.

The symptoms are easy to spot if you know to look. The agent starts to self-discuss. It quotes one rule, then another, then compares them. It performs policy reconciliation before it performs the task. It hesitates before actions that should be obvious. It asks for clarification not because the task is unclear, but because several of your doctrines are all being litigated at once. Tool and skill selection churns. Commitment weakens because the output has to satisfy several overlapping, slightly drifted definitions of good.

I have seen this in my own work. A project instructions file grows over weeks. Each addition was a direct response to a real mistake. No single line is wrong. Together they produce a worker that spends more time balancing your past guidance than writing the next line.

## The diagnosis

When this happens, the first explanation is usually that the agent is under-instructed. Add more context. Clarify the priority. Rewrite the rule. The real diagnosis is almost the opposite. The agent is not under-instructed. It is over-provisioned and poorly scoped.

Over-provisioned means too much knowledge has been pushed into the working context. Poorly scoped means the right knowledge is not at the right level. A formatting rule sits in a global project instruction. A one-off task intent lives forever in a reusable skill. A verification criterion is buried in a prose paragraph. The agent is asked to reason about all of them at once.

The fix is not more words. The fix is to ask what kind of knowledge each item is, and therefore where it belongs. This is the same discipline we apply to code. A global constant, a local variable, a function, a test assertion, and a comment are all ways to capture knowledge, but they are not interchangeable. Putting a local condition in a global config file makes the whole system brittle. Putting stable project doctrine in a single task prompt makes every conversation repetitive. Agentic instruction has the same shape.

## The classification question

Before adding another instruction, ask the question. Is this a stable project rule, a task intent, a reusable workflow, or a verification criterion? Each category has a different natural home.

A stable project rule belongs in project instructions or durable configuration. It holds across tasks. It should be scoped to the workers and directories where it applies. A task intent belongs in the current prompt or task artifact. It should describe the goal of this particular job, not the rules that apply to every job. A reusable workflow belongs in a skill or runbook. It teaches a recurring pattern of work, not a policy. A verification criterion belongs in an explicit check, a test, or a quality contract that can be evaluated against output.

The question is not just about storage. It is about when and whether the current worker needs to see the knowledge at all. Sometimes the right answer is that the current worker does not need the rule now. A worker writing unit tests does not need the full orchestration doctrine. A worker routing work does not need the implementation style guide. The knowledge is not deleted. It is held out of context until the point of need.

This mirrors how we already engineer systems. Lazy loading is a deliberate choice. Eager loading is a deliberate choice. Passing a reference instead of the whole object is a deliberate choice. Agentic provisioning is the same problem in a different medium.

## The concrete takeaway

Provision the right knowledge at the point of need. That is the whole rule.

It is not about accumulating the largest possible instruction surface. It is about matching the knowledge to the worker, the scope, and the moment. Stable rules live in the environment. Task intent lives in the prompt. Reusable patterns live in skills. Verification lives in explicit checks. When in doubt, start small and move a rule up only after you have repeated it enough to be sure it is stable, not just familiar.

The test is whether the agent spends less time reconciling your advice and more time doing the work. If adding a rule makes the agent more hesitant, it is probably the wrong rule in the wrong place. If removing a rule makes the agent violate a real project boundary, you have found the natural home for that rule.

## Conclusion

Instructions are a form of environment design. They should make the agent's job simpler, not heavier. A well-provisioned agent is not the one with the most guidance. It is the one with the guidance it actually needs, available when it actually needs it. That is the difference between provisioning and accumulation.
