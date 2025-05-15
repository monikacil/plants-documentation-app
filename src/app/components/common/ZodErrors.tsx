import { cn } from "@/app/lib/utils/others";
import { ZodError } from "zod";

type ZodErrorsProps = {
  error: ZodError | null;
  className?: string;
};

export default function ZodErrors({ error, className }: ZodErrorsProps) {
  if (!error) {
    return null;
  }

  return (
    <div
      role='alert'
      className={cn("text-xs text-danger-500", className)}
    >
      {error.issues.map((issue, index) => (
        <p key={index}>{issue.message}</p>
      ))}
      <p className='text-xs text-gray-500'>Total issues: {error.issues.length}</p>
    </div>
  );
}
