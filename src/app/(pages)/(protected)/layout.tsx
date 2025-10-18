"use client";

import { AuthProvider } from "@/app/AuthProvider";
import { Sidebar } from "@/app/components/layout/Sidebar";
import { Footer } from "@/app/components/layout/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen transition-colors duration-300">
      <AuthProvider>
        {/* Sidebar */ }
        <Sidebar />

        {/* Main area */ }
        <div className="flex flex-col flex-1 overflow-hidden">
          <main
            role="main"
            className="
              flex-1 flex flex-col justify-between
              overflow-y-auto animate-fade-in
              px-4 sm:px-6 py-6
            "
          >
            {/* Content area */ }
            <div className="flex-1 flex flex-col">{ children }</div>

            {/* Sticky footer at bottom */ }
            <Footer className="mt-auto pt-4" />
          </main>
        </div>
      </AuthProvider>
    </div>
  );
}
