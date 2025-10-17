"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import Loading from "@/app/(pages)/(protected)/loading";

interface AuthProviderProps {
  children: ReactNode;
  redirectTo?: string;
  loadingFallback?: ReactNode;
  waitMs?: number;
}

export function AuthProvider({
                               children,
                               redirectTo = "/",
                               loadingFallback = <Loading key="auth-loading" />,
                               waitMs = 600,
                             }: AuthProviderProps) {
  const { status } = useSession();
  const router = useRouter();
  const hasRedirected = useRef(false);
  const [waited, setWaited] = useState(false);

  // Wait before redirecting unauthenticated users
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (status === "unauthenticated") {
      setWaited(false);
      timer = setTimeout(() => setWaited(true), waitMs);
    } else {
      setWaited(false);
    }
    return () => timer && clearTimeout(timer);
  }, [status, waitMs]);

  // Redirect after wait
  useEffect(() => {
    if (status === "unauthenticated" && waited && !hasRedirected.current) {
      hasRedirected.current = true;
      router.push(redirectTo);
    }
  }, [status, waited, router, redirectTo]);

  // Render logic
  if (status === "loading") return loadingFallback;
  if (status === "unauthenticated" && !waited) return loadingFallback;
  if (status === "unauthenticated" && waited) return null;

  return <>{ children }</>;
}
