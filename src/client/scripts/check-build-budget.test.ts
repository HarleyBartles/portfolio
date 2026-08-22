import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { checkBuildBudget } from './check-build-budget.mjs'


const temporaryRoots: string[] = []

function buildFixture(
  jsBytes: number,
  cssBytes: number,
  lazyBytes = 0,
  pdfContents: Uint8Array | null = Buffer.from('%PDF'),
): string {
  const root = mkdtempSync(path.join(tmpdir(), 'portfolio-build-budget-'))
  temporaryRoots.push(root)
  mkdirSync(path.join(root, '.vite'), { recursive: true })
  mkdirSync(path.join(root, 'assets'), { recursive: true })
  writeFileSync(path.join(root, 'assets', 'entry.js'), Buffer.alloc(jsBytes))
  writeFileSync(path.join(root, 'assets', 'entry.css'), Buffer.alloc(cssBytes))
  writeFileSync(path.join(root, 'assets', 'lazy.js'), Buffer.alloc(lazyBytes))
  if (pdfContents !== null) {
    writeFileSync(path.join(root, 'harley-bartles-cv.pdf'), pdfContents)
  }
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
  it('reports entry JavaScript, CSS, and the CV PDF while excluding lazy chunks', () => {
    const result = checkBuildBudget({
      distRoot: buildFixture(350, 40, 50_000),
      maxJsBytes: 350,
      maxCssBytes: 40,
      maxCvPdfBytes: 4,
    })

    expect(result).toEqual({ jsBytes: 350, cssBytes: 40, pdfBytes: 4 })
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

  it('rejects a missing CV PDF', () => {
    expect(() => checkBuildBudget({
      distRoot: buildFixture(350, 40, 0, null),
      maxJsBytes: 350,
      maxCssBytes: 40,
      maxCvPdfBytes: 4,
    })).toThrow('CV PDF is missing')
  })

  it('rejects a CV PDF with an invalid signature', () => {
    expect(() => checkBuildBudget({
      distRoot: buildFixture(350, 40, 0, Buffer.from('not a PDF')),
      maxJsBytes: 350,
      maxCssBytes: 40,
      maxCvPdfBytes: 9,
    })).toThrow('CV PDF does not start with %PDF')
  })

  it('rejects a CV PDF over its budget', () => {
    expect(() => checkBuildBudget({
      distRoot: buildFixture(350, 40, 0, Buffer.concat([Buffer.from('%PDF'), Buffer.alloc(1)])),
      maxJsBytes: 350,
      maxCssBytes: 40,
      maxCvPdfBytes: 4,
    })).toThrow('CV PDF is 5 bytes; budget is 4 bytes')
  })
})
