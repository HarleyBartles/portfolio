import evidence from '../../../data/case-studies/learning-lab-evidence.json'

export type LearningLabModuleState = 'mature-lab' | 'roadmap-module'
export type LearningLabCourseStage = 'complete' | 'substantially-planned' | 'early-outline'

export type LearningLabModule = Readonly<{
  id: string
  title: string
  summary: string
  state: LearningLabModuleState
}>

export type LearningLabCourse = Readonly<{
  id: string
  stage: LearningLabCourseStage
  title: string
  outcome: string
  modules: readonly LearningLabModule[]
}>

export type LearningLabEvidence = Readonly<{
  observedAt: string
  repositoryUrl: string
  sourceRevision: string
  sourceChangeUrl: string
  integrityRunUrl: string
  matureLabCount: number
  delivery: Readonly<{ status: 'planned'; target: string; display: string }> | Readonly<{ status: 'started'; startedOn: string; display: string }>
  licensing: Readonly<{
    freelyLicensed: boolean
    policyPath: string
    curriculum: Readonly<{ spdx: 'CC-BY-4.0'; path: string; url: string }>
    tooling: Readonly<{ spdx: 'MIT'; path: string; url: string }>
  }>
  proof: Readonly<{
    curriculum: string
    curriculumShape: string
    course2Index: string
    lab3: string
    lab3Instructions: string
    lab4: string
    lab5: string
    lab7: string
    licencePolicy: string
    curriculumLicence: string
    toolingLicence: string
    integrity: string
  }>
  courses: readonly LearningLabCourse[]
}>

export const learningLabEvidence = evidence as LearningLabEvidence
export const learningLabModules = learningLabEvidence.courses.flatMap((course) => course.modules)

export function pinnedLearningLabPath(path = ''): string {
  const suffix = path === '' ? '' : `/${path}`
  return `${learningLabEvidence.repositoryUrl}/tree/${learningLabEvidence.sourceRevision}${suffix}`
}
