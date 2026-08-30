import { expect, test } from '@playwright/test'

test('about page makes the professional proposition and configured conversion routes explicit', async ({ page }) => {
  const response = await page.goto('./about/')

  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1, name: 'I still like writing code. I just know the job is bigger than that now.' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Access Checks, end to end.' })).toBeVisible()
  await expect(page.getByText('No source capture, no success.')).toBeVisible()
  await expect(page.getByText('Access Checks is a .NET API on Azure Functions, with a React and .NET portal for API consumers, usage and webhook subscriptions.')).toBeVisible()
  await expect(page.getByText(/\.NET 8 API/)).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 2, name: 'AI Engineer Level 6.' })).toBeVisible()
  await expect(page.getByText(/2005–2015: order administration → Account Executive → Account Manager → Team Manager/)).toBeVisible()
  await expect(page.getByText(/May 2015–January 2019: Web Manager/)).toBeVisible()
  await expect(page.getByText('In another life')).toBeVisible()
  await expect(page.getByRole('link', { name: 'IMDb: Harley Bartles (opens in a new tab)' })).toBeVisible()
  await expect(page.getByText(/Remote-first works best.*My notice period is four weeks/i)).toBeVisible()
  const cvConversion = page.locator('[data-visual-contract="about-cv-conversion"]')
  await expect(cvConversion.getByRole('link', { name: 'Read the CV' })).toHaveAttribute('href', '/cv')
  await expect(cvConversion.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '#contact')
  await expect(cvConversion.getByRole('link', { name: 'Download PDF' })).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 2, name: 'Get in touch.' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Send message' })).toBeVisible()
  await expect(page.getByText(/contact delivery is not connected yet/i)).toHaveCount(0)
  await expect(page.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0)
  await expect(page.getByText(/technical owner/i)).toHaveCount(0)
})

test('homepage hiring link reaches the contact section', async ({ page }) => {
  await page.goto('./')

  await page.getByRole('link', { name: 'Experience, current work, contact' }).click()
  await expect(page).toHaveURL(/\/about#contact$/)
  await expect(page.getByRole('heading', { level: 2, name: 'Get in touch.' })).toBeVisible()
})

test('about intro starts both desktop columns on the same baseline', async ({ page }) => {
  await page.goto('./about/')
  await expect(page.locator('.about-intro')).toBeVisible()

  const [headingColumn, copyColumn] = await page.locator('.about-intro > div').all()
  const [headingBox, copyBox] = await Promise.all([headingColumn.boundingBox(), copyColumn.boundingBox()])

  expect(headingBox).not.toBeNull()
  expect(copyBox).not.toBeNull()
  expect(Math.abs(headingBox!.y - copyBox!.y)).toBeLessThanOrEqual(1)
})

test('about uses a content-led first section and one boundary between structural sections', async ({ page }) => {
  await page.goto('./about/')
  await expect(page.locator('.about-intro')).toBeVisible()

  const layout = await page.evaluate(() => {
    const intro = document.querySelector('.about-intro')?.getBoundingClientRect()
    const pageStyle = getComputedStyle(document.querySelector('.about-page')!)
    const actingStyle = getComputedStyle(document.querySelector('.career-timeline__stage--aside')!)
    const independentStyle = getComputedStyle(document.querySelector('.about-independent')!)

    return {
      introBottom: intro?.bottom,
      introHeight: intro?.height,
      introMinimumHeight: Number.parseFloat(getComputedStyle(document.querySelector('.about-intro')!).minBlockSize),
      articlePaddingBottom: pageStyle.paddingBottom,
      careerPaddingBottom: getComputedStyle(document.querySelector('.about-career')!).paddingBottom,
      contactPaddingBottom: getComputedStyle(document.querySelector('.about-contact')!).paddingBottom,
      actingBottomBorder: actingStyle.borderBottomWidth,
      independentTopBorder: independentStyle.borderTopWidth,
    }
  })

  expect(layout.introMinimumHeight).toBe(0)
  expect(layout.introHeight).toBeGreaterThan(0)
  expect(layout.articlePaddingBottom).toBe('0px')
  expect(layout.careerPaddingBottom).toBe('0px')
  expect(layout.contactPaddingBottom).toBe('40px')
  expect(layout.actingBottomBorder).toBe('0px')
  expect(layout.independentTopBorder).toBe('1px')
})

test('current-work heading remains a single intentional line across responsive layouts', async ({ page }) => {
  for (const width of [320, 480, 769, 1133, 1440]) {
    await page.setViewportSize({ width, height: 912 })
    await page.goto('./about/')

    const heading = page.getByRole('heading', { level: 2, name: 'Access Checks, end to end.' })
    await expect(heading).toBeVisible()

    const lineCount = await heading.evaluate((element) => {
      const text = element.firstChild
      if (text === null) throw new Error('Expected a text node in the current-work heading')

      const range = document.createRange()
      range.selectNodeContents(text)
      return range.getClientRects().length
    })

    expect(lineCount, `Expected the current-work heading to stay on one line at ${width}px`).toBe(1)
  }
})

test('about headings declare and satisfy their text-wrap contracts', async ({ page }) => {
  const contracts = {
    display: ['about-title', 'cv-title'],
    balanced: [],
    singleLine: ['access-title', 'career-title', 'independent-title', 'study-title', 'contact-title'],
  }

  for (const width of [320, 769, 1133, 1440]) {
    await page.setViewportSize({ width, height: 912 })
    await page.goto('./about/')

    for (const id of contracts.display) {
      await expect(page.locator(`#${id}`)).toHaveAttribute('data-text-wrap', 'display')
    }

    for (const id of contracts.balanced) {
      const heading = page.locator(`#${id}`)
      await expect(heading).toHaveAttribute('data-text-wrap', 'balanced')
      await expect(heading).toHaveCSS('text-wrap', 'balance')
    }

    for (const id of contracts.singleLine) {
      const heading = page.locator(`#${id}`)
      await expect(heading).toHaveAttribute('data-text-wrap', 'single-line')

      const lineCount = await heading.evaluate((element) => {
        const range = document.createRange()
        range.selectNodeContents(element)
        return range.getClientRects().length
      })

      expect(lineCount, `Expected #${id} to stay on one line at ${width}px`).toBe(1)
    }
  }
})

test('about lets the independent preamble use its available width and protects the study title', async ({ page }) => {
  await page.setViewportSize({ width: 1161, height: 912 })
  await page.goto('./about/')

  const independentPreamble = page.locator('.about-independent > p:not(.eyebrow)')
  const studyTitle = page.locator('#study-title')

  await expect(independentPreamble).toBeVisible()
  await expect(studyTitle).toBeVisible()

  const layout = await page.evaluate(() => {
    const lineCount = (selector: string) => {
      const element = document.querySelector(selector)
      if (element === null) throw new Error(`Missing ${selector}`)
      const range = document.createRange()
      range.selectNodeContents(element)
      return range.getClientRects().length
    }

    return {
      independentPreambleLines: lineCount('.about-independent > p:not(.eyebrow)'),
      studyTitleLines: lineCount('#study-title'),
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
    }
  })

  await expect(studyTitle).toHaveAttribute('data-text-wrap', 'single-line')
  expect(layout.independentPreambleLines).toBe(1)
  expect(layout.studyTitleLines).toBe(1)
  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
})
