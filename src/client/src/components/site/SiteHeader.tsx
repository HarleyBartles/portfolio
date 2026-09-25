import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { SiteFrame } from './SiteFrame'

const primaryLinks = [
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
  { to: '/patch', label: 'Patch' },
  { to: '/about', label: 'About' },
  { to: '/cv', label: 'CV' },
  { to: '/contact', label: 'Contact' },
] as const

const SkipLink = styled.a`
  position: fixed;
  z-index: 100;
  top: ${({ theme }) => theme.space.sm};
  left: ${({ theme }) => theme.space.sm};
  transform: translateY(-180%);
  background: ${({ theme }) => theme.color.ink};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.color.surface};
  font-family: ${({ theme }) => theme.font.code};
  font-weight: 700;

  &:focus {
    transform: translateY(0);
  }

  @media print {
    display: none !important;
  }
`

const Header = styled(SiteFrame).attrs({ as: 'header' })`
  width: min(
    calc(100% - 2 * clamp(${({ theme }) => theme.space.md}, 3.26vw, ${({ theme }) => theme.space.lg})),
    ${({ theme }) => theme.layout.maxWidth}
  );
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${({ theme }) => theme.space.lg};
  align-items: center;
  border-bottom: 1px solid rgb(31 36 31 / 16%);
  padding-block: ${({ theme }) => theme.space.m};

  @media print {
    display: none !important;
  }

  @media (max-width: 34rem) {
    grid-template-columns: auto 1fr auto;
    gap: ${({ theme }) => theme.space.md};
  }
`

const SiteMark = styled(NavLink)`
  display: flex;
  min-width: 0;
  max-width: 100%;
  flex: 0 0 auto;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.color.ink};
  text-decoration: none;
  transition: transform ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.easeOut};

  img {
    width: 3.25rem;
    height: 3.25rem;
  }

  &:hover {
    transform: rotate(-2deg);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`

const SiteIdentityName = styled.span`
  min-width: 0;
  overflow-wrap: anywhere;
  color: ${({ theme }) => theme.color.ink};
  font-family: ${({ theme }) => theme.font.siteSans};
  font-size: ${({ theme }) => theme.type.metadataSize};
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: .012em;

  @media (max-width: 19rem) {
    display: none;
  }
`

const MenuButton = styled.button`
  display: none;

  @media (max-width: 34rem) {
    display: flex;
    width: 3.25rem;
    height: 3.25rem;
    grid-column: 3;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border: 2px solid ${({ theme }) => theme.color.ink};
    padding: 0;
    background: transparent;
    color: ${({ theme }) => theme.color.ink};
    cursor: pointer;

    span {
      width: 21px;
      height: 2px;
      background: currentColor;
      transition: transform ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.easeOut},
        opacity ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.easeOut};
    }

    &[aria-expanded='true'] span:first-child {
      transform: translateY(7px) rotate(45deg);
    }

    &[aria-expanded='true'] span:nth-child(2) {
      opacity: 0;
    }

    &[aria-expanded='true'] span:last-child {
      transform: translateY(-7px) rotate(-45deg);
    }

    @media (prefers-reduced-motion: reduce) {
      span {
        transition: none;
      }
    }
  }
`

const PrimaryNav = styled.nav<{ $open: boolean }>`
  min-width: 0;
  grid-column: 3;

  @media (max-width: 34rem) {
    display: ${({ $open }) => $open ? 'block' : 'none'};
    grid-column: 1 / -1;
    grid-row: 2;
    width: 100%;
  }
`

const PrimaryList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  gap: ${({ theme }) => theme.space.xs} clamp(${({ theme }) => theme.space.md}, 2.2vw, ${({ theme }) => theme.space.lg});
  justify-content: flex-end;
  padding: 0;
  list-style: none;

  @media (max-width: 34rem) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    border-top: 1px solid ${({ theme }) => theme.color.border};

    li {
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
    }

    li:last-child {
      border-bottom: 0;
    }
  }
`

const PrimaryLink = styled(NavLink)`
  position: relative;
  padding-block: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.color.ink};
  font-family: ${({ theme }) => theme.font.siteSans};
  font-size: ${({ theme }) => theme.type.metadataSize};
  font-weight: 600;
  letter-spacing: .012em;
  text-decoration: none;

  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: ${({ theme }) => theme.color.ink};
    content: '';
    transform: scaleX(0);
    transform-origin: right;
    transition: transform ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.easeOut};
  }

  &:hover::after,
  &[aria-current='page']::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  @media (max-width: 15rem) {
    font-size: .75rem;
    letter-spacing: .015em;
  }

  @media (max-width: 34rem) {
    display: block;
    min-height: 3.5rem;
    padding: .7rem ${({ theme }) => theme.space.sm};
    font-family: ${({ theme }) => theme.font.siteSans};
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: 0;
    text-align: left;

    &::after {
      top: .7rem;
      right: auto;
      bottom: .7rem;
      left: 0;
      width: 3px;
      height: auto;
      transform: scaleY(0);
      transform-origin: center;
    }

    &:hover::after,
    &[aria-current='page']::after {
      transform: scaleY(1);
    }
  }
`

export const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!window.matchMedia) return
    const compact = window.matchMedia('(max-width: 34rem)')
    const closeOnWide = () => {
      if (!compact.matches) setMenuOpen(false)
    }
    compact.addEventListener('change', closeOnWide)
    return () => compact.removeEventListener('change', closeOnWide)
  }, [])

  const handleEscape = (event: React.KeyboardEvent) => {
    if (event.key !== 'Escape' || !menuOpen) return
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <>
      <SkipLink className="skip-link" href="#main-content">
        Skip to content
      </SkipLink>
      <Header className="site-header" data-site-frame onKeyDown={handleEscape}>
        <SiteMark className="site-mark" to="/" aria-label="Harley Bartles, home">
          <img
            src={`${import.meta.env.BASE_URL}brand/hb-mark.svg`}
            alt=""
            width="52"
            height="52"
            data-mark-background="mineral"
          />
          <SiteIdentityName className="site-identity-name">Harley Bartles</SiteIdentityName>
        </SiteMark>
        <MenuButton
          ref={menuButtonRef}
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="site-primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" data-menu-icon={menuOpen ? 'close' : 'open'} />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </MenuButton>
        <PrimaryNav id="site-primary-navigation" aria-label="Primary" $open={menuOpen}>
          <PrimaryList>
            {primaryLinks.map((link) => (
              <li key={link.to}>
                <PrimaryLink to={link.to} onClick={() => setMenuOpen(false)}>{link.label}</PrimaryLink>
              </li>
            ))}
          </PrimaryList>
        </PrimaryNav>
      </Header>
    </>
  )
}
