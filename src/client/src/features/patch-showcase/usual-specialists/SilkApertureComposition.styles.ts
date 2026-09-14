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
  SILK_COMMISSION_07_REVIEW_VIEWPORT_INSETS,
  SILK_COMMISSION_07_REVIEW_WORLD_OVERSCAN,
} from './silkCommission07ReviewGeometry'
import { specialistsMedia } from './specialistsResponsive'

const SILK_MIRRORED_APERTURE_MEDIA = '(min-width: 720px) and (max-width: 1199px)'

export type SilkApertureCompositionVariant = 'commission-05' | 'commission-07-review'

export const Composition = styled.div<{ $variant: SilkApertureCompositionVariant }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $variant }) => $variant === 'commission-05'
    ? `${SILK_COMMISSION_05_FRAME_WIDTH} / ${SILK_COMMISSION_05_FRAME_HEIGHT}`
    : `${SILK_COMMISSION_07_REVIEW_FRAME_WIDTH} / ${SILK_COMMISSION_07_REVIEW_FRAME_HEIGHT}`};
  isolation: isolate;

  ${({ $variant }) => $variant === 'commission-05' && css`
    @media ${specialistsMedia.atMostCompact} {
      overflow: clip;
      width: 116%;
      margin-left: -8%;
    }

    @media ${SILK_MIRRORED_APERTURE_MEDIA} {
      overflow: visible;
      width: 100%;
      margin-left: 0;
    }

    @media ${specialistsMedia.atMostNarrow} {
      aspect-ratio: ${SILK_COMMISSION_05_PORTRAIT_FRAME_WIDTH} / ${SILK_COMMISSION_05_PORTRAIT_FRAME_HEIGHT};
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

    @media ${specialistsMedia.atMostNarrow} {
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

export const ReviewWorld = styled.div`
  position: absolute;
  inset: -${SILK_COMMISSION_07_REVIEW_WORLD_OVERSCAN}px;
  background: #7658a6;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
  }
`

export const FrameImage = styled.img<{ $role: 'landscape' | 'portrait' | 'review' }>`
  position: absolute;
  z-index: 5;
  inset: 0;
  display: ${({ $role }) => $role === 'portrait' ? 'none' : 'block'};
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;

  ${({ $role }) => $role !== 'review' && css`
    @media ${specialistsMedia.atMostNarrow} {
      display: ${$role === 'portrait' ? 'block' : 'none'};
    }
  `}
`

export const ViewportDiagnostic = styled.div`
  position: absolute;
  z-index: 2;
  inset: 0;
  border: 2px solid #00ffff;
  box-sizing: border-box;
  pointer-events: none;
`
