import { model, models, Schema } from "mongoose";

type VerificationTokenDocument = {
  _userId: Schema.Types.ObjectId,
  token: string,
  expires: Date
}

const VerificationTokenSchema = new Schema<VerificationTokenDocument>({
  _userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  token: String,
  expires: {
    type: Date,
    required: true,
    index: { expires: 0 },
  },
});

const VerificationToken = models?.VerificationToken || model<VerificationTokenDocument>("VerificationToken", VerificationTokenSchema);
export default VerificationToken;
