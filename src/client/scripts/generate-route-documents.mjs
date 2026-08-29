import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { buildRouteCatalogue } from './generate-route-catalogue.mjs'

const LEGACY_ROUTES = [
  { route: '/fairytales', canonicalRoute: '/patch', title: 'Adventures of Patch | Harley Bartles', description: 'Visual stories that turn agentic-engineering practice into memorable, inspectable lessons.' },
  { route: '/fairytales/goldilocks', canonicalRoute: '/patch/goldilocks', slug: 'goldilocks' },
  { route: '/fairytales/sorcerers-apprentice', canonicalRoute: '/patch/sorcerers-apprentice', slug: 'sorcerers-apprentice' },
]

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function canonicalUrl(origin, baseUrl, route) {
  const normalizedOrigin = origin.replace(/\/$/, '')
  const normalizedBase = baseUrl === '/' ? '' : `/${baseUrl.replace(/^\//, '').replace(/\/$/, '')}`
  return route === '/' ? `${normalizedOrigin}${normalizedBase}/` : `${normalizedOrigin}${normalizedBase}${route}`
}

function renderMetadata(template, metadata, origin, baseUrl) {
  if (metadata.indexability === 'noindex') {
    const cleanTemplate = template
      .replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, '')
      .replace(/\s*<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '')
      .replace(/\s*<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '')

    return cleanTemplate
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`)
      .replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeHtml(metadata.description)}" />`)
      .replace('</head>', '    <meta name="robots" content="noindex, nofollow" />\n  </head>')
  }

  const canonical = canonicalUrl(origin, baseUrl, metadata.canonicalRoute ?? metadata.path)
  const socialImage = canonicalUrl(origin, baseUrl, metadata.socialImage.path)
  const socialTags = [
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta name="robots" content="${metadata.indexability}" />`,
    `<meta property="og:type" content="${metadata.openGraphType}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(socialImage)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(metadata.socialImage.alt)}" />`,
    `<meta property="og:image:width" content="${metadata.socialImage.width}" />`,
    `<meta property="og:image:height" content="${metadata.socialImage.height}" />`,
    `<meta property="og:image:type" content="${metadata.socialImage.mimeType}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(socialImage)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(metadata.socialImage.alt)}" />`,
  ].join('\n    ')

  const cleanTemplate = template
    .replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/\s*<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '')
    .replace(/\s*<meta\s+name=["'](?:twitter|robots):[^"']+["'][^>]*>/gi, '')

  return cleanTemplate
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
    )
    .replace('</head>', `    ${socialTags}\n  </head>`)
}

export async function buildRouteDocuments({ distRoot, manifestPath, baseUrl, origin }) {
  const [template, manifestText] = await Promise.all([
    readFile(path.join(distRoot, 'index.html'), 'utf8'),
    readFile(manifestPath, 'utf8'),
  ])
  const manifest = JSON.parse(manifestText)
  const contentEntries = buildRouteCatalogue(manifest)
  const legacyEntries = LEGACY_ROUTES.flatMap((legacy) => {
    const source = legacy.slug === undefined
      ? contentEntries.find((item) => item.path === legacy.canonicalRoute)
      : contentEntries.find((item) => item.path === legacy.canonicalRoute)
    return source === undefined ? [] : [{ ...source, path: legacy.route, canonicalRoute: legacy.canonicalRoute }]
  })
  const entries = [...contentEntries, ...legacyEntries]

  for (const metadata of entries) {
    const html = renderMetadata(template, metadata, origin, baseUrl)

    if (metadata.path === '/') {
      await writeFile(path.join(distRoot, 'index.html'), html)
      continue
    }

    const routeRoot = path.join(distRoot, ...metadata.path.split('/').filter(Boolean))
    await mkdir(routeRoot, { recursive: true })
    await writeFile(path.join(routeRoot, 'index.html'), html)
  }

  const notFound = renderMetadata(
    template,
    {
      path: '/',
      title: 'Page Not Found | Harley Bartles',
      description: 'This portfolio page is not available.',
      indexability: 'noindex',
    },
    origin,
    baseUrl,
  )
  await writeFile(path.join(distRoot, '404.html'), notFound)

  return entries.map((entry) => entry.path)
}

const scriptPath = process.argv[1] === undefined ? '' : pathToFileURL(path.resolve(process.argv[1])).href

if (scriptPath === import.meta.url) {
  const clientRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const siteConfig = JSON.parse(await readFile(path.join(clientRoot, 'site.config.json'), 'utf8'))
  const profile = siteConfig.profiles[siteConfig.activeProfile]
  const routes = await buildRouteDocuments({
    distRoot: path.join(clientRoot, 'dist'),
    manifestPath: path.join(clientRoot, 'src', 'data', 'content', 'content-manifest.json'),
    baseUrl: profile.basePath,
    origin: profile.canonicalOrigin,
  })
  console.log(`[generate-route-documents] wrote ${routes.length} known routes and 404.html`)
}
