import { cn } from "@/app/lib/utils/others.ts";

export const Spinner = ({ className }: { className?: string }) => (
  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
    <span
      className={ cn(
        "animate-spin block h-4 w-4 border-2 border-white border-t-transparent rounded-full",
        className
      ) }
    />
  </span>
);