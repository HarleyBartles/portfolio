import styled from 'styled-components'

export const SPECIALISTS_CHAPTER_NAV_HEIGHT = 44

export const ChapterNav = styled.nav`
  position: relative;
  z-index: 70;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  height: ${SPECIALISTS_CHAPTER_NAV_HEIGHT}px;
  border-block: 1px solid rgb(104 101 93 / 78%);
  background: var(--color-interior-canvas);
`

const tabStyles = `
  display: grid;
  min-width: 0;
  padding-inline: 8px;
  place-items: center;
  border-right: 1px solid rgb(170 163 148 / 78%);
  color: var(--specialists-ink);
  font-family: var(--font-site-sans);
  font-size: .76rem;
  font-weight: 800;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
`

export const ChapterNavLink = styled.a`
  ${tabStyles}

  &:last-child {
    border-right: 0;
  }
`

export const ChapterNavFuture = styled.span`
  ${tabStyles}
  cursor: default;

  &:last-child {
    border-right: 0;
  }
`
