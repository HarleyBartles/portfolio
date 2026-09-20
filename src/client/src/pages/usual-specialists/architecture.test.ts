import { describe, expect, test } from 'vitest'

const legacyOuterPageModules = import.meta.glob('../../features/patch-showcase/UsualSpecialistsPage.{ts,tsx}')
const legacySliceModules = import.meta.glob('../../features/patch-showcase/usual-specialists/**/*.{ts,tsx}')
const hiddenStyledComponentModules = import.meta.glob('./**/*.styles.ts')

describe('Usual Specialists page-slice architecture', () => {
  test('keeps the route-owned slice out of the legacy patch-showcase feature tree', () => {
    expect(Object.keys(legacyOuterPageModules)).toEqual([])
    expect(Object.keys(legacySliceModules)).toEqual([])
  })

  test('does not hide styled React components in styles modules', () => {
    expect(Object.keys(hiddenStyledComponentModules)).toEqual([])
  })
})
