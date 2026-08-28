import { describe, expect, test } from 'vitest'
import type { ContentSummary, EditorialWritingSummary } from '../types/content'
import { loadDocument, navigation, parseContentSummary, prepareMarkdown } from './documents'

const editorialWritingFixture = {
  slug: 'editorial-fixture',
  kind: 'writing',
  title: 'Editorial fixture',
  status: 'published',
  summary: 'A generic writing fixture.',
  tags: ['writing'],
  editorial: {
    dateline: 'Autumn 2026',
    readingMinutes: 7,
    indexLead: true,
    homepageFeature: {
      eligible: true,
      proposition: 'A homepage proposition written for this fixture.',
    },
    visual: {
      id: 'editorial-fixture-visual',
      description: 'A text equivalent for the fixture visual.',
    },
    continuations: [
      { slug: 'second-fixture', rationale: 'It develops the first decision.' },
      { slug: 'third-fixture', rationale: 'It supplies a contrasting example.' },
    ],
  },
} satisfies EditorialWritingSummary

describe('parseContentSummary', () => {
  test('parses the complete editorial writing contract', () => {
    expect(parseContentSummary(editorialWritingFixture)).toEqual(editorialWritingFixture)
  })

  test('keeps non-writing content valid without editorial metadata', () => {
    expect(parseContentSummary({
      slug: 'project-fixture',
      kind: 'project',
      title: 'Project fixture',
      status: 'live',
      summary: 'A generic project fixture.',
      featured: false,
      tags: ['project'],
      relatedSlugs: [],
    })).toMatchObject({ kind: 'project', slug: 'project-fixture' })
  })
})

describe('prepareMarkdown', () => {
  test('removes a duplicate leading title from a fairytale before the page header renders', () => {
    const summary: ContentSummary = {
      slug: 'goldilocks',
      kind: 'patch',
      title: 'Goldilocks',
      status: 'published',
      featured: false,
      summary: 'A visual lesson.',
      tags: ['fairytales'],
      relatedSlugs: [],
    }

    expect(prepareMarkdown('# Goldilocks\n\nThe story begins.', summary)).toBe('The story begins.')
  })
})

describe('loadDocument', () => {
  test('keeps the unadmitted Pass References stub out of public navigation', () => {
    expect(navigation.some((item) => item.slug === 'pass-references-not-paragraphs')).toBe(false)
    expect(navigation.find((item) => item.slug === 'graph-iterative-review')).toMatchObject({ date: '2026-08-15' })
    expect(navigation.find((item) => item.slug === 'why-adrs')).toMatchObject({ date: '2026-08-22' })
    expect(navigation.find((item) => item.slug === 'the-right-test-isnt-your-favourite-test')).toMatchObject({ date: '2026-08-25' })
    expect(navigation.find((item) => item.slug === 'i-just-write-the-code-is-not-a-full-sentence')).toMatchObject({ date: '2026-08-28' })
  })

  test('preserves specialist project presentation discriminators without looking for Markdown', async () => {
    const marketplace = navigation.find((item) => item.slug === 'codex-marketplace')
    const wildBunch = navigation.find((item) => item.slug === 'wild-bunch')
    const learningLab = navigation.find((item) => item.slug === 'agentic-learning-lab')
    const lawfulHeist = navigation.find((item) => item.slug === 'lawful-heist')

    expect(marketplace).toBeDefined()
    expect(marketplace?.presentation).toBe('marketplace-case-study')
    await expect(loadDocument(marketplace!)).resolves.toMatchObject({
      summary: { presentation: 'marketplace-case-study' },
      markdown: undefined,
    })

    expect(wildBunch).toBeDefined()
    expect(wildBunch?.presentation).toBe('wild-bunch-case-study')
    await expect(loadDocument(wildBunch!)).resolves.toMatchObject({
      summary: { presentation: 'wild-bunch-case-study' },
      markdown: undefined,
    })

    expect(learningLab?.presentation).toBe('learning-lab-case-study')
    await expect(loadDocument(learningLab!)).resolves.toMatchObject({
      summary: { presentation: 'learning-lab-case-study' },
      markdown: undefined,
    })

    expect(lawfulHeist?.presentation).toBe('patch-lawful-heist')
  })

  test('continues to load ordinary Markdown documents', async () => {
    const writing = navigation.find((item) => item.slug === 'i-made-agentic-engineering-harder-than-it-needed-to-be')

    await expect(loadDocument(writing!)).resolves.toMatchObject({
      summary: { slug: 'i-made-agentic-engineering-harder-than-it-needed-to-be' },
      markdown: expect.any(String),
    })
  })

  test('loads the Why ADRs production article from the public manifest', async () => {
    const whyAdrs = navigation.find((item) => item.slug === 'why-adrs')

    expect(whyAdrs).toMatchObject({
      kind: 'writing',
      title: 'Why ADRs?',
      summary: 'Losing the reasoning behind a complex insurance system taught me what an ADR owes the engineer who inherits it.',
      readingMinutes: 8,
      featured: false,
    })
    await expect(loadDocument(whyAdrs!)).resolves.toMatchObject({
      summary: { slug: 'why-adrs' },
      markdown: expect.stringContaining("I didn't know the documentation was me"),
    })
  })
})
