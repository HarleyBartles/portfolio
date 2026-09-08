import type { ReactElement } from 'react'
import styled from 'styled-components'
import { HomeCtaAnchor, HomeDisplayTitle, HomeEyebrow, HomeFrame } from './HomePrimitives'

const OpeningMovement = styled.section`
  position: relative;
  min-height: calc(100svh - 86px);
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--rule);

  ${HomeFrame} {
    padding: clamp(62px, 9vw, 120px) 0 clamp(56px, 8vw, 104px);
  }

  @media (max-width: 800px) {
    min-height: auto;
  }

  @media (max-width: 480px) {
    ${HomeFrame} {
      padding: 58px 0 70px;
    }
  }
`

const OpeningGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 28px;
  align-items: end;

  @media (max-width: 800px) {
    display: block;
  }
`

const OpeningTitle = styled.div`
  grid-column: 1 / span 7;

  ${HomeDisplayTitle} {
    max-width: 9ch;
  }

  @media (max-width: 800px) {
    ${HomeDisplayTitle} {
      max-width: 10ch;
      font-size: clamp(48px, 14vw, 72px);
    }
  }
`

const OpeningProof = styled.div`
  grid-column: 8 / span 5;
  padding-top: 20px;
  border-top: 1px solid var(--rule-strong);

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    padding: 12px 0;
    border-bottom: 1px solid var(--rule);
    font-size: clamp(17px, 1.55vw, 20px);
    line-height: 1.35;
  }

  li:first-child {
    padding-top: 0;
  }

  li:last-child {
    border-bottom: 0;
  }

  .small {
    margin: 0 0 14px;
    font-weight: 600;
  }

  @media (max-width: 800px) {
    margin-top: 44px;
  }
`

export function HomepageOpening(): ReactElement {
  return (
    <OpeningMovement aria-labelledby="home-opening-title" data-home-movement="opening" data-visual-contract="homepage-opening">
      <HomeFrame>
        <OpeningGrid>
          <OpeningTitle>
            <HomeEyebrow>Harley Bartles · Full-stack software engineer</HomeEyebrow>
            <HomeDisplayTitle id="home-opening-title">Engineering the whole problem, not just the code.</HomeDisplayTitle>
          </OpeningTitle>
          <OpeningProof>
            <ul aria-label="Professional proof">
              <li>5 years at The Access Group</li>
              <li>Engineering responsibility for Access Checks, end to end.</li>
              <li>Technical design → delivery → release → support → operation.</li>
              <li>Recently designed and delivered the service behind 2 additional paid screening checks.</li>
            </ul>
            <HomeCtaAnchor href="#marketplace">See the work ↓</HomeCtaAnchor>
          </OpeningProof>
        </OpeningGrid>
      </HomeFrame>
    </OpeningMovement>
  )
}
