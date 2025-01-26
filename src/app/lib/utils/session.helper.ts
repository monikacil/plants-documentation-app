"use server";

import { cookies } from "next/headers";
import { getCookie } from "cookies-next/server";

import { decrypt } from "@/app/lib/joseSession";

const COOKIE_NAME = process.env.COOKIE_NAME as string;

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};

export const getSessionUserId = async () => {
  const cookie = await getCookie(COOKIE_NAME, { cookies });
  const session = await decrypt(cookie);
  if (!session) return;
  return session.userId as string;
};
