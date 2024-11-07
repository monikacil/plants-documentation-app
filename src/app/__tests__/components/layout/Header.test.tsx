import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import Header from './../../components/layout/Header'

test('Header', () => {
  render(<Header />)
  expect(screen.getByRole('heading', { level: 2, name: 'Header' })).toBeDefined()
})
