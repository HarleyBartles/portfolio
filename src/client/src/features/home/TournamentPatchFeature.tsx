import type { ReactElement } from 'react'
import styled from 'styled-components'
import type { PatchHomepageFeature } from './homepageEdition'
import { HomeAnchorTarget, HomeCtaAnchor, HomeEyebrow, HomeFrame, HomeSectionTitle } from './HomePrimitives'

const TournamentMovement = styled.section`
  position: relative;
  z-index: 0;
  padding: clamp(76px, 9vw, 124px) 0 clamp(132px, 15vw, 210px);
  overflow: hidden;
  isolation: isolate;
  border-bottom: 1px solid var(--rule);

  @media (max-width: 520px) {
    padding-top: 76px;
    padding-bottom: 132px;
  }
`

export function TournamentPatchFeature({ feature }: { feature: PatchHomepageFeature }): ReactElement {
  return (
    <TournamentMovement aria-labelledby="home-tournament-title" data-home-movement="patch" data-patch-presentation="tournament">
      <HomeAnchorTarget id={feature.anchorId} aria-hidden="true" />
      <HomeFrame>
        <HomeEyebrow>Patch</HomeEyebrow>
        <HomeSectionTitle id="home-tournament-title">{feature.title}</HomeSectionTitle>
        <HomeCtaAnchor href={feature.to}>{feature.inwardLabel} →</HomeCtaAnchor>
      </HomeFrame>
    </TournamentMovement>
  )
}
