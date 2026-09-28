import { expect, type Page } from '@playwright/test'

export const wildBunchPath = './projects/wild-bunch/'
export const patchPath = './projects/adventures-of-patch/'
export const learningLabPath = './projects/agentic-learning-lab/'
export const specialistsCanonicalPath = './patch/the-usual-specialists/'
export const specialistsPreviewPath = './patch/the-usual-specialists/next/'

export const expectNoHorizontalOverflow = async (page: Page): Promise<void> => {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
}

export const tabToLink = async (page: Page, linkName: string): Promise<void> => {
  const link = page.getByRole('link', { name: linkName, exact: true })
  for (let press = 0; press < 30; press += 1) {
    await page.keyboard.press('Tab')
    if (await link.evaluate((element) => element === document.activeElement)) return
  }
  throw new Error(`Keyboard traversal did not reach ${linkName}`)
}
