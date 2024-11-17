import type { Metadata } from "next";
import "./globals.css";

// Layout components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export const metadata: Metadata = {
  title: "Plants Documentation App",
  description: "An simple application created for plant growing enthusiasts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header/>
          {children}
        <Footer />
      </body>
    </html>
  );
}
