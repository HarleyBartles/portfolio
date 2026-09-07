import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { CaseStudyMediaCaption } from '../case-study/CaseStudyMediaCaption'
import { PatchShowcasePicture } from './PatchShowcaseEvidence'

const Tournament = styled.section`
  display: grid; gap: clamp(var(--space-16), 10vw, var(--space-24)); padding-block: var(--space-12) var(--space-20);
  --patch-teal: #0d7476; --patch-teal-deep: #153f42;
  .tournament-showcase__lead, .tournament-showcase__case-study-link { max-width: 48rem; }
  .tournament-showcase__lead > p:nth-child(2) { margin-block: var(--space-4); font-family: var(--font-site-sans); font-size: clamp(1.35rem, 2.4vw, 1.9rem); line-height: 1.35; }
  .tournament-showcase__status-note { max-width: 42rem; color: var(--color-muted); }
  .patch-status, .tournament-event__number, .tournament-event__task span, .tournament-event__lesson span { color: var(--patch-teal); font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700; }
  .tournament-event { display: grid; gap: clamp(var(--space-7), 5vw, var(--space-12)); padding-top: var(--space-8); border-top: 1px solid var(--color-ink); }
  .tournament-event__header { display: grid; grid-template-columns: minmax(0,.68fr) minmax(16rem,1.32fr); column-gap: var(--space-10); }
  .tournament-event__header > * { grid-column: 2; } .tournament-event__number { grid-column: 1; grid-row: 1 / span 3; margin: 0; }
  .tournament-event__header h2 { max-width: 13ch; margin: 0; font-size: clamp(2.5rem, 7vw, 6rem); line-height: .96; }
  .tournament-event__task { max-width: 34rem; margin: var(--space-5) 0 0; font-size: clamp(1.1rem, 2vw, 1.35rem); }
  .tournament-event__task span { display: block; margin-bottom: var(--space-2); }
  .tournament-event figure, .tournament-event picture, .tournament-event img { display: block; width: 100%; margin: 0; } .tournament-event img { height: auto; }
  .tournament-event__hero, .tournament-event__maze-pair, .tournament-event__failures, .tournament-event__consultation { overflow: hidden; border: 1px solid var(--color-border); }
  .tournament-event__story { max-width: 43rem; margin-left: auto; font-size: clamp(1.05rem,1.7vw,1.22rem); } .tournament-event__story p + p { margin-top: var(--space-5); }
  .tournament-event__story--wide { max-width: 52rem; }
  .tournament-event__lesson { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: var(--space-8); align-items: end; padding: var(--space-6) 0; border-block: 1px solid var(--color-ink); }
  .tournament-event__lesson p { max-width: 27ch; margin: 0; font-family: var(--font-site-sans); font-size: clamp(1.55rem,3.5vw,3.2rem); line-height: 1.08; }
  .tournament-event__split, .tournament-event__consultation { display: grid; grid-template-columns: minmax(0,1.25fr) minmax(18rem,.75fr); align-items: center; }
  .tournament-event__split .tournament-event__story, .tournament-event__consultation .tournament-event__story { margin: 0; padding: clamp(var(--space-6),5vw,var(--space-12)); }
  .tournament-event__maze-pair { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1px; background: var(--color-border); } .tournament-event__maze-pair figure { background: var(--color-surface); }
  .tournament-event__failures { display: grid; grid-template-columns: .92fr 1.08fr; gap: 1px; background: var(--color-border); } .tournament-event__failures figure { background: #fff; }
  .tournament-event__failures picture { height: clamp(21rem,44vw,38rem); } .tournament-event__failures img { height: 100%; object-fit: contain; object-position: center bottom; }
  .tournament-event__failures figcaption { min-height: 4.5rem; padding: var(--space-4); border-top: 1px solid var(--color-border); } .tournament-event__failures strong { display: block; font-family: var(--font-site-sans); font-size: var(--type-metadata-size); }
  .tournament-event__consultation { grid-template-columns: minmax(0,1.4fr) minmax(18rem,.6fr); }
  .tournament-showcase__case-study-link { padding-top: var(--space-8); border-top: 1px solid var(--color-ink); } .tournament-showcase__case-study-link a { color: var(--patch-teal-deep); font-weight: 700; }
  @media (max-width: 44rem) { .tournament-event__header { grid-template-columns: 1fr; } .tournament-event__header > *, .tournament-event__number { grid-column: 1; grid-row: auto; } .tournament-event__header h2 { max-width: 11ch; } .tournament-event__split, .tournament-event__consultation, .tournament-event__maze-pair { grid-template-columns: 1fr; } .tournament-event__failures picture { height: clamp(14rem,70vw,22rem); } .tournament-event__lesson { grid-template-columns: 1fr; gap: var(--space-4); } }
`

