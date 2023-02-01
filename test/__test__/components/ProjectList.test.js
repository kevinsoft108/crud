import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import {render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import Projects from '@components/projects/Projects'

const server = setupServer()

afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Projects fetch', async () => {
  server.use(
    rest.get('/api/v1/projects', (req, res, ctx) => {
      return res(
        ctx.json([
          { id: 1, title: 'Awesome Project' },
        ]),
      )
    })
  )
  server.listen()

  render(<Router><Projects /></Router>)

  await waitFor(() =>
    expect(screen.getByRole('link', {name: 'Awesome Project'})).toBeInTheDocument()
  )
})
