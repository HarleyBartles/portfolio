import styled from 'styled-components'
import { IndexTraversal } from './IndexTraversal'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const Carrier = styled.div`
  aspect-ratio: 3 / 2;
  transform: rotate(-7deg);
  transform-origin: center;
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

  @media (max-width: 900px) {
    top: 60px;
    right: 30px;
    width: 12.88rem;

    span {
      font-size: .72rem;
    }
  }

  @media (max-width: 720px) {
    top: 72px;
    right: max(48px, calc(466px - 100vw));
    width: 11.89rem;

    span {
      font-size: .67rem;
    }
  }

  @media (max-width: 390px) {
    top: 68px;
    right: max(42px, calc(388px - 100vw));
    width: 10.57rem;

    span {
      font-size: .59rem;
    }
  }
`

const PatchFollow = styled(IndexTraversal)`
  top: 34%;
  right: -1%;
  width: 100px;
  transform: rotate(7deg);
  transform-origin: 50% 100%;

  @media (max-width: 900px) {
    width: 94px;
  }

  @media (max-width: 720px) {
    top: calc(33% - var(--index-mobile-traversal-lift));
    right: auto;
    left: 26%;
    width: 82px;
  }

  @media (max-width: 390px) {
    left: 29%;
  }
`

const IndexHighStep = styled(IndexTraversal)`
  display: none;
  transform: rotate(7deg);
  transform-origin: 50% 100%;

  @media (max-width: 720px) {
    display: block;
    top: calc(0px - var(--index-mobile-traversal-lift));
    left: 73%;
    width: 74px;
  }

  @media (max-width: 390px) {
    top: calc(0px - var(--index-mobile-traversal-lift) - 10px);
    left: 64%;
  }
`

export function IndexBlueCarrier({ className }: { className?: string }) {
  return (
    <Carrier className={className} data-index-substrate="blue-carrier">
      <CarrierArt
        src={usualSpecialistsAssetPath('index-blue-carrier.webp')}
        width="1240"
        height="827"
        loading="lazy"
        decoding="async"
        alt="A blue working sheet crossing the main route diagram."
      />
      <PatchFollow data-index-traversal="patch-follow" data-substrate="blue-carrier" src={usualSpecialistsAssetPath('patch-follow.webp')} />
      <IndexHighStep data-index-traversal="index-high-step" data-substrate="blue-carrier" src={usualSpecialistsAssetPath('index-high-step.webp')} />
      <IndexLockup data-index-lockup>
        <img src={usualSpecialistsAssetPath('index-wordmark.svg')} loading="lazy" decoding="async" alt="" aria-hidden="true" />
        <span>PROVENANCE | TRACE THE ROUTES</span>
      </IndexLockup>
    </Carrier>
  )
}
