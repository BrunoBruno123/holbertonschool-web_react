import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

const mockLogOut = jest.fn();

describe('App component', () => {
  test('renders notifications', () => {
    render(<App />);
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });

  test('renders Header component', () => {
    render(<App />);
    expect(screen.getByText(/School Dashboard/i)).toBeInTheDocument();
  });

  test('renders CourseList when isLoggedIn is true', () => {
    render(<App isLoggedIn={true} />);
    expect(screen.getByText(/ES6/i)).toBeInTheDocument();
  });

  test('renders Login when isLoggedIn is false', () => {
    render(<App isLoggedIn={false} />);
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
  });

  test('logs out when Ctrl+h is pressed', () => {
    window.alert = jest.fn();
    render(<App logOut={mockLogOut} />);
    fireEvent.keyDown(window, { key: 'h', ctrlKey: true });
    expect(window.alert).toHaveBeenCalledWith('Logging you out');
    expect(mockLogOut).toHaveBeenCalled();
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
    // The notification items panel should not be visible by default
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test('clicking "Your notifications" shows the drawer', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Your notifications/i));
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  });

  test('clicking close button hides the drawer', () => {
    render(<App />);
    // Open drawer first
    fireEvent.click(screen.getByText(/Your notifications/i));
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
    // Close it
    fireEvent.click(screen.getByLabelText(/Close/i));
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
  });
});