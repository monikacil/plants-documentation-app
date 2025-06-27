import {cn} from "@/app/lib/utils/others";
import {GiMonsteraLeaf} from "react-icons/gi";

type Props = {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
};

export function Logo({className, size = "md"}: Props) {
    const sizes = {
        sm: "text-2xl",
        md: "text-3xl",
        lg: "text-3xl md:text-4xl",
        xl: "text-4xl md:text-6xl",
    };

    return (
        <div
            data-testid="main-logo"
            className={cn(
                `flex items-center gap-2 font-semibold`,
                className
            )}
        >
            <GiMonsteraLeaf
                className={`${sizes[size]} text-accent-dark dark:text-accent-light`}
            />
            <div className={sizes[size]}>PlantsDoc</div>
        </div>
    );
}
