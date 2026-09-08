import type { ReactElement } from 'react'
import { homepageAssetPath } from './homepageAssets'
import { HomeAnchorTarget, HomeBody, HomeEyebrow, HomeFrame, HomeNextAnchor, HomeRouteActions, HomeRouteLink, HomeSectionTitle } from './HomePrimitives'

export function MarketplaceFeature(): ReactElement {
  return (
    <section className="home-movement home-project marketplace-movement" aria-labelledby="home-marketplace-title" data-home-movement="marketplace" data-visual-contract="homepage-marketplace">
      <HomeAnchorTarget className="home-anchor-target" id="marketplace" aria-hidden="true" />
      <HomeFrame className="home-frame home-project-grid market-grid">
        <div className="home-project-copy">
          <HomeEyebrow className="home-eyebrow">Agent Asset Marketplace · superpowers-plus</HomeEyebrow>
          <HomeSectionTitle className="home-section-title" id="home-marketplace-title">A strong system, changed by using it.</HomeSectionTitle>
          <HomeBody className="home-body">I use obra/superpowers as a strong base system. superpowers-plus is my plugin around the way I actually work; Handoff Gates makes one boundary explicit: work does not move on because its producer says it is done. The next worker has to be able to continue without improvising.</HomeBody>
          <HomeRouteActions className="home-route-actions">
            <HomeRouteLink className="home-cta" to="/writing/use-superpowers">Read the story →</HomeRouteLink>
            <HomeNextAnchor className="home-next" href="#wild-bunch">I tried to break my own event-sourcing claim ↓</HomeNextAnchor>
          </HomeRouteActions>
        </div>
        <div className="home-project-visual"><figure className="market-asset">
          <picture>
            <source media="(max-width: 480px)" srcSet={homepageAssetPath('marketplace-superpowers-plus-narrow.svg')} />
            <source media="(max-width: 900px)" srcSet={homepageAssetPath('marketplace-superpowers-plus-intermediate.svg')} />
            <img src={homepageAssetPath('marketplace-superpowers-plus-wide.svg')} alt="A calm modular route system becomes stronger where one close-tolerance Superpowers Plus intervention lets the route continue across the composition." width="1600" height="900" />
          </picture>
        </figure></div>
      </HomeFrame>
    </section>
  )
}
