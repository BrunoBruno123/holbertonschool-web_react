import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationItem from './NotificationItem';

test('calls markAsRead prop when clicked', () => {
  const markAsReadMock = jest.fn();
  const { container } = render(
    <NotificationItem
      id={5}
      type="default"
      value="Test notification"
      markAsRead={markAsReadMock}
    />
  );

  const li = container.querySelector('li');
  fireEvent.click(li);
  expect(markAsReadMock).toHaveBeenCalledWith(5);
});