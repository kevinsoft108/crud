import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import FetchService from '@services/Fetch.service';
import Login from '@components/auth/Login'

const handleSubmit = jest.fn(FetchService.isofetch)
const user = userEvent.setup()
const server = setupServer()

afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Login without email', async () => {
  render(<Router><Login /></Router>)
  await user.type(screen.getByLabelText(/Password/i), 'password')
  await user.click(screen.getByRole('button', {name: /Sign in/i}))
  expect(await screen.findByText('Required')).toBeInTheDocument()
  await waitFor(() => expect(handleSubmit).not.toHaveBeenCalled)
})

test('Login with invalid email', async () => {
  render(<Router><Login /></Router>)
  await user.type(screen.getByLabelText(/Email/i), 'invalid')
  await user.click(screen.getByRole('button', {name: /Sign in/i}))
  expect(await screen.findByText('Invalid email address')).toBeInTheDocument()
  await waitFor(() => expect(handleSubmit).not.toHaveBeenCalled)
})

test('Login without password', async () => {
  render(<Router><Login /></Router>)
  await user.type(screen.getByLabelText(/Email/i), 'test@example.com')
  await user.click(screen.getByRole('button', {name: /Sign in/i}))
  expect(await screen.findByText('Required')).toBeInTheDocument()
  await waitFor(() => expect(handleSubmit).not.toHaveBeenCalled)
})

test('Login with valid credential', async () => {
  server.use(
    rest.post('/login', (req, res, ctx) => {
      return res(
        ctx.delay(10),
        ctx.status(200, 'Success'),
        ctx.set({ 'Authorization': 'test'}),
        ctx.json({
          message: 'Logged in successfully.',
          payload: {
            id: 1,
            email: 'test@example.com',
            full_name: 'John Dee'
          }
        }),
      )
    })
  )
  server.listen()

  render(<Router><Login /><ToastContainer/></Router>)
  await user.type(screen.getByLabelText(/Email/i), 'test@example.com')
  await user.type(screen.getByLabelText(/Password/i), 'password')
  await user.click(screen.getByRole('button', {name: /Sign in/i}))

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalled,
    expect(await screen.findByText('Logged in successfully.')).toBeInTheDocument(),
  )
})

test('Login unauthorized', async () => {
  server.use(
    rest.post('/login', (req, res, ctx) => {
      return res(
        ctx.delay(10),
        ctx.status(401, 'Unauthorized'),
        ctx.json({
          error: 'Invalid Email or password.',
        }),
      )
    })
  )
  server.listen()

  render(<Router><Login /><ToastContainer/></Router>)
  await user.type(screen.getByLabelText(/Email/i), 'test@example.com')
  await user.type(screen.getByLabelText(/Password/i), 'password')
  await user.click(screen.getByRole('button', {name: /Sign in/i}))

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalled,
    expect(await screen.findByText('Invalid Email or password.')).toBeInTheDocument(),
  )
})