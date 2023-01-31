import {render} from '@testing-library/react'
import '@testing-library/jest-dom'

import App from '@components/App';

test('renders a authentication form', () => {
  const {asFragment, getByText} = render(<App />);
  expect(getByText('Login')).toBeInTheDocument();
  expect(getByText('Register')).toBeInTheDocument();
  // expect(asFragment()).toMatchInlineSnapshot();
})