function EventHeader({ number, title, task }: { number: string; title: string; task: string }) {
  return (
    <header className="tournament-event__header">
      <p className="tournament-event__number">Event {number}</p>
      <h2>{title}</h2>
      <p className="tournament-event__task"><span>The task</span> “{task}”</p>
    </header>
  )
}

function Lesson({ children, medal }: { children: string; medal: string }) {
  return (
    <footer className="tournament-event__lesson">
      <p>{children}</p>
      <span>{medal}</span>
    </footer>
  )
}

export function TournamentPage() {
  return (
    <Tournament className="tournament-showcase" aria-label="Tournament of Reasonable Defaults adventure" data-type-register="site-sans" data-visual-contract="patch-tournament">
      <header className="tournament-showcase__lead">
        <p className="patch-status">Visual development</p>
        <p>Four events begin with instructions that look clear at the starting line. Bit gets moving, Bot settles on the first plausible interpretation, and Patch checks whether the finish has actually been defined.</p>
        <p className="tournament-showcase__status-note">The current adventure is assembled from accepted scene art in the source repository. Its four events now have a public sequence here, with the upstream production still in visual development.</p>
      </header>

      <article className="tournament-event tournament-event--seven-day" data-patch-event="seven-day">
        <EventHeader number="01" title="The Seven-Day Sprint" task="the last 7 days" />
        <figure className="tournament-event__hero">
          <PatchShowcasePicture path="src/client/public/media/patch/patch-tournament-seven-day-1200.avif" alt="A race starts on a single track before splitting towards several finish arches reached by different seven-day routes." />
          <CaseStudyMediaCaption>The starting line is perfectly legible. A little distance exposes several equally plausible routes.</CaseStudyMediaCaption>
        </figure>
        <div className="tournament-event__story">
          <p>Bit treats today and the six preceding days as the reporting window. Bot chooses seven complete prior days. Either report could be reasonable, but neither establishes what the facilitator meant.</p>
          <p>Patch looks beyond the ordinary starting line, sees the course branch and refuses to invent the boundary. Correctly spotting an unwinnable event keeps him out of trouble, but it doesn&apos;t earn a medal.</p>
        </div>
        <Lesson medal="No medal">A clear start can hide an undefined finish.</Lesson>
      </article>

      <article className="tournament-event tournament-event--high-jump" data-patch-event="high-jump">
        <EventHeader number="02" title="The Industry Standard High Jump" task="Clear the industry standard" />
        <div className="tournament-event__split">
          <figure>
            <PatchShowcasePicture path="src/client/public/media/patch/patch-tournament-high-jump-1200.avif" alt="A high-jump apparatus has a high red and white bar, a lower yellow and black bar, and an event sign mentioning industry standards." />
          </figure>
          <div className="tournament-event__story">
            <p>Bit clears the event&apos;s A-board because it contains the words “industry standards”. Bot reaches the proper apparatus, sees a plausible associated bar and jumps it. His general idea is sound; he simply stops looking too soon.</p>
            <p>Patch asks which standard everyone has agreed to clear. Until the facilitator names it, height and success remain matters of interpretation.</p>
          </div>
        </div>
        <Lesson medal="No medal">Name the standard before asking an agent to clear it.</Lesson>
      </article>

      <article className="tournament-event tournament-event--maze" data-patch-event="maze">
        <EventHeader number="03" title="The Maze of Reasonable Defaults" task="Get to the exit with the prize" />
        <div className="tournament-event__maze-pair">
          <figure>
            <PatchShowcasePicture path="src/client/public/media/patch/patch-tournament-maze-1120.avif" alt="An overhead view of a hedge maze containing four different objects that could reasonably be called the prize." />
            <CaseStudyMediaCaption>The maze contains four plausible prizes, not one obvious target.</CaseStudyMediaCaption>
          </figure>
          <figure>
            <PatchShowcasePicture path="src/client/public/media/patch/patch-tournament-maze-map-1200.avif" alt="Patch's notebook map records routes to all four plausible prizes and marks the choice as unresolved." />
            <CaseStudyMediaCaption>Patch turns an ambiguous run into a decision-ready map.</CaseStudyMediaCaption>
          </figure>
        </div>
        <div className="tournament-event__story tournament-event__story--wide">
          <p>Bit reaches the exit quickly with anything he can defend as “the prize”. Bot explores until he finds the first genuine prize, then stops without discovering the three other plausible prizes.</p>
          <p>Patch maps the whole maze, identifies every candidate and exits with a plan to retrieve the intended prize as soon as the facilitator identifies it. The judges award bronze for useful work that makes the remaining decision cheap.</p>
        </div>
        <Lesson medal="Bronze">The first valid answer can still conceal an unresolved choice.</Lesson>
      </article>

      <article className="tournament-event tournament-event--long-course" data-patch-event="long-course">
        <EventHeader number="04" title="The Long Course" task="Cross the finish line" />
        <figure className="tournament-event__hero">
          <PatchShowcasePicture path="src/client/public/media/patch/patch-tournament-long-course-1200.avif" alt="A race route crosses a road marking while hazard tape surrounds a hole beside the course." />
          <CaseStudyMediaCaption>The course offers two quick ways to satisfy the wording and miss the work.</CaseStudyMediaCaption>
        </figure>
        <div className="tournament-event__failures" aria-label="Bit and Bot cross the wrong lines">
          <figure>
            <PatchShowcasePicture path="src/client/public/media/patch/patch-tournament-bit-hazard-560.avif" alt="Bit racing through do-not-cross hazard tape." />
            <figcaption><strong>Bit</strong> races off course and through the hazard tape.</figcaption>
          </figure>
          <figure>
            <PatchShowcasePicture path="src/client/public/media/patch/patch-tournament-bot-wrong-line-560.avif" alt="Bot stopping at the first road marking he can treat as a finish line." />
            <figcaption><strong>Bot</strong> stops at the first plausible line and declares completion.</figcaption>
          </figure>
        </div>
        <div className="tournament-event__consultation" data-testid="tournament-consultation">
          <figure>
            <PatchShowcasePicture path="src/client/public/media/patch/patch-tournament-1200.avif" alt="Patch at the route-check booth, asking tournament officials about the course and recording their answers." />
          </figure>
          <div className="tournament-event__story">
            <p>Patch lets the starting pistol go, walks back to the stakeholder dugout and asks which line counts, which route is valid and what the judges will accept. Then he runs the agreed course.</p>
            <p>That finish earns gold because the stakeholders can validate it.</p>
          </div>
        </div>
        <Lesson medal="Gold">Completion becomes valid when the finish line and acceptance condition are agreed.</Lesson>
      </article>

      <div className="tournament-showcase__case-study-link">
        <p>The production system behind these scenes has its own engineering story.</p>
        <Link to="/projects/adventures-of-patch">Read the Adventures of Patch engineering case study</Link>
      </div>
    </Tournament>
  )
}
