import { NextResponse } from "next/server";
import { resetPassword } from "@/actions/auth.actions.ts";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ success: false, message: "Missing or invalid token" }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ success: false, message: "Password must be at least 6 characters" }, { status: 400 });
    }

    await resetPassword(token, password);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[RESET_PASSWORD_ERROR]", err);
    return NextResponse.json({ success: false, message: err.message || "Internal server error" }, { status: 500 });
  }
}
