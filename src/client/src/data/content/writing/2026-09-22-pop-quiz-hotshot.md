---
title: "Pop quiz, hotshot"
summary: "You have a senior engineer in front of you and 12 minutes to your next meeting. What do you ask?"
readingMinutes: 12
tags: ["writing","software-engineering","engineering-judgement","interviews"]
relatedSlugs: ["why-adrs","the-right-test-isnt-your-favourite-test"]
---

# Pop quiz, hotshot

Probably something like this.

## 1. How do you refactor a large, well-tested legacy codebase?

Sometimes, shoot the hostage. In *Speed*, Jack Traven’s answer to a gunman using a hostage as leverage is to shoot the hostage. Problem changed.

A big test suite can become leverage for the implementation in much the same way. Constructors, collaborators, call order, class boundaries, mocks around every seam: eventually you can reach a point where changing the code means fighting tests whose main achievement is proving the old code still has its old shape. Well, yes. That’s what I’m trying to change.

Before a large refactor I want to know what actually has to survive. User-visible behaviour? A business invariant? Something persisted? An external contract? A replay guarantee? Protect that somewhere capable of observing it properly, then let the implementation get hurt. Break constructors. Split classes. Move responsibilities. Delete tests that only prove yesterday’s class graph. Spend some time red if changing the shape requires it. I’m not proposing a YOLO rewrite with the tests switched off; I want enough protection around the behaviour that the internals are free to move. A good test suite gives you permission to change the code. A bad one gives the code permission not to change.

