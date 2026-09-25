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
  test.each(['AbortError', 'NotAllowedError'])('handles native sharing rejection: %s', async (name) => {
    const user = userEvent.setup()
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: vi.fn().mockRejectedValue(new DOMException('Sharing rejected', name)),
    })
    render(<PortfolioThemeProvider><ShareAction title="Why ADRs?" path="/writing/why-adrs" /></PortfolioThemeProvider>)
    await user.click(screen.getByRole('button', { name: 'Share this article' }))

    if (name === 'AbortError') {
      expect(screen.getByRole('status')).toHaveTextContent('Sharing cancelled.')
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    } else {
      expect(screen.getByRole('status')).toHaveTextContent('Copy this link.')
      expect(screen.getByRole('link')).toHaveAttribute('href', 'https://harleybartles.com/writing/why-adrs')
    }
  })

  test.each(['missing', 'denied'])('reveals a manual-copy link when clipboard access is %s', async (mode) => {
    const user = userEvent.setup()
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined })
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: mode === 'missing' ? undefined : { writeText: vi.fn().mockRejectedValue(new Error('Denied')) },
    })
    render(<PortfolioThemeProvider><ShareAction title="Why ADRs?" path="/writing/why-adrs" /></PortfolioThemeProvider>)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Copy article link' }))

    expect(screen.getByRole('link', { name: 'https://harleybartles.com/writing/why-adrs' })).toHaveAttribute('href', 'https://harleybartles.com/writing/why-adrs')
    expect(screen.getByRole('status')).toHaveTextContent('Copy this link.')
  })

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
