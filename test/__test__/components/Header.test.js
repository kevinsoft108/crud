import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import {render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import * as checkLogin from '@services/utils/checkLogin'
import Header from '@components/Header'

const user = userEvent.setup()
const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}))
jest.mock('@services/Auth.context', () => ({
  useAuth: () => ([{ id: 1, email: 'test@example.com', full_name: 'John Dee'}, function() {} ]),
}))

afterAll(() => jest.resetAllMocks())

test('Header show nothing without login', async () => {
  jest.spyOn(checkLogin, 'default').mockReturnValue(false)

  const { container } = render(<Router><Header /></Router>)
  expect(container.childElementCount).toEqual(0)
})

test('Header show user name without login', async () => {
  jest.spyOn(checkLogin, 'default').mockReturnValue(true)

  render(<Router><Header /></Router>)
  expect(await screen.findByRole('link', {text: /Home/i})).toBeInTheDocument()
  expect(await screen.findByRole('link', {text: /Projects/i})).toBeInTheDocument()
  expect(await screen.findByText('John Dee')).toBeInTheDocument()
})

test('Header click Logout', async () => {
  jest.spyOn(checkLogin, 'default').mockReturnValue(true)

  render(<><Router><Header /></Router><ToastContainer /></>)
  await user.click(screen.getByTitle('Logout'))
  expect(await screen.findByText('Logout successfully.')).toBeInTheDocument()
  expect(mockedNavigate).toHaveBeenCalledWith('/')
})
