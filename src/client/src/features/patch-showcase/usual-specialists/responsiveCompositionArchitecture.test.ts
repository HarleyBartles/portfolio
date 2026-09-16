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
})
