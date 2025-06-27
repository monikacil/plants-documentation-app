// import {Search} from "../ui/Search";
// import {Pagination} from "../ui/Pagination";

type Props = {
  children: React.ReactNode;
  pages: number;
  title: string;
  link?: {
    href: string;
    text: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function TableWrapper({ children, pages, title, link }: Props) {
  return (
    <section className='py-4 md:py-5 px-4 md:px-5 rounded-2xl bg-white shadow-md'>
      <header className='text-4xl font-semibold text-base-green-700 pb-3'>{ title }</header>
      <nav className='flex justify-between mb-3'>
        {/*<Search placeholder='Search...'/>*/ }
        {/*{link && (*/ }
        {/*    <Link*/ }
        {/*        href={link.href}*/ }
        {/*        scroll={false}*/ }
        {/*    >*/ }
        {/*        <Button>{link.text}</Button>*/ }
        {/*    </Link>*/ }
        {/*)}*/ }
      </nav>
      { children }
      {/*{pages > 1 ? <Pagination totalPages={pages}/> : null}*/ }
    </section>
  );
}
