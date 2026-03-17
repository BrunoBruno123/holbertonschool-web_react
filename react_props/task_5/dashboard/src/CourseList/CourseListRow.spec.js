import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseListRow from './CourseListRow';

describe('CourseListRow component', () => {

  describe('when isHeader is true', () => {
    test('renders one columnheader with colspan=2 when textSecondCell is null', () => {
      const { container } = render(
        <table><tbody><CourseListRow isHeader={true} textFirstCell="Available courses" /></tbody></table>
      );
      const th = container.querySelector('th');
      expect(th).toBeInTheDocument();
      expect(th).toHaveAttribute('colspan', '2');
    });

    test('renders two th elements when textSecondCell is not null', () => {
      const { container } = render(
        <table><tbody><CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" /></tbody></table>
      );
      const headers = container.querySelectorAll('th');
      expect(headers.length).toBe(2);
    });
  });

  describe('when isHeader is false', () => {
    test('renders two td elements within a tr', () => {
      const { container } = render(
        <table><tbody><CourseListRow textFirstCell="ES6" textSecondCell="60" /></tbody></table>
      );
      const tds = container.querySelectorAll('td');
      expect(tds.length).toBe(2);
    });
  });

});