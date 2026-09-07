import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { PatchShowcasePicture } from './PatchShowcaseEvidence'

const Story = styled.section`
  color: #18211c;
  display: grid; gap: clamp(var(--space-16), 9vw, var(--space-24)); padding-block: var(--space-12) var(--space-20);
  figure, blockquote { margin: 0; } picture, img { display: block; width: 100%; } img { height: auto; }
  .lawful-heist__lead { display: grid; grid-template-columns: minmax(0,1.35fr) minmax(16rem,.65fr); gap: var(--space-6) var(--space-12); align-items: end; max-width: 68rem; }
  .lawful-heist__lead .patch-status { grid-column: 1 / -1; color: #0d7476; font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700; }
  .lawful-heist__lead > p:nth-child(2) { margin: 0; font-family: var(--font-site-sans); font-size: clamp(1.65rem,3.4vw,3rem); line-height: 1.16; }
  .lawful-heist__lead > p:last-child { max-width: 24rem; margin: 0; padding-left: var(--space-6); border-left: 1px solid var(--patch-teal); color: var(--color-muted); font-family: var(--font-site-sans); font-size: .92rem; }
  .lawful-heist__folder { position: relative; overflow: hidden; border-block: 1px solid var(--color-border); } .lawful-heist__folder figcaption, .heist-recruit__scene figcaption { max-width: 22rem; padding: var(--space-3) 0; color: var(--color-muted); font-family: var(--font-site-sans); font-size: var(--type-caption-size); }
  .lawful-heist__crew { display: grid; gap: clamp(var(--space-16),10vw,var(--space-24)); }
  .heist-recruit { position: relative; display: grid; grid-template-columns: repeat(12,minmax(0,1fr)); padding-top: var(--space-10); border-top: 1px solid #18211c; }
  .heist-recruit__header { grid-column: 1 / span 5; grid-row: 1; align-self: center; padding: clamp(var(--space-6),4vw,var(--space-10)); color: var(--color-surface); background: #18211c; z-index: 2; }
  .heist-recruit__number, .heist-recruit__responsibility { margin: 0; font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700; } .heist-recruit__number { color: #71d0cd; } .heist-recruit__responsibility { margin-top: var(--space-5); color: rgb(255 255 255 / 72%); }
  .heist-recruit h2 { max-width: 9ch; margin: var(--space-2) 0 var(--space-5); font-size: clamp(3rem,7vw,6.4rem); line-height: .88; } .heist-recruit blockquote { max-width: 26rem; padding-top: var(--space-4); border-top: 1px solid currentColor; font-family: var(--font-site-sans); font-size: clamp(1.1rem,2vw,1.45rem); } .heist-recruit blockquote p { margin: 0; }
  .heist-recruit__portrait { grid-column: 4 / span 8; grid-row: 1; aspect-ratio: 1; overflow: hidden; background: #fff; } .heist-recruit__portrait picture, .heist-recruit__portrait img { height: 100%; } .heist-recruit__portrait img { object-fit: cover; }
  .heist-recruit__story { grid-column: 6 / span 6; grid-row: 2; max-width: 43rem; margin-top: calc(-1 * var(--space-10)); padding: clamp(var(--space-6),4vw,var(--space-10)); background: var(--color-interior-canvas); font-size: clamp(1.05rem,1.6vw,1.2rem); z-index: 2; } .heist-recruit__story p + p { margin-top: var(--space-5); }
  .heist-recruit__marker { grid-column: 10 / span 3; grid-row: 1; align-self: end; margin: 0 0 calc(-1 * var(--space-8)) var(--space-4); transform: rotate(2deg); z-index: 3; }
  .heist-recruit--silk .heist-recruit__header, .heist-recruit--klause .heist-recruit__header { grid-column: 8 / -1; } .heist-recruit--silk .heist-recruit__portrait, .heist-recruit--klause .heist-recruit__portrait { grid-column: 1 / span 9; } .heist-recruit--silk .heist-recruit__story, .heist-recruit--klause .heist-recruit__story { grid-column: 2 / span 6; } .heist-recruit--silk .heist-recruit__marker, .heist-recruit--klause .heist-recruit__marker { grid-column: 1 / span 3; justify-self: start; }
  .heist-recruit--writ { padding: clamp(var(--space-8),6vw,var(--space-14)); color: var(--color-surface); background: #406a78; border-top: 0; } .heist-recruit--writ .heist-recruit__story { color: #18211c; background: var(--color-interior-canvas); } .heist-recruit--rollback { padding: 0; color: var(--color-surface); background: #18211c; border-top: 0; } .heist-recruit--rollback .heist-recruit__scene { grid-column: 4 / -1; grid-row: 1; min-height: clamp(32rem,58vw,52rem); } .heist-recruit--rollback .heist-recruit__scene picture, .heist-recruit--rollback .heist-recruit__scene img { height: 100%; } .heist-recruit--rollback .heist-recruit__scene img { object-fit: cover; } .heist-recruit--rollback .heist-recruit__story { grid-column: 1 / span 7; color: var(--color-surface); background: rgb(24 33 28 / 96%); }
  .heist-recruit--receipt { align-items: end; background: linear-gradient(90deg,transparent 0 18%,rgb(212 164 59 / 18%) 18% 100%); }
  .lawful-heist__assembled { display: grid; grid-template-columns: minmax(16rem,.55fr) minmax(0,1.45fr); gap: var(--space-10); align-items: center; } .lawful-heist__assembled h2 { margin: var(--space-3) 0 var(--space-5); font-size: clamp(2.4rem,5vw,4.6rem); } .lawful-heist__case-study-link { max-width: 48rem; padding-top: var(--space-8); border-top: 1px solid #18211c; } .lawful-heist__case-study-link a { color: #153f42; font-weight: 700; }
  @media (max-width: 42rem) { .lawful-heist__lead, .lawful-heist__assembled { grid-template-columns: 1fr; } .heist-recruit { grid-template-columns: repeat(2,minmax(0,1fr)); } .heist-recruit__header, .heist-recruit--silk .heist-recruit__header, .heist-recruit--klause .heist-recruit__header, .heist-recruit--writ .heist-recruit__header, .heist-recruit--rollback .heist-recruit__header, .heist-recruit--receipt .heist-recruit__header { grid-column: 1 / -1; grid-row: 1; width: 92%; margin-bottom: calc(-1 * var(--space-5)); } .heist-recruit__portrait, .heist-recruit--silk .heist-recruit__portrait, .heist-recruit--klause .heist-recruit__portrait, .heist-recruit--writ .heist-recruit__portrait, .heist-recruit--rollback .heist-recruit__scene, .heist-recruit--receipt .heist-recruit__scene { grid-column: 1 / -1; grid-row: 2; } .heist-recruit__story, .heist-recruit--silk .heist-recruit__story, .heist-recruit--klause .heist-recruit__story, .heist-recruit--writ .heist-recruit__story, .heist-recruit--rollback .heist-recruit__story { grid-column: 1 / -1; grid-row: 3; margin: 0; } .heist-recruit__marker { grid-column: 2; grid-row: 2; width: 64%; margin: calc(-1 * var(--space-4)) var(--space-3) 0 0; justify-self: end; } .heist-recruit--rollback .heist-recruit__scene { min-height: 24rem; } }
`

