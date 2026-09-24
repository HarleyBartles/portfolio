import { readFileSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArticleBlocks } from '../src/features/writing/articleBlocks.ts'

const source = process.argv[2]
if (!source) throw new Error('Usage: node extract-article-blocks.mjs ARTICLE.md')

const raw = readFileSync(resolve(source), 'utf8').replace(/\r\n?/g, '\n')
const frontmatter = /^---\n([\s\S]*?)\n---\n/.exec(raw)
if (!frontmatter) throw new Error('Article requires YAML frontmatter')
const summary = /^summary: ["']?(.+?)["']?$/m.exec(frontmatter[1])?.[1]
const content = raw.slice(frontmatter[0].length).trimStart()
const title = /^# (.+)\n/.exec(content)?.[1]
if (!summary || !title) throw new Error('Article requires title and summary')
const blocks = parseArticleBlocks(content.replace(/^# .+\n/, '').trim())
const publicRoot = resolve(fileURLToPath(new URL('../public/', import.meta.url)))
for (const block of blocks) {
  if (block.kind === 'figure' && block.src && !existsSync(join(publicRoot, block.src.slice(1)))) {
    throw new Error(`Figure asset does not exist: ${block.src}`)
  }
}
process.stdout.write(JSON.stringify({ title, promise: summary, blocks }))
