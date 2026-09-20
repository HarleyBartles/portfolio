import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SilkNameLockup } from './SilkNameLockup'

describe('SilkNameLockup', () => {
  test('preserves the reusable Silk identity lockup', () => {
    const { container } = render(<SilkNameLockup />)
    const lockup = container.querySelector('[data-silk-name-lockup]')

    expect(lockup?.querySelector('[data-silk-name-mark]')).toHaveAttribute('src', expect.stringContaining('silk-wordmark.svg'))
    expect(lockup?.querySelector('[data-silk-name-strapline]')).toHaveTextContent('PRESSURE | PROVE THE ROUTE')
  })

  test('forwards an exceptional root style without exposing className', () => {
    const { container, rerender } = render(<SilkNameLockup style={{ opacity: 0.5 }} />)
    expect(container.querySelector('[data-silk-name-lockup]')).toHaveStyle({ opacity: '0.5' })

    // @ts-expect-error className is intentionally not part of the lockup API.
    rerender(<SilkNameLockup className="external-control" />)
    expect(container.querySelector('[data-silk-name-lockup]')).not.toHaveClass('external-control')
  })
})
