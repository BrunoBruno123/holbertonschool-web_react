/* eslint-disable no-undef */
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

global.alert = jest.fn();

describe("App Component", () => {
    beforeEach(() => {

        render(<App />);
    });

    it.skip("Renders Header component", () => {
        const heading = screen.getByRole("heading", {
            level: 1,
            name: /school dashboard/i,
        });
        expect(heading).toBeInTheDocument();
    });

    it.skip("Renders Login Component", () => {
        const loginText = screen.getByText(/Login to access the full dashboard/i);
        expect(loginText).toBeInTheDocument();
    });

    it.skip("Renders Footer Component", () => {
        expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
    });

    it.skip("CourseList is rendered when isLoggedIn is false", () => {
        cleanup();

        const rendered = render(<App />);
        const container = rendered.container;

        const loginComponent = container.querySelector(".App-body");

        expect(loginComponent).toBeInTheDocument();
    });

 
    it.skip("CourseList is rendered when isLoggedIn is true", () => {
        cleanup();

        const rendered = render(<App isLoggedIn={true} />);
        const container = rendered.container;

        const courseList = container.querySelector("#CourseList");

 
        expect(courseList).toBeInTheDocument();
    });

  
    it("Logout function gets called once", async () => {
        cleanup();

      
        const logOut = jest.fn();

        render(<App logOut={logOut} />);

        await userEvent.keyboard("{Control>}h{/Control}");

       
        expect(logOut).toBeCalledTimes(1);
    })

  
    it("Alert function is called", async () => {
        cleanup();

   

        await userEvent.keyboard("{Control>}h{/Control}");

        expect(global.alert).toHaveBeenCalledWith("Logging you out");


    })
});