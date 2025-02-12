import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Input from "@/components/form/Input";

describe("Input", () => {
  const mockFn = jest.fn();

  it("renders a input element without label", () => {
    render(<Input onChange={mockFn} />);
    const input = screen.getByTestId("input");
    expect(input).toBeInTheDocument();
  });

  it("renders a input element with label", () => {
    render(<Input onChange={mockFn} label="email" />);
    const input = screen.getByTestId("input");
    const label = screen.getByText("email");
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it("renders with errors", async () => {
    const { rerender } = render(<Input onChange={mockFn} label="email" />);
    expect(screen.getByTestId("zod-error")).not.toHaveTextContent("error");

    rerender(<Input onChange={mockFn} label="email" errors="error" />);
    expect(screen.getByTestId("zod-error")).toHaveTextContent("error");
  });
});
