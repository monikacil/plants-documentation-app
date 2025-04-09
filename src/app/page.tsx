import Image from "next/image";

import Logo from "./components/layout/Logo";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import landingImg from "./../../public/images/landing-page-img.png";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Button from "./components/common/Button";
import Link from "next/link";

export default async function LandingPage() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = isAuthenticated ? await isAuthenticated() : false; // For debugging purposes, you can log the authentication status to the console or use it in your component logic.
  console.log(isUserAuthenticated);

  return (
    <main className='h-full text-xl p-3 md:p-6'>
      <section className='h-full flex flex-col md:flex-row gap-10 items-center justify-center p-5 md:p-20 bg-base-gray-500 rounded-3xl'>
        <div className='flex flex-col justify-center md:justify-start w-1/2 lg:pl-14 xl:pl-36 text-2xl lg:text-3xl xl:text-5xl text-center md:text-left'>
          <Logo className='pb-10 self-center md:self-start' />
          <article className='text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
            Access to your plant documentation always at hand!
          </article>
          {!isUserAuthenticated ? (
            <section className='text-center text-2xl mt-10 flex flex-col md:flex-row gap-5 md:gap-9'>
              <Button>
                <LoginLink
                  className='w-full h-full block'
                  postLoginRedirectURL='/dashboard'
                >
                  Login
                </LoginLink>
              </Button>
              <Button>
                <RegisterLink
                  className='w-full h-full block'
                  postLoginRedirectURL='/dashboard'
                >
                  Sign up
                </RegisterLink>
              </Button>
            </section>
          ) : (
            <Button className='w-2/3 text-center text-xl mt-10'>
              <Link
                href='/dashboard'
                className='w-full h-full block'
              >
                Go to Dashboard
              </Link>
            </Button>
          )}
        </div>
        <div className='lg:m-auto w-1/2 flex justify-center'>
          <Image
            src={landingImg}
            width={600}
            height={600}
            priority={true}
            alt='Picture of the plants'
          />
        </div>
      </section>
    </main>
  );
}
