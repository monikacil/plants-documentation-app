import { NextResponse } from "next/server";
import { connectDb } from "@/app/mongoose/db";
import { VerificationToken } from "@/app/mongoose/models/verificationToken.model";
import { User } from "@/app/mongoose/models/user.model";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ success: false, message: "Missing token" }, { status: 400 });
  }

  await connectDb();

  const entry = await VerificationToken.findOne({ token });

  if (!entry || entry.expires < new Date()) {
    return NextResponse.json({ success: false, message: "Token expired or invalid" }, { status: 400 });
  }

  const user = await User.findById(entry._userId);

  if (!user) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }

  if (!user.emailVerified) {
    user.emailVerified = new Date();
    await user.save();
    await VerificationToken.deleteMany({ _userId: user._id });
  }

  return NextResponse.redirect(`${ process.env.NEXT_PUBLIC_APP_URL }/email-verified`);
}
