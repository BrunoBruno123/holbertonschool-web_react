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

test('Notifications does not re-render if notifications length stays the same', () => {
  const { rerender, getByText } = render(
    <Notifications displayDrawer={true} notifications={notifications} />
  );

  const sameNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
  ];

  rerender(
    <Notifications displayDrawer={true} notifications={sameNotifications} />
  );

  expect(getByText('New course available')).toBeInTheDocument();
  expect(getByText('New resume available')).toBeInTheDocument();
});

test('Notifications re-renders when notifications length changes', () => {
  const { rerender, queryByText } = render(
    <Notifications displayDrawer={true} notifications={notifications} />
  );

  const moreNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', value: 'New deadline urgent' },
  ];

  rerender(
    <Notifications displayDrawer={true} notifications={moreNotifications} />
  );

  expect(queryByText('New deadline urgent')).toBeInTheDocument();
});