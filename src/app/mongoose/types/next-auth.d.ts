declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      emailVerified: Date | null;
      image?: string | null;
      role?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    emailVerified: Date | null;
    image?: string | null;
    role?: string;
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
