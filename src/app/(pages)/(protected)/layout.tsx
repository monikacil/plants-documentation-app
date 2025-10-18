"use client";
import { AuthProvider } from "@/app/AuthProvider";
import { Sidebar } from "@/app/components/layout/Sidebar.tsx";
import { Footer } from "@/app/components/layout/Footer.tsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <AuthProvider>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto animate-fade-in">
            { children }
            <Footer className="flex-none" />
          </main>
        </div>
      </AuthProvider>
    </div>
  );
}
