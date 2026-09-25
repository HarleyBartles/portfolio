import { expect, test } from '@playwright/test'

test('the CV header owns the boundary before the opening profile section', async ({ page }) => {
  await page.goto('./cv/')

  const openingSection = page.locator('[data-cv-section][data-divider="none"]')

  await expect(openingSection).toHaveCount(1)
  await expect(openingSection).toHaveCSS('border-top-width', '0px')
})

test('the CV availability line uses the available desktop header width', async ({ page }) => {
  await page.setViewportSize({ width: 980, height: 750 })
  await page.goto('./cv/')

  const availability = page.locator('[data-cv-availability]')
  const metrics = await availability.evaluate((element) => {
    const style = getComputedStyle(element)
    return {
      height: element.getBoundingClientRect().height,
      lineHeight: Number.parseFloat(style.lineHeight),
    }
  })

  expect(metrics.height).toBeLessThanOrEqual(metrics.lineHeight + 1)
})

test('the CV name owns a full desktop header row', async ({ page }) => {
  await page.setViewportSize({ width: 980, height: 750 })
  await page.goto('./cv/')

  const layout = await page.locator('[data-cv-header]').evaluate((header) => {
    const name = header.querySelector('h1')
    const headline = header.querySelector('[data-cv-headline]')
    const details = header.querySelector('[data-cv-details]')
    if (name === null || headline === null || details === null) throw new Error('Expected CV header content')

    const nameStyle = getComputedStyle(name)
    return {
      nameHeight: name.getBoundingClientRect().height,
      nameLineHeight: Number.parseFloat(nameStyle.lineHeight),
      headlineTop: headline.getBoundingClientRect().top,
      detailsTop: details.getBoundingClientRect().top,
    }
  })

  expect(layout.nameHeight).toBeLessThanOrEqual(layout.nameLineHeight + 1)
  expect(Math.abs(layout.headlineTop - layout.detailsTop)).toBeLessThanOrEqual(1)
})

test('employers use the same heading treatment in the printed CV', async ({ page }) => {
  await page.setViewportSize({ width: 794, height: 1600 })
  await page.goto('./cv/')
  await page.emulateMedia({ media: 'print' })

  const headings = [
    page.getByRole('heading', { name: 'The Access Group', exact: true }),
    page.getByRole('heading', { name: 'Barbican Insurance Group → Arch Capital Group', exact: true }),
    page.getByRole('heading', { name: 'Brand Addition', exact: true }),
  ]
  const treatments = await Promise.all(headings.map((heading) => heading.evaluate((element) => {
    const style = getComputedStyle(element)
    return { fontSize: style.fontSize, fontWeight: style.fontWeight }
  })))

  expect(treatments[0]).toEqual(treatments[1])
  expect(treatments[1]).toEqual(treatments[2])
})

test('print-only page furniture and contact details stay out of the web CV', async ({ page }) => {
  await page.setViewportSize({ width: 794, height: 1123 })
  await page.goto('./cv/')

  const runningTitle = page.getByText('Harley Bartles · CV · 2 / 2', { exact: true })
  await expect(runningTitle).toBeHidden()
  await expect(page.locator('[data-cv-details] a[href="/contact"]')).toBeVisible()

  await page.emulateMedia({ media: 'print' })

  await expect(runningTitle).toBeVisible()
  const printUrls = page.locator('[data-cv-print-urls]')
  await expect(printUrls).toHaveText('harleybartles.com · github.com/HarleyBartles · linkedin.com/in/harley-bartles-92326110')
  await expect(printUrls).toBeVisible()
  await expect(printUrls.locator('a')).toHaveCount(0)
  await expect(page.locator('[data-cv-header] a[href="/contact"]')).toBeHidden()
})

test('printed CV header regions fit without overlap or horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 794, height: 1123 })
  await page.goto('./cv/')
  await page.emulateMedia({ media: 'print' })

  const layout = await page.locator('[data-cv-header]').evaluate((header) => {
    const selectors = ['h1', '[data-cv-headline]', '[data-cv-availability]', '[data-cv-print-urls]']
    const regions = selectors.map((selector) => {
      const element = header.querySelector(selector)
      if (element === null) throw new Error(`Missing printed CV header region ${selector}`)
      const rect = element.getBoundingClientRect()
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom }
    })
    const headerRect = header.getBoundingClientRect()
    const outside = regions.some((region) => region.left < headerRect.left || region.right > headerRect.right)
    const overlaps = regions.some((region, index) =>
      regions.slice(index + 1).some((other) =>
        region.left < other.right && region.right > other.left && region.top < other.bottom && region.bottom > other.top,
      ),
    )
    const documentWidth = document.documentElement.scrollWidth

    return { outside, overlaps, documentWidth, viewportWidth: window.innerWidth }
  })

  expect(layout.outside).toBe(false)
  expect(layout.overlaps).toBe(false)
  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
})

