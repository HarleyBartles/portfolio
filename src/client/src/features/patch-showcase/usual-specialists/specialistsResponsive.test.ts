import { describe, expect, test } from 'vitest'
import { SPECIALISTS_WIDTHS, specialistsMedia } from './specialistsResponsive'

describe('Specialists responsive contract', () => {
  test('names the authored 320-2560 domain and its page-local edges', () => {
    expect(SPECIALISTS_WIDTHS).toEqual({
      minimum: 320,
      compactMin: 390,
      midMin: 720,
      defaultMin: 900,
      wideMin: 1400,
      expandedMin: 1600,
      ultrawideMin: 1920,
      ceiling: 2560,
    })
    expect(specialistsMedia.atMostNarrow).toBe('(max-width: 389px)')
    expect(specialistsMedia.compactLandscape).toBe('(min-width: 390px) and (max-width: 719px)')
    expect(specialistsMedia.atMostCompact).toBe('(max-width: 719px)')
    expect(specialistsMedia.atMostMid).toBe('(max-width: 899px)')
    expect(specialistsMedia.atLeastWide).toBe('(min-width: 1400px)')
    expect(specialistsMedia.wideBand).toBe('(min-width: 1400px) and (max-width: 1599px)')
    expect(specialistsMedia.atLeastExpanded).toBe('(min-width: 1600px)')
    expect(specialistsMedia.atLeastUltrawide).toBe('(min-width: 1920px)')
    expect(specialistsMedia.beyondCeiling).toBe('(min-width: 2561px)')
  })
})
