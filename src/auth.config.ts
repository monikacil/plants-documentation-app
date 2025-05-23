import { NextAuthConfig } from "next-auth";

import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";

import User from "@/app/mongoose/models/user.model.ts";

import connectDb from "@/app/mongoose/db.ts";
import { CredentialsError, UserNotConfirmed } from "@/app/lib/authErrors.ts";
import { ComparePassword } from "@/app/lib/bcrypt.ts";

export default {
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
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        mode: { label: "Mode", type: "text" },
      },
      async authorize({ email, password }) {
        if (!email || !password) throw new CredentialsError();

        await connectDb();
        const user = await User.findOne({ email }).select("+password");

        if (!user) throw new CredentialsError();

        const isPasswordValid = await ComparePassword(password as string, user.password);

        if (!isPasswordValid) {
          throw new CredentialsError();
        }

        if (!user.emailVerified) {
          throw new UserNotConfirmed();
        }

        return {
          id: user._id,
          email: user.email,
          name: user.name
        };
      }
    })
  ]
} satisfies NextAuthConfig;
