import { useQuery } from '@tanstack/react-query'
import { lazy, type ComponentType, type ReactNode, Suspense } from 'react'
import { ApiRequestError } from '../api/contentApi'
import { contentQueries } from '../app/queryClient'
import {
  ArticleBody,
  ContentArticle,
  ContentHeader,
  ContentNavigation,
  DocumentMetadata,
  ContentProse,
  type ContentProseLayout,
  type ContentProseRegister,
  RelatedContent,
  ShareAction,
  SiteLayout,
  StatePanel,
} from '../components'
import { getPatchSummaries, getProjectSummaries } from '../data'
import { getRouteMetadata } from '../data/routes/routeCatalogue'
import { isProjectVisualSlug } from '../features/home/projectVisualRegistry'
import { ProjectCaseStudyHeader, type ProjectCaseStudyHeaderLayout } from '../features/case-study/ProjectCaseStudyHeader'
import { getProjectPresentation } from '../features/case-study/projectPresentations'
import { getWritingPresentation } from '../features/writing/writingPresentations'
import { ArticleMarkdown } from '../features/writing/ArticleMarkdown'
import { getWritingArticleBody, type WritingArticleBody } from '../features/writing/writingArticleBodies'
import { WritingArticleShell } from '../features/writing/WritingArticleShell'
import { WritingArticleBodyLoading } from '../features/writing/WritingArticleBodyLoading'
import { WritingHeaderVisual } from '../features/writing/WritingHeaderVisual'
import type { WritingContinuation } from '../features/writing/WritingContinuations'
import '../styles/interior.scss'
import { getContentPath, type ContentKind } from '../types'
import { formatContentDate } from '../utils'

const LazyProjectVisual = lazy(async () => {
  const module = await import('../features/home/ProjectVisual')
  return { default: module.ProjectVisual }
})

type ContentPageProps = {
  slug: string
  expectedKind?: ContentKind
  headerVisual?: ReactNode
}

type WritingMetadataProps = {
  date?: string
  readingMinutes?: number
}

const getWritingMetadata = ({ date, readingMinutes }: WritingMetadataProps) => {
  const formattedDate = formatContentDate(date)
  const items = [
    ...(formattedDate === null ? [] : [formattedDate]),
    ...(readingMinutes === undefined ? [] : [`${readingMinutes} min read`]),
  ]

  return items.length === 0 ? undefined : items
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
      <StatePanel id="content-loading-title" title="Preparing the portfolio" announcement="status" routeLoading messages={['Loading portfolio content.']} />
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
      <StatePanel
        id="content-error-title"
        title="Portfolio content unavailable"
        announcement="alert"
        messages={['Could not load this portfolio story. Please refresh or try again later.']}
        actions={[{ label: 'Go to the homepage', to: '/' }, { label: 'Browse project stories', to: '/projects' }]}
      />
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
      <StatePanel id="content-not-found-title" title="Page not found" messages={['This portfolio story is not available.']} actions={[{ label: 'Return to the homepage', to: '/' }]} />
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
  writingBody?: WritingArticleBody
  markdown: string
  proseLayout: ContentProseLayout
  proseRegister: ContentProseRegister
}

const ArticleBodyContent = ({ presentation: Presentation, writingBody: WritingBody, markdown, proseLayout, proseRegister }: ArticleBodyContentProps) => {
  if (Presentation !== undefined) {
    return <Suspense fallback={<SpecialistPresentationLoading />}><Presentation /></Suspense>
  }

  if (WritingBody !== undefined) {
    return <Suspense fallback={<WritingArticleBodyLoading />}><WritingBody markdown={markdown} /></Suspense>
  }

  if (proseRegister === 'article-serif') return <ArticleMarkdown markdown={markdown} />

  return <ContentProse layout={proseLayout} register={proseRegister} markdown={markdown} />
}

