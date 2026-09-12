import { defineConfig, devices } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const configuredOrigin = process.env.PORTFOLIO_E2E_ORIGIN
const clientOrigin = configuredOrigin ?? 'http://127.0.0.1:4174'
const parsedOrigin = new URL(clientOrigin)
if (parsedOrigin.protocol !== 'http:' || parsedOrigin.hostname !== '127.0.0.1' || parsedOrigin.port === '') {
  throw new Error(`Invalid PORTFOLIO_E2E_ORIGIN: ${configuredOrigin}`)
}
const useExternalServer = process.env.PORTFOLIO_E2E_EXTERNAL_SERVER === 'true'
const nodePath = JSON.stringify(process.execPath)
const viteCliPath = JSON.stringify(fileURLToPath(new URL('./node_modules/vite/bin/vite.js', import.meta.url)))
const siteConfig = JSON.parse(readFileSync(new URL('./site.config.json', import.meta.url), 'utf8')) as {
  activeProfile: 'custom-domain' | 'github-pages-fallback'
  profiles: Record<'custom-domain' | 'github-pages-fallback', { basePath: string }>
}
const activeBasePath = siteConfig.profiles[siteConfig.activeProfile].basePath
const clientBaseUrl = `${clientOrigin}${activeBasePath}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}{ext}',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
    toHaveScreenshot: {
      animations: 'disabled',
      maxDiffPixelRatio: 0.01,
    },
  },
  use: {
    baseURL: clientBaseUrl,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: useExternalServer ? undefined : [
    {
      command: `${nodePath} ${viteCliPath} preview --host 127.0.0.1 --port ${parsedOrigin.port} --strictPort`,
      url: clientOrigin,
      timeout: 120_000,
      reuseExistingServer: false,
    },
  ],
})
