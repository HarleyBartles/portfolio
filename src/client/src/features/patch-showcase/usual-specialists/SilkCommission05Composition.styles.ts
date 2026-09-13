import styled from 'styled-components'
import {
  SILK_COMMISSION_05_FRAME_HEIGHT,
  SILK_COMMISSION_05_FRAME_WIDTH,
  SILK_COMMISSION_05_PORTRAIT_VIEWPORT_INSETS,
  SILK_COMMISSION_05_SCENE_OVERSCAN,
  SILK_COMMISSION_05_VIEWPORT_INSETS,
} from './silkCommission05Geometry'
import { specialistsMedia } from './specialistsResponsive'

export const Composition = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: ${SILK_COMMISSION_05_FRAME_WIDTH} / ${SILK_COMMISSION_05_FRAME_HEIGHT};

  @media ${specialistsMedia.atMostNarrow} {
    aspect-ratio: ${SILK_COMMISSION_05_FRAME_HEIGHT} / ${SILK_COMMISSION_05_FRAME_WIDTH};
  }
`

export const WorldViewport = styled.div`
  position: absolute;
  z-index: 1;
  top: ${SILK_COMMISSION_05_VIEWPORT_INSETS.top};
  right: ${SILK_COMMISSION_05_VIEWPORT_INSETS.right};
  bottom: ${SILK_COMMISSION_05_VIEWPORT_INSETS.bottom};
  left: ${SILK_COMMISSION_05_VIEWPORT_INSETS.left};
  overflow: hidden;

  @media ${specialistsMedia.atMostNarrow} {
    top: ${SILK_COMMISSION_05_PORTRAIT_VIEWPORT_INSETS.top};
    right: ${SILK_COMMISSION_05_PORTRAIT_VIEWPORT_INSETS.right};
    bottom: ${SILK_COMMISSION_05_PORTRAIT_VIEWPORT_INSETS.bottom};
    left: ${SILK_COMMISSION_05_PORTRAIT_VIEWPORT_INSETS.left};
  }
`

export const SceneImage = styled.img`
  position: absolute;
  inset: -${SILK_COMMISSION_05_SCENE_OVERSCAN}px;
  display: block;
  width: calc(100% + ${SILK_COMMISSION_05_SCENE_OVERSCAN * 2}px);
  height: calc(100% + ${SILK_COMMISSION_05_SCENE_OVERSCAN * 2}px);
  max-width: none;
  object-fit: cover;
  object-position: 50% 50%;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
  }
`

export const Frame = styled.img`
  position: absolute;
  z-index: 5;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;

  @media ${specialistsMedia.atMostNarrow} {
    inset: auto;
    top: 50%;
    left: 50%;
    width: ${(SILK_COMMISSION_05_FRAME_WIDTH / SILK_COMMISSION_05_FRAME_HEIGHT) * 100}%;
    height: auto;
    max-width: none;
    transform: translate(-50%, -50%) rotate(90deg);
    transform-origin: 50% 50%;
  }
`
