import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

describe("Header Component", () => {
    it("renders the school dashboard heading", () => {
        render(<Header />);
        expect(
            screen.getByRole("heading", { name: /school dashboard/i })
        ).toBeInTheDocument();
    });

    it("renders the holberton logo", () => {
        render(<Header />);
        expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
    });

    it("does NOT show logout section when user is not logged in", () => {
        render(<Header user={{ email: "", password: "", isLoggedIn: false }} />);
        expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
    });

    it("shows welcome message and logout link when user is logged in", () => {
        render(
            <Header
                user={{
                    email: "test@test.com",
                    password: "password123",
                    isLoggedIn: true,
                }}
                logOut={() => {}}
            />
        );
        expect(screen.getByText(/welcome/i)).toBeInTheDocument();
        expect(screen.getByText("test@test.com", { exact: false })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /logout/i })).toBeInTheDocument();
    });

    it("calls logOut when logout link is clicked", async () => {
        const user = userEvent.setup();
        const mockLogOut = jest.fn();

        render(
            <Header
                user={{
                    email: "test@test.com",
                    password: "password123",
                    isLoggedIn: true,
                }}
                logOut={mockLogOut}
            />
        );

        await user.click(screen.getByRole("link", { name: /logout/i }));
        expect(mockLogOut).toHaveBeenCalledTimes(1);
    });
});