I did a public version of this in [Wild Bunch ADR-0028](https://github.com/HarleyBartles/wild-bunch/blob/main/docs/adr/ADR-0028-onion-ddd-cqrs-event-sourcing-and-projections-posture.md). We moved towards event sourcing in slices, protected behaviour with characterisation and parity tests while the internals moved, then removed the temporary compatibility machinery when its job was done.

The hostage survived.

## 2. SQL or NoSQL?

I can give you the textbook answer. I assume most senior engineers can. If we’re choosing one, I want to know which guarantees the system needs. What has to become true immediately? What can be stale? Do we need history or replay? What operational machinery are we prepared to own?

Wild Bunch uses PostgreSQL. Some state is relational. Some composed state is JSON-shaped. Relational modelling doesn’t buy me anything useful there, so it sits in JSONB. It could easily have been a JSONL ledger; I chose to keep it in the same Postgres substrate as the relational data. It has an event stream and rebuildable projections because the domain earns those things. It doesn’t also have Kafka, RabbitMQ and a separate event-store product because I know what those words mean.

SQL won that particular argument.

## 3. You need this system to handle ten or a hundred times the load. What do you do?

Ten times what? Traffic? Writes? Storage? Tenants? Before I draw boxes, I want to know which thing has to grow, find what actually limits it, change the limiting thing, then measure again.

I inherited Access Screening after it had already grown into a substantial Django application: thousands of users, hundreds of thousands of records and a bloody enormous bug backlog. A recurring flavour was some variation on: large customer X says this page is really slow. This report times out. This action is fine for smaller customers and horrible for us. You can attack those as unrelated bugs for quite a long time.

Alongside a principal engineer, I helped turn that pile of symptoms into a more useful investigation: where are all the unnecessary database round trips? The application had accumulated N+1 problems in the ORM. Fetch a set of objects, then quietly wander back to the database over and over for related data. Small customer: barely noticeable. Large customer: one page can end up asking the database hundreds or thousands of questions.

We mapped the higher-impact cases back onto the customer bugs they explained, ranked them by the pain they were causing, then worked down from the top. The fixes were often wonderfully boring Django: `select_related()` for single relations that could come back with the main query, `prefetch_related()` for collections and reverse relations that were better fetched in batches. The syntax wasn’t the interesting bit. For some of those pages, scaling meant asking the database once instead of hundreds of times.

## 4. How do you decide what to test, and what does production-ready mean?

I put the test where it can prove me wrong about the next thing I’m about to trust. Small local behaviour? Unit test. Trusting that behaviour to be wired into the application correctly? Move out a boundary. Trusting something involving a database, supplier or public API? Go there.

Production-ready means I have enough evidence around the risks of this particular change that I’m prepared to let somebody use it. I need to be able to deploy it, observe it and own what happens next.

QA shouldn’t be the first person who clicks something I built. I dogfood it before it reaches them; if the journey isn’t coherent in my hands, it doesn’t reach pre-prod. Their evidence is additional, not my first proof that the thing works at all. I wrote the longer version in [The right test isn’t your favourite test](/writing/the-right-test-isnt-your-favourite-test).

## 5. A production system is failing and you don’t know why. What do you do?

Are we turning off the tap or mopping the floor? If water is still pouring through the ceiling, stop the water. We can decide if we need to buy a mop or a pump after. If it’s big enough to need a war room, get the right people in one, establish the blast radius and make sure somebody is carrying comms while the people debugging can debug.

Contain the failure if I can do it safely without destroying the evidence I’ll need afterwards. Then look at what the failing boundary can actually tell me before inventing a story about what went wrong. Production has made me look stupid enough times that I’d rather ask it what happened.

Once we know, fix the cause, prove the original failure no longer happens and leave something behind that makes the next occurrence easier to catch or understand. Root-cause analysis is important. It can wait until the tap is off.

## 6. Monolith or microservices?

Depends. That’s not everyone’s favourite answer. Sorry. I’m perfectly happy with a monolith while one deployable product is buying me simpler transactions, debugging, development and operation. I’m perfectly happy splitting something out when there’s pressure worth paying for: one domain genuinely needs to deploy or scale independently, or one failure really does need a harder boundary around it.

Another process means another network boundary, another deployment, more observability to build and maintain and another place for an ordinary bug to hide. Sometimes that’s cheap. Sometimes it’s extortion. What I don’t particularly enjoy is starting with “microservices are scalable” and working backwards until the architecture has enough boxes to look senior. Architecture is allowed to be complicated. It has to pay rent.

## 7. How do you balance technical debt against shipping the next thing?

I don’t start by assuming every ugly thing is debt. Some code is ugly because the domain is ugly. Some architecture is complicated because the requirement is complicated.

Debt is the stuff charging interest. In Access Checks, consumers have moved from a v1 API to v2. The old endpoint is unused, but while it still exists it is another surface to test, reason about and avoid breaking accidentally. Retiring it is still in the backlog for exactly that reason.

I want to know what we’re paying, how often we’re paying it, what risk it carries and what else we could be doing with the time. If the interest and risk of leaving it now outweigh the opportunity cost of fixing it, pay it down. If they don’t, it waits.

Sometimes the quickest way to ship the next five things is to stop and remove the thing taxing all five. And sometimes somebody says “technical debt” when they mean “I would have written this differently”. That one can stay in the backlog.

## 8. Tell me about a mistake you made as an engineer. What changed because of it?

I didn’t know the documentation was me.

LENS was the first substantial product I worked on professionally. I was very junior when I joined it: three-person engineering team, complicated insurance domain, DDD, CQRS, event sourcing. For a while it felt like learning to breathe underwater.

Eventually I knew the system extremely well. I could work in it fluently. I understood why a lot of the scary architecture existed and which bits were protecting actual business rules. As the other original engineers moved on, I ended up as the last of that original engineering team still there.

I had three months to hand it over and discovered that knowing a system and making that knowledge transferable are quite different skills. I could point at the aggregates. I could follow the events. I could explain the weird bits if somebody asked the right question. I hadn’t spent the previous two years leaving enough of those answers behind.

At the time I thought “it’s textbook DDD” was a reasonable starting point. Find the aggregates, follow the events, off we go. Looking back, that is almost comically insufficient. Why were risk capture and peer review separate gates when their screens looked almost identical? Why did we keep an event stream and temporal row history? The code could show what we built, but it couldn’t reliably tell the next engineer why.

I was promoted to mid-weight shortly before I left. I was still early enough in my career that I didn’t really know how to backfill two years of architectural reasoning into something durable. There wasn’t much engineer-to-engineer handover at the other end either. What survived was much thinner than what I knew.

That’s why I care about ADRs now. I write them where a competent engineer might reasonably come along later, look at the architecture and propose another route. They deserve the argument I had. I wrote the longer version in [Why ADRs?](/writing/why-adrs).

## 9. Tell me about a technical direction you disagreed with. How did you influence the outcome when you couldn’t dictate it?

I’ve got one where I didn’t get my preferred architecture. Probably more useful. I was handed an epic for a new browser-automation service. The work item said nothing about AI. Nothing. So I started building the thing it described: a traditional scraper.

I checkpoint bigger pieces of work with stakeholders as I go because I don’t fancy spending six weeks discovering that I’ve faithfully implemented the wrong thing. That checkpoint caught it. I asked what we were actually trying to get to. There had been an AI conversation a few weeks earlier and that context had never made it into the epic. I don’t think I’d even been in the conversation. Right. Stop. AI-backed scraper. Got it.

I started exploring what that architecture should look like. Then a second constraint arrived: an internal decision had been made about the hosted model endpoint we were going to use. Here’s the endpoint. Here’s the credential. Build around this.

I raised it. An “agentic” system where my entire relationship with the model was one prompt endpoint didn’t feel very agentic. I couldn’t have given you the explanation then that I can now; my understanding of agentic systems was nowhere near where it is today. The endpoint was still an organisational constraint I didn’t own. I built it anyway. The model looks at page state and proposes selectors or browser actions. Deterministic browser automation does the actual work. If something fails, we can feed the failed attempt and current page back in and ask for another route. It’s a scraper with an LLM helping it recover from some of the brittleness that normally makes scrapers horrible.

It shipped and became the backend for two additional paid screening checks. Then, after delivery, my engineering manager said: “Not really agentic is it.” Nope. Not even a bit.

So I did an RCA. Nobody needed throwing under a bus; we could trace how we got there. A few months later the tooling had moved. Access had internal agentic tooling available to build with that hadn’t been available to me the first time around. I put together a replacement proposal and presented it.

Everybody agreed it was the better direction. It’s in the backlog labelled “tech debt”. That’s fine. The existing service works. It’s in production. Customers are paying for the checks it enables. A technically better replacement doesn’t automatically become the next thing Product should spend money on.

My job was to raise the concern, make the case, propose the better route when it became available and make sure the trade-off was visible. I’m not Product. I don’t own the roadmap.

## 10. How do you raise another engineer’s level without becoming their bottleneck?

The previous story has a sequel. A junior engineer came to me because he knew I’d done the AI-backed scraping work. He had an API call where validation could fail and wanted to pass the submitted input and errors to a model so it could explain, in human language, what needed changing. Lovely. Use the endpoint.

In his problem, the model already had everything it needed. No environment to explore, no tools to choose, nothing autonomous to do. Here’s the input. Here’s why it failed. Explain it to a person.

We talked it through. My main advice was KISS: don’t inherit the architecture of my problem just because you came to me after seeing my problem.

The useful thing to pass on was the decision rule, not my implementation. Start with the problem, choose the smallest mechanism that solves it, and don’t inherit somebody else’s complexity because their problem looked adjacent.

He implemented it. That’s close to how I like mentoring to work anyway: make the reasoning available, but leave the keyboard with the engineer unless taking it is actually useful.

## 11. Tell me about a project you owned end to end. What did ownership actually include beyond writing the code?

Access Checks is probably my cleanest current example. I’m the sole engineer carrying it today.

It’s an internal API that sits between the screening products that request checks and the services or suppliers that fulfil them. The work tends to arrive some distance before there is code. Product has a problem or an epic; I need to understand where it fits, what the boundaries are, which systems or suppliers are involved and which questions are still unanswered.

Then there’s the technical design. Then, thankfully, there’s some code. Then tests, infrastructure, deployment, migrations, consuming systems, support and whatever production teaches us afterwards.

I’m a full-stack engineer, but “full stack” gets a bit silly if it turns into React/API/database bingo. The product keeps going when you run out of layers on the architecture diagram.

If a webhook doesn’t arrive, whose promise failed? If we need to move consumers onto a new API version, how do we avoid maintaining two products forever?

Sometimes I’m the person who fixes the next thing. Sometimes the useful move is to take the question to somebody who knows more than I do. I need enough range to recognise the problem, contribute where I’m useful and not drop the thing because it has crossed out of a `.cs` file. I still like writing the code. It’s just the middle.

## 12. How do you approach a problem when the requirements, domain or technology are unfamiliar?

I answered this badly in an interview once. They asked how I would optimise a SQL query. SQL was a weak point for me at the time, so I said I’d ask somebody who knew query optimisation to help. I got the job. Still annoys me.

Asking somebody stronger was fine. I’d skipped everything I could have done before asking them. Inspect the query. Get the execution plan. Find the expensive bit. Form a view. Then go to the person who knows more SQL than me and say, “I think this is the problem. Am I reading this correctly?”

Not long after joining, I got a hideous SQL performance problem in Recruitment CRM. Stored procedures several layers deep were repeatedly turning sets into serial, row-by-row work. I changed the shape so the procedures operated on sets instead. Several minutes became a couple of seconds. Turns out I knew enough to have a go.

These days I start by making the unfamiliar bit smaller. Reproduce it. Inspect what the system is doing. Form a hypothesis. Test something reversible. Then ask for help if I need it.

When I moved into Screening, Python, Django, MySQL and the surrounding GitHub workflow were all new to me. I started in January and was contributing in February. The syntax wasn’t the transferable bit. Knowing how to find out was.

---

If we’ve got twelve minutes together, ask me whatever you like. I’d be just as happy talking about something you’re building and how I can help.
