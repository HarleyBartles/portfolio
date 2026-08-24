import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, test } from 'vitest'
// @ts-expect-error The production build utility is intentionally plain ESM for direct Node execution.
import { buildRouteDocuments } from './generate-route-documents.mjs'

const temporaryRoots: string[] = []

afterEach(async () => {
  const { rm } = await import('node:fs/promises')
  await Promise.all(temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })))
})

describe('route document generator', () => {
  test('writes known route entries with crawler-readable metadata and a separate fallback', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'portfolio-routes-'))
    temporaryRoots.push(root)
    const distRoot = path.join(root, 'dist')
    const manifestPath = path.join(root, 'content-manifest.json')
    const { mkdir } = await import('node:fs/promises')
    await mkdir(distRoot)
    await writeFile(
      path.join(distRoot, 'index.html'),
      '<!doctype html><html><head><title>Harley Bartles</title><meta name="description" content="Default"><link rel="canonical" href="https://example.test/default"><meta property="og:title" content="Default"><meta property="og:type" content="website"><meta name="twitter:card" content="summary"></head><body><div id="root"></div></body></html>',
    )
    await writeFile(
      manifestPath,
      JSON.stringify({
        items: [
          {
            slug: 'agentic-engineering-vs-vibe-coding',
            kind: 'writing',
            title: 'Agentic engineering and the kindness of vibe coding',
            summary: 'A specific article summary.',
          },
          {
            slug: 'lawful-heist',
            kind: 'patch',
            title: 'The Lawful Heist Crew',
            summary: 'Six specialists make a lawful override routine.',
          },
        ],
      }),
    )

    await buildRouteDocuments({
      distRoot,
      manifestPath,
      baseUrl: '/portfolio/',
      origin: 'https://harleybartles.github.io',
    })

    const projects = await readFile(path.join(distRoot, 'projects', 'index.html'), 'utf8')
    const cv = await readFile(path.join(distRoot, 'cv', 'index.html'), 'utf8')
    const article = await readFile(
      path.join(distRoot, 'writing', 'agentic-engineering-vs-vibe-coding', 'index.html'),
      'utf8',
    )
    const fallback = await readFile(path.join(distRoot, '404.html'), 'utf8')
    const lawfulHeist = await readFile(path.join(distRoot, 'patch', 'lawful-heist', 'index.html'), 'utf8')

    expect(projects).toContain('<title>Project Stories | Harley Bartles</title>')
    expect(projects).toContain('https://harleybartles.github.io/portfolio/projects')
    expect(projects.match(/rel="canonical"/g)).toHaveLength(1)
    expect(projects.match(/property="og:title"/g)).toHaveLength(1)
    expect(cv).toContain('<title>CV | Harley Bartles</title>')
    expect(cv).toContain('https://harleybartles.github.io/portfolio/cv')
    expect(article).toContain('A specific article summary.')
    expect(article).toContain('property="og:type" content="article"')
    expect(article.match(/property="og:type"/g)).toHaveLength(1)
    expect(article).toContain(
      'https://harleybartles.github.io/portfolio/writing/agentic-engineering-vs-vibe-coding',
    )
    expect(lawfulHeist).toContain('<title>The Lawful Heist Crew | Harley Bartles</title>')
    expect(lawfulHeist).toContain('Six specialists make a lawful override routine.')
    expect(lawfulHeist).toContain('https://harleybartles.github.io/portfolio/patch/lawful-heist')
    expect(fallback).toContain('<title>Page Not Found | Harley Bartles</title>')
  })
})
