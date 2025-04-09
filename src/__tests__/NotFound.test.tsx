import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from "@/not-found";

describe("NotFound Page", () => {
  it("renders the 404 message and heading", () => {
    // Render the NotFound component
    render(<NotFound />);

    // Assert that the 404 message is displayed
    expect(screen.getByText("404")).toBeInTheDocument();

    // Assert that the heading is displayed
    expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();

    // Assert that the description is displayed
    expect(
      screen.getByText(/sorry, we couldn’t find the page you’re looking for/i)
    ).toBeInTheDocument();
  });

  it("renders the 'Return Home' link", () => {
    // Render the NotFound component
    render(<NotFound />);

    // Assert that the "Return Home" link is displayed
    const link = screen.getByRole("link", { name: /return home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
