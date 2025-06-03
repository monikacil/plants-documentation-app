import { useRef, useState } from "react";

export function usePasswordToggle<T extends HTMLInputElement>() {
  const [showPassword, setShowPassword] = useState(false);
  const ref = useRef<T | null>(null);

  const toggle = () => {
    setShowPassword((prev) => !prev);
    ref.current?.focus();
  };

  return { showPassword, toggle, ref };
}
