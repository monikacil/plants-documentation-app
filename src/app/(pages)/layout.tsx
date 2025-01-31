import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function Layout({ children, modal }: Props) {
  return (
    <div className="size-full flex flex-col px-3 md:px-6">
      <Header className="my-5 flex-none" />
      <main className="flex-auto">
        {modal}
        {children}
      </main>
      <Footer className="flex-none" />
    </div>
  );
}
