import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const INDEX_ROUTES = [
  ['home', '/', 'home', 'Harley Bartles | Full-stack software engineer', 'Full-stack software engineer building reliable agentic systems, public tools, and memorable visual explanations.'],
  ['projects', '/projects', 'index', 'Project Stories | Harley Bartles', 'Selected public engineering project stories from Harley Bartles.'],
  ['writing', '/writing', 'index', 'Writing and Notes | Harley Bartles', 'Notes on engineering practice, agentic systems, and repository design.'],
  ['patch', '/patch', 'index', 'Adventures of Patch | Harley Bartles', 'Visual stories that turn agentic-engineering practice into memorable, inspectable lessons.'],
  ['about', '/about', 'about', 'About | Harley Bartles', 'Full-stack software engineer with 7+ years of professional experience, currently the sole engineer responsible for Access Checks at The Access Group. Career, independent work, current study and hiring details.'],
  ['cv', '/cv', 'cv', 'CV | Harley Bartles', 'CV for Harley Bartles, a full-stack software engineer with 7+ years in production systems across .NET, React, Python and AI-assisted automation.'],
]

const KIND_ROUTE = { project: 'projects', writing: 'writing', patch: 'patch' }
const DEFAULT_SOCIAL_IMAGE = {
  path: '/brand/social-card.png',
  alt: 'Harley Bartles, Full-stack software engineer',
  width: 1200,
  height: 630,
  mimeType: 'image/png',
}

function entry(id, pathValue, kind, title, description) {
  return {
    id,
    path: pathValue,
    kind,
    title,
    description,
    indexability: 'index',
    openGraphType: kind === 'writing' ? 'article' : 'website',
    socialImage: DEFAULT_SOCIAL_IMAGE,
    shareAction: kind === 'writing' || kind === 'patch' ? 'content-end' : 'none',
  }
}

export function buildRouteCatalogue(manifest) {
  const indexEntries = INDEX_ROUTES.map(([id, route, kind, title, description]) => entry(id, route, kind, title, description))
  const contentEntries = manifest.items.flatMap((item) => {
    const root = KIND_ROUTE[item.kind]
    return root === undefined ? [] : [entry(`${item.kind}:${item.slug}`, `/${root}/${item.slug}`, item.kind, `${item.title} | Harley Bartles`, item.summary)]
  })

  return [...indexEntries, ...contentEntries].sort((left, right) => left.path.localeCompare(right.path))
}

export async function refreshRouteCatalogue({ manifestPath, outputPath, check = false }) {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
  const text = `${JSON.stringify(buildRouteCatalogue(manifest), null, 2)}\n`

  if (check) {
    const existing = await readFile(outputPath, 'utf8')
    if (existing !== text) throw new Error('route-metadata.generated.json is stale; run npm run routes:apply')
    return
  }

  await writeFile(outputPath, text, 'utf8')
}

const scriptPath = process.argv[1] === undefined ? '' : pathToFileURL(path.resolve(process.argv[1])).href
if (scriptPath === import.meta.url) {
  const clientRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const check = process.argv.includes('--check')
  await refreshRouteCatalogue({
    manifestPath: path.join(clientRoot, 'src', 'data', 'content', 'content-manifest.json'),
    outputPath: path.join(clientRoot, 'src', 'data', 'routes', 'route-metadata.generated.json'),
    check,
  })
  console.log(`[generate-route-catalogue] ${check ? 'checked' : 'wrote'} route metadata`)
}
