import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormDatepicker from "@/components/form/FormDatepicker"; // Adjust the import path as needed

jest.mock("tailwind-datepicker-react", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function MockDatepicker({ onChange, children }: any) {
    return (
      <div data-testid='mock-datepicker'>
        {children}
        <button
          data-testid='mock-datepicker-button'
          onClick={() => onChange(new Date("2025-04-15"))}
        >
          Select Date
        </button>
      </div>
    );
  };
});

describe("FormDatepicker", () => {
  const mockOnChange = jest.fn();

  it("renders the date picker wrapper", () => {
    render(
      <FormDatepicker
        name='date'
        onChange={mockOnChange}
      />
    );

    const wrapper = screen.getByTestId("datepicker-wrapper");
    expect(wrapper).toBeInTheDocument();
  });

  it("renders the input element", () => {
    render(
      <FormDatepicker
        name='date'
        onChange={mockOnChange}
      />
    );

    const input = screen.getByTestId("datepicker-input");
    expect(input).toBeInTheDocument();
  });

  it("calls the onChange handler when a date is selected", () => {
    render(
      <FormDatepicker
        name='date'
        onChange={mockOnChange}
      />
    );

    const input = screen.getByTestId("datepicker-input");
    expect(input).toBeInTheDocument();

    // Simulate focusing on the input to open the datepicker
    fireEvent.focus(input);

    // Simulate clicking the mock datepicker button to select a date
    const datepickerButton = screen.getByTestId("mock-datepicker-button");
    fireEvent.click(datepickerButton);

    // Assert that the onChange handler was called with the correct value
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(new Date("2025-04-15"));
  });
});
