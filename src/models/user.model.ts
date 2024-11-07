import  mongoose, { Schema, model } from  "mongoose";
import validateEmail from "@/utils/validators";

interface UserDocument {
  _id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: [validateEmail, "Incorrect email address"],
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const  User  =  mongoose.models?.User  ||  model<UserDocument>('User', UserSchema);
export default User;
