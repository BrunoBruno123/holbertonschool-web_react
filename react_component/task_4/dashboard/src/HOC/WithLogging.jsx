import React from 'react';

const WithLogging = (WrappedComponent) => {
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const WithLoggingHOC = class extends React.Component {
    componentDidMount() {
      console.log(`Component ${componentName} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${componentName} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  WithLoggingHOC.displayName = `WithLogging(${componentName})`;

  return WithLoggingHOC;
};

export default WithLogging;