export const ContentPage = ({ slug, expectedKind, headerVisual }: ContentPageProps) => {
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

  const Presentation = getProjectPresentation(document.summary.slug)
  if (document.markdown === undefined && Presentation === undefined) {
    return <ContentErrorState />
  }
  const writingPresentation = document.summary.kind === 'writing'
    ? getWritingPresentation(document.summary.slug)
    : undefined
  const WritingFigure = writingPresentation?.figure?.Component
  const WritingBody = document.summary.kind === 'writing'
    ? getWritingArticleBody(document.summary.slug)
    : undefined

  const relatedSummaries = navigationQuery.data ?? []
  const relatedNavigationUnavailable =
    document.summary.relatedSlugs.length > 0 && navigationQuery.isError
  const continuationItems: WritingContinuation[] = (writingPresentation?.continuations ?? document.summary.relatedSlugs.map((slug) => ({ slug }))).flatMap((item) => {
    const related = relatedSummaries.find((summary) => summary.slug === item.slug)
    return related === undefined ? [] : [{
      slug: related.slug,
      contextLabel: 'contextLabel' in item && item.contextLabel !== undefined ? item.contextLabel : related.kind === 'patch' ? 'Patch story' : related.kind === 'project' ? 'Project story' : 'Article',
      title: related.title,
      href: getContentPath(related),
    }]
  })
  const kindItems = document.summary.kind === 'project'
    ? getProjectSummaries(relatedSummaries)
    : document.summary.kind === 'patch'
      ? getPatchSummaries(relatedSummaries)
      : relatedSummaries.filter((item) => item.kind === document.summary.kind)
  const projectVisualSlug = document.summary.kind === 'project' && isProjectVisualSlug(document.summary.slug)
    ? document.summary.slug
    : null
  const visualContract = writingPresentation === undefined ? document.summary.slug === 'codex-marketplace'
    ? 'marketplace-case-study-hero'
    : document.summary.slug === 'adventures-of-patch'
      ? 'patch-case-study-hero'
    : document.summary.slug === 'wild-bunch'
      ? 'wild-bunch-case-study-hero'
    : document.summary.slug === 'agentic-learning-lab'
      ? 'learning-lab-case-study-hero'
      : 'content-page-header' : writingPresentation.visualContract
  const writingHeaderLayout = writingPresentation?.layout ?? 'standard'
  const projectHeaderLayout: ProjectCaseStudyHeaderLayout = document.summary.slug === 'agentic-learning-lab'
    ? 'learning-lab'
    : document.summary.slug === 'wild-bunch'
      ? 'wild-bunch'
      : document.summary.slug === 'adventures-of-patch'
        ? 'patch'
        : 'standard'
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
  const projectHeaderVisual = projectVisualSlug === null ? undefined : (
    <LazyProjectVisual slug={projectVisualSlug} eager={projectVisualSlug === 'wild-bunch' || projectVisualSlug === 'adventures-of-patch' || projectVisualSlug === 'agentic-learning-lab'} placement="case-study-hero" />
  )

  return (
    <SiteLayout>
      <DocumentMetadata canonicalPath={getContentPath(document.summary)} />
      <ContentArticle
        kind={document.summary.kind}
        visualLanguage={document.summary.kind === 'writing' ? 'authored-longform' : document.summary.kind}
        register={document.summary.kind === 'writing' ? 'article-serif' : 'site-sans'}
      >
        {document.summary.kind === 'writing' ? (
          <WritingArticleShell
            title={document.summary.title}
            summary={document.summary.summary}
            metadata={writingMetadata}
            visualContract={visualContract}
            layout={writingHeaderLayout}
            regionLabel={writingPresentation?.regionLabel}
            headerVisual={writingHeaderVisual}
            body={articleBody}
            continuations={continuationItems}
            continuationsUnavailable={navigationQuery.isError && document.summary.relatedSlugs.length > 0}
            share={{ title: document.summary.title, path: getContentPath(document.summary) }}
          />
        ) : <>
        {document.summary.kind === 'project' ? <ProjectCaseStudyHeader
          title={document.summary.title}
          summary={document.summary.summary}
          status={document.summary.status}
          layout={projectHeaderLayout}
          visual={headerVisual ?? projectHeaderVisual}
          visualContract={visualContract}
        /> : <ContentHeader
          title={document.summary.title}
          summary={document.summary.summary}
          visual={headerVisual ?? projectHeaderVisual}
          visualContract={visualContract}
          register="site-sans"
        />}
        {articleBody}
        {(
          <RelatedContent
            slugs={document.summary.relatedSlugs}
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
