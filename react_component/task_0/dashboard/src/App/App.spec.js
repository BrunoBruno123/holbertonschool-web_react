import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Notifications from '../Notifications/Notifications';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';

describe('App component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeTruthy();
  });

  it('passes notificationsList to Notifications as notifications prop', () => {
    const wrapper = shallow(<App />);
    const notifications = wrapper.find(Notifications);
    expect(notifications.prop('notifications')).toHaveLength(3);
    expect(notifications.prop('notifications')[0]).toEqual({
      id: 1, type: 'default', value: 'New course available',
    });
    expect(notifications.prop('notifications')[1]).toEqual({
      id: 2, type: 'urgent', value: 'New resume available',
    });
    expect(notifications.prop('notifications')[2]).toEqual({
      id: 3, type: 'urgent', html: { __html: 'Urgent requirement - complete by EOD' },
    });
  });

  describe('when isLoggedIn is false', () => {
    it('renders the Login component', () => {
      const wrapper = shallow(<App isLoggedIn={false} />);
      expect(wrapper.find(Login)).toHaveLength(1);
      expect(wrapper.find(CourseList)).toHaveLength(0);
    });
  });

  describe('when isLoggedIn is true', () => {
    it('renders the CourseList component', () => {
      const wrapper = shallow(<App isLoggedIn={true} />);
      expect(wrapper.find(CourseList)).toHaveLength(1);
      expect(wrapper.find(Login)).toHaveLength(0);
    });
  });
});