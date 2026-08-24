import { expect, test } from '@playwright/test'

const wildBunchPath = './projects/wild-bunch/'
const patchPath = './projects/adventures-of-patch/'
const learningLabPath = './projects/agentic-learning-lab/'

const learningLabModules = [
  'From chatbot to worker',
  'Give the cloud agent the project',
  'The project has a home',
  'Repositories, save points, and safe breakage',
  'Model, harness, context, tools, and behaviour',
  'What does the model know?',
  'Tools, operating knowledge, and domain provisioning',
  'What did we just create? Local work and connected systems',
  'Source of truth and verification',
  'Build a real agentic project',
  'Agent self-introspection and local review',
  'Autonomous human-in-the-loop workflows',
  'Specialist sub-agents and orchestration',
  'Harnesses, portability, and agent observability',
  'The 20-Agent Bonfire and context transport',
  'Selective provisioning, context, and evaluation',
  'Trust boundaries and connected autonomy',
  'Concurrent agents and isolation',
  'Epilogue: show how this was built',
] as const

async function expectNoHorizontalOverflow(page: import('@playwright/test').Page): Promise<void> {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
}

async function tabToLink(page: import('@playwright/test').Page, linkName: string): Promise<void> {
  const link = page.getByRole('link', { name: linkName, exact: true })
  for (let press = 0; press < 30; press += 1) {
    await page.keyboard.press('Tab')
    if (await link.evaluate((element) => element === document.activeElement)) return
  }
  throw new Error(`Keyboard traversal did not reach ${linkName}`)
}

test('visitor opens the Wild Bunch route with its Western hook, status, and inspectable evidence', async ({ page }) => {
  const response = await page.goto(wildBunchPath)

  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1, name: 'Wild Bunch' })).toBeVisible()
  await expect(page.locator('.content-status')).toHaveText(/Status\s*pre-alpha/)
  await expect(page.getByText(/wrong name on the crime: yours/i)).toBeVisible()
  await expect(page.getByLabel('Wild Bunch generated-town development-build preview')).toBeVisible()

  const repository = page.getByRole('link', { name: 'Wild Bunch source snapshot (pinned revision)' })
  const history = page.getByRole('link', { name: 'Historical Wild Bunch archive' })
  const pinnedReplay = page.getByRole('link', { name: 'Pinned replay-equality evidence' })
  const runGame = page.getByRole('link', { name: 'Clone and run Wild Bunch' })
  await expect(repository).toHaveAttribute('href', 'https://github.com/HarleyBartles/wild-bunch/tree/2a9814d094148bb789766a27d316095fecce5a60')
  await expect(history).toHaveAttribute('href', /worldofspectrum\.org/)
  await expect(pinnedReplay).toHaveAttribute('href', /2a9814d094148bb789766a27d316095fecce5a60/)
  await expect(runGame).toHaveAttribute('href', 'https://github.com/HarleyBartles/wild-bunch#run-the-pre-alpha-locally')
  for (const linkName of [
    'Historical Wild Bunch archive (opens in a new tab)',
    'Pinned replay-equality evidence (opens in a new tab)',
    'Wild Bunch source snapshot (pinned revision) (opens in a new tab)',
  ]) {
    await tabToLink(page, linkName)
    await expect(page.getByRole('link', { name: linkName })).toBeFocused()
  }

  await expect(page.getByText(/^These captures document the current playable build/)).toBeVisible()
  await expect(page.getByRole('region', { name: 'Development-build position' })).toHaveCount(0)
  await expect(page.getByText(/CQRS-style/i)).toHaveCount(0)
  await expect(page.getByText(/aggregate-scoped repositories/i)).toHaveCount(0)
  await expect(page.getByText(/React Testing Library/i)).toBeVisible()
  await expect(page.locator('.wild-bunch-capability-ledger')).toHaveCount(0)
  await expect(page.getByRole('figure', { name: 'Generated trail-map development-build evidence' })).toBeVisible()
  await expect(page.getByRole('figure', { name: 'Session-audit development-build evidence' })).toBeVisible()
  await expect(page.getByRole('figure', { name: 'Wanted-notice development-build evidence' })).toBeVisible()
  await expect(page.getByRole('figure', { name: 'Case-file development-build evidence' })).toBeVisible()
})

