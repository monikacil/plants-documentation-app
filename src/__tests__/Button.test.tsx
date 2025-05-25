import { fireEvent, render, screen } from "@testing-library/react";
import Button from "@/app/components/common/Button";

describe("Button", () => {
  it("renderuje przycisk z tekstem", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("obsługuje kliknięcia", () => {
    const handleClick = jest.fn();
    render(<Button onClick={ handleClick }>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renderuje ikonę, gdy jest przekazana", () => {
    const TestIcon = () => <svg data-testid="test-icon"/>;
    render(<Button icon={ <TestIcon/> }>With Icon</Button>);

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByText("With Icon")).toBeInTheDocument();
  });

  it("stosuje przekazane klasy CSS", () => {
    const customClass = "custom-class";
    render(<Button className={ customClass }>Styled Button</Button>);

    expect(screen.getByRole("button")).toHaveClass(customClass);
  });

  it("ustawia typ przycisku", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("obsługuje stan wyłączenia", () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renderuje z aria-label", () => {
    render(<Button aria-label="Test button">Button</Button>);
    expect(screen.getByLabelText("Test button")).toBeInTheDocument();
  });

  it("przekazuje dodatkowe atrybuty", () => {
    render(<Button data-testid="custom-button" id="test-id">Button</Button>);
    const button = screen.getByTestId("custom-button");

    expect(button).toHaveAttribute("id", "test-id");
  });

  it("zachowuje się poprawnie przy wielokrotnych kliknięciach", () => {
    const handleClick = jest.fn();
    render(<Button onClick={ handleClick }>Multiple Clicks</Button>);

    const button = screen.getByRole("button");
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(3);
  });
});
