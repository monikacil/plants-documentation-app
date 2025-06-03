interface ErrorMessageProps {
  errors: string[];
  id: string;
}

export function ErrorMessage({ errors, id }: ErrorMessageProps) {
  if (!errors?.length) return null;
  return (
    <div
      id={ id }
      role="alert"
      aria-live="assertive"
      className="error-message"
    >
      { errors.map((err, idx) => (
        <p key={ idx }>{ err }</p>
      )) }
    </div>
  );
}
