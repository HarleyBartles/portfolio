import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { RepresentativeLabs } from './RepresentativeLabs'

describe('RepresentativeLabs', () => {
  test('uses three different experiments to prove engineering judgment', () => {
    const { container } = render(<RepresentativeLabs />)
    const cases = Array.from(container.querySelectorAll<HTMLElement>('.representative-lab'))
    expect(cases.map((item) => item.dataset.lab)).toEqual(['3', '5', '7'])
    for (const item of cases) {
      expect(item).toHaveTextContent(/learner problem/i)
      expect(item).toHaveTextContent(/designed pressure/i)
      expect(item).toHaveTextContent(/safe experiment/i)
      expect(item).toHaveTextContent(/earned model/i)
      expect(item).toHaveTextContent(/consequence/i)
    }
    expect(container.textContent?.match(/tears in the rain/g)).toHaveLength(1)
    expect(container.textContent?.match(/model \+ harness \+ instructions\/settings \+ context \+ tools \+ environment\/state \+ feedback = observed behaviour/g)).toHaveLength(1)
    expect(container).toHaveTextContent(/software engineering.*creative writing.*technical drawing/i)
    expect(screen.queryByRole('heading', { name: /lab 4/i })).not.toBeInTheDocument()

    const authorityImage = screen.getByRole('img', { name: /three connected work zones move from engineer-led inspection/i })
    expect(authorityImage).toHaveAttribute('src', '/media/learning-lab/authority-transfer-mobile-720.webp')
    expect(authorityImage).toHaveAttribute('width', '720')
    expect(authorityImage).toHaveAttribute('height', '461')
    expect(authorityImage).toHaveAttribute('loading', 'lazy')
    expect(authorityImage.closest('picture')?.querySelectorAll('source')).toHaveLength(4)
  })
})
