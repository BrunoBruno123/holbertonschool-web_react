import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders h1 with School Dashboard text', () => {
  render(<App />);
  expect(screen.getByRole('heading')).toHaveTextContent(/School dashboard/i);
});

test('renders correct text in body and footer paragraphs', () => {
  render(<App />);
  expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
});

test('renders an image', () => {
  render(<App />);
  const image = screen.getByAltText(/holberton logo/i);
  expect(image).toBeInTheDocument();
});

test('renders 2 labels Email and Password', () => {
  render(<App />);
  expect(screen.getByText(/email/i)).toBeInTheDocument();
  expect(screen.getByText(/password/i)).toBeInTheDocument();
});

test('renders 2 input elements (email and password)', () => {
  render(<App />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('renders a button with OK text', () => {
  render(<App />);
  const buttons = screen.getAllByRole('button');
  const okButton = buttons.find(b => b.textContent.match(/OK/i));
  expect(okButton).toBeInTheDocument();
});

describe('when isLoggedIn is false', () => {
  test('renders the Login form', () => {
    render(<App />);
    expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  });
});

describe('when isLoggedIn is true', () => {
  test('renders the CourseList table', () => {
    const { container } = render(<App isLoggedIn={true} />);
    expect(container.querySelector('#CourseList')).toBeInTheDocument();
  });
});

describe('Ctrl+H keyboard shortcut', () => {
  test('calls logOut function when Ctrl+H is pressed', () => {
    const logOut = jest.fn();
    render(<App logOut={logOut} />);
    fireEvent.keyDown(window, { key: 'h', ctrlKey: true });
    expect(logOut).toHaveBeenCalledTimes(1);
  });

  test('calls alert with Logging you out when Ctrl+H is pressed', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const logOut = jest.fn();
    render(<App logOut={logOut} />);
    fireEvent.keyDown(window, { key: 'h', ctrlKey: true });
    expect(alertMock).toHaveBeenCalledWith('Logging you out');
    alertMock.mockRestore();
  });
});