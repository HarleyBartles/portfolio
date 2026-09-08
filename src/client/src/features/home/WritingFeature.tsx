import type { ReactElement } from 'react'
import type { PatchHomepageFeature, WritingHomepageFeature } from './homepageEdition'
import { HomeAnchorTarget, HomeEyebrow, HomeFrame, HomeNextAnchor, HomeRouteActions, HomeRouteLink } from './HomePrimitives'

export function WritingFeature({ feature, nextFeature }: { feature: WritingHomepageFeature; nextFeature: PatchHomepageFeature }): ReactElement {
  return (
    <section className="home-movement home-writing-feature" aria-labelledby="home-writing-title" data-home-movement="writing" data-visual-contract="homepage-writing">
      <HomeAnchorTarget className="home-anchor-target home-anchor-target--writing" id={feature.anchorId} aria-hidden="true" />
      <HomeFrame className="home-frame home-writing-feature-grid">
        <HomeEyebrow className="home-eyebrow home-writing-feature-label">Writing</HomeEyebrow>
        <h2 className="home-article-title" id="home-writing-title">{feature.title}</h2>
        <div className="home-article-summary">
          <p>{feature.summary}</p>
          <HomeRouteActions className="home-route-actions">
            <HomeRouteLink className="home-cta" to={feature.to}>{feature.inwardLabel} →</HomeRouteLink>
            <HomeNextAnchor className="home-next" href={`#${nextFeature.anchorId}`}>{nextFeature.incomingTeaser} ↓</HomeNextAnchor>
          </HomeRouteActions>
        </div>
      </HomeFrame>
    </section>
  )
}
