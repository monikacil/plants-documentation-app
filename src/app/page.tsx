import Link from "next/link";

export default function Home() {
    return (
      <section className="flex justify-center items-center h-full text-xl">
        <section className="text-center">
          <header className="border-0 rounded-3xl max-w-5xl lg:max-w-7xl m-auto text-4xl lg:text-5xl text-base-green-500 font-semibold tracking-wide py-10">PlantsDoc</header>
          <section className="m-auto flex gap-4">Plant documentation always at hand!</section>
          <section className="flex flex-col m-auto gap-4 py-8">
            <Link className="font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:to-sky-400 hover:via-emerald-600 hover:from-primary-dark-green" href="/signin">
              Sign In
            </Link>
            <p>or</p>
            <Link className="font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:to-sky-400 hover:via-emerald-600 hover:from-primary-dark-green" href="/signup">
              Create new account!
            </Link>
          </section>
        </section>
      </section>
    );
};
