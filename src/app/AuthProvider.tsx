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

export default function AuthProvider({
                                       children,
                                       redirectTo = "/",
                                       loadingFallback = <Loading/>,
                                       waitMs = 600,
                                     }: AuthProviderProps) {
  const { status, data } = useSession();
  const router = useRouter();
  const hasRedirected = useRef(false);
  const [waited, setWaited] = useState(false);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (status === "unauthenticated") {
      setWaited(false);
      t = setTimeout(() => setWaited(true), waitMs);
    } else {
      setWaited(false);
    }
    return () => clearTimeout(t);
  }, [status, waitMs]);

  useEffect(() => {
    if (status === "unauthenticated" && waited && !hasRedirected.current) {
      hasRedirected.current = true;
      router.push(redirectTo);
    }
  }, [status, waited, router, redirectTo]);

  useEffect(() => {
  }, [status, data]);

  if (status === "loading") return loadingFallback;
  if (status === "unauthenticated" && !waited) return loadingFallback;
  if (status === "unauthenticated" && waited) return null;

  // authenticated
  return <>{ children }</>;
}
