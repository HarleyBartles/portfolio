import type { CSSProperties } from 'react'
import styled from 'styled-components'
import { IndexTraversal } from './IndexTraversal'
import { specialistsMedia } from './specialistsResponsive'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const Carrier = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
`

const CarrierArt = styled.img`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: rotate(-5deg);
  transform-origin: center;
`

const IndexLockup = styled.div`
  position: absolute;
  z-index: 12;
  top: 78px;
  right: 42px;
  width: 17.83rem;
  color: var(--specialists-index-ink);
  font-family: "Courier New", monospace;
  text-align: right;
  transform: rotate(-1deg);

  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 521.7171 / 103.332;
  }

  span {
    display: block;
    width: 100%;
    margin-top: 7px;
    color: var(--specialists-index-ink);
    font-size: 1rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: .01em;
    text-align: center;
    white-space: nowrap;
  }

  @media ${specialistsMedia.atMostMid} {
    top: 60px;
    right: 30px;
    width: 12.88rem;

    span {
      font-size: .72rem;
    }
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 72px;
    right: max(48px, calc(466px - 100vw));
    width: 11.89rem;

    span {
      font-size: .67rem;
    }
  }

  @media ${specialistsMedia.atMostNarrow} {
    top: 68px;
    right: max(42px, calc(388px - 100vw));
    width: 10.57rem;

    span {
      font-size: .59rem;
    }
  }
`

const PatchFollowPlacement = styled.div`
  position: absolute;
  z-index: 10;
  top: 34%;
  right: -1%;
  width: 100px;
  transform: rotate(7deg);
  transform-origin: 50% 100%;

  @media ${specialistsMedia.atMostMid} {
    width: 94px;
  }

  @media ${specialistsMedia.atMostCompact} {
    top: calc(33% - 19%);
    right: auto;
    left: 26%;
    width: 82px;
  }

  @media ${specialistsMedia.atMostNarrow} {
    left: 29%;
  }
`

const IndexHighStepPlacement = styled.div`
  position: absolute;
  z-index: 10;
  display: none;
  transform: rotate(7deg);
  transform-origin: 50% 100%;

  @media ${specialistsMedia.atMostCompact} {
    display: block;
    top: -19%;
    left: 73%;
    width: 74px;
  }

  @media ${specialistsMedia.atMostNarrow} {
    top: calc(-19% - 10px);
    left: 64%;
  }
`

type IndexBlueCarrierProps = {
  style?: CSSProperties
}

export const IndexBlueCarrier = ({ style }: IndexBlueCarrierProps) => {
  return (
    <Carrier data-index-substrate="blue-carrier" style={style}>
      <CarrierArt
        src={usualSpecialistsAssetPath('index-blue-carrier.webp')}
        width="1240"
        height="827"
        loading="lazy"
        decoding="async"
        alt="A blue working sheet crossing the main route diagram."
      />
      <PatchFollowPlacement>
        <IndexTraversal traversal="patch-follow" substrate="blue-carrier" src={usualSpecialistsAssetPath('patch-follow.webp')} />
      </PatchFollowPlacement>
      <IndexHighStepPlacement>
        <IndexTraversal traversal="index-high-step" substrate="blue-carrier" src={usualSpecialistsAssetPath('index-high-step.webp')} />
      </IndexHighStepPlacement>
      <IndexLockup data-index-lockup>
        <img src={usualSpecialistsAssetPath('index-wordmark.svg')} loading="lazy" decoding="async" alt="" aria-hidden="true" />
        <span>PROVENANCE | TRACE THE ROUTES</span>
      </IndexLockup>
    </Carrier>
  )
}
