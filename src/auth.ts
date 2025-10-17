import NextAuth from "next-auth";

import { MongooseAdapter } from "@/app/mongoose/MongooseAdapter.ts";

import { authConfig } from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongooseAdapter(),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  ...authConfig,
});
