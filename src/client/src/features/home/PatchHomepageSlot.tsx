import type { ComponentType, ReactElement } from 'react'
import type { PatchHomepageFeature } from './homepageEdition'
import { SpecialistsPatchFeature } from './SpecialistsPatchFeature'
import { TournamentPatchFeature } from './TournamentPatchFeature'

type PatchPresentation = ComponentType<{ feature: PatchHomepageFeature }>

export const patchHomepagePresentations: Record<PatchHomepageFeature['presentation'], PatchPresentation> = {
  'usual-specialists': SpecialistsPatchFeature,
  tournament: TournamentPatchFeature,
}

export function PatchHomepageSlot({ feature }: { feature: PatchHomepageFeature }): ReactElement {
  const Presentation = patchHomepagePresentations[feature.presentation]
  return <Presentation feature={feature} />
}
