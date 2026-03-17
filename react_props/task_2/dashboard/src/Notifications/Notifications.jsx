import React from 'react';
import './Notifications.css';
import close from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

const Notifications = ({ notifications = [] }) => {
  return (
    <div className="notification-items">
      <p>Here is the list of notifications</p>
      <ul>
        {notifications.map((notif) => (
          <NotificationItem
            key={notif.id}
            type={notif.type}
            value={notif.value}
            html={notif.html}
          />
        ))}
      </ul>
      <button
        aria-label="Close"
        style={{ position: "absolute", top: "10px", right: "10px" }}
        onClick={() => console.log("Close button has been clicked")}
      >
        <img
          src={close}
          alt="close"
          style={{ width: "30px", height: "30px" }}
        />
      </button>
    </div>
  );
};

export default Notifications;