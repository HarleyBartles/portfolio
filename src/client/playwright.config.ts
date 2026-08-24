import { defineConfig, devices } from '@playwright/test'

const clientPort = 4173
const clientOrigin = `http://127.0.0.1:${clientPort}`
const clientBaseUrl = `${clientOrigin}/portfolio/`

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
      command: 'npm run preview:test',
      url: clientOrigin,
      env: {
        VITE_CONTACT_FORM_ENDPOINT: 'https://forms.example.test/contact',
      },
      timeout: 120_000,
      reuseExistingServer: false,
    },
  ],
})
