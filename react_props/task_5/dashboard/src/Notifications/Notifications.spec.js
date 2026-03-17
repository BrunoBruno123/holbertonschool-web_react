import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from './Notifications';

const notifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
];

describe('Notifications component', () => {

  test('renders notification title always', () => {
    const { getByText } = render(<Notifications />);
    expect(getByText(/Your notifications/i)).toBeInTheDocument();
  });

  test('renders notification title when displayDrawer is true', () => {
    const { getByText } = render(<Notifications displayDrawer={true} notifications={notifications} />);
    expect(getByText(/Your notifications/i)).toBeInTheDocument();
  });

  describe('when displayDrawer is false', () => {
    test('does not display the close button', () => {
      const { container } = render(<Notifications notifications={notifications} />);
      expect(container.querySelector('button')).not.toBeInTheDocument();
    });

    test('does not display the p element', () => {
      const { queryByText } = render(<Notifications notifications={notifications} />);
      expect(queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
    });

    test('does not display notification items', () => {
      const { container } = render(<Notifications notifications={notifications} />);
      expect(container.querySelectorAll('li').length).toBe(0);
    });
  });

  describe('when displayDrawer is true', () => {
    test('displays the close button', () => {
      const { container } = render(<Notifications displayDrawer={true} notifications={notifications} />);
      expect(container.querySelector('button')).toBeInTheDocument();
    });

    test('displays the p element', () => {
      const { getByText } = render(<Notifications displayDrawer={true} notifications={notifications} />);
      expect(getByText(/Here is the list of notifications/i)).toBeInTheDocument();
    });

    test('displays notification items', () => {
      const { container } = render(<Notifications displayDrawer={true} notifications={notifications} />);
      expect(container.querySelectorAll('li').length).toBe(3);
    });

    test('clicking close button logs message', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const { container } = render(<Notifications displayDrawer={true} notifications={notifications} />);
      fireEvent.click(container.querySelector('button'));
      expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
      consoleSpy.mockRestore();
    });
  });

  describe('when displayDrawer is true and notifications is empty', () => {
    test('displays No new notification for now', () => {
      const { getByText } = render(<Notifications displayDrawer={true} notifications={[]} />);
      expect(getByText(/No new notification for now/i)).toBeInTheDocument();
    });
  });

});