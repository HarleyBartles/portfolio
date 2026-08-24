import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink } from '../../../components/ExternalLink'
import { CaseStudyBody } from '../CaseStudyBody'
import { CaseStudyEvidence } from '../CaseStudyEvidence'
import { CaseStudySection } from '../CaseStudySection'
import { WildBunchDeterminismFigure } from './WildBunchDeterminismFigure'
import { WildBunchEventFlow } from './WildBunchEventFlow'
import {
  WildBunchAuditEvidence,
  WildBunchProductEvidence,
  WildBunchTrailMapEvidence,
} from './WildBunchProductEvidence'
import './WildBunchCaseStudy.scss'

const repositoryUrl = 'https://github.com/HarleyBartles/wild-bunch'
const localSetupUrl = `${repositoryUrl}#run-the-pre-alpha-locally`
const historicalReferenceUrl = 'https://worldofspectrum.org/archive/software/games/the-wild-bunch-firebird-software-ltd'
const revision = '2a9814d094148bb789766a27d316095fecce5a60'
const sourceRoot = `${repositoryUrl}/blob/${revision}`
const pinnedRepositoryUrl = `${repositoryUrl}/tree/${revision}`
const graphEvidenceUrl = `${sourceRoot}/tests/WildBunch.GameContent.Tests/TrailGraphGeneratorTests.cs`
const persistedWorldEvidenceUrl = `${sourceRoot}/src/WildBunch.Domain/World/WorldSnapshot.cs`
const developerToolingEvidenceUrl = `${sourceRoot}/src/WildBunch.Web/src/dev/DevOverlay.tsx`

