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
})
