import { describe, expect, test } from 'vitest'
import { formatLearningLabDelivery, learningLabEvidence, learningLabModules } from './learningLabEvidence'

describe('Learning Lab evidence', () => {
  test('pins one immutable curriculum snapshot', () => {
    expect(learningLabEvidence.sourceRevision).toBe('315442bd2661bbc99a0834e57ff5f500b549326c')
    expect(learningLabEvidence.observedAt).toBe('2026-08-24')
    expect(learningLabEvidence.delivery).toEqual({ status: 'planned', target: '2026-08', display: 'late August 2026' })
    expect(learningLabEvidence.courses).toHaveLength(3)
    expect(learningLabModules).toHaveLength(19)
    expect(new Set(learningLabModules.map((module) => module.id))).toHaveLength(19)
    expect(learningLabModules.filter((module) => module.state === 'mature-lab')).toHaveLength(10)
    expect(learningLabModules.filter((module) => module.state === 'roadmap-module')).toHaveLength(9)
  })

  test('keeps the linked 14A practicum in Course 2 immediately after Module 14', () => {
    const course = learningLabEvidence.courses[1]
    expect(course.id).toBe('course-2')
    expect(course.modules.map((module) => module.id)).toEqual(['11', '12', '13', '14', '14A', '15'])
  })

  test('derives public delivery copy from the authored delivery union', () => {
    expect(formatLearningLabDelivery({ status: 'planned', target: '2026-08', display: 'late August 2026' })).toBe('First live delivery planned for late August 2026.')
    expect(formatLearningLabDelivery({ status: 'started', startedOn: '2026-09-14', display: 'September 2026' })).toBe('Delivery began in September 2026.')
  })
})
