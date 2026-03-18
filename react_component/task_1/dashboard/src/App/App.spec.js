import React from 'react';
import { render,  fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('calls logOut when ctrl + h is pressed', () => {
  const mockLogout = jest.fn();

  render(<App logOut={mockLogout} />);

  fireEvent.keyDown(window, { key: 'h', ctrlKey: true });

  expect(mockLogout).toHaveBeenCalledTimes(1);
});

test('alert is called with "Logging you out"', () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

  render(<App />);

  fireEvent.keyDown(window, { key: 'h', ctrlKey: true });

  expect(alertMock).toHaveBeenCalledWith('Logging you out');

  alertMock.mockRestore();
});