import { cn } from "@/app/lib/utils/others";
import { GiMonsteraLeaf } from "react-icons/gi";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
};

export function Logo({ className, size = "md", animated = true }: Props) {
  const sizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-3xl md:text-4xl",
    xl: "text-4xl md:text-6xl",
  };

  return (
    <div
      data-testid="main-logo"
      className={ cn(
        "flex items-center gap-2 font-semibold select-none",
        animated && "animate-fade-in",
        className
      ) }
    >
      <GiMonsteraLeaf
        className={ cn(
          sizes[size],
          "text-primary-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]",
          "@media (prefers-color-scheme: dark):text-accent-dark",
          "@media (prefers-color-scheme: dark):drop-shadow-none",
          "transition-transform duration-500 ease-in-out",
          "hover:rotate-[6deg] hover:scale-105",
          animated && "animate-pop-in"
        ) }
        aria-hidden="true"
      />
      <span
        className={ cn(
          sizes[size],
          "tracking-tight font-semibold leading-none"
        ) }
      >
        Plants<span className="text-primary-light">@</span>Doc
      </span>
    </div>
  );
}
