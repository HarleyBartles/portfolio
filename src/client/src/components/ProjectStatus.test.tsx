import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from './PortfolioThemeProvider'
import { ProjectStatus } from './ProjectStatus'

test('keeps the Adventures of Patch active-project tone as an explicit status decision', () => {
  render(
    <PortfolioThemeProvider>
      <ProjectStatus status="active project" />
    </PortfolioThemeProvider>,
  )

  expect(screen.getByText('active project').closest('.content-status')).toHaveAttribute('data-tone', 'active-project')
})
