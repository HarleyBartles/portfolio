import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { ContactForm } from './ContactForm'
import { PortfolioThemeProvider } from '../../components/PortfolioThemeProvider'

const renderContactForm = (endpoint?: string) =>
  render(
    <PortfolioThemeProvider>
      <ContactForm endpoint={endpoint} />
    </PortfolioThemeProvider>,
  )

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('ContactForm', () => {
  test.each([undefined, '', 'http://forms.example.test/contact', 'not-a-url'])(
    'keeps delivery disconnected for a missing or unsafe endpoint: %s',
    (endpoint) => {
      renderContactForm(endpoint)

      expect(screen.getByText('Delivery status / disconnected')).toHaveAttribute('data-eyebrow')
      expect(screen.getByText(/contact delivery is not connected yet/i)).toBeVisible()
      expect(screen.getByRole('link', { name: /github profile/i })).toHaveAttribute(
        'href',
        'https://github.com/HarleyBartles',
      )
      expect(screen.getByRole('link', { name: 'LinkedIn: Harley Bartles (opens in a new tab)' })).toHaveAttribute(
        'href',
        'https://www.linkedin.com/in/harley-bartles-92326110/',
      )
      expect(screen.queryByRole('button', { name: /send message/i })).not.toBeInTheDocument()
    },
  )

  test('renders bounded required fields, privacy notice, and a Formspree honeypot only for an HTTPS endpoint', () => {
    const { container } = renderContactForm('https://forms.example.test/contact')

    expect(screen.getByLabelText('Name')).toBeRequired()
    expect(screen.getByLabelText('Name')).toHaveAttribute('maxlength', '100')
    expect(screen.getByLabelText('Name')).toHaveAttribute('title', 'So I know what to call you')
    expect(screen.getByLabelText('Reply email')).toBeRequired()
    expect(screen.getByLabelText('Reply email')).toHaveAttribute('maxlength', '254')
    expect(screen.getByLabelText('Reply email')).toHaveAttribute('title', 'So I know where to reply to')
    expect(screen.getByLabelText('Message')).toBeRequired()
    expect(screen.getByLabelText('Message')).toHaveAttribute('maxlength', '5000')
    expect(screen.getByLabelText('Message')).toHaveAttribute('title', "So I know what we're talking about")
    const honeypot = container.querySelector('input[name="_gotcha"]')
    expect(honeypot).toBeInTheDocument()
    expect(honeypot).toHaveAttribute('tabindex', '-1')
    expect(honeypot?.parentElement).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute(
      'href',
      'https://formspree.io/legal/privacy-policy/',
    )
    const privacyWarning = screen.getByText('Do not send sensitive personal information.')
    expect(privacyWarning).toBeVisible()
    expect(privacyWarning.parentElement?.innerHTML).not.toContain('</a>.')
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled()
  })

  test('uses contextual native validation messages and clears them when a field changes', () => {
    renderContactForm('https://forms.example.test/contact')

    const name = screen.getByLabelText('Name')
    fireEvent.invalid(name)
    expect(name).toHaveProperty('validationMessage', 'So I know what to call you')

    fireEvent.input(name, { target: { value: 'Ada' } })
    expect(name).toHaveProperty('validationMessage', '')
  })

  test('submits the form and confirms delivery without exposing an address', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
    vi.stubGlobal('fetch', fetchMock)
    renderContactForm('https://forms.example.test/contact')

    await userEvent.type(screen.getByLabelText('Name'), 'Ada Lovelace')
    await userEvent.type(screen.getByLabelText('Reply email'), 'ada@example.test')
    await userEvent.type(screen.getByLabelText('Message'), 'I would like to discuss a reliable agent workflow.')
    await userEvent.click(screen.getByRole('button', { name: 'Send message' }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce())
    expect(fetchMock).toHaveBeenCalledWith(
      'https://forms.example.test/contact',
      expect.objectContaining({ method: 'POST' }),
    )
    const request = fetchMock.mock.calls[0]?.[1] as RequestInit
    const body = request.body as FormData
    expect([...body.keys()].sort()).toEqual(['_gotcha', 'email', 'message', 'name'])
    expect(body.get('name')).toBe('Ada Lovelace')
    expect(body.get('email')).toBe('ada@example.test')
    expect(body.get('message')).toContain('reliable agent workflow')
    expect(body.get('_gotcha')).toBe('')
    expect(screen.getByRole('status')).toHaveTextContent(/message sent/i)
    expect(screen.getByLabelText('Name')).toHaveValue('')
    expect(screen.getByLabelText('Reply email')).toHaveValue('')
    expect(screen.getByLabelText('Message')).toHaveValue('')
  })

  test('disables only the submit control and prevents duplicate delivery while sending', async () => {
    let resolveDelivery: ((response: Response) => void) | undefined
    const fetchMock = vi.fn().mockImplementation(
      () =>
        new Promise<Response>((resolve) => {
          resolveDelivery = resolve
        }),
    )
    vi.stubGlobal('fetch', fetchMock)
    renderContactForm('https://forms.example.test/contact')

    await userEvent.type(screen.getByLabelText('Name'), 'Dorothy Vaughan')
    await userEvent.type(screen.getByLabelText('Reply email'), 'dorothy@example.test')
    await userEvent.type(screen.getByLabelText('Message'), 'I would like to discuss dependable systems.')
    await userEvent.click(screen.getByRole('button', { name: 'Send message' }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce())
    const pendingButton = screen.getByRole('button', { name: 'Sending…' })
    expect(pendingButton).toBeDisabled()
    expect(pendingButton).toHaveStyle({ cursor: 'wait', opacity: '.62' })
    expect(screen.getByLabelText('Name')).toBeEnabled()
    expect(screen.getByLabelText('Reply email')).toBeEnabled()
    expect(screen.getByLabelText('Message')).toBeEnabled()
    await userEvent.click(screen.getByRole('button', { name: 'Sending…' }))
    expect(fetchMock).toHaveBeenCalledOnce()

    resolveDelivery?.(new Response(null, { status: 204 }))
    expect(await screen.findByRole('status')).toHaveTextContent(/message sent/i)
  })

  test('keeps the visitor in control when delivery fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 503 })))
    renderContactForm('https://forms.example.test/contact')

    await userEvent.type(screen.getByLabelText('Name'), 'Grace Hopper')
    await userEvent.type(screen.getByLabelText('Reply email'), 'grace@example.test')
    await userEvent.type(screen.getByLabelText('Message'), 'Can we talk about the project?')
    await userEvent.click(screen.getByRole('button', { name: 'Send message' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/could not send/i)
    expect(screen.getByRole('button', { name: 'Try again' })).toBeEnabled()
    expect(screen.getByLabelText('Name')).toHaveValue('Grace Hopper')
    expect(screen.getByLabelText('Reply email')).toHaveValue('grace@example.test')
    expect(screen.getByLabelText('Message')).toHaveValue('Can we talk about the project?')
  })
})
