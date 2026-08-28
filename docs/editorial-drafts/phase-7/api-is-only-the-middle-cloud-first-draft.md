# Cloud handoff draft: “I just write the code” is not a full sentence

**Status:** Final Cloud editorial-room manuscript for local Sol handoff. Harley accepted the governing path and the latest three-lens review placed the copy at approximately **£9,500 / £10,000** before final local editorial polish. It is not publication-ready, not admitted, and has not been stood up in the production article frame.

**Governing argument:** “I just write the code” is a natural early-career boundary, but it is not a full sentence. Engineering responsibility expands around implementation: explore the problem, carry unresolved questions across boundaries, use adjacent expertise without commandeering it, leave the system easier to understand for the next engineer, and still recognise when the correct next move is simply to write the code.

**Local Sol handoff:** Preserve the warm experienced-to-younger-engineer posture, the anti-adversarial “no dev is an island” argument, the inherited-bug archaeology and breadcrumb stewardship, the regulated-supplier ownership example, the narrow agentic echo, and the detachable SQL aside. The SQL story is intentionally standalone so it can be rendered as an aside panel without carrying the main article structurally. Remaining work is production-page composition, final subtraction, exact line taste, site-wide fatigue/corpus review and any later admission decision. Do not reopen discovery by default.

## Manuscript

# “I just write the code” is not a full sentence

Seven and a half years ago, I wanted to write good code. My code, working in the real world, having an effect. That seemed like plenty to be getting on with.

When you first get into software engineering, the amount you apparently need to know is ridiculous. Languages, frameworks, patterns, databases, APIs, architecture, testing, deployment, plus whatever somebody has decided you absolutely must understand this week. I remember learning MVC and feeling like I knew quite a lot. Then you look around and realise MVC is one small part of one framework in one language, and there are another fifty things somebody could reasonably ask you about. How on earth does anyone learn all of this?

Against that backdrop, “I just write the code” is a perfectly natural place to hide. What do you think the user journey should look like? I don’t know, I just write the code. How should we schedule this feature around everything else? I don’t know, point my nose at the ticket when it’s ready and I’ll write the code. The supplier is returning a value we don’t handle? Cool. Raise a ticket and I’ll fix it.

There’s already so much to learn just to become competent at turning an idea into working software that drawing a line around the job makes sense. Somebody else decides what we’re building. Somebody else shapes the work. Somebody else decides when we’re doing it. Give me the ticket and I’ll do my bit properly. I don’t look back at that version of myself and see a bad engineer. He was overwhelmed by an enormous technical profession and concentrating on the bit he could see, practise and improve. The attitude adjustment came later, and earned its way into my working practice over years.

The problem with “I just write the code” isn’t that you ever say it. The problem starts when you treat it as a full sentence.

## It just creeps

I never had a grand conversion where I decided to broaden my horizons and become a more rounded engineer. Honestly, it just creeps.

Starting a new job is great for this. Nobody asks the new guy anything. You get a ticket, learn the codebase and write some code. Then six months pass. You’ve built a chunk of the application, fixed a few weird things and learned why this service calls that service. You remember the odd requirement buried three features back. You know which bits are genuinely dodgy and which bits only look dodgy until you understand why they exist. The questions start coming to you.

I needed to understand how the application worked because I wanted to write the code properly. That same knowledge made me useful for questions that had nothing to do with the line of code in front of me. The deeper I got into the product so I could implement it well, the harder it became to pretend the surrounding product knowledge belonged to somebody else.

I didn’t change. Expectations shifted.

For a long time I treated that widening boundary as an irritation, and to some extent I still do. I like writing code. There are days when I would very happily trade a calendar full of meetings for an IDE and a problem nobody wants to bother me about. But the work around implementation gradually stopped looking optional. It was engineering too.

## No dev is an island

John Donne said no man is an island. No dev is an island is the less poetic version I had to learn the hard way.

A product is a clustered responsibility. Product, engineering, QA, operations, specialists, support, consumers and suppliers all hold different pieces of the same thing. The developer sits near the heart of that cluster because so many decisions eventually become software, but the developer is not alone. Nobody around the product wants your code to fail. They want the product to succeed, and they want to help you get it there.

If you start treating Product, QA, DevOps or the database expert as adversaries, gatekeepers or people whose job is to stay on their side of a line, you’ve misunderstood the arrangement. They know things you don’t. You know things they don’t. The product needs both.

That sounds obvious now. It felt considerably less obvious when a bug was raised against a feature I hadn’t touched. Younger me had a very important first question: did I work on feature X? If the answer was no, there was an unspoken second question. Why are you asking me to fix somebody else’s shit code? Find whoever wrote it. Come back when my code breaks.

It’s a beautifully tidy little model of responsibility: I’m responsible for the quality of the code I write, you’re responsible for yours. The product couldn’t care less.

