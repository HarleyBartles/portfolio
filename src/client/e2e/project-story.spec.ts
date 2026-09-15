import { expect, test } from '@playwright/test'

const wildBunchPath = './projects/wild-bunch/'
const patchPath = './projects/adventures-of-patch/'
const learningLabPath = './projects/agentic-learning-lab/'
const specialistsCanonicalPath = './patch/the-usual-specialists/'
const specialistsPreviewPath = './patch/the-usual-specialists/next/'

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
  'Retrospective: how this repo was built',
] as const

const expectNoHorizontalOverflow = async (page: import('@playwright/test').Page): Promise<void> => {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
}

const tabToLink = async (page: import('@playwright/test').Page, linkName: string): Promise<void> => {
  const link = page.getByRole('link', { name: linkName, exact: true })
  for (let press = 0; press < 30; press += 1) {
    await page.keyboard.press('Tab')
    if (await link.evaluate((element) => element === document.activeElement)) return
  }
  throw new Error(`Keyboard traversal did not reach ${linkName}`)
}

test('project header keeps its first-paint geometry while the visual chunk is pending', async ({ page }) => {
  let releaseVisual: (() => void) | undefined
  const visualReady = new Promise<void>((resolve) => {
    releaseVisual = resolve
  })

  await page.route('**/*ProjectVisual-*.js', async (route) => {
    const response = await route.fetch()
    await visualReady
    await route.fulfill({ response })
  })

  const navigation = page.goto(wildBunchPath)
  const header = page.locator('[data-visual-contract="wild-bunch-case-study-hero"]')
  await expect(header).toBeVisible()
  await expect(page.locator('[data-loading="project-visual"]')).toBeVisible()

  const geometry = await header.evaluate((element) => {
    const style = getComputedStyle(element)
    const intro = element.querySelector('[data-project-case-study-intro]')
    return {
      display: style.display,
      borderBottomWidth: style.borderBottomWidth,
      paddingBottom: style.paddingBottom,
      introPosition: intro === null ? null : getComputedStyle(intro).position,
    }
  })

  expect(geometry).toEqual({
    display: 'block',
    borderBottomWidth: '0px',
    paddingBottom: '0px',
    introPosition: 'absolute',
  })

  releaseVisual?.()
  await navigation
  await expect(header.getByRole('img', { name: /Concept art of a lone rider entering/i })).toBeVisible()
})

test('direct route loads keep case-study presentation chunks isolated', async ({ context }) => {
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
    { path: './patch/identity-emporium/', heading: 'Identity Emporium', chunk: 'IdentityEmporiumPage', siblings: ['TournamentPage', 'LegacyUsualSpecialistsPage', 'UsualSpecialistsPage'] },
    { path: './patch/tournament-of-reasonable-defaults/', heading: 'Tournament of Reasonable Defaults', chunk: 'TournamentPage', siblings: ['IdentityEmporiumPage', 'LegacyUsualSpecialistsPage', 'UsualSpecialistsPage'] },
    { path: specialistsCanonicalPath, heading: 'The Usual Specialists', chunk: 'LegacyUsualSpecialistsPage', siblings: ['IdentityEmporiumPage', 'TournamentPage', 'UsualSpecialistsPage'] },
    { path: specialistsPreviewPath, heading: 'The Usual Specialists', chunk: 'UsualSpecialistsPage', siblings: ['IdentityEmporiumPage', 'TournamentPage', 'LegacyUsualSpecialistsPage'] },
  ] as const

  for (const route of routes) {
    const page = await context.newPage()
    const requested: string[] = []
    page.on('request', (request) => requested.push(request.url()))
    await page.goto(route.path)
    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible()

    if (route.chunk !== null) expect(requestedChunk(requested, route.chunk)).toBe(true)
    for (const sibling of route.siblings) expect(requestedChunk(requested, sibling)).toBe(false)
    await page.close()
  }
})

test('The Usual Specialists preserves the accepted Index composition across authored responsive bands', async ({ page }) => {
  const specialistsPath = specialistsPreviewPath
  const widths = [2560, 1921, 1920, 1600, 1599, 1440, 1401, 1400, 1399, 900, 899, 768, 720, 719, 621, 620, 390, 389, 320] as const
  const traversal = (name: string) => page.locator(`[data-index-traversal="${name}"]`)
  const box = async (locator: import('@playwright/test').Locator) => {
    const value = await locator.boundingBox()
    expect(value).not.toBeNull()
    return value!
  }
  const expectInsideViewport = async (locator: import('@playwright/test').Locator, width: number, label: string) => {
    const bounds = await box(locator)
    expect(bounds.x, JSON.stringify({ width, label, bounds })).toBeGreaterThanOrEqual(-1)
    expect(bounds.x + bounds.width, JSON.stringify({ width, label, bounds })).toBeLessThanOrEqual(width + 1)
  }
  const expectVisibleTraversal = async (names: readonly string[]) => {
    for (const name of names) await expect(traversal(name)).toBeVisible()
  }
  const expectHiddenTraversal = async (names: readonly string[]) => {
    for (const name of names) await expect(traversal(name)).toBeHidden()
  }

  for (const width of widths) {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPath)

    const heading = page.getByRole('heading', { level: 1, name: 'The Usual Specialists' })
    const index = page.getByRole('region', { name: 'Index' })
    await expect(heading).toBeVisible()
    await expect(index).toBeVisible()
    const storySurface = await page.locator('[data-visual-contract="patch-usual-specialists-index-draft"]').evaluate((element) => {
      const probe = document.createElement('div')
      probe.style.backgroundColor = 'var(--color-interior-canvas)'
      element.appendChild(probe)
      const result = {
        actual: getComputedStyle(element).backgroundColor,
        expected: getComputedStyle(probe).backgroundColor,
      }
      probe.remove()
      return result
    })
    expect(storySurface.actual, JSON.stringify({ width, storySurface })).toBe(storySurface.expected)
    await expectNoHorizontalOverflow(page)
    await expectInsideViewport(page.locator('[data-index-story-card]'), width, 'story-card')
    await expectInsideViewport(page.locator('[data-index-lockup]'), width, 'index-lockup')

    expect(await heading.evaluate((element, indexElement) => (
      element.compareDocumentPosition(indexElement as Node) & Node.DOCUMENT_POSITION_FOLLOWING
    ) !== 0, await index.elementHandle())).toBe(true)
    await expect(page.locator('[data-specialist-chapter="silk"]')).toBeVisible()
    await expect(page.locator('[data-specialist-chapter="writ"], [data-specialist-chapter="klause"], [data-specialist-chapter="rollback"], [data-specialist-chapter="receipt"]')).toHaveCount(0)

    if (width < 720) {
      await expectVisibleTraversal(['index-high-step', 'patch-follow'])
      await expectHiddenTraversal(['index-walk', 'index-inspect', 'patch-peer', 'index-return', 'patch-return'])
    } else if (width < 1600) {
      await expectVisibleTraversal(['index-walk', 'index-inspect', 'patch-follow', 'patch-peer'])
      await expectHiddenTraversal(['index-high-step', 'index-return', 'patch-return'])
    } else {
      await expectVisibleTraversal(['index-walk', 'index-inspect', 'patch-follow', 'patch-peer', 'index-return', 'patch-return'])
      await expectHiddenTraversal(['index-high-step'])
    }
  }

  for (const width of [899, 768] as const) {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPath)
    const indexInspect = await box(traversal('index-inspect'))
    const patchPeer = await box(traversal('patch-peer'))
    expect(Math.abs((indexInspect.y + indexInspect.height) - (patchPeer.y + patchPeer.height))).toBeLessThanOrEqual(16)
  }

  for (const width of [719, 390] as const) {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPath)
    const carrier = await box(page.locator('[data-index-substrate="blue-carrier"]'))
    for (const name of ['index-high-step', 'patch-follow'] as const) {
      const figure = await box(traversal(name))
      const centre = { x: figure.x + figure.width / 2, y: figure.y + figure.height / 2 }
      expect(centre.x).toBeGreaterThanOrEqual(carrier.x)
      expect(centre.x).toBeLessThanOrEqual(carrier.x + carrier.width)
      expect(centre.y).toBeGreaterThanOrEqual(carrier.y)
      expect(centre.y).toBeLessThanOrEqual(carrier.y + carrier.height)
    }
  }
})

test('The Usual Specialists authors the opening to Index lock in three responsive treatments beneath the chapter nav', async ({ page }) => {
  const widths = [389, 390, 719, 720, 899, 900, 1399, 1400, 2560, 2561] as const

  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 390 ? 844 : 1100 })
    await page.goto(specialistsPreviewPath)

    const openingCrossing = page.locator('[data-specialists-chapter-crossing="opening-index"]')
    const lockPlacement = openingCrossing.locator('[data-specialists-crossing-lock-placement="opening-index"]')
    const nav = page.locator('[data-specialists-chapter-nav]')
    const openingRope = page.locator('[data-specialists-rope-piece="opening"]')
    const indexRope = page.locator('[data-specialists-rope-piece="index"]')

    for (const locator of [lockPlacement, nav, openingRope, indexRope]) {
      await expect(locator).toBeVisible()
    }

    const geometry = await page.evaluate(() => {
      const placement = (piece: string) => document.querySelector<HTMLElement>(`[data-specialists-rope-piece="${piece}"]`)!
      const image = (piece: string) => Array.from(placement(piece).querySelectorAll<HTMLImageElement>('img'))
        .find((candidate) => candidate.getClientRects().length > 0)!
      const point = (piece: string, xRatio: number, yRatio: number) => {
        const marker = document.createElement('span')
        marker.style.position = 'absolute'
        marker.style.left = `${xRatio * 100}%`
        marker.style.top = `${yRatio * 100}%`
        marker.style.width = '1px'
        marker.style.height = '1px'
        placement(piece).append(marker)
        const box = marker.getBoundingClientRect()
        marker.remove()
        return { x: box.left + box.width / 2, y: box.top + box.height / 2 }
      }
      const openingCrossing = document.querySelector<HTMLElement>('[data-specialists-chapter-crossing="opening-index"]')!
      const openingLock = document.querySelector<HTMLElement>('[data-specialists-crossing-lock-placement="opening-index"]')!
      const openingLockStyle = getComputedStyle(openingLock)
      const transform = new DOMMatrixReadOnly(openingLockStyle.transform)
      const indexVariant = image('index').dataset.specialistsRopeVariant
      const indexEntryRatio = indexVariant === 'taut-bow' ? 282.5 / 724 : 362.5 / 724
      const navElement = document.querySelector<HTMLElement>('[data-specialists-chapter-nav]')!
      const indexRopeElement = placement('index')

      return {
        crossingWidth: openingCrossing.getBoundingClientRect().width,
        lockLeftPx: Number.parseFloat(openingLockStyle.left),
        openingExit: point('opening', 362.5 / 724, 1),
        indexEntry: point('index', indexEntryRatio, 0),
        rotationDeg: Math.atan2(transform.b, transform.a) * (180 / Math.PI),
        scale: Math.hypot(transform.a, transform.b),
        layers: {
          nav: Number.parseInt(getComputedStyle(navElement).zIndex, 10),
          lock: Number.parseInt(getComputedStyle(openingLock).zIndex, 10),
          indexRope: Number.parseInt(getComputedStyle(indexRopeElement).zIndex, 10),
        },
      }
    })

    expect(
      Math.hypot(geometry.openingExit.x - geometry.indexEntry.x, geometry.openingExit.y - geometry.indexEntry.y),
      JSON.stringify({ width, geometry }),
    ).toBeLessThanOrEqual(18)
    expect(geometry.layers.nav, JSON.stringify({ width, geometry })).toBeGreaterThan(geometry.layers.lock)
    expect(geometry.layers.lock, JSON.stringify({ width, geometry })).toBeGreaterThan(geometry.layers.indexRope)

    const expected = width < 720
      ? { leftPx: geometry.crossingWidth * 0.08 + 5, rotationDeg: 10, scale: 0.7 }
      : width >= 1400
        ? { leftPx: 170, rotationDeg: 4, scale: 0.9 }
        : { leftPx: geometry.crossingWidth * 0.11 + 6, rotationDeg: 8, scale: 0.75 }
    expect(Math.abs(geometry.lockLeftPx - expected.leftPx), JSON.stringify({ width, geometry })).toBeLessThanOrEqual(0.05)
    expect(Math.abs(geometry.rotationDeg - expected.rotationDeg), JSON.stringify({ width, geometry })).toBeLessThanOrEqual(0.05)
    expect(Math.abs(geometry.scale - expected.scale), JSON.stringify({ width, geometry })).toBeLessThanOrEqual(0.005)
  }
})

test('The Usual Specialists keeps the accepted rope-start anchor treatment across its authored scale bands', async ({ page }) => {
  for (const width of [389, 390, 899, 900] as const) {
    await page.setViewportSize({ width, height: width < 390 ? 844 : 1100 })
    await page.goto(specialistsPreviewPath)

    const placement = page.locator('[data-specialists-rope-anchor="opening-start"]')
    const anchor = placement.locator('[data-specialists-rope-start-anchor]')
    const image = anchor.locator('[data-specialists-rope-start-anchor-image]')

    await expect(placement).toBeVisible()
    await expect(anchor).toBeVisible()
    await expect(image).toBeVisible()

    const geometry = await placement.evaluate((element) => {
      const style = getComputedStyle(element)
      const transform = new DOMMatrixReadOnly(style.transform)
      return {
        rotationDeg: Math.atan2(transform.b, transform.a) * (180 / Math.PI),
        scale: Math.hypot(transform.a, transform.b),
      }
    })

    const expectedScale = width < 390 ? 0.5 : width < 900 ? 0.55 : 0.65
    expect(Math.abs(geometry.rotationDeg - 5.5), JSON.stringify({ width, geometry })).toBeLessThanOrEqual(0.05)
    expect(Math.abs(geometry.scale - expectedScale), JSON.stringify({ width, geometry })).toBeLessThanOrEqual(0.005)
    await expect(image).toHaveAttribute('src', /opening-rope-start-anchor\.webp$/)
  }
})