test('visitor reaches the Wild Bunch story through client navigation and receives the semantic architecture in source order', async ({ page }) => {
  await page.goto('./projects/')
  await page.getByRole('link', { name: 'Wild Bunch', exact: true }).click()

  await expect(page).toHaveURL(/\/projects\/wild-bunch\/?$/)
  const determinism = page.getByRole('figure', { name: 'Controlled determinism from a compact world contract' })
  await expect(determinism.locator('ol > li')).toHaveText([
    /Directly packed world contract/,
    /Separate downstream choices/,
    /Deterministic derivation/,
    /Observable outcomes/,
  ])
  await expect(determinism).toContainText('00000000-0000-0000-0000-000000000000')

  const eventFlow = page.getByRole('figure', { name: 'Ordered event history from action to reconstruction' })
  await expect(eventFlow.locator('ol > li')).toHaveText([
    /Player action/,
    /Command and handler/,
    /GameSession aggregate/,
    /Typed domain event/,
    /Append-only event stream/,
    /Projection/,
    /Reconstruction/,
  ])
  await expect(eventFlow).toContainText('No message broker sits between these steps.')
})

test('Wild Bunch architecture figures retain their designed internal spacing', async ({ page }) => {
  await page.goto(wildBunchPath)

  for (const figureName of [
    'Controlled determinism from a compact world contract',
    'Ordered event history from action to reconstruction',
  ]) {
    const figure = page.getByRole('figure', { name: figureName })
    const padding = await figure.evaluate((element) => {
      const style = getComputedStyle(element)
      return [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft].map(Number.parseFloat)
    })

    expect(padding.every((value) => value >= 24)).toBe(true)
  }
})

test('Wild Bunch remains usable at narrow and zoom-proxy widths with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [390, 320, 360]) {
    await page.setViewportSize({ width, height: 844 })
    await page.goto(wildBunchPath)
    await expect(page.getByRole('heading', { level: 1, name: 'Wild Bunch' })).toBeVisible()
    await expect(page.getByText(/wrong name on the crime: yours/i)).toBeVisible()
    await expectNoHorizontalOverflow(page)

    if (width === 390) {
      const primaryNavigation = page.getByRole('navigation', { name: 'Primary' })
      const [projects, writing, patch, about] = await Promise.all(
        ['Projects', 'Writing', 'Patch', 'About'].map((name) => primaryNavigation.getByRole('link', { name, exact: true }).boundingBox()),
      )

      expect(projects).not.toBeNull()
      expect(writing).not.toBeNull()
      expect(patch).not.toBeNull()
      expect(about).not.toBeNull()
      expect(Math.abs(projects!.y - writing!.y)).toBeLessThan(1)
      expect(Math.abs(projects!.y - patch!.y)).toBeLessThan(1)
      expect(Math.abs(projects!.y - about!.y)).toBeLessThan(1)
    }
  }
})

test('Wild Bunch evidence exposes intrinsic image dimensions with one eager route-header hero and lazy body captures', async ({ page }) => {
  await page.goto(wildBunchPath)

  const hero = page.getByLabel('Wild Bunch generated-town development-build preview').getByRole('img')
  await expect(hero).toHaveAttribute('width', '720')
  await expect(hero).toHaveAttribute('height', '550')
  await expect(hero).toHaveAttribute('loading', 'eager')
  await expect(hero).toHaveAttribute('fetchpriority', 'high')

  const captures = page.locator('.wild-bunch-evidence img')
  await expect(captures).toHaveCount(4)
  for (const capture of await captures.all()) {
    await expect(capture).toHaveAttribute('loading', 'lazy')
    await expect(capture).toHaveAttribute('width', /^(640|720)$/)
    await expect(capture).toHaveAttribute('height', /^(489|550)$/)
  }
})

test('visitor opens Adventures of Patch with its production claim and a clear route to the stories', async ({ page }) => {
  const response = await page.goto(patchPath)

  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1, name: 'Adventures of Patch' })).toBeVisible()
  await expect(page.locator('.content-status')).toHaveText(/Status\s*active project/i)
  await expect(page.getByText('Visual stories that turn agentic-engineering practice into memorable, inspectable lessons, built through a controlled creative pipeline.')).toBeVisible()

  const publicRepository = page.getByRole('link', { name: 'Open the public Adventures of Patch repository' })
  await expect(publicRepository).toHaveAttribute('href', 'https://github.com/HarleyBartles/adventures-of-patch/tree/13bf77adc63cf5c8f49363cedd5dd392822b8375')

  const showcaseLink = page.getByRole('link', { name: 'Explore the Adventures of Patch' })
  await expect(showcaseLink).toHaveAttribute('href', '/portfolio/patch')
  await showcaseLink.focus()
  await expect(showcaseLink).toBeFocused()
  await expect(page.getByRole('heading', { name: 'Three worlds in motion' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'What Patch might teach next' })).toHaveCount(0)
  await expect(page.locator('button:disabled')).toHaveCount(0)
  await expect(page.locator('main')).not.toContainText(/PATCH-\d+|https?:\/\/linear\.app|[A-Z]:\\|localhost/i)
})

