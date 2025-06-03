"use client";

import { useState } from "react";
import { Modal } from "@/app/components/modal/Modal.tsx";
import InitResetPasswordForm from "@/app/components/auth/InitResetPasswordForm.tsx";
import RegisterForm from "@/app/components/auth/RegisterForm.tsx";
import LoginForm from "@/app/components/auth/LoginForm.tsx";


export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [modalOpen, setModalOpen] = useState(false);

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <>
      { mode === "register" ? (
        <RegisterForm>
          <div className="text-sm">
            Already have an account?
            <span
              onClick={ toggleMode }
              className="ml-2 font-semibold cursor-pointer text-base-green-600 underline underline-offset-4"
            >
              Log In
            </span>
          </div>
        </RegisterForm>
      ) : (
        <LoginForm>
          <button
            type="button"
            className="text-edit-light underline h-[34px]"
            onClick={ () => setModalOpen(true) }
          >
            Forgot password?
          </button>
          <div className="text-sm">
            Don&#39;t have an account?
            <span
              onClick={ toggleMode }
              className="ml-2 font-semibold cursor-pointer text-base-green-600 underline underline-offset-4"
            >
              Sign Up
            </span>
          </div>
        </LoginForm>
      ) }
      <Modal
        open={ modalOpen }
        onOpenChangeAction={ setModalOpen }
        title="Reset Password"
        description="Enter your email to receive a link to reset your password."
      >
        <div className="flex flex-col gap-3">
          <InitResetPasswordForm onSuccess={ () => setModalOpen(false) }/>
        </div>
      </Modal>
    </>
  );
}
