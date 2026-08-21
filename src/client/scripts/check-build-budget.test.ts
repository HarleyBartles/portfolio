import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { checkBuildBudget } from './check-build-budget.mjs'


const temporaryRoots: string[] = []

function buildFixture(jsBytes: number, cssBytes: number, lazyBytes = 0): string {
  const root = mkdtempSync(path.join(tmpdir(), 'portfolio-build-budget-'))
  temporaryRoots.push(root)
  mkdirSync(path.join(root, '.vite'), { recursive: true })
  mkdirSync(path.join(root, 'assets'), { recursive: true })
  writeFileSync(path.join(root, 'assets', 'entry.js'), Buffer.alloc(jsBytes))
  writeFileSync(path.join(root, 'assets', 'entry.css'), Buffer.alloc(cssBytes))
  writeFileSync(path.join(root, 'assets', 'lazy.js'), Buffer.alloc(lazyBytes))
  writeFileSync(
    path.join(root, '.vite', 'manifest.json'),
    JSON.stringify({
      'index.html': {
        file: 'assets/entry.js',
        css: ['assets/entry.css'],
        isEntry: true,
      },
      'src/lazy.ts': {
        file: 'assets/lazy.js',
        isDynamicEntry: true,
      },
    }),
  )
  return root
}

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) rmSync(root, { recursive: true, force: true })
})

describe('checkBuildBudget', () => {
  it('reports entry JavaScript and CSS while excluding lazy chunks', () => {
    const result = checkBuildBudget({
      distRoot: buildFixture(350, 40, 50_000),
      maxJsBytes: 350,
      maxCssBytes: 40,
    })

    expect(result).toEqual({ jsBytes: 350, cssBytes: 40 })
  })

  it('rejects entry JavaScript over its budget', () => {
    expect(() => checkBuildBudget({
      distRoot: buildFixture(351, 40),
      maxJsBytes: 350,
      maxCssBytes: 40,
    })).toThrow('entry JavaScript is 351 bytes; budget is 350 bytes')
  })

  it('rejects entry CSS over its budget', () => {
    expect(() => checkBuildBudget({
      distRoot: buildFixture(350, 41),
      maxJsBytes: 350,
      maxCssBytes: 40,
    })).toThrow('entry CSS is 41 bytes; budget is 40 bytes')
  })
})
