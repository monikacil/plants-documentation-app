import { cn } from "@/app/lib/utils/others";
import { GiMonsteraLeaf } from "react-icons/gi";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

export default function Logo({ className, size = "md" }: Props) {
  const sizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl",
    xl: "text-6xl",
  };

  return (
    <div
      data-testid="main-logo"
      className={ cn(
        `flex items-center gap-2 font-semibold`,
        className
      ) }
    >
      <GiMonsteraLeaf
        className={ `${ sizes[ size ] } text-primary-light` }
      />
      <div className={ sizes[ size ] }>PlantsDoc</div>
    </div>
  );
}
