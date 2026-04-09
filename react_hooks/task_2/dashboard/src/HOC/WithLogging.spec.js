import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import WithLogging from './WithLogging';

afterEach(cleanup);

class MockApp extends React.Component {
  render() {
    return <h1>Hello from Mock App Component</h1>;
  }
}

describe('WithLogging HOC', () => {
  test('renders wrapped component correctly', () => {
    const Wrapped = WithLogging(MockApp);
    const { getByText } = render(<Wrapped />);
    expect(getByText(/Hello from Mock App Component/i)).toBeInTheDocument();
  });
});