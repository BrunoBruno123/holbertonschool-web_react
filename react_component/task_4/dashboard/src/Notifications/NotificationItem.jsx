import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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

NotificationItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({ __html: PropTypes.string }),
  markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  type: 'default',
};

export default NotificationItem;