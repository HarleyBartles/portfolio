import { spawnSync } from 'node:child_process'
import { createServer } from 'node:net'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const clientRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const npmCli = process.env.npm_execpath
function runNode(args, label, env = process.env) {
  const result = spawnSync(process.execPath, args, {
    cwd: clientRoot,
    env,
    stdio: 'inherit',
  })
  if (result.error !== undefined) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
  if (result.signal !== null) throw new Error(`${label} ended with signal ${result.signal}.`)
}

export function planE2eRun(arguments_) {
  return {
    shouldBuild: !arguments_.includes('--skip-build'),
    playwrightArguments: arguments_.filter((argument) => argument !== '--skip-build'),
  }
}

export async function findAvailableE2ePort(host = '127.0.0.1') {
  return new Promise((resolve, reject) => {
    const server = createServer()
    server.once('error', reject)
    server.listen(0, host, () => {
      const address = server.address()
      if (address === null || typeof address === 'string') {
        server.close()
        reject(new Error('Playwright preview could not allocate a TCP port'))
        return
      }
      server.close((error) => error === undefined ? resolve(address.port) : reject(error))
    })
  })
}

export async function runE2e(
  arguments_ = process.argv.slice(2),
  {
    findPort = findAvailableE2ePort,
    npmCommand = npmCli,
    runCommand = runNode,
  } = {},
) {
  if (npmCommand === undefined) {
    throw new Error('run-e2e.mjs must be launched through an npm script so the npm CLI can be resolved portably.')
  }

  const plan = planE2eRun(arguments_)
  if (plan.shouldBuild) {
    runCommand([npmCommand, 'run', 'build'], 'E2E production build')
  }
  const previewPort = await findPort()
  const playwrightEnvironment = {
    ...process.env,
    PORTFOLIO_E2E_PORT: String(previewPort),
  }
  runCommand([
    path.join(clientRoot, 'node_modules', '@playwright', 'test', 'cli.js'),
    'test',
    ...plan.playwrightArguments,
  ], 'Playwright', playwrightEnvironment)
}

const scriptPath = process.argv[1] === undefined ? '' : pathToFileURL(path.resolve(process.argv[1])).href
if (scriptPath === import.meta.url) {
  await runE2e()
}
