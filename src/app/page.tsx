import Image from "next/image";

import AuthForm from "@/app/components/auth/AuthForm.tsx";
import AddToHomeScreen from "@/app/components/pwa/AddToHomeScreen.tsx";
import Logo from "@/app/components/layout/Logo.tsx";

export default function LandingPage() {
  return (
    <main className="w-full flex-1 h-full">
      <AddToHomeScreen/>
      <section
        className="flex flex-col md:flex-row gap-10 items-center justify-center px-4 py-6 md:p-10 lg:p-20 bg-base-gray-500 rounded-3xl h-full">
        <div className="flex flex-col justify-center md:justify-start md:w-1/2 text-center md:text-left">
          <article className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center">
            <div className="flex justify-center">
              <Logo size="lg" className="mb-3"/>
            </div>
            <p>Access to your plant documentation always at hand!</p>
          </article>
          <section className="mt-10">
            <AuthForm/>
          </section>
        </div>
        <div className="lg:m-auto w-1/2 flex justify-center">
          <Image
            src="/images/landing-page-img.png"
            width={ 600 }
            height={ 600 }
            priority={ true }
            alt="Landing page picture"
          />
        </div>
      </section>

    </main>
  );
}
