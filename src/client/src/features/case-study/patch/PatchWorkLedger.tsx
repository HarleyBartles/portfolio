import type { ReactNode } from 'react'
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
    caption: 'The Emporium and shopkeeper establish the world; asset and deck work remain.',
  },
} as const

const statusLabels = {
  'advanced-visual-preproduction': 'Advanced visual pre-production',
  'visual-development': 'Visual development',
  'legacy-reference': 'Legacy reference',
} as const

export function PatchPublishedWork({ children }: { children?: ReactNode }) {
  return (
    <section className="patch-movement patch-published" aria-labelledby="patch-published-artefacts-title">
      <div className="patch-movement__copy">
        <p className="patch-section-number" aria-hidden="true">05</p>
        <h2 id="patch-published-artefacts-title">What has earned an artefact</h2>
        <p>Four pieces have cleared their own publication bar. Club DB is the origin deck. Goldilocks and The Sorcerer&apos;s Apprentice use the shallower fairytale format: one visual page, one operational lesson, one useful action. Introducing Patch explains the character who carries the work.</p>
        <ul className="patch-published-links" aria-label="Published Patch artefacts">
          {getPublishedArtefacts().map((artefact) => <li key={artefact.title}><a href={artefact.publicArtefactUrl}>{artefact.title}</a></li>)}
        </ul>
      </div>
      {children}
    </section>
  )
}

export function PatchInFlightWorlds() {
  return (
    <section className="patch-movement patch-worlds" aria-labelledby="patch-in-flight-worlds-title">
      <div className="patch-movement__copy patch-worlds__intro">
        <p className="patch-section-number" aria-hidden="true">06</p>
        <h2 id="patch-in-flight-worlds-title">Three worlds in motion</h2>
        <p>The three developed worlds have reached different points for different reasons. I keep those states visible because a finished-looking image can outrun the work around it.</p>
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
              <figure>
                <picture>
                  <source srcSet={getPatchAssetPath(avif.path)} type="image/avif" />
                  <source srcSet={getPatchAssetPath(webp.path)} type="image/webp" />
                  <img src={getPatchAssetPath(webp.path)} width={webp.width} height={webp.height} alt={visual.alt} loading="lazy" />
                </picture>
                <figcaption>{visual.caption}</figcaption>
              </figure>
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
