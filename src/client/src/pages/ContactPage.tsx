import { useEffect, useRef } from 'react'
import { useNavigationType } from 'react-router-dom'
import { DocumentMetadata, Eyebrow, PageLead, SiteLayout } from '../components'
import { EditorialHeading } from '../components/editorial'
import { siteRuntime } from '../data'
import { ContactForm, ContactSurface } from './contact'

export const ContactPage = () => {
  const surfaceRef = useRef<HTMLElement>(null)
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return

    const surface = surfaceRef.current
    if (surface === null) return

    surface.focus({ preventScroll: true })
    const reduceMotion =
      typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    surface.scrollIntoView?.({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [navigationType])

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Contact | Harley Bartles"
        description="Contact Harley Bartles about senior full-stack engineering roles, portfolio work or an interesting engineering problem through the configured privacy-preserving form."
        canonicalPath="/contact"
      />
      <ContactSurface ref={surfaceRef} tabIndex={-1} aria-labelledby="contact-title">
        <header>
          <Eyebrow>Contact</Eyebrow>
          <EditorialHeading as="h1" wrap="single-line" id="contact-title">
            Get in touch.
          </EditorialHeading>
          <PageLead>
            If you're hiring, want to ask about something on the site, or just have an interesting engineering problem,
            send me a note.
          </PageLead>
        </header>
        <ContactForm endpoint={siteRuntime.contactFormEndpoint} />
      </ContactSurface>
    </SiteLayout>
  )
}
