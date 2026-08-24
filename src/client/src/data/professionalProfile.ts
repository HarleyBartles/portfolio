export type DatePrecision = 'day' | 'month' | 'year' | 'approximate' | 'unknown'

export type PublicDate = {
  value?: string
  precision: DatePrecision
  label: string
}

export type CareerStage = {
  id: string
  periodLabel: string
  started?: PublicDate
  heading: string
  formalTitle?: string
  scopeLabel?: string
  summary: string
  evidence: readonly string[]
}

export type CapabilityGroup = {
  id: string
  label: string
  qualification: string
  items: readonly string[]
}

export type Availability = {
  shortLabel: string
  fullLabel: string
}

export type EducationRecord = {
  id: string
  level: string
  provider?: string
  title: string
  periodLabel?: string
  detail?: string
}

export type PublicProfessionalLink = {
  label: string
  href: string
}

export type IndependentWork = {
  id: string
  title: string
  summary: string
  path: string
}

export type ProfessionalProfile = {
  engineeringStarted: PublicDate
  currentRole: {
    employer: string
    formalTitle: string
    started: PublicDate
    scopeStarted: PublicDate
    soleEngineerSince: PublicDate
    scopeLabel: string
  }
  career: readonly CareerStage[]
  apprenticeship: {
    title: string
    provider: string
    periodLabel: string
    standard: string
    qualificationLabel: string
    summary: string
    references: readonly { label: string; href: string }[]
  }
  availability: Availability
  noticePeriod: string
  education: readonly EducationRecord[]
  capabilities: readonly CapabilityGroup[]
  publicLinks: {
    github: PublicProfessionalLink
    linkedin: PublicProfessionalLink
    portfolio: PublicProfessionalLink
    imdb: PublicProfessionalLink
  }
  independentWork: readonly IndependentWork[]
}

const engineeringStart = new Date('2019-02-06T00:00:00Z')
const apprenticeshipQualificationLabel = "Bachelor's degree-level qualification"

export function getCompletedEngineeringYears(referenceDate: Date): number {
  let years = referenceDate.getUTCFullYear() - engineeringStart.getUTCFullYear()
  const anniversary = new Date(Date.UTC(referenceDate.getUTCFullYear(), 1, 6))

  if (referenceDate < anniversary) {
    years -= 1
  }

  return years
}

export function getEngineeringExperienceLabel(referenceDate: Date): string {
  return `${getCompletedEngineeringYears(referenceDate)}+ years`
}

