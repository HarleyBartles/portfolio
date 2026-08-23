import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
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
        <p className="case-study-thesis">Every complexity pays rent.</p>

        <CaseStudySection title="The game I wanted to return to">
          <p>Wild Bunch first found me on an Amstrad CPC 464. Firebird Software published the original in 1984; I played the later CPC version as a child, on the same machine where Locomotive BASIC became my first programming language.</p>
          <p>Coming back to it now was never going to be a literal port. This is my re-creation: the old premise, taken in my own direction. I could reproduce the visible loop with a small procedural program, but that would avoid the part I actually wanted to explore.</p>
          <p>I wanted to begin with something deterministic, then let excitement enter through salted randomness threaded through play. The deterministic base had to carry replayability on its own: one starting world should remain knowable, while another seed should produce a different world that is just as stable. Surprise would come from moving between those worlds and varying what happened inside them, not from losing the ability to explain either.</p>
          <p><a href={historicalReferenceUrl}>Historical Wild Bunch archive</a></p>
        </CaseStudySection>

        <CaseStudySection title="Making chance reproducible">
          <p>I started by treating the seed as the address of a starting world. Randomise seed is a first-class choice, but randomising it does not mean surrendering it: once chosen, that world can be revisited by tests or by me chasing a bug.</p>
          <p>The seed is UUID-shaped because 128 bits are familiar to store, copy and pass around, but I did not want 128 bits of arbitrary noise. The v17 codec currently uses 33 of them and deliberately reserves 95. It spends bits on choices that need to survive as part of the world contract, then gets more variation from deterministic policies. Town names, for example, come from shuffling a pool of 40 names rather than assigning an encoded field to every town.</p>
          <p>The map follows the same idea. It starts with Delaunay candidates, takes a minimum spanning tree so every town is connected, admits useful alternate trails, filters awkward parallels and corridors, then repairs cases that would strand a town or leave it under-connected. A compact recipe produces a map with meaningful route distances and more than one way through it; it does not need to encode every road to make every road reproducible.</p>
          <p>Town layout closes a subtler gap. Generating Dustwell deterministically is not enough if leaving and returning silently rolls its buildings again. The layout becomes session state and travels through snapshots and replay. A revisit is therefore a return to the same place, not merely another town with the same name.</p>
          <p><a href={graphEvidenceUrl}>Pinned graph-generation evidence</a> · <a href={persistedWorldEvidenceUrl}>Pinned persisted-world evidence</a></p>
          <WildBunchDeterminismFigure />
          <WildBunchTrailMapEvidence />
          <p>The seed describes the base world; it does not swallow the whole playthrough. Difficulty, entropy policy, named salts and player choices remain legible inputs of their own. Under the Boring policy, the same seed, difficulty and entropy policy combined with the same ordered choices take the same path. Other policies can salt state changes to make a run less predictable without making the source of that variation unknowable.</p>
          <p>That separation gave me two useful layers of replayability. I can compare stable worlds before introducing variable play, and I can make the variable parts repeat when a test or investigation needs them to. Determinism is not the absence of surprise here. It is the ability to put surprise back where I found it.</p>
          <p><a href={`${sourceRoot}/src/WildBunch.GameContent/NewGame/SeedWorldResolver.cs`}>Pinned resolver evidence</a></p>
        </CaseStudySection>

        <CaseStudySection title="A playthrough worth keeping">
          <p>Once the starting world was reproducible, the next question was whether the history inside it should be reproducible too. A final database row can tell me where a player ended up. It cannot tell me which legal decisions brought them there, which version of a rule accepted them, or where two apparently identical sessions first diverged.</p>
          <p>That is the job I gave event sourcing. A player action becomes a command; GameSession decides whether it is legal and emits a typed fact; persistence appends that fact to the session's ordered stream. Replaying the facts rebuilds the state. The audit visible below is not decorative developer chrome—it is the playthrough's receipt.</p>
          <p>DDD gives that decision-making a home. GameSession is the aggregate boundary because one live session owns the invariants connecting its player, world, clock, journey, investigation and bounty. CQRS separates commands that may change that session from queries over its projections. The command repository loads and stages the GameSession aggregate, read repositories serve those projections, and the Unit of Work commits the staged command-side changes. Onion direction keeps the rules inside all of that independent of HTTP, EF/PostgreSQL and Phaser.</p>
          <p>The payoff is exact reconstruction with an honest conflict boundary: if two commands race against the same stream version, one cannot quietly overwrite the other. The bill is equally real. Events need stable contracts; old payloads need upcasters; read models need rebuilding; optimistic failures need retry policy; snapshots need treating as disposable shortcuts rather than a second truth.</p>
          <p>I only get to call that exact replay because it is falsifiable. Full-stream equality tests rebuild a session from its events and compare the result. If the reconstructed state differs, the architecture has not earned the claim.</p>
          <WildBunchEventFlow />
          <WildBunchAuditEvidence />
          <p><a href={`${sourceRoot}/tests/WildBunch.Integration.Tests/FullReplayEqualityTests.cs`}>Pinned replay-equality evidence</a></p>
          <aside className="wild-bunch-dossier" aria-label="Text-first technical dossier">
            <h3>Under the bonnet</h3>
            <dl>
              <dt>Application</dt>
              <dd>.NET 10 and ASP.NET Core over PostgreSQL; React and TypeScript in the browser, with Phaser kept to rendering and input.</dd>
              <dt>Architecture</dt>
              <dd>DDD around GameSession; CQRS command/query separation; Onion dependency direction; event sourcing, projections, snapshots, optimistic concurrency, and event upcasting.</dd>
              <dt>Persistence</dt>
              <dd>A command repository loads and stages the GameSession aggregate; read repositories serve projections; a Unit of Work commits the staged command-side changes.</dd>
              <dt>Evidence</dt>
              <dd>xUnit unit and ASP.NET integration suites; Vitest with React Testing Library; replay-equality tests, architecture guardrails, and browser review.</dd>
            </dl>
          </aside>
        </CaseStudySection>

        <CaseStudySection title="The player and the developer should not see the same game">
          <p>Projections also let the same history tell different, legitimate stories. The player should receive only clues, warrants and suspect information that play has earned. A developer may need the ordered audit behind them. The case file and wanted notice are therefore player-safe projections, not convenient views over every fact the server knows.</p>
          <p>That distinction matters even for a game. Hiding the culprit in a React component would hide nothing from somebody inspecting the response. The read model itself has to respect the knowledge boundary. CQRS pays rent here because the player query and the diagnostic query are allowed to answer different questions without either becoming the command model.</p>
          <p>The same boundary keeps development control out of player actions. Developer commands and queries have their own surface. In a development reproduction I can fix a salt source or prepare a one-use next action, then let the ordinary game command consume it. Exact replay gets me back to the reported state; deterministic preparation makes the next apparently random step repeatable as well.</p>
          <p>That is already valuable during development. If the game later carries many hosted sessions, it becomes more valuable: a difficult report can arrive with an exact accepted history, be reconstructed away from the player's live session, and have its next uncertain decision exercised deliberately. The alternative is a screenshot, a mutable row and a hope that somebody can make the bug happen twice.</p>
          <p><a href={developerToolingEvidenceUrl}>Pinned developer-tooling evidence</a></p>
          <WildBunchProductEvidence />
        </CaseStudySection>

        <CaseStudySection title="Choosing the complicated version">
          <p>Yes, I could have made this much more simply. Mutable state plus ordinary random calls would mean fewer concepts, fewer serializers and fewer ways for persistence to evolve badly. For a small local remake, that could be the better trade.</p>
          <p>It would also remove the qualities I chose this project to investigate: stable worlds with genuine variation, exact playthrough reconstruction, player-safe knowledge, conflict-aware writes and developer interventions that remain outside the player contract. I accepted the event schemas, projection parity, storage evolution, invariant tests and larger debugging surface because I can point to what each one buys.</p>
          <p>That does not make maximum architecture the rule. React and Phaser stay at the rendering and input boundary; neither gets to decide whether an action is legal. Snapshots stay disposable. The typed client stays handwritten while the API is small enough that generation would cost more than it saves. Restraint is part of making complexity pay rent.</p>
          <p>I did not hand-write Wild Bunch's code. I engineered the system: setting its constraints, directing agents through the work, reviewing the result and requiring evidence strong enough to disagree with me. The architecture is not trustworthy because I asked an agent to build it. It is trustworthy only where its rules, replay and boundaries can fail under test.</p>
          <p>If a layer stops earning its keep, I should remove it. That is not retreating from the architecture; it is keeping the original bargain. <Link to="/writing/agentic-engineering-vs-vibe-coding">Read the agentic-engineering essay</Link></p>
        </CaseStudySection>

        <CaseStudySection title="Inspect the evidence">
          <p>These captures come from the current development build: a scrappy, buggy pre-alpha with a lot of heart and exactly the architecture it deserves. The source snapshot pins every architectural claim above to the version I inspected.</p>
          <CaseStudyEvidence auditDate="21 August 2026" href={pinnedRepositoryUrl} label="Wild Bunch source snapshot (pinned revision)" />
        </CaseStudySection>
      </section>
    </CaseStudyBody>
  )
}
