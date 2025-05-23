import NextAuth from "next-auth";

import { MongooseAdapter } from "@/app/mongoose/MongooseAdapter.ts";

import authConfig from "./auth.config";
import User from "@/app/mongoose/models/user.model.ts";
import Account from "@/app/mongoose/models/account.model.ts";
import connectDb from "@/app/mongoose/db.ts";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongooseAdapter(),
  session: {
    strategy: "jwt"
  },
  ...authConfig,
  callbacks: {
    signIn: async ({ user, account }) => {
      if (!account) return false;

      await connectDb();
      const dbUser = await User.findOne({ email: user.email });

      if (dbUser && !dbUser.emailVerified) return false;

      if (dbUser) {
        const linked = await Account.findOne({
          _userId: dbUser._id,
          provider: account.provider,
        });

        if (!linked) {
          await Account.create({
            _userId: dbUser._id,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            type: account.type,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            id_token: account.id_token,
            expires_at: account.expires_at,
            scope: account.scope,
            token_type: account.token_type,
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub != null) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  logger: {
    error(error: Error) {
      if ((error as { type?: string }).type === "CredentialsSignin") {
        return;
      }
      console.log("Error may have diff format because of logger!\n");
      console.error(error);
    },
    warn(message: string) {
      console.warn(message);
    },
    debug(message: string) {
      console.debug(message);
    },
  },
});
