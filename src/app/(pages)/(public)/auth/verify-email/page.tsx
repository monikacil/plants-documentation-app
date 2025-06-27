import { connectDb } from "@/app/mongoose/db.ts";
import { VerificationToken } from "@/app/mongoose/models/verificationToken.model.ts";
import { User } from "@/app/mongoose/models/user.model.ts";
import Link from "next/link";

export default async function VerifyEmailPage({ params, }: {
  params: Promise<{ token: string }>
}) {
  const token = (await params).token

  if (!token) {
    return (
      <Container>
        <ErrorTitle>No token provided!</ErrorTitle>
        <p>Please check if you clicked a valid link from your email.</p>
        <LoginButton />
      </Container>
    );
  }

  await connectDb();

  const entry = await VerificationToken.findOne({ token });
  if (!entry || entry.expires < new Date()) {
    return (
      <Container>
        <ErrorTitle>Token is invalid or has expired!</ErrorTitle>
        <p>Please request a new email verification or check your link.</p>
        <LoginButton />
      </Container>
    );
  }

  const user = await User.findById(entry._userId);
  if (!user) {
    return (
      <Container>
        <ErrorTitle>User not found.</ErrorTitle>
        <p>Please contact support or try again.</p>
        <LoginButton />
      </Container>
    );
  }

  if (!user.emailVerified) {
    user.emailVerified = new Date();
    await user.save();
    await VerificationToken.deleteMany({ _userId: user._id });
  }

  return (
    <Container>
      <SuccessCheckmark />
      <h2 className="text-2xl font-bold mb-3 text-green-600 animate-fade-in">
        Email successfully verified!
      </h2>
      <p className="mb-4">You can now log in to your account.</p>
      <LoginButton />
    </Container>
  );
}

// --- Animated checkmark ---
function SuccessCheckmark() {
  return (
    <div className="flex justify-center mb-4">
      <svg
        className="w-16 h-16 text-green-500 animate-pop-in"
        fill="none"
        viewBox="0 0 52 52"
      >
        <circle
          className="stroke-current text-green-200"
          cx="26"
          cy="26"
          r="25"
          strokeWidth="2"
        />
        <path
          className="stroke-current text-green-600"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="24"
          strokeDashoffset="24"
          d="M16 27l7 7 13-13"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="24;0"
            dur="0.5s"
            fill="freeze"
          />
        </path>
      </svg>
    </div>
  );
}

// --- Container with simple fade-in animation ---
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-md mx-auto text-center mt-20 animate-fade-in">
      { children }
    </div>
  );
}

function ErrorTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold mb-3 text-red-600">{ children }</h2>
  );
}

function LoginButton() {
  return (
    <Link
      href="/public"
      className="inline-block mt-6 px-6 py-2 rounded-full bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
    >
      Go to login
    </Link>
  );
}