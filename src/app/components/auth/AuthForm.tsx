"use client";

import { useActionState, useEffect, useState } from "react";
import Form from "next/form";

import { authOrSignIn } from "@/app/actions/auth.ts";

import Input from "../form/Input.tsx";
import Button from "../common/Button.tsx";
import { SocialLoginButtons } from "./SocialLoginButton.tsx";
import { getFieldError } from "@/app/lib/getFieldError.ts";
import { toastCustom } from "@/app/components/common/Toast.tsx";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [state, submitForm, isPending] = useActionState(authOrSignIn, null);

  useEffect(() => {
    if (!state) return;
    if (state?.success) {
      if (state.status === "registered") {
        toastCustom("Account created, check your email to confirm!", "success");
      }
      setMode("login");
      setForm({ name: "", email: "", password: "" });
    }
    if (!state.success && state.errorMessage) {
      toastCustom(state.errorMessage, "error");
    }
  }, [state]);

  const handleChange = <T extends keyof typeof form>(field: T, value: string) => {
    setForm((prev) => ({ ...prev, [ field ]: value }));
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <Form action={ submitForm } className="max-w-md mx-auto text-center space-y-4">
      <div className="space-y-2">
        { mode === "register" && (
          <Input
            name="name"
            placeholder="Name"
            value={ form.name }
            errors={ state && getFieldError(state, "name") }
            onChange={ (val) => handleChange("name", val) }
          />
        ) }
        <Input
          name="email"
          placeholder="Email"
          type="email"
          errors={ state && getFieldError(state, "email") } value={ form.email }
          onChange={ (val) => handleChange("email", val) }
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          errors={ state && getFieldError(state, "password") } value={ form.password }
          onChange={ (val) => handleChange("password", val) }
        />
      </div>
      <div className="text-sm">
        { mode === "login" ? "Don't have an account?" : "Already have an account?" }
        <span
          onClick={ toggleMode }
          className="ml-2 font-semibold cursor-pointer text-base-green-600 underline underline-offset-4"
        >
          { mode === "login" ? "Sign up" : "Log in" }
        </span>
      </div>
      <input type="hidden" name="mode" value={ mode }/>
      <div className="flex flex-col gap-3 mt-5 space-y-3">
        <Button type="submit" disabled={ isPending }>
          { mode === "login" ? "Login" : "Register" }
        </Button>
        <SocialLoginButtons/>
      </div>
    </Form>
  );
}
