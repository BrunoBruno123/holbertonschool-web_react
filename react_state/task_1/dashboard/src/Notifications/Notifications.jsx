import React, { Component } from 'react';
import './Notifications.css';
import close from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.notifications.length !== this.props.notifications.length ||
      nextProps.displayDrawer !== this.props.displayDrawer
    );
  }

  render() {
    const {
      notifications = [],
      displayDrawer = false,
      handleDisplayDrawer = () => {},
      handleHideDrawer = () => {},
    } = this.props;

    return (
      <div className="Notifications">
        <div
          className="notification-title"
          onClick={handleDisplayDrawer}
          style={{ cursor: 'pointer' }}
        >
          Your notifications
        </div>

        {displayDrawer && (
          <div className="notification-items">
            <p>Here is the list of notifications</p>

            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <ul>
                {notifications.map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    id={notif.id}
                    type={notif.type}
                    value={notif.value}
                    html={notif.html}
                    markAsRead={this.markAsRead}
                  />
                ))}
              </ul>
            )}

            <button
              aria-label="Close"
              style={{ position: 'absolute', top: '10px', right: '10px' }}
              onClick={handleHideDrawer}
            >
              <img
                src={close}
                alt="close"
                style={{ width: '30px', height: '30px' }}
              />
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Notifications;