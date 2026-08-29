import { spawnSync } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const clientRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const npmCli = process.env.npm_execpath
function runNode(args, label) {
  const result = spawnSync(process.execPath, args, {
    cwd: clientRoot,
    env: process.env,
    stdio: 'inherit',
  })
  if (result.error !== undefined) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
  if (result.signal !== null) throw new Error(`${label} ended with signal ${result.signal}.`)
}

if (npmCli === undefined) {
  throw new Error('run-e2e.mjs must be launched through an npm script so the npm CLI can be resolved portably.')
}

runNode([npmCli, 'run', 'build'], 'E2E production build')
runNode([
  path.join(clientRoot, 'node_modules', '@playwright', 'test', 'cli.js'),
  'test',
  ...process.argv.slice(2),
], 'Playwright')
