import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navigation from "@/components/layout/Navigation";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/lib/navConfig", () => ({
  NAVIGATION_CONFIG: [
    { name: "Home", href: "/", type: "link" },
    { name: "About", href: "/about", type: "link" },
    {
      name: "Profile",
      type: "dropdown",
      options: [
        { name: "Settings", href: "/settings" },
        { name: "Logout", type: "button", action: jest.fn() },
      ],
    },
  ],
}));

// Mock the LogoutLink component
const mockLogoutAction = jest.fn();
jest.mock("@kinde-oss/kinde-auth-nextjs", () => ({
  LogoutLink: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <button
      className={className}
      onClick={mockLogoutAction}
      data-testid='logout-link'
    >
      {children}
    </button>
  ),
}));

describe("Navigation", () => {
  const mockAction = jest.fn();

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
    mockAction.mockClear(); // Clear mock calls before each test
  });

  it("renders the navigation component", () => {
    render(<Navigation />);

    // Assert that the navigation container is rendered
    const navigation = screen.getByTestId("nav-wrapper");
    expect(navigation).toBeInTheDocument();
  });

  it("renders dropdown menu items", () => {
    render(<Navigation />);

    // Assert that the dropdown is rendered
    const profileDropdown = screen.getByText(/profile/i);
    expect(profileDropdown).toBeInTheDocument();

    // Simulate clicking the dropdown
    fireEvent.click(profileDropdown);

    // Assert that dropdown options are rendered
    const settingsOption = screen.getByRole("link", { name: /settings/i });
    const logoutOption = screen.getByText(/logout/i);

    expect(settingsOption).toBeInTheDocument();
    expect(logoutOption).toBeInTheDocument();
  });

  it("handles logout action", () => {
    render(<Navigation />);

    // Simulate clicking the dropdown
    const profileDropdown = screen.getByText(/profile/i);
    fireEvent.click(profileDropdown);

    // Simulate clicking the logout button
    const logoutButton = screen.getByTestId("logout-link");
    fireEvent.click(logoutButton);

    // Assert that the logout action is called
    expect(mockLogoutAction).toHaveBeenCalledTimes(1);
  });
});
