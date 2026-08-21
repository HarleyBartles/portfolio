import { useEffect, type ReactElement } from 'react'

const portfolioOrigin = 'https://harleybartles.github.io'
const portfolioBasePath = '/portfolio'
const socialImageUrl = `${portfolioOrigin}${portfolioBasePath}/brand/social-card.png`

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

function getOrCreateProperty(property: string): HTMLMetaElement {
  const existing = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)

  if (existing !== null) {
    return existing
  }

  const meta = document.createElement('meta')
  meta.setAttribute('property', property)
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
  const path = normalizeCanonicalPath(canonicalPath).replace(/^\//, '')
  return `${portfolioOrigin}${portfolioBasePath}${path === '' ? '' : `/${path}`}`
}

export function DocumentMetadata({
  title,
  description,
  canonicalPath,
}: DocumentMetadataProps): ReactElement {
  useEffect(() => {
    const canonical = buildCanonicalUrl(canonicalPath)
    document.title = title
    getOrCreateMeta('description').setAttribute('content', description)
    getOrCreateCanonical().setAttribute('href', canonical)
    getOrCreateProperty('og:title').setAttribute('content', title)
    getOrCreateProperty('og:description').setAttribute('content', description)
    getOrCreateProperty('og:type').setAttribute('content', canonicalPath.startsWith('/writing/') ? 'article' : 'website')
    getOrCreateProperty('og:url').setAttribute('content', canonical)
    getOrCreateProperty('og:image').setAttribute('content', socialImageUrl)
    getOrCreateMeta('twitter:card').setAttribute('content', 'summary_large_image')
    getOrCreateMeta('twitter:title').setAttribute('content', title)
    getOrCreateMeta('twitter:description').setAttribute('content', description)
    getOrCreateMeta('twitter:image').setAttribute('content', socialImageUrl)
  }, [canonicalPath, description, title])

  return <></>
}
