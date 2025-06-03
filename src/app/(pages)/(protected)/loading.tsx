export default function Loading() {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-black/10 dark:bg-black/20 backdrop-blur-sm animate-fade rounded-xl">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 animate-spin-slow text-green-600 dark:text-green-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-full h-full"
          >
            <path
              d="M12 2C8.13 2 5 6 5 6s3.13 4 7 4 7-4 7-4-3.13-4-7-4zm0 10c-3.87 0-7 4-7 4s3.13 4 7 4 7-4 7-4-3.13-4-7-4z"
            />
          </svg>
        </div>
        <div className="text-sm text-muted-light dark:text-muted-dark">⏳ Loading..</div>
      </div>
    </div>
  );
}
