"use client";

import { useState } from "react";
import { Modal } from "@/app/components/modal/Modal";
import { InitResetPasswordForm } from "@/app/components/auth/InitResetPasswordForm";
import { RegisterForm } from "@/app/components/auth/RegisterForm";
import { LoginForm } from "@/app/components/auth/LoginForm";
import { AuthSwitchPrompt } from "@/app/components/auth/AuthSwitchPrompt";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/app/lib/utils/others";
import { toastCustom } from "@/app/components/common/Toast";

export function AuthForm({ className }: { className?: string }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [modalOpen, setModalOpen] = useState(false);

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <section className={ cn("w-full", className) }>
      { mode === "register" ? (
        <RegisterForm>
          <AuthSwitchPrompt
            label="Already have an account?"
            actionText="Log In"
            onAction={ toggleMode }
          />
        </RegisterForm>
      ) : (
        <LoginForm>
          <Button type="button" variant="link" onClick={ () => setModalOpen(true) }>
            Forgot password?
          </Button>
          <AuthSwitchPrompt
            label="Don't have an account?"
            actionText="Sign Up"
            onAction={ toggleMode }
          />
        </LoginForm>
      ) }

      <Modal
        open={ modalOpen }
        onOpenChangeAction={ setModalOpen }
        title="Reset Password"
        description="Enter your email to receive a link to reset your password."
      >
        <div className="flex flex-col gap-3">
          <InitResetPasswordForm
            onSuccessAction={ (msg) => {
              toastCustom(msg, "success");
              setModalOpen(false);
            } }
            onErrorAction={ (msg) => {
              toastCustom(msg || "Something went wrong.", "error");
              setModalOpen(true);
            } }
          />
        </div>
      </Modal>
    </section>
  );
}
