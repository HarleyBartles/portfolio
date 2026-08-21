import { defineConfig, devices } from '@playwright/test'

const clientPort = 4173
const clientOrigin = `http://127.0.0.1:${clientPort}`
const clientBaseUrl = `${clientOrigin}/portfolio/`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: clientBaseUrl,
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
      command: 'npm run build && npm run preview:test',
      url: clientOrigin,
      timeout: 120_000,
      reuseExistingServer: false,
    },
  ],
})
