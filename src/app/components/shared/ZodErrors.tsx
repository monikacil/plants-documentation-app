export default function ZodErrors({ error }: { error: string[] }) {
  if (!error) return null;
  return error.map((err: string, index: number) => (
    <div key={index} className="mt-1 text-xs text-red-500">
      {err}
    </div>
  ));
}
