import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { WildBunchCaseStudy } from './WildBunchCaseStudy'

function renderCaseStudy() {
  return render(
    <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/projects/wild-bunch']}>
      <WildBunchCaseStudy />
    </MemoryRouter>,
  )
}

function follows(first: HTMLElement, second: HTMLElement) {
  return Boolean(first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING)
}

describe('WildBunchCaseStudy', () => {
  test('declares an evidence-led composition whose essential relationships remain semantic', () => {
    renderCaseStudy()

    const caseStudy = screen.getByRole('region', { name: 'Wild Bunch case study' })
    const determinism = screen.getByRole('figure', { name: 'Controlled determinism from a compact world contract' })
    const eventFlow = screen.getByRole('figure', { name: 'Ordered event history from action to reconstruction' })
    const movements = caseStudy.querySelectorAll('.wild-bunch-story-movement')
    const sourceNote = caseStudy.querySelectorAll('.wild-bunch-source-note')

    expect(caseStudy).toHaveClass('wild-bunch-case-study--composed')
    expect(caseStudy).toHaveAttribute('data-visual-contract', 'wild-bunch-evidence-ledger')
    expect(caseStudy).not.toHaveTextContent('—')
    expect(movements).toHaveLength(5)
    expect(Array.from(movements).map((movement) => movement.getAttribute('data-story-movement'))).toEqual([
      'origin',
      'determinism',
      'event-history',
      'knowledge-boundary',
      'trade-off',
    ])
    expect(sourceNote).toHaveLength(1)
    expect(sourceNote[0]).toHaveAttribute('data-story-close', 'source-note')
    expect(determinism).toHaveAttribute('data-relationship', 'ordered-semantic-stages')
    expect(eventFlow).toHaveAttribute('data-relationship', 'ordered-semantic-stages')
    expect(determinism.querySelectorAll('[class*="connector"]')).toHaveLength(0)
    expect(eventFlow.querySelectorAll('[class*="connector"]')).toHaveLength(0)
  })

  test('tells a five-movement architecture story in reading order without a defensive opening', () => {
    renderCaseStudy()

    expect(screen.queryByText('Every complexity pays rent.')).not.toBeInTheDocument()
    expect(screen.getByText(/wrong name on the crime: yours/i)).toBeVisible()
    expect(screen.queryByRole('region', { name: 'Development-build position' })).not.toBeInTheDocument()
    expect(screen.getByText(/Firebird Software published the original.*1984/i)).toBeVisible()
    expect(screen.getByText(/Amstrad CPC 464/i)).toBeVisible()
    expect(screen.getByText(/Locomotive BASIC/i)).toBeVisible()

    expect(screen.getByRole('link', { name: 'Historical Wild Bunch archive (opens in a new tab)' })).toHaveAttribute('href', 'https://worldofspectrum.org/archive/software/games/the-wild-bunch-firebird-software-ltd')
    expect(screen.getByRole('link', { name: 'Pinned resolver evidence (opens in a new tab)' })).toHaveAttribute(
      'href',
      'https://github.com/HarleyBartles/wild-bunch/blob/2a9814d094148bb789766a27d316095fecce5a60/src/WildBunch.GameContent/NewGame/SeedWorldResolver.cs',
    )

    const origin = screen.getByRole('heading', { level: 2, name: 'The game I wanted to return to' })
    const determinism = screen.getByRole('heading', { level: 2, name: 'Making chance reproducible' })
    const events = screen.getByRole('heading', { level: 2, name: 'A playthrough worth keeping' })
    const knowledge = screen.getByRole('heading', { level: 2, name: "The player and the developer shouldn't see the same game" })
    const choice = screen.getByRole('heading', { level: 2, name: 'Choosing the complicated version' })
    const future = screen.getByRole('heading', { level: 2, name: 'Where the trail leads next' })
    const sourceNote = screen.getByRole('heading', { level: 2, name: 'Inspect it. Run it.' })

    expect(follows(origin, determinism)).toBe(true)
    expect(follows(determinism, events)).toBe(true)
    expect(follows(events, knowledge)).toBe(true)
    expect(follows(knowledge, choice)).toBe(true)
    expect(follows(choice, future)).toBe(true)
    expect(follows(future, sourceNote)).toBe(true)
    expect(screen.getAllByText(/current playable build/i)).toHaveLength(1)
    expect(screen.queryByRole('heading', { level: 2, name: 'Built, in motion, beyond pre-alpha' })).not.toBeInTheDocument()
  })

  test('keeps the technical and authorship claims inspectable rather than promotional', () => {
    renderCaseStudy()

    const dossier = screen.getByRole('complementary', { name: 'Text-first technical dossier' })
    expect(within(dossier as HTMLElement).getByText('Architecture')).toBeVisible()
    expect(within(dossier as HTMLElement).getByText(/DDD around GameSession; CQRS command\/query separation/i)).toBeVisible()
    expect(within(dossier as HTMLElement).getByText('Persistence')).toBeVisible()
    expect(within(dossier as HTMLElement).getByText(/command repository loads and stages the GameSession aggregate/i)).toBeVisible()
    expect(within(dossier as HTMLElement).getByText('Evidence')).toBeVisible()
    expect(within(dossier as HTMLElement).getByText(/xUnit unit and ASP.NET integration suites; Vitest with React Testing Library/i)).toBeVisible()

    expect(screen.getByText(/CQRS separates commands that may change the session from queries over its projections/i)).toBeVisible()
    expect(screen.queryByText(/CQRS-style/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/aggregate-scoped repositories/i)).not.toBeInTheDocument()
    expect(screen.getByText(/React Testing Library/i)).toBeVisible()
    expect(screen.getAllByText(/repository.*GameSession aggregate/i)[0]).toBeVisible()
    expect(screen.getAllByText(/Unit of Work.*commit/i)[0]).toBeVisible()

    expect(screen.getByText(/Agents wrote much of Wild Bunch's code under constraints I set/i)).toBeVisible()
    expect(screen.getByText(/I directed the work, reviewed the result and required evidence/i)).toBeVisible()
    expect(screen.getByRole('link', { name: 'How I separate agentic engineering from vibe coding' })).toHaveAttribute('href', '/portfolio/writing/agentic-engineering-vs-vibe-coding')
    expect(screen.getByText(/GameSession decides whether it's legal and emits a typed fact/i)).toBeVisible()
    expect(screen.getByText(/Onion dependency direction keeps the domain rules independent of HTTP, EF\/PostgreSQL and Phaser/i)).toBeVisible()
  })

  test('links detailed public claims to their pinned evidence snapshot', () => {
    renderCaseStudy()

    expect(screen.getByRole('link', { name: 'Pinned graph-generation evidence (opens in a new tab)' })).toHaveAttribute(
      'href',
      'https://github.com/HarleyBartles/wild-bunch/blob/2a9814d094148bb789766a27d316095fecce5a60/tests/WildBunch.GameContent.Tests/TrailGraphGeneratorTests.cs',
    )
    expect(screen.getByRole('link', { name: 'Pinned persisted-world evidence (opens in a new tab)' })).toHaveAttribute(
      'href',
      'https://github.com/HarleyBartles/wild-bunch/blob/2a9814d094148bb789766a27d316095fecce5a60/src/WildBunch.Domain/World/WorldSnapshot.cs',
    )
    expect(screen.getByRole('link', { name: 'Pinned developer-tooling evidence (opens in a new tab)' })).toHaveAttribute(
      'href',
      'https://github.com/HarleyBartles/wild-bunch/blob/2a9814d094148bb789766a27d316095fecce5a60/src/WildBunch.Web/src/dev/DevOverlay.tsx',
    )
    expect(screen.getByRole('link', { name: 'Wild Bunch source snapshot (pinned revision) (opens in a new tab)' })).toHaveAttribute(
      'href',
      'https://github.com/HarleyBartles/wild-bunch/tree/2a9814d094148bb789766a27d316095fecce5a60',
    )
  })

  test('keeps the simpler-build trade-off in the final movement instead of repeating it as cards', () => {
    renderCaseStudy()

    expect(screen.queryByRole('list', { name: 'Selected supporting patterns' })).not.toBeInTheDocument()
    expect(document.querySelector('.wild-bunch-decisions')).toBeNull()
    expect(document.querySelector('.wild-bunch-capability-ledger')).toBeNull()
    expect(screen.getByText(/React and Phaser stay at the rendering and input boundary/i)).toBeVisible()
    expect(screen.getByText(/typed client stays handwritten/i)).toBeVisible()
    expect(screen.getByText(/if a layer stops earning its keep, I should remove it/i)).toBeVisible()
  })

  test('separates player-safe knowledge without publishing private diagnostic truth', () => {
    renderCaseStudy()

    expect(screen.getByText(/player should see only the clues, warrants and suspect information they've earned/i)).toBeVisible()
    expect(screen.queryByText(/trueCulpritId/i)).not.toBeInTheDocument()

    expect(screen.getByRole('link', { name: 'Wild Bunch source snapshot (pinned revision) (opens in a new tab)' })).toBeVisible()
  })

  test('states the source-backed map, replay, entropy, and development-access limits', () => {
    renderCaseStudy()

    expect(screen.getByText(/starts with Delaunay candidates, takes a minimum spanning tree/i)).toBeVisible()
    expect(screen.getByText(/same seed.*difficulty.*entropy policy.*ordered choices/i)).toBeVisible()
    expect(screen.getByText(/Full-stream equality tests rebuild a session from its events/i)).toBeVisible()
    expect(screen.getByText(/fix a salt source or prepare a one-use next action/i)).toBeVisible()
  })

  test('connects determinism, replay, and containment to their architectural payoffs', () => {
    renderCaseStudy()

    expect(screen.getByText(/uses 33 of them and deliberately reserves 95/i)).toBeVisible()
    expect(screen.getByText(/Dustwell, shown above, is one generated town in this seed's map-world/i)).toBeVisible()
    expect(screen.getByText(/Every town comes from the world contract/i)).toBeVisible()
    expect(screen.getByText(/When the player leaves and returns, it's the same place/i)).toBeVisible()
    expect(screen.getByText(/which actions brought them there, which version of the rules accepted each action/i)).toBeVisible()
    expect(screen.getAllByText(/command repository loads and stages (?:the )?(?:GameSession )?aggregate/i)).toHaveLength(2)
    expect(screen.getByText(/read model itself has to respect the knowledge boundary/i)).toBeVisible()
    expect(screen.getByText(/React and Phaser stay at the rendering and input boundary/i)).toBeVisible()
    expect(screen.getByText(/I use these patterns professionally in enterprise software/i)).toBeVisible()
    expect(screen.getByText(/what it costs and when to leave it alone/i)).toBeVisible()
  })

  test('invites technical readers to run the unhosted pre-alpha through the repository setup route', () => {
    renderCaseStudy()

    expect(screen.getByText(/The game isn't hosted yet. It's a hobby project, and it grows when I have time/i)).toBeVisible()
    expect(screen.getByText(/PostgreSQL is the likely bit of friction/i)).toBeVisible()
    expect(screen.getByRole('link', { name: 'Clone and run Wild Bunch (opens in a new tab)' })).toHaveAttribute('href', 'https://github.com/HarleyBartles/wild-bunch#run-the-pre-alpha-locally')
  })
})
