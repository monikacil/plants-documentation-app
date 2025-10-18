"use client";

import { useActionState, useEffect, useState } from "react";
import { initiatePasswordReset } from "@/actions/auth.actions.ts";
import { Input } from "@/app/components/ui/Input.tsx";
import Form from "next/form";
import { getFieldError } from "@/app/lib/getFieldError.ts";
import { toastCustom } from "@/app/components/common/Toast.tsx";
import { Button } from "@/app/components/ui/Button.tsx";

type Props = {
  onSuccess?: () => void;
};

export function InitResetPasswordForm({ onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [state, submitEmail, isPending] = useActionState(initiatePasswordReset, undefined);

  useEffect(() => {
    if (!state) return;
    if (state?.success) {
      setEmail("");
      onSuccess?.();
    }
    if (!state.success && state.errorMessage) {
      toastCustom(state.errorMessage, "error");
    }
  }, [state, onSuccess]);

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
        Send reset password email
      </Button>
    </Form>
  );
}
