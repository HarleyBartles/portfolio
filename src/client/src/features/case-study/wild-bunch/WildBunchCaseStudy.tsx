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
          <p>Firebird Software published the original Wild Bunch in 1984. I played its later Amstrad CPC 464 version as a child, and Locomotive BASIC on that machine was my first programming language.</p>
          <p>This is my re-creation, in my own direction. I could have rebuilt the basic loop procedurally, but the game I wanted to make room for had to preserve surprise without surrendering reproducibility: a world I could inspect, replay, and eventually diagnose.</p>
          <p><a href={historicalReferenceUrl}>Historical Wild Bunch archive</a></p>

          <aside className="wild-bunch-dossier" aria-label="Text-first technical dossier">
            <h3>The system, in brief</h3>
            <dl>
              <dt>Architecture</dt>
              <dd>DDD around GameSession; CQRS command/query separation; Onion dependency direction; event sourcing, projections, snapshots, optimistic concurrency, and upcasting.</dd>
              <dt>Persistence</dt>
              <dd>A command repository loads and stages the GameSession aggregate; read repositories serve projections; a Unit of Work commits the staged command-side changes.</dd>
              <dt>Evidence</dt>
              <dd>xUnit unit and ASP.NET integration suites; Vitest with React Testing Library; replay-equality and architecture guardrail tests; manual browser review.</dd>
            </dl>
          </aside>
        </CaseStudySection>

        <CaseStudySection title="Making chance reproducible">
          <p>I wanted the seed to describe a world, not smuggle every decision into a long code. At this revision, the v17 UUID codec packs 33 of 128 bits and reserves 95; town names come from a deterministic shuffle of a 40-name pool instead of consuming a field each.</p>
          <p>That left room to discover what the world actually needed. Delaunay candidates become a minimum spanning tree, useful alternate trails are added and filtered, and repairs keep the graph connected and its towns reachable. A generated town layout then becomes part of the session's remembered world: leaving Dustwell and returning is a return to the same place, not another roll.</p>
          <p><a href={graphEvidenceUrl}>Pinned graph-generation evidence</a> · <a href={persistedWorldEvidenceUrl}>Pinned persisted-world evidence</a></p>
          <WildBunchDeterminismFigure />
          <WildBunchTrailMapEvidence />
          <p>Difficulty, entropy policy, and player choices stay outside the seed contract. In Boring mode, the same seed, difficulty, policy, and ordered actions make a scenario repeatable enough for tests, replay, and investigation; that is a bounded promise, not a claim that every variation is already solved.</p>
          <p><a href={`${sourceRoot}/src/WildBunch.GameContent/NewGame/SeedWorldResolver.cs`}>Pinned resolver evidence</a></p>
        </CaseStudySection>

        <CaseStudySection title="A playthrough worth keeping">
          <p>A bug report is more useful when I can reconstruct what the game accepted, in order, rather than stare at a final state and guess. That is why GameSession records typed events: the aggregate holds the rules that decide whether a command is legal, and the event stream can rebuild the session when a snapshot is not enough.</p>
          <p>CQRS separates state-changing commands from projection reads. The command repository loads and stages the GameSession aggregate; read repositories serve the journal, audit, case, and other projections; the Unit of Work commits the staged command-side changes. Onion direction keeps those rules independent of HTTP, EF/PostgreSQL, and Phaser.</p>
          <p>That buys replay, reconstruction, and an honest concurrency boundary. It also asks for snapshots, optimistic retries, projection rebuilds, and upcasting as persisted shapes change. The point is not to collect machinery: replay earns its cost only when full-stream equality can prove or falsify it.</p>
          <WildBunchEventFlow />
          <WildBunchAuditEvidence />
          <p><a href={`${sourceRoot}/tests/WildBunch.Integration.Tests/FullReplayEqualityTests.cs`}>Pinned replay-equality evidence</a></p>
        </CaseStudySection>

        <CaseStudySection title="The player and the developer should not see the same game">
          <p>The player should receive only clues, warrants, and suspect information that play has earned. The case file and wanted notice are shaped projections; the technical audit is a separate development surface. A screen is not a secrecy boundary, so the read model has to be safe even when someone can inspect a response.</p>
          <p>Exact reconstruction also makes diagnosis practical. In the development environment, a tool can prepare a session and force the next salted action once; the ordinary command consumes that intervention, and replay keeps the reason visible. It is useful control without making privileged diagnosis part of the player contract.</p>
          <p><a href={developerToolingEvidenceUrl}>Pinned developer-tooling evidence</a></p>
          <WildBunchProductEvidence />
        </CaseStudySection>

        <CaseStudySection title="Choosing the complicated version">
          <p>A smaller game could use opaque randomness and mutable state. For this problem, that would lose reproducible worlds, explainable playthroughs, and a place to keep diagnosis outside the player surface. I accepted the cost of more concepts, storage evolution, invariant tests, and a larger debugging surface because those capabilities are the work I want the game to do.</p>
          <p>The same restraint applies at the edges. React and Phaser stay at the rendering and input boundary, while server rules and the React confirmation path retain authority and an accessible fallback. The manual client stays manual for now; code generation has to earn its tooling cost. I did not hand-write Wild Bunch's code. I engineered the system: setting its constraints, directing agents through the work, reviewing the result, and requiring the evidence that makes the architecture trustworthy.</p>
          <p>If a layer stops earning its keep, removing it is the better engineering decision. <Link to="/writing/agentic-engineering-vs-vibe-coding">Read the agentic-engineering essay</Link></p>
        </CaseStudySection>

        <CaseStudySection title="Inspect the evidence">
          <p>These captures show the current development build: a scrappy, buggy pre-alpha with a lot of heart and exactly the architecture it deserves. The pinned source snapshot is the invitation to inspect the claims behind them.</p>
          <CaseStudyEvidence auditDate="21 August 2026" href={pinnedRepositoryUrl} label="Wild Bunch source snapshot (pinned revision)" />
        </CaseStudySection>
      </section>
    </CaseStudyBody>
  )
}
