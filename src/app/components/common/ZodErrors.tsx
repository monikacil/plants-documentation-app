export default function ZodErrors({ error }: { error: string[] | undefined }) {
  if (!error) return null;
  if (typeof error === 'string') {
    return <div className="text-xs text-red-500">
        {error}
      </div>
  }
  return error.map((err: string, index: number) => (
    <div key={index} className="text-xs text-red-500">
      {err}
    </div>
  ));
}
