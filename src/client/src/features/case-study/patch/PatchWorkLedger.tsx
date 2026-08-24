import type { ReactNode } from 'react'
import { ExternalLink } from '../../../components/ExternalLink'
import { getInFlightWorlds, getPatchMediaByPath, getPublishedArtefacts } from './patchEvidence'
import { getPatchAssetPath } from './PatchEvidenceGallery'

const worldMedia = {
  'Lawful Heist': {
    key: 'heist',
    path: 'src/client/public/media/patch/patch-heist-1200.avif',
    alt: 'Lawful Heist joined visual evidence showing six specialist roles and an audit receipt linking the planned adventure.',
    caption: 'Accepted visual evidence shows continuity through advanced visual pre-production; the deck itself remains unbuilt.',
  },
  'Tournament of Reasonable Defaults': {
    key: 'tournament',
    path: 'src/client/public/media/patch/patch-tournament-1200.avif',
    alt: 'Patch asks three stakeholders for route clarification at a race check booth before proceeding.',
    caption: 'The route-check scene makes consultation visible. Scene and deck production remain.',
  },
  'Identity Emporium': {
    key: 'identity',
    path: 'src/client/public/media/patch/patch-identity-1200.avif',
    alt: 'Patch shows a mission card to the Identity Emporium shopkeeper beside role costumes and task tools.',
    caption: 'Patch brings the task to the Emporium, where the role becomes preparation for the work ahead.',
  },
} as const

const statusLabels = {
  'advanced-visual-preproduction': 'Advanced visual pre-production',
  'visual-development': 'Visual development',
  'legacy-reference': 'Legacy reference',
} as const

function EvidencePicture({ path, alt }: { path: string; alt: string }) {
  const avif = getPatchMediaByPath(path)
  const webp = getPatchMediaByPath(path.replace(/\.avif$/, '.webp'))
  if (avif === undefined || webp === undefined) throw new Error(`Patch evidence is missing for ${path}.`)

  return (
    <picture>
      <source srcSet={getPatchAssetPath(avif.path)} type="image/avif" />
      <source srcSet={getPatchAssetPath(webp.path)} type="image/webp" />
      <img src={getPatchAssetPath(webp.path)} width={webp.width} height={webp.height} alt={alt} loading="lazy" />
    </picture>
  )
}

const identityRoles = [
  { name: 'Cowboy', path: 'src/client/public/media/patch/patch-identity-cowboy-480.avif', alt: 'Patch wearing the cowboy role kit with hat, waistcoat, boots and lasso.' },
  { name: 'Detective', path: 'src/client/public/media/patch/patch-identity-detective-480.avif', alt: 'Patch wearing the detective role kit with deerstalker, coat and magnifying glass.' },
  { name: 'Mechanic', path: 'src/client/public/media/patch/patch-identity-mechanic-480.avif', alt: 'Patch wearing the mechanic role kit and holding a wrench.' },
  { name: 'Chef', path: 'src/client/public/media/patch/patch-identity-chef-480.avif', alt: 'Patch wearing the chef role kit with apron and chef hat.' },
] as const

function IdentityEmporiumEvidence() {
  return (
    <figure className="identity-evidence" aria-label="Identity Emporium compares three approaches to preparation">
      <div className="identity-evidence__logic" aria-label="Three approaches to a cowboy task">
        <div><span>Bot</span><strong>Preparation mistaken for a script</strong><small>All the gear, no idea</small><span className="identity-evidence__outcome">Misreads the work</span></div>
        <div><span>Bit</span><strong>Straight to work, underprepared</strong><small>No get-up, can&apos;t get down to work</small><span className="identity-evidence__outcome">Starts too soon</span></div>
        <div><span>Patch</span><strong>Preparation shaped by the task</strong><small>Prepared for the job</small><span className="identity-evidence__outcome">Ready to work</span></div>
      </div>
      <div className="identity-evidence__source-pair">
        <div>
          <EvidencePicture path="src/client/public/media/patch/patch-identity-1200.avif" alt="Patch receives a mission role kit from the Identity Emporium shopkeeper." />
          <p>The Emporium supplies the role</p>
        </div>
        <div className="identity-evidence__failure-panel">
          <div className="identity-evidence__failure-pair">
            <div>
              <EvidencePicture path="src/client/public/media/patch/patch-identity-bot-failure-480.avif" alt="Bot in a cowboy role kit trying to lasso a fleeing chicken." />
            </div>
            <div>
              <EvidencePicture path="src/client/public/media/patch/patch-identity-bit-action-480.avif" alt="Bit carrying a toolbox in his usual robot configuration." />
            </div>
          </div>
          <p>Bit and Bot expose the two failure modes</p>
        </div>
      </div>
      <ul className="identity-evidence__roles" aria-label="Patch role kits">
        {identityRoles.map((role) => <li key={role.name}><EvidencePicture path={role.path} alt={role.alt} /><span>{role.name}</span></li>)}
      </ul>
      <figcaption className="case-study-media-caption">Preparation gives capability a useful shape. Judgement keeps it relevant once the work begins.</figcaption>
    </figure>
  )
}

