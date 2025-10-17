"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { resetPassword } from "@/actions/auth.actions.ts";
import { toastCustom } from "@/app/components/common/Toast";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!token) throw new Error("Missing token");
      await resetPassword(token, password);
      toastCustom("Password changed successfully.", "success");
      setMessage("Password changed. Redirecting...");
      setTimeout(() => router.push("/public"), 2000);
    } catch (err: any) {
      toastCustom(err.message || "Something went wrong.", "error");
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={ handleSubmit } className="flex flex-col gap-4">
        <input
          type="password"
          required
          placeholder="New password"
          className="border px-4 py-2 rounded"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
          disabled={ loading }
        >
          { loading ? "Processing..." : "Change Password" }
        </button>
      </form>
      { message && <p className="mt-4 text-sm text-gray-700">{ message }</p> }
    </div>
  );
}
