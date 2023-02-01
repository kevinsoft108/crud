import React from 'react'
import {render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import Auth from '@components/auth/Auth'

const user = userEvent.setup()
jest.mock('@components/auth/Login', () => () => 'LoginComponent')
jest.mock('@components/auth/Register', () => () => 'RegisterComponent')

test('Auth toggle Form', async () => {
  render(<Auth />)
  expect(await screen.findByText('LoginComponent')).toBeVisible
  expect(await screen.findByText('RegisterComponent')).not.toBeVisible
  await user.click(screen.getByText('Register'))
  expect(await screen.findByText('LoginComponent')).not.toBeVisible
  expect(await screen.findByText('RegisterComponent')).toBeVisible
  await user.click(screen.getByText('Login'))
  expect(await screen.findByText('LoginComponent')).toBeVisible
  expect(await screen.findByText('RegisterComponent')).not.toBeVisible
})