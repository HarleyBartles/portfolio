import { defineConfig, devices } from '@playwright/test'
import { readFileSync } from 'node:fs'

const clientPort = 4174
const clientOrigin = `http://127.0.0.1:${clientPort}`
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
  retries: process.env.CI ? 1 : 0,
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
  webServer: [
    {
      command: 'npm run preview:e2e',
      url: clientOrigin,
      timeout: 120_000,
      reuseExistingServer: false,
    },
  ],
})
