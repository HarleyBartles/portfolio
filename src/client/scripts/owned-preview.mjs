import { preview as vitePreview } from 'vite'
import path from 'node:path'

export async function startOwnedPreview(clientRoot, { startPreview = vitePreview } = {}) {
  const server = await startPreview({
    root: clientRoot,
    configFile: path.join(clientRoot, 'vite.config.ts'),
    preview: { host: '127.0.0.1', port: 0, strictPort: true },
  })
  const address = server.httpServer.address()
  if (address === null || typeof address === 'string') {
    await server.close()
    throw new Error('Vite preview did not bind an IPv4 loopback port')
  }
  return { origin: `http://127.0.0.1:${address.port}`, server }
}

export async function closeOwnedPreview(server) {
  await server?.close()
}
