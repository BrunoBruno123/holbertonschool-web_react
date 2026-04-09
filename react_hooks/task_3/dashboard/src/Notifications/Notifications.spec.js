import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from './Notifications';

const notifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
];

test('clicking notification calls markNotificationAsRead with the correct id', () => {
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

test('does not re-render if notifications length stays the same', () => {
  const markNotificationAsRead = jest.fn();
  const { rerender, queryByText } = render(
    <Notifications
      displayDrawer={true}
      notifications={notifications}
      markNotificationAsRead={markNotificationAsRead}
    />
  );

  const newNotifications = [
    { id: 3, type: 'default', value: 'Test 1' },
    { id: 4, type: 'urgent', value: 'Test 2' },
  ];

  rerender(
    <Notifications
      displayDrawer={true}
      notifications={newNotifications}
      markNotificationAsRead={markNotificationAsRead}
    />
  );

  // shouldComponentUpdate blocks re-render when length is the same
  expect(queryByText('New course available')).toBeInTheDocument();
});

test('re-renders if notifications length changes', () => {
  const { rerender, queryByText } = render(
    <Notifications
      displayDrawer={true}
      notifications={notifications}
      markNotificationAsRead={jest.fn()}
    />
  );

  const newNotifications = [
    ...notifications,
    { id: 3, type: 'default', value: 'New notification' },
  ];

  rerender(
    <Notifications
      displayDrawer={true}
      notifications={newNotifications}
      markNotificationAsRead={jest.fn()}
    />
  );

  expect(queryByText('New notification')).toBeInTheDocument();
});

test('clicking on "Your notifications" calls handleDisplayDrawer', () => {
  const handleDisplayDrawer = jest.fn();
  const { getByText } = render(
    <Notifications
      displayDrawer={false}
      notifications={notifications}
      handleDisplayDrawer={handleDisplayDrawer}
      handleHideDrawer={jest.fn()}
      markNotificationAsRead={jest.fn()}
    />
  );

  fireEvent.click(getByText(/Your notifications/i));
  expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
});

test('clicking on the close button calls handleHideDrawer', () => {
  const handleHideDrawer = jest.fn();
  const { getByLabelText } = render(
    <Notifications
      displayDrawer={true}
      notifications={notifications}
      handleDisplayDrawer={jest.fn()}
      handleHideDrawer={handleHideDrawer}
      markNotificationAsRead={jest.fn()}
    />
  );

  fireEvent.click(getByLabelText(/Close/i));
  expect(handleHideDrawer).toHaveBeenCalledTimes(1);
});