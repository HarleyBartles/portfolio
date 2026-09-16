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

  test.each([
    './SilkChapter.styles.ts',
    './SilkTraversalComposition.tsx',
    './SilkApertureComposition.tsx',
    './SilkApertureComposition.styles.ts',
    './SilkReactionFrameComposition.tsx',
    './SilkReactionFrameComposition.styles.ts',
    './SilkReceiptPeekthroughComposition.tsx',
    './SilkReceiptPeekthroughComposition.styles.ts',
    './SilkCommission09Composition.tsx',
    './SilkCommission09Composition.styles.ts',
  ])('keeps Silk composition owner %s independent of the route-wide responsive taxonomy', (filename) => {
    const source = readSource(filename)

    expect(source).not.toContain("from './specialistsResponsive'")
  })

  test.each([
    './silkCommission05Geometry',
    './silkCommission07ReviewGeometry',
    './silkCommission08ReviewGeometry',
  ])('keeps child-internal geometry %s out of the Silk chapter parent', (geometryModule) => {
    const parentStyles = readSource('./SilkChapter.styles.ts')

    expect(parentStyles).not.toContain(`from '${geometryModule}'`)
  })

  test('keeps Silk traversal stage placement parent-owned without hidden geometry variables', () => {
    const parentStyles = readSource('./SilkChapter.styles.ts')
    const traversalSource = readSource('./SilkTraversalComposition.tsx')
    const compositionCss = traversalSource.match(/const Composition = styled\.div`([\s\S]*?)`/)?.[1] ?? ''

    expect(parentStyles).not.toContain('--silk-compact-rope-join-top')
    expect(parentStyles).not.toContain('--silk-compact-traversal-top')
    expect(traversalSource).not.toContain('--silk-compact-rope-join-top')
    expect(traversalSource).not.toContain('--silk-compact-traversal-top')
    expect(compositionCss).not.toContain('position: absolute;')
    expect(compositionCss).not.toContain('inset: 0;')
  })

  test('keeps Commission 08 source-frame geometry inside the reaction composition', () => {
    const parentStyles = readSource('./SilkChapter.styles.ts')

    expect(parentStyles).not.toContain("from './silkCommission08ReviewGeometry'")
    expect(parentStyles).not.toContain('SILK_COMMISSION_08_REVIEW_')
  })
})
