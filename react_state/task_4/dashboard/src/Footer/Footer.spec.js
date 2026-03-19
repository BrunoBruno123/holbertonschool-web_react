import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import NewContext from '../Context/context';

test('renders Footer without crashing', () => {
  render(<Footer />);
});

test('renders correct copyright text when isIndex is true', () => {
  render(<Footer />);
  const year = new Date().getFullYear();
  expect(screen.getByText(`Copyright ${year} - Holberton School`)).toBeInTheDocument();
});

test('does not display "Contact us" when user is logged out', () => {
  render(
    <NewContext.Provider value={{ user: { isLoggedIn: false } }}>
      <Footer />
    </NewContext.Provider>
  );
  expect(screen.queryByText(/Contact us/i)).not.toBeInTheDocument();
});

test('displays "Contact us" when user is logged in', () => {
  render(
    <NewContext.Provider value={{ user: { isLoggedIn: true } }}>
      <Footer />
    </NewContext.Provider>
  );
  expect(screen.getByText(/Contact us/i)).toBeInTheDocument();
});