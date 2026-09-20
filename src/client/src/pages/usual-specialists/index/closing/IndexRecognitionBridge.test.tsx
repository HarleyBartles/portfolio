import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexRecognitionBridge } from './IndexRecognitionBridge'

describe('IndexRecognitionBridge', () => {
  test('renders Index\'s offscreen spoken recognition as a rectangular composition beat', () => {
    const { container } = render(<IndexRecognitionBridge style={{ opacity: 0.5 }} />)
    const bridge = container.querySelector('[data-index-closing-beat="recognition"]')

    expect(bridge).toHaveStyle({ opacity: '0.5' })
    expect(screen.getByText('“Bingo”')).toBeVisible()
    expect(bridge).toHaveTextContent('Index says')
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<IndexRecognitionBridge className="external-control" />)
    expect(container.querySelector('[data-index-closing-beat="recognition"]')).not.toHaveClass('external-control')
  })
})
