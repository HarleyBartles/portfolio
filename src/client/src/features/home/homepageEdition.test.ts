import { describe, expect, test } from 'vitest'
import {
  defaultHomepageEdition,
  getHomepageEdition,
  type PatchHomepageFeature,
} from './homepageEdition'

describe('homepageEdition', () => {
  test('pins the accepted first production edition without runtime randomness', () => {
    expect(defaultHomepageEdition).toEqual({
      id: 'phase-8-first-edition',
      writing: {
        kind: 'writing',
        anchorId: 'writing',
        title: 'I made agentic engineering harder than it needed to be',
        summary: 'I built an agent organisation around a novel, then filled the repository with roughly 300 agent-facing documents until returning to the work meant accepting a cleanup project first. I kept the real boundaries and removed the theatre, with one question for every surviving surface: why are you here?',
        to: '/writing/i-made-agentic-engineering-harder-than-it-needed-to-be',
        inwardLabel: 'Read the article',
        incomingTeaser: 'When the process becomes the problem',
      },
      patch: {
        kind: 'patch',
        anchorId: 'patch',
        title: 'The Usual Specialists',
        to: '/patch/lawful-heist',
        inwardLabel: 'Meet the crew',
        incomingTeaser: 'Meet The Usual Specialists',
        closingTeaser: "Then tell me what you're building",
        presentation: 'usual-specialists',
      },
    })
    expect(getHomepageEdition()).toBe(defaultHomepageEdition)
    expect(getHomepageEdition('unknown')).toBe(defaultHomepageEdition)
  })

  test('lets a destination feature replace the teaser shown by its predecessor', () => {
    const tournament: PatchHomepageFeature = {
      kind: 'patch',
      anchorId: 'patch',
      title: 'Tournament of Reasonable Defaults',
      to: '/patch/tournament-of-reasonable-defaults',
      inwardLabel: 'Enter the tournament',
      incomingTeaser: 'Bring reasonable defaults to the tournament',
      closingTeaser: "Then tell me what you're building",
      presentation: 'tournament',
    }

    expect(tournament.incomingTeaser).toBe('Bring reasonable defaults to the tournament')
    expect(tournament.to).toBe('/patch/tournament-of-reasonable-defaults')
  })
})