test('visitor reaches Adventures of Patch through client navigation and receives the ordered production system', async ({ page }) => {
  await page.goto('./projects/')
  await page.getByRole('link', { name: 'Adventures of Patch', exact: true }).click()

  await expect(page).toHaveURL(/\/projects\/adventures-of-patch\/?$/)
  const flow = page.getByRole('list', { name: 'Patch production flow' })
  await expect(flow.locator(':scope > li > h3')).toHaveText([
    'Seed',
    'Frame',
    'Visual pre-production',
    'Image generation and QA',
    'Deterministic compilation',
    'Published artefact and receipt',
  ])
  await expect(flow.locator(':scope > li')).toHaveCount(6)
  for (const stage of await flow.locator(':scope > li').all()) {
    await expect(stage.getByText('Stop condition')).toBeVisible()
  }
})

test('Adventures of Patch exposes intrinsic media dimensions with one eager hero and lazy evidence', async ({ page }) => {
  await page.goto(patchPath)

  const heroRegion = page.locator('[data-visual-contract="patch-case-study-hero"]')
  const hero = heroRegion.getByRole('img')
  await expect(hero).toHaveAttribute('width', '720')
  await expect(hero).toHaveAttribute('height', '403')
  await expect(hero).toHaveAttribute('loading', 'eager')
  await expect(hero).toHaveAttribute('fetchpriority', 'high')
  await expect(page.locator('main img[loading="eager"]')).toHaveCount(1)

  const desktopComposition = await heroRegion.evaluate((header) => {
    const visual = header.querySelector('.content-page-visual')!.getBoundingClientRect()
    const intro = header.querySelector('.content-page-intro')!.getBoundingClientRect()
    const bounds = header.getBoundingClientRect()
    return {
      visualWidthDelta: Math.abs(visual.width - bounds.width),
      introStart: (intro.x - bounds.x) / bounds.width,
    }
  })
  expect(desktopComposition.visualWidthDelta).toBeLessThanOrEqual(2)
  expect(desktopComposition.introStart).toBeGreaterThan(0.44)

  const evidence = page.locator('.patch-case-study img')
  await expect(evidence).toHaveCount(2)
  for (const image of await evidence.all()) {
    await expect(image).toHaveAttribute('loading', 'lazy')
    await expect(image).toHaveAttribute('width', /^\d+$/)
    await expect(image).toHaveAttribute('height', /^\d+$/)
  }
  await expect(page.locator('.patch-case-study figcaption')).toHaveCount(2)
})

test('Identity Emporium role kits share one deliberate image frame', async ({ page }) => {
  await page.goto('./patch/identity-emporium')

  const frames = page.locator('.identity-evidence__roles picture')
  const failureFrames = page.locator('.identity-evidence__failure-pair picture')
  await expect(frames).toHaveCount(4)
  await expect(failureFrames).toHaveCount(2)

  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 })

    const geometry = await frames.evaluateAll((elements) => elements.map((element) => {
      const bounds = element.getBoundingClientRect()
      const imageBounds = element.querySelector('img')?.getBoundingClientRect()

      return {
        backgroundColor: getComputedStyle(element).backgroundColor,
        height: bounds.height,
        imageContained: imageBounds !== undefined
          && imageBounds.left >= bounds.left
          && imageBounds.right <= bounds.right
          && imageBounds.top >= bounds.top
          && imageBounds.bottom <= bounds.bottom,
        width: bounds.width,
      }
    }))

    expect(new Set(geometry.map(({ backgroundColor }) => backgroundColor))).toEqual(new Set(['rgb(255, 255, 255)']))
    expect(Math.max(...geometry.map(({ width: frameWidth }) => frameWidth)) - Math.min(...geometry.map(({ width: frameWidth }) => frameWidth))).toBeLessThanOrEqual(1)
    expect(Math.max(...geometry.map(({ height }) => height)) - Math.min(...geometry.map(({ height }) => height))).toBeLessThanOrEqual(1)
    expect(geometry.every(({ imageContained }) => imageContained)).toBe(true)
    for (const frame of geometry) {
      expect(frame.width / frame.height).toBeCloseTo(4 / 5, 2)
    }

    const failureGeometry = await failureFrames.evaluateAll((elements) => elements.map((element) => ({
      backgroundColor: getComputedStyle(element).backgroundColor,
      height: element.getBoundingClientRect().height,
      width: element.getBoundingClientRect().width,
    })))
    expect(new Set(failureGeometry.map(({ backgroundColor }) => backgroundColor))).toEqual(new Set(['rgb(255, 255, 255)']))
    expect(Math.max(...failureGeometry.map(({ height }) => height)) - Math.min(...failureGeometry.map(({ height }) => height))).toBeLessThanOrEqual(2)
  }
})

