import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from '../Notifications/Notifications';

const notifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
];

describe('Notifications component', () => {

  test('renders notification title', () => {
    const { getByText } = render(<Notifications notifications={notifications} />);
    expect(getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  });

  test('renders a close button', () => {
    const { container } = render(<Notifications notifications={notifications} />);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  test('renders 3 list items', () => {
    const { container } = render(<Notifications notifications={notifications} />);
    const items = container.querySelectorAll('li');
    expect(items.length).toBe(3);
  });

  test('clicking close button logs message', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { container } = render(<Notifications notifications={notifications} />);
    const button = container.querySelector('button');
    fireEvent.click(button);
    expect(consoleSpy).toHaveBeenCalledWith("Close button has been clicked");
    consoleSpy.mockRestore();
  });

});