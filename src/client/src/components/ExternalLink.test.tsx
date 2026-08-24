import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ExternalLink } from './ExternalLink'

describe('ExternalLink', () => {
  test('announces and visibly marks a new browsing context', () => {
    const { container } = render(<ExternalLink href="https://example.test/evidence">Evidence</ExternalLink>)

    const link = screen.getByRole('link', { name: 'Evidence (opens in a new tab)' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    expect(container.querySelector('.external-link__icon')).toHaveAttribute('aria-hidden', 'true')
  })

  test('extends a supplied accessible label without duplicating hidden text', () => {
    const { container } = render(
      <ExternalLink href="https://example.test/evidence" aria-label="Inspect evidence">Open</ExternalLink>,
    )

    expect(screen.getByRole('link', { name: 'Inspect evidence (opens in a new tab)' })).toBeVisible()
    expect(container.querySelector('.visually-hidden')).toBeNull()
  })
})
