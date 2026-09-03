export type HomepageFeatureBase = {
  anchorId: 'writing' | 'patch'
  title: string
  to: string
  inwardLabel: string
  incomingTeaser: string
}

export type WritingHomepageFeature = HomepageFeatureBase & {
  kind: 'writing'
  anchorId: 'writing'
  summary: string
}

export type PatchHomepageFeature = HomepageFeatureBase & {
  kind: 'patch'
  anchorId: 'patch'
  closingTeaser: string
  presentation: 'usual-specialists' | 'tournament'
}

export type HomepageFeatureDescriptor = WritingHomepageFeature | PatchHomepageFeature

export type HomepageEdition = {
  id: string
  writing: WritingHomepageFeature
  patch: PatchHomepageFeature
}

export const defaultHomepageEdition: HomepageEdition = {
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
}

export const homepageEditions: readonly HomepageEdition[] = [defaultHomepageEdition]

export function createWritingHomepageFeature(summary: ContentSummary): WritingHomepageFeature | undefined {
  if (summary.kind !== 'writing' || summary.homepageFeature === undefined) return undefined

  return {
    kind: 'writing',
    anchorId: 'writing',
    title: summary.title,
    summary: summary.homepageFeature.summary,
    to: getContentPath(summary),
    inwardLabel: summary.homepageFeature.inwardLabel,
    incomingTeaser: summary.homepageFeature.incomingTeaser,
  }
}

export function getHomepageEdition(id = defaultHomepageEdition.id): HomepageEdition {
  return homepageEditions.find((edition) => edition.id === id) ?? defaultHomepageEdition
}
import { getContentPath, type ContentSummary } from '../../types'
