import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

test('renders heading with title prop', () => {
  render(<BodySection title="Test Title" />);
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title');
});

test('renders children passed to it', () => {
  render(
    <BodySection title="Test Title">
      <p>Child 1</p>
      <p>Child 2</p>
    </BodySection>
  );
  expect(screen.getByText('Child 1')).toBeInTheDocument();
  expect(screen.getByText('Child 2')).toBeInTheDocument();
});