import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import { IdentityEmporiumPage } from './IdentityEmporiumPage'

describe('Identity Emporium', () => {
  test('owns a stable composition contract and preserves the three preparation approaches', () => {
    render(<PortfolioThemeProvider><MemoryRouter><IdentityEmporiumPage /></MemoryRouter></PortfolioThemeProvider>)
    const story = screen.getByTestId('identity-emporium-story')
    expect(story).toHaveAttribute('data-visual-contract', 'patch-identity-emporium')
    const evidence = within(story).getByRole('figure', { name: /compares three approaches/i })
    expect(within(evidence).getByText('Preparation mistaken for a script')).toBeVisible()
    expect(within(evidence).getByText('Straight to work, underprepared')).toBeVisible()
    expect(within(evidence).getByText('Preparation shaped by the task')).toBeVisible()
    expect(within(evidence).getByRole('list', { name: 'Patch role kits' })).toBeVisible()
  })
})
