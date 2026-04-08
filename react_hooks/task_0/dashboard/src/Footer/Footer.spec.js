import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';
import NewContext from '../Context/context';

// Helper: render Footer with a given user value via context
const renderWithContext = (user) =>
  render(
    <NewContext.Provider value={{ user }}>
      <Footer />
    </NewContext.Provider>
  );

test('renders Footer without crashing', () => {
  renderWithContext({ isLoggedIn: false });
});

test('renders correct copyright text', () => {
  renderWithContext({ isLoggedIn: false });
  const year = new Date().getFullYear();
  expect(
    screen.getByText(`Copyright ${year} - Holberton School`)
  ).toBeInTheDocument();
});

test('does not display "Contact us" link when user is logged out', () => {
  renderWithContext({ isLoggedIn: false });
  expect(screen.queryByText(/Contact us/i)).not.toBeInTheDocument();
});

test('displays "Contact us" link when user is logged in', () => {
  renderWithContext({ isLoggedIn: true });
  expect(screen.getByText(/Contact us/i)).toBeInTheDocument();
});