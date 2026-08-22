import { expect, test, type Request } from '@playwright/test'

function readMultipartFields(request: Request): Record<string, string> {
  const contentType = request.headers()['content-type'] ?? ''
  const boundary = /boundary=([^;]+)/.exec(contentType)?.[1]
  const postData = request.postData()

  if (boundary === undefined || postData === null) {
    throw new Error('Expected a multipart FormData request')
  }

  return Object.fromEntries(
    postData.split(`--${boundary}`).flatMap((part) => {
      const name = /name="([^"]+)"/.exec(part)?.[1]
      const value = part.split('\r\n\r\n')[1]?.replace(/\r\n$/, '')
      return name === undefined || value === undefined ? [] : [[name, value]]
    }),
  )
}

test('CV route presents the two-page hiring document and its generated PDF', async ({ page }) => {
  const response = await page.goto('./cv/')

  expect(response?.status()).toBe(200)
  await expect(page).toHaveTitle('CV | Harley Bartles')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://harleybartles.github.io/portfolio/cv',
  )
  await expect(page.getByRole('heading', { level: 1, name: 'Harley Bartles' })).toBeVisible()
  await expect(page.getByText('Senior software engineer | full-stack and agentic systems')).toBeVisible()
  await expect(page.locator('.cv-role')).toHaveText(['Software Engineer', 'Web Manager'])
  await expect(page.getByRole('heading', { level: 2, name: 'Education' })).toBeVisible()
  await expect(page.getByText('Seven GCSEs', { exact: true })).toBeVisible()
  await expect(page.getByText(/acting|shameless/i)).toHaveCount(0)

  const pageRegions = await page.locator('[data-cv-page]').evaluateAll((regions) => (
    regions.map((region) => region.getAttribute('data-cv-page'))
  ))
  expect(pageRegions).toEqual(['1', '2'])
  await expect(page.getByRole('link', { name: 'Return to About' })).toHaveAttribute('href', '/portfolio/about')
  await expect(page.getByRole('link', { name: 'Download PDF' })).toHaveAttribute('href', '/portfolio/harley-bartles-cv.pdf')

  const pdfResponse = await page.request.get('harley-bartles-cv.pdf')
  expect(pdfResponse.ok()).toBe(true)
  expect((await pdfResponse.body()).subarray(0, 4).toString()).toBe('%PDF')
})

test('configured contact submission is intercepted locally with the exact FormData payload', async ({ page }) => {
  let captured: { method: string; accept: string | undefined; fields: Record<string, string> } | undefined

  await page.route('https://forms.example.test/contact', async (route) => {
    const request = route.request()
    captured = {
      method: request.method(),
      accept: request.headers().accept,
      fields: readMultipartFields(request),
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    })
  })
  await page.goto('./about/')

  await page.getByLabel('Name').fill('Harley Bartles')
  await page.getByLabel('Reply email').fill('harley@example.test')
  await page.getByLabel('Message').fill('A carefully scoped portfolio question.')
  await page.getByRole('button', { name: 'Send message' }).click()

  await expect(page.getByRole('status')).toHaveText('Message sent. Thank you.')
  expect(captured).toEqual({
    method: 'POST',
    accept: 'application/json',
    fields: {
      _gotcha: '',
      email: 'harley@example.test',
      message: 'A carefully scoped portfolio question.',
      name: 'Harley Bartles',
    },
  })
})
