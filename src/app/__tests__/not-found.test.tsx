import { expect, test } from 'vitest'
import { render, screen, within  } from '@testing-library/react'

import NotFound from './../not-found'

test('NotFound', () => {
  render(<NotFound />)
  const main = within(screen.getByRole("main"));
  expect(
    main.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeDefined();
})
