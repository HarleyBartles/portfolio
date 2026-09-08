import type { ReactElement } from 'react'
import styled from 'styled-components'
import type { PatchHomepageFeature, WritingHomepageFeature } from './homepageEdition'
import { HomeAnchorTarget, HomeEyebrow, HomeFrame, HomeNextAnchor, HomeRouteActions, HomeRouteLink } from './HomePrimitives'

const WritingMovement = styled.section`
  position: relative;
  padding: clamp(96px, 13vw, 180px) 0;
  border-bottom: 1px solid var(--rule);

  @media (max-width: 800px) {
    padding: 92px 0;
  }

  @media (min-width: 521px) and (max-width: 800px) {
    min-height: calc(100svh + 120px);
    display: flex;
    align-items: center;
  }
`

const WritingAnchorTarget = styled(HomeAnchorTarget)`
  top: clamp(72px, 9vw, 120px);

  @media (max-width: 480px) {
    top: 0;
  }
`

const WritingGrid = styled(HomeFrame)`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 28px;

  @media (max-width: 800px) {
    display: block;
  }

  @media (min-width: 521px) and (max-width: 800px) {
    flex: none;
  }
`

const WritingLabel = styled(HomeEyebrow)`
  grid-column: 1 / span 2;

  @media (max-width: 800px) {
    margin-bottom: 30px;
  }
`

const WritingTitle = styled.h2`
  grid-column: 2 / span 8;
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(58px, 7.4vw, 104px);
  font-weight: 600;
  line-height: .94;
  letter-spacing: -.038em;

  @media (max-width: 800px) {
    font-size: clamp(52px, 15vw, 78px);
  }

  @media (max-width: 480px) {
    font-size: clamp(48px, 15vw, 64px);
  }
`

const WritingSummary = styled.div`
  grid-column: 8 / span 4;
  margin-top: 66px;

  p {
    margin: 0;
    font-family: var(--serif);
    font-size: 20px;
    font-weight: 400;
    line-height: 1.5;
  }

  ${HomeRouteLink} {
    font-family: var(--sans);
    font-size: 16px;
  }

  @media (max-width: 800px) {
    max-width: 31rem;
    margin: 44px 0 0 auto;
  }

  @media (max-width: 480px) {
    margin-left: 0;
  }
`

export function WritingFeature({ feature, nextFeature }: { feature: WritingHomepageFeature; nextFeature: PatchHomepageFeature }): ReactElement {
  return (
    <WritingMovement aria-labelledby="home-writing-title" data-home-movement="writing" data-visual-contract="homepage-writing">
      <WritingAnchorTarget id={feature.anchorId} aria-hidden="true" />
      <WritingGrid>
        <WritingLabel>Writing</WritingLabel>
        <WritingTitle id="home-writing-title">{feature.title}</WritingTitle>
        <WritingSummary>
          <p>{feature.summary}</p>
          <HomeRouteActions>
            <HomeRouteLink to={feature.to}>{feature.inwardLabel} →</HomeRouteLink>
            <HomeNextAnchor href={`#${nextFeature.anchorId}`}>{nextFeature.incomingTeaser} ↓</HomeNextAnchor>
          </HomeRouteActions>
        </WritingSummary>
      </WritingGrid>
    </WritingMovement>
  )
}
