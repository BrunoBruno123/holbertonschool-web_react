import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

test('renders div with bodySectionWithMargin class', () => {
  const { container } = render(
    <BodySectionWithMarginBottom title="Test Title">
      <p>Child</p>
    </BodySectionWithMarginBottom>
  );
  expect(container.querySelector('.bodySectionWithMargin')).toBeInTheDocument();
});

test('renders BodySection component inside', () => {
  render(
    <BodySectionWithMarginBottom title="Test Title">
      <p>Child</p>
    </BodySectionWithMarginBottom>
  );
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title');
  expect(screen.getByText('Child')).toBeInTheDocument();
});