import { useState, type FormEvent } from 'react'
import { professionalProfile } from '../data'
import { ExternalLink } from './ExternalLink'

type ContactFormProps = {
  endpoint?: string
}

type SubmissionState = 'idle' | 'submitting' | 'sent' | 'error'

function isSafeEndpoint(endpoint: string | undefined): endpoint is string {
  if (endpoint === undefined || endpoint.trim() === '') return false

  try {
    return new URL(endpoint).protocol === 'https:'
  } catch {
    return false
  }
}

export const ContactForm = ({ endpoint }: ContactFormProps) => {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')

  if (!isSafeEndpoint(endpoint)) {
    const { github, linkedin } = professionalProfile.publicLinks

    return (
      <aside className="contact-disconnected" aria-labelledby="contact-disconnected-title">
        <p className="eyebrow">Delivery status / disconnected</p>
        <h3 id="contact-disconnected-title">Contact delivery is not connected yet.</h3>
        <p>
          I will not publish a personal address or pretend a form goes somewhere when it does not.
          For now, the honest routes are my{' '}
          <ExternalLink href={github.href}>
            GitHub profile
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href={linkedin.href}>
            {linkedin.label}
          </ExternalLink>.
        </p>
      </aside>
    )
  }

  const safeEndpoint = endpoint

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    if (submissionState === 'submitting') return

    const form = event.currentTarget
    const formData = new FormData(form)
    setSubmissionState('submitting')

    try {
      const response = await fetch(safeEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (!response.ok) throw new Error('Contact delivery failed')

      form.reset()
      setSubmissionState('sent')
    } catch {
      setSubmissionState('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-field">
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" type="text" autoComplete="name" maxLength={100} required />
      </div>
      <div className="contact-field">
        <label htmlFor="contact-email">Reply email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required />
      </div>
      <div className="contact-field contact-field--message">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows={7} maxLength={5000} required />
      </div>
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-gotcha">Leave this field empty</label>
        <input id="contact-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="contact-submit">
        <button className="button-link" type="submit" disabled={submissionState === 'submitting'}>
          {submissionState === 'submitting' ? 'Sending…' : submissionState === 'error' ? 'Try again' : 'Send message'}
        </button>
        <p className="contact-privacy">
          Your name, reply email, and message are sent to Formspree for delivery. I use them only to reply. Formspree processes submissions under its{' '}
          <ExternalLink href="https://formspree.io/legal/privacy-policy/">privacy policy</ExternalLink>
          <span className="contact-privacy__warning">Do not send sensitive personal information.</span>
        </p>
        {submissionState === 'sent' ? <p role="status">Message sent. Thank you.</p> : null}
        {submissionState === 'error' ? <p role="alert">I could not send that message. Your text is still here; please try again.</p> : null}
      </div>
    </form>
  )
}