test('The Usual Specialists keeps Silk as apertures through the mineral page across authored responsive bands', async ({ page }) => {
  const specialistsPath = specialistsPreviewPath
  const box = async (locator: import('@playwright/test').Locator) => {
    await expect(locator).toBeVisible()
    const value = await locator.boundingBox()
    expect(value).not.toBeNull()
    return value!
  }
  for (const width of [2880, 2561, 2560, 1920, 1600, 1440, 900, 899, 768, 720, 719, 390, 389, 320] as const) {
    await page.setViewportSize({ width, height: width < 390 ? 844 : 1100 })
    await page.goto(specialistsPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    await expect(silk).toBeVisible()
    const stage = await box(silk.locator('[data-silk-stage]'))
    const nameMark = await box(silk.locator('[data-silk-name-mark]'))
    const commission05 = await box(silk.locator('[data-silk-commission="05"]'))
    const story = await box(silk.locator('[data-silk-story-card]'))
    const traversal = await box(silk.locator('[data-silk-commission="06"]'))
    const commission07 = await box(silk.locator('[data-silk-commission="07"]'))
    const receipt = await box(silk.locator('[data-silk-receipt-peekthrough]'))
    const commission08 = await box(silk.locator('[data-silk-commission="08"]'))
    const commission09 = await box(silk.locator('[data-silk-commission="09"]'))
    const commission05Composition = silk.locator('[data-silk-commission="05"] [data-silk-aperture-composition]')
    const commission05Frame = commission05Composition.locator('[data-silk-commission-05-frame]')
    const commission05PortraitFrame = commission05Composition.locator('[data-silk-commission-05-portrait-frame]')
    const commission07Composition = silk.locator('[data-silk-commission="07"] [data-silk-aperture-composition]')
    const commission07Frame = commission07Composition.locator('[data-silk-commission-07-review-frame]')
    const commission07PortraitFrame = commission07Composition.locator('[data-silk-commission-07-review-portrait-frame]')
    const commission07Viewport = commission07Composition.locator('[data-silk-commission-07-review-viewport]')
    const commission07ViewportDiagnostic = commission07Composition.locator('[data-silk-aperture-viewport-diagnostic]')
    const reactionComposition = silk.locator('[data-silk-commission="08"] [data-silk-reaction-frame-composition]')
    const reactionFrame = reactionComposition.locator('[data-silk-commission-08-review-frame]')
    const reactionViewport = reactionComposition.locator('[data-silk-commission-08-review-viewport]')

    await expectNoHorizontalOverflow(page)
    await expect(commission05Composition).toBeVisible()
    const commission05CompositionBox = await box(commission05Composition)
    await expect(commission05Composition).toHaveAttribute('data-silk-aperture-composition-variant', 'commission-05')
    await expect(commission07Composition).toBeVisible()
    await expect(commission07Composition).toHaveAttribute('data-silk-aperture-composition-variant', 'commission-07-review')
    await expect(reactionComposition).toBeVisible()
    await expect(reactionFrame).toHaveAttribute('src', /silk-commission-08-reaction-frame-review\.webp$/)
    const reactionCompositionBox = await box(reactionComposition)
    const reactionFrameBox = await box(reactionFrame)
    const reactionViewportBox = await box(reactionViewport)
    expect(reactionFrameBox.x, JSON.stringify({ width, reactionFrameBox, reactionCompositionBox }))
      .toBeCloseTo(reactionCompositionBox.x, 0)
    expect(reactionFrameBox.width, JSON.stringify({ width, reactionFrameBox, reactionCompositionBox }))
      .toBeCloseTo(reactionCompositionBox.width, 0)
    expect(reactionViewportBox.x, JSON.stringify({ width, reactionViewportBox, reactionFrameBox }))
      .toBeGreaterThan(reactionFrameBox.x)
    expect(reactionViewportBox.x + reactionViewportBox.width, JSON.stringify({ width, reactionViewportBox, reactionFrameBox }))
      .toBeLessThan(reactionFrameBox.x + reactionFrameBox.width)

    const expectedCommission05Ratio = width < 390 ? 1024 / 1536 : 1672 / 941
    expect(
      Math.abs((commission05CompositionBox.width / commission05CompositionBox.height) - expectedCommission05Ratio),
      JSON.stringify({ width, commission05CompositionBox, expectedCommission05Ratio }),
    ).toBeLessThanOrEqual(0.01)
    expect(commission05.y, JSON.stringify({ width, commission05, stage })).toBeGreaterThanOrEqual(stage.y)
    if (width < 390) {
      expect(Math.abs(commission05.x), JSON.stringify({ width, commission05, stage })).toBeLessThanOrEqual(1)
      expect(
        Math.abs((commission05.x + commission05.width) - width),
        JSON.stringify({ width, commission05, stage }),
      ).toBeLessThanOrEqual(1)
      const portraitFrame = await box(commission05PortraitFrame)
      expect(commission05CompositionBox.x, JSON.stringify({ width, commission05CompositionBox, commission05 }))
        .toBeLessThanOrEqual(commission05.x - 20)
      expect(
        commission05CompositionBox.x + commission05CompositionBox.width,
        JSON.stringify({ width, commission05CompositionBox, commission05 }),
      ).toBeGreaterThanOrEqual(commission05.x + commission05.width + 20)
      expect(
        portraitFrame.y,
        JSON.stringify({ width, portraitFrame, commission05CompositionBox }),
      ).toBeGreaterThanOrEqual(commission05CompositionBox.y - 1)
      expect(
        portraitFrame.y + portraitFrame.height,
        JSON.stringify({ width, portraitFrame, commission05CompositionBox }),
      ).toBeLessThanOrEqual(commission05CompositionBox.y + commission05CompositionBox.height + 1)
      expect(Math.abs(portraitFrame.x - commission05CompositionBox.x)).toBeLessThanOrEqual(1)
      expect(Math.abs(portraitFrame.width - commission05CompositionBox.width)).toBeLessThanOrEqual(1)
    } else {
      expect(commission05.x, JSON.stringify({ width, commission05, stage })).toBeGreaterThanOrEqual(stage.x)
      // Above the compact band the authored 17% placement deliberately lets the
      // first aperture overscan the stage on the right; the chapter owns clipping.
      if (width < 720) {
        const landscapeFrame = await box(commission05Frame)
        expect(
          commission05CompositionBox.x,
          JSON.stringify({ width, commission05CompositionBox, commission05 }),
        ).toBeLessThanOrEqual(commission05.x - 20)
        expect(
          commission05CompositionBox.x + commission05CompositionBox.width,
          JSON.stringify({ width, commission05CompositionBox, commission05 }),
        ).toBeGreaterThanOrEqual(commission05.x + commission05.width + 20)
        expect(
          landscapeFrame.y,
          JSON.stringify({ width, landscapeFrame, commission05CompositionBox }),
        ).toBeGreaterThanOrEqual(commission05CompositionBox.y - 1)
        expect(
          landscapeFrame.y + landscapeFrame.height,
          JSON.stringify({ width, landscapeFrame, commission05CompositionBox }),
        ).toBeLessThanOrEqual(commission05CompositionBox.y + commission05CompositionBox.height + 1)
        expect(Math.abs(landscapeFrame.x - commission05CompositionBox.x)).toBeLessThanOrEqual(1)
        expect(Math.abs(landscapeFrame.width - commission05CompositionBox.width)).toBeLessThanOrEqual(1)
      }
    }
    const commission07CompositionBox = await box(commission07Composition)
    const commission07FrameBox = await box(width < 390 ? commission07PortraitFrame : commission07Frame)
    const commission07ViewportBox = await box(commission07Viewport)
    const expectedCommission07Ratio = width < 390 ? 941 / 1671 : 1671 / 941
    expect(
      Math.abs((commission07CompositionBox.width / commission07CompositionBox.height) - expectedCommission07Ratio),
      JSON.stringify({ width, commission07CompositionBox, expectedCommission07Ratio }),
    ).toBeLessThanOrEqual(0.01)
    if (width >= 390) {
      expect(Math.abs(commission07FrameBox.x - commission07CompositionBox.x)).toBeLessThanOrEqual(1)
      expect(Math.abs(commission07FrameBox.y - commission07CompositionBox.y)).toBeLessThanOrEqual(1)
      expect(Math.abs(commission07FrameBox.width - commission07CompositionBox.width)).toBeLessThanOrEqual(1)
      expect(Math.abs(commission07FrameBox.height - commission07CompositionBox.height)).toBeLessThanOrEqual(1)
      const expectedCommission07Viewport = {
        x: commission07CompositionBox.x + ((112 / 1671) * commission07CompositionBox.width),
        y: commission07CompositionBox.y + ((166 / 941) * commission07CompositionBox.height),
        width: (1410 / 1671) * commission07CompositionBox.width,
        height: (646 / 941) * commission07CompositionBox.height,
      }
      expect(Math.abs(commission07ViewportBox.x - expectedCommission07Viewport.x)).toBeLessThanOrEqual(1)
      expect(Math.abs(commission07ViewportBox.y - expectedCommission07Viewport.y)).toBeLessThanOrEqual(1)
      expect(Math.abs(commission07ViewportBox.width - expectedCommission07Viewport.width)).toBeLessThanOrEqual(1)
      expect(Math.abs(commission07ViewportBox.height - expectedCommission07Viewport.height)).toBeLessThanOrEqual(1)
    }
    await expect(commission07ViewportDiagnostic).toBeVisible()
    const diagnosticStack = await commission07Composition.evaluate((element) => {
      const frame = element.querySelector<HTMLElement>('[data-silk-commission-07-review-frame]')
      const viewport = element.querySelector<HTMLElement>('[data-silk-commission-07-review-viewport]')
      const viewportDiagnostic = element.querySelector<HTMLElement>('[data-silk-aperture-viewport-diagnostic]')
      return {
        frameZ: Number.parseInt(frame === null ? '0' : getComputedStyle(frame).zIndex, 10),
        viewportZ: Number.parseInt(viewport === null ? '0' : getComputedStyle(viewport).zIndex, 10),
        viewportDiagnosticZ: Number.parseInt(viewportDiagnostic === null ? '0' : getComputedStyle(viewportDiagnostic).zIndex, 10),
        viewportDiagnosticBorder: viewportDiagnostic === null ? '' : getComputedStyle(viewportDiagnostic).borderTopWidth,
      }
    })
    expect(diagnosticStack.frameZ).toBeGreaterThan(diagnosticStack.viewportZ)
    expect(diagnosticStack.viewportDiagnosticZ).toBeGreaterThan(0)
    expect(diagnosticStack.viewportDiagnosticBorder).toBe('2px')
    expect(commission07.y, JSON.stringify({ width, commission07, commission05 })).toBeGreaterThan(commission05.y)
    expect(traversal.y, JSON.stringify({ width, traversal, commission05 })).toBeGreaterThan(commission05.y)
    expect(traversal.y, JSON.stringify({ width, traversal, commission05 })).toBeLessThan(commission05.y + commission05.height)
    if (width < 390) {
      // The portrait treatment is deliberately taller than the landscape frame.
      // Keep Commission 06 overlapping the aperture without forcing it through the old bottom edge.
      expect(
        traversal.y + traversal.height,
        JSON.stringify({ width, traversal, commission05 }),
      ).toBeGreaterThanOrEqual(commission05.y + commission05.height - 40)
    } else {
      expect(traversal.y + traversal.height, JSON.stringify({ width, traversal, commission05 })).toBeGreaterThan(commission05.y + commission05.height)
    }
    if (width >= 1800) {
      expect(story.y, JSON.stringify({ width, story, commission05 })).toBeGreaterThan(commission05.y)
    } else if (width >= 1200) {
      expect(story.y, JSON.stringify({ width, story, commission05 })).toBeLessThan(commission05.y)
    }
    expect(nameMark.y, JSON.stringify({ width, nameMark, stage })).toBeGreaterThanOrEqual(stage.y)
    if (width >= 1200) {
      expect(receipt.y, JSON.stringify({ width, receipt, commission07 })).toBeGreaterThan(commission07.y)
      if (width < 1500 || width >= 1920) {
        expect(commission09.y, JSON.stringify({ width, commission08, commission09 })).toBeGreaterThan(commission08.y)
      }
      expect(commission08.height, JSON.stringify({ width, commission08, commission09 })).toBeLessThan(commission09.height)
      expect(commission09.y + commission09.height).toBeLessThanOrEqual(stage.y + stage.height + 1)
    }
  }
})

test('The Usual Specialists holds the 1920 Silk treatment from 1200 then interpolates to the 2560 ceiling and freezes above it', async ({ page }) => {
  const interpolate = (from: number, to: number, width: number) => {
    const clampedWidth = Math.min(2560, Math.max(1920, width))
    return from + ((to - from) * ((clampedWidth - 1920) / 640))
  }

  for (const width of [1200, 1280, 1399, 1400, 1499, 1500, 1600, 1799, 1800, 1919, 1920, 2160, 2330, 2400, 2560, 2561, 2880] as const) {
    await page.setViewportSize({ width, height: 1648 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const box = async (locator: import('@playwright/test').Locator) => {
      await expect(locator).toBeVisible()
      const value = await locator.boundingBox()
      expect(value).not.toBeNull()
      return value!
    }
    const centreX = (value: { x: number; width: number }) => value.x + value.width / 2

    const canvas = await box(page.locator('[data-specialists-canvas="authored"]'))
    const nameMark = await box(silk.locator('[data-silk-name-mark]'))
    const aperture1 = await box(silk.locator('[data-silk-commission="05"] [data-silk-aperture-composition]'))
    const story = await box(silk.locator('[data-silk-story-card]'))
    const traversal = await box(silk.locator('[data-silk-commission="06"]'))
    const aperture2 = await box(silk.locator('[data-silk-commission="07"] [data-silk-aperture-composition]'))
    const receipt = await box(silk.locator('[data-silk-receipt-peekthrough]'))
    const reaction = await box(silk.locator('[data-silk-commission="08"]'))
    const handoff = await box(silk.locator('[data-silk-commission="09"]'))
    const ropeX = await silk.locator('[data-silk-rope-axis]').evaluate((element) => element.getBoundingClientRect().left)
    const traversalLeft = await silk.locator('[data-silk-commission="06"]').evaluate((element) => Number.parseFloat(getComputedStyle(element).left))
    const receiptStyles = await silk.locator('[data-silk-receipt-peekthrough]').evaluate((element) => {
      const styles = getComputedStyle(element)
      const matrix = new DOMMatrix(styles.transform)
      return {
        left: Number.parseFloat(styles.left),
        right: Number.parseFloat(styles.right),
        width: Number.parseFloat(styles.width),
        height: Number.parseFloat(styles.height),
        scale: Math.hypot(matrix.a, matrix.b),
        zIndex: Number.parseInt(styles.zIndex, 10),
      }
    })
    const storyTop = await silk.locator('[data-silk-story-card]').evaluate((element) => Number.parseFloat(getComputedStyle(element).top))
    const handoffRight = await silk.locator('[data-silk-commission="09"]').evaluate((element) => Number.parseFloat(getComputedStyle(element).right))
    const lowerTop = await Promise.all([
      silk.locator('[data-silk-commission="07"]'),
      silk.locator('[data-silk-receipt-peekthrough]'),
      silk.locator('[data-silk-commission="08"]'),
      silk.locator('[data-silk-commission="09"]'),
    ].map((locator) => locator.evaluate((element) => Number.parseFloat(getComputedStyle(element).top))))
    const reactionStyles = await silk.locator('[data-silk-commission="08"]').evaluate((element) => {
      const styles = getComputedStyle(element)
      return {
        left: Number.parseFloat(styles.left),
        right: Number.parseFloat(styles.right),
        zIndex: Number.parseInt(styles.zIndex, 10),
      }
    })
    const handoffZIndex = await silk.locator('[data-silk-commission="09"]').evaluate((element) => Number.parseInt(getComputedStyle(element).zIndex, 10))
    const ropeZIndex = await silk.locator('[data-silk-traversal-composition]').evaluate((element) => Number.parseInt(getComputedStyle(element).zIndex, 10))

    expect(canvas.width).toBeCloseTo(Math.min(width, 2560), 0)
    const upperShift = width < 1400
      ? ((0.221358 * width) + 13) - 329.2
      : 0
    expect(nameMark.width).toBeCloseTo(440, 0)
    expect(nameMark.x - canvas.x).toBeCloseTo(280 + upperShift, 0)
    expect(aperture1.width).toBeCloseTo(1120, 0)
    expect(aperture1.x - canvas.x).toBeCloseTo(240 + upperShift, 0)
    expect(ropeX - canvas.x).toBeCloseTo(329.2 + upperShift, 0)
    const expectedTraversalLeft = width < 1500
      ? 324 + ((390 - 324) * ((width - 1200) / 300))
      : 390 + ((425 - 390) * ((Math.min(width, 2560) - 1500) / 1060))
    expect(traversalLeft).toBeCloseTo(expectedTraversalLeft, 0)
    if (width < 1800) {
      const expectedRight = Math.min(150, Math.max(24, -228 + (0.21 * width)))
      expect(story.y).toBeLessThan(aperture1.y)
      expect(story.x - canvas.x).toBeCloseTo(760, 0)
      expect((canvas.x + canvas.width) - (story.x + story.width)).toBeCloseTo(expectedRight, 0)
      expect(story.x).toBeGreaterThanOrEqual(nameMark.x + nameMark.width + 40)
    } else {
      expect(story.width).toBeCloseTo(interpolate(380, 780, width), 0)
      expect((canvas.x + canvas.width) - (story.x + story.width)).toBeCloseTo(150, 0)
      if (width === 1800) {
        expect(storyTop).toBeCloseTo(330, 0)
      }
    }
    expect(aperture2.width).toBeCloseTo(interpolate(1180, 1240, width), 0)
    expect(aperture2.x - canvas.x).toBeCloseTo(interpolate(24, 430, width), 0)
    if (width < 1500) {
      expect(receiptStyles.left).toBeCloseTo(140, 0)
    } else {
      expect(receiptStyles.right).toBeCloseTo(interpolate(50, 560, width), 0)
    }
    expect(receiptStyles.width).toBeCloseTo(170, 0)
    expect(receiptStyles.height).toBeCloseTo(138, 0)
    expect(receiptStyles.scale).toBeCloseTo(1.25, 2)
    expect(handoffZIndex).toBeGreaterThan(reactionStyles.zIndex)
    expect(handoffRight).toBeCloseTo(interpolate(24, -80, width), 0)
    if (width === 1920) {
      expect((canvas.x + canvas.width) - (handoff.x + handoff.width)).toBeCloseTo(24, 0)
    }
    if (width < 1500) {
      expect(lowerTop).toEqual([715, 1460, 1340, 1360])
      expect(reactionStyles.left).toBeCloseTo(Math.max(24, (width - 1240) / 2), 0)
      expect(reactionStyles.zIndex).toBeGreaterThan(ropeZIndex)
      expect(ropeZIndex).toBeGreaterThan(receiptStyles.zIndex)
      expect(handoff.y).toBeGreaterThan(reaction.y)
      expect(handoff.y).toBeGreaterThanOrEqual(aperture2.y + aperture2.height - 24)
    } else if (width < 1920) {
      expect(lowerTop).toEqual([715, 845, 1340, 1200])
      expect(reactionStyles.left).toBeCloseTo(Math.max(24, (width - 1240) / 2), 0)
      expect(reactionStyles.zIndex).toBeGreaterThan(ropeZIndex)
      expect(handoff.y).toBeLessThan(aperture2.y + aperture2.height)
    } else {
      expect(lowerTop).toEqual([715, 1035, 845, 1200])
      expect((canvas.x + canvas.width) - (reaction.x + reaction.width)).toBeCloseTo(-20, 0)
    }
    expect(ropeX).toBeGreaterThanOrEqual(nameMark.x)
    expect(ropeX).toBeLessThanOrEqual(nameMark.x + nameMark.width)
    expect(ropeX).toBeGreaterThanOrEqual(aperture1.x)
    expect(ropeX).toBeLessThanOrEqual(aperture1.x + aperture1.width)
    expect(ropeX).toBeGreaterThanOrEqual(traversal.x)
    expect(ropeX).toBeLessThanOrEqual(traversal.x + traversal.width)

    expect(aperture2.y).toBeGreaterThan(aperture1.y)
    expect(centreX(story)).toBeGreaterThan(centreX(aperture1))
    if (width >= 1920) {
      expect(centreX(reaction)).toBeGreaterThan(centreX(aperture2))
    }
    if (width < 1500) {
      expect(centreX(receipt)).toBeLessThan(centreX(aperture2))
    } else {
      expect(centreX(receipt)).toBeGreaterThan(centreX(aperture2))
    }
    await expectNoHorizontalOverflow(page)
  }
})

test('The Usual Specialists switches Silk lower-half composition at 900 and reconnects smoothly to 1200', async ({ page }) => {
  const widths = [720, 800, 899, 900, 1050, 1199, 1200] as const
  const samples = new Map<number, {
    receipt: { top: number; left: number; right: number; x: number; y: number; width: number; height: number }
    reaction: { top: number; left: number; x: number; y: number; width: number; height: number }
    handoff: { top: number; right: number; x: number; y: number; width: number; height: number }
  }>()

  for (const width of widths) {
    await page.setViewportSize({ width, height: 1800 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const stage = silk.locator('[data-silk-stage]')
    const aperture1World = silk.locator('[data-silk-commission-05-world-viewport]')
    const aperture2World = silk.locator('[data-silk-commission-07-review-viewport]')
    const receipt = silk.locator('[data-silk-receipt-peekthrough]')
    const reaction = silk.locator('[data-silk-commission="08"]')
    const handoff = silk.locator('[data-silk-commission="09"]')

    const geometry = await Promise.all([
      stage.evaluate((element) => {
        const styles = getComputedStyle(element)
        return { minHeight: Number.parseFloat(styles.minHeight) }
      }),
      aperture1World.evaluate((element) => {
        const box = element.getBoundingClientRect()
        return { y: box.y, height: box.height }
      }),
      aperture2World.evaluate((element) => {
        const box = element.getBoundingClientRect()
        return { y: box.y, height: box.height }
      }),
      receipt.evaluate((element) => {
        const styles = getComputedStyle(element)
        const matrix = new DOMMatrix(styles.transform)
        const box = element.getBoundingClientRect()
        return {
          top: Number.parseFloat(styles.top),
          left: Number.parseFloat(styles.left),
          right: Number.parseFloat(styles.right),
          width: Number.parseFloat(styles.width),
          height: Number.parseFloat(styles.height),
          scale: Math.hypot(matrix.a, matrix.b),
          x: box.x,
          y: box.y,
          renderedWidth: box.width,
          renderedHeight: box.height,
        }
      }),
      reaction.evaluate((element) => {
        const styles = getComputedStyle(element)
        const box = element.getBoundingClientRect()
        return {
          top: Number.parseFloat(styles.top),
          left: Number.parseFloat(styles.left),
          width: Number.parseFloat(styles.width),
          height: Number.parseFloat(styles.height),
          zIndex: Number.parseInt(styles.zIndex, 10),
          x: box.x,
          y: box.y,
        }
      }),
      handoff.evaluate((element) => {
        const styles = getComputedStyle(element)
        const box = element.getBoundingClientRect()
        return {
          top: Number.parseFloat(styles.top),
          right: Number.parseFloat(styles.right),
          width: Number.parseFloat(styles.width),
          zIndex: Number.parseInt(styles.zIndex, 10),
          x: box.x,
          y: box.y,
          height: box.height,
        }
      }),
    ])

    const [stageStyles, aperture1WorldBox, aperture2WorldBox, receiptStyles, reactionStyles, handoffStyles] = geometry
    expect(stageStyles.minHeight, JSON.stringify({ width, stageStyles })).toBeCloseTo(1740, 0)
    expect(receiptStyles.width, JSON.stringify({ width, receiptStyles })).toBeCloseTo(170, 0)
    expect(receiptStyles.height, JSON.stringify({ width, receiptStyles })).toBeCloseTo(138, 0)
    expect(receiptStyles.scale, JSON.stringify({ width, receiptStyles })).toBeCloseTo(1.25, 2)

    if (width < 1200) {
      const apertureGutter = aperture2WorldBox.y - (aperture1WorldBox.y + aperture1WorldBox.height)
      const eyesGutter = reactionStyles.y - (aperture2WorldBox.y + aperture2WorldBox.height)
      expect(eyesGutter, JSON.stringify({ width, apertureGutter, eyesGutter }))
        .toBeCloseTo(apertureGutter, 0)
    }

    if (width <= 899) {
      expect(reactionStyles.y, JSON.stringify({ width, reactionStyles, receiptStyles })).toBeLessThan(receiptStyles.y)
      expect(receiptStyles.y, JSON.stringify({ width, receiptStyles, handoffStyles })).toBeLessThan(handoffStyles.y)
      expect(receiptStyles.top - reactionStyles.top, JSON.stringify({ width, reactionStyles, receiptStyles }))
        .toBeCloseTo(90, 0)
      expect(handoffStyles.top - reactionStyles.top, JSON.stringify({ width, reactionStyles, handoffStyles }))
        .toBeCloseTo(255, 0)
      expect(receiptStyles.x + (receiptStyles.renderedWidth / 2), JSON.stringify({ width, receiptStyles }))
        .toBeGreaterThan(width * 0.58)
    } else if (width < 1200) {
      const expectedReceiptLeft = Math.min(140, ((width - 900) / 300) * 140)
      const expectedHandoffOffset = 60 + (width * 0.05)
      const expectedReceiptOffset = 145 + (width * (1 / 15))
      expect(receiptStyles.left, JSON.stringify({ width, receiptStyles })).toBeCloseTo(expectedReceiptLeft, 0)
      expect(reactionStyles.y, JSON.stringify({ width, reactionStyles, handoffStyles })).toBeLessThan(handoffStyles.y)
      expect(handoffStyles.y, JSON.stringify({ width, handoffStyles, receiptStyles })).toBeLessThan(receiptStyles.y)
      expect(handoffStyles.top - reactionStyles.top, JSON.stringify({ width, reactionStyles, handoffStyles }))
        .toBeCloseTo(expectedHandoffOffset, 0)
      expect(receiptStyles.top - reactionStyles.top, JSON.stringify({ width, reactionStyles, receiptStyles }))
        .toBeCloseTo(expectedReceiptOffset, 0)
    }

    expect(reactionStyles.left, JSON.stringify({ width, reactionStyles })).toBeCloseTo(24, 0)
    expect(reactionStyles.width, JSON.stringify({ width, reactionStyles })).toBeCloseTo(700, 0)
    expect(reactionStyles.height, JSON.stringify({ width, reactionStyles })).toBeCloseTo(120, 0)
    expect(reactionStyles.zIndex, JSON.stringify({ width, reactionStyles })).toBe(21)
    expect(handoffStyles.right, JSON.stringify({ width, handoffStyles })).toBeCloseTo(24, 0)
    expect(handoffStyles.width, JSON.stringify({ width, handoffStyles })).toBeCloseTo(640, 0)
    expect(handoffStyles.zIndex, JSON.stringify({ width, handoffStyles })).toBe(22)
    await expectNoHorizontalOverflow(page)

    samples.set(width, {
      receipt: {
        top: receiptStyles.top,
        left: receiptStyles.left,
        right: receiptStyles.right,
        x: receiptStyles.x,
        y: receiptStyles.y,
        width: receiptStyles.renderedWidth,
        height: receiptStyles.renderedHeight,
      },
      reaction: {
        top: reactionStyles.top,
        left: reactionStyles.left,
        x: reactionStyles.x,
        y: reactionStyles.y,
        width: reactionStyles.width,
        height: reactionStyles.height,
      },
      handoff: {
        top: handoffStyles.top,
        right: handoffStyles.right,
        x: handoffStyles.x,
        y: handoffStyles.y,
        width: handoffStyles.width,
        height: handoffStyles.height,
      },
    })
  }

  const at720 = samples.get(720)!
  const at800 = samples.get(800)!
  const at899 = samples.get(899)!
  const at900 = samples.get(900)!
  const at1050 = samples.get(1050)!
  const at1199 = samples.get(1199)!
  const at1200 = samples.get(1200)!

  expect(at800.receipt.x).toBeGreaterThan(at720.receipt.x)
  expect(at899.receipt.x).toBeGreaterThan(at800.receipt.x)
  expect(at900.receipt.left).toBeCloseTo(0, 0)
  expect(at900.receipt.x).toBeLessThan(at899.receipt.x - 200)
  expect(at1050.receipt.left).toBeGreaterThan(at900.receipt.left)
  expect(at1199.receipt.left).toBeGreaterThan(at1050.receipt.left)
  expect(Math.abs(at1200.receipt.left - at1199.receipt.left)).toBeLessThan(1)
  expect((at1050.handoff.top - at1050.reaction.top)).toBeGreaterThan(at900.handoff.top - at900.reaction.top)
  expect((at1199.handoff.top - at1199.reaction.top)).toBeGreaterThan(at1050.handoff.top - at1050.reaction.top)
  expect((at1050.receipt.top - at1050.reaction.top)).toBeGreaterThan(at900.receipt.top - at900.reaction.top)
  expect((at1199.receipt.top - at1199.reaction.top)).toBeGreaterThan(at1050.receipt.top - at1050.reaction.top)
})

test('The Usual Specialists renders Commission 09 as a rectangular handoff scene cell placeholder', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto(specialistsPreviewPath)

  const handoff = page.getByRole('region', { name: 'Silk' }).locator('[data-silk-commission="09"]')
  await expect(handoff).toBeVisible()
  await expect(handoff).toHaveAttribute('data-silk-scene-cell', '09')
  await expect(handoff).toContainText('Commission 09 / assent-marker toss handoff')
  await expect(handoff).toContainText('Scene pending')

  const geometry = await handoff.evaluate((element) => {
    const styles = getComputedStyle(element)
    const box = element.getBoundingClientRect()
    return {
      clipPath: styles.clipPath,
      ratio: box.width / box.height,
    }
  })

  expect(geometry.clipPath).toBe('none')
  expect(Math.abs(geometry.ratio - (16 / 9))).toBeLessThanOrEqual(0.02)
})

test('The Usual Specialists keeps the first Silk aperture mirrored through 1199 and switches to 1120px at the 1200 keyframe', async ({ page }) => {
  const samples = [899, 900, 1199, 1200, 1363, 1364, 1399, 1400, 1440, 1920, 2560, 2880] as const

  for (const width of samples) {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPreviewPath)

    const aperture = page.getByRole('region', { name: 'Silk' }).locator('[data-silk-commission="05"]')
    await expect(aperture).toBeVisible()
    const box = await aperture.boundingBox()
    expect(box).not.toBeNull()
    const expectedWidth = width >= 1200 ? 1120 : width * 0.88
    expect(Math.abs(box!.width - expectedWidth), JSON.stringify({ width, box, expectedWidth })).toBeLessThanOrEqual(1)
    if (width === 899 || width === 900) {
      const left = Number.parseFloat(await aperture.evaluate((element) => getComputedStyle(element).left))
      expect(Math.abs(left - (width * 0.17)), JSON.stringify({ width, left })).toBeLessThanOrEqual(1)
    }
  }
})

test('The Usual Specialists mirrors the two Silk apertures and scales their vertical gutter from 720 through 1199', async ({ page }) => {
  for (const width of [720, 721, 899, 900, 1199] as const) {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const canvas = page.locator('[data-specialists-canvas="authored"]')
    const aperture1 = silk.locator('[data-silk-commission="05"]')
    const aperture1Frame = aperture1.locator('[data-silk-commission-05-frame]')
    const aperture2 = silk.locator('[data-silk-commission="07"]')

    for (const locator of [canvas, aperture1, aperture1Frame, aperture2]) await expect(locator).toBeVisible()

    const canvasBox = await canvas.boundingBox()
    const aperture1Box = await aperture1.boundingBox()
    const aperture1FrameBox = await aperture1Frame.boundingBox()
    const aperture2Box = await aperture2.boundingBox()
    expect(canvasBox).not.toBeNull()
    expect(aperture1Box).not.toBeNull()
    expect(aperture1FrameBox).not.toBeNull()
    expect(aperture2Box).not.toBeNull()

    const expectedWidth = width * 0.88
    const expectedOuterGutter = width * 0.17
    const expectedLowerTop = 450 + ((width - 720) * ((660 - 450) / (1199 - 720)))
    const aperture2Top = await aperture2.evaluate((element) => Number.parseFloat(getComputedStyle(element).top))

    expect(aperture1Box!.width, JSON.stringify({ width, aperture1Box })).toBeCloseTo(expectedWidth, 0)
    expect(aperture2Box!.width, JSON.stringify({ width, aperture2Box })).toBeCloseTo(expectedWidth, 0)
    expect(aperture1Box!.x - canvasBox!.x, JSON.stringify({ width, aperture1Box, canvasBox })).toBeCloseTo(expectedOuterGutter, 0)
    expect(
      (canvasBox!.x + canvasBox!.width) - (aperture2Box!.x + aperture2Box!.width),
      JSON.stringify({ width, aperture2Box, canvasBox }),
    ).toBeCloseTo(expectedOuterGutter, 0)
    expect(aperture2Top, JSON.stringify({ width, aperture2Top })).toBeCloseTo(expectedLowerTop, 1)

    if (width === 720) {
      expect(aperture1FrameBox!.width, JSON.stringify({ width, aperture1FrameBox, aperture1Box })).toBeCloseTo(aperture1Box!.width, 0)
    }
  }
})

test('The Usual Specialists uses a distinct full-bleed Silk composition from 390 through 719 and snaps at 720', async ({ page }) => {
  const compactWidths = [390, 480, 600, 719] as const
  const compactSamples = new Map<number, {
    ropeLeft: number
    apertureWidth: number
    apertureGutterRatio: number
    traversalWidth: number
  }>()

  for (const width of compactWidths) {
    await page.setViewportSize({ width, height: 1800 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const canvas = page.locator('[data-specialists-canvas="authored"]')
    const name = silk.locator('[data-silk-name-lockup]')
    const story = silk.locator('[data-silk-story-card]')
    const aperture1 = silk.locator('[data-silk-commission="05"]')
    const aperture1World = silk.locator('[data-silk-commission-05-world-viewport]')
    const aperture2 = silk.locator('[data-silk-commission="07"]')
    const aperture2World = silk.locator('[data-silk-commission-07-review-viewport]')
    const ropeAxis = silk.locator('[data-silk-rope-axis]')
    const traversal = silk.locator('[data-silk-commission="06"]')
    const reaction = silk.locator('[data-silk-commission="08"]')
    const receipt = silk.locator('[data-silk-receipt-peekthrough]')
    const handoff = silk.locator('[data-silk-commission="09"]')

    for (const locator of [canvas, name, story, aperture1, aperture2, traversal, reaction, receipt, handoff]) {
      await expect(locator).toBeVisible()
    }
    await expect(ropeAxis).toHaveCount(1)

    const [
      canvasBox,
      nameBox,
      storyBox,
      aperture1Box,
      aperture1WorldBox,
      aperture2Box,
      aperture2WorldBox,
      traversalBox,
      reactionBox,
      receiptBox,
      handoffBox,
    ] = await Promise.all([
      canvas.boundingBox(),
      name.boundingBox(),
      story.boundingBox(),
      aperture1.boundingBox(),
      aperture1World.boundingBox(),
      aperture2.boundingBox(),
      aperture2World.boundingBox(),
      traversal.boundingBox(),
      reaction.boundingBox(),
      receipt.boundingBox(),
      handoff.boundingBox(),
    ])
    const ropeLeft = await ropeAxis.evaluate((element) => Number.parseFloat(getComputedStyle(element).left))
    const stageHeight = await silk.locator('[data-silk-stage]').evaluate((element) => element.getBoundingClientRect().height)
    const traversalStyles = await traversal.evaluate((element) => {
      const styles = getComputedStyle(element)
      return {
        left: Number.parseFloat(styles.left),
        top: Number.parseFloat(styles.top),
        width: Number.parseFloat(styles.width),
      }
    })
    const aperture2Top = await aperture2.evaluate((element) => Number.parseFloat(getComputedStyle(element).top))

    for (const box of [canvasBox, nameBox, storyBox, aperture1Box, aperture1WorldBox, aperture2Box, aperture2WorldBox, traversalBox, reactionBox, receiptBox, handoffBox]) {
      expect(box).not.toBeNull()
    }

    expect(aperture1Box!.x - canvasBox!.x, JSON.stringify({ width, aperture1Box, canvasBox })).toBeCloseTo(0, 0)
    expect(aperture1Box!.width, JSON.stringify({ width, aperture1Box, canvasBox })).toBeCloseTo(canvasBox!.width, 0)
    expect(aperture2Box!.x - canvasBox!.x, JSON.stringify({ width, aperture2Box, canvasBox })).toBeCloseTo(0, 0)
    expect(aperture2Box!.width, JSON.stringify({ width, aperture2Box, canvasBox })).toBeCloseTo(canvasBox!.width, 0)

    expect(storyBox!.y, JSON.stringify({ width, nameBox, storyBox })).toBeGreaterThanOrEqual(nameBox!.y + nameBox!.height)
    expect(storyBox!.y, JSON.stringify({ width, storyBox, aperture1Box })).toBeLessThan(aperture1Box!.y)
    expect(storyBox!.y + storyBox!.height, JSON.stringify({ width, storyBox, aperture1Box })).toBeGreaterThan(aperture1Box!.y)
    expect(
      storyBox!.y + storyBox!.height,
      JSON.stringify({ width, storyBox, aperture1WorldBox }),
    ).toBeLessThanOrEqual(aperture1WorldBox!.y)

    const apertureGutter = aperture2WorldBox!.y - (aperture1WorldBox!.y + aperture1WorldBox!.height)
    const apertureGutterRatio = apertureGutter / aperture1Box!.width
    const eyesGutter = reactionBox!.y - (aperture2WorldBox!.y + aperture2WorldBox!.height)
    expect(eyesGutter, JSON.stringify({ width, apertureGutter, eyesGutter })).toBeCloseTo(apertureGutter, 0)
    expect(reactionBox!.y, JSON.stringify({ width, reactionBox, receiptBox })).toBeLessThan(receiptBox!.y)
    expect(receiptBox!.y, JSON.stringify({ width, receiptBox, handoffBox })).toBeLessThan(handoffBox!.y)

    const expectedTraversalLeft = 66.3 + ((width - 390) * ((93.47 - 66.3) / (719 - 390)))
    expect(traversalStyles.width, JSON.stringify({ width, traversalStyles })).toBeCloseTo(192, 0)
    expect(traversalStyles.top, JSON.stringify({ width, traversalStyles, stageHeight })).toBeCloseTo(stageHeight * 0.27, 0)
    expect(traversalStyles.left, JSON.stringify({ width, traversalStyles, expectedTraversalLeft })).toBeCloseTo(expectedTraversalLeft, 0)
    expect(ropeLeft, JSON.stringify({ width, ropeLeft })).toBeLessThan(width * 0.12)
    await expectNoHorizontalOverflow(page)
    compactSamples.set(width, {
      ropeLeft,
      apertureWidth: aperture1Box!.width,
      apertureGutterRatio,
      traversalWidth: traversalStyles.width,
    })

    if (width === 719) {
      expect(aperture2Top / stageHeight, JSON.stringify({ width, aperture2Top, stageHeight })).toBeCloseTo(0.325, 2)
    }
  }

  const compactGutterRatios = compactWidths.map((width) => compactSamples.get(width)!.apertureGutterRatio)
  expect(Math.max(...compactGutterRatios) - Math.min(...compactGutterRatios)).toBeLessThanOrEqual(0.005)

  await page.setViewportSize({ width: 720, height: 1800 })
  await page.goto(specialistsPreviewPath)
  const silk720 = page.getByRole('region', { name: 'Silk' })
  const aperture720 = silk720.locator('[data-silk-commission="05"]')
  const rope720 = silk720.locator('[data-silk-rope-axis]')
  const traversal720 = silk720.locator('[data-silk-commission="06"]')
  const aperture720Box = await aperture720.boundingBox()
  const traversal720Width = await traversal720.evaluate((element) => Number.parseFloat(getComputedStyle(element).width))
  const rope720Left = await rope720.evaluate((element) => Number.parseFloat(getComputedStyle(element).left))
  expect(aperture720Box).not.toBeNull()
  expect(aperture720Box!.width).toBeCloseTo(720 * 0.88, 0)
  expect(traversal720Width).toBeCloseTo(192, 0)
  expect(rope720Left).toBeGreaterThan(720 * 0.2)

  const at719 = compactSamples.get(719)!
  expect(at719.apertureWidth - aperture720Box!.width).toBeGreaterThan(70)
  expect(Math.abs(at719.traversalWidth - traversal720Width)).toBeLessThan(1)
  expect(rope720Left - at719.ropeLeft).toBeGreaterThan(100)
})

test('The Usual Specialists stacks Silk Commission 08, receipt, and Commission 09 from 390 through 719', async ({ page }) => {
  for (const width of [390, 480, 600, 719] as const) {
    await page.setViewportSize({ width, height: 1800 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const canvas = page.locator('[data-specialists-canvas="authored"]')
    const stage = silk.locator('[data-silk-stage]')
    const story = silk.locator('[data-silk-story-card]')
    const reaction = silk.locator('[data-silk-commission="08"]')
    const receipt = silk.locator('[data-silk-receipt-peekthrough]')
    const handoff = silk.locator('[data-silk-commission="09"]')

    const [canvasBox, stageBox, storyBox, reactionBox, receiptBox, handoffBox] = await Promise.all([
      canvas.boundingBox(),
      stage.boundingBox(),
      story.boundingBox(),
      reaction.boundingBox(),
      receipt.boundingBox(),
      handoff.boundingBox(),
    ])

    for (const box of [canvasBox, stageBox, storyBox, reactionBox, receiptBox, handoffBox]) {
      expect(box).not.toBeNull()
    }

    expect(reactionBox!.x - canvasBox!.x, JSON.stringify({ width, reactionBox, canvasBox })).toBeCloseTo(0, 0)
    expect(reactionBox!.width, JSON.stringify({ width, reactionBox, canvasBox })).toBeCloseTo(canvasBox!.width, 0)

    expect(receiptBox!.x + receiptBox!.width / 2, JSON.stringify({ width, receiptBox, canvasBox }))
      .toBeGreaterThan(canvasBox!.x + canvasBox!.width / 2)
    expect(receiptBox!.y, JSON.stringify({ width, reactionBox, receiptBox }))
      .toBeGreaterThanOrEqual(reactionBox!.y + reactionBox!.height)

    expect(handoffBox!.y, JSON.stringify({ width, receiptBox, handoffBox }))
      .toBeGreaterThanOrEqual(receiptBox!.y + receiptBox!.height)
    expect(handoffBox!.x, JSON.stringify({ width, storyBox, handoffBox })).toBeCloseTo(storyBox!.x, 0)
    expect(handoffBox!.width, JSON.stringify({ width, storyBox, handoffBox })).toBeCloseTo(storyBox!.width, 0)
    expect(handoffBox!.y + handoffBox!.height, JSON.stringify({ width, stageBox, handoffBox }))
      .toBeLessThanOrEqual(stageBox!.y + stageBox!.height)

    await expectNoHorizontalOverflow(page)
  }
})

test('The Usual Specialists uses a fully stacked narrow Silk composition from 320 through 389', async ({ page }) => {
  for (const width of [320, 360, 389] as const) {
    await page.setViewportSize({ width, height: 2200 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const canvas = page.locator('[data-specialists-canvas="authored"]')
    const stage = silk.locator('[data-silk-stage]')
    const name = silk.locator('[data-silk-name-lockup]')
    const story = silk.locator('[data-silk-story-card]')
    const aperture1 = silk.locator('[data-silk-commission="05"]')
    const aperture2Composition = silk.locator('[data-silk-aperture-composition-variant="commission-07-review"]')
    const traversal = silk.locator('[data-silk-commission="06"]')
    const reaction = silk.locator('[data-silk-commission="08"]')
    const receipt = silk.locator('[data-silk-receipt-peekthrough]')
    const handoff = silk.locator('[data-silk-commission="09"]')

    const [
      canvasBox,
      stageBox,
      nameBox,
      storyBox,
      aperture1Box,
      aperture2Box,
      traversalBox,
      reactionBox,
      receiptBox,
      handoffBox,
    ] = await Promise.all([
      canvas.boundingBox(),
      stage.boundingBox(),
      name.boundingBox(),
      story.boundingBox(),
      aperture1.boundingBox(),
      aperture2Composition.boundingBox(),
      traversal.boundingBox(),
      reaction.boundingBox(),
      receipt.boundingBox(),
      handoff.boundingBox(),
    ])

    const [traversalStyles, receiptStyles, handoffStyles] = await Promise.all([
      traversal.evaluate((element) => {
        const styles = getComputedStyle(element)
        return { top: Number.parseFloat(styles.top) }
      }),
      receipt.evaluate((element) => {
        const styles = getComputedStyle(element)
        return { right: Number.parseFloat(styles.right), width: Number.parseFloat(styles.width) }
      }),
      handoff.evaluate((element) => {
        const styles = getComputedStyle(element)
        return {
          left: Number.parseFloat(styles.left),
          right: Number.parseFloat(styles.right),
          width: Number.parseFloat(styles.width),
        }
      }),
    ])

    for (const box of [canvasBox, stageBox, nameBox, storyBox, aperture1Box, aperture2Box, traversalBox, reactionBox, receiptBox, handoffBox]) {
      expect(box).not.toBeNull()
    }

    expect(storyBox!.x, JSON.stringify({ width, storyBox, canvasBox })).toBeCloseTo(canvasBox!.x, 0)
    expect(storyBox!.width, JSON.stringify({ width, storyBox, canvasBox })).toBeCloseTo(canvasBox!.width, 0)
    expect(storyBox!.y, JSON.stringify({ width, nameBox, storyBox })).toBeGreaterThanOrEqual(nameBox!.y + nameBox!.height)
    expect(storyBox!.y + storyBox!.height, JSON.stringify({ width, storyBox, aperture1Box }))
      .toBeLessThanOrEqual(aperture1Box!.y)

    expect(aperture2Box!.x, JSON.stringify({ width, aperture2Box, canvasBox }))
      .toBeCloseTo(canvasBox!.x - canvasBox!.width * 0.08, 0)
    expect(aperture2Box!.width, JSON.stringify({ width, aperture2Box, canvasBox }))
      .toBeCloseTo(canvasBox!.width * 1.16, 0)
    expect(aperture2Box!.height, JSON.stringify({ width, aperture2Box })).toBeGreaterThan(aperture2Box!.width)
    const apertureGap = aperture2Box!.y - (aperture1Box!.y + aperture1Box!.height)
    expect(apertureGap, JSON.stringify({ width, apertureGap, aperture1Box, aperture2Box }))
      .toBeCloseTo(canvasBox!.width * 0.0675, 0)
    const reactionGap = reactionBox!.y - (aperture2Box!.y + aperture2Box!.height)
    expect(reactionGap, JSON.stringify({ width, reactionGap, aperture2Box, reactionBox }))
      .toBeCloseTo(canvasBox!.width * 0.0675, 0)

    expect(traversalStyles.top, JSON.stringify({ width, traversalStyles, stageBox }))
      .toBeCloseTo(stageBox!.height * 0.38, 0)

    expect(reactionBox!.x, JSON.stringify({ width, reactionBox, canvasBox })).toBeCloseTo(canvasBox!.x, 0)
    expect(reactionBox!.width, JSON.stringify({ width, reactionBox, canvasBox })).toBeCloseTo(canvasBox!.width, 0)

    expect(receiptStyles.width, JSON.stringify({ width, receiptStyles, canvasBox })).toBeCloseTo(canvasBox!.width * 0.5, 0)
    expect(receiptStyles.right, JSON.stringify({ width, receiptStyles })).toBeCloseTo(0, 0)
    expect(receiptBox!.y, JSON.stringify({ width, reactionBox, receiptBox }))
      .toBeGreaterThanOrEqual(reactionBox!.y + reactionBox!.height)

    expect(handoffStyles.left, JSON.stringify({ width, handoffStyles })).toBeCloseTo(0, 0)
    expect(handoffStyles.right, JSON.stringify({ width, handoffStyles })).toBeCloseTo(0, 0)
    expect(handoffStyles.width, JSON.stringify({ width, handoffStyles, canvasBox })).toBeCloseTo(canvasBox!.width, 0)
    expect(handoffBox!.y, JSON.stringify({ width, receiptBox, handoffBox }))
      .toBeGreaterThanOrEqual(receiptBox!.y + receiptBox!.height)
    expect(handoffBox!.y + handoffBox!.height, JSON.stringify({ width, stageBox, handoffBox }))
      .toBeLessThanOrEqual(stageBox!.y + stageBox!.height)

    await expectNoHorizontalOverflow(page)
  }

  await page.setViewportSize({ width: 390, height: 1800 })
  await page.goto(specialistsPreviewPath)
  const silk390 = page.getByRole('region', { name: 'Silk' })
  const canvas390 = page.locator('[data-specialists-canvas="authored"]')
  const story390 = silk390.locator('[data-silk-story-card]')
  const aperture2390 = silk390.locator('[data-silk-aperture-composition-variant="commission-07-review"]')
  const traversal390 = silk390.locator('[data-silk-commission="06"]')
  const [canvas390Box, story390Box, aperture2390Box, traversal390Styles, stage390Height] = await Promise.all([
    canvas390.boundingBox(),
    story390.boundingBox(),
    aperture2390.boundingBox(),
    traversal390.evaluate((element) => Number.parseFloat(getComputedStyle(element).top)),
    silk390.locator('[data-silk-stage]').evaluate((element) => element.getBoundingClientRect().height),
  ])
  for (const box of [canvas390Box, story390Box, aperture2390Box]) expect(box).not.toBeNull()
  expect(story390Box!.x - canvas390Box!.x).toBeGreaterThan(0)
  expect(story390Box!.width).toBeLessThan(canvas390Box!.width)
  expect(aperture2390Box!.width).toBeGreaterThan(aperture2390Box!.height)
  expect(traversal390Styles).toBeCloseTo(stage390Height * 0.27, 0)
})

test('The Usual Specialists interpolates Silk and her rope through the 720, 1200, and 1500 traversal keyframes', async ({ page }) => {
  const interpolate = (from: number, to: number, width: number, fromWidth: number, toWidth: number) => (
    fromWidth === toWidth
      ? from
      : from + ((to - from) * ((width - fromWidth) / (toWidth - fromWidth)))
  )
  const keyframes = {
    720: {
      traversalWidth: 192,
      traversalTop: 1470 * 0.26,
      traversalLeft: 180,
      ropeJoinTop: 1470 * 0.26,
      upperWidth: 290,
      lowerWidth: 350.698,
      lowerMargin: 33.907,
    },
    1200: {
      traversalWidth: 320,
      traversalTop: 1470 * 0.37,
      traversalLeft: 1200 * 0.27,
      ropeJoinTop: 1470 * (580 / 1800),
      upperWidth: 331,
      lowerWidth: 400.279,
      lowerMargin: 38.701,
    },
    1500: {
      traversalWidth: 360,
      traversalTop: 1580 * 0.37,
      traversalLeft: 390,
      ropeJoinTop: 1580 * (580 / 1800),
      upperWidth: 328,
      lowerWidth: 396,
      lowerMargin: 38,
    },
  } as const
  const samples = new Map<number, {
    traversal: { left: number; top: number; width: number }
    ropeAxis: { left: number }
    upperRope: { height: number; width: number }
    lowerRope: { marginLeft: number; top: number; width: number }
  }>()

  for (const width of [720, 900, 1199, 1200, 1350, 1499, 1500, 1600, 1920, 2560, 2561] as const) {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const traversal = silk.locator('[data-silk-commission="06"]')
    const ropeAxis = silk.locator('[data-silk-rope-axis]')
    const upperRope = silk.locator('[data-specialists-rope-piece="silk-upper"]')
    const lowerRope = silk.locator('[data-specialists-rope-piece="silk-lower"]')
    const aperture = silk.locator('[data-silk-commission="05"]')

    for (const locator of [traversal, upperRope, lowerRope, aperture]) await expect(locator).toBeVisible()
    await expect(ropeAxis).toHaveCount(1)

    const geometry = await silk.evaluate((root) => {
      const read = (selector: string) => {
        const element = root.querySelector<HTMLElement>(selector)!
        const styles = getComputedStyle(element)
        return {
          height: Number.parseFloat(styles.height),
          left: Number.parseFloat(styles.left),
          marginLeft: Number.parseFloat(styles.marginLeft),
          top: Number.parseFloat(styles.top),
          width: Number.parseFloat(styles.width),
        }
      }
      return {
        aperture: read('[data-silk-commission="05"]'),
        lowerRope: read('[data-specialists-rope-piece="silk-lower"]'),
        ropeAxis: read('[data-silk-rope-axis]'),
        traversal: read('[data-silk-commission="06"]'),
        upperRope: read('[data-specialists-rope-piece="silk-upper"]'),
      }
    })

    const from = width < 1200 ? keyframes[720] : width < 1500 ? keyframes[1200] : keyframes[1500]
    const to = width < 1200 ? keyframes[1200] : keyframes[1500]
    const fromWidth = width < 1200 ? 720 : width < 1500 ? 1200 : 1500
    const toWidth = width < 1200 ? 1200 : 1500
    const expectedTraversalWidth = interpolate(from.traversalWidth, to.traversalWidth, width, fromWidth, toWidth)
    const expectedTraversalTop = interpolate(from.traversalTop, to.traversalTop, width, fromWidth, toWidth)
    const expectedTraversalLeft = width < 1500
      ? interpolate(from.traversalLeft, to.traversalLeft, width, fromWidth, toWidth)
      : Math.min(425, interpolate(390, 425, width, 1500, 2560))
    const expectedRopeAxis = width < 900
      ? (width * 0.209075) + 12.8
      : width < 1400
        ? (width * 0.221358) + 13
        : 329.2
    const expectedJoinTop = interpolate(from.ropeJoinTop, to.ropeJoinTop, width, fromWidth, toWidth)
    const expectedUpperWidth = interpolate(from.upperWidth, to.upperWidth, width, fromWidth, toWidth)
    const expectedLowerWidth = interpolate(from.lowerWidth, to.lowerWidth, width, fromWidth, toWidth)
    const expectedLowerMargin = interpolate(from.lowerMargin, to.lowerMargin, width, fromWidth, toWidth)

    expect(geometry.traversal.width, JSON.stringify({ width, geometry })).toBeCloseTo(expectedTraversalWidth, 0)
    expect(geometry.traversal.top, JSON.stringify({ width, geometry })).toBeCloseTo(expectedTraversalTop, 0)
    expect(geometry.traversal.left, JSON.stringify({ width, geometry })).toBeCloseTo(expectedTraversalLeft, 0)
    expect(geometry.ropeAxis.left, JSON.stringify({ width, geometry })).toBeCloseTo(expectedRopeAxis, 0)
    expect(geometry.upperRope.height, JSON.stringify({ width, geometry })).toBeCloseTo(expectedJoinTop + 62, 0)
    expect(geometry.upperRope.width, JSON.stringify({ width, geometry })).toBeCloseTo(expectedUpperWidth, 0)
    expect(geometry.lowerRope.top, JSON.stringify({ width, geometry })).toBeCloseTo(expectedJoinTop, 0)
    expect(geometry.lowerRope.width, JSON.stringify({ width, geometry })).toBeCloseTo(expectedLowerWidth, 0)
    expect(geometry.lowerRope.marginLeft, JSON.stringify({ width, geometry })).toBeCloseTo(expectedLowerMargin, 0)

    samples.set(width, geometry)
  }

  const at1199 = samples.get(1199)!
  const at1200 = samples.get(1200)!
  expect(Math.abs(at1199.traversal.top - at1200.traversal.top)).toBeLessThanOrEqual(1)
  expect(Math.abs(at1199.traversal.left - at1200.traversal.left)).toBeLessThanOrEqual(1)
  expect(Math.abs(at1199.traversal.width - at1200.traversal.width)).toBeLessThanOrEqual(1)
  expect(Math.abs(at1199.ropeAxis.left - at1200.ropeAxis.left)).toBeLessThanOrEqual(1)
  expect(Math.abs(at1199.upperRope.height - at1200.upperRope.height)).toBeLessThanOrEqual(1)

  const at1499 = samples.get(1499)!
  const at1500 = samples.get(1500)!
  expect(Math.abs(at1499.traversal.top - at1500.traversal.top)).toBeLessThanOrEqual(1)
  expect(Math.abs(at1499.traversal.left - at1500.traversal.left)).toBeLessThanOrEqual(1)
  expect(Math.abs(at1499.traversal.width - at1500.traversal.width)).toBeLessThanOrEqual(1)
  expect(Math.abs(at1499.ropeAxis.left - at1500.ropeAxis.left)).toBeLessThanOrEqual(1)
  expect(Math.abs(at1499.upperRope.height - at1500.upperRope.height)).toBeLessThanOrEqual(1)

  for (const width of [1600, 1920, 2560, 2561] as const) {
    const wide = samples.get(width)!
    expect(wide.traversal.top).toBeCloseTo(at1500.traversal.top, 0)
    expect(wide.traversal.width).toBeCloseTo(at1500.traversal.width, 0)
    expect(wide.ropeAxis.left).toBeCloseTo(at1500.ropeAxis.left, 0)
    expect(wide.upperRope.height).toBeCloseTo(at1500.upperRope.height, 0)
  }

  expect(samples.get(2560)!.traversal.left).toBeCloseTo(425, 0)
  expect(samples.get(2561)!.traversal.left).toBeCloseTo(425, 0)
})

test('The Usual Specialists carries the wide story-card treatment down through the mirrored aperture band', async ({ page }) => {
  for (const width of [720, 721, 899, 900, 1199, 1200] as const) {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const aperture1 = silk.locator('[data-silk-commission="05"]')
    const story = silk.locator('[data-silk-story-card]')

    for (const locator of [aperture1, story]) await expect(locator).toBeVisible()

    const aperture1Box = await aperture1.boundingBox()
    const storyBox = await story.boundingBox()
    expect(aperture1Box).not.toBeNull()
    expect(storyBox).not.toBeNull()

    const styles = await story.evaluate((element) => {
      const computed = getComputedStyle(element)
      return {
        right: Number.parseFloat(computed.right),
        top: Number.parseFloat(computed.top),
        width: Number.parseFloat(computed.width),
      }
    })
    const expectedWidth = Math.min(416, Math.max(320, 176 + (0.2 * width)))

    expect(styles.top, JSON.stringify({ width, styles })).toBeCloseTo(40, 0)
    expect(styles.right, JSON.stringify({ width, styles })).toBeCloseTo(24, 0)
    expect(styles.width, JSON.stringify({ width, styles, expectedWidth })).toBeCloseTo(expectedWidth, 0)
    expect(storyBox!.y, JSON.stringify({ width, storyBox, aperture1Box })).toBeLessThan(aperture1Box!.y)
  }
})

test('The Usual Specialists keeps the Silk strapline fitted to the wordmark without entering the first aperture world', async ({ page }) => {
  for (const width of [390, 720, 1199, 1200, 1400, 1920] as const) {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const nameMark = silk.locator('[data-silk-name-mark]')
    const strapline = silk.locator('[data-silk-name-strapline]')
    const worldViewport = silk.locator('[data-silk-commission="05"] [data-silk-commission-05-world-viewport]')

    for (const locator of [nameMark, strapline, worldViewport]) await expect(locator).toBeVisible()

    const nameBox = await nameMark.boundingBox()
    const straplineBox = await strapline.boundingBox()
    const worldBox = await worldViewport.boundingBox()
    expect(nameBox).not.toBeNull()
    expect(straplineBox).not.toBeNull()
    expect(worldBox).not.toBeNull()

    const layers = await Promise.all([nameMark, strapline].map((locator) =>
      locator.evaluate((element) => Number.parseInt(getComputedStyle(element).zIndex, 10))))
    const straplineFontSize = await strapline.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize))
    const straplineTextWidth = await strapline.evaluate((element) => {
      const range = document.createRange()
      range.selectNodeContents(element)
      return range.getBoundingClientRect().width
    })
    const straplineDisplay = await strapline.evaluate((element) => getComputedStyle(element).display)

    expect(straplineBox!.x, JSON.stringify({ width, nameBox, straplineBox })).toBeCloseTo(nameBox!.x, 0)
    expect(straplineBox!.width, JSON.stringify({ width, nameBox, straplineBox })).toBeCloseTo(nameBox!.width, 0)
    expect(straplineBox!.y, JSON.stringify({ width, nameBox, straplineBox })).toBeGreaterThanOrEqual(nameBox!.y + nameBox!.height)
    expect(straplineBox!.y + straplineBox!.height, JSON.stringify({ width, straplineBox, worldBox }))
      .toBeLessThanOrEqual(worldBox!.y)
    expect(layers[1], JSON.stringify({ width, layers })).toBe(layers[0])
    expect(straplineFontSize / nameBox!.width, JSON.stringify({ width, straplineFontSize, nameBox }))
      .toBeCloseTo(0.064, 3)
    expect(straplineDisplay, JSON.stringify({ width, straplineDisplay })).not.toBe('flex')
    expect(straplineTextWidth / nameBox!.width, JSON.stringify({ width, straplineTextWidth, nameBox }))
      .toBeGreaterThanOrEqual(0.94)
    expect(straplineTextWidth / nameBox!.width, JSON.stringify({ width, straplineTextWidth, nameBox }))
      .toBeLessThanOrEqual(1.01)
  }
})

test('The Usual Specialists locks wide-band rope handoffs through the authored Index to Silk knot', async ({ page }) => {
  const samples = []

  for (const width of [1400, 1440, 1599] as const) {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPreviewPath)

    const opening = page.locator('[data-specialists-rope-piece="opening"]')
    const index = page.locator('[data-specialists-rope-piece="index"]')
    const silkUpper = page.locator('[data-specialists-rope-piece="silk-upper"]')
    const silkLower = page.locator('[data-specialists-rope-piece="silk-lower"]')
    const openingCrossing = page.locator('[data-specialists-chapter-crossing="opening-index"]')
    const indexSilkCrossing = page.locator('[data-specialists-chapter-crossing="index-silk"]')
    for (const rope of [opening, index, silkUpper, silkLower]) await expect(rope).toBeVisible()
    await expect(openingCrossing.locator('[data-specialists-crossing-lockup]')).toBeVisible()
    await expect(indexSilkCrossing.locator('[data-specialists-crossing-lockup]')).toBeVisible()
    await expect(page.locator('[data-specialists-crossing-anchor="index-silk"]')).toBeHidden()
    await page.locator('[data-specialists-chapter-nav]').scrollIntoViewIfNeeded()

    const geometry = await page.evaluate(() => {
      const placement = (piece: string) => document.querySelector<HTMLElement>(`[data-specialists-rope-piece="${piece}"]`)!
      const image = (piece: string) => Array.from(placement(piece).querySelectorAll<HTMLImageElement>('img'))
        .find((candidate) => candidate.getClientRects().length > 0)!
      const point = (piece: string, xRatio: number, yRatio: number) => {
        const marker = document.createElement('span')
        marker.style.position = 'absolute'
        marker.style.left = `${xRatio * 100}%`
        marker.style.top = `${yRatio * 100}%`
        marker.style.width = '1px'
        marker.style.height = '1px'
        marker.style.pointerEvents = 'none'
        placement(piece).append(marker)
        const box = marker.getBoundingClientRect()
        marker.remove()
        return { x: box.left + box.width / 2, y: box.top + box.height / 2 }
      }
      const centre = (selector: string) => {
        const box = document.querySelector<HTMLElement>(selector)!.getBoundingClientRect()
        return { x: box.left + box.width / 2, y: box.top + box.height / 2 }
      }
      const box = (selector: string) => document.querySelector<HTMLElement>(selector)!.getBoundingClientRect()
      const openingCrossing = box('[data-specialists-chapter-crossing="opening-index"]')
      const indexSilkCrossing = box('[data-specialists-chapter-crossing="index-silk"]')
      const indexSilkAnchorSelector = '[data-specialists-crossing-lockup]'
      const indexSilkAnchor = centre(`[data-specialists-chapter-crossing="index-silk"] ${indexSilkAnchorSelector}`)
      const knotTop = centre('[data-specialists-chapter-crossing="index-silk"] [data-specialists-crossing-lock-knot-top-port]')
      const knotBottom = centre('[data-specialists-chapter-crossing="index-silk"] [data-specialists-crossing-lock-knot-bottom-port]')
      const nav = document.querySelector<HTMLElement>('[data-specialists-chapter-nav]')!
      const openingRopeLayer = document.querySelector<HTMLElement>('[data-specialists-opening-rope-layer]')!
      const openingCrossingRule = document.querySelector<HTMLElement>('[data-specialists-chapter-crossing="opening-index"] [data-specialists-crossing-rule]')!
      const indexSilkCrossingRule = document.querySelector<HTMLElement>('[data-specialists-chapter-crossing="index-silk"] [data-specialists-crossing-rule]')!
      const openingCrossingAnchor = document.querySelector<HTMLElement>('[data-specialists-crossing-lock-placement="opening-index"]')!
      const indexSilkCrossingAnchor = document.querySelector<HTMLElement>('[data-specialists-crossing-lock-placement="index-silk"]')!
      const zIndex = (element: HTMLElement) => Number.parseInt(getComputedStyle(element).zIndex, 10)
      const renderedMaterialWidth = (piece: string) => {
        const placementElement = placement(piece)
        const imageElement = image(piece)
        let scaleX = 1
        let current: HTMLElement | null = imageElement
        while (current !== null && current !== placementElement) {
          const transform = getComputedStyle(current).transform
          if (transform !== 'none') {
            const matrix = new DOMMatrixReadOnly(transform)
            scaleX *= Math.hypot(matrix.a, matrix.b)
          }
          current = current.parentElement
        }
        return Number.parseFloat(getComputedStyle(imageElement).width) * scaleX
      }
      const indexVariant = image('index').dataset.specialistsRopeVariant
      const indexEntryRatio = indexVariant === 'taut-bow' ? 282.5 / 724 : 362.5 / 724
      const indexExitRatio = indexVariant === 'taut-bow' ? 289 / 724 : 362.5 / 724
      const indexThicknessRatio = indexVariant === 'taut-bow' ? 44 / 724 : 52 / 724

      return {
        openingCrossingBottom: openingCrossing.bottom,
        indexSilkCrossingBottom: indexSilkCrossing.bottom,
        indexSilkAnchor,
        knotTop,
        knotBottom,
        openingExit: point('opening', 362.5 / 724, 1),
        indexEntry: point('index', indexEntryRatio, 0),
        indexExit: point('index', indexExitRatio, 1),
        silkEntry: point('silk-upper', 359.5 / 724, 0),
        silkJoin: {
          port: centre('[data-silk-rope-join-port]'),
          upper: point('silk-upper', 362.5 / 724, 1),
          lower: point('silk-lower', 292 / 724, 0),
        },
        thickness: {
          opening: renderedMaterialWidth('opening') * (52 / 724),
          index: renderedMaterialWidth('index') * indexThicknessRatio,
          silkUpper: renderedMaterialWidth('silk-upper') * (52 / 724),
          silkLower: renderedMaterialWidth('silk-lower') * (43 / 724),
        },
        layers: {
          nav: zIndex(nav),
          openingRope: zIndex(openingRopeLayer),
          openingRule: zIndex(openingCrossingRule),
          indexSilkRule: zIndex(indexSilkCrossingRule),
          openingAnchor: zIndex(openingCrossingAnchor),
          indexSilkAnchor: zIndex(indexSilkCrossingAnchor),
        },
      }
    })

    samples.push({ width, ...geometry })
  }

  const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y)
  for (const sample of samples) {
    expect(Math.abs(sample.indexSilkAnchor.y - sample.indexSilkCrossingBottom), JSON.stringify(samples)).toBeLessThanOrEqual(1)
    expect(distance(sample.openingExit, sample.indexEntry), JSON.stringify(samples)).toBeLessThanOrEqual(18)
    expect(distance(sample.indexExit, sample.knotTop), JSON.stringify(samples)).toBeLessThanOrEqual(6)
    expect(Math.abs(sample.silkEntry.x - sample.knotBottom.x), JSON.stringify(samples)).toBeLessThanOrEqual(3)
    expect(distance(sample.silkJoin.upper, sample.silkJoin.port), JSON.stringify(samples)).toBeLessThanOrEqual(2)
    expect(distance(sample.silkJoin.lower, sample.silkJoin.port), JSON.stringify(samples)).toBeLessThanOrEqual(2)
    expect(distance(sample.silkJoin.upper, sample.silkJoin.lower), JSON.stringify(samples)).toBeLessThanOrEqual(2)
    const thicknesses = Object.values(sample.thickness)
    expect(Math.max(...thicknesses) - Math.min(...thicknesses), JSON.stringify(samples)).toBeLessThanOrEqual(3)
    expect(Math.max(...thicknesses), JSON.stringify(samples)).toBeLessThanOrEqual(13)
    expect(sample.layers.openingRule, JSON.stringify(samples)).toBeLessThan(sample.layers.openingRope)
    expect(sample.layers.indexSilkRule, JSON.stringify(samples)).toBeLessThan(8)
    expect(sample.layers.nav, JSON.stringify(samples)).toBeGreaterThan(sample.layers.openingRope)
    expect(sample.layers.nav, JSON.stringify(samples)).toBeGreaterThan(sample.layers.openingAnchor)
    expect(sample.layers.indexSilkAnchor, JSON.stringify(samples)).toBeGreaterThan(20)
  }

  expect(Math.max(...samples.map((sample) => sample.indexSilkAnchor.x)) - Math.min(...samples.map((sample) => sample.indexSilkAnchor.x)), JSON.stringify(samples)).toBeLessThanOrEqual(1)
  expect(Math.abs(samples[0].indexSilkAnchor.x - 329), JSON.stringify(samples)).toBeLessThanOrEqual(1)
})

test('The Usual Specialists authors the three-layer Index to Silk lock proof at 1440', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await page.goto(specialistsPreviewPath)

  const crossing = page.locator('[data-specialists-chapter-crossing="index-silk"]')
  const fallbackAnchor = crossing.locator('[data-specialists-crossing-anchor="index-silk"]')
  const lock = crossing.locator('[data-specialists-crossing-lockup]')
  const anchor = lock.locator('[data-specialists-crossing-lock-layer="anchor"]')
  const foregroundRope = lock.locator('[data-specialists-crossing-lock-layer="foreground-rope"]')
  const foregroundRing = lock.locator('[data-specialists-crossing-lock-layer="foreground-ring"]')
  const anchorImage = lock.locator('[data-specialists-crossing-lock-anchor-image]')
  const knot = lock.locator('[data-specialists-crossing-lock-knot-image]')
  const ringOccluder = lock.locator('[data-specialists-crossing-lock-ring-occluder-image]')
  const knotTop = lock.locator('[data-specialists-crossing-lock-knot-top-port]')
  const knotBottom = lock.locator('[data-specialists-crossing-lock-knot-bottom-port]')

  await expect(lock).toBeVisible()
  await expect(fallbackAnchor).toBeHidden()
  for (const layer of [anchor, foregroundRope, foregroundRing, anchorImage, knot, ringOccluder, knotTop, knotBottom]) await expect(layer).toBeVisible()

  const crossingBox = await crossing.boundingBox()
  const lockBox = await lock.boundingBox()
  const anchorImageBox = await anchorImage.boundingBox()
  const knotBox = await knot.boundingBox()
  const ringOccluderBox = await ringOccluder.boundingBox()
  expect(crossingBox).not.toBeNull()
  expect(lockBox).not.toBeNull()
  expect(anchorImageBox).not.toBeNull()
  expect(knotBox).not.toBeNull()
  expect(ringOccluderBox).not.toBeNull()

  const lockCentre = {
    x: lockBox!.x + lockBox!.width / 2,
    y: lockBox!.y + lockBox!.height / 2,
  }
  expect(Math.abs(lockCentre.x - (crossingBox!.x + 329))).toBeLessThanOrEqual(1)
  expect(Math.abs(lockCentre.y - crossingBox!.y - crossingBox!.height)).toBeLessThanOrEqual(1)

  const layers = await lock.evaluate((root) => {
    const zIndex = (name: string) => Number.parseInt(getComputedStyle(root.querySelector<HTMLElement>(`[data-specialists-crossing-lock-layer="${name}"]`)!).zIndex, 10)
    return {
      anchor: zIndex('anchor'),
      foregroundRope: zIndex('foreground-rope'),
      foregroundRing: zIndex('foreground-ring'),
    }
  })
  expect(layers.anchor).toBeLessThan(layers.foregroundRope)
  expect(layers.foregroundRope).toBeLessThan(layers.foregroundRing)

  const overlaps = (a: NonNullable<typeof anchorImageBox>, b: NonNullable<typeof knotBox>) => (
    a.x < b.x + b.width
    && a.x + a.width > b.x
    && a.y < b.y + b.height
    && a.y + a.height > b.y
  )
  expect(overlaps(anchorImageBox!, knotBox!)).toBe(true)
  expect(overlaps(ringOccluderBox!, knotBox!)).toBe(true)
  expect(Math.abs(anchorImageBox!.x - ringOccluderBox!.x)).toBeLessThanOrEqual(1)
  expect(Math.abs(anchorImageBox!.y - ringOccluderBox!.y)).toBeLessThanOrEqual(1)
  expect(Math.abs(anchorImageBox!.width - ringOccluderBox!.width)).toBeLessThanOrEqual(1)
  expect(Math.abs(anchorImageBox!.height - ringOccluderBox!.height)).toBeLessThanOrEqual(1)
})

test('The Usual Specialists preserves rope topology across authored responsive boundaries', async ({ page }) => {
  const widths = [320, 389, 390, 719, 720, 899, 900, 1399, 1400, 1599, 1600, 1919, 1920, 2560, 2561] as const
  const lockExpectations = {
    320: { percent: 4.516, offsetPx: 11.65, yOffsetPx: 2.44, rotationDeg: 3, scale: 0.7 },
    389: { percent: 4.516, offsetPx: 11.65, yOffsetPx: 2.44, rotationDeg: 3, scale: 0.7 },
    390: { percent: 4.7144, offsetPx: 9, yOffsetPx: 2.43, rotationDeg: 6, scale: 0.7 },
    719: { percent: 4.7144, offsetPx: 9, yOffsetPx: 2.43, rotationDeg: 6, scale: 0.7 },
    720: { percent: 20.9075, offsetPx: 11.72, yOffsetPx: 2.38, rotationDeg: 1, scale: 0.85 },
    899: { percent: 20.9075, offsetPx: 11.72, yOffsetPx: 2.38, rotationDeg: 1, scale: 0.85 },
    900: { percent: 22.1358, offsetPx: 11.77, yOffsetPx: 2.35, rotationDeg: -1, scale: 0.85 },
    1399: { percent: 22.1358, offsetPx: 11.77, yOffsetPx: 2.35, rotationDeg: -1, scale: 0.85 },
    1400: { absolutePx: 329, yOffsetPx: 0, rotationDeg: 2.5, scale: 0.9 },
    1599: { absolutePx: 329, yOffsetPx: 0, rotationDeg: 2.5, scale: 0.9 },
    1600: { absolutePx: 329, yOffsetPx: 0, rotationDeg: 2.5, scale: 0.9 },
    1919: { absolutePx: 329, yOffsetPx: 0, rotationDeg: 2.5, scale: 0.9 },
    1920: { absolutePx: 329, yOffsetPx: 0, rotationDeg: 2.5, scale: 0.9 },
    2560: { absolutePx: 329, yOffsetPx: 0, rotationDeg: 2.5, scale: 0.9 },
    2561: { absolutePx: 329, yOffsetPx: 0, rotationDeg: 2.5, scale: 0.9 },
  } as const
  const samples = []

  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 390 ? 844 : 1100 })
    await page.goto(specialistsPreviewPath)

    const opening = page.locator('[data-specialists-rope-piece="opening"]')
    const index = page.locator('[data-specialists-rope-piece="index"]')
    const silkUpper = page.locator('[data-specialists-rope-piece="silk-upper"]')
    const silkLower = page.locator('[data-specialists-rope-piece="silk-lower"]')
    const openingCrossing = page.locator('[data-specialists-chapter-crossing="opening-index"]')
    const indexSilkCrossing = page.locator('[data-specialists-chapter-crossing="index-silk"]')
    for (const rope of [opening, index, silkUpper, silkLower]) await expect(rope).toBeVisible()
    await expect(openingCrossing.locator('[data-specialists-crossing-lockup]')).toBeVisible()
    await expect(indexSilkCrossing.locator('[data-specialists-crossing-lockup]')).toBeVisible()
    await expect(page.locator('[data-specialists-crossing-anchor="index-silk"]')).toBeHidden()

    const geometry = await page.evaluate(() => {
      const placement = (piece: string) => document.querySelector<HTMLElement>(`[data-specialists-rope-piece="${piece}"]`)!
      const image = (piece: string) => Array.from(placement(piece).querySelectorAll<HTMLImageElement>('img'))
        .find((candidate) => candidate.getClientRects().length > 0)!
      const point = (piece: string, xRatio: number, yRatio: number) => {
        const marker = document.createElement('span')
        marker.style.position = 'absolute'
        marker.style.left = `${xRatio * 100}%`
        marker.style.top = `${yRatio * 100}%`
        marker.style.width = '1px'
        marker.style.height = '1px'
        marker.style.pointerEvents = 'none'
        placement(piece).append(marker)
        const box = marker.getBoundingClientRect()
        marker.remove()
        return { x: box.left + box.width / 2, y: box.top + box.height / 2 }
      }
      const centre = (selector: string) => {
        const box = document.querySelector<HTMLElement>(selector)!.getBoundingClientRect()
        return { x: box.left + box.width / 2, y: box.top + box.height / 2 }
      }
      const box = (selector: string) => document.querySelector<HTMLElement>(selector)!.getBoundingClientRect()
      const canvas = box('[data-specialists-canvas="authored"]')
      const nav = box('[data-specialists-chapter-nav]')
      const openingRopeLayer = box('[data-specialists-opening-rope-layer]')
      const openingCrossing = box('[data-specialists-chapter-crossing="opening-index"]')
      const indexSilkCrossing = box('[data-specialists-chapter-crossing="index-silk"]')
      const openingIndexLockPlacement = document.querySelector<HTMLElement>('[data-specialists-crossing-lock-placement="opening-index"]')!
      const indexSilkLockPlacement = document.querySelector<HTMLElement>('[data-specialists-crossing-lock-placement="index-silk"]')!
      const indexSilkLockPlacementBox = indexSilkLockPlacement.getBoundingClientRect()
      const lockTransform = new DOMMatrixReadOnly(getComputedStyle(indexSilkLockPlacement).transform)
      const indexSilkAnchor = centre('[data-specialists-chapter-crossing="index-silk"] [data-specialists-crossing-lockup]')
      const knotTop = centre('[data-specialists-chapter-crossing="index-silk"] [data-specialists-crossing-lock-knot-top-port]')
      const knotBottom = centre('[data-specialists-chapter-crossing="index-silk"] [data-specialists-crossing-lock-knot-bottom-port]')
      const openingRopeLayerElement = document.querySelector<HTMLElement>('[data-specialists-opening-rope-layer]')!
      const navElement = document.querySelector<HTMLElement>('[data-specialists-chapter-nav]')!
      const zIndex = (element: HTMLElement) => Number.parseInt(getComputedStyle(element).zIndex, 10)
      const renderedMaterialWidth = (piece: string) => {
        const placementElement = placement(piece)
        const imageElement = image(piece)
        let scaleX = 1
        let current: HTMLElement | null = imageElement
        while (current !== null && current !== placementElement) {
          const transform = getComputedStyle(current).transform
          if (transform !== 'none') {
            const matrix = new DOMMatrixReadOnly(transform)
            scaleX *= Math.hypot(matrix.a, matrix.b)
          }
          current = current.parentElement
        }
        return Number.parseFloat(getComputedStyle(imageElement).width) * scaleX
      }

      const indexVariant = image('index').dataset.specialistsRopeVariant
      const indexEntryRatio = indexVariant === 'taut-bow' ? 282.5 / 724 : 362.5 / 724
      const indexExitRatio = indexVariant === 'taut-bow' ? 289 / 724 : 362.5 / 724
      const indexThicknessRatio = indexVariant === 'taut-bow' ? 44 / 724 : 52 / 724

      return {
        canvasLeft: canvas.left,
        openingCrossingBottom: openingCrossing.bottom,
        indexSilkCrossingBottom: indexSilkCrossing.bottom,
        indexSilkCrossingLeft: indexSilkCrossing.left,
        indexSilkCrossingWidth: indexSilkCrossing.width,
        indexSilkAnchor,
        indexSilkLockPlacement: {
          centre: {
            x: indexSilkLockPlacementBox.left + indexSilkLockPlacementBox.width / 2,
            y: indexSilkLockPlacementBox.top + indexSilkLockPlacementBox.height / 2,
          },
          rotationDeg: Math.atan2(lockTransform.b, lockTransform.a) * (180 / Math.PI),
          scale: Math.hypot(lockTransform.a, lockTransform.b),
        },
        knotTop,
        knotBottom,
        openingExit: point('opening', 362.5 / 724, 1),
        indexEntry: point('index', indexEntryRatio, 0),
        indexExit: point('index', indexExitRatio, 1),
        silkEntry: point('silk-upper', 359.5 / 724, 0),
        silkJoin: {
          port: centre('[data-silk-rope-join-port]'),
          upper: point('silk-upper', 362.5 / 724, 1),
          lower: point('silk-lower', 292 / 724, 0),
        },
        thickness: {
          opening: renderedMaterialWidth('opening') * (52 / 724),
          index: renderedMaterialWidth('index') * indexThicknessRatio,
          silkUpper: renderedMaterialWidth('silk-upper') * (52 / 724),
          silkLower: renderedMaterialWidth('silk-lower') * (43 / 724),
        },
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        nav: {
          top: nav.top,
          bottom: nav.bottom,
          background: getComputedStyle(navElement).backgroundColor,
          zIndex: zIndex(navElement),
        },
        openingIndexLockZ: zIndex(openingIndexLockPlacement),
        openingRopeLayer: {
          top: openingRopeLayer.top,
          bottom: openingRopeLayer.bottom,
          zIndex: zIndex(openingRopeLayerElement),
        },
      }
    })

    samples.push({ width, ...geometry })
  }

  const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y)
  for (const sample of samples) {
    const expectedLock = lockExpectations[sample.width]
    const expectedLockX = 'absolutePx' in expectedLock
      ? sample.indexSilkCrossingLeft + expectedLock.absolutePx
      : sample.indexSilkCrossingLeft + sample.indexSilkCrossingWidth * (expectedLock.percent / 100) + expectedLock.offsetPx
    const expectedLockY = sample.indexSilkCrossingBottom + expectedLock.yOffsetPx
    expect(Math.abs(sample.indexSilkLockPlacement.centre.x - expectedLockX), JSON.stringify(sample)).toBeLessThanOrEqual(1)
    expect(Math.abs(sample.indexSilkLockPlacement.centre.y - expectedLockY), JSON.stringify(sample)).toBeLessThanOrEqual(1)
    expect(Math.abs(sample.indexSilkLockPlacement.rotationDeg - expectedLock.rotationDeg), JSON.stringify(sample)).toBeLessThanOrEqual(0.05)
    expect(Math.abs(sample.indexSilkLockPlacement.scale - expectedLock.scale), JSON.stringify(sample)).toBeLessThanOrEqual(0.005)
    expect(distance(sample.openingExit, sample.indexEntry), JSON.stringify(sample)).toBeLessThanOrEqual(18)
    expect(distance(sample.indexExit, sample.knotTop), JSON.stringify(sample)).toBeLessThanOrEqual(6)
    expect(Math.abs(sample.silkEntry.x - sample.knotBottom.x), JSON.stringify(sample)).toBeLessThanOrEqual(3)
    expect(distance(sample.silkJoin.upper, sample.silkJoin.port), JSON.stringify(sample)).toBeLessThanOrEqual(2)
    expect(distance(sample.silkJoin.lower, sample.silkJoin.port), JSON.stringify(sample)).toBeLessThanOrEqual(2)
    expect(distance(sample.silkJoin.upper, sample.silkJoin.lower), JSON.stringify(sample)).toBeLessThanOrEqual(2)
    const thicknesses = Object.values(sample.thickness)
    expect(Math.max(...thicknesses) - Math.min(...thicknesses), JSON.stringify(sample)).toBeLessThanOrEqual(3)
    expect(Math.max(...thicknesses), JSON.stringify(sample)).toBeLessThanOrEqual(13)
    expect(sample.overflow, JSON.stringify(sample)).toBeLessThanOrEqual(0)
    expect(sample.openingRopeLayer.bottom, JSON.stringify(sample)).toBeGreaterThanOrEqual(sample.nav.bottom)
    expect(sample.nav.zIndex, JSON.stringify(sample)).toBeGreaterThan(sample.openingRopeLayer.zIndex)
    expect(sample.nav.zIndex, JSON.stringify(sample)).toBeGreaterThan(sample.openingIndexLockZ)
    expect(sample.nav.background, JSON.stringify(sample)).toBe('rgb(230, 234, 235)')
  }

  const ceiling = samples.find((sample) => sample.width === 2560)!
  const beyondCeiling = samples.find((sample) => sample.width === 2561)!
  expect(Math.abs((ceiling.indexSilkAnchor.x - ceiling.canvasLeft) - (beyondCeiling.indexSilkAnchor.x - beyondCeiling.canvasLeft)), JSON.stringify({ ceiling, beyondCeiling })).toBeLessThanOrEqual(.05)
  expect(Math.abs((ceiling.knotTop.x - ceiling.canvasLeft) - (beyondCeiling.knotTop.x - beyondCeiling.canvasLeft)), JSON.stringify({ ceiling, beyondCeiling })).toBeLessThanOrEqual(.05)
  expect(Math.abs((ceiling.knotBottom.x - ceiling.canvasLeft) - (beyondCeiling.knotBottom.x - beyondCeiling.canvasLeft)), JSON.stringify({ ceiling, beyondCeiling })).toBeLessThanOrEqual(.05)
})

