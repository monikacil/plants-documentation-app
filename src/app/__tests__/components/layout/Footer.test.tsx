import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import Footer from './../../components/layout/Footer'

test('Footer', () => {
  render(<Footer />)
  expect(screen.getByRole('heading', { level: 3, name: 'Footer' })).toBeDefined()
})
