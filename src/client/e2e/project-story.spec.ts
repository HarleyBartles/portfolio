import { expect, test } from '@playwright/test'

const wildBunchPath = './projects/wild-bunch/'
const patchPath = './projects/adventures-of-patch/'
const learningLabPath = './projects/agentic-learning-lab/'
const specialistsCanonicalPath = './patch/the-usual-specialists/'
const specialistsPreviewPath = './patch/the-usual-specialists/next/'
const specialistsLockedNarrowWidths = [320, 360, 390, 414, 480, 540, 599] as const
const specialistsHighStepWidths = [...specialistsLockedNarrowWidths, 600, 699] as const

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

test('The Usual Specialists Index responsive matrix stays coherent at representative viewports', async ({ page }) => {
  const overlapArea = (a: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }): number => {
    const overlapWidth = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x))
    const overlapHeight = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y))
    return overlapWidth * overlapHeight
  }

  for (const width of [320, 360, 389, 390, 414, 601, 767, 768, 1024, 1280, 1366, 1399, 1400, 1440, 1536, 1919, 1920, 2560, 2880] as const) {
    await page.setViewportSize({ width, height: width >= 1920 ? 1080 : width <= 390 ? 844 : 1100 })
    await page.goto(specialistsPreviewPath)

    await expect(page.getByRole('heading', { level: 1, name: 'The Usual Specialists' })).toBeVisible()
    const index = page.getByRole('region', { name: 'Index' })
    await expect(index).toBeVisible()
    await expect(page.locator('[data-specialist-chapter="silk"], [data-specialist-chapter="writ"], [data-specialist-chapter="klause"], [data-specialist-chapter="rollback"], [data-specialist-chapter="receipt"]')).toHaveCount(0)

    const desk = index.locator('[data-index-substrate="desk-diagram"]')
    const blue = index.locator('[data-index-substrate="blue-carrier"]')
    const graph = index.locator('[data-index-substrate="graph-paper"]')
    const story = index.locator('[data-index-story-card]')
    const closing = index.locator('[data-index-closing-sequence]')
    const observation = index.locator('[data-index-substrate="commission-03"]')
    const recognition = index.locator('[data-index-closing-beat="recognition"]')
    const retrieval = index.locator('[data-index-closing-beat="source-retrieval"]')
    const outcome = index.locator('[data-index-closing-beat="assent-outcome"]')
    for (const locator of [desk, blue, graph, story, closing, observation, recognition, retrieval, outcome]) await expect(locator).toBeVisible()

    const indexWalk = index.locator('[data-index-traversal="index-walk"]')
    const patchFollow = index.locator('[data-index-traversal="patch-follow"]')
    const indexHighStep = index.locator('[data-index-traversal="index-high-step"]')
    const patchPeer = index.locator('[data-index-traversal="patch-peer"]')
    const indexInspect = index.locator('[data-index-traversal="index-inspect"]')
    const inspectionPair = index.locator('[data-index-inspection-pair]')
    const indexReturn = index.locator('[data-index-traversal="index-return"]')
    const patchReturn = index.locator('[data-index-traversal="patch-return"]')

    await expect(patchFollow).toBeVisible()
    for (const locator of [patchPeer, indexInspect, inspectionPair]) await expect(locator).toBeVisible()
    expect(await indexHighStep.isVisible(), JSON.stringify({ width, beat: 'outgoing-index-mode' })).not.toBe(await indexWalk.isVisible())

    expect(await indexReturn.isVisible(), JSON.stringify({ width, beat: 'return-pair' })).toBe(await patchReturn.isVisible())

    for (const character of ['patch', 'index'] as const) {
      const visibleAppearances = index.locator(`[data-index-character="${character}"]:visible`)
      const appearanceCount = await visibleAppearances.count()
      const moments = await visibleAppearances.evaluateAll((elements) => elements.map((element) => element.getAttribute('data-index-moment')))
      expect(new Set(moments).size, JSON.stringify({ width, character, moments })).toBe(moments.length)

      const boxes = await Promise.all(Array.from({ length: appearanceCount }, (_, appearanceIndex) => visibleAppearances.nth(appearanceIndex).boundingBox()))
      for (const box of boxes) expect(box).not.toBeNull()
      for (let left = 0; left < boxes.length; left += 1) {
        for (let right = left + 1; right < boxes.length; right += 1) {
          const leftBox = boxes[left]!
          const rightBox = boxes[right]!
          const leftCenter = { x: leftBox.x + leftBox.width / 2, y: leftBox.y + leftBox.height / 2 }
          const rightCenter = { x: rightBox.x + rightBox.width / 2, y: rightBox.y + rightBox.height / 2 }
          expect.soft(
            overlapArea(leftBox, rightBox),
            JSON.stringify({ width, character, moments, left, right, boxes }),
          ).toBeLessThanOrEqual(1)
          expect.soft(
            Math.hypot(leftCenter.x - rightCenter.x, leftCenter.y - rightCenter.y),
            JSON.stringify({ width, character, moments, left, right, boxes }),
          ).toBeGreaterThanOrEqual(48)
        }
      }
    }

    const outgoingIndex = await indexHighStep.isVisible() ? indexHighStep : indexWalk
    const substrateRegistrations = [
      [patchFollow, blue],
      [outgoingIndex, await indexHighStep.isVisible() ? blue : desk],
      ...((await indexReturn.isVisible()) ? [[indexReturn, desk], [patchReturn, desk]] as const : []),
    ] as const
    for (const [traversal, substrate] of substrateRegistrations) {
      const [traversalBox, substrateBox] = await Promise.all([traversal.boundingBox(), substrate.boundingBox()])
      expect(traversalBox).not.toBeNull()
      expect(substrateBox).not.toBeNull()
      expect.soft(
        overlapArea(traversalBox!, substrateBox!),
        JSON.stringify({ width, traversal: await traversal.getAttribute('data-index-traversal'), traversalBox, substrateBox }),
      ).toBeGreaterThan(1)
    }

    {
      const [pairBox, graphBox] = await Promise.all([inspectionPair.boundingBox(), graph.boundingBox()])
      expect(pairBox).not.toBeNull()
      expect(graphBox).not.toBeNull()
      expect.soft(
        overlapArea(pairBox!, graphBox!),
        JSON.stringify({ width, pairBox, graphBox }),
      ).toBeGreaterThan(1)
    }

    const [storyBox, patchArrivalBox, outgoingIndexBox] = await Promise.all([
      story.boundingBox(),
      patchFollow.boundingBox(),
      outgoingIndex.boundingBox(),
    ])
    expect(storyBox).not.toBeNull()
    expect(patchArrivalBox).not.toBeNull()
    expect(outgoingIndexBox).not.toBeNull()
    expect.soft(overlapArea(storyBox!, patchArrivalBox!), JSON.stringify({ width, storyBox, patchArrivalBox })).toBeLessThanOrEqual(1)
    expect.soft(overlapArea(storyBox!, outgoingIndexBox!), JSON.stringify({ width, storyBox, outgoingIndexBox })).toBeLessThanOrEqual(1)

    const patchEye = { x: patchArrivalBox!.x + patchArrivalBox!.width * 0.62, y: patchArrivalBox!.y + patchArrivalBox!.height * 0.28 }
    const outgoingIndexBody = {
      top: outgoingIndexBox!.y,
      bottom: outgoingIndexBox!.y + outgoingIndexBox!.height,
    }
    expect.soft(
      patchEye.y,
      JSON.stringify({ width, patchEye, outgoingIndexBox }),
    ).toBeGreaterThanOrEqual(outgoingIndexBody.top - outgoingIndexBox!.height * 0.45)
    expect.soft(
      patchEye.y,
      JSON.stringify({ width, patchEye, outgoingIndexBox }),
    ).toBeLessThanOrEqual(outgoingIndexBody.bottom + outgoingIndexBox!.height * 0.75)

    const [observationBox, recognitionBox, retrievalBox, outcomeBox] = await Promise.all([
      observation.boundingBox(),
      recognition.boundingBox(),
      retrieval.boundingBox(),
      outcome.boundingBox(),
    ])
    for (const box of [observationBox, recognitionBox, retrievalBox, outcomeBox]) expect(box).not.toBeNull()

    expect.soft(
      overlapArea(observationBox!, recognitionBox!),
      JSON.stringify({ width, observationBox, recognitionBox }),
    ).toBeGreaterThan(1)
    expect.soft(
      overlapArea(recognitionBox!, retrievalBox!),
      JSON.stringify({ width, recognitionBox, retrievalBox }),
    ).toBeGreaterThan(1)

    const retrievalVisibleArea = retrievalBox!.width * retrievalBox!.height - overlapArea(retrievalBox!, outcomeBox!)
    expect.soft(
      retrievalVisibleArea / (retrievalBox!.width * retrievalBox!.height),
      JSON.stringify({ width, retrievalBox, outcomeBox }),
    ).toBeGreaterThanOrEqual(0.55)

    expect.soft(
      outcomeBox!.width / retrievalBox!.width,
      JSON.stringify({ width, retrievalBox, outcomeBox }),
    ).toBeGreaterThanOrEqual(0.9)

    if (outcomeBox!.y >= retrievalBox!.y + retrievalBox!.height - 1) {
      const retrievalToOutcomeGap = outcomeBox!.y - (retrievalBox!.y + retrievalBox!.height)
      expect.soft(
        retrievalToOutcomeGap,
        JSON.stringify({ width, retrievalBox, outcomeBox }),
      ).toBeLessThanOrEqual(16)
    }

    if (width >= 1920) {
      const indexBox = await index.boundingBox()
      expect(indexBox).not.toBeNull()
      expect(indexBox!.height, JSON.stringify({ width, indexBox })).toBeLessThanOrEqual(1080)
    }

    await expectNoHorizontalOverflow(page)
  }
})

test('The Usual Specialists Index high step keeps opaque feet registered to the blue edge through 699', async ({ page }) => {
  for (const width of specialistsHighStepWidths) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const blue = page.locator('[data-index-substrate="blue-carrier"]')
    await expect(blue).toBeVisible()
    await expect(blue.locator('[data-index-traversal="index-high-step"]')).toBeVisible()

    const registration = await blue.evaluate((carrier) => {
      const art = carrier.querySelector<HTMLImageElement>('img[alt="A blue working sheet crossing the main route diagram."]')
      const highStep = carrier.querySelector<HTMLImageElement>('[data-index-traversal="index-high-step"]')
      const placement = highStep?.parentElement
      if (!art || !highStep || !placement) throw new Error('High-step registration elements are missing')

      const transformedPoint = (element: HTMLElement, x: number, y: number) => {
        const style = getComputedStyle(element)
        const matrix = style.transform === 'none' ? new DOMMatrix() : new DOMMatrix(style.transform)
        const [originX, originY] = style.transformOrigin.split(' ').map(Number.parseFloat)
        const point = new DOMPoint(x - originX, y - originY).matrixTransform(matrix)
        return {
          x: element.offsetLeft + originX + point.x,
          y: element.offsetTop + originY + point.y,
        }
      }

      // Opaque-pixel landmarks in the authored assets, not transparent canvas edges.
      const raisedFoot = transformedPoint(
        placement,
        (218 / 320) * highStep.clientWidth,
        (409 / 480) * highStep.clientHeight,
      )
      const lowerFoot = transformedPoint(
        placement,
        (135 / 320) * highStep.clientWidth,
        (465 / 480) * highStep.clientHeight,
      )
      const raisedFootBlueEdge = transformedPoint(
        art,
        (966 / 1240) * art.clientWidth,
        (103 / 827) * art.clientHeight,
      )
      const lowerFootBlueEdge = transformedPoint(
        art,
        (906 / 1240) * art.clientWidth,
        (98 / 827) * art.clientHeight,
      )

      return {
        raisedFootEdgeDelta: raisedFoot.y - raisedFootBlueEdge.y,
        raisedFootHorizontalDelta: raisedFoot.x - raisedFootBlueEdge.x,
        lowerFootInsideDelta: lowerFoot.y - lowerFootBlueEdge.y,
      }
    })

    expect.soft(
      Math.abs(registration.raisedFootEdgeDelta),
      JSON.stringify({ width, registration, invariant: 'raised foot lands directly on blue edge' }),
    ).toBeLessThanOrEqual(3)
    expect.soft(
      Math.abs(registration.raisedFootHorizontalDelta),
      JSON.stringify({ width, registration, invariant: 'raised foot and torn edge share the same contact point' }),
    ).toBeLessThanOrEqual(3)
    expect.soft(
      registration.lowerFootInsideDelta,
      JSON.stringify({ width, registration, invariant: 'lower foot remains inside blue carrier' }),
    ).toBeGreaterThanOrEqual(8)
  }
})

