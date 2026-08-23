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

    expect(caseStudy).toHaveClass('wild-bunch-case-study--composed')
    expect(caseStudy).toHaveAttribute('data-visual-contract', 'wild-bunch-evidence-ledger')
    expect(determinism).toHaveAttribute('data-relationship', 'ordered-semantic-stages')
    expect(eventFlow).toHaveAttribute('data-relationship', 'ordered-semantic-stages')
    expect(determinism.querySelectorAll('[class*="connector"]')).toHaveLength(0)
    expect(eventFlow.querySelectorAll('[class*="connector"]')).toHaveLength(0)
  })

  test('groups the development-build position into one source-ordered introductory beat', () => {
    renderCaseStudy()

    const introduction = screen.getByRole('region', { name: 'Development-build position' })

    expect(introduction).toHaveClass('wild-bunch-case-study__introduction')
    expect(introduction.children).toHaveLength(3)
    expect(introduction.children[0]).toHaveTextContent(/This is a playable development build/i)
    expect(introduction.children[1]).toHaveTextContent(/I test the architecture against real state, bugs, and trade-offs/i)
    expect(introduction.children[2]).toHaveTextContent(/Its visuals are a working skeleton, not a finished game design or art direction/i)
  })

  test('tells the approved first-person architecture story in reading order', () => {
    renderCaseStudy()

    expect(screen.getByText('Every complexity pays rent.')).toBeVisible()
    expect(screen.getByText(/This is a playable development build/i)).toBeVisible()
    expect(screen.getByText(/I test the architecture against real state, bugs, and trade-offs/i)).toBeVisible()
    expect(screen.getByText(/Its visuals are a working skeleton, not a finished game design or art direction/i)).toBeVisible()
    expect(screen.getByText(/Firebird Software published the original in 1984/i)).toBeVisible()
    expect(screen.getByText(/Amstrad CPC 464/i)).toBeVisible()
    expect(screen.getByText(/Locomotive BASIC/i)).toBeVisible()

    expect(screen.getByRole('link', { name: 'Historical Wild Bunch archive' })).toHaveAttribute('href', 'https://worldofspectrum.org/archive/software/games/the-wild-bunch-firebird-software-ltd')
    expect(screen.getByRole('link', { name: 'Pinned resolver evidence' })).toHaveAttribute(
      'href',
      'https://github.com/HarleyBartles/wild-bunch/blob/2a9814d094148bb789766a27d316095fecce5a60/src/WildBunch.GameContent/NewGame/SeedWorldResolver.cs',
    )

    const origin = screen.getByRole('heading', { level: 2, name: 'The first language' })
    const premise = screen.getByRole('heading', { level: 2, name: 'Why the trivial version was not the point' })
    const determinism = screen.getByRole('heading', { level: 2, name: 'Random-looking, reproducible' })
    const events = screen.getByRole('heading', { level: 2, name: 'The event stream is the receipt' })
    const knowledge = screen.getByRole('heading', { level: 2, name: 'The player sees what the player has earned' })
    const implementation = screen.getByRole('heading', { level: 2, name: 'The implementation medium' })
    const restraint = screen.getByRole('heading', { level: 2, name: 'Architecture includes restraint' })
    const decisions = screen.getByRole('heading', { level: 2, name: 'Decisions and trade-offs' })
    const simpler = screen.getByRole('heading', { level: 2, name: 'The simpler version would cost something, too' })
    const present = screen.getByRole('heading', { level: 2, name: 'Built, in motion, beyond pre-alpha' })

    expect(follows(origin, premise)).toBe(true)
    expect(follows(premise, determinism)).toBe(true)
    expect(follows(determinism, events)).toBe(true)
    expect(follows(events, knowledge)).toBe(true)
    expect(follows(knowledge, implementation)).toBe(true)
    expect(follows(implementation, restraint)).toBe(true)
    expect(follows(restraint, decisions)).toBe(true)
    expect(follows(decisions, simpler)).toBe(true)
    expect(follows(simpler, present)).toBe(true)
  })

  test('keeps the technical and authorship claims inspectable rather than promotional', () => {
    renderCaseStudy()

    const dossier = document.querySelector('dl[aria-label="Text-first technical dossier"]')
    expect(dossier).toBeTruthy()
    expect(within(dossier as HTMLElement).getByText('Backend')).toBeVisible()
    expect(within(dossier as HTMLElement).getByText(/C#, .NET 10, ASP.NET Core Minimal APIs/i)).toBeVisible()
    expect(within(dossier as HTMLElement).getByText('Architecture')).toBeVisible()
    expect(within(dossier as HTMLElement).getByText(/DDD, Onion dependency direction, CQRS-style handlers/i)).toBeVisible()
    expect(within(dossier as HTMLElement).getByText('Web')).toBeVisible()
    expect(within(dossier as HTMLElement).getByText(/TypeScript, React 18, Vite/i)).toBeVisible()
    expect(within(dossier as HTMLElement).getByText('Evidence')).toBeVisible()
    expect(within(dossier as HTMLElement).getByText(/xUnit, ASP.NET integration tests, Vitest/i)).toBeVisible()

    expect(screen.getByText(/I did not hand-write Wild Bunch's code/i)).toBeVisible()
    expect(screen.getByText(/setting its constraints, directing agents through the work, reviewing the result/i)).toBeVisible()
    expect(screen.getByRole('link', { name: 'Read the agentic-engineering essay' })).toHaveAttribute('href', '/portfolio/writing/agentic-engineering-vs-vibe-coding')
    expect(screen.getByText(/DDD keeps the game rules and invariants with the session that owns them/i)).toBeVisible()
    expect(screen.getByText(/CQRS keeps state-changing commands separate from player, audit, and projection reads/i)).toBeVisible()
    expect(screen.getByText(/Onion direction keeps those rules independent of HTTP, EF\/PostgreSQL, and Phaser/i)).toBeVisible()
  })

  test('links detailed public claims to their pinned evidence snapshot', () => {
    renderCaseStudy()

    expect(screen.getByRole('link', { name: 'Pinned graph-generation evidence' })).toHaveAttribute(
      'href',
      'https://github.com/HarleyBartles/wild-bunch/blob/2a9814d094148bb789766a27d316095fecce5a60/tests/WildBunch.GameContent.Tests/TrailGraphGeneratorTests.cs',
    )
    expect(screen.getByRole('link', { name: 'Pinned persisted-world evidence' })).toHaveAttribute(
      'href',
      'https://github.com/HarleyBartles/wild-bunch/blob/2a9814d094148bb789766a27d316095fecce5a60/src/WildBunch.Domain/World/WorldSnapshot.cs',
    )
    expect(screen.getByRole('link', { name: 'Pinned developer-tooling evidence' })).toHaveAttribute(
      'href',
      'https://github.com/HarleyBartles/wild-bunch/blob/2a9814d094148bb789766a27d316095fecce5a60/src/WildBunch.Web/src/dev/DevOverlay.tsx',
    )
    expect(screen.getByRole('link', { name: 'Wild Bunch source snapshot (pinned revision)' })).toHaveAttribute(
      'href',
      'https://github.com/HarleyBartles/wild-bunch/tree/2a9814d094148bb789766a27d316095fecce5a60',
    )
  })

  test('shows exactly three supporting patterns, five decisions, and the explicit simpler-build trade-off', () => {
    renderCaseStudy()

    const patterns = screen.getByRole('list', { name: 'Selected supporting patterns' })
    expect(within(patterns).getAllByRole('listitem')).toHaveLength(3)
    expect(within(patterns).getByText(/Snapshots are disposable caches/i)).toBeVisible()
    expect(within(patterns).getByText(/React and Phaser stay at the rendering and input boundary/i)).toBeVisible()
    expect(within(patterns).getByText(/manual typed API client/i)).toBeVisible()

    for (const decision of [
      'Deterministic seeds over opaque randomness',
      'Event history over state-only persistence',
      'A server-authoritative domain over client-owned rules',
      'Compositional domain loops over one unbounded session class',
      'Developer inspection surfaces over invisible magic',
    ]) {
      expect(screen.getByRole('heading', { level: 3, name: decision })).toBeVisible()
    }

    expect(screen.getByText(/reproducible worlds and next actions/i)).toBeVisible()
    expect(screen.getByText(/exact replay and reconstruction/i)).toBeVisible()
    expect(screen.getByText(/conflict-aware writes/i)).toBeVisible()
    const simplerSection = screen.getByRole('heading', { level: 2, name: 'The simpler version would cost something, too' }).closest('section')
    expect(simplerSection).toBeTruthy()
    expect(within(simplerSection as HTMLElement).getByText(/opaque randomness/i)).toBeVisible()
    expect(screen.queryByText(/client-friendly randomness/i)).not.toBeInTheDocument()
    expect(screen.getByText(/more concepts, storage and evolution machinery, invariant tests, operational discipline, and a larger debugging surface/i)).toBeVisible()
  })

  test('separates player-safe knowledge and present capability without publishing private diagnostic truth', () => {
    renderCaseStudy()

    expect(screen.getByText(/Player routes receive only the clues, warrants, and suspect information that play has earned/i)).toBeVisible()
    expect(screen.queryByText(/trueCulpritId/i)).not.toBeInTheDocument()

    const ledger = screen.getByRole('region', { name: 'Capability state at the evidence snapshot' })
    expect(within(ledger).getByRole('heading', { level: 3, name: 'Built' })).toBeVisible()
    expect(within(ledger).getByRole('heading', { level: 3, name: 'In motion' })).toBeVisible()
    expect(within(ledger).getByRole('heading', { level: 3, name: 'Beyond pre-alpha' })).toBeVisible()
    expect(within(ledger).getByText(/Seeded session setup, generated town graph, route distances, and travel/i)).toBeVisible()
    expect(within(ledger).getByText(/Entropy behaviour beyond the deterministic path/i)).toBeVisible()
    expect(within(ledger).getByText(/Public accounts and sessions, production hosting/i)).toBeVisible()
  })

  test('states the source-backed map, replay, entropy, and development-access limits', () => {
    renderCaseStudy()

    expect(screen.getByText(/Delaunay candidates through a minimum spanning tree/i)).toBeVisible()
    expect(screen.getByText(/Non-Boring expansion is still transitional/i)).toBeVisible()
    expect(screen.getByText(/full-stream equality tests make exact replay a claim that can fail/i)).toBeVisible()
    expect(screen.getByText(/access is gated by the development environment rather than a public authorisation system/i)).toBeVisible()
  })

  test('connects the constrained variation and replay lessons to the public architecture claim', () => {
    renderCaseStudy()

    expect(screen.getByText(/constrained combinations can produce more meaningful variation than encoding every town/i)).toBeVisible()
    expect(screen.getByText(/generation plus persistence becomes one product promise when a player revisits a town/i)).toBeVisible()
    expect(screen.getByText(/Replay earns its cost only when it can rebuild and falsify exact state/i)).toBeVisible()
    expect(screen.getByText(/Randomize seed is a first-class setup option/i)).toBeVisible()
    expect(screen.getByText(/reconstruct what the system accepted and in what order/i)).toBeVisible()
    expect(screen.getByText(/one legal-change boundary/i)).toBeVisible()
    expect(screen.getByText(/purpose-built read folds/i)).toBeVisible()
    expect(screen.getByText(/adapters outside the domain/i)).toBeVisible()
    expect(screen.getByText(/repository, Unit of Work, concurrency retries, snapshots, and upcasting/i)).toBeVisible()
  })
})
