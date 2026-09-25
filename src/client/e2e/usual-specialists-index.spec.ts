import { expect, test, type Locator, type Page } from '@playwright/test'

const specialistsPath = './patch/the-usual-specialists/'

const settleViewport = async (page: Page, width: number): Promise<void> => {
  await page.setViewportSize({ width, height: 1080 })
  await page.evaluate(() => new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  }))
}

const openIndex = async (page: Page, width: number): Promise<Locator> => {
  await page.setViewportSize({ width, height: 1080 })
  await page.goto(specialistsPath)
  const index = page.getByRole('region', { name: 'Index' })
  await expect(index).toBeVisible()
  return index
}

const expectNoHorizontalOverflow = async (page: Page): Promise<void> => {
  expect(await page.locator('html').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
}

type Box = NonNullable<Awaited<ReturnType<Locator['boundingBox']>>>

const boxRight = (box: Box): number => box.x + box.width
const boxBottom = (box: Box): number => box.y + box.height

const overlapArea = (first: Box, second: Box): number => {
  const width = Math.max(0, Math.min(boxRight(first), boxRight(second)) - Math.max(first.x, second.x))
  const height = Math.max(0, Math.min(boxBottom(first), boxBottom(second)) - Math.max(first.y, second.y))
  return width * height
}

const closeBoxes = async (index: Locator) => {
  const [chapter, office, recognition, retrieval, outcome, graph, closing] = await Promise.all([
    index.boundingBox(),
    index.locator('[data-index-substrate="commission-03"]').boundingBox(),
    index.locator('[data-index-closing-beat="recognition"]').boundingBox(),
    index.locator('[data-index-closing-beat="source-retrieval"]').boundingBox(),
    index.locator('[data-index-closing-beat="assent-outcome"]').boundingBox(),
    index.locator('[data-index-research-lockup] [data-index-substrate="graph-paper"]').boundingBox(),
    index.locator('[data-index-closing-sequence]').boundingBox(),
  ])

  for (const box of [chapter, office, recognition, retrieval, outcome, graph, closing]) expect(box).not.toBeNull()
  return {
    chapter: chapter!,
    office: office!,
    recognition: recognition!,
    retrieval: retrieval!,
    outcome: outcome!,
    graph: graph!,
    closing: closing!,
  }
}

test('The Usual Specialists Index uses only the locked responsive modes at its authored thresholds', async ({ page }) => {
  const index = await openIndex(page, 320)
  await expect(page.locator('[data-specialist-chapter="silk"], [data-specialist-chapter="writ"], [data-specialist-chapter="klause"], [data-specialist-chapter="rollback"], [data-specialist-chapter="receipt"]')).toHaveCount(0)

  const highStep = index.locator('[data-index-traversal="index-high-step"]')
  const walk = index.locator('[data-index-traversal="index-walk"]')
  const indexReturn = index.locator('[data-index-traversal="index-return"]')
  const patchReturn = index.locator('[data-index-traversal="patch-return"]')

  for (const width of [320, 599, 600, 699, 700, 959, 960, 1199, 1200, 1299, 1300, 1599, 1600, 1919, 1920, 2560] as const) {
    await settleViewport(page, width)

    expect(await highStep.isVisible(), `high-step visibility at ${width}px`).toBe(width < 700)
    expect(await walk.isVisible(), `walk visibility at ${width}px`).toBe(width >= 700)
    expect(await indexReturn.isVisible(), `Index return visibility at ${width}px`).toBe(width >= 1600)
    expect(await patchReturn.isVisible(), `Patch return visibility at ${width}px`).toBe(width >= 1600)
    await expectNoHorizontalOverflow(page)

    if (width >= 1920) {
      const chapterBox = await index.boundingBox()
      expect(chapterBox).not.toBeNull()
      expect(chapterBox!.height, `Index chapter height at ${width}px`).toBeLessThanOrEqual(1080)
    }
  }
})

test('The Usual Specialists Index story card never covers character models or the Index mark', async ({ page }) => {
  const index = await openIndex(page, 320)
  const story = index.locator('[data-index-story-card]')
  const protectedElements = index.locator('[data-index-traversal], [data-index-lockup]')

  for (const width of [320, 599, 600, 699, 700, 959, 960, 1199, 1200, 1299, 1300, 1399, 1400, 1599, 1600, 1619, 1620, 1919, 1920, 2560] as const) {
    await settleViewport(page, width)
    const storyBox = await story.boundingBox()
    expect(storyBox, `story card box at ${width}px`).not.toBeNull()

    for (let indexPosition = 0; indexPosition < await protectedElements.count(); indexPosition += 1) {
      const protectedElement = protectedElements.nth(indexPosition)
      const protectedBox = await protectedElement.boundingBox()
      if (protectedBox === null) continue

      const traversalLabel = await protectedElement.getAttribute('data-index-traversal')
      const label = traversalLabel ?? 'Index lockup'
      expect(
        overlapArea(storyBox!, protectedBox),
        `story card overlap with ${label} at ${width}px; story=${JSON.stringify(storyBox)} protected=${JSON.stringify(protectedBox)}`,
      ).toBe(0)
    }
  }
})

test('The Usual Specialists Index closing sequence preserves its authored compact endpoints and bounded overlapping lockup', async ({ page }) => {
  const index = await openIndex(page, 600)
  const mainDocument = index.locator('[data-index-substrate="desk-diagram"]')
  const office = index.locator('[data-index-substrate="commission-03"]')
  const recognition = index.locator('[data-index-closing-beat="recognition"]')
  const retrieval = index.locator('[data-index-closing-beat="source-retrieval"]')
  const outcome = index.locator('[data-index-closing-beat="assent-outcome"]')
  const outcomeImage = outcome.getByRole('img', { name: /Patch carries Index's assent onward/i })
  const closing = index.locator('[data-index-closing-sequence]')

  const [outcomeCropBox, outcomeImageBox] = await Promise.all([outcome.boundingBox(), outcomeImage.boundingBox()])
  expect(outcomeCropBox).not.toBeNull()
  expect(outcomeImageBox).not.toBeNull()
  expect(Math.abs(outcomeImageBox!.y - outcomeCropBox!.y), 'outcome crop preserves generated top edge').toBeLessThanOrEqual(1)
  expect(Math.abs(boxRight(outcomeImageBox!) - boxRight(outcomeCropBox!)), 'outcome crop preserves generated right edge').toBeLessThanOrEqual(1)
  expect(boxBottom(outcomeImageBox!), 'outcome crop trims only permitted bottom overscan').toBeGreaterThan(boxBottom(outcomeCropBox!))

  for (const [width, expectedStepY, expectedRecognitionY] of [[600, 118, 13], [959, 203, 17]] as const) {
    await settleViewport(page, width)
    const [chapterBox, mainBox, officeBox, recognitionBox, retrievalBox, outcomeBox] = await Promise.all([
      index.boundingBox(),
      mainDocument.boundingBox(),
      office.boundingBox(),
      recognition.boundingBox(),
      retrieval.boundingBox(),
      outcome.boundingBox(),
    ])
    for (const box of [chapterBox, mainBox, officeBox, recognitionBox, retrievalBox, outcomeBox]) expect(box).not.toBeNull()

    expect(officeBox!.y - (mainBox!.y + mainBox!.height), `office gutter at ${width}px`).toBeCloseTo(31, 0)
    expect(retrievalBox!.x - officeBox!.x, `retrieval x seam at ${width}px`).toBeCloseTo((officeBox!.width / 2) + 48, 0)
    expect(retrievalBox!.y - officeBox!.y, `retrieval y step at ${width}px`).toBeCloseTo(expectedStepY, 0)
    expect(recognitionBox!.x - retrievalBox!.x, `recognition x inset at ${width}px`).toBeCloseTo(-14, 0)
    expect(recognitionBox!.y - retrievalBox!.y, `recognition y inset at ${width}px`).toBeCloseTo(expectedRecognitionY, 0)
    expect(outcomeBox!.x - chapterBox!.x, `outcome left edge at ${width}px`).toBeCloseTo(0, 0)
    expect((outcomeBox!.x + outcomeBox!.width) - (officeBox!.x + officeBox!.width), `outcome right edge at ${width}px`).toBeCloseTo(0, 0)
    expect(outcomeBox!.y - (officeBox!.y + officeBox!.height), `outcome gutter at ${width}px`).toBeCloseTo(70, 0)
  }

  await settleViewport(page, 959)
  const [compactOffice, compactClosing] = await Promise.all([office.boundingBox(), closing.boundingBox()])
  await settleViewport(page, 960)
  const [mediumChapter, mediumOffice, mediumRecognition, mediumRetrieval, mediumOutcome, mediumClosing] = await Promise.all([
    index.boundingBox(),
    office.boundingBox(),
    recognition.boundingBox(),
    retrieval.boundingBox(),
    outcome.boundingBox(),
    closing.boundingBox(),
  ])
  for (const box of [compactOffice, compactClosing, mediumChapter, mediumOffice, mediumRecognition, mediumRetrieval, mediumOutcome, mediumClosing]) expect(box).not.toBeNull()
  expect(compactOffice!.width / compactClosing!.width).toBeGreaterThan(0.6)
  expect(mediumOffice!.width / mediumClosing!.width).toBeLessThan(0.5)
  expect(mediumOffice!.x - mediumChapter!.x).toBeCloseTo(0, 0)
  expect((mediumChapter!.x + mediumChapter!.width) - (mediumOutcome!.x + mediumOutcome!.width)).toBeCloseTo(0, 0)
  expect(mediumRecognition!.x).toBeLessThan(mediumRetrieval!.x)
  expect(boxRight(mediumRecognition!) - mediumRetrieval!.x).toBeGreaterThan(0)

  const verticalRegistration = new Map<number, { graph: number, office: number, retrieval: number, outcome: number }>()
  for (const width of [1000, 1200, 1399, 1400] as const) {
    await settleViewport(page, width)
    const boxes = await closeBoxes(index)

    expect(boxRight(boxes.office) - boxes.retrieval.x, `office/retrieval overlap at ${width}px`).toBeGreaterThan(0)
    expect(boxRight(boxes.retrieval) - boxes.outcome.x, `retrieval/outcome overlap at ${width}px`).toBeGreaterThan(0)
    expect(boxes.recognition.x, `Bingo starts before the office/retrieval seam at ${width}px`).toBeLessThan(boxes.retrieval.x)
    expect(boxRight(boxes.recognition), `Bingo crosses the office/retrieval seam at ${width}px`).toBeGreaterThan(boxes.retrieval.x)

    verticalRegistration.set(width, {
      graph: boxes.graph.y,
      office: boxes.office.y,
      retrieval: boxes.retrieval.y - boxes.closing.y,
      outcome: boxes.outcome.y - boxes.closing.y,
    })
  }

  const beforeWide = verticalRegistration.get(1399)!
  const atWide = verticalRegistration.get(1400)!
  for (const key of ['graph', 'office', 'retrieval', 'outcome'] as const) {
    expect(Math.abs(beforeWide[key] - atWide[key]), `${key} vertical continuity at 1399→1400`).toBeLessThanOrEqual(2)
  }
})

test('The Usual Specialists Index return pair does not own the walking Index lane at 1600', async ({ page }) => {
  const index = await openIndex(page, 1599)
  const desk = index.locator('[data-index-substrate="desk-diagram"]')
  const walk = index.locator('[data-index-traversal="index-walk"]')
  const indexReturn = index.locator('[data-index-traversal="index-return"]')
  const patchReturn = index.locator('[data-index-traversal="patch-return"]')

  const measureWalkLane = async () => {
    const [deskBox, walkBox] = await Promise.all([desk.boundingBox(), walk.boundingBox()])
    expect(deskBox).not.toBeNull()
    expect(walkBox).not.toBeNull()
    return {
      lane: (walkBox!.x - deskBox!.x) / deskBox!.width,
      top: walkBox!.y - deskBox!.y,
    }
  }

  const before = await measureWalkLane()
  await expect(indexReturn).not.toBeVisible()
  await expect(patchReturn).not.toBeVisible()

  await settleViewport(page, 1600)
  const after = await measureWalkLane()
  await expect(indexReturn).toBeVisible()
  await expect(patchReturn).toBeVisible()
  expect(Math.abs(before.lane - after.lane)).toBeLessThanOrEqual(0.01)
  expect(Math.abs(before.top - after.top)).toBeLessThanOrEqual(1)
})

test('The Usual Specialists construction copy stays inside the accepted sign face', async ({ page }) => {
  await page.goto(specialistsPath)

  const construction = page.locator('[data-specialists-under-construction]')
  const image = construction.getByRole('img', {
    name: 'Patch in a yellow hard hat stands beside a construction sign, traffic cone and hazard tape.',
  })
  const signFace = construction.locator('[data-specialists-construction-sign-face]')
  const heading = signFace.getByRole('heading', { level: 2, name: 'UNDER CONSTRUCTION' })
  const subcopy = signFace.getByText('Check back soon.')

  for (const width of [320, 390, 768, 1200, 1920] as const) {
    await settleViewport(page, width)

    const [imageBox, signBox, headingBox, subcopyBox] = await Promise.all([
      image.boundingBox(),
      signFace.boundingBox(),
      heading.boundingBox(),
      subcopy.boundingBox(),
    ])

    for (const box of [imageBox, signBox, headingBox, subcopyBox]) expect(box).not.toBeNull()

    expect(signBox!.x, 'sign left at ' + width + 'px').toBeGreaterThanOrEqual(imageBox!.x)
    expect(signBox!.y, 'sign top at ' + width + 'px').toBeGreaterThanOrEqual(imageBox!.y)
    expect(boxRight(signBox!), 'sign right at ' + width + 'px').toBeLessThanOrEqual(boxRight(imageBox!))
    expect(boxBottom(signBox!), 'sign bottom at ' + width + 'px').toBeLessThanOrEqual(boxBottom(imageBox!))

    for (const [label, box] of [['heading', headingBox!], ['subcopy', subcopyBox!]] as const) {
      expect(box.x, label + ' left at ' + width + 'px').toBeGreaterThanOrEqual(signBox!.x)
      expect(box.y, label + ' top at ' + width + 'px').toBeGreaterThanOrEqual(signBox!.y)
      expect(boxRight(box), label + ' right at ' + width + 'px').toBeLessThanOrEqual(boxRight(signBox!))
      expect(boxBottom(box), label + ' bottom at ' + width + 'px').toBeLessThanOrEqual(boxBottom(signBox!))
    }
  }
})

test('The Usual Specialists construction artwork crops its transparent side margins below 600px', async ({ page }) => {
  await page.setViewportSize({ width: 599, height: 1080 })
  await page.goto(specialistsPath)

  const lockup = page.locator('[data-specialists-construction-lockup]')
  const artwork = page.locator('[data-specialists-construction-artwork]')
  await expect(lockup).toBeVisible()
  await expect(artwork).toBeVisible()
  const [lockupBox, artworkBox] = await Promise.all([
    lockup.boundingBox(),
    artwork.boundingBox(),
  ])
  expect(lockupBox).not.toBeNull()
  expect(artworkBox).not.toBeNull()
  expect(lockupBox!.x).toBeLessThanOrEqual(1)
  expect(boxRight(lockupBox!)).toBeGreaterThanOrEqual(598)
  expect(artworkBox!.x).toBeLessThan(lockupBox!.x - lockupBox!.width * 0.1)
  expect(boxRight(artworkBox!)).toBeGreaterThan(boxRight(lockupBox!) + lockupBox!.width * 0.1)
  expect(artworkBox!.y).toBeGreaterThanOrEqual(lockupBox!.y - 1)
  expect(boxBottom(artworkBox!)).toBeLessThanOrEqual(boxBottom(lockupBox!) + 1)
  await expectNoHorizontalOverflow(page)
})

test('The Usual Specialists opening keeps the Patch signature subordinate at narrow and wide widths', async ({ page }) => {
  await page.goto(specialistsPath)

  const title = page.locator('[data-specialists-wordmark]')
  const supporting = page.locator('[data-specialists-opening-supporting]')
  const series = page.locator('[data-patch-series-lockup]')

  await settleViewport(page, 320)
  let [titleBox, supportingBox, seriesBox] = await Promise.all([
    title.boundingBox(),
    supporting.boundingBox(),
    series.boundingBox(),
  ])
  for (const box of [titleBox, supportingBox, seriesBox]) expect(box).not.toBeNull()
  expect(supportingBox!.width).toBeGreaterThanOrEqual(titleBox!.width * 0.9)
  expect(seriesBox!.width).toBeLessThanOrEqual(supportingBox!.width * 0.38)

  for (const width of [1400, 1920, 2560] as const) {
    await settleViewport(page, width)
    ;[titleBox, supportingBox, seriesBox] = await Promise.all([
      title.boundingBox(),
      supporting.boundingBox(),
      series.boundingBox(),
    ])
    for (const box of [titleBox, supportingBox, seriesBox]) expect(box).not.toBeNull()

    const verticalGap = supportingBox!.y - boxBottom(titleBox!)
    expect(verticalGap, 'title/supporting vertical gap at ' + width + 'px').toBeLessThanOrEqual(24)
    expect(supportingBox!.x, 'supporting left edge at ' + width + 'px').toBeLessThan(
      titleBox!.x + titleBox!.width * 0.72,
    )
    expect(seriesBox!.width, 'series width at ' + width + 'px').toBeLessThan(titleBox!.width * 0.22)
  }
})
