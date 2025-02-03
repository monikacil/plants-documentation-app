import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "./AuthForm";
import React from "react";
import { AuthFormState } from "@/app/lib/zod/zodUser";

const initState = {
  errors: {
    email: undefined,
    password: undefined,
    message: undefined,
  },
};

describe("AuthForm", () => {
  const mockFn = jest.fn(() => Promise.resolve());
  const setStateMock = jest.fn();

  jest
    .spyOn(React, "useState")
    .mockImplementation((state: AuthFormState = initState) => [
      state,
      setStateMock,
    ]);

  it("renders logo", () => {
    render(<AuthForm btnText="Login" authAction={mockFn} />);
    const logo = screen.getByTestId("main-logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders form", () => {
    render(<AuthForm btnText="Login" authAction={mockFn} />);
    const form = screen.getByTestId("auth-form");
    expect(form).toBeInTheDocument();
  });

  it("should call the action after button click", async () => {
    render(<AuthForm btnText="Login" authAction={mockFn} />);
    const button = screen.getByTestId("submit-btn");
    await userEvent.click(button);
    waitFor(() => expect(mockFn).toHaveBeenCalled());
  });
});
