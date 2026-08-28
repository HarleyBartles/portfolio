---
title: '"I just write the code" is not a full sentence'
date: 2026-08-28
summary: Engineering responsibility expands around implementation, without turning every adjacent discipline into yours to own.
---

Seven and a half years ago, I wanted to write good code. My code, working in the real world, having an effect. That seemed like plenty to be getting on with.

When you first get into software engineering, the amount you apparently need to know is ridiculous. Languages, frameworks, patterns, databases, APIs, architecture, testing, deployment, plus whatever somebody says you must understand this week. I remember learning MVC and feeling like I knew quite a lot. Then you look around and realise it’s one small part of one framework in one language. How on earth does anyone learn all of this?

Against that backdrop, “I just write the code” is a natural place to hide. What should the user journey look like? I don’t know. Point my nose at the ticket when it’s ready. The supplier is returning a value we don’t handle? Cool. Raise a ticket and I’ll fix it.

There’s already so much to learn just to turn an idea into working software that drawing a line around the job makes sense. I don’t see that version of myself as a bad engineer. He was concentrating on the part he could see, practise and improve.

“I just write the code” earns its place as a starting point. Treating it as a full sentence leaves too much of the job outside the boundary.

## It just creeps

I never had a grand conversion where I decided to become a more rounded engineer. Honestly, it just creeps.

Starting a new job is great for this. Nobody asks the new guy anything. You get a ticket, learn the codebase and write some code. Then six months pass. You’ve built a chunk of the application, fixed a few weird things and learned why this service calls that service. You remember the requirement buried three features back. You know which bits are genuinely dodgy and which only look dodgy until you understand why they exist. The questions start coming to you.

I needed to understand the application because I wanted to write the code properly. That same knowledge made me useful for questions that had nothing to do with the line of code in front of me. The deeper I got into the product, the harder it became to pretend the surrounding knowledge belonged to somebody else.

> **I didn’t change. Expectations shifted.**

For a long time I treated that widening boundary as an irritation, and to some extent I still do. I like writing code. There are days when I’d happily trade a calendar full of meetings for an IDE and a problem nobody wants to bother me about. But the work around implementation gradually stopped looking optional. It was engineering too.

## SQL was my weak point

When I interviewed for The Access Group, I was asked how I would optimise a query. SQL wasn’t my strongest suit, so I said I’d ask somebody who knew query optimisation to walk me through it. I got the job, but I still wish I’d answered better. I could inspect the query plan, find the actual cost and ask somebody stronger to check my assumptions. Instead, I treated query optimisation as somebody else’s territory and opted out.

Not long after joining, a painfully slow action in Access Recruitment CRM gave me the real problem. As I remember it, the slow path ran through roughly seven stored procedures, around four layers deep, with branches near the bottom.

The outer procedure expanded one ID into a set, opened a cursor and called another procedure once per row. That procedure did much the same thing. A small starting set ballooned into a huge number of serial procedure calls. SQL is set-based; this code was treating it like an imperative language. Cursors have legitimate uses, but this naturally set-shaped operation wasn’t one of them.

I changed the shape of the work. Each procedure received a set of IDs, operated over the whole set and handed the next set forward. Existing callers with one ID still worked because a set of one is still a set. The operation went from several minutes to a couple of seconds.

I only appreciated the circularity later. In the interview I stepped back before testing what I knew. When the real problem arrived, I treated asking as an admission of failure. Neither made good use of the expertise in the room.

I wish I’d demonstrated my understanding in the interview, then used the available expertise when the unfamiliar problem arrived.

“Have a go” and “ask for help” don’t have to be mutually exclusive. Form a view. Investigate it. Learn enough to ask a useful question. Then use the expertise around you.

## No dev is an island

John Donne said no man is an island. No dev is an island is the less poetic version I had to learn the hard way.

A product is a shared responsibility with unevenly distributed expertise. Product, engineering, QA, operations, specialists, support, consumers and suppliers hold different pieces of it. Many decisions eventually become software, which makes the developer one important participant among many. The product needs everybody’s knowledge.

That felt less obvious when a bug was raised against a feature I hadn’t touched. Younger me had a very important first question: did I work on feature X? If not, why are you asking me to fix somebody else’s shit code? Find whoever wrote it. Come back when my code breaks.

It’s a beautifully tidy model of responsibility: I’m responsible for the quality of the code I write, you’re responsible for yours. The product couldn’t care less.

These days, authorship is useful context. It isn’t the ownership test. Replicate the bug, understand what the application is doing, then do some archaeology. Is there an ADR, original work item or pull request? Can I ask the engineer what they intended? Is that horrible-looking code genuinely horrible, or is it supporting a decision made three years ago?

> **Do we turn off the tap or mop the floor?**

Stop the water first. If production is on fire, contain it. Once it’s stable, establish why the problem got there. What should have failed in the tests? For the durable fix, leave evidence for the next engineer: a regression test, a comment where the constraint is invisible, or an ADR when the reason is architectural. Record what would need to change before somebody reconsiders it. Sometimes that next engineer is you.

