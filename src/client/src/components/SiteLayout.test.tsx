import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { ErrorPage } from '../pages/ErrorPage'
import { LoadingPage } from '../pages/LoadingPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { SiteLayout } from './SiteLayout'

describe('SiteLayout', () => {
  test('renders semantic page landmarks with understandable navigation', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <SiteLayout>
          <h1>Portfolio content</h1>
        </SiteLayout>
      </MemoryRouter>,
    )

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
    expect(screen.getByRole('main')).toHaveTextContent('Portfolio content')
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()

    const skipLink = screen.getByRole('link', { name: 'Skip to content' })
    expect(skipLink).toHaveAttribute('href', '#main-content')
    const siteMark = screen.getByRole('link', { name: 'Harley Bartles, home' })
    const markImage = siteMark.querySelector('img')
    expect(markImage).toHaveAttribute('src', '/brand/hb-mark.svg')
    expect(markImage).toHaveAttribute('alt', '')

    const navigation = screen.getByRole('navigation', { name: /primary/i })
    const navLinks = within(navigation).getAllByRole('link')
    expect(navLinks.map((link) => link.textContent)).toEqual(['Projects', 'Writing', 'Patch', 'About', 'CV'])
    expect(navLinks[2]).toHaveAttribute('href', '/patch')

    await user.tab()
    expect(skipLink).toHaveFocus()
    await user.tab()
    expect(siteMark).toHaveFocus()
    await user.tab()
    expect(navLinks[0]).toHaveFocus()
    await user.tab()
    expect(navLinks[1]).toHaveFocus()
  })

  test('renders direct loading, error, and not-found surfaces', () => {
    render(
      <MemoryRouter>
        <LoadingPage />
        <ErrorPage />
        <NotFoundPage />
      </MemoryRouter>,
    )

    const loadingStatus = screen.getByRole('status')
    expect(loadingStatus).toHaveTextContent(/loading portfolio navigation/i)
    expect(loadingStatus.closest('section')).toHaveAttribute('data-route-loading')
    expect(screen.getByRole('alert')).toHaveTextContent(/could not load the portfolio content/i)
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /return to the homepage/i })).toHaveAttribute('href', '/')
  })
})
