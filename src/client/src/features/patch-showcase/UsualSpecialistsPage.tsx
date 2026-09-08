import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { PatchShowcasePicture } from './PatchShowcaseEvidence'

type RecruitVariant = 'index' | 'silk' | 'writ' | 'klause' | 'rollback' | 'receipt'

const Story = styled.section`
  display: grid;
  gap: clamp(var(--space-16), 9vw, var(--space-24));
  padding-block: var(--space-12) var(--space-20);
  color: #18211c;
`

const Lead = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(16rem, .65fr);
  gap: var(--space-6) var(--space-12);
  align-items: end;
  max-width: 68rem;

  @media (max-width: 54rem) {
    grid-template-columns: 1fr;
  }
`
const LeadStatus = styled.p`
  grid-column: 1 / -1; margin: 0; color: #0d7476; font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700;
`
const LeadStatement = styled.p`
  margin: 0; font-family: var(--font-site-sans); font-size: clamp(1.65rem, 3.4vw, 3rem); line-height: 1.16;
`
const LeadNote = styled.p`
  max-width: 24rem; margin: 0; padding-left: var(--space-6); border-left: 1px solid #0d7476; color: var(--color-muted); font-family: var(--font-site-sans); font-size: .92rem;
`
const Folder = styled.figure`
  position: relative; overflow: hidden; margin: 0; border-block: 1px solid var(--color-border);
  img, picture { display: block; width: 100%; }
  img { height: auto; }
`
const FolderCaption = styled.figcaption`
  max-width: 22rem; padding: var(--space-3) 0; color: var(--color-muted); font-family: var(--font-site-sans); font-size: var(--type-caption-size); line-height: 1.45;
`
const Crew = styled.div`
  display: grid; gap: clamp(var(--space-16), 10vw, var(--space-24));
`
const Recruit = styled.article<{ $variant: RecruitVariant }>`
  position: relative; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); align-items: start; padding-top: var(--space-10); border-top: 1px solid #18211c;
  ${({ $variant }) => $variant === 'writ' && 'padding: clamp(var(--space-8), 6vw, var(--space-14)); color: var(--color-surface); background: #406a78; border-top: 0;'}
  ${({ $variant }) => $variant === 'rollback' && 'gap: 0; padding: 0; color: var(--color-surface); background: #18211c; border-top: 0;'}
  ${({ $variant }) => $variant === 'receipt' && 'align-items: end; background: linear-gradient(90deg, transparent 0 18%, rgb(212 164 59 / 18%) 18% 100%);'}
  @media (max-width: 42rem) { grid-template-columns: repeat(2, minmax(0, 1fr)); padding-top: var(--space-8); ${({ $variant }) => $variant === 'writ' && 'padding: var(--space-5);'} }
