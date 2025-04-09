import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ZodErrors from "@/components/common/ZodErrors"; // Adjust the import path as needed
import { ZodError, ZodIssue } from "zod";

describe("ZodErrors", () => {
  it("renders no errors when no error is provided", () => {
    // Render the ZodErrors component with no errors
    render(<ZodErrors error={null} />);

    // Assert that no error messages are displayed
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders a single error message", () => {
    // Create a mock ZodError with a single issue
    const mockError = new ZodError([
      {
        path: ["name"],
        message: "Name is required",
        code: "custom",
      } as ZodIssue,
    ]);

    // Render the ZodErrors component with the mock error
    render(<ZodErrors error={mockError} />);

    // Assert that the error message is displayed
    expect(screen.getByRole("alert")).toHaveTextContent("Name is required");
  });

  it("renders multiple error messages", () => {
    // Create a mock ZodError with multiple issues
    const mockError = new ZodError([
      {
        path: ["name"],
        message: "Name is required",
        code: "custom",
      } as ZodIssue,
      {
        path: ["email"],
        message: "Email is invalid",
        code: "custom",
      } as ZodIssue,
    ]);

    // Render the ZodErrors component with the mock error
    render(<ZodErrors error={mockError} />);

    // Assert that all error messages are displayed
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is invalid")).toBeInTheDocument();
  });
});
