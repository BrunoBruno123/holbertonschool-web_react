import React, { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  handleClick = () => {
    const { markAsRead, id } = this.props;
    if (markAsRead) markAsRead(id);
  };

  render() {
    const { type, html, value } = this.props;
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
          onClick={this.handleClick}
        />
      );
    }

    return (
      <li
        data-notification-type={type}
        style={style}
        onClick={this.handleClick}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;