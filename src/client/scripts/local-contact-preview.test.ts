import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test } from 'vitest'

test('development keeps the connected contact form visible for local review', () => {
  const environmentPath = resolve(process.cwd(), '.env.development')

  expect(existsSync(environmentPath)).toBe(true)
  if (!existsSync(environmentPath)) return

  const environment = readFileSync(environmentPath, 'utf8')

  expect(environment).toMatch(/^VITE_CONTACT_FORM_ENDPOINT=https:\/\/forms\.example\.test\/contact$/m)
})
