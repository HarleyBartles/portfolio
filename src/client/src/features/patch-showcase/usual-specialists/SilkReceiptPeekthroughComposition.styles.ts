import styled from 'styled-components'

const RECEIPT_REVIEW_WORLD_OVERSCAN = 32
const RECEIPT_REVIEW_SCALE_125_MEDIA = '(max-width: 389px)'
const RECEIPT_REVIEW_SCALE_16_MEDIA = '(min-width: 390px) and (max-width: 899px), (min-width: 1200px) and (max-width: 1499px), (min-width: 1920px)'
const RECEIPT_REVIEW_SCALE_25_MEDIA = '(min-width: 900px) and (max-width: 1199px), (min-width: 1500px) and (max-width: 1919px)'
const RECEIPT_REVIEW_MIRROR_MEDIA = '(min-width: 900px) and (max-width: 1499px)'
const RECEIPT_PEEK_CUTOUT_SCALE_07_MEDIA = '(max-width: 1199px), (min-width: 1500px) and (max-width: 1919px)'
const RECEIPT_PEEK_CUTOUT_MIRROR_OFFSET_62_MEDIA = '(min-width: 1200px) and (max-width: 1499px)'

export const Composition = styled.div`
  position: relative;
  overflow: visible;
  width: 100%;
  height: 100%;
`

export const FrameCanvas = styled.div`
  position: absolute;
  z-index: 6;
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

export const PeekCutoutLayer = styled.div`
  position: absolute;
  z-index: 21;
  top: 50%;
  left: 50%;
  height: 100%;
  max-width: 100%;
  aspect-ratio: 1;
  pointer-events: none;
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

export const ReceiptPlane = styled.div`
  position: absolute;
  z-index: 1;
  inset: 0;
  transform: rotate(3deg);
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

export const PeekCutoutImage = styled.img`
  position: absolute;
  top: -35.6%;
  left: -52%;
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;

  @media ${RECEIPT_PEEK_CUTOUT_SCALE_07_MEDIA} {
    scale: .7;
  }

  @media ${RECEIPT_REVIEW_MIRROR_MEDIA} {
    right: -52%;
    left: auto;
    transform: scaleX(-1);
  }

  @media ${RECEIPT_PEEK_CUTOUT_MIRROR_OFFSET_62_MEDIA} {
    right: -62%;
  }
`
