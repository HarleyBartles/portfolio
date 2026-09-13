import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

const readSource = (filename: string): string => readFileSync(new URL(filename, import.meta.url), 'utf8')

describe('Specialists rope composition architecture', () => {
  test('keeps rope geometry out of page-level CSS custom properties', () => {
    const pageStyles = readSource('./UsualSpecialistsPage.styles.ts')

    expect(pageStyles).not.toContain('--specialists-rope-material-width')
    expect(pageStyles).not.toContain('--specialists-terminal-rope-width')
    expect(pageStyles).not.toContain('--specialists-terminal-rope-entry-offset')
  })

  test('does not reach through RopePiece with descendant image selectors', () => {
    for (const filename of [
      './UsualSpecialistsOpening.styles.ts',
      './IndexChapter.styles.ts',
      './SilkTraversalComposition.tsx',
    ]) {
      const source = readSource(filename)

      expect(source, filename).not.toMatch(/\n\s*img\s*\{/)
      expect(source, filename).not.toContain('img + img')
    }
  })

  test('shares crossing geometry through a neutral contract rather than a sibling style module', () => {
    for (const filename of [
      './UsualSpecialistsOpening.styles.ts',
      './IndexChapter.styles.ts',
      './SilkTraversalComposition.tsx',
    ]) {
      expect(readSource(filename), filename).not.toContain("from './ChapterCrossing.styles'")
    }
  })

  test('keeps crossing placement local to the connector without styling through its child', () => {
    const connector = readSource('./CrossSectionConnector.tsx')
    const silkTraversal = readSource('./SilkTraversalComposition.tsx')

    expect(silkTraversal).not.toContain('indexSilkRouteGeometry')
    expect(connector).not.toContain('indexSilkRouteGeometry')
    expect(connector).not.toMatch(/styled\(SpecialistsCrossingLockup\)/)
    expect(connector).not.toMatch(/\[data-specialists-crossing-lockup[^\]]*\]/)

    for (const filename of [
      './CrossSectionConnector.tsx',
      './IndexChapter.styles.ts',
      './SpecialistsCrossingLockup.tsx',
      './SilkTraversalComposition.tsx',
      './UsualSpecialistsOpening.styles.ts',
    ]) {
      expect(readSource(filename), filename).not.toContain("from './indexSilkRouteGeometry'")
    }

    expect(() => readSource('./indexSilkRouteGeometry.ts')).toThrow()
  })

  test('composes both crossings through one connector and one opaque lockup child', () => {
    const page = readSource('../UsualSpecialistsPage.tsx')

    expect(page.match(/<CrossSectionConnector\b/g)).toHaveLength(2)
    expect(page).not.toContain('<ChapterCrossing')
    expect(page).not.toContain('<IndexSilkCrossing')

    expect(() => readSource('./CrossSectionConnector.tsx')).not.toThrow()
    expect(() => readSource('./SpecialistsCrossingLockup.tsx')).not.toThrow()

    const connector = readSource('./CrossSectionConnector.tsx')
    const lockup = readSource('./SpecialistsCrossingLockup.tsx')

    expect(connector).toContain('<SpecialistsCrossingLockup />')
    expect(connector).not.toMatch(/styled\(SpecialistsCrossingLockup\)/)
    expect(connector).not.toMatch(/\[data-specialists-crossing-lockup[^\]]*\]/)
    expect(lockup).toContain('style?: CSSProperties')
    expect(lockup).not.toContain('className')

    for (const filename of [
      './ChapterCrossing.tsx',
      './ChapterCrossing.styles.ts',
      './ChapterCrossingSurface.styles.ts',
      './IndexSilkCrossing.tsx',
      './IndexSilkCrossing.styles.ts',
      './IndexSilkCrossingLock.tsx',
    ]) {
      expect(() => readSource(filename), filename).toThrow()
    }
  })
})
