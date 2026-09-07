import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ProvisioningFigure } from './ProvisioningFigure'

describe('ProvisioningFigure', () => {
  test('keeps the capability progression and its accessible sequence', () => {
    render(<ProvisioningFigure />)

    const figure = screen.getByRole('figure')
    expect(figure).toHaveAccessibleDescription('A deep capability store feeds only the relevant guidance into a narrow active path for the current agent.')
    expect(screen.getByRole('heading', { level: 2, name: 'Capability store' })).toBeVisible()
    expect(screen.getByRole('heading', { level: 2, name: 'This task’s read path' })).toBeVisible()
    expect(screen.getByRole('heading', { level: 2, name: 'Current agent' })).toBeVisible()
    expect(screen.getByText('Repository law')).toBeVisible()
    expect(screen.getByText('Repository boundary')).toBeVisible()
    expect(screen.getByText('Enough context for the next useful move.')).toBeVisible()

    expect(screen.getByRole('region', { name: 'Capability store' })).toHaveAttribute('data-connects-forward', 'true')
    expect(screen.getByRole('region', { name: 'This task’s read path' })).toHaveAttribute('data-connects-forward', 'true')
    expect(screen.getByRole('region', { name: 'Current agent' })).toHaveAttribute('data-connects-forward', 'false')
  })
})
