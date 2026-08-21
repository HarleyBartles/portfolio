import { useState, type FormEvent, type ReactElement } from 'react'

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

export function ContactForm({ endpoint }: ContactFormProps): ReactElement {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')

  if (!isSafeEndpoint(endpoint)) {
    return (
      <aside className="contact-disconnected" aria-labelledby="contact-disconnected-title">
        <p className="eyebrow">Delivery status / disconnected</p>
        <h3 id="contact-disconnected-title">Contact delivery is not connected yet.</h3>
        <p>
          I will not publish a personal address or pretend a form goes somewhere when it does not.
          For now, the honest route is my{' '}
          <a href="https://github.com/HarleyBartles" rel="noreferrer noopener" target="_blank">
            GitHub profile
          </a>.
        </p>
      </aside>
    )
  }

  const safeEndpoint = endpoint

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
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
        <input id="contact-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="contact-field">
        <label htmlFor="contact-email">Reply email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="contact-field contact-field--message">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows={7} required />
      </div>
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-company-website">Leave this field empty</label>
        <input id="contact-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="contact-submit">
        <button className="button-link" type="submit" disabled={submissionState === 'submitting'}>
          {submissionState === 'submitting' ? 'Sending…' : submissionState === 'error' ? 'Try again' : 'Send message'}
        </button>
        {submissionState === 'sent' ? <p role="status">Message sent. Thank you—I will reply to the address you supplied.</p> : null}
        {submissionState === 'error' ? <p role="alert">I could not send that message. Your text is still here; please try again.</p> : null}
      </div>
    </form>
  )
}
