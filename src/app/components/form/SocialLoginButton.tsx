"use client";

import { signIn } from "next-auth/react";

import { FaFacebook, FaGoogle } from "react-icons/fa6";
import Button from "@/app/components/common/Button.tsx";

export function SocialLoginButtons() {
  const handleLogin = async (provider: "google" | "facebook") => {
    await signIn(provider);
  };
  return (
    <div className="flex gap-2 w-full items-center justify-center">
      <Button
        type="button"
        onClick={ () => handleLogin("google") }
        className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-black py-1 px-2 rounded-3xl shadow hover:bg-gray-50 transition"
      >
        <FaGoogle/>
        <span>Log in with Google</span>
      </Button>
      <Button
        type="button"
        onClick={ () => handleLogin("facebook") }
        className="flex items-center justify-center gap-2 bg-[#1877F2] text-white py-1 px-2 rounded-3xl shadow hover:bg-[#145DBF] transition"
      >
        <FaFacebook/>
        <span>Log in with Facebook</span>
      </Button>
    </div>
  );
}
