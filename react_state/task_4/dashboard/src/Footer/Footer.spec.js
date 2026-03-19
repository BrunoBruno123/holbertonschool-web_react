import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';
// eslint-disable-next-line no-unused-vars
import newContext from '../Context/context';

const renderWithContext = (contextValue) => {
  return render(
    <newContext.Provider value={contextValue}>
      <Footer />
    </newContext.Provider>
  );
};

test('renders Footer without crashing', () => {
  render(<Footer />);
});

test('renders correct copyright text when isIndex is true', () => {
  render(<Footer />);
  const year = new Date().getFullYear();
  expect(screen.getByText(`Copyright ${year} - Holberton School`)).toBeInTheDocument();
});

test('does not display "Contact us" link when user is logged out', () => {
  renderWithContext({
    user: { email: '', password: '', isLoggedIn: false },
    logOut: () => {},
  });
  expect(screen.queryByText(/Contact us/i)).not.toBeInTheDocument();
});

test('displays "Contact us" link when user is logged in', () => {
  renderWithContext({
    user: { email: 'user@example.com', password: 'password123', isLoggedIn: true },
    logOut: () => {},
  });
  expect(screen.getByText(/Contact us/i)).toBeInTheDocument();
});