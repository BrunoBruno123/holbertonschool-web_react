import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from './Notifications';

const notifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
];

test('clicking notification calls markNotificationAsRead and removes it', () => {
  const markNotificationAsRead = jest.fn();
  const { container } = render(
    <Notifications
      displayDrawer={true}
      notifications={notifications}
      markNotificationAsRead={markNotificationAsRead}
    />
  );

  const lis = container.querySelectorAll('li');

  fireEvent.click(lis[0]);
  expect(markNotificationAsRead).toHaveBeenCalledWith(1);

  fireEvent.click(lis[1]);
  expect(markNotificationAsRead).toHaveBeenCalledWith(2);
});