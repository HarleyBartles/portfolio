import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ExternalLink } from '../ExternalLink'
import { SiteFrame } from './SiteFrame'

const Footer = styled(SiteFrame).attrs({ as: 'footer' })`
  border-top: 1px solid rgb(31 36 31 / 22%);
  padding-block: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.color.muted};

  @media print {
    display: none !important;
  }
`

const FooterLinks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg};
  padding: 0;
  list-style: none;

  @media (max-width: 30rem) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 ${({ theme }) => theme.space.md};

  }
`

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.color.ink};
  font-family: ${({ theme }) => theme.font.code};
  font-size: .78rem;
  font-weight: 700;

  @media (max-width: 30rem) {
    display: flex;
    min-height: 2.75rem;
    align-items: center;
  }
`

const FooterCopyright = styled.p`
  margin: ${({ theme }) => theme.space.xl} 0 0;
  font-family: ${({ theme }) => theme.font.code};
  font-size: .72rem;
`

export const SiteFooter = () => {
  return (
    <Footer className="site-footer" data-site-frame>
      <FooterLinks className="footer-links" aria-label="Footer links">
        <li><ExternalLink appearance="footer" href="https://github.com/HarleyBartles">GitHub</ExternalLink></li>
        <li><FooterLink to="/projects">Projects</FooterLink></li>
        <li><FooterLink to="/writing">Writing</FooterLink></li>
        <li><FooterLink to="/about">About</FooterLink></li>
        <li><FooterLink to="/cv">CV</FooterLink></li>
        <li><FooterLink to="/contact">Contact</FooterLink></li>
      </FooterLinks>
      <FooterCopyright className="footer-copyright">© 2026 Harley Bartles.</FooterCopyright>
    </Footer>
  )
}
