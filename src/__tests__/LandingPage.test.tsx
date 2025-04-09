import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import LandingPage from "@/page";

// Mock the `getKindeServerSession` function
jest.mock("@kinde-oss/kinde-auth-nextjs/server", () => ({
  getKindeServerSession: jest.fn(),
}));

describe("LandingPage", () => {
  it("renders login and sign-up buttons when the user is not authenticated (isAuthenticated returns null)", async () => {
    // Mock `getKindeServerSession` to return an object with `isAuthenticated` as a function returning null
    (getKindeServerSession as jest.Mock).mockReturnValue({
      isAuthenticated: jest.fn(() => null), // Simulate `null` for unauthenticated users
    });

    // Render the component
    render(await LandingPage());

    // Assert that the login and sign-up buttons are rendered
    expect(await screen.findByText(/login/i)).toBeInTheDocument();
    expect(await screen.findByText(/sign up/i)).toBeInTheDocument();
  });

  it("renders the 'Go to Dashboard' button when the user is authenticated", async () => {
    // Mock `useKindeBrowserClient` to return an object with `isAuthenticated` as a function returning true
    (getKindeServerSession as jest.Mock).mockReturnValue({
      isAuthenticated: jest.fn(() => true), // Simulate `true` for authenticated users
    });

    // Render the component
    render(await LandingPage());

    // Assert that the "Go to Dashboard" button is rendered
    expect(await screen.findByText(/dashboard/i)).toBeInTheDocument();
  });
});