test('The Usual Specialists layers Silk-owned rope below traversal and below the authored crossing lock', async ({ page }) => {
  for (const width of [1440, 390] as const) {
    await page.setViewportSize({ width, height: width < 390 ? 844 : 1100 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const traversalComposition = silk.locator('[data-silk-traversal-composition]')
    const upperRope = silk.locator('[data-specialists-rope-piece="silk-upper"]')
    const lowerRope = silk.locator('[data-specialists-rope-piece="silk-lower"]')
    const nameMark = silk.locator('[data-silk-name-mark]')
    const frame = silk.locator('[data-silk-commission-05-frame]')
    const traversal = silk.locator('[data-silk-commission="06"]')
    const crossingLock = page.locator('[data-specialists-crossing-lock-placement="index-silk"]')

    const layer = async (locator: import('@playwright/test').Locator): Promise<number> =>
      Number.parseInt(await locator.evaluate((element) => getComputedStyle(element).zIndex), 10)
    const compositionZ = await layer(traversalComposition)
    const nameZ = await layer(nameMark)
    const frameZ = await layer(frame)
    const upperRopeZ = await layer(upperRope)
    const lowerRopeZ = await layer(lowerRope)
    const traversalZ = await layer(traversal)
    const lockZ = await layer(crossingLock)

    expect(nameZ, JSON.stringify({ width, nameZ, compositionZ })).toBeLessThan(compositionZ)
    expect(frameZ, JSON.stringify({ width, frameZ, compositionZ })).toBeLessThan(compositionZ)
    expect(upperRopeZ, JSON.stringify({ width, upperRopeZ, traversalZ })).toBeLessThan(traversalZ)
    expect(lowerRopeZ, JSON.stringify({ width, lowerRopeZ, traversalZ })).toBeLessThan(traversalZ)
    expect(lockZ, JSON.stringify({ width, lockZ, compositionZ })).toBeGreaterThan(compositionZ)
    expect(await traversalComposition.evaluate((root) => (
      root.contains(root.querySelector('[data-specialists-rope-piece="silk-upper"]'))
      && root.contains(root.querySelector('[data-specialists-rope-piece="silk-lower"]'))
      && root.contains(root.querySelector('[data-silk-commission="06"]'))
      && !root.contains(root.querySelector('[data-specialists-crossing-anchor]'))
    ))).toBe(true)
  }
})

test('The Usual Specialists keeps the Index-to-Silk crossing outside the clipped Index milestone', async ({ page }) => {
  for (const width of [1440, 390] as const) {
    await page.setViewportSize({ width, height: width < 390 ? 844 : 1100 })
    await page.goto(specialistsPreviewPath)

    const milestone = page.locator('[data-specialists-index-milestone]')
    const crossing = page.locator('[data-specialists-chapter-crossing="index-silk"]')
    const silk = page.getByRole('region', { name: 'Silk' })

    expect(await crossing.evaluate((element) => element.closest('[data-specialists-index-milestone]') === null)).toBe(true)

    const milestoneBox = await milestone.boundingBox()
    const crossingBox = await crossing.boundingBox()
    const silkBox = await silk.boundingBox()
    expect(milestoneBox).not.toBeNull()
    expect(crossingBox).not.toBeNull()
    expect(silkBox).not.toBeNull()
    expect(
      Math.abs(milestoneBox!.y + milestoneBox!.height - crossingBox!.y),
      JSON.stringify({ width, milestoneBox, crossingBox, silkBox }),
    ).toBeLessThanOrEqual(1)
    expect(
      Math.abs(crossingBox!.y + crossingBox!.height - silkBox!.y),
      JSON.stringify({ width, milestoneBox, crossingBox, silkBox }),
    ).toBeLessThanOrEqual(1)
  }
})

test('The Usual Specialists moves only the world behind the first Silk aperture on normal scroll', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(specialistsPreviewPath)

  const composition = page.locator('[data-silk-commission="05"] [data-silk-aperture-composition]')
  const viewport = composition.locator('[data-silk-commission-05-world-viewport]')
  const scene = composition.locator('[data-silk-commission-05-scene]')
  const frame = composition.locator('[data-silk-commission-05-frame]')
  await composition.scrollIntoViewIfNeeded()
  await expect(composition).toBeVisible()

  const capture = async () => {
    await expect.poll(() => scene.getAttribute('data-silk-parallax-offset')).not.toBeNull()
    return composition.evaluate((element) => {
      const scene = element.querySelector<HTMLElement>('[data-silk-commission-05-scene]')!
      const viewport = element.querySelector<HTMLElement>('[data-silk-commission-05-world-viewport]')!
      const frame = element.querySelector<HTMLElement>('[data-silk-commission-05-frame]')!
      const root = element.getBoundingClientRect()
      const viewportBox = viewport.getBoundingClientRect()
      const sceneBox = scene.getBoundingClientRect()
      const frameBox = frame.getBoundingClientRect()
      return {
        offset: Number.parseFloat(scene.dataset.silkParallaxOffset ?? '0'),
        frame: {
          height: frameBox.height,
          offsetX: frameBox.x - root.x,
          offsetY: frameBox.y - root.y,
          width: frameBox.width,
        },
        scene: {
          bottomBleed: sceneBox.bottom - viewportBox.bottom,
          topBleed: viewportBox.top - sceneBox.top,
        },
      }
    })
  }

  const before = await capture()
  await page.evaluate(() => window.scrollBy(0, 420))
  await expect.poll(async () => (await capture()).offset).not.toBeCloseTo(before.offset, 1)
  const after = await capture()

  expect(Math.abs(after.offset)).toBeLessThanOrEqual(64.1)
  expect(Math.abs(after.offset - before.offset)).toBeGreaterThan(2)
  expect(after.scene.topBleed).toBeGreaterThanOrEqual(8)
  expect(after.scene.bottomBleed).toBeGreaterThanOrEqual(8)
  expect(before.scene.topBleed).toBeGreaterThanOrEqual(8)
  expect(before.scene.bottomBleed).toBeGreaterThanOrEqual(8)
  expect(Math.abs(after.frame.offsetX - before.frame.offsetX)).toBeLessThanOrEqual(0.5)
  expect(Math.abs(after.frame.offsetY - before.frame.offsetY)).toBeLessThanOrEqual(0.5)
  expect(Math.abs(after.frame.width - before.frame.width)).toBeLessThanOrEqual(0.5)
  expect(Math.abs(after.frame.height - before.frame.height)).toBeLessThanOrEqual(0.5)
})

test('The Usual Specialists disables Silk aperture parallax for reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(specialistsPreviewPath)

  const composition = page.locator('[data-silk-commission="05"] [data-silk-aperture-composition]')
  const scene = composition.locator('[data-silk-commission-05-scene]')
  await composition.scrollIntoViewIfNeeded()
  await expect.poll(() => scene.getAttribute('data-silk-parallax-offset')).toBe('0.00')
  await page.evaluate(() => window.scrollBy(0, 420))
  await expect.poll(() => scene.getAttribute('data-silk-parallax-offset')).toBe('0.00')
  await expect(scene).toHaveCSS('transform', 'none')
})

