import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from './Notifications';

const notifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
];

test('clicking notification calls markNotificationAsRead with correct id', () => {
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

test('re-renders if notifications length changes (PureComponent behavior)', () => {
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

test('does not re-render if same notifications array reference and displayDrawer unchanged', () => {
  const { rerender, queryByText } = render(
    <Notifications displayDrawer={true} notifications={notifications} />
  );

  // Same length, different content — PureComponent does shallow compare so won't re-render
  const newNotifications = [
    { id: 3, type: 'default', value: 'Test 1' },
    { id: 4, type: 'urgent', value: 'Test 2' },
  ];

  rerender(
    <Notifications displayDrawer={true} notifications={newNotifications} />
  );

  // PureComponent does shallow compare on the array reference — new array triggers re-render
  // but content change with same length won't be detected by shallow compare
  // The old content should still be visible
  expect(queryByText('New course available')).toBeInTheDocument();
});

test('clicking on "Your notifications" calls handleDisplayDrawer', () => {
  const handleDisplayDrawer = jest.fn();
  const { getByText } = render(
    <Notifications
      displayDrawer={false}
      notifications={notifications}
      handleDisplayDrawer={handleDisplayDrawer}
      handleHideDrawer={jest.fn()}
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
    />
  );

  fireEvent.click(getByLabelText(/Close/i));
  expect(handleHideDrawer).toHaveBeenCalledTimes(1);
});