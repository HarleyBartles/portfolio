import { useState, type FormEvent } from 'react'
import styled from 'styled-components'
import { professionalProfile } from '../../data'
import { ActionButton, Eyebrow } from '../../components/content/PublicationPrimitives'
import { ExternalLink } from '../../components/ExternalLink'

type ContactFormProps = {
  endpoint?: string
}

type SubmissionState = 'idle' | 'submitting' | 'sent' | 'error'

const Form = styled.form`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-6);
  @media (max-width: 30rem) {
    grid-template-columns: 1fr;
  }
`
const Field = styled.div<{ $message?: boolean }>`
  display: grid;
  gap: var(--space-2);
  ${({ $message }) => ($message ? 'grid-column: 1 / -1;' : '')}
  label {
    font-family: var(--font-site-sans);
    font-size: var(--type-metadata-size);
    font-weight: 700;
  }
  input,
  textarea {
    width: 100%;
    border: 1px solid var(--color-ink);
    border-radius: 0;
    background: rgb(255 250 240 / 72%);
    padding: var(--space-4);
    color: var(--color-ink);
    font: inherit;
  }
  textarea {
    resize: vertical;
  }
  input:focus,
  textarea:focus {
    outline: 3px solid var(--color-focus);
    outline-offset: 2px;
  }
`
const Honeypot = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`
const SubmitArea = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
  align-items: center;
  p {
    max-width: 35rem;
    margin: 0;
    color: var(--color-muted);
  }
  [role='alert'] {
    color: var(--color-accent);
  }
`
const Privacy = styled.p`
  flex-basis: 100%;
  font-size: 0.92rem;
`
const Warning = styled.span`
  display: block;
  margin-top: var(--space-2);
`
const DisconnectedEyebrow = styled(Eyebrow)`
  margin-bottom: var(--space-4);
`
const Disconnected = styled.aside`
  align-self: start;
  border: 1px solid var(--color-ink);
  background: var(--color-accent-soft);
  padding: clamp(var(--space-6), 5vw, var(--space-10));
  h3 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3.5vw, 3rem);
    line-height: 0.98;
    letter-spacing: -0.045em;
    text-wrap: balance;
  }
  > p:last-child {
    margin-bottom: 0;
  }
`

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
      <Disconnected aria-labelledby="contact-disconnected-title">
        <DisconnectedEyebrow>Delivery status / disconnected</DisconnectedEyebrow>
        <h3 id="contact-disconnected-title">Contact delivery is not connected yet.</h3>
        <p>
          I will not publish a personal address or pretend a form goes somewhere when it does not. For now, the honest
          routes are my <ExternalLink href={github.href}>GitHub profile</ExternalLink> and{' '}
          <ExternalLink href={linkedin.href}>{linkedin.label}</ExternalLink>.
        </p>
      </Disconnected>
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
    <Form onSubmit={handleSubmit}>
      <Field>
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" type="text" autoComplete="name" maxLength={100} required />
      </Field>
      <Field>
        <label htmlFor="contact-email">Reply email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required />
      </Field>
      <Field $message>
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows={7} maxLength={5000} required />
      </Field>
      <Honeypot aria-hidden="true">
        <label htmlFor="contact-gotcha">Leave this field empty</label>
        <input id="contact-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </Honeypot>
      <SubmitArea>
        <ActionButton type="submit" disabled={submissionState === 'submitting'}>
          {submissionState === 'submitting' ? 'Sending…' : submissionState === 'error' ? 'Try again' : 'Send message'}
        </ActionButton>
        <Privacy>
          Your name, reply email, and message are sent to Formspree for delivery. I use them only to reply. Formspree
          processes submissions under its{' '}
          <ExternalLink href="https://formspree.io/legal/privacy-policy/">privacy policy</ExternalLink>
          <Warning>Do not send sensitive personal information.</Warning>
        </Privacy>
        {submissionState === 'sent' ? <p role="status">Message sent. Thank you.</p> : null}
        {submissionState === 'error' ? (
          <p role="alert">I could not send that message. Your text is still here; please try again.</p>
        ) : null}
      </SubmitArea>
    </Form>
  )
}
