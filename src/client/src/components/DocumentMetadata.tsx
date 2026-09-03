import { useEffect } from 'react'
import { getRouteMetadata } from '../data/routes/routeCatalogue'
import { buildPublicAssetUrl, buildPublicUrl } from '../data/routes/siteProfile'

type DocumentMetadataProps = {
  title: string
  description: string
  canonicalPath: string
  noIndex?: boolean
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

function removeHeadElement(selector: string): void {
  document.head.querySelector(selector)?.remove()
}

function normalizeCanonicalPath(canonicalPath: string): string | undefined {
  if (
    !canonicalPath.startsWith('/') ||
    canonicalPath.startsWith('//') ||
    canonicalPath.includes('\\') ||
    canonicalPath.includes(':') ||
    canonicalPath.includes('..')
  ) {
    return undefined
  }

  const [pathOnly] = canonicalPath.split(/[?#]/)

  return pathOnly === '' ? '/' : pathOnly
}

export function buildCanonicalUrl(canonicalPath: string): string {
  const normalizedPath = normalizeCanonicalPath(canonicalPath)
  const path = (normalizedPath ?? '/').replace(/^\//, '')
  return buildPublicUrl(path === '' ? '/' : `/${path}`)
}

export const DocumentMetadata = ({
  title,
  description,
  canonicalPath,
  noIndex = false,
}: DocumentMetadataProps) => {
  useEffect(() => {
    const route = getRouteMetadata(normalizeCanonicalPath(canonicalPath))

    if (noIndex || route === undefined) {
      document.title = title
      getOrCreateMeta('description').setAttribute('content', description)
      getOrCreateMeta('robots').setAttribute('content', 'noindex, nofollow')
      removeHeadElement('link[rel="canonical"]')
      for (const property of ['og:url', 'og:image', 'og:image:alt', 'og:image:width', 'og:image:height', 'og:image:type']) {
        removeHeadElement(`meta[property="${property}"]`)
      }
      for (const name of ['twitter:image', 'twitter:image:alt']) {
        removeHeadElement(`meta[name="${name}"]`)
      }
      return
    }

    const canonical = buildPublicUrl(route.path)
    const socialImage = buildPublicAssetUrl(route.socialImage.path)
    document.title = route.title
    getOrCreateMeta('description').setAttribute('content', route.description)
    getOrCreateMeta('robots').setAttribute('content', route.indexability)
    getOrCreateCanonical().setAttribute('href', canonical)
    getOrCreateProperty('og:title').setAttribute('content', route.title)
    getOrCreateProperty('og:description').setAttribute('content', route.description)
    getOrCreateProperty('og:type').setAttribute('content', route.openGraphType)
    getOrCreateProperty('og:url').setAttribute('content', canonical)
    getOrCreateProperty('og:image').setAttribute('content', socialImage)
    getOrCreateProperty('og:image:alt').setAttribute('content', route.socialImage.alt)
    getOrCreateProperty('og:image:width').setAttribute('content', String(route.socialImage.width))
    getOrCreateProperty('og:image:height').setAttribute('content', String(route.socialImage.height))
    getOrCreateProperty('og:image:type').setAttribute('content', route.socialImage.mimeType)
    getOrCreateMeta('twitter:card').setAttribute('content', 'summary_large_image')
    getOrCreateMeta('twitter:title').setAttribute('content', route.title)
    getOrCreateMeta('twitter:description').setAttribute('content', route.description)
    getOrCreateMeta('twitter:image').setAttribute('content', socialImage)
    getOrCreateMeta('twitter:image:alt').setAttribute('content', route.socialImage.alt)
  }, [canonicalPath, description, title])

  return <></>
}
