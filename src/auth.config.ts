import { connectDb } from "@/app/mongoose/db";
import { User } from "@/app/mongoose/models/user.model";
import { Account } from "@/app/mongoose/models/account.model";
import { ComparePassword } from "@/app/lib/bcrypt";
import { CredentialsError, UserNotConfirmed } from "@/app/lib/authErrors";
import { MongooseAdapter } from "@/app/mongoose/MongooseAdapter";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import type { Session, User as UserType } from "next-auth";
import type { Account as AccountType, Profile as ProfileType } from "@auth/core/types";
import type { JWT } from "next-auth/jwt";

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
    async signIn({ user, account, profile }: {
      user: UserType;
      account: AccountType | null;
      profile?: ProfileType & { email_verified?: boolean };
    }) {
      await connectDb();

      if (!account) return true;

      if (account.provider === "credentials") return true;

      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
        const emailVerified =
          account.provider === "google" ? profile?.email_verified === true : account.provider === "facebook";

        if (!emailVerified) {
          console.warn(
            `[AUTH] Attempted to link unverified ${ account.provider } account for ${ user.email }`
          );
          throw new Error("Email from provider is not verified.");
        }

        const existingAccount = await Account.findOne({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        });

        if (!existingAccount) {
          await Account.create({
            userId: existingUser._id.toString(),
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

          console.log(
            `[AUTH] Linked ${ account.provider } account for user ${ user.email }`
          );
        }
        return true;
      }
      return true;
    },

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
