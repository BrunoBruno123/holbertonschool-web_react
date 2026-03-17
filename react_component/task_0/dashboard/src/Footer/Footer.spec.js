import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders Footer without crashing', () => {
  render(<Footer />);
});

test('renders correct copyright text when isIndex is true', () => {
  render(<Footer />);
  const year = new Date().getFullYear();
  expect(screen.getByText(`Copyright ${year} - Holberton School`)).toBeInTheDocument();
});