import { describe, expect, test } from 'vitest'
import {
  createWritingHomepageFeature,
  defaultHomepageEdition,
  getHomepageEdition,
  type PatchHomepageFeature,
} from './homepageEdition'
import { patchHomepagePresentations } from './PatchHomepageSlot'
import { navigation } from '../../data'

describe('homepageEdition', () => {
  test('gives each published article a GMT day before repeating', () => {
    const published = navigation.filter((item) => item.kind === 'writing' && item.status === 'published')
    const firstDay = Date.parse('2026-09-28T00:00:00Z')
    const selected = published.map((_, offset) => getHomepageEdition(new Date(firstDay + offset * 86_400_000)))

    expect(selected.map((edition) => edition.id)).toEqual(published.map((item) => item.slug))
    expect(new Set(selected.map((edition) => edition.patch))).toEqual(new Set([defaultHomepageEdition.patch]))
    expect(getHomepageEdition(new Date('2026-09-28T23:59:59Z'))).toBe(selected[0])
    expect(getHomepageEdition(new Date('2026-09-29T00:00:00Z'))).toBe(selected[1])
    expect(getHomepageEdition(new Date(firstDay + published.length * 86_400_000))).toBe(selected[0])
  })

  test('lets a destination feature replace the teaser shown by its predecessor', () => {
    const tournament: PatchHomepageFeature = {
      kind: 'patch',
      anchorId: 'patch',
      title: 'Tournament of Reasonable Defaults',
      to: '/patch/tournament-of-reasonable-defaults',
      inwardLabel: 'Enter the tournament',
      incomingTeaser: 'Bring reasonable defaults to the tournament',
      closingTeaser: "Tell me what you're building",
      presentation: 'tournament',
    }

    expect(tournament.incomingTeaser).toBe('Bring reasonable defaults to the tournament')
    expect(tournament.to).toBe('/patch/tournament-of-reasonable-defaults')
    expect(patchHomepagePresentations[tournament.presentation]).not.toBe(patchHomepagePresentations[defaultHomepageEdition.patch.presentation])
  })

  test('composes authored article copy into its homepage edition', () => {
    const port10 = navigation.find((item) => item.slug === 'how-the-invisibles-logo-designer-influenced-the-usual-specialists')

    expect(createWritingHomepageFeature(port10!)).toEqual({
      kind: 'writing',
      anchorId: 'writing',
      title: 'How The Invisibles’ logo designer influenced The Usual Specialists',
      summary: 'I chose Chassis before I noticed Rian Hughes designed it. His name sent me back to 2000 AD in 1992, then forward again to a wordmark big enough to stage the caper inside.',
      to: '/writing/how-the-invisibles-logo-designer-influenced-the-usual-specialists',
      inwardLabel: 'Stop shopping for fonts',
      incomingTeaser: 'When the caper moves inside the word',
    })
    expect(getHomepageEdition(new Date('2026-10-05T12:00:00Z')).writing).toEqual(createWritingHomepageFeature(port10!))
  })
})
