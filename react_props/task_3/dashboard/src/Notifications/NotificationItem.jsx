import React from 'react';

const NotificationItem = ({ type, html, value }) => {
  const style = {
    color: type === 'urgent' ? 'red' : 'blue',
  };

  if (html) {
    return (
      <li
        data-notification-type={type}
        style={style}
        dangerouslySetInnerHTML={html}
      />
    );
  }

  return (
    <li data-notification-type={type} style={style}>
      {value}
    </li>
  );
};

export default NotificationItem;