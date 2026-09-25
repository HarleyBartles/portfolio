import { render, screen, within } from '@testing-library/react'
import { expect, test } from 'vitest'
import { WildBunchProof, type WildBunchEvent } from './WildBunchProof'

const eventsFixture = [
  ['EVENT 01', 'One'],
  ['EVENT 02', 'Two'],
  ['EVENT 03', 'Three'],
  ['EVENT 04', 'Four'],
  ['EVENT 05', 'Five'],
  ['EVENT 06', 'Six'],
] as const satisfies readonly WildBunchEvent[]

const stateFixture = ['Player', 'World', 'Clock', 'Journey', 'Case file', 'Pursuit'] as const

test('renders the parent-provided event and state topology in order', () => {
  const { container } = render(<WildBunchProof events={eventsFixture} stateNodes={stateFixture} />)
  const proof = container.querySelector('[data-wild-proof]') as HTMLElement
  const eventItems = [...container.querySelectorAll<HTMLElement>('[data-wild-event]')]
  const stateList = screen.getByRole('list', { name: 'Examples of current derived state' })

  expect(screen.getByRole('heading', { name: 'Immutable event history' })).toBeVisible()
  expect(screen.getByRole('heading', { name: 'Cache' })).toBeVisible()
  expect(screen.getByRole('heading', { name: 'Replay' })).toBeVisible()
  expect(screen.getByRole('heading', { name: 'State' })).toBeVisible()
  expect(eventItems).toHaveLength(6)
  expect(eventItems.map((item) => item.textContent)).toEqual(eventsFixture.map(([metadata, name]) => `${metadata}${name}`))
  expect(within(stateList).getAllByRole('listitem').map((item) => item.textContent)).toEqual(stateFixture)
  expect(proof).toHaveAttribute('data-topology', 'events-cache-state;history-replay-cache-state')
  expect(container.querySelectorAll('[data-wild-wire]')).toHaveLength(6)
  expect(container.querySelector('[data-wild-cache]')).toBeInTheDocument()
  expect(container.querySelector('[data-wild-replay]')).toBeInTheDocument()
  expect(container.querySelector('[data-wild-state]')).toBeInTheDocument()
})
