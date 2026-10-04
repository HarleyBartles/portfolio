---
title: "Introducing Sheg"
summary: "Less than a month ago, Jev landed and changed the conversation about what we could build with fast, cheap decisions. I’ve been putting it to work on something closer to home: my writing.\nMeet Sheg."
readingMinutes: 5
status: "published"
tags: ["writing","sheg","system-one","agentic-engineering"]
relatedSlugs: ["agentic-engineering-vs-vibe-coding"]
homepageFeature: {"summary":"Bring your material and a question. Sheg helps your agent investigate it through varied reader perspectives.","inwardLabel":"Meet Sheg","incomingTeaser":"Bring the quizzical brain."}
---

# Introducing Sheg

[Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) gives software a way to ask focused questions and receive structured decisions. It prompted plenty of experimentation, including [Simon Willison’s early exploration](https://simonwillison.net/2026/sep/21/jev/). I wanted to ask how my articles landed with different readers.

Sheg is a tool your agent uses to explore how different perspectives respond to material you give it. You bring a draft and something you’re wondering about; your agent helps you build a study, run it and make sense of the answers.

## What changed for the reader?

Say you’re a screenwriter with two drafts of a two-page scene. You’ve tightened the dialogue and delayed a reveal. You think the new version moves better, but perhaps you’ve made the character’s intentions harder to follow.

You could ask how it lands with fans of your work, sceptical critics, neutral moviegoers, editors, directors, producers, your mum and dad if you can write a profile for them. An editor might care about pace, a director about whether an actor can play the change, a producer about whether the scene needs two pages.

Your agent can help turn “is draft two better?” into questions about the changes you made: is the intention clear, does the reveal arrive at a useful moment, which version would this respondent prefer?

Suppose the answers suggest that some perspectives find the new scene confusing. Ask another question. Does the confusion remain when the preceding scene is included? Does it disappear when you restore one line of dialogue?

Sheg saves the study and each respondent’s context, so your agent can return to particular responses and investigate further. Your agent interprets the structured answers and helps you decide what to ask next. You might add the line back, or decide the preceding scene already does the job and the isolated extract was the wrong thing to judge.

## I built it for my writing

The precursor to Sheg was a reader-panel skill in this portfolio repository. I used its Jev harness while rewriting [Agentic engineering and the kindness of vibe coding](/writing/agentic-engineering-vs-vibe-coding). Respondents felt the article was missing a lived example.

I had one. QA had found a screen showing 50 while the database said 10: a hackathon value was still appearing when the app couldn’t reach its data. I put that incident into the rewrite.

I wanted that workflow available beyond this repository, for other material and other questions.

The name has the same intonation as Jev, but its own identity. It sounds friendly to me, a bit like Shaggy from Scooby-Doo. I’m rather pleased with it.

Sheg helped put this example here. We asked 24 simulated respondents to compare three positions: here, one paragraph up and one paragraph down. Sixteen preferred it here; three would have cut it altogether.

## Your mum’s movie tastes

You can write “the screenwriter’s mum” in a profile and that will have an effect. Describe your mum’s particular movie tastes and that supplies a different perspective. Perhaps she enjoys mysteries but gets irritated when characters conceal things only to keep the plot going. Now the model has something specific to bring to the delayed reveal. It won’t tell you what your actual mum thinks; you can still ask her.

Your agent should help build a cohort with different tastes, constraints and reasons to care. Repeating an unchanged question with the same material and profile adds no new perspective; change the respondent, the draft, the question, or what they’ve already seen.

And you get to disagree with the answers. They can suggest where to look; the decision about your work remains yours.

## Your key, your provider

For hosted studies, bring a TypeSafe/Jev or OpenRouter key and credits. Sheg runs against your account, with an agreed limit on provider calls. Your agent helps configure the credentials securely.

Local [Laya](https://github.com/NandhaKishorM/laya) is already supported in v0.3.0. Sheg doesn’t ship Laya or its model weights; if your machine is suitable, your agent can help install and configure the separate service and check that your study fits.

## Where it goes next

For v0.4.0, I’m planning visual studies through [Clef](https://developers.cloudflare.com/workers-ai/models/clef/), which offers typed decisions over images alongside text. Does an image complement your argument, or would it work better after the next section? You could investigate image placement or compare rendered versions of a page.

The proposed design also helps your agent choose among configured providers, including Laya, Jev and Clef, according to the study’s needs. We need to validate the visual judgments before they become released features.

## Bring it something you’re making

A developer could ask whether a README helps newcomers without making experienced users hunt for the details. A designer could compare onboarding copy for people with different expectations. An author could ask whether an excerpt carries its meaning when shared outside the article.

Sheg currently supports Codex. Tell your agent to install [Sheg](https://github.com/HarleyBartles/sheg), bring a Jev or OpenRouter key, give them your material and ask them to interrogate it with Sheg. If you want local inference, ask about the separate Laya setup.

Sheg will teach your agent how to build a study. Just bring the material and the quizzical brain.

