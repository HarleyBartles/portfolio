import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ExternalLink } from './ExternalLink'

const Footer = styled.footer`
  width: min(calc(100% - ${({ theme }) => theme.space.lg} - ${({ theme }) => theme.space.lg}), ${({ theme }) => theme.layout.maxWidth});
  margin-inline: auto;
  border-top: 1px solid rgb(31 36 31 / 22%);
  padding-block: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.color.muted};

  @media (max-width: 46rem) {
    width: min(calc(100% - ${({ theme }) => theme.space.md} - ${({ theme }) => theme.space.md}), ${({ theme }) => theme.layout.maxWidth});
  }
`

const FooterLinks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg};
  padding: 0;
  list-style: none;

  a {
    color: ${({ theme }) => theme.color.ink};
    font-family: ${({ theme }) => theme.font.code};
    font-size: .78rem;
    font-weight: 700;
  }
`

const FooterCopyright = styled.p`
  margin: ${({ theme }) => theme.space.xl} 0 0;
  font-family: ${({ theme }) => theme.font.code};
  font-size: .72rem;
`

export const SiteFooter = () => {
  return (
    <Footer className="site-footer">
      <FooterLinks className="footer-links" aria-label="Footer links">
        <li><ExternalLink href="https://github.com/HarleyBartles">GitHub</ExternalLink></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/writing">Writing</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/cv">CV</Link></li>
      </FooterLinks>
      <FooterCopyright className="footer-copyright">© 2026 Harley Bartles.</FooterCopyright>
    </Footer>
  )
}
