import { render, screen } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { createPortfolioQueryClient } from '../app/queryClient'
import { PortfolioThemeProvider } from '../components'
import { PatchIndexPage } from './PatchIndexPage'

test('brands the Patch index as the series front door', async () => {
  render(<QueryClientProvider client={createPortfolioQueryClient()}><PortfolioThemeProvider><MemoryRouter><PatchIndexPage /></MemoryRouter></PortfolioThemeProvider></QueryClientProvider>)
  expect(await screen.findByRole('heading', { level: 1, name: 'Adventures of Patch' })).toBeVisible()
  expect(screen.getByTestId('patch-index')).toHaveAttribute('data-visual-contract', 'patch-index')
  expect(screen.getByRole('img', { name: 'Adventures of PATCH' })).toBeVisible()
  expect(await screen.findByRole('link', { name: 'The Usual Specialists' })).toHaveAttribute('href', '/patch/the-usual-specialists')
})
