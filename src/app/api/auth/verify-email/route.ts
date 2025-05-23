import connectDb from "@/app/mongoose/db.ts";
import VerificationToken from "@/app/mongoose/models/verificationToken.model.ts";
import User from "@/app/mongoose/models/user.model.ts";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return new Response("No token in URL", { status: 400 });
  }

  await connectDb();

  const entry = await VerificationToken.findOne({ token });
  if (!entry || entry.expires < new Date()) {
    return Response.redirect(`${ process.env.NEXT_PUBLIC_APP_URL }/auth/invalid-token`, 302);
  }

  console.log(entry);

  const user = await User.findById(entry._userId);
  if (!user) {
    return Response.redirect(`${ process.env.NEXT_PUBLIC_APP_URL }/auth/invalid-token`, 302);
  }

  user.emailVerified = new Date();
  await user.save();
  await VerificationToken.deleteMany({ userId: user._id });

  return Response.redirect(`${ process.env.NEXT_PUBLIC_APP_URL }/auth/verified`, 302);
}
