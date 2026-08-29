import { expect, test } from 'vitest'
import { siteRuntime } from './siteRuntime'

test('defines the browser-visible contact delivery endpoint once for every build mode', () => {
  expect(siteRuntime.contactFormEndpoint).toMatch(/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/)
})
