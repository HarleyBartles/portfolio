import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SilkCommission09Composition } from './SilkCommission09Composition'

const readStylesSource = (): string => readFileSync(
  resolve('src/features/patch-showcase/usual-specialists/SilkCommission09Composition.styles.ts'),
  'utf8',
)

describe('SilkCommission09Composition', () => {
  test('locks a striped parallax world behind the candidate knock-through frame', () => {
    const { container } = render(<SilkCommission09Composition style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-silk-commission-09-composition]')
    const viewport = root?.querySelector('[data-silk-commission-09-viewport]')
    const world = root?.querySelector('[data-silk-commission-09-standin-world]')
    const frame = root?.querySelector<HTMLImageElement>('[data-silk-commission-09-frame-review]')
    const portraitSource = root?.querySelector<HTMLSourceElement>('[data-silk-commission-09-frame-review-portrait-source]')

    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(viewport).toBeInTheDocument()
    expect(world).toBeInTheDocument()
    expect(viewport?.contains(world ?? null)).toBe(true)
    expect(frame).toHaveAttribute('src', expect.stringContaining('silk-commission-09-knockthrough-frame-review.webp'))
    expect(frame).toHaveAttribute('width', '1672')
    expect(frame).toHaveAttribute('height', '941')
    expect(frame).toHaveAttribute('alt', '')
    expect(portraitSource).toHaveAttribute('media', '(max-width: 389px)')
    expect(portraitSource).toHaveAttribute('srcset', expect.stringContaining('silk-commission-09-knockthrough-frame-review-portrait.webp'))
    expect(portraitSource).toHaveAttribute('width', '941')
    expect(portraitSource).toHaveAttribute('height', '1672')
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<SilkCommission09Composition className="external-control" />)
    expect(container.querySelector('[data-silk-commission-09-composition]')).not.toHaveClass('external-control')
  })

  test('keeps external bleed out of the child while retaining its portrait frame threshold', () => {
    const stylesSource = readStylesSource()
    const compositionCss = stylesSource.match(/export const Composition = styled\.div`([\s\S]*?)`/)?.[1] ?? ''

    expect(compositionCss).not.toContain('width: 116%;')
    expect(compositionCss).not.toContain('margin-left: -8%;')
    expect(compositionCss).not.toContain('width: 104.2%;')
    expect(compositionCss).not.toContain('margin-left: -2.1%;')
    expect(stylesSource).not.toContain("from './specialistsResponsive'")
    expect(stylesSource).toContain('(max-width: 389px)')
  })
})
