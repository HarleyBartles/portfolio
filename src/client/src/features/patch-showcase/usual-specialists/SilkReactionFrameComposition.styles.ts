import styled from 'styled-components'
import {
  SILK_COMMISSION_08_REVIEW_DERIVATIVE_HEIGHT,
  SILK_COMMISSION_08_REVIEW_DERIVATIVE_WIDTH,
  SILK_COMMISSION_08_REVIEW_VIEWPORT_INSETS,
} from './silkCommission08ReviewGeometry'

export const Composition = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  isolation: isolate;
`

export const FrameCanvas = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  aspect-ratio: ${SILK_COMMISSION_08_REVIEW_DERIVATIVE_WIDTH} / ${SILK_COMMISSION_08_REVIEW_DERIVATIVE_HEIGHT};
  transform: translateY(-50%);
`

export const ReactionViewport = styled.div`
  position: absolute;
  z-index: 1;
  overflow: hidden;
  left: ${SILK_COMMISSION_08_REVIEW_VIEWPORT_INSETS.left};
  top: ${SILK_COMMISSION_08_REVIEW_VIEWPORT_INSETS.top};
  width: ${SILK_COMMISSION_08_REVIEW_VIEWPORT_INSETS.width};
  height: ${SILK_COMMISSION_08_REVIEW_VIEWPORT_INSETS.height};
`

export const ReactionImage = styled.img`
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: center;
  transform: scale(1.42);
  transform-origin: 42% 32%;
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
