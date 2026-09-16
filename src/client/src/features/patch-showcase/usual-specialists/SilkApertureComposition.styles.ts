import styled, { css } from 'styled-components'
import {
  SILK_COMMISSION_05_FRAME_HEIGHT,
  SILK_COMMISSION_05_FRAME_WIDTH,
  SILK_COMMISSION_05_PORTRAIT_FRAME_HEIGHT,
  SILK_COMMISSION_05_PORTRAIT_FRAME_WIDTH,
  SILK_COMMISSION_05_PORTRAIT_VIEWPORT_INSETS,
  SILK_COMMISSION_05_SCENE_OVERSCAN,
  SILK_COMMISSION_05_VIEWPORT_INSETS,
} from './silkCommission05Geometry'
import {
  SILK_COMMISSION_07_REVIEW_FRAME_HEIGHT,
  SILK_COMMISSION_07_REVIEW_FRAME_WIDTH,
  SILK_COMMISSION_07_REVIEW_PORTRAIT_FRAME_HEIGHT,
  SILK_COMMISSION_07_REVIEW_PORTRAIT_FRAME_WIDTH,
  SILK_COMMISSION_07_REVIEW_PORTRAIT_VIEWPORT_INSETS,
  SILK_COMMISSION_07_REVIEW_VIEWPORT_INSETS,
  SILK_COMMISSION_07_REVIEW_WORLD_OVERSCAN,
} from './silkCommission07ReviewGeometry'
import { SILK_CONTAINER_NAME, silkQueries } from './silkResponsive'

export type SilkApertureCompositionVariant = 'commission-05' | 'commission-07-review'

export const Composition = styled.div<{ $variant: SilkApertureCompositionVariant }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $variant }) => $variant === 'commission-05'
    ? `${SILK_COMMISSION_05_FRAME_WIDTH} / ${SILK_COMMISSION_05_FRAME_HEIGHT}`
    : `${SILK_COMMISSION_07_REVIEW_FRAME_WIDTH} / ${SILK_COMMISSION_07_REVIEW_FRAME_HEIGHT}`};
  isolation: isolate;

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughCompact} {
    overflow: clip;
  }

  ${({ $variant }) => $variant === 'commission-05' && css`
    @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
      aspect-ratio: ${SILK_COMMISSION_05_PORTRAIT_FRAME_WIDTH} / ${SILK_COMMISSION_05_PORTRAIT_FRAME_HEIGHT};
    }
  `}

  ${({ $variant }) => $variant === 'commission-07-review' && css`
    @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
      aspect-ratio: ${SILK_COMMISSION_07_REVIEW_PORTRAIT_FRAME_WIDTH} / ${SILK_COMMISSION_07_REVIEW_PORTRAIT_FRAME_HEIGHT};
      transform: none;
    }
  `}
`

export const WorldViewport = styled.div<{ $variant: SilkApertureCompositionVariant }>`
  position: absolute;
  z-index: 1;
  overflow: hidden;

  ${({ $variant }) => $variant === 'commission-05' ? css`
    top: ${SILK_COMMISSION_05_VIEWPORT_INSETS.top};
    right: ${SILK_COMMISSION_05_VIEWPORT_INSETS.right};
    bottom: ${SILK_COMMISSION_05_VIEWPORT_INSETS.bottom};
    left: ${SILK_COMMISSION_05_VIEWPORT_INSETS.left};

    @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
      top: ${SILK_COMMISSION_05_PORTRAIT_VIEWPORT_INSETS.top};
      right: ${SILK_COMMISSION_05_PORTRAIT_VIEWPORT_INSETS.right};
      bottom: ${SILK_COMMISSION_05_PORTRAIT_VIEWPORT_INSETS.bottom};
      left: ${SILK_COMMISSION_05_PORTRAIT_VIEWPORT_INSETS.left};
    }
  ` : css`
    top: ${SILK_COMMISSION_07_REVIEW_VIEWPORT_INSETS.top};
    right: ${SILK_COMMISSION_07_REVIEW_VIEWPORT_INSETS.right};
    bottom: ${SILK_COMMISSION_07_REVIEW_VIEWPORT_INSETS.bottom};
    left: ${SILK_COMMISSION_07_REVIEW_VIEWPORT_INSETS.left};

    @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
      top: ${SILK_COMMISSION_07_REVIEW_PORTRAIT_VIEWPORT_INSETS.top};
      right: ${SILK_COMMISSION_07_REVIEW_PORTRAIT_VIEWPORT_INSETS.right};
      bottom: ${SILK_COMMISSION_07_REVIEW_PORTRAIT_VIEWPORT_INSETS.bottom};
      left: ${SILK_COMMISSION_07_REVIEW_PORTRAIT_VIEWPORT_INSETS.left};
    }
  `}
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

export const ReviewSceneImage = styled.img`
  position: absolute;
  inset: -${SILK_COMMISSION_07_REVIEW_WORLD_OVERSCAN}px;
  display: block;
  width: calc(100% + ${SILK_COMMISSION_07_REVIEW_WORLD_OVERSCAN * 2}px);
  height: calc(100% + ${SILK_COMMISSION_07_REVIEW_WORLD_OVERSCAN * 2}px);
  max-width: none;
  object-fit: cover;
  object-position: 50% 50%;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
  }
`

export const FrameImage = styled.img<{ $role: 'landscape' | 'portrait' | 'review-landscape' | 'review-portrait' }>`
  position: absolute;
  z-index: 5;
  inset: 0;
  display: ${({ $role }) => $role === 'portrait' || $role === 'review-portrait' ? 'none' : 'block'};
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    display: ${({ $role }) => $role === 'portrait' || $role === 'review-portrait' ? 'block' : 'none'};
  }
`

export const ViewportDiagnostic = styled.div`
  position: absolute;
  z-index: 2;
  inset: 0;
  border: 2px solid #00ffff;
  box-sizing: border-box;
  pointer-events: none;
`
