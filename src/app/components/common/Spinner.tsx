import { cn } from "@/app/lib/utils/others";

export const Spinner = ({
                          size = "md",
                          color = "auto",
                          className,
                        }: {
  size?: "sm" | "md" | "lg";
  color?: "auto" | "light" | "dark" | "green";
  className?: string;
}) => {
  const sizeClasses =
    size === "sm"
      ? "h-3 w-3 border-2"
      : size === "lg"
        ? "h-6 w-6 border-4"
        : "h-4 w-4 border-2";

  const colorClasses =
    color === "green"
      ? "border-accent-light border-t-accent-dark"
      : color === "light"
        ? "border-white border-t-transparent"
        : color === "dark"
          ? "border-gray-800 border-t-transparent"
          : "border-gray-300 border-t-gray-500";

  return (
    <span
      role="status"
      aria-label="Loading..."
      className="relative inline-flex items-center justify-center pointer-events-none"
    >
      <span
        className={ cn(
          "block rounded-full animate-spin-smooth",
          sizeClasses,
          colorClasses,
          className
        ) }
      />
    </span>
  );
};
