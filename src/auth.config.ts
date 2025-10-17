import { connectDb } from "@/app/mongoose/db";
import { User } from "@/app/mongoose/models/user.model";
import { ComparePassword } from "@/app/lib/bcrypt";
import { CredentialsError, UserNotConfirmed } from "@/app/lib/authErrors";
import { MongooseAdapter } from "@/app/mongoose/MongooseAdapter";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";

import type { JWT } from "next-auth/jwt";
import type { Session, User as UserType } from "next-auth";

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
    async jwt({ token, user }: { token: JWT, user?: UserType }) {
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

    async session({ session, token }: { session: Session, token: JWT }) {
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
  },
}

export const runtime = "nodejs";
