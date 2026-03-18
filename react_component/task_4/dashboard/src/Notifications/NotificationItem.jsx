import React from 'react';

const NotificationItem = ({ type, html, value, markAsRead, id }) => {
  const style = {
    color: type === 'urgent' ? 'red' : 'blue',
    cursor: 'pointer',
  };

  const handleClick = () => {
    if (markAsRead) markAsRead(id);
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
    <li data-notification-type={type} style={style} onClick={handleClick}>
      {value}
    </li>
  );
};

export default React.memo(NotificationItem);