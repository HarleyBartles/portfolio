import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { PatchSeriesLockup, UsualSpecialistsWordmark, patchBrandAssetPath } from './PatchBrand'

describe('Patch brand', () => {
  test('resolves canonical brand assets under the active base path', () => {
    expect(patchBrandAssetPath('adventures-of-patch-cliff-drop.svg', '/portfolio/')).toBe('/portfolio/brand/adventures-of-patch/adventures-of-patch-cliff-drop.svg')
    expect(patchBrandAssetPath('the-usual-specialists-wordmark.svg', '/portfolio/')).toBe('/portfolio/brand/adventures-of-patch/the-usual-specialists-wordmark.svg')
  })

  test('renders accessible series and story wordmarks from canonical assets', () => {
    render(<><PatchSeriesLockup /><UsualSpecialistsWordmark /></>)

    expect(screen.getByRole('img', { name: 'Adventures of PATCH' }).querySelector('use')).toHaveAttribute('href', '/brand/adventures-of-patch/adventures-of-patch-cliff-drop.svg#adventures-of-patch-cliff-drop')
    expect(screen.getByRole('img', { name: 'The Usual Specialists' }).querySelector('use')).toHaveAttribute('href', '/brand/adventures-of-patch/the-usual-specialists-wordmark.svg#the-usual-specialists-wordmark')
  })
})
