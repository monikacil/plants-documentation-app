import { connectDb } from "@/app/mongoose/db";
import { User } from "@/app/mongoose/models/user.model";
import { Account } from "@/app/mongoose/models/account.model";
import { ComparePassword } from "@/app/lib/bcrypt";
import { CredentialsError, UserNotConfirmed } from "@/app/lib/authErrors";
import { MongooseAdapter } from "@/app/mongoose/MongooseAdapter";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";

type CredentialsInput = {
  email: string;
  password: string;
};

export const authConfig = {
  adapter: MongooseAdapter(),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as CredentialsInput;

        if (!email || !password) {
          throw new CredentialsError();
        }

        await connectDb();
        const user = await User.findOne({ email }).select("+password");
        if (!user) throw new CredentialsError();
        if (!user.password) throw new CredentialsError();
        if (!user.emailVerified)
          throw new UserNotConfirmed();

        const valid = await ComparePassword(password, user.password);
        if (!valid) throw new CredentialsError();

        return {
          id: user._id!.toString(),
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
          image: user.image ?? null,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        Object.assign(token, {
          sub: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified ?? null,
        });
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.sub) {
        Object.assign(session.user, {
          id: token.sub,
          email: token.email!,
          name: token.name ?? null,
          emailVerified: token.emailVerified ? new Date(token.emailVerified) : null,
        });
      }
      return session;
    },

    async signIn({ user, account }) {
      if (!account) return true;

      await connectDb();

      const existing = await Account.findOne({
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      });

      if (!existing) {
        await Account.create({
          userId: user.id,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          id_token: account.id_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          session_state: account.session_state,
        });
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

export const runtime = "nodejs";
