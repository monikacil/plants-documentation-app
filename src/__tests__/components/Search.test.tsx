import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Search from "@/components/common/Search";
import userEvent from "@testing-library/user-event";

const mockRouterReplace = jest.fn();
const mockRouterRefresh = jest.fn();
const mockRouterPush = jest.fn();

jest.mock("next/navigation", () => {
  const originalModule = jest.requireActual("next/navigation");
  return {
    __esModule: true,
    ...originalModule,
    useRouter: jest.fn().mockImplementation(() => {
      return {
        push: mockRouterPush,
        replace: mockRouterReplace,
        refresh: mockRouterRefresh,
      };
    }),
    useSearchParams: jest.fn().mockImplementation(() => {
      return new URLSearchParams(window.location.search);
    }),
    usePathname: jest.fn().mockImplementation((pathArgs) => {
      return pathArgs;
    }),
  };
});

describe("Search", () => {
  it("renders a search input", () => {
    render(<Search />);
    const input = screen.getByTestId("input");
    expect(input).toBeInTheDocument();
  });

  it("set input value", async () => {
    render(<Search placeholder="Test" />);
    const input = screen.getByTestId("input");

    await userEvent.type(input, "Test");
    expect(input).toHaveValue("Test");
  });
});
