import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import {render, screen, act} from '@testing-library/react'
import '@testing-library/jest-dom'

import Projects from '@components/projects/Projects'

act(() => {
  jest.mock('@services/Fetch.service', () => ({
    isofetchAuthed: (arg) => Promise.resolve([])
  }))
});

jest.mock('@components/projects/ProjectList', () => () => 'ProjectList')
jest.mock('@components/projects/ProjectForm', () => () => 'ProjectForm')
jest.mock('@components/issues/Issues', () => () => 'ProjectIssues')

test('List', async () => {
  render(<Router><Projects /></Router>)
  expect(await screen.findByText('ProjectList')).toBeInTheDocument()
})

test('New', async () => {
  const location = {
    ...window.location,
    pathname: '/new'
  };
  Object.defineProperty(window, 'location', {
    writable: true,
    value: location,
  })

  render(<Router><Projects /></Router>)
  expect(await screen.findByText('ProjectForm')).toBeInTheDocument()
})

test('Issues', async () => {
  const location = {
    ...window.location,
    pathname: '/1'
  };
  Object.defineProperty(window, 'location', {
    writable: true,
    value: location,
  })

  render(<Router><Projects /></Router>)
  expect(await screen.findByText('ProjectIssues')).toBeInTheDocument()
})

test('Edit', async () => {
  const location = {
    ...window.location,
    pathname: '/1/edit'
  };
  Object.defineProperty(window, 'location', {
    writable: true,
    value: location,
  })

  render(<Router><Projects /></Router>)
  expect(await screen.findByText('ProjectForm')).toBeInTheDocument()
})