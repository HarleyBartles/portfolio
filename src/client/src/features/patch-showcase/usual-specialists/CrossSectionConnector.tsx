import type { CSSProperties, ReactElement } from 'react'
import styled, { css } from 'styled-components'
import { CHAPTER_CROSSING_HEIGHT } from './chapterCrossingGeometry'
import {
  SPECIALISTS_CROSSING_LOCKUP_SIZE,
  SpecialistsCrossingLockup,
} from './SpecialistsCrossingLockup'
import { specialistsMedia } from './specialistsResponsive'

export type CrossSectionConnectorId = 'opening-index' | 'index-silk'

type CrossSectionConnectorProps = {
  crossing: CrossSectionConnectorId
  style?: CSSProperties
}

type AuthoredX =
  | { kind: 'absolute-px'; value: number }
  | { kind: 'percent-plus-px'; percent: number; offsetPx: number }

type LockPlacement = {
  x: AuthoredX
  yOffsetPx: number
  rotationDeg: number
  scale: number
}

type IndexSilkPlacementState = 'narrow' | 'compactLandscape' | 'mid' | 'default' | 'wide'

const INDEX_SILK_LOCK_PLACEMENTS = {
  narrow: {
    x: { kind: 'percent-plus-px', percent: 4.516, offsetPx: 11.65 },
    yOffsetPx: 2.44,
    rotationDeg: 3,
    scale: 0.7,
  },
  compactLandscape: {
    x: { kind: 'percent-plus-px', percent: 4.7144, offsetPx: 9 },
    yOffsetPx: 2.43,
    rotationDeg: 6,
    scale: 0.7,
  },
  mid: {
    x: { kind: 'percent-plus-px', percent: 20.9075, offsetPx: 11.72 },
    yOffsetPx: 2.38,
    rotationDeg: 1,
    scale: 0.85,
  },
  default: {
    x: { kind: 'percent-plus-px', percent: 22.1358, offsetPx: 11.77 },
    yOffsetPx: 2.35,
    rotationDeg: -1,
    scale: 0.85,
  },
  wide: {
    x: { kind: 'absolute-px', value: 329 },
    yOffsetPx: 0,
    rotationDeg: 2.5,
    scale: 0.9,
  },
} as const satisfies Record<IndexSilkPlacementState, LockPlacement>

const authoredXCss = (x: AuthoredX): string => (
  x.kind === 'absolute-px'
    ? `${x.value}px`
    : `calc(${x.percent}% + ${x.offsetPx}px)`
)

const placementTransform = (placement: LockPlacement): string => (
  `translate(-50%, -50%) rotate(${placement.rotationDeg}deg) scale(${placement.scale})`
)

const indexSilkPlacementCss = (placement: LockPlacement) => css`
  top: calc(100% + ${placement.yOffsetPx}px);
  left: ${authoredXCss(placement.x)};
  transform: ${placementTransform(placement)};
`

const openingIndexPlacement = css`
  top: calc(100% + 2.1px);
  left: calc(11% + 6px);
  transform: translate(-50%, -50%) scale(0.75) rotate(8deg);

  @media ${specialistsMedia.atLeastWide} {
    left: 170px;
    transform: translate(-50%, -50%) scale(0.9) rotate(4deg);
  }

  @media ${specialistsMedia.atMostCompact} {
    left: calc(8% + 5px);
    transform: translate(-50%, -50%) scale(0.7) rotate(10deg);
  }
`

const indexSilkPlacement = css`
  ${indexSilkPlacementCss(INDEX_SILK_LOCK_PLACEMENTS.default)}

  @media ${specialistsMedia.atLeastWide} {
    ${indexSilkPlacementCss(INDEX_SILK_LOCK_PLACEMENTS.wide)}
  }

  @media ${specialistsMedia.atMostMid} {
    ${indexSilkPlacementCss(INDEX_SILK_LOCK_PLACEMENTS.mid)}
  }

  @media ${specialistsMedia.compactLandscape} {
    ${indexSilkPlacementCss(INDEX_SILK_LOCK_PLACEMENTS.compactLandscape)}
  }

  @media ${specialistsMedia.atMostNarrow} {
    ${indexSilkPlacementCss(INDEX_SILK_LOCK_PLACEMENTS.narrow)}
  }
`

const ConnectorSurface = styled.div`
  position: relative;
  height: ${CHAPTER_CROSSING_HEIGHT}px;
  background: var(--color-interior-canvas);
  pointer-events: none;
`

const ConnectorRule = styled.hr`
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  border: 0;
  border-top: 1px solid rgb(32 35 31 / 30%);
`

const LockPlacement = styled.span<{ $crossing: CrossSectionConnectorId }>`
  position: absolute;
  z-index: 60;
  width: ${SPECIALISTS_CROSSING_LOCKUP_SIZE.width}px;
  height: ${SPECIALISTS_CROSSING_LOCKUP_SIZE.height}px;
  pointer-events: none;

  ${({ $crossing }) => ($crossing === 'opening-index' ? openingIndexPlacement : indexSilkPlacement)}
`

export const CrossSectionConnector = ({ crossing, style }: CrossSectionConnectorProps): ReactElement => (
  <ConnectorSurface data-specialists-chapter-crossing={crossing} style={style}>
    <ConnectorRule data-specialists-crossing-rule />
    <LockPlacement $crossing={crossing} data-specialists-crossing-lock-placement={crossing}>
      <SpecialistsCrossingLockup />
    </LockPlacement>
  </ConnectorSurface>
)
