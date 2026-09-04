import { useQuery } from '@tanstack/react-query'
import { type ComponentType, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { ApiRequestError } from '../api/contentApi'
import { contentQueries } from '../app/queryClient'
import {
  AccessibleStatus,
  ArticleBody,
  ContentArticle,
  ContentHeader,
  ContentNavigation,
  DocumentMetadata,
  ContentProse,
  type ContentProseLayout,
  type ContentProseRegister,
  ProjectStatus,
  RelatedContent,
  ShareAction,
  SiteLayout,
  StatePanel,
} from '../components'
import { getRouteMetadata } from '../data/routes/routeCatalogue'
import { ProjectVisual, type ProjectVisualSlug } from '../features/home/ProjectVisual'
import { getProjectPresentation } from '../features/case-study/projectPresentations'
import { getWritingPresentation } from '../features/writing/writingPresentations'
import { getWritingArticleBody, type WritingArticleBodyProps } from '../features/writing/writingArticleBodies'
import { WritingArticleShell } from '../features/writing/WritingArticleShell'
import { WritingHeaderVisual } from '../features/writing/WritingHeaderVisual'
import type { WritingContinuation } from '../features/writing/WritingContinuations'
import '../styles/interior.scss'
import { getContentPath, type ContentKind } from '../types'
import { formatContentDate } from '../utils'

type ContentPageProps = {
  slug: string
  expectedKind?: ContentKind
}

type WritingMetadataProps = {
  date?: string
  readingMinutes?: number
}

const getWritingMetadata = ({ date, readingMinutes }: WritingMetadataProps) => {
  const formattedDate = formatContentDate(date)
  if (formattedDate === null && readingMinutes === undefined) return undefined

  return (
    <>
      {formattedDate === null ? null : <span>{formattedDate}</span>}
      {readingMinutes === undefined ? null : <span>{readingMinutes} min read</span>}
    </>
  )
}

const ContentLoadingState = () => {
  return (
    <SiteLayout>
      <DocumentMetadata
        title="Portfolio Loading | Harley Bartles"
        description="Portfolio content is loading."
        canonicalPath="/"
        noIndex
      />
      <AccessibleStatus id="content-loading-title" title="Preparing the portfolio" routeLoading>
        Loading portfolio content.
      </AccessibleStatus>
    </SiteLayout>
  )
}

const ContentErrorState = () => {
  return (
    <SiteLayout>
      <DocumentMetadata
        title="Portfolio Story Unavailable | Harley Bartles"
        description="This portfolio story could not be loaded."
        canonicalPath="/"
        noIndex
      />
      <AccessibleStatus id="content-error-title" title="Portfolio content unavailable" tone="alert">
        Could not load this portfolio story. Please refresh or try again later.
      </AccessibleStatus>
      <div className="state-actions" aria-label="Recovery navigation">
        <Link to="/">Go to the homepage</Link>
        <Link to="/projects">Browse project stories</Link>
      </div>
    </SiteLayout>
  )
}

const ContentNotFoundState = () => {
  return (
    <SiteLayout>
      <DocumentMetadata
        title="Page Not Found | Harley Bartles"
        description="This portfolio story is not available."
        canonicalPath="/"
        noIndex
      />
      <StatePanel labelledBy="content-not-found-title">
        <h1 id="content-not-found-title">Page not found</h1>
        <p>This portfolio story is not available.</p>
        <Link to="/">Return to the homepage</Link>
      </StatePanel>
    </SiteLayout>
  )
}

const SpecialistPresentationLoading = () => {
  return (
    <section className="specialist-presentation-loading">
      <p role="status" aria-label="Loading case study presentation" data-loading="specialist-presentation">Loading case study presentation</p>
    </section>
  )
}

type ArticleBodyContentProps = {
  presentation?: ComponentType
  writingBody?: ComponentType<WritingArticleBodyProps>
  markdown: string
  proseLayout: ContentProseLayout
  proseRegister: ContentProseRegister
}

const ArticleBodyContent = ({ presentation: Presentation, writingBody: WritingBody, markdown, proseLayout, proseRegister }: ArticleBodyContentProps) => {
  if (Presentation !== undefined) {
    return <Suspense fallback={<SpecialistPresentationLoading />}><Presentation /></Suspense>
  }

  if (WritingBody !== undefined) {
    return <WritingBody markdown={markdown} />
  }

  return <ContentProse layout={proseLayout} register={proseRegister} markdown={markdown} />
}

export const ContentPage = ({ slug, expectedKind }: ContentPageProps) => {
  const contentQuery = useQuery(contentQueries.document(slug))
  const navigationQuery = useQuery(contentQueries.navigation())

  if (contentQuery.isLoading) {
    return <ContentLoadingState />
  }

  if (contentQuery.isError) {
    if (contentQuery.error instanceof ApiRequestError && contentQuery.error.status === 404) {
      return <ContentNotFoundState />
    }

    return <ContentErrorState />
  }

  const document = contentQuery.data

  if (document === undefined) {
    return <ContentErrorState />
  }

  if (expectedKind !== undefined && document.summary.kind !== expectedKind) {
    return <ContentNotFoundState />
  }

  const Presentation = document.summary.presentation === undefined
    ? undefined
    : getProjectPresentation(document.summary.presentation)
  if (document.summary.presentation !== undefined && Presentation === undefined) {
    return <ContentErrorState />
  }
  const writingPresentation = document.summary.kind === 'writing'
    ? getWritingPresentation(document.summary.slug)
    : undefined
  const WritingFigure = writingPresentation?.figure.Component
  const WritingBody = document.summary.kind === 'writing'
    ? getWritingArticleBody(document.summary.slug)
    : undefined

  const relatedSummaries = navigationQuery.data ?? []
  const fallbackSlugs =
    document.summary.kind !== 'writing' && document.summary.relatedSlugs.length === 0 && navigationQuery.isSuccess
      ? relatedSummaries
          .filter((item) => item.kind === 'writing' && item.slug !== document.summary.slug)
          .slice(0, 3)
          .map((item) => item.slug)
      : []
  const slugsToShow =
    document.summary.relatedSlugs.length > 0 ? document.summary.relatedSlugs : fallbackSlugs
  const relatedNavigationUnavailable =
    document.summary.relatedSlugs.length > 0 && navigationQuery.isError
  const continuationItems: WritingContinuation[] = (writingPresentation?.continuations ?? document.summary.relatedSlugs.map((slug) => ({ slug }))).flatMap((item) => {
    const related = relatedSummaries.find((summary) => summary.slug === item.slug)
    return related === undefined ? [] : [{
      slug: related.slug,
      eyebrow: 'eyebrow' in item && item.eyebrow !== undefined ? item.eyebrow : related.kind === 'patch' ? 'Patch story' : related.kind === 'project' ? 'Project story' : 'Article',
      title: related.title,
      href: getContentPath(related),
    }]
  })
  const kindItems = relatedSummaries.filter((item) => item.kind === document.summary.kind)
  const projectVisualSlugs = new Set<ProjectVisualSlug>([
    'codex-marketplace',
    'agentic-learning-lab',
    'adventures-of-patch',
    'wild-bunch',
  ])
  const projectVisualSlug = document.summary.kind === 'project' && projectVisualSlugs.has(document.summary.slug as ProjectVisualSlug)
    ? document.summary.slug as ProjectVisualSlug
    : null
  const visualContract = writingPresentation === undefined ? document.summary.presentation === 'marketplace-case-study'
    ? 'marketplace-case-study-hero'
    : document.summary.presentation === 'patch-pipeline-case-study'
      ? 'patch-case-study-hero'
    : document.summary.presentation === 'wild-bunch-case-study'
      ? 'wild-bunch-case-study-hero'
    : document.summary.presentation === 'learning-lab-case-study'
      ? 'learning-lab-case-study-hero'
      : 'content-page-header' : writingPresentation.visualContract
  const routeMetadata = getRouteMetadata(getContentPath(document.summary))

  const articleBody = (
    <ArticleBody
      measure={Presentation !== undefined || document.summary.kind === 'patch' ? 'full' : 'reading'}
    >
      <ArticleBodyContent
        presentation={Presentation}
        writingBody={WritingBody}
        markdown={document.markdown ?? ''}
        proseLayout={document.summary.kind === 'patch' ? 'illustrated-story' : 'reading'}
        proseRegister={document.summary.kind === 'writing' ? 'article-serif' : 'site-sans'}
      />
    </ArticleBody>
  )

  const writingHeaderVisual = WritingFigure === undefined ? undefined : <WritingHeaderVisual Figure={WritingFigure} />

  const writingMetadata = document.summary.kind === 'writing' ? getWritingMetadata(document.summary) : undefined

  return (
    <SiteLayout>
      <DocumentMetadata
        title={`${document.summary.title} | Harley Bartles`}
        description={document.summary.summary}
        canonicalPath={getContentPath(document.summary)}
      />
      <ContentArticle
        kind={document.summary.kind}
        visualLanguage={document.summary.kind === 'writing' ? 'authored-longform' : document.summary.kind}
        register={document.summary.kind === 'writing' ? 'article-serif' : 'site-sans'}
      >
        {document.summary.kind === 'writing' ? (
          <WritingArticleShell
            eyebrow="writing"
            title={document.summary.title}
            summary={document.summary.summary}
            metadata={writingMetadata}
            visualContract={visualContract}
            regionLabel={writingPresentation?.regionLabel}
            headerVisual={writingHeaderVisual}
            body={articleBody}
            continuations={continuationItems}
            continuationsUnavailable={navigationQuery.isError && document.summary.relatedSlugs.length > 0}
            share={{ title: document.summary.title, path: getContentPath(document.summary) }}
          />
        ) : <>
        <ContentHeader
          eyebrow={document.summary.kind}
          title={document.summary.title}
          summary={document.summary.summary}
          status={document.summary.kind === 'project' && projectVisualSlug !== 'wild-bunch' ? <ProjectStatus status={document.summary.status} /> : undefined}
          statusAnchor={document.summary.kind === 'project' && projectVisualSlug === 'wild-bunch' ? <ProjectStatus status={document.summary.status} /> : undefined}
          visual={projectVisualSlug === null ? undefined : <ProjectVisual slug={projectVisualSlug} eager={projectVisualSlug === 'wild-bunch' || projectVisualSlug === 'adventures-of-patch' || projectVisualSlug === 'agentic-learning-lab'} placement="case-study-hero" />}
          visualContract={visualContract}
          register="site-sans"
        />
        {articleBody}
        {(
          <RelatedContent
            slugs={slugsToShow}
            summaries={relatedSummaries}
            unavailable={relatedNavigationUnavailable}
          />
        )}
        <ContentNavigation items={kindItems} currentSlug={document.summary.slug} />
        {routeMetadata?.shareAction === 'content-end' ? (
          <ShareAction title={document.summary.title} path={routeMetadata.path} />
        ) : null}
        </>}
      </ContentArticle>
    </SiteLayout>
  )
}
