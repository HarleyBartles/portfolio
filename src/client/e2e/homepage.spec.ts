import { expect, test, type Page } from '@playwright/test'

const apiBaseUrl = 'http://127.0.0.1:5278'

async function useLocalContentApi(page: Page): Promise<void> {
  await page.route('**/api/content/**', async (route) => {
    const requestedUrl = new URL(route.request().url())
    await route.continue({
      url: `${apiBaseUrl}${requestedUrl.pathname}${requestedUrl.search}`,
    })
  })
}

test.beforeEach(async ({ page }) => {
  await useLocalContentApi(page)
})

test('visitor loads the homepage and sees the exact identity statement', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Harley Bartles | Full Stack Software Engineer')
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Harley Bartles: Full Stack Software Engineer',
    }),
  ).toBeVisible()
  await expect(
    page.getByText(
      'AI-forward. Stack-agnostic. Experienced across languages, frameworks, and full-stack systems.',
      { exact: true },
    ),
  ).toBeVisible()
})

test('visitor navigates from the orientation strip to Wild Bunch', async ({ page }) => {
  await page.goto('/')

  const orientation = page.getByRole('navigation', { name: 'Portfolio orientation' })
  await expect(orientation.getByRole('link', { name: 'Projects' })).toBeVisible()
  await orientation.getByRole('link', { name: 'Projects' }).click()

  await expect(page).toHaveURL('/projects')
  await expect(page.getByRole('heading', { level: 1, name: 'Project Stories' })).toBeVisible()
  await page.getByRole('link', { name: 'Wild Bunch' }).click()

  await expect(page).toHaveURL('/projects/wild-bunch')
  await expect(page.getByRole('heading', { level: 1, name: 'Wild Bunch' })).toBeVisible()
  await expect(page.getByText(/Status\s*pre-alpha/)).toBeVisible()
})