export function WildBunchCaseStudy(): ReactElement {
  return (
    <CaseStudyBody>
      <section
        aria-label="Wild Bunch case study"
        className="case-study wild-bunch-case-study wild-bunch-case-study--composed"
        data-visual-contract="wild-bunch-evidence-ledger"
      >
        <div className="wild-bunch-story-movement wild-bunch-story-movement--origin" data-story-movement="origin">
          <CaseStudySection title="The game I wanted to return to" layout="lead">
            <p>By the time the sheriff arrived, a dying man had handed you his Colt .45 and described the outlaw who shot him. It was enough to put the wrong name on the crime: yours. The original Wild Bunch sent you across five frontier towns to find the real killer and bring him to justice while a Pinkerton agent followed your trail. Between clues, you could collect other bounties, buy supplies, drink, gamble and try to stay one town ahead of the law.</p>
            <p>That small, mostly text-drawn frontier first found me on an Amstrad CPC 464 when I was five, and it felt enormous. Firebird Software published the original in 1984. I played the later CPC version on the same machine where Locomotive BASIC became my first programming language.</p>
            <p>Forty years later, I'm not trying to reconstruct the software I played. My memory's incomplete and probably wrong in places, but that's useful: I want to recreate the experience it left behind. Five towns felt like a whole dangerous frontier. Every journey carried possibility, and somewhere behind me the law was getting closer.</p>
            <p>Playing the original now wouldn't make me five again, and a faithful port wouldn't make an adult feel that scale. My version has to become a different game. I can keep the false accusation, the pursuit and the search for the real killer, then build outward until the world produces the uncertainty, consequence and excitement I remember.</p>
            <p>That meant beginning with something deterministic, then threading salted randomness through play. The deterministic base had to carry replayability on its own: one starting world should remain knowable, while another seed should produce a different world that's just as stable. Surprise could come from moving between those worlds and varying what happened inside them without losing the ability to explain either.</p>
            <p><ExternalLink href={historicalReferenceUrl}>Historical Wild Bunch archive</ExternalLink></p>
          </CaseStudySection>
        </div>

        <div className="wild-bunch-story-movement wild-bunch-story-movement--determinism" data-story-movement="determinism">
          <CaseStudySection title="Making chance reproducible">
            <div className="wild-bunch-story-movement__lead">
              <p>I treated the seed as the address of a starting world. Randomising it is a first-class player choice. Once chosen, that world can be revisited by tests or by me chasing a bug.</p>
              <p>The seed is UUID-shaped because 128 bits are familiar to store, copy and pass around, but I didn't want 128 bits of arbitrary noise. The v17 codec currently uses 33 of them and deliberately reserves 95. It spends bits on choices that need to survive as part of the world contract, then gets more variation from deterministic policies. Town names, for example, come from shuffling a pool of 40 names rather than assigning an encoded field to every town.</p>
              <p>The map follows the same idea. It starts with Delaunay candidates, takes a minimum spanning tree so every town is connected, adds useful alternate trails, filters awkward parallels and corridors, then repairs cases that would strand a town or leave it under-connected. A compact recipe produces meaningful route distances and more than one way through the map. Every road remains reproducible without being encoded separately.</p>
              <p>Town layout closes a subtler gap. Dustwell, shown above, is one generated town in this seed's map-world. Every town comes from the world contract, and the chosen entropy policy decides whether salt may vary its layout. Once generated, that layout becomes session state and travels through snapshots and replay. When the player leaves and returns, it's the same place.</p>
              <p><ExternalLink href={graphEvidenceUrl}>Pinned graph-generation evidence</ExternalLink> · <ExternalLink href={persistedWorldEvidenceUrl}>Pinned persisted-world evidence</ExternalLink></p>
            </div>
            <div className="wild-bunch-story-movement__proof wild-bunch-story-movement__proof--determinism">
              <WildBunchDeterminismFigure />
            </div>
            <div className="wild-bunch-story-movement__proof wild-bunch-story-movement__proof--map">
              <WildBunchTrailMapEvidence />
            </div>
            <div className="wild-bunch-story-movement__afterword">
              <p>The seed describes the base world; it doesn't swallow the whole playthrough. Difficulty, entropy policy, named salts and player choices remain legible inputs of their own. Under the Boring policy, the same seed, difficulty, entropy policy and ordered choices take the same path. Other policies can salt state changes to make a run less predictable while preserving the source of that variation.</p>
              <p>That separation gave me two useful layers of replayability. I can compare stable worlds before introducing variable play, and I can make the variable parts repeat when a test or investigation needs them to. Determinism lets me put surprise back where I found it without giving up an explanation.</p>
              <p><ExternalLink href={`${sourceRoot}/src/WildBunch.GameContent/NewGame/SeedWorldResolver.cs`}>Pinned resolver evidence</ExternalLink></p>
            </div>
          </CaseStudySection>
        </div>

        <div className="wild-bunch-story-movement wild-bunch-story-movement--event-history" data-story-movement="event-history">
          <CaseStudySection title="A playthrough worth keeping">
            <div className="wild-bunch-story-movement__lead">
              <p>Once the starting world was reproducible, the next question was whether the history inside it should be reproducible too. A final database row can tell me where a player ended up. It can't tell me which actions brought them there, which version of the rules accepted each action, or where two apparently identical sessions first diverged.</p>
              <p>That's the job I gave event sourcing. A player action becomes a command. GameSession decides whether it's legal and emits a typed fact. Persistence appends that fact to the session's ordered stream. Replaying the facts rebuilds the state. The audit below makes that history inspectable.</p>
              <p>DDD puts those decisions in GameSession. One live session forms the aggregate boundary around the invariants connecting its player, world, clock, journey, investigation and bounty. CQRS separates commands that may change the session from queries over its projections. The command repository loads and stages the aggregate, read repositories serve the projections, and the Unit of Work commits the staged changes. Onion dependency direction keeps the domain rules independent of HTTP, EF/PostgreSQL and Phaser.</p>
              <p>Each event stream carries a version, so if two commands race, one fails instead of quietly overwriting the other. That choice comes with a bill. Events need stable contracts; old payloads need upcasters; read models need rebuilding; optimistic failures need a retry policy; snapshots must remain disposable shortcuts rather than a second truth.</p>
              <p>I only get to call that exact replay because it's falsifiable. Full-stream equality tests rebuild a session from its events and compare the result. If the reconstructed state differs, the architecture hasn't earned the claim.</p>
            </div>
            <div className="wild-bunch-story-movement__proof wild-bunch-story-movement__proof--flow">
              <WildBunchEventFlow />
            </div>
            <div className="wild-bunch-story-movement__proof wild-bunch-story-movement__proof--audit">
              <WildBunchAuditEvidence />
            </div>
            <div className="wild-bunch-story-movement__afterword">
              <p><ExternalLink href={`${sourceRoot}/tests/WildBunch.Integration.Tests/FullReplayEqualityTests.cs`}>Pinned replay-equality evidence</ExternalLink></p>
            </div>
            <aside className="wild-bunch-dossier" aria-label="Text-first technical dossier">
            <h3>Under the bonnet</h3>
            <dl>
              <dt>Application</dt>
              <dd>.NET 10 and ASP.NET Core over PostgreSQL; React and TypeScript in the browser; Phaser handles only rendering and input.</dd>
              <dt>Architecture</dt>
              <dd>DDD around GameSession; CQRS command/query separation; Onion dependency direction; event sourcing, projections, snapshots, optimistic concurrency and event upcasting.</dd>
              <dt>Persistence</dt>
              <dd>A command repository loads and stages the GameSession aggregate; read repositories serve projections; a Unit of Work commits the staged command-side changes.</dd>
              <dt>Evidence</dt>
              <dd>xUnit unit and ASP.NET integration suites; Vitest with React Testing Library; replay-equality tests, architecture guardrails and browser review.</dd>
            </dl>
            </aside>
          </CaseStudySection>
        </div>

        <div className="wild-bunch-story-movement wild-bunch-story-movement--knowledge-boundary" data-story-movement="knowledge-boundary">
          <CaseStudySection title="The player and the developer shouldn't see the same game">
            <div className="wild-bunch-story-movement__lead">
              <p>Projections let the same history produce different views. The player should see only the clues, warrants and suspect information they've earned. A developer may need the full ordered audit. The case file and wanted notice are player-safe projections rather than convenient views over every fact the server knows.</p>
              <p>Hiding the culprit in a React component would hide nothing from somebody inspecting the response. The read model itself has to respect the knowledge boundary. CQRS pays rent here because the player query and the diagnostic query can answer different questions without either becoming the command model.</p>
              <p>The same boundary keeps development control out of player actions. Developer commands and queries have their own surface. When reproducing a bug, I can fix a salt source or prepare a one-use next action, then let the ordinary player-facing command consume it. Exact replay gets me back to the reported state; deterministic preparation makes the next apparently random step repeatable as well.</p>
              <p>That control is already useful during development. With many hosted sessions, a difficult report could arrive with an exact accepted history, be reconstructed away from the player's live session, and have its next uncertain decision exercised deliberately. Otherwise I have a screenshot, a mutable row and a hope that somebody can make the bug happen twice.</p>
              <p><ExternalLink href={developerToolingEvidenceUrl}>Pinned developer-tooling evidence</ExternalLink></p>
            </div>
            <div className="wild-bunch-story-movement__proof wild-bunch-story-movement__proof--product">
              <WildBunchProductEvidence />
            </div>
          </CaseStudySection>
        </div>

        <div className="wild-bunch-story-movement wild-bunch-story-movement--trade-off" data-story-movement="trade-off">
          <CaseStudySection title="Choosing the complicated version" layout="lead">
            <p>Yes, I could have made this much more simply. Mutable state plus ordinary random calls would mean fewer concepts, fewer serializers and fewer ways for persistence changes to go wrong. For a small local remake, that could be the better trade.</p>
            <p>It would also give up the qualities I chose this project to investigate: stable worlds with genuine variation, exact playthrough reconstruction, player-safe knowledge, conflict-aware writes and developer interventions that remain outside the player contract. I accepted event schemas, projection parity, storage evolution, invariant tests and a larger debugging surface because I can point to what each one buys.</p>
            <p>I use these patterns professionally in enterprise software, so familiarity was part of the decision. I know where each tends to pay rent, what it costs and when to leave it alone. Other designs could deliver the same qualities. My judgement was to choose the subset this game could justify.</p>
            <p>Familiar tools still have to earn their place. React and Phaser stay at the rendering and input boundary; neither gets to decide whether an action is legal. Snapshots stay disposable. The typed client stays handwritten while the API is small enough that generation would cost more than it saves.</p>
            <p>Agents wrote much of Wild Bunch's code under constraints I set. I directed the work, reviewed the result and required evidence strong enough to disagree with me. I trust the result because its rules, replay and boundaries can fail under test.</p>
            <p><Link to="/writing/agentic-engineering-vs-vibe-coding">How I separate agentic engineering from vibe coding</Link></p>
            <p>If a layer stops earning its keep, I should remove it and keep the original bargain.</p>
          </CaseStudySection>

          <CaseStudySection title="Where the trail leads next" layout="lead">
            <p>The playable build already makes travel more than a scene change. You unfold the generated map, choose a connected town, see the distance and expected days, then set out mounted or on foot. On the road, supplies run down, the horse is tested, the player can change pace and encounters can intervene. Arrival and the journey that produced it become part of the session history. It's still a scrappy surface, but the trail is already game space.</p>
            <p>My turn on Wild Bunch is to make each town a place where decisions accumulate. Money, condition, supplies, time and reputation should all shape the next destination. The saloon can grow from gossip and suspect encounters into somewhere to eat, drink and gamble, poker first, perhaps other games of chance later. The telegraph office can move beyond clue leads: a clerk might sell a tip about the lawman's whereabouts, take a bribe or pass false information. More town services should create more ways to prepare, investigate, recover and get into trouble.</p>
            <p>The Pinkerton agent can pull those systems into one chase. I don't want him to materialise as a random road encounter or know the player's location by magic. He should travel the same world on his own clock, following rumours shaped by what the player did, how publicly they did it and what a town remembers after they leave. A helpful town might muddy the trail; a notorious afternoon in the saloon might sharpen it; a telegraph clerk might reveal where the law was last seen, or be persuaded to send it the wrong way.</p>
            <p>The current architecture supports that growth. Persistent towns can remember heat and relationships. The deterministic map gives pursuit real distances and routes. The event history can reconstruct why the lawman believed a rumour, where he travelled and which action finally gave the player away. I want a frontier where every ride buys time, spends something and leaves a story behind.</p>
          </CaseStudySection>
        </div>

        <div className="wild-bunch-source-note" data-story-close="source-note">
          <CaseStudySection title="Inspect it. Run it." layout="lead">
            <p>These captures document the current playable build, including its temporary development art. The source snapshot pins every architectural claim above to the version I inspected.</p>
            <p>The game isn't hosted yet. It's a hobby project, and it grows when I have time. You can still play the pre-alpha: <ExternalLink href={localSetupUrl}>Clone and run Wild Bunch</ExternalLink>. You'll need .NET 10, the frontend toolchain and local PostgreSQL. The repository scripts handle most of the database work, but PostgreSQL is the likely bit of friction.</p>
            <CaseStudyEvidence auditDate="21 August 2026" href={pinnedRepositoryUrl} label="Wild Bunch source snapshot (pinned revision)" />
          </CaseStudySection>
        </div>
      </section>
    </CaseStudyBody>
  )
}