test('Adventures of Patch remains complete at narrow and zoom-proxy widths with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const response = await page.goto(patchPath)
  expect(response?.status()).toBe(200)
  await page.evaluate(() => document.fonts.ready)

  for (const width of [390, 320, 360]) {
    await page.setViewportSize({ width, height: 844 })

    const hero = page.locator('[data-visual-contract="patch-case-study-hero"]')
    const heroImage = hero.getByRole('img')
    await expect(hero.getByRole('heading', { level: 1, name: 'Adventures of Patch' })).toBeVisible()
    await expect(hero.getByText(/controlled creative pipeline/i)).toBeVisible()
    await expect(heroImage).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const geometry = await heroImage.evaluate((image) => {
      const box = image.getBoundingClientRect()
      return {
        objectFit: getComputedStyle(image).objectFit,
        renderedRatio: box.width / box.height,
        intrinsicRatio: (image as HTMLImageElement).naturalWidth / (image as HTMLImageElement).naturalHeight,
      }
    })
    expect(geometry.objectFit).toBe('contain')
    expect(Math.abs(geometry.renderedRatio - geometry.intrinsicRatio)).toBeLessThan(0.02)

    for (const heading of [
      'The day the database disappeared',
      'The production system is the project',
      'The stories have their own home',
      'Controlled creative production',
    ]) {
      await expect(page.getByRole('heading', { level: 2, name: heading })).toBeAttached()
    }
  }
})

