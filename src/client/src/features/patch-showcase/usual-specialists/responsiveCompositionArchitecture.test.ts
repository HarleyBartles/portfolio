import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

const readSource = (filename: string): string => readFileSync(new URL(filename, import.meta.url), 'utf8')

describe('Specialists responsive composition architecture', () => {
  test('keeps the page canvas contract to the authored ceiling without owning chapter breakpoints', () => {
    const pageStyles = readSource('./UsualSpecialistsPage.styles.ts')

    expect(pageStyles).not.toContain("from './specialistsResponsive'")
    expect(pageStyles).not.toContain('SPECIALISTS_WIDTHS')
    expect(pageStyles).not.toContain('specialistsMedia')
    expect(pageStyles).toContain('width: min(100%, 2560px);')
  })

  test.each([
    './UsualSpecialistsOpening.styles.ts',
    './chapterCrossingGeometry.ts',
    './CrossSectionConnector.tsx',
  ])('keeps %s independent of the route-wide responsive taxonomy', (filename) => {
    const source = readSource(filename)

    expect(source).not.toContain("from './specialistsResponsive'")
  })

  test.each([
    './IndexChapter.styles.ts',
    './IndexBlueCarrier.tsx',
    './IndexAssentNote.tsx',
    './IndexCommissionComposition.styles.ts',
    './IndexDeskDocument.tsx',
    './IndexObservation.tsx',
  ])('keeps Index-owned source %s independent of the route-wide responsive taxonomy', (filename) => {
    const source = readSource(filename)

    expect(source).not.toContain("from './specialistsResponsive'")
  })
})
