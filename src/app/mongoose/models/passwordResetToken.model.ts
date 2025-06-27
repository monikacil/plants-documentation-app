import {model, models, Schema} from "mongoose";

type PasswordResetTokenDocument = {
    _userId: Schema.Types.ObjectId,
    token: string,
    expires: Date
}

const PasswordResetTokenSchema = new Schema<PasswordResetTokenDocument>({
    _userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    token: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        required: true,
        index: {expires: 0}
    },
});

const PasswordResetToken = models?.PasswordResetToken || model<PasswordResetTokenDocument>("PasswordResetToken", PasswordResetTokenSchema);
export {PasswordResetToken};
