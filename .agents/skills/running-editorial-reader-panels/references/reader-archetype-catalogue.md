# Reader archetype catalogue

The [working pool](../assets/reader-archetypes.json) contains fourteen motive-led proto-archetypes. They are editorial hypotheses, not measured audience segments. Select readers for the article's promise and the questions they bring; a legitimate lack of fit is informative. Role, arrival route, prior familiarity, attention and mood can vary within an archetype without creating a new one.

| Reading motive | Archetypes and distinct questions |
| --- | --- |
| Story and creative discovery | `story-first` asks what changed; `craft-admirer` follows how a thing was made; `cultural-magpie` tests whether a cultural reference changes the subject; `curious-outsider` wants an intelligible way in. |
| People and fallibility | `human-stakes` follows who carried the consequence; `fellow-mistake-maker` follows how a mistaken belief was revised; `prospective-collaborator` imagines working through disagreement with the author. |
| New tools and ideas | `hopeful-maker` looks for permission to begin with care; `hype-weary` looks for proportion without reflexive cynicism. |
| Learning and challenge | `practical-borrower` wants a next move; `model-builder` wants a transferable decision rule; `counterexample-hunter` tests the claim's boundary; `maintainer-inheritor` asks what the next owner must live with. |
| Professional discovery | `hiring-evaluator` looks for attributable judgment and consequence, not a general impression of seniority. |

## Select for the article

Choose a mix of intended readers, adjacent readers and credible challengers. Record why each is in the panel before seeing outcomes. Do not interpret all departures as defects: an article can make and keep a promise to some readers without serving every motive.

For *Pop quiz, hotshot*, `hiring-evaluator`, `prospective-collaborator`, `practical-borrower`, `model-builder`, `counterexample-hunter` and `fellow-mistake-maker` put different pressure on the same Q&A. For the Rian Hughes/Chassis essay, `story-first`, `craft-admirer`, `cultural-magpie` and `curious-outsider` test narrative, making, reference and accessibility without requiring an engineering job title.

Pass this pool through `reader_panel.py --profile-file .agents/skills/running-editorial-reader-panels/assets/reader-archetypes.json --profiles <comma-separated-ids>` for an archetype-level read. The first ten authored readers, under `assets/reader-profiles/craft-admirer.json`, can be run directly with `--profile-file`. The intended eventual inventory is ten stored readers per archetype, 140 total; the other thirteen groups are not authored yet. Runtime generation is not the intended way to fill them.

## Evidence and revision

The pool was rebuilt after contrasting two unlike articles and running a bounded Jev attention experiment. The experiment exposed a parser defect and some useful article-fit differences, but identical attention paths do not establish that profiles are interchangeable, and different paths do not validate a persona. Keep, merge or revise profiles as field use reveals whether they ask materially different editorial questions.

[NN/g on persona scope](https://www.nngroup.com/articles/persona-scope/), [proto-personas and research-backed personas](https://www.nngroup.com/articles/persona-types/), and [personas versus archetypes](https://www.nngroup.com/articles/personas-archetypes/) inform this distinction. [Reuters Institute research on personal relevance and sharing](https://reutersinstitute.politics.ox.ac.uk/news/what-do-news-readers-really-want-read-about) is an adjacent reminder that public reading is not only professional evaluation; it does not prove who visits this site.
