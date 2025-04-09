import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "@/components/form/Input"; // Adjust the import path as needed

describe("Input Component", () => {
  it("renders the input with the correct placeholder", () => {
    // Mock the onChange handler
    const handleChange = jest.fn();

    // Render the Input component with a placeholder and onChange handler
    render(
      <Input
        placeholder='Enter your name'
        onChange={handleChange}
      />
    );

    // Assert that the input is rendered with the correct placeholder
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
  });

  it("updates the value when the user types", () => {
    // Mock the onChange handler
    const handleChange = jest.fn();

    // Render the Input component
    render(
      <Input
        placeholder='Enter your name'
        onChange={handleChange}
      />
    );

    // Get the input element
    const input = screen.getByPlaceholderText("Enter your name");

    // Simulate typing into the input field
    fireEvent.change(input, { target: { value: "John Doe" } });

    // Assert that the input value is updated
    expect(input).toHaveValue("John Doe");
  });

  it("calls the onChange handler when the value changes", () => {
    // Mock the onChange handler
    const handleChange = jest.fn();

    // Render the Input component with the onChange handler
    render(
      <Input
        placeholder='Enter your name'
        onChange={handleChange}
      />
    );

    // Get the input element
    const input = screen.getByPlaceholderText("Enter your name");

    // Simulate typing into the input field
    fireEvent.change(input, { target: { value: "Jane Doe" } });

    // Assert that the onChange handler is called
    expect(handleChange).toHaveBeenCalledWith("Jane Doe");
  });
});
