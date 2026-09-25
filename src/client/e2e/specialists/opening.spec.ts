import { expect, test } from '@playwright/test'
import { specialistsPath, settleViewport, boxBottom } from './support'

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
