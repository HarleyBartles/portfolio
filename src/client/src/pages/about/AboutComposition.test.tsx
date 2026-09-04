import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import { AboutPage } from '../AboutPage'

test('keeps About as the professional assessment surface without rendering Contact', () => {
  render(<PortfolioThemeProvider><MemoryRouter><AboutPage /></MemoryRouter></PortfolioThemeProvider>)

  expect(screen.getByRole('heading', { level: 1, name: /I still like writing code/ })).toBeVisible()
  expect(screen.getByRole('heading', { name: 'Access Checks, end to end.' })).toBeVisible()
  expect(screen.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '/contact')
  expect(screen.queryByRole('heading', { name: 'Get in touch.' })).not.toBeInTheDocument()
  expect(screen.getByText('No source capture, no success.').closest('blockquote')).toHaveAttribute('data-type-register', 'site-sans')
})
