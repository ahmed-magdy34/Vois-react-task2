// AppLayout.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";

// Mock the Header and SideBar components for easier testing.
jest.mock("./Header", () => () => <div data-testid="header">Mock Header</div>);
jest.mock("./SideBar", () => () => (
  <div data-testid="sidebar">Mock SideBar</div>
));

describe("AppLayout Component", () => {
  test("renders Header, SideBar, and main content container", () => {
    // Render the component within a MemoryRouter.
    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>
    );

    // Check that the mocked Header and SideBar components appear.
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();

    // Check that the main area is rendered. (If you set a className or specific text inside <main>,
    // you can use getByRole, getByTestId, or getByText. Here, we check via class name using container.)
    const mainElement = document.querySelector("main");
    expect(mainElement).toBeInTheDocument();
  });

  test("renders Outlet content when nested route is provided", () => {
    // In order for the Outlet to render content, we define a child route.
    render(
      <MemoryRouter initialEntries={["/test"]}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              path="test"
              element={<div data-testid="outlet">Outlet Content</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Verify that the Outlet area now contains our test content.
    const outlet = screen.getByTestId("outlet");
    expect(outlet).toBeInTheDocument();
    expect(outlet).toHaveTextContent("Outlet Content");
  });
});
