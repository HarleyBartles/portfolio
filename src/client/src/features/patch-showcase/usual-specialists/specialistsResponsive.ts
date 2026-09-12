export const SPECIALISTS_WIDTHS = {
  minimum: 320,
  narrowMax: 390,
  compactMax: 720,
  midMax: 900,
  wideMin: 1400,
  expandedMin: 1600,
  ultrawideMin: 1920,
  ceiling: 2560,
} as const

export const specialistsMedia = {
  atMostNarrow: `(max-width: ${SPECIALISTS_WIDTHS.narrowMax}px)`,
  atMostCompact: `(max-width: ${SPECIALISTS_WIDTHS.compactMax}px)`,
  atMostMid: `(max-width: ${SPECIALISTS_WIDTHS.midMax}px)`,
  belowWide: `(max-width: ${SPECIALISTS_WIDTHS.wideMin - 1}px)`,
  atLeastWide: `(min-width: ${SPECIALISTS_WIDTHS.wideMin}px)`,
  atLeastExpanded: `(min-width: ${SPECIALISTS_WIDTHS.expandedMin}px)`,
  atLeastUltrawide: `(min-width: ${SPECIALISTS_WIDTHS.ultrawideMin}px)`,
  beyondCeiling: `(min-width: ${SPECIALISTS_WIDTHS.ceiling + 1}px)`,
} as const