test('The Usual Specialists Index arrival passage swaps high-step for walk at 700', async ({ page }) => {
  for (const [width, expected] of [[699, 'high-step'], [700, 'walk']] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const index = page.getByRole('region', { name: 'Index' })
    const patch = index.locator('[data-index-traversal="patch-follow"]')
    const highStep = index.locator('[data-index-traversal="index-high-step"]')
    const walk = index.locator('[data-index-traversal="index-walk"]')

    await expect(patch).toBeVisible()
    if (expected === 'high-step') {
      await expect(highStep).toBeVisible()
      await expect(walk).not.toBeVisible()
    } else {
      await expect(highStep).not.toBeVisible()
      await expect(walk).toBeVisible()
    }
  }
})

test('The Usual Specialists Index walk clears the name mark until the upper field recomposes at 1300', async ({ page }) => {
  for (const width of [700, 720, 959, 960, 1100, 1299] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const index = page.getByRole('region', { name: 'Index' })
    const walk = index.locator('[data-index-traversal="index-walk"]')
    const lockup = index.locator('[data-index-lockup]')
    const lockupMark = lockup.locator('img')
    const [indexBox, walkBox, lockupBox] = await Promise.all([index.boundingBox(), walk.boundingBox(), lockup.boundingBox()])

    expect(indexBox).not.toBeNull()
    expect(walkBox).not.toBeNull()
    expect(lockupBox).not.toBeNull()
    expect.soft(
      walkBox!.x - (lockupBox!.x + lockupBox!.width),
      JSON.stringify({ width, walkBox, lockupBox, invariant: 'walking Index stays to the right of the name mark' }),
    ).toBeGreaterThanOrEqual(12)
    expect.soft(
      (indexBox!.x + indexBox!.width) - (walkBox!.x + walkBox!.width),
      JSON.stringify({ width, indexBox, walkBox, invariant: 'walking Index stays fully on-screen with breathing room' }),
    ).toBeGreaterThanOrEqual(24)
  }
})

test('The Usual Specialists Index 600-959 opaque graph paper reaches the opaque blue carrier', async ({ page }) => {
  for (const width of [600, 700, 959] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)
    await page.locator('[data-index-substrate="graph-paper"] img').waitFor()

    const seam = await page.evaluate(async () => {
      const chapter = document.querySelector('[data-specialist-chapter="index"]')
      const blueImg = document.querySelector<HTMLImageElement>('[data-index-substrate="blue-carrier"] > img')
      const graphImg = document.querySelector<HTMLImageElement>('[data-index-substrate="graph-paper"] img')
      if (!chapter || !blueImg || !graphImg) throw new Error('Index substrate art is missing')

      const angleToChapter = (element: HTMLElement) => {
        let angle = 0
        let node: HTMLElement | null = element
        while (node && node !== chapter) {
          const transform = getComputedStyle(node).transform
          if (transform && transform !== 'none') {
            const matrix = new DOMMatrix(transform)
            angle += Math.atan2(matrix.b, matrix.a)
          }
          node = node.parentElement
        }
        return angle
      }

      const opaqueCloud = async (image: HTMLImageElement) => {
        await image.decode()
        const canvas = document.createElement('canvas')
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight
        const context = canvas.getContext('2d', { willReadFrequently: true })!
        context.drawImage(image, 0, 0)
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
        const rect = image.getBoundingClientRect()
        const centerX = rect.x + rect.width / 2
        const centerY = rect.y + rect.height / 2
        const angle = angleToChapter(image)
        const cosine = Math.cos(angle)
        const sine = Math.sin(angle)
        const points: Array<[number, number]> = []

        for (let sourceY = 0; sourceY < canvas.height; sourceY += 4) {
          for (let sourceX = 0; sourceX < canvas.width; sourceX += 4) {
            if (pixels[((sourceY * canvas.width) + sourceX) * 4 + 3] < 128) continue
            const localX = ((sourceX / (canvas.width - 1)) - 0.5) * image.offsetWidth
            const localY = ((sourceY / (canvas.height - 1)) - 0.5) * image.offsetHeight
            points.push([
              centerX + (localX * cosine) - (localY * sine),
              centerY + (localX * sine) + (localY * cosine),
            ])
          }
        }
        return points
      }

      const [bluePoints, graphPoints] = await Promise.all([opaqueCloud(blueImg), opaqueCloud(graphImg)])
      const blueBottomByX = new Map<number, number>()
      const graphTopByX = new Map<number, number>()
      for (const [x, y] of bluePoints) {
        const column = Math.round(x)
        blueBottomByX.set(column, Math.max(blueBottomByX.get(column) ?? Number.NEGATIVE_INFINITY, y))
      }
      for (const [x, y] of graphPoints) {
        const column = Math.round(x)
        graphTopByX.set(column, Math.min(graphTopByX.get(column) ?? Number.POSITIVE_INFINITY, y))
      }

      const gaps: number[] = []
      const seamStart = innerWidth * 0.05
      const seamEnd = innerWidth * 0.18
      for (const [column, blueBottom] of blueBottomByX) {
        if (column < seamStart || column > seamEnd) continue
        const graphTop = graphTopByX.get(column)
        if (graphTop === undefined) continue
        gaps.push(graphTop - blueBottom)
      }

      const contactColumns = gaps.filter((gap) => gap >= -32 && gap <= 12).length
      return {
        minimumGap: Math.min(...gaps),
        maximumGap: Math.max(...gaps),
        contactColumns,
      }
    })

    expect.soft(
      seam.contactColumns,
      JSON.stringify({ width, seam, invariant: 'visible graph-paper pixels meet visible blue-carrier pixels across a real seam' }),
    ).toBeGreaterThanOrEqual(12)
  }
})

test('The Usual Specialists Index 600-1299 story card stays in the approved upper authored composition', async ({ page }) => {
  const overlapArea = (a: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }) => {
    const width = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x))
    const height = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y))
    return width * height
  }

  for (const width of [600, 700, 959, 960, 1100, 1299] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const index = page.getByRole('region', { name: 'Index' })
    const evidence = index.locator('[data-index-evidence-field]')
    const story = index.locator('[data-index-story-card]')
    const patch = index.locator('[data-index-traversal="patch-follow"]')
    const highStep = index.locator('[data-index-traversal="index-high-step"]')
    const walk = index.locator('[data-index-traversal="index-walk"]')
    const lockup = index.locator('[data-index-lockup]')
    const lockupMark = lockup.locator('img')
    const inspectionPatch = index.locator('[data-index-traversal="patch-peer"]')
    const inspectionIndex = index.locator('[data-index-traversal="index-inspect"]')

    const [evidenceBox, storyBox, patchBox, highStepBox, walkBox, lockupBox, lockupMarkBox, inspectionPatchBox, inspectionIndexBox] = await Promise.all([
      evidence.boundingBox(),
      story.boundingBox(),
      patch.boundingBox(),
      highStep.boundingBox(),
      walk.boundingBox(),
      lockup.boundingBox(),
      lockupMark.boundingBox(),
      inspectionPatch.boundingBox(),
      inspectionIndex.boundingBox(),
    ])
    for (const box of [evidenceBox, storyBox, patchBox, lockupBox, lockupMarkBox, inspectionPatchBox, inspectionIndexBox]) expect(box).not.toBeNull()

    expect.soft(
      (storyBox!.y - evidenceBox!.y) / evidenceBox!.height,
      JSON.stringify({ width, storyBox, evidenceBox, invariant: 'story card keeps one authored top percentage across the band' }),
    ).toBeCloseTo(0.40, 2)
    const expectedStoryWidth = Math.min(evidenceBox!.width * 0.56, 544)
    expect.soft(
      storyBox!.width,
      JSON.stringify({ width, storyBox, evidenceBox, expectedStoryWidth, invariant: 'story card grows proportionally only until its authored readable measure' }),
    ).toBeCloseTo(expectedStoryWidth, 0)
    expect.soft(
      ((evidenceBox!.x + evidenceBox!.width) - (storyBox!.x + storyBox!.width)) / evidenceBox!.width,
      JSON.stringify({ width, storyBox, evidenceBox, invariant: 'story card keeps one authored right percentage across the band' }),
    ).toBeCloseTo(0.04, 2)

    for (const [name, protectedBox] of [
      ['arriving Patch', patchBox!],
      ...(highStepBox ? [['stepping Index', highStepBox] as const] : []),
      ...(walkBox ? [['walking Index', walkBox] as const] : []),
      ['Index mark', lockupMarkBox!],
      ['inspecting Patch', inspectionPatchBox!],
      ['inspecting Index', inspectionIndexBox!],
    ]) {
      expect.soft(
        overlapArea(storyBox!, protectedBox),
        JSON.stringify({ width, name, storyBox, protectedBox, invariant: 'story card preserves active character beats and the Index mark' }),
      ).toBeLessThanOrEqual(1)
    }
  }
})

test('The Usual Specialists Index arriving Patch crosses to the right of the name mark at 1200', async ({ page }) => {
  for (const [width, expectedSide] of [[1199, 'left'], [1200, 'right'], [1299, 'right']] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const index = page.getByRole('region', { name: 'Index' })
    const patch = index.locator('[data-index-traversal="patch-follow"]')
    const lockup = index.locator('[data-index-lockup]')
    const blue = index.locator('[data-index-substrate="blue-carrier"]')
    const [patchBox, lockupBox, blueBox] = await Promise.all([
      patch.boundingBox(),
      lockup.boundingBox(),
      blue.boundingBox(),
    ])

    for (const box of [patchBox, lockupBox, blueBox]) expect(box).not.toBeNull()

    if (expectedSide === 'left') {
      expect.soft(
        patchBox!.x + patchBox!.width - lockupBox!.x,
        JSON.stringify({ width, patchBox, lockupBox, invariant: 'before 1200 Patch remains on the left arrival lane' }),
      ).toBeLessThan(0)
    } else {
      expect.soft(
        patchBox!.x - (lockupBox!.x + lockupBox!.width),
        JSON.stringify({ width, patchBox, lockupBox, invariant: 'from 1200 Patch moves to the right of the Index mark' }),
      ).toBeGreaterThanOrEqual(0)
      expect.soft(
        (patchBox!.x + patchBox!.width) - (blueBox!.x + blueBox!.width),
        JSON.stringify({ width, patchBox, blueBox, invariant: 'right-side Patch visibly crosses the blue carrier into the document field' }),
      ).toBeGreaterThan(0)
    }
  }
})

