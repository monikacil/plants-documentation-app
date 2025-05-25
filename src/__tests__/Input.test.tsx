// Input.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "@/app/components/form/Input";
import { useState } from "react";

describe("Input", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renderuje input z etykietą", () => {
    render(
      <Input
        label="Email"
        name="email"
        value=""
        onChange={ mockOnChange }
      />
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renderuje wartość początkową", () => {
    render(
      <Input
        label="Username"
        name="username"
        value="testuser"
        onChange={ mockOnChange }
      />
    );

    expect(screen.getByLabelText("Username")).toHaveValue("testuser");
  });

  it("wyświetla błędy walidacji", () => {
    const errors = ["Pole jest wymagane", "Nieprawidłowy format"];
    render(
      <Input
        label="Email"
        name="email"
        value=""
        errors={ errors }
        onChange={ mockOnChange }
      />
    );

    errors.forEach(error => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-describedby", "email-error");
  });

  it("obsługuje zmianę wartości", () => {
    const TestComponent = () => {
      const [value, setValue] = useState("");
      return (
        <Input
          label="Test"
          name="test"
          value={ value }
          onChange={ (newValue) => {
            setValue(newValue);
            mockOnChange(newValue);
          } }
        />
      );
    };

    render(<TestComponent/>);
    const input = screen.getByLabelText("Test");

    fireEvent.change(input, { target: { value: "nowa wartość" } });

    expect(mockOnChange).toHaveBeenCalledWith("nowa wartość");
    expect(input).toHaveValue("nowa wartość");
  });

  it("obsługuje typ password i przełączanie widoczności hasła", () => {
    render(
      <Input
        label="Hasło"
        name="password"
        type="password"
        value="tajnehasło"
        onChange={ mockOnChange }
      />
    );

    const input = screen.getByLabelText("Hasło");
    expect(input).toHaveAttribute("type", "password");

    const toggleButton = screen.getByLabelText("Show password", { selector: "span" });
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("obsługuje właściwość disabled", () => {
    render(
      <Input
        label="Disabled"
        name="disabled"
        value=""
        disabled
        onChange={ mockOnChange }
      />
    );

    expect(screen.getByLabelText("Disabled")).toBeDisabled();
  });

  it("obsługuje właściwość readOnly", () => {
    render(
      <Input
        label="Readonly"
        name="readonly"
        value="test"
        readOnly
        onChange={ mockOnChange }
      />
    );

    expect(screen.getByLabelText("Readonly")).toHaveAttribute("readonly");
  });

  it("obsługuje placeholder", () => {
    render(
      <Input
        label="Search"
        name="search"
        placeholder="Wyszukaj..."
        value=""
        onChange={ mockOnChange }
      />
    );

    expect(screen.getByPlaceholderText("Wyszukaj...")).toBeInTheDocument();
  });

  it("obsługuje autofocus", () => {
    render(
      <Input
        label="Autofocus"
        name="autofocus"
        value=""
        autoFocus
        onChange={ mockOnChange }
      />
    );

    expect(screen.getByLabelText("Autofocus")).toHaveFocus();
  });

  it("obsługuje różne typy inputów", () => {
    const types = ["text", "email", "number", "tel", "url"];

    types.forEach(type => {
      render(
        <Input
          label={ type }
          name={ type }
          type={ type }
          value=""
          onChange={ mockOnChange }
        />
      );
      expect(screen.getByLabelText(type)).toHaveAttribute("type", type);
    });
  });

  it("obsługuje zdarzenie onFocus", () => {
    const handleFocus = jest.fn();
    render(
      <Input
        label="Focus test"
        name="focus"
        value=""
        onChange={ mockOnChange }
        onFocus={ handleFocus }
      />
    );

    fireEvent.focus(screen.getByLabelText("Focus test"));
    expect(handleFocus).toHaveBeenCalled();
  });

  it("obsługuje zdarzenie onBlur", () => {
    const handleBlur = jest.fn();
    render(
      <Input
        label="Blur test"
        name="blur"
        value=""
        onChange={ mockOnChange }
        onBlur={ handleBlur }
      />
    );

    fireEvent.blur(screen.getByLabelText("Blur test"));
    expect(handleBlur).toHaveBeenCalled();
  });

  it("obsługuje wpisywanie tekstu z użyciem userEvent", async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const [value, setValue] = useState("");
      return (
        <Input
          label="Text input"
          name="text"
          value={ value }
          onChange={ (newValue) => {
            setValue(newValue);
            mockOnChange(newValue);
          } }
        />
      );
    };

    render(<TestComponent/>);
    const input = screen.getByLabelText("Text input");

    await user.type(input, "Hello");
    expect(input).toHaveValue("Hello");
    expect(mockOnChange).toHaveBeenCalledTimes(5); // po jednym razie na każdą literę
  });
});