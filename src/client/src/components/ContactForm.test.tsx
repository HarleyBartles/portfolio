import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { ContactForm } from './ContactForm'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('ContactForm', () => {
  test.each([undefined, '', 'http://forms.example.test/contact', 'not-a-url'])(
    'keeps delivery disconnected for a missing or unsafe endpoint: %s',
    (endpoint) => {
      render(<ContactForm endpoint={endpoint} />)

      expect(screen.getByText(/contact delivery is not connected yet/i)).toBeVisible()
      expect(screen.getByRole('link', { name: /github profile/i })).toHaveAttribute(
        'href',
        'https://github.com/HarleyBartles',
      )
      expect(screen.queryByRole('button', { name: /send message/i })).not.toBeInTheDocument()
    },
  )

  test('renders required fields and a bot honeypot only for an HTTPS endpoint', () => {
    const { container } = render(<ContactForm endpoint="https://forms.example.test/contact" />)

    expect(screen.getByLabelText('Name')).toBeRequired()
    expect(screen.getByLabelText('Reply email')).toBeRequired()
    expect(screen.getByLabelText('Message')).toBeRequired()
    expect(container.querySelector('input[name="company_website"]')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled()
  })

  test('submits the form and confirms delivery without exposing an address', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
    vi.stubGlobal('fetch', fetchMock)
    render(<ContactForm endpoint="https://forms.example.test/contact" />)

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
    expect(body.get('name')).toBe('Ada Lovelace')
    expect(body.get('email')).toBe('ada@example.test')
    expect(body.get('message')).toContain('reliable agent workflow')
    expect(screen.getByRole('status')).toHaveTextContent(/message sent/i)
  })

  test('keeps the visitor in control when delivery fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 503 })))
    render(<ContactForm endpoint="https://forms.example.test/contact" />)

    await userEvent.type(screen.getByLabelText('Name'), 'Grace Hopper')
    await userEvent.type(screen.getByLabelText('Reply email'), 'grace@example.test')
    await userEvent.type(screen.getByLabelText('Message'), 'Can we talk about the project?')
    await userEvent.click(screen.getByRole('button', { name: 'Send message' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/could not send/i)
    expect(screen.getByRole('button', { name: 'Try again' })).toBeEnabled()
  })
})
