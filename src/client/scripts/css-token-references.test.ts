import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from 'vitest'

const sourceRoot = join(import.meta.dirname, '..', 'src')

function tokenConsumerFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return tokenConsumerFiles(path)
    return /\.(?:css|scss|ts|tsx)$/.test(entry.name) ? [path] : []
  })
}

test('every stylesheet custom-property reference has a stylesheet definition', () => {
  const files = tokenConsumerFiles(sourceRoot)
  const content = files.map((path) => readFileSync(path, 'utf8'))
  const definitions = new Set(content.flatMap((source) => [...source.matchAll(/^\s*(--[\w-]+)\s*:/gm)].map((match) => match[1])))
  const references = new Set(content.flatMap((source) => [...source.matchAll(/var\((--[\w-]+)/g)].map((match) => match[1])))

  expect([...references].filter((reference) => !definitions.has(reference))).toEqual([])
})
