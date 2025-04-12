import type { Metadata } from "next";

import "./globals.css";

import { Fredoka } from "next/font/google";
// Sour_Gummy, Balsamiq_Sans, Comic_Neue
const fredoka = Fredoka({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka",
});

// Layout components
// import AddToHomeScreen from "./components/pwa/AddToHomeScreen";
// Auth Provider
import { AuthProvider } from "./AuthProvider";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

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
    <AuthProvider>
      <html
        lang='en'
        className={`${fredoka.variable}`}
      >
        <body className='h-screen px-3 md:px-6'>
          <div className='flex flex-col h-full'>
            <Header className='flex-none' />
            <section className='flex-auto'>{children}</section>
            <Footer className='flex-none' />
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
