// Authored breakpoints are inclusive lower bounds. Each preceding band ends
// exactly one CSS pixel before the next named breakpoint begins.
export const SPECIALISTS_WIDTHS = {
  minimum: 320,
  compactMin: 390,
  midMin: 720,
  defaultMin: 900,
  wideMin: 1400,
  expandedMin: 1600,
  ultrawideMin: 1920,
  ceiling: 2560,
} as const

export const specialistsMedia = {
  atMostNarrow: `(max-width: ${SPECIALISTS_WIDTHS.compactMin - 1}px)`,
  compactLandscape: `(min-width: ${SPECIALISTS_WIDTHS.compactMin}px) and (max-width: ${SPECIALISTS_WIDTHS.midMin - 1}px)`,
  atMostCompact: `(max-width: ${SPECIALISTS_WIDTHS.midMin - 1}px)`,
  atMostMid: `(max-width: ${SPECIALISTS_WIDTHS.defaultMin - 1}px)`,
  belowWide: `(max-width: ${SPECIALISTS_WIDTHS.wideMin - 1}px)`,
  atLeastWide: `(min-width: ${SPECIALISTS_WIDTHS.wideMin}px)`,
  wideBand: `(min-width: ${SPECIALISTS_WIDTHS.wideMin}px) and (max-width: ${SPECIALISTS_WIDTHS.expandedMin - 1}px)`,
  atLeastExpanded: `(min-width: ${SPECIALISTS_WIDTHS.expandedMin}px)`,
  atLeastUltrawide: `(min-width: ${SPECIALISTS_WIDTHS.ultrawideMin}px)`,
  beyondCeiling: `(min-width: ${SPECIALISTS_WIDTHS.ceiling + 1}px)`,
} as const
