import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { ShareAction } from './ShareAction'
import { PortfolioThemeProvider } from './PortfolioThemeProvider'

const originalShare = navigator.share
const originalClipboard = navigator.clipboard

afterEach(() => {
  Object.defineProperty(navigator, 'share', { configurable: true, value: originalShare })
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: originalClipboard })
})

describe('ShareAction', () => {
  test('uses native sharing with the canonical URL when the browser offers it', async () => {
    const user = userEvent.setup()
    const share = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'share', { configurable: true, value: share })

    render(<PortfolioThemeProvider><ShareAction title="Why ADRs?" path="/writing/why-adrs" /></PortfolioThemeProvider>)
    await user.click(screen.getByRole('button', { name: 'Share this article' }))

    expect(share).toHaveBeenCalledWith({
      title: 'Why ADRs?',
      url: 'https://harleybartles.com/writing/why-adrs',
    })
    expect(screen.getByRole('status')).toHaveTextContent('Link shared.')
  })

  test('copies the canonical URL when native sharing is unavailable', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined })
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })

    render(<PortfolioThemeProvider><ShareAction title="Why ADRs?" path="/writing/why-adrs" /></PortfolioThemeProvider>)
    await user.click(screen.getByRole('button', { name: 'Copy article link' }))

    expect(writeText).toHaveBeenCalledWith('https://harleybartles.com/writing/why-adrs')
    expect(screen.getByRole('status')).toHaveTextContent('Link copied.')
  })
})
