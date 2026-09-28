import { expect, test } from '@playwright/test'
import { expectNoHorizontalOverflow } from './support'

test('visitor explores the Learning Lab, its evidence, and its curriculum at narrow widths', async ({ page }) => {
  await page.goto('./projects/')
  await page.getByRole('link', { name: 'Agentic Learning Lab', exact: true }).click()

  await expect(page).toHaveURL(/\/projects\/agentic-learning-lab\/?$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Agentic Learning Lab' })).toBeVisible()
  await expect(page.locator('.content-status')).toContainText('Course 1 complete')
  await expect(page.getByText(/The learner is not the agent's hands/)).toBeVisible()
  await expect(page.getByRole('figure', { name: 'The Learning Lab direction and verification loop' }).locator('li strong')).toHaveText([
    'Direct', 'Agent works', 'Inspect', 'Verify', 'Question', 'Explain observable work', 'Redirect',
  ])

  for (const course of [
    'Agentic Engineering 101: Zero to Hero',
    'Advanced Agentic Engineering: Mastering Agents',
    'Beyond the Agent: Engineering Agent Systems',
  ]) await expect(page.getByRole('heading', { name: course })).toBeVisible()
  await expect(page.getByRole('link', { name: /View the public repository/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Inspect the integrity run/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Read the licence policy/ })).toBeVisible()

  const representativeLab = page.locator('.representative-lab[data-lab="7"]')
  await expect(representativeLab).toBeVisible()
  const [labBox, evidenceBox] = await Promise.all([representativeLab.boundingBox(), representativeLab.locator('dl').boundingBox()])
  expect(labBox).not.toBeNull()
  expect(evidenceBox).not.toBeNull()
  expect(evidenceBox!.x).toBeCloseTo(labBox!.x, 0)
  expect(evidenceBox!.width).toBeCloseTo(labBox!.width, 0)

  const hero = page.locator('[data-visual-contract="learning-lab-case-study-hero"] img')
  await expect(hero).toHaveAttribute('loading', 'eager')
  await expect(hero).toHaveAttribute('fetchpriority', 'high')
  const bodyImages = page.locator('.learning-lab-case-study img')
  for (const image of await bodyImages.all()) {
    await expect(image).toHaveAttribute('loading', 'lazy')
    await expect(image).toHaveAttribute('decoding', 'async')
  }

  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [1086, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    await expectNoHorizontalOverflow(page)
    await expect(page.getByText(/The learner is not the agent's hands/)).toBeVisible()
  }
  await page.addStyleTag({ content: 'img { display: none !important; }' })
  await expect(page.getByText(/The learner is not the agent's hands/)).toBeVisible()
  await expect(page.locator('.representative-lab')).toHaveCount(3)
  await expect(page.getByText(/What is the blast radius/)).toBeVisible()
})