test('The Usual Specialists moves only the service-corridor world behind the second Silk aperture on normal scroll', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(specialistsPreviewPath)

  const composition = page.locator('[data-silk-commission="07"] [data-silk-aperture-composition]')
  const world = composition.locator('[data-silk-commission-07-review-world]')
  const frame = composition.locator('[data-silk-commission-07-review-frame]')
  await composition.scrollIntoViewIfNeeded()
  await expect(composition).toBeVisible()

  const capture = async () => {
    await expect.poll(() => world.getAttribute('data-silk-parallax-offset')).not.toBeNull()
    return composition.evaluate((element) => {
      const world = element.querySelector<HTMLElement>('[data-silk-commission-07-review-world]')!
      const frame = element.querySelector<HTMLElement>('[data-silk-commission-07-review-frame]')!
      const root = element.getBoundingClientRect()
      const frameBox = frame.getBoundingClientRect()
      return {
        offset: Number.parseFloat(world.dataset.silkParallaxOffset ?? '0'),
        frame: {
          height: frameBox.height,
          offsetX: frameBox.x - root.x,
          offsetY: frameBox.y - root.y,
          width: frameBox.width,
        },
      }
    })
  }

  const before = await capture()
  await page.evaluate(() => window.scrollBy(0, 420))
  await expect.poll(async () => (await capture()).offset).not.toBeCloseTo(before.offset, 1)
  const after = await capture()

  expect(Math.abs(after.offset)).toBeLessThanOrEqual(64.1)
  expect(Math.abs(after.offset - before.offset)).toBeGreaterThan(2)
  expect(Math.abs(after.frame.offsetX - before.frame.offsetX)).toBeLessThanOrEqual(0.5)
  expect(Math.abs(after.frame.offsetY - before.frame.offsetY)).toBeLessThanOrEqual(0.5)
  expect(Math.abs(after.frame.width - before.frame.width)).toBeLessThanOrEqual(0.5)
  expect(Math.abs(after.frame.height - before.frame.height)).toBeLessThanOrEqual(0.5)
})

