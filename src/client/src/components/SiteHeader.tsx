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
`

const Header = styled(SiteFrame).attrs({ as: 'header' })`
  position: relative;
  z-index: 10;
  display: flex;
  gap: ${({ theme }) => theme.space.lg};
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(31 36 31 / 16%);
  padding-block: ${({ theme }) => theme.space.m};

  @media (max-width: 46rem) {
    align-items: flex-start;
  }

  @media (max-width: 30rem) {
    flex-direction: column;
  }
`

const SiteMark = styled(NavLink)<{ $showName: boolean }>`
  display: ${({ $showName }) => $showName ? 'flex' : 'block'};
  min-width: ${({ $showName }) => $showName ? '0' : 'auto'};
  max-width: ${({ $showName }) => $showName ? '100%' : 'none'};
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
`

const PrimaryNav = styled.nav`
  min-width: 0;

  @media (max-width: 46rem) {
    flex: 1;
  }
`

const PrimaryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.lg};
  justify-content: flex-end;
  padding: 0;
  list-style: none;

  @media (max-width: 46rem) {
    gap: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
  }

  @media (max-width: 20rem) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 15rem) {
    column-gap: ${({ theme }) => theme.space.xs};
  }
`

const PrimaryLink = styled(NavLink)<{ $interior: boolean }>`
  position: relative;
  padding-block: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.color.ink};
  font-family: ${({ $interior, theme }) => $interior ? theme.font.siteSans : theme.font.code};
  font-size: ${({ $interior, theme }) => $interior ? theme.type.metadataSize : '0.82rem'};
  font-weight: ${({ $interior }) => $interior ? 600 : 700};
  letter-spacing: ${({ $interior }) => $interior ? '.012em' : '.035em'};
  text-decoration: none;

  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: ${({ $interior, theme }) => $interior ? theme.color.ink : theme.color.accent};
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
`

export const SiteHeader = ({ showName = false }: { showName?: boolean }) => {
  return (
    <>
      <SkipLink className="skip-link" href="#main-content">
        Skip to content
      </SkipLink>
      <Header className="site-header" data-site-frame>
        <SiteMark className="site-mark" to="/" aria-label="Harley Bartles, home" $showName={showName}>
          <img
            src={`${import.meta.env.BASE_URL}brand/hb-mark.svg`}
            alt=""
            width="52"
            height="52"
            data-mark-background="mineral"
          />
          {showName ? <SiteIdentityName className="site-identity-name">Harley Bartles</SiteIdentityName> : null}
        </SiteMark>
        <PrimaryNav aria-label="Primary">
          <PrimaryList>
            {primaryLinks.map((link) => (
              <li key={link.to}>
                <PrimaryLink $interior={showName} to={link.to}>{link.label}</PrimaryLink>
              </li>
            ))}
          </PrimaryList>
        </PrimaryNav>
      </Header>
    </>
  )
}
