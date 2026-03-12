import { render, screen } from "@testing-library/react";
import App from "./App";


test("renders h1 with School Dashboard text",  () => {
    render(<App/>)
    expect(screen.getByRole('heading')).toHaveTextContent(/School dashboard/i);
})

test("renders correct text in body and footer paragraphs", () => {
    render(<App />)
    expect(screen.getByText(/Login to access the full dashboard/i));
    expect(screen.getByText(/Copyright/i));
})
test("renders an image", () => {
    render(<App />);
    const image = screen.getByAltText(/holberton logo/i);
    expect(image).toBeInTheDocument();
});