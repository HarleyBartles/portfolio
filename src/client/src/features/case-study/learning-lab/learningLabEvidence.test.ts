import { describe, expect, test } from 'vitest'
import { learningLabEvidence, learningLabModules } from './learningLabEvidence'

describe('Learning Lab evidence', () => {
  test('pins one immutable curriculum snapshot', () => {
    expect(learningLabEvidence.sourceRevision).toBe('3d8e92ceaebcbb67f0ede5bda95846da8e18b80d')
    expect(learningLabEvidence.observedAt).toBe('2026-08-25')
    expect(learningLabEvidence.sourceChangeUrl).toBe('https://github.com/HarleyBartles/agentic-learning-lab/pull/13')
    expect(learningLabEvidence.delivery).toEqual({ status: 'planned', target: '2026-09', display: 'September 2026' })
    expect(learningLabEvidence.courses).toHaveLength(3)
    expect(learningLabModules).toHaveLength(19)
    expect(new Set(learningLabEvidence.courses.flatMap((course) => course.modules.map((module) => `${course.id}:${module.id}`)))).toHaveLength(19)
    expect(learningLabModules.filter((module) => module.state === 'mature-lab')).toHaveLength(10)
    expect(learningLabModules.filter((module) => module.state === 'roadmap-module')).toHaveLength(9)
    expect(learningLabModules.every((module) => module.summary.trim().length > 0)).toBe(true)
  })

  test('uses course-local numbering for the nine-module Course 2 plan and leaves Course 3 uninflated', () => {
    const course = learningLabEvidence.courses[1]
    expect(course.id).toBe('course-2')
    expect(course.modules.map((module) => module.id)).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
    expect(course.modules[4]).toMatchObject({ id: '5', title: 'The 20-Agent Bonfire and context transport' })
    expect(course.modules[8]).toMatchObject({ id: '9', title: 'Retrospective: how this repo was built' })
    expect(learningLabEvidence.courses[2].modules).toEqual([])
  })

})
