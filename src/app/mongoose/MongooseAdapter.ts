import { Adapter } from "next-auth/adapters";
import { connectDb } from "@/app/mongoose/db";
import { User } from "@/app/mongoose/models/user.model";
import { Account } from "@/app/mongoose/models/account.model";

export function MongooseAdapter(): Adapter {
  return {
    async createUser(user) {
      await connectDb();

      const existing = await User.findOne({ email: user.email });
      if (existing) {
        return {
          id: existing._id.toString(),
          name: existing.name,
          email: existing.email,
          emailVerified: existing.emailVerified,
          image: existing.image ?? null,
        };
      }

      const created = await User.create(user);
      return {
        id: created._id.toString(),
        name: created.name,
        email: created.email,
        emailVerified: created.emailVerified,
        image: created.image ?? null,
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
        image: user.image ?? null,
      };
    },

    async getUserByEmail(email) {
      await connectDb();
      const user = await User.findOne({ email });
      if (!user) return null;

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image ?? null,
      };
    },

    async getUserByAccount({ provider, providerAccountId }) {
      await connectDb();

      const account = await Account.findOne({ provider, providerAccountId });
      if (!account) return null;

      const user = await User.findById(account.userId);
      if (!user) return null;

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image ?? null,
      };
    },

    async linkAccount(account) {
      await connectDb();

      const existing = await Account.findOne({
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      });
      if (existing) return;

      if (!account.userId && account.email) {
        const existingUser = await User.findOne({ email: account.email });
        if (existingUser) {
          account.userId = existingUser._id.toString();
        }
      }

      if (!account.userId)
        throw new Error("No userId to assign an account.");

      await Account.create({
        ...account,
        userId: account.userId,
      });
    },

    async unlinkAccount({ provider, providerAccountId }) {
      await connectDb();
      await Account.deleteOne({ provider, providerAccountId });
    },

    async deleteUser(userId) {
      await connectDb();
      await User.deleteOne({ _id: userId });
      await Account.deleteMany({ userId });
    },
  };
}