export function PatchPublishedWork({ children }: { children?: ReactNode }) {
  return (
    <section className="patch-movement patch-published" aria-labelledby="patch-published-artefacts-title">
      <div className="patch-movement__copy case-study-lead">
        <div className="case-study-lead__heading">
          <p className="patch-section-number" aria-hidden="true">05</p>
          <h2 id="patch-published-artefacts-title">What has earned an artefact</h2>
        </div>
        <div className="case-study-lead__body">
          <p>Four pieces have cleared their own publication bar. Club DB is the origin deck. Goldilocks and The Sorcerer&apos;s Apprentice use the shallower fairytale format: one visual page, one operational lesson, one useful action. Introducing Patch explains the character who carries the work.</p>
          <ul className="patch-published-links" aria-label="Published Patch artefacts">
            {getPublishedArtefacts().map((artefact) => <li key={artefact.title}><ExternalLink href={artefact.publicArtefactUrl}>{artefact.title}</ExternalLink></li>)}
          </ul>
        </div>
      </div>
      {children}
    </section>
  )
}

export function PatchInFlightWorlds() {
  return (
    <section className="patch-movement patch-worlds" aria-labelledby="patch-in-flight-worlds-title">
      <div className="patch-movement__copy patch-worlds__intro case-study-lead">
        <div className="case-study-lead__heading">
          <p className="patch-section-number" aria-hidden="true">06</p>
          <h2 id="patch-in-flight-worlds-title">Three worlds in motion</h2>
        </div>
        <div className="case-study-lead__body">
          <p>The three developed worlds have reached different points for different reasons. I keep those states visible because a finished-looking image can outrun the work around it.</p>
        </div>
      </div>
      <div className="patch-worlds__sequence">
        {getInFlightWorlds().map((world) => {
          const visual = worldMedia[world.title as keyof typeof worldMedia]
          const avif = visual === undefined ? undefined : getPatchMediaByPath(visual.path)
          const webp = visual === undefined ? undefined : getPatchMediaByPath(visual.path.replace(/\.avif$/, '.webp'))

          if (visual === undefined || avif === undefined || webp === undefined) throw new Error(`Patch world evidence is missing for ${world.title}.`)

          return (
            <article key={world.title} className="patch-world" data-world={visual.key} aria-label={world.title}>
              <div className="patch-world__copy">
                <p className="patch-status">{statusLabels[world.status]}</p>
                <h3>{world.title}</h3>
                <p className="patch-world__lesson">{world.lesson}</p>
                <p><strong>Current evidence.</strong> {world.currentEvidence}</p>
                <p><strong>What remains.</strong> {world.remaining}</p>
              </div>
              {world.title === 'Identity Emporium' ? <IdentityEmporiumEvidence /> : (
                <figure>
                  <picture>
                    <source srcSet={getPatchAssetPath(avif.path)} type="image/avif" />
                    <source srcSet={getPatchAssetPath(webp.path)} type="image/webp" />
                    <img src={getPatchAssetPath(webp.path)} width={webp.width} height={webp.height} alt={visual.alt} loading="lazy" />
                  </picture>
                  <figcaption className="case-study-media-caption">{visual.caption}</figcaption>
                </figure>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export function PatchWorkLedger({ children }: { children?: ReactNode }) {
  return <><PatchPublishedWork>{children}</PatchPublishedWork><PatchInFlightWorlds /></>
}
