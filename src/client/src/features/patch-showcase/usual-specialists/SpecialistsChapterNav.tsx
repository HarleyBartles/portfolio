import type { ReactElement } from 'react'
import { ChapterNav, ChapterNavFuture, ChapterNavLink } from './SpecialistsChapterNav.styles'

export const SpecialistsChapterNav = (): ReactElement => (
  <ChapterNav aria-label="Specialist chapters" data-specialists-chapter-nav>
    <ChapterNavLink href="#index">Index</ChapterNavLink>
    <ChapterNavLink href="#silk">Silk</ChapterNavLink>
    <ChapterNavFuture>Writ</ChapterNavFuture>
    <ChapterNavFuture>Klause</ChapterNavFuture>
    <ChapterNavFuture>Rollback</ChapterNavFuture>
    <ChapterNavFuture>Receipt</ChapterNavFuture>
  </ChapterNav>
)
