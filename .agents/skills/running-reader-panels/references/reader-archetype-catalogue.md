# Reader archetype catalogue

The [working pool](../assets/reader-archetypes.json) currently contains fifteen motive-led proto-archetypes and can grow when a genuinely different reading motive appears. They are editorial hypotheses, not measured audience segments. Select archetypes for the article's promise and the questions they bring; a legitimate lack of fit is informative. Role, arrival route, prior familiarity, attention and mood can vary within an archetype without creating a new one. Use the [quorum-authoring method](assembling-a-quorum.md) to choose an allocation and author article-specific readers.

| Reading motive | Archetypes and distinct questions |
| --- | --- |
| Story and creative discovery | `story-first` asks what changed; `craft-admirer` follows how a thing was made; `cultural-magpie` tests whether a cultural reference changes the subject; `curious-outsider` wants an intelligible way in. |
| People and fallibility | `human-stakes` follows who carried the consequence; `fellow-mistake-maker` follows how a mistaken belief was revised; `prospective-collaborator` imagines working through disagreement with the author. |
| New tools and ideas | `hopeful-maker` looks for permission to begin with care; `hype-weary` looks for proportion without reflexive cynicism. |
| Learning and challenge | `practical-borrower` wants a next move; `model-builder` wants a transferable decision rule; `counterexample-hunter` tests the claim's boundary; `maintainer-inheritor` asks what the next owner must live with. |
| Professional discovery | `hiring-evaluator` asks whether forwarding this author is safe for the weary manager; `jaded-architect` strips presentation away to test actual technical understanding. |

## Select for the article

Choose a mix of intended readers, adjacent readers and credible challengers. Record why each is in the panel before seeing outcomes. Do not interpret all departures as defects: an article can make and keep a promise to some readers without serving every motive.

Pass this pool through `reader_panel.py --profile-file .agents/skills/running-reader-panels/assets/reader-archetypes.json --profiles <comma-separated-ids>` for a small archetype-level read. For a run-specific quorum, an agent authors a frozen JSON file in off-repo scratch and passes it through `--profile-file`. There is no standing cohort or target of ten stored readers per archetype.

## Revise the pool

Keep, merge or revise archetypes according to the editorial questions they bring to different articles. Attention paths can prompt a closer look, but matching paths do not make two motives interchangeable and different paths do not validate an archetype.

[NN/g on persona scope](https://www.nngroup.com/articles/persona-scope/), [proto-personas and research-backed personas](https://www.nngroup.com/articles/persona-types/), and [personas versus archetypes](https://www.nngroup.com/articles/personas-archetypes/) inform this distinction. [Reuters Institute research on personal relevance and sharing](https://reutersinstitute.politics.ox.ac.uk/news/what-do-news-readers-really-want-read-about) is an adjacent reminder that public reading is not only professional evaluation; it does not prove who visits this site.
