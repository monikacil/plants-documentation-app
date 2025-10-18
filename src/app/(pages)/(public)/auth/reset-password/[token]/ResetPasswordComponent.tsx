"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { resetPassword } from "@/actions/auth.actions";
import { toastCustom } from "@/app/components/common/Toast";
import { Spinner } from "@/app/components/common/Spinner";
import { Button } from "@/app/components/ui/Button.tsx";

type ResetPasswordPageProps = {
  token: string;
  tokenStatus: { valid: boolean; reason?: string };
};

export default function ResetPasswordPage({ token, tokenStatus }: ResetPasswordPageProps) {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!tokenStatus.valid) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-10">
        <section className="card w-full max-w-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-error-light dark:text-error-dark">
            { tokenStatus.reason || "Invalid or expired token." }
          </h2>
          <p className="text-muted-light dark:text-muted-dark mb-4">
            Please request a new password reset link.
          </p>
          <Button
            onClick={ () => router.push("/") }
            className="btn btn-primary"
          >
            Back to Login
          </Button>
        </section>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toastCustom("New passwords do not match.", "error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      if (!token) throw new Error("Missing token");
      await resetPassword(token, newPassword, oldPassword);
      toastCustom("Password changed successfully 🌿", "success");
      setMessage("Password changed. Redirecting...");
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      toastCustom(message, "error");
      setMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-10 animate-fade-in">
      <section className="card w-full max-w-md p-8 shadow-md animate-pop-in">
        <h2 className="text-3xl font-semibold mb-6 text-primary-light dark:text-primary-dark">
          Reset your password
        </h2>
        <form onSubmit={ handleSubmit } className="flex flex-col gap-5">
          <input
            type="password"
            required
            placeholder="Current password"
            className="input"
            value={ oldPassword }
            onChange={ (e) => setOldPassword(e.target.value) }
          />
          <input
            type="password"
            required
            placeholder="New password"
            className="input"
            value={ newPassword }
            onChange={ (e) => setNewPassword(e.target.value) }
          />
          <input
            type="password"
            required
            placeholder="Confirm new password"
            className="input"
            value={ confirmPassword }
            onChange={ (e) => setConfirmPassword(e.target.value) }
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={ loading || !newPassword }
          >
            { loading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="w-4 h-4 border-t-transparent" />
                Updating...
              </span>
            ) : (
              "Change Password"
            ) }
          </button>
        </form>
        { message && (
          <p
            className={ `mt-6 text-sm ${
              message.includes("successfully") || message.includes("Redirecting")
                ? "text-green-600 dark:text-green-400"
                : "text-error-light dark:text-error-dark"
            }` }
          >
            { message }
          </p>
        ) }
      </section>
    </main>
  );
}
