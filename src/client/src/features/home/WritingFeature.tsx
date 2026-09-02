import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import type { PatchHomepageFeature, WritingHomepageFeature } from './homepageEdition'

export function WritingFeature({ feature, nextFeature }: { feature: WritingHomepageFeature; nextFeature: PatchHomepageFeature }): ReactElement {
  return (
    <section className="home-movement home-writing-feature" aria-labelledby="home-writing-title" data-home-movement="writing" data-visual-contract="homepage-writing">
      <span className="home-anchor-target home-anchor-target--writing" id={feature.anchorId} aria-hidden="true" />
      <div className="home-frame home-writing-feature-grid">
        <p className="home-eyebrow home-writing-feature-label">Writing</p>
        <h2 className="home-article-title" id="home-writing-title">{feature.title}</h2>
        <div className="home-article-summary">
          <p>{feature.summary}</p>
          <div className="home-route-actions">
            <Link className="home-cta" to={feature.to}>{feature.inwardLabel} →</Link>
            <a className="home-next" href={`#${nextFeature.anchorId}`}>{nextFeature.incomingTeaser} ↓</a>
          </div>
        </div>
      </div>
    </section>
  )
}
