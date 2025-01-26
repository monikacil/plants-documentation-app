import { Footer } from "flowbite-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex justify-center h-full text-xl">{children}</main>
      <Footer />
    </>
  );
}
