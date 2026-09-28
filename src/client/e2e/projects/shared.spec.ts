import { expect, test } from '@playwright/test'
import { wildBunchPath, patchPath, learningLabPath, specialistsCanonicalPath, specialistsPreviewPath } from './support'

test('direct route loads keep case-study presentation chunks isolated', async ({ page }) => {
  const requestedChunk = (requested: readonly string[], chunk: string) => requested.some((url) => {
    const filename = new URL(url).pathname.split('/').at(-1) ?? ''
    return filename.startsWith(`${chunk}-`)
  })
  const routes = [
    { path: './projects/codex-marketplace/', heading: 'Agent Asset Marketplace', chunk: 'MarketplaceCaseStudy', siblings: ['LearningLabCaseStudy', 'WildBunchCaseStudy', 'PatchPipelineCaseStudy'] },
    { path: learningLabPath, heading: 'Agentic Learning Lab', chunk: 'LearningLabCaseStudy', siblings: ['MarketplaceCaseStudy', 'WildBunchCaseStudy', 'PatchPipelineCaseStudy'] },
    { path: wildBunchPath, heading: 'Wild Bunch', chunk: 'WildBunchCaseStudy', siblings: ['MarketplaceCaseStudy', 'LearningLabCaseStudy', 'PatchPipelineCaseStudy'] },
    { path: patchPath, heading: 'Adventures of Patch', chunk: 'PatchPipelineCaseStudy', siblings: ['MarketplaceCaseStudy', 'LearningLabCaseStudy', 'WildBunchCaseStudy'] },
    { path: './writing/use-superpowers/', heading: 'Use Superpowers', chunk: null, siblings: ['MarketplaceCaseStudy', 'LearningLabCaseStudy', 'WildBunchCaseStudy', 'PatchPipelineCaseStudy'] },
    { path: './patch/identity-emporium/', heading: 'Identity Emporium', chunk: 'IdentityEmporiumPage', siblings: ['TournamentPage', 'PublishedUsualSpecialistsPage', 'UsualSpecialistsPage'] },
    { path: './patch/tournament-of-reasonable-defaults/', heading: 'Tournament of Reasonable Defaults', chunk: 'TournamentPage', siblings: ['IdentityEmporiumPage', 'PublishedUsualSpecialistsPage', 'UsualSpecialistsPage'] },
    { path: specialistsCanonicalPath, heading: 'The Usual Specialists', chunk: 'UsualSpecialistsPage', siblings: ['IdentityEmporiumPage', 'TournamentPage', 'UsualSpecialistsPreviewPage'] },
    { path: specialistsPreviewPath, heading: 'The Usual Specialists', chunk: 'UsualSpecialistsPage', siblings: ['IdentityEmporiumPage', 'TournamentPage', 'PublishedUsualSpecialistsPage'] },
  ] as const

  for (const route of routes) {
    const requested: string[] = []
    page.on('request', (request) => requested.push(request.url()))
    await page.goto(route.path)
    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible()

    if (route.chunk !== null) expect(requestedChunk(requested, route.chunk)).toBe(true)
    for (const sibling of route.siblings) expect(requestedChunk(requested, sibling)).toBe(false)
    page.removeAllListeners('request')
  }
})

test('visitor receives a useful page state when a content slug is missing', async ({ page }) => {
  await page.goto('./projects/missing-story')

  await expect(page).toHaveTitle('Page Not Found | Harley Bartles')
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Return to the homepage' })).toHaveAttribute('href', '/')
})

