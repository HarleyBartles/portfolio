import type { ReactElement } from 'react'
import styled from 'styled-components'
import { homepageAssetPath } from './homepageAssets'
import { HomeAnchorTarget, HomeBody, HomeEyebrow, HomeFrame, HomeNextAnchor, HomeRouteActions, HomeRouteLink, HomeSectionTitle } from './HomePrimitives'

const MarketplaceMovement = styled.section`
  position: relative;
  min-height: calc(100svh - 56px);
  display: flex;
  align-items: center;
  padding: clamp(82px, 10vw, 142px) 0;
  overflow: hidden;
  border-bottom: 1px solid var(--rule);

  @media (max-width: 800px) {
    padding: 76px 0;
  }
`

const MarketplaceGrid = styled(HomeFrame)`
  --home-frame-width: 100%;
  --home-frame-narrow-width: 100%;
  --home-frame-margin-inline: 0;
  position: relative;
  display: grid;
  width: 100%;
  max-width: none;
  margin: 0;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 0;
  align-items: center;
  flex: 1;

  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

const MarketplaceCopy = styled.div`
  grid-column: 1 / span 5;
  grid-row: 1;
  z-index: 3;
  max-width: none;
  padding: clamp(48px, 6vw, 84px) clamp(36px, 5vw, 72px) clamp(48px, 6vw, 84px) max(24px, calc((100vw - var(--max)) / 2));
  background: var(--mineral);

  ${HomeBody} {
    max-width: 31rem;
    margin-top: 22px;
  }

  @media (max-width: 800px) {
    display: contents;

    ${HomeEyebrow},
    ${HomeSectionTitle} {
      order: 1;
      padding-inline: clamp(20px, 5vw, 40px);
    }

    ${HomeBody} {
      order: 3;
      padding-inline: clamp(20px, 5vw, 40px);
    }

    ${HomeRouteActions} {
      order: 4;
      margin-inline: clamp(20px, 5vw, 40px);
    }
  }

  @media (max-width: 480px) {
    ${HomeEyebrow},
    ${HomeSectionTitle},
    ${HomeBody} {
      padding-inline: 20px;
    }

    ${HomeRouteActions} {
      margin-inline: 20px;
    }
  }
`

const MarketplaceVisual = styled.div`
  position: relative;
  grid-column: 4 / -1;
  grid-row: 1;
  align-self: center;
  min-width: 0;
  height: clamp(340px, 34vw, 490px);
  margin: 0;
  overflow: hidden;

  @media (max-width: 800px) {
    order: 2;
    grid-area: auto;
    justify-self: end;
    width: calc(100% - 18px);
    height: auto;
    margin: 36px 0;

    &::before {
      content: "";
      position: absolute;
      inset: 0 auto 0 0;
      z-index: 2;
      width: 20%;
      background: var(--mineral);
      pointer-events: none;
    }
  }

  @media (max-width: 480px) {
    width: calc(100% - 8px);

    &::before {
      width: 38%;
    }
  }
`

const MarketplaceAsset = styled.figure`
  width: 100%;
  height: 100%;
  margin: 0;
  aspect-ratio: auto;
  border: 0;
  background: transparent;

  picture {
    display: block;
    width: 100%;
    height: 100%;
    transform: rotate(-3deg) scale(1.16);
    transform-origin: 55% 52%;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 800px) {
    aspect-ratio: 3 / 1;

    picture {
      transform: translateX(10%) rotate(-2.5deg) scale(1.18);
      transform-origin: 58% 51%;
    }
  }

  @media (max-width: 480px) {
    aspect-ratio: 7 / 4;

    picture {
      transform: translateX(12%) rotate(-2deg) scale(1.08);
      transform-origin: 56% 50%;
    }
  }
`

export function MarketplaceFeature(): ReactElement {
  return (
    <MarketplaceMovement aria-labelledby="home-marketplace-title" data-home-movement="marketplace" data-visual-contract="homepage-marketplace">
      <HomeAnchorTarget id="marketplace" aria-hidden="true" />
      <MarketplaceGrid>
        <MarketplaceCopy>
          <HomeEyebrow>Agent Asset Marketplace · superpowers-plus</HomeEyebrow>
          <HomeSectionTitle id="home-marketplace-title">A strong system, changed by using it.</HomeSectionTitle>
          <HomeBody>I use obra/superpowers as a strong base system. superpowers-plus is my plugin around the way I actually work; Handoff Gates makes one boundary explicit: work does not move on because its producer says it is done. The next worker has to be able to continue without improvising.</HomeBody>
          <HomeRouteActions>
            <HomeRouteLink to="/writing/use-superpowers">Read the story →</HomeRouteLink>
            <HomeNextAnchor href="#wild-bunch">I tried to break my own event-sourcing claim ↓</HomeNextAnchor>
          </HomeRouteActions>
        </MarketplaceCopy>
        <MarketplaceVisual>
          <MarketplaceAsset>
            <picture>
              <source media="(max-width: 480px)" srcSet={homepageAssetPath('marketplace-superpowers-plus-narrow.svg')} />
              <source media="(max-width: 900px)" srcSet={homepageAssetPath('marketplace-superpowers-plus-intermediate.svg')} />
              <img src={homepageAssetPath('marketplace-superpowers-plus-wide.svg')} alt="A calm modular route system becomes stronger where one close-tolerance Superpowers Plus intervention lets the route continue across the composition." width="1600" height="900" />
            </picture>
          </MarketplaceAsset>
        </MarketplaceVisual>
      </MarketplaceGrid>
    </MarketplaceMovement>
  )
}
