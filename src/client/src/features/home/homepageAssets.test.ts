import { expect, test } from 'vitest'
import { homepageAssetPath } from './homepageAssets'

test('homepage media respects the active public base path', () => {
  expect(homepageAssetPath('wild-bunch-cache-crosshatch.webp', '/portfolio/')).toBe('/portfolio/media/homepage/wild-bunch-cache-crosshatch.webp')
})
