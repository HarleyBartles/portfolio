import styled from 'styled-components'
import {
  SILK_COMMISSION_08_REVIEW_DERIVATIVE_HEIGHT,
  SILK_COMMISSION_08_REVIEW_DERIVATIVE_WIDTH,
  SILK_COMMISSION_08_REVIEW_FRAME_HEIGHT,
  SILK_COMMISSION_08_REVIEW_FRAME_WIDTH,
  SILK_COMMISSION_08_REVIEW_VIEWPORT,
} from './silkCommission08ReviewGeometry'

const reactionViewportWidth = SILK_COMMISSION_08_REVIEW_VIEWPORT.right - SILK_COMMISSION_08_REVIEW_VIEWPORT.left + 1
const reactionViewportHeight = SILK_COMMISSION_08_REVIEW_VIEWPORT.bottom - SILK_COMMISSION_08_REVIEW_VIEWPORT.top + 1
const frameCanvasWidthPercent = (SILK_COMMISSION_08_REVIEW_FRAME_WIDTH / reactionViewportWidth) * 100
const frameCanvasLeftPercent = -(SILK_COMMISSION_08_REVIEW_VIEWPORT.left / reactionViewportWidth) * 100
const frameCanvasHeightToViewport = (
  (SILK_COMMISSION_08_REVIEW_FRAME_WIDTH / reactionViewportWidth)
  * (SILK_COMMISSION_08_REVIEW_DERIVATIVE_HEIGHT / SILK_COMMISSION_08_REVIEW_DERIVATIVE_WIDTH)
  * (reactionViewportWidth / reactionViewportHeight)
)
const frameCanvasTopPercent = -(
  SILK_COMMISSION_08_REVIEW_VIEWPORT.top
  / SILK_COMMISSION_08_REVIEW_FRAME_HEIGHT
) * frameCanvasHeightToViewport * 100

export const Composition = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: ${reactionViewportWidth} / ${reactionViewportHeight};
  isolation: isolate;
`

export const FrameCanvas = styled.div`
  position: absolute;
  z-index: 2;
  top: ${frameCanvasTopPercent}%;
  left: ${frameCanvasLeftPercent}%;
  width: ${frameCanvasWidthPercent}%;
  aspect-ratio: ${SILK_COMMISSION_08_REVIEW_DERIVATIVE_WIDTH} / ${SILK_COMMISSION_08_REVIEW_DERIVATIVE_HEIGHT};
  pointer-events: none;
`

export const ReactionViewport = styled.div`
  position: absolute;
  z-index: 1;
  overflow: hidden;
  inset: 0;
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
