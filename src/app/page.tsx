import Image from "next/image";

import { AuthForm } from "@/app/components/auth/AuthForm";
import { AddToHomeScreen } from "@/app/components/pwa/AddToHomeScreen";
import { Logo } from "@/app/components/layout/Logo";

export default function LandingPage() {
  return (
    <main className="w-full flex-1 h-full">
      <AddToHomeScreen />
      <section
        className="flex flex-col md:flex-row items-center justify-center md:gap-10 w-full max-w-8xl mx-auto px-4 py-6 h-full">
        <div className="flex flex-col md:gap-3 justify-center items-center md:w-1/2 text-center md:text-left">
          <section className="max-w-lg text-2xl lg:text-4xl text-center">
            <div className="flex justify-center my-5 md:mt-0">
              <Logo size="xl" />
            </div>
            <p className="text-text-light dark:text-text-dark">Access to your plant documentation always at hand!</p>
          </section>
          <div className="w-full max-w-lg mx-auto px-4 py-8 flex flex-col gap-6">
            <AuthForm />
          </div>
        </div>
        <div className="lg:m-auto md:w-1/2 flex justify-center">
          <Image
            src="/images/landing-page-img.png"
            width={ 700 }
            height={ 600 }
            priority
            alt="Landing page picture"
            style={ { width: "100%", height: "auto" } }
          />
        </div>
      </section>
    </main>
  );
}