test('The Usual Specialists Index upper field takes the wide treatment at 1300', async ({ page }) => {
  for (const width of [1300, 1400] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const index = page.getByRole('region', { name: 'Index' })
    const evidence = index.locator('[data-index-evidence-field]')
    const story = index.locator('[data-index-story-card]')
    const walk = index.locator('[data-index-traversal="index-walk"]')
    const [evidenceBox, storyBox, walkBox] = await Promise.all([
      evidence.boundingBox(),
      story.boundingBox(),
      walk.boundingBox(),
    ])

    for (const box of [evidenceBox, storyBox, walkBox]) expect(box).not.toBeNull()

    expect.soft(
      storyBox!.y - evidenceBox!.y,
      JSON.stringify({ width, storyBox, evidenceBox, invariant: 'wide story card enters at the authored 68px top lane' }),
    ).toBeCloseTo(68, 0)
    expect.soft(
      storyBox!.width,
      JSON.stringify({ width, storyBox, invariant: 'wide story card uses the existing 1400 treatment' }),
    ).toBeGreaterThanOrEqual(400)
    expect.soft(
      storyBox!.width,
      JSON.stringify({ width, storyBox, invariant: 'wide story card remains bounded' }),
    ).toBeLessThanOrEqual(480)
    expect.soft(
      storyBox!.x - (walkBox!.x + walkBox!.width),
      JSON.stringify({ width, storyBox, walkBox, invariant: 'walking Index moves to the left side of the incoming story card' }),
    ).toBeGreaterThanOrEqual(1)
  }
})

test('The Usual Specialists Index walk keeps its wide lane when the return pair appears at 1600', async ({ page }) => {
  const measurements = new Map<number, { walkLane: number; walkTop: number }>()

  for (const width of [1599, 1600] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const index = page.getByRole('region', { name: 'Index' })
    const desk = index.locator('[data-index-substrate="desk-diagram"]')
    const story = index.locator('[data-index-story-card]')
    const walk = index.locator('[data-index-traversal="index-walk"]')
    const indexReturn = index.locator('[data-index-traversal="index-return"]')
    const patchReturn = index.locator('[data-index-traversal="patch-return"]')
    const [deskBox, storyBox, walkBox] = await Promise.all([
      desk.boundingBox(),
      story.boundingBox(),
      walk.boundingBox(),
    ])

    for (const box of [deskBox, storyBox, walkBox]) expect(box).not.toBeNull()
    expect.soft(
      storyBox!.x - (walkBox!.x + walkBox!.width),
      JSON.stringify({ width, storyBox, walkBox, invariant: 'walking Index stays wholly left of the story card' }),
    ).toBeGreaterThanOrEqual(1)
    expect(await indexReturn.isVisible(), JSON.stringify({ width, invariant: 'returning Index appears only at 1600' })).toBe(width >= 1600)
    expect(await patchReturn.isVisible(), JSON.stringify({ width, invariant: 'returning Patch appears only at 1600' })).toBe(width >= 1600)

    measurements.set(width, {
      walkLane: (walkBox!.x - deskBox!.x) / deskBox!.width,
      walkTop: walkBox!.y - deskBox!.y,
    })
  }

  const before = measurements.get(1599)!
  const after = measurements.get(1600)!
  expect.soft(
    Math.abs(before.walkLane - after.walkLane),
    JSON.stringify({ before, after, invariant: 'return-pair visibility does not own the walking Index horizontal lane' }),
  ).toBeLessThanOrEqual(0.01)
  expect.soft(
    Math.abs(before.walkTop - after.walkTop),
    JSON.stringify({ before, after, invariant: 'return-pair visibility does not own the walking Index vertical lane' }),
  ).toBeLessThanOrEqual(1)
})

test('The Usual Specialists Index lower closing sequence keeps its real 959-960 break', async ({ page }) => {
  const measurements = new Map<number, { officeWidth: number; closingWidth: number }>()

  for (const width of [959, 960] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const index = page.getByRole('region', { name: 'Index' })
    const office = index.locator('[data-index-substrate="commission-03"]')
    const closing = office.locator('xpath=ancestor::*[@data-index-closing-sequence][1]')
    const [officeBox, closingBox] = await Promise.all([office.boundingBox(), closing.boundingBox()])

    expect(officeBox).not.toBeNull()
    expect(closingBox).not.toBeNull()
    measurements.set(width, { officeWidth: officeBox!.width, closingWidth: closingBox!.width })
  }

  const compactRatio = measurements.get(959)!.officeWidth / measurements.get(959)!.closingWidth
  const mediumRatio = measurements.get(960)!.officeWidth / measurements.get(960)!.closingWidth

  expect.soft(compactRatio, '959 keeps the approved compact office span').toBeGreaterThan(0.6)
  expect.soft(mediumRatio, '960 takes the narrower medium office span').toBeLessThan(0.5)
})

test('The Usual Specialists Index 960 closeout elastically returns to the settled 1400 geometry', async ({ page }) => {
  const measurements = new Map<number, {
    officeInset: number
    outcomeRightInset: number
    recognitionX: number
    retrievalX: number
  }>()

  for (const width of [960, 1100, 1200, 1300, 1399, 1400] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const index = page.getByRole('region', { name: 'Index' })
    const [chapterBox, officeBox, recognitionBox, retrievalBox, outcomeBox] = await Promise.all([
      index.boundingBox(),
      index.locator('[data-index-substrate="commission-03"]').boundingBox(),
      index.locator('[data-index-closing-beat="recognition"]').boundingBox(),
      index.locator('[data-index-closing-beat="source-retrieval"]').boundingBox(),
      index.locator('[data-index-closing-beat="assent-outcome"]').boundingBox(),
    ])

    for (const box of [chapterBox, officeBox, recognitionBox, retrievalBox, outcomeBox]) expect(box).not.toBeNull()
    measurements.set(width, {
      officeInset: officeBox!.x - chapterBox!.x,
      outcomeRightInset: (chapterBox!.x + chapterBox!.width) - (outcomeBox!.x + outcomeBox!.width),
      recognitionX: recognitionBox!.x - chapterBox!.x,
      retrievalX: retrievalBox!.x - chapterBox!.x,
    })
  }

  const start = measurements.get(960)!
  expect.soft(start.officeInset, JSON.stringify({ start, invariant: '960 office reaches the left page edge' })).toBeCloseTo(0, 0)
  expect.soft(start.outcomeRightInset, JSON.stringify({ start, invariant: '960 outcome folder reaches the right page edge' })).toBeCloseTo(0, 0)
  expect.soft(
    start.recognitionX - start.retrievalX,
    JSON.stringify({ start, invariant: '960 Bingo box sits on the retrieval seam' }),
  ).toBeCloseTo(0, 0)

  const widths = [960, 1100, 1200, 1300, 1399] as const
  for (let index = 1; index < widths.length; index += 1) {
    const previous = measurements.get(widths[index - 1])!
    const current = measurements.get(widths[index])!
    expect.soft(
      current.officeInset,
      JSON.stringify({ width: widths[index], previous, current, invariant: 'office moves inward continuously toward 1400' }),
    ).toBeGreaterThan(previous.officeInset)
    expect.soft(
      current.outcomeRightInset,
      JSON.stringify({ width: widths[index], previous, current, invariant: 'outcome folder moves inward continuously toward 1400' }),
    ).toBeGreaterThan(previous.outcomeRightInset)
    expect.soft(
      current.recognitionX,
      JSON.stringify({ width: widths[index], previous, current, invariant: 'Bingo moves continuously toward its 1400 seam position' }),
    ).toBeGreaterThan(previous.recognitionX)
  }

  const nearWide = measurements.get(1399)!
  const settledWide = measurements.get(1400)!
  expect.soft(
    Math.abs(nearWide.officeInset - settledWide.officeInset),
    JSON.stringify({ nearWide, settledWide, invariant: 'office reaches the settled wide position without a 1400 snap' }),
  ).toBeLessThanOrEqual(2)
  expect.soft(
    Math.abs(nearWide.outcomeRightInset - settledWide.outcomeRightInset),
    JSON.stringify({ nearWide, settledWide, invariant: 'outcome reaches the settled wide position without a 1400 snap' }),
  ).toBeLessThanOrEqual(2)
  expect.soft(
    Math.abs(nearWide.recognitionX - settledWide.recognitionX),
    JSON.stringify({ nearWide, settledWide, invariant: 'Bingo reaches the settled wide position without a 1400 snap' }),
  ).toBeLessThanOrEqual(2)

  expect.soft(settledWide.officeInset, '1400 office position stays settled').toBeCloseTo(196, 0)
  expect.soft(settledWide.outcomeRightInset, '1400 outcome position stays settled').toBeCloseTo(94, 0)
  expect.soft(settledWide.recognitionX, '1400 Bingo position stays settled').toBeCloseTo(547.328, 0)
})

