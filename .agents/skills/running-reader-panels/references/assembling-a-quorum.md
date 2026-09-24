# Assemble an article-specific reader quorum

The [archetype pool](../assets/reader-archetypes.json) is durable; a panel's readers are not. A reasoning agent writes the run cohort for the article. The runner validates its mechanical boundaries but cannot judge whether the mix is fair or the readers are meaningfully different.

## Charter before readers

Record a short charter in canonical off-repo scratch beside the cohort JSON:

1. The editorial question this run should illuminate, not a hoped-for verdict.
2. The article's title, précis, intended audience, durable reader question and a neutral inventory of subjects, objects and decisions. The inventory says what appears, not what a reader must seek or whether the prose succeeds.
3. Core archetypes the article promises to serve; adjacent archetypes with a plausible way in; challengers whose scrutiny could reveal a real weakness. Give each selected archetype a count and a reason. Note conspicuous exclusions. Do not select or weight readers to flatter or condemn the draft.
4. The intended allocation. Aim for 100 readers, with at most ten from each archetype and no fixed group ratio. Thus 100 needs at least ten credible archetypes. The final allocation is determined by the admission gate below. A different question may warrant a different allocation; label it a different experiment.

The [weary hiring manager and jaded architect](../../../doctrine/portfolio-design-policy.md#portfolio-wide-editorial-decision-lenses) are distinct portfolio-wide editorial lenses. Their archetypes may join a panel when their reading motive serves its question; the doctrine still applies when they are not selected. The manager tests whether evidence is safe to forward. The architect strips presentation away and tests technical understanding. Neither is instructed to approve the author.

## Write readers within each allocation

For every selected archetype, author up to ten article-specific readers. Each JSON object needs these seven fields: `id`, `archetype_id`, `arrival_intent`, `background`, `desired_payoff`, `drawn_in_by` and `put_off_by`. The profile may name the article's subjects. Change one or more meaningful dimensions across siblings: arrival route, prior familiarity, focal question, tolerance for setup, the evidence they seek, or what makes them disengage. Do not manufacture demographics or ten paraphrases of the same curiosity.

Write each reader as an open test of a reader need, not the current draft's answer to it. For an article about making software with AI, a maker might want to know what changes when other people start relying on their tool. They may value an incident, a principle or a practical account; none is required by their profile. A reader whose payoff requires the draft's particular metaphor, hackathon incident or section is tainted even if the prose sounds curious. Subject-specific motives are welcome; draft-specific answer keys are not.

## Admit the cohort once

1. Draft up to 100 distinct readers, applying the substitution test while writing: could two substantially different, credible articles serving the same durable reader question both satisfy this reader? Do not invent motives or pad archetypes.
2. Audit **every** drafted profile once, considering all seven fields. Mark it `admit` or `repair` with a short reason. Mark `repair` if it depends on a particular example, metaphor, incident, tool, section, structure or conclusion that a strong revision could omit. Also check whether the allocation collectively demands one treatment despite individually plausible profiles. Look for duplicates, loaded praise or criticism, desired Jev choices and a preferred aggregate number. This is editorial judgment, not a keyword filter.
3. Make **one bounded repair pass** on the marked profiles, giving each at most one rewrite toward an authentic underlying reader need. Recheck each repaired profile once with the same substitution test. Admit those that pass; remove those that still fail. Do not revise a failed repair again, add replacements or start another audit round to restore the count.
4. Record the initial `admit` and `repair` counts, repaired profiles that passed or failed recheck, and the final admitted count by archetype in the charter. Explain any shortfall and freeze only the admitted readers. A clean cohort of 60 is preferable to a cohort of 100 containing 40 tainted readers; 100 clean readers remains the aim.

The runner cannot certify semantic cleanliness. Do not run `--apply` until this admission record is complete.

## Freeze and compare

Save the admitted charter and cohort JSON in the same off-repo scratch directory before `--apply`, then use that JSON with `--profile-file`. Run `--check` first and inspect beats, reader count and estimated calls/cost. The report records the article hash, each reader's archetype and a SHA-256 fingerprint of the exact ordered reader definitions. Keep the frozen JSON and charter beside it; the report does not reproduce their full contents. For a paired draft or revision, reuse the same frozen file. Editing a profile or allocation starts a new experiment, even if its IDs stay the same. A cohort whose payoffs require the original's specific moves is a baseline diagnostic for that version, not a revision-comparison cohort; make a newly admitted cohort and run both versions with it.

Interpret per-archetype trajectories with their original denominators, then inspect individual paths and the flagged prose. The total is a rough barometer, not a sample of human readers or a mandate to rewrite.
