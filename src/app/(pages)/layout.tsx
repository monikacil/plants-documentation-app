// import Footer from "../components/layout/Footer";
// import Header from "../components/layout/Header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className='size-full flex flex-col'>
      <main className='flex-auto'>
        {children}
      </main>
    </div>
  );
}
