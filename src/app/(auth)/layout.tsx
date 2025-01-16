export default function Layout({ children }: { children: React.ReactNode}) {

  return (
    <>
      <main className="flex md:block justify-center h-full text-xl px-3 pt-3 md:px-9 md:pt-9">
        { children }
      </main>
    </>
  )
}
