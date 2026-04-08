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
    expect(screen.getByText(/School dashboard/i)).toBeInTheDocument();
  });

  test('renders Login when not logged in by default', () => {
    render(<App />);
    expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
  });

  test('renders CourseList after logging in via state', async () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /ok/i });

    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'validpassword123');
    await userEvent.click(submitBtn);

    expect(screen.getByText(/ES6/i)).toBeInTheDocument();
    expect(screen.queryByText(/Log in to continue/i)).not.toBeInTheDocument();
  });

  test('shows logoutSection in header after logging in', async () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /ok/i });

    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'validpassword123');
    await userEvent.click(submitBtn);

    expect(document.getElementById('logoutSection')).toBeInTheDocument();
    expect(screen.getByText(/Welcome user@example.com/i)).toBeInTheDocument();
  });

  test('clicking logout link logs the user out and shows Login again', async () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /ok/i });

    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'validpassword123');
    await userEvent.click(submitBtn);

    expect(screen.getByText(/ES6/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/logout/i));

    expect(screen.queryByText(/ES6/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
    expect(document.getElementById('logoutSection')).toBeNull();
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

  test('clicking a notification removes it from the list and logs the correct string', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { container } = render(<App />);

    // Open the drawer
    fireEvent.click(screen.getByText(/Your notifications/i));

    const lisBeforeClick = container.querySelectorAll('.Notifications li');
    const initialCount = lisBeforeClick.length;

    // Click the first notification (id: 1)
    fireEvent.click(lisBeforeClick[0]);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read'
    );

    const lisAfterClick = container.querySelectorAll('.Notifications li');
    expect(lisAfterClick.length).toBe(initialCount - 1);

    consoleSpy.mockRestore();
  });
});