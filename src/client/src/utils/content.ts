import type { ContentSummary } from '../types/content'

export function formatContentDate(value: string | undefined): string | null {
  if (value === undefined) return null
  const date = new Date(`${value}T12:00:00Z`)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function sortWriting(items: readonly ContentSummary[]): ContentSummary[] {
  return items
    .filter((item) => item.kind === 'writing')
    .toSorted((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
}
