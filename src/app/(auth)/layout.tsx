import Footer from "../components/layout/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col size-full">
      <main className="flex flex-auto text-xl">{children}</main>
      <Footer className="flex-none" />
    </div>
  );
}
