import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseList from './CourseList';

const courses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

describe('CourseList component', () => {

  test('renders 5 rows when given an array of courses', () => {
  const { container } = render(<CourseList courses={courses} />);
  const rows = container.querySelectorAll('tr');
  expect(rows.length).toBe(5);
});

test('renders 1 row when given an empty array', () => {
  const { container } = render(<CourseList courses={[]} />);
  const rows = container.querySelectorAll('tr');
  expect(rows.length).toBe(1);
});

});