import { describe, expect, test } from 'vitest'
import { getCompletedEngineeringYears, getEngineeringExperienceLabel, professionalProfile } from './professionalProfile'

describe('professional profile', () => {
  test('derives completed engineering years without rounding up before the anniversary', () => {
    expect(getCompletedEngineeringYears(new Date('2026-02-05T00:00:00Z'))).toBe(6)
    expect(getCompletedEngineeringYears(new Date('2026-02-06T00:00:00Z'))).toBe(7)
    expect(getEngineeringExperienceLabel(new Date('2026-08-22T00:00:00Z'))).toBe('7+ years')
  })

  test('keeps the formal Access title distinct from the current responsibility', () => {
    expect(professionalProfile.currentRole.formalTitle).toBe('Software Engineer')
    expect(professionalProfile.currentRole.scopeLabel).toMatch(/sole engineer/i)
    expect(professionalProfile.currentRole.scopeStarted.precision).toBe('approximate')
  })

  test('retains public qualification wording and chronology boundaries', () => {
    expect(professionalProfile.apprenticeship.levelStatement).toBe("bachelor's-degree-level programme")
    expect(professionalProfile.career[0].id).toBe('brand-addition')
    expect(professionalProfile.career.at(-1)?.id).toBe('access')
  })

  test('records the unknown Access Checks inception and authoritative apprenticeship references', () => {
    expect(professionalProfile.career.at(-1)?.started).toEqual({ precision: 'unknown', label: 'Early greenfield stage' })
    expect(professionalProfile.apprenticeship.references.map((reference) => reference.href)).toEqual([
      'https://www.qa.com/apprenticeships/ai/ai-engineer-level-6/',
      'https://skillsengland.education.gov.uk/apprenticeship-standards/st1398-v1-0',
    ])
  })
})
