const projectVisualSlugs = [
  'codex-marketplace',
  'agentic-learning-lab',
  'adventures-of-patch',
  'wild-bunch',
  'agentic-engineering-vs-vibe-coding',
  'i-made-agentic-engineering-harder-than-it-needed-to-be',
] as const

export type ProjectVisualSlug = typeof projectVisualSlugs[number]

export const isProjectVisualSlug = (slug: string): slug is ProjectVisualSlug => (
  projectVisualSlugs.includes(slug as ProjectVisualSlug)
)
