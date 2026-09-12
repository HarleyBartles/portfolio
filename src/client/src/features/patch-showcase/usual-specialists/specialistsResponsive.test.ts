import { describe, expect, test } from 'vitest'
import { SPECIALISTS_WIDTHS, specialistsMedia } from './specialistsResponsive'

describe('Specialists responsive contract', () => {
  test('names the authored 320-2560 domain and its page-local edges', () => {
    expect(SPECIALISTS_WIDTHS).toEqual({
      minimum: 320,
      narrowMax: 390,
      compactMax: 720,
      midMax: 900,
      wideMin: 1400,
      expandedMin: 1600,
      ultrawideMin: 1920,
      ceiling: 2560,
    })
    expect(specialistsMedia.atLeastWide).toBe('(min-width: 1400px)')
    expect(specialistsMedia.atLeastExpanded).toBe('(min-width: 1600px)')
    expect(specialistsMedia.atLeastUltrawide).toBe('(min-width: 1920px)')
    expect(specialistsMedia.beyondCeiling).toBe('(min-width: 2561px)')
  })
})
