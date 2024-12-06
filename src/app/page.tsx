import Link from "next/link";

export default function Home() {
    return (
      <>
        <header className="border-0 rounded-3xl backdrop-blur-lg max-w-5xl lg:max-w-7xl m-auto text-center text-5xl lg:text-7xl leading-10 lg:leading-12 font-semibold tracking-wide px-12 py-10 text-transparent bg-clip-text bg-gradient-to-r to-sky-400 via-emerald-600 from-primary-dark-green">Creating plant documentation always at hand?</header>
        <section className="max-w-7xl m-auto text-center text-5xl leading-10 font-semibold tracking-wide py-10">Now it is possible!</section>
        <section className="flex flex-col items-center gap-3 md:flex-row md:justify-around py-10">
          <article className="min-h-64 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">With the PlantDoc app, you can update your plant collection at any time, enter information about the sale or purchase of plants.</h5>
          </article>
          <article className="min-h-64 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">In a simple way, using the app, you will be able to export sales and purchase lists to an xlsx or pdf file.</h5>
          </article>
          <article className="min-h-64 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">In addition, you can plan all plant care tasks, such as watering, applying plant protection products, quarantine and many more!</h5>
          </article>
        </section>
        <section className="m-auto justify-center text-2xl flex gap-4">
          <Link className="font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:to-sky-400 hover:via-emerald-600 hover:from-primary-dark-green" href="/signin">
            Sign In
          </Link>
          <p>or</p>
           <Link className="font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:to-sky-400 hover:via-emerald-600 hover:from-primary-dark-green" href="/signup">
            Create new account!
          </Link>
        </section>
      </>
    );
};
