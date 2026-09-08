import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { HomeEyebrow, HomeFrame } from './HomePrimitives'

const ProfessionalCloseMovement = styled.section`
  position: relative;
  padding: clamp(86px, 11vw, 150px) 0;
  border-bottom: 0;
`

const ProfessionalCloseGrid = styled(HomeFrame)`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 28px;
  align-items: end;

  @media (max-width: 800px) {
    display: block;
  }
`

const ProfessionalCloseCopy = styled.div`
  grid-column: 1 / span 7;

  h2 {
    max-width: 12ch;
    margin: 10px 0 0;
    font-size: clamp(42px, 5.4vw, 72px);
    line-height: .98;
    letter-spacing: -.025em;
  }
`

const ProfessionalCloseActions = styled.div`
  grid-column: 9 / span 4;
  padding-top: 18px;
  border-top: 1px solid var(--rule-strong);

  p {
    margin: 0 0 18px;
    font-size: 18px;
    line-height: 1.55;
  }

  @media (max-width: 800px) {
    margin-top: 42px;
  }
`

const ProfessionalActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 22px;

  a {
    font-weight: 650;
  }
`

const ProfessionalAboutLink = styled(Link)`
  color: var(--muted);
`

export const ProfessionalClose = () => (
  <ProfessionalCloseMovement id="contact" aria-labelledby="home-professional-close-title" data-home-movement="professional-close" data-visual-contract="homepage-professional-close">
    <ProfessionalCloseGrid>
      <ProfessionalCloseCopy>
        <HomeEyebrow>Work with me</HomeEyebrow>
        <h2 id="home-professional-close-title">I've shown you how I work.</h2>
      </ProfessionalCloseCopy>
      <ProfessionalCloseActions>
        <p>If that looks like the kind of engineering you want on your team, I'd like to hear what you're building.</p>
        <ProfessionalActionRow>
          <Link to="/contact">Tell me about it →</Link>
          <Link to="/cv">Read my CV →</Link>
          <ProfessionalAboutLink to="/about">About me →</ProfessionalAboutLink>
        </ProfessionalActionRow>
      </ProfessionalCloseActions>
    </ProfessionalCloseGrid>
  </ProfessionalCloseMovement>
  )
