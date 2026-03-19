import React from 'react';

function createWithLogging(WrappedComponent) {
  const wrappedName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class WithLogging extends React.Component {
    componentDidMount() {
      console.log(`Component ${wrappedName} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${wrappedName} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithLogging.displayName = `WithLogging(${wrappedName})`;

  return WithLogging;
}

export default createWithLogging;