import type { ReactElement } from 'react'
import { HomeCtaAnchor, HomeDisplayTitle, HomeEyebrow, HomeFrame } from './HomePrimitives'

export function HomepageOpening(): ReactElement {
  return (
    <section className="home-movement opening" aria-labelledby="home-opening-title" data-home-movement="opening" data-visual-contract="homepage-opening">
      <HomeFrame className="home-frame">
        <div className="opening-grid">
        <div className="opening-title">
          <HomeEyebrow className="home-eyebrow">Harley Bartles · Full-stack software engineer</HomeEyebrow>
          <HomeDisplayTitle className="home-display" id="home-opening-title">Engineering the whole problem, not just the code.</HomeDisplayTitle>
        </div>
        <div className="opening-proof">
          <ul aria-label="Professional proof">
            <li>5 years at The Access Group</li>
            <li>Engineering responsibility for Access Checks, end to end.</li>
            <li>Technical design → delivery → release → support → operation.</li>
            <li>Recently designed and delivered the service behind 2 additional paid screening checks.</li>
          </ul>
          <HomeCtaAnchor className="home-cta" href="#marketplace">See the work ↓</HomeCtaAnchor>
        </div>
        </div>
      </HomeFrame>
    </section>
  )
}
