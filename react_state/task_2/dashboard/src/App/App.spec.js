import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

describe('App component', () => {
  test('renders notifications', () => {
    render(<App />);
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });

  test('renders Header component', () => {
    render(<App />);
    expect(screen.getByText(/School Dashboard/i)).toBeInTheDocument();
  });

  test('renders Login when not logged in', () => {
    render(<App />);
    expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
  });

  test('renders CourseList after logging in', async () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /ok/i });

    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'validpassword123');
    await userEvent.click(submitBtn);

    expect(screen.getByText(/ES6/i)).toBeInTheDocument();
  });

  test('logs out when Ctrl+h is pressed', () => {
    window.alert = jest.fn();
    render(<App />);
    fireEvent.keyDown(window, { key: 'h', ctrlKey: true });
    expect(window.alert).toHaveBeenCalledWith('Logging you out');
  });

  test('renders News from the School section with paragraph', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 2, name: /News from the School/i });
    const paragraph = screen.getByText(/Holberton School News goes here/i);
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  test('displayDrawer is false by default', () => {
    render(<App />);
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test('clicking "Your notifications" shows the drawer', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Your notifications/i));
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  });

  test('clicking close button hides the drawer', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Your notifications/i));
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/Close/i));
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
  });
});