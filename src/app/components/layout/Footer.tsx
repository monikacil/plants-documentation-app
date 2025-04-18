import { cn } from "@/lib/utils/others";

type Props = {
  className?: string;
};

export default function Footer({ className }: Props) {
  return (
    <footer className={cn("text-center", className)}>
      <div className='w-full text-center mx-auto p-3'>
        <span className='text-xs text-gray-500 sm:text-center dark:text-gray-400'>
          © {new Date().getFullYear()} <span className='hover:underline'>PlantDoc</span>. All Rights
          Reserved.
        </span>
      </div>
    </footer>
  );
}
