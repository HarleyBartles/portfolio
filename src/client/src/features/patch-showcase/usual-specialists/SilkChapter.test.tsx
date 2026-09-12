import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SilkChapter } from './SilkChapter'

describe('Silk chapter diegetic-wall proof', () => {
  test('owns the page-plane story and reveals world beats through authored apertures', () => {
    render(<SilkChapter />)

    const chapter = screen.getByRole('region', { name: 'Silk' })
    expect(chapter).toHaveAttribute('data-specialist-chapter', 'silk')
    expect(within(chapter).getByRole('heading', { level: 2, name: 'Silk' })).toBeVisible()
    const nameMark = chapter.querySelector<HTMLImageElement>('[data-silk-name-mark]')
    expect(nameMark?.tagName).toBe('IMG')
    expect(nameMark).toHaveAttribute('src', expect.stringContaining('media/patch/the-usual-specialists/silk-wordmark.svg'))
    expect(nameMark).toHaveAttribute('alt', '')
    expect(chapter.querySelector('[data-silk-chapter-number]')).toHaveTextContent('02')

    const commission05 = chapter.querySelector<HTMLElement>('[data-silk-commission="05"]')
    const traversal = chapter.querySelector<HTMLElement>('[data-silk-commission="06"]')
    const commission07 = chapter.querySelector<HTMLElement>('[data-silk-commission="07"]')
    const receipt = chapter.querySelector<HTMLElement>('[data-silk-receipt-peekthrough]')
    const commission08 = chapter.querySelector<HTMLElement>('[data-silk-commission="08"]')
    const commission09 = chapter.querySelector<HTMLElement>('[data-silk-commission="09"]')

    expect(commission05).toBeInTheDocument()
    expect(traversal).toBeInTheDocument()
    expect(commission07).toBeInTheDocument()
    expect(receipt).toBeInTheDocument()
    expect(commission08).toBeInTheDocument()
    expect(commission09).toBeInTheDocument()

    expect(commission05).toHaveAttribute('data-silk-aperture-owner', '05')
    expect(commission05?.querySelector('[data-silk-aperture]')).toHaveAttribute('data-silk-aperture-variant', 'corridor')
    expect(commission05?.querySelector('[data-silk-aperture-crossing]')).toContainElement(traversal)
    expect(commission07).toHaveAttribute('data-silk-aperture-owner', '07')
    expect(commission07?.querySelector('[data-silk-aperture]')).toHaveAttribute('data-silk-aperture-variant', 'breach')
    expect(commission08).toHaveAttribute('data-silk-aperture-owner', '08')
    expect(commission08?.querySelector('[data-silk-aperture]')).toHaveAttribute('data-silk-aperture-variant', 'slit')

    const story = chapter.querySelector('[data-silk-story-card]')
    expect(story).toHaveTextContent('02 / Pressure test')
    expect(story).toHaveTextContent('Try to break the route')
    expect(story).toHaveTextContent('Silk sees Index’s route and launches before Patch can properly begin.')

    expect(traversal).toHaveTextContent('threshold-crossing Silk traversal')
    expect(commission05).toHaveTextContent(/corridor world behind mineral page/i)
    expect(commission07).toHaveTextContent(/service-void world behind mineral page/i)
    expect(receipt).toHaveTextContent('Receipt peek-through')
    const reactionImage = within(commission08!).getByRole('img', { name: /Silk's eyes open in restrained surprise/i })
    expect(reactionImage).toHaveAttribute('src', expect.stringContaining('media/homepage/specialists-silk.webp'))
    expect(reactionImage).toHaveAttribute('width', '1983')
    expect(reactionImage).toHaveAttribute('height', '793')
    expect(commission09).toHaveTextContent('marker-toss handoff')

    expect(commission05!.compareDocumentPosition(commission07!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
    expect(commission07!.compareDocumentPosition(commission08!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
    expect(commission08!.compareDocumentPosition(commission09!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
  })
})
