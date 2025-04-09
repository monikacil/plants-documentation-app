import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthProvider } from "@/AuthProvider";

jest.mock("@kinde-oss/kinde-auth-nextjs", () => ({
  KindeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='kinde-provider'>{children}</div>
  ),
}));

describe("AuthProvider", () => {
  it("renders the KindeProvider with children", () => {
    // Render the AuthProvider with mock children
    render(
      <AuthProvider>
        <div data-testid='child'>Child Component</div>
      </AuthProvider>
    );

    // Assert that the KindeProvider is rendered
    expect(screen.getByTestId("kinde-provider")).toBeInTheDocument();

    // Assert that the children are rendered inside the KindeProvider
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
