import React, { Component } from 'react';

class NotificationItem extends Component {
  handleClick = () => {
    const { markAsRead, id } = this.props;
    if (markAsRead) markAsRead(id);
  };

  // Only re-render if relevant props change
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.type !== this.props.type ||
      nextProps.value !== this.props.value ||
      nextProps.html !== this.props.html
    );
  }

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