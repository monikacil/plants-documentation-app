"use client";

import { useState } from "react";

import { Modal } from "@/app/components/modal/Modal";
import { InitResetPasswordForm } from "@/app/components/auth/InitResetPasswordForm";
import { RegisterForm } from "@/app/components/auth/RegisterForm";
import { LoginForm } from "@/app/components/auth/LoginForm";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils/others";
import { AuthTabs } from "@/app/components/auth/AuthTabs";
import { toast } from "sonner";

export function AuthForm({ className }: { className?: string }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      className={ cn(
        "w-full max-w-md space-y-8 animate-fade-in",
        className
      ) }
    >

      <AuthTabs mode={ mode } onChange={ setMode } />

      {/* LOGIN FORM */ }
      { mode === "login" && (
        <LoginForm>
          <div className="flex justify-end">
            <Button
              type="button"
              variant="link"
              onClick={ () => setModalOpen(true) }
            >
              Forgot password?
            </Button>
          </div>
        </LoginForm>
      ) }

      {/* REGISTER FORM */ }
      { mode === "register" && (
        <RegisterForm />
      ) }

      {/* RESET PASSWORD MODAL */ }
      <Modal
        open={ modalOpen }
        onOpenChangeAction={ setModalOpen }
        title="Reset Password"
        description="Enter your email to receive a link to reset your password."
      >
        <div className="space-y-4">
          <InitResetPasswordForm
            onSuccessAction={ (msg) => {
              toast.success(msg);
              setModalOpen(false);
            } }
            onErrorAction={ (msg) => {
              toast.error(msg || "Something went wrong.");
            } }
          />
        </div>
      </Modal>

    </section>
  );
}
