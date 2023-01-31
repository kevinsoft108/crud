import React from 'react'
import { ToastContainer } from 'react-toastify';
import {render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import FetchService from '@services/Fetch.service';
import Register from '@components/auth/Register'

const handleSubmit = jest.fn(FetchService.isofetch)
const onSuccess = jest.fn()
const user = userEvent.setup()
const server = setupServer()

afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Register without input', async () => {
  render(<Register />)
  await user.click(screen.getByRole('button', {name: /Sign Up/i}))
  expect((await screen.findAllByText('Required')).length).toEqual(5)
  expect(await screen.findByText('Agreement required')).toBeInTheDocument()
  await waitFor(() => expect(handleSubmit).not.toHaveBeenCalled)
})

test('Register with invalid email', async () => {
  render(<Register />)
  await user.type(screen.getByLabelText(/Email/i), 'invalid')
  await user.click(screen.getByRole('button', {name: /Sign Up/i}))
  expect(await screen.findByText('Invalid email address')).toBeInTheDocument()
  await waitFor(() => expect(handleSubmit).not.toHaveBeenCalled)
})

test('Register password mismatch', async () => {
  render(<Register />)
  await user.type(screen.getByLabelText(/Password/i), 'password')
  await user.type(screen.getByLabelText(/Re-enter/i), 'incorrect_password')
  await user.click(screen.getByRole('button', {name: /Sign Up/i}))
  expect(await screen.findByText('Passwords must match')).toBeInTheDocument()
  await waitFor(() => expect(handleSubmit).not.toHaveBeenCalled)
})

test('Register with valid credential', async () => {
  server.use(
    rest.post('/signup', (req, res, ctx) => {
      return res(
        ctx.delay(10),
        ctx.status(200, 'Success'),
        ctx.set({ 'Authorization': 'test'}),
        ctx.json({
          message: 'Signed up successfully.',
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

  render(<><Register onSuccess={onSuccess}/><ToastContainer/></>)
  await user.type(screen.getByLabelText(/First name/i), 'John')
  await user.type(screen.getByLabelText(/Last name/i), 'Dee')
  await user.type(screen.getByLabelText(/Email/i), 'test@example.com')
  await user.type(screen.getByLabelText(/Password/i), 'password')
  await user.type(screen.getByLabelText(/Re-enter/i), 'password')
  await user.click(screen.getByLabelText(/I have read and agree to the terms/i), 'password')
  await user.click(screen.getByRole('button', {name: /Sign Up/i}))

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalled,
    expect(await screen.findByText('Signed up successfully.')).toBeInTheDocument(),
    expect(onSuccess).toHaveBeenCalled,
  )
})

test('Register failed', async () => {
  server.use(
    rest.post('/signup', (req, res, ctx) => {
      return res(
        ctx.delay(10),
        ctx.status(422, 'Unprocessable entity'),
        ctx.json({
          error: 'Email already taken.',
        }),
      )
    })
  )
  server.listen()

  render(<><Register onSuccess={onSuccess}/><ToastContainer/></>)
  await user.type(screen.getByLabelText(/First name/i), 'John')
  await user.type(screen.getByLabelText(/Last name/i), 'Dee')
  await user.type(screen.getByLabelText(/Email/i), 'test@example.com')
  await user.type(screen.getByLabelText(/Password/i), 'password')
  await user.type(screen.getByLabelText(/Re-enter/i), 'password')
  await user.click(screen.getByLabelText(/I have read and agree to the terms/i), 'password')
  await user.click(screen.getByRole('button', {name: /Sign Up/i}))

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalled,
    expect(await screen.findByText('Email already taken.')).toBeInTheDocument(),
    expect(onSuccess).not.toHaveBeenCalled,
  )
})