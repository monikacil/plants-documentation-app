import NextAuth, { type NextAuthConfig } from "next-auth";

const edgeConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: []
};

export const { auth } = NextAuth(edgeConfig);
