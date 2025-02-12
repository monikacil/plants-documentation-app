import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Button from "@/components/common/Button";

describe("Button", () => {
  const mockFn = jest.fn();

  it("renders button", () => {
    render(<Button onClick={mockFn}>Test</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Test");
  });

  it("button clicked", async () => {
    render(<Button onClick={mockFn}>Test</Button>);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(mockFn).toHaveBeenCalled();
  });

  it("is button disabled", () => {
    render(
      <Button onClick={mockFn} disabled>
        Test
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
