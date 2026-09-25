import { expect, test } from '@playwright/test'
import { openIndex, settleViewport, expectNoHorizontalOverflow, boxRight, boxBottom, overlapArea, closeBoxes } from './support'

test('The Usual Specialists Index uses only the locked responsive modes at its authored thresholds', async ({ page }) => {
  const index = await openIndex(page, 320)

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
