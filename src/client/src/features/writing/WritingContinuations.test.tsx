import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import { WritingContinuations } from './WritingContinuations'

const renderContinuations = () => render(
  <PortfolioThemeProvider>
    <MemoryRouter>
      <WritingContinuations
        items={[
          {
            slug: 'the-usual-specialists',
            contextLabel: 'Patch story',
            title: 'The Usual Specialists',
            href: '/patch/the-usual-specialists',
          },
          {
            slug: 'adventures-of-patch',
            contextLabel: 'Project story',
            title: 'Adventures of Patch',
            href: '/projects/adventures-of-patch',
          },
        ]}
      />
    </MemoryRouter>
  </PortfolioThemeProvider>,
)

test('uses a sans section heading to name a grid of whole-object destination links', () => {
  renderContinuations()

  const heading = screen.getByRole('heading', { level: 2, name: 'Continue reading' })
  const navigation = screen.getByRole('navigation', { name: 'Continue reading' })
  const patchLink = within(navigation).getByRole('link', { name: /Patch story\s*The Usual Specialists/i })
  const taxonomy = within(patchLink).getByText('Patch story')

  expect(navigation).toHaveAttribute('aria-labelledby', heading.id)
  expect(heading).toHaveStyle({
    fontFamily: 'var(--font-site-sans)',
    fontSize: 'var(--type-section-size)',
    textTransform: 'none',
  })
  expect(taxonomy).toHaveStyle({
    fontFamily: 'var(--font-site-sans)',
    fontSize: 'var(--type-metadata-size)',
    fontWeight: '600',
  })
  expect(taxonomy).not.toHaveAttribute('data-eyebrow')
  expect(patchLink).toHaveAttribute('href', '/patch/the-usual-specialists')
  expect(patchLink).toContainElement(taxonomy)
  expect(patchLink).toContainElement(within(patchLink).getByText('The Usual Specialists'))
})

test('keeps continuation choices in source order for keyboard navigation', async () => {
  const user = userEvent.setup()
  renderContinuations()

  const links = screen.getAllByRole('link')
  await user.tab()
  expect(links[0]).toHaveFocus()
  await user.tab()
  expect(links[1]).toHaveFocus()
})
