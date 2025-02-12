import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FormDatePicker from "@/components/form/FormDatepicker";

describe("FormDatePicker", () => {
  const mockFn = jest.fn();

  it("renders a wrapper", () => {
    render(<FormDatePicker name="date" onChange={mockFn} />);
    const wrapper = screen.getByTestId("datepicker-wrapper");
    expect(wrapper).toBeInTheDocument();
  });

  it("renders a input element", () => {
    render(<FormDatePicker name="date" onChange={mockFn} />);
    const input = screen.getByTestId("datepicker-wrapper");
    expect(input).toBeInTheDocument();
  });
});
