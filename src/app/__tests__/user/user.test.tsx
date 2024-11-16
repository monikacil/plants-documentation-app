import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import User from '@/app/user/[userId]/page'

test('User', () => {
  render(<User />)
  expect(screen.getByRole('heading', { level: 1, name: 'User Account' })).toBeDefined()
})
