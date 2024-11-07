import type { Metadata } from "next";
import "./globals.css";

import { Provider } from  "./session-provider";

// Layout components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export const metadata: Metadata = {
  title: "Plants Documentation App",
  description: "An simple application created for plant growing enthusiasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body>
          <Header />
            {children}
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
