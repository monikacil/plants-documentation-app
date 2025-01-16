import { cn, generateUniqKey } from "@/app/lib/utils";

export default function ZodErrors({ error, className }: { error: string[] | undefined, className?: string }) {
  if (!error) return null;
  if (typeof error === 'string') {
    return <div className={ cn("text-xs text-danger-500", className) }>
        { error }
      </div>
  }
  return error.map((err: string) => (
    <div key={ generateUniqKey("zod-error") } className={ cn("text-xs text-danger-500", className) }>
      { err }
    </div>
  ));
}
