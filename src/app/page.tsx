import Image from "next/image";
import { AuthForm } from "@/app/components/auth/AuthForm";
import { Logo } from "@/app/components/layout/Logo";

export default function LandingPage() {
  return (
    <main
      className="relative min-h-[100dvh] bg-background text-foreground flex items-center justify-center overflow-hidden">

      {/* --- Soft gradient background --- */ }
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(125,224,163,0.15),transparent_60%)]" />

      <section className="section-lg w-full animate-fade-in">
        <div className="mx-auto max-w-3xl px-6 flex flex-col md:flex-row items-center gap-10 lg:gap-14">

          {/* --- Left column --- */ }
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 md:w-1/2">

            <Logo size="xl" />

            {/* Hero copy */ }
            <div className="space-y-4 max-w-md">
              <h1>Your personal plant care companion</h1>

              <p className="text-muted-foreground">
                Track watering, growth and health of your houseplants in one simple place.
              </p>
            </div>

            {/* Primary CTA */ }
            <div className="w-full max-w-md">
              <AuthForm />
            </div>

            {/* Trust hint */ }
            <p className="text-sm flex items-center gap-2 text-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Free to use • Installable as an app
            </p>


          </div>

          {/* --- Right column --- */ }
          <div className="relative w-full max-w-lg aspect-[7/6] md:w-1/2">
            <Image
              src="/images/landing-page-img.png"
              alt="Plant documentation preview"
              priority
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain drop-shadow-md"
            />
          </div>

        </div>
      </section>
    </main>
  );
}
