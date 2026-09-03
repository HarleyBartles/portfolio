import { expect, test } from 'vitest'
import { adventuresBrandAssetPath, homepageAssetPath } from './homepageAssets'

test('homepage media respects the active public base path', () => {
  expect(homepageAssetPath('wild-bunch-cache-crosshatch.webp', '/portfolio/')).toBe('/portfolio/media/homepage/wild-bunch-cache-crosshatch.webp')
  expect(adventuresBrandAssetPath('adventures-of-patch-cliff-drop.svg', '/portfolio/')).toBe('/portfolio/brand/adventures-of-patch/adventures-of-patch-cliff-drop.svg')
})
