import { expect, type Locator, type Page } from '@playwright/test'

export const specialistsPath = './patch/the-usual-specialists/'

export const settleViewport = async (page: Page, width: number): Promise<void> => {
  await page.setViewportSize({ width, height: 1080 })
  await page.evaluate(() => new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  }))
}

export const openIndex = async (page: Page, width: number): Promise<Locator> => {
  await page.setViewportSize({ width, height: 1080 })
  await page.goto(specialistsPath)
  const index = page.getByRole('region', { name: 'Index' })
  await expect(index).toBeVisible()
  return index
}

export const expectNoHorizontalOverflow = async (page: Page): Promise<void> => {
  expect(await page.locator('html').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
}

export type Box = NonNullable<Awaited<ReturnType<Locator['boundingBox']>>>

export const boxRight = (box: Box): number => box.x + box.width
export const boxBottom = (box: Box): number => box.y + box.height

export const overlapArea = (first: Box, second: Box): number => {
  const width = Math.max(0, Math.min(boxRight(first), boxRight(second)) - Math.max(first.x, second.x))
  const height = Math.max(0, Math.min(boxBottom(first), boxBottom(second)) - Math.max(first.y, second.y))
  return width * height
}

export const closeBoxes = async (index: Locator) => {
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
