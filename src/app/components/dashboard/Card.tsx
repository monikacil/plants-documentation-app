import { cn } from "@/app/lib/utils/others";

import DefaultSkeleton from "@/app/components/common/DefaultSkeleton.tsx";

const sizeClasses = {
  sm: "md:col-span-4",
  md: "md:col-span-6",
  lg: "md:col-span-8",
};

const heightClasses = {
  auto: "h-auto",
  sm: "h-32",
  md: "h-48",
  lg: "h-64",
};

type CardProps = {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  isLoading?: boolean;
  skeleton?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  height?: "auto" | "sm" | "md" | "lg";
  className?: string;
};

export default function Card({
                               title,
                               icon,
                               children,
                               isLoading = false,
                               skeleton,
                               size = "md",
                               height = "auto",
                               className,
                             }: CardProps) {
  return (
    <div className={ cn(
      "bg-white dark:bg-card-dark shadow-md rounded-xl p-5 flex flex-col gap-3",
      sizeClasses[ size ],
      heightClasses[ height ],
      className
    ) }>
      <div className="flex items-center gap-3 text-xl font-semibold">
        <span className="text-3xl">{ icon }</span>
        <span className="text-muted-light dark:text-muted-dark text-sm uppercase tracking-wide">
          { title }
        </span>
      </div>
      <div className="text-lg font-bold text-text-light dark:text-text-dark">
        { isLoading ? skeleton ?? <DefaultSkeleton/> : children }
      </div>
    </div>
  );
}
