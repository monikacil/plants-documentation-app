import mongoose, {model, Schema} from "mongoose";

import {AccountDocument} from "@/app/mongoose/types/account.types.ts";
import {withSanitizedOutput} from "@/app/mongoose/sanitize.ts";

const AccountSchema = withSanitizedOutput(
    new Schema<AccountDocument>(
        {
            _userId: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            type: String,
            provider: String,
            providerAccountId: String,
            refresh_token: String,
            access_token: String,
            expires_at: Number,
            token_type: String,
            scope: String,
            id_token: String,
        }
    ),
    ["refresh_token", "access_token"]
);

const Account = mongoose.models?.Account || model<AccountDocument>("Account", AccountSchema);
export {Account};
