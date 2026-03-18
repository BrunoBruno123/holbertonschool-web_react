import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('renders Login without crashing', () => {
  render(<Login />);
});

test('renders 2 labels, 2 inputs, and 1 button', () => {
  const { container } = render(<Login />);
  expect(container.querySelectorAll('label').length).toBe(2);
  expect(container.querySelectorAll('input').length).toBe(2);
  expect(container.querySelectorAll('button').length).toBe(1);
});

test('inputs get focused when related label is clicked', async () => {
  render(<Login />);
  const emailLabel = screen.getByText(/email/i);
  const passwordLabel = screen.getByText(/password/i);

  await userEvent.click(emailLabel);
  expect(screen.getByLabelText(/email/i)).toHaveFocus();

  await userEvent.click(passwordLabel);
  expect(screen.getByLabelText(/password/i)).toHaveFocus();
});