import { Link } from 'react-router-dom'
import { PatchShowcasePicture } from './PatchShowcaseEvidence'
import './PatchShowcase.scss'

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
    <section className="tournament-showcase" aria-label="Tournament of Reasonable Defaults adventure" data-type-register="site-sans">
      <header className="tournament-showcase__lead">
        <p className="patch-status">Visual development</p>
        <p>Four events begin with instructions that look clear at the starting line. Bit gets moving, Bot settles on the first plausible interpretation, and Patch checks whether the finish has actually been defined.</p>
        <p className="tournament-showcase__status-note">The current adventure is assembled from accepted scene art in the source repository. Its four events now have a public sequence here, with the upstream production still in visual development.</p>
      </header>

      <article className="tournament-event tournament-event--seven-day">
        <EventHeader number="01" title="The Seven-Day Sprint" task="the last 7 days" />
        <figure className="tournament-event__hero">
          <PatchShowcasePicture path="src/client/public/media/patch/patch-tournament-seven-day-1200.avif" alt="A race starts on a single track before splitting towards several finish arches reached by different seven-day routes." />
          <figcaption className="case-study-media-caption">The starting line is perfectly legible. A little distance exposes several equally plausible routes.</figcaption>
        </figure>
        <div className="tournament-event__story">
          <p>Bit treats today and the six preceding days as the reporting window. Bot chooses seven complete prior days. Either report could be reasonable, but neither establishes what the facilitator meant.</p>
          <p>Patch looks beyond the ordinary starting line, sees the course branch and refuses to invent the boundary. Correctly spotting an unwinnable event keeps him out of trouble, but it doesn&apos;t earn a medal.</p>
        </div>
        <Lesson medal="No medal">A clear start can hide an undefined finish.</Lesson>
      </article>

      <article className="tournament-event tournament-event--high-jump">
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

      <article className="tournament-event tournament-event--maze">
        <EventHeader number="03" title="The Maze of Reasonable Defaults" task="Get to the exit with the prize" />
        <div className="tournament-event__maze-pair">
          <figure>
            <PatchShowcasePicture path="src/client/public/media/patch/patch-tournament-maze-1120.avif" alt="An overhead view of a hedge maze containing four different objects that could reasonably be called the prize." />
            <figcaption className="case-study-media-caption">The maze contains four plausible prizes, not one obvious target.</figcaption>
          </figure>
          <figure>
            <PatchShowcasePicture path="src/client/public/media/patch/patch-tournament-maze-map-1200.avif" alt="Patch's notebook map records routes to all four plausible prizes and marks the choice as unresolved." />
            <figcaption className="case-study-media-caption">Patch turns an ambiguous run into a decision-ready map.</figcaption>
          </figure>
        </div>
        <div className="tournament-event__story tournament-event__story--wide">
          <p>Bit reaches the exit quickly with anything he can defend as “the prize”. Bot explores until he finds the first genuine prize, then stops without discovering the three other plausible prizes.</p>
          <p>Patch maps the whole maze, identifies every candidate and exits with a plan to retrieve the intended prize as soon as the facilitator identifies it. The judges award bronze for useful work that makes the remaining decision cheap.</p>
        </div>
        <Lesson medal="Bronze">The first valid answer can still conceal an unresolved choice.</Lesson>
      </article>

      <article className="tournament-event tournament-event--long-course">
        <EventHeader number="04" title="The Long Course" task="Cross the finish line" />
        <figure className="tournament-event__hero">
          <PatchShowcasePicture path="src/client/public/media/patch/patch-tournament-long-course-1200.avif" alt="A race route crosses a road marking while hazard tape surrounds a hole beside the course." />
          <figcaption className="case-study-media-caption">The course offers two quick ways to satisfy the wording and miss the work.</figcaption>
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
        <div className="tournament-event__consultation">
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
    </section>
  )
}
