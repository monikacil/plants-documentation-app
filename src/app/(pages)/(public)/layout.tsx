export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        flex items-center justify-center
        min-h-[100dvh] w-full
        bg-background-light dark:bg-background-dark
        text-text-light dark:text-text-dark
        px-4 sm:px-6 py-8
        animate-fade-in
      "
    >
      <main
        role="main"
        className="
          w-full max-w-md sm:max-w-lg
          p-6 sm:p-8
          rounded-2xl
          bg-surface-light dark:bg-surface-dark
          border border-border-light dark:border-border-dark
          shadow
        "
      >
        { children }
      </main>
    </div>
  );
}
