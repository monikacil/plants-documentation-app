import Header from "../components/layout/Header";

export default function Layout({ children }: { children: React.ReactNode}) {

  return (
    <>
      <Header className="mb-7"/>
      <main>
        { children }
      </main>
    </>
  )
}
