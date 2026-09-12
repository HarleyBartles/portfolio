import { afterEach, describe, expect, test, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('run-e2e command planning', () => {
  test('skips only the canonical gate build and forwards remaining Playwright arguments', async () => {
    vi.stubEnv('npm_execpath', undefined)
    const runE2e = await import('./run-e2e.mjs').catch(() => ({})) as {
      planE2eRun?: (arguments_: string[]) => { shouldBuild: boolean, playwrightArguments: string[] }
    }

    expect(runE2e.planE2eRun).toBeTypeOf('function')
    expect(runE2e.planE2eRun?.(['--skip-build', '--retries=1', 'e2e/about.spec.ts'])).toEqual({
      shouldBuild: false,
      playwrightArguments: ['--retries=1', 'e2e/about.spec.ts'],
    })
    expect(runE2e.planE2eRun?.(['e2e/visual-regression.spec.ts'])).toEqual({
      shouldBuild: true,
      playwrightArguments: ['e2e/visual-regression.spec.ts'],
    })

  })

  test('holds an owned preview from after the build until Playwright exits', async () => {
    vi.stubEnv('npm_execpath', undefined)
    const { runE2e } = await import('./run-e2e.mjs') as {
      runE2e: (
        arguments_: string[],
        dependencies: {
          closePreview: (preview: unknown) => Promise<void>
          npmCommand: string
          runCommand: (arguments_: string[], label: string, environment?: NodeJS.ProcessEnv) => Promise<void>
          startPreview: () => Promise<{ origin: string, server: unknown }>
        },
      ) => Promise<void>
    }
    const events: string[] = []

    await runE2e(['e2e/about.spec.ts'], {
      npmCommand: '/npm',
      runCommand: async (_arguments, label, environment) => {
        events.push(label)
        if (label === 'Playwright') {
          expect(environment?.PORTFOLIO_E2E_ORIGIN).toBe('http://127.0.0.1:43126')
          expect(environment?.PORTFOLIO_E2E_EXTERNAL_SERVER).toBe('true')
        }
      },
      startPreview: async () => {
        events.push('start owned preview')
        return { origin: 'http://127.0.0.1:43126', server: { name: 'preview' } }
      },
      closePreview: async () => { events.push('close owned preview') },
    })

    expect(events).toEqual(['E2E production build', 'start owned preview', 'Playwright', 'close owned preview'])
  })

  test('closes the owned preview when Playwright fails', async () => {
    const { runE2e } = await import('./run-e2e.mjs')
    const server = { name: 'preview' }
    const closePreview = vi.fn(async () => {})

    await expect(runE2e(['--skip-build'], {
      npmCommand: 'npm-cli.js',
      startPreview: vi.fn(async () => ({ origin: 'http://127.0.0.1:43127', server })),
      runCommand: vi.fn(async () => { throw new Error('Playwright failed') }),
      closePreview,
    })).rejects.toThrow('Playwright failed')

    expect(closePreview).toHaveBeenCalledWith(server)
  })
})