test('The Usual Specialists has no authored composition transition at 620', async ({ page }) => {
  const specialistsPath = specialistsPreviewPath
  const capture = async (width: 621 | 620) => {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPath)

    const rope = page.locator('[data-specialists-rope-piece="silk-upper"]')
    const nameMark = page.locator('[data-silk-name-mark]')
    const thresholdCopy = page.locator('[data-specialists-threshold-copy]')
    await expect(rope).toHaveCount(1)
    await expect(nameMark).toBeVisible()
    await expect(thresholdCopy).toBeVisible()

    const ropeCrossing = await rope.evaluate((ropeElement, nameElement) => {
      const rope = ropeElement.getBoundingClientRect()
      const name = (nameElement as HTMLElement).getBoundingClientRect()
      const targetY = name.top + name.height / 2
      return { x: rope.left + rope.width * (362.5 / 724), y: targetY }
    }, await nameMark.elementHandle())
    const threshold = await thresholdCopy.boundingBox()
    expect(threshold).not.toBeNull()
    return { ropeCrossing, threshold: threshold! }
  }

  const at621 = await capture(621)
  const at620 = await capture(620)
  expect(Math.abs(at620.ropeCrossing.x - at621.ropeCrossing.x), JSON.stringify({ at621, at620 })).toBeLessThanOrEqual(3)
  expect(Math.abs(at620.ropeCrossing.y - at621.ropeCrossing.y), JSON.stringify({ at621, at620 })).toBeLessThanOrEqual(3)
  expect(Math.abs(at620.threshold.x - at621.threshold.x), JSON.stringify({ at621, at620 })).toBeLessThanOrEqual(3)
  expect(Math.abs(at620.threshold.width - at621.threshold.width), JSON.stringify({ at621, at620 })).toBeLessThanOrEqual(3)
})

