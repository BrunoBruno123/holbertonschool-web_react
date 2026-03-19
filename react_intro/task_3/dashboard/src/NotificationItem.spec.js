import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationItem from './NotificationItem';

test('renders default notification with blue color and correct attribute', () => {
  const { container } = render(
    <NotificationItem type="default" value="New course available" />
  );
  const li = container.querySelector('li');
  expect(li).toHaveAttribute('data-notification-type', 'default');
  expect(li).toHaveStyle({ color: 'blue' });
});

test('renders urgent notification with red color and correct attribute', () => {
  const { container } = render(
    <NotificationItem type="urgent" value="New resume available" />
  );
  const li = container.querySelector('li');
  expect(li).toHaveAttribute('data-notification-type', 'urgent');
  expect(li).toHaveStyle({ color: 'red' });
});