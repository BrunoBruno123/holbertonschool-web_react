import React from 'react';
import CourseListRow from './CourseListRow';
import './CourseList.css';
import WithLogging from '../HOC/WithLogging';

const CourseList = ({ courses = [] }) => {
  return (
    <table id="CourseList">
      {courses.length === 0 ? (
        <tbody>
          <CourseListRow isHeader={true} textFirstCell="No course available yet" />
        </tbody>
      ) : (
        <>
          <thead>
            <CourseListRow textFirstCell="Available courses" isHeader={true} />
            <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
          </thead>
          <tbody>
            {courses.map((course) => (
              <CourseListRow
                key={course.id}
                textFirstCell={course.name}
                textSecondCell={String(course.credit)}
              />
            ))}
          </tbody>
        </>
      )}
    </table>
  );
};

const CourseListWithLogging = WithLogging(CourseList);

export default CourseListWithLogging;