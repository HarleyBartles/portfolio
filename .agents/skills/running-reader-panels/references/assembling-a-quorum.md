# Assemble an article-specific reader quorum

The [archetype pool](../assets/reader-archetypes.json) is durable; a panel's readers are not. A reasoning agent writes the run cohort for the article. The runner validates its mechanical boundaries but cannot judge whether the mix is fair or the readers are meaningfully different.

## Charter before readers

Record a short charter in canonical off-repo scratch beside the cohort JSON:

1. The editorial question this run should illuminate, not a hoped-for verdict.
2. The article's title, précis, intended audience and a neutral inventory of subjects, objects and decisions. The inventory says what appears, not whether the prose succeeds.
3. Core archetypes the article promises to serve; adjacent archetypes with a plausible way in; challengers whose scrutiny could reveal a real weakness. Give each selected archetype a count and a reason. Note conspicuous exclusions. Do not select or weight readers to flatter or condemn the draft.
4. The allocation total. A normal full panel has 100 readers, with at most ten from each archetype and no fixed group ratio. Thus 100 needs at least ten credible archetypes. If the article does not support that breadth, run fewer readers instead of padding the panel. A different question may warrant a different allocation; label it a different experiment.

The [weary hiring manager and jaded architect](../../../doctrine/portfolio-design-policy.md#portfolio-wide-editorial-decision-lenses) are distinct portfolio-wide editorial lenses. Their archetypes may join a panel when their reading motive serves its question; the doctrine still applies when they are not selected. The manager tests whether evidence is safe to forward. The architect strips presentation away and tests technical understanding. Neither is instructed to approve the author.

## Write readers within each allocation

For every selected archetype, author up to ten article-specific readers. Each JSON object needs these seven fields: `id`, `archetype_id`, `arrival_intent`, `background`, `desired_payoff`, `drawn_in_by` and `put_off_by`. The profile may name the article's subjects. Change one or more meaningful dimensions across siblings: arrival route, prior familiarity, focal question, tolerance for setup, the evidence they seek, or what makes them disengage. Do not manufacture demographics or ten paraphrases of the same curiosity.

Write each reader as an open test. For an article about moving PDF jobs into dedicated workers, an architect reader might ask whether the move fixes job ownership as well as capacity. That reader could stay for a traceable before-and-after mechanism and leave if the piece substitutes a scaling diagram for evidence. Neither reaction is written as already true.

Before the run, read the profiles without the article's conclusions in mind. Could each reader find the article convincing *or* disappointing? Are there duplicate motives, loaded praise or criticism, desired Jev choices, or an allocation built around a preferred aggregate number? Revise the cohort before seeing any panel result. This judgment is not a keyword filter.

## Freeze and compare

Save the charter and cohort JSON in the same off-repo scratch directory before `--apply`, then use that JSON with `--profile-file`. Run `--check` first and inspect beats, reader count and estimated calls/cost. The report records the article hash, each reader's archetype and a SHA-256 fingerprint of the exact ordered reader definitions. Keep the frozen JSON and charter beside it; the report does not reproduce their full contents. For a paired draft or revision, reuse the same frozen file. Editing a profile or allocation starts a new experiment, even if its IDs stay the same.

Interpret per-archetype trajectories with their original denominators, then inspect individual paths and the flagged prose. The total is a rough barometer, not a sample of human readers or a mandate to rewrite.
