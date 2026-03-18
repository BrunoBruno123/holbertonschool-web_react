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

test('does not re-render if notifications length stays the same', () => {
  const { rerender, queryByText } = render(
    <Notifications displayDrawer={true} notifications={notifications} />
  );

  const newNotifications = [
    { id: 3, type: 'default', value: 'Test 1' },
    { id: 4, type: 'urgent', value: 'Test 2' },
  ];

  rerender(
    <Notifications displayDrawer={true} notifications={newNotifications} />
  );

  // Should NOT update → old content still exists
  expect(queryByText('New course available')).toBeInTheDocument();
});

test('re-renders if notifications length changes', () => {
  const { rerender, queryByText } = render(
    <Notifications displayDrawer={true} notifications={notifications} />
  );

  const newNotifications = [
    ...notifications,
    { id: 3, type: 'default', value: 'New notification' },
  ];

  rerender(
    <Notifications displayDrawer={true} notifications={newNotifications} />
  );

  expect(queryByText('New notification')).toBeInTheDocument();
});