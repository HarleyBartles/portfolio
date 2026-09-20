import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { UnderConstructionNotice } from './UnderConstructionNotice'

describe('UnderConstructionNotice', () => {
  test('pairs the custodied Patch lockup with page-owned sign copy', () => {
    render(<UnderConstructionNotice />)

    const notice = screen.getByRole('region', { name: 'Under construction' })
    const lockup = within(notice).getByRole('img', {
      name: 'Patch in a yellow hard hat stands beside a construction sign, traffic cone and hazard tape.',
    })

    expect(lockup).toHaveAttribute(
      'src',
      expect.stringContaining('/media/patch/the-usual-specialists/under-construction-patch-lockup.webp'),
    )
    expect(within(notice).getByRole('heading', { level: 2, name: 'UNDER CONSTRUCTION' })).toBeVisible()
    expect(within(notice).getByText('Check back soon.')).toBeVisible()
  })
})
