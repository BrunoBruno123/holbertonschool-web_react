import React from 'react';

const CourseListRow = ({ isHeader = false, textFirstCell = '', textSecondCell = null }) => {
  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr>
          <th colSpan={2}>{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr>
        <th>{textFirstCell}</th>
        <th>{textSecondCell}</th>
      </tr>
    );
  }

  // ✅ FIX HERE
  if (textSecondCell === null) {
    return (
      <tr>
        <td colSpan={2}>{textFirstCell}</td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{textFirstCell}</td>
      <td>{textSecondCell}</td>
    </tr>
  );
};

export default CourseListRow;