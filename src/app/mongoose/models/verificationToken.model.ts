import mongoose, { model, Schema } from "mongoose";

type VerificationTokenDocument = {
  _userId: Schema.Types.ObjectId,
  token: string,
  expires: Date
}

const VerificationTokenSchema = new Schema<VerificationTokenDocument>({
  _userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, token: String,
  expires: Date,
});

const VerificationToken = mongoose.models?.VerificationToken || model<VerificationTokenDocument>("VerificationToken", VerificationTokenSchema);
export default VerificationToken;