test('The Usual Specialists Index graph paper carries a proportionate 959 treatment into 960', async ({ page }) => {
  const measurements = new Map<number, {
    graph: { x: number; y: number; width: number; height: number }
    story: { x: number; y: number; width: number; height: number }
    pair: { x: number; y: number; width: number; height: number }
  }>()

  for (const width of [959, 960] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const index = page.getByRole('region', { name: 'Index' })
    const [graphBox, storyBox, pairBox] = await Promise.all([
      index.locator('[data-index-substrate="graph-paper"]').boundingBox(),
      index.locator('[data-index-story-card]').boundingBox(),
      index.locator('[data-index-inspection-pair]').boundingBox(),
    ])

    for (const box of [graphBox, storyBox, pairBox]) expect(box).not.toBeNull()
    measurements.set(width, { graph: graphBox!, story: storyBox!, pair: pairBox! })
  }

  const compact = measurements.get(959)!
  const medium = measurements.get(960)!
  const widthRatio = medium.graph.width / compact.graph.width
  const storyBottom = medium.story.y + medium.story.height
  const graphToStorySeam = medium.graph.y - storyBottom
  const pairInsetFromGraphTop = medium.pair.y - medium.graph.y

  expect.soft(
    widthRatio,
    JSON.stringify({ compact, medium, widthRatio, invariant: '960 graph paper remains proportionate to the approved 959 backing field without copying it literally' }),
  ).toBeGreaterThanOrEqual(0.85)
  expect.soft(
    widthRatio,
    JSON.stringify({ compact, medium, widthRatio, invariant: '960 graph paper remains a distinct medium treatment rather than duplicating 959 exactly' }),
  ).toBeLessThanOrEqual(0.98)
  expect.soft(
    graphToStorySeam,
    JSON.stringify({ medium, graphToStorySeam, invariant: 'the larger graph field rejoins the upper evidence passage instead of dropping into a dead vertical gap' }),
  ).toBeLessThanOrEqual(48)
  expect.soft(
    graphToStorySeam,
    JSON.stringify({ medium, graphToStorySeam, invariant: 'the graph field may tuck behind the story card but does not leap far above it' }),
  ).toBeGreaterThanOrEqual(-80)
  expect.soft(
    pairInsetFromGraphTop,
    JSON.stringify({ medium, pairInsetFromGraphTop, invariant: 'the 960 inspection pair moves with the closeout and sits near the top of the enlarged graph field' }),
  ).toBeGreaterThanOrEqual(0)
  expect.soft(
    pairInsetFromGraphTop,
    JSON.stringify({ medium, pairInsetFromGraphTop, invariant: 'the 960 inspection pair does not remain stranded low inside the enlarged graph field' }),
  ).toBeLessThanOrEqual(96)

  for (const width of [960, 1100, 1299, 1400, 1920, 2560] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)
    await Promise.all([
      page.locator('[data-index-substrate="graph-paper"] img').waitFor(),
      page.locator('[data-index-traversal="patch-peer"]').waitFor(),
    ])
    const patchContainment = await page.evaluate(async () => {
    const chapter = document.querySelector('[data-specialist-chapter="index"]')
    const graphImg = document.querySelector<HTMLImageElement>('[data-index-substrate="graph-paper"] img')
    const patchImg = document.querySelector<HTMLImageElement>('[data-index-traversal="patch-peer"]')
    if (!chapter || !graphImg || !patchImg) throw new Error('Index lower lockup art is missing')

    const angleToChapter = (element: HTMLElement) => {
      let angle = 0
      let node: HTMLElement | null = element
      while (node && node !== chapter) {
        const transform = getComputedStyle(node).transform
        if (transform && transform !== 'none') {
          const matrix = new DOMMatrix(transform)
          angle += Math.atan2(matrix.b, matrix.a)
        }
        node = node.parentElement
      }
      return angle
    }

    const opaqueCloud = async (image: HTMLImageElement, step: number) => {
      await image.decode()
      const canvas = document.createElement('canvas')
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      const context = canvas.getContext('2d', { willReadFrequently: true })!
      context.drawImage(image, 0, 0)
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
      const rect = image.getBoundingClientRect()
      const centerX = rect.x + rect.width / 2
      const centerY = rect.y + rect.height / 2
      const angle = angleToChapter(image)
      const cosine = Math.cos(angle)
      const sine = Math.sin(angle)
      const points: Array<[number, number]> = []

      for (let sourceY = 0; sourceY < canvas.height; sourceY += step) {
        for (let sourceX = 0; sourceX < canvas.width; sourceX += step) {
          if (pixels[((sourceY * canvas.width) + sourceX) * 4 + 3] < 128) continue
          const localX = ((sourceX / (canvas.width - 1)) - 0.5) * image.offsetWidth
          const localY = ((sourceY / (canvas.height - 1)) - 0.5) * image.offsetHeight
          points.push([
            centerX + (localX * cosine) - (localY * sine),
            centerY + (localX * sine) + (localY * cosine),
          ])
        }
      }
      return points
    }

    const [graphPoints, patchPoints] = await Promise.all([
      opaqueCloud(graphImg, 4),
      opaqueCloud(patchImg, 2),
    ])
    const graphRangeByColumn = new Map<number, { top: number; bottom: number }>()
    const graphRangeByRow = new Map<number, { left: number; right: number }>()
    for (const [x, y] of graphPoints) {
      const column = Math.round(x)
      const range = graphRangeByColumn.get(column)
      if (range) {
        range.top = Math.min(range.top, y)
        range.bottom = Math.max(range.bottom, y)
      } else {
        graphRangeByColumn.set(column, { top: y, bottom: y })
      }

      const row = Math.round(y)
      const rowRange = graphRangeByRow.get(row)
      if (rowRange) {
        rowRange.left = Math.min(rowRange.left, x)
        rowRange.right = Math.max(rowRange.right, x)
      } else {
        graphRangeByRow.set(row, { left: x, right: x })
      }
    }

    let outsidePoints = 0
    let outsideMinX = Number.POSITIVE_INFINITY
    let outsideMaxX = Number.NEGATIVE_INFINITY
    let outsideMinY = Number.POSITIVE_INFINITY
    let outsideMaxY = Number.NEGATIVE_INFINITY
    for (const [x, y] of patchPoints) {
      let enclosed = false
      const column = Math.round(x)
      for (let offset = -4; offset <= 4; offset += 1) {
        const range = graphRangeByColumn.get(column + offset)
        if (range && y >= range.top && y <= range.bottom) {
          enclosed = true
          break
        }
      }
      if (!enclosed) {
        outsidePoints += 1
        outsideMinX = Math.min(outsideMinX, x)
        outsideMaxX = Math.max(outsideMaxX, x)
        outsideMinY = Math.min(outsideMinY, y)
        outsideMaxY = Math.max(outsideMaxY, y)
      }
    }

    const patchBounds = patchPoints.reduce((bounds, [x, y]) => ({
      minX: Math.min(bounds.minX, x),
      maxX: Math.max(bounds.maxX, x),
      minY: Math.min(bounds.minY, y),
      maxY: Math.max(bounds.maxY, y),
    }), {
      minX: Number.POSITIVE_INFINITY,
      maxX: Number.NEGATIVE_INFINITY,
      minY: Number.POSITIVE_INFINITY,
      maxY: Number.NEGATIVE_INFINITY,
    })
    let furthestGraphLeftEdgeAcrossPatch = Number.NEGATIVE_INFINITY
    for (let row = Math.round(patchBounds.minY); row <= Math.round(patchBounds.maxY); row += 1) {
      const rowRange = graphRangeByRow.get(row)
      if (rowRange) furthestGraphLeftEdgeAcrossPatch = Math.max(furthestGraphLeftEdgeAcrossPatch, rowRange.left)
    }

    return {
      outsidePoints,
      totalPatchPoints: patchPoints.length,
      outsideBounds: outsidePoints > 0
        ? { minX: outsideMinX, maxX: outsideMaxX, minY: outsideMinY, maxY: outsideMaxY }
        : null,
      patchBounds,
      furthestGraphLeftEdgeAcrossPatch,
    }
    })

    expect.soft(
      patchContainment.outsidePoints,
      JSON.stringify({ width, patchContainment, invariant: 'every visible Patch pixel is backed by visible graph paper throughout the carried medium treatment' }),
    ).toBe(0)

    const graphWidthRatio = await page.locator('[data-index-substrate="graph-paper"]').evaluate((graph) => {
      const lockup = graph.closest('[data-index-research-lockup]')
      if (!lockup) throw new Error('Index research lockup is missing')
      return graph.getBoundingClientRect().width / lockup.getBoundingClientRect().width
    })
    expect.soft(
      graphWidthRatio,
      JSON.stringify({ width, graphWidthRatio, invariant: 'the 208% graph-paper overscale carries through ultrawide instead of snapping back' }),
    ).toBeGreaterThanOrEqual(2)
  }
})

test('The Usual Specialists Index 600-959 office keeps a fixed authored gutter below the main document', async ({ page }) => {
  for (const width of [600, 700, 959] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const index = page.getByRole('region', { name: 'Index' })
    const mainDocument = index.locator('[data-index-substrate="desk-diagram"]')
    const office = index.locator('[data-index-substrate="commission-03"]')
    const [mainDocumentBox, officeBox] = await Promise.all([
      mainDocument.boundingBox(),
      office.boundingBox(),
    ])

    expect(mainDocumentBox).not.toBeNull()
    expect(officeBox).not.toBeNull()

    const gutter = officeBox!.y - (mainDocumentBox!.y + mainDocumentBox!.height)
    expect.soft(
      gutter,
      JSON.stringify({ width, mainDocumentBox, officeBox, gutter, invariant: 'office gutter below main document is authored at 31px' }),
    ).toBeCloseTo(31, 0)
  }
})

test('The Usual Specialists Index 600-959 close protects Index, Patch, and the filing action', async ({ page }) => {
  const overlapArea = (a: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }) => {
    const width = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x))
    const height = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y))
    return width * height
  }
  const relativeRect = (
    box: { x: number; y: number; width: number; height: number },
    x: number,
    y: number,
    width: number,
    height: number,
  ) => ({
    x: box.x + (box.width * x),
    y: box.y + (box.height * y),
    width: box.width * width,
    height: box.height * height,
  })

  for (const width of [600, 700, 959] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const index = page.getByRole('region', { name: 'Index' })
    const office = index.locator('[data-index-substrate="commission-03"]')
    const retrieval = index.locator('[data-index-closing-beat="source-retrieval"]')
    const recognition = index.locator('[data-index-closing-beat="recognition"]')
    const [officeBox, retrievalBox, recognitionBox] = await Promise.all([
      office.boundingBox(),
      retrieval.boundingBox(),
      recognition.boundingBox(),
    ])
    for (const box of [officeBox, retrievalBox, recognitionBox]) expect(box).not.toBeNull()

    /* These source-space regions correspond to the visible baked character/action
       regions in index-observation.webp / index-macguffin.webp. The frames keep a
       fixed 16:9 crop, so the normalized landmarks stay stable across this band. */
    const indexFace = relativeRect(officeBox!, 0.28, 0.28, 0.27, 0.47)
    const patchBody = relativeRect(officeBox!, 0.64, 0.25, 0.16, 0.45)
    const filingHand = relativeRect(retrievalBox!, 0.24, 0.25, 0.51, 0.50)

    expect.soft(
      overlapArea(indexFace, retrievalBox!),
      JSON.stringify({ width, indexFace, retrievalBox, invariant: 'retrieval never covers Index face' }),
    ).toBeLessThanOrEqual(1)

    const patchOcclusion = overlapArea(patchBody, retrievalBox!) / (patchBody.width * patchBody.height)
    expect.soft(
      patchOcclusion,
      JSON.stringify({ width, patchBody, retrievalBox, patchOcclusion, invariant: 'retrieval covers at most half of Patch visible body' }),
    ).toBeLessThanOrEqual(0.5)

    expect.soft(
      overlapArea(filingHand, recognitionBox!),
      JSON.stringify({ width, filingHand, recognitionBox, invariant: 'recognition tag preserves the filing hand action' }),
    ).toBeLessThanOrEqual(1)
  }
})

test('The Usual Specialists Index 600-959 office-to-retrieval seam follows the approved endpoints continuously', async ({ page }) => {
  for (const width of [600, 700, 959] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const index = page.getByRole('region', { name: 'Index' })
    const office = index.locator('[data-index-substrate="commission-03"]')
    const retrieval = index.locator('[data-index-closing-beat="source-retrieval"]')
    const recognition = index.locator('[data-index-closing-beat="recognition"]')
    const [officeBox, retrievalBox, recognitionBox] = await Promise.all([
      office.boundingBox(),
      retrieval.boundingBox(),
      recognition.boundingBox(),
    ])
    for (const box of [officeBox, retrievalBox, recognitionBox]) expect(box).not.toBeNull()

    const bandProgress = (width - 600) / (959 - 600)
    const expectedStepY = 118 + (bandProgress * (203 - 118))
    const expectedRecognitionInsetY = 13 + (bandProgress * (17 - 13))

    expect.soft(
      retrievalBox!.x - officeBox!.x,
      JSON.stringify({ width, officeBox, retrievalBox, invariant: 'retrieval starts half an office width plus the approved 48px seam shift' }),
    ).toBeCloseTo((officeBox!.width / 2) + 48, 0)
    expect.soft(
      retrievalBox!.y - officeBox!.y,
      JSON.stringify({ width, officeBox, retrievalBox, expectedStepY, invariant: 'retrieval step interpolates between the approved band endpoints' }),
    ).toBeCloseTo(expectedStepY, 0)
    expect.soft(
      recognitionBox!.x - retrievalBox!.x,
      JSON.stringify({ width, recognitionBox, retrievalBox, invariant: 'Bingo rides the retrieval seam' }),
    ).toBeCloseTo(-14, 0)
    expect.soft(
      recognitionBox!.y - retrievalBox!.y,
      JSON.stringify({ width, recognitionBox, retrievalBox, expectedRecognitionInsetY, invariant: 'Bingo sits just inside the retrieval top edge' }),
    ).toBeCloseTo(expectedRecognitionInsetY, 0)
  }
})