test('The Usual Specialists keeps the accepted Index traversal relationships through ultrawide', async ({ page }) => {
  const specialistsPath = specialistsPreviewPath
  const traversal = (name: string) => page.locator(`[data-index-traversal="${name}"]`)
  const box = async (locator: import('@playwright/test').Locator) => {
    const value = await locator.boundingBox()
    expect(value).not.toBeNull()
    return value!
  }
  const horizontalGap = (ahead: { x: number }, follower: { x: number; width: number }) =>
    ahead.x - (follower.x + follower.width)
  const gapAt = async (width: number) => {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPath)
    return horizontalGap(await box(traversal('index-walk')), await box(traversal('patch-follow')))
  }

  const separationAt1400 = await gapAt(1400)
  for (const width of [1401, 1440, 1599, 1600, 1919] as const) {
    expect(await gapAt(width)).toBeLessThanOrEqual(separationAt1400 + 2)
  }

  await page.setViewportSize({ width: 1599, height: 1100 })
  await page.goto(specialistsPath)
  await expect(traversal('index-return')).toBeHidden()
  await expect(traversal('patch-return')).toBeHidden()

  for (const width of [1600, 1920, 1921, 2048, 2160, 2304, 2400, 2560] as const) {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPath)
    const main = await box(page.locator('[data-index-substrate="desk-diagram"]'))
    const carrier = await box(page.locator('[data-index-substrate="blue-carrier"]'))
    const graphPaper = await box(page.locator('[data-index-substrate="graph-paper"]'))
    const indexReturn = await box(traversal('index-return'))
    const patchReturn = await box(traversal('patch-return'))

    expect(carrier.x).toBeLessThan(main.x)
    if (width < 1920) expect(graphPaper.x).toBeLessThan(main.x)
    else expect(graphPaper.x).toBeGreaterThan(main.x)
    expect(indexReturn.x).toBeGreaterThanOrEqual(main.x - 2)
    expect(indexReturn.x + indexReturn.width).toBeLessThanOrEqual(main.x + main.width + 2)
    expect(patchReturn.x).toBeGreaterThanOrEqual(main.x - 2)
    expect(patchReturn.x + patchReturn.width).toBeLessThanOrEqual(main.x + main.width + 2)
    expect(indexReturn.x).toBeLessThan(patchReturn.x)
    expect(indexReturn.y).toBeLessThan(patchReturn.y)
  }
})