test('visitor opens the Learning Lab as an honest engineering-led curriculum case study', async ({ page }) => {
  const response = await page.goto(learningLabPath)

  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1, name: 'Agentic Learning Lab' })).toBeVisible()
  await expect(page.locator('.content-status')).toHaveText(/Status\s*incomplete/i)
  await expect(page.getByText(/The learner is not the agent's hands/)).toBeVisible()
  await expect(page.getByText(/I was a software engineer before I became an agentic engineer/)).toBeVisible()

  const loop = page.getByRole('figure', { name: 'The Learning Lab direction and verification loop' })
  await expect(loop.locator('li strong')).toHaveText([
    'Direct',
    'Agent works',
    'Inspect',
    'Verify',
    'Question',
    'Explain observable work',
    'Redirect',
  ])

  await expect(page.locator('.learning-atlas__module-copy strong')).toHaveText(learningLabModules)
  await expect(page.locator('.learning-atlas__module-copy small')).toHaveCount(19)
  await expect(page.locator('.learning-atlas__module-copy small', { hasText: 'Mature lab' })).toHaveCount(10)
  await expect(page.locator('.learning-atlas__module-copy small', { hasText: 'Roadmap module' })).toHaveCount(9)
  await expect(page.getByRole('heading', { name: 'Agentic Engineering 101: Zero to Hero' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Advanced Agentic Engineering: Mastering Agents' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Beyond the Agent: Engineering Agent Systems' })).toBeVisible()
  await expect(page.locator('.lab-promotion > ol > li')).toHaveCount(6)
  await expect(page.locator('.lab-anatomy__layers > section')).toHaveCount(3)
  await expect(page.locator('.representative-lab')).toHaveCount(3)
  expect(await page.locator('.representative-lab').evaluateAll((items) => items.map((item) => item.getAttribute('data-lab')))).toEqual(['3', '5', '7'])

  await expect(page.getByText(/I'm going to teach my brother a few things about using agentic AI/)).toHaveCount(1)
  await expect(page.getByText(/a love letter to my brother/)).toHaveCount(1)
  await expect(page.getByText(/First live delivery planned for late August 2026/)).toBeVisible()
  await expect(page.getByRole('link', { name: /View the public repository/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Inspect the integrity run/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Inspect the pinned curriculum shape/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Read the licence policy/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /CC BY 4.0 curriculum licence/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /MIT tooling licence/ })).toBeVisible()
  await expect(page.getByText(/tested with real learners/i)).toHaveCount(0)
})

test('visitor reaches the Learning Lab through client navigation with its semantic evidence intact', async ({ page }) => {
  await page.goto('./projects/')
  await page.getByRole('link', { name: 'Agentic Learning Lab', exact: true }).click()

  await expect(page).toHaveURL(/\/projects\/agentic-learning-lab\/?$/)
  await expect(page.getByRole('heading', { name: 'How a module earns maturity' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Three views of the same session' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'The judgment lives in the mechanics' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Safe enough to learn by breaking things' })).toBeVisible()
})

test('Learning Lab links and narrow layouts preserve an accessible complete argument', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(learningLabPath)

  for (const linkName of [
    'Inspect the pinned curriculum shape (opens in a new tab)',
    'View the public repository (opens in a new tab)',
    'Inspect the integrity run (opens in a new tab)',
    'Read the licence policy (opens in a new tab)',
    'CC BY 4.0 curriculum licence (opens in a new tab)',
    'MIT tooling licence (opens in a new tab)',
  ]) {
    await tabToLink(page, linkName)
    const link = page.getByRole('link', { name: linkName })
    await expect(link).toBeFocused()
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', /noopener/)
  }

  await page.setViewportSize({ width: 768, height: 900 })
  const heroBounds = await page.locator('[data-visual-contract="learning-lab-inspection-hero"]').boundingBox()
  expect(heroBounds).not.toBeNull()
  for (const stage of await page.locator('[data-visual-contract="learning-lab-inspection-hero"] .learning-loop__stage').all()) {
    const stageBounds = await stage.boundingBox()
    expect(stageBounds).not.toBeNull()
    expect(stageBounds!.y).toBeGreaterThanOrEqual(heroBounds!.y)
    expect(stageBounds!.y + stageBounds!.height).toBeLessThanOrEqual(heroBounds!.y + heroBounds!.height)
  }

  for (const width of [390, 320, 360]) {
    await page.setViewportSize({ width, height: 844 })
    await expectNoHorizontalOverflow(page)
    await expect(page.locator('.content-status')).toContainText('incomplete')
    await expect(page.locator('.learning-atlas__module-copy strong')).toHaveCount(19)
    for (const course of [
      'Agentic Engineering 101: Zero to Hero',
      'Advanced Agentic Engineering: Mastering Agents',
      'Beyond the Agent: Engineering Agent Systems',
    ]) await expect(page.getByRole('heading', { name: course })).toBeAttached()
  }

  await page.addStyleTag({ content: 'img { display: none !important; }' })
  await expect(page.getByText(/The learner is not the agent's hands/)).toBeAttached()
  await expect(page.locator('.representative-lab')).toHaveCount(3)
  await expect(page.getByText(/What is the blast radius/)).toBeAttached()
})

test('Learning Lab exposes intrinsic responsive media with one eager hero', async ({ page }) => {
  await page.goto(learningLabPath)

  const hero = page.locator('[data-visual-contract="learning-lab-case-study-hero"] img')
  await expect(hero).toHaveAttribute('width', '720')
  await expect(hero).toHaveAttribute('height', '450')
  await expect(hero).toHaveAttribute('loading', 'eager')
  await expect(hero).toHaveAttribute('fetchpriority', 'high')
  await expect(page.locator('main img[loading="eager"]')).toHaveCount(1)

  const bodyImages = page.locator('.learning-lab-case-study img')
  await expect(bodyImages).toHaveCount(2)
  for (const image of await bodyImages.all()) {
    await expect(image).toHaveAttribute('loading', 'lazy')
    await expect(image).toHaveAttribute('decoding', 'async')
    await expect(image).toHaveAttribute('width', '720')
    await expect(image).toHaveAttribute('height', /^(461|540)$/)
  }
})

test('visitor opens the Marketplace case study without horizontal overflow', async ({ page }) => {
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 })
    const response = await page.goto('./projects/codex-marketplace/')
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1, name: 'Agent Asset Marketplace' })).toBeVisible()
    await expect(page.getByText('Shared where reuse earns it. Local where context matters.')).toBeVisible()
    await expect(page.getByRole('figure', { name: /Selective distribution map/ })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Marketplace repository' })).toBeVisible()
    await expect(page.getByText('Marketplace source')).toBeVisible()
    await expect(page.getByText('Wild Bunch')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  }
})

