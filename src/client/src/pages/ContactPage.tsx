import { DocumentMetadata, PageLead, SiteLayout } from '../components'
import { EditorialHeading } from '../components/editorial'
import { siteRuntime } from '../data'
import { ContactForm, ContactSurface } from './contact'

export const ContactPage = () => {
  return (
    <SiteLayout>
      <DocumentMetadata canonicalPath="/contact" />
      <ContactSurface aria-labelledby="contact-title" data-visual-contract="contact-route">
        <header>
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
