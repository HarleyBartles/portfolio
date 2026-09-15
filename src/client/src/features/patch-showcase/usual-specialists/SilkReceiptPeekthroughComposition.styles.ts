import styled from 'styled-components'

const RECEIPT_REVIEW_WORLD_OVERSCAN = 32
const RECEIPT_REVIEW_SCALE_125_MEDIA = '(max-width: 389px)'
const RECEIPT_REVIEW_SCALE_16_MEDIA = '(min-width: 390px) and (max-width: 899px), (min-width: 1200px) and (max-width: 1499px), (min-width: 1920px)'
const RECEIPT_REVIEW_SCALE_25_MEDIA = '(min-width: 900px) and (max-width: 1199px), (min-width: 1500px) and (max-width: 1919px)'

export const Composition = styled.div`
  position: relative;
  overflow: visible;
  width: 100%;
  height: 100%;
  isolation: isolate;
`

export const FrameCanvas = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
  max-width: 100%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);

  @media ${RECEIPT_REVIEW_SCALE_125_MEDIA} {
    transform: translate(-50%, -50%) scale(1.25);
  }

  @media ${RECEIPT_REVIEW_SCALE_16_MEDIA} {
    transform: translate(-50%, -50%) scale(1.6);
  }

  @media ${RECEIPT_REVIEW_SCALE_25_MEDIA} {
    transform: translate(-50%, -50%) scale(2.5);
  }
`

export const WorldViewport = styled.div`
  position: absolute;
  z-index: 1;
  inset: 15%;
  overflow: hidden;
  border-radius: 50%;
`

export const StandinWorld = styled.div`
  position: absolute;
  top: -${RECEIPT_REVIEW_WORLD_OVERSCAN}px;
  right: 0;
  left: 0;
  height: calc(100% + ${RECEIPT_REVIEW_WORLD_OVERSCAN * 2}px);
  background-image: repeating-linear-gradient(
    to bottom,
    #26343b 0 12px,
    #26343b 12px 24px,
    #d6b56f 24px 36px,
    #d6b56f 36px 48px
  );
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
  }
`

export const FrameImage = styled.img`
  position: absolute;
  z-index: 2;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
`
