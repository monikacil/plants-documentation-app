import { fireEvent, render, screen } from "@testing-library/react";
import { SocialLoginButtons } from "@/app/components/auth/SocialLoginButton";
import { signIn } from "next-auth/react";

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  signIn: jest.fn()
}));

describe("SocialLoginButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders social buttons", () => {
    render(<SocialLoginButtons/>);

    expect(screen.getByRole("button", { name: /log in with google/i }))
      .toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in with facebook/i }))
      .toBeInTheDocument();
  });

  it("calls signIn with the appropriate provider", async () => {
    render(<SocialLoginButtons/>);

    fireEvent.click(screen.getByRole("button", { name: /google/i }));
    expect(signIn).toHaveBeenCalledWith("google");

    fireEvent.click(screen.getByRole("button", { name: /facebook/i }));
    expect(signIn).toHaveBeenCalledWith("facebook");

    expect(signIn).toHaveBeenCalledTimes(2);
  });
});
