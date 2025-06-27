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
  // logger: {
  //   error(error: Error) {
  //     if ((error as { type?: string }).type === "CredentialsSignin") {
  //       return;
  //     }
  //     console.error(error);
  //   },
  //   warn(message: string) {
  //     console.warn(message);
  //   },
  //   debug(message: string) {
  //     console.debug(message);
  //   },
  // },
});
