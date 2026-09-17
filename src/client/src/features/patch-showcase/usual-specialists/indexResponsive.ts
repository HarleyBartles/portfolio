export const INDEX_CONTAINER_NAME = 'index'

export const indexQueries = {
  narrow: '(max-width: 389px)',
  compact: '(min-width: 390px) and (max-width: 719px)',
  throughCompact: '(max-width: 719px)',
  throughMid: '(max-width: 899px)',
  belowWide: '(max-width: 1399px)',
  wide: '(min-width: 1400px)',
  expanded: '(min-width: 1600px)',
  ultrawide: '(min-width: 1920px)',
} as const
