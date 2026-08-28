import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'
import { FeatureDeck, type FeatureItem } from './FeatureDeck'

const items: FeatureItem[] = [
  {
    id: 'marketplace',
    eyebrow: 'Project system',
    title: 'Agent Asset Marketplace',
    summary: 'A public distribution system for durable agent assets.',
    to: '/projects/codex-marketplace',
    visual: 'codex-marketplace',
  },
  {
    id: 'patch',
    eyebrow: 'Visual pipeline',
    title: 'Patch can be anything',
    summary: 'Role kits turn one character into an adventure cast.',
    to: '/projects/adventures-of-patch',
    visual: 'adventures-of-patch',
  },
  {
    id: 'writing',
    eyebrow: 'Field note',
    title: 'Context is not state',
    summary: 'Conversation helps. Durable truth still needs a home.',
    to: '/writing/i-made-agentic-engineering-harder-than-it-needed-to-be',
    visual: 'i-made-agentic-engineering-harder-than-it-needed-to-be',
  },
  {
    id: 'wild-bunch',
    eyebrow: 'Project story',
    title: 'Wild Bunch',
    summary: 'A game-shaped place for architecture to earn its keep.',
    to: '/projects/wild-bunch',
    visual: 'wild-bunch',
  },
]

function renderDeck(random: () => number = () => 0): void {
  render(
    <MemoryRouter>
      <FeatureDeck items={items} initialOrder={items} random={random} />
    </MemoryRouter>,
  )
}

describe('FeatureDeck', () => {
  test('shows one lead and two visible supporting stories with labelled controls', () => {
    renderDeck()

    expect(screen.getByRole('heading', { level: 2, name: 'Agent Asset Marketplace' })).toBeVisible()
    expect(screen.getByRole('heading', { level: 3, name: 'Patch can be anything' })).toBeVisible()
    expect(screen.getByRole('heading', { level: 3, name: 'Context is not state' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Previous feature' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Shuffle features' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Next feature' })).toBeVisible()
  })

  test('changes hierarchy only after a visitor action and announces the new lead', async () => {
    vi.useFakeTimers()
    renderDeck()

    act(() => vi.advanceTimersByTime(20_000))
    expect(screen.getByRole('heading', { level: 2, name: 'Agent Asset Marketplace' })).toBeVisible()
    vi.useRealTimers()

    await userEvent.click(screen.getByRole('button', { name: 'Next feature' }))
    expect(screen.getByRole('heading', { level: 2, name: 'Patch can be anything' })).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent('Now featuring Patch can be anything')
  })

  test('shuffle uses the supplied randomness without dropping stories', async () => {
    const values = [0.1, 0.8, 0.3]
    let index = 0
    renderDeck(() => values[index++] ?? 0)

    await userEvent.click(screen.getByRole('button', { name: 'Shuffle features' }))

    expect(screen.getByRole('heading', { level: 2, name: 'Patch can be anything' })).toBeVisible()
    expect(screen.getAllByRole('heading')).toHaveLength(3)
  })
})
