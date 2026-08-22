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

  test('retains apprenticeship facts and chronology boundaries', () => {
    expect(professionalProfile.apprenticeship.title).toBe('AI Engineer Level 6 Apprenticeship')
    expect(professionalProfile.apprenticeship.standard).toBe('Machine Learning Engineer, ST1398 v1.0')
    expect(professionalProfile.apprenticeship.qualificationLabel).toBe("Bachelor's degree-level qualification")
    expect(professionalProfile.education[0]?.detail).toBe(
      "Bachelor's degree-level qualification (Level 6), delivered against the Machine Learning Engineer standard (ST1398 v1.0).",
    )
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

  test('provides the approved CV facts without title, availability, or qualification drift', () => {
    expect(professionalProfile.publicLinks.linkedin.href).toBe('https://www.linkedin.com/in/harley-bartles-92326110/')
    expect(professionalProfile.availability.fullLabel).toBe(
      'Remote-first. Open to occasional UK-wide office travel, or Manchester hybrid up to one day per week.',
    )
    expect(professionalProfile.noticePeriod).toBe("Four weeks' notice")
    expect(professionalProfile.career.find((stage) => stage.id === 'brand-addition')?.periodLabel).toBe(
      'July 2005 – January 2019',
    )
    expect(professionalProfile.education.map(({ level }) => level)).toEqual([
      'Higher education — in progress',
      'Further education',
      'Further education',
      'Secondary education',
    ])
    expect(professionalProfile.independentWork.map(({ id }) => id)).toEqual([
      'agent-asset-marketplace',
      'wild-bunch',
      'agentic-learning-lab',
    ])
    expect(professionalProfile.independentWork[0]?.path).toBe('/projects/codex-marketplace')
  })
})
