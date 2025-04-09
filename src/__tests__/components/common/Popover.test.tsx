import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "@/components/common/Button"; // Adjust the path as needed

describe("Button", () => {
  it("renders the button with the correct text", () => {
    // Render the Button with text
    render(<Button>Click Me</Button>);

    // Assert that the button is rendered with the correct text
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("handles click events", () => {
    // Mock the click handler
    const handleClick = jest.fn();

    // Render the Button with the click handler
    render(<Button onClick={handleClick}>Click Me</Button>);

    // Simulate a click event
    fireEvent.click(screen.getByRole("button", { name: /click me/i }));

    // Assert that the click handler was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom class names", () => {
    // Render the Button with a custom class
    render(<Button className='custom-class'>Click Me</Button>);

    // Assert that the button has the custom class
    expect(screen.getByRole("button", { name: /click me/i })).toHaveClass("custom-class");
  });

  it("renders a disabled button", () => {
    // Render the Button with the disabled prop
    render(<Button disabled>Click Me</Button>);

    // Assert that the button is disabled
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDisabled();
  });

  it("does not call the click handler when disabled", () => {
    // Mock the click handler
    const handleClick = jest.fn();

    // Render the Button with the disabled prop and click handler
    render(
      <Button
        disabled
        onClick={handleClick}
      >
        Click Me
      </Button>
    );

    // Simulate a click event
    fireEvent.click(screen.getByRole("button", { name: /click me/i }));

    // Assert that the click handler was not called
    expect(handleClick).not.toHaveBeenCalled();
  });
});
