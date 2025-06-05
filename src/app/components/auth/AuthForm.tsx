"use client";

import { useState } from "react";
import { Modal } from "@/app/components/modal/Modal.tsx";
import InitResetPasswordForm from "@/app/components/auth/InitResetPasswordForm.tsx";
import RegisterForm from "@/app/components/auth/RegisterForm.tsx";
import LoginForm from "@/app/components/auth/LoginForm.tsx";
import { AuthSwitchPrompt } from "@/app/components/auth/AuthSwitchPrompt.tsx";
import { Button } from "@/app/components/ui/Button.tsx";
import { cn } from "@/app/lib/utils/others.ts";

export default function AuthForm({ className }: { className?: string; }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [modalOpen, setModalOpen] = useState(false);

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <section className={ cn("w-full", className) }>
      { mode === "register" ? (
        <RegisterForm>
          <AuthSwitchPrompt label="Already have an account?" actionText="Log In" onAction={ toggleMode }/>
        </RegisterForm>
      ) : (
        <LoginForm>
          <Button
            type="button"
            variant="link"
            className="h-[46px] md:h-[38px]"
            onClick={ () => setModalOpen(true) }
          >
            Forgot password?
          </Button>
          <AuthSwitchPrompt label="Don't have an account?" actionText="Sign Up" onAction={ toggleMode }/>
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
    </section>

  );
}
