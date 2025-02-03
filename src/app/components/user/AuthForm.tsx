"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";

import BasicButton from "./../common/BasicButton";
import ZodErrors from "./../common/ZodErrors";
import Logo from "../layout/Logo";
import Input from "../form/Input";
import { AuthFormState } from "@/app/lib/zod/zodUser";

interface Props {
  btnText: string;
  isLoginForm?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authAction: (prevState: any, formData: FormData) => Promise<any>;
}

export default function AuthForm({
  btnText,
  isLoginForm = false,
  authAction,
}: Props) {
  const [state, formAction, isPending] = useActionState(authAction, {
    errors: {} as AuthFormState,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (state.errors) {
      setShowError(true);
    }
  }, [state.errors]);

  useEffect(() => {
    setShowError(false);
  }, [email, password]);

  return (
    <div className="min-w-144 m-auto px-6 py-8 bg-base-gray-500 rounded-xl shadow-xl">
      <header className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center">
        <Logo size="lg" />
      </header>
      <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          data-testid="auth-form"
          action={formAction}
          className=" flex flex-col gap-3 lg:gap-5"
        >
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            errors={state.errors.email}
            required
            onChange={(value) => {
              setEmail(value);
            }}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            errors={state.errors.password}
            minLength={8}
            required
            onChange={(value) => {
              setPassword(value);
            }}
          />
          {showError ? <ZodErrors error={state?.errors?.message} /> : ""}
          <BasicButton
            disabled={isPending}
            isProcessing={isPending}
            type="submit"
            fullSized={true}
          >
            {btnText}
          </BasicButton>
          {isLoginForm ? (
            <Link
              href="/"
              scroll={false}
              className="text-sm md:text-xs text-center"
            >
              Forgot youre password?
            </Link>
          ) : null}
          <Link
            href={isLoginForm ? "/signup" : "/login"}
            scroll={false}
            className="text-sm md:text-xs text-center"
          >
            {isLoginForm ? "Create an account" : "Login to your account"}
          </Link>
        </form>
      </section>
    </div>
  );
}
