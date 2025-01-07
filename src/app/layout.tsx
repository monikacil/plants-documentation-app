import type { Metadata } from "next";
import "./globals.css";

import { Fredoka } from 'next/font/google'
// Sour_Gummy, Balsamiq_Sans, Comic_Neue
const fredoka = Fredoka({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-fredoka',
})

// Layout components
import Header from "./components/layout/Header";
import { default as Footer } from "./components/layout/Footer";
import AddToHomeScreen from "./components/pwa/AddToHomeScreen";

export const metadata: Metadata = {
  title: "Plants Documentation App",
  description: "An simple application created for plant growing enthusiasts",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  category: "application",
  authors: [
    {
      name: "Monika Cilińska",
      url: "https://www.linkedin.com/in/monika-cilinska/",
    },
  ],
  icons: [
    { rel: "icon", url: "/images/web-app-manifest-192x192.png" },
  ],
};

export default function RootLayout({ children, modal }: {
  children: React.ReactNode,
  modal: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fredoka.variable}`}>
      <body className="flex flex-col min-h-screen">
        <AddToHomeScreen />
        <Header />
        <main className="grow p-6 lg:py-4">
          { modal }
          { children }
        </main>
        <Footer />
      </body>
    </html>
  );
}
