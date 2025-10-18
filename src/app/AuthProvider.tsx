"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Spinner } from "@/app/components/common/Spinner";

interface AuthProviderProps {
  children: ReactNode;
  redirectTo?: string;
  waitMs?: number;
}

export function AuthProvider({ children, redirectTo = "/", waitMs = 600 }: AuthProviderProps) {
  const { status } = useSession();
  const router = useRouter();
  const hasRedirected = useRef(false);
  const [waited, setWaited] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      const timer = setTimeout(() => setWaited(true), waitMs);
      return () => clearTimeout(timer);
    }
  }, [status, waitMs]);

  useEffect(() => {
    if (status === "unauthenticated" && waited && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace(redirectTo);
    }
  }, [status, waited, router, redirectTo]);

  if (status === "loading" || (status === "unauthenticated" && !waited))
    return (
      <div className="flex items-center justify-center min-h-screen animate-fade-in">
        <Spinner className="w-6 h-6 border-t-transparent" />
      </div>
    );

  if (status === "unauthenticated" && waited)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-light dark:text-muted-dark text-sm">
          Redirecting...
        </p>
      </div>
    );

  return <>{ children }</>;
}