export const professionalProfile: ProfessionalProfile = {
  engineeringStarted: {
    value: '2019-02-06',
    precision: 'day',
    label: 'Professional software engineering since February 2019',
  },
  currentRole: {
    employer: 'The Access Group',
    formalTitle: 'Software Engineer',
    started: {
      value: '2021-09-27',
      precision: 'day',
      label: 'September 2021',
    },
    scopeStarted: {
      precision: 'approximate',
      label: 'Effective senior scope from approximately mid-2025',
    },
    soleEngineerSince: {
      precision: 'approximate',
      label: 'Sole engineer from approximately May 2026',
    },
    scopeLabel: 'The sole engineer responsible for designing, delivering, operating, and supporting Access Checks.',
  },
  availability: {
    shortLabel: 'Manchester, UK · Remote-first',
    fullLabel: 'Remote-first. Open to occasional UK-wide office travel, or Manchester hybrid up to one day per week.',
  },
  noticePeriod: "Four weeks' notice",
  career: [
    {
      id: 'brand-addition',
      periodLabel: 'July 2005 – January 2019',
      heading: 'Brand Addition',
      formalTitle: 'Web Manager',
      summary: 'A progression through commercial roles and team management into a hybrid business-systems and proto-development role.',
      evidence: [
        'While managing a team, Harley identified a web change it needed, worked with the Ecommerce Director to specify and deliver it, and then moved into the Web Manager role.',
        'He defined requirements, coordinated external developers, held platform and delivery responsibility, and helped migrate and maintain more than 100 multilingual, multicurrency stores.',
        'The work developed commercial judgement, client awareness, leadership, and the deliberate transition into full-time software engineering; it was not a professional software developer role.',
      ],
    },
    {
      id: 'barbican-arch',
      periodLabel: 'February 2019 – September 2021',
      heading: 'Barbican Insurance Group → Arch Capital Group',
      summary: 'One continuous engineering period, with the acquisition as context rather than a break in the chronology.',
      evidence: [
        'Built delivery judgement across .NET Core, React, Redux, layered and onion architecture, DDD, CQRS, SignalR, TeamCity, Octopus Deploy, and TFS.',
        'The lasting evidence is a practical understanding of architecture, integration, and delivery, not a technology wall.',
      ],
    },
    {
      id: 'access',
      periodLabel: 'September 2021 – present',
      started: { precision: 'unknown', label: 'Early greenfield stage' },
      heading: 'The Access Group',
      formalTitle: 'Software Engineer',
      scopeLabel: 'Current responsibility: sole engineer for Access Checks.',
      summary: 'A progression from Recruitment CRM to Screening and then Access Checks, with expanding responsibility while the formal title remained unchanged.',
      evidence: [
        'Access Recruitment CRM: .NET and a database-heavy control surface, including stored procedures, transactions, rollback behaviour, and invariant protection.',
        'Access Screening: volunteered for the January 2023 move, learned Python, Django, MySQL, and GitHub during that month, and contributed fully from February 2023.',
        'Access Checks: involved from its early greenfield side-project stage; its exact inception is intentionally unknown. Current work spans a .NET 8 Azure Functions API, React and .NET customer portal, and bounded AI-assisted browser automation inside deterministic API workflows.',
      ],
    },
  ],
  apprenticeship: {
    title: 'AI Engineer Level 6 Apprenticeship',
    provider: 'QA',
    periodLabel: 'February 2026 – January 2028',
    standard: 'Machine Learning Engineer, ST1398 v1.0',
    qualificationLabel: apprenticeshipQualificationLabel,
    summary: 'Structured study in machine learning, generative AI, model development, deployment, monitoring, ethics, and security underneath the agent layer.',
    references: [
      { label: 'QA AI Engineer Level 6 Apprenticeship', href: 'https://www.qa.com/apprenticeships/ai/ai-engineer-level-6/' },
      { label: 'Skills England Machine Learning Engineer standard', href: 'https://skillsengland.education.gov.uk/apprenticeship-standards/st1398-v1-0' },
    ],
  },
  education: [
    {
      id: 'qa-ai-engineer-apprenticeship',
      level: 'Higher education - in progress',
      provider: 'QA',
      title: 'AI Engineer Level 6 Apprenticeship',
      periodLabel: 'February 2026 – January 2028',
      detail: `${apprenticeshipQualificationLabel} (Level 6), delivered against the Machine Learning Engineer standard (ST1398 v1.0).`,
    },
    {
      id: 'mancat-access-he',
      level: 'Further education',
      provider: 'ManCAT, Moston Campus',
      title: 'Access to H.E. Certificate - Media, Theatre, English',
      periodLabel: '2002 – 2003',
    },
    {
      id: 'shena-simon-performing-arts',
      level: 'Further education',
      provider: 'Shena Simon F.E. College',
      title: 'BTEC Level 3 - Performing Arts (Music)',
      periodLabel: '1997 – 1999',
    },
    {
      id: 'secondary-education',
      level: 'Secondary education',
      title: 'Seven GCSEs',
    },
  ],
  capabilities: [
    {
      id: 'ready-now',
      label: 'Ready to contribute immediately',
      qualification: 'Current, practical delivery capability',
      items: [
        'Modern C# and .NET, including .NET 8 and C# 12-era features',
        'React, TypeScript, and JavaScript',
        'Python and Django',
        'Relational database work, SQL, and MySQL',
        'REST API design and integration',
        'Azure Functions, Git, GitHub, Sass, and Less',
      ],
    },
    {
      id: 'production-experience',
      label: 'Production experience',
      qualification: 'Useful context, not a claim of equal daily fluency',
      items: [
        'React Native, Redux, GraphQL, SignalR, RabbitMQ, and distributed message brokers',
        'Angular, with reacclimation required',
        'TeamCity, Octopus Deploy, TFS, Azure DevOps, AWS, and Azure working fluency',
        'Test design across unit, API/acceptance, integration, and browser risk; xUnit, NUnit, pytest, Django/unittest, FakeItEasy, Playwright, Jest, and reviewed Vitest use',
      ],
    },
  ],
  publicLinks: {
    github: {
      label: 'GitHub: HarleyBartles',
      href: 'https://github.com/HarleyBartles',
    },
    linkedin: {
      label: 'LinkedIn: Harley Bartles',
      href: 'https://www.linkedin.com/in/harley-bartles-92326110/',
    },
    portfolio: {
      label: 'Portfolio: harleybartles.github.io',
      href: 'https://harleybartles.github.io/portfolio/',
    },
    imdb: {
      label: 'IMDb: Harley Bartles',
      href: 'https://www.imdb.com/name/nm2179685/',
    },
  },
  independentWork: [
    {
      id: 'agent-asset-marketplace',
      title: 'Agent Asset Marketplace',
      summary: 'A public distribution system for reusable agent capabilities, with provenance and governance kept visible.',
      path: '/projects/codex-marketplace',
    },
    {
      id: 'wild-bunch',
      title: 'Wild Bunch',
      summary: 'A pre-alpha .NET game project used to make deterministic architecture and diagnostic trade-offs inspectable.',
      path: '/projects/wild-bunch',
    },
    {
      id: 'agentic-learning-lab',
      title: 'Agentic Learning Lab',
      summary: 'A developing curriculum for helping non-coders direct agents with practical judgement and safe boundaries.',
      path: '/projects/agentic-learning-lab',
    },
  ],
}
