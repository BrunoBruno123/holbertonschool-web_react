import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders Header without crashing', () => {
  render(<Header />);
});

test('contains the Holberton logo image', () => {
  render(<Header />);
  const logo = screen.getByAltText(/holberton logo/i);
  expect(logo).toBeInTheDocument();
});

test('contains h1 with correct text', () => {
  render(<Header />);
  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading).toHaveTextContent(/School dashboard/i);
});