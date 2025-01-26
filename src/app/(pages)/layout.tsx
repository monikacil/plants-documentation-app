import { Footer } from "flowbite-react";
import Header from "../components/layout/Header";

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function Layout({ children, modal }: Props) {
  return (
    <>
      <Header className="mb-7" />
      <main>
        {modal}
        {children}
      </main>
      <Footer />
    </>
  );
}
