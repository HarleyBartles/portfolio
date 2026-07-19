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

test('visitor navigates to Writing and opens a note', async ({ page }) => {
  await page.goto('/')

  const orientation = page.getByRole('navigation', { name: 'Portfolio orientation' })
  await orientation.getByRole('link', { name: 'Writing and Notes' }).click()

  await expect(page).toHaveURL('/writing')
  await expect(page.getByRole('heading', { level: 1, name: 'Writing and Notes' })).toBeVisible()
  await page.getByRole('link', { name: 'Agent-Ready Repositories' }).click()

  await expect(page).toHaveURL('/writing/agent-ready-repositories')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Agent-Ready Repositories' }),
  ).toBeVisible()
  await expect(
    page.getByText(
      'Agent-ready repositories are not repositories with enormous prompts pasted everywhere. They are repositories with progressive discovery: start from a small always-on router, then lead workers to the exact local guidance, policy, tests, and scripts that matter for the current task.',
      { exact: true },
    ),
  ).toBeVisible()
})
