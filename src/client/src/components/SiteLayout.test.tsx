import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { ErrorPage } from '../pages/ErrorPage'
import { LoadingPage } from '../pages/LoadingPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { SiteLayout } from './SiteLayout'

describe('SiteLayout', () => {
  test('renders semantic page landmarks with understandable navigation', async () => {
    const user = userEvent.setup()

    render(
      <SiteLayout>
        <h1>Portfolio content</h1>
      </SiteLayout>,
    )

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent('Portfolio content')
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()

    const navigation = screen.getByRole('navigation', { name: /primary/i })
    const navLinks = within(navigation).getAllByRole('link')
    expect(navLinks.map((link) => link.textContent)).toEqual([
      'Projects',
      'Experience',
      'Engineering Practice',
      'AI Engineering',
      'Writing and Notes',
    ])

    await user.tab()
    expect(navLinks[0]).toHaveFocus()
    await user.tab()
    expect(navLinks[1]).toHaveFocus()
  })

  test('renders direct loading, error, and not-found surfaces', () => {
    render(
      <>
        <LoadingPage />
        <ErrorPage />
        <NotFoundPage />
      </>,
    )

    expect(screen.getByRole('status')).toHaveTextContent(/loading portfolio navigation/i)
    expect(screen.getByRole('alert')).toHaveTextContent(/could not load the portfolio content/i)
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /return to the homepage/i })).toHaveAttribute('href', '/')
  })
})
