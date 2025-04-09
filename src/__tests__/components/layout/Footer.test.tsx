import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "@/components/layout/Footer"; // Adjust the import path as needed

describe("Footer", () => {
  it("renders the footer component", () => {
    render(<Footer />);

    // Assert that the footer is rendered
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("displays the copyright text", () => {
    render(<Footer />);

    // Use a custom function to match the text
    const copyright = screen.getByText(
      (content) =>
        content.includes(`© ${new Date().getFullYear()}`) &&
        content.includes("All Rights Reserved.")
    );

    expect(copyright).toBeInTheDocument();
  });

  it("applies the custom className if provided", () => {
    render(<Footer className='custom-class' />);

    // Assert that the custom class is applied
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("custom-class");
  });
});