These days, if a bug lands in front of me, authorship is useful context. It isn’t the ownership test. First identify the bug and replicate it. Understand what the application is actually doing before deciding what it should be doing instead. Then do some archaeology. Is there an ADR explaining why this thing works the way it does? Is there something useful in the history? Can I find the original work item or pull request? If the engineer who wrote it is still around, can I ask what they intended? Is that horrible-looking bit genuinely horrible code, or is it the last remaining support holding up some decision made three years ago?

Then look at the tests. What should have failed to tell us the application wasn’t behaving correctly? What can we add so we don’t introduce the same class of problem again? If production is on fire, contain it first. When you’re making the durable fix, understand why and how the problem got there. The code is evidence. It isn’t automatically the answer.

Once you’ve done the archaeology, pay it forward. If that horrible bit of code turns out to be propping up half the application, leave a big fat comment explaining what constraint it is carrying. If the reason is architectural, write an ADR. Record why the decision exists and, just as importantly, what would need to become true before somebody should reconsider it. A well-named regression test can leave another kind of breadcrumb.

You don’t need to refactor the whole application to make it explain itself better for the next engineer passing this way. Sometimes that engineer is the person who wrote the code three years ago. Sometimes they’re the person who’ll touch it three years from now. Sometimes the future dev you’re paying it forward to is yourself.

## Proving it isn’t our bug doesn’t mean we’re done

I’ve had a consumer report a bug where the investigation ended somewhere more interesting than “fix our code.” I traced the behaviour through our side and could prove empirically that our implementation was doing exactly what the upstream data told it to do. The defect wasn’t in our codebase. That was a good result, but it didn’t mean the work was over.

There were two live possibilities. Either the consumer had made an assumption about the behaviour that wasn’t valid, or the supplier upstream from us was behaving differently from what everybody expected. The question that materially mattered was whether the supplier’s behaviour was intended.

This was heavily regulated software, which makes guessing particularly useless. You can’t decide the supplier is wrong because their output is inconvenient. They may be following a regulation that gives them no freedom to behave any other way. You can’t assume they’re right either, so we had to ask.

The investigation had narrowed the problem, ruled our implementation out as the defect location and identified the next question that needed an authoritative answer. That was a clean engineering handoff, but we still owned getting the answer. To our consumer, *we* were the supplier. Telling them “not our bug, go chase the people upstream from us” would have pushed our dependency boundary onto somebody who should not have needed to care about it.

Sometimes ownership means fixing your code. Sometimes it means proving your code is behaving correctly and carrying the unresolved question to the next boundary yourself.

## The ticket isn’t where engineering starts

The same principle applies before implementation. If an upstream supplier starts returning something our application doesn’t understand, I can’t jump straight from “new value” to “change the contract.” First prove what is happening. Is the supplier supposed to be sending it? Is it genuinely new, or have they always sent it and we’ve never handled it properly? What does it mean for the user? Who consumes what we expose downstream? Does the obvious-looking fix alter something another system relies on?

Then I can propose something. The people who need to make the decision can make it with useful information in front of them, and then I can write the code. That work earns its place when it changes the implementation you would otherwise have written. I still want to get to the code. I just want to know I’m writing the right change.

## When the faffing pays rent

Replication, reading history, checking ADRs, digging through old pull requests, talking to people, writing a plan. All of it can feel like faffing when what you really want to do is fix the bloody thing. Faffing stops being faffing as soon as it pays rent.

The first time that work lets your code dodge a trap you would otherwise have walked straight into, there’s a little Cha-Ching moment: the effort just paid for itself. After you’ve seen that happen a few times, research stops feeling like admin you have to finish before you’re allowed to engineer. The research changed the engineering.

The world has shifted here too. These days, if I find an unfamiliar pattern, I have an AI sitting there that I can interrogate relentlessly. Why is this suspicious? Explain it to me. No, I still don’t understand why this particular use is bad. Show me the alternative. What am I giving up? What should I inspect before I touch this?

That can collapse hours of lonely reading into a much tighter learning loop. The AI doesn’t become the source of truth because it explained something confidently. The repository, documentation, tests, observed behaviour and people who understand the system still decide what is actually true. The opportunity is being able to take a real problem just outside the part of the stack you know well and use it to expand yourself instead of bouncing it away because it belongs to somebody else’s discipline.

The warning applies in reverse too. Tell an agent to “just go fix this bug” without getting it to reproduce the problem, research the surrounding code and understand the change it intends to make, and you’ve automated the narrowest possible version of engineering. You’re gonna have a bad time.

## Knowing where your job stops is part of the job

Taking wider responsibility does not secretly make every nearby decision yours. Ask me what a user journey should look like and I’ll probably have an opinion. These days I usually have quite a strong one sitting in my pocket. But Product has expertise I don’t have, and I’m not interested in pretending years of software development also made me a Product Owner.

I’ll offer my view, explain the technical consequences I can see and say something if a decision looks plainly harmful or inaccessible. Then the decision still belongs where the decision belongs.

Scheduling is similar. Ask me how a piece of work should fit around everybody else’s priorities and part of my internal answer is still, “I don’t know, ask the people who schedule things.” The difference is that these days I’m more likely to say, “Let’s get everybody this affects together and work it out,” than “Let me know when you know what I’m doing next.” I still don’t own the schedule. I’m just not using that fact as a reason to leave the problem.

