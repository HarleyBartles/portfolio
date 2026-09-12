import { describe, expect, test, vi } from 'vitest'
// @ts-expect-error Production utility is plain ESM for direct Node execution.
import { startOwnedPreview } from './owned-preview.mjs'

describe('owned Vite preview', () => {
  test('keeps the OS-assigned listener and reports its origin', async () => {
    const server = { httpServer: { address: () => ({ address: '127.0.0.1', family: 'IPv4', port: 43125 }) }, close: vi.fn() }
    const startPreview = vi.fn(async () => server)
    await expect(startOwnedPreview('/client', { startPreview })).resolves.toEqual({ origin: 'http://127.0.0.1:43125', server })
    expect(startPreview).toHaveBeenCalledWith({
      root: '/client', configFile: 'vite.config.ts', preview: { host: '127.0.0.1', port: 0, strictPort: true },
    })
  })

  test('closes a preview that does not expose a TCP address', async () => {
    const server = { httpServer: { address: () => null }, close: vi.fn(async () => {}) }
    await expect(startOwnedPreview('/client', { startPreview: vi.fn(async () => server) })).rejects.toThrow(
      'Vite preview did not bind an IPv4 loopback port',
    )
    expect(server.close).toHaveBeenCalledOnce()
  })
})
