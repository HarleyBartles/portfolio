import { expect, test } from '@playwright/test'

test('visitor reads a project story and follows a related-content link', async ({ page }) => {
  await page.goto('/projects/wild-bunch')

  await expect(page.getByRole('heading', { level: 1, name: 'Wild Bunch' })).toBeVisible()
  await expect(
    page.getByText(
      'Wild Bunch is an active, buggy, pre-alpha project. It is a place to make real architecture decisions under real pressure rather than present a polished demo as if it were finished.',
      { exact: true },
    ),
  ).toBeVisible()

  const repositoryLink = page.getByRole('link', { name: 'Public repository' })
  await expect(repositoryLink).toHaveAttribute('href', 'https://github.com/HarleyBartles/wild-bunch')

  const relatedContent = page.getByRole('navigation', { name: 'Related content' })
  await expect(relatedContent).toBeVisible()
  await relatedContent.getByRole('link', { name: 'Engineering Practice' }).click()

  await expect(page).toHaveURL('/engineering-practice')
  await expect(page.getByRole('heading', { level: 1, name: 'Engineering Practice' })).toBeVisible()
  await expect(page.getByText(/requirements and constraints/i)).toBeVisible()
})

test('visitor receives a useful page state when a content slug is missing', async ({ page }) => {
  await page.goto('/projects/missing-story')

  await expect(page).toHaveTitle('Page Not Found | Harley Bartles')
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible()
  await expect(page.getByText('This portfolio story is not available.', { exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Return to the homepage' })).toHaveAttribute('href', '/')
})