test('visitor reaches the Marketplace story from the project index with accessible evidence', async ({ page }) => {
  await page.goto('./projects/')
  await page.getByRole('link', { name: 'Agent Asset Marketplace', exact: true }).click()

  await expect(page).toHaveURL(/\/projects\/codex-marketplace\/?$/)
  await expect(page.locator('[data-visual-contract="marketplace-case-study-hero"]')).toBeVisible()
  const evidenceLink = page.getByRole('link', { name: 'Marketplace repository' })
  await evidenceLink.focus()
  await expect(evidenceLink).toBeFocused()
  await expect(page.getByRole('figure', { name: /Selective distribution map/ })).toBeVisible()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.getByText('Shared where reuse earns it. Local where context matters.')).toBeVisible()
  // A 360px CSS viewport is the reliable automated proxy for 200% browser zoom.
  await page.setViewportSize({ width: 360, height: 844 })
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
})

test('visitor receives a useful page state when a content slug is missing', async ({ page }) => {
  await page.goto('./projects/missing-story')

  await expect(page).toHaveTitle('Page Not Found | Harley Bartles')
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible()
  await expect(page.getByText('This portfolio story is not available.', { exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Return to the homepage' })).toHaveAttribute('href', '/portfolio/')
})

test('sibling case studies share one evidence-caption treatment', async ({ page }) => {
  const captionSignature = async (selector: string) => {
    await page.locator(selector).first().waitFor({ state: 'visible' })
    return page.locator(selector).evaluateAll((captions) => captions.map((caption) => {
      const style = getComputedStyle(caption)
      return {
        backgroundColor: style.backgroundColor,
        color: style.color,
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        padding: [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft],
      }
    }))
  }

  await page.goto(wildBunchPath)
  const wildBunchCaptions = await captionSignature('.wild-bunch-evidence figcaption')

  await page.goto(patchPath)
  const patchCaptions = await captionSignature('.patch-evidence-figure figcaption, .patch-world figcaption, .patch-published-gallery figcaption')

  expect(wildBunchCaptions.length).toBeGreaterThan(0)
  expect(patchCaptions.length).toBeGreaterThan(0)
  expect(new Set(wildBunchCaptions.map(JSON.stringify)).size).toBe(1)
  expect(new Set(patchCaptions.map(JSON.stringify)).size).toBe(1)
  expect(patchCaptions[0]).toEqual(wildBunchCaptions[0])
})

test('case-study insets punctuate the body without becoming opening furniture', async ({ page }) => {
  const calloutSignature = async () => page.locator('.case-study-callout').evaluate((callout) => {
    const style = getComputedStyle(callout)
    return {
      borderLeftWidth: style.borderLeftWidth,
      fontFamily: style.fontFamily,
      paddingLeft: style.paddingLeft,
    }
  })

  await page.goto('./projects/codex-marketplace/')
  await expect(page.locator('.case-study-callout')).toHaveCount(1)
  await expect(page.locator('.marketplace-case-study > .case-study-callout')).toHaveCount(1)
  expect(await page.locator('.case-study-callout').evaluate((callout) => callout.previousElementSibling?.tagName)).toBe('SECTION')
  const marketplaceCallout = await calloutSignature()

  await page.goto(patchPath)
  await expect(page.locator('.case-study-callout')).toHaveCount(1)
  await expect(page.locator('.patch-case-study > .case-study-callout')).toHaveCount(1)
  expect(await page.locator('.case-study-callout').evaluate((callout) => callout.previousElementSibling?.className)).toBe('patch-movement patch-first-deck')
  const patchCallout = await calloutSignature()

  expect(patchCallout).toEqual(marketplaceCallout)
  await expect(page.locator('.patch-case-study > .patch-thesis')).toHaveCount(0)
})

test('Adventures of Patch earns attention with the database story before project state', async ({ page }) => {
  await page.goto(patchPath)
  await page.getByRole('heading', { name: 'The day the database disappeared', exact: true }).waitFor({ state: 'visible' })

  const movements = await page.locator('.patch-case-study > section').evaluateAll((sections) => sections.map((section) => section.className))

  expect(movements.slice(0, 4)).toEqual([
    'patch-movement patch-origin',
    'patch-movement patch-first-deck',
    'patch-snapshot',
    'patch-movement patch-frame-gate',
  ])
  await expect(page.locator('.patch-case-study > .patch-thesis')).toHaveCount(0)
})