test('The Usual Specialists Index 600-959 outcome completes the left-right-left closing cadence', async ({ page }) => {
  for (const width of [600, 700, 959] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const index = page.getByRole('region', { name: 'Index' })
    const office = index.locator('[data-index-substrate="commission-03"]')
    const retrieval = index.locator('[data-index-closing-beat="source-retrieval"]')
    const outcome = index.locator('[data-index-closing-beat="assent-outcome"]')
    const [indexBox, officeBox, retrievalBox, outcomeBox] = await Promise.all([
      index.boundingBox(),
      office.boundingBox(),
      retrieval.boundingBox(),
      outcome.boundingBox(),
    ])

    for (const box of [indexBox, officeBox, retrievalBox, outcomeBox]) expect(box).not.toBeNull()

    expect.soft(
      outcomeBox!.x - indexBox!.x,
      JSON.stringify({ width, indexBox, outcomeBox, invariant: 'outcome bleeds to the left chapter edge' }),
    ).toBeCloseTo(0, 0)
    expect.soft(
      (outcomeBox!.x + outcomeBox!.width) - (officeBox!.x + officeBox!.width),
      JSON.stringify({ width, officeBox, outcomeBox, invariant: 'outcome right edge stays keyed to the office right edge' }),
    ).toBeCloseTo(0, 0)

    const officeToOutcomeGutter = outcomeBox!.y - (officeBox!.y + officeBox!.height)
    expect.soft(
      officeToOutcomeGutter,
      JSON.stringify({ width, officeBox, outcomeBox, officeToOutcomeGutter, invariant: 'outcome keeps an authored 70px gutter below the office panel' }),
    ).toBeCloseTo(70, 0)

    const outcomeRight = outcomeBox!.x + outcomeBox!.width
    expect.soft(
      outcomeRight - retrievalBox!.x,
      JSON.stringify({ width, retrievalBox, outcomeBox, invariant: 'outcome top-right corner reaches inside retrieval bottom-left' }),
    ).toBeGreaterThan(0)
    expect.soft(
      (retrievalBox!.x + retrievalBox!.width) - outcomeRight,
      JSON.stringify({ width, retrievalBox, outcomeBox, invariant: 'outcome top-right corner stays inside retrieval width' }),
    ).toBeGreaterThan(0)
  }
})

test('The Usual Specialists Index sub-600 story card stays attached to the evidence field', async ({ page }) => {
  const overlapArea = (a: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }) => {
    const width = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x))
    const height = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y))
    return width * height
  }

  for (const width of specialistsLockedNarrowWidths) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const index = page.getByRole('region', { name: 'Index' })
    const story = index.locator('[data-index-story-card]')
    const evidence = index.locator('[data-index-evidence-field]')
    const blue = index.locator('[data-index-substrate="blue-carrier"]')
    const graph = index.locator('[data-index-substrate="graph-paper"]')
    const patch = index.locator('[data-index-traversal="patch-follow"]')
    const highStep = index.locator('[data-index-traversal="index-high-step"]')
    const inspectionPatch = index.locator('[data-index-traversal="patch-peer"]')
    const inspectionIndex = index.locator('[data-index-traversal="index-inspect"]')
    const lockup = index.locator('[data-index-lockup]')

    const [storyBox, evidenceBox, blueBox, graphBox, patchBox, highStepBox, inspectionPatchBox, inspectionIndexBox, lockupBox] = await Promise.all([
      story.boundingBox(),
      evidence.boundingBox(),
      blue.boundingBox(),
      graph.boundingBox(),
      patch.boundingBox(),
      highStep.boundingBox(),
      inspectionPatch.boundingBox(),
      inspectionIndex.boundingBox(),
      lockup.boundingBox(),
    ])
    for (const box of [storyBox, evidenceBox, blueBox, graphBox, patchBox, highStepBox, inspectionPatchBox, inspectionIndexBox, lockupBox]) expect(box).not.toBeNull()

    expect.soft(
      overlapArea(storyBox!, blueBox!),
      JSON.stringify({ width, storyBox, blueBox, invariant: 'story card remains attached to the upper evidence field' }),
    ).toBeGreaterThan(1)
    for (const [name, protectedBox] of [
      ['arriving Patch', patchBox!],
      ['stepping Index', highStepBox!],
      ['inspecting Patch', inspectionPatchBox!],
      ['inspecting Index', inspectionIndexBox!],
      ['Index mark', lockupBox!],
    ] as const) {
      expect.soft(
        overlapArea(storyBox!, protectedBox),
        JSON.stringify({ width, name, storyBox, protectedBox, invariant: 'story card preserves active beats and landmarks' }),
      ).toBeLessThanOrEqual(1)
    }

    const storyBottom = storyBox!.y + storyBox!.height
    const evidenceBottom = evidenceBox!.y + evidenceBox!.height
    expect.soft(
      Math.abs(evidenceBottom - storyBottom),
      JSON.stringify({ width, storyBox, evidenceBox, invariant: 'narrow evidence field ends with the story card' }),
    ).toBeLessThanOrEqual(1)
    expect.soft(
      graphBox!.y - storyBottom,
      JSON.stringify({ width, storyBox, graphBox, invariant: 'graph paper remains connected to the upper document composition' }),
    ).toBeLessThanOrEqual(8)
  }
})

test('The Usual Specialists Index sub-600 assent outcome is full bleed', async ({ page }) => {
  for (const width of specialistsLockedNarrowWidths) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const index = page.getByRole('region', { name: 'Index' })
    const outcome = index.locator('[data-index-closing-beat="assent-outcome"]')
    const [indexBox, outcomeBox] = await Promise.all([
      index.boundingBox(),
      outcome.boundingBox(),
    ])

    expect(indexBox).not.toBeNull()
    expect(outcomeBox).not.toBeNull()
    expect.soft(
      Math.abs(outcomeBox!.x - indexBox!.x),
      JSON.stringify({ width, indexBox, outcomeBox, invariant: 'narrow assent outcome bleeds to the left chapter edge' }),
    ).toBeLessThanOrEqual(1)
    expect.soft(
      Math.abs((outcomeBox!.x + outcomeBox!.width) - (indexBox!.x + indexBox!.width)),
      JSON.stringify({ width, indexBox, outcomeBox, invariant: 'narrow assent outcome bleeds to the right chapter edge' }),
    ).toBeLessThanOrEqual(1)
  }
})

test('The Usual Specialists Index assent handwriting scales with its outcome image', async ({ page }) => {
  const samples: Array<{ width: number; outcomeWidth: number; lineFontSize: number; assentFontSize: number }> = []

  for (const width of [320, 599] as const) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const outcome = page.getByRole('region', { name: 'Index' }).locator('[data-index-closing-beat="assent-outcome"]')
    const line = outcome.getByText('You son of', { exact: true })
    const copy = line.locator('..')
    const assent = copy.locator('strong')

    samples.push({
      width,
      outcomeWidth: (await outcome.boundingBox())!.width,
      lineFontSize: Number.parseFloat(await line.evaluate((element) => getComputedStyle(element).fontSize)),
      assentFontSize: Number.parseFloat(await assent.evaluate((element) => getComputedStyle(element).fontSize)),
    })
  }

  const [narrow, wide] = samples
  const outcomeScale = wide.outcomeWidth / narrow.outcomeWidth
  expect.soft(
    wide.lineFontSize / narrow.lineFontSize,
    JSON.stringify({ samples, invariant: 'handwritten line scales with the outcome image' }),
  ).toBeCloseTo(outcomeScale, 1)
  expect.soft(
    wide.assentFontSize / narrow.assentFontSize,
    JSON.stringify({ samples, invariant: 'assent emphasis scales with the outcome image' }),
  ).toBeCloseTo(outcomeScale, 1)
})

test('The Usual Specialists Index sub-600 recognition caption hugs its visible copy', async ({ page }) => {
  for (const width of specialistsLockedNarrowWidths) {
    await page.setViewportSize({ width, height: 1080 })
    await page.goto(specialistsPreviewPath)

    const recognition = page.getByRole('region', { name: 'Index' }).locator('[data-index-closing-beat="recognition"]')
    const visibleCopy = recognition.locator('span').last()
    await expect(visibleCopy).toHaveText('“Bingo”')

    const geometry = await recognition.evaluate((element) => {
      const copy = element.querySelector('span:last-child')
      if (!(copy instanceof HTMLElement)) throw new Error('Recognition copy is missing')
      const style = getComputedStyle(element)
      return {
        boxWidth: element.getBoundingClientRect().width,
        copyWidth: copy.getBoundingClientRect().width,
        chromeWidth:
          Number.parseFloat(style.paddingLeft)
          + Number.parseFloat(style.paddingRight)
          + Number.parseFloat(style.borderLeftWidth)
          + Number.parseFloat(style.borderRightWidth),
      }
    })

    expect.soft(
      Math.abs(geometry.boxWidth - (geometry.copyWidth + geometry.chromeWidth)),
      JSON.stringify({ width, geometry, invariant: 'recognition caption shrink-wraps its visible copy' }),
    ).toBeLessThanOrEqual(2)
  }
})

test('The Usual Specialists Index focus parks rope, crossing hardware, and Silk', async ({ page }) => {
  await page.setViewportSize({ width: 1456, height: 1100 })
  await page.goto(specialistsPreviewPath)

  await expect(page.locator('[data-specialist-chapter="index"]')).toBeVisible()
  await expect(page.locator('[data-specialist-chapter="silk"]')).toHaveCount(0)
  await expect(page.locator('[data-specialists-rope-piece]')).toHaveCount(0)
  await expect(page.locator('[data-specialists-rope-anchor]')).toHaveCount(0)
  await expect(page.locator('[data-specialists-chapter-crossing]')).toHaveCount(0)
  await expect(page.locator('[data-specialists-crossing-lockup]')).toHaveCount(0)
})

