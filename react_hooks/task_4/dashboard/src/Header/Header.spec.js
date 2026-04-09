import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
// eslint-disable-next-line no-unused-vars
import newContext from '../Context/context';

const renderWithContext = (contextValue) => {
  return render(
    <newContext.Provider value={contextValue}>
      <Header />
    </newContext.Provider>
  );
};

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

test('logoutSection is not rendered with default context', () => {
  render(<Header />);
  expect(document.getElementById('logoutSection')).toBeNull();
});

test('logoutSection is rendered when isLoggedIn is true', () => {
  renderWithContext({
    user: { email: 'user@example.com', password: 'password123', isLoggedIn: true },
    logOut: () => {},
  });
  expect(document.getElementById('logoutSection')).toBeInTheDocument();
  expect(screen.getByText(/Welcome user@example.com/i)).toBeInTheDocument();
});

test('clicking logout link calls logOut spy', () => {
  const logOutSpy = jest.fn();
  renderWithContext({
    user: { email: 'user@example.com', password: 'password123', isLoggedIn: true },
    logOut: logOutSpy,
  });
  const logoutLink = screen.getByText(/logout/i);
  fireEvent.click(logoutLink);
  expect(logOutSpy).toHaveBeenCalledTimes(1);
});