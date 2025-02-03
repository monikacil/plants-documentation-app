import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LandingPage from "../app/page";

describe("LandingPage", () => {
  it("renders a landingPage main tag", () => {
    render(<LandingPage />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("renders a landingPage article", () => {
    render(<LandingPage />);
    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
  });

  it("renders a logo", () => {
    render(<LandingPage />);
    const logo = screen.getByTestId("main-logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders a link", () => {
    render(<LandingPage />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  it("renders a link button", () => {
    render(<LandingPage />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("renders a img", () => {
    render(<LandingPage />);
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });
});
