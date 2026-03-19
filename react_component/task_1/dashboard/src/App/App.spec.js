import React from 'react';
import {  mount } from 'enzyme';
import App from './App';

describe('App component lifecycle', () => {
  let logOutMock;
  let alertMock;

  beforeEach(() => {
    // Create a mock for logOut prop
    logOutMock = jest.fn();
    // Mock the window.alert function
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore the original alert function
    alertMock.mockRestore();
    jest.restoreAllMocks();
  });

  it('calls logOut and alert when ctrl+h are pressed', () => {
    // We use mount because we need the lifecycle methods and DOM interaction
    const wrapper = mount(<App logOut={logOutMock} />);
    
    // Create the keyboard event
    const event = new KeyboardEvent('keydown', {
      key: 'h',
      ctrlKey: true,
    });

    // Dispatch the event on the window
    window.dispatchEvent(event);

    // Verify logOut was called once
    expect(logOutMock).toHaveBeenCalledTimes(1);
    
    // Verify alert was called with specific string
    expect(alertMock).toHaveBeenCalledWith('Logging you out');

    wrapper.unmount();
  });
});