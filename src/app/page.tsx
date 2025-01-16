import Link from "next/link";
import Image from 'next/image'

import Logo from "./components/layout/Logo";
import BasicButton from "./components/common/BasicButton";

import landingImg from './../../public/images/landing-page-img.png'

export default function Home() {
    return (
      <main className="h-full text-xl px-3 pt-3 md:px-9 md:pt-9">
        <section className="h-full flex flex-col md:flex-row gap-10 items-center justify-center p-5 md:p-20 bg-base-gray-500 rounded-3xl">
          <div className="flex flex-col justify-center md:justify-start w-1/2 lg:pl-14 xl:pl-36 text-2xl lg:text-3xl xl:text-5xl text-center md:text-left">
            <Logo className="pb-10 self-center md:self-start"/>
            <article className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">Access to your plant documentation always at hand!</article>
            <p className="mt-10 md:mt-14 flex justify-center md:justify-start">
              <Link href="/signup" scroll={ false }><BasicButton color="primary" wide>Explore</BasicButton></Link>
            </p>
          </div>
          <div className="lg:m-auto w-1/2 flex justify-center">
            <Image
              src={ landingImg }
              width={ 600 }
              height={ 600 }
              alt="Picture of the plants"
            />
          </div>
        </section>
      </main>
    );
};
