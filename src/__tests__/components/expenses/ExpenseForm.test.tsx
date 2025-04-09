import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import React from "react";

jest.mock("next/form", () => {
  return {
    __esModule: true,
    default: ({
      children,
      action,
      ...props
    }: {
      children: React.ReactNode;
      action: () => void;
    }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          action();
        }}
        {...props}
      >
        {children}
      </form>
    ),
  };
});

describe("ExpenseForm Component", () => {
  const mockAction = jest.fn();

  jest.mock("tailwind-datepicker-react", () => {
    const MockDatepicker = ({ onChange }: { onChange: (date: Date) => void }) => (
      <input
        data-testid='datepicker-input'
        type='text'
        placeholder='Select date'
        onChange={() => onChange(new Date("2023-01-01"))} // Simulate date selection
      />
    );
    MockDatepicker.displayName = "MockDatepicker";
    return MockDatepicker;
  });

  const mockExpense = {
    _id: "1",
    products: "Apples",
    shop: "Local Market",
    price: "10.00",
    date: new Date("2023-01-01"),
  };

  it("renders the form with default values", () => {
    render(<ExpenseForm action={mockAction} />);

    // Assert that the form fields are rendered
    expect(screen.getByPlaceholderText("Products")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Price")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Seller")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Select date")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save expense/i })).toBeInTheDocument();
  });

  it("renders the form with pre-filled values when an expense is provided", () => {
    render(
      <ExpenseForm
        expense={mockExpense}
        action={mockAction}
      />
    );

    // Assert that the form fields are pre-filled
    expect(screen.getByPlaceholderText("Products")).toHaveValue("Apples");
    expect(screen.getByPlaceholderText("Price")).toHaveValue("10.00");
    expect(screen.getByPlaceholderText("Seller")).toHaveValue("Local Market");
    expect(screen.getByPlaceholderText("Select date")).toHaveValue("Sun Jan 01 2023");
  });

  it("updates form fields when user types", () => {
    render(<ExpenseForm action={mockAction} />);

    const productsInput = screen.getByPlaceholderText("Products");
    const priceInput = screen.getByPlaceholderText("Price");
    const shopInput = screen.getByPlaceholderText("Seller");

    // Simulate user typing
    fireEvent.change(productsInput, { target: { value: "Bananas" } });
    fireEvent.change(priceInput, { target: { value: "5.00" } });
    fireEvent.change(shopInput, { target: { value: "Supermarket" } });

    // Assert that the inputs are updated
    expect(productsInput).toHaveValue("Bananas");
    expect(priceInput).toHaveValue("5.00");
    expect(shopInput).toHaveValue("Supermarket");
  });

  it("calls the action function when the form is submitted", () => {
    render(<ExpenseForm action={mockAction} />);

    const form = screen.getByTestId("expense-form");

    // Simulate form submission
    fireEvent.submit(form);

    // Assert that the action function is called
    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
