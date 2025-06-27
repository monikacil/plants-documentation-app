import {NextAuthConfig} from "next-auth";

import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";

import {User} from "@/app/mongoose/models/user.model.ts";
import {Account} from "@/app/mongoose/models/account.model.ts";
import {connectDb} from "@/app/mongoose/db.ts";

import {CredentialsError, UserNotConfirmed} from "@/app/lib/authErrors.ts";
import {ComparePassword} from "@/app/lib/bcrypt.ts";

export const runtime = "nodejs";

export const authConfig = {
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
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize({email, password}) {
                if (!email || !password) throw new CredentialsError();
                await connectDb();
                const user = await User.findOne({email}).select("+password");

                if (!user || !user.password) throw new CredentialsError();

                const isPasswordValid = await ComparePassword(password as string, user.password);
                if (!isPasswordValid) {
                    throw new CredentialsError();
                }
                if (!user.emailVerified) {
                    throw new UserNotConfirmed();
                }

                return {
                    id: String(user._id),
                    email: user.email,
                    emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
                    name: user.name,
                };
            }
        })
    ],
    callbacks: {
        signIn: async ({user, account}) => {
            if (!account) {
                return false;
            }

            await connectDb();
            let dbUser = await User.findOne({email: user.email});

            if (!dbUser) {
                try {
                    dbUser = await User.create({
                        email: user.email,
                        name: user.name ?? "",
                        emailVerified: new Date(),
                    });
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (e) {
                    return false;
                }
            }

            if (dbUser && !dbUser.emailVerified && account.provider === "credentials") {
                return false;
            }

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
        async jwt({token, user}) {
            if (user?.id) {
                token.id = user.id;
                token.sub = user.id;
                token.email = user.email;
                if ("emailVerified" in user) {
                    token.emailVerified = user.emailVerified ? new Date(user.emailVerified) : null;
                }
                token.name = user.name;
            }
            return token;
        },
        async session({session, token}) {
            if (!session.user) session.user = {id: "", email: "", emailVerified: null};
            session.user.id = token.sub as string;
            session.user.email = token.email as string;
            // @ts-expect-error TS is too strict here
            session.user.emailVerified =
                token.emailVerified && typeof token.emailVerified === "string"
                    ? new Date(token.emailVerified)
                    : token.emailVerified ?? null;
            session.user.name = token.name as string;
            return session;
        },
    },
} satisfies NextAuthConfig;
