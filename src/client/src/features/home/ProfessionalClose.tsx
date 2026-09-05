import { Link } from 'react-router-dom'

export const ProfessionalClose = () => (
    <section className="home-movement home-professional-close" id="contact" aria-labelledby="home-professional-close-title" data-home-movement="professional-close" data-visual-contract="homepage-professional-close">
      <div className="home-frame home-professional-close-grid"><div className="home-professional-close-copy"><p className="home-eyebrow">Work with me</p><h2 id="home-professional-close-title">I've shown you how I work.</h2></div><div className="home-professional-close-actions"><p>If that looks like the kind of engineering you want on your team, I'd like to hear what you're building.</p><div className="home-action-row"><Link to="/contact">Tell me about it →</Link><Link to="/cv">Read my CV →</Link><Link className="home-about-link" to="/about">About me →</Link></div></div></div>
    </section>
  )
