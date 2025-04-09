import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExpensesTable from "@/components/expenses/ExpensesTable";
import { TableHeadContext } from "@/components/table/TableHeadContext";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/expenses"),
  useSearchParams: jest.fn(() => [new URLSearchParams({ detail: "true" }), jest.fn()]),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: "/expenses",
  })),
}));

const mockTableHeaders = ["Products", "Shop", "Price", "Date"];
const mockExpenses = [
  {
    _id: "1",
    products: "Apples",
    shop: "Local Market",
    price: "10.00",
    date: new Date("2023-01-01"),
  },
  {
    _id: "2",
    products: "Bananas",
    shop: "Supermarket",
    price: "5.00",
    date: new Date("2023-01-02"),
  },
];

describe("ExpensesTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the table with data", () => {
    render(
      <TableHeadContext.Provider value={{ headers: mockTableHeaders }}>
        <ExpensesTable
          expensesList={mockExpenses}
          details={true}
        />
      </TableHeadContext.Provider>
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    mockTableHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
    expect(screen.getByText("Apples")).toBeInTheDocument();
    expect(screen.getByText("Local Market")).toBeInTheDocument();
    expect(screen.getByText("10.00")).toBeInTheDocument();
    expect(screen.getByText(new Date("2023-01-01").toLocaleDateString())).toBeInTheDocument();
    expect(screen.getByText("5.00")).toBeInTheDocument();
  });

  it("renders 'No data' when the expenses list is empty", () => {
    render(
      <ExpensesTable
        expensesList={[]}
        details={true}
      />
    );

    // Assert that the "No data" message is displayed
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("renders the table without details when details is false", () => {
    render(
      <ExpensesTable
        expensesList={mockExpenses}
        details={false}
      />
    );

    // Assert that the table is rendered
    expect(screen.getByRole("table")).toBeInTheDocument();

    // Assert that the table rows are rendered
    expect(screen.getByText("Apples")).toBeInTheDocument();
    expect(screen.getByText("Bananas")).toBeInTheDocument();
  });
});
