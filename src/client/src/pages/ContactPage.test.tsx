import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { ContactPage } from './ContactPage'
import { PortfolioThemeProvider } from '../components'

test('presents Contact as a canonical site-sans route with the privacy-preserving form', () => {
  render(
    <PortfolioThemeProvider>
      <MemoryRouter initialEntries={['/contact']}>
        <ContactPage />
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  expect(screen.getByRole('heading', { level: 1, name: 'Get in touch.' })).toHaveAttribute('data-text-wrap', 'single-line')
  expect(screen.getByLabelText('Name')).toBeRequired()
  expect(screen.queryByText(/mailto:|tel:/i)).not.toBeInTheDocument()
  expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://harleybartles.com/contact')
})
