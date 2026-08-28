# Cloud discovery record — “I just write the code” is not a full sentence

**Status:** Live editorial checkpoint from the Harley-led Cloud room. This is durable discovery, not public copy, an admission decision or a finished manuscript.

**Current room clock:** fresh start 28 August 2026 at 06:14 Europe/London; three-hour target 09:14; absolute five-hour ceiling 11:14. The short, fatigued 27 August opening was explicitly discarded from time-box accounting and preserved only as source material.

## Accepted governing argument

The planned candidate began as **The API is only the middle**, then broadened provisionally to **The product is only the middle of engineering**.

Discovery produced a stronger, more personal spine and Harley accepted the required curveball reframe:

> **“I just write the code” is not a full sentence.**

The product-is-the-middle observation remains useful, but it is now supporting truth rather than the article’s governing proposition or assumed public title.

The article’s practical closing mechanism is:

> **Catch yourself. Qualify yourself.**

When “I just write the code” appears, finish the sentence instead of using it as a full stop:

- “I just write the code, but let’s explore the problem.”
- “I just write the code, but my suggestion is…”
- “I just write the code, but I know who can make that decision.”
- “I just write the code, so let’s write the code.”

The final variant is important. This is not an argument for ceremony. Once the problem is understood, ownership and decision boundaries are clear, and the risk is ordinary, writing the code may genuinely be the correct next action.

## The early-career posture

When Harley started engineering roughly seven and a half years ago, being a good engineer meant wanting to **write good code**: his code, working in the real world, having an effect.

The profession looked overwhelmingly technical. Languages, frameworks and patterns seemed like an enormous curriculum. Learning MVC felt like a meaningful milestone because the visible challenge was: how can anyone learn all of this?

That early ambition was not foolish and should not be written as one. The code was the part of engineering Harley could see, practise and improve. The narrowness was not caring only about syntax; even then he wanted software to work in the real world. The narrowness was treating the responsibilities around implementation as somebody else’s job.

The recurring phrase was:

> “I just write the code.”

It worked for a surprisingly long time.

Asked what he thought of a new feature: “I don’t know, I just write the code.”

An upstream supplier sends an unexpected code the app does not handle: “Cool, raise a ticket and I’ll fix it.”

Asked how that work should fit around other priorities: “Point my nose at the ticket when it’s ready and I’ll write the code.”

This is the old boundary in its clearest form: somebody else turns ambiguity into a sufficiently shaped unit of implementation work; the engineer enters when the ticket is ready.

## How the boundary widened

There was no conversion moment. Harley’s correction is:

> **“Honestly? It just creeps.”**

He still likes writing code and considers himself good at it. A brand-new job temporarily restores the narrow role because nobody asks the new person. Roughly six months later, demonstrated aptitude and accumulated product knowledge change the social expectation from “don’t ask the new guy” to “Harley knows this shit inside out, ask Harley.”

The mechanism matters: Harley learns how the application works because he needs that knowledge to write the code well. The same knowledge makes him useful for questions beyond implementation.

The deliberately moaning version is that this is annoying. He wanted to write good code; later he can spend much of his time in meetings answering questions about how the app works because he had to learn that system deeply enough to build it.

Key line:

> **“I didn’t change, expectations shifted.”**

The pattern has repeated across jobs. Changing jobs can temporarily reset the expectation by making Harley the new person again. Harley explicitly says that comic/frustrated story is **not this article’s heart**. Preserve it as cutting-room material.

The article’s heart is the more useful conclusion:

> **No more running away from it. It’s part of the job whether you like doing it or not.**

Writing code remains central. The permanent belief that everything around the code is somebody else’s problem eventually becomes incompatible with the level of engineering responsibility Harley wants to carry.

## Before the code: present-day supplier example

When an upstream supplier starts returning an extra code the application does not handle, present-day Harley does not begin with “raise a ticket and I’ll patch it.” He works through the uncertainty first:

1. **Spike it out.** Prove what is happening and where.
2. **Prove the responsibility.** Is the supplier now legitimately sending this code? If so, what should the product do with it? What is the user journey, and how is it different from the cases the product already supports?
3. **Prove the gap.** Was the supplier always sending it and the app never handled it? Is it new behaviour? What is the impact for users? What benefit would support create?
4. **Propose the solution.** Do not casually change a consumer API contract because the implementation looks small. Consultation and downstream consequences still exist.
5. **Report the findings and decide a path collectively.**
6. **Now write the code.**