`
const RecruitHeader = styled.header<{ $variant: RecruitVariant }>`
  grid-column: 1 / span 5; grid-row: 1; align-self: center; padding: clamp(var(--space-6), 4vw, var(--space-10)); color: var(--color-surface); background: #18211c; z-index: 2;
  ${({ $variant }) => ['silk', 'klause'].includes($variant) && 'grid-column: 8 / -1;'}
  ${({ $variant }) => $variant === 'writ' && 'color: #18211c; background: var(--color-interior-canvas);'}
  ${({ $variant }) => $variant === 'rollback' && 'padding: clamp(var(--space-8), 7vw, var(--space-16)); background: rgb(24 33 28 / 92%); box-shadow: none;'}
  ${({ $variant }) => $variant === 'receipt' && 'grid-column: 1 / span 4; align-self: end; margin-bottom: var(--space-10); color: #18211c; background: var(--color-interior-canvas);'}
  p { margin: 0; } .heist-recruit__number, .heist-recruit__responsibility { font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700; letter-spacing: .012em; text-transform: none; } .heist-recruit__responsibility { margin-top: var(--space-5); color: rgb(255 255 255 / 72%); } .heist-recruit__number { color: #71d0cd; } h2 { max-width: 9ch; margin: var(--space-2) 0 var(--space-5); font-size: clamp(3rem, 7vw, 6.4rem); line-height: .88; } blockquote { max-width: 26rem; margin: 0; padding-top: var(--space-4); border-top: 1px solid currentColor; font-family: var(--font-site-sans); font-size: clamp(1.1rem, 2vw, 1.45rem); line-height: 1.25; } blockquote p { margin: 0; color: inherit; font: inherit; }
  ${({ $variant }) => $variant === 'writ' && '.heist-recruit__number { color: #0d7476; } .heist-recruit__responsibility { color: var(--color-muted); }'}
  ${({ $variant }) => $variant === 'rollback' && '.heist-recruit__number, .heist-recruit__responsibility { color: #f2c35b; }'}
  ${({ $variant }) => $variant === 'receipt' && '.heist-recruit__number { color: #0d7476; } .heist-recruit__responsibility { color: var(--color-muted); }'}
  @media (max-width: 42rem) { grid-column: 1 / -1; grid-row: 1; justify-self: start; width: min(92%, 30rem); margin-bottom: calc(-1 * var(--space-5)); ${({ $variant }) => ['rollback','receipt'].includes($variant) && 'margin-bottom: calc(-1 * var(--space-5));'} ${({ $variant }) => $variant === 'receipt' && 'width: 78%;'} }
`
const RecruitPortrait = styled.figure<{ $variant: RecruitVariant }>`
  grid-column: 4 / span 8; grid-row: 1; aspect-ratio: 1; overflow: hidden; margin: 0; background: #fff;
  ${({ $variant }) => ['silk', 'klause'].includes($variant) && 'grid-column: 1 / span 9;'}
  ${({ $variant }) => $variant === 'writ' && 'grid-column: 4 / -1;'}
  ${({ $variant }) => $variant === 'rollback' && 'grid-column: 7 / span 5; grid-row: 2; aspect-ratio: 4 / 5; min-height: min(40rem, 50vw); margin-top: calc(-1 * var(--space-20)); z-index: 2;'}
  picture, img { display: block; width: 100%; height: 100%; } img { object-fit: cover; object-position: center; }
  @media (max-width: 54rem) { ${({ $variant }) => $variant === 'rollback' && 'grid-column: 6 / -1; min-height: 0;'} }
  @media (max-width: 42rem) { grid-column: 1 / -1; grid-row: 2; ${({ $variant }) => $variant === 'rollback' && 'grid-row: 3; min-height: 0; margin: 0;'} }
`
const RecruitScene = styled.figure<{ $variant: RecruitVariant }>`
  margin: 0; ${({ $variant }) => $variant === 'rollback' && 'grid-column: 4 / -1; grid-row: 1; align-self: stretch; min-height: clamp(32rem, 58vw, 52rem);'} ${({ $variant }) => $variant === 'receipt' && 'grid-column: 3 / -1; grid-row: 1; margin-left: var(--space-8); border: 1px solid var(--color-border);'}
  picture, img { display: block; width: 100%; } figcaption { max-width: 22rem; padding: var(--space-3) 0; color: var(--color-muted); font-family: var(--font-site-sans); font-size: var(--type-caption-size); }
  ${({ $variant }) => $variant === 'rollback' && 'picture, img { height: 100%; } img { object-fit: cover; object-position: center; }'}
  @media (max-width: 42rem) { ${({ $variant }) => ['rollback','receipt'].includes($variant) && 'grid-column: 1 / -1; grid-row: 2; margin-left: 0;'} ${({ $variant }) => $variant === 'rollback' && 'min-height: 24rem;'} figcaption { max-width: none; } }
`
const RecruitStory = styled.div<{ $variant: RecruitVariant }>`
  grid-column: 6 / span 6; grid-row: 2; max-width: 43rem; margin-top: calc(-1 * var(--space-10)); padding: clamp(var(--space-6), 4vw, var(--space-10)); background: var(--color-interior-canvas); font-size: clamp(1.05rem, 1.6vw, 1.2rem); z-index: 2; p + p { margin-top: var(--space-5); }
  ${({ $variant }) => ['silk','klause'].includes($variant) && 'grid-column: 2 / span 6;'} ${({ $variant }) => $variant === 'writ' && 'grid-column: 2 / span 6; color: #18211c;'} ${({ $variant }) => $variant === 'rollback' && 'grid-column: 1 / span 7; margin-top: calc(-1 * var(--space-10)); padding: clamp(var(--space-8),5vw,var(--space-12)); color: var(--color-surface); background: rgb(24 33 28 / 96%); box-shadow: none; z-index: 3;'} ${({ $variant }) => $variant === 'receipt' && 'grid-column: 3 / span 7; margin-top: calc(-1 * var(--space-8));'}
  @media (max-width: 42rem) { grid-column: 1 / -1; grid-row: 3; margin: 0; ${({ $variant }) => $variant === 'rollback' && 'grid-row: 4;'} }
`
const RecruitMarker = styled.figure<{ $variant: RecruitVariant }>`
  grid-column: 10 / span 3; grid-row: 1; align-self: end; margin: 0 0 calc(-1 * var(--space-8)) var(--space-4); transform: rotate(2deg); z-index: 3;
  ${({ $variant }) => ['silk','klause'].includes($variant) && 'grid-column: 1 / span 3; justify-self: start; margin-left: calc(-1 * var(--space-4));'} ${({ $variant }) => $variant === 'writ' && 'grid-column: 10 / -1;'} ${({ $variant }) => $variant === 'rollback' && 'grid-column: 11 / span 2; grid-row: 2; padding: var(--space-4);'} ${({ $variant }) => $variant === 'receipt' && 'grid-column: 9 / span 3; grid-row: 2;'}
  picture, img { display: block; width: 100%; } @media (max-width: 42rem) { grid-column: 2; grid-row: 2; align-self: start; justify-self: end; width: 64%; margin: calc(-1 * var(--space-4)) var(--space-3) 0 0; ${({ $variant }) => $variant === 'rollback' && 'grid-row: 3; width: 56%; margin: var(--space-4);'} ${({ $variant }) => $variant === 'receipt' && 'grid-row: 2; width: 54%; margin: var(--space-4);'} }
`
const Assembled = styled.section`
  display: grid; grid-template-columns: minmax(16rem,.55fr) minmax(0,1.45fr); gap: var(--space-10); align-items: center; h2 { margin: var(--space-3) 0 var(--space-5); font-size: clamp(2.4rem,5vw,4.6rem); line-height: .98; } > div { max-width: 30rem; } @media (max-width: 54rem) { grid-template-columns: 1fr; }
`
const CaseStudyLink = styled.div`
  max-width: 48rem; padding-top: var(--space-8); border-top: 1px solid #18211c; a { color: #153f42; font-weight: 700; text-decoration-thickness: .12em; text-underline-offset: .2em; }
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
  const variant = member.id as RecruitVariant

  return (
    <Recruit $variant={variant} className={`heist-recruit heist-recruit--${member.id}`} data-specialist={member.id}>
      <RecruitHeader $variant={variant} className="heist-recruit__header">
        <p className="heist-recruit__number">Recruit {member.number}</p>
        <p className="heist-recruit__responsibility">{member.responsibility}</p>
        <h2>{member.name}</h2>
        <blockquote><p>{member.quote}</p></blockquote>
      </RecruitHeader>

      {isRollback ? (
        <RecruitScene $variant={variant} className="heist-recruit__scene heist-recruit__scene--rollback">
          <PatchShowcasePicture path="src/client/public/media/patch/patch-heist-rollback-lockdown-1200.avif" alt="Rollback presses an amber lockdown control as a containment shutter closes over a failing experiment chamber." />
          <figcaption>Plan A fails behind glass. Rollback closes the shutter and listens for Plan B.</figcaption>
        </RecruitScene>
      ) : null}

      {isReceipt ? (
        <RecruitScene $variant={variant} className="heist-recruit__scene heist-recruit__scene--receipt">
          <PatchShowcasePicture path="src/client/public/media/patch/patch-heist-receipt-alcove-1200.avif" alt="Receipt leans from a small audit alcove and offers a long record that is already printed." />
        </RecruitScene>
      ) : member.portrait !== undefined ? (
        <RecruitPortrait $variant={variant} className="heist-recruit__portrait">
          <PatchShowcasePicture path={member.portrait} alt={member.portraitAlt} />
        </RecruitPortrait>
      ) : null}

      <RecruitStory $variant={variant} className="heist-recruit__story">
        {member.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </RecruitStory>

      <RecruitMarker $variant={variant} className="heist-recruit__marker">
        <PatchShowcasePicture path={member.marker} alt={member.markerAlt} />
      </RecruitMarker>
    </Recruit>
  )
}

export function UsualSpecialistsPage() {
  return (
    <Story className="lawful-heist" aria-label="The Usual Specialists adventure" data-type-register="site-sans" data-visual-contract="patch-usual-specialists">
      <Lead className="lawful-heist__lead">
        <LeadStatus className="patch-status">Advanced visual pre-production</LeadStatus>
        <LeadStatement>Patch has a lawful route into a protected vault and six names on a folder. The job is to recruit the specialists who can prove the route, test it, authorise it, choose it, recover it and leave a record.</LeadStatement>
        <LeadNote>If the crew does that well, the heist itself should be almost offensively boring.</LeadNote>
      </Lead>

      <Folder className="lawful-heist__folder lawful-heist__folder--open">
        <PatchShowcasePicture path="src/client/public/media/patch/patch-heist-folder-open-1200.avif" alt="A clean Lawful Heist recruitment folder listing six prospective crew members." />
        <FolderCaption>One lawful route. Six specialists still to convince.</FolderCaption>
      </Folder>

      <Crew className="lawful-heist__crew">
        {crew.map((member) => <CrewMember member={member} key={member.id} />)}
      </Crew>

      <Assembled className="lawful-heist__assembled" aria-labelledby="lawful-heist-assembled-title">
        <div>
          <p className="eyebrow">The crew is in</p>
          <h2 id="lawful-heist-assembled-title">The folder becomes the plan</h2>
          <p>Folder order records who joined when. The page order follows the work: provenance, pressure, authority, decision, recovery and audit.</p>
        </div>
        <Folder className="lawful-heist__folder lawful-heist__folder--complete">
          <PatchShowcasePicture path="src/client/public/media/patch/patch-heist-1200.avif" alt="The completed recruitment folder for the Lawful Heist, covered with the six crew members' assent markers." />
          <FolderCaption>Every specialist leaves a different mark. Receipt leaves the record.</FolderCaption>
        </Folder>
      </Assembled>

      <CaseStudyLink className="lawful-heist__case-study-link">
        <p>The production system behind the crew and their story has its own engineering case study.</p>
        <Link to="/projects/adventures-of-patch">Read the Adventures of Patch engineering case study</Link>
      </CaseStudyLink>
    </Story>
  )
}
