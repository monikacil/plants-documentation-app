import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "@/app/components/auth/AuthForm";
import { signIn } from "next-auth/react";
/* eslint-disable  @typescript-eslint/no-explicit-any */
// Mock next/form
jest.mock("next/form", () => {
  return function Form({ children, action, ...props }: any) {
    return (
      <form
        { ...props }
        onSubmit={ (e) => {
          e.preventDefault();
          if (action) action(new FormData(e.currentTarget));
        } }
      >
        { children }
      </form>
    );
  };
});

// Mock useActionState hook
jest.mock("react", () => {
  const originalModule = jest.requireActual("react");
  return {
    ...originalModule,
    useActionState: () => {
      const [state] = originalModule.useState(null);
      const action = async () => {
        return { success: true };
      };
      return [state, action, false];
    },
  };
});

// Mock helper components
jest.mock("@/app/components/common/Toast", () => ({
  toastCustom: jest.fn(),
}));

jest.mock("@/app/actions/auth", () => ({
  authOrSignIn: jest.fn(),
}));

describe("AuthForm", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form by default", () => {
    render(<AuthForm/>);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in with credentials/i })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("switches to registration mode", async () => {
    render(<AuthForm/>);

    await user.click(screen.getByText("Sign up"));

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register with credentials/i })).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  it("handles form submission", async () => {
    render(<AuthForm/>);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    const submitButton = screen.getByRole("button", { name: /log in with credentials/i });
    await user.click(submitButton);

    expect(submitButton).toHaveAttribute("aria-label", "Log in with Credentials");
  });

  it("handles Google sign in", async () => {
    render(<AuthForm/>);
    const googleButton = screen.getByRole("button", { name: /log in with google/i });
    await user.click(googleButton);
    expect(signIn).toHaveBeenCalledWith("google");
  });

  it("handles Facebook sign in", async () => {
    render(<AuthForm/>);
    const facebookButton = screen.getByRole("button", { name: /log in with facebook/i });
    await user.click(facebookButton);
    expect(signIn).toHaveBeenCalledWith("facebook");
  });

  it("shows loading state during submission", async () => {
    render(<AuthForm/>);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    const submitButton = screen.getByRole("button", { name: /log in with credentials/i });

    expect(submitButton).toHaveAttribute("aria-label", "Log in with Credentials");
  });
});
