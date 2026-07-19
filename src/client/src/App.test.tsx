import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import App from './App'

test('baseline app renders no portfolio content yet', () => {
  const markup = renderToStaticMarkup(<App />)

  expect(markup).toBe('')
})
