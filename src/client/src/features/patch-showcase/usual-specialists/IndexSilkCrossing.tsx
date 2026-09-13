import type { CSSProperties, ReactElement } from 'react'
import { CrossingRule, CrossingSurface } from './ChapterCrossingSurface.styles'
import {
  IndexSilkLockPlacement,
  type LockPlacement,
  type LockPlacementState,
} from './IndexSilkCrossing.styles'
import { IndexSilkCrossingLock } from './IndexSilkCrossingLock'

type IndexSilkCrossingProps = {
  style?: CSSProperties
}

const LOCK_PLACEMENTS = {
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
} as const satisfies Record<LockPlacementState, LockPlacement>

export const IndexSilkCrossing = ({ style }: IndexSilkCrossingProps): ReactElement => (
  <CrossingSurface data-specialists-chapter-crossing="index-silk" style={style}>
    <CrossingRule data-specialists-crossing-rule />
    <IndexSilkLockPlacement
      $defaultPlacement={LOCK_PLACEMENTS.default}
      $widePlacement={LOCK_PLACEMENTS.wide}
      $midPlacement={LOCK_PLACEMENTS.mid}
      $compactPlacement={LOCK_PLACEMENTS.compactLandscape}
      $narrowPlacement={LOCK_PLACEMENTS.narrow}
      data-index-silk-lock-placement
    >
      <IndexSilkCrossingLock />
    </IndexSilkLockPlacement>
  </CrossingSurface>
)
