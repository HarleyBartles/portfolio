import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from './PortfolioThemeProvider'
import { ProjectStatus } from './ProjectStatus'

test('applies the active project treatment only when the owning composition requests it', () => {
  render(
    <PortfolioThemeProvider>
      <ProjectStatus status="active project" tone="active-project" />
    </PortfolioThemeProvider>,
  )

  expect(screen.getByText('active project').closest('.content-status')).toHaveAttribute('data-tone', 'active-project')
})

test('does not infer the one-off active project treatment from copy', () => {
  render(
    <PortfolioThemeProvider>
      <ProjectStatus status="active project" />
    </PortfolioThemeProvider>,
  )

  expect(screen.getByText('active project').closest('.content-status')).toHaveAttribute('data-tone', 'default')
})
