import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SilkReceiptPeekthroughComposition } from './SilkReceiptPeekthroughComposition'

const readStylesSource = (): string => readFileSync(
  resolve('src/features/patch-showcase/usual-specialists/SilkReceiptPeekthroughComposition.styles.ts'),
  'utf8',
)

describe('SilkReceiptPeekthroughComposition', () => {
  test('owns the accepted Receipt plane and Silk peek cutout behind a root-only style seam', () => {
    const { container } = render(<SilkReceiptPeekthroughComposition style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-silk-receipt-peekthrough-composition]')
    const frameCanvas = root?.querySelector('[data-silk-receipt-frame-canvas]')
    const peekLayer = root?.querySelector('[data-silk-receipt-peek-cutout-layer]')
    const world = root?.querySelector<HTMLImageElement>('[data-silk-receipt-world-image]')
    const frame = root?.querySelector<HTMLImageElement>('[data-silk-receipt-frame-review]')
    const cutout = root?.querySelector<HTMLImageElement>('[data-silk-receipt-peek-cutout]')

    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(frameCanvas).toContainElement(world ?? null)
    expect(frameCanvas).toContainElement(frame ?? null)
    expect(peekLayer).toContainElement(cutout ?? null)
    expect(world).toHaveAttribute('src', expect.stringContaining('silk-receipt-alcove-world-review.webp'))
    expect(frame).toHaveAttribute('src', expect.stringContaining('silk-receipt-peekthrough-frame-review.webp'))
    expect(cutout).toHaveAttribute('src', expect.stringContaining('silk-receipt-hole-peek-cutout-review.webp'))
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<SilkReceiptPeekthroughComposition className="external-control" />)
    expect(container.querySelector('[data-silk-receipt-peekthrough-composition]')).not.toHaveClass('external-control')
  })

  test('does not rely on visible overflow to expose the authored lockup', () => {
    const stylesSource = readStylesSource()
    const compositionCss = stylesSource.match(/export const Composition = styled\.div`([\s\S]*?)`/)?.[1] ?? ''

    expect(compositionCss).not.toContain('overflow: visible;')
  })
})
