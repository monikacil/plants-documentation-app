import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/components/layout/Header"; // Adjust the import path as needed
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

jest.mock("@kinde-oss/kinde-auth-nextjs/server", () => ({
  getKindeServerSession: jest.fn(() => ({
    isAuthenticated: jest.fn(),
  })),
}));

describe("Header", () => {
  it("renders the header component", async () => {
    (getKindeServerSession as jest.Mock).mockReturnValue({
      isAuthenticated: jest.fn(() => false), // Simulate `null` for unauthenticated users
    });

    render(await Header({}));

    // Assert that the header is rendered
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders the navigation when the user is authenticated", async () => {
    (getKindeServerSession as jest.Mock).mockReturnValue({
      isAuthenticated: jest.fn(() => true), // Simulate `true` for authenticated users
    });

    render(await Header({}));

    // Assert that the navigation is rendered
    const navigation = screen.getByRole("navigation");
    expect(navigation).toBeInTheDocument();
  });

  it("does not render the navigation when the user is not authenticated", async () => {
    (getKindeServerSession as jest.Mock).mockReturnValue({
      isAuthenticated: jest.fn(() => null), // Simulate `null` for unauthenticated users
    });

    render(await Header({}));

    // Assert that the navigation is not rendered
    const navigation = screen.queryByRole("nav");
    expect(navigation).not.toBeInTheDocument();
  });

  it("applies the custom className if provided", async () => {
    (getKindeServerSession as jest.Mock).mockReturnValue({
      isAuthenticated: jest.fn(() => null), // Simulate `null` for unauthenticated users
    });

    render(await Header({ className: "custom-class" }));

    // Assert that the custom class is applied
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("custom-class");
  });
});
