import { describe, expect, test } from 'vitest'
import { learningLabEvidence, learningLabModules } from './learningLabEvidence'

describe('Learning Lab evidence', () => {
  test('keeps module identity unique and course-local, with state counts matching the evidence', () => {
    for (const course of learningLabEvidence.courses) {
      const ids = course.modules.map((module) => Number(module.id))
      expect(new Set(ids).size).toBe(ids.length)
      expect(ids).toEqual(Array.from({ length: ids.length }, (_, index) => index + 1))
      expect(course.modules.every((module) => module.summary.trim().length > 0)).toBe(true)
    }

    expect(learningLabModules.filter((module) => module.state === 'mature-lab')).toHaveLength(learningLabEvidence.matureLabCount)
    expect(learningLabModules.every((module) => ['mature-lab', 'roadmap-module'].includes(module.state))).toBe(true)
  })
})
