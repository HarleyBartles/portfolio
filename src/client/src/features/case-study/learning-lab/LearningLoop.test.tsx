import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { LearningLoop } from './LearningLoop'

describe('LearningLoop', () => {
  test('shows the ordered human and agent learning loop without self-approval language', () => {
    const { container } = render(<LearningLoop />)
    const items = screen.getAllByRole('listitem')
    expect(items.map((item) => item.textContent)).toEqual([
      expect.stringContaining('Direct'),
      expect.stringContaining('Agent works'),
      expect.stringContaining('Inspect'),
      expect.stringContaining('Verify'),
      expect.stringContaining('Question'),
      expect.stringContaining('Explain observable work'),
      expect.stringContaining('Redirect'),
    ])
    expect(container.querySelectorAll('.learning-loop__stage--human')).toHaveLength(6)
    expect(container.querySelectorAll('.learning-loop__stage--agent')).toHaveLength(1)
    expect(screen.getAllByText('Human owned')).toHaveLength(6)
    expect(screen.getByText('Agent performed')).toBeVisible()
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(7)
    expect(container).not.toHaveTextContent(/self-approv|explanation is proof|accept/i)
  })
})
