export type ProseBlock = { kind: 'prose'; markdown: string }
export type AsideBlock = {
  kind: 'aside'
  id: string
  title: string
  eyebrow?: string
  standfirst: string
  disclosure: string
  markdown: string
}
export type FigureBlock = {
  kind: 'figure'
  id: string
  src?: string
  visual?: string
  description: string
  caption: string
  layout: 'reading' | 'wide'
}
export type PullQuoteBlock = { kind: 'pullquote'; text: string; attribution?: string }
export type ArticleBlock = ProseBlock | AsideBlock | FigureBlock | PullQuoteBlock

const startMarker = /^:::(aside|figure|pullquote)(?: ([a-z][a-z0-9-]{0,63}))?$/
const endMarker = /^:::end-(aside|figure|pullquote)$/
const metadataLine = /^([a-z]+): (.+)$/
const fenceMarker = /^\s{0,3}(`{3,}|~{3,})/

function updateFence(line: string, fence: string): string {
  const marker = fenceMarker.exec(line)?.[1]
  if (marker === undefined) return fence
  if (fence === '') return marker
  return marker[0] === fence[0] && marker.length >= fence.length ? '' : fence
}

function metadata(lines: string[], allowed: string[]): { fields: Record<string, string>; body: string } {
  const separator = lines.indexOf('')
  const header = separator < 0 ? lines : lines.slice(0, separator)
  const body = separator < 0 ? '' : lines.slice(separator + 1).join('\n').trim()
  const fields: Record<string, string> = {}
  for (const line of header) {
    const match = metadataLine.exec(line)
    if (match === null || !allowed.includes(match[1]) || fields[match[1]] !== undefined) {
      throw new Error(`Invalid article block field: ${line}`)
    }
    fields[match[1]] = match[2].trim()
  }
  return { fields, body }
}

function required(fields: Record<string, string>, key: string): string {
  const value = fields[key]
  if (value === undefined || value.length === 0) throw new Error(`Article block requires ${key}`)
  return value
}

function block(kind: string, id: string | undefined, lines: string[]): ArticleBlock {
  if (kind === 'aside') {
    if (id === undefined) throw new Error('Aside requires an id')
    const { fields, body } = metadata(lines, ['title', 'eyebrow', 'standfirst', 'disclosure'])
    if (!body) throw new Error(`Aside ${id} requires a body`)
    return {
      kind: 'aside', id, title: required(fields, 'title'),
      ...(fields.eyebrow ? { eyebrow: fields.eyebrow } : {}),
      standfirst: required(fields, 'standfirst'), disclosure: required(fields, 'disclosure'),
      markdown: body,
    }
  }
  if (kind === 'figure') {
    if (id === undefined) throw new Error('Figure requires an id')
    const { fields, body } = metadata(lines, ['src', 'visual', 'description', 'caption', 'layout'])
    if (body || Boolean(fields.src) === Boolean(fields.visual)) {
      throw new Error(`Figure ${id} requires exactly one src or visual and no body`)
    }
    if (fields.src && (!/^\/(images|media)\/[a-zA-Z0-9/_-]+\.(svg|png|webp|avif)$/.test(fields.src))) {
      throw new Error(`Figure ${id} has an invalid site asset path`)
    }
    const layout = fields.layout ?? 'reading'
    if (layout !== 'reading' && layout !== 'wide') throw new Error(`Figure ${id} has an invalid layout`)
    return {
      kind: 'figure', id,
      ...(fields.src ? { src: fields.src } : { visual: fields.visual }),
      description: required(fields, 'description'), caption: required(fields, 'caption'), layout,
    }
  }
  if (kind === 'pullquote') {
    if (id !== undefined) throw new Error('Pull quote does not take an id')
    if (lines.length === 1 && !metadataLine.test(lines[0])) {
      const text = lines[0].trim()
      if (!text) throw new Error('Pull quote requires text')
      return { kind: 'pullquote', text }
    }
    const { fields, body } = metadata(lines, ['attribution'])
    const text = body
    if (!text || text.includes('\n')) throw new Error('Pull quote requires one paragraph of text')
    return { kind: 'pullquote', text, ...(fields.attribution ? { attribution: fields.attribution } : {}) }
  }
  throw new Error(`Unknown article block: ${kind}`)
}

export function parseArticleBlocks(markdown: string): ArticleBlock[] {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n')
  const result: ArticleBlock[] = []
  const prose: string[] = []
  const seen = new Set<string>()
  let fence = ''
  const flush = () => {
    const text = prose.join('\n').trim()
    if (text) result.push({ kind: 'prose', markdown: text })
    prose.length = 0
  }
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const opening = fence === '' ? startMarker.exec(line) : null
    if (opening === null) {
      if (fence === '' && (endMarker.test(line) || line.startsWith(':::'))) {
        throw new Error(`Unexpected article block marker at line ${index + 1}`)
      }
      prose.push(line)
      fence = updateFence(line, fence)
      continue
    }
    flush()
    const kind = opening[1]
    const id = opening[2]
    if (id !== undefined && seen.has(id)) throw new Error(`Duplicate article block id: ${id}`)
    if (id !== undefined) seen.add(id)
    const inner: string[] = []
    let innerFence = ''
    let closed = false
    for (index += 1; index < lines.length; index += 1) {
      const candidate = lines[index]
      if (innerFence === '' && candidate === `:::end-${kind}`) {
        closed = true
        break
      }
      if (innerFence === '' && (startMarker.test(candidate) || endMarker.test(candidate))) {
        throw new Error(`Nested or mismatched article block at line ${index + 1}`)
      }
      inner.push(candidate)
      innerFence = updateFence(candidate, innerFence)
    }
    if (!closed) throw new Error(`Unclosed ${kind} block`)
    result.push(block(kind, id, inner))
  }
  flush()
  return result
}
