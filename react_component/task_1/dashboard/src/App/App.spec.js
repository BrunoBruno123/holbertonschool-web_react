import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App component', () => {
  let alertMock;
  const logOutMock = jest.fn();

  beforeAll(() => {
    // Mock window.alert before any tests
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterAll(() => {
    // Restore original alert
    alertMock.mockRestore();
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/School dashboard/i)).toBeInTheDocument();
  });

  it('calls logOut and alert on Ctrl+H', () => {
    render(<App logOut={logOutMock} />);
    fireEvent.keyDown(window, { key: 'h', ctrlKey: true });
    expect(alertMock).toHaveBeenCalledWith('Logging you out');
    expect(logOutMock).toHaveBeenCalled();
  });
});