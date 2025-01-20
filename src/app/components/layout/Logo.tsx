import { cn } from "@/app/lib/utils/others";
import { GiMonsteraLeaf } from "react-icons/gi";

export default function Logo({ className, size="lg" }: { className?: string, size?: "sm" | "md" | "lg" | "xl" }) {
  const cssSize = () => {
    let textSize;
    let logoSize
    switch (size) {
      case "sm":
        textSize = "xl"
        logoSize = "2xl"
        break;
      case "md":
        textSize = "2xl"
        logoSize = "3xl"
        break;
      case "lg":
        textSize = "3xl"
        logoSize = "4xl"
      case "xl":
          textSize = "4xl"
          logoSize = "5xl"
        break;
      default:
        textSize = "4xl"
        logoSize = "5xl"
        break;
    }
    return { textSize, logoSize }
  }

  return (
    <div className={ cn(`flex items-center gap-2 font-semibold text-${ cssSize().textSize }`, className) }>
      <GiMonsteraLeaf className={`text-${ cssSize().logoSize } text-base-green-600`}/>
      <div className={`text-${ cssSize().textSize }`}>
        PlantsDoc
      </div>
    </div>
  );
}
