import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const ROUTE_OWNED_MODULES = [
  'src/pages/HomePage.tsx',
  'src/features/case-study/marketplace/MarketplaceCaseStudy.tsx',
  'src/features/case-study/learning-lab/LearningLabCaseStudy.tsx',
  'src/features/case-study/wild-bunch/WildBunchCaseStudy.tsx',
  'src/features/case-study/patch/PatchPipelineCaseStudy.tsx',
  'src/features/patch-showcase/IdentityEmporiumPage.tsx',
  'src/features/patch-showcase/TournamentPage.tsx',
  'src/pages/UsualSpecialistsPreviewPage.tsx',
  'src/pages/usual-specialists/PublishedUsualSpecialistsPage.tsx',
  'src/pages/usual-specialists/UsualSpecialistsPage.tsx',
  'src/features/writing/ProductOwnershipArticle.tsx',
  'src/features/writing/TestingEvidenceArticle.tsx',
  'src/features/writing/ContextComplexityArticle.tsx',
  'src/features/writing/RianHughesArticle.tsx',
  'src/features/writing/UseSuperpowersArticle.tsx',
]

export function checkRouteChunkIsolation(manifest) {
  const entryKeys = Object.entries(manifest)
    .filter(([, entry]) => entry.isEntry === true)
    .map(([key]) => key)
  const eagerlyLoaded = new Set()
  const visitStaticImports = (key) => {
    if (eagerlyLoaded.has(key)) return
    eagerlyLoaded.add(key)
    for (const importedKey of manifest[key]?.imports ?? []) visitStaticImports(importedKey)
  }
  for (const key of entryKeys) visitStaticImports(key)

  const violations = ROUTE_OWNED_MODULES.filter((source) => {
    const module = manifest[source]
    return module?.isDynamicEntry !== true || eagerlyLoaded.has(source)
  })
  if (violations.length > 0) {
    throw new Error(`route-owned modules must stay outside the initial bundle as isolated lazy entries: ${violations.join(', ')}`)
  }
  return ROUTE_OWNED_MODULES.length
}

function main() {
  const scriptRoot = path.dirname(fileURLToPath(import.meta.url))
  const manifestPath = path.resolve(scriptRoot, '..', 'dist', '.vite', 'manifest.json')
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  const checkedModules = checkRouteChunkIsolation(manifest)
  console.log(`[check-route-chunk-isolation] ${checkedModules} route-owned modules remain isolated lazy entries`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main()
}
