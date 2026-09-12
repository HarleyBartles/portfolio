import { afterEach, describe, expect, test, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('run-e2e command planning', () => {
  test('skips only the canonical gate build and forwards remaining Playwright arguments', async () => {
    vi.stubEnv('npm_execpath', undefined)
    const runE2e = await import('./run-e2e.mjs').catch(() => ({})) as {
      findAvailableE2ePort?: () => Promise<number>
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

    expect(runE2e.findAvailableE2ePort).toBeTypeOf('function')
    const port = await runE2e.findAvailableE2ePort?.()
    expect(port).toBeTypeOf('number')
    expect(port).toBeGreaterThan(0)
  })
})
