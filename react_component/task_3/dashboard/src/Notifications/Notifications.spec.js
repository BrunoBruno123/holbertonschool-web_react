import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from './Notifications';

const notifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
];

test('clicking notification logs correct message', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  const { container } = render(
    <Notifications displayDrawer={true} notifications={notifications} />
  );

  const lis = container.querySelectorAll('li');
  fireEvent.click(lis[0]);
  expect(consoleSpy).toHaveBeenCalledWith(
    'Notification 1 has been marked as read'
  );

  fireEvent.click(lis[1]);
  expect(consoleSpy).toHaveBeenCalledWith(
    'Notification 2 has been marked as read'
  );

  consoleSpy.mockRestore();
});