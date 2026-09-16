export const SILK_CONTAINER_NAME = 'silk'
export const SILK_NARROW_BREACH_APERTURE_HEIGHT_VW = 205.98937300743887

export const silkQueries = {
  narrow: '(max-width: 389px)',
  compact: '(min-width: 390px) and (max-width: 719px)',
  throughCompact: '(max-width: 719px)',
  throughMid: '(max-width: 899px)',
  mirrored: '(min-width: 720px) and (max-width: 1199px)',
  mirroredLowerNarrow: '(min-width: 720px) and (max-width: 899px)',
  mirroredLowerReconnect: '(min-width: 900px) and (max-width: 1199px)',
  recomposed: '(min-width: 1200px)',
  recomposedUpper: '(min-width: 1200px) and (max-width: 1399px)',
  recomposedLower: '(min-width: 1200px) and (max-width: 1499px)',
  lowerStage: '(min-width: 720px) and (max-width: 1499px)',
  storyAbove: '(min-width: 1200px) and (max-width: 1799px)',
  stackedLower: '(min-width: 1200px) and (max-width: 1919px)',
  wide: '(min-width: 1400px)',
} as const
