import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SilkReactionFrameComposition } from './SilkReactionFrameComposition'

const readStylesSource = (): string => readFileSync(
  resolve('src/features/patch-showcase/usual-specialists/SilkReactionFrameComposition.styles.ts'),
  'utf8',
)

describe('SilkReactionFrameComposition', () => {
  test('keeps the accepted reaction media and root-only style seam', () => {
    const { container } = render(<SilkReactionFrameComposition style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-silk-reaction-frame-composition]')
    const reaction = screen.getByRole('img', { name: /Silk's eyes open in restrained surprise/i })
    const frame = container.querySelector<HTMLImageElement>('[data-silk-commission-08-review-frame]')

    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(reaction).toHaveAttribute('src', expect.stringContaining('media/homepage/specialists-silk.webp'))
    expect(reaction).toHaveAttribute('width', '1983')
    expect(reaction).toHaveAttribute('height', '793')
    expect(frame).toHaveAttribute('src', expect.stringContaining('silk-commission-08-reaction-frame-review.webp'))
    expect(frame).toHaveAttribute('width', '1750')
    expect(frame).toHaveAttribute('height', '600')
    expect(frame).toHaveAttribute('alt', '')
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<SilkReactionFrameComposition className="external-control" />)
    expect(container.querySelector('[data-silk-reaction-frame-composition]')).not.toHaveClass('external-control')
  })

  test('uses the visible eyes viewport as its semantic external box', () => {
    const stylesSource = readStylesSource()
    const viewportCss = stylesSource.match(/export const ReactionViewport = styled\.div`([\s\S]*?)`/)?.[1] ?? ''
    const { container } = render(<SilkReactionFrameComposition />)
    const root = container.querySelector<HTMLElement>('[data-silk-reaction-frame-composition]')

    expect(getComputedStyle(root!).aspectRatio).toBe('1914/232')
    expect(viewportCss).toContain('inset: 0;')
    expect(viewportCss).not.toContain('SILK_COMMISSION_08_REVIEW_VIEWPORT_INSETS')
  })
})