test('The Usual Specialists switches the lower Patch across the upper Patch at the ultrawide boundary without collapsing their visual separation', async ({ page }) => {
  const specialistsPath = specialistsPreviewPath
  const minimumPatchGap = 48
  const traversal = (name: string) => page.locator(`[data-index-traversal="${name}"]`)
  const box = async (locator: import('@playwright/test').Locator) => {
    const value = await locator.boundingBox()
    expect(value).not.toBeNull()
    return value!
  }
  const geometryAt = async (width: number) => {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPath)
    return {
      lowerPatch: await box(traversal('patch-peer')),
      upperPatch: await box(traversal('patch-follow')),
      blueCarrier: await box(page.locator('[data-index-substrate="blue-carrier"]')),
      graphPaper: await box(page.locator('[data-index-substrate="graph-paper"]')),
    }
  }

  const at1919 = await geometryAt(1919)
  expect(at1919.upperPatch.x - (at1919.lowerPatch.x + at1919.lowerPatch.width)).toBeGreaterThanOrEqual(minimumPatchGap)

  const ultrawide = []
  for (const width of [1920, 2048, 2160, 2304, 2400, 2560] as const) {
    const geometry = await geometryAt(width)
    ultrawide.push({ width, ...geometry })
    expect(
      geometry.lowerPatch.x - (geometry.upperPatch.x + geometry.upperPatch.width),
      JSON.stringify({ width, lowerPatch: geometry.lowerPatch, upperPatch: geometry.upperPatch }),
    ).toBeGreaterThanOrEqual(minimumPatchGap)
    expect(
      geometry.blueCarrier.x,
      JSON.stringify({ width, blueCarrier: geometry.blueCarrier, at1919: at1919.blueCarrier }),
    ).toBeLessThanOrEqual(at1919.blueCarrier.x + 2)
  }

  const graphOffsetAt1920 = ultrawide[0].graphPaper.x - ultrawide[0].blueCarrier.x
  for (const geometry of ultrawide) {
    expect(
      Math.abs((geometry.graphPaper.x - geometry.blueCarrier.x) - graphOffsetAt1920),
      JSON.stringify({ width: geometry.width, graphPaper: geometry.graphPaper, blueCarrier: geometry.blueCarrier }),
    ).toBeLessThanOrEqual(2)
  }
  expect(Math.abs(ultrawide.at(-1)!.blueCarrier.x - at1919.blueCarrier.x)).toBeLessThanOrEqual(2)
})

test('The Usual Specialists keeps Commission 03 character evidence legible through the ultrawide overlap', async ({ page }) => {
  const specialistsPath = specialistsPreviewPath
  const minimumArtCellOverlap = 24
  const box = async (locator: import('@playwright/test').Locator) => {
    const value = await locator.boundingBox()
    expect(value).not.toBeNull()
    return value!
  }
  const overlapArea = (
    first: { x: number; y: number; width: number; height: number },
    second: { x: number; y: number; width: number; height: number },
  ) => {
    const width = Math.max(0, Math.min(first.x + first.width, second.x + second.width) - Math.max(first.x, second.x))
    const height = Math.max(0, Math.min(first.y + first.height, second.y + second.height) - Math.max(first.y, second.y))
    return width * height
  }

  let macguffinOffsetAt1920: { x: number; y: number } | null = null
  let assentOffsetAt1920: { x: number; y: number } | null = null
  for (const width of [1920, 2048, 2160, 2304, 2400, 2560] as const) {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPath)
    const observation = await box(page.locator('[data-index-substrate="commission-03"]'))
    const macguffin = await box(page.locator('[data-index-substrate="commission-04"]'))
    const assentNote = await box(page.locator('[data-index-substrate="assent-note"]'))

    const patchRegion = {
      x: observation.x + observation.width * 0.65,
      y: observation.y + observation.height * 0.32,
      width: observation.width * 0.18,
      height: observation.height * 0.50,
    }
    const indexFaceRegion = {
      x: observation.x + observation.width * 0.32,
      y: observation.y + observation.height * 0.32,
      width: observation.width * 0.26,
      height: observation.height * 0.41,
    }

    const patchCoverage = overlapArea(patchRegion, macguffin) / (patchRegion.width * patchRegion.height)
    const artCellOverlap = observation.x + observation.width - macguffin.x
    const overlapStart = macguffin.x
    const overlapEnd = observation.x + observation.width
    const assentNoteCenterX = assentNote.x + assentNote.width / 2
    const macguffinOffset = { x: macguffin.x - observation.x, y: macguffin.y - observation.y }
    const assentOffset = { x: assentNote.x - observation.x, y: assentNote.y - observation.y }
    if (width === 1920) {
      macguffinOffsetAt1920 = macguffinOffset
      assentOffsetAt1920 = assentOffset
    } else {
      expect(
        Math.abs(macguffinOffset.x - macguffinOffsetAt1920!.x),
        JSON.stringify({ width, macguffinOffset, macguffinOffsetAt1920 }),
      ).toBeLessThanOrEqual(2)
      expect(
        Math.abs(macguffinOffset.y - macguffinOffsetAt1920!.y),
        JSON.stringify({ width, macguffinOffset, macguffinOffsetAt1920 }),
      ).toBeLessThanOrEqual(2)
      expect(
        Math.abs(assentOffset.x - assentOffsetAt1920!.x),
        JSON.stringify({ width, assentOffset, assentOffsetAt1920 }),
      ).toBeLessThanOrEqual(2)
      expect(
        Math.abs(assentOffset.y - assentOffsetAt1920!.y),
        JSON.stringify({ width, assentOffset, assentOffsetAt1920 }),
      ).toBeLessThanOrEqual(2)
    }
    expect(artCellOverlap, JSON.stringify({ width, observation, macguffin })).toBeGreaterThanOrEqual(minimumArtCellOverlap)
    expect(assentNoteCenterX, JSON.stringify({ width, assentNote, overlapStart, overlapEnd })).toBeGreaterThanOrEqual(overlapStart)
    expect(assentNoteCenterX, JSON.stringify({ width, assentNote, overlapStart, overlapEnd })).toBeLessThanOrEqual(overlapEnd)
    expect(overlapArea(assentNote, observation), JSON.stringify({ width, assentNote, observation })).toBeGreaterThan(0)
    expect(overlapArea(assentNote, macguffin), JSON.stringify({ width, assentNote, macguffin })).toBeGreaterThan(0)
    expect(patchCoverage, JSON.stringify({ width, patchRegion, macguffin })).toBeLessThanOrEqual(0.5)
    expect(overlapArea(indexFaceRegion, macguffin), JSON.stringify({ width, indexFaceRegion, macguffin })).toBe(0)
    expect(overlapArea(indexFaceRegion, assentNote), JSON.stringify({ width, indexFaceRegion, assentNote })).toBe(0)
  }
})

test('The Usual Specialists freezes its authored 2560 geometry above the ceiling', async ({ page }) => {
  const specialistsPath = specialistsPreviewPath
  const targets = [
    ['series-lockup', '[data-patch-series-lockup]'],
    ['specialists-wordmark', '[data-specialists-wordmark]'],
    ['threshold-copy', '[data-specialists-threshold-copy]'],
    ['desk-diagram', '[data-index-substrate="desk-diagram"]'],
    ['blue-carrier', '[data-index-substrate="blue-carrier"]'],
    ['graph-paper', '[data-index-substrate="graph-paper"]'],
    ['story-card', '[data-index-story-card]'],
    ['commission-evidence', '[data-index-commission-composition="commission-evidence"]'],
    ['index-walk', '[data-index-traversal="index-walk"]'],
    ['patch-follow', '[data-index-traversal="patch-follow"]'],
    ['index-return', '[data-index-traversal="index-return"]'],
    ['patch-return', '[data-index-traversal="patch-return"]'],
  ] as const
  const box = async (locator: import('@playwright/test').Locator) => {
    await expect(locator).toBeVisible()
    const value = await locator.boundingBox()
    expect(value).not.toBeNull()
    return value!
  }
  const captureAt = async (width: number) => {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPath)
    await expect(page.getByRole('heading', { level: 1, name: 'The Usual Specialists' })).toBeVisible()

    const canvas = await box(page.locator('[data-specialists-canvas="authored"]'))
    const geometry = Object.fromEntries(await Promise.all(targets.map(async ([label, selector]) => {
      const bounds = await box(page.locator(selector))
      return [label, {
        x: bounds.x - canvas.x,
        y: bounds.y - canvas.y,
        width: bounds.width,
        height: bounds.height,
      }]
    }))) as Record<(typeof targets)[number][0], { x: number; y: number; width: number; height: number }>
    const hasHorizontalOverflow = await page.locator('html').evaluate((element) => element.scrollWidth > element.clientWidth)
    return { canvas, geometry, hasHorizontalOverflow }
  }

  const reference = await captureAt(2560)
  expect(reference.canvas.width).toBeCloseTo(2560, 0)
  expect(reference.canvas.x).toBeCloseTo(0, 0)
  expect(reference.hasHorizontalOverflow).toBe(false)

  for (const width of [2561, 2880, 3440] as const) {
    const current = await captureAt(width)
    expect(current.canvas.width).toBeCloseTo(2560, 0)
    expect(Math.abs(current.canvas.x - ((width - 2560) / 2))).toBeLessThanOrEqual(1)
    expect(current.hasHorizontalOverflow).toBe(false)
    expect(
      Math.abs(current.geometry['desk-diagram'].x - reference.geometry['desk-diagram'].x),
      JSON.stringify({ width, current: current.geometry['desk-diagram'], reference: reference.geometry['desk-diagram'] }),
    ).toBeLessThanOrEqual(0.05)

    for (const [label] of targets) {
      for (const dimension of ['x', 'y', 'width', 'height'] as const) {
        expect(
          Math.abs(current.geometry[label][dimension] - reference.geometry[label][dimension]),
          JSON.stringify({ width, label, dimension, current: current.geometry[label], reference: reference.geometry[label] }),
        ).toBeLessThanOrEqual(2)
      }
    }
  }
})

test('Patch family preserves authored reflow and avoids overflow at 768px and 320px', async ({ page }) => {
  const columnCount = async (selector: string) => page.locator(selector).first().evaluate((element) =>
    getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).filter(Boolean).length,
  )

  for (const width of [768, 320]) {
    await page.setViewportSize({ width, height: 844 })

    await page.goto('./patch')
    await expect(page.locator('[data-visual-contract="patch-index"]')).toBeVisible()
    expect(await columnCount('.patch-index__header')).toBe(1)
    expect(await columnCount('.patch-index__character-intro')).toBe(1)
    expect(await columnCount('.patch-index__lead-adventure')).toBe(1)
    await expectNoHorizontalOverflow(page)

    await page.goto('./patch/identity-emporium')
    await expect(page.locator('[data-visual-contract="patch-identity-emporium"]')).toBeVisible()
    expect(await columnCount('.identity-evidence__logic')).toBe(width === 768 ? 3 : 1)
    expect(await columnCount('.identity-evidence__roles')).toBe(width === 768 ? 4 : 2)
    await expectNoHorizontalOverflow(page)

    await page.goto('./patch/tournament-of-reasonable-defaults')
    await expect(page.locator('[data-visual-contract="patch-tournament"]')).toBeVisible()
    expect(await columnCount('.tournament-event__header')).toBe(width === 768 ? 2 : 1)
    await expectNoHorizontalOverflow(page)

  }
})

test('Marketplace header reserves its generic visual measure while the visual chunk is pending', async ({ page }) => {
  let releaseVisual: (() => void) | undefined
  const visualReady = new Promise<void>((resolve) => {
    releaseVisual = resolve
  })

  await page.route('**/*ProjectVisual-*.js', async (route) => {
    const response = await route.fetch()
    await visualReady
    await route.fulfill({ response })
  })

  const navigation = page.goto('./projects/codex-marketplace')
  const header = page.locator('[data-visual-contract="marketplace-case-study-hero"]')
  await expect(header).toBeVisible()
  await expect(page.locator('[data-loading="project-visual"]')).toBeVisible()

  const geometry = await header.locator('[data-loading="project-visual"]').evaluate((element) => {
    const bounds = element.getBoundingClientRect()
    const style = getComputedStyle(element)
    return {
      aspectRatio: bounds.width / bounds.height,
      cssAspectRatio: style.aspectRatio,
      height: bounds.height,
    }
  })

  expect(geometry.cssAspectRatio).toBe('5 / 3')
  expect(geometry.height).toBeGreaterThan(0)
  expect(geometry.aspectRatio).toBeCloseTo(5 / 3, 2)

  releaseVisual?.()
  await navigation
  await expect(header.getByRole('figure', { name: /Marketplace baseline plugins/i })).toBeVisible()
})

test('Patch preserves hero geometry and source order while its portrait visual is pending', async ({ browser }) => {
  for (const width of [1024, 704]) {
    const page = await browser.newPage({ viewport: { width, height: 862 } })
    let releaseVisual: (() => void) | undefined
    const visualReady = new Promise<void>((resolve) => {
      releaseVisual = resolve
    })

    await page.route('**/*ProjectVisual-*.js', async (route) => {
      const response = await route.fetch()
      await visualReady
      await route.fulfill({ response })
    })

    const navigation = page.goto(patchPath)
    const hero = page.locator('[data-visual-contract="patch-case-study-hero"]')
    const intro = hero.locator('[data-project-case-study-intro]')
    const visual = hero.locator('[data-project-case-study-visual]')
    const status = hero.locator('[data-project-case-study-status]')
    await expect(hero).toBeVisible()
    await expect(page.locator('[data-loading="project-visual"]')).toBeVisible()

    const pending = await hero.evaluate((element) => {
      const bounds = (selector: string) => element.querySelector(selector)!.getBoundingClientRect()
      const heroBounds = element.getBoundingClientRect()
      return {
        height: heroBounds.height,
        intro: bounds('[data-project-case-study-intro]'),
        visual: bounds('[data-project-case-study-visual]'),
        status: bounds('[data-project-case-study-status]'),
      }
    })

    if (width <= 704) {
      expect(pending.intro.bottom).toBeLessThanOrEqual(pending.visual.top)
      expect(pending.visual.bottom).toBeLessThanOrEqual(pending.status.top)
    } else {
      expect(pending.visual.width / (await hero.boundingBox())!.width).toBeCloseTo(0.5, 1)
    }

    releaseVisual?.()
    await navigation
    await expect(visual.getByRole('img', { name: /Patch carries an index card and folded map/i })).toBeVisible()

    const resolved = await hero.evaluate((element) => {
      const bounds = (selector: string) => element.querySelector(selector)!.getBoundingClientRect()
      return {
        height: element.getBoundingClientRect().height,
        intro: bounds('[data-project-case-study-intro]'),
        visual: bounds('[data-project-case-study-visual]'),
        status: bounds('[data-project-case-study-status]'),
      }
    })

    expect(Math.abs(resolved.height - pending.height), JSON.stringify({ width, pending, resolved })).toBeLessThanOrEqual(1)
    expect(Math.abs(resolved.intro.top - pending.intro.top)).toBeLessThanOrEqual(1)
    expect(Math.abs(resolved.status.top - pending.status.top)).toBeLessThanOrEqual(1)
    await page.close()
  }
})

test('visitor opens the Wild Bunch route with its Western hook, status, and inspectable evidence', async ({ page }) => {
  const response = await page.goto(wildBunchPath)

  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1, name: 'Wild Bunch' })).toBeVisible()
  await expect(page.locator('.content-status')).toHaveText(/Status\s*pre-alpha/)
  await expect(page.getByText(/wrong name on the crime: yours/i)).toBeVisible()
  const visual = page.getByLabel('Wild Bunch early-alpha town-arrival concept art')
  const caption = visual.locator('figcaption')
  await expect(visual).toBeVisible()
  await expect(caption).toHaveText('Concept art / early-alpha visual direction')

  const visualBox = await visual.boundingBox()
  const captionBox = await caption.boundingBox()
  expect(visualBox).not.toBeNull()
  expect(captionBox).not.toBeNull()
  expect(captionBox!.width).toBeLessThan(visualBox!.width / 2)
  expect(captionBox!.x).toBeGreaterThan(visualBox!.x + visualBox!.width / 2)
  expect(captionBox!.x + captionBox!.width).toBeCloseTo(visualBox!.x + visualBox!.width - 16, 0)

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
  await expect(page.getByRole('figure', { name: 'Session-audit development-build evidence' })).toHaveCount(0)
  await expect(page.getByRole('figure', { name: 'Wanted-notice development-build evidence' })).toBeVisible()
  await expect(page.getByRole('figure', { name: 'Case-file development-build evidence' })).toBeVisible()
})

test('Wild Bunch keeps its mobile status and visual-direction tags outside the image overlay', async ({ page }) => {
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 })
    await page.goto(wildBunchPath)

    const status = page.locator('[data-project-case-study-status] .content-status')
    const visual = page.getByLabel('Wild Bunch early-alpha town-arrival concept art')
    const image = visual.getByRole('img')
    const caption = visual.locator('figcaption')
    const [statusBox, imageBox, captionBox] = await Promise.all([
      status.boundingBox(),
      image.boundingBox(),
      caption.boundingBox(),
    ])

    expect(statusBox).not.toBeNull()
    expect(imageBox).not.toBeNull()
    expect(captionBox).not.toBeNull()
    expect(statusBox!.y + statusBox!.height).toBeLessThanOrEqual(imageBox!.y)
    expect(captionBox!.y).toBeGreaterThanOrEqual(imageBox!.y + imageBox!.height)
    expect(captionBox!.x + captionBox!.width).toBeCloseTo(imageBox!.x + imageBox!.width, 0)
    expect(captionBox!.width).toBeLessThan(imageBox!.width)
    await expectNoHorizontalOverflow(page)
  }
})