const crew = [
  {
    id: 'index',
    number: '01',
    name: 'Index',
    responsibility: 'provenance',
    portrait: 'src/client/public/media/patch/patch-heist-index-560.avif',
    portraitAlt: 'Index, a bookish agent checking a route map at a table of records.',
    marker: 'src/client/public/media/patch/patch-heist-index-marker-420.avif',
    markerAlt: 'Index assent marker made from a folded blueprint and yellow catalogue note.',
    quote: 'The route exists. Now Silk needs to prove it isn’t a loophole.',
    paragraphs: [
      'Index starts with the record. She traces where the route came from, what it claims to permit and which evidence will survive being handed to the next specialist.',
      'Patch leaves with a route that can be cited instead of remembered. That gives the whole crew a shared thing to test.',
    ],
  },
  {
    id: 'silk',
    number: '02',
    name: 'Silk',
    responsibility: 'pressure-tests the route',
    portrait: 'src/client/public/media/patch/patch-heist-silk-560.avif',
    portraitAlt: 'Silk, a poised specialist in dark clothes beside taut red route lines.',
    marker: 'src/client/public/media/patch/patch-heist-silk-marker-420.avif',
    markerAlt: 'Silk assent marker made from a steel route tag crossed by red tension cord.',
    quote: 'Give me the route. I’ll show you where it breaks.',
    paragraphs: [
      'Silk takes the legitimate route personally. She pulls at every join, follows every dependency and keeps pushing until either the argument fails or the path proves it can hold.',
      'If demonstrating the lawful way means blowing up a comfortable assumption, she’ll light the fuse herself. Cool, dogged and very difficult to wave away.',
    ],
  },
  {
    id: 'writ',
    number: '03',
    name: 'Writ',
    responsibility: 'authority',
    portrait: 'src/client/public/media/patch/patch-heist-writ-560.avif',
    portraitAlt: 'Writ, an institutional agent holding a ledger and an official stamp.',
    marker: 'src/client/public/media/patch/patch-heist-writ-marker-420.avif',
    markerAlt: 'Writ assent marker on an official triplicate form signed across three copies.',
    quote: 'An override without authority is merely trespass with better stationery.',
    paragraphs: [
      'Writ is unimpressed by elegant loopholes. He wants to know whose authority the crew is acting under, where it begins and where it expires.',
      'The route has survived Silk. Writ makes it lawful. His assent is characteristically fusty, institutional and binding: “You sly old bombardier. I’m in.”',
    ],
  },
  {
    id: 'klause',
    number: '04',
    name: 'Klause',
    responsibility: 'decision',
    portrait: 'src/client/public/media/patch/patch-heist-klause-560.avif',
    portraitAlt: 'Klause, a compact decision specialist reading Patch’s proposal at his desk.',
    marker: 'src/client/public/media/patch/patch-heist-klause-marker-420.avif',
    markerAlt: 'Klause assent marker, a stamped K on a torn tan planning slip.',
    quote: 'You do not have a plan. You have a meeting.',
    paragraphs: [
      'Klause reduces options until a decision can be made. Bring him ten plans and he isn’t interested. Bring him five and he’s listening. Bring him three and you’ll talk.',
      'He gives the crew a plan small enough to choose, explain and execute. Variety has done its work by the time it reaches his desk.',
    ],
  },
  {
    id: 'rollback',
    number: '05',
    name: 'Rollback',
    responsibility: 'Recovery and Plan B',
    portrait: 'src/client/public/media/patch/patch-heist-rollback-560.avif',
    portraitAlt: 'Rollback, an unusually large calm agent built for recovery work.',
    marker: 'src/client/public/media/patch/patch-heist-rollback-marker-420.avif',
    markerAlt: 'Rollback assent marker made from his dog tags.',
    quote: 'What’s your Plan B? If you don’t have one, you ain’t got a plan.',
    paragraphs: [
      'Plan A is already failing behind the observation glass when Patch arrives. Rollback closes the containment shutter, turns back to the pitch and waits for the next plan. He never raises an eyebrow.',
      'Plans A through P can burn. The filing cabinet can burn with them. Rollback remains exactly where the crew needs him, ready to recover the work without making the failure theatrical.',
    ],
  },
  {
    id: 'receipt',
    number: '06',
    name: 'Receipt',
    responsibility: 'Audit',
    marker: 'src/client/public/media/patch/patch-heist-receipt-marker-420.avif',
    markerAlt: 'Receipt assent marker printed as the final entry on a long audit roll.',
    quote: "Before you ask, yes, I heard all of that. It's logged.",
    paragraphs: [
      'Nobody notices Receipt is there until someone needs a receipt. He has listened from his alcove while the folder moves through the safehouse, recording a quiet stream of decisions and signatures.',
      'Patch arrives to recruit him and finds the record already printed. Receipt offers the roll, declines the unnecessary pitch with one hand and joins the crew without interrupting the paperwork.',
    ],
  },
] as const

function CrewMember({ member }: { member: (typeof crew)[number] }) {
  const isRollback = member.id === 'rollback'
  const isReceipt = member.id === 'receipt'

  return (
    <article className={`heist-recruit heist-recruit--${member.id}`}>
      <header className="heist-recruit__header">
        <p className="heist-recruit__number">Recruit {member.number}</p>
        <p className="heist-recruit__responsibility">{member.responsibility}</p>
        <h2>{member.name}</h2>
        <blockquote><p>{member.quote}</p></blockquote>
      </header>

      {isRollback ? (
        <figure className="heist-recruit__scene heist-recruit__scene--rollback">
          <PatchShowcasePicture path="src/client/public/media/patch/patch-heist-rollback-lockdown-1200.avif" alt="Rollback presses an amber lockdown control as a containment shutter closes over a failing experiment chamber." />
          <figcaption>Plan A fails behind glass. Rollback closes the shutter and listens for Plan B.</figcaption>
        </figure>
      ) : null}

      {isReceipt ? (
        <figure className="heist-recruit__scene heist-recruit__scene--receipt">
          <PatchShowcasePicture path="src/client/public/media/patch/patch-heist-receipt-alcove-1200.avif" alt="Receipt leans from a small audit alcove and offers a long record that is already printed." />
        </figure>
      ) : member.portrait !== undefined ? (
        <figure className="heist-recruit__portrait">
          <PatchShowcasePicture path={member.portrait} alt={member.portraitAlt} />
        </figure>
      ) : null}

      <div className="heist-recruit__story">
        {member.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>

      <figure className="heist-recruit__marker">
        <PatchShowcasePicture path={member.marker} alt={member.markerAlt} />
      </figure>
    </article>
  )
}

export function UsualSpecialistsPage() {
  return (
    <Story className="lawful-heist" aria-label="The Usual Specialists adventure" data-type-register="site-sans" data-visual-contract="patch-usual-specialists">
      <header className="lawful-heist__lead">
        <p className="patch-status">Advanced visual pre-production</p>
        <p>Patch has a lawful route into a protected vault and six names on a folder. The job is to recruit the specialists who can prove the route, test it, authorise it, choose it, recover it and leave a record.</p>
        <p>If the crew does that well, the heist itself should be almost offensively boring.</p>
      </header>

      <figure className="lawful-heist__folder lawful-heist__folder--open">
        <PatchShowcasePicture path="src/client/public/media/patch/patch-heist-folder-open-1200.avif" alt="A clean Lawful Heist recruitment folder listing six prospective crew members." />
        <figcaption>One lawful route. Six specialists still to convince.</figcaption>
      </figure>

      <div className="lawful-heist__crew">
        {crew.map((member) => <CrewMember member={member} key={member.id} />)}
      </div>

      <section className="lawful-heist__assembled" aria-labelledby="lawful-heist-assembled-title">
        <div>
          <p className="eyebrow">The crew is in</p>
          <h2 id="lawful-heist-assembled-title">The folder becomes the plan</h2>
          <p>Folder order records who joined when. The page order follows the work: provenance, pressure, authority, decision, recovery and audit.</p>
        </div>
        <figure className="lawful-heist__folder lawful-heist__folder--complete">
          <PatchShowcasePicture path="src/client/public/media/patch/patch-heist-1200.avif" alt="The completed recruitment folder for the Lawful Heist, covered with the six crew members' assent markers." />
          <figcaption>Every specialist leaves a different mark. Receipt leaves the record.</figcaption>
        </figure>
      </section>

      <div className="lawful-heist__case-study-link">
        <p>The production system behind the crew and their story has its own engineering case study.</p>
        <Link to="/projects/adventures-of-patch">Read the Adventures of Patch engineering case study</Link>
      </div>
    </Story>
  )
}
