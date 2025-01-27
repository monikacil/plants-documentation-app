import { cn } from "@/app/lib/utils/others";

type Props = {
  className?: string;
};

export default function MainFooter({ className }: Props) {
  return (
    <footer className={cn("text-center", className)}>
      <div className="w-full text-center mx-auto p-3">
        <span className="text-xs text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            PlantDoc
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
