import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from './Notifications';

describe('Notifications component', () => {

  test('renders notification title', () => {
    const { getByText } = render(<Notifications />);
    expect(getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  });

  test('renders a close button', () => {
    const { container } = render(<Notifications />);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  test('renders 3 list items', () => {
    const { container } = render(<Notifications />);
    const items = container.querySelectorAll('li');
    expect(items.length).toBe(3);
  });

  test('clicking close button logs message', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    const { container } = render(<Notifications />);
    const button = container.querySelector('button');

    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith("Close button has been clicked");

    consoleSpy.mockRestore();
  });

});