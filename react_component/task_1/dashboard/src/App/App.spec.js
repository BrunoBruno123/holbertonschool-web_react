import React from 'react';
import { render, screen } from '@testing-library/react';
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
    render(<App isLoggedIn={true} />);
    expect(document.querySelector('#CourseList')).toBeInTheDocument();
  });
});

describe('Ctrl + H behavior', () => {
  test('calls logOut when Ctrl + H is pressed', () => {
    const logOutMock = jest.fn();
    render(<App logOut={logOutMock} />);

    const event = new KeyboardEvent('keydown', {
      key: 'h',
      ctrlKey: true,
    });

    window.dispatchEvent(event);

    expect(logOutMock).toHaveBeenCalledTimes(1);
  });

  test('calls alert with "Logging you out"', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const logOutMock = jest.fn();

    render(<App logOut={logOutMock} />);

    const event = new KeyboardEvent('keydown', {
      key: 'h',
      ctrlKey: true,
    });

    window.dispatchEvent(event);

    expect(alertMock).toHaveBeenCalledWith('Logging you out');

    alertMock.mockRestore();
  });
});