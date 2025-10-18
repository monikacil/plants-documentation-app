import Link from "next/link";
import { connectDb } from "@/app/mongoose/db.ts";
import { VerificationToken } from "@/app/mongoose/models/verificationToken.model.ts";
import { User } from "@/app/mongoose/models/user.model.ts";

export default async function VerifyEmailPage({ params }: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;

  await connectDb();

  // --- 1️⃣ Missing or invalid token ---
  if (!token) {
    return (
      <VerifyContainer>
        <ErrorIcon />
        <Title color="error">No token provided</Title>
        <p className="text-muted-light dark:text-muted-dark mt-2">
          Please check if you clicked a valid link from your email.
        </p>
        <LoginButton />
      </VerifyContainer>
    );
  }

  // --- 2️⃣ Check token in DB ---
  const entry = await VerificationToken.findOne({ token });
  console.log(entry)
  if (!entry || entry.expires < new Date()) {
    return (
      <VerifyContainer>
        <ErrorIcon />
        <Title color="error">Token invalid or expired</Title>
        <p className="text-muted-light dark:text-muted-dark mt-2">
          Please request a new email verification or check your link.
        </p>
        <LoginButton />
      </VerifyContainer>
    );
  }

  // --- 3️⃣ Get user ---
  const user = await User.findById(entry.userId);
  if (!user) {
    return (
      <VerifyContainer>
        <ErrorIcon />
        <Title color="error">User not found</Title>
        <p className="text-muted-light dark:text-muted-dark mt-2">
          Please contact support or try again.
        </p>
        <LoginButton />
      </VerifyContainer>
    );
  }

  // --- 4️⃣ Verify and save ---
  if (!user.emailVerified) {
    user.emailVerified = new Date();
    await user.save();
    await VerificationToken.deleteMany({ userId: user._id });
  }

  // --- ✅ Success ---
  return (
    <VerifyContainer>
      <SuccessCheckmark />
      <Title color="success">Email successfully verified!</Title>
      <p className="text-muted-light dark:text-muted-dark mt-2">
        You can now log in to your account.
      </p>
      <LoginButton />
    </VerifyContainer>
  );
}

//
// --- UI components ---
//

function VerifyContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-6 animate-fade-in">
      <div className="card w-full max-w-md text-center p-8 shadow-md">
        { children }
      </div>
    </main>
  );
}

function Title({
                 children,
                 color = "default",
               }: {
  children: React.ReactNode;
  color?: "default" | "success" | "error";
}) {
  const colorClass =
    color === "success"
      ? "text-primary-light dark:text-primary-dark"
      : color === "error"
        ? "text-error-light dark:text-error-dark"
        : "text-text-light dark:text-text-dark";

  return (
    <h2 className={ `text-2xl font-semibold mb-2 ${ colorClass }` }>
      { children }
    </h2>
  );
}

function LoginButton() {
  return (
    <Link
      href="/public"
      className="btn btn-primary mt-6 w-fit mx-auto px-6 py-2 text-white font-semibold transition-all"
    >
      Go to login
    </Link>
  );
}

function SuccessCheckmark() {
  return (
    <div className="flex justify-center mb-4">
      <svg
        className="w-16 h-16 text-primary-light dark:text-primary-dark animate-pop-in"
        fill="none"
        viewBox="0 0 52 52"
      >
        <circle
          className="stroke-current text-accent-light dark:text-accent-dark opacity-30"
          cx="26"
          cy="26"
          r="25"
          strokeWidth="2"
        />
        <path
          className="stroke-current"
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

function ErrorIcon() {
  return (
    <div className="flex justify-center mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 h-14 text-error-light dark:text-error-dark animate-pop-in"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={ 2.5 }
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v4m0 4h.01M10.29 3.86l-6.18 10.7A1 1 0 005 16h14a1 1 0 00.87-1.44l-6.18-10.7a1 1 0 00-1.74 0z"
        />
      </svg>
    </div>
  );
}
