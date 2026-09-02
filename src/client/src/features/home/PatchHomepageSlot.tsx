import type { ComponentType, ReactElement } from 'react'
import type { PatchHomepageFeature } from './homepageEdition'
import { SpecialistsPatchFeature } from './SpecialistsPatchFeature'

type PatchPresentation = ComponentType<{ feature: PatchHomepageFeature }>

function TournamentPatchFeature({ feature }: { feature: PatchHomepageFeature }): ReactElement {
  return (
    <section className="home-movement patch-movement patch-movement--tournament" aria-labelledby="home-tournament-title" data-home-movement="patch" data-patch-presentation="tournament">
      <span className="home-anchor-target" id={feature.anchorId} aria-hidden="true" />
      <div className="home-frame">
        <p className="home-eyebrow">Patch</p>
        <h2 className="home-section-title" id="home-tournament-title">{feature.title}</h2>
        <a className="home-cta" href={feature.to}>{feature.inwardLabel} →</a>
      </div>
    </section>
  )
}

export const patchHomepagePresentations: Record<PatchHomepageFeature['presentation'], PatchPresentation> = {
  'usual-specialists': SpecialistsPatchFeature,
  tournament: TournamentPatchFeature,
}

export function PatchHomepageSlot({ feature }: { feature: PatchHomepageFeature }): ReactElement {
  const Presentation = patchHomepagePresentations[feature.presentation]
  return <Presentation feature={feature} />
}
