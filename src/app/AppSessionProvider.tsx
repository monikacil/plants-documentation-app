"use client";

import type { SessionProviderProps } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

export function AppSessionProvider({ children, session }: SessionProviderProps) {
  return <SessionProvider session={ session }>{ children }</SessionProvider>;
}
