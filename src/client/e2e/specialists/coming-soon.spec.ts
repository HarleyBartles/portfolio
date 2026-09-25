import { expect, test } from '@playwright/test'
import { specialistsPath, settleViewport, expectNoHorizontalOverflow, boxRight, boxBottom } from './support'

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
