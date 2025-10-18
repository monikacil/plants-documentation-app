import Image from "next/image";
import { AuthForm } from "@/app/components/auth/AuthForm";
import { AddToHomeScreen } from "@/app/components/pwa/AddToHomeScreen";
import { Logo } from "@/app/components/layout/Logo";

export default function LandingPage() {
  return (
    <main
      className="
        flex items-center justify-center
        min-h-[100dvh] w-full
        overflow-hidden animate-fade-in
      "
    >
      <AddToHomeScreen />

      <section
        className="
          flex flex-col md:flex-row items-center justify-center
          gap-10 md:gap-16
          w-full max-w-7xl mx-auto px-6 md:px-10 py-10
        "
      >
        {/* --- Left column: logo + text + form --- */ }
        <div className="flex flex-col items-center text-center md:text-left md:w-1/2 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Logo size="xl" />
            <p className="text-xl text-center md:text-2xl font-medium max-w-md leading-relaxed">
              Access your plant documentation anytime, anywhere 🌱
            </p>
          </div>

          <div className="w-full max-w-md mt-6 md:mt-10">
            <AuthForm />
          </div>
        </div>

        {/* --- Right column: image --- */ }
        <div className="flex justify-center md:justify-end md:w-1/2">
          <Image
            src="/images/landing-page-img.png"
            width={ 700 }
            height={ 600 }
            priority
            alt="Plant documentation preview"
            className="
              w-full max-w-lg h-auto rounded-xl
              object-contain drop-shadow-md
            "
          />
        </div>
      </section>
    </main>
  );
}
