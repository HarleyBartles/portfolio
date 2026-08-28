import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ContextComplexityFigure } from './ContextComplexityFigure'

describe('ContextComplexityFigure', () => {
  test('names the factual hierarchy without turning the figure into a roll call', () => {
    render(<ContextComplexityFigure />)

    expect(screen.getByRole('figure', { name: /Will made Harley’s intent concrete/i })).toBeInTheDocument()
    expect(screen.getByText('Will')).toBeVisible()
    expect(screen.getByText('Chris')).toBeVisible()
    expect(screen.getByText('Albert')).toBeVisible()
    expect(screen.getByText('Brian')).toBeVisible()
    expect(screen.getByText('Derek')).toBeVisible()
    expect(screen.getByText('Patch')).toBeVisible()
    expect(screen.getByText('Project Director')).toBeVisible()
    expect(screen.getByText('Research')).toBeVisible()
    expect(screen.getByText('World-building')).toBeVisible()
    expect(screen.getByText('Writing')).toBeVisible()
    expect(screen.getByText('Adventures of Patch')).toBeVisible()
  })
})
