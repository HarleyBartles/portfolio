import { useEffect, type ReactElement } from 'react'

const portfolioOrigin = 'https://harleybartles.com'

type DocumentMetadataProps = {
  title: string
  description: string
  canonicalPath: string
}

function getOrCreateMeta(name: string): HTMLMetaElement {
  const existing = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)

  if (existing !== null) {
    return existing
  }

  const meta = document.createElement('meta')
  meta.setAttribute('name', name)
  document.head.append(meta)

  return meta
}

function getOrCreateCanonical(): HTMLLinkElement {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (existing !== null) {
    return existing
  }

  const link = document.createElement('link')
  link.setAttribute('rel', 'canonical')
  document.head.append(link)

  return link
}

function normalizeCanonicalPath(canonicalPath: string): string {
  if (
    !canonicalPath.startsWith('/') ||
    canonicalPath.startsWith('//') ||
    canonicalPath.includes('\\') ||
    canonicalPath.includes(':') ||
    canonicalPath.includes('..')
  ) {
    return '/'
  }

  const [pathOnly] = canonicalPath.split(/[?#]/)

  return pathOnly === '' ? '/' : pathOnly
}

export function buildCanonicalUrl(canonicalPath: string): string {
  return new URL(normalizeCanonicalPath(canonicalPath), portfolioOrigin).toString()
}

export function DocumentMetadata({
  title,
  description,
  canonicalPath,
}: DocumentMetadataProps): ReactElement {
  useEffect(() => {
    document.title = title
    getOrCreateMeta('description').setAttribute('content', description)
    getOrCreateCanonical().setAttribute('href', buildCanonicalUrl(canonicalPath))
  }, [canonicalPath, description, title])

  return <></>
}
