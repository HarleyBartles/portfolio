import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { professionalProfile } from '../data/professionalProfile'
import { CareerTimeline } from './CareerTimeline'

describe('CareerTimeline', () => {
  test('keeps every career stage available in chronological source order without interaction', () => {
    const { container } = render(<CareerTimeline stages={professionalProfile.career} />)

    expect(screen.getByRole('list', { name: /career chronology/i })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(professionalProfile.career.length)
    expect(screen.getByRole('heading', { level: 2, name: 'Brand Addition' })).toBeVisible()
    expect(screen.getByRole('heading', { level: 2, name: 'The Access Group' })).toBeVisible()
    expect(screen.getByText('July 2005 – February 2019')).toBeVisible()
    expect(screen.getByText('September 2021 – present')).toBeVisible()
    expect(container.querySelector('[data-career-stage="brand-addition"]')).toBeInTheDocument()
    expect(container.querySelector('[data-career-stage="access"]')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
