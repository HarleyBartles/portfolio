import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../PortfolioThemeProvider'
import { EditorialAside } from './EditorialAside'

test('renders the shared editorial aside as a collapsed native disclosure', () => {
  render(
    <PortfolioThemeProvider>
      <EditorialAside
        disclosureLabel="Read the supporting case"
        eyebrow="Applied evidence"
        precis="The compact point remains visible before the optional detail."
        title="A shared editorial aside"
      >
        <p>The optional supporting detail.</p>
      </EditorialAside>
    </PortfolioThemeProvider>,
  )

  const aside = screen.getByRole('complementary', { name: 'A shared editorial aside' })
  const disclosure = within(aside).getByText('Read the supporting case').closest('details') as HTMLDetailsElement

  expect(aside).toHaveAttribute('data-editorial-aside')
  expect(within(aside).getByText('Applied evidence')).toBeVisible()
  expect(within(aside).getByRole('heading', { level: 2, name: 'A shared editorial aside' })).toBeVisible()
  expect(within(aside).getByText('The compact point remains visible before the optional detail.')).toBeVisible()
  expect(within(aside).getByText('Read the supporting case')).toBeVisible()
  expect(disclosure).not.toHaveAttribute('open')
  expect(within(aside).getByText('The optional supporting detail.')).not.toBeVisible()

  fireEvent.click(within(aside).getByText('Read the supporting case'))

  expect(disclosure).toHaveAttribute('open')
  expect(within(aside).getByText('The optional supporting detail.')).toBeVisible()
})
