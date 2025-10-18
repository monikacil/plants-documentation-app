"use client";

import { useActionState, useEffect, useState } from "react";
import { initiatePasswordReset } from "@/actions/auth.actions";
import { Input } from "@/app/components/ui/Input";
import Form from "next/form";
import { getFieldError } from "@/app/lib/getFieldError";
import { Button } from "@/app/components/ui/Button";

type Props = {
  onSuccessAction?: (msg: string) => void;
  onErrorAction?: (msg: string) => void;
};

export function InitResetPasswordForm({ onSuccessAction, onErrorAction }: Props) {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [state, submitEmail, isPending] = useActionState(initiatePasswordReset, undefined);

  useEffect(() => {
    if (!state) return;

    if (state.status === "success") {
      setEmail("");
      setErrorMsg(null);
      onSuccessAction?.(state.message);
    } else if (state.status !== "success") {
      setErrorMsg(state.message);
      onErrorAction?.(state.message);
    }
  }, [state, onSuccessAction, onErrorAction]);

  return (
    <Form action={ submitEmail } className="space-y-3">
      <Input
        type="email"
        name="email"
        placeholder="Email address"
        value={ email }
        onChange={ (val) => setEmail(val) }
        errors={ state && getFieldError(state, "email") }
        required
      />

      <Button type="submit" disabled={ isPending }>
        { isPending ? "Sending..." : "Send reset password email" }
      </Button>

      { errorMsg && (
        <p className="text-sm text-error-light dark:text-error-dark mt-2 text-center animate-fade-in">
          { errorMsg }
        </p>
      ) }
    </Form>
  );
}
