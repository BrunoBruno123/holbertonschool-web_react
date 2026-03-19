import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('renders Login without crashing', () => {
  render(<Login />);
});

test('renders 2 labels, 2 inputs (email + password), and 1 submit button', () => {
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

test('submit button is disabled by default', () => {
  render(<Login />);
  expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
});

test('submit button is enabled when email is valid and password has 8+ characters', async () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitBtn = screen.getByRole('button', { name: /ok/i });

  await userEvent.type(emailInput, 'user@example.com');
  await userEvent.type(passwordInput, 'validpassword123');
  expect(submitBtn).not.toBeDisabled();
});

test('submit button stays disabled if email is invalid', async () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitBtn = screen.getByRole('button', { name: /ok/i });

  await userEvent.type(emailInput, 'notanemail');
  await userEvent.type(passwordInput, 'validpassword123');
  expect(submitBtn).toBeDisabled();
});

test('submit button stays disabled if password is less than 8 characters', async () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitBtn = screen.getByRole('button', { name: /ok/i });

  await userEvent.type(emailInput, 'user@example.com');
  await userEvent.type(passwordInput, 'short');
  expect(submitBtn).toBeDisabled();
});

test('submitting the form does not reload the page', async () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitBtn = screen.getByRole('button', { name: /ok/i });

  await userEvent.type(emailInput, 'user@example.com');
  await userEvent.type(passwordInput, 'validpassword123');
  await userEvent.click(submitBtn);

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});