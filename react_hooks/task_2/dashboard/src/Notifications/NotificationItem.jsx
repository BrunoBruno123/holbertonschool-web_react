import React, { memo } from 'react';

const NotificationItem = ({ id, type, html, value, markAsRead }) => {
  const handleClick = () => {
    if (markAsRead) {
      markAsRead(id);
    }
  };

  const style = {
    color: type === 'urgent' ? 'red' : 'blue',
    cursor: 'pointer',
  };

  if (html) {
    return (
      <li
        data-notification-type={type}
        style={style}
        dangerouslySetInnerHTML={html}
        onClick={handleClick}
      />
    );
  }

  return (
    <li
      data-notification-type={type}
      style={style}
      onClick={handleClick}
    >
      {value}
    </li>
  );
};

export default memo(NotificationItem);