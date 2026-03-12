import { render, screen } from '@testing-library/react';
import App from './App';

test('renders h1 with text School Dashboard', () => {
    render(<App />);
    expect(screen.getByText(/School Dashboard/i)).toBeInTheDocument();
});

test('renders correct text in app-body and app-footer', () => {
    render(<App />);
    expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
});

test('renders an img element', () => {
    render(<App />);
    const img = screen.getByAltText(/holberton logo/i);
    expect(img).toBeInTheDocument();
});