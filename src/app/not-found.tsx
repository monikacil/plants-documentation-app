import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center max-w-xl">
        <p className="text-8xl font-extrabold text-green-700 dark:text-green-400 drop-shadow-sm">
          404
        </p>

        <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight text-green-900 dark:text-green-200">
          Page not found
        </h1>

        <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Sorry, we couldn’t find the page you’re looking for.
          <br />
          It might have been removed, renamed, or is temporarily unavailable.
        </p>

        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/"
            scroll={ false }
            className="rounded-xl bg-green-700 dark:bg-green-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-800 dark:hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            ⟵ Back to Home
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Plants Documentation App 🌿
        </p>
      </div>
    </main>
  );
}
