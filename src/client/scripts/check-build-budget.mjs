import { readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'


export const DEFAULT_BUDGETS = Object.freeze({
  maxJsBytes: 350 * 1024,
  maxCssBytes: 40 * 1024,
})

export function checkBuildBudget({
  distRoot,
  maxJsBytes = DEFAULT_BUDGETS.maxJsBytes,
  maxCssBytes = DEFAULT_BUDGETS.maxCssBytes,
}) {
  const manifestPath = path.join(distRoot, '.vite', 'manifest.json')
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  const entries = Object.values(manifest).filter((item) => item.isEntry === true)

  if (entries.length !== 1) {
    throw new Error(`expected one Vite entry in ${manifestPath}; found ${entries.length}`)
  }

  const entry = entries[0]
  const jsBytes = statSync(path.join(distRoot, entry.file)).size
  const cssBytes = (entry.css ?? []).reduce(
    (total, cssFile) => total + statSync(path.join(distRoot, cssFile)).size,
    0,
  )

  if (jsBytes > maxJsBytes) {
    throw new Error(`entry JavaScript is ${jsBytes} bytes; budget is ${maxJsBytes} bytes`)
  }
  if (cssBytes > maxCssBytes) {
    throw new Error(`entry CSS is ${cssBytes} bytes; budget is ${maxCssBytes} bytes`)
  }

  return { jsBytes, cssBytes }
}

function main() {
  const scriptRoot = path.dirname(fileURLToPath(import.meta.url))
  const distRoot = path.resolve(scriptRoot, '..', 'dist')
  const result = checkBuildBudget({ distRoot })
  console.log(
    `[check-build-budget] entry JS ${result.jsBytes}/${DEFAULT_BUDGETS.maxJsBytes} bytes; CSS ${result.cssBytes}/${DEFAULT_BUDGETS.maxCssBytes} bytes`,
  )
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main()
}
