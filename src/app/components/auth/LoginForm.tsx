"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { toastCustom } from "@/app/components/common/Toast.tsx";
import { redirect } from "next/navigation";
import { getFieldError } from "@/app/lib/getFieldError.ts";
import { AuthFormState, loginSchema } from "@/app/lib/zod/zodAuth.ts";
import { createFormResponse } from "@/app/lib/createFormResponse.ts";
import { SocialButtons } from "@/app/components/auth/SocialButtons";


export function LoginForm({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthFormState | undefined>(undefined);

  const handleChange = <T extends keyof typeof form>(field: T, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const zodValidation = loginSchema.safeParse({ email: form.email, password: form.password });
    if (!zodValidation.success) {
      const res = createFormResponse({
        error: zodValidation.error.flatten().fieldErrors,
        status: "invalid",
      });
      setError(res);
      setIsLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setIsLoading(false);
    if (result?.error) {
      toastCustom("Invalid credentials. Please try again.", "error");
    }
    if (!result?.error) redirect("/dashboard");
  };

  return (
    <>
      <form onSubmit={ handleSubmit } className="space-y-3 md:space-y-2">
        <div className="space-y-3 md:space-y-2">
          <Input
            name="email"
            placeholder="Email"
            type="email"
            errors={ error && getFieldError(error, "email") }
            value={ form.email }
            onChange={ (val) => handleChange("email", val) }
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            errors={ error && getFieldError(error, "password") }
            value={ form.password }
            onChange={ (val) => handleChange("password", val) }
          />
        </div>
        { children }
        <div className="flex flex-col gap-3 mt-5 space-y-2">
          <Button
            type="submit"
            disabled={ isLoading }
            isLoading={ isLoading }
            aria-label="Log in with Credentials"
          >
            Login
          </Button>
          <SocialButtons />
        </div>
      </form>
    </>
  );
}
