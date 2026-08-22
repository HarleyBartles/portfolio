import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const INDEX_METADATA = [
  {
    route: '/',
    title: 'Harley Bartles | Senior Software Engineer',
    description: 'Senior software engineer building reliable agentic systems, public tools, and memorable visual explanations.',
  },
  {
    route: '/projects',
    title: 'Project Stories | Harley Bartles',
    description: 'Selected public engineering project stories from Harley Bartles.',
  },
  {
    route: '/writing',
    title: 'Writing and Notes | Harley Bartles',
    description: 'Notes on engineering practice, agentic systems, and repository design.',
  },
  {
    route: '/fairytales',
    title: 'Patch Fairytales | Harley Bartles',
    description: 'One-page visual lessons on agentic engineering, told through Patch.',
  },
  {
    route: '/about',
    title: 'About and Work With Me | Harley Bartles',
    description: 'Experience, working style, and contact information for Harley Bartles.',
  },
  {
    route: '/cv',
    title: 'CV | Harley Bartles',
    description: 'A concise professional CV with verified experience, education, and public work from Harley Bartles.',
  },
]

const KIND_ROUTE = {
  project: 'projects',
  writing: 'writing',
  fairytales: 'fairytales',
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function canonicalUrl(origin, baseUrl, route) {
  const base = `${origin.replace(/\/$/, '')}/${baseUrl.replace(/^\//, '').replace(/\/$/, '')}`
  return route === '/' ? base : `${base}${route}`
}

function renderMetadata(template, metadata, origin, baseUrl) {
  const canonical = canonicalUrl(origin, baseUrl, metadata.route)
  const socialImage = canonicalUrl(origin, baseUrl, '/brand/social-card.png')
  const socialTags = [
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta property="og:type" content="${metadata.type ?? 'website'}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(socialImage)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(socialImage)}" />`,
  ].join('\n    ')

  const cleanTemplate = template
    .replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/\s*<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '')
    .replace(/\s*<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '')

  return cleanTemplate
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
    )
    .replace('</head>', `    ${socialTags}\n  </head>`)
}

function contentMetadata(manifest) {
  return manifest.items.flatMap((item) => {
    const routeRoot = KIND_ROUTE[item.kind]

    if (routeRoot === undefined) {
      return []
    }

    return [{
      route: `/${routeRoot}/${item.slug}`,
      title: `${item.title} | Harley Bartles`,
      description: item.summary,
      type: item.kind === 'writing' ? 'article' : 'website',
    }]
  })
}

export async function buildRouteDocuments({ distRoot, manifestPath, baseUrl, origin }) {
  const [template, manifestText] = await Promise.all([
    readFile(path.join(distRoot, 'index.html'), 'utf8'),
    readFile(manifestPath, 'utf8'),
  ])
  const manifest = JSON.parse(manifestText)
  const entries = [...INDEX_METADATA, ...contentMetadata(manifest)]

  for (const metadata of entries) {
    const html = renderMetadata(template, metadata, origin, baseUrl)

    if (metadata.route === '/') {
      await writeFile(path.join(distRoot, 'index.html'), html)
      continue
    }

    const routeRoot = path.join(distRoot, ...metadata.route.split('/').filter(Boolean))
    await mkdir(routeRoot, { recursive: true })
    await writeFile(path.join(routeRoot, 'index.html'), html)
  }

  const notFound = renderMetadata(
    template,
    {
      route: '/',
      title: 'Page Not Found | Harley Bartles',
      description: 'This portfolio page is not available.',
      type: 'website',
    },
    origin,
    baseUrl,
  )
  await writeFile(path.join(distRoot, '404.html'), notFound)

  return entries.map((entry) => entry.route)
}

const scriptPath = process.argv[1] === undefined ? '' : pathToFileURL(path.resolve(process.argv[1])).href

if (scriptPath === import.meta.url) {
  const clientRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const routes = await buildRouteDocuments({
    distRoot: path.join(clientRoot, 'dist'),
    manifestPath: path.join(clientRoot, 'src', 'data', 'content', 'content-manifest.json'),
    baseUrl: '/portfolio/',
    origin: 'https://harleybartles.github.io',
  })
  console.log(`[generate-route-documents] wrote ${routes.length} known routes and 404.html`)
}
