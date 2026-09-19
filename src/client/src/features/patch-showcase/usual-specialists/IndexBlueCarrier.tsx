import type { CSSProperties } from 'react'
import styled from 'styled-components'
import { INDEX_CONTAINER_NAME, indexQueries } from './indexResponsive'
import { IndexTraversal } from './IndexTraversal'
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
  top: 68px;
  right: max(42px, calc(388px - 100cqi));
  width: 10.57rem;
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
    font-size: .59rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: .01em;
    text-align: center;
    white-space: nowrap;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.compact} {
    top: 72px;
    right: max(48px, calc(466px - 100cqi));
    width: 11.89rem;

    span {
      font-size: .67rem;
    }
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.upperWide} {
    top: 60px;
    right: 30px;
    width: 12.88rem;

    span {
      font-size: .72rem;
    }
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.medium} {
    top: 78px;
    right: 42px;
    width: 17.83rem;

    span {
      font-size: 1rem;
    }
  }
`

const PatchFollowPlacement = styled.div`
  position: absolute;
  z-index: 10;
  top: 18%;
  left: 24%;
  width: 82px;
  transform: rotate(7deg);
  transform-origin: 50% 100%;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.compact} {
    left: 22%;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.arrivalCross} {
    top: 18%;
    right: -10%;
    left: auto;
    width: 100px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.upperWide} {
    top: 18%;
    right: auto;
    left: 24%;
    width: 94px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.upperWide} {
    width: 100px;
  }

  @container ${INDEX_CONTAINER_NAME} (min-width: 1620px) {
    top: 32%;
    right: -1%;
    left: auto;
    width: 100px;
  }
`

const IndexHighStepPlacement = styled.div`
  position: absolute;
  z-index: 10;
  display: block;
  top: -22.5%;
  left: 64%;
  width: 74px;
  transform: rotate(7deg);
  transform-origin: 50% 100%;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.compact} {
    top: -16.85%;
    left: 66.3%;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.walkReady} {
    display: none;
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
        <IndexTraversal character="patch" moment="following-index" traversal="patch-follow" substrate="blue-carrier" src={usualSpecialistsAssetPath('patch-follow.webp')} />
      </PatchFollowPlacement>
      <IndexHighStepPlacement>
        <IndexTraversal character="index" moment="leading-route" traversal="index-high-step" substrate="blue-carrier" src={usualSpecialistsAssetPath('index-high-step.webp')} />
      </IndexHighStepPlacement>
      <IndexLockup data-index-lockup>
        <img src={usualSpecialistsAssetPath('index-wordmark.svg')} loading="lazy" decoding="async" alt="" aria-hidden="true" />
        <span>PROVENANCE | TRACE THE ROUTES</span>
      </IndexLockup>
    </Carrier>
  )
}