Do not turn the consumer-contract point into an API-basics lesson. Harley explicitly rejected that diversion: this article is “welcome to engineering,” not “get back to university and learn the basics.”

The example earns its place because it shows that implementation has moved later in the reasoning, not because code has become less important.

## Product decisions without pretending to be Product

Harley resisted questions such as “what do you think the user journey should look like?” because that is Product’s expert domain. He still does not want to hijack user journeys simply because he has experience.

The present-day distinction is participation without commandeering. Harley keeps strong opinions available when asked, explains the reasoning behind them, and flags something plainly illogical or harmful, such as an accessibility failure. He still respects where the decision properly belongs.

This protects the article from the opposite mistake: growing beyond “I just write the code” does **not** mean the engineer gets to own every adjacent discipline.

## Scheduling without pretending to own prioritisation

Asked how work should be scheduled around other priorities, Harley’s current answer is essentially:

> “Let’s have a meeting with everyone who the schedule affects.”

Internally, Harley still recognises that as a more agreeable form of “I don’t know; ask the people who schedule.” The professional difference is that uncertainty no longer ends his involvement. He helps get the right people together so a sound decision can be reached rather than waiting passively for somebody to point him at the next ticket.

## After the code: authorship is not an ownership boundary

A compact expression of younger Harley’s post-implementation view:

> “A bug has been raised with feature X.”
>
> “Did I work on feature X?”

The unspoken insinuation was sharper than simple task ownership:

> “Why are you asking me to fix somebody else’s shit code? Ask the developer who wrote it. Talk to me when my code fails.”

This is the same narrow boundary after implementation. Before the code: “not my decision.” After the code: “not my code.” Both let individual role or authorship boundaries become reasons to disengage from a shared engineering problem.

Present-day Harley starts from first principles instead:

1. Identify the bug.
2. Replicate it.
3. Research intent and history:
   - Is there an ADR?
   - Does repository history explain why some suspicious-looking piece is “held up by this stick and bit of sticky tape” that should not be pulled casually?
   - If the original author is still available, ask what the intent was.
   - Inspect the original work item and PR.
4. Ask what test should have failed to show the product was not compliant, and what regression test can prevent the same class of failure.
5. Only then write the fix.

Harley’s line:

> **“Can’t fix a bug until you know why and how it got there.”**

The code is evidence, not automatically the answer.

## When the “faffing” pays rent

Harley’s reason for treating reproduction, history-reading, research and planning as engineering rather than ceremony:

> **“Faffing stops being faffing as soon as it pays rent.”**

The first time careful thought lets the code dodge a trap that would otherwise have been expensive is a **“Cha-Ching moment.”** The up-front effort has demonstrated its value.

This is deliberately not a generic process sermon. The surrounding work earns its place because it changes the outcome.

### Short agentic echo

The same lesson transfers cleanly to agentic engineering. Asking an agent to “just go fix this bug” without making it reproduce the bug, research the surrounding code and plan the change is the machine-speed version of “I just write the code.” Harley’s summary: “You’re gonna have a bad time.”

Keep this as a compact modern echo. It must not take over an article whose governing argument is conventional engineering responsibility.

## Public-repo corroboration

Wild Bunch supplies public examples of the same engineering shape. These examples corroborate the pattern; they do not establish Harley’s professional chronology or substitute for his first-party account.

### BUNCH-86 / PR #101 — purchase journal projection regression

The visible symptom was a missing purchase entry in `/journal`. The existing event-sourcing posture meant the correct fix was not a local endpoint patch or a revival of the mutable log path. `Apply(StoreItemPurchased)` became responsible for the purchase log entry and `JournalLogProjector` projected it from the event stream, preserving command-path/replay-path equivalence and allowing legacy log storage/read paths to continue being retired.

Editorial use: a superficially local bug can require a different repair once architecture and history define what counts as a legitimate source of truth.

### BUNCH-80 / PR #98 — double-fine bug

Wallet subtraction occurred in both event application and result construction. Under the event-sourcing invariant, state mutation belongs in `Apply`; result construction is not another mutation path.

