import Link from "next/link";

export default function Plants() {
  return (
    <div className="flex flex-col">
      <Link href="/plants/collected" className="font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:to-sky-400 hover:via-emerald-600 hover:from-primary-dark-green">
        Collection
      </Link>
        <Link href="/plants/sold" className="font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:to-sky-400 hover:via-emerald-600 hover:from-primary-dark-green">
        Sold plants
      </Link>
        <Link href="/plants/purchased" className="font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:to-sky-400 hover:via-emerald-600 hover:from-primary-dark-green">
        Purchased plants
      </Link>
    </div>
  );
}
