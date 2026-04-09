import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';
import App from './App';

// Mock axios so tests don't make real HTTP requests
jest.mock('axios');

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
];

beforeEach(() => {
  axios.get.mockResolvedValue({ data: mockNotifications });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('App component', () => {
  test('renders notifications', async () => {
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

  test('clicking a notification removes it from the list and logs the correct string', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { container } = render(<App />);

    // Wait for axios to resolve and notifications to load
    await waitFor(() => {
      fireEvent.click(screen.getByText(/Your notifications/i));
      const lis = container.querySelectorAll('.Notifications li');
      expect(lis.length).toBeGreaterThan(0);
    });

    const lisBeforeClick = container.querySelectorAll('.Notifications li');
    const initialCount = lisBeforeClick.length;

    fireEvent.click(lisBeforeClick[0]);

    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');

    const lisAfterClick = container.querySelectorAll('.Notifications li');
    expect(lisAfterClick.length).toBe(initialCount - 1);

    consoleSpy.mockRestore();
  });

  test('handleDisplayDrawer sets displayDrawer to true', () => {
    render(<App />);
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(/Your notifications/i));
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  });

  test('handleHideDrawer sets displayDrawer to false', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Your notifications/i));
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/Close/i));
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test('logIn updates user email, password, and isLoggedIn', async () => {
    render(<App />);
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'validpassword123');
    await userEvent.click(screen.getByRole('button', { name: /ok/i }));

    expect(screen.getByText(/Welcome user@example.com/i)).toBeInTheDocument();
    expect(document.getElementById('logoutSection')).toBeInTheDocument();
  });

  test('logOut sets isLoggedIn to false and clears email and password', async () => {
    render(<App />);
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'validpassword123');
    await userEvent.click(screen.getByRole('button', { name: /ok/i }));

    expect(document.getElementById('logoutSection')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/logout/i));

    expect(document.getElementById('logoutSection')).toBeNull();
    expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
  });
});