Editorial use: the architectural rule tells you which of two apparently equivalent lines is wrong.

### BUNCH-118 / PR #134 — malformed prose

The reported bug was a malformed sentence: “a stranger with Is missing the right ear.” Investigation showed the defect was not merely bad punctuation or one bad string. The system relied on fragile prefix stripping over pre-baked sentence fragments. The eventual repair replaced that assumption with structured feature/language tokens and a language service across the relevant seams.

Editorial use: the symptom was one sentence; the real defect was the model underneath it.

## Breadth without pretending to be the specialist

Harley still has the instinctive boundary “that’s DevOps / deployment / ops; I just write the code.” The mature difference is honesty rather than withdrawal.

He can write a pipeline, set up Key Vault, deploy Azure SQL infrastructure, or increase database quota when needed. His description is:

> **“I’m as capable as I need to be.”**

But capability is not specialist fluency. If the requirement is “build and test this pipeline today,” Harley would want a DevOps engineer who knows that domain “like the back of their hand.”

The article must not imply that serious engineers become mediocre substitutes for every specialist. Widening responsibility means enough breadth to participate and unblock ordinary work, plus enough judgement to recognise when risk, speed or complexity warrants the expert.

## What Harley would tell his earlier self

Harley’s answer to the engineer overwhelmed by languages, frameworks and patterns:

> “Patterns are cool. Having ten languages is cool. Y’know what’s cooler than cool? Knowing engineering principles at a level where the language is largely irrelevant. You can learn the language, any language, no sweat. Being able to feel out the rest of the job is a whole nother skill.”

This is a strong pastoral centre. The progression is not from code to management or from implementation to non-technical work. Languages become more portable as underlying principles travel with the engineer. The harder-to-teach skill is the surrounding judgement: sensing uncertainty, ownership, consequence, consultation, intent, specialist need and what must be understood before or after implementation.

Do not use the cliché “coding becomes the easy bit.” It does not express Harley’s view.

## Practical advice for the reader

The strongest Monday-morning behaviour is not “learn the whole lifecycle” or “take more ownership.” It is small enough to practise immediately:

When you catch yourself saying **“I just write the code,” finish the sentence.**

The qualification is a tiny professional check:

> Am I narrowing my responsibility because this is genuinely the right boundary here, or because I would rather retreat into the part of the job I am comfortable with?

The answer may still be “so let’s write the code.” The point is to choose that boundary rather than hide behind it.

Harley explicitly confirmed this as the heart of the article.

## Tone and anti-inferences

- Warm, pastoral and encouraging; not a fight-me essay.
- Do not sneer at junior engineers or portray Harley’s early posture as laziness.
- Do not say senior engineers do not code or that coding becomes easy.
- Do not turn the article into a lifecycle checklist.
- Do not imply product ownership means the Product Owner role or ownership of every adjacent specialist discipline.
- Do not imply Harley enjoys being pulled away from coding; the reluctant truth is part of the story.
- Do not convert “taken seriously” into a status-policing thesis. The intended claim is that permanent disengagement from surrounding responsibility eventually limits professional growth.
- Do not invent one dramatic professional turning point; the lived chronology is gradual creep.
- Public repo evidence can support the engineering pattern but cannot establish what Harley personally learned at work.

## Cutting-room thread

There is a separate, more comic/frustrated essay in the repeating career cycle:

1. join as the new person and mostly get to write code;
2. build enough of the system to know it deeply;
3. become the person everybody asks how it works;
4. spend more time in meetings and less time writing code;
5. changing jobs temporarily resets the cycle.

Harley’s line “I didn’t change, expectations shifted” belongs to that thread. He explicitly said it is not the heart of this article, so preserve it rather than forcing it into the eventual manuscript.

## Still to discover before drafting closes

- Whether a professional employer-safe example adds anything that the Wild Bunch corroboration and supplier/bug examples do not already prove.
- How much of the “jobbing coder” language belongs in public copy versus discovery only.
- The cleanest opening scene or sentence for the new governing argument.
- Whether the article needs an explicit after-shipping/operations example beyond inherited bug ownership and DevOps breadth.
- Final title wording. **“I just write the code” is not a full sentence** is currently the strongest proposition, but title treatment remains Harley-owned until the manuscript exists.
