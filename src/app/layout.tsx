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
import AddToHomeScreen from "./components/pwa/AddToHomeScreen";

export const metadata: Metadata = {
  title: "Plants Documentation App",
  description: "A simple application created for plant growing enthusiasts",
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
  icons: [{ rel: "icon", url: "/images/web-app-manifest-192x192.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fredoka.variable}`}>
      <body className="h-screen">
        <AddToHomeScreen />
        <section className="size-full">{children}</section>
      </body>
    </html>
  );
}
