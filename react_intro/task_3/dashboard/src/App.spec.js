import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders h1 with School Dashboard text", () => {
    render(<App />);
    expect(screen.getByRole("heading")).toHaveTextContent(/school dashboard/i);
});

test("renders correct text in body and footer paragraphs", () => {
    render(<App />);
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/copyright/i)).toBeInTheDocument();
});

test("renders an image", () => {
    render(<App />);
    const image = screen.getByAltText(/holberton logo/i);
    expect(image).toBeInTheDocument();
});

test("renders 2 labels Email and Password", () => {
    render(<App />);
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();
});

test("renders 2 input elements (email and password)", () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
});

test("renders a button with OK text", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /ok/i });
    expect(button).toBeInTheDocument();
});