test('the two print sheets own the agreed role groups and keep content inside A4', async ({ page }) => {
  await page.setViewportSize({ width: 794, height: 1600 })
  await page.goto('./cv/')
  await page.emulateMedia({ media: 'print' })

  await expect(page.locator('[data-cv-page="1"] #cv-access-title')).toHaveCount(1)
  await expect(page.locator('[data-cv-page="1"] #cv-barbican-title')).toHaveCount(1)
  await expect(page.locator('[data-cv-page="1"] #cv-brand-title')).toHaveCount(1)
  await expect(page.locator('[data-cv-page="2"] #cv-brand-title')).toHaveCount(0)
  await expect(page.locator('[data-cv-page="2"] #cv-independent-title')).toHaveCount(1)
  await expect(page.locator('[data-cv-page="2"] #cv-education-title')).toHaveCount(1)
  await expect(page.locator('[data-cv-page="2"] [data-cv-section]').first()).toContainText('Independent engineering projects')

  const sheets = await page.locator('[data-cv-page]').evaluateAll((elements) => elements.map((sheet) => {
    const sheetRect = sheet.getBoundingClientRect()
    const style = getComputedStyle(sheet)
    const contentBottom = Math.max(...Array.from(sheet.children, (child) => child.getBoundingClientRect().bottom))
    const usableBottom = sheetRect.bottom - Number.parseFloat(style.paddingBottom)
    return {
      page: sheet.getAttribute('data-cv-page'),
      overflow: contentBottom > usableBottom + 1,
      height: sheetRect.height,
    }
  }))

  expect(sheets.map(({ page: sheetPage, overflow }) => ({ page: sheetPage, overflow }))).toEqual([
    { page: '1', overflow: false },
    { page: '2', overflow: false },
  ])
  for (const sheet of sheets) expect(sheet.height).toBeCloseTo(1122.5, 0)
  const documentHeight = await page.evaluate(() => document.documentElement.scrollHeight)
  expect(documentHeight).toBeLessThanOrEqual(2246)
})

test('each printed independent project shows its plain GitHub repository URL', async ({ page }) => {
  await page.setViewportSize({ width: 794, height: 1600 })
  await page.goto('./cv/')
  await page.emulateMedia({ media: 'print' })

  const repositories = [
    ['codex-marketplace', 'github.com/HarleyBartles/agent-asset-marketplace'],
    ['agentic-learning-lab', 'github.com/HarleyBartles/agentic-learning-lab'],
    ['wild-bunch', 'github.com/HarleyBartles/wild-bunch'],
    ['adventures-of-patch', 'github.com/HarleyBartles/adventures-of-patch'],
  ] as const

  for (const [slug, url] of repositories) {
    const project = page.locator(`[data-cv-project="${slug}"]`)
    const repositoryUrl = project.locator('[data-cv-project-url]')
    await expect(repositoryUrl).toHaveText(url)
    await expect(repositoryUrl).toBeVisible()
    await expect(repositoryUrl.locator('a')).toHaveCount(0)
  }
})

test('the Barbican title stays balanced without forcing an obsolete line break', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.goto('./cv/')

  const heading = page.locator('#cv-barbican-title')
  await expect(heading).toHaveAttribute('data-text-wrap', 'balanced')

  const lineWidths = await heading.evaluate((element) => {
    const range = document.createRange()
    range.selectNodeContents(element)
    return Array.from(range.getClientRects()).map((rect) => rect.width)
  })

  expect(lineWidths.length).toBeGreaterThanOrEqual(1)
  expect(lineWidths.length).toBeLessThanOrEqual(2)
  if (lineWidths.length === 2) {
    expect(Math.min(...lineWidths) / Math.max(...lineWidths)).toBeGreaterThan(0.45)
  }
})
