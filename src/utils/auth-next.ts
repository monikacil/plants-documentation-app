import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { connectDB } from "@/db/connectDB";
import User from "@/models/user.model";
import { ComparePassword } from "./bcrypt";

export const authOptions: NextAuthOptions  = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");
        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await ComparePassword(credentials!.password, user.password)
        if (!passwordMatch) throw new Error("Wrong Password");
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  }
};
