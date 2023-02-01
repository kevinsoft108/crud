import React from 'react'
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import {render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import * as checkLogin from '@services/utils/checkLogin'
import RequireAuth from '@components/auth/RequireAuth'

jest.mock('react-router-dom', () => ({
  Navigate: jest.fn(),
}))

afterAll(() => jest.resetAllMocks())

test('RequireAuth navigate', async () => {
  jest.spyOn(checkLogin, 'default').mockReturnValue(false)

  render(<><RequireAuth><div>ChildComponent</div></RequireAuth><ToastContainer /></>)
  expect(await screen.findByText('You need to login!')).toBeInTheDocument()
  expect(Navigate).toHaveBeenCalled
})

test('RequireAuth children', async () => {
  jest.spyOn(checkLogin, 'default').mockReturnValue(true)

  render(<><RequireAuth><div>ChildComponent</div></RequireAuth><ToastContainer /></>)
  expect(await screen.findByText('ChildComponent')).toBeInTheDocument()
})