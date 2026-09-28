import { describe, expect, test } from 'vitest'
// @ts-expect-error The build artifact checker is plain ESM for direct Node execution.
import { checkRouteChunkIsolation, ROUTE_OWNED_MODULES } from './check-route-chunk-isolation.mjs'

function manifestFixture(): Record<string, { isEntry?: boolean; isDynamicEntry?: boolean; imports: string[] }> {
  return {
    'index.html': { isEntry: true, imports: [] as string[] },
    ...Object.fromEntries(ROUTE_OWNED_MODULES.map((source) => [source, {
      isDynamicEntry: true,
      imports: [],
    }])),
  }
}

describe('route-owned build chunks', () => {
  test('accepts expensive route modules outside the eager application graph', () => {
    expect(checkRouteChunkIsolation(manifestFixture())).toBe(ROUTE_OWNED_MODULES.length)
  })

  test('rejects a route module pulled into the eager application graph', () => {
    const manifest = manifestFixture()
    manifest['index.html'].imports.push(ROUTE_OWNED_MODULES[0])

    expect(() => checkRouteChunkIsolation(manifest)).toThrow(/outside the initial bundle/)
  })

  test('rejects a route module that is no longer an isolated dynamic entry', () => {
    const manifest = manifestFixture()
    manifest[ROUTE_OWNED_MODULES[0]].isDynamicEntry = false

    expect(() => checkRouteChunkIsolation(manifest)).toThrow(/outside the initial bundle/)
  })
})
