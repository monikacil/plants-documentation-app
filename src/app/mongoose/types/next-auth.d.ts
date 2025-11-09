import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      role?: string;
      emailVerified: Date | null;
    };
  }

  interface User extends DefaultUser {
    id: string;
    role?: string;
    emailVerified: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
    email?: string;
    name?: string | null;
    emailVerified?: Date | string | null;
    role?: string;
  }
}

export {};
