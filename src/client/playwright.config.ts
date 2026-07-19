import { defineConfig, devices } from '@playwright/test'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const clientRoot = fileURLToPath(new URL('.', import.meta.url))
const repositoryRoot = path.resolve(clientRoot, '..', '..')
const serverProject = path.join(repositoryRoot, 'src', 'server', 'Portfolio.Server.csproj')
const contentRoot = path.join(repositoryRoot, 'src', 'content')

const clientPort = 4173
const serverPort = 5278
const clientBaseUrl = `http://127.0.0.1:${clientPort}`
const serverBaseUrl = `http://127.0.0.1:${serverPort}`

function quoteShellArgument(value: string): string {
  return `"${value.replaceAll('"', '\\"')}"`
}

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
      command: [
        'dotnet run',
        '--no-launch-profile',
        `--project ${quoteShellArgument(serverProject)}`,
        '--',
        `--urls ${serverBaseUrl}`,
        `--Content:ContentRoot=${quoteShellArgument(contentRoot)}`,
      ].join(' '),
      url: `${serverBaseUrl}/health`,
      timeout: 120_000,
      reuseExistingServer: false,
    },
    {
      command: 'npm run build && npm run preview:test',
      url: clientBaseUrl,
      timeout: 120_000,
      reuseExistingServer: false,
    },
  ],
})