The same applies to specialist work. I can build a pipeline, set up Key Vault and deploy a database. I’m as capable as I need to be. If you need a difficult pipeline built, tested and working today, get the DevOps engineer who knows that work like the back of their hand.

Knowing enough to help and being the expert are different things. Part of engineering judgement is knowing which one the situation requires.

## SQL was my weak point

When I interviewed for The Access Group, I was asked how I would optimise a query. I answered honestly: SQL wasn’t my strongest suit, and I’d probably put my hand up and ask somebody who knew query optimisation to walk me through it.

It didn’t stop me getting the job, but I still wish I’d answered better. Not because I secretly knew loads about query optimisation. I didn’t. But “inspect the query plan, look for unnecessary round trips, work out where the cost actually is, then ask somebody stronger at SQL to check my assumptions” was well within my capability. Instead, “I just write the code” leaked through. Query optimisation felt like somebody else’s territory, so I opted out before finding out what I could contribute.

Not long after joining, I was working on Access Recruitment CRM when a system action was reported as painfully slow. It was a heavily database-led application, with real application behaviour living in stored procedures and database rules rather than the database just acting as somewhere to put data. As I remember it, the slow path ran through roughly seven stored procedures, reaching about four layers deep with a couple of branches near the bottom.

The outer procedure took an ID, expanded it into a set of rows, opened a cursor and called another stored procedure once for every row. That procedure took each ID, expanded it into another set, opened another cursor and handed those IDs one at a time to the next procedure. The pattern repeated further down, so a small set at the top ballooned into a huge number of serial stored-procedure calls.

The underlying problem was more basic than some dark art of query optimisation. SQL is set-based, and this code was treating it like an imperative programming language. Cursors have legitimate uses. They’re not SQL profanity. But a cursor is not the database equivalent of automatically reaching for a programming loop when the thing you’re processing is already a set.

So I changed the shape of the work. Instead of passing one ID at a time down through the procedures, pass a set of IDs. Let each procedure resolve the rows for the whole set, operate over them, produce the next set of IDs and hand that set forward. Existing callers that genuinely only had one ID could keep doing what they were doing. A set of one is still a set. The operation went from several minutes to a couple of seconds.

There’s a circularity to that story that I only really appreciate in hindsight.

In the interview I’d said, “I’d ask somebody who knows this better than me.” Then, when the real problem arrived, I did exactly the opposite. I didn’t ask anybody.

At the time I had too much to prove. SQL was the weak point in my stack, so I read and read until I understood the problem, then worked through the nuances as I went. It worked, and I learned a lot. We also had people around me who knew far more SQL than I did, and I burned wall-clock time that a confident “Can I borrow ten minutes? I think I understand this, but tell me what I’m missing” could probably have saved.

So I can look back at the interview and wish I’d done both things differently. I wish I’d had enough confidence to demonstrate the understanding I already had instead of opting out with “I’d ask for help.” And when the real problem arrived, I wish I’d actually done what I said I would do and asked for help.

Have a go and ask for help don’t have to be mutually exclusive.

Form a view. Investigate it. Learn enough to ask a useful question. Then make use of the expertise around you. I wouldn’t lose a dot of respect by doing that now.

## The technical mountain gets smaller

The funny thing is that the part of engineering I originally found overwhelming has become more manageable with experience. Patterns are cool. Knowing ten languages is cool. You know what’s cooler than cool? Knowing engineering principles well enough that the language is largely irrelevant.

Languages still require effort, frameworks have rules and platforms have traps, but once enough underlying ideas settle into your head, a new language stops looking like an entirely new profession. The syntax changes. The principles travel. You can learn the language.

Learning to feel out the rest of the job is a whole other skill. When do I know enough to start? Whose decision is this? Who else is affected? What am I assuming? Who knows something I don’t? Is this strange code bad, or am I missing the reason it exists? Could ten minutes with somebody else save me two hours? Do we need the specialist? Do we need a conversation? Or have we done enough thinking now and it’s time to stop talking and write the code?

That judgement has taken me much longer to develop than learning another language ever would.

## Finish the sentence

So if you’re earlier in your career and “I just write the code” sounds familiar, I’m not going to tell you to stop saying it. Catch yourself. Qualify yourself. Finish the sentence.

- **I just write the code, but let’s explore the problem.**
- **I just write the code, but my suggestion is…**
- **I just write the code, but I know who can make that decision.**
- **I just write the code, so let’s write the code.**

Sometimes that last one really is the answer. Not every ticket needs an architecture review. Not every bug needs three meetings and an ADR. Not every unfamiliar technology needs you to become the resident expert. The useful question is whether you’re drawing a sensible boundary or retreating into the part of the profession where you already feel comfortable.

Writing good software is still a huge part of engineering. It’s the part that brought me here. “I just write the code” was a useful sentence for a younger engineer who already had more than enough to learn.

Experience didn’t teach me to stop writing the code. It taught me to finish the sentence.
