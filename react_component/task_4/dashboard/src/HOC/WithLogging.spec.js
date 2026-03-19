import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
  render() {
    return (
      <h1>
        Hello from Mock App Component
      </h1>
    );
  }
}

const MockAppWithLogging = WithLogging(MockApp);

afterEach(cleanup);

describe('WithLogging HOC', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  it('renders the wrapped component correctly', () => {
    render(<MockAppWithLogging />);
    expect(screen.getByText('Hello from Mock App Component')).toBeInTheDocument();
  });

  it('has the correct displayName', () => {
    expect(MockAppWithLogging.displayName).toBe('WithLogging(MockApp)');
  });

  it('logs mount message on componentDidMount', () => {
    render(<MockAppWithLogging />);
    expect(console.log).toHaveBeenCalledWith('Component MockApp is mounted');
  });

  it('logs unmount message on componentWillUnmount', () => {
    const { unmount } = render(<MockAppWithLogging />);
    unmount();
    expect(console.log).toHaveBeenCalledWith('Component MockApp is going to unmount');
  });

  it('defaults to "Component" when wrapped element has no name', () => {
    const AnonymousWithLogging = WithLogging(() => <div />);
    expect(AnonymousWithLogging.displayName).toBe('WithLogging(Component)');
  });
});