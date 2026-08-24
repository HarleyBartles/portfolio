import { Link } from 'react-router-dom'
import { PatchShowcasePicture } from './PatchShowcaseEvidence'
import './LawfulHeistPage.scss'

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

export function LawfulHeistPage() {
  return (
    <section className="lawful-heist" aria-label="The Lawful Heist Crew adventure">
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
    </section>
  )
}
