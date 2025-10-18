"use client";

import { useActionState, useEffect, useState } from "react";
import { createUser } from "@/actions/auth.actions.ts";

import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { SocialButtons } from "./SocialButtons.tsx";
import { getFieldError } from "@/app/lib/getFieldError.ts";
import { toastCustom } from "@/app/components/common/Toast.tsx";
import Form from "next/form";


export function RegisterForm({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [state, submitForm, isPending] = useActionState(createUser, undefined);

  useEffect(() => {
    if (!state) return;
    if (state?.success) {
      if (state.status === "registered") {
        toastCustom("Account created, check your email to confirm!", "success");
      }
      setForm({ name: "", email: "", password: "" });
    }
    if (!state.success && state.errorMessage) {
      toastCustom(state.errorMessage, "error");
    }
  }, [state]);

  const handleChange = <T extends keyof typeof form>(field: T, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Form action={ submitForm } className="space-y-3 md:space-y-2">
      <div className="space-y-3 md:space-y-2">
        <Input
          name="name"
          placeholder="Name"
          value={ form.name }
          errors={ state && getFieldError(state, "name") }
          onChange={ (val) => handleChange("name", val) }
        />
        <Input
          name="email"
          placeholder="Email"
          type="email"
          errors={ state && getFieldError(state, "email") }
          value={ form.email }
          onChange={ (val) => handleChange("email", val) }
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          errors={ state && getFieldError(state, "password") }
          value={ form.password }
          onChange={ (val) => handleChange("password", val) }
        />
      </div>
      { children }
      <div className="flex flex-col gap-3 mt-5">
        <Button
          type="submit"
          disabled={ isPending }
          isLoading={ isPending }
          aria-label="Register with Credentials"
        >
          Register
        </Button>
        <SocialButtons />
      </div>
    </Form>
  );
}
