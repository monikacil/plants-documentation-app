"use client";
import AuthProvider from "@/app/AuthProvider.tsx";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="size-full flex flex-col">
      <main className="flex-auto">
        <AuthProvider>
          { children }
        </AuthProvider>
      </main>
    </div>
  );
}
