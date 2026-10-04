# Meet Sheg: article design

Status: article design and final prose approved by Harley on 2026-10-04. The article remains a draft pending the Sheg v0.3.0 release and publication-time verification.
Issue: [PORT-20](https://linear.app/harleys-workspace/issue/PORT-20/write-meet-sheg-launch-article-after-v030).
Working branch: `codex/port-20-meet-sheg`.

## Design agreement

This spec is the only planning document for the article. Iterate it with Harley until the editorial design is ready, then write the first draft directly from it. Do not create a separate implementation plan or start drafting before the design is agreed. Drafting may happen before v0.3.0 releases; public publication follows the release and verified installation guidance.

The article introduces something Harley has made in response to a new possibility. It occupies the space between a product announcement and a personal making-of story. Jev changed the conversation about what developers could build with fast, cheap decisions. Whether it changed the wider AI landscape remains a matter of opinion.

The tone is curiosity, practical enthusiasm and pleasure in making something useful. Do not use Harley's surprise that the initial real run did not crumble as the emotional hook. Do not invent a personal revelation or a story of an inexperienced developer accidentally succeeding.

## Title and precis

Agreed title: **Introducing Sheg**. Keep "Meet Sheg" in the precis on its own line, using an authored line break, so the title and invitation do not repeat each other.

Agreed tone and framing:

> Less than a month ago, Jev landed and changed the conversation about what we could build with fast, cheap decisions. I’ve been putting it to work on something closer to home: my writing. Meet Sheg.

Keep the three-sentence movement and modest invitation. Check the relative date against publication timing; Jev's announcement is dated 15 September 2026.

## Reader, promise and central claim

Reader: someone making or revising something who recognises the difficulty of considering how other people will receive it. Writers provide the lead examples; developers, designers and technical peers should also recognise a use.

Private theme: Harley built this to meet a real need in his own writing and is giving that capability to other people. The heart of the story is what the reader can do with Sheg and their agent. The origin and personal examples establish why he cares and how he has used it.

Reader change: understand what Sheg is, what they can ask it, how a useful follow-up works, and identify something of their own to bring to it.

Working claim:

> Sheg helps you explore how different perspectives respond to your work, compare alternatives and ask useful follow-up questions.

Plain-language explanation to refine:

> Give your agent some material and something you want to understand. Together, you define respondent perspectives and focused questions. Sheg runs those questions, records the answers and lets you follow up with explicit control over what each respondent sees.

Agreed getting-started invitation, preserving Harley's wording and tone:

> Tell your agent to install Sheg. Bring a Jev or OpenRouter key, give them your material and ask them to interrogate it with Sheg. Sheg will teach your agent how to build a study; bring the material and the quizzical brain.

Explain the multi-provider, bring-your-own-key model in accessible language. Hosted studies use the user's own TypeSafe/Jev or OpenRouter account and credits. A separately installed local Laya service is another route where supported and configured, rather than another hosted key. Sheg does not ship Laya or its model weights. The user's agent can help investigate hardware suitability and install/configure that service separately. Do not imply every machine can run it or that installing Sheg sets up local inference automatically.

Link "Sheg" to the verified public repository. The reader can arrive with a vague question: the agent uses Sheg's guidance to help shape the study, including perspectives, questions and useful follow-ups. The reader does not need to arrive with a research design or learn the tool's API. Verify the released installation instructions and agent-guidance capability before publishing this invitation.

Explain naturally how authored profiles supply the perspectives, without repeatedly qualifying the examples as simulations. Keep the inviting wording "your mum and dad if you can write a profile for them". The explanation of how profiles work should make the basis of the responses clear. Responses do not establish actual readership, population opinion or causal effects. Sheg returns structured judgments; the user's agent interprets them with the user.

Working length: approximately 1,000-1,300 words, subject to what the material supports.

## Proposed article movement

### Opening, without a heading

Job: connect the new possibility to something the reader can recognise.

Briefly explain what caught Harley's imagination about Jev: focused judgments became fast and cheap enough to build a different sort of tool around. Introduce Sheg in plain language within the first few paragraphs, then move into the screenplay example. The reader should understand what it does before encountering its development story.

### 1. You’ve changed the scene. What changed for the reader?

Job: show why someone would want to use Sheg.

Keep the screenplay comparison as a short, explicitly illustrative example that someone can easily understand and buy into. It does not need two authored scene drafts or a real screenplay study. The writer has tightened dialogue and delayed a reveal. Ask whether the new version improves pace and intrigue or makes the character harder to understand.

Introduce perspectives through their concerns: fans of the writer's work, sceptical critics, neutral moviegoers, editors watching pace, directors considering performance, producers considering whether the scene earns its running time, and "your mum and dad if you can write a profile for them". Let that sentence carry the invitation; explain the profile mechanism later instead of attaching a simulation qualification here.

Use the same perspectives and questions across the two drafts so the material change is interpretable. A paired direct preference and a separate response to each draft are different questions; choose the encounter design before representing a comparison as a worked study.

### 2. Ask another question

Job: deliver the distinctive follow-up experience.

Show a short exchange between a person and their agent: compare drafts, inspect a response worth investigating, then ask another question with a deliberate change of context.

Possible follow-ups: does the reveal work without the preceding scene? Does the character's intention become clearer when that context is included? Demonstrate why the first answer gives the person somewhere useful to go next.

Any screenplay responses are hypothetical unless a real study supplies them. Do not present invented result distributions or simulated dialogue as recorded evidence.

### 3. I built it for my writing

Job: explain the personal need behind the tool through concrete use, then return to what the reader can do with it.

Harley's account: the pilot version began in this repository and was used to rewrite "Kindness of vibe coding" because the Jev harness indicated that respondents felt it lacked a lived example. Tell that directly. Explain the writing need, what the responses brought to attention and how Harley acted on it. Verify the article's published title, relevant revision and any quoted study evidence before drafting factual detail. This historical pilot is the precursor to Sheg; describe its capabilities accurately rather than assigning the current product's workflow to it retrospectively.

Use this as an origin with a practical consequence, not a development history. The reader-facing centre remains the tool Harley is giving away and how someone can use it with their own agent. The section heading is provisional; the personal material may fit more naturally into "Why Sheg?" once the draft is read as a whole.

Additional live demonstration: use Sheg while authoring this article to investigate where an explanatory paragraph belongs. The paragraph explains a paragraph-placement example; the article then describes how a study helped investigate the placement of that very paragraph. Keep the self-reference understandable in ordinary prose and let it demonstrate the tool doing useful work during authorship. It need not replace the concrete historical example or become the heart of the story.

The study must encounter actual candidate placements in surrounding article text. Define a reader-facing question, such as where the explanation becomes useful or where it interrupts understanding. Asking profiles where an isolated paragraph should go would not give them the reading experience needed to judge its placement. Agree the paragraph, candidate positions, reader perspectives and questions once enough draft text exists to supply that experience. Report the actual result and Harley's editorial judgment, including disagreement or an inconclusive result; do not promise that the study will recommend a particular placement.

The retained Portfolio selected-passage investigation remains available as supporting evidence or a fallback if the new example does not carry the story. A passage may express an article's lesson within the article yet need additional context when shared alone.

Separate the run result from Harley's interpretation. Do not claim that an article changed, or that Harley decided to preserve it, until that editorial decision has been made. Choose the exact example and verify it against retained evidence before drafting this section. Development-candidate studies can be identified honestly; they are not released-package validation.

### 4. The perspectives are part of the work

Job: show how the reader can make the tool useful.

Profiles need pressures, interests and objections. A producer concerned about costs brings different concerns from a fan invested in a character. Cohort design should cover meaningful differences relevant to the question.

Call back to "your mum and dad" to explain the effect of specificity. Writing "the screenwriter's mum" in a profile gives the model something to work with. Describing your mum's particular movie tastes supplies a different, more specific perspective. This is an accessible explanation of how authored profile details shape responses, not a claim that either profile reproduces what the actual person would say.

Explain purposeful variation across profiles, material, questions and context. Repeated identical inputs add no new substantive study coverage. Keep this practical rather than turning it into a research-methodology chapter.

Place the interpretation limits alongside the design choices, without a separate warning section.

Candidate pull quote, to keep only if the surrounding prose earns it:

> The perspectives you choose shape the questions you can answer.

### 5. Why Sheg?

Job: meet the maker and explain the name.

Briefly connect the reader-panel skill bootstrapped in Portfolio to the standalone tool. Explain why the workflow deserved to travel beyond this repository without becoming a development chronology.

Be direct about Harley's own needs and the pilot's contribution to the "Kindness of vibe coding" rewrite. Coordinate this with the personal-use section so the origin is told once. Spend more of the article showing what is now available to the reader and how they work with their agent than recounting how the tool was built.

Preserve Harley's naming explanation: the same intonation as Jev, its own identity, a friendly sound and an association with Shaggy from Scooby-Doo. Do not invent an acronym, etymology or external endorsement.

### 6. Where it goes next

Job: show the next useful possibilities without turning the introduction into a roadmap inventory.

Briefly explain what Clef promises beyond the current Jev text workflow: typed judgments over actual images alongside text. Cloudflare's published model documentation describes multimodal decisions, but this is a capability to integrate and validate, not proof of better judgments or current Sheg support. Connect it to recognisable questions: does this image complement the article, does its placement interrupt the flow, or which of two visual treatments serves the intended readers?

Describe v0.4.0 as planned work. The current proposed specification adds visual material, Clef and capability-aware selection among configured providers, including Laya for eligible local text work. Laya already has an adapter in the text baseline; distinguish bringing it into the richer provider-selection experience from inventing local support for the first time. Sheg continues to use the user's configured hosted accounts or separately operated local service. Avoid promising delivery dates, automatic installation, superior accuracy, or image generation.

Keep the future grounded in the same interaction: bring material, perspectives and a question, then investigate with the agent. Verify roadmap status and provider support again before publication.

### 7. Bring it something you’re making

Job: leave the reader with a recognisable use and a practical next step.

Later in the article, gather a handful of one-sentence use cases to show the breadth beyond the screenplay illustration. Each should name recognisable material and a concrete question: a developer investigating a README for newcomers and experienced users, a designer comparing onboarding copy, an author checking whether an excerpt carries its meaning outside the article. Select the final examples during drafting; keep each to one sentence rather than developing more worked demonstrations.

End with the agreed invitation: tell your agent to install Sheg, bring a Jev or OpenRouter key, give them your material and ask them to interrogate it with Sheg. Refer back to the separately installed local Laya option where relevant. Sheg teaches the agent how to build a study; the reader brings the material and the quizzical brain. Link the product name to its verified public repository and align the installation wording with the released instructions. Link to the companion project page when it exists. Keep the next step conversational and accessible, with the agent helping turn curiosity into a study.

## Presentation and metadata

Keep the main explanation visible. No collapsed asides are proposed for the first draft. Start with one candidate pull quote; remove it if it repeats the prose without helping the reading experience.

An illustration may explain the draft comparison or follow-up. It must earn its interruption and follow existing article figure, accessibility and asset-custody rules. No new article shell or homepage design is in scope.

Author the article summary and homepage teaser/link label once the body is stable. The precis sets the tone but need not be copied into every metadata field. Publication date and final source filename remain unsettled.

## Agreed four-pass first-draft process

Use `/writing-portfolio-articles` to lead the editorial work, `/writing-with-clarity` for mechanics and the final clarity check, and `/writing-style` for authorised voice and contextual fatigue review. Complete these four passes before presenting the first draft to Harley. This process belongs in this specification; no separate planning document is required.

### Pass 1: Draft from Harley's decisions and language

Build from the agreed reader promise, concrete material and Harley's judgments. Preserve the pleasure in making something useful, the screenplay illustration, "your mum and dad" and "the quizzical brain". Do not invent feelings, memories or personal revelations, add performative informality, or imitate catchphrases from older articles. Voice comes from perspective, selection, specificity and judgment as well as rhythm.

### Pass 2: Edit movement, then mechanics

Edit sections, paragraphs, sentences and words in that order. Each section must advance the reader's understanding. Ask each paragraph why it is separate from the paragraphs before and after it. Ask each full stop whether joining the thoughts would improve their relationship or spoil their cadence. Preserve short sentences, fragments and longer accumulating sentences when they serve meaning, emphasis, pace or voice. Do not impose mechanical sentence-length variation or join sentences merely because they are grammatically related.

### Pass 3: Review fatigue in context

Look for repeated contrast frames, symmetrical triplets, uniform section shapes, polished abstractions, unnecessary signposting and explanatory tails after a point has landed. Name the concrete reading cost before changing a passage, then make the smallest repair that preserves meaning and deliberate voice. Do not substitute synonyms for suspicious words, add random roughness or turn phrase matches into automatic verdicts. Use existing Portfolio articles as a watch set for recurrence, not a voice template or phrase bank. The installed writing-profile engine may supply inspectable signals when useful; contextual editorial judgment decides whether they warrant a repair.

### Pass 4: Read continuously and recover what editing damaged

Read the article as continuous spoken prose. Check natural cadence, transitions, jokes without explanatory signalling, and whether the ending stops where the article has finished. Recheck facts, qualifications and clarity after style repairs. Restore Harley's stronger supplied wording wherever polishing has flattened it. Revert edits without a defensible reader benefit. Present consequential uncertainty about Harley's voice for his judgment rather than smoothing it into generic prose.

## Evidence available for design

- [TypeSafe's Jev announcement](https://typesafe.ai/blog/introducing-system-one-models-and-jev), 15 September 2026.
- [Simon Willison's response](https://simonwillison.net/2026/sep/21/jev/), describing substantial early activity.
- [Sean Goedecke's response](https://www.seangoedecke.com/jev-means-structured-output-is-interesting-again/), considering the interface and questioning technical novelty.
- [LangChain's practical integration](https://www.langchain.com/blog/building-prod-with-jev-and-langgraph).
- Retained Portfolio dogfood runs provide exact source material, respondent profiles, questions, typed answers, context and provenance. Inspect the relevant run before selecting public numbers or a passage. Keep raw campaign output outside the repository.

A few nearby links can support the opening context. The article should move into Sheg promptly rather than become a roundup of launch reactions.

## Final editorial decisions

The approved article consolidates the screenplay and follow-up into "What changed for the reader?", separates the name from the personal origin, keeps the result paragraph before "Your mum’s movie tastes", and omits the optional pull quote and illustration. The title is "Introducing Sheg", with "Meet Sheg" on its own precis line and the route `/writing/introducing-sheg`.

The placement study supplied 24 distinct simulated perspectives. Sixteen preferred the selected position and three preferred removing the example. The final article reports those choices without treating them as population opinion or an added-value percentage. The study tested a neutral explanatory paragraph; the result-reporting wording was subsequently authored and accepted editorially.

The final draft and its metadata are approved. Keep the PR in draft until Sheg v0.3.0 releases. The article uses the supported `published` catalogue status on this unmerged branch; the draft PR is the publication hold. Before public publication, verify the released installation route and capability claims, then recheck the article date and "less than a month ago" precis against the actual publication date.

## Design-ready boundary

The design is ready for first draft when Harley agrees the reader promise, central claim, demonstration, movement and ending, and consequential evidence gaps are explicitly bounded. The proposed paragraph-placement study depends on draft context; the first draft may leave its result open until the study and Harley's interpretation exist. First-draft review then follows the Portfolio article-writing policy and playbook, with prose and metadata reviewed before normal publication checks. No release tag, new paid study, public article or project page is created by this specification.
