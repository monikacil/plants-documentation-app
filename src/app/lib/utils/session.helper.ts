"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};

export const getSessionUserId = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return;
  return user.id as string;
};