## The webhook wasn’t early

A consumer reported a precise-sounding bug: “Your webhook fires out of order. It arrives before the candidate has completed the journey.”

Our API didn’t produce a “candidate completed the journey” signal. It fired one webhook when the upstream supplier told us the journey had reached its outcome. The evidence showed no recorded case where our API fired without that signal.

The consumer also received a redirect from the supplier’s SDK when its candidate journey finished. They expected that redirect before our webhook. Our API made no such guarantee.

Underneath, the SDK checked an uploaded document while moving the candidate into biometric checks. If the document failed, it could stop the biometric work and send us a decline. That might have been deliberate, a misconfigured supplier workflow, a faulty consumer assumption or some combination of them. From our boundary, we couldn’t tell.

### Proving it isn’t our bug doesn’t mean we’re done

We proved our API behaved correctly. We hadn’t proved the wider journey behaved as intended. This was heavily regulated software, which makes guessing particularly useless; the supplier had to answer whether its behaviour was deliberate.

Getting that answer still belonged to us. To our consumer, *we* were the supplier. “Not our bug, go chase the people upstream” would have pushed our dependency boundary onto somebody who shouldn’t need to care about it.

Sometimes ownership means fixing your code. Sometimes it means carrying the unresolved question to the next boundary yourself.

The ticket isn’t where that responsibility starts. If a supplier sends something our application doesn’t understand, I can’t jump from “new value” to “change the contract.” Is the supplier supposed to send it? Is it genuinely new? What does it mean for the user, and who consumes what we expose downstream? Answering those questions gives the decision-makers something useful and changes the implementation I would otherwise have written. I still want to get to the code. I just want to know I’m writing the right change.

## The bit before the code

Replication, history, ADRs, old pull requests, conversations and a plan can all feel like faffing when you want to fix the bloody thing.

> **Faffing stops being faffing as soon as it pays rent.**

The first time that work lets your code dodge a trap, there’s a little Cha-Ching moment: the effort just paid for itself. After you’ve seen that happen a few times, research stops feeling like admin you have to finish before you’re allowed to engineer. The research changed the engineering.

AI has tightened that learning loop. When an unfamiliar pattern lands in front of me, I can interrogate it relentlessly. Why is this suspicious? Show me the alternative. What am I giving up? What should I inspect before I touch this?

AI gets me to a better question faster. The repository, documentation, tests, observed behaviour and people who understand the system settle the answer. It lets me reach beyond the stack I know and expand myself instead of bouncing the problem away as somebody else’s discipline.

The warning applies in reverse. Tell an agent to “just go fix this bug” without reproducing the problem, researching the surrounding code or understanding the intended change, and you’ve automated the narrowest version of “I just write the code.” You’re gonna have a bad time.

## Knowing where your job stops is part of the job

Taking wider responsibility doesn’t make every nearby decision yours. I’ll probably have a strong opinion about a user journey, but Product has expertise I don’t have. Years of software development didn’t also make me a Product Owner.

I’ll offer my view, explain the technical consequences and say something if a decision looks plainly harmful or inaccessible. Then the decision still belongs where it belongs.

I don’t own the schedule either. I’m simply more likely to say, “Let’s get everybody this affects together and work it out,” than “Let me know when you know what I’m doing next.”

The same applies to specialist work. I can build a pipeline, set up Key Vault and deploy a database. I’m as capable as I need to be. If you need a difficult pipeline built, tested and working today, get the DevOps engineer who knows that work like the back of their hand.

Knowing enough to help and being the expert are different things. Part of engineering judgement is knowing which the situation requires.

## The technical mountain gets smaller

The part of engineering I originally found overwhelming has become more manageable with experience. Patterns are cool. Knowing ten languages is cool. You know what’s cooler than cool? Knowing engineering principles well enough that the language is largely irrelevant.

Languages require effort, frameworks have rules and platforms have traps. Once the underlying ideas settle into your head, though, a new language stops looking like a new profession. The syntax changes. The principles travel.

Learning to feel out the rest of the job is another skill. When do I know enough to start? Whose decision is this? What am I assuming? Is this strange code bad, or am I missing its reason? Could ten minutes with somebody else save me two hours? Do we need the specialist, a conversation, or to stop talking and write the code?

That judgement has taken me much longer to develop than learning another language ever would.

## Finish the sentence

If you’re earlier in your career and “I just write the code” sounds familiar, I’m not going to tell you to stop saying it. Catch yourself. Qualify yourself. Finish the sentence.

- **I just write the code, but let’s explore the problem.**
- **I just write the code, but my suggestion is…**
- **I just write the code, but I know who can make that decision.**
- **I just write the code, so let’s write the code.**

Sometimes that last one is the answer. Not every ticket needs an architecture review or every bug three meetings and an ADR. Are you drawing a sensible boundary, or retreating into the part of the profession where you already feel comfortable?

Writing good software is still a huge part of engineering. It’s the part that brought me here. Experience didn’t teach me to stop writing the code. It taught me to finish the sentence.
