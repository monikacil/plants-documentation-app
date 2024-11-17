import type { Metadata } from "next";
import "./globals.css";

// Layout components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";


export const metadata: Metadata = {
  title: "Plants Documentation App",
  description: "An simple application created for plant growing enthusiasts",
  generator: "Next.js",
  manifest: "/src/app/manifest.ts",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <div className="grow p-6 lg:p-14">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