test('visitor reaches the Wild Bunch story through client navigation and receives the semantic architecture in source order', async ({ page }) => {
  await page.goto('./projects/')
  await page.getByRole('link', { name: 'Wild Bunch', exact: true }).click()

  await expect(page).toHaveURL(/\/projects\/wild-bunch\/?$/)
  const determinism = page.getByRole('figure', { name: 'Controlled determinism from a compact world contract' })
  await expect(determinism.locator(':scope > ol > li')).toHaveText([
    /Directly packed world contract/,
    /Separate downstream choices/,
    /Deterministic derivation/,
    /Observable outcomes/,
  ])
  await expect(determinism).toContainText('00000000-0000-0000-0000-00012ed0a54e')

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

test('Wild Bunch opens its lead prose into the available desktop field', async ({ page }) => {
  await page.setViewportSize({ width: 1086, height: 912 })
  await page.goto(wildBunchPath)

  const section = page.locator('[data-story-movement="origin"] [data-case-study-section-layout="lead"]')
  const body = section.locator('[data-case-study-section-body]')
  const sectionBox = await section.boundingBox()
  const bodyBox = await body.boundingBox()

  expect(sectionBox).not.toBeNull()
  expect(bodyBox).not.toBeNull()
  expect(sectionBox!.width).toBeGreaterThan(800)
  expect(bodyBox!.width).toBeGreaterThan(400)
})

test('Wild Bunch keeps related content on the mineral route surface', async ({ page }) => {
  await page.setViewportSize({ width: 893, height: 912 })
  await page.goto(wildBunchPath)

  const related = page.getByRole('navigation', { name: 'Related content' })
  const card = related.locator('li').first()
  await expect.poll(async () => {
    const [cardBackground, shellBackground] = await Promise.all([
      card.evaluate((element) => getComputedStyle(element).backgroundColor),
      page.locator('.site-shell.site-shell--interior').evaluate((element) => getComputedStyle(element).backgroundColor),
    ])

    return cardBackground && cardBackground === shellBackground ? cardBackground : null
  }).toBe('rgb(230, 234, 235)')

})

test('Learning Lab lets the representative authority experiment use the full desktop field', async ({ page }) => {
  await page.setViewportSize({ width: 1086, height: 912 })
  await page.goto(learningLabPath)

  const lab = page.locator('.representative-lab[data-lab="7"]')
  const body = lab.locator('dl')
  const [labBox, bodyBox] = await Promise.all([lab.boundingBox(), body.boundingBox()])

  expect(labBox).not.toBeNull()
  expect(bodyBox).not.toBeNull()
  expect(bodyBox!.x).toBeCloseTo(labBox!.x, 0)
  expect(bodyBox!.width).toBeCloseTo(labBox!.width, 0)
})

test('Wild Bunch keeps the canonical UUID on one line whenever the plate can hold it', async ({ page }) => {
  for (const width of [1128, 686, 510]) {
    await page.setViewportSize({ width, height: 912 })
    await page.goto(wildBunchPath)

    const uuid = page.locator('.wild-bunch-codec-map__uuid')
    await expect(uuid).toHaveText('00000000-0000-0000-0000-00012ed0a54e')
    const layout = await uuid.evaluate((element) => {
      const halves = [...element.children].map((half) => half.getBoundingClientRect())
      return {
        lineCount: new Set(halves.map(({ y }) => Math.round(y))).size,
        fitsWithoutScrolling: element.scrollWidth <= element.clientWidth,
      }
    })

    expect(layout.lineCount).toBe(1)
    expect(layout.fitsWithoutScrolling).toBe(true)
  }
})

test('Wild Bunch splits the canonical UUID evenly only under genuine narrow pressure', async ({ page }) => {
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 })
    await page.goto(wildBunchPath)

    const uuid = page.locator('.wild-bunch-codec-map__uuid')
    const layout = await uuid.evaluate((element) => {
      const halves = [...element.children].map((half) => half.getBoundingClientRect())
      return {
        lineCount: new Set(halves.map(({ y }) => Math.round(y))).size,
        lineWidthDifference: Math.abs(halves[0].width - halves[1].width),
        fitsWithoutScrolling: element.scrollWidth <= element.clientWidth,
      }
    })

    expect(layout.lineCount).toBe(2)
    expect(layout.lineWidthDifference).toBeLessThan(20)
    expect(layout.fitsWithoutScrolling).toBe(true)
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

test('Wild Bunch evidence exposes intrinsic image dimensions with one eager concept-art hero and lazy body captures', async ({ page }) => {
  await page.goto(wildBunchPath)

  const hero = page.getByLabel('Wild Bunch early-alpha town-arrival concept art').getByRole('img')
  await expect(hero).toHaveAttribute('width', '720')
  await expect(hero).toHaveAttribute('height', '900')
  await expect(hero).toHaveAttribute('loading', 'eager')
  await expect(hero).toHaveAttribute('fetchpriority', 'high')

  const captures = page.locator('.wild-bunch-evidence img')
  await expect(captures).toHaveCount(4)
  for (const capture of await captures.all()) {
    await expect(capture).toHaveAttribute('loading', 'lazy')
  }
  expect(await captures.evaluateAll((images) => images.map((image) => [image.getAttribute('width'), image.getAttribute('height')]))).toEqual([
    ['640', '400'],
    ['480', '472'],
    ['472', '479'],
    ['640', '489'],
  ])
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
  await expect(showcaseLink).toHaveAttribute('href', '/patch')
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

test('project index contains the complete Patch asset without crop or translation', async ({ page }) => {
  await page.setViewportSize({ width: 688, height: 912 })
  await page.goto('./projects/')

  const frame = page.locator('[data-visual-contract="adventures-of-patch-index-whole-character"]')
  const image = frame.getByRole('img')
  await expect(image).toBeVisible()

  const treatment = await image.evaluate((element) => ({
    fit: getComputedStyle(element).objectFit,
    position: getComputedStyle(element).objectPosition,
    transform: getComputedStyle(element).transform,
  }))

  expect(treatment).toEqual({ fit: 'contain', position: '50% 50%', transform: 'none' })
})

test('Adventures of Patch exposes intrinsic media dimensions with one eager hero and lazy evidence', async ({ page }) => {
  await page.goto(patchPath)

  const heroRegion = page.locator('[data-visual-contract="patch-case-study-hero"]')
  const hero = heroRegion.getByRole('img')
  await expect(hero).toHaveAttribute('width', '500')
  await expect(hero).toHaveAttribute('height', '672')
  await expect(hero).toHaveAttribute('loading', 'eager')
  await expect(hero).toHaveAttribute('fetchpriority', 'high')
  await expect(page.locator('main img[loading="eager"]')).toHaveCount(1)

  const desktopComposition = await heroRegion.evaluate((header) => {
    const visual = header.querySelector('[data-project-case-study-visual]')!.getBoundingClientRect()
    const intro = header.querySelector('[data-project-case-study-intro]')!.getBoundingClientRect()
    const bounds = header.getBoundingClientRect()
    return {
      visualShare: visual.width / bounds.width,
      introStart: (intro.x - bounds.x) / bounds.width,
    }
  })
  expect(desktopComposition.visualShare).toBeCloseTo(0.5, 1)
  expect(desktopComposition.introStart).toBeGreaterThanOrEqual(0.49)

  const evidence = page.locator('.patch-case-study img')
  await expect(evidence).toHaveCount(2)
  for (const image of await evidence.all()) {
    await expect(image).toHaveAttribute('loading', 'lazy')
    await expect(image).toHaveAttribute('width', /^\d+$/)
    await expect(image).toHaveAttribute('height', /^\d+$/)
  }
  await expect(page.locator('.patch-case-study figcaption')).toHaveCount(2)
})

test('Adventures of Patch keeps its whole character and copy in deliberate columns through tablet widths', async ({ page }) => {
  await page.goto(patchPath)

  for (const width of [705, 738, 1024]) {
    await page.setViewportSize({ width, height: 862 })

    const hero = page.locator('[data-visual-contract="patch-case-study-hero"]')
    await expect(hero.getByRole('img')).toBeVisible()
    const geometry = await hero.evaluate((element) => {
      const intro = element.querySelector('[data-project-case-study-intro]')!
      const visual = element.querySelector('[data-project-case-study-visual]')!
      const image = visual.querySelector('img')!
      const bounds = element.getBoundingClientRect()
      const introBounds = intro.getBoundingClientRect()
      const visualBounds = visual.getBoundingClientRect()
      return {
        display: getComputedStyle(element).display,
        imageObjectFit: getComputedStyle(image).objectFit,
        imageObjectPosition: getComputedStyle(image).objectPosition,
        introStart: (introBounds.left - bounds.left) / bounds.width,
        visualShare: visualBounds.width / bounds.width,
        imageContained: image.getBoundingClientRect().left >= visualBounds.left
          && image.getBoundingClientRect().right <= visualBounds.right
          && image.getBoundingClientRect().top >= visualBounds.top
          && image.getBoundingClientRect().bottom <= visualBounds.bottom,
      }
    })

    expect(geometry).toMatchObject({
      display: 'grid',
      imageObjectFit: 'contain',
      imageObjectPosition: '50% 50%',
      imageContained: true,
    })
    expect(geometry.visualShare).toBeCloseTo(0.5, 1)
    expect(geometry.introStart).toBeGreaterThanOrEqual(0.49)
  }
})

test('Adventures of Patch stacks its whole hero at the shared narrow breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 704, height: 862 })
  await page.goto(patchPath)

  const hero = page.locator('[data-visual-contract="patch-case-study-hero"]')
  await expect(hero.getByRole('img')).toBeVisible()
  const geometry = await hero.evaluate((element) => {
    const intro = element.querySelector('[data-project-case-study-intro]')!
    const visual = element.querySelector('[data-project-case-study-visual]')!
    const status = element.querySelector('[data-project-case-study-status]')!
    const image = visual.querySelector('img')!
    const visualBounds = visual.getBoundingClientRect()
    return {
      display: getComputedStyle(element).display,
      flexDirection: getComputedStyle(element).flexDirection,
      introBottom: intro.getBoundingClientRect().bottom,
      introTop: intro.getBoundingClientRect().top,
      titleMaxWidth: getComputedStyle(intro.querySelector('h1')!).maxWidth,
      visualTop: visualBounds.top,
      visualBottom: visualBounds.bottom,
      statusTop: status.getBoundingClientRect().top,
      imageObjectFit: getComputedStyle(image).objectFit,
      imageObjectPosition: getComputedStyle(image).objectPosition,
      imageTransform: getComputedStyle(image).transform,
    }
  })

  expect(geometry).toMatchObject({
    display: 'flex',
    flexDirection: 'column',
    titleMaxWidth: 'none',
    imageObjectFit: 'contain',
    imageObjectPosition: '50% 50%',
  })
  expect(geometry.visualTop).toBeGreaterThan(geometry.introBottom)
  expect(geometry.statusTop).toBeGreaterThanOrEqual(geometry.visualBottom)
  expect(geometry.imageTransform).toBe('none')
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
      const frame = image.closest('picture')!.getBoundingClientRect()
      const style = getComputedStyle(image)
      return {
        frameRatio: frame.width / frame.height,
        objectFit: style.objectFit,
        objectPosition: style.objectPosition,
        transform: style.transform,
      }
    })
    expect(geometry.objectFit).toBe('contain')
    expect(geometry.objectPosition).toBe('50% 50%')
    expect(geometry.frameRatio).toBeCloseTo(500 / 672, 2)
    expect(geometry.transform).toBe('none')

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
  await expect(page.locator('.content-status')).toHaveText(/Status\s*Course 1 complete/i)
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
  await expect(page.locator('.learning-atlas__module-summary')).toHaveCount(19)
  await expect(page.locator('.learning-atlas__module-summary').first()).toContainText('working environment changes context')
  await expect(page.locator('.learning-atlas')).not.toContainText('Mature lab')
  await expect(page.locator('.learning-atlas')).not.toContainText('Roadmap module')
  await expect(page.getByRole('heading', { name: 'Agentic Engineering 101: Zero to Hero' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Advanced Agentic Engineering: Mastering Agents' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Beyond the Agent: Engineering Agent Systems' })).toBeVisible()
  const courseFolios = page.locator('.learning-atlas__course')
  const [course1Box, course2Box, course3Box] = await Promise.all([
    courseFolios.nth(0).boundingBox(),
    courseFolios.nth(1).boundingBox(),
    courseFolios.nth(2).boundingBox(),
  ])
  expect(course1Box).not.toBeNull()
  expect(course2Box).not.toBeNull()
  expect(course3Box).not.toBeNull()
  expect(Math.abs(course1Box!.y - course2Box!.y)).toBeLessThan(2)
  expect(course3Box!.y).toBeGreaterThanOrEqual(course1Box!.y + course1Box!.height)
  expect(course3Box!.width).toBeGreaterThan(course1Box!.width * 1.8)
  const pairedCourseGeometry = await courseFolios.evaluateAll((courses) => courses.slice(0, 2).map((course) => ({
    headingHeight: course.querySelector('h3')!.getBoundingClientRect().height,
    moduleTops: Array.from(course.querySelectorAll('.learning-atlas__module')).slice(0, 9).map((module) => module.getBoundingClientRect().top),
  })))
  expect(Math.abs(pairedCourseGeometry[0].headingHeight - pairedCourseGeometry[1].headingHeight)).toBeLessThan(2)
  pairedCourseGeometry[0].moduleTops.forEach((moduleTop, index) => {
    expect(Math.abs(moduleTop - pairedCourseGeometry[1].moduleTops[index])).toBeLessThan(2)
  })
  await expect(page.locator('.lab-promotion > ol > li')).toHaveCount(6)
  await expect(page.locator('.lab-anatomy__layers > section')).toHaveCount(3)
  const labLayerBoxes = await page.locator('.lab-anatomy__layers > section').evaluateAll((layers) => layers.map((layer) => layer.getBoundingClientRect()).map(({ y, height }) => ({ y, height })))
  expect(Math.max(...labLayerBoxes.map(({ height }) => height)) - Math.min(...labLayerBoxes.map(({ height }) => height))).toBeLessThan(2)
  expect(Math.max(...labLayerBoxes.map(({ y }) => y)) - Math.min(...labLayerBoxes.map(({ y }) => y))).toBeLessThan(2)
  await expect(page.locator('.representative-lab')).toHaveCount(3)
  expect(await page.locator('.representative-lab').evaluateAll((items) => items.map((item) => item.getAttribute('data-lab')))).toEqual(['3', '5', '7'])

  const lab3 = page.locator('.representative-lab[data-lab="3"]')
  const lab5 = page.locator('.representative-lab[data-lab="5"]')
  const [lab3Header, lab3Evidence, lab5Header, lab5Evidence] = await Promise.all([
    lab3.locator('header').boundingBox(),
    lab3.locator('dl').boundingBox(),
    lab5.locator('header').boundingBox(),
    lab5.locator('dl').boundingBox(),
  ])
  expect(lab3Header).not.toBeNull()
  expect(lab3Evidence).not.toBeNull()
  expect(lab5Header).not.toBeNull()
  expect(lab5Evidence).not.toBeNull()
  expect(lab3Evidence!.width).toBeGreaterThan(lab3Header!.width)
  expect(lab5Evidence!.width).toBeGreaterThan(lab5Header!.width)
  expect(lab3Header!.x).toBeLessThan(lab3Evidence!.x)
  expect(lab5Header!.x).toBeLessThan(lab5Evidence!.x)

  const opening = page.getByRole('heading', { name: 'Experience made transferable' }).locator('..').locator('..')
  const [openingHeading, openingBody] = await Promise.all([
    opening.locator('[data-case-study-section-heading]').boundingBox(),
    opening.locator('[data-case-study-section-body]').boundingBox(),
  ])
  expect(openingHeading).not.toBeNull()
  expect(openingBody).not.toBeNull()
  expect(openingBody!.width).toBeGreaterThan(openingHeading!.width * 2)

  const method = page.getByRole('heading', { name: 'The method built the method' }).locator('..').locator('..')
  const [methodHeading, methodBody] = await Promise.all([
    method.locator('[data-case-study-section-heading]').boundingBox(),
    method.locator('[data-case-study-section-body]').boundingBox(),
  ])
  expect(methodHeading).not.toBeNull()
  expect(methodBody).not.toBeNull()
  expect(methodBody!.width).toBeGreaterThan(methodHeading!.width * 1.4)

  const stateHeader = page.locator('.learning-lab-state > header')
  const [stateHeadingGroup, stateKicker, stateTitle] = await Promise.all([
    stateHeader.locator('.learning-lab-state__heading').boundingBox(),
    stateHeader.locator('.learning-lab-kicker').boundingBox(),
    stateHeader.getByRole('heading', { name: 'A dated body of working practice' }).boundingBox(),
  ])
  expect(stateHeadingGroup).not.toBeNull()
  expect(stateKicker).not.toBeNull()
  expect(stateTitle).not.toBeNull()
  await expect(stateHeader.locator(':scope > p')).toHaveCount(0)
  expect(Math.abs(stateKicker!.x - stateTitle!.x)).toBeLessThan(2)
  expect(stateTitle!.y - (stateKicker!.y + stateKicker!.height)).toBeLessThan(32)
  expect(stateTitle!.height).toBeLessThan(55)

  await expect(page.getByText(/I'm going to teach my brother a few things about using agentic AI/)).toHaveCount(1)
  await expect(page.getByText(/a love letter to my brother/)).toHaveCount(1)
  await expect(page.getByText('First live delivery planned for September 2026.')).toHaveCount(0)
  await expect(page.getByRole('link', { name: /View the public repository/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Inspect the integrity run/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Inspect the pinned curriculum shape/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Inspect the pinned Course 2 plan/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Inspect the course-numbering change/ })).toBeVisible()
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
    'Inspect the pinned Course 2 plan (opens in a new tab)',
    'Inspect the course-numbering change (opens in a new tab)',
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
  await page.evaluate(async () => {
    await document.fonts.ready
    window.scrollTo(0, 0)
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
  })
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
    await expect(page.locator('.content-status')).toContainText('Course 1 complete')
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
  await expect(page.getByRole('link', { name: 'Return to the homepage' })).toHaveAttribute('href', '/')
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
  const calloutSignature = async () => page.locator('[data-case-study-callout]').evaluate((callout) => {
    const style = getComputedStyle(callout)
    return {
      borderLeftWidth: style.borderLeftWidth,
      fontFamily: style.fontFamily,
      paddingLeft: style.paddingLeft,
    }
  })

  await page.goto('./projects/codex-marketplace/')
  await expect(page.locator('[data-case-study-callout]')).toHaveCount(1)
  await expect(page.locator('.marketplace-case-study > [data-case-study-callout]')).toHaveCount(1)
  expect(await page.locator('[data-case-study-callout]').evaluate((callout) => callout.previousElementSibling?.tagName)).toBe('SECTION')
  const marketplaceCallout = await calloutSignature()

  await page.goto(patchPath)
  await expect(page.locator('[data-case-study-callout]')).toHaveCount(1)
  await expect(page.locator('.patch-case-study > [data-case-study-callout]')).toHaveCount(1)
  expect(await page.locator('[data-case-study-callout]').evaluate((callout) => callout.previousElementSibling?.className)).toBe('patch-movement patch-first-deck')
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
