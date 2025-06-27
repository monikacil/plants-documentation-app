import {Adapter} from "next-auth/adapters";

import {ObjectId} from "mongodb";

import {connectDb} from "@/app/mongoose/db.ts";
import {User} from "@/app/mongoose/models/user.model.ts";
import {Account} from "@/app/mongoose/models/account.model.ts";

export function MongooseAdapter(): Adapter {
    return {
        async createUser(user) {
            await connectDb();
            const existing = await User.findOne({email: user.email});
            if (existing) {
                return {
                    id: existing._id.toString(),
                    name: existing.name,
                    email: existing.email,
                    emailVerified: existing.emailVerified,
                };
            }
            const created = await User.create(user);
            return {
                id: created._id.toString(),
                name: created.name,
                email: created.email,
                emailVerified: created.emailVerified,
            };
        },

        async getUser(id) {
            await connectDb();
            const user = await User.findById(id);
            if (!user) return null;
            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified,
            };
        },

        async getUserByEmail(email) {
            await connectDb();
            const user = await User.findOne({email});
            if (!user) return null;
            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified,
            };
        },

        async getUserByAccount({provider, providerAccountId}) {
            await connectDb();
            const account = await Account.findOne({provider, providerAccountId});
            if (!account) return null;
            const user = await User.findById(account._userId);
            if (!user) return null;
            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified,
            };
        },

        async linkAccount(account) {
            await connectDb();

            const existing = await Account.findOne({
                provider: account.provider,
                providerAccountId: account.providerAccountId,
            });

            if (existing) return;

            if (!account._userId && account.email) {
                const existingUser = await User.findOne({email: account.email});
                if (existingUser) {
                    account._userId = existingUser._id;
                }
            }

            if (!account._userId) throw new Error("Brak userId do przypisania konta");

            await Account.create({
                ...account,
                _userId: new ObjectId(account._userId as string),
            });
        },

        async unlinkAccount({provider, providerAccountId}) {
            await connectDb();
            await Account.deleteOne({provider, providerAccountId});
        },

        async deleteUser(userId) {
            await connectDb();
            await User.deleteOne({_id: new ObjectId(userId)});
            await Account.deleteMany({_userId: new ObjectId(userId)});
        },
    };
}