import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Logo from "@/components/layout/Logo";

describe("Logo Component", () => {
  it("renders the logo with default size", () => {
    render(<Logo />);

    // Assert that the main logo container is rendered
    const logo = screen.getByTestId("main-logo");
    expect(logo).toBeInTheDocument();

    // Assert that the text "PlantsDoc" is rendered
    expect(logo).toHaveTextContent("PlantsDoc");

    // Assert that the default size classes are applied
    expect(logo).toHaveClass("text-4xl");
  });

  it("renders the logo with a small size", () => {
    render(<Logo size='sm' />);

    // Assert that the main logo container is rendered
    const logo = screen.getByTestId("main-logo");
    expect(logo).toBeInTheDocument();

    // Assert that the small size classes are applied
    expect(logo).toHaveClass("text-xl");
  });

  it("renders the logo with a medium size", () => {
    render(<Logo size='md' />);

    // Assert that the main logo container is rendered
    const logo = screen.getByTestId("main-logo");
    expect(logo).toBeInTheDocument();

    // Assert that the medium size classes are applied
    expect(logo).toHaveClass("text-2xl");
  });

  it("renders the logo with a large size", () => {
    render(<Logo size='lg' />);

    // Assert that the main logo container is rendered
    const logo = screen.getByTestId("main-logo");
    expect(logo).toBeInTheDocument();

    // Assert that the large size classes are applied
    expect(logo).toHaveClass("text-4xl");
  });

  it("renders the logo with an extra-large size", () => {
    render(<Logo size='xl' />);

    // Assert that the main logo container is rendered
    const logo = screen.getByTestId("main-logo");
    expect(logo).toBeInTheDocument();

    // Assert that the extra-large size classes are applied
    expect(logo).toHaveClass("text-4xl");
  });

  it("applies additional custom classes", () => {
    render(<Logo className='custom-class' />);

    // Assert that the custom class is applied
    const logo = screen.getByTestId("main-logo");
    expect(logo).toHaveClass("custom-class");
  });
});
