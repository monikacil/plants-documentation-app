import type { Metadata } from "next";

import "./globals.css";

import { Fredoka } from "next/font/google";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Toaster } from "react-hot-toast";

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Plants Documentation App",
  description: "A simple application created for plant growing enthusiasts",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "nextjs",
    "next15",
    "pwa",
    "next-pwa",
    "plant-app",
    "plant-documentation",
    "plant-collection",
  ],
  category: "application",
  authors: [
    {
      name: "Monika Cilińska",
      url: "https://www.linkedin.com/in/monika-cilinska/",
    },
  ],
  icons: [{ rel: "icon", url: "/images/web-app-manifest-192x192.png" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={ `${ fredoka.variable }` }
    >
    <body className="h-screen max-w-screen-2xl mx-auto px-3 md:px-14 lg:px-28">
    <div className="flex flex-col h-full">
      <Header className="flex-none"/>
      <main className="flex-auto">
        { children }
      </main>
      <Footer className="flex-none"/>
    </div>
    <Toaster toastOptions={ { duration: 4000 } }/>
    </body>
    </html>
  );
}
