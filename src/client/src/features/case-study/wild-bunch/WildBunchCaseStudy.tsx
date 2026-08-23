import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { CaseStudyBody } from '../CaseStudyBody'
import { CaseStudyDecision } from '../CaseStudyDecision'
import { CaseStudyEvidence } from '../CaseStudyEvidence'
import { CaseStudySection } from '../CaseStudySection'
import { WildBunchDeterminismFigure } from './WildBunchDeterminismFigure'
import { WildBunchEventFlow } from './WildBunchEventFlow'
import {
  WildBunchAuditEvidence,
  WildBunchProductEvidence,
  WildBunchTrailMapEvidence,
} from './WildBunchProductEvidence'

const repositoryUrl = 'https://github.com/HarleyBartles/wild-bunch'
const historicalReferenceUrl = 'https://worldofspectrum.org/archive/software/games/the-wild-bunch-firebird-software-ltd'
const revision = '2a9814d094148bb789766a27d316095fecce5a60'
const sourceRoot = `${repositoryUrl}/blob/${revision}`

export function WildBunchCaseStudy(): ReactElement {
  return (
    <CaseStudyBody>
      <section className="case-study wild-bunch-case-study" aria-label="Wild Bunch case study">
        <p className="case-study-thesis">Every complexity pays rent.</p>
        <p>This is a playable development build: a pre-alpha game that can create a seeded session, render towns and trails, travel, surface player-known investigation work, and expose ordered developer events.</p>
        <p>I test the architecture against real state, bugs, and trade-offs rather than treating it as a promise of a finished game.</p>
        <p>Its visuals are a working skeleton, not a finished game design or art direction.</p>
        <CaseStudySection title="The first language">
          <p>Firebird Software published the original in 1984. I played its later Amstrad CPC 464 version as a child, and Locomotive BASIC on that machine was my first programming language.</p>
          <p>This is my re-creation, in my own direction. It keeps the premise that stayed with me while making new design and architecture choices; it is neither the original game's architecture nor a source-code lineage claim.</p>
          <p><a href={historicalReferenceUrl}>Historical Wild Bunch archive</a></p>
        </CaseStudySection>

        <CaseStudySection title="Why the trivial version was not the point">
          <p>I could have rebuilt the basic loop as a small procedural game. I wanted a different problem: a world that could eventually support reproducible reports, persistent places, inspectable state, deterministic tests, and replay without making the current pre-alpha pretend those future operations already exist.</p>
          <p>That changed the question behind every abstraction. I was not trying to collect named patterns; I was asking whether each boundary bought a capability I would otherwise lose, and whether I was prepared to own its cost.</p>
        </CaseStudySection>

        <section aria-labelledby="wild-bunch-dossier-title" className="wild-bunch-dossier">
          <h2 id="wild-bunch-dossier-title">The stack, in plain view</h2>
          <dl aria-label="Text-first technical dossier">
            <dt>Backend</dt>
            <dd>C#, .NET 10, ASP.NET Core Minimal APIs, Entity Framework Core, Npgsql, and PostgreSQL.</dd>
            <dt>Architecture</dt>
            <dd>DDD, Onion dependency direction, CQRS-style handlers, aggregate-scoped repositories, Unit of Work, event sourcing, projections, snapshots, optimistic concurrency, and event upcasting.</dd>
            <dt>Web</dt>
            <dd>TypeScript, React 18, Vite, TanStack Query and Router, styled-components, and Phaser 3 as a bounded rendering and input adapter.</dd>
            <dt>Evidence</dt>
            <dd>xUnit, ASP.NET integration tests, Vitest, Testing Library, replay-equality tests, architecture guardrails, and manual browser proof.</dd>
          </dl>
        </section>

        <CaseStudySection title="Random-looking, reproducible">
          <p>I wanted a seed to be a reproducible world contract, not a bag of every setting. At this revision the v17 codec directly packs 33 of 128 UUID bits, leaves 95 reserved, and derives town names through a deterministic shuffle of a 40-name pool rather than spending a field on each name.</p>
          <p>Trying to encode every town would have made that contract larger without making the world more legible. The design taught me that constrained combinations can produce more meaningful variation than encoding every town: the generator moves from Delaunay candidates through a minimum spanning tree, adds and filters alternate trails, then repairs navigation cases that would leave a town stranded. Palettes, slots, and their combinations vary a small number of world choices while visible route lengths remain meaningful travel information.</p>
          <p>I also chose to make a generated layout become session state. Generation plus persistence becomes one product promise when a player revisits a town: each town carries its stored layout forward through snapshots and replay, so leaving Dustwell and returning is a return to the same place rather than another roll.</p>
          <WildBunchDeterminismFigure />
          <WildBunchTrailMapEvidence />
          <p>The fixed all-zero seed gives me a canonical deterministic check, and Randomize seed is a first-class setup option for choosing a different repeatable base world. Difficulty, entropy policy, and the player-selected start remain downstream session choices rather than direct v17 payload fields. In Boring mode, the same seed, difficulty, policy, and ordered actions provide a repeatable route for tests, replay, and a bad-scenario investigation; it does not say every entropy mode or game surface is already deterministic. Non-Boring expansion is still transitional, and unfinished developer actions do not earn a public capability claim.</p>
          <p><a href={`${sourceRoot}/src/WildBunch.GameContent/NewGame/SeedWorldResolver.cs`}>Pinned resolver evidence</a></p>
        </CaseStudySection>

        <CaseStudySection title="The event stream is the receipt">
          <p>When diagnosing a bug report, I needed to reconstruct what the system accepted and in what order—not merely inspect a current state and guess. I accepted event sourcing because every legal change can become a typed fact, appended and read in order to rebuild a session instead of leaving a mutable snapshot as the only truth.</p>
          <p>Once the stream was authoritative, I needed one legal-change boundary. GameSession carries that responsibility: DDD keeps the game rules and invariants with the session that owns them, so a command either earns a fact from live state or it does not.</p>
          <p>From there, CQRS keeps state-changing commands separate from player, audit, and projection reads. I use purpose-built read folds so a player gets only earned knowledge while a developer can inspect ordered diagnostic history without asking one model to serve both purposes. Onion direction keeps those rules independent of HTTP, EF/PostgreSQL, and Phaser; I keep adapters outside the domain so those delivery choices do not become the game rules.</p>
          <p>The payoff is a session I can explain and test. The bill is an aggregate-scoped repository, Unit of Work, concurrency retries, snapshots, and upcasting: one live session validates and commits its facts together; a conflicting write is visible instead of silently overwritten; snapshots speed the common path but fall back to the stream; and rebuildable projections must evolve deliberately. Replay earns its cost only when it can rebuild and falsify exact state, and full-stream equality tests make exact replay a claim that can fail.</p>
          <WildBunchEventFlow />
          <WildBunchAuditEvidence />
          <p>Developer diagnosis belongs beside that record, not inside the player contract. At this revision, access is gated by the development environment rather than a public authorisation system. A development-only path can prepare a session, optionally inject a typed force-once next action, and let the normal command consume it exactly once; the intervention remains explainable on replay. If public hosting, authenticated support access, retained sessions, and operational workflows are added later, the same boundary could help reconstruct a hard-to-reproduce report without exposing privileged controls to a player.</p>
          <p><a href={`${sourceRoot}/tests/WildBunch.Integration.Tests/FullReplayEqualityTests.cs`}>Pinned replay-equality evidence</a></p>
        </CaseStudySection>

        <CaseStudySection title="The player sees what the player has earned">
          <p>I do not use the persistence model as the player experience. Player routes receive only the clues, warrants, and suspect information that play has earned; the case file and wanted notice are deliberately shaped projections, while the technical audit remains on a separate development surface.</p>
          <p>That separation matters even in a game. A screen is not a secrecy boundary: the read model has to be safe in its own right. The cost is more projections to keep in parity and version, but it prevents one convenient diagnostic view from becoming an accidental answer key.</p>
          <WildBunchProductEvidence />
        </CaseStudySection>

        <CaseStudySection title="The implementation medium">
          <p>I did not hand-write Wild Bunch's code. I engineered the system: setting its constraints, directing agents through the work, reviewing the result, and requiring the evidence that makes the architecture trustworthy.</p>
          <p>For me, that means a decision can be recorded, a guardrail or replay test can fail, and an attractive extra layer can still be refused. The authored responsibility is in the boundaries, review, validation, and acceptance—not in claiming every keystroke.</p>
          <p><Link to="/writing/agentic-engineering-vs-vibe-coding">Read the agentic-engineering essay</Link></p>
        </CaseStudySection>

        <CaseStudySection title="Architecture includes restraint">
          <ul aria-label="Selected supporting patterns">
            <li><strong>Snapshots are disposable caches.</strong> The event stream remains authoritative, so a stale cache can be discarded and rebuilt; the trade-off is keeping replay and versioning discipline real.</li>
            <li><strong>React and Phaser stay at the rendering and input boundary.</strong> Phaser can make the map spatial and return intent, but server rules and the React confirmation path keep authority and accessible fallback outside the canvas.</li>
            <li><strong>The manual typed API client stays manual for now.</strong> It centralises current transport types without paying a code-generation and tooling tax before the API size proves that tax worthwhile.</li>
          </ul>
        </CaseStudySection>

        <section aria-labelledby="wild-bunch-decisions-title" className="wild-bunch-decisions">
          <h2 id="wild-bunch-decisions-title">Decisions and trade-offs</h2>
          <CaseStudyDecision decision="Deterministic seeds over opaque randomness" reason="A reproducible world makes tests, reports, and base-world comparisons possible." consequence="The codec becomes a maintained compatibility contract with reserved space, legal-value checks, and explicit version changes." />
          <CaseStudyDecision decision="Event history over state-only persistence" reason="A durable record can reconstruct and explain a session rather than merely show its latest snapshot." consequence="Typed events, serializers, projection parity, replay tests, and persistence evolution become work I must keep paying for." />
          <CaseStudyDecision decision="A server-authoritative domain over client-owned rules" reason="One session owns legality, distance, and state transitions even when the browser offers a richer spatial surface." consequence="The browser gives up convenient local authority and the server/API boundary needs deliberate tests." />
          <CaseStudyDecision decision="Compositional domain loops over one unbounded session class" reason="Journey, investigation, store, bounty, and action context can remain cohesive under the same live-session invariants." consequence="The aggregate stays substantial and needs active pressure against becoming a god object." />
          <CaseStudyDecision decision="Developer inspection surfaces over invisible magic" reason="An ordered audit and typed one-use intervention make diagnosis explainable without adding diagnostic fields to player reads." consequence="Separate development DTOs, routes, replay cases, and future access-control work are a real operational cost." />
        </section>

        <CaseStudySection title="The simpler version would cost something, too">
          <p>A smaller version could keep only mutable state and opaque randomness, and it might be the better choice for a smaller problem. For this chosen problem, though, it would trade away reproducible worlds and next actions, exact replay and reconstruction, durable audit and projection seams, conflict-aware writes for a hosted session, and developer diagnosis that stays outside the player surface.</p>
          <p>I accepted more concepts, storage and evolution machinery, invariant tests, operational discipline, and a larger debugging surface. Every complexity pays rent only while that exchange remains true; if a layer stops earning its keep, removing it is the better engineering decision.</p>
        </CaseStudySection>

        <section aria-label="Capability state at the evidence snapshot" className="wild-bunch-capability-ledger">
          <h2>Built, in motion, beyond pre-alpha</h2>
          <section>
            <h3>Built</h3>
            <p>Seeded session setup, generated town graph, route distances, and travel are present alongside town rendering, stored layouts, investigation surfaces, typed event history, projections, persistence, replay, and the developer audit.</p>
          </section>
          <section>
            <h3>In motion</h3>
            <p>Entropy behaviour beyond the deterministic path, visual polish, town tiling, broader gameplay, layout-inspection reliability, and some developer-control integrations remain active pre-alpha work.</p>
          </section>
          <section>
            <h3>Beyond pre-alpha</h3>
            <p>Public accounts and sessions, production hosting, player-facing seed sharing, balance, and a supportable public demo are not current promises.</p>
          </section>
          <CaseStudyEvidence auditDate="21 August 2026" href={repositoryUrl} label="Wild Bunch repository" />
        </section>
      </section>
    </CaseStudyBody>
  )
}
