import { expect, test } from 'vitest'
import App from './App'

test('baseline app renders no portfolio content yet', () => {
  expect(App()).toBeNull()
})