test.skip('The Usual Specialists Silk responsive matrix renders the settled scene set across its distinct treatments', async ({ page }) => {
  for (const width of [320, 389, 390, 520, 719, 720, 800, 899, 900, 1050, 1199, 1200, 1350, 1499, 1500, 1920] as const) {
    await page.setViewportSize({ width, height: 1800 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const commission05 = silk.locator('[data-silk-commission="05"]')
    const commission07 = silk.locator('[data-silk-commission="07"]')
    const reaction = silk.locator('[data-silk-commission="08"]')
    const reactionComposition = reaction.locator('[data-silk-reaction-frame-composition]')
    const reactionViewport = reaction.locator('[data-silk-commission-08-review-viewport]')
    const receipt = silk.locator('[data-silk-receipt-peekthrough]')
    const handoff = silk.locator('[data-silk-commission="09"]')

    for (const locator of [commission05, commission07, reaction, receipt, handoff]) await expect(locator).toBeVisible()
    const [reactionCompositionBox, reactionViewportBox] = await Promise.all([
      reactionComposition.boundingBox(),
      reactionViewport.boundingBox(),
    ])
    expect(reactionCompositionBox).not.toBeNull()
    expect(reactionViewportBox).not.toBeNull()
    for (const [compositionValue, viewportValue] of [
      [reactionCompositionBox!.x, reactionViewportBox!.x],
      [reactionCompositionBox!.y, reactionViewportBox!.y],
      [reactionCompositionBox!.width, reactionViewportBox!.width],
      [reactionCompositionBox!.height, reactionViewportBox!.height],
    ]) {
      expect.soft(Math.abs(compositionValue - viewportValue), JSON.stringify({ width, reactionCompositionBox, reactionViewportBox })).toBeLessThanOrEqual(1)
    }
    await expect(receipt.locator('[data-silk-receipt-world-image]')).toHaveAttribute('src', /silk-receipt-alcove-world-review\.webp$/)
    await expect(receipt.locator('[data-silk-receipt-frame-review]')).toHaveAttribute('src', /silk-receipt-peekthrough-frame-review\.webp$/)
    await expect(receipt.locator('[data-silk-receipt-peek-cutout]')).toHaveAttribute('src', /silk-receipt-hole-peek-cutout-review\.webp$/)
    await expect(handoff.locator('[data-silk-commission-09-standin-world]')).toBeVisible()
    const commission09Frame = handoff.locator('[data-silk-commission-09-frame-review]')
    await expect(commission09Frame).toHaveAttribute('src', /silk-commission-09-knockthrough-frame-review\.webp$/)
    await commission09Frame.scrollIntoViewIfNeeded()
    await expect.poll(() => commission09Frame.evaluate((image: HTMLImageElement) => image.currentSrc)).not.toBe('')
    const commission09CurrentSrc = await commission09Frame.evaluate((image: HTMLImageElement) => image.currentSrc)
    expect(commission09CurrentSrc).toMatch(width < 390
      ? /silk-commission-09-knockthrough-frame-review-portrait\.webp$/
      : /silk-commission-09-knockthrough-frame-review\.webp$/)

    if (width < 390) {
      const composition = handoff.locator('[data-silk-commission-09-composition]')
      const viewport = handoff.locator('[data-silk-commission-09-viewport]')
      const [compositionBox, viewportBox] = await Promise.all([composition.boundingBox(), viewport.boundingBox()])
      expect(compositionBox).not.toBeNull()
      expect(viewportBox).not.toBeNull()
      expect(compositionBox!.width / compositionBox!.height).toBeCloseTo(941 / 1672, 2)
      expect((viewportBox!.x - compositionBox!.x) / compositionBox!.width).toBeCloseTo(99 / 941, 2)
      expect((viewportBox!.y - compositionBox!.y) / compositionBox!.height).toBeCloseTo(129 / 1672, 2)
      expect(viewportBox!.width / compositionBox!.width).toBeCloseTo(752 / 941, 2)
      expect(viewportBox!.height / compositionBox!.height).toBeCloseTo(1402 / 1672, 2)
    }

    if (width < 390) {
      const silkChapterBox = await silk.boundingBox()
      const traversal = silk.locator('[data-silk-commission="06"]')
      const upperRope = silk.locator('[data-specialists-rope-piece="silk-upper"]')
      const upperRopeImage = upperRope.locator('img')
      const lowerRopeImage = silk.locator('[data-specialists-rope-piece="silk-lower"] img')
      const crossingLock = page.locator('[data-specialists-chapter-crossing="index-silk"] [data-specialists-crossing-lockup]')
      const knotBottomPort = crossingLock.locator('[data-specialists-crossing-lock-knot-bottom-port]')
      const [traversalBox, upperRopeBox, upperRopeImageBox, lowerRopeImageBox, knotBottomPortBox, commission05Box, commission07Box] = await Promise.all([
        traversal.boundingBox(),
        upperRope.boundingBox(),
        upperRopeImage.boundingBox(),
        lowerRopeImage.boundingBox(),
        knotBottomPort.boundingBox(),
        commission05.boundingBox(),
        commission07.boundingBox(),
      ])

      const commission09FrameBox = await commission09Frame.boundingBox()
      for (const box of [silkChapterBox, traversalBox, upperRopeBox, upperRopeImageBox, lowerRopeImageBox, knotBottomPortBox, commission05Box, commission07Box, commission09FrameBox]) expect(box).not.toBeNull()

      const knotBottom = {
        x: knotBottomPortBox!.x + knotBottomPortBox!.width / 2,
        y: knotBottomPortBox!.y + knotBottomPortBox!.height / 2,
      }
      const visibleRopeCenterX = upperRopeImageBox!.x + upperRopeImageBox!.width * (361.5 / 724)
      expect(
        commission09FrameBox!.y + commission09FrameBox!.height,
        JSON.stringify({ width, silkChapterBox, commission09FrameBox }),
      ).toBeLessThanOrEqual(silkChapterBox!.y + silkChapterBox!.height)
      const ropeUnderlap = knotBottom.y - upperRopeImageBox!.y
      expect(ropeUnderlap, JSON.stringify({ width, knotBottom, upperRopeImageBox })).toBeGreaterThanOrEqual(4)
      expect(ropeUnderlap, JSON.stringify({ width, knotBottom, upperRopeImageBox })).toBeLessThanOrEqual(10)
      expect(
        Math.abs(visibleRopeCenterX - knotBottom.x),
        JSON.stringify({ width, knotBottom, upperRopeImageBox, visibleRopeCenterX }),
      ).toBeLessThanOrEqual(0.5)
      expect(
        Math.abs((upperRopeImageBox!.y + upperRopeImageBox!.height) - lowerRopeImageBox!.y),
        JSON.stringify({ width, upperRopeImageBox, lowerRopeImageBox }),
      ).toBeLessThanOrEqual(1)

      const overlapsVertically = (a: NonNullable<typeof traversalBox>, b: NonNullable<typeof traversalBox>) => (
        a.y < b.y + b.height && a.y + a.height > b.y
      )
      if (width === 389) {
        expect(overlapsVertically(traversalBox!, commission05Box!)).toBe(true)
        expect(overlapsVertically(traversalBox!, commission07Box!)).toBe(true)
      }
    }

    if (width >= 390 && width < 720) {
      const aperture1Viewport = commission05.locator('[data-silk-aperture-world-viewport]')
      const aperture2Viewport = commission07.locator('[data-silk-aperture-world-viewport]')
      const eyesViewport = reaction.locator('[data-silk-commission-08-review-viewport]')
      const [aperture1ViewportBox, aperture2ViewportBox, eyesViewportBox] = await Promise.all([
        aperture1Viewport.boundingBox(),
        aperture2Viewport.boundingBox(),
        eyesViewport.boundingBox(),
      ])
      for (const box of [aperture1ViewportBox, aperture2ViewportBox, eyesViewportBox]) expect(box).not.toBeNull()

      const apertureGutter = aperture2ViewportBox!.y - (aperture1ViewportBox!.y + aperture1ViewportBox!.height)
      const eyesGutter = eyesViewportBox!.y - (aperture2ViewportBox!.y + aperture2ViewportBox!.height)
      expect(
        Math.abs(eyesGutter - apertureGutter),
        JSON.stringify({ width, apertureGutter, eyesGutter, aperture1ViewportBox, aperture2ViewportBox, eyesViewportBox }),
      ).toBeLessThanOrEqual(1)
    }

    if (width >= 720 && width < 900) {
      const stage = silk.locator('[data-silk-stage]')
      const eyesViewport = reaction.locator('[data-silk-commission-08-review-viewport]')
      const receiptFrame = receipt.locator('[data-silk-receipt-frame-review]')
      const receiptSilk = receipt.locator('[data-silk-receipt-peek-cutout]')
      const [stageBox, eyesViewportBox, receiptBox, receiptFrameBox, receiptSilkBox, handoffBox] = await Promise.all([
        stage.boundingBox(),
        eyesViewport.boundingBox(),
        receipt.boundingBox(),
        receiptFrame.boundingBox(),
        receiptSilk.boundingBox(),
        handoff.boundingBox(),
      ])
      for (const box of [stageBox, eyesViewportBox, receiptBox, receiptFrameBox, receiptSilkBox, handoffBox]) expect(box).not.toBeNull()

      // The accepted receipt-hole Silk cutout's first alpha>=16 pixels begin at y=44/1402.
      const antennaBobbleTop = receiptSilkBox!.y + receiptSilkBox!.height * (44 / 1402)
      const eyesBottom = eyesViewportBox!.y + eyesViewportBox!.height
      const antennaGutter = antennaBobbleTop - eyesBottom
      const stageCenterX = stageBox!.x + stageBox!.width / 2
      const handoffCenterX = handoffBox!.x + handoffBox!.width / 2
      const receiptFrameCenterY = receiptFrameBox!.y + receiptFrameBox!.height / 2
      const receiptSilkCenterY = receiptSilkBox!.y + receiptSilkBox!.height / 2
      expect.soft(
        antennaGutter,
        JSON.stringify({ width, antennaGutter, antennaBobbleTop, eyesViewportBox, receiptSilkBox }),
      ).toBeGreaterThanOrEqual(32)
      expect.soft(
        handoffCenterX,
        JSON.stringify({ width, stageCenterX, handoffCenterX, stageBox, handoffBox }),
      ).toBeLessThan(stageCenterX)
      expect.soft(
        handoffBox!.y,
        JSON.stringify({ width, receiptBox, handoffBox }),
      ).toBeGreaterThan(receiptBox!.y)
      expect.soft(
        Math.abs(receiptFrameCenterY - receiptSilkCenterY),
        JSON.stringify({ width, receiptFrameCenterY, receiptSilkCenterY, receiptFrameBox, receiptSilkBox }),
      ).toBeLessThanOrEqual(1)
      expect.soft(
        receiptFrameBox!.y,
        JSON.stringify({ width, eyesBottom, receiptFrameBox }),
      ).toBeGreaterThanOrEqual(eyesBottom + 12)
      expect.soft(
        handoffBox!.y,
        JSON.stringify({ width, receiptFrameCenterY, handoffBox }),
      ).toBeGreaterThan(receiptFrameCenterY)
    }

    if (width >= 900 && width < 1200) {
      const aperture1Viewport = commission05.locator('[data-silk-aperture-world-viewport]')
      const aperture2Viewport = commission07.locator('[data-silk-aperture-world-viewport]')
      const eyesViewport = reaction.locator('[data-silk-commission-08-review-viewport]')
      const receiptFrame = receipt.locator('[data-silk-receipt-frame-review]')
      const receiptSilk = receipt.locator('[data-silk-receipt-peek-cutout]')
      const [aperture1ViewportBox, aperture2ViewportBox, eyesViewportBox, commission09FrameBox, receiptFrameBox, receiptSilkBox] = await Promise.all([
        aperture1Viewport.boundingBox(),
        aperture2Viewport.boundingBox(),
        eyesViewport.boundingBox(),
        commission09Frame.boundingBox(),
        receiptFrame.boundingBox(),
        receiptSilk.boundingBox(),
      ])
      for (const box of [aperture1ViewportBox, aperture2ViewportBox, eyesViewportBox, commission09FrameBox, receiptFrameBox, receiptSilkBox]) expect(box).not.toBeNull()

      const approvedBelowEyesGutter = width === 900 ? 50 : width === 1050 ? 52.5 : 59.95
      const eyesBottom = eyesViewportBox!.y + eyesViewportBox!.height
      const commission09Gutter = commission09FrameBox!.y - eyesBottom
      const receiptLockupTop = Math.min(receiptFrameBox!.y, receiptSilkBox!.y)
      const receiptLockupGutter = receiptLockupTop - eyesBottom
      expect.soft(
        Math.abs(commission09Gutter - approvedBelowEyesGutter),
        JSON.stringify({ width, approvedBelowEyesGutter, commission09Gutter, eyesViewportBox, commission09FrameBox }),
      ).toBeLessThanOrEqual(1)
      expect.soft(
        Math.abs(receiptLockupGutter - approvedBelowEyesGutter),
        JSON.stringify({ width, approvedBelowEyesGutter, receiptLockupGutter, eyesViewportBox, receiptFrameBox, receiptSilkBox }),
      ).toBeLessThanOrEqual(1)
    }

    if (width >= 1200 && width < 1500) {
      const eyesViewport = reaction.locator('[data-silk-commission-08-review-viewport]')
      const receiptSilk = receipt.locator('[data-silk-receipt-peek-cutout]')
      const [eyesViewportBox, receiptSilkBox] = await Promise.all([
        eyesViewport.boundingBox(),
        receiptSilk.boundingBox(),
      ])
      for (const box of [eyesViewportBox, receiptSilkBox]) expect(box).not.toBeNull()

      // The accepted receipt-hole Silk cutout's first alpha>=16 pixels begin at y=44/1402.
      const antennaBobbleTop = receiptSilkBox!.y + receiptSilkBox!.height * (44 / 1402)
      const eyesBottom = eyesViewportBox!.y + eyesViewportBox!.height
      const antennaGutter = antennaBobbleTop - eyesBottom
      expect.soft(
        antennaGutter,
        JSON.stringify({ width, antennaGutter, antennaBobbleTop, eyesViewportBox, receiptSilkBox }),
      ).toBeGreaterThanOrEqual(16)
    }
    await expectNoHorizontalOverflow(page)
  }
})

test.skip('The Usual Specialists Silk compact matrix scales the accepted Receipt and Silk lockup continuously', async ({ page }) => {
  const acceptedAt720 = {
    receiptWidth: 324.122590206126,
    receiptHeight: 232.053180412252,
    frameWidth: 232.0532,
    silkWidth: 154.56,
    frameToSilkCenterX: 130.8,
    eyesToAntennaGutter: 39.9165,
  }

  for (const width of [719, 620, 520, 390] as const) {
    await page.setViewportSize({ width, height: 1800 })
    await page.goto(specialistsPreviewPath)

    const silkChapter = page.getByRole('region', { name: 'Silk' })
    const receipt = silkChapter.locator('[data-silk-receipt-peekthrough]')
    const receiptFrame = receipt.locator('[data-silk-receipt-frame-review]')
    const receiptSilk = receipt.locator('[data-silk-receipt-peek-cutout]')
    const eyesViewport = silkChapter.locator('[data-silk-commission="08"] [data-silk-commission-08-review-viewport]')
    const [receiptBox, receiptFrameBox, receiptSilkBox, eyesViewportBox] = await Promise.all([
      receipt.boundingBox(),
      receiptFrame.boundingBox(),
      receiptSilk.boundingBox(),
      eyesViewport.boundingBox(),
    ])
    for (const box of [receiptBox, receiptFrameBox, receiptSilkBox, eyesViewportBox]) expect(box).not.toBeNull()

    const scale = width / 720
    const frameCenterX = receiptFrameBox!.x + receiptFrameBox!.width / 2
    const frameCenterY = receiptFrameBox!.y + receiptFrameBox!.height / 2
    const silkCenterX = receiptSilkBox!.x + receiptSilkBox!.width / 2
    const silkCenterY = receiptSilkBox!.y + receiptSilkBox!.height / 2
    const antennaBobbleTop = receiptSilkBox!.y + receiptSilkBox!.height * (44 / 1402)
    const eyesBottom = eyesViewportBox!.y + eyesViewportBox!.height
    const antennaGutter = antennaBobbleTop - eyesBottom

    expect.soft(receiptBox!.width, JSON.stringify({ width, scale, receiptBox })).toBeCloseTo(acceptedAt720.receiptWidth * scale, 0)
    expect.soft(receiptBox!.height, JSON.stringify({ width, scale, receiptBox })).toBeCloseTo(acceptedAt720.receiptHeight * scale, 0)
    expect.soft(receiptFrameBox!.width, JSON.stringify({ width, scale, receiptFrameBox })).toBeCloseTo(acceptedAt720.frameWidth * scale, 0)
    expect.soft(receiptSilkBox!.width, JSON.stringify({ width, scale, receiptSilkBox })).toBeCloseTo(acceptedAt720.silkWidth * scale, 0)
    expect.soft(
      frameCenterX - silkCenterX,
      JSON.stringify({ width, scale, frameCenterX, silkCenterX, receiptFrameBox, receiptSilkBox }),
    ).toBeCloseTo(acceptedAt720.frameToSilkCenterX * scale, 0)
    expect.soft(
      Math.abs(frameCenterY - silkCenterY),
      JSON.stringify({ width, frameCenterY, silkCenterY, receiptFrameBox, receiptSilkBox }),
    ).toBeLessThanOrEqual(1)
    expect.soft(
      antennaGutter,
      JSON.stringify({ width, scale, antennaGutter, antennaBobbleTop, eyesViewportBox, receiptSilkBox }),
    ).toBeCloseTo(acceptedAt720.eyesToAntennaGutter * scale, 0)
    expect.soft(antennaGutter, JSON.stringify({ width, antennaGutter })).toBeGreaterThan(0)
    await expectNoHorizontalOverflow(page)
  }
})

test.skip('The Usual Specialists Silk Receipt lockup exposes one complete external box', async ({ page }) => {
  for (const width of [320, 390, 720, 900, 1199, 1200, 1499, 1500, 1920] as const) {
    await page.setViewportSize({ width, height: 1800 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const composition = silk.locator('[data-silk-receipt-peekthrough-composition]')
    const frame = composition.locator('[data-silk-receipt-frame-review]')
    const cutout = composition.locator('[data-silk-receipt-peek-cutout]')
    const [compositionBox, frameBox, cutoutBox] = await Promise.all([
      composition.boundingBox(),
      frame.boundingBox(),
      cutout.boundingBox(),
    ])
    for (const box of [compositionBox, frameBox, cutoutBox]) expect(box).not.toBeNull()

    const union = {
      x: Math.min(frameBox!.x, cutoutBox!.x),
      y: Math.min(frameBox!.y, cutoutBox!.y),
      right: Math.max(frameBox!.x + frameBox!.width, cutoutBox!.x + cutoutBox!.width),
      bottom: Math.max(frameBox!.y + frameBox!.height, cutoutBox!.y + cutoutBox!.height),
    }
    const unionWidth = union.right - union.x
    const unionHeight = union.bottom - union.y
    const diagnostic = JSON.stringify({ width, compositionBox, frameBox, cutoutBox, union, unionWidth, unionHeight })

    expect.soft(compositionBox!.x, diagnostic).toBeCloseTo(union.x, 0)
    expect.soft(compositionBox!.y, diagnostic).toBeCloseTo(union.y, 0)
    expect.soft(compositionBox!.width, diagnostic).toBeCloseTo(unionWidth, 0)
    expect.soft(compositionBox!.height, diagnostic).toBeCloseTo(unionHeight, 0)
  }
})

test.skip('The Usual Specialists Silk compact matrix gives Commission 09 its widescreen bleed treatment', async ({ page }) => {
  for (const width of [390, 520, 620, 719] as const) {
    await page.setViewportSize({ width, height: 1800 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const stage = silk.locator('[data-silk-stage]')
    const handoff = silk.locator('[data-silk-commission="09"]')
    const composition = handoff.locator('[data-silk-commission-09-composition]')
    const [stageBox, handoffBox, compositionBox] = await Promise.all([
      stage.boundingBox(),
      handoff.boundingBox(),
      composition.boundingBox(),
    ])
    for (const box of [stageBox, handoffBox, compositionBox]) expect(box).not.toBeNull()

    expect.soft(
      handoffBox!.x,
      JSON.stringify({ width, stageBox, handoffBox }),
    ).toBeCloseTo(stageBox!.x - stageBox!.width * 0.08, 0)
    expect.soft(
      handoffBox!.width,
      JSON.stringify({ width, stageBox, handoffBox }),
    ).toBeCloseTo(stageBox!.width * 1.16, 0)
    expect.soft(
      compositionBox!.x,
      JSON.stringify({ width, handoffBox, compositionBox }),
    ).toBeCloseTo(handoffBox!.x, 0)
    expect.soft(
      compositionBox!.width,
      JSON.stringify({ width, handoffBox, compositionBox }),
    ).toBeCloseTo(handoffBox!.width, 0)
    await expectNoHorizontalOverflow(page)
  }
})

test.skip('The Usual Specialists Silk Commission 09 placement owns compact and narrow bleed', async ({ page }) => {
  for (const width of [320, 389, 390, 520, 719] as const) {
    await page.setViewportSize({ width, height: 1800 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const stage = silk.locator('[data-silk-stage]')
    const placement = silk.locator('[data-silk-commission-09-placement]')
    const composition = placement.locator('[data-silk-commission-09-composition]')
    const [stageBox, placementBox, compositionBox] = await Promise.all([
      stage.boundingBox(),
      placement.boundingBox(),
      composition.boundingBox(),
    ])
    for (const box of [stageBox, placementBox, compositionBox]) expect(box).not.toBeNull()

    const diagnostic = JSON.stringify({ width, stageBox, placementBox, compositionBox })
    expect.soft(compositionBox!.x, diagnostic).toBeCloseTo(placementBox!.x, 0)
    expect.soft(compositionBox!.y, diagnostic).toBeCloseTo(placementBox!.y, 0)
    expect.soft(compositionBox!.width, diagnostic).toBeCloseTo(placementBox!.width, 0)
    expect.soft(compositionBox!.height, diagnostic).toBeCloseTo(placementBox!.height, 0)

    const expectedScale = width < 390 ? 1.042 : 1.16
    const expectedLeft = width < 390 ? -0.021 : -0.08
    expect.soft(placementBox!.x, diagnostic).toBeCloseTo(stageBox!.x + stageBox!.width * expectedLeft, 0)
    expect.soft(placementBox!.width, diagnostic).toBeCloseTo(stageBox!.width * expectedScale, 0)
  }
})

test.skip('The Usual Specialists Silk compact matrix keeps the Receipt/Silk to Commission 09 gutter proportional', async ({ page }) => {
  const acceptedAt719VisibleGutter = 21.42

  for (const width of [390, 520, 620, 719] as const) {
    await page.setViewportSize({ width, height: 1800 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const receipt = silk.locator('[data-silk-receipt-peekthrough]')
    const receiptSilk = receipt.locator('[data-silk-receipt-peek-cutout]')
    const commission09Frame = silk.locator('[data-silk-commission="09"] [data-silk-commission-09-frame-review]')
    const [receiptSilkBox, commission09FrameBox] = await Promise.all([
      receiptSilk.boundingBox(),
      commission09Frame.boundingBox(),
    ])
    for (const box of [receiptSilkBox, commission09FrameBox]) expect(box).not.toBeNull()

    // Alpha>=16 visible bounds: Receipt/Silk ends at y=829/900; Commission 09 begins at y=7/941.
    const receiptLockupVisibleBottom = receiptSilkBox!.y + receiptSilkBox!.height * (830 / 900)
    const commission09VisibleTop = commission09FrameBox!.y + commission09FrameBox!.height * (7 / 941)
    const gutter = commission09VisibleTop - receiptLockupVisibleBottom
    const scale = width / 719

    expect.soft(
      gutter,
      JSON.stringify({ width, scale, gutter, receiptSilkBox, commission09FrameBox }),
    ).toBeCloseTo(acceptedAt719VisibleGutter * scale, 0)
    expect.soft(gutter, JSON.stringify({ width, gutter })).toBeGreaterThan(0)
  }
})

test.skip('The Usual Specialists Silk narrow matrix keeps its gutters tight and proportional', async ({ page }) => {
  const checkpoints = [
    { width: 320, gap: 20 },
    { width: 340, gap: 20.4 },
    { width: 389, gap: 23.34 },
  ] as const

  for (const { width, gap } of checkpoints) {
    await page.setViewportSize({ width, height: 1400 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const commission07Frame = silk.locator('[data-silk-commission-07-review-portrait-frame]')
    const eyesViewport = silk.locator('[data-silk-commission-08-review-viewport]')
    const receipt = silk.locator('[data-silk-receipt-peekthrough]')
    const handoff = silk.locator('[data-silk-commission="09"]')
    const [commission07FrameBox, eyesViewportBox, receiptBox, handoffBox] = await Promise.all([
      commission07Frame.boundingBox(),
      eyesViewport.boundingBox(),
      receipt.boundingBox(),
      handoff.boundingBox(),
    ])
    for (const box of [commission07FrameBox, eyesViewportBox, receiptBox, handoffBox]) {
      expect(box).not.toBeNull()
    }

    // Alpha>=16 visible bounds: Commission 07 portrait ends at y=1629/1671.
    const commission07VisibleBottom = commission07FrameBox!.y + commission07FrameBox!.height * (1630 / 1671)
    const eyesGutter = eyesViewportBox!.y - commission07VisibleBottom
    const receiptToCommission09LayoutGutter = handoffBox!.y - (receiptBox!.y + receiptBox!.height)

    expect.soft(eyesGutter, JSON.stringify({ width, gap, eyesGutter, commission07FrameBox, eyesViewportBox })).toBeCloseTo(gap, 0)
    // The semantic Receipt root now includes the accepted rotated-frame footprint,
    // which already overlaps Commission 09 by ~19.76px at narrow widths.
    expect.soft(
      receiptToCommission09LayoutGutter,
      JSON.stringify({ width, receiptToCommission09LayoutGutter, receiptBox, handoffBox }),
    ).toBeCloseTo(-19.76, 0)
  }
})

test.skip('The Usual Specialists Silk narrow matrix lets Commission 09 bleed past both viewport edges', async ({ page }) => {
  for (const width of [320, 340, 389] as const) {
    await page.setViewportSize({ width, height: 1400 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const stage = silk.locator('[data-silk-stage]')
    const commission09Frame = silk.locator('[data-silk-commission-09-frame-review]')
    const [stageBox, commission09FrameBox] = await Promise.all([
      stage.boundingBox(),
      commission09Frame.boundingBox(),
    ])
    for (const box of [stageBox, commission09FrameBox]) expect(box).not.toBeNull()

    // Alpha>=16 visible bounds in the portrait source run from x=13 through x=926/941.
    const visibleLeft = commission09FrameBox!.x + commission09FrameBox!.width * (13 / 941)
    const visibleRight = commission09FrameBox!.x + commission09FrameBox!.width * (927 / 941)
    const stageRight = stageBox!.x + stageBox!.width

    expect.soft(visibleLeft, JSON.stringify({ width, visibleLeft, stageBox, commission09FrameBox })).toBeLessThanOrEqual(stageBox!.x - 1)
    expect.soft(visibleRight, JSON.stringify({ width, visibleRight, stageRight, commission09FrameBox })).toBeGreaterThanOrEqual(stageRight + 1)
    await expectNoHorizontalOverflow(page)
  }
})

test.skip('The Usual Specialists Silk matrix keeps chapter-bottom breathing room bounded across authored widths', async ({ page }) => {
  const checkpoints = [
    { width: 320, maxGap: 175 },
    { width: 389, maxGap: 175 },
    { width: 390, maxGap: 130 },
    { width: 520, maxGap: 130 },
    { width: 719, maxGap: 130 },
    { width: 720, maxGap: 140 },
    { width: 800, maxGap: 140 },
    { width: 899, maxGap: 140 },
    { width: 900, maxGap: 150 },
    { width: 1050, maxGap: 150 },
    { width: 1199, maxGap: 150 },
    { width: 1200, maxGap: 100 },
    { width: 1350, maxGap: 100 },
    { width: 1499, maxGap: 100 },
    { width: 1500, maxGap: 190 },
    { width: 1920, maxGap: 190 },
    { width: 2560, maxGap: 190 },
  ] as const

  for (const { width, maxGap } of checkpoints) {
    await page.setViewportSize({ width, height: 1400 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const commission09Frame = silk.locator('[data-silk-commission-09-frame-review]')
    const [chapterBox, frameBox] = await Promise.all([
      silk.boundingBox(),
      commission09Frame.boundingBox(),
    ])
    for (const box of [chapterBox, frameBox]) expect(box).not.toBeNull()

    // Alpha>=16 visible bounds end at y=1659 in the portrait source and y=935 in landscape.
    const visibleBottomRatio = width < 390 ? 1660 / 1672 : 936 / 941
    const visibleFrameBottom = frameBox!.y + frameBox!.height * visibleBottomRatio
    const bottomBreathingRoom = chapterBox!.y + chapterBox!.height - visibleFrameBottom

    expect.soft(
      bottomBreathingRoom,
      JSON.stringify({ width, maxGap, bottomBreathingRoom, chapterBox, frameBox }),
    ).toBeGreaterThanOrEqual(48)
    expect.soft(
      bottomBreathingRoom,
      JSON.stringify({ width, maxGap, bottomBreathingRoom, chapterBox, frameBox }),
    ).toBeLessThanOrEqual(maxGap)
    await expectNoHorizontalOverflow(page)
  }
})

test.skip('The Usual Specialists Silk mirror matrix keeps Silk attached to the Receipt hole', async ({ page }) => {
  let largeReceiptFrameWidth: number | null = null
  let largeReceiptSilkWidth: number | null = null
  for (const width of [390, 900, 1200, 1500, 1920] as const) {
    await page.setViewportSize({ width, height: 1200 })
    await page.goto(specialistsPreviewPath)

    const silk = page.getByRole('region', { name: 'Silk' })
    const cutout = silk.locator('[data-silk-receipt-peek-cutout]')
    const receiptFrame = silk.locator('[data-silk-receipt-frame-review]')
    const reaction = silk.locator('[data-silk-commission="08"]')
    const handoff = silk.locator('[data-silk-commission="09"]')
    const traversalPlacement = silk.locator('[data-silk-traversal-placement]')

    await expect(cutout).toBeVisible()
    const [matrixA, layerZ, reactionZ, handoffZ, traversalZ] = await Promise.all([
      cutout.evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).a),
      silk.locator('[data-silk-receipt-peek-cutout-layer]').evaluate((element) => Number.parseInt(getComputedStyle(element).zIndex, 10)),
      reaction.evaluate((element) => Number.parseInt(getComputedStyle(element).zIndex, 10)),
      handoff.evaluate((element) => Number.parseInt(getComputedStyle(element).zIndex, 10)),
      traversalPlacement.evaluate((element) => Number.parseInt(getComputedStyle(element).zIndex, 10)),
    ])

    expect(Math.sign(matrixA)).toBe(width >= 900 && width <= 1499 ? -1 : 1)
    expect(layerZ).toBeGreaterThan(reactionZ)
    expect(layerZ).toBeGreaterThan(handoffZ)
    expect(layerZ).toBeGreaterThan(traversalZ)

    if (width === 1500) {
      const [receiptFrameBox, receiptSilkBox] = await Promise.all([
        receiptFrame.boundingBox(),
        cutout.boundingBox(),
      ])
      expect(receiptFrameBox).not.toBeNull()
      expect(receiptSilkBox).not.toBeNull()
      largeReceiptFrameWidth = receiptFrameBox!.width
      largeReceiptSilkWidth = receiptSilkBox!.width
    }

    if (width === 1200) {
      const [receiptFrameBox, receiptSilkBox] = await Promise.all([
        receiptFrame.boundingBox(),
        cutout.boundingBox(),
      ])
      expect(receiptFrameBox).not.toBeNull()
      expect(receiptSilkBox).not.toBeNull()
      await page.setViewportSize({ width: 1500, height: 1200 })
      await page.goto(specialistsPreviewPath)
      const largeSilk = page.getByRole('region', { name: 'Silk' })
      const [referenceFrameBox, referenceSilkBox] = await Promise.all([
        largeSilk.locator('[data-silk-receipt-frame-review]').boundingBox(),
        largeSilk.locator('[data-silk-receipt-peek-cutout]').boundingBox(),
      ])
      expect(referenceFrameBox).not.toBeNull()
      expect(referenceSilkBox).not.toBeNull()
      expect(receiptFrameBox!.width).toBeCloseTo(referenceFrameBox!.width, 1)
      expect(receiptSilkBox!.width).toBeCloseTo(referenceSilkBox!.width, 1)
    }
  }
  expect(largeReceiptFrameWidth).not.toBeNull()
  expect(largeReceiptSilkWidth).not.toBeNull()
})

test.skip('The Usual Specialists Silk motion contract moves only aperture worlds and respects reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto(specialistsPreviewPath)

  const compositions = [
    { world: '[data-silk-commission-05-scene]', frame: '[data-silk-commission-05-frame]' },
    { world: '[data-silk-commission-07-review-world]', frame: '[data-silk-commission-07-review-frame]' },
    { world: '[data-silk-receipt-world-image]', frame: '[data-silk-receipt-frame-review]' },
    { world: '[data-silk-commission-09-standin-world]', frame: '[data-silk-commission-09-frame-review]' },
  ] as const

  for (const selectors of compositions) {
    const world = page.locator(selectors.world)
    const frame = page.locator(selectors.frame)
    await world.scrollIntoViewIfNeeded()
    await expect.poll(() => world.getAttribute('data-silk-parallax-offset')).not.toBeNull()
    const before = Number.parseFloat((await world.getAttribute('data-silk-parallax-offset')) ?? '0')
    const frameBefore = await frame.boundingBox()
    expect(frameBefore).not.toBeNull()
    await page.evaluate(() => window.scrollBy(0, -220))
    await expect.poll(async () => Number.parseFloat((await world.getAttribute('data-silk-parallax-offset')) ?? '0')).not.toBeCloseTo(before, 1)
    const frameAfter = await frame.boundingBox()
    expect(frameAfter).not.toBeNull()
    expect(frameAfter!.width).toBeCloseTo(frameBefore!.width, 0)
    expect(frameAfter!.height).toBeCloseTo(frameBefore!.height, 0)
  }

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.reload()
  for (const selectors of compositions) {
    const world = page.locator(selectors.world)
    await world.scrollIntoViewIfNeeded()
    await expect.poll(() => world.getAttribute('data-silk-parallax-offset')).toBe('0.00')
  }
})

test('The Usual Specialists page chassis freezes its authored canvas at the 2560 ceiling', async ({ page }) => {
  const capture = async (width: number) => {
    await page.setViewportSize({ width, height: 1100 })
    await page.goto(specialistsPreviewPath)
    const canvas = page.locator('[data-specialists-canvas="authored"]')
    await expect(canvas).toBeVisible()
    const box = await canvas.boundingBox()
    expect(box).not.toBeNull()
    await expectNoHorizontalOverflow(page)
    return box!
  }

  const at2560 = await capture(2560)
  const beyond = await capture(2880)
  expect(at2560.width).toBeCloseTo(2560, 0)
  expect(beyond.width).toBeCloseTo(2560, 0)
  expect(beyond.x).toBeCloseTo(160, 0)
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
