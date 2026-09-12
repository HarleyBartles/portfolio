import { spawn } from 'node:child_process'
import { once } from 'node:events'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { closeOwnedPreview, startOwnedPreview } from './owned-preview.mjs'

const clientRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const npmCli = process.env.npm_execpath

async function runNode(args, label, env = process.env) {
  const child = spawn(process.execPath, args, { cwd: clientRoot, env, stdio: 'inherit' })
  const [exitCode, signal] = await once(child, 'exit')
  if (signal !== null) throw new Error(`${label} ended with signal ${signal}.`)
  if (exitCode !== 0) throw new Error(`${label} failed with exit code ${exitCode ?? 1}.`)
}

export function planE2eRun(arguments_) {
  return {
    shouldBuild: !arguments_.includes('--skip-build'),
    playwrightArguments: arguments_.filter((argument) => argument !== '--skip-build'),
  }
}

export async function runE2e(arguments_ = process.argv.slice(2), {
  closePreview = closeOwnedPreview,
  npmCommand = npmCli,
  runCommand = runNode,
  startPreview = () => startOwnedPreview(clientRoot),
} = {}) {
  if (npmCommand === undefined) {
    throw new Error('run-e2e.mjs must be launched through an npm script so the npm CLI can be resolved portably.')
  }
  const plan = planE2eRun(arguments_)
  if (plan.shouldBuild) await runCommand([npmCommand, 'run', 'build'], 'E2E production build')

  const preview = await startPreview()
  let primaryError
  try {
    await runCommand([
      path.join(clientRoot, 'node_modules', '@playwright', 'test', 'cli.js'),
      'test',
      ...plan.playwrightArguments,
    ], 'Playwright', {
      ...process.env,
      PORTFOLIO_E2E_ORIGIN: preview.origin,
      PORTFOLIO_E2E_EXTERNAL_SERVER: 'true',
    })
  } catch (error) {
    primaryError = error
  }

  try {
    await closePreview(preview.server)
  } catch (cleanupError) {
    if (primaryError !== undefined) {
      throw new AggregateError([primaryError, cleanupError], 'Playwright and preview cleanup both failed')
    }
    throw cleanupError
  }
  if (primaryError !== undefined) throw primaryError
}

const scriptPath = process.argv[1] === undefined ? '' : pathToFileURL(path.resolve(process.argv[1])).href
if (scriptPath === import.meta.url) await runE2e()
