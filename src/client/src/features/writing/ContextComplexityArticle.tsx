import { ArticleMarkdown } from './ArticleMarkdown'

type ContextComplexityArticleProps = {
  markdown: string
}

export const ContextComplexityArticle = ({ markdown }: ContextComplexityArticleProps) => {
  return <ArticleMarkdown markdown={markdown